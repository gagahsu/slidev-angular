---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 方法
routeAlias: ch15
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
    方法
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓程式碼可以重複被呼叫的魔法」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎回來！
我們現在已經學會了怎麼幫網頁裝修外表，也學會了怎麼用變數去儲存各種型別的資料。
但是，光有資料在那邊，我們的網頁還是像一個植物人一樣，只會顯示，不會做事。
今天，我們要來學習程式邏輯中真正的「行動派」——「方法（Methods，也就是大家常聽到的 Functions 函式）」。
方法就像是網頁大腦裡的「 SOP 工作手冊」。
一旦你寫好了它，網頁就會知道在什麼時候、該怎麼動手做事！
-->

---
layout: default
---

# Outline

- **什麼是方法**
- **方法的組成**
- **HTML 呼叫方法**
- **TS 中方法呼叫方法**
- **呼叫方法帶入值**
- **多個參數與預設值**
- **實作練習**

<!--
今天我們的作戰大綱如下：
首先，我們會釐清什麼是方法，以及一個合格的方法是由哪些積木組合起來的。
接著，我們會學習在 Angular 中，使用者要怎麼點擊按鈕來觸發我們寫的方法。
再來，我們會看方法之間是怎麼互相呼叫，以及怎麼把資料塞給方法（傳參）來執行不同的動作。
最後，我們會做一個好玩的互動按鈕實作練習！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是方法
# What is a Method?

<!--
第一站，我們先來了解「方法」的本質。
-->

---

# 什麼是方法？

**方法（Function / 函式）** 是一個被命名的程式碼區塊，用來執行特定的任務，並且可以重複被呼叫。

| 特點 | 說明 |
| --- | --- |
| 可重複呼叫 | 同一段邏輯不用寫很多次 |
| 可從 HTML 觸發 | 按鈕點擊等事件可呼叫方法 |
| 可互相呼叫 | 方法可以呼叫其他方法 |
| 可帶入參數 | 呼叫時傳入資料讓方法使用 |
| 可回傳值 | 方法執行完可以回傳結果 |

<!--
什麼是方法？
你可以把「方法」想像成大樓警衛的「每日巡邏 SOP」。
這個巡邏流程被封裝並命名為「巡邏」。
每次警衛想去巡邏，只要大喊一聲「開始巡邏」，就會自動把整套檢查電梯、檢查大門的安全步驟跑一遍，不用每次都把步驟重新寫一遍。
在程式裡也是一樣。
方法有五大特性：
第一，它可以「重複呼叫」，不用複製貼上代碼；
第二，它可以被 HTML 的點擊事件觸發；
第三，方法可以呼叫別的方法；
第四，它能接收外來的資料（參數）；
第五，它做完事還可以回傳結果（回傳值）。
有了方法，程式碼才會有靈活的生命力！
-->

---

# 方法的組成

建立一個方法需要三個要素：

| 要素 | 說明 | 範例 |
| --- | --- | --- |
| 方法名稱 | 用來辨識與呼叫這個方法 | `showMessage` |
| 參數（可選） | 呼叫時要帶入的資料 | `(name: string)` |
| 程式碼區塊 | 方法執行時要跑的邏輯 | `{ alert(...) }` |

<!--
要寫一個方法，你需要準備三大關鍵積木：
第一是「方法名稱」：這就像是工作說明書的標題，比如 `showMessage`。
第二是「參數」：這是選填的，用小括號 `()` 包起來。這代表你在執行這個 SOP 前，需要先準備好的外來工具或資料。
第三是「程式碼區塊」：用大括號 `{}` 包起來。這就是具體要執行的代碼步驟，比如跳通知。
這三個要素準備好，我們就可以在 class 內部開始寫它了。
-->

---

# 方法的組成 — 範例

```typescript
export class AppComponent {

  // 方法名稱: showMessage
  // 參數: 無
  // 程式碼區塊: 執行 alert
  showMessage() {
    alert('Hello!');
  }

}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 方法宣告在 class 內部，與全域變數並列，不需要 <code>function</code> 關鍵字
</div>

<!--
我們直接來看 TypeScript 裡的寫法。
在 `AppComponent` 這個 class 內部，我們宣告了一個 `showMessage()` 方法。
請注意！因為是在 Angular class 裡面宣告方法，所以**不需要寫 JS 原本的 `function` 關鍵字**喔！
這跟在普通的 JS 檔案裡寫法不一樣，初學者常常會順手寫出 `function showMessage()`，結果被編譯器當場退件。
在大括號內部，我們寫了 `alert('Hello!');`。
這代表只要有人呼叫 `showMessage`，它就會忠實地幫你跳出 Hello 警示框。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 在 Angular 中使用方法
# Calling Methods in Angular

<!--
好，方法在 TS 裡宣告好了，那網頁前端要怎麼去觸發它呢？我們來看看。
-->

---

# HTML 呼叫方法

在 Angular 中，通常會讓使用者點擊某個 HTML 標籤（按鈕、圖片、文字等）時，**觸發 TS 中對應的方法**。

語法：在 HTML 標籤上使用 `(click)` 事件綁定，填入要呼叫的方法名稱。

```html
<!-- app.component.html -->
<button (click)="showMessage()">點我</button>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>(click)="方法名稱()"</code> 是 Angular 的<b>事件綁定（Event Binding）</b>語法，括號代表監聽事件
</div>

<!--
在 Angular 中，如果我們要讓使用者點擊按鈕時觸發方法，語法非常簡單：
就是使用「事件綁定（Event Binding）」。
寫法是：**用小括號把事件名稱包起來，等號後面引號內填入你要呼叫的方法名稱與括號**！
你看 HTML 程式碼：`<button (click)="showMessage()">點我</button>`。
小括號代表「監聽事件」，這是在告訴瀏覽器：「給我死死盯著這個按鈕！一旦它被點擊了（click），立刻去大腦呼叫執行 `showMessage()`！」
-->

---

# HTML 呼叫方法 — TS 端

HTML 用名稱呼叫方法後，TS 檔案中必須有一個**同名方法**來處理這個事件。

```typescript
// app.component.ts
export class AppComponent {

  showMessage() {
    alert('你點了按鈕！');
  }

}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 HTML 的 <code>(click)="showMessage()"</code> 與 TS 的 <code>showMessage()</code> 名稱必須完全一致
</div>

<!--
這時候，網頁跟大腦的通道就打通了！
當使用者點擊按鈕，瀏覽器收到 (click) 的指令，就會去 TS class 裡面尋找一個叫作 `showMessage` 的方法，並執行大括號裡面的 `alert('你點了按鈕！')`。
這邊大叔要提醒一件事：**HTML 的方法名稱，跟 TS 裡的方法名稱，必須大小寫、英文字母完全一致**！
少打一個括號或是打錯字，兩邊連不上線，按鈕點下去就跟死魚一樣不會有任何反應喔！
-->

---

# TS 中方法呼叫方法

除了從 HTML 觸發，**方法也可以在 TS 內部去呼叫另一個方法**。

在方法中呼叫同一個 class 的另一個方法，需要用 `this.方法名稱()` 來呼叫。

```typescript
export class AppComponent {

  firstMethod() {
    alert('我是第一個方法');
    this.secondMethod();
  }

  secondMethod() {
    alert('我是被呼叫的第二個方法');
  }

}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 在 class 內存取自己的方法或變數，一律使用 <code>this.</code> 開頭
</div>

<!--
除了從 HTML 觸發，方法與方法之間也可以互相呼叫！
你看程式碼：
當 HTML 觸發了 `firstMethod()`，這個方法第一步跳出一個 alert，第二步寫了 `this.secondMethod();`。
這行就是在呼叫同一個 class 裡的另一個方法。
再次強調，因為是在 class 內部呼叫自己的兄弟方法，**前面一定要加上 `this.`**！
否則編譯器會以為你在叫別的地方的野方法，然後又是不給通過。
這樣當你點按鈕，就會連續跳出「我是第一個方法」和「我是被呼叫的第二個方法」兩個對話框，這在處理複雜流程拆分時非常常用。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 呼叫方法帶入值
# Method Parameters

<!--
接下來是重頭戲：我們怎麼在執行 SOP 的時候，順便帶一些工具或資料進去？這就要靠「參數（Parameters）」了！
-->

---

# 呼叫方法帶入值（單一參數）

有時我們希望呼叫方法時，讓呼叫者傳入資料。這時在方法名稱後的 `()` 中定義參數：宣告一個**區域變數**來存放傳入的值。

| 語法部分 | 說明 | 範例 |
| --- | --- | --- |
| 參數名稱 | 在方法內用來讀取傳入值的變數 | `name` |
| 型別 | 指定傳入值的資料型別 | `: string` |
| 呼叫方式 | HTML 或方法中帶入實際值 | `greet('Allen')` |

<!--
有時候，我們希望方法更通用。
比如「打招呼」的方法，不能每次都傻傻地只說 Hello。
我們希望傳入不同的人名，它就說不同的 Hello。
這時候，我們要在方法後面的小括號內宣告一個「區域變數」來裝外來的資料。
這個變數名稱可以自訂（比如 `name`），並且在 TypeScript 裡，**一定要寫上它的型別（比如 `: string`）**。
這樣，方法內部的代碼就能直接調用這個臨時的區域變數了。
-->

---

# 呼叫方法帶入值（單一參數）— 範例

```typescript
// TS：定義參數
greet(name: string) {
  alert('Hello, ' + name);
}
```

```html
<!-- HTML：呼叫時帶入值 -->
<button (click)="greet('Allen')">打招呼</button>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 有定義參數的方法，呼叫時<b>一定要帶入值</b>，否則 TypeScript 會報錯
</div>

<!--
我們看這個熱騰騰的範例。
TS 端定義了 `greet(name: string)`，裡面寫 `alert('Hello, ' + name)`。
這是在告訴大家，我這個方法需要一個字串。
接著在 HTML 端，我們呼叫 `greet('Allen')`。
這代表我們把 `'Allen'` 這個字串當作信件，寄進了 `name` 這個收件箱。
當使用者按下去，網頁就會跳出「Hello, Allen」！
在 TypeScript 的嚴格模式下，**只要你定義了參數，呼叫時就「一定要傳值」**。
如果你在 HTML 寫 `greet()` 空空的，編譯器就會立刻賞你紅線，不讓你過！
-->

---

# 多個參數與預設值

方法可以要求帶入**多個值**，也可以為參數設定**預設值**（設定後該參數變成選填）。

| 語法 | 說明 |
| --- | --- |
| `(a: string, b: number)` | 多個參數，呼叫時都必填 |
| `(name: string, age: number = 18)` | `age` 有預設值，可不填 |

<!--
如果我們要傳入很多資料呢？
很簡單，用逗號隔開就好了，例如 `(name: string, age: number)`。
不過，如果有些參數是「可有可無」的，我們就可以在定義時給它一個「等號與預設值」，像是 `(name: string, age: number = 18)`。
這樣一來，如果呼叫者在 HTML 裡偷懶沒有傳 age 參數，Angular 就會自動帶入預設值 `18`；如果有傳，就以傳入的值為準。
這在寫多功能方法時超級有彈性！
-->

---

# 多個參數與預設值 — 範例

```typescript
// 多個參數：兩個都必填
introduce(name: string, age: number) {
  alert(name + ' 今年 ' + age + ' 歲');
}
```

```typescript
// 預設值：age 不填時自動用 18
introduce(name: string, age: number = 18) {
  alert(name + ' 今年 ' + age + ' 歲');
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 有預設值的參數放在最後面，未帶值時使用預設值，帶了值時以傳入值為主
</div>

<!--
看程式碼。
如果我們寫 `introduce(name: string, age: number = 18)`。
當我們呼叫 `this.introduce('Allen')`，只給一個引數，跳出來的通知就是「Allen 今年 18 歲」。
如果呼叫 `this.introduce('Jerry', 20)`，給了兩個引數，跳出來的就是「Jerry 今年 20 歲」。
這就是參數預設值的好處，既有彈性，又可以防呆！
但要注意喔，**有預設值的參數，一律要放在參數清單的最右邊（最後面）**，不然編譯器會搞不懂你的參數順序！
-->

---
layout: default
---

# 練習：任務說明
### 製作一個互動頁面

建立一個有按鈕的 Angular 頁面，實作以下功能：

1. 頁面有一個「顯示訊息」按鈕，點擊後用 `alert` 彈出一段文字
2. 頁面再新增一個「打招呼」按鈕，點擊後呼叫方法並帶入你的名字，alert 顯示 `Hello, [名字]`
3. 在 TS 中，讓「顯示訊息」的方法執行完後，再呼叫一個名為 `logDone()` 的第二個方法，`logDone()` 執行 `console.log('完成！')`

**完成後開啟瀏覽器的開發者工具 Console 確認 log 有出現。**

<!--
好，聽完了方法的運作規則，我們馬上來大顯身手！
今天的實作練習是「製作一個有兩個按鈕的互動頁面」：
第一個是「顯示訊息」按鈕，點擊後會彈出 alert，並且在 TS 內部，呼叫第二個方法 `logDone()`，在瀏覽器的 F12 Console 裡印出「完成！」兩個字。
第二個是「打招呼」按鈕，點擊時要把你的名字當成參數傳過去，讓方法彈出「Hello, [你的名字]」。
這題能直接考驗你對事件綁定、傳參和 `this` 互叫的熟悉度，大家動手寫寫看！
-->

---
layout: default
---

# 練習：解題提示
### 完成步驟

1. 在 `app.component.html` 加入兩個按鈕：
   - `<button (click)="showMessage()">顯示訊息</button>`
   - `<button (click)="greet('你的名字')">打招呼</button>`

2. 在 `app.component.ts` 的 class 內定義三個方法：
   - `showMessage()` → `alert('訊息！')` 然後呼叫 `this.logDone()`
   - `greet(name: string)` → `alert('Hello, ' + name)`
   - `logDone()` → `console.log('完成！')`

3. 儲存後測試按鈕，並開啟 F12 → Console 確認 log

<!--
如果稍微卡住了，請看投影片的解題步驟：
首先在 HTML 裡放兩個 `<button>` 標籤，分別綁定 `(click)="showMessage()"` 和 `(click)="greet('Allen')"`。
接著到 TS class 裡面：
定義 `greet(name: string)`，裡面 `alert` 拼接字串。
定義 `logDone()`，裡面用 `console.log('完成！')`。
定義 `showMessage()`，裡面先跳 alert，再用 `this.logDone()` 呼叫上面的兄弟方法。
寫完之後，儲存、打開瀏覽器，按一下按鈕，然後按下鍵盤的 F12，切換到 Console 頁籤，看看那個「完成！」有沒有乖乖印出來。
有的話，恭喜你，你已經成功掌控方法的魔力了！
-->

---
layout: end
---

# 方法完成
### 讓程式碼可以重複被呼叫！

<!--
恭喜大家！成功收服了「方法（Method）」這隻核心大魔王！
現在你已經不僅能動態顯示資料，還能主動處理使用者的點擊行為，並且進行大腦內的邏輯運算了。
回去把今天學到的 this 調用與參數傳遞多練幾次。
下一堂課，我們要迎來第一場綜合挑戰——「TypeScript 練習一」，把我們這幾章學到的變數、型別和方法，全部揉捏在一起，做個真正的實戰！大家大腦充飽電，我們下堂課見！
-->
