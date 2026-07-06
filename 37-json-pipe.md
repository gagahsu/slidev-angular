---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: JsonPipe
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
    JsonPipe
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「將 JSON 物件直接呈現於 HTML 畫面上」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來學 JsonPipe。

前面我們都是用內嵌繫結把單一的字串或數字顯示在畫面上，但如果今天要顯示的是一整包物件資料，例如一個使用者的完整資料，直接繫結會發生什麼事？畫面不會乖乖顯示內容，而是出現一串看不懂的文字。JsonPipe 要解決的就是這個問題——它能把 JSON 物件直接轉成可讀的字串顯示在畫面上。

學完這一章，大家會知道為什麼物件不能直接顯示、怎麼用 `| json` 管道把物件印出來，以及搭配 `<pre>` 標籤讓輸出保留完整格式。
-->

---
layout: default
---

# Outline

- **JsonPipe 是什麼** — HTML 無法直接顯示 JSON 物件的原因
- **JsonPipe 使用步驟** — import、繫結語法、`| json` 管道
- **`<pre>` 標籤搭配** — 格式化顯示 JSON 輸出

<!--
這張投影片先讓大家看一下今天的路線圖：我們會先搞清楚為什麼物件不能直接顯示在畫面上，接著學怎麼用 JsonPipe 把物件轉成可讀文字，最後再教大家搭配 `<pre>` 標籤讓輸出保留縮排、更好閱讀。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JsonPipe 是什麼
# What is JsonPipe

<!--
先問大家一個問題：如果我們把一個物件直接用 `{{ }}` 繫結到畫面上，會看到什麼？答案不是我們想像的那種漂亮 JSON 格式，而是一串很奇怪的文字。接下來這幾張投影片就是要解釋這個現象是怎麼發生的，以及 JsonPipe 怎麼幫我們解決。
-->

---

# JsonPipe 是什麼

在 TypeScript 中，可以用 `console.log()` 檢查 JSON 資料，輸出出現在瀏覽器的開發者工具 log。

若直接以內嵌繫結 `{{ user }}` 將物件顯示在 HTML，畫面只會出現：

<div class="flex justify-center">
  <img src="/images/36-json-pipe/object-object-display.png" class="rounded shadow-md max-h-80" />
</div>

原因是 HTML 無法直接序列化 JavaScript 物件，會呼叫物件的 `.toString()` 方法，結果固定為 `[object Object]`。

<!--
大家平常在 TypeScript 裡想檢查資料對不對，通常會用 `console.log()`，這樣可以在開發者工具裡清楚看到物件的內容。但如果我們直接把物件寫進畫面的內嵌繫結 `{{ user }}`，畫面上就會出現一串 `[object Object]`，完全看不出裡面裝了什麼。

這是因為 HTML 本身不知道怎麼把一個 JavaScript 物件轉成文字，它只會呼叫物件內建的 `.toString()` 方法，而這個方法對一般物件來說，回傳的固定就是 `[object Object]` 這個字串，跟物件裡實際的資料完全無關。

⚠️ 這裡同學很容易誤會成「Angular 壞掉了」或「繫結語法寫錯」，其實語法完全正確，只是物件本身沒辦法被 HTML 直接讀懂，我們需要額外的工具把它轉成可讀的文字，這就是接下來要介紹的 JsonPipe。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JsonPipe 使用
# Using JsonPipe

<!--
知道問題出在哪之後，接下來就是解法了。這一段我們會介紹兩種把物件轉成文字的方式，重點會放在 Angular 提供的 JsonPipe，也就是大家常聽到的 `| json` 管道語法。
-->

---

# JsonPipe 使用步驟

若要將 JSON 資料顯示於 HTML，有兩種方式：

| 方式 | 說明 |
| --- | --- |
| `JSON.stringify()` | 在 TypeScript 中手動轉換為字串後繫結 |
| `JsonPipe`（`\| json`） | 直接在 HTML 樣板中使用管道語法轉換 |

使用 `JsonPipe` 的步驟如下：

1. 在該頁面的 `*.component.ts` 中 import `CommonModule`
2. 在 HTML 以內嵌繫結呈現目標變數
3. 在變數名稱後加上 `| json`

<!--
把物件轉成可讀文字，其實有兩條路：一種是在 TypeScript 裡自己動手用 `JSON.stringify()` 轉好再繫結，另一種就是讓 Angular 幫我們做，也就是 `JsonPipe`。實務上大家幾乎都選第二種，因為語法更簡潔，也不用在元件裡多寫轉換邏輯。

要用 JsonPipe，步驟很單純：先在 `*.component.ts` 裡 import `CommonModule`，這樣樣板才認得 `json` 這個管道；接著在 HTML 用內嵌繫結顯示變數；最後在變數後面加上 `| json` 就完成了。

業界實務上，JsonPipe 很常用在開發階段的除錯，快速把 API 回傳的資料印在畫面上檢查欄位對不對，比開發者工具方便很多。
-->

---

# JsonPipe 使用 — TypeScript 範例

在元件中宣告物件資料：

```typescript
user = {
  name: 'John',
  age: 30,
  roles: ['admin', 'user']
};
```

並在 `imports` 陣列中加入 `CommonModule`：

```typescript
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  user = { name: 'John', age: 30, roles: ['admin', 'user'] };
}
```

<!--
這段範例的目的是準備好等一下要顯示的資料，並且讓元件認得 `json` 這個管道。我們先宣告一個 `user` 物件，裡面有姓名、年齡、還有一個角色陣列，這樣等一下才能看出 JsonPipe 連巢狀的陣列都能處理。

關鍵的地方在 `imports` 陣列裡加上 `CommonModule`，這一步千萬不能省略。

⚠️ 同學最常忘記的就是這個 import，如果沒加，HTML 裡寫 `| json` 的時候 Angular 會直接跳出錯誤，說找不到叫做 `json` 的管道，所以看到這種錯誤訊息，第一件事就是檢查 `CommonModule` 有沒有匯入。
-->

---

# JsonPipe 使用 — HTML 範例

在 HTML 樣板中以內嵌繫結加上 `| json` 管道：

```html
{{ user | json }}
```

畫面輸出結果（單行）：

<div class="flex justify-center">
  <img src="/images/36-json-pipe/json-pipe-inline-output.png" class="rounded shadow-md max-h-80" />
</div>

<!--
準備好資料跟模組之後，實際用法非常簡單，就是在原本的內嵌繫結後面加上 `| json`，跟我們之前學過的其他管道語法用法一模一樣。

大家可以看到，執行之後畫面不再是 `[object Object]`，而是完整的 JSON 內容都印出來了，連陣列裡的 `admin`、`user` 也都看得到。不過大家注意一下，這時候的輸出是擠在同一行的，可讀性其實不太好，等一下我們會教怎麼讓它排版更漂亮。
-->

---

# 搭配 &lt;pre&gt; 標籤格式化顯示

直接使用 `| json` 輸出為單行，可讀性較低。建議搭配 <code>&lt;pre&gt;</code> 標籤，讓輸出保留縮排與換行：

```html
<pre>{{ user | json }}</pre>
```

<code>&lt;pre&gt;</code> 標籤會依照原始內容的空白與換行進行呈現，使 JSON 結構更易於閱讀。

<pre class="bg-gray-100 rounded p-4 text-sm text-left leading-relaxed font-mono mt-4" style="width: fit-content; margin: 1rem auto;">
{
  "name": "John",
  "age": 30,
  "roles": [
    "admin",
    "user"
  ]
}
</pre>

<!--
剛剛看到 `| json` 輸出雖然正確，但擠成一行不好讀，這裡我們要解決的就是排版的問題。做法很簡單，只要把原本的內嵌繫結包在 `<pre>` 標籤裡面就好。

`<pre>` 是 HTML 原生的標籤，意思是「保留原樣（preformatted）」，一般的 HTML 標籤預設會把多餘的空白跟換行都吃掉，但 `<pre>` 標籤不會，它會照著內容原本的縮排和換行呈現，所以搭配 JsonPipe 輸出的字串，就會變成大家看到的這種一層一層縮排的漂亮格式。

大家可以對照一下，這跟我們平常在開發者工具裡看到 JSON 資料的排版方式很像，這也是業界在做除錯畫面或簡易資料檢視工具時常用的小技巧。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 綜合練習
# Ch33–37 Comprehensive Exercise

<!--
前面幾章我們分別學了 mat-table、mat-icon、date-picker、DatePipe、JsonPipe 這五個獨立的主題，接下來這個練習要把它們全部串在一起，做一個實際會遇到的畫面：員工資料管理表。
-->

---
layout: default
---

# 練習：員工資料管理表
### 任務說明

用 `mat-table`、`mat-icon`、`mat-datepicker`、`DatePipe`、`JsonPipe` 做一個員工資料表頁面，需求如下：

1. 定義 `EmployeeData` interface：`id`、`name`、`department`、`hireDate`（`Date`）、`salary`
2. 準備至少 6 筆假資料，以 `MatTableDataSource` 包裝並加上分頁器（每頁 3 / 5 / 10 筆）
3. 欄位：ID、姓名、部門、到職日、薪水、操作
   - 到職日欄位用 `DatePipe` 格式化為 `yyyy/MM/dd`
   - 操作欄位放兩個 `mat-icon`：`visibility`（檢視）、`delete`（刪除）
4. 表格上方加入 `mat-datepicker` 篩選欄「到職日期起」，`min` 為所有員工最早到職日，`max` 為今天
5. 點某員工的 `visibility` icon 後，畫面下方用 `JsonPipe` 顯示該筆完整資料

<!--
這個練習把 ch33 到 ch37 學過的東西全部用上一次：mat-table 負責顯示跟分頁，mat-icon 負責操作按鈕，mat-datepicker 負責篩選日期，DatePipe 負責把日期欄位排版好看，JsonPipe 負責把選中那筆資料的完整內容印出來除錯用。

大家可以先自己動手做做看，做不出來再往下看提示。
-->

---
layout: default
---

# 練習：員工資料管理表
### 解題提示

1. 每個欄位都要包在 `ng-container` 裡，`matColumnDef`、`displayedColumns`、資料屬性三者名稱必須一致（ch33 重點）
2. `MatIconModule` 記得加進 `imports`，icon 名稱去 Google Fonts Icons 網站查（ch34）
3. `mat-datepicker` 要加 `provideNativeDateAdapter()`，`min` / `max` 綁的是 `Date` 物件，不是字串（ch35）
4. 表格內格式化日期直接寫 `{{ element.hireDate | date: 'yyyy/MM/dd' }}`，不用在 TS 手動轉換（ch36）
5. `selectedEmployee` 初始為 `null`，用 `*ngIf="selectedEmployee"` 包住 `<pre>` 區塊，避免顯示 `null`（ch37）
6. 刪除 icon 呼叫的方法要用 `filter()` 從 `dataSource.data` 排除該筆，再重新指派回 `dataSource.data`，才能觸發表格重新渲染

<!--
提示的順序就是照著 ch33 到 ch37 的章節順序來對照，大家卡住的時候可以回頭看對應那一章的投影片。

⚠️ 第 6 點是很多同學會忽略的地方：MatTableDataSource 的 data 是用參考比對的，如果直接對陣列做 push 或 splice，畫面不會自動更新，一定要整個重新指派一個新陣列給 dataSource.data。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 完整解答：TypeScript

<!--
先看 TypeScript 這一側，我們會照順序看過資料型別、假資料、模組匯入、元件設定、屬性宣告，最後是方法實作。
-->

---

# 完整解答 — Interface

```typescript
export interface EmployeeData {
  id: number;
  name: string;
  department: string;
  hireDate: Date;
  salary: number;
}
```

<!--
先定義資料的型別，跟 ch33 的 PeriodicElement 是一樣的概念，這裡多了 hireDate，型別特別用 Date，不是 string，這樣才能直接搭配 mat-datepicker 跟 DatePipe 使用。
-->

---

# 完整解答 — 假資料

```typescript
const EMPLOYEE_DATA: EmployeeData[] = [
  { id: 1, name: '王小明', department: '研發部', hireDate: new Date('2021/03/15'), salary: 58000 },
  { id: 2, name: '陳美玲', department: '行銷部', hireDate: new Date('2022/07/01'), salary: 52000 },
  { id: 3, name: '林大偉', department: '研發部', hireDate: new Date('2020/11/20'), salary: 65000 },
  { id: 4, name: '張雅婷', department: '人資部', hireDate: new Date('2023/01/10'), salary: 48000 },
  { id: 5, name: '李志豪', department: '業務部', hireDate: new Date('2019/05/05'), salary: 70000 },
  { id: 6, name: '黃淑芬', department: '財務部', hireDate: new Date('2022/09/18'), salary: 55000 },
];
```

<!--
準備 6 筆假資料，注意 hireDate 每一筆都是用 new Date() 建立的物件，日期故意設得有前有後，等一下篩選欄的 min 就會抓到最早那一筆，也就是李志豪的 2019/05/05。
-->

---

# 完整解答 — TS 匯入模組（一）

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
```

<!--
前兩行是 Angular 核心跟共用模組：CommonModule 是 JsonPipe、ngIf 這些指令需要的，FormsModule 則是 ngModel 雙向綁定需要的，少一個都會噴錯。後面兩行是 mat-table 系列，跟 ch33 教的一樣。
-->

---

# 完整解答 — TS 匯入模組（二）

```typescript
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
```

<!--
這五個分別對應 mat-icon（ch34）跟 mat-datepicker（ch35）需要的模組，provideNativeDateAdapter 千萬不能漏，漏了 datepicker 會直接壞掉。
-->

---

# 完整解答 — Component 設定

```typescript
@Component({
  selector: 'app-employee-table',
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-table.component.html',
})
export class EmployeeTableComponent implements AfterViewInit {
```

<!--
imports 陣列把前面兩頁匯入的模組全部集合起來，一個都不能少。providers 裡加上 provideNativeDateAdapter()，跟 ch35 教的一樣，是 mat-datepicker 能運作的必要設定。
-->

---

# 完整解答 — Component 屬性

```typescript
  displayedColumns: string[] = ['id', 'name', 'department', 'hireDate', 'salary', 'actions'];
  dataSource = new MatTableDataSource<EmployeeData>(EMPLOYEE_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selectedEmployee: EmployeeData | null = null;
  minDate = new Date(Math.min(...EMPLOYEE_DATA.map(e => e.hireDate.getTime())));
  maxDate = new Date();
  filterDate: Date | null = null;
```

<!--
displayedColumns 決定表格欄位順序，記得要跟 HTML 的 matColumnDef 完全對上。minDate 這裡用 Math.min 搭配 map，動態算出所有員工裡最早的到職日，不是寫死的日期；maxDate 直接用 new Date() 就是今天，這樣篩選欄的範圍才會跟著假資料自動調整。
-->

---

# 完整解答 — ngAfterViewInit 與 view()

```typescript
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  view(employee: EmployeeData) {
    this.selectedEmployee = employee;
  }
```

<!--
ngAfterViewInit 裡把 paginator 接上 dataSource，這是 ch33 教過的必要步驟。view() 方法很單純，把使用者點的那筆員工存進 selectedEmployee，畫面下方的 JsonPipe 就會顯示這筆資料。
-->

---

# 完整解答 — remove()

```typescript
  remove(employee: EmployeeData) {
    this.dataSource.data = this.dataSource.data.filter(
      e => e.id !== employee.id
    );
  }
}
```

<!--
remove() 用 filter() 排除掉被點擊的那一筆，再整個重新指派給 dataSource.data。

⚠️ 這裡一定要重新指派，不能直接對 dataSource.data 做 push 或 splice，因為 Angular 的變更偵測是比對參考位置，直接修改原陣列內容畫面不會更新。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 完整解答：HTML

<!--
TypeScript 準備好了，接下來看 HTML 這一側，會照順序看過篩選欄、表格欄位、操作按鈕，最後是分頁器跟 JSON 顯示區。
-->

---

# 完整解答 — 篩選欄

```html
<mat-form-field>
  <mat-label>到職日期起</mat-label>
  <input matInput [matDatepicker]="picker"
         [min]="minDate" [max]="maxDate"
         [(ngModel)]="filterDate">
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
```

<!--
這段跟 ch35 教的 mat-datepicker 結構完全一樣，min 綁 minDate、max 綁 maxDate，這兩個都是 TS 裡動態算出來的 Date 物件，不是寫死的字串。
-->

---

# 完整解答 — Table 欄位（一）

```html
<ng-container matColumnDef="id">
  <th mat-header-cell *matHeaderCellDef> ID </th>
  <td mat-cell *matCellDef="let e"> {{e.id}} </td>
</ng-container>

<ng-container matColumnDef="name">
  <th mat-header-cell *matHeaderCellDef> 姓名 </th>
  <td mat-cell *matCellDef="let e"> {{e.name}} </td>
</ng-container>
```

<!--
外層仍然是 ch33 教過的 `<div class="mat-elevation-z8"><table mat-table [dataSource]="dataSource">` 結構，這裡從第一個欄位開始看。id、name 兩欄寫法跟 ch33 的範例一模一樣，只是欄位名稱換掉。
-->

---

# 完整解答 — Table 欄位（二）

```html
<ng-container matColumnDef="department">
  <th mat-header-cell *matHeaderCellDef> 部門 </th>
  <td mat-cell *matCellDef="let e"> {{e.department}} </td>
</ng-container>

<ng-container matColumnDef="hireDate">
  <th mat-header-cell *matHeaderCellDef> 到職日 </th>
  <td mat-cell *matCellDef="let e"> {{e.hireDate | date: 'yyyy/MM/dd'}} </td>
</ng-container>
```

<!--
department 欄跟前面欄位寫法一樣。重點在 hireDate 欄，這裡直接在內嵌繫結後面加上 `| date: 'yyyy/MM/dd'`，就是 ch36 教的 DatePipe，把 Date 物件直接排版成好讀的字串，完全不用在 TS 裡手動轉換。
-->

---

# 完整解答 — Table 欄位（三）

```html
<ng-container matColumnDef="salary">
  <th mat-header-cell *matHeaderCellDef> 薪水 </th>
  <td mat-cell *matCellDef="let e"> {{e.salary}} </td>
</ng-container>

<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
```

<!--
salary 欄跟前面幾欄一樣單純。後面這兩行 tr，是 ch33 教過的收尾寫法，告訴 mat-table 要用 displayedColumns 這個陣列決定顯示哪些欄位、順序又是什麼。
-->

---

# 完整解答 — Table 欄位（四）— 操作按鈕

```html
<ng-container matColumnDef="actions">
  <th mat-header-cell *matHeaderCellDef> 操作 </th>
  <td mat-cell *matCellDef="let e">
    <mat-icon (click)="view(e)">visibility</mat-icon>
    <mat-icon (click)="remove(e)">delete</mat-icon>
  </td>
</ng-container>
```

<!--
操作欄放了兩個 mat-icon，這是 ch34 教的元件，這裡搭配 (click) 事件繫結，點 visibility 呼叫 TS 的 view() 方法，點 delete 呼叫 remove() 方法，icon 名稱要跟 Google Fonts Icons 網站上查到的名稱完全一致。
-->

---

# 完整解答 — 分頁器與 JSON 顯示區

```html
  <mat-paginator [pageSizeOptions]="[3, 5, 10]" showFirstLastButtons></mat-paginator>
</div>

<pre *ngIf="selectedEmployee">{{ selectedEmployee | json }}</pre>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>*ngIf="selectedEmployee"</code> 一定要加，否則畫面一開始就會顯示 <code>null</code>，點過 visibility 之後才會換成該筆員工的完整 JSON 內容。
</div>

<!--
`</table>` 收尾之後接分頁器，`pageSizeOptions` 設定 3、5、10 三種每頁筆數。最下面這行是 ch37 教的 JsonPipe 搭配 `<pre>` 標籤，用來顯示使用者點選的那一筆員工完整資料，方便除錯或確認欄位對不對。

到這裡整個綜合練習的完整解答就講完了，大家可以對照自己寫的版本，看看哪裡卡住、哪裡漏掉。
-->

---
layout: end
---

# 課程結束
### 使用 JsonPipe 搭配 `<pre>` 標籤，可在 HTML 畫面上清晰呈現 JSON 物件結構

<!--
今天這一章我們解決了一個很實際的問題：物件沒辦法直接顯示在畫面上。大家現在應該都知道原因是 HTML 只會呼叫 `.toString()`，而 JsonPipe 就是幫我們把物件轉成可讀 JSON 字串的工具，再搭配 `<pre>` 標籤就能保留完整的排版。

這個技巧雖然簡單，但在平常開發時非常實用，尤其是要快速確認 API 回傳資料長什麼樣子的時候，大家可以多多練習使用。
-->

