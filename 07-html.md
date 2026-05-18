---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 前端語言 HTML
routeAlias: ch07
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
  .browser-preview {
    border: 2px solid #d0d0d0;
    border-radius: 6px;
    padding: 1rem 1.2rem;
    background: #ffffff;
    font-family: serif;
    margin-top: 0.8rem;
  }
---

<div class="flex flex-col justify-center items-center h-full" style="background: #ffffff;">
  <p style="color: #5eada0; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.2rem;">
    Angular Full-Stack Masterclass
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    前端語言 HTML
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「HTML & CSS — 樣板兄弟，前端之骨」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
【開場白】
大家好！今天我們要來學習網頁最基礎、也最核心的語言：HTML。

【為什麼要學這個？】
如果網頁是一個人，HTML 就是他的「骨架」。沒有骨架，再漂亮的衣服（CSS）或再聰明的大腦（JavaScript）都沒地方放。所有的網頁開發，都是從這裡開始的。

【今天學完你會能做什麼】
學完這堂課，你就能親手寫出一個簡單的網頁，學會如何放文字、放圖片、做按鈕，甚至是做一個簡單的問卷表格。
-->

---
layout: default
---

# Outline

- **HTML 介紹：什麼是 HTML？能做什麼？**
- **HTML 架構：文件結構拆解**
- **標籤（元素）：行內 vs 區塊、屬性**
- **HTML 主要標籤總覽**
- **常用標籤實作：H1-H6、列表、連結、圖片、表單**
- **練習題 1 ～ 5**

<!--
【核心說明】
今天的課程非常充實，我們會從 HTML 的基本概念講起，接著拆解它的結構，然後深入了解各種不同的「標籤」。

【程式世界怎麼用】
最後，我們會有很多實作和練習題。寫程式最快的方式就是動手寫，所以今天我們會完成五個練習，幫助大家把手感練起來。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# HTML 介紹
# 前端之骨

<!--
【開場白】
我們先來認識一下 HTML 這位老朋友。
-->

---

# HTML 是什麼？

HTML（HyperText Markup Language，超文本標記語言）是一種用於建立網頁內容並呈現在瀏覽器上的標準標記語言。

- HTML 文件由一系列**標籤（tags）**組成（例如：按鈕、輸入框、文字、Table…等）
- 瀏覽器讀取 HTML 文件，並將其**渲染成可視網頁**
- 單純 HTML 不吸引人，需搭配 **CSS** 添加風格與布局，再加上 **JavaScript** 添加互動性

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>記憶口訣：</b> HTML 是骨架、CSS 是衣服、JavaScript 是動作
</div>

<!--
【核心說明】
HTML 其實不是一種程式語言（它沒有運算邏輯），它是一種「標記語言」。

【生活化比喻】
想像你正在寫一份公文，你用螢光筆畫出「這是標題」、用紅筆畫出「這是重點」、用藍筆畫出「這是備註」。這些「標記」就是在告訴讀者這段文字是什麼。HTML 標籤就是在對瀏覽器做同樣的事。

【程式世界怎麼用】
我們在檔案裡寫標籤，瀏覽器就像是一個翻譯官，把它「渲染」成我們看到的網頁。

⚠️ 學生常見誤解：
初學者常問：為什麼我的網頁長得這麼醜？別擔心，因為你現在是在蓋「毛胚屋」，等我們學了 CSS 裝潢之後，它就會變得很漂亮。
-->

---

# HTML 語法能做什麼

1. **結構化內容**：HTML 定義網頁結構，將內容分為標題、段落、圖片等不同區塊
2. **支援多媒體**：可嵌入圖片、音樂、影片等多媒體元素，提升網頁互動性
3. **超連結**：透過 `<a>` 標籤在網頁間建立超連結，實現網頁跳轉
4. **表單提交**：提供 `<form>` 元素讓使用者輸入資料並提交到伺服器
5. **表格展示**：利用 `<table>` 標籤顯示資料表格
6. **支援樣式與設計**：透過 CSS 定義網頁樣式和佈局
7. **與 JavaScript 互動**：結合 JavaScript 實現動態功能和用戶互動
8. **SEO 支援**：`<title>` 和 `<meta>` 標籤有助搜尋引擎優化，提升網站可見度
9. **語義化標籤**：HTML5 引入 `<header>`、`<article>` 等語義化標籤，使結構更清晰
10. **跨平台支援**：網頁標準，支援各種設備和瀏覽器，保證內容一致呈現

<!--
【核心說明】
HTML 能做的事情非常多，從簡單的文字排版到複雜的表單互動。

【程式世界怎麼用】
特別注意第 8 點和第 9 點。所謂的「語義化」，就是不僅讓「人」看得懂，也讓「Google 搜尋引擎」看得懂你的網頁哪裡是重點，這對網站的搜尋排名（SEO）非常重要。

💼 業界實務：
在業界，我們非常強調語義化標籤。如果你全部都用 `div` 標籤來寫，雖然畫面看起來一樣，但 Google 會覺得你的網站結構很爛，導致排名上不去。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# HTML 架構
# Document Structure

<!--
【開場白】
寫 HTML 就像寫信一樣，有它固定的格式和禮儀。
-->

---

# HTML 基本架構

- 普遍預設網頁入口都是檔名 `index` 為主
- 語法編輯概念和樂高相似，利用**標籤（元素）**來堆疊建構
- `<body>` 內層結構介紹

```html
<!DOCTYPE html>
<html lang="en">      <!-- 網頁語系 -->
  <head>
    <meta charset="UTF-8">          <!-- 網頁編輯與拆解碼格式 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>         <!-- 網頁分頁名稱 -->
  </head>
  <body>
    <!-- 網頁主體內容 -->
  </body>
</html>
```

<!--
【核心說明】
這是一份標準 HTML 檔案的「起手式」。

【逐步解說】
最外層是 `<html>`，裡面分兩大區。
`<head>` 是網頁的「後腦勺」，放的是給瀏覽器看的資訊（比如編碼、標題、縮放比例），使用者在畫面上看不到。
`<body>` 是網頁的「身體」，你在這裡寫的所有標籤，才會真正顯示在螢幕上。

【類比說明】
這就像是一張產品說明書。`head` 是上面的序號、生產日期，而 `body` 則是說明書裡面的圖畫和文字內容。

⚠️ 學生常見誤解：
記得檔案一定要存成 `.html` 結尾，而且入口通常叫 `index.html`，不然瀏覽器會不知道要先開哪一個。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 標籤（元素）
# Tags & Elements

<!--
【開場白】
接下來，我們來看看 HTML 的最小單位：標籤。
-->

---

# 標籤（元素）概念

- `<>` 稱標記；`<h1>` 稱標籤；`</h1>` 稱結尾標籤
- **標籤中可以涵蓋其他標籤**（巢狀結構）
- 標籤有**行內**與**區塊**兩種元素型態：
  - **行內**：不自動換行、左右空間不填滿
  - **區塊**：<span style="color:red;font-weight:bold;">自動換行</span>且左右空間會<span style="color:red;font-weight:bold;">主動填滿</span>
- 能被分**班級**（`class`）、擁有**識別證**（`id`）、**不同造型**（`style`）以及擁有**名字**（`name`）

<!--
【核心說明】
標籤就像是一個個「容器」。

【生活化比喻】
標籤就像是一個三明治，有「開頭的麵包」`<p>` 和「結尾的麵包」`</p>`，中間夾著你想要的內容。
「區塊」就像是一個「大紙箱」，你放下去它就佔掉一整排；「行內」就像是「小貼紙」，它可以好幾個擠在同一排。

【程式世界怎麼用】
我們可以用 `class`（班級）來幫很多標籤設定同樣的風格，或者用 `id`（身分證）來精確指名某一個標籤。

⚠️ 學生常見誤解：
一定要記得寫「結尾標籤」！如果你只有開頭沒有結尾，就像三明治沒蓋上麵包，後面的所有內容都會被包含進去，畫面會整個亂掉。
-->

---

# 行內 vs 區塊 — 程式碼對照

```html
<main>
  <p class="block">Block 1</p>
  <p class="block">Block 2</p>
  <span name="Inline">Inline 1</span>
  <span style="color: brown;">Inline 2</span>
  <small id="small">call me small</small>
</main>
```

<div class="browser-preview text-sm mt-2">
  <div style="display:block; font-size:1em; margin:0.4em 0;">Block 1</div>
  <div style="display:block; font-size:1em; margin:0.4em 0;">Block 2</div>
  <span style="font-size:0.95em;">Inline 1 </span><span style="color:brown; font-size:0.95em;">Inline 2 </span><small style="font-size:0.8em;">call me small</small>
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> Block 各占一行；Inline 元素排在同一行不換行
</div>

<!--
【帶讀程式碼前的鋪陳】
我們來直接看這兩者的差異。

【逐步解說】
你看 `p` 標籤，雖然程式碼寫在一起，但在網頁上它們會自動「換行」，這就是區塊（Block）。
而下面那幾個 `span` 標籤，它們會乖乖地排成一排，這就是行內（Inline）。

【類比說明】
「區塊」就像是火車的車廂，一節佔一截；「行內」就像是車廂裡的乘客，可以好幾個人坐在一起。

💼 業界實務：
在切版時，搞懂誰是區塊、誰是行內非常重要。很多新手想把兩個 `div` 排成一排卻排不上去，就是因為沒搞清楚區塊元素的霸道特性。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# HTML 主要標籤
# Tags Reference

<!--
【開場白】
HTML 有上百個標籤，我們不可能一次背完，但有些是「必考題」。
-->

---

# 主要標籤（一）— 文件結構

| 標籤 | 說明 |
| --- | --- |
| `<!DOCTYPE html>` | 宣告文件為 HTML5，告訴瀏覽器用 HTML5 標準解析 |
| `<html>` | HTML 頁面的根元素，所有標籤都放在這裡面 |
| `<head>` | 包含關於網頁的資訊，**不會在網頁上顯示** |
| `<title>` | 設定網頁標題，顯示在瀏覽器分頁上 |
| `<meta>` | 設定元數據，例如編碼、描述、關鍵字等 |
| `<link>` | 連結外部資源，例如 CSS 檔案 |
| `<body>` | 顯示網頁主要內容，使用者在瀏覽器中看到的部分 |
| `<h1>` ～ `<h6>` | 標題標籤，從 h1（最大）到 h6（最小） |

<!--
【核心說明】
這組標籤定義了網頁的「身分」。

【程式世界怎麼用】
`h1` 是整個網頁最重要的標題，通常一個網頁只會有一個 `h1`。它對搜尋引擎來說非常重要。

⚠️ 學生常見誤解：
不要因為想要字大一點就亂用 `h1` 到 `h6`。如果你想要大字但它不是標題，我們應該用 CSS 來調大小，而不是亂用標籤。
-->

---

# 主要標籤（二）— 文字、連結與列表

| 標籤 | 說明 |
| --- | --- |
| `<p>` | 段落標籤，用於顯示段落文字 |
| `<a>` | 連結標籤，用來建立超連結 |
| `<img>` | 圖像標籤，用來插入圖片 |
| `<ul>` & `<li>` | 無序列表，`<ul>` 是容器，`<li>` 是列表項目 |
| `<ol>` & `<li>` | 有序列表，`<ol>` 是容器，`<li>` 自動加上編號 |
| `<div>` | 區塊元素，用於分隔頁面區域，常用於布局 |
| `<span>` | 行內元素，對文字或行內元素進行分組 |
| `<table>` | 表格標籤，用於建立表格 |
| `<tr>` & `<td>` | 表格的列（`<tr>`）和單元格（`<td>`）標籤 |

<!--
【核心說明】
這組標籤是用來放網頁「內容」的。

【生活化比喻】
`ul` 和 `li` 就像是你的「待辦清單」。`ul` 是一張紙，`li` 就是紙上的每一行項目。
`a` 標籤就像是一個「傳送門」，點了之後帶你去別的地方。

💼 業界實務：
`div` 是最常用的「萬用標籤」，它是沒有任何預設樣式的區塊。在還沒有 HTML5 語義化標籤之前，幾乎整個網頁都是 `div` 組成的。
-->

---

# 主要標籤（三）— 表單與語義化

| 標籤 | 說明 |
| --- | --- |
| `<form>` | 表單標籤，用來收集使用者輸入資料 |
| `<input>` | 輸入欄位，定義文字輸入、按鈕、選單等 |
| `<button>` | 按鈕標籤，定義可點擊的按鈕 |
| `<select>` & `<option>` | 下拉選單標籤 |
| `<iframe>` | 內嵌框架，在頁面中嵌入另一個 HTML 網頁 |
| `<nav>` | 導航標籤，定義頁面中的導航區塊 |
| `<header>` | 頁眉標籤，通常包含網站標題、導航 |
| `<footer>` | 頁腳標籤，定義頁面的尾部內容 |
| `<article>` | 文章標籤，表示自包含的獨立內容區塊 |
| `<section>` | 區段標籤，將頁面內容分組為不同邏輯區段 |

<!--
【核心說明】
這組標籤負責「互動」和「讓電腦讀懂結構」。

【程式世界怎麼用】
`form` 和 `input` 是做登入頁面、註冊頁面的靈魂。
而下半部的 `nav`、`header` 等標籤，就是我們之前提到的「語義化標籤」。

⚠️ 學生常見誤解：
有些同學會問，為什麼不直接用 `div` 加上 CSS 畫出按鈕？其實也可以，但 `button` 標籤內建了「可用鍵盤操作」等無障礙特性，這對身障人士使用網頁非常重要。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 常用標籤實作
# Hands-on

<!--
【開場白】
理論講完了，我們來動手試試看。
-->

---

# 編寫基本 HTML（練習）

開始編寫 HTML 只需一個文字編輯器（Notepad、Sublime Text、VS Code 等）。
也可用線上即時 HTML 編輯器：**https://html.cafe/**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>我的第一頁網頁</title>
  </head>
  <body>
    <h1>歡迎來到我的網頁！</h1>
    <p>這是一段簡單的文字。</p>
  </body>
</html>
```

<!--
【帶讀程式碼前的鋪陳】
我們來寫一段最迷你的網頁。

【逐步解說】
你看，我們在 `title` 寫的字會出現在瀏覽器分頁上。
而在 `body` 寫的 `h1` 和 `p` 則會出現在白色的網頁畫面中。

【練習引導】
大家可以試著把 `h1` 裡面的字改成自己的名字，看看網頁會不會立刻更新。
-->

---

# HTML 常用標籤 — H1～H6 & ul/ol

```html
<h1>h1</h1>  <h2>h2</h2>  <h3>h3</h3>
<h4>h4</h4>  <h5>h5</h5>  <h6>h6</h6>

<ul>
  <li>one</li>  <li>two</li>  <li>three</li>
</ul>

<ol>
  <li>one</li>  <li>two</li>  <li>three</li>
</ol>
```

<div class="browser-preview text-sm flex gap-8">
  <div>
    <div style="font-size:1.5em;font-weight:bold;">h1</div>
    <div style="font-size:1.2em;font-weight:bold;">h2</div>
    <div style="font-size:1.05em;font-weight:bold;">h3</div>
    <div style="font-size:0.95em;font-weight:bold;">h4 / h5 / h6</div>
  </div>
  <div>• one<br>• two<br>• three</div>
  <div>1. one<br>2. two<br>3. three</div>
</div>

<!--
【核心說明】
這幾組標籤定義了網頁的「層次感」。

【逐步解說】
`h1` 到 `h6` 的字會越來越小，這是瀏覽器預設的。
`ul` 是用「圓點」列出項目，`ol` 則是會自動幫你標上 1, 2, 3，非常聰明。

⚠️ 學生常見誤解：
記得 `li` 不能單獨存在，它一定要住在 `ul` 或 `ol` 這兩個「爸爸」標籤裡面。這就像是清單項目一定要寫在清單紙上。
-->

---

# HTML 常用標籤 — a、img

```html
<main>
  <a href="https://www.dcard.tw/f/whysoserious/p/235767148">前往酷酷的地方</a>
  <img src="https://stickershop.line-scdn.net/.../main.png" alt="">
</main>
```

<div class="browser-preview text-sm mt-2">
  <div style="margin-bottom:0.5rem;">
    <a style="color:#0000EE; text-decoration:underline; cursor:pointer;">前往酷酷的地方</a>
  </div>
  <div style="width:80px; height:80px; background:#e8e8e8; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#999; font-size:0.75em;">🐧 img</div>
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>img alt：</b> 圖片無法載入時顯示的替代文字，也有助於無障礙與 SEO
</div>

<!--
【核心說明】
這兩個標籤非常特別，它們需要「屬性」才能動。

【生活化比喻】
`a` 標籤需要 `href` 屬性，這就像是告訴傳送門「地址在哪」。
`img` 標籤需要 `src` 屬性，這就像時告訴畫框「畫在檔案夾的哪裡」。

⚠️ 學生常見誤解：
`img` 標籤是少數不需要結尾標籤的喔！你只要寫一個 `<img ...>` 就好，不用寫 `</img>`。
還有，別忘了 `alt` 屬性，這是當圖片破圖時顯示的文字，對盲人使用的語音朗讀器也非常有幫助。
-->

---

# HTML 常用標籤 — textarea、div

```html
<main>
  <textarea name="" id="" cols="30" rows="10">Cool Der</textarea>
  <div>
    Hot Div
  </div>
</main>
```

<div class="browser-preview text-sm mt-2 flex gap-6 items-start">
  <textarea style="width:180px; height:80px; font-size:0.9em;" readonly>Cool Der</textarea>
  <div>Hot Div</div>
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>textarea</b> 是多行文字輸入框；<b>div</b> 是最常用的區塊容器，預設不帶樣式
</div>

<!--
【核心說明】
`textarea` 用來寫長長的留言，而 `div` 則是你最棒的收納盒。

【生活化比喻】
`div` 就像是一個「隱形的箱子」，它本身沒有任何風格，但你可以把很多標籤丟進去這個箱子，然後統一移動它們或設定背景顏色。

【練習引導】
大家可以試著在 `textarea` 裡面打字，看看是不是可以隨意換行。
-->

---

# 輸入（input）標籤

- 輸入標籤經常被使用到，因為能輸入的**型態（type）相當多元**
- Type 有：`text`（文字）、`number`（數字）、`radio`（單選方塊）、`checkbox`（複選方塊）、`file`（選取檔案）、`password`（密碼）等等

| type | 說明 | 顯示效果 |
| --- | --- | --- |
| `text` | 一般文字輸入 | 文字框 |
| `number` | 數字輸入 | 數字框（可按箭頭調整） |
| `radio` | 單選方塊 | 圓形選項鈕 ● |
| `checkbox` | 複選方塊 | 方形勾選框 □ |
| `file` | 選取檔案 | 選擇檔案按鈕 |
| `password` | 密碼輸入 | 隱藏字元顯示 ●●●● |

<!--
【核心說明】
`input` 標籤是一個「百變怪」，全靠 `type` 屬性來變身。

【生活化比喻】
這就像是同一個模具，注入不同的材料就變成不同的東西。你給它 `password`，它就幫你把字隱藏起來；你給它 `file`，它就變成一個檔案上傳按鈕。

💼 業界實務：
在開發時，千萬不要把密碼欄位設成 `type="text"`，不然使用者輸入密碼時，全世界都會看到他的密碼喔！
-->

---

# 輸入（input）標籤 — 範例

```html
<label for="">Text</label>     <input type="text" />
<label for="">Number</label>   <input type="number" />
<label for="">Radio</label>    <input type="radio" />
<label for="">Checkbox</label> <input type="checkbox" />
<label for="">file</label>     <input type="file" />
<label for="">password</label> <input type="password" />
```

<div class="browser-preview text-sm mt-2" style="font-family: sans-serif;">
  <div>Text <input type="text" value="221ddfs" style="border:1px solid #999; padding:2px 4px;" readonly></div>
  <div>Number <input type="number" value="12345" style="border:1px solid #999; padding:2px 4px; width:80px;" readonly>
  &nbsp; Radio <input type="radio" checked readonly>
  &nbsp; Checkbox <input type="checkbox" readonly>
  &nbsp; file <input type="file" style="font-size:0.8em;" disabled></div>
  <div>password <input type="password" value="123456" style="border:1px solid #999; padding:2px 4px;" readonly></div>
</div>

<!--
【帶讀程式碼前的鋪陳】
這裡展示了各種變身後的 `input`。

【逐步解說】
你看 `radio`（單選）和 `checkbox`（複選）的差別。
單選通常是圓的，複選通常是方的，這是網頁世界的通用設計語言。
大家可以試著點點看那個「選擇檔案」，雖然目前還不能真的上傳，但可以看到選取檔案的視窗跳出來。
-->

---

# Button & label 標籤

```html
<label for="">列表名稱</label>
<button type="button">這是Button</button>
<button type="submit">這是submit</button>
```

<div class="browser-preview text-sm mt-4" style="font-family: sans-serif;">
  <span style="margin-right:0.5rem;">列表名稱</span>
  <button style="border:1px solid #999; background:#f0f0f0; padding:4px 12px; margin-right:4px; cursor:pointer;">這是Button</button>
  <button style="border:1px solid #999; background:#f0f0f0; padding:4px 12px; cursor:pointer;">這是submit</button>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>type="button"</b>：一般按鈕，點擊不會提交表單；<b>type="submit"</b>：會觸發 <code>&lt;form&gt;</code> 的送出動作
</div>

<!--
【核心說明】
按鈕分兩種：一種是單純被按的，一種是負有「送出任務」的。

【逐步解說】
如果你把按鈕放在 `form` 表單裡，預設通常是 `submit`。如果你只想做一個「清除資料」或「彈出視窗」的按鈕，記得要手動把它設為 `type="button"`。

【類比說明】
`label` 標籤就像是標籤貼紙。它可以跟 `input` 關聯起來。這樣如果你點了「列表名稱」這四個字，旁邊的輸入框也會自動被選中，這對手機使用者來說非常方便！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習題
# HTML 練習

<!--
【開場白】
接下來就是大家的動手時間囉！
-->

---
layout: default
---

# 練習 1

請開啟專案並且試著將下方圖片的畫面做出來（單純 HTML 無 CSS）。

**目標畫面：**

<div class="browser-preview" style="font-family: serif;">
  <h1 style="font-size:2em; font-weight:bold; margin:0;">HTML練習</h1>
</div>

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
🎯 <b>提示：</b> 只需要一個 <code>&lt;h1&gt;</code> 標籤，內容為「HTML練習」
</div>

<!--
【出題前的鋪陳】
這個超簡單，當作熱身！

【問題引導】
請在你的 `index.html` 的 `body` 裡面寫下一行程式碼。

【等待與觀察】
（給 30 秒讓大家練習）
-->

---
layout: default
---

# 練習 2

請開啟專案並且試著將下方圖片的畫面做出來（單純 HTML 無 CSS）。

**目標畫面：**

<div class="browser-preview text-sm" style="font-family: sans-serif;">
  <div><textarea style="border:1px solid #999; resize:both; width:200px; height:50px;" readonly>我是文字輸入框(可拉大)</textarea></div>
  <ul style="margin:0.3rem 0; padding-left:1.5rem; list-style:disc;">
    <li><input type="text" style="border:1px solid #999; padding:2px;" readonly></li>
    <li><input type="checkbox" readonly></li>
  </ul>
  <ol style="margin:0.3rem 0; padding-left:1.5rem;">
    <li><button style="border:1px solid #999; background:#f0f0f0; padding:1px 6px; font-size:0.85em;">選擇檔案</button> 未選擇任何檔案</li>
    <li><input type="radio" readonly></li>
  </ol>
  <button style="border:1px solid #999; background:#f0f0f0; padding:3px 10px; margin-top:4px;">我是按鈕Button</button>
</div>

<!--
【核心說明】
這個練習要用到剛剛學的列表和各種輸入框。

【逐步解說】
提示一下：裡面用到了 `textarea`、`ul`、`ol` 還有各種不同 `type` 的 `input`。

【練習引導】
不用管顏色和間距，只要標籤對了、順序對了就算成功！
-->

---
layout: default
---

# 練習 3

請開啟專案並且試著將下方圖片的畫面做出來（單純 HTML 無 CSS）。

**目標畫面：**

<div class="browser-preview text-sm" style="font-family: serif;">
  <h1 style="font-size:1.6em; font-weight:bold; margin:0 0 0.3rem;">HTML練習</h1>
  <p style="margin:0 0 0.5rem; font-size:0.9em;">可愛的圖片</p>
  <img src="/images/07-html/practice3-animal.png" alt="可愛的圖片" style="max-width:260px; max-height:120px; border-radius:4px;" />
</div>

<div class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
🎯 <b>提示：</b> 結構為 <code>&lt;h1&gt;</code> + <code>&lt;p&gt;</code> + <code>&lt;img&gt;</code>，將圖片放入 src 屬性即可
</div>

<!--
【核心說明】
我們來練習放圖片。

【練習引導】
圖片的路徑就在提示裡面。如果你發現圖片跑不出來，檢查一下你的 `src` 路徑有沒有寫錯，或者是檔案名稱的大小寫有沒有對。
-->

---
layout: default
---

# 練習 4

請開啟專案並且試著將下方圖片的畫面做出來（單純 HTML 無 CSS），可參考 https://www.w3schools.com/html/html_tables.asp。

**目標畫面：**

<div class="browser-preview text-sm" style="font-family: sans-serif;">
  <h1 style="font-size:1.5em; font-weight:bold; margin:0 0 0.5rem;">HTML練習</h1>
  <table style="border-collapse:collapse; font-size:1em;">
    <thead>
      <tr>
        <th style="border:1px solid #000; padding:6px 16px;">姓名</th>
        <th style="border:1px solid #000; padding:6px 16px;">數學</th>
        <th style="border:1px solid #000; padding:6px 16px;">英文</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #000; padding:6px 16px;">小明</td>
        <td style="border:1px solid #000; padding:6px 16px;">90</td>
        <td style="border:1px solid #000; padding:6px 16px;">85</td>
      </tr>
      <tr>
        <td style="border:1px solid #000; padding:6px 16px;">小華</td>
        <td style="border:1px solid #000; padding:6px 16px;">70</td>
        <td style="border:1px solid #000; padding:6px 16px;">95</td>
      </tr>
    </tbody>
  </table>
</div>

<!--
【核心說明】
這題最有挑戰性，是製作表格。

【逐步解說】
表格最容易搞混 `tr`（列）和 `td`（格）。記得，先有一列，才有格子喔！

【類比說明】
這就像是蓋大樓。`tr` 是第幾層樓，`td` 就是那一層樓裡面的第幾個房間。
-->

---
layout: default
---

# 練習 5（上）— 個人名片頁面

請開啟專案並且試著將下方圖片的畫面做出來（單純 HTML 無 CSS）。

<img src="/images/07-html/practice5.png" alt="練習5目標畫面" style="max-height: 320px;" />

<!--
【核心說明】
這是今天的最終大魔王：綜合練習。

【出題前的鋪陳】
我們要把剛才學到的所有東西：標題、段落、圖片、列表、表格、表單，全部整合在一個「個人名片」網頁裡。
-->

---
layout: default
---

# 練習 5（下）— 完整頁面所需標籤

| 區塊 | 使用標籤 |
| --- | --- |
| 姓名 + 自我介紹 | `<h2>` `<p>` `<img>` |
| 關於我、我的興趣 | `<h3>` `<p>` `<ul>` `<li>` |
| 聯絡我 + 連結 | `<h3>` `<p>` `<a>` |
| 我的作品 | `<table>` `<tr>` `<th>` `<td>` |
| 留言給我 | `<form>` `<input>` `<textarea>` `<button>` |

<!--
【解說要點】
我已經幫大家把需要的標籤都列出來了。

【逐步帶著看】
大家可以依照這張表，由上而下一個區塊一個區塊地寫。不用急，這題我們會花 15 分鐘讓大家慢慢做。
-->

---
layout: end
---

# HTML 學習完成
### 掌握骨架，前端世界從這裡開始！

<!--
【結語】
好啦！恭喜大家完成了 HTML 的基礎訓練。雖然現在網頁看起來還很素，但你已經成功打好了地基。

【互動引導】
寫完這五個練習，大家有沒有發現哪一個標籤最難用？或者你有沒有發現，有些標籤如果不小心少寫一個角括號，後面的畫面會變得很神奇？

下一堂課，我們要來學習 CSS，幫這些骨架穿上漂亮的衣服囉！
-->
