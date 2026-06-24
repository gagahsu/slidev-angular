---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: TypeScript 練習（二）
routeAlias: ch18
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
    Angular Full-Stack Masterclass
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    TypeScript 練習（二）
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「日期、資料重組、方法綜合應用」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎來到「TypeScript 練習二」！
在上一章我們學會了基本的資料結構設計。
今天這堂課，我們要來挑戰三個非常實務、而且也是初學者非常容易卡關的進階主題：
第一，是寫程式的人一輩子都逃不掉的糾纏——「日期物件（Date）」。
第二，是把後端格式重編成前端格式的「資料重組技術」。
第三，是我們之前的方法複習與綜合應用。
這堂課的內容會直接關係到你未來串接 API 的實戰能力，大家要打起精神來！
-->

---
layout: default
---

# Outline

- **Date 日期物件**
- **日期比較**
- **重組資料**
- **宣告方法複習**
- **實作練習**

<!--
今天的學習路線圖非常明確：
我們會先從 Date 日期物件的建立與常用的 get 方法學起。
接著，看怎麼在 JavaScript 裡進行日期的「比大小」。
再來，我們會學習如何做資料欄位的重組與轉換。
最後，我們會複習方法宣告，並做四道硬核的實作練習！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Date 日期物件
# Working with Dates

<!--
第一站，我們先來跟寫程式界的百年老妖精打個招呼——「日期物件（Date）」。
-->

---

# Date 物件 — 建立日期

使用 `new Date()` 建立日期物件，共有三種常用寫法：

```typescript
// 抓取當下時間
let date = new Date();
console.log(date); // Sun Oct 27 2024 14:56:19 GMT+0800

// 建立指定日期（時間預設 00:00:00）
date = new Date('2019-10-27');
console.log(date); // Sun Oct 27 2019 08:00:00 GMT+0800

// 建立指定日期與時間（精確到秒）
date = new Date('2019-10-27 02:20:02');
console.log(date); // Sun Oct 27 2019 02:20:02 GMT+0800
```

<!--
在 JS/TS 中，我們用 `new Date()` 就可以產生一個日期時間物件。
如果你不給它傳任何參數，像第一行那樣，它就會預設抓取「瀏覽器當下的系統時間」。
如果你傳入一個像是 `'2019-10-27'` 的字串，它就會乖乖建立那天的日期，並且預設時間是早上的八點整（因為時區的關係）。
你也可以傳入更精準的格式，像是 `'2019-10-27 02:20:02'`，它就能精確到秒鐘。
不管是做行事曆、簽到系統，還是文章發布時間，這招都是必備的。
-->

---

# Date 常用方法

| 方法 | 說明 | 回傳值（以 `2019-10-27 02:20:02` 為例） |
| --- | --- | --- |
| `.getFullYear()` | 取得年份（4位數） | `2019` |
| `.getMonth()` | 取得月份（**0–11**，需 +1） | `9`（10月） |
| `.getDate()` | 取得日期（1–31） | `27` |
| `.getDay()` | 取得星期幾（0=週日，6=週六） | `0`（週日） |
| `.getHours()` | 取得小時（0–23） | `2` |
| `.getMinutes()` | 取得分鐘（0–59） | `20` |
| `.getSeconds()` | 取得秒數（0–59） | `2` |
| `.getTime()` | 取得毫秒時間戳（從 1970/1/1 起算） | 大數字 |

<!--
建立好 Date 物件後，我們要怎麼把年份、月份、日期抓出來呢？
這有一整套的 `get` 函數。
像是 `.getFullYear()` 拿西元年。
特別注意！**`.getMonth()` 拿到的月份是「0 到 11」**！
對，你沒聽錯，在程式世界裡，1 月是 0，12 月 is 11。
所以，**你拿出來顯示的時候，記得手動加 1 才是人類看得懂的月份**！這是不管新手老手都踩過無數次的超級大地雷，請大家一定要記住！
另外，`.getDay()` 是拿星期幾，其中 0 代表週日，6 代表週六。
-->

---

# Date 常用方法 — 範例

```typescript
let date = new Date('2019-10-27 02:20:02');

console.log(date.getFullYear()); // 2019
console.log(date.getMonth());    // 9（月份從 0 開始，10月 = 9）
console.log(date.getDate());     // 27
console.log(date.getHours());    // 2
console.log(date.getMinutes());  // 20
console.log(date.getSeconds());  // 2
console.log(date.getDay());      // 0（0 = 週日）
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>getMonth()</code> 從 0 開始（0 = 1月），使用時記得加 1 才是正確月份
</div>

<!--
來，我們看範例。
`date.getMonth()` 回傳 9，這就代表是 10 月。
而星期日回傳的是 0。
這頁表非常重要，大家在寫程式的時候，可以隨時翻看參考。
-->

---

# 日期比較 — getTime()

兩個 `Date` 物件**不能直接用 `>` / `<` 比較**，需先用 `.getTime()` 轉為毫秒數再比較。

```typescript
let sDate = new Date('2024/11/27');
let eDate = new Date('2024/11/28');

console.log(sDate.getTime() > eDate.getTime()); // false
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 毫秒數越大代表日期越晚；<code>getTime()</code> 讓兩個日期可以像數字一樣直接比較大小
</div>

<!--
「大叔，那如果我想寫個功能：『如果截止日期小於今天，就顯示已過期』，我可以直接用大於小於符號比較兩個 Date 物件嗎？」
絕對不行！在 JavaScript 裡，直接拿兩個 Date 物件比大小會產生非常詭異的結果，甚至永遠是 false。
正確的做法是：**用 `.getTime()` 把日期轉成「毫秒時間戳」**！
這個時間戳是指「從 1970 年 1 月 1 日起算到那一刻的總毫秒數」，它是一個非常大的整數。
對比數字，我們就可以用大於小於符號，輕輕鬆鬆地進行大小比對了。
這一招是日期比較的唯一正解，請一定要記下來！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 重組資料
# Data Restructuring

<!--
第二站，我們來看看怎麼解決前後端工程師經常為此打架的難題——「資料重組」。
-->

---

# 重組資料 — 為什麼需要？

收到後端資料時，欄位名稱不一定符合前端需求。例如後端給的是 `name / age / sex`，但前端需要每個欄位加上 `user` 前綴：

```typescript
// 後端傳來的原始資料
let jsonData = {
  name: 'Allen',
  age: 12,
  sex: 'M'
};
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 除非前後端一開始就統一格式，否則資料重組是無法避免的過程
</div>

<!--
在真實的專案裡，後端吐給你的 API 欄位名稱，常常會讓你吐血。
比如他們回傳了 `name`、`age`、`sex`。
但你的前端元件已經寫好了，只認 `userName`、`userAge` 和 `userSex`。
這時候，你千萬不要回去逼後端改 API，因為他們可能有很多系統都在用同一個 API，改了別人會爆炸。
我們前端要自己大度一點，寫個簡單的資料重組，把資料轉成我們想要的格式！
-->

---

# 重組資料 — 範例

將原始資料每個欄位加上 `user` 前綴，放進新物件：

```typescript
let newJsonData = {
  userName: jsonData.name,
  userAge:  jsonData.age,
  userSex:  jsonData.sex
};

console.log(newJsonData);
// { userName: 'Allen', userAge: 12, userSex: 'M' }
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 若資料是陣列，可用 <code>map</code> 對每筆資料做同樣的重組，回傳新陣列
</div>

<!--
怎麼重組呢？
其實就是「乾坤大挪移」！
我們宣告一個全新的物件 `newJsonData`。
裡面的 `userName` 指向舊的 `jsonData.name`；`userAge` 指向 `jsonData.age`。
這樣一來，一個乾淨、完全符合前端規格的新物件就誕生了。
如果資料是個陣列，我們就用上一章學過的 `.map()` 函數，巡邏一次，對裡面的每筆資料都做這樣的對應，就能瞬間把整個陣列重組完畢。
學會這招，前後端合作無間，天下太平！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 宣告方法複習
# Declaring Methods

<!--
第三站，我們來快速溫習一下方法的宣告與呼叫，因為等一下的實作題會用到！
-->

---

# 宣告方法 — 複習

無論是從 HTML 觸發，還是在 TS 中呼叫，都需要自己宣告方法。方法可以帶入參數：

```typescript
// TS 端：宣告帶入一個值 msg 的方法
showAlert(msg: string) {
  alert(msg);
}

// TS 中呼叫
this.showAlert('HI');
```

```html
<!-- HTML 觸發 -->
<button (click)="showAlert('HI')">按鈕</button>
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 方法名稱可自由命名，但不能與系統保留字相同
</div>

<!--
快速複習一下：
在 TS 中宣告方法 `showAlert(msg: string)`。
如果是在 TS 內部呼叫別的方法，前面一定要加上什麼？
對！就是 `this.showAlert('HI')`！
如果是在 HTML 裡，要用小括號事件綁定 `(click)="showAlert('HI')"`。
好，複習完畢，大家應該都對變數、方法跟日期非常有信心了。
接下來，準備接受我們的實作測驗！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

<!--
這次的實作題總共有四題，都是從生活化的情境出發，看看你的腦袋能不能轉過彎來。
-->

---
layout: default
---

# 練習 1–2：任務說明
### 運算練習

**練習 1：**  
Allen 錢包裡有 200 元，買了一個漢堡（50 元）、三個薯條（40 元/個），  
請問他還剩下多少錢？

**練習 2：**  
Allen 身上有 5000 元，想買 10 份漢堡（50 元）、10 份薯條（40 元），  
因為有會員卡可以打 **九折**，請問他還剩下多少錢？

<!--
前兩題是純邏輯與數學運算的練習：
第一題：Allen 錢包有 200 元，買了 50 元的漢堡跟三個每個 40 元的薯條，算算還剩多少錢？
第二題：Allen 升級了！身上有 5000 元，買了 10 個漢堡、10 個薯條，但是他有一張「打九折」的會員卡，算算他還剩多少錢？
請大家先動手在 TS 裡宣告變數、寫出公式，並在 console 中印出結果。
-->

---
layout: default
---

# 練習 1–2：解題提示

**練習 1：**

```typescript
let money = 200;
let spent = 50 + 40 * 3;   // 170
console.log(money - spent); // 30
```

**練習 2：**

```typescript
let money = 5000;
let cost = (10 * 50 + 10 * 40) * 0.9;  // 810
console.log(money - cost);               // 4190
```

<!--
寫完了吧？大叔來揭曉提示：
第一題，我們算出花費 `50 + 40 * 3` 得到 170，然後用 200 去減，剩下 30。
第二題，因為要打九折，所以總花費是 `(10 * 50 + 10 * 40) * 0.9` 得到 810，用 5000 去減，剩下 4190。
這兩題非常直覺，主要是讓大家熟悉變數的宣告與基本的算術運算。
-->

---
layout: default
---

# 練習 3：任務說明
### VIP 資格判斷

建立下列資料，並用程式判斷哪些人有達成 **VIP 資格（累積花費 200 元以上）**：

```typescript
let arrayData = [
  { userName: 'Allen', payMoney: 500 },
  { userName: 'Ben',   payMoney: 20  },
  { userName: 'Eric',  payMoney: 120 }
];
```

<!--
第三題：VIP 資格判斷。
這在電商系統中是核心功能。
給你一個包含 Allen、Ben 和 Eric 三人累積消費的物件陣列。
請你寫一個迴圈，去判斷累積消費大於或等於 200 元的人，並在 console 印出「[姓名] 達成 VIP！」的字樣。
這題會考驗你對 `forEach` 迴圈以及 `if` 條件判斷的組合能力！
-->

---
layout: default
---

# 練習 3：解題提示

```typescript
let arrayData = [
  { userName: 'Allen', payMoney: 500 },
  { userName: 'Ben',   payMoney: 20  },
  { userName: 'Eric',  payMoney: 120 }
];

arrayData.forEach(item => {
  if (item.payMoney >= 200) {
    console.log(item.userName + ' 達成 VIP！');
  }
});
// Allen 達成 VIP！
```

<!--
解題思路非常清晰：
我們呼叫 `arrayData.forEach(item => { ... })` 來巡邏每個人。
在迴圈肚子裡，用 `if (item.payMoney >= 200)` 來做篩選過濾。
只要滿足條件，就用字串拼接 `item.userName + ' 達成 VIP！'` 印出來。
最後結果就會印出「Allen 達成 VIP！」。
大家都做對了嗎？
-->

---
layout: default
---

# 練習 4：任務說明
### BMI 計算方法

寫一個可以帶入 **身高（cm）** 與 **體重（kg）** 的方法，計算 BMI 並判斷所在區間。

| BMI 值 | 區間 |
| --- | --- |
| < 18.5 | 過輕 |
| 18.5 – 24.9 | 正常 |
| 25 – 29.9 | 過重 |
| ≥ 30 | 肥胖 |

BMI 公式：`體重(kg) ÷ 身高(m)²`

<!--
第四題是終極大考驗：寫一個「BMI 計算器」方法！
這個方法要能傳入「身高（公分）」和「體重（公斤）」。
在方法內部，算出 BMI 值。
注意喔！BMI 的公式是：`體重(kg) ÷ 身高(公尺)的平方`。
因為傳入的身高是公分，你必須先除以 100 換算成公尺喔！
算出來之後，用 `if...else if` 去判斷他是過輕、正常、過重還是肥胖，並印出結果。
這題是綜合了方法宣告、參數傳遞、數學運算與多重 if 判斷的完美考題，大家認真寫寫看！
-->

---
layout: default
---

# 練習 4：解題提示

```typescript
calculateBMI(height: number, weight: number) {
  let bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    console.log(`BMI ${bmi.toFixed(1)}：過輕`);
  } else if (bmi < 25) {
    console.log(`BMI ${bmi.toFixed(1)}：正常`);
  } else if (bmi < 30) {
    console.log(`BMI ${bmi.toFixed(1)}：過重`);
  } else {
    console.log(`BMI ${bmi.toFixed(1)}：肥胖`);
  }
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 身高單位是 cm，計算時需除以 100 轉為 m；<code>** 2</code> 是 TypeScript 的次方運算符
</div>

<!--
大叔來帶大家看看這題的精緻解法：
我們定義方法為 `calculateBMI(height: number, weight: number)`。
在裡面計算 `weight / (height / 100) ** 2`。
那個兩個乘號 `**` 是 JS/TS 裡面的「次方運算符」，所以 `** 2` 就是平方的意思。
接著我們用 `.toFixed(1)` 幫 BMI 的小數點後第一位做四捨五入，畫面看起來會比較清爽。
最後，用多重 `if...else if` 來劃分 BMI 的區間。
這個方法寫好之後，你就可以在專案裡隨時傳入不同人的身高體重來做計算了。
是不是超級實用！
-->

---
layout: end
---

# TypeScript 練習（二）完成
### 日期、資料重組、方法綜合應用全部掌握！

<!--
恭喜大家！成功通過了 TypeScript 練習二的所有考驗！
到了這一步，你已經掌握了 JS/TS 最核心的日期操作、資料重組和複雜方法的撰寫。
這代表你已經具備了撰寫前端業務邏輯的基本功了。
回去把這幾章的練習再反覆看過幾遍。
下一堂課，我們要回歸 Angular 框架的核心生命週期——「生命週期（Lifecycle）」，去看看 Angular 元件從出生到死亡的完整歷程！大家大腦充飽電，我們下堂課見！
-->
