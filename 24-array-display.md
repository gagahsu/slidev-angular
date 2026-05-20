---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 陣列顯示
routeAlias: ch24
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
    陣列顯示
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用迴圈與 @for 讓陣列資料活躍於畫面」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎來到「陣列顯示（Array Display）」的主題！
你想想看，今天如果你去逛 PChome，網頁上有十萬件商品。
如果我們身為前端工程師，還要一個一個去手寫 HTML，寫十萬個 `<div class="product">`。
那我保證，還沒等你的產品上線，你的肝可能就先升天了！
在真實世界裡，後端給我們的資料通常是一整張的「陣列清單（Array）」。
今天，我們就要來學習如何利用迴圈，讓電腦自動幫我們把這一整張清單，源源不斷地畫在網頁畫面上！
-->

---
layout: default
---

# Outline

- **陣列（Array）** — 什麼是陣列，如何用索引取值
- **for 迴圈（傳統寫法）** — 初始值、條件、遞增
- **for...of 迴圈** — TypeScript 簡化的迴圈語法
- **練習 1** — 找出陣列中 9 的位置並打印
- **陣列顯示（@for）** — 在 Angular HTML 中顯示陣列
- **陣列資料結構** — 單一資料、物件陣列、巢狀陣列
- **巢狀 @for** — 顯示陣列中的陣列資料
- **練習 2** — 建立玩家陣列並顯示道具清單

<!--
今天我們的陣列大解放作戰計畫如下：
首先，複習什麼是陣列，以及怎麼用索引取值。
接著，認識傳統的 for 迴圈與 TypeScript 簡雅的 `for...of` 迴圈。
隨後進行練習一，找出特定數字的位置。
然後，轉向 HTML 的戰場：學習 Angular 17+ 必殺技 `@for` 語法與 `track` 機制。
接著看不同層次的陣列結構，學會多層巢狀 `@for` 的玩法。
最後，透過練習二，親手做出玩家清單與他們擁有的道具顯示！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 陣列
# Array

<!--
首先，第一站：我們來幫大家溫習一下陣列這塊基本資料結構。
-->

---

# 陣列

陣列（Array）是由相同類型的元素（element）組成的資料結構。透過索引取值時，在陣列名稱後加上 `[]` 並填入位置編號即可。索引從 **0** 開始，因此 `arrayData[1]` 取得的是第二個元素。

```typescript
let arrayData = [2, 3, 5];
console.log('arrayData: ' + arrayData[1]);
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 陣列索引從 <b>0</b> 開始，arrayData[0] = 2、arrayData[1] = 3、arrayData[2] = 5
</div>

<!--
陣列就像是一列「排好隊火車」，車廂裡裝著性質一樣的資料。
每一節車廂都有一個「座位編號」，在程式裡我們叫它「索引值（Index）」。
大家必須把大腦的開關切換過來：**陣列的編號一律是從 0 開始**！
所以 `arrayData[0]` 才是火車的頭等艙第一節車廂。
如果你想拿第二個元素，記得要寫 `arrayData[1]`，別數錯了喔！
-->

---

# 陣列 — for 迴圈

`for` 迴圈可依序讀取陣列每一筆資料。傳統寫法需設定三個部分：初始值（`let i = 0`）、條件（`i < a.length`）、遞增（`i++`）。

```typescript
for (INITIALIZATION; CONDITION; AFTERTHOUGHT) {
  // Code for the for-loop's body goes here.
}
```

<!--
既然資料排好隊了，我們要怎麼依序去查水表（讀取資料）？
最經典的招式就是 `for` 迴圈。
傳統的 `for` 迴圈就像是一台有計數器的機器。
它包含三個部分：
初始值：`let i = 0`，告訴計數器從第 0 節車廂開始。
條件限制：`i < a.length`，告訴計數器在火車長度內才可以跑，超過就得煞車，否則會翻車（Index out of bounds）。
遞增動作：`i++`，每查完一節車廂，計數器就自動加一。
這三個齒輪接在一起，迴圈機器就能自動運轉了！
-->

---

# 陣列 — for 迴圈範例

初始值為 0，每次執行後 `i++`，直到 `i >= arrayData.length` 為止。`i` 依序為 0、1、2，對應 `arrayData` 的 2、3、5。

```typescript
let arrayData = [2, 3, 5];
for (let i = 0; i < arrayData.length; i++) {
  console.log(arrayData[i]);
}
```

執行結果：

| 迴圈次數 | i 的值 | arrayData[i] |
| --- | --- | --- |
| 第 1 次 | 0 | 2 |
| 第 2 次 | 1 | 3 |
| 第 3 次 | 2 | 5 |

<!--
我們來看這台迴圈機器的模擬運作。
陣列裡有 `[2, 3, 5]` 三個數字。
當 i 等於 0 時，我們讀到 `arrayData[0]`，也就是 2。
接著 i 自動加 1 變成 1，我們讀到 3。
i 再次加 1 變成 2，我們讀到 5。
再來 i 變成 3 了，因為 3 沒有小於陣列長度 3，條件不成立，迴圈機器立刻關機。
這就是整個 for 迴圈巡邏的過程，非常規律！
-->

---

# 陣列 — for...of 迴圈

`for...of` 是 ES6 的簡化語法，無需設定初始值、條件或遞增，直接迭代陣列每一個元素（此處命名為 `data`）。

```typescript
let arrayData = [2, 3, 5];
for (let data of arrayData) {
  console.log(data);
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>for...of</code> 是 TypeScript / ES6 的語法，比傳統 for 迴圈更簡潔，適合直接迭代陣列元素。
</div>

<!--
「大叔，傳統的 for 迴圈要寫初始值、要寫條件，還要遞增，我的鍵盤打到快起火了，有沒有偷懶的招式？」
問得好！在 TypeScript 裡，大叔強烈建議大家用 `for...of` 語法！
你看這段代碼：`for (let data of arrayData)`。
這行簡直是防呆救星！
你不需要管索引 i 從哪裡開始、也不用寫 length。
它會自動把陣列裡面的元素，一個一個倒給變數 `data`，直到倒完為止。
簡潔、易讀、又不會寫錯邊界條件，這才是現代工程師該寫的優雅代碼！
-->

---
layout: two-cols
---

# 練習 1
### 找出 9 的位置

新增一個陣列 `[10, 20, 3, 5, 8, 9, 23, 657, 123, 67]`，想辦法把 9 是在哪個位置打印出來。

預期結果：印出 `5`（9 在陣列中的索引值）

```typescript
let myArray = [10, 20, 3, 5, 8, 9, 23, 657, 123, 67];
for (let i = 0; i < myArray.length; i++) {
  if (myArray[i] === 9) {
    console.log(i);
  }
}
```

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/24-array-display/practice-1-result.png" class="rounded shadow-md max-h-80" />
</div>

<!--
學會了巡邏陣列，我們馬上來試試看練習一：
這裡有一串大陣列。
請用迴圈去掃描它。
當你發現陣列裡面的某個座位裝著數字 9 時。
把這個 9 的「座位編號（Index）」用 `console.log` 印在終端機上。
大叔提示：在迴圈裡，你需要搭配 `if` 條件判定，來抓出這隻幸運的 9 喔！
限時兩分鐘，開始！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 陣列顯示
# @for in Angular HTML

<!--
好了，剛才都是在 TypeScript 大腦裡印 log，使用者根本看不到。
現在，我們要把陣列資料直接鋪在 HTML 畫面上！
-->

---

# 陣列顯示 — @for

In HTML 中使用 `@for(變數 of 陣列; track 唯一值)` 語法迭代陣列並渲染畫面。`track` 為必填，用於追蹤每筆資料的唯一識別，協助 Angular 最佳化渲染效能。

```typescript
arrayData = [4, 5, 6];
```

```html
@for(data of arrayData; track data) {
  <h3>{{ data }}</h3>
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>track</code> 是 Angular 17+ 新版 <code>@for</code> 語法的必填欄位，用來追蹤每筆資料的唯一識別值，有助於提升渲染效能。
</div>

<!--
在 Angular 17+ 之後，我們迎來了全新的控制流語法：`@for`！
語法結構是：`@for(item of items; track item)`。
這裡有兩個關鍵字：
第一個是 `of`，跟我們剛學的 `for...of` 一模一樣。
第二個是 `track`。
大叔把它比喻成「名牌」。
因為網頁上的資料可能會隨時新增、刪除或排序。
Angular 需要知道每一筆資料的「唯一身分識別」，這樣在更新畫面時，它才能只重畫有變動的那一小塊，而不是整張桌子掀掉重畫。
所以 `track` 是**強制的必填項**！
如果是簡單的數字陣列，我們直接 `track data` 就可以了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 陣列資料
# Array Data Structures

<!--
接下來，我們來看看不同長相的陣列結構。在真實的 API 開發中，資料可沒那麼單純。
-->

---

# 陣列資料

陣列資料結構有三種常見形式：單一值陣列、物件陣列、巢狀陣列（陣列中含陣列）。

```typescript
arrayData = [4, 5, 6];

arrayData2 = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' }
];

arrayData3 = [
  { id: 1, name: 'a', userData: [{ userId: '1' }] },
  { id: 2, name: 'b', userData: [{ userId: '2' }] },
  { id: 3, name: 'c', userData: [{ userId: '3' }] }
];
```

<!--
大家看看這三種常見的資料長相：
第一種是剛才看過的「普通數字/字串陣列」，裡面就是一排數字。
第二種是「物件陣列」，這在業界最常見，比如會員清單，每一個格子裡都是一隻有 `id` 和 `name` 的大括號物件。
第三種是「巢狀陣列」，也就是大括號物件裡面，居然又塞了另外一個子陣列（比如 userData）。
這簡直是陣列套娃！
面對這種套娃，我們得要用巢狀迴圈才能把它剝開！
-->

---

# 陣列資料 — 巢狀迴圈（TS）

要取得 `userData` 中的 `userId`，需以外層迴圈迭代 `arrayData3`，再以內層迴圈迭代每筆資料的 `userData`。

```typescript
for (let data of this.arrayData3) {
  for (let user of data.userData) {
    console.log(user.userId);
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 巢狀迴圈（nested loop）可以讓你讀取陣列中的陣列資料，外層迴圈跑外層陣列，內層迴圈跑內層陣列。
</div>

<!--
在 TypeScript 大腦裡，如果想印出套娃裡最內層的 `userId`。
我們就必須寫「兩層 for...of 迴圈」。
外層迴圈先抓出每一個大物件 `data`。
內層迴圈再從 `data.userData` 這個子火車裡，抓出每一位 `user` 讀取 `userId`。
這就像是你去拆一個包裹，要先拆開外面的快遞箱（第一層），再打開裡面的商品盒（第二層），才能拿到裡面的公仔。
層級關係一定要對齊，否則會直接 undefined 給你寫！
-->

---

# 陣列顯示 — 巢狀 @for（HTML）

顯示巢狀陣列資料時，需使用兩層 `@for`，外層迭代主陣列，內層迭代子陣列。

```html
@for(data of arrayData3; track data.id) {
  @for(user of data.userData; track user.userId) {
    <h3>{{ user.userId }}</h3>
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 外層 <code>@for</code> 使用 <code>track data.id</code>，內層 <code>@for</code> 使用 <code>track user.userId</code>，分別追蹤各自陣列的唯一值。
</div>

<!--
而在 HTML 畫面中，概念也是一模一樣！
我們用兩層 `@for` 套在一起。
外層的 `@for` 迭代 `arrayData3`，追蹤外層的唯一 key（例如 `data.id`）。
在它的大括號內部，再開一層 `@for` 迭代 `data.userData`。
這樣你就能在最內層，用雙大括號渲染出子資料了！
寫的時候要保持代碼縮排整齊，否則括號對不齊，編譯器就會瘋狂尖叫噴紅字！
-->

---
layout: two-cols
---

# 練習 2
### 玩家陣列與道具顯示

新增 `userArray` 陣列，做出以下畫面效果：

- 顯示每位玩家的名稱
- 列出該玩家擁有的道具名稱與數量

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/24-array-display/practice-2-result.png" class="rounded shadow-md max-h-80" />
</div>

<!--
我們馬上來挑戰大魔王練習二：
請大家建立一個名為 `userArray` 的玩家資料陣列。
我們要在畫面上把每個玩家的卡片畫出來。
而且，在每個玩家卡片裡面，還要列出他所擁有的「道具清單」與「道具數量」。
這題就是完美的「巢狀 @for」應用場景！
-->

---

# 練習 2 — 資料結構

```typescript
userArray = [
  {
    userName: '玩家A', lev: 10,
    props: [
      { propsName: '蘑菇', amount: 5 },
      { propsName: '金幣', amount: 15 }
    ]
  },
  {
    userName: '玩家B', lev: 15,
    props: [
      { propsName: '龜殼', amount: 1 },
      { propsName: '砲彈', amount: 15 }
    ]
  }
];
```

<!--
資料結構大叔已經幫大家備好了。
你看這個 `userArray`，有玩家 A 跟玩家 B。
每個玩家裡面都有一個 `props` 陣列，裝著蘑菇、金幣、龜殼、砲彈。
請大家把這段資料拷貝到你的 `component.ts` 檔案裡作為你的資料庫！
-->

---

# 練習 2 — 參考解答（HTML）

```html
@for(user of userArray; track user.userName) {
  <div style="border: 1px solid #ccc; padding: 16px; margin: 8px;">
    <h2>{{ user.userName }}</h2>
    <p>擁有道具：</p>
    <ul>
      @for(prop of user.props; track prop.propsName) {
        <li>{{ prop.propsName }} 數量：{{ prop.amount }}</li>
      }
    </ul>
  </div>
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 外層 <code>@for</code> 迭代玩家，內層 <code>@for</code> 迭代每位玩家的道具，即可完成巢狀陣列的畫面顯示。
</div>

<!--
來，我們看看 HTML 的參考解答。
外層 `@for` 去跑每一個 `user`。
內層我們用一個 `<ul>` 列表，搭配內層的 `@for` 去跑 `user.props`。
在 `li` 標籤裡印出 `prop.propsName` 與 `prop.amount`。
當外層讀到玩家 A，內層就會自動把玩家 A 的蘑菇跟金幣打出來。
外層切到玩家 B，內層就自動把龜殼跟砲彈印出來。
整個流程非常絲滑！
大家試著自己把它敲出來，看看畫面是不是成功渲染出來了？
-->

---
layout: end
---

# 課程結束
### 學會陣列與 @for，讓資料動態呈現於畫面

<!--
恭喜大家！順利學會了陣列迴圈與 HTML 的 `@for` 渲染！
現在你已經掌握了讓資料動態變身成無窮無盡列表的核心技術了。
這可是前端工程師每天都要寫上百次的起手式。
下一堂課，我們要來學習如何做「條件控制」，也就是學會使用 `@if` 語法，去決定某些畫面上某些區塊在特定條件下到底要不要顯示！大家休息一下，我們等一下見！
-->
