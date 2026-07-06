---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 日期選擇器
routeAlias: ch35
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
    日期選擇器
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「善用 input date 與 mat-datepicker，輕鬆實作日期選擇功能」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來聊「日期選擇器」。

在做表單的時候，只要是生日、訂單日期、預約時間這類欄位，都免不了要讓使用者挑一個日期出來。如果讓使用者自己手打日期文字，格式亂七八糟不說，還很容易打錯，後端解析起來也很頭痛。這時候就需要一個「選擇器」，讓使用者用點的、用選的，而不是用打的。

學完這一章，大家會知道 Angular 裡有兩種做法可以選：一種是原生 HTML 的 input date，另一種是 Angular Material 提供的 mat-datepicker，也會知道各自適合什麼場景。
-->

---
layout: default
---

# Outline

- **什麼是日期選擇器** — input date 與 mat-datepicker 兩種方案比較
- **input type="date" 的 type 類型** — month、date、time、datetime-local、week
- **input date 與 ngModel** — 以 ngModel 綁定日期值、設定 min/max
- **mat-datepicker 介紹** — 官方範例預覽與 HTML 結構說明
- **mat-datepicker HTML 元件說明** — mat-form-field、mat-label、mat-hint、mat-datepicker-toggle、mat-datepicker
- **mat-datepicker TS 設定** — 匯入模組與 provideNativeDateAdapter
- **mat-datepicker 資料綁定** — ngModel 初始值與 min/max 限制

<!--
先讓大家看一下這一章的路線圖。我們會先比較兩種方案的差異，接著看原生 input date 有哪些型別可以切換，然後練習用 ngModel 綁定它的值。後半段我們會把重心放在 mat-datepicker，從 HTML 結構、TypeScript 設定，一路講到資料綁定與範圍限制，整體是由淺入深。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是日期選擇器？
# What is a Date Picker?

<!--
大家可以想像一下，如果每次填日期都要自己打字，像是「2024年11月5日」，光是格式就有十種寫法，程式很難統一處理。日期選擇器就是為了解決這個問題而生的元件，讓使用者透過點選而不是輸入來決定日期。

接下來我們就來看看 Angular 裡有哪些方式可以做到這件事。
-->

---

# 日期選擇器

頁面需要使用者選擇日期時，可選擇兩種方案：

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**`<input type="date">`**
- 寫法簡單，原生 HTML 支援
- 樣式由瀏覽器控制，各平台外觀不一致

</div>
<div>

**`<mat-datepicker>`**
- 需安裝較多套件
- 版型與資料格式由 Angular Material 統一處理
- 跨瀏覽器外觀一致

</div>
</div>

```html
<!-- 原生 input -->
<label for="birthday">Birthday:</label>
<input type="date" id="birthday" name="birthday">
<!-- mat-datepicker -->
<mat-form-field>
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
```

<!--
這張投影片把兩種寫法並排放在一起，大家可以直接比對。

左邊的 input date 寫法非常單純，一行搞定，缺點是外觀完全交給瀏覽器決定，Chrome、Safari、手機瀏覽器看起來都不太一樣，我們沒辦法客製化樣式。右邊的 mat-datepicker 需要多幾行 HTML，也要多裝套件，但換來的是統一、好看的介面，而且日曆彈出視窗、格式提示這些功能都內建好了。

簡單說：想要快、簡單、不在意外觀就用 input date；想要跨瀏覽器一致、外觀漂亮就用 mat-datepicker。等一下我們會分別深入這兩種寫法。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# input type="date" 的 type 類型
# Input Date Type Variants

<!--
我們先從比較簡單的原生 input date 開始講。其實 type="date" 不是只有一種長相，它還有好幾個兄弟姊妹，像是只選月份、只選時間、選日期加時間、甚至以「週」為單位選取。

等一下我們會一個一個示範給大家看，順便說明它們共通的資料格式規則。
-->

---

# input type="date" — 可用的 type 值

`<input type="date">` 可依需求切換 type，各類型分別顯示不同的選擇介面。值的格式為 `yyyy-MM-ddThh:mm`（例如 `2024-11-05T19:30`），月份與日期若小於 10 須補前置 0。

| type | 顯示內容 |
|------|---------|
| `month` | 年份 + 月份 |
| `date` | 年月日 |
| `time` | 時間（時:分） |
| `datetime-local` | 本地年月日 + 時間 |
| `week` | 年份 + 週數 |

每種類型皆支援 `value`、`min`（最小可選時間）、`max`（最大可選時間）屬性。

<!--
這張表格是給大家的速查表，重點是這五種 type 各自顯示的介面不一樣，但底層資料格式都是統一規則：yyyy-MM-ddThh:mm，小於 10 的月份、日期都要補一個 0 在前面。

⚠️ 這裡最容易忘記的就是補零這件事，如果直接把數字拼接成字串，忘記補零，瀏覽器可能就讀不懂這個日期格式。另外 min、max 這兩個屬性每種類型都能用，用來限制使用者能選的範圍。接下來我們一個一個實際看畫面長什麼樣子。
-->

---

# month（年月）

選擇年份與月份，不含日期。

<div class="flex justify-center">
  <img src="/images/34-date-picker/input-type-month.png" class="rounded shadow-md max-h-80" />
</div>

<!--
month 這個類型很適合用在像是信用卡到期月份、月報表這種只需要年月、不需要精確到哪一天的情境。大家可以看到畫面上只會出現年份跟月份的選單，沒有日期可以選。
-->

---

# date（年月日）

選擇完整的年月日，是最常用的類型。

<div class="flex justify-center">
  <img src="/images/34-date-picker/input-type-date.png" class="rounded shadow-md max-h-80" />
</div>

<!--
date 是這幾種類型裡面大家最常用到的，像是生日、預約日期、訂單日期，幾乎都是用這個。畫面上就是我們熟悉的年月日日曆選擇介面，之後的範例我們也會以這個類型為主。
-->

---

# time（時間）

僅選擇時間（時、分），不含日期。

<div class="flex justify-center">
  <img src="/images/34-date-picker/input-type-time.png" class="rounded shadow-md max-h-80" />
</div>

<!--
time 只處理時、分，不含日期，適合像是預約看診時段、開會時間這種只需要時間點的欄位。大家可以想像成手機裡設定鬧鐘的那個時間滾輪，操作起來是類似的概念。
-->

---

# datetime-local（本地年月日 + 時間）

同時選擇日期與時間，左側為日曆，右側為時間滾輪。

<div class="flex justify-center">
  <img src="/images/34-date-picker/input-type-datetime-local.png" class="rounded shadow-md max-h-80" />
</div>

<!--
datetime-local 就是把 date 跟 time 合體，一次選日期又選時間，適合像是活動報名截止時間、班機起飛時間這種需要精確到分鐘的情境。畫面上會同時看到日曆跟時間滾輪，兩邊各司其職。
-->

---

# week（年份 + 週數）

以週為單位選取，選中後整週日期全部反白顯示。

<div class="flex justify-center">
  <img src="/images/34-date-picker/input-type-week.png" class="rounded shadow-md max-h-80" />
</div>

<!--
week 比較特別，它選的不是某一天，而是「第幾週」，選中之後大家會看到整個星期的日期都被反白，適合像是排班表、週報這種以週為單位在管理的資料。

到這裡五種 type 都介紹完了，接下來我們來看怎麼在 Angular 裡用 ngModel 把這個值綁到我們的元件上。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# input date 與 ngModel
# Input Date with ngModel

<!--
前面看的都是純 HTML 的畫面展示，現在我們要把它跟 Angular 的資料綁定機制接起來，讓選到的日期可以存進我們元件的變數裡，這樣才能真正拿來做後續的邏輯處理。
-->

---
layout: two-cols
---

# input date — 以 ngModel 綁定日期

在 Angular 中以 `[(ngModel)]` 取代原生 `value` 屬性，並可透過 `min`、`max` 屬性限制可選範圍。值的格式為 `yyyy-MM-dd`（例如 `2024-11-05`）。

```html
<input type="date"
       [(ngModel)]="today"
       min="2024-11-05"
       max="2024-11-10">
```

```typescript
today = '2024-11-05';
```

::right::

<div class="flex items-center justify-center h-full">
  <img src="/images/34-date-picker/input-date-ngmodel-preview.png" class="rounded shadow-md max-h-72" />
</div>

<!--
帶大家看一下這段程式碼，重點是 [(ngModel)] 這個雙向綁定，取代了原生的 value 屬性，這樣使用者選的日期就會自動同步到我們 TS 裡的 today 變數。min 跟 max 這兩個屬性負責限制可選範圍，超出範圍的日期使用者就點不動。

⚠️ 這裡要特別注意，跟前面說的 datetime-local 格式不一樣，input date 搭配 ngModel 時，字串格式是 yyyy-MM-dd，不含時間，大家寫的時候要對照清楚。

執行起來的效果，大家可以看右邊的畫面，today 這個變數的初始值會直接顯示在選擇器裡，使用者只能在 11/5 到 11/10 之間做選擇。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-datepicker
# Angular Material Datepicker

<!--
接下來我們進入這一章的重頭戲：mat-datepicker。前面提過，如果我們希望日期選擇器在各種瀏覽器、各種裝置上外觀都一致，而且長得漂亮，那就要靠 Angular Material 提供的這個元件了。
-->

---

# mat-datepicker — 官方範例預覽

Angular Material 提供的 `mat-datepicker` 外觀統一、功能完整，使用前先至官方文件找到 **Basic datepicker** 範例，查看其 HTML 與 TS 程式碼。

<div class="flex justify-center">
  <img src="/images/34-date-picker/mat-datepicker-preview.png" class="rounded shadow-md max-h-72" />
</div>

<!--
在動手寫程式之前，我們養成一個好習慣：先去官方文件找範例。大家可以看到官方文件裡有一個 Basic datepicker 的範例，這就是我們今天要練習的目標，等一下我們會照著這個範例的 HTML 跟 TS 一步一步拆解。
-->

---

# mat-datepicker — HTML 結構

`<mat-form-field>` 是 Angular Material 的外層容器，負責套用統一樣式與排版；缺少此元件會導致畫面排版錯亂。

```html
<mat-form-field>
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
```

<!--
大家先看一下整體結構，這裡有五個元件疊在一起：mat-form-field 是最外層的容器，裡面包了 label、input、hint、toggle 按鈕、還有 datepicker 本體。

⚠️ 這裡最容易漏掉的就是 mat-form-field，它負責套用 Angular Material 統一的樣式跟排版，如果忘記包這一層，畫面版面會亂掉，看起來不像 Material 元件。

接下來我們拆開來一個一個講每個元件的作用。
-->

---

# mat-datepicker — 各元件說明（一）

| 元件 / 指令 | 說明 |
|------------|------|
| `<mat-form-field>` | 最外層容器，套用 Angular Material 統一排版與樣式 |
| `<mat-label>` | 輸入框的預設提示標籤文字 |
| `<input matInput [matDatepicker]="picker">` | 實際輸入框，`matInput` 指令加入預設功能與樣式，`[matDatepicker]` 綁定對應的日期選擇器 |

<!--
先看前三個元件。mat-form-field 就像是一個「相框」，把裡面的東西統一包裝起來。mat-label 是輸入框還沒輸入資料時顯示的提示文字，跟我們平常看到的 placeholder 概念很像。

最重要的是 input 這一行，matInput 這個指令負責讓輸入框套用 Material 的樣式跟互動行為，而 [matDatepicker]="picker" 則是告訴這個輸入框：「你要跟 picker 這個日曆綁在一起」。這個 picker 是什麼，我們下一頁繼續看。
-->

---

# mat-datepicker — 各元件說明（二）

| 元件 / 指令 | 說明 |
|------------|------|
| `<mat-hint>` | 輸入框下方的提示訊息（例如格式說明） |
| `<mat-datepicker-toggle matIconSuffix [for]="picker">` | 顯示在輸入框後方的日曆圖示按鈕；改用 `matIconPrefix` 可移至前方 |
| `<mat-datepicker #picker>` | 點擊圖示後彈出的日期選擇面板，以 `#picker` 作為 ID 與上方元件互相綁定 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>[matDatepicker]</code>、<code>[for]</code>、<code>&lt;mat-datepicker&gt;</code> 三者使用的 ID 必須完全一致，否則選擇器無法正常運作。
</div>

<!--
mat-hint 就是輸入框下方那行小提示文字，通常拿來告訴使用者格式長怎樣。mat-datepicker-toggle 是那顆日曆圖示按鈕，點下去就會彈出日曆，如果想把圖示放到輸入框前面而不是後面，可以把 matIconSuffix 換成 matIconPrefix。最後 mat-datepicker 這個標籤本身，就是點擊後彈出來的那個日曆面板。

⚠️ 這裡是同學最容易出錯的地方：input 上的 [matDatepicker]="picker"、toggle 上的 [for]="picker"、還有 mat-datepicker #picker 這三個地方的名稱，一定要完全一致，這個 picker 只是個變數名稱，大家可以自己取名，但三處必須對得起來，不然日曆按鈕點了會沒反應。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-datepicker TS 設定
# TypeScript Configuration

<!--
HTML 結構講完了，接下來我們切到 TypeScript 那一側，看看要在元件裡加哪些設定，mat-datepicker 才能真正運作起來。
-->

---

# mat-datepicker — 匯入必要模組

在使用 `mat-datepicker` 的元件 TS 檔中，需匯入以下模組並加入 `provideNativeDateAdapter` 作為 provider：

```typescript
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  // ...
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
})
```

<!--
帶大家看這段設定，重點有兩個地方。第一個是 providers 裡的 provideNativeDateAdapter()，它負責讓 Angular Material 知道要用瀏覽器原生的 Date 物件來處理日期邏輯，這行沒加的話，datepicker 會直接噴錯。

第二個重點是 imports 陣列，MatFormFieldModule、MatInputModule、MatDatepickerModule 這三個模組缺一不可，分別對應到我們前面 HTML 裡用到的 mat-form-field、matInput、mat-datepicker 這些元件跟指令。

⚠️ 同學常見的錯誤就是漏匯入某一個模組，結果畫面上元件顯示不出來或是樣式跑掉，遇到這種狀況第一件事就是回頭檢查 imports 陣列有沒有補齊。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-datepicker 資料綁定
# Data Binding

<!--
結構跟設定都準備好了，最後我們來看怎麼把選到的日期綁定成我們自己的變數，還有怎麼限制使用者可以選的日期範圍。
-->

---

# mat-datepicker — 以 ngModel 綁定初始值

在 `<input>` 上加入 `[(ngModel)]` 進行雙向資料綁定。初始值需以 `new Date()` 建立 Date 物件。

```html
<input matInput [matDatepicker]="picker" [(ngModel)]="sDate">
```

```typescript
sDate = new Date('2024/11/8');
```

<div class="flex justify-center">
  <img src="/images/34-date-picker/mat-datepicker-ngmodel-initial.png" class="rounded shadow-md max-h-52" />
</div>

<!--
這裡跟前面 input date 不太一樣，大家要特別留意：mat-datepicker 綁定的初始值必須是一個真正的 Date 物件，不能像原生 input date 那樣直接給字串，所以我們用 new Date('2024/11/8') 來建立。

⚠️ 這是同學很容易搞混的地方，原生 input date 用字串格式，mat-datepicker 用 Date 物件，兩種寫法不能互換。

執行後大家可以看到畫面上，選擇器一開啟就已經停在 2024 年 11 月 8 號，這就是我們設定的初始值。
-->

---
layout: two-cols
---

# mat-datepicker — 設定 min / max 日期範圍

透過 `[min]` 與 `[max]` 屬性限制可選取的日期範圍，超出範圍的日期會呈現灰色不可點擊狀態。

```html
<input matInput
       [matDatepicker]="picker"
       [min]="minDate"
       [max]="maxDate"
       [(ngModel)]="sDate">
```

```typescript
sDate    = new Date('2024/11/8');
minDate  = new Date('2024/11/3');
maxDate  = new Date('2024/11/20');
```

::right::

<div class="flex items-center justify-center h-full">
  <img src="/images/34-date-picker/mat-datepicker-min-max.png" class="rounded shadow-md max-h-72" />
</div>

<!--
這一頁我們把限制範圍的功能加上去。跟前面原生 input date 的 min、max 概念一樣，只是這裡改用 [min] 跟 [max] 屬性綁定，接的值也要是 Date 物件，而不是字串。

大家可以看右邊的畫面，超出 11/3 到 11/20 這個範圍的日期，會呈現灰色、點不下去的狀態，這樣就能避免使用者選到不合理的日期，像是訂單日期選到未來很久以後，或是預約日期選到已經過去的時間。

這也是這一章 mat-datepicker 的最後一個重點，接下來我們做個總結。
-->

---

# 補充：動態計算 min / max 日期範圍

前面範例的 `minDate`、`maxDate` 都是寫死的日期，但實務上像「訂單只能選未來 90 天內」「請假申請只能回溯 7 天」這類需求，日期範圍要跟著「今天」滾動，不能寫死成固定日期。

「用 `new Date()` 取得當下時間，再用 `setDate()` 搭配 `getDate()` 位移天數，就能動態算出以今天為基準的日期範圍」。

```typescript
today: Date = new Date();
minDate: Date = new Date();
maxDate: Date = new Date();

constructor() {
  this.minDate.setDate(this.today.getDate() - 7);
  this.maxDate.setDate(this.today.getDate() + 90);
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>setDate()</code> 是直接修改 Date 物件本身（mutate），不是回傳新物件，三個變數一定要各自 <code>new Date()</code>，不能共用同一個參照，否則 <code>setDate()</code> 會互相覆蓋。
</div>

<!--
前面我們把 minDate、maxDate 都寫死成固定日期，這在示範的時候沒問題，但實務上很少有需求是「日期範圍永遠固定」，通常都是「以今天為基準，往前往後推算」，像訂單日期通常只能選未來 90 天內，請假申請可能只能回溯 7 天，這種範圍是每天都在滾動的，寫死日期字串完全不合理。

解法就是用 new Date() 先抓到今天的日期物件，再搭配 setDate() 跟 getDate() 這兩個方法做位移運算：getDate() 會回傳目前日期是幾號，setDate() 則是把日期設成我們指定的數字，兩個搭配起來就能做「往前 7 天」「往後 90 天」這種相對運算。

⚠️ 這裡有個大家很容易踩到的坑：setDate() 是直接修改呼叫它的那個 Date 物件本身，不會回傳一個新的物件。所以 today、minDate、maxDate 這三個變數，一定要分別各自呼叫 new Date() 建立三個獨立的物件，如果偷懶讓 minDate、maxDate 指向同一個參照，setDate() 呼叫兩次會互相覆蓋，最後兩個變數會變成同一個日期。

另外要提醒大家，這個範圍是在元件初始化的當下算出來的，也就是使用者打開頁面那一刻的「今天」，不會在畫面停留期間即時更新，這點在大部分情境下沒問題，但如果頁面會開很久跨到隔天，範圍就不會自動往後移動，這是設計上要注意的地方。
-->

---
layout: end
---

# 課程結束
### 善用 input date 與 mat-datepicker，依需求選擇最適合的日期選擇方案

<!--
這一章我們一起看了兩種做日期選擇的方式：原生的 input date，簡單快速，但外觀交給瀏覽器決定；還有 Angular Material 的 mat-datepicker，需要多一點設定，但換來統一美觀的介面，還有完整的 min/max 範圍限制功能。

大家往後拿到「要讓使用者選日期」的需求時，可以想想這個專案在不在意介面的一致性、有沒有安裝 Angular Material，再決定要用哪一種方案。下一章我們會接著看，選好的日期要怎麼格式化成我們想要的顯示樣式。
-->
