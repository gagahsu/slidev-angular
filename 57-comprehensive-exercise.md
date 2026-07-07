---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 綜合練習 Ch33–40
routeAlias: ch57
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
  <h1 style="color: #1a5c5c; font-size: 3.2rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    綜合練習 Ch33–40
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「員工管理系統：把八個獨立主題整合成一個真實頁面」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章是 ch33 到 ch40 的綜合練習，獨立成一個章節，讓大家可以專心把這八章學過的東西全部組裝在一起。

這八章分別是：mat-table、mat-icon、mat-datepicker、DatePipe、JsonPipe、即時搜尋、ngClass、Tabs。單獨看每一個都不難，但業界實務上的頁面幾乎不會只用到一種技巧，通常是好幾個功能疊在一起運作。這個練習就是要模擬這種情境，做一個「員工管理系統」：用頁籤切換「員工列表」跟「已封存員工」，列表裡有搜尋、日期篩選、薪水高亮、檢視／封存／復原的操作。

學完並做完這個練習，大家應該能夠很有信心地說，這八章的內容我不只學過，而且真的組裝起來用過一次。
-->

---
layout: default
---

# Outline

- **任務說明** — 員工管理系統的完整需求
- **畫面預覽** — 完成後的頁面長什麼樣子
- **解題提示** — 八個主題怎麼串起來的關鍵細節
- **完整解答：TypeScript** — 資料、狀態、方法
- **完整解答：HTML** — 頁籤、表格、搜尋列、封存清單
- **完整解答：SCSS** — 薪水高亮與版面樣式

<!--
這張投影片先讓大家看一下今天的路線圖。我們會先看完整需求，再看一眼完成後的畫面，接著給大家解題提示，最後才公布完整的 TypeScript、HTML、SCSS 解答。建議大家先看完需求跟提示，自己動手做過一次，再回來對照解答。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 任務說明
# Requirements

<!--
先把需求講清楚，這是這次練習最重要的一步，因為功能一多，最容易漏掉的就是某個小細節沒串好。
-->

---
layout: default
---

# 練習：員工管理系統
### 任務說明（一）

用 `mat-tab-group`、`mat-table`、`mat-icon`、`mat-datepicker`、`DatePipe`、`JsonPipe`、即時搜尋、`ngClass` 做一個員工管理頁面，需求如下：

1. 定義 `EmployeeData` interface：`id`、`name`、`department`、`hireDate`（`Date`）、`salary`，準備至少 6 筆假資料
2. 用 `mat-tab-group` 建立兩個頁籤：「員工列表」與「已封存員工」

<!--
這個練習把 ch33 到 ch40 全部用上一次：mat-table 負責顯示跟分頁，mat-icon 負責操作按鈕，mat-datepicker 負責日期篩選，DatePipe 負責日期排版，JsonPipe 負責顯示明細，即時搜尋負責姓名過濾，ngClass 負責薪水高亮，Tabs 負責切換「員工列表」跟「已封存員工」兩個視圖。

先定義好資料型別跟假資料，接著用 mat-tab-group 搭出兩個頁籤的骨架，下一頁再看每個頁籤裡實際要放什麼內容。
-->

---
layout: default
---

# 練習：員工管理系統
### 任務說明（二）

3. **員工列表**頁籤：
   - 上方有搜尋框，依姓名**即時搜尋**（`keyup`），以及 `mat-datepicker` 篩選「到職日期起」
   - 表格欄位：ID、姓名、部門、到職日（`DatePipe` 格式化 `yyyy/MM/dd`）、薪水、操作；薪水 `>= 60000` 用 `ngClass` 套上 `salary-high` 高亮 class
   - 操作欄有 `visibility`（檢視，畫面下方用 `JsonPipe` 顯示完整資料）與 `archive_outline`（封存，將該員工移到「已封存員工」頁籤，不是真的刪除）
   - 搭配分頁器，每頁 3 / 5 / 10 筆
4. **已封存員工**頁籤：顯示被封存的員工姓名與部門，每筆有 `restore` icon，點擊後將該員工移回「員工列表」

<!--
員工列表頁籤是這次練習的主體，把搜尋、日期篩選、表格、薪水高亮、檢視、封存全部包在一起。已封存員工頁籤則相對單純，只需要顯示清單跟一個復原按鈕。

大家可以先自己動手做做看，做不出來再往下看畫面預覽跟提示。
-->

---
layout: default
---

# 練習：員工管理系統
### 畫面預覽

<div class="flex flex-col gap-3 mt-2" style="max-width: 560px; margin-left: auto; margin-right: auto;">
  <div class="flex gap-4 justify-center" style="border-bottom: 2px solid #e2e8f0; padding-bottom: 0.4rem;">
    <span style="color: #1a5c5c; font-weight: 700; border-bottom: 2px solid #5eada0; padding-bottom: 0.4rem;">員工列表</span>
    <span style="color: #9ca3af;">已封存員工</span>
  </div>
  <div class="flex gap-2 justify-center">
    <span class="text-xs px-2 py-1 rounded" style="border: 1px solid #e2e8f0;">🔍 搜尋姓名...</span>
    <span class="text-xs px-2 py-1 rounded" style="border: 1px solid #e2e8f0;">📅 到職日期起</span>
  </div>
  <div class="flex justify-between items-center rounded-lg px-4 py-2" style="border: 1px solid #e2e8f0;">
    <span>#3 林大偉・研發部・2020/11/20</span>
    <span class="text-xs font-bold px-2 py-1 rounded" style="background:#fef3c7; color:#92400e;">65000</span>
  </div>
  <div class="flex justify-between items-center rounded-lg px-4 py-2" style="border: 1px solid #e2e8f0;">
    <span>#5 李志豪・業務部・2019/05/05</span>
    <span class="text-xs font-bold px-2 py-1 rounded" style="background:#fef3c7; color:#92400e;">70000</span>
  </div>
  <div class="flex justify-between items-center rounded-lg px-4 py-2" style="border: 1px solid #e2e8f0;">
    <span>#4 張雅婷・人資部・2023/01/10</span>
    <span class="text-xs px-2 py-1">48000</span>
  </div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 65000、70000 兩筆薪水超過門檻，數字底色被 <code>ngClass</code> 套上 <code>salary-high</code> 高亮；封存某筆之後，切到「已封存員工」頁籤就能看到、也能點 restore 復原。
</div>

<!--
大家先看一下完成之後畫面大概長什麼樣子。上方是頁籤，切到「員工列表」會看到搜尋框跟日期篩選欄，表格裡薪水超過門檻的兩筆用了不同底色標示出來，這就是 ngClass 物件語法搭配條件判斷的效果。封存某個員工之後，畫面上這筆資料會從列表消失，改到「已封存員工」頁籤出現，點 restore 又能移回來。
-->

---
layout: default
---

# 練習：員工管理系統
### 解題提示（一）

1. `employees`（在架員工）跟 `archivedEmployees`（已封存員工）是**兩個獨立陣列**，都是「真正的資料來源」；`dataSource.data` 是從 `employees` 篩選後算出來的顯示結果，不要直接對 `dataSource.data` 做增刪（ch33、ch38 重點）
2. 搜尋框跟日期篩選欄**共用同一個 `applyFilters()`** 方法：姓名用 `keyup` 觸發、日期用 `(dateChange)` 觸發，兩個條件都要同時套用在同一次過濾結果上，不能各自覆蓋對方（ch38 重點）
3. 薪水欄位的 `ngClass` 綁在 `<td>` 上，物件語法 `{ 'salary-high': e.salary >= 60000 }`，`salary-high` 這個 class 本身的樣式在 SCSS 定義（ch39 重點）
4. 頁籤用最基本的 `mat-tab-group` + `mat-tab label="..."` 靜態寫法即可，兩個頁籤內容各自獨立，不需要跟路由整合（ch40 重點）

<!--
這幾點是這次練習最容易卡住的地方，我們先看前四點。

⚠️ 第 1 點是最關鍵的設計決定：因為現在有「員工列表」跟「已封存員工」兩個視圖，如果只有一個陣列、靠某個布林值切換顯示，封存跟復原的邏輯會變得很難維護。用兩個獨立陣列各自代表「真正在哪裡」，過濾跟顯示都只是從這兩個陣列「算出來」的結果，這是資料驅動畫面很重要的設計原則。

⚠️ 第 2 點也很多同學會漏掉：姓名搜尋跟日期篩選是兩個不同的輸入來源，但畫面最終只能有一份 dataSource.data，所以一定要把兩個條件寫在同一個方法裡一起套用，不能分開寫兩個各自賦值的方法，不然後寫的會蓋掉先寫的結果。
-->

---
layout: default
---

# 練習：員工管理系統
### 解題提示（二）

5. `archive(employee)` 要同時做兩件事：把該筆從 `employees` 濾掉、再把它加進 `archivedEmployees`；`restore(employee)` 則相反。兩個方法做完都要重新呼叫 `applyFilters()` 讓 `dataSource.data` 保持同步
6. `selectedEmployee` 初始為 `null`，用 `@if (selectedEmployee)` 包住 `<pre>` 區塊（ch37 重點）
7. `mat-datepicker` 記得加 `provideNativeDateAdapter()`；`mat-icon` 名稱要跟 Google Fonts Icons 網站查到的一致（ch34、ch35 重點）

<!--
接續前四點，第 5 點是封存／復原的核心邏輯：archive() 跟 restore() 都要同時處理兩個陣列的增減，並且重新套用過濾條件，缺一步都會讓畫面跟資料狀態不同步。

第 6、7 點是延續 ch37、ch34、ch35 教過的既有重點，這次練習沒有改變寫法，只是提醒大家不要漏掉。
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

# 完整解答 — Interface 與假資料

```typescript
export interface EmployeeData {
  id: number;
  name: string;
  department: string;
  hireDate: Date;
  salary: number;
}
```

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
Interface 跟假資料沿用原本 ch33 到 ch37 練習的設計，hireDate 是 Date 物件，方便搭配 mat-datepicker 跟 DatePipe。這裡故意保留兩筆薪水超過 60000（林大偉 65000、李志豪 70000），等一下 ngClass 高亮的效果才看得出來。
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
CommonModule 是 JsonPipe、DatePipe 這些管道需要的，FormsModule 是 ngModel 雙向綁定需要的（搜尋框跟日期篩選欄都會用到），@if、@for 是 Angular 內建語法不需額外 import。後兩行是 mat-table 系列，跟 ch33 教的一樣。
-->

---

# 完整解答 — TS 匯入模組（二）

```typescript
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
```

<!--
前五個對應 mat-icon（ch34）跟 mat-datepicker（ch35），provideNativeDateAdapter 千萬不能漏。最後多的 MatTabsModule 是這次新增的重點，ch40 教過，忘記匯入的話 `<mat-tab-group>` 會直接報錯。
-->

---

# 完整解答 — Component 設定

```typescript
@Component({
  selector: 'app-employee-management',
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginatorModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatTabsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss',
})
export class EmployeeManagementComponent implements AfterViewInit {
```

<!--
imports 陣列把前面兩頁匯入的模組全部集合起來，一個都不能少，這次比原本的員工資料表多了 MatTabsModule。providers 裡加上 provideNativeDateAdapter()，是 mat-datepicker 能運作的必要設定，跟頁籤沒有關係，仍然要留著。
-->

---

# 完整解答 — Component 屬性

```typescript
  displayedColumns: string[] = ['id', 'name', 'department', 'hireDate', 'salary', 'actions'];

  employees: EmployeeData[] = EMPLOYEE_DATA;
  archivedEmployees: EmployeeData[] = [];
  dataSource = new MatTableDataSource<EmployeeData>(this.employees);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedEmployee: EmployeeData | null = null;
  nameFilter: string = '';
  filterDate: Date | null = null;
  minDate = new Date(Math.min(...EMPLOYEE_DATA.map(e => e.hireDate.getTime())));
  maxDate = new Date();
```

<!--
這是這次練習的核心設計：employees 是目前「在架」的員工，archivedEmployees 是被封存的員工，兩個都是各自的真實資料來源。dataSource.data 之後會依 nameFilter、filterDate 兩個條件從 employees 重新算出來。nameFilter 是這次新增的搜尋關鍵字變數，minDate、maxDate 的算法跟原本一樣，動態取得所有員工最早到職日跟今天。
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
ngAfterViewInit 裡把 paginator 接上 dataSource，這是 ch33 教過的必要步驟，跟原本員工資料表練習完全相同。view() 方法把使用者點的那筆員工存進 selectedEmployee，畫面下方的 JsonPipe 就會顯示這筆資料，這兩個方法都沒有新增內容。
-->

---

# 完整解答 — applyFilters()

```typescript
  applyFilters() {
    let result = this.employees;

    if (this.nameFilter) {
      result = result.filter(e => e.name.indexOf(this.nameFilter) !== -1);
    }
    if (this.filterDate) {
      result = result.filter(e => e.hireDate >= this.filterDate!);
    }

    this.dataSource.data = result;
  }
```

<!--
這是這次整合最關鍵的方法：把即時搜尋跟日期篩選合併成同一個過濾管線。先從 employees 這份完整的「在架員工」資料開始，如果 nameFilter 有值，就用 ch38 教過的 indexOf 判斷姓名有沒有包含關鍵字；如果 filterDate 有值，再用 ch37 練習教過的日期比對，篩出到職日晚於（含等於）filterDate 的員工。兩個條件都是「有值才篩選」，可以同時套用、也可以只套用其中一個，最後才把結果指派給 dataSource.data。

⚠️ 這裡故意不寫成兩個各自獨立、互相覆蓋的方法，而是統一由 applyFilters() 一次處理完，這樣不管使用者是先打字搜尋還是先選日期，兩個條件都會同時生效，不會有「選了日期之後搜尋失效」這種問題。
-->

---

# 完整解答 — archive() 與 restore()

```typescript
  archive(employee: EmployeeData) {
    this.employees = this.employees.filter(e => e.id !== employee.id);
    this.archivedEmployees = [...this.archivedEmployees, employee];
    this.applyFilters();
  }

  restore(employee: EmployeeData) {
    this.archivedEmployees = this.archivedEmployees.filter(e => e.id !== employee.id);
    this.employees = [...this.employees, employee];
    this.applyFilters();
  }
}
```

<!--
archive() 把該筆員工從 employees 濾掉，同時用展開運算子把它加進 archivedEmployees，最後呼叫 applyFilters() 讓「員工列表」頁籤的表格重新算出正確的顯示內容。restore() 的邏輯完全相反：從 archivedEmployees 濾掉，加回 employees，一樣要呼叫 applyFilters()。

⚠️ 大家可以對照一下，跟原本員工資料表練習的 remove() 相比，這裡多了「移到另一個陣列」這一步，而不是單純丟棄。兩個方法結尾都呼叫 applyFilters()，是因為封存或復原都可能影響到目前搜尋、篩選之後應該顯示的結果，這一步不能省略。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 完整解答：HTML

<!--
TypeScript 準備好了，接下來看 HTML 這一側，會照順序看過頁籤外層、搜尋列與篩選欄、表格欄位、已封存員工頁籤。
-->

---

# 完整解答 — 頁籤外層

```html
<mat-tab-group>
  <mat-tab label="員工列表">
    <div class="tab-content">
      <!-- 搜尋列、表格都放在這裡，下一頁繼續 -->
    </div>
  </mat-tab>

  <mat-tab label="已封存員工">
    <div class="tab-content">
      <!-- 已封存清單放在這裡 -->
    </div>
  </mat-tab>
</mat-tab-group>
```

<!--
這是 ch40 教過的 mat-tab-group 最基本靜態寫法：用 mat-tab-group 包住兩個 mat-tab，各自的 label 屬性就是頁籤標題。因為這兩個頁籤內容都是固定在同一個元件裡切換，不需要跟路由整合，所以不用 mat-tab-nav-bar，用最簡單的 mat-tab-group 就夠了。

接下來兩頁，我們把「員工列表」頁籤裡的內容補齊。
-->

---

# 完整解答 — 搜尋列與日期篩選欄

```html
<div class="filters">
  <mat-form-field>
    <mat-label>搜尋姓名</mat-label>
    <input matInput
           [(ngModel)]="nameFilter"
           (keyup)="applyFilters()"
           placeholder="輸入姓名關鍵字...">
  </mat-form-field>

  <mat-form-field>
    <mat-label>到職日期起</mat-label>
    <input matInput [matDatepicker]="picker"
           [min]="minDate" [max]="maxDate"
           [(ngModel)]="filterDate"
           (dateChange)="applyFilters()">
    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker></mat-datepicker>
  </mat-form-field>
</div>
```

<!--
搜尋框用的是 ch38 教過的寫法：(keyup) 觸發過濾、[(ngModel)] 保存輸入值，跟原本用 (input) 不同，(keyup) 對中文輸入法比較穩定。日期篩選欄沿用 ch35、ch37 教過的 mat-datepicker 結構，min、max 綁的是 TS 裡動態算出來的 Date 物件。

⚠️ 兩個輸入元件都呼叫同一個 applyFilters()，這是刻意的設計，跟上一段 TypeScript 提到的「合併過濾管線」互相呼應——不管使用者先動哪一個輸入框，觸發的都是同一個會同時考慮兩個條件的方法。
-->

---

# 完整解答 — Table 欄位（一）

```html
<div class="mat-elevation-z8">
  <table mat-table [dataSource]="dataSource">

    <ng-container matColumnDef="id">
      <th mat-header-cell *matHeaderCellDef> ID </th>
      <td mat-cell *matCellDef="let e"> {{e.id}} </td>
    </ng-container>

    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> 姓名 </th>
      <td mat-cell *matCellDef="let e"> {{e.name}} </td>
    </ng-container>

    <ng-container matColumnDef="department">
      <th mat-header-cell *matHeaderCellDef> 部門 </th>
      <td mat-cell *matCellDef="let e"> {{e.department}} </td>
    </ng-container>
```

<!--
表格外層跟前三欄的寫法跟 ch33、ch37 練習完全一樣，id、name、department 都是單純的內嵌繫結，沒有新增任何邏輯。
-->

---

# 完整解答 — Table 欄位（二）— 薪水高亮

```html
    <ng-container matColumnDef="hireDate">
      <th mat-header-cell *matHeaderCellDef> 到職日 </th>
      <td mat-cell *matCellDef="let e"> {{e.hireDate | date: 'yyyy/MM/dd'}} </td>
    </ng-container>

    <ng-container matColumnDef="salary">
      <th mat-header-cell *matHeaderCellDef> 薪水 </th>
      <td mat-cell *matCellDef="let e" [ngClass]="{ 'salary-high': e.salary >= 60000 }">
        {{e.salary}}
      </td>
    </ng-container>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>[ngClass]</code> 綁在 <code>&lt;td&gt;</code> 上，用的是 ch39 教過的物件條件語法，<code>e</code> 是 <code>*matCellDef="let e"</code> 帶出來的這一列資料，跟其他欄位共用同一個變數。
</div>

<!--
hireDate 欄還是 ch36 教過的 DatePipe 用法，把 Date 物件排版成 yyyy/MM/dd。重點在 salary 欄的 <td>，這裡多綁了 [ngClass]="{ 'salary-high': e.salary >= 60000 }"，就是 ch39 教過的物件條件語法：e.salary 大於等於 60000 這個條件成立時，套上 salary-high 這個 class，樣式會在等一下的 SCSS 那一段定義。

⚠️ 提醒大家，ngClass 綁在哪個標籤上，就是哪個標籤會被加 class，這裡是綁在 <td> 本身，所以高亮效果只會出現在薪水那一格，不會影響整列。
-->

---

# 完整解答 — Table 欄位（三）— 操作按鈕與收尾

```html
    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef> 操作 </th>
      <td mat-cell *matCellDef="let e">
        <mat-icon (click)="view(e)">visibility</mat-icon>
        <mat-icon (click)="archive(e)">archive</mat-icon>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>

  <mat-paginator [pageSizeOptions]="[3, 5, 10]" showFirstLastButtons></mat-paginator>
</div>

@if (selectedEmployee) {
  <pre>{{ selectedEmployee | json }}</pre>
}
```

<!--
操作欄跟原本員工資料表練習的差異，是把 delete icon 換成 archive icon，呼叫的方法也從 remove() 換成 archive()，行為上不是刪除、而是移到另一個頁籤。tr、mat-paginator、@if 搭配 JsonPipe 這幾段都沿用 ch33、ch37 教過的寫法，沒有變動。

到這裡「員工列表」頁籤的內容就結束了，下一頁我們看「已封存員工」頁籤要放什麼。
-->

---

# 完整解答 — 已封存員工頁籤

```html
<mat-tab label="已封存員工">
  <div class="tab-content">
    <ul class="archived-list">
      @for (e of archivedEmployees; track e.id) {
        <li>
          <span>{{e.name}}・{{e.department}}</span>
          <mat-icon (click)="restore(e)">restore</mat-icon>
        </li>
      } @empty {
        <p>目前沒有已封存的員工</p>
      }
    </ul>
  </div>
</mat-tab>
```

<!--
已封存員工這個頁籤沒有用 mat-table，只用簡單的 @for 迴圈跑過 archivedEmployees，每筆顯示姓名跟部門，旁邊放一個 restore 的 mat-icon，點擊呼叫 TS 的 restore() 方法，把該筆資料移回 employees。

@for 搭配 @empty 是 ch26 就教過的語法，archivedEmployees 一開始是空陣列，@empty 區塊會顯示提示文字，等到有員工被封存之後才會換成清單。這一頁刻意示範「同樣的資料操作，不一定要每次都用 mat-table」，簡單的清單搭配 @for 加 mat-icon 就足夠了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 完整解答：SCSS

<!--
最後補上讓畫面看起來正確的樣式，重點是薪水高亮跟頁籤內容的排版。
-->

---

# 完整解答 — SCSS

```scss
.tab-content {
  padding: 1rem 0;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.salary-high {
  background: #fef3c7;
  color: #92400e;
  font-weight: 700;
}

.archived-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.archived-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.6rem 1rem;
}
```

<!--
ngClass 只負責「加不加這個 class」，class 實際長怎樣還是要靠 CSS 定義，這是 ch39 就強調過的分工。.salary-high 給薪水欄位一個黃底深字的高亮效果，跟畫面預覽那張投影片看到的一致。.filters 讓搜尋框跟日期篩選欄並排顯示，.archived-list 系列則是已封存清單的排版，讓它看起來像一份清爽的名單，而不是瀏覽器預設的項目符號。

到這裡整個綜合練習的完整解答就講完了，大家可以對照自己寫的版本，看看 Tabs、搜尋、篩選、ngClass、封存／復原這五個部分有沒有都串起來。
-->

---
layout: end
---

# 課程結束
### 把 mat-table、mat-icon、mat-datepicker、DatePipe、JsonPipe、即時搜尋、ngClass、Tabs 八個主題整合成一個真實可用的頁面

<!--
這一章的練習到這裡就結束了。我們把 ch33 到 ch40 的八個主題全部組裝在一起：頁籤切換兩個視圖，列表裡有即時搜尋、日期篩選、薪水高亮，操作欄能檢視明細、封存、復原，資料狀態用兩個獨立陣列清楚管理。

業界實務上的頁面很少只用單一技巧，通常都是這樣把好幾個功能疊在一起。如果大家能獨立做完這個練習，代表這幾章的內容已經真正吸收，不只是看得懂投影片而已。恭喜大家完成這一階段的學習。
-->
