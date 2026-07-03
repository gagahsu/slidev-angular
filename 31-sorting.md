---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 資料排序
routeAlias: ch31
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
    資料排序
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用 sort() 讓資料依你的規則整齊排列」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，今天我們要來聊資料排序。前端開發常常會拿到後端給的資料，直接拿去畫面渲染，結果順序亂七八糟，使用者體驗很差。

這一章我們就是要解決這個痛點：怎麼在畫面渲染之前，把資料依照我們想要的規則排整齊。

學完之後，大家會知道怎麼用 sort() 這個陣列原生方法，依照數字或文字欄位把資料排序，並且能切換不同的排序依據。
-->

---
layout: default
---

# Outline

- **資料排序概念** — 為什麼需要在前端排序資料
- **未排序的問題** — 資料順序不符預期的情況
- **sort() 基本用法** — 使用陣列 sort() 方法排序
- **排序邏輯說明** — return -1 / 1 / 0 的意義
- **排序結果** — 排序後的資料呈現
- **切換排序欄位** — 依不同欄位（name、weight 等）排序
- **練習** — 將資料依重量排序並打印

<!--
今天的內容分成幾個部分：先講為什麼需要排序、看一個沒排序的實際問題，接著介紹 sort() 的用法跟背後的比較邏輯，然後看排序後的結果、學怎麼切換排序欄位，最後用一個練習把觀念串起來。

概念會由淺入深，前面搞懂比較函式的邏輯，後面切換欄位就會很輕鬆。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 資料排序概念
# Data Sorting

<!--
我們先想像一個情境：後端給我們一份使用者清單，資料庫怎麼存的、順序就怎麼回傳，可能完全沒有按照我們畫面上想呈現的順序。

這種「順序不符預期」的狀況很常見，我們接下來就來看看要怎麼處理。
-->

---

# 資料排序

後端回傳的資料順序不一定符合畫面需求，需在前端渲染前先行排序。

排序通常會需要一個值，可能是數字（id）或者文字：

- **數字**：由小到大或者由大到小
- **文字**：判斷第一個文字由 A > Z 或者 Z > A
- **中文**：無法直接排序，除非自己寫額外的方法去做排序跟判斷

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 中文排序需要自行實作額外的比對方法，JavaScript 預設的 sort() 無法正確處理中文字串順序。
</div>

<!--
我們可以把排序想成排隊：不管是按照身高排、按照號碼牌排，一定要有一個「依據」，才知道誰站前面誰站後面。資料排序也是同樣道理，一定要挑一個欄位當排序依據。

常見的依據分兩種：數字型的，像 id 或年齡，可以直接比大小；文字型的，像姓名，會依照字母順序（A 到 Z 或反過來）排列。

⚠️ 這裡要特別提醒大家，中文排序是個例外。因為中文字不是照字母順序編碼的，JavaScript 預設的 sort() 沒辦法正確排出「筆畫」或「注音」的順序，如果真的需要排中文，要自己額外寫比對邏輯，這是很多人會踩的坑。
-->

---

# 未排序的問題

以下資料未排序，直接用 `@for` 渲染時，第一筆會是 position 10 的 Neon。

```typescript
let ELEMENT_DATA: PeriodicElement[] = [
  {position: 10, name: 'Neon',      weight: 20.1797, symbol: 'Ne'},
  {position: 1,  name: 'Hydrogen',  weight: 1.0079,  symbol: 'H'},
  {position: 2,  name: 'Helium',    weight: 4.0026,  symbol: 'He'},
  {position: 3,  name: 'Lithium',   weight: 6.941,   symbol: 'Li'},
  {position: 4,  name: 'Beryllium', weight: 9.0122,  symbol: 'Be'},
  {position: 5,  name: 'Boron',     weight: 10.811,  symbol: 'B'},
  {position: 6,  name: 'Carbon',    weight: 12.0107, symbol: 'C'},
  {position: 7,  name: 'Nitrogen',  weight: 14.0067, symbol: 'N'},
  {position: 8,  name: 'Oxygen',    weight: 15.9994, symbol: 'O'},
  {position: 9,  name: 'Fluorine',  weight: 18.9984, symbol: 'F'},
];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 後端資料的順序不一定符合畫面需求，需要在前端進行排序處理。
</div>

<!--
我們來看一個具體的例子。這份 ELEMENT_DATA 陣列裡，Neon 的 position 是 10，卻放在陣列的第一筆，其他元素反而照 1 到 9 排在後面。

如果我們直接拿這份資料用 @for 渲染到畫面上，使用者看到的第一筆就會是 position 10 的 Neon，這明顯不符合「由小到大排列」的期待，體驗會很奇怪。

⚠️ 這裡要抓住重點：陣列裡元素存放的順序，不代表畫面就要照這個順序顯示。只要後端沒有幫我們排好，前端渲染前就得自己動手排序，這正是我們接下來要學的 sort() 派上用場的地方。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# sort() 排序方法
# Array sort()

<!--
了解問題之後，我們馬上來看解法：JavaScript 陣列內建的 sort() 方法，怎麼用它把資料排整齊。
-->

---

# sort() 基本用法

`sort()` 是陣列的原生方法，接受一個比較函式，依序比較相鄰兩個元素直到排序完成。以下範例以 `position` 為排序依據。

```typescript
this.dataSource.data.sort(function (a, b) {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
});
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> sort() 是陣列的原生方法，會直接修改原始陣列並回傳排序後的結果。
</div>

<!--
我們可以把 sort() 想成裁判：它會一次拿兩個元素出來比較，問我們「這兩個誰該排前面」，然後根據我們給的答案，一輪一輪比下去，直到整個陣列都排好。

這裡的重點是 sort() 需要我們傳一個「比較函式」進去，函式接收 a、b 兩個元素，我們在函式裡寫規則，告訴它怎麼判斷誰排前面。範例裡我們用 position 欄位當依據，比較 a.position 跟 b.position 的大小。

⚠️ 提醒大家一個容易忽略的地方：sort() 會直接修改原本的陣列（也就是「原地排序」），不是回傳一份新陣列，所以呼叫完之後，原本的 dataSource.data 順序就已經變了。
-->

---

# 排序邏輯說明

比較函式接收 `a`、`b` 兩個元素：回傳負數時 a 排在 b 前，回傳正數時 b 排在 a 前，回傳 0 時順序不變。

```typescript
this.dataSource.data.sort(function (a, b) {
  if (a.position < b.position) {
    return -1;  // a 排在 b 前面
  }
  if (a.position > b.position) {
    return 1;   // b 排在 a 前面
  }
  return 0;     // 順序不變
});
```

| 回傳值 | 意義 |
|--------|------|
| `-1`（負數） | a 排在 b 前面（升冪） |
| `1`（正數） | b 排在 a 前面 |
| `0` | 兩者相等，順序不變 |

<!--
剛剛提到比較函式要「回傳答案」，這裡我們把回傳值的意義講清楚，這是同學最容易卡住的地方，一定要搞懂。

比較函式每次拿兩個元素 a 跟 b 出來比，回傳負數（習慣上用 -1）就代表「a 排在 b 前面」；回傳正數（習慣上用 1）就代表反過來，「b 排在 a 前面」；回傳 0 代表兩者相等，順序維持不動。

⚠️ 這裡的易錯點是：很多人會誤以為回傳值一定要是 -1、0、1 這三個數字，其實只要是負數、正數、零就可以了，回傳 -5 或 100 效果是一樣的。同學可以把它想成「秤重」，只在乎輕重方向，不在乎差多少。
-->

---

# 排序結果

排序後結果如下：

```typescript
// 排序後的陣列（依 position 升冪）
[
  // 0: {position: 1,  name: 'Hydrogen',  weight: 1.0079,  symbol: 'H'}
  // 1: {position: 2,  name: 'Helium',    weight: 4.0026,  symbol: 'He'}
  // 2: {position: 3,  name: 'Lithium',   weight: 6.941,   symbol: 'Li'}
  // 3: {position: 4,  name: 'Beryllium', weight: 9.0122,  symbol: 'Be'}
  // 4: {position: 5,  name: 'Boron',     weight: 10.811,  symbol: 'B'}
  // 5: {position: 6,  name: 'Carbon',    weight: 12.0107, symbol: 'C'}
  // 6: {position: 7,  name: 'Nitrogen',  weight: 14.0067, symbol: 'N'}
  // 7: {position: 8,  name: 'Oxygen',    weight: 15.9994, symbol: 'O'}
  // 8: {position: 9,  name: 'Fluorine',  weight: 18.9984, symbol: 'F'}
  // 9: {position: 10, name: 'Neon',      weight: 20.1797, symbol: 'Ne'}
]
```

Neon（position: 10）移到最後，資料已依 position 升冪排列。

<!--
我們回頭看排序後的結果，原本擠在第一筆的 Neon（position: 10），現在已經乖乖排到最後一筆了，其他元素也依照 position 1 到 9 依序排列。

這就驗證了我們前面寫的比較函式是正確的：position 小的排前面，position 大的排後面，整個陣列變成升冪排列。

同學可以自己動手把範例貼到瀏覽器 console 跑跑看，實際觀察排序前後的差異，這樣印象會更深刻。
-->

---

# 切換排序欄位

將比較函式中的欄位名稱替換即可切換排序依據，以下改為依 `name` 排序：

```typescript
this.dataSource.data.sort(function (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 文字比較時，JavaScript 會依字母的 Unicode 碼點順序排列，英文字母排序（A → Z）可正常運作。
</div>

<!--
學會 sort() 的邏輯之後，大家會發現一件很棒的事：想要換排序依據，其實不用改整個函式的結構，只要把比較的欄位換掉就好。

這裡我們把原本比較 position 的地方，全部換成 name，其他寫法一模一樣，馬上就變成依名稱排序。這就是為什麼理解「比較函式在比什麼」這麼重要，觀念一通，換欄位就是舉一反三而已。

⚠️ 提醒大家，文字比較跟數字比較邏輯不同，JavaScript 是照字母的 Unicode 碼點順序比，英文字母排序沒問題，但如果欄位裡有大小寫混雜，比較結果可能會跟預期不同，這是文字排序常見的小陷阱。
-->

---

# 練習：資料排序
### 將下方的資料用重量排序並且打印出來

1. 宣告 `ELEMENT_DATA` 陣列（資料如下）
2. 使用 `sort()` 方法，以 `weight` 欄位作為排序依據
3. 排序完成後將結果 `console.log` 打印出來
4. 確認第一筆為重量最小的元素（Hydrogen，weight: 1.0079）

```typescript
ELEMENT_DATA = [
  {position: 10, name: 'Neon',      weight: 20.1797, symbol: 'Ne'},
  {position: 1,  name: 'Hydrogen',  weight: 1.0079,  symbol: 'H'},
  {position: 2,  name: 'Helium',    weight: 4.0026,  symbol: 'He'},
  {position: 3,  name: 'Lithium',   weight: 6.941,   symbol: 'Li'},
  {position: 4,  name: 'Beryllium', weight: 9.0122,  symbol: 'Be'},
  {position: 5,  name: 'Boron',     weight: 10.811,  symbol: 'B'},
  {position: 6,  name: 'Carbon',    weight: 12.0107, symbol: 'C'},
  {position: 7,  name: 'Nitrogen',  weight: 14.0067, symbol: 'N'},
  {position: 8,  name: 'Oxygen',    weight: 15.9994, symbol: 'O'},
  {position: 9,  name: 'Fluorine',  weight: 18.9984, symbol: 'F'},
]
```

<!--
現在換大家動手做，把今天學的觀念實際應用一遍。這次的目標欄位是 weight（重量），不是前面示範的 position 或 name。

大家可以想想看：要改的地方跟前面切換 name 的作法是不是一樣？只要把比較函式裡的欄位換成 weight，其他邏輯完全不用動。排序完之後記得用 console.log 印出來檢查，確認第一筆是重量最小的 Hydrogen。
-->

---
layout: end
---

# 課程結束
### 善用 sort()，讓資料順序完全掌握在你手中

<!--
今天我們學了資料排序：為什麼需要排序、sort() 怎麼運作、比較函式回傳值代表的意義，還有怎麼切換排序依據。

核心觀念只有一個：sort() 靠比較函式決定順序，回傳負數、正數、零分別代表誰排前面。搞懂這個邏輯，不管排數字、排文字、換欄位，都是同一套寫法舉一反三。

大家練習的時候多動手跑跑看實際結果，這樣會比單純看程式碼更有感覺。辛苦大家了，我們下一章見！
-->
