---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Dialog
routeAlias: ch43
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
    Dialog
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「以對話框提示使用者執行特定操作或確認重要訊息」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們來學 Angular Material 的 Dialog（對話框）。

想像一下，我們常常需要在使用者做出重要操作前跳出一個提醒視窗，例如按下刪除按鈕時跳出「確定要刪除嗎？」的確認框，或是需要使用者填寫一小段資料再送出。如果每次都要自己刻一個蓋在畫面上的浮層，還要處理定位、遮罩、關閉邏輯，會花很多力氣。Dialog 就是 Angular Material 幫我們把這一整套都包好的元件。

學完這一章，大家會知道怎麼建立一個 Dialog 元件、怎麼從主元件開啟它、怎麼傳資料進去、以及怎麼在關閉時把使用者填的資料回傳出來。
-->

---
layout: default
---

# Outline

- **Dialog 概念介紹**
- **Dialog 元件 HTML 結構**
- **Dialog 元件 TypeScript**
- **開啟 Dialog（呼叫端）**
- **設定 Dialog 尺寸**
- **實作練習**

<!--
這張投影片先讓大家看一下整章的架構：先介紹 Dialog 的概念跟使用情境，接著會拆成三塊來看——Dialog 元件的 HTML 結構、TypeScript 邏輯、還有呼叫端要怎麼開啟它，最後補充怎麼設定 Dialog 的尺寸，再讓大家實作練習一次。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Dialog 概念介紹

<!--
我們先花一點時間了解 Dialog 到底是什麼、什麼時候會用到它，之後再進去看實際的程式碼要怎麼寫。
-->

---

# Dialog 是什麼？

Dialog（對話框）用來提醒使用者執行特定操作，或顯示重要的提示訊息。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**常見使用情境**

- 顯示確認訊息（如「確定刪除？」）
- 收集使用者輸入（如輸入框、選項）
- 展示警告或通知內容

</div>
<div>

**Angular Material 提供**

- `MatDialog` 服務：用於開啟對話框
- `MatDialogRef`：用於控制對話框（關閉、回傳資料）
- `MAT_DIALOG_DATA`：注入外部傳入的資料

</div>
</div>

<img src="/images/42-dialog/dialog-overview-example.png" class="rounded shadow-md max-h-80 mx-auto mt-2" />

<!--
簡單來說，Dialog 就是一個蓋在畫面最上層、要求使用者先處理完才能繼續操作的視窗。常見情境像是確認刪除、收集使用者輸入的小表單、或是純粹顯示一段警告訊息。

Angular Material 幫我們準備了三個核心工具：MatDialog 服務負責開啟對話框、MatDialogRef 讓我們可以控制這個對話框（例如關閉它、拿到回傳值）、MAT_DIALOG_DATA 則是用來把外部的資料傳進 Dialog 元件裡面。這三個名稱大家先有印象，等一下每一個都會實際用到。
-->

---

# Dialog 的兩種用途

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**單純顯示提示內容**

Dialog 可僅顯示標題與訊息，搭配一個確認按鈕。

<img src="/images/42-dialog/dialog-simple-alert.png" class="rounded shadow-md max-h-52 mt-2" />

</div>
<div>

**包含輸入框或選項**

Dialog 內可放置輸入框（`mat-form-field`）或勾選框，供使用者填寫後回傳。

<img src="/images/42-dialog/dialog-with-input.png" class="rounded shadow-md max-h-52 mt-2" />

</div>
</div>

<!--
Dialog 大致可以分成兩種用途：一種是單純顯示提示內容，像是「操作成功」這種通知，通常只有標題、訊息跟一個確認按鈕；另一種則是裡面放了輸入框或勾選框，讓使用者填完資料後再送出去，這種就會需要把使用者輸入的東西回傳給呼叫端。

大家接下來看到的範例會以「包含輸入框」這種比較完整的情境為主，因為學會這個之後，單純顯示訊息的版本自然也就會了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Dialog 元件 HTML 結構

<!--
接下來我們來看 Dialog 元件的 HTML 檔要怎麼寫，Angular Material 有規定幾個固定的指令跟標籤要使用。
-->

---

# Dialog HTML 結構

Dialog 的畫面由一個獨立的 Angular 元件（Component）提供，需使用 Angular Material 提供的三個指令來定義區塊。

| 指令 / 選擇器 | 用途 |
| --- | --- |
| `mat-dialog-title` | 標記對話框標題（屬性形式，加在 `h2` 上） |
| `<mat-dialog-content>` | 對話框的主要內容區域 |
| `<mat-dialog-actions>` | 對話框底部的操作按鈕區域 |

<!--
Dialog 的畫面其實就是一個普通的 Angular 元件，只是要照 Angular Material 的規定，把內容分成三塊：mat-dialog-title 用來標記標題，通常直接加在 h2 標籤上；mat-dialog-content 包住主要內容；mat-dialog-actions 放底部的按鈕，例如取消跟確定。

大家可以把這三個想成是「蓋房子的固定隔間」，標題、內容、按鈕各自有各自的位置，Angular Material 會依照這個結構套用它的樣式。
-->

---

# Dialog HTML 結構 — 範例

```html
<!-- dialog 元件的 HTML 檔案 -->
<h2 mat-dialog-title>標題</h2>

<!-- dialog 內容 -->
<mat-dialog-content>
  <p>訊息</p>
</mat-dialog-content>

<!-- dialog 按鈕 -->
<mat-dialog-actions>
  <button>取消</button>
  <button>確定</button>
</mat-dialog-actions>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>mat-dialog-title</code> 為 HTML 屬性（Attribute Directive），套用在現有標籤上；<code>mat-dialog-content</code> 與 <code>mat-dialog-actions</code> 為元素（Element Directive）。
</div>

<!--
我們直接來看一個完整的 Dialog HTML 範例。大家可以看到 h2 上面加了 mat-dialog-title 屬性，接著用 mat-dialog-content 包住訊息文字，最後 mat-dialog-actions 放了取消跟確定兩個按鈕。

⚠️ 這裡有一個容易搞混的地方要特別提醒大家：mat-dialog-title 是「屬性」，要加在已經存在的標籤上（像 h2）；但 mat-dialog-content 跟 mat-dialog-actions 是「元素」，本身就是一個標籤，不能直接當屬性寫在別的標籤上，這點寫錯的話畫面會跑掉。

執行起來的預期結果，就是一個有標題、內容、跟底部按鈕排版整齊的對話框。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Dialog 元件 TypeScript

<!--
HTML 結構搞定之後，接下來我們來看 Dialog 元件的 TypeScript 要怎麼寫，包含要匯入哪些東西、怎麼拿到傳入的資料、怎麼關閉對話框。
-->

---

# Dialog 元件 TS — 匯入模組（一）

Dialog 元件需匯入所需的 Angular Material 模組與核心 API。

```typescript
import { FormsModule } from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
```

<!--
我們先來看 Dialog 元件的 TypeScript 檔案開頭要匯入哪些東西。除了 FormsModule 用來處理輸入框的雙向綁定，重點是從 @angular/material/dialog 這個路徑匯入 MatDialogTitle、MatDialogContent、MatDialogActions 這三個對應 HTML 裡用到的指令，還有等一下會用到的 MatDialogRef 跟 MAT_DIALOG_DATA。

⚠️ 提醒大家，因為現在 Dialog 元件是 standalone 元件，HTML 裡用到的每一個 Material 指令，都要記得在這裡匯入，不然畫面會顯示不出來或報錯。
-->

---

# Dialog 元件 TS — 匯入模組（二）

在 `@Component` 裝飾器的 `imports` 陣列中宣告所使用的模組。

```typescript
@Component({
  selector: 'dialog-example',
  templateUrl: './dialog.html',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
})
export class DialogExample {
  // 類別內容見下頁
}
```

<!--
匯入之後，我們要在 @Component 裝飾器的 imports 陣列裡，把剛剛匯入的模組再宣告一次。這一步跟我們之前學的 standalone 元件用法是一樣的邏輯：匯入之後，還要告訴這個元件「我要用你」。

大家可以留意，這裡的 imports 陣列跟一般元件沒什麼不同，只是內容換成了 Dialog 相關的指令而已，概念上大家應該不陌生。
-->

---

# Dialog 元件 TS — 注入 DialogRef 與 Data

`MatDialogRef` 用於控制對話框本身（如關閉）；`MAT_DIALOG_DATA` 用於接收開啟時傳入的資料。

```typescript
export class DialogExample {
  readonly dialogRef = inject(MatDialogRef<DialogExample>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
}
```

| 注入項目 | 說明 |
| --- | --- |
| `MatDialogRef<T>` | 代表當前對話框的參考，可呼叫 `close()` 關閉並回傳資料 |
| `MAT_DIALOG_DATA` | 接收呼叫端透過 `open()` 傳入的 `data` 物件 |

<!--
這一頁是這一章的關鍵：Dialog 元件裡怎麼拿到「控制自己的能力」跟「外面傳進來的資料」。

用 inject(MatDialogRef) 拿到的這個物件，可以想成是 Dialog 手上握著一支「遙控器」，可以控制自己何時關閉；而 inject(MAT_DIALOG_DATA) 拿到的，就是呼叫端在開啟 Dialog 時塞進來的資料，等一下我們會看到呼叫端是怎麼傳的。

⚠️ 這裡 MAT_DIALOG_DATA 用的是 inject 搭配一個 token，不是像一般 service 那樣直接用類別名稱注入，這是它比較特別的地方，大家要記得寫法不太一樣。
-->

---

# Dialog 元件 TS — 關閉對話框

呼叫 `dialogRef.close()` 關閉對話框，並可在括號內傳入回傳資料。

```typescript
onNoClick(): void {
  const returnData = ['ada', 'adadas'];
  this.dialogRef.close(returnData);
}
```

| 方法 | 說明 |
| --- | --- |
| `dialogRef.close()` | 關閉對話框，不回傳任何值 |
| `dialogRef.close(value)` | 關閉對話框並回傳指定資料給呼叫端 |

<!--
這裡示範的是使用者按下按鈕、Dialog 要關閉的情境。呼叫 this.dialogRef.close() 就會把對話框關掉，如果括號裡有帶資料，這個資料就會傳回給開啟 Dialog 的那個元件。

大家可以把 dialogRef.close(returnData) 想成是「填完表單投進信箱」，Dialog 關閉的同時，也把使用者填的內容一起寄回去給呼叫端，等一下我們會看到呼叫端怎麼收這封信。

⚠️ 提醒大家，如果只是單純想關閉、不需要回傳資料，直接呼叫 close() 不帶參數就可以了，不用勉強塞東西進去。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 開啟 Dialog（呼叫端）

<!--
Dialog 元件本身寫完了，接下來我們換個角度，來看「呼叫端」——也就是要開啟這個對話框的那個元件——該怎麼寫。
-->

---

# 開啟 Dialog — 注入 MatDialog

在需要開啟對話框的元件（呼叫端）注入 `MatDialog` 服務。

```typescript
import { MatDialog } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { DialogExample } from './dialog-example';

@Component({ ... })
export class AppComponent {
  readonly dialog = inject(MatDialog);
}
```

<!--
要開啟 Dialog，呼叫端的元件必須先注入 MatDialog 這個服務，這一步跟我們之前注入其他 service 的寫法完全一樣，用 inject(MatDialog) 就可以拿到它。

有了這個 dialog 物件之後，等一下我們就可以呼叫它的 open() 方法來真正打開對話框，這一頁大家先記得「要開 Dialog，第一步一定是先注入 MatDialog」。
-->

---

# 開啟 Dialog — 呼叫 open()（一）

使用 `dialog.open()` 開啟對話框，第一個參數為 Dialog 元件類別，第二個參數為設定物件。

```typescript
showDialog() {
  // 開啟 dialog，open() 第一個參數放 Dialog 元件類別
  // 第二個參數放設定物件，data 為傳入 Dialog 的資料
  const dialogRef = this.dialog.open(DialogExample, {
    data: { name: 'name', animal: 'title' },
  });
}
```

<!--
這裡帶大家看 dialog.open() 這個方法怎麼呼叫。第一個參數放的是我們要開啟的 Dialog 元件類別，也就是剛剛寫的 DialogExample；第二個參數是一個設定物件，這裡的 data 屬性放的內容，就會傳到 Dialog 元件裡用 MAT_DIALOG_DATA 拿到。

大家可以把這步想成「寄快遞」：open() 的第一個參數決定要送去哪個 Dialog（收件地址），第二個參數的 data 就是包裹裡裝的東西，Dialog 那邊用 MAT_DIALOG_DATA 簽收。

執行後的預期結果，就是畫面上會跳出 DialogExample 這個對話框，並且它內部拿得到我們傳入的 name 跟 animal 資料。
-->

---

# 開啟 Dialog — 接收回傳值（二）

`afterClosed()` 回傳一個 Observable，訂閱後可取得 Dialog 關閉時回傳的資料。

```typescript
showDialog() {
  const dialogRef = this.dialog.open(DialogExample, {
    data: { name: 'name', animal: 'title' },
  });

  // 當 dialog 關閉後觸發，並取得回傳的內容
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}
```

| 方法 | 說明 |
| --- | --- |
| `dialog.open(Component, config)` | 開啟指定元件作為對話框 |
| `dialogRef.afterClosed()` | 回傳 Observable，dialog 關閉後發出回傳值 |

<!--
現在對話框開啟了，那我們要怎麼知道使用者在裡面做了什麼、填了什麼呢？答案就是 afterClosed() 這個方法，它會回傳一個 Observable，我們訂閱之後，等到 Dialog 真的關閉的那一刻，就會收到 Dialog 裡呼叫 close() 時傳出來的資料。

大家可以把這個流程想成「等朋友從裡面辦完事出來」：afterClosed() 就是我們在外面等，Dialog 一旦關閉（朋友出來了），subscribe 裡的 callback 就會執行，result 就是朋友帶出來的東西。

⚠️ 要提醒大家，afterClosed() 是 Observable，一定要呼叫 subscribe() 才會真正拿到值，不訂閱的話這段程式碼不會有任何反應。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 設定 Dialog 尺寸

<!--
最後一個部分我們來看比較細節的設定：怎麼調整 Dialog 打開來的寬度跟高度。
-->

---

# 設定 Dialog 的寬度與高度

在 `open()` 的設定物件中，透過 `width` 與 `height` 屬性指定對話框的尺寸（字串格式）。

```typescript
const dialogRef = this.dialog.open(DialogComponent, {
  width: '500px',
  height: '300px',
});
```

| 設定屬性 | 型別 | 說明 |
| --- | --- | --- |
| `width` | `string` | 設定 Dialog 寬度，例如 `'500px'`、`'80vw'` |
| `height` | `string` | 設定 Dialog 高度，例如 `'300px'`、`'60vh'` |
| `data` | `any` | 傳入 Dialog 元件的資料，透過 `MAT_DIALOG_DATA` 接收 |

<!--
預設情況下 Dialog 會依照內容自動決定大小，但如果我們想要固定尺寸，可以在 open() 的設定物件裡加上 width 跟 height，值是字串格式，可以用 px 也可以用 vw、vh 這種相對單位。

大家可以把這想成是「訂房間大小」，我們不一定要用預設的房型，也可以自己指定要多大的空間，其他像 data 這種設定則是不管有沒有指定尺寸都可以一起帶。

⚠️ 提醒大家，這裡的值一定要是字串，例如 '500px'，如果直接寫數字 500 是不會生效的。
-->

---
layout: default
---

# 練習：建立 Dialog 對話框
### 任務說明

建立一個包含輸入框的 Dialog，從主元件開啟後，使用者填入資料並按確認，主元件印出回傳值。

1. 建立 `dialog-form` 元件作為 Dialog 內容
2. Dialog HTML 使用 `mat-dialog-title`、`<mat-dialog-content>`、`<mat-dialog-actions>`
3. Dialog TS 注入 `MatDialogRef` 與 `MAT_DIALOG_DATA`
4. 主元件注入 `MatDialog`，呼叫 `dialog.open()` 傳入資料
5. 訂閱 `afterClosed()`，將回傳值印至 console

<!--
好，我們把這一章學到的東西整合起來動手做一次。大家想想看：Dialog 元件要顯示哪三個區塊？呼叫端要注入什麼服務？資料要怎麼從呼叫端傳到 Dialog、又要怎麼從 Dialog 傳回呼叫端？

先自己動手試試看，卡住的地方沒關係，等一下我們會看解題提示，大家可以先按照今天教的五個步驟，一步一步對照著做。
-->

---
layout: default
---

# 練習：解題提示
### 提示說明

1. Dialog 元件的 `imports` 陣列需加入 `MatDialogTitle`、`MatDialogContent`、`MatDialogActions`
2. 使用 `inject(MAT_DIALOG_DATA)` 取得外部傳入資料，使用 `inject(MatDialogRef)` 取得對話框參考
3. 確認按鈕呼叫 `this.dialogRef.close(returnValue)` 回傳資料
4. 呼叫端以 `this.dialog.open(DialogFormComponent, { data: { ... } })` 開啟
5. `dialogRef.afterClosed().subscribe(result => { ... })` 接收回傳值

<!--
如果剛剛卡住了沒關係，我們一起對照這五個提示看看差在哪裡。特別容易漏掉的地方是 imports 陣列忘記加 Dialog 相關的指令，或是 MAT_DIALOG_DATA 忘記用 inject 而是用了錯誤的注入方式。

大家可以先自己核對一下自己寫的程式碼，跟提示比對看看哪裡不一樣，這樣印象會更深刻。
-->

---
layout: end
---

# 本章重點回顧

- Dialog 由獨立元件提供畫面，透過 `MatDialog` 服務開啟
- HTML 使用 `mat-dialog-title` / `mat-dialog-content` / `mat-dialog-actions` 劃分區塊
- Dialog 元件注入 `MatDialogRef` 控制關閉與回傳，注入 `MAT_DIALOG_DATA` 接收資料
- 呼叫端使用 `dialog.open(Component, { data, width, height })` 開啟並傳入設定
- 透過 `dialogRef.afterClosed().subscribe()` 接收 Dialog 關閉後的回傳值

<!--
這一章我們學了 Dialog 的完整流程：Dialog 本身是一個獨立元件，畫面用三個固定區塊組成；元件內部靠 MatDialogRef 控制自己的關閉、靠 MAT_DIALOG_DATA 拿到外部資料；呼叫端則是注入 MatDialog、呼叫 open() 開啟，並透過 afterClosed() 拿到使用者操作後的結果。

這一整套「開啟、傳資料、收資料」的模式，之後大家在做需要使用者確認或填寫小表單的功能時都會用得到，把今天的流程記熟，之後遇到類似需求就可以直接套用。
-->
