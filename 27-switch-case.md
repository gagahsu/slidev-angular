---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: "@switch 條件切換"
routeAlias: ch27
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
    @switch 條件切換
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用 case 取代 else if，讓多條件判斷更清晰」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎回來！
上一章我們學會了用 `if` 和 `else if` 來做分支判斷。
但是，你想想看，如果今天我們要設計一個遊戲角色選擇畫面。
角色職業有「戰士、法師、刺客、弓箭手、牧師、德魯伊...」等十幾種。
如果你用 `if` 來寫，代碼就會變成：
`if (職業 == 戰士) ... else if (職業 == 法師) ... else if (職業 == 刺客) ...`
這一長串的 `else if` 排下來，不只你看得眼花，連你的編輯器都不想理你了。
今天，我們就要來學習條件判斷的另一個秘密武器——`switch case`！
不只在 TypeScript 大腦裡好用，Angular 17 的 HTML 模板裡也有非常相似的 `@switch` 機制喔！
-->

---
layout: default
---

# Outline

- **什麼是 switch case** — 條件判斷的另一種寫法，以 case 取代 else if
- **switch 語法結構** — switch、case、default、break 的組成
- **switch vs if 比較** — 兩種寫法的對照範例
- **case 與 break 說明** — case() 比對值、break 結束執行
- **switch 中使用運算式** — 在 switch() 內撰寫運算邏輯

<!--
今天我們的分支切換作戰計畫如下：
先了解什麼是 `switch case`，以及它如何用 `case` 取代討人厭的 `else if`。
接著，拆解 `switch case` 的四大零件：switch、case、default 和 break。
然後，把 `switch` 和 `if` 放在拳擊場上進行實況 PK，看看它們的代碼長相。
隨後，深入探討最容易遺忘、也是新手最常踩雷的 `break` 與穿透（fall-through）機制。
最後，看看如何在 `switch` 裡面塞入算術運算式！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 switch case
# What is Switch Case

<!--
第一站，我們先來認識這個分支選擇器的基本骨架。
-->

---

# 什麼是 switch case？

`switch case` 與 `if` 同為條件判斷，差異在寫法：`if` 以 `else if` 處理多個分支，`switch` 改以 `case` 逐一比對。

```typescript
switch (變數名稱或運算式) {
  case 符合數字或字元:
    陳述句一;
    break;
  case 符合數字或字元:
    陳述句二;
    break;
  default:
    陳述句三;
    break;
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>default</code> 相當於 if 中的 <code>else</code>，當所有 case 都不符合時執行。
</div>

<!--
`switch case` 的運作邏輯，大叔把它比喻成「自動販賣機的按鈕」。
你投了硬幣，按了「1 號」按鈕，販賣機就掉出可樂；按了「2 號」按鈕，掉出雪碧；按了沒設定的號碼，就跑出「請重新選擇」（default）。
我們在 `switch()` 括號裡放入要判斷的變數。
底下用一個個 `case` 來比對變數的值。
如果對上了，就執行該 case 底下的陳述句。
最後別忘了加 `default`，它就是防呆安全網（相當於 `else`）。
當前面的 case 通通都不符合時，就會被引導到這條預設的備用道路。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# switch vs if 比較
# Switch vs If Comparison

<!--
既然兩者都能做判斷，我們直接把它們放在一起對照，感受一下語法的視覺差異。
-->

---
layout: two-cols
---

# switch vs if 比較

以判斷值為 1 時打印 1、為 2 時打印 2、否則打印 other 為例，兩種寫法結果相同，語法不同。

**if 寫法（左）vs switch 寫法（右）**

::right::

```typescript
// if 寫法
if (this.testNum == 1) {
  console.log(1);
} else if (this.testNum == 2) {
  console.log(2);
} else {
  console.log('other');
}
```

```typescript
// switch 寫法
switch (this.testNum) {
  case(1):
    console.log(1);
    break;
  case(2):
    console.log(1);
    break;
  default:
    console.log('other');
    break;
}
```

<!--
大家看看這左右兩邊的程式碼。
左邊是我們熟悉的 `if-else`。
右邊是新朋友 `switch-case`。
當 `testNum` 等於 1 的時候，兩邊都會印出 1；等於 2 的時候，都會印出 2。
你可以感覺到，右邊的 `switch` 排版更加的「對齊」、一目了然。
在分支很多的時候，`switch` 的代碼結構不會像 `if` 那樣往右下角斜斜地斜過去，維護起來更加舒服！
但大叔要提醒：右邊那個 `break` 到底是什麼鬼？為什麼不寫不行？我們下一張投影片來解密！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# case 與 break 說明
# Case and Break

<!--
現在，我們來聊聊 switch 裡最關鍵、也是最容易讓新手在半夜抓狂加班的 `break` 指令！
-->

---
layout: two-cols
---

# switch 的 case 與 break

以 `this.testNum` 為判斷依據，`case(值)` 比對後執行對應程式。每個 `case` 結尾必須加 `break`，否則會繼續執行下一個 `case`（fall-through）。

::right::

```typescript
switch (this.testNum) {
  case(1):
    console.log(1);
    break;
  case(2):
    console.log(1);
    break;
  default:
    console.log('other');
    break;
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 每個 case 結尾必須加上 <code>break</code>，否則程式會繼續往下執行下一個 case（fall-through）。
</div>

<!--
在 TypeScript 的 `switch` 語法裡，**`break` 代表「跳出這台機器」**。
如果你忘記在 `case(1)` 底下寫 `break`。
當 `testNum` 等於 1 時，電腦執行完 `console.log(1)` 之後，它不會下班！
它會像是煞車壞掉的卡車一樣，繼續往下撞進 `case(2)` 裡執行 `console.log(2)`，直到它碰到下一個 `break` 或者把整個 switch 撞穿為止！
這種靈異現象在程式界叫作「Fall-through（穿透）」。
所以，寫 case 時，千萬要養成好習慣：**寫完一行，立刻補上 `break;`**！
不然你的程式跑出奇怪的雙重執行結果，你可能要對著螢幕哭一整晚！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# switch 中使用運算式
# Expression in Switch

<!--
除了放單一變數之外，switch 的括號裡其實還可以玩點花樣。
-->

---
layout: two-cols
---

# switch 中使用運算式

`switch()` 括號內可放入運算式，系統先計算結果再與各 `case` 比對。注意 `switch` 與 `if` 寫法差異，勿混淆符號。

::right::

```typescript
switch (this.testNum * 3) {
  case(1):
    console.log(1);
    break;
  case(2):
    console.log(1);
    break;
  default:
    console.log('other');
    break;
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>switch()</code> 括號內可以放入運算式，例如 <code>this.testNum * 3</code>，系統會先計算結果再與各 case 值比對。
</div>

<!--
我們不只可以寫 `switch(this.testNum)`，我們還可以在括號裡塞入運算式，比如 `switch(this.testNum * 3)`。
這時候，電腦會非常聰明地先幫你把 `testNum * 3` 的算術結果算出來。
比如結果是 6，它再拿著這個 6，去底下每一個 `case` 裡敲門，看看誰是 6。
所以在 switch 括號裡，算術加減乘除都是完全合法的！
大家回去可以在自己的 TS 練習檔裡，試著把這段 code 敲敲看，觀察它的執行結果！
-->

---
layout: end
---

# 課程結束
### 熟悉 switch case，讓多條件判斷更整潔易讀

<!--
恭喜大家！成功收服了 `switch case` 這個強大的分支語法！
今天你學會了這招，以後遇到十幾種職業、或是多種狀態切換的畫面，就能寫出極度整潔、好讀的代碼了。
回去把 `break` 的觀念牢牢記住。
下一堂課，我們要迎來整個前端課程的終極重頭戲——「串接 API（Fetch API）」，去學習如何用程式碼向政府或是遠端的伺服器要資料，把真實世界的實時數據搬到我們的網頁上！大家休息一下，我們等一下見！
-->
