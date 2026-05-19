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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 陣列
# Array

---

# 陣列

陣列（Array）是由相同類型的元素（element）的集合所組成的資料結構，當需要取得其中的資料時有兩種方法，一種是你需要確認你要的資料會在這個陣列中的第幾個，如下圖當我們需要取得 arrayData 中的資料 3 的時候我需要在陣列的名稱後面加上大括弧 `[]` 並且在裡面打上你需要抓取的資料位置，系統的資料排序是從 0 開始所以我們要抓 3 就需要打 1。

```typescript
let arrayData = [2, 3, 5];
console.log('arrayData: ' + arrayData[1]);
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 陣列索引從 <b>0</b> 開始，arrayData[0] = 2、arrayData[1] = 3、arrayData[2] = 5
</div>

---

# 陣列 — for 迴圈

第二種方法就是使用 for 迴圈來去把資料跑出來，for 迴圈是什麼？正如他名字所講他是個迴圈，他可以將你的陣列資料一筆一筆按照順序去執行並且讓你可以讀取裡面的資料，已大家常用的寫法來看你需要設定一個初始值（let i = 0）、一個條件（i < a.length）、遞增（i++）來讓迴圈執行。

```typescript
for (INITIALIZATION; CONDITION; AFTERTHOUGHT) {
  // Code for the for-loop's body goes here.
}
```

---

# 陣列 — for 迴圈範例

左圖的寫法會讓程式跑出右圖的結果，我們的初始值設定為 0，條件是如果 i 小於 arrayData 的資料數量，並且每次執行後都會將 i 遞增值到 i 不小於 arrayData 的資料數量，所以 i 的值就會是 0 > 1 > 2 對應的 arrayData 就會是 2 > 3 > 5。

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

---

# 陣列 — for...of 迴圈

TypeScript 有一個自己新增的 for 迴圈寫法，不用設置初始值，不用設置條件，不用設置遞增，你只需要設置一個自己想要的變數命名（這邊設置為 data）你就可以達到上張圖影片介紹的迴圈效果。

```typescript
let arrayData = [2, 3, 5];
for (let data of arrayData) {
  console.log(data);
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>for...of</code> 是 TypeScript / ES6 的語法，比傳統 for 迴圈更簡潔，適合直接迭代陣列元素。
</div>

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 陣列顯示
# @for in Angular HTML

---

# 陣列顯示 — @for

有了陣列之後我們就會希望 HTML 可以顯示陣列的內容，首先你要先有一個陣列的變數在該 HTML 對應的 TS 中，接著再 HTML 中打上 `@for(自行取名 of 陣列變數名稱; track 資料唯一值)` 寫法跟 TS 中的 for 迴圈差不多只是多了一個 `track`，為什麼要有這個東西因為這個可以讓系統確定你修改的陣列是哪個減少系統的負擔，宣告完迴圈後就可以開始寫你的畫面（在 `{}` 中）。

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 陣列資料
# Array Data Structures

---

# 陣列資料

陣列的資料寫法有很多種，單一的資料或者還有內層的資料（下圖）亦或者在陣列中還有陣列（右圖）也是會發生的，這時候我們要怎麼去抓陣列中的陣列呢？

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

---

# 陣列資料 — 巢狀迴圈（TS）

舉例來說如果我需要抓 userData 中的 userId，我就需要先執行 for 迴圈來跑 arrayData3 並且在這個 for 迴圈內再去跑一個 for 迴圈來執行 userData。

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

---

# 陣列顯示 — 巢狀 @for（HTML）

HTML 中也是一樣，你如果想要顯示陣列中的陣列資料你會需要兩個 `@for` 來去將資料讀取出來。

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

---
layout: two-cols
---

# 練習 2
### 玩家陣列與道具顯示

新增一個陣列（如右圖），並且做出下圖的畫面效果：

- 顯示每位玩家的名稱
- 列出該玩家擁有的道具名稱與數量

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

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/24-array-display/practice-2-result.png" class="rounded shadow-md max-h-80" />
</div>

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

---
layout: end
---

# 課程結束
### 學會陣列與 @for，讓資料動態呈現於畫面
