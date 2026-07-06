---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Mat-table
routeAlias: ch33
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

<!--
大家好，這一章我們來學 Angular Material 的表格元件 mat-table。

想像一下，如果要自己刻一個支援分頁、排序、還要處理欄位對齊的表格，光是 CSS 跟邏輯就要花不少時間。mat-table 就是 Angular Material 幫我們把這些常見需求都包好的表格元件，我們只要照著規則設定資料跟欄位就好。

學完這一章，大家會知道怎麼用官方範例快速建立一個含分頁功能的表格，並且理解 HTML、TypeScript、資料三個地方是怎麼互相對應的。
-->

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

<!--
這張投影片先讓大家看一下整章的架構：先介紹什麼是 mat-table，接著實際動手做一個範例，中間會講到怎麼匯入模組、怎麼定義資料，最後特別強調 HTML 欄位、displayedColumns、跟資料三者一定要對應一致，這是最容易出錯的地方。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Mat-table？
# What is Mat-table?

<!--
先問大家一個問題：如果要做一個像 Excel 一樣，可以分頁、排序的表格，我們是不是得自己寫很多重複的邏輯？這就是 mat-table 要解決的問題，它把這些常見功能都內建好了，我們接下來就來看看它實際上是什麼。
-->

---

# Mat-table

`<mat-table>` 是 Angular Material 提供的表格元件，內建樣式、分頁、排序等功能，無需從頭手動實作。使用前需先安裝 `@angular/material`：

```bash
ng add @angular/material
```

<!--
`<mat-table>` 就是 Angular Material 提供的表格元件，內建樣式、分頁、排序這些功能都不用我們自己刻。

⚠️ 提醒大家，使用前一定要先確認專案已經安裝 @angular/material，如果還沒裝，可以回到前一章用 ng add @angular/material 安裝，不然這裡的元件會找不到。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 使用 Mat-table
# Using Mat-table

<!--
接下來我們就實際動手，一步一步把一個含分頁功能的表格做出來。大家可以跟著做，等一下會分成好幾個步驟，包含拿範例程式碼、匯入模組、定義資料、設定分頁器。
-->

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

<!--
在動手之前，先讓大家看一下我們最後會做出什麼樣子：一個有 No.、Name、Weight、Symbol 四個欄位的表格，下面還有分頁器，可以選每頁顯示幾筆、也可以切換上一頁下一頁。心裡有這張圖之後，等一下拆解步驟會比較有方向感。
-->

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

<!--
第一步我們不用從零開始寫，直接去 Angular Material 官網找現成的範例。

帶大家看一下操作順序：先找到 Table with pagination 這個範例，點右上角的 `<>` 展開程式碼，切到 HTML 分頁籤，把內容整個複製貼到我們元件的 HTML 檔案裡。

⚠️ 提醒大家，官網範例通常包含完整的 HTML 結構，貼上去之後編輯器可能會出現一堆紅字，這是正常的，因為我們還沒匯入對應的模組，等一下會處理。
-->

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

<!--
帶大家看一下貼進來的 HTML 長什麼樣子。最外層是 `<table mat-table [dataSource]="dataSource">`，裡面每一個 `<ng-container matColumnDef="...">` 就代表一個欄位，像 position、name 這些。

大家可以看到裡面用 `*matHeaderCellDef` 定義表頭要顯示的文字，用 `*matCellDef="let element"` 定義每一列要顯示 element 的哪個屬性，這個 element 就是我們等一下要準備的資料物件。
-->

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

<!--
接著往下看，還有 weight、symbol 兩個欄位，寫法跟前面一模一樣，只是換了屬性名稱。

比較關鍵的是最後這兩行：`<tr mat-header-row *matHeaderRowDef="displayedColumns">` 跟 `<tr mat-row *matRowDef="let row; columns: displayedColumns;">`，這兩行就是告訴 mat-table 要用 displayedColumns 這個陣列決定顯示哪些欄位、順序又是什麼。下面的 `<mat-paginator>` 就是分頁器，pageSizeOptions 決定可以選擇每頁顯示 5、10、20 筆。
-->

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

<!--
HTML 貼上去之後，編輯器會噴一堆錯誤，這是因為 TypeScript 這邊還不認識 mat-table、mat-paginator 這些標籤。

解法很單純，就是把對應的模組 import 進來：MatTableModule、MatTableDataSource 從 @angular/material/table 來，MatPaginatorModule 從 @angular/material/paginator 來，再加進 @Component 的 imports 陣列，錯誤就會消失。

⚠️ 提醒大家，只 import 是不夠的，還要記得加進 imports 陣列，這是 standalone component 常見會漏掉的地方。
-->

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

<!--
接下來要準備資料。第一步先定義資料的型別，我們用 PeriodicElement 這個 interface，規定每筆資料要有 position、name、weight、symbol 四個屬性。

有了型別之後，就可以宣告 ELEMENT_DATA 這個陣列，放入實際的假資料，像氫、氦、鋰這些元素，大家可以照著範例照抄，或是換成自己想示範的資料。
-->

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

<!--
接下來要宣告三個變數，把 HTML 跟資料串起來。

`displayedColumns` 是一個字串陣列，決定表格要顯示哪些欄位、以及順序，這裡的名稱要跟 HTML 的 matColumnDef 完全一致。`dataSource` 則是用 MatTableDataSource 把我們的 ELEMENT_DATA 包起來，mat-table 才看得懂。`paginator` 則是透過 @ViewChild 取得畫面上分頁器的實例，這個等一下下一步會用到。
-->

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

<!--
最後一步是要讓分頁器真正發揮作用，也就是把 dataSource 的 paginator 屬性指定成我們用 @ViewChild 拿到的分頁器實例。

帶大家看一下這段程式碼的關鍵：這件事一定要放在 ngAfterViewInit 這個生命週期方法裡做，因為 @ViewChild 要等畫面（view）都渲染完成之後才能保證抓得到 DOM 裡的 mat-paginator 元件。

⚠️ 這是很多同學會踩的坑：如果把這行寫在 ngOnInit 裡，畫面可能還沒渲染完成，paginator 會是 undefined，分頁功能就會失效。一定要記得用 ngAfterViewInit。
-->

---

# 使用 Mat-table
### 三者必須同步對應

HTML 的 `matColumnDef`、TS 的 `displayedColumns` 與資料物件的屬性名稱三者必須完全同步，任一不符會導致畫面空白或錯誤。

| 位置 | 內容 |
|------|------|
| HTML `matColumnDef` | `"position"`, `"name"`, `"weight"`, `"symbol"` |
| TS `displayedColumns` | `['position', 'name', 'weight', 'symbol']` |
| TS `ELEMENT_DATA` | `{ position, name, weight, symbol }` |

<!--
這張投影片是整章最重要的觀念，一定要跟大家強調清楚。

mat-table 能不能正常顯示，關鍵在於三個地方的名稱要完全一致：HTML 裡 matColumnDef 寫的欄位名稱、TypeScript 裡 displayedColumns 陣列的內容、還有資料物件本身的屬性名稱。這三者只要有一個拼錯、順序不對，畫面就可能整個空白，或是跳出奇怪的錯誤訊息。

⚠️ 這也是實務上最常見的除錯情境，如果表格顯示不出來，第一件事就是檢查這三個地方是不是對得上。
-->

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

<!--
我們直接用程式碼對照一次給大家看：HTML 裡 matColumnDef="position"，對應到 TS 的 displayedColumns 陣列裡也要有 'position' 這個字串，資料物件 ELEMENT_DATA 裡也要有 position 這個屬性。三個地方，同一個名字，缺一不可。

大家以後自己刻表格的時候，可以把這張投影片當成檢查清單，一個一個核對。
-->

---
layout: end
---

# 課程結束
### 善用 Angular Material 提供的 mat-table，輕鬆打造具備分頁的資料表格

<!--
這一章我們學會了怎麼用 Angular Material 的 mat-table 快速做出一個含分頁功能的表格，也搞懂了 HTML、TypeScript、資料三者要怎麼對應。下一章我們會接著看 mat-icon，讓介面更完整。辛苦大家了！
-->
