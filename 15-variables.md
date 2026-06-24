---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 變數使用
routeAlias: ch14
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
    變數使用
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓資料從 TypeScript 流向畫面」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員好！上堂課我們把 TypeScript 的資料型別通通了解了一遍。
但是，光知道型別是不夠的，我們必須在程式裡把這些資料「存起來」，並且在需要的時候拿出來「展示在畫面上」。
今天這堂課，我們就要來學習怎麼在 TypeScript 裡宣告變數，了解全域變數與區域變數的生存戰役，以及怎麼用 Angular 的神奇魔術——「資料綁定（Data Binding）」，把我們寫在 TS 裡的資料，活生生地秀在 HTML 的網頁畫面上！
-->

---
layout: default
---

# Outline

- **全域變數**
- **區域變數**
- **let / const / var 比較**
- **let VS var**
- **Angular 中宣告變數**
- **畫面呈現（Data Binding）**
- **實作練習**

<!--
今天我們的作戰計畫如下：
我們會先探討變數的「勢力範圍」，也就是全域跟區域變數。
接著，我們會釐清 `let`、`const` 與 `var` 的歷史糾葛，特別是為什麼現代開發中，`var` 已經成了人人喊打的過街老鼠。
然後，我們正式進入 Angular 世界，看看在專案裡要怎麼宣告變數、怎麼解決「沒有初始值」的紅字報錯。
最後，我們會玩玩資料綁定，並做一個把 HTML 內容全部用變數替代的實作練習！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 變數的種類
# Variable Scope

<!--
首先，我們來看看變數的「勢力範圍」，在程式學術界，這叫做「作用域（Scope）」。
-->

---

# 全域變數

當你需要一個值，要讓整個 TS 都可以使用到，並且值不會消失，那你就需要宣告一個**全域變數**。

在方法中需要取得這個變數的值時，必須使用 `this.` 去呼叫它。

```typescript
export class AppComponent {
  title = 'demo2';

  showTitle() {
    alert(this.title);
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 全域變數宣告在 class 的最上層，方法內透過 <code>this.變數名稱</code> 存取
</div>

<!--
第一個是「全域變數（Global Variable）」。
想像一下，這就像是你的「長效存摺」。
你把它宣告在 class 的最上層，整個 TypeScript 檔案裡的任何地方都可以讀取它，而且它的值會一直存在記憶體中，直到網頁關閉為止。
不過在 Angular class 裡面，有個很特別的潛規則：
當你在方法（Method）裡想要調用這個全域變數時，**你必須在前面加上 `this.`**！
這個 `this` 就像是中文裡的「我的」。
你要大聲告訴瀏覽器：「我要拿『我的』 title 變數！」
如果不加 `this.`，瀏覽器會一頭霧水，以為你在叫別人的名字，然後就賞你一個紅字報錯喔！
-->

---

# 區域變數

當你需要一個值**只在某個方法中使用**，並且使用完之後不需要繼續存在記憶體中，那你就可以宣告一個**區域變數**。

方法執行結束後，這個變數就會消失，無法在這個 TS 的其他地方呼叫它。

```typescript
showTitle() {
  let title = "demo2";
  alert(title);
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 區域變數的生命週期只在方法執行期間；全域變數則在 class 實例存活期間都可使用
</div>

<!--
第二個是「區域變數（Local Variable）」。
如果全域變數是長效存摺，那區域變數就是「一次性免洗餐具」。
你把它宣告在某個方法（Method）的肚子裡面。
一旦這個方法執行完了，這個變數就會立刻被回收銷毀，不佔用任何記憶體。
所以，別的方法是絕對沒有辦法叫用它的。
你看程式碼，我們在 `showTitle()` 裡用 `let title` 宣告它，它就只能在這對大括號 `{}` 裡面活動，出了這個門，誰也不認識它。
-->

---

# 區域變數 — let / const / var

宣告區域變數時會遇到一個問題：我該使用 `let`、`var` 還是 `const`？

| 關鍵字 | 說明 | 建議使用時機 |
| --- | --- | --- |
| `const` | 識別值（identifier），宣告後**不能**重新指定值 | 不會改變的固定值 |
| `let` | 變數（variable），可以被重新指定值 | 一般變數，**最常用** |
| `var` | 最弱的宣告方式，有 hoisting 問題 | **不建議使用** |

<!--
好，那我們在宣告區域變數時，有三個關鍵字可以用：`const`、`let`、`var`。
它們是什麼關係呢？
`const` 是「常數」，一旦宣告並指定了值，這輩子就不能再改了，適合用在像是圓周率 `3.14` 或是固定不變的設定值。
`let` 是「一般變數」，宣告完之後，後面你想怎麼改它都行，是我們開發中最常用的主力。
`var` 是 JS 早期的宣告方式，防禦力極低，有很多靈異現象（Hoisting 提升問題），所以在現代 TypeScript 開發中，**大叔嚴厲禁止大家使用 var**！
-->

---

# let VS var — 為什麼不用 var？

`let` 和 `var` 功能類似，但 `var` 不夠嚴謹：**`var` 可以在宣告前就使用（hoisting）**，導致對值的理解很容易出錯。

```typescript
// ❌ var 的危險：宣告在使用之後，系統不會報錯
showTitle() {
  title = "demo";     // 先使用
  alert(title);
  var title: string;  // 再宣告（var hoisting）
}
```

```typescript
// ✅ let 的正確習慣：必須先宣告才能使用
showTitle() {
  let title = "demo2";
  alert(title);
}
```

<!--
來，我們把 `let` 和 `var` 拿出來鞭屍一下。
為什麼不要用 `var`？
因為 `var` 會發生「宣告提升（Hoisting）」。
你看上面那段程式碼，我們先寫 `title = "demo"` 賦值，接著跳通知，最後一行才寫 `var title`。
這在別的程式語言裡絕對是死罪，但在 JavaScript 裡，因為 `var` 的關係，系統居然假裝沒事，完全不報錯！
這就像是你還沒買機票，就已經坐在飛機上了，非常不合邏輯，專案大了之後很容易產生各種莫名其妙的 bug。
反觀底下的 `let`，非常嚴謹，你必須先乖乖宣告，後面才能使用。如果順序錯了，編譯器當場就會賞你紅字。
所以，請大家養成好習慣，宣告變數一律用 `let` 或 `const`！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Angular 中宣告變數
# Declaring Variables in Angular

<!--
了解了變數之後，我們來看看在實際的 Angular 專案裡，怎麼宣告要給畫面顯示的變數。
-->

---

# 宣告變數（一）

當畫面需要顯示一個**會根據使用者操作而改變的值**，你需要先在該 HTML 的 TS 檔案中宣告一個全域變數，HTML 就可以串接 TS 中的資料並展現在畫面中。

```typescript
export class AppComponent {
  testTitle: string = '我是標題';  // 有初始值 ✅
  testContent: string;             // 沒有初始值 ❌ TypeScript 會報錯
}
```

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/declare-var-ts.png" style="max-height: 200px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

<!--
當我們想把 TS 裡的資料丟給 HTML 顯示時，我們要在 class 裡宣告全域變數。
但是，如果你寫 `testContent: string;`，也就是只告訴編譯器它是字串，卻「不給它初始值」，新版 Angular 的嚴格型別檢查就會立刻跳出紅字警告：「喂！你這變數可能是 undefined 喔，不准這樣寫！」
這對初學者來說非常挫折。
別怕，如果它需要初始值，我們最簡單的方式就是直接給它等號賦值，像是 `testTitle: string = '我是標題';`，這樣就皆大歡喜了。
-->

---

# 宣告變數（二）— 處理無初始值

當變數確實不需要初始值時，有兩種寫法可以消除錯誤：

| 寫法 | 語意 | 使用時機 |
| --- | --- | --- |
| `testContent!: string` | 非空斷言：我保證執行時一定有值，跳過檢查 | 確定之後會被賦值 |
| `testContent?: string` | 可選屬性：此屬性可能不存在（即 `undefined`） | 值本來就可能不存在 |

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/declare-var-error.png" style="max-height: 200px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

<!--
「但大叔，我這個變數一開始就是沒有值啊，要等 API 回傳才有，那我該怎麼寫？」
問得好！這時候我們有兩個消除紅字的安全徽章可以使用：
第一種是在變數名稱後面加驚嘆號，寫成 `testContent!: string;`。
這叫「非空斷言（Non-null Assertion）」。
這是在向編譯器拍胸脯保證說：「放心，我以我的肝發誓，雖然現在沒值，但程式跑起來的時候它一定會有值，你不用擔心！」編譯器就會放行。
第二種是加問號，寫成 `testContent?: string;`。
這叫「可選屬性（Optional）」。
意思是告訴編譯器：「這變數本來就可能不存在，要是它真的是 undefined，你也別生氣喔。」
這兩種寫法在 Angular 實務中都非常常見，大家一定要記下來！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 畫面呈現
# Data Binding

<!--
好，TS 的變數宣告搞定了，接下來就是最神奇的魔術表演——如何把變數呈現在網頁畫面上！
-->

---

# 畫面呈現（一）— 字串插值

全域變數宣告完後，在 HTML 中用 `{{ 變數名稱 }}` 將變數名稱包起來，畫面就會呈現出變數的內容。

**HTML（顯示變數）：**

```html
{{ testTitle }}
```

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/binding-interpolation.png" style="max-height: 200px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>&#123;&#123; &#125;&#125;</code> 是 Angular 的<b>字串插值（String Interpolation）</b>語法，會將 TS 變數的值直接顯示在 HTML 中
</div>

<!--
第一種魔術叫做「字串插值（String Interpolation）」。
在 Angular 中，語法非常簡單，就是使用「雙大括號」：`{{ 變數名稱 }}`。
只要你在 HTML 裡寫了 `{{ testTitle }}`，Angular 在渲染網頁時，就會自動去對應的 TS 檔案裡找到這個變數的值，然後把文字塞進去。
你看右下角的示意圖，TS 裡的 `我是標題`，就這樣乖乖出現在網頁畫面上囉！
-->

---

# 畫面呈現（二）— 搭配 HTML 標籤

顯示的變數也可以用 HTML 標籤包起來，用來取代原本固定的值。

```html
<h1>{{ testTitle }}</h1>
```

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/binding-h1.png" style="max-height: 200px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>{{ }}</code> 可以放在 any HTML 標籤的<b>文字內容位置</b>，但無法直接放在屬性值內（屬性需用屬性綁定）
</div>

<!--
當然，這個雙大括號也可以塞進任何 HTML 標籤裡面。
比如用 `<h1>{{ testTitle }}</h1>` 包裹。
這樣一來，顯示出來的變數內容就會直接套用 `<h1>` 的標題粗體樣式。
這對我們動態呈現標題、內文、作者名稱等資訊，非常方便。
-->

---

# 畫面呈現（三）— 屬性綁定

除了顯示文字，也可以用來替代標籤的**屬性（Attribute）**內容，例如按鈕文字或圖片來源。

```html
<button>{{ buttonText }}</button>
<img [src]="imgSrc">
```

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/binding-attr.png" style="max-height: 200px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 屬性內容使用<b>屬性綁定（Property Binding）</b>語法 <code>[屬性名稱]="變數名稱"</code>，而非 <code>{{ }}</code>
</div>

<!--
「大叔，那如果我是要動態改變圖片的 src，或是按鈕的 disable 狀態呢？也可以用雙大括號嗎？」
不行！如果是 HTML 標籤內部的「屬性」，我們不能用雙大括號。
我們要用第二種綁定法，叫做「屬性綁定（Property Binding）」。
寫法是：**用中括號把 HTML 的屬性包起來，等號後面引號內直接寫 TS 的變數名稱**！
你看程式碼：`<img [src]="imgSrc">`。
請注意，此時 `imgSrc` 不需要寫雙大括號，直接寫變數名稱就好！
因為中括號會告訴 Angular：「引號裡面的字不要當成一般文字，請把它當成 TS 的變數來解析！」
這招非常重要，請大家深深地刻在腦海裡！
-->

---
layout: default
---

# 練習：任務說明
### HTML 全部改用變數顯示

將下面頁面的所有內容，改為從 TS 的全域變數來讀取並顯示，包括圖片來源也是。

**目標畫面包含：**

- `<h1>` 顯示標題文字
- `<h3>` 顯示內容文字
- `<img>` 顯示一張圖片

不可以在 HTML 中直接寫死文字或網址，全部透過 TS 變數傳入。

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/practice-result.png" style="max-height: 220px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

<!--
好，聽懂了雙大括號字串插值，還有中括號屬性綁定，我們馬上來小試身手！
請大家把原本寫死的 HTML 網頁全部大改造：
裡面的 `<h1>` 標題、`<h3>` 內文，還有 `<img>` 的圖片來源，
全部改用 TS 的全域變數來提供。
不准在 HTML 裡留下任何中文字或固定的網址，全部從 TS 射過來！
-->

---
layout: default
---

# 練習：解題提示
### 完成步驟

1. 在 `app.component.ts` 的 class 內宣告三個全域變數：
   - `titleText: string = '我是標題'`
   - `contentText: string = '內容是我'`
   - `imageSrc: string = '你的圖片網址'`

2. 在 `app.component.html` 中：
   - 用 `{{ titleText }}` 放入 `<h1>` 標籤內
   - 用 `{{ contentText }}` 放入 `<h3>` 標籤內
   - 用 `[src]="imageSrc"` 設定 `<img>` 的圖片來源

3. 儲存後觀察瀏覽器是否正確顯示

<!--
如果沒有頭緒，請看投影片的提示：
第一步，先在 `app.component.ts` 的 class 裡，宣告三個變數：`titleText`、`contentText` 和 `imageSrc`，並給它們初始值。
第二步，在 `app.component.html` 裡，
把 `<h1>` 裡面改成 `{{ titleText }}`；
`<h3>` 裡面改成 `{{ contentText }}`；
`<img>` 標籤的 `src` 前面加上中括號，變成 `[src]="imageSrc"`。
儲存後，看看畫面是不是一樣完美呈現？
如果一樣，恭喜你，你已經成功掌握了 Angular 資料傳遞的通訊密碼！
-->

---
layout: end
---

# 變數使用完成
### 讓資料從 TypeScript 流向畫面！

<!--
恭喜大家！成功把資料從 TypeScript 的大腦流向了 HTML 的網頁皮膚！
這代表你的網頁從今天起，正式告別了「死水一潭」的靜態時代，開始能夠動態接收和展示資料了。
回去把這兩種綁定方式多寫幾次。
下一堂課，我們要來學習程式的行為控制器——「方法（Methods）」，也就是讓網頁學會動手做事！大家休息一下，我們等一下見！
-->
