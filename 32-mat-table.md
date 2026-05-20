---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Mat-table
routeAlias: ch32
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
    Mat-table
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「善用 Angular Material 表格，快速建立具備分頁功能的資料列表」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是 Mat-table** — 為什麼使用 Angular Material 的表格元件
- **使用 Mat-table** — 從官方範例取得 HTML 與 TS 程式碼
- **匯入模組** — MatTableModule 與 MatPaginatorModule
- **定義資料** — PeriodicElement interface、ELEMENT_DATA、displayedColumns、dataSource
- **分頁器** — @ViewChild(MatPaginator) 與 ngAfterViewInit
- **三者對應關係** — HTML 欄位、displayedColumns、資料必須同步

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Mat-table？
# What is Mat-table?

---

# Mat-table

`<mat-table>` 是 Angular Material 提供的表格元件，內建樣式、分頁、排序等功能，無需從頭手動實作。使用前需先安裝 `@angular/material`：

```bash
ng add @angular/material
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 使用 Mat-table
# Using Mat-table

---

# 使用 Mat-table
### 含分頁功能的表格預覽

<div class="grid grid-cols-3 gap-4 my-3">
<div>

- 欄位：No.、Name、Weight、Symbol

</div>
<div>

- 底部 Items per page 選擇器

</div>
<div>

- 上一頁 / 下一頁切換

</div>
</div>

<div class="flex justify-center">
  <img src="/images/32-mat-table/table-preview.png" class="rounded shadow-md max-h-80" />
</div>

---

# 使用 Mat-table
### 第一步：取得官方範例程式碼

<div class="grid grid-cols-2 gap-4 my-3">
<div>

1. 前往 Angular Material 官網
2. 找到 **Table with pagination** 範例
3. 點擊右上角 `<>` 展開程式碼

</div>
<div>

4. 切換到 **HTML** 分頁
5. 複製全部內容
6. 貼到元件 HTML 中

</div>
</div>

<div class="flex justify-center">
  <img src="/images/32-mat-table/copy-html-code.png" class="rounded shadow-md max-h-80" />
</div>

---

# 使用 Mat-table
### HTML 結構（一）

```html
<div class="mat-elevation-z8">
  <table mat-table [dataSource]="dataSource">

    <!-- Position Column -->
    <ng-container matColumnDef="position">
      <th mat-header-cell *matHeaderCellDef> No. </th>
      <td mat-cell *matCellDef="let element"> {{element.position}} </td>
    </ng-container>

    <!-- Name Column -->
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let element"> {{element.name}} </td>
    </ng-container>

    <!-- Weight Column -->
```

---

# 使用 Mat-table
### HTML 結構（二）

```html
    <!-- Weight Column -->
    <ng-container matColumnDef="weight">
      <th mat-header-cell *matHeaderCellDef> Weight </th>
      <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
    </ng-container>

    <!-- Symbol Column -->
    <ng-container matColumnDef="symbol">
      <th mat-header-cell *matHeaderCellDef> Symbol </th>
      <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>

  <mat-paginator [pageSizeOptions]="[5, 10, 20]"
                 showFirstLastButtons
                 aria-label="Select page of periodic elements">
  </mat-paginator>
</div>
```

---

# 使用 Mat-table
### 第二步：匯入模組

HTML 加入後會出現報錯，需在 TS 中匯入對應模組：

```typescript
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

// ...

@Component({
  // ...
  imports: [MatTableModule, MatPaginatorModule],
})
```

---

# 使用 Mat-table
### 第三步：定義資料（一）— 型別與假資料

```typescript
export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // ... 更多資料
];
```

---

# 使用 Mat-table
### 第三步：定義資料（二）— 變數宣告

`dataSource` 以 `MatTableDataSource` 包裝 `ELEMENT_DATA`，其餘兩個變數對應欄位與分頁器。

```typescript
displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

@ViewChild(MatPaginator) paginator!: MatPaginator;
```

| 變數 | 說明 |
|------|------|
| `displayedColumns` | 對應 HTML 的 matColumnDef，決定欄位與順序 |
| `dataSource` | 表格資料來源，以 MatTableDataSource 包裝 |
| `paginator` | 透過 @ViewChild 取得分頁器實例 |

---

# 使用 Mat-table
### 第四步：設定 Paginator

Paginator 為底部分頁控制器，需在 `ngAfterViewInit` 生命週期中將其指定給 dataSource：

```typescript
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({ /* ... */ })
export class MyComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 必須在 ngAfterViewInit 中設定 paginator，因為此時 @ViewChild 才能確保取得到 DOM 中的 mat-paginator 實例。
</div>

---

# 使用 Mat-table
### 三者必須同步對應

HTML 的 `matColumnDef`、TS 的 `displayedColumns` 與資料物件的屬性名稱三者必須完全同步，任一不符會導致畫面空白或錯誤。

| 位置 | 內容 |
|------|------|
| HTML `matColumnDef` | `"position"`, `"name"`, `"weight"`, `"symbol"` |
| TS `displayedColumns` | `['position', 'name', 'weight', 'symbol']` |
| TS `ELEMENT_DATA` | `{ position, name, weight, symbol }` |

---

# 使用 Mat-table
### 三者必須同步對應 — 程式碼對照

```html
<!-- HTML：matColumnDef -->
<ng-container matColumnDef="position">
  ...
</ng-container>
```

```typescript
// TS：displayedColumns
displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

// TS：ELEMENT_DATA 屬性名稱
const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
];
```

---
layout: end
---

# 課程結束
### 善用 Angular Material 提供的 mat-table，輕鬆打造具備分頁的資料表格
