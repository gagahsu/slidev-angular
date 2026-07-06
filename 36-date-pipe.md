---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: DatePipe
routeAlias: ch36
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
    DatePipe
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「善用 Angular DatePipe，輕鬆將日期格式轉換為可讀性高的字串」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，上一章我們學了怎麼讓使用者選日期，這一章我們接著來看，選好的日期要怎麼變成好看的文字顯示出來。

大家應該都遇過這個狀況：把一個 Date 物件直接印出來或綁到畫面上，出來的格式又長又難讀，像是「Sun Nov 01 2025 00:00:00 GMT+0800」，跟我們平常習慣看到的「2025/11/01」差很多。這一章就是要教大家怎麼把日期轉換成想要的格式。

學完這一章，大家會知道兩種做法：一種是自己動手用 TypeScript 寫轉換邏輯，另一種是直接用 Angular 內建的 DatePipe，一行搞定，也會知道什麼時候該選哪一種。
-->

---
layout: default
---

# Outline

- **DatePipe 是什麼** — 為什麼需要日期格式轉換
- **日期資料轉換（手動）** — 用 TypeScript 方法提取年／月／日
- **日期資料轉換（DatePipe）** — 匯入 CommonModule 並套用管道語法

<!--
這一章的內容分成三段：先講為什麼需要格式轉換，接著我們會用最原始的方式，自己寫程式碼把年月日拆出來再組合，體會一下手動處理的麻煩之處，最後再介紹 Angular 內建的 DatePipe，讓大家感受一下用內建工具能省下多少力氣。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# DatePipe 是什麼？
# What is DatePipe?

<!--
先問大家一個問題：如果我們直接把一個 Date 物件綁到畫面上會發生什麼事？答案是畫面會顯示很原始、很不好讀的格式。這就是我們接下來要解決的問題。
-->

---

# DatePipe 是什麼？

直接將 `Date` 物件綁定到範本時，Angular 會呈現原始格式（例如 `Sun Nov 01 2025...`），與實際需要的顯示格式（如 `2025/01/13`）不同，因此需要進行資料轉換。

`DatePipe` 是 Angular 內建管道，能以簡短的模板語法將日期格式化為指定字串，無需手動撰寫轉換邏輯。

<div class="flex justify-center">
  <img src="/images/35-date-pipe/angular-datepipe-banner.png" class="rounded shadow-md max-h-80" />
</div>

<!--
大家可以把 Date 物件想像成一個「原始資料」，就像相機拍出來的 RAW 檔，資訊完整但不能直接拿來用，一定要經過後製處理才會變成大家想看的樣子。日期格式化就是這個「後製」的動作。

DatePipe 就是 Angular 內建的「後製工具」，它是一個管道（pipe），我們只要在範本語法裡串接一小段字串，就能把日期轉成想要的格式，不需要自己手刻轉換邏輯。不過在正式介紹它之前，我們先來看看如果不用它，自己手動轉換要花多少功夫，這樣才能體會出它的好用之處。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 日期資料轉換
# Date Formatting

<!--
接下來這一段，我們先不急著用 DatePipe，而是自己動手把日期格式轉換的邏輯寫出來，體驗一下箇中的細節與陷阱，等一下再對比用 DatePipe 有多輕鬆。
-->

---

# 日期資料轉換
### 方法一：用 TypeScript 手動轉換

當變數為 `Date` 型別時，可透過日期方法提取年、月、日，再組合成目標格式：

```typescript
today = new Date();

ngOnInit(): void {
  // 輸出範例：Thu Feb 12 2026 14:59:56 GMT+0800 (台北標準時間)
  console.log(this.today);
}
```

<!--
帶大家看一下這段程式碼，重點很簡單，就是用 new Date() 建立一個代表現在時間的物件，存到 today 這個變數裡。

⚠️ 提醒大家看一下 console.log 印出來的結果，格式是瀏覽器的預設格式，包含星期、時區這些資訊，這對一般使用者來說可讀性很差，這也是我們接下來要處理的問題所在。
-->

---

# 日期資料轉換
### 提取年、月、日

若目標格式為 `yyyy/MM/dd`，需分別提取年、月、日：

```typescript
tidyDate(date: Date) {
  // 提取年
  console.log(date.getFullYear());
  // 提取月（從 0 起算，需 +1）
  console.log(date.getMonth());
  // 提取日
  console.log(date.getDate());
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>getMonth()</code> 回傳值從 0 開始，1 月為 0、12 月為 11，使用時需加 1。
</div>

<!--
如果我們想要自己組出 yyyy/MM/dd 這種格式，第一步就是要把年、月、日分別從 Date 物件裡挖出來，這裡用的是 getFullYear、getMonth、getDate 這三個方法。

⚠️ 這裡是同學最容易踩雷的地方：getMonth() 回傳的月份是從 0 開始算的，1 月會回傳 0，12 月會回傳 11，如果我們忘記加 1，畫面上顯示的月份就會少一個月，這個錯誤很常見，大家一定要記住。
-->

---

# 日期資料轉換
### 組合日期字串（一）— 方法定義

```typescript
// 接收一個 Date 值，回傳格式化後的 string
tidyDate(date: Date): string {
  let newDate = '';

  // 加入年份與分隔符
  newDate = newDate + date.getFullYear() + '/';

  // 月份補零（月份從 0 起算，需 +1）
  if ((date.getMonth() + 1) < 10) {
    newDate = newDate + 0 + (date.getMonth() + 1) + '/';
  } else {
    newDate = newDate + (date.getMonth() + 1) + '/';
  }
```

<!--
帶大家看這段 tidyDate 方法的前半段。我們先建立一個空字串 newDate，接著把年份接上去，再加一個斜線分隔符。

接下來處理月份的時候，我們多做了一個判斷：如果月份加 1 之後小於 10，就在前面補一個 0 字串上去，否則就直接接上去。

⚠️ 這裡要提醒大家，這段程式碼因為篇幅關係還沒寫完，方法還沒 return，我們下一頁繼續把日期補零跟回傳的部分接完。
-->

---

# 日期資料轉換
### 組合日期字串（二）— 日期補零與回傳

```typescript
  // 日期補零
  if (date.getDate() < 10) {
    newDate = newDate + 0 + date.getDate();
  } else {
    newDate = newDate + date.getDate();
  }

  // 回傳組合好的日期字串
  return newDate;
}
```

月份與日期若為個位數則補 `0`，確保格式固定為兩位數。

<!--
延續上一頁，這裡我們把日期的部分也做一樣的補零判斷，最後把組合好的字串 return 出去，這樣 tidyDate 這個方法就完整了。

大家可以感受一下，光是要把一個日期轉成 yyyy/MM/dd 這種格式，我們就寫了快 20 行程式碼，還要處理兩次補零的判斷，這還只是其中一種格式而已，如果又要換一種格式，這段程式碼可能又要重寫。等一下我們就會看到，用 DatePipe 這件事可以省下多少功夫。
-->

---
layout: two-cols
---

# 日期資料轉換
### 在 HTML 與 TS 中使用 tidyDate

完成方法後，可在 HTML 範本或 TS 中呼叫：

**在 TS 中呼叫：**

```typescript
ngOnInit(): void {
  console.log(this.tidyDate(this.today));
}
```

**在 HTML 中呼叫：**

```html
{{ tidyDate(today) }}
```

::right::

<div class="flex flex-col items-center justify-center h-full gap-4">
  <p class="text-gray-500 text-sm">輸出結果</p>
  <div class="px-6 py-3 bg-teal-50 border border-teal-300 rounded-lg text-2xl font-mono text-teal-700">
    2026/02/12
  </div>
</div>

<!--
寫好方法之後，我們就可以在 TS 或 HTML 裡呼叫它。左邊大家可以看到，在 TS 裡呼叫就是普通的方法呼叫，加上 this；在 HTML 裡呼叫，直接用雙大括號把方法帶進去就好，跟呼叫其他方法的寫法一樣。

執行後的結果就像右邊看到的，日期會被轉成我們預期的 yyyy/MM/dd 格式，工整地顯示出來。這種寫法能用，但每次要用不同格式，就得改方法內部的邏輯，不夠彈性，接下來我們看 Angular 內建的解法。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 使用 DatePipe
# Using DatePipe

<!--
剛剛我們自己動手寫了將近 20 行程式碼才把日期格式轉好，現在來看 Angular 內建的 DatePipe 能怎麼幫我們省下這些功夫。
-->

---

# 使用 DatePipe
### 方法二：Angular 內建管道

若只需在 HTML 中顯示格式化日期，不須另外撰寫轉換方法，可直接使用 Angular 的 `DatePipe`。

**步驟：**

1. 在元件的 `imports` 中加入 `CommonModule`
2. 在範本中使用內嵌繫結顯示日期變數
3. 在變數名稱後加上 `| date: '格式字串'`

<!--
如果我們只是想在畫面上顯示格式化後的日期，其實根本不需要像前面那樣自己寫方法，Angular 已經幫我們準備好 DatePipe 這個內建管道了。

整個流程分三步：先在元件裡匯入 CommonModule，然後在範本裡用雙大括號顯示變數，最後在變數後面接上 | date 加格式字串就完成了。是不是比前面手動轉換簡單很多？我們接下來一步一步示範。
-->

---

# 使用 DatePipe
### 匯入 CommonModule

```typescript
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-...',
  imports: [
    CommonModule
  ],
})
```

<!--
這一步很簡單，就是從 @angular/common 匯入 CommonModule，加到元件的 imports 陣列裡。

⚠️ 提醒大家，DatePipe 本身其實是包含在 CommonModule 裡的，所以我們不用特別去 import DatePipe，只要匯入 CommonModule 就會一併帶進來，這一點常常讓人誤會要單獨匯入 DatePipe，其實不用。
-->

---

# 使用 DatePipe
### 範本語法與輸出結果

```html
{{ today | date: 'yyyy-MM-dd' }}
```

輸出結果：`2026-02-12`

| 格式字串 | 輸出範例 |
|---|---|
| `'yyyy/MM/dd'` | `2026/02/12` |
| `'yyyy-MM-dd'` | `2026-02-12` |
| `'MM/dd/yyyy'` | `02/12/2026` |
| `'fullDate'` | `Thursday, February 12, 2026` |
| `'shortDate'` | `2/12/26` |

<!--
帶大家看一下這行最核心的語法：{{ today | date: 'yyyy-MM-dd' }}，中間這個直線符號就是「管道」，意思是把 today 這個資料「送進」date 這個管道加工，再輸出結果。

執行後的結果，大家可以看到直接輸出 2026-02-12，跟我們前面手動寫快 20 行程式碼做出來的結果一模一樣，但這裡只用了一行。

下面這張表格列了幾種常用的格式字串給大家參考，像是 fullDate 會顯示完整的星期跟月份英文名稱，shortDate 則是最精簡的兩位數年份格式。同學可以根據畫面需求選擇適合的格式字串，不需要再自己刻邏輯。

到這裡，這一章的內容就結束了，我們來做個總結。
-->

---
layout: end
---

# 課程結束
### 善用 Angular DatePipe，以簡潔的管道語法取代手動日期格式轉換

<!--
這一章我們比較了兩種日期格式化的方式：一種是自己動手用 getFullYear、getMonth、getDate 這些方法拼出字串,雖然可以完全掌控邏輯，但程式碼又長又容易漏掉補零或是忘記月份要 +1；另一種是用 Angular 內建的 DatePipe，只要在範本裡串接 | date 加上格式字串，一行就能搞定。

大家往後在畫面上要顯示日期的時候，優先考慮用 DatePipe，只有在格式真的很特殊、內建管道無法滿足時，才考慮自己寫轉換邏輯。這一章也是我們日期相關主題的最後一章，恭喜大家把日期選擇跟日期顯示這兩塊都學完了。
-->
