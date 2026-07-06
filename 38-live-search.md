---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 即時搜尋
routeAlias: ch38
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

<!--
大家好，這一章我們要一起做一個很有成就感的功能——即時搜尋。

我們平常用購物網站或通訊錄的時候，只要在搜尋框打字，下面的清單就會馬上跟著篩選，完全不用按送出按鈕。這種體驗其實靠的就是 `<input>` 標籤的事件屬性，搭配我們前面學過的 mat-table，就能自己做出這樣的效果。

學完這一章，大家會知道怎麼監聽輸入框的按鍵事件、怎麼把輸入值即時套用到表格的資料來源上，做出一個真正能用的即時搜尋功能。
-->

---
layout: default
---

# Outline

- **即時搜尋概念** — 搜尋框與 `(input)` / `(keyup)` 事件的用途
- **建立資料表格** — 以 mat-table 與 ELEMENT_DATA 為基礎
- **搜尋框 HTML** — 使用 `(keyup)` 綁定事件，搭配 `[(ngModel)]` 雙向繫結
- **取得輸入值** — 透過 `$event` 與 `event.target.value` 讀取使用者輸入
- **過濾邏輯** — 用 `forEach` + `indexOf` 即時更新 `dataSource.data`

<!--
這張投影片先讓大家看一下今天的完整路線：我們會先講即時搜尋的概念跟事件選擇，接著準備一個 mat-table 當作示範用的資料表格，然後在搜尋框寫好事件繫結，學怎麼從按鍵事件裡拿到使用者輸入的內容，最後把這些輸入拿去過濾資料、更新表格顯示，一步一步把整個功能兜起來。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 即時搜尋概念
# Live Search Concept

<!--
大家先想像一個情境：如果一個表格有幾百筆資料，使用者想找某一筆，得自己滑到底慢慢找，體驗會很差。如果能打幾個字就自動篩選出想要的資料，使用起來就順手很多，這就是即時搜尋要解決的問題。接下來我們就來看看怎麼做到這件事。
-->

---

# 即時搜尋

搜尋框的即時搜尋功能，利用 `<input>` 標籤的事件屬性，根據使用者輸入的內容動態更新畫面顯示的資料列。

**實作思路**

1. 建立含資料的 mat-table
2. 在表格上方放置搜尋框
3. 每次按鍵時觸發過濾方法
4. 將符合條件的資料寫回 `dataSource.data`

<!--
即時搜尋的核心概念其實不複雜，就是利用 `<input>` 標籤本身就有的事件屬性，只要使用者一打字，就馬上呼叫我們寫好的方法，去篩選資料、更新畫面。

大家可以照著這四個步驟來理解等一下的流程：先有一個裝了資料的表格，然後在上面放一個搜尋框，接著每次按鍵都會觸發一個過濾方法，這個方法會把符合條件的資料重新寫回表格的 `dataSource.data`，畫面就會自動更新。這四步環環相扣，等一下我們會一步一步實作出來。
-->

---

# 即時搜尋
### `(input)` vs `(keyup)`

| 事件 | 說明 |
|------|------|
| `(input)` | 值變動即觸發，輸入中文時可能不會即時更新 |
| `(keyup)` | 按鍵放開時觸發，中文輸入更穩定 |

建議使用 `(keyup)` 以避免中文輸入法的相容問題。

<!--
這裡有個很重要的選擇：到底要用 `(input)` 還是 `(keyup)` 事件？

`(input)` 事件是值一有變動就觸發，聽起來很即時，但大家如果用中文輸入法打字，會先經過「選字」的過程，這時候 `(input)` 事件的觸發時機可能會跟輸入法的組字狀態打架，導致畫面沒有即時更新或更新錯誤。

`(keyup)` 則是每次放開按鍵才觸發，時機比較單純、穩定，尤其是中文輸入環境下的相容性比較好。

⚠️ 這是同學實作時很容易忽略的細節，如果教材或範例只用英文測試，可能感覺不出差異，但正式上線後遇到中文輸入就會出問題，所以我們建議統一使用 `(keyup)`。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 建立資料表格
# Set Up the Data Table

<!--
在做搜尋功能之前，我們得先有東西可以搜。接下來這張投影片就是準備一個示範用的 mat-table，讓大家等一下可以在上面練習套用搜尋邏輯。
-->

---

# 建立資料表格

以 mat-table 為基礎，事先準備好 `ELEMENT_DATA` 假資料與 `dataSource`：

<div class="flex justify-center">
  <img src="/images/37-live-search/mat-table-element-data-preview.png" class="rounded shadow-md max-h-80" />
</div>

表格包含 No.、Name、Weight、Symbol 四個欄位，共 12 筆元素資料，分頁顯示每頁 5 筆。

<!--
這張範例的目的是先讓大家有一個可以操作的表格。我們沿用之前教過的 mat-table，準備了一份化學元素的假資料 `ELEMENT_DATA`，一共十筆，包含編號、名稱、重量、符號四個欄位，並且設定每頁顯示五筆做分頁。

大家可以看到畫面上的表格跟我們之前 mat-table 章節做的長得很像，這是刻意的，因為即時搜尋本來就是建立在既有的表格功能之上，等一下我們只是在上面「加裝」一個搜尋框而已，不需要重新設計整個表格。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 搜尋框 HTML
# Search Input HTML

<!--
表格準備好了，接下來就是真正的重點——在表格上方加一個搜尋框，並且把它跟我們的過濾方法接起來。
-->

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

<!--
這段範例的目的是把搜尋框跟過濾邏輯串起來。大家可以看到 `<input>` 標籤上同時掛了兩個東西：一個是 `(keyup)` 事件繫結，呼叫我們待會會寫的 `changeData()` 方法；另一個是 `[(ngModel)]` 雙向繫結，把輸入的文字同步存到 `inputData` 這個變數。

之所以兩個一起用，是因為 `(keyup)` 負責「觸發時機」，`[(ngModel)]` 負責「保存輸入值」，等一下我們寫過濾邏輯的時候，這兩種取值方式都會用到。

⚠️ 提醒大家再次注意，這裡用的是 `(keyup)` 不是 `(input)`，原因就是前面講的中文輸入相容性問題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 取得輸入值
# Reading the Input Value

<!--
搜尋框接好了事件，接下來要解決的是：在 `changeData()` 方法裡，到底要怎麼拿到使用者剛剛打的字？這裡有兩種做法，我們一起來看看。
-->

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

<!--
這段範例的目的是示範兩種拿到輸入值的方式，讓大家知道兩者的差別在哪裡。

方法一是直接從 `$event` 這個原生事件物件下手，因為 TypeScript 不知道 `event.target` 實際上是哪種 HTML 元素，所以要用 `as HTMLInputElement` 做型別斷言，才能安全地讀到 `.value`。

方法二則是借助我們前面繫結好的 `[(ngModel)]`，因為雙向繫結的關係，`inputData` 這個變數在使用者打字的當下就已經自動同步好了，我們直接讀 `this.inputData` 就可以，完全不用碰 `$event`。

⚠️ 同學常見的誤會是以為 `event.target.value` 可以直接用，其實 TypeScript 型別檢查會擋下來，一定要記得加上型別斷言。兩種方法擇一使用即可，接下來的範例我們會用方法一來示範完整的過濾邏輯。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 過濾邏輯
# Filter Logic

<!--
最後一塊拼圖來了：拿到輸入值之後，要怎麼真正去篩選資料、把結果顯示回表格？這就是即時搜尋最核心的邏輯。
-->

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

<!--
這段範例的目的是把前面學到的東西整合成真正可以運作的搜尋功能。大家帶著我一起看一下邏輯：我們先準備一個空陣列 `tidyData` 用來裝篩選後的結果，然後用 `forEach` 把原始的 `ELEMENT_DATA` 一筆一筆檢查過去，用 `indexOf` 判斷這一筆的 `name` 欄位裡有沒有包含使用者輸入的字串，如果有（也就是 `indexOf` 不等於 -1），就把這筆資料放進 `tidyData`。

全部檢查完之後，最後一行 `this.dataSource.data = tidyData` 才是真正讓畫面更新的關鍵，因為 mat-table 是靠 `dataSource.data` 的變化來重新渲染的。

⚠️ 這裡要特別注意，我們自始至終都沒有動到 `ELEMENT_DATA` 本身，每次搜尋都是從完整的原始資料重新篩選一次，這樣才不會發生資料越搜尋越少、清空後找不回來的問題。執行結果就是，大家打字的當下，表格會即時只留下名稱包含輸入字串的元素。
-->

---

# 完整 TypeScript 範例（一）
### import 與型別定義

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}
```

<!--
這四張投影片的目的，是把剛剛拆開講解的片段組合成一份完整的元件程式碼，讓大家可以對照著自己專案裡的檔案檢查。這裡刻意把完整內容都列出來，不用 `// ... 更多資料` 或 `{ /* ... */ }` 這種省略寫法，是因為同學實作時常常直接照抄投影片，省略寫法照抄出來的程式碼會編譯不過或缺少必要的 import。

這張先看 import 跟型別定義：`MatTableDataSource`、`MatPaginator` 是等一下會用到的類別，`FormsModule`、`MatTableModule`、`MatPaginatorModule`、`MatFormFieldModule`、`MatInputModule` 則是元件 `imports` 陣列需要註冊的模組，一次列在最前面，後面幾張就不用再重複 import。`PeriodicElement` 這個 interface 描述每一筆資料要有 position、name、weight、symbol 四個屬性。
-->

---

# 完整 TypeScript 範例（二）
### ELEMENT_DATA 假資料

```typescript
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1,  name: 'Hydrogen',  weight: 1.0079,  symbol: 'H'  },
  { position: 2,  name: 'Helium',    weight: 4.0026,  symbol: 'He' },
  { position: 3,  name: 'Lithium',   weight: 6.941,   symbol: 'Li' },
  { position: 4,  name: 'Beryllium', weight: 9.0122,  symbol: 'Be' },
  { position: 5,  name: 'Boron',     weight: 10.811,  symbol: 'B'  },
  { position: 6,  name: 'Carbon',    weight: 12.0107, symbol: 'C'  },
  { position: 7,  name: 'Nitrogen',  weight: 14.0067, symbol: 'N'  },
  { position: 8,  name: 'Oxygen',    weight: 15.9994, symbol: 'O'  },
  { position: 9,  name: 'Fluorine',  weight: 18.9984, symbol: 'F'  },
  { position: 10, name: 'Neon',      weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium',    weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305,  symbol: 'Mg' }
];
```

<!--
接著宣告 `ELEMENT_DATA` 這份原始假資料，一共 12 筆元素。這部分其實跟我們之前 mat-table 章節看到的一模一樣，沒有新增任何跟搜尋相關的東西，等一下搜尋功能就是從這份資料裡篩選。
-->

---

# 完整 TypeScript 範例（三）
### @Component 設定

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
```

<!--
這張是元件的 `@Component` 設定，用到的模組都已經在範例（一）匯入好了。因為用 `[(ngModel)]`，一定要註冊 `FormsModule`，這是同學最常漏掉的一步；其餘的 `MatTableModule`、`MatPaginatorModule`、`MatFormFieldModule`、`MatInputModule` 則是 mat-table 跟搜尋框需要的模組。
-->

---

# 完整 TypeScript 範例（四）
### 類別內容（一）— 屬性與 ngAfterViewInit

```typescript
export class AppComponent implements AfterViewInit {
  inputData: string = '';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
```

<!--
這是今天真正的重點所在，先看類別的前半段。`inputData`、`displayedColumns`、`dataSource` 三個屬性，`dataSource` 一開始是用完整的 `ELEMENT_DATA` 建立的，`ngAfterViewInit()` 裡把分頁器接上表格，這些都是既有的 mat-table 設定，還沒碰到搜尋邏輯。
-->

---

# 完整 TypeScript 範例（五）
### 類別內容（二）— changeData 方法

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
}
```

<!--
這裡接續上一張的類別，收尾的 `}` 是類別本身的結尾。真正新增的就是 `changeData()` 這個方法，也就是我們剛剛一步一步拆解過的過濾邏輯，現在放回完整的元件裡，大家可以看到它跟 `inputData`、`dataSource` 之間是怎麼配合運作的。

大家可以拿這份完整程式碼對照自己專案裡寫的內容，看看有沒有哪個環節漏掉，例如忘記加 `FormsModule`（`[(ngModel)]` 需要用到）或是忘記把事件換成 `(keyup)`。
-->

---

# 完整 HTML 範例（一）
### 搜尋框

搭配上面的元件，`app.component.html` 完整內容如下：

```html
<input
  matInput
  (keyup)="changeData($event)"
  [(ngModel)]="inputData"
  placeholder="搜尋元素名稱..." />
```

<!--
這三張投影片補上完整的 `app.component.html`，讓大家可以跟前面幾張 TypeScript 對照著看，一樣不省略任何一段，避免同學照抄後編譯不過。

這張是搜尋框本身：`matInput` 讓輸入框套用 Material 樣式，`(keyup)` 綁定我們寫好的 `changeData()`，`[(ngModel)]` 則雙向繫結 `inputData`，這兩個事件繫結是即時搜尋能運作的關鍵。
-->

---

# 完整 HTML 範例（二）
### 表格欄位定義

```html
<table mat-table [dataSource]="dataSource">

  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef>No.</th>
    <td mat-cell *matCellDef="let element">{{ element.position }}</td>
  </ng-container>

  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef>Name</th>
    <td mat-cell *matCellDef="let element">{{ element.name }}</td>
  </ng-container>

  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef>Weight</th>
    <td mat-cell *matCellDef="let element">{{ element.weight }}</td>
  </ng-container>

  <ng-container matColumnDef="symbol">
    <th mat-header-cell *matHeaderCellDef>Symbol</th>
    <td mat-cell *matCellDef="let element">{{ element.symbol }}</td>
  </ng-container>
```

<!--
這張是 `<table mat-table>` 裡四組 `matColumnDef`，分別對應 position、name、weight、symbol 四個欄位，跟我們之前 mat-table 章節寫法完全一樣，即時搜尋沒有改動這一段。
-->

---

# 完整 HTML 範例（三）
### 表頭列、資料列與分頁器

```html
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

</table>

<mat-paginator [pageSizeOptions]="[5, 10]"></mat-paginator>
```

<!--
最後這張收尾：`matHeaderRowDef` 跟 `matRowDef` 都吃 `displayedColumns` 這個陣列，決定欄位跟順序；`<mat-paginator>` 負責分頁，記得要在 `ngAfterViewInit()` 把它跟 `dataSource.paginator` 接起來，不然分頁器不會生效。

⚠️ 提醒大家，`matColumnDef` 的名稱、`displayedColumns` 陣列裡的字串、還有資料物件的屬性名稱，這三者一定要完全一致，這是我們在 mat-table 章節就強調過的重點，即時搜尋也不例外。
-->

---
layout: end
---

# 課程結束
### 善用 `(keyup)` 事件與 `indexOf` 過濾，即可為 mat-table 加入流暢的即時搜尋功能

<!--
今天我們從頭到尾做出了一個完整的即時搜尋功能，大家應該對整個流程都有感覺了：搜尋框監聽 `(keyup)` 事件，取得輸入值後用 `forEach` 加 `indexOf` 去篩選原始資料，最後把結果寫回 `dataSource.data` 讓表格自動更新。

這個技巧不只限於元素週期表這種範例，大家以後遇到任何清單、表格需要搜尋功能，都可以套用同樣的思路。小提醒大家可以自己動手試試看，如果想要搜尋條件更精準，例如不分大小寫比對，或是同時比對多個欄位，可以怎麼修改 `changeData()` 這個方法？
-->

