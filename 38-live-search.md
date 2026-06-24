---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 即時搜尋
routeAlias: ch37
style: |
  .slidev-layout p,
  .slidev-layout li,
  .slidev-layout td,
  .slidev-layout th,
  .slidev-layout div {
    font-size: max(16px, 1em);
  }
  table {
    width: 100%;
    margin: 1rem 0;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px !important;
    border: 1px solid #e2e8f0 !important;
  }
  .index-table td {
    text-align: center;
    font-family: monospace;
  }
---

<div class="flex flex-col justify-center items-center h-full" style="background: #ffffff;">
  <p style="color: #5eada0; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.2rem;">
    Angular Essentials
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    即時搜尋
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「透過 keyup 事件即時過濾資料表格，打造流暢的搜尋體驗」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **即時搜尋概念** — 搜尋框與 `(input)` / `(keyup)` 事件的用途
- **建立資料表格** — 以 mat-table 與 ELEMENT_DATA 為基礎
- **搜尋框 HTML** — 使用 `(keyup)` 綁定事件，搭配 `[(ngModel)]` 雙向繫結
- **取得輸入值** — 透過 `$event` 與 `event.target.value` 讀取使用者輸入
- **過濾邏輯** — 用 `forEach` + `indexOf` 即時更新 `dataSource.data`

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 即時搜尋概念
# Live Search Concept

---

# 即時搜尋

搜尋框的即時搜尋功能，利用 `<input>` 標籤的事件屬性，根據使用者輸入的內容動態更新畫面顯示的資料列。

**實作思路**

1. 建立含資料的 mat-table
2. 在表格上方放置搜尋框
3. 每次按鍵時觸發過濾方法
4. 將符合條件的資料寫回 `dataSource.data`

---

# 即時搜尋
### `(input)` vs `(keyup)`

| 事件 | 說明 |
|------|------|
| `(input)` | 值變動即觸發，輸入中文時可能不會即時更新 |
| `(keyup)` | 按鍵放開時觸發，中文輸入更穩定 |

建議使用 `(keyup)` 以避免中文輸入法的相容問題。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 建立資料表格
# Set Up the Data Table

---

# 建立資料表格

以 mat-table 為基礎，事先準備好 `ELEMENT_DATA` 假資料與 `dataSource`：

<div class="flex justify-center">
  <img src="/images/37-live-search/mat-table-element-data-preview.png" class="rounded shadow-md max-h-80" />
</div>

表格包含 No.、Name、Weight、Symbol 四個欄位，共 10 筆元素資料，分頁顯示每頁 5 筆。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 搜尋框 HTML
# Search Input HTML

---

# 搜尋框 HTML

在元件模板中加入 `<input>` 元素，並使用 `(keyup)` 事件繫結搜尋方法，同時以 `[(ngModel)]` 雙向繫結儲存輸入值：

```html
<input
  (keyup)="changeData($event)"
  [(ngModel)]="inputData"
  style="width: 100%;"
  placeholder="搜尋元素名稱..."
/>

<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  <!-- ... 欄位定義 ... -->
</table>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 若使用 <code>(input)</code> 事件，在輸入中文時可能不會即時觸發回呼；改用 <code>(keyup)</code> 可確保每次按鍵結束後都正確觸發。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 取得輸入值
# Reading the Input Value

---

# 取得輸入值

`(keyup)` 事件傳入 `$event`，有兩種方式可取得輸入值：

**方法一：`event.target.value`**

```typescript
changeData(event: Event) {
  const val = (event.target as HTMLInputElement).value;
}
```

**方法二：`[(ngModel)]`**

```typescript
inputData: string = '';

changeData(event: Event) {
  // this.inputData 已由 ngModel 同步更新
  console.log(this.inputData);
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 過濾邏輯
# Filter Logic

---

# 過濾邏輯

取得輸入值後，使用 `forEach` 遍歷原始資料，以 `indexOf` 判斷是否包含關鍵字，最後將符合條件的結果寫回 `dataSource.data`：

```typescript
changeData(event: Event) {
  let tidyData: PeriodicElement[] = [];

  ELEMENT_DATA.forEach((res) => {
    if (res.name.indexOf((event.target as HTMLInputElement).value) != -1) {
      tidyData.push(res);
    }
  });

  this.dataSource.data = tidyData;
}
```

- `ELEMENT_DATA` — 原始完整資料，不會被修改
- `tidyData` — 暫存符合搜尋條件的資料
- `indexOf(...) != -1` — 判斷 `name` 欄位是否包含輸入字串
- `this.dataSource.data = tidyData` — 更新表格顯示

---

# 完整 TypeScript 範例（一）

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium',   weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium',  weight: 6.941,  symbol: 'Li' },
  // ... 更多資料
];
```

---

# 完整 TypeScript 範例（二）

```typescript
@Component({ /* ... */ })
export class AppComponent implements AfterViewInit {
  inputData: string = '';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  changeData(event: Event) {
    let tidyData: PeriodicElement[] = [];
    ELEMENT_DATA.forEach((res) => {
      if (res.name.indexOf((event.target as HTMLInputElement).value) != -1) {
        tidyData.push(res);
      }
    });
    this.dataSource.data = tidyData;
  }
}
```

---
layout: end
---

# 課程結束
### 善用 `(keyup)` 事件與 `indexOf` 過濾，即可為 mat-table 加入流暢的即時搜尋功能
