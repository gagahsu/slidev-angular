---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: CSS 基礎語法
routeAlias: ch09
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
    CSS 基礎語法
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「前端之肉 — 讓網頁穿上衣服」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
【開場白】
大家好！學完了 HTML 的骨架，現在我們要進入最有趣的部分：CSS。

【為什麼要學這個？】
如果說 HTML 是素顏，CSS 就是最強大的化妝術和穿搭。同樣的一個網頁，用了不同的 CSS，可以從 1990 年代的懷舊風格，瞬間變成現代感十足的科技風格。

【今天學完你會能做什麼】
今天結束後，你將學會如何精準地控制網頁的顏色、大小、位置，並且理解網頁排版最重要的核心觀念：Box Model。
-->

---
layout: default
---

# Outline

- **CSS 常用屬性**
- **Inline Style — 在標籤上直接寫 CSS**
- **CSS 選擇器 — 元素選擇器與 Class 選擇器**
- **Class 命名慣例**
- **CSS 單位與 Box Model**
- **練習**

<!--
【核心說明】
今天的課程分為四大部分：基礎屬性、撰寫方式、選擇器，以及最重要的 Box Model。

【程式世界怎麼用】
我們會先從最簡單的標籤內寫法開始，接著進階到專業的「選擇器」寫法。最後，我們會花很多時間在 Box Model，因為這就是網頁排版的基礎邏輯。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS
# 前端之肉

<!--
【開場白】
我們先來認識一些 CSS 最常用的「調整旋鈕」。
-->

---

# CSS 常用屬性（一）

| 屬性 | 說明 |
| --- | --- |
| `color` | 字體顏色 |
| `font-size` | 字體大小 |
| `text-align` | 文字對齊（`left`、`right`、`center`、`end`） |
| `text-decoration` | 文字裝飾（`underline` 底線、`line-through` 刪除線） |
| `letter-spacing` | 文字間距 |

<!--
【核心說明】
這組屬性主要是負責「文字」的呈現。

【生活化比喻】
就像你在用 Word 軟體調字體大小、顏色、置中一樣。CSS 只是把這些原本用點選的功能，變成文字指令。

⚠️ 學生常見誤解：
注意 `color` 是指「字體顏色」，而不是背景顏色。如果你想改背景，要用 `background-color`。
-->

---

# CSS 常用屬性（二）

| 屬性 | 說明 |
| --- | --- |
| `width` | 寬度 |
| `height` | 高度 |
| `border-radius` | 外框圓弧效果 |
| `box-shadow` | 陰影效果 |

<!--
【核心說明】
這組屬性負責的是「形狀」和「質感」。

【程式世界怎麼用】
特別推薦大家多用 `border-radius`。現在流行的 App（像是 Facebook 或 Line），按鈕都是圓圓的，就是靠這個屬性。而 `box-shadow` 則能讓原本平面的網頁產生「浮起來」的立體感。

💼 業界實務：
在現代設計中，我們會用很精細的陰影（box-shadow）來區分內容的層次，而不是畫很多黑框。這能讓網頁看起來更高級。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Inline Style
# 在標籤上直接寫 CSS

<!--
【開場白】
知道了屬性，我們要怎麼把這些樣式「貼」在 HTML 上呢？第一種方法叫 Inline Style。
-->

---

# 建立 CSS 練習檔

先建立一個 HTML 檔案，在 `<body>` 中加入一個 `<p>` 標籤：

```html
<!DOCTYPE html>
<html>
<head>
  <title>我的第三個網頁</title>
</head>
<body>
  <p>CSS練習</p>
</body>
</html>
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 開啟瀏覽器後，畫面上會出現 <b>CSS練習</b> 文字，目前尚未套用任何樣式
</div>

<!--
【帶讀程式碼前的鋪陳】
我們先準備好一個實驗室，裡面只有一段簡單的文字。

【逐步解說】
這是一個標準的 HTML。目前如果你打開瀏覽器，它會顯示最原始的黑色文字，背景則是白色。

【練習引導】
大家先在 VS Code 裡建立這個檔案，等一下我們就要在上面「動手腳」了。
-->

---

# 加入 Inline Style — 單個屬性

在 `<p>` 標籤上加入 `style` 屬性，直接寫入 CSS：

```html
<p style='color:red;'>CSS練習</p>
```

<div class="mt-6 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>語法格式：</b> <code>style='屬性名稱: 值;'</code>，每個屬性結尾加 <code>;</code>
</div>

<!--
【核心說明】
Inline Style 就是把樣式直接寫在 HTML 標籤裡面。

【逐步解說】
你看 `<p>` 後面多了一個 `style='...'`。裡面的寫法很固定：屬性名稱、冒號、值、最後一定要有一個「分號」`;`。
就像是這張便利貼上寫著「顏色：紅；」。

⚠️ 學生常見誤解：
分號 `;` 非常重要！很多同學忘記寫，結果後面的屬性就全部失效。這就像寫英文句子忘記加句點一樣。
-->

---

# 加入 Inline Style — 多個屬性

多個屬性寫在同一個 `style` 中，屬性之間用 `;` 分隔：

| 屬性 | 值 | 效果 |
| --- | --- | --- |
| `color` | `red` | 文字變紅色 |
| `font-size` | `30px` | 文字放大至 30px |

```html
<p style='color:red; font-size: 30px;'>CSS練習</p>
```

<!--
【核心說明】
如果你想同時改變顏色和大小，就把它們串在一起。

【逐步解說】
注意到紅色的分號了嗎？它就像是分隔線。
「顏色紅（分號）字體三十（分號）」。

💼 業界實務：
雖然 Inline Style 很直覺，但業界不推薦在正式專案中大量使用。因為如果你有 100 個按鈕都要變紅色，你就要寫 100 遍。等一下我們會學更聰明的做法。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS 選擇器
# Selector

<!--
【開場白】
接下來，我們要學習如何用「遠端遙控」的方式來設定樣式。這就是選擇器。
-->

---

# 元素選擇器 (Element Selector)

若相同樣式要套用到**所有相同標籤**，使用 `<style>` 標籤宣告元素選擇器：

```html
<style>
  p { color: red; }
</style>
<body>
  <p>CSS練習一</p>
  <p>CSS練習二</p>
  <p>CSS練習三</p>
</body>
```

<div class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 元素選擇器 <code>p { }</code> 會修改<b>所有</b> &lt;p&gt; 標籤的樣式！
</div>

<!--
【核心說明】
這是在點名：「凡是叫 P 的同學，全部起立變紅色」。

【逐步解說】
我們在 `head` 或是 `body` 上方寫一個 `<style>` 區塊。
裡面寫 `p { ... }`。大括號裡面就是你要下的指令。
這樣不管你下面有 10 個還是 1,000 個 `p` 標籤，它們都會同步變色。

⚠️ 學生常見誤解：
權力太大有時候是個問題。如果你只想讓「第一個」變色，這招就不行了，因為它會無差別攻擊。
-->

---

# Class 選擇器 — 概念

只修改**部分**標籤時，使用 Class 選擇器：

| 步驟 | 操作 | 說明 |
| --- | --- | --- |
| ① | 在 HTML 標籤加上 `class="pCss"` | `pCss` 為自訂選擇器名稱 |
| ② | 在 `<style>` 中寫 `.pCss { }` | Class 選擇器前面必須加 `.`（點） |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 要修改<b>全部</b>標籤用元素選擇器（無 <code>.</code>）；只修改<b>部分</b>標籤用 Class 選擇器（加 <code>.</code>）
</div>

<!--
【核心說明】
這就像是幫標籤「貼標籤」。

【生活化比喻】
我們給某些同學貼上「糾察隊」的貼紙。然後我們對廣播說：「貼著『糾察隊』貼紙的人請過來」。這就是 Class 選擇器的邏輯。

⚠️ 學生常見誤解：
最常犯的錯是在 `<style>` 裡面忘記寫那個「點」`.`。
沒加點，電腦會以為它是一個「HTML 標籤」；加了點，電腦才知道它是一個「Class 名稱」。
-->

---

# Class 選擇器 — 範例

```html
<style>
  .pCss { color: red; }
</style>
<body>
  <p class="pCss">CSS練習一</p>
  <p>CSS練習二</p>
  <p class="pCss">CSS練習三</p>
</body>
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 練習一和練習三套用 <code>.pCss</code>（紅色）；練習二沒有 class，不受影響
</div>

<!--
【帶讀程式碼前的鋪陳】
我們來看看實戰效果。

【逐步解說】
你看，「練習一」和「練習三」都有 `class="pCss"`，所以它們變紅了。
而「練習二」因為沒有貼這張貼紙，所以它維持原樣。
這樣你就能精準控制誰要穿制服、誰要穿便服了。
-->

---

# 多個 Class

一個標籤可以套用**多個 class**，中間用**空格**隔開：

```html
<style>
  .pCss  { color: red; }
  .pCss2 { font-size: 50px; }
</style>
<body>
  <p class="pCss pCss2">CSS練習一</p>
  <p class="pCss">CSS練習三</p>
</body>
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 練習一同時套用 <code>.pCss</code>（紅色）與 <code>.pCss2</code>（50px 字體大小）
</div>

<!--
【核心說明】
一個標籤可以擁有很多種身分。

【生活化比喻】
就像一個學生可以同時是「糾察隊員」，也可以是「籃球隊員」。他會同時擁有這兩個身分的特徵（紅色制服 + 很高大）。

【練習引導】
注意 HTML 裡的 class 名稱中間是用「空格」分開的，千萬不要寫逗號喔！
-->

---

# CSS 層疊規則 — 後蓋前

同一標籤套用多個 class，若修改**相同屬性**，**後面的 class 會覆蓋前面的**：

```html
<style>
  .pCss  { color: red; }
  .pCss2 { color: yellow; }
</style>
<body>
  <p class="pCss pCss2">CSS練習一</p>
</body>
```

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>結果：</b> 文字顏色為<b>黃色</b>（.pCss2 寫在後面，程式由上往下執行，後蓋前）
</div>

<!--
【核心說明】
當指令衝突時怎麼辦？CSS 叫「層疊樣式表」，後面的會蓋掉前面的。

【生活化比喻】
就像你先穿了一件紅色的衣服，外面又套了一件黃色的外套。最後別人看到你的顏色會是黃色。

💼 業界實務：
在偵錯時，如果你發現樣式沒變，通常就是因為後面有其他的 CSS 指令把你的樣式覆蓋掉了。這在 VS Code 的開發者工具裡可以看得很清楚。
-->

---

# Class 命名慣例

為讓程式易讀易維護，class 名稱應具有意義並採用固定格式：

| 命名方式 | 格式 | 好的範例 | 不好的範例 |
| --- | --- | --- | --- |
| **小駝峰** (camelCase) | 第二字起大寫 | `topText`、`loginBtn` | `area1text` |
| **Kebab-case** | 用 `-` 連接 | `top-text`、`login-btn` | `area1` |

```html
<div class="top"><div class="topText"></div></div>
```

<!--
【核心說明】
這是一個「專業工程師」的自我修養。

【程式世界怎麼用】
不要亂取名字，像是 `a1`, `a2` 這種只有你自己懂的名字。
通常我們推薦 **kebab-case**（章魚燒寫法），也就是用減號連結。因為 HTML 的屬性很多也都是用減號，這樣看起來很統一。

⚠️ 學生常見誤解：
Class 名稱「不能有空格」，也不能用數字開頭喔！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 單位與 Box Model
# CSS Units & Box Model

<!--
【開場白】
接下來，我們要進入網頁開發最重要的概念：Box Model。
-->

---

# CSS 單位

| 單位 | 說明 |
| --- | --- |
| `px` | 像素，網頁的基本固定單位 |
| `rem` | 相對單位，1rem = 16px（根元素字體大小） |
| `vw` | 視窗寬度的 1%，`100vw` = 全寬 |
| `vh` | 視窗高度的 1%，`100vh` = 全高 |

```css
width: 10vw;
height: 10vh;
margin: 1rem;
```

<!--
【核心說明】
CSS 不只有公分、公厘，它有它專屬的度量衡。

【生活化比喻】
`px` 就像是尺上的刻度，是死板板不動的。
`vw` 和 `vh` 則像是橡皮筋。當你的瀏覽器視窗拉大，它就跟著拉長；視窗縮小，它就跟著縮短。這就是「響應式設計」的關鍵。

💼 業界實務：
現代開發非常推薦使用 `rem`，因為如果使用者在手機設定裡調大字體，你的網頁也會跟著優雅地放大，這對視力不好的使用者非常友善。
-->

---

# CSS Box Model — 四個元素

CSS Box Model 定義了每個 HTML 元素所佔的空間，由內而外共四層：

<div style="display: flex; align-items: center; gap: 3rem; margin-top: 1.2rem;">
  <div style="background: #4472C4; padding: 22px; border-radius: 4px; flex-shrink: 0;">
    <div style="background: #E07020; padding: 18px;">
      <div style="background: #70AD47; padding: 18px;">
        <div style="background: #000; color: #fff; padding: 10px 18px; font-size: 0.85rem; white-space: nowrap;">
          寬像素 x 高像素
        </div>
      </div>
    </div>
  </div>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; align-items: center; gap: 0.8rem;">
      <div style="width: 36px; height: 36px; background: #000; flex-shrink: 0;"></div>
      <div>Content：CSS 設定的寬高</div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 0.8rem;">
      <div style="width: 36px; height: 36px; background: #70AD47; flex-shrink: 0;"></div>
      <div>Padding：元素與<span style="color: red;">元素內容</span>的距離，內留白</div>
    </div>
    <div style="display: flex; align-items: center; gap: 0.8rem;">
      <div style="width: 36px; height: 36px; background: #E07020; flex-shrink: 0;"></div>
      <div>Border：元素邊界</div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 0.8rem;">
      <div style="width: 36px; height: 36px; background: #4472C4; flex-shrink: 0;"></div>
      <div>Margin：元素與元素間的距離，外留白</div>
    </div>
  </div>
</div>

<!--
【核心說明】
這張圖是網頁開發的「聖經」，請一定要看懂它。

【生活化比喻】
想像你買了一台筆電（Content）。為了保護它，你把它裝進防撞內袋（Padding）。袋子本身有厚厚的邊緣（Border）。最後，你把筆電放在桌上，旁邊要留一點空間放咖啡杯，不要讓別的東西擠到它（Margin）。

【看圖前的引導】
網頁上的每一個標籤（文字、圖片、按鈕），本質上都是這樣的一個「盒子」。

⚠️ 學生常見誤解：
最容易搞混的是 Padding 和 Margin。記住：**「Padding 是內在的空隙，Margin 是外在的距離」**。
-->

---

# CSS Box Model — Content（內容）

Content 為區塊的**主要內容**，像是文字、圖片、影片等，位於 Box Model 的**最內層**。大小由文字內容的多寡或圖片的長寬決定。

<div style="margin: 1.2rem 0; background: #b0c4de; font-weight: bold; padding: 6px 12px;">HTML練習</div>

<div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 藍色區域即為 Content；設定 <code>width</code> 和 <code>height</code>，就是在控制此區域的大小
</div>

<!--
【核心說明】
這就是盒子裡裝的東西。

【逐步帶著看】
當你在 CSS 設定 `width: 200px`，預設通常就是在調整這個藍色區塊的大小。

⚠️ 學生常見誤解：
如果你不設定寬高，它會自動根據內容撐開。這就像是一個神奇的購物袋，裝越多東西就變得越大。
-->

---

# CSS Box Model — Padding（內距）

Padding 是元素**內部**的空間距離，位於 Content 和 Border 之間。若有設定背景顏色，背景色會**隨著 Padding 延伸**。

<div style="margin: 1.2rem 0; background: #90c878; padding: 24px;">
  <div style="background: white; font-weight: bold; padding: 6px 12px;">HTML練習</div>
</div>

<div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 綠色外框 = Padding 區域（元素背景色延伸）；白色內框 = Content；可分別設定上下左右四個方向
</div>

<!--
【核心說明】
Padding 像是「防撞泡棉」。

【生活化比喻】
如果你覺得文字貼邊框太近、看起來很擠，就加一點 Padding。
關鍵知識：**「背景顏色會塗滿 Padding」**。如果你給按鈕設定背景紅，Padding 的地方也會是紅色的。

【程式世界怎麼用】
讓按鈕變大、文字變優雅的關鍵，通常都是靠 Padding 撐出來的喔！
-->

---

# CSS Box Model — Border（邊框）

Border 是元素的**邊框**，位於 Padding 外側。通常 1–5px 細線條，用來畫出元素邊界。可設定樣式（`solid` 實心 / `dashed` 虛線）、顏色與粗細。

<div style="margin: 1.2rem 0; border: 2px solid black; font-weight: bold; padding: 6px 12px;">HTML練習</div>

```css
border: 2px solid black;
```

<!--
【核心說明】
這就是盒子那一層實體的「厚度」。

【逐步解說】
語法是三合一：粗細（2px）、樣式（solid）、顏色（black）。
缺一不可！如果你沒寫 `solid`，雖然你寫了粗細和顏色，邊框還是不會出現，因為電腦不知道你要畫什麼線。

💼 業界實務：
現在流行用「無邊框設計」。我們不畫 border，而是用背景顏色或微弱的陰影來區分區塊。
-->

---

# CSS Box Model — Margin（外距）

Margin 是元素**外部**的空間距離，位於 Box Model 的**最外層**，用來控制元素與元素之間的距離。

<div style="margin: 1.2rem 0; background: #f0f0f0; padding: 4px;">
  <div style="background: white; font-weight: bold; padding: 6px 12px; border: 1px solid #bbb;">HTML練習一</div>
  <div style="background: white; font-weight: bold; padding: 6px 12px; border: 1px solid #bbb; margin-top: 28px;">HTML練習二</div>
</div>

<div class="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ 兩個元素之間的空白 = Margin；背景色<b>不會</b>延伸至 Margin（與 Padding 的最大差異）
</div>

<!--
【核心說明】
Margin 像是「個人空間」或「社交距離」。

【生活化比喻】
兩個人站在一起，Margin 決定了你們中間隔多遠。注意：**「背景顏色不會塗在 Margin 上」**。它是透明的，只是為了推開旁邊的人。

⚠️ 學生常見誤解：
如果你想讓按鈕變大，應該加 Padding；如果你想讓按鈕離上面的圖片遠一點，應該加 Margin。
-->

---

# CSS Box Model — 範例

```css
.boxModel {
  width: 10vw;
  height: 10vh;
  margin: 1rem;
  padding: 100px;
  border: 1px solid black;
  background-color: rgb(248, 203, 203);
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>border 語法：</b> <code>border: 粗細 樣式 顏色</code>，例如 <code>1px solid black</code>（1像素實心黑線）
</div>

<!--
【帶讀程式碼前的鋪陳】
我們把剛才的東西全部寫進一個 Class 裡。

【逐步解說】
你看這一段，它同時控制了寬高（用 vw/vh）、外距、內距、邊框和背景色。
這就是一個標準的 CSS 宣告方式。

【類比說明】
這就像是開出一個訂單：我這個盒子要寬視窗的十分之一，四周留一公分的空位，裡面塞 100 像素的泡棉，邊緣畫上一像素黑線，最後盒子塗成淡紅色。
-->

---

# Padding 與 Margin 設置

Padding 和 Margin 支援多種縮寫語法（兩者寫法完全相同）：

| 語法 | 說明 |
| --- | --- |
| `padding: 2px;` | 四邊都為 2px |
| `padding: 2px 3px;` | 上下 2px、左右 3px |
| `padding: 2px 3px 4px;` | 上 2px、右 3px、下 4px（左同右） |
| `padding: 2px 3px 4px 5px;` | 上 右 下 左（順時針） |
| `padding-top / right / bottom / left` | 單獨設定各方向 |

<!--
【核心說明】
這是一個「懶人包寫法」。

【逐步解說】
如果你寫四個數字，順序是：**「上、右、下、左」**。
記住口訣：**「順時針」**。從 12 點鐘方向開始繞一圈就對了。

【類比說明】
如果你寫兩個數字，就像是在對稱剪紙。第一個管上下，第二個管左右。

💼 業界實務：
在業界，我們最常用的是兩個數字的寫法，例如 `margin: 10px 0;` 代表上下留 10 像素空隙，左右不留。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習
# CSS Practice

<!--
【開場白】
光說不練假把戲，我們來挑戰兩個實作題。
-->

---

# 練習 1 — Box Model 尺寸設計
### 任務說明

根據線框圖建立 HTML 結構，並套用 CSS 設定各元素的寬高與間距：

<img src="/images/09-css/practice1-wireframe.png" alt="練習1線框圖" style="max-height: 320px;" />

<!--
【出題前的鋪陳】
這是一個基礎的切版練習。

【問題引導】
大家先觀察一下，這裡有兩張圖、一個區塊（div）、一個輸入框和一個按鈕。
你們覺得，哪裡應該用 Margin？哪裡應該用 Padding？

【等待與觀察】
（給大家 1 分鐘思考結構，再跳下一頁提示）
-->

---

# 練習 1 — 解題提示

| 元素 | 屬性 | 值 |
| --- | --- | --- |
| `img`（左） | `width` / `height` / `margin-right` | `200px` / `200px` / `24px` |
| `img`（右） | `width` / `height` | `300px` / `200px` |
| `div` | `height` / `margin` | `100px` / `36px 0` |
| `input` | `height` | `20px` |
| `button` | `width` / `height` / `margin-left` | `120px` / `20px` / `18px` |

<!--
【解說要點】
我已經把精確的數值寫出來了。

【逐步帶著看】
大家注意 `div` 的 `margin: 36px 0`，這代表上下會撐開空間。
還有 `button` 的 `margin-left`，這能讓按鈕跟前面的輸入框保持一段距離，看起來不會擠在一起。
-->

---

# 練習 2 — 登入頁面
### 任務說明

使用 HTML + CSS 製作下方登入頁面：

<img src="/images/09-css/practice2-login.png" alt="練習2目標畫面" style="max-height: 320px;" />

<!--
【核心說明】
這是一個綜合練習，要把剛才學的顏色、對齊、圓角全部用上。

【生活化比喻】
這就像是你的「CSS 畢業考」。如果你能做出這個頁面，代表你已經具備製作基本網頁元件的能力了！
-->

---

# 練習 2 — 解題提示

| 區塊 | 使用標籤 | CSS 重點 |
| --- | --- | --- |
| 外框 | `div` | `background-color: blue` |
| 標題 | `h1` "登入" | `color: white; text-align: center` |
| 帳號 / 密碼標籤 | `p` | `color: white` |
| 帳號 / 密碼輸入框 | `input` | `border-radius: 999px` |
| 登入按鈕 | `button` | `background-color: red; color: white; border-radius: 999px` |

<!--
【解說要點】
提示大家一個小撇步：如果你想讓按鈕變成完整的「膠囊形狀」，把 `border-radius` 設成一個很大的數字（例如 999px）就對了！

【練習引導】
大家可以先寫 HTML 結構，再一個一個把樣式貼上去。背景色、文字顏色是這題的重點。
-->

---
layout: end
---

# CSS 基礎完成
### 讓你的網頁穿上第一件衣服！

<!--
【結語】
好啦！恭喜大家，現在你們的網頁不再是灰頭土臉的了，而是有了色彩和層次。

【互動引導】
在練習過程中，有沒有人遇到「明明設了顏色卻沒變」的情況？或是「Box Model 算完之後寬度變得很奇怪」？
這些都是新手必經的痛，我們現在一起來解決。

下一堂課，我們要進階學習 CSS 更多強大的屬性，讓畫面變得更華麗喔！
-->
