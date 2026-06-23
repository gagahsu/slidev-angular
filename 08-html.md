---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 前端語言 HTML
routeAlias: ch08
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
大家好啊！今天我們要來學習整個網頁世界的最基本底牌，也是最核心的語言——HTML！
你想想看，如果一個網頁是一個人，那麼 HTML 就是他的「人體骨架」。
沒有這副骨架，就算你有再漂亮的衣服（CSS）或者再聰明會算數的大腦（JavaScript），通通都沒地方掛。
所有的網頁開發起手式，全都是從這裡開始的。
今天這堂課結束後，你就能親手寫出人生中第一個有模有樣的網頁，學會怎麼在上面貼文字、塞圖片、按按鈕，甚至還能做出一個留言表單喔！
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
今天的行程非常豐富：
我們會先從什麼是 HTML 開始，接著拆解網頁的整體架構，然後帶大家去認識最核心的各種「標籤」積木。
最後也是最精準的，我們準備了五個實戰練習題，寫扣沒有別的捷徑，就是動手擼代碼，今天我們就把手感給練起來！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# HTML 介紹
# 前端之骨

<!--
首先，第一站：我們先來跟 HTML 這位老前輩打個招呼，認識認識它。
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
其實嚴格來說，HTML「不是」程式語言，因為它沒有任何 logical 邏輯運算。它只是一個「標記語言」。
我們用生活例子來比喻。
想像你正在改一份學生的報告，你用黃色螢光筆畫出「這是大標題」，用紅筆圈起「這是重點段落」，用藍色筆註明「這是一張插圖」。
你畫的這些記號，就是「標記」。
HTML 做的事情一模一樣，它只是在文字前後夾上標籤，告訴瀏覽器：「喂！這是一段文字」、「這是一個按鈕」。
瀏覽器這個「翻譯官」看懂之後，就會把它渲染成你看到的網頁。
初學者常問說：「老師，為什麼我寫出來的網頁醜到爆？」
別慌！你現在蓋的是沒有粉刷的「水泥毛胚屋」，等下一堂 CSS 來做室內裝潢之後，它就會變豪宅了！
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
HTML 的用途包羅萬象，從排版、塞影片，到讓你輸入帳號密碼的表單都有。
不過在這裡，我要特別強調第 8 點跟第 9 點——「SEO 支援與語義化標籤」。
你想想，Google 每天都在網路上爬幾億個網頁。
如果你的網頁全部都用沒有意義的 `div` 標籤來裝，雖然人在瀏覽器上看起來很正常，但搜尋引擎的爬蟲看過來只會覺得這是一堆廢紙。
如果我們用 `<header>` 裝頁首，用 `<nav>` 裝導航，Google 爬蟲就會高興地說：「哇！結構太清晰了！」
這就是為什麼寫好 HTML 的語義，是網站搜尋排名（SEO）上榜的關鍵心法！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# HTML 架構
# Document Structure

<!--
現在我們來拆解一個標準網頁檔案的起手式。這就像寫信一樣，有固定的公版格式。
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
有了大架構，現在我們來看構成網頁內容的最小積木顆粒——標籤（Tags）！
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
我們直接來看這段扣在瀏覽器渲染出來的樣子。
你看那個 `<p>` 標籤，它就是霸道區塊元素（Block）。
雖然程式碼排在附近，但在瀏覽器上，`Block 1` 和 `Block 2` 卻強制換行、各自霸佔了一整排。
反觀底下的 `<span>` 標籤，它是溫和的行內元素（Inline）。
`Inline 1`、`Inline 2` 和旁邊的 `call me small` 都像好朋友一樣，肩並肩排在同一條線上。
這就像「車廂」與「乘客」。
區塊是火車車廂，一節就是一整道；行內是裡面的乘客，大家擠一擠就能在同一排看風景。
切版時一定要分清楚這兩個脾氣，否則你之後想把按鈕並排，卻發現它們死活都要換行，會氣到砸鍵盤！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# HTML 主要標籤
# Tags Reference

<!--
HTML 標籤有一百多個，全部背起來你的大腦會燒掉。我們只需要記住最常遇到的幾位核心常客就好！
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
首先是「結構家族」。
`<h1>` 到 `<h6>` 是標題大軍。`h1` 的字最大，`h6` 的字最小。
在程式世界裡，**一個網頁最好只出現一個 `h1`**。
這就像是這份文件的「唯一大標題」。
初學者最常犯的錯是：因為想讓某段字體變粗變大，就拼命用 `<h1>` 標記它。
千萬別這樣！
如果你只是想要字體變大，我們應該之後在 CSS 裡面寫「字體大小：50px」，而不是亂發 `h1` 標題執照給它，否則搜尋引擎的爬蟲會以為你的網頁有十個大主題，直接把你評為垃圾網站。
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
最後是「表單與語義家族」。
如果你的網頁需要讓使用者登入、寫問卷、點擊送出，那你絕對少不了 `<form>` 表單和 `<input>` 輸入框。
這兩個是收集用戶情報的黃金搭檔。
而底下的 `<nav>`（導覽列）、`<header>`（頁首）、`<footer>`（頁尾），就是我剛剛耳提面命的「語義化標籤」。
雖然它們在畫面上看起來就跟一般的 `div` 一模一樣。
但有了它們，Google 的搜尋引擎爬蟲一眼看過來，就能知道你的網站哪裡是主要導覽、哪裡是頁尾版權宣告，這是做 SEO 優化時非常尊貴的利器！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 常用標籤實作
# Hands-on

<!--
聽了這麼多，我們不要只做鍵盤俠，直接上機來寫一段最簡單的網頁！
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
來，看看這段最基本的代碼。
在 `<head>` 的 `<title>` 裡面寫著「我的第一頁網頁」，當你在瀏覽器打開時，你的瀏覽器最上面那個分頁標籤，就會寫著這幾個字。
而在 `<body>` 裡寫的 `<h1>` 標題和 `<p>` 段落，就會大刺刺地顯示在白色背景的主畫面上。
大家可以打開練習檔，試著把 `h1` 裡的字改成「某某某的專屬小窩」，存檔之後看看瀏覽器，是不是立刻變了？
這就是寫網頁最即時的反饋樂趣！
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
我們來比較一下這幾個標籤的輸出效果。
`h1` 到 `h6` 在沒有寫 CSS 的情況下，瀏覽器會自作聰明地幫你排大小和加粗，通常 `h1` 就是你的主標題，`h2` 是副標題，依此類推。
接著你看列表！
如果用 `<ul>`，列表前面會是小圓點；如果是 `<ol>`（Ordered List），瀏覽器就會非常貼心地幫你自動標上 `1, 2, 3` 的序號。
再說一次，不要把 `<li>` 單獨丟在外面！
如果沒有 `ul` 或 `ol` 當作外包裝，這行列表在網頁上的排版就會完全失控。
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
現在我們來看看兩個需要外掛參數的標籤——`<a>`（連結）和 `<img>`（圖片）。
這兩個標籤光靠名字是動不起來的，它們需要「屬性（Attributes）」來指引方向。
`<a>` 標籤需要搭配 `href` 屬性，這就像是設定傳送門的「目標經緯度」。你如果沒寫 URL 地址，按下去什麼都不會發生。
`<img>` 則需要 `src`（Source）屬性，告訴它你的圖片檔案存在哪條路徑下。
這裡有兩個新手極容易翻車的雷點：
第一，`<img>` 是單標籤！它不需要蓋子，也就是你寫一個 `<img src="...">` 就完工了，千萬不要畫蛇添足寫 `</img>`！
第二，一定要寫 `alt` 屬性。當圖片失聯或網路太慢跑不出圖時，網頁就會顯示 `alt` 寫的文字。這也是對視障朋友的無障礙語音非常友善的設計！
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
如果你要讓使用者輸入長篇大論，比如寫申訴信或留言板，那我們就得用 `<textarea>` 多行輸入框。
你可以拉動它的右下角，框框就會像橡皮筋一樣被拉大，非常療癒。
而底下的 `<div>`，就像我剛剛說的，它就是一個「透明的整理箱」。
它在瀏覽器上預設沒有任何邊框或背景色，但你可以用它把一堆文字和圖片歸納在一起。
當你要搬移或是換底色時，只要對這個整理箱（`div`）下指令，裡面的內容物就會一起聽話移動，非常好用！
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
要說整個 HTML 裡誰最會變身？那絕對非 `<input>` 莫屬！它簡直是標籤界的「百變怪」。
你只要改變它的 `type` 屬性，它就能呈現出完全不同的面貌。
你給它 `type="text"`，它就是普通的單行文字框。
你給它 `type="password"`，它就化身為防偷窺模式，輸入的字通通變成黑色小圓點。
你給它 `type="checkbox"`，它就變成打勾用的方框。
在業界開發時，請各位工程師良心發現，**千萬不要把密碼欄位的 `type` 設成 `text`**！
不然使用者在火車上登入時，他後面站著的所有人都會把他的密碼看得一清二楚，這絕對會成為資安大慘案！
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
我們看看這些百變怪實際跑出來的模樣。
大家特別觀察一下 `radio`（單選）和 `checkbox`（複選）的造型。
單選鈕通常是小圓圈，一次只能選一個（像選性別）；複選框是小方格，可以勾選多個（像選興趣）。這是全世界網頁約定俗成的設計語言。
還有那個 `type="file"`，瀏覽器會自動在旁邊幫你生出一個「選擇檔案」的按鈕。
雖然我們現在還沒寫後端，點下去不能真的傳上雲端，但你可以看到系統的選檔視窗已經被成功喚醒了！
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
接著是按鈕 `<button>`。在表單裡，按鈕的 `type` 主要有兩種：
第一種是 `type="button"`，它就是個普通的空包彈按鈕，按下去不會發生任何預設動作，全等著你用 JavaScript 給它賦予靈魂。
第二種是 `type="submit"`，這顆是「實彈」，按下去會立刻觸發 `<form>`，把表單裡的資料全部打包送出給伺服器。
另外，`<label>` 標籤是 `input` 的好拍檔。它片就像是輸入框的「觸發標籤」。
如果你用 `label` 把文字和輸入框綁在一起，使用者就算手指比較粗，點不到那個小小的輸入框，只要點到 `label` 的文字，游標就會自動跳進輸入框裡，對手機用戶超級貼心！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習題
# HTML 練習

<!--
好！大道理講完了，現在換你們的鍵盤開始熱身，我們要開始進入實戰練習題囉！
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
練習一超級簡單，連你阿嬤都會寫，純粹用來熱身！
請在你的 `body` 裡只寫一個標籤，做出畫面上那行粗粗大大的「HTML練習」字樣。
限時 30 秒，開始！
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
練習二稍微有一點點難度囉。
請大家觀察這個畫面，裡面放了文字輸入框、無序列表、有序列表，還有檔案上傳跟按鈕。
先別管排版美不美、間距寬不寬，我們現在是在蓋毛胚屋。
單純只要你用的標籤正確、順序對了，就算過關！
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
  <img src="/images/08-html/practice3-animal.png" alt="可愛的圖片" style="max-width:260px; max-height:120px; border-radius:4px;" />
</div>

<div class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
🎯 <b>提示：</b> 結構為 <code>&lt;h1&gt;</code> + <code>&lt;p&gt;</code> + <code>&lt;img&gt;</code>，將圖片放入 src 屬性即可
</div>

<!--
練習三，我們要來放一張可愛動物的圖片。
圖片的檔案路徑我已經寫在下方的黃色提示箱裡了。
很多同學常常會卡在「圖片破圖」跑不出來。
這時候百分之九十都是路徑寫錯，或者英文字母大小寫沒對齊，請大家細心檢查喔！
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
練習四，我們要來做一張功課表/成績單表格 `<table>`。
這是新手最容易寫到頭暈的標籤。
你只要記住一個口訣：「先有樓層，才有房間」。
`<tr>`（Table Row）代表「樓層」（也就是橫列）；
`<td>`（Table Data）代表「房間」（也就是橫列裡的每個單元格）。
一定要先開一組 `<tr>`，才能在裡面塞好幾組 `<td>`，否則你的大樓蓋出來絕對是歪的！
-->

---
layout: default
---

# 練習 5（上）— 個人名片頁面

請開啟專案並且試著將下方圖片的畫面做出來（單純 HTML 無 CSS）。

<img src="/images/08-html/practice5.png" alt="練習5目標畫面" style="max-height: 320px;" />

<!--
練習五是我們今天的終極大魔王——我們要用剛才學到的所有積木，拼出一張你專屬的「個人名片網頁」！
這裡會用到標題、圖片、列表、表格，還有讓別人聯絡你的留言表單。
大家可以把這題當成你工程師生涯的第一個網頁小作品！
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
別怕，我已經把名片網頁每個區塊所對應的標籤提示都列在投影片的表格裡了。
大家可以像是照著說明書拼樂高一樣，從上到下一個一個區塊來寫。
這題我們會給大家 15 分鐘的時間，慢慢來，遇到 bug 隨時呼叫我！
-->

---
layout: end
---

# HTML 學習完成
### 掌握骨架，前端世界從這裡開始！

<!--
恭喜大家！順利完成了 HTML 的大挑戰！
雖然現在網頁看起來就跟沒有油漆的水泥牆一樣，但你已經親手在電腦裡打好了前端的地基。
大家剛剛寫練習時，有沒有發現只要少寫一個角括號 `<`，或者漏了斜線 `/`，網頁就會呈現非常奇妙的混亂景象？
這就是寫扣好玩的地方！
下一堂課，我們要來幫這些光溜溜的骨架穿上華麗的衣服——我們要學習 CSS 囉！
-->
