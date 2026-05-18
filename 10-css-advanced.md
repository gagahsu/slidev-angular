---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: CSS 樣式編輯
routeAlias: ch10
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
    CSS 樣式編輯
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「互動、排版、套件整合」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
【開場白】
大家好！學過了 CSS 的 Box Model，今天我們要來學點「高級貨」。

【為什麼要學這個？】
現在的網頁不能只是死板板的色塊，它需要會動（互動）、需要能自動排整齊（Flexbox），甚至需要借用別人的力量（Bootstrap）來快速開發。學會這堂課，你的網頁會從「學生作品」變成「專業產品」。

【今天學完你會能做什麼】
今天結束後，你會掌握現代網頁排版的神器 Flexbox，並且學會如何幫你的專案穿上 Bootstrap 這套名牌西裝。
-->

---
layout: default
---

# Outline

- **CSS 互動 — :hover 與 :active**
- **display: flex — 主軸與次軸**
- **對齊 — justify-content 與 align-items**
- **安裝 Bootstrap**
- **練習**

<!--
【核心說明】
課程分為三大區塊：首先是讓網頁變靈動的互動效果，接著是重頭戲 Flexbox 排版，最後是實務上超常用的 Bootstrap 安裝教學。

【程式世界怎麼用】
這就像是學會了如何讓家具「自動歸位」和「感應互動」，最後再買一套組裝家具懶人包，開發速度會快到讓你驚訝。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS 互動
# :hover 與 :active

<!--
【開場白】
網頁要好用，視覺回饋是關鍵。
-->

---

# CSS 互動 — 概念

前端標籤樣式可以設定成**互動式樣式**，根據使用者操作產生不同的視覺回饋：

| 偽類 | 觸發條件 | 說明 |
| --- | --- | --- |
| `.class:hover` | 滑鼠移至標籤 | 滑鼠懸停時的樣式回饋 |
| `.class:active` | 滑鼠點擊時 | 按下滑鼠時的樣式回饋 |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>SCSS 寫法：</b> <code>.class { &amp;:hover { } } }</code>，注意 <code>&amp;:hover</code> 在 SCSS 中算是子層<br/>
💡 搭配 <code>transition</code> 屬性調整互動時間，能大幅提升使用質感
</div>

<!--
【核心說明】
這在 CSS 裡叫做「偽類 (Pseudo-classes)」。

【生活化比喻】
這就像是一個「開關」。原本燈是關的，當你的滑鼠「摸」到它（hover），燈就亮了。當你真的「按下去」（active），燈會閃爍一下。

【程式世界怎麼用】
在 SCSS 裡，我們用 `&` 這個符號來代表「自己」。`&:hover` 就是「當滑鼠摸到我自己的時候」。

⚠️ 學生常見誤解：
記得加上 `transition`。如果沒有它，顏色變化會很生硬（秒變）；加了它，顏色會像漸層一樣慢慢變，質感瞬間提升。
-->

---

# :hover — 滑鼠移至標籤

```scss
.topText {
  width: 100px;
  height: 100px;
  transition: 0.8s;
  background-color: aqua;
  &:hover {
    background-color: #888;
  }
}
```

<div style="display: flex; gap: 4rem; margin-top: 0.8rem; align-items: flex-start;">
  <div>
    <div style="margin-bottom: 0.3rem; color: #555;">原本的顏色</div>
    <div style="width: 80px; height: 70px; background: aqua;"></div>
  </div>
  <div>
    <div style="margin-bottom: 0.3rem; color: #555;">滑鼠移至目標標籤時</div>
    <div style="width: 80px; height: 70px; background: #888;"></div>
  </div>
</div>

<!--
【帶讀程式碼前的鋪陳】
我們來看這段 SCSS 是怎麼寫的。

【逐步解說】
你看 `transition: 0.8s`，這代表顏色變化要花 0.8 秒。
原本是水藍色（aqua），一旦滑鼠移過去，它就會慢慢轉變成灰色（#888）。

【類比說明】
這就像是商場的自動感應門，你走過去，它就溫柔地打開。

💼 業界實務：
所有可點擊的按鈕，在業界規範中都「必須」要有 hover 效果，這樣使用者才知道：喔！原來這個是可以點的。
-->

---

# :active — 滑鼠點擊標籤

```scss
.topText {
  width: 100px;
  height: 100px;
  transition: 0.8s;
  background-color: aqua;
  &:active {
    background-color: #333;
  }
}
```

<div style="display: flex; gap: 4rem; margin-top: 0.8rem; align-items: flex-start;">
  <div>
    <div style="margin-bottom: 0.3rem; color: #555;">原本的顏色</div>
    <div style="width: 80px; height: 70px; background: aqua;"></div>
  </div>
  <div>
    <div style="margin-bottom: 0.3rem; color: #555;">滑鼠點擊目標標籤時</div>
    <div style="width: 80px; height: 70px; background: #333;"></div>
  </div>
</div>

<!--
【核心說明】
`active` 是指「滑鼠按下去還沒放開」的那一瞬間。

【逐步解說】
通常我們會把 `active` 的顏色設得比 `hover` 更深，這樣按下去的時候會有「回饋感」。

⚠️ 學生常見誤解：
注意 `active` 的時間非常短。如果你的 `transition` 設太長，使用者按完都放開了，顏色還在變，這會讓網頁感覺反應很慢、很頓。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# display: flex
# 主軸與次軸

<!--
【開場白】
接下來，我們要學現代網頁開發的「宇宙最強排版神器」：Flexbox。
-->

---

# display: flex — 介紹

`display: flex` 讓容器擁有**主軸**與**次軸**，並改變子元素的排列方式：

- 標籤元素都變成**區塊元素（Block）**
- 主軸（Main Axis）：預設由左往右 →
- 次軸（Cross Axis）：與主軸垂直，由上往下 ↓

<div style="display: flex; justify-content: center; gap: 3rem; align-items: center; margin-top: 1.2rem;">
  <div style="position: relative; width: 220px; height: 130px; background: #4472C4; overflow: visible; flex-shrink: 0;">
    <div style="position: absolute; top: 50%; left: 0; right: -22px; height: 3px; background: red; transform: translateY(-1.5px);">
      <div style="position: absolute; right: -10px; top: -5px; border-left: 12px solid red; border-top: 6px solid transparent; border-bottom: 6px solid transparent;"></div>
    </div>
    <div style="position: absolute; left: 50%; top: 0; bottom: -22px; width: 3px; background: #22c55e; transform: translateX(-1.5px);">
      <div style="position: absolute; bottom: -10px; left: -5px; border-top: 12px solid #22c55e; border-left: 6px solid transparent; border-right: 6px solid transparent;"></div>
    </div>
  </div>
  <div>
    <div style="color: red; font-weight: bold; margin-bottom: 0.8rem;">→ 主軸（Main Axis）</div>
    <div style="color: #16a34a; font-weight: bold;">↓ 次軸（Cross Axis）</div>
  </div>
</div>

<!--
【核心說明】
Flexbox 就像是把你的標籤放上一條「傳送帶」。

【生活化比喻】
主軸就像是超市的結帳輸送帶。預設情況下，東西放上去會乖乖從左往右排。
次軸則是垂直的方向，決定這些東西要在輸送帶的上方還是下方。

【程式世界怎麼用】
以前要把兩個東西排成一排要寫幾十行 CSS。現在只要在爸爸（容器）身上寫一句 `display: flex`，裡面的小孩就會自動排成一橫排，非常神奇！

⚠️ 學生常見誤解：
記得！`display: flex` 是寫在「外層容器（爸爸）」身上，受影響的是裡面的「子元素（小孩）」。
-->

---

# display: flex — 主次軸比較

<div style="display: flex; gap: 3rem; margin-top: 1rem; justify-content: center;">
  <div>
    <div style="font-weight: bold; margin-bottom: 0.4rem;">無 display: flex</div>
    <div style="color: #16a34a; font-size: 0.9rem; margin-bottom: 0.4rem;">主軸 ↓ 由上往下（無次軸）</div>
    <div style="width: 130px; border: 2px solid #ccc;">
      <div style="background: aqua; height: 70px;"></div>
      <div style="background: #e8a090; height: 55px;"></div>
    </div>
  </div>
  <div>
    <div style="font-weight: bold; margin-bottom: 0.4rem;">有 display: flex</div>
    <div style="color: red; font-size: 0.9rem; margin-bottom: 0.4rem;">主軸 → 由左往右｜次軸 ↓</div>
    <div style="display: flex; border: 2px solid #ccc; width: 230px; height: 70px;">
      <div style="background: aqua; flex: 1;"></div>
      <div style="background: #e8a090; flex: 1;"></div>
    </div>
  </div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 參考文件：bootstrap5.hexschool.com/docs/5.1/utilities/flex/
</div>

<!--
【帶讀程式碼前的鋪陳】
我們來看看有沒有加 flex 的差別。

【逐步解說】
左邊：沒加 flex，區塊元素會很霸道地各佔一行，就像一群不認識的人在排隊，一個跟一個往下排。
右邊：加了 flex，它們瞬間變成了好朋友，手牽手排成一排。

【類比說明】
這就像是從「縱隊」變成了「橫隊」。

💼 業界實務：
現在業界 99% 的排版都是用 Flexbox。如果你不會 Flex，可以說你完全不會現代前端。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 對齊
# justify-content & align-items

<!--
【開場白】
排成一排只是開始，我們還要決定它們要「靠左、置中、還是靠右」。
-->

---

# 對齊 — 概念

`display: flex` 啟用後，可以搭配以下兩個屬性控制對齊方式：

| 屬性 | 軸向 | 說明 |
| --- | --- | --- |
| `justify-content` | **主軸** | 控制子元素在主軸方向上的對齊方式 |
| `align-items` | **次軸** | 控制子元素在次軸方向上的對齊方式 |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>vertical-align</b>：只適用於行內元素，以基準線方式對齊；用於 <code>img</code> 標籤可取消預設底部留白
</div>

<!--
【核心說明】
這兩個屬性就像是「磁鐵」。

【生活化比喻】
`justify-content` 決定小孩在「左右」要靠哪邊。
`align-items` 決定小孩在「上下」要靠哪邊。

【看圖前的引導】
記住：主軸（水平）用 `justify`，次軸（垂直）用 `align`。

⚠️ 學生常見誤解：
這兩個名字超難背！口訣：**「J橫 A直」**。J 就像橫著走的勾，A 像是直立的塔。
-->

---

# justify-content — 主軸對齊

<div style="display: flex; gap: 2rem; margin-top: 1rem;">
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">無 justify-content</div>
    <div style="display: flex; border: 2px solid #888; height: 110px; align-items: flex-start;">
      <div style="background: aqua; width: 80px; height: 80px;"></div>
      <div style="background: #e8a090; width: 80px; height: 80px;"></div>
    </div>
  </div>
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">justify-content: center</div>
    <div style="display: flex; border: 2px solid #888; height: 110px; align-items: flex-start; justify-content: center;">
      <div style="background: aqua; width: 80px; height: 80px;"></div>
      <div style="background: #e8a090; width: 80px; height: 80px;"></div>
    </div>
  </div>
</div>

```css
display: flex;
justify-content: center;
```

<!--
【核心說明】
我們來看看水平置中的威力。

【逐步解說】
以前要讓一個東西在正中間，我們要算寬度、算負 margin。
現在只要 `justify-content: center`，不管小孩有多少、寬度多少，它們都會自動擠在中間。

【程式世界怎麼用】
除了 `center`，常用的還有 `space-between`（小孩平均散開，左右貼邊），這在做導覽列的時候超級好用！
-->

---

# align-items — 次軸對齊

<div style="display: flex; gap: 2rem; margin-top: 1rem;">
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">無 align-items</div>
    <div style="display: flex; border: 2px solid #888; height: 130px; align-items: flex-start;">
      <div style="background: aqua; width: 80px; height: 80px;"></div>
      <div style="background: #e8a090; width: 80px; height: 80px;"></div>
    </div>
  </div>
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">align-items: center</div>
    <div style="display: flex; border: 2px solid #888; height: 130px; align-items: center;">
      <div style="background: aqua; width: 80px; height: 80px;"></div>
      <div style="background: #e8a090; width: 80px; height: 80px;"></div>
    </div>
  </div>
</div>

```css
display: flex;
align-items: center;
```

<!--
【核心說明】
這是在處理「垂直方向」的對齊。

【逐步解說】
你看右邊那張圖，兩個不同高度的區塊，現在正整齊地對準了中間線。
在還沒有 Flexbox 之前，這幾乎是網頁開發者的惡夢。現在，一行 `align-items: center` 就搞定了。

【類比說明】
這就像是排身高。你可以選擇頭頂齊平，也可以選擇腳底齊平，或者像這樣「肚子中間齊平」。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝 Bootstrap
# Bootstrap Integration

<!--
【開場白】
最後，我們要來借用巨人的肩膀。
-->

---

# 安裝 Bootstrap — 步驟

| 步驟 | 操作 |
| --- | --- |
| ① | 在終端機（專案根目錄）執行 `npm i bootstrap` |
| ② | 安裝完成後開啟 `angular.json` |
| ③ | 找到 `"styles": [...]`，在第一個位置加入 Bootstrap CSS 路徑 |
| ④ | 重啟專案 |

```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
],
```

<!--
【核心說明】
Bootstrap 是全球最受歡迎的 CSS 框架，裡面裝滿了現成的漂亮按鈕、表格和排版。

【逐步解說】
這就是我們在 Angular 專案裡安裝外部套件的「標準作業程序 (SOP)」。
第一步：去商店買回來（npm i）。
第二步：告訴 Angular 你買了什麼，放在哪裡（angular.json）。
第三步：重新啟動（ng serve），讓 Angular 重新讀取清單。

⚠️ 學生常見誤解：
記得路徑要寫對！如果少了一個點點或打錯字，你的 Bootstrap 就不會生效，按鈕還是會長得很醜。
-->

---

# 安裝 Bootstrap — 原理

`npm i bootstrap` 的用途是將 Bootstrap 套件**安裝進專案**，就像 HTML 的 `<link>` import 一樣（差別在於 `npm i` 是安裝套件進專案中）。

在 `angular.json` 的 `styles` 加入套件路徑，等同於告訴專案「我要匯入這個 CSS，並告訴它 CSS 的位置」。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 安裝後的套件都存放在 <code>node_modules/</code> 資料夾，路徑以 <code>./node_modules/</code> 開頭
</div>

<!--
【核心說明】
為什麼我們要這麼麻煩地安裝？

【生活化比喻】
這就像是買組裝家具。`npm i` 就是把家具搬到家裡的倉庫（node_modules）。`angular.json` 就是把家具組裝起來放在客廳。

【程式世界怎麼用】
一旦裝好 Bootstrap，你就不再需要手寫 `background-color: blue; color: white`。你只要寫 `class="btn btn-primary"`，Bootstrap 就會自動幫你變出一個專業的藍色按鈕。

💼 業界實務：
在公司開發時，我們很少從頭手寫 CSS。大多數公司都有自己的元件庫，或者是使用 Bootstrap 這種現成的框架來提升開發速度。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習
# CSS Practice

<!--
【開場白】
來測驗一下大家的 Flexbox 實力吧！
-->

---

# 練習 — Flex 排版
### 任務說明

試著做出下圖的排版：
- 中間間隔為 **10px**
- Flex item 3 左右各間隔 **10px**
- Flex item 1 跟 5 高度為 **80px**

<img src="/images/10-css/practice-flex-layout.png" alt="練習目標排版" style="max-height: 260px; margin-top: 0.8rem;" />

<!--
【核心說明】
這個練習要用到 Box Model 和 Flexbox 的組合技。

【問題引導】
大家先想一下，要怎麼讓這五個方塊排成一排？（提示：爸爸要設什麼？）
中間的間隔 10px，應該用 Margin 還是 Padding 呢？

【練習引導】
不用管顏色一不一樣，重點是那五個方塊的「位置」和「大小」要跟我的一模一樣。這題做完，你就是 Flexbox 的小高手了！
-->

---
layout: end
---

# CSS 樣式編輯完成
### 互動、排版、套件，全部就位！

<!--
【結語】
好啦！我們完成了 CSS 的進階修練。

【互動引導】
大家覺得 Flexbox 是不是比以前學過的排版方式直覺多了？如果你覺得 `justify-content` 很難記，沒關係，這輩子你還會用到它一萬次，以後閉著眼睛都能打出來。

下一堂課，我們要離開樣式的世界，進入更燒腦、但也更有趣的「邏輯世界」：JavaScript！大家準備好大腦了嗎？
-->
