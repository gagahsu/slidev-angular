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
恭喜大家！成功把骨架（HTML）搭好之後，現在我們要來進行最有趣的事情：CSS。
如果 HTML 是素顏甚至是剛起床的模樣，那 CSS 就是超強的美顏相機、化妝術和潮流穿搭！
同樣的 HTML 骨架，只要換一套 CSS，你的網頁就能從 1990 年代的懷舊文字網頁，一秒變身成充滿未來感的科技風網站！
今天這堂課，我們就要學會怎麼去調色、控制字體大小、擺放位置，並且徹底搞懂前端排版最核心的生死符——「Box Model（盒子模型）」。
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
今天我們的作戰計畫有四大重點：
我們先從最常用的基礎屬性開始，接著看怎麼把 CSS 寫到網頁裡。
再來會介紹像點名一樣的「選擇器」寫法。
最後是壓軸——Box Model。這是不管你寫幾年程式，天天都會用到的基礎排版邏輯喔！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS
# 前端之肉

<!--
首先，我們先來認識幾個最常用來調整畫面的「旋鈕屬性」。
-->

---

# CSS 常用屬性（一）— 文字

| 屬性 | 說明 |
| --- | --- |
| `color` | 字體顏色 |
| `font-size` | 字體大小 |
| `font-weight` | 字體粗細（`bold` 粗體、`normal` 正常、`100`～`900` 數值） |
| `font-family` | 字型（`Arial`、`sans-serif`、`monospace` 等） |
| `line-height` | 行距，影響文字上下間隔（建議值 `1.5`～`1.8`） |
| `text-align` | 文字對齊（`left`、`right`、`center`、`end`） |
| `text-decoration` | 文字裝飾（`underline` 底線、`line-through` 刪除線） |
| `letter-spacing` | 文字間距 |

<!--
第一組旋鈕專門管「文字的長相」。
大家不要把 CSS 想得很難，它其實就跟你在 Word 裡面調字體顏色、變大變小、文字置中是一模一樣的意思。
差別只在於，Word 是用滑鼠去點按鈕，而 CSS 是用鍵盤打出英文指令。
這裡有個最常翻車的雷點：
在 CSS 裡，`color` 專指「文字本身的顏色」喔！
如果你想要把一整個區塊的背景塗成黃色，請不要用 `color: yellow`，那會讓字體變黃、背景依然是白的。你必須要叫出 `background-color` 背景色這顆旋鈕！
`font-weight` 最常用的就是 `bold`（粗）和 `normal`（細），進階用法可以寫數字，`400` 等於 normal，`700` 等於 bold。
`line-height` 沒有單位時代表「幾倍行距」，例如 `1.6` 代表字體大小的 1.6 倍，閱讀起來更舒服。
-->

---

# CSS 常用屬性（二）— 外觀與排版

| 屬性 | 說明 |
| --- | --- |
| `background-color` | 背景顏色（與 `color` 不同，`color` 只改文字） |
| `width` | 寬度 |
| `height` | 高度 |
| `border` | 邊框（語法：`粗細 樣式 顏色`，例如 `1px solid black`） |
| `border-radius` | 外框圓弧效果（`999px` 可做膠囊形） |
| `box-shadow` | 陰影效果 |
| `display` | 元素排版方式（`block`、`inline`、`flex`、`none`） |
| `cursor` | 滑鼠游標樣式（`pointer` 手指、`default` 預設、`not-allowed` 禁止） |

<!--
第二組旋鈕管的是「物件的外觀與排列方式」。
`background-color` 是最常用的屬性之一，記住：`color` 改字色，`background-color` 改背景色，這兩個要分清楚！
`border` 三個參數缺一不可：粗細、樣式（solid/dashed）、顏色，少寫任何一個邊框就不會出現。
`display: none` 可以讓元素完全消失（連空間也不佔），是做條件顯示時的超常用招式。
`cursor: pointer` 會讓滑鼠移到元素上時變成手指形狀，告訴使用者「這個可以點」——按鈕一定要加，使用者體驗的基本！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Inline Style
# 在標籤上直接寫 CSS

<!--
知道了這些調整旋鈕後，我們要怎麼把 CSS 的代碼「貼」到 HTML 上呢？
我們來看第一種最直接的貼法——Inline Style。
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
來，我們先建一個實驗用的 HTML 檔案。
這是一個最素的程式碼，裡面只有寫一行「CSS練習」。
如果這時候用瀏覽器打開它，畫面上只會有最原始、黑黑乾乾的細字。
大家先在 VS Code 裡把這段打出來，我們準備要來幫它化妝了。
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
第一種做法「Inline Style」，就是最簡單粗暴地把 CSS 寫在 HTML 標籤的屁股後面。
你看 `<p>` 標籤裡面，我們多寫了一個 `style="color: red;"`。
這裡的語法格式要非常精準：`屬性名稱 : 設定值 ;`。
特別是最後面那個「分號 `;`」，這是新手最常漏掉的隱形地雷！
這就像是中文寫完一個句子要畫「句號」，如果你沒有打分號，瀏覽器會以為後面的指令全部都是前一個屬性的延伸，結果就是整行 CSS 報銷、完全動不起來！
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
如果我們要同時調兩個以上的屬性呢？很簡單，用分號把他們排排站接下去寫就好。
你看程式碼：`color: red;` 之後，馬上接 `font-size: 30px;`。
這行指令翻譯過來就是：「文字顏色變紅喔（分號），然後字體大小變30像素喔（分號）。」
雖然這種 Inline Style 寫法非常直白好懂，但在業界的真實專案中，**我們極度不推薦在每個標籤上都這樣寫**。
你想想看，如果你的網頁有一百個按鈕都要變紅色，你難道要在一百個地方複製貼上 `style="color:red;"` 嗎？
萬一明天老闆拍腦袋說想改成藍色，你不就要改到手抽筋？
所以，接下來我們要學更聰明的遠端遙控法！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS 選擇器
# Selector

<!--
現在我們要進入進階玩法——使用「選擇器（Selectors）」來做遠端集中管理。
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
第一種選擇器叫「元素選擇器」。
這招的邏輯就像是教官拿著大喇叭廣播：「凡是叫 P 的同學，全部給我起立穿紅衣服！」
我們在網頁的 `<head>` 區塊裡寫一組 `<style>` 標籤，並在裡面寫 `p { color: red; }`。
這樣一來，底下 `<body>` 裡的所有 `<p>` 標籤，不管它是練習一、練習二還是練習三，通通都會被一網打盡、變成紅色！
雖然很方便，但缺點是它沒有識別度，進行無差別攻擊。
如果你只想讓練習一變紅，練習二保持黑色，元素選擇器就沒轍了。這時候我們得用下一招！
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
第二種就是全前端工程師每天寫最多次的「Class 選擇器」。
這就像是幫特定同學的手臂上貼個「風紀股長」的貼紙。
然後教官在台上只要廣播：「貼有『風紀股長』貼紙的人，全部來我辦公室！」
對應到程式碼：
我們要在 HTML 標籤上寫 `class="pCss"`。
然後在 `<style>` 裡，寫 `.pCss { color: red; }`。
大家一定要注意看：**`.pCss` 的前面有一個小點點 `.`**！
這個點在 CSS 裡代表「Class」的意思。
如果你忘了寫這個點，寫成 `pCss { ... }`，瀏覽器會以為你的 HTML 裡有一個叫作 `<pCss>` 的新奇標籤，找半天找不到，結果你的樣式就完全失效。這是新手最常掉進去的深坑！
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
來，看一下這段代碼的渲染成果。
你看，第一個和第三個段落都貼上了 `class="pCss"` 貼紙，所以它們的字體順利變成了紅色。
安安靜靜地維持著預設的黑色。
而中間的第二個段落因為是個普通老百姓，沒有這張貼紙，所以它就安安靜靜地維持著預設的黑色。
這就是 Class 選擇器的威力，讓你可以精準地指點特定的元素進行裝扮！
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
更厲害的是，一個標籤身上可以同時貼很多張不同的貼紙。
我們用生活例子來比喻。
小明可以同時是「籃球隊員」跟「吉他社社長」。
他會同時繼承籃球隊員的「高大強壯」以及吉他社社長的「帥氣彈奏」。
在程式碼裡，我們可以在同一個 class 屬性裡寫 `class="pCss pCss2"`。
注意！**兩張貼紙名稱中間是用「空格」分開**，千萬不要手抖寫成逗號或是斜線喔！
這樣，第一個段落就會同時穿上紅色（pCss）並且放大字體到 50px（pCss2）。
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
當兩張貼紙的指令打架時，瀏覽器會聽誰的？
比如 `.pCss` 說字要變紅，`.pCss2` 說字要變黃，結果這行字到底會變紅還是變黃？
這就涉及到 CSS 的全名 Cascading Style Sheets（層疊樣式表）的「層疊」機制了。
簡單的黃金法則就是——「後蓋前」！
因為瀏覽器讀代碼是從上往下讀的。它先讀到紅色，後來又讀到黃色，黃色在下面，所以就把上面的紅色給蓋掉了。
這就像你先穿了一件紅T恤，然後又在外面套了一件黃外套，別人看你當然是黃色。
以後如果你寫 CSS 發現畫面死活不變色，別急著懷疑人生，十有八九是更下面的地方寫了別的指令把你的樣式給層疊蓋掉了！
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
既然要寫扣，我們就要寫得像個「年薪百萬的專業工程師」。
取 class 名字時，千萬不要寫 `a1`、`bbb` 這種連你自己明天早上醒來都看不懂的亂碼。
在前端領域，大家最推薦也最通用的命名格式是「kebab-case」（烤肉串寫法/減號命名法）。
例如 `top-text`、`login-btn`，用小寫英文字母配上減號 `-`，就像用烤肉竹籤把字串在一起。
這裡有兩個鐵律請一定要刻在心底：
第一，class 名字裡**絕對不能有空格**，因為有空格瀏覽器會以為那是兩個不同的 class！
第二，**絕對不能用數字當作開頭**（例如 `1st-text`），否則瀏覽器會拒絕讀取它！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 單位與 Box Model
# CSS Units & Box Model

<!--
有了選擇器，我們就可以開始對著網頁元素進行瘋狂的排版。
不過在此之前，我們必須要先搞懂整個網頁佈局的最核心聖經——「Box Model」！
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
首先，CSS 有它自己的一套測量單位。
最基礎的就是 `px`（像素），它是絕對固定單位，你寫 10px，它在任何螢幕上都是老老實實的 10 個小像素點。
而 `vw` 和 `vh` 則是相對單位，意思是「視窗寬度的百分比」和「視窗高度的百分比」。
這兩個就像是彈性超強的「橡皮筋」。
當你把網頁視窗拉大，它就跟著變寬，視窗縮小它就跟著變窄。這就是做「響應式網頁」時非常關鍵的彈性單位。
至於 `rem`，則是根據網頁的根字體大小來倍增。
在業界我們超級愛用 `rem`，因為這樣如果有一些長輩把手機的系統字體調成大字，我們的網頁也會跟著等比例優雅放大，不會造成畫面破版，對無障礙體驗非常有幫助！
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
請大家看投影片中間這張四個顏色的套盒圖。這張圖就是網頁排版的靈魂！
在瀏覽器的眼裡，你寫的任何一個標籤——不管是一段字、一張圖、還是一個按鈕，全部都是一個一個的「四方盒子（Box）」。
我們用生活中的例子來比喻：
最內層的黑色方塊是「Content（內容）」，就像是你剛買的「珍貴筆電主機」。
為了怕撞壞，你用了一層厚厚的綠色氣泡紙把它包起來，這個內部的防撞空間就是「Padding（內距）」。
接著，氣泡紙外面就是你裝筆電的手提包拉鍊皮革，這層邊緣界線就是「Border（邊框）」。
最後，你把裝好筆電的手提包放在辦公桌上。為了不讓隔壁同事的咖啡杯撞到你，你要求手提包周圍 10 公分內不准擺東西，這個跟其他物件隔開的社交距離，就是「Margin（外距）」。
很多新手最容易把 Padding 和 Margin 搞混。
大家記住這個終極口訣：**「Padding 是往內填充泡棉；Margin 是往外推開距離」**！
-->

---

# CSS Box Model — Content（內容）

Content 為區塊的**主要內容**，像是文字、圖片、影片等，位於 Box Model 的**最內層**。大小由文字內容的多寡或圖片的長寬決定。

<div style="margin: 1.2rem 0; background: #b0c4de; font-weight: bold; padding: 6px 12px;">HTML練習</div>

<div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 藍色區域即為 Content；設定 <code>width</code> 和 <code>height</code>，就是在控制此區域的大小
</div>

<!--
我們來單獨看最內層的 Content 內容物。
這就是你盒子裡裝的洋芋片或衣服。
通常我們在 CSS 裡寫 `width: 100px` 或是 `height: 100px`，預設就是在直接修改這個 Content 區塊的大小。
如果你什麼都不寫，寬高預設就會是「自適應」。
也就是說，你的文字寫越長、圖片越大，這個藍色盒子就會自動被撐得越大，就像個超有彈性的環保購物袋！
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
再來是綠色的 Padding 內距。
當你覺得你的文字死死地貼在邊框上，看起來快窒息了，你就要趕快加 Padding 幫它把空間撐開。
這裡有一個一定要記住的重點：**「元素的背景顏色會蔓延到 Padding 上」**！
就像這張圖，雖然內容是白底，但如果你給整個盒子設定綠色背景，Padding 區域也會塗滿綠色。
所以，我們業界在做漂亮的按鈕時，通常都是設定一小段字，然後上下左右加個 15px 的 Padding，這樣按鈕的點擊面積就會變大，而且看起來非常精緻舒爽！
-->

---

# CSS Box Model — Border（邊框）

Border 是元素的**邊框**，位於 Padding 外側。通常 1–5px 細線條，用來畫出元素邊界。可設定樣式（`solid` 實心 / `dashed` 虛線）、顏色與粗細。

<div style="margin: 1.2rem 0; border: 2px solid black; font-weight: bold; padding: 6px 12px;">HTML練習</div>

```css
border: 2px solid black;
```

<!--
接下來是 Border 邊框，也就是這個盒子的圍牆厚度。
在 CSS 裡寫邊框很有趣，它是個三合一的指令，比如 `border: 2px solid black;`。
意思是：「2像素寬（粗細）的實心線（樣式）黑色（顏色）」。
這三個參數一定要寫齊！
最常見的錯誤就是大家只寫 `border: 2px black;` 忘了寫 `solid`（實心）。
這樣瀏覽器會不知道你要畫實線、虛線還是點點線，最後索性就直接當作沒有這回事，邊框就出不來了。
不過現代設計非常流行「去邊框化」，大家比較不愛畫一條死板的粗線，而是喜歡用淡淡的背景色交錯或是陰影來做出高級的區隔感。
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
最後是 Margin 外距。
Margin 代表這個盒子的「防禦防護罩」，它是透明的、沒有背景顏色。
整個盒子塗成紅色，Margin 區域依然會是透明的，它的唯一任務就是「跟鄰居保持距離，不准貼著我」。
你看圖中「HTML練習一」跟「HTML練習二」中間隔了 28px 的空白，這就是用 Margin-top 撐開來的社交距離。
再強調一次：
如果你想讓按鈕裡面的文字有呼吸空間，或者是想擴大按鈕本身的底色面積，請用 **Padding**；
如果你是想推開按鈕外面的其他標題或圖片，請用 **Margin**！
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
我們把剛剛講的參數全部塞進一個 `.boxModel` 類別裡看看。
你看這段 CSS 程式碼，它一口氣控制了盒子的寬度、高度、外距、內距、邊框還有粉紅背景色。
這就像是你去家具行訂做一個收納箱，你給店員的規格單寫著：
「我這個箱子寬度要視窗的十分之一，高度要視窗高度的百分之十，箱子外面要跟牆壁保持 1rem 的距離，箱子裡頭要鋪 100px 的防撞泡棉，圍牆要畫一像素的黑色實線，最後整顆漆成草莓粉紅色。」
瀏覽器拿到這張單子，就會完美地幫你把這個盒子捏出來！
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
在寫 Padding 和 Margin 的時候，如果你要設定四個方向，難道要寫四行屬性嗎？
不用，CSS 有個非常性感的「順時針縮寫大法」！
如果你寫 `padding: 2px 3px 4px 5px;`，這四個數字的套用順序是：**上、右、下、左**。
記住口訣：**「順時針繞一圈」**！從 12 點鐘方向的「上」開始，右、下、左轉一圈就搞定了。
如果你只寫兩個數字，比如 `padding: 2px 3px;`。
這代表「上下是 2px，左右是 3px」，呈現左右對稱的結構。
在真實開發中，我們超常用兩個數字的縮寫（比如 `margin: 10px 0;`，代表上下推開 10px，左右貼齊），這可以幫你的代碼節省非常多的行數！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習
# CSS Practice

<!--
好，看懂了 Box Model 的四層構造，我們不說廢話，直接來寫兩道實作題驗收手感！
-->

---

# 練習 1 — Box Model 尺寸設計
### 任務說明

根據線框圖建立 HTML 結構，並套用 CSS 設定各元素的寬高與間距：

<img src="/images/09-css/practice1-wireframe.png" alt="練習1線框圖" style="max-height: 320px;" />

<!--
練習一是一個排版位置的微調任務。
請大家仔細觀察這個設計線框圖。
這裡有兩張圖片、一個黑色區塊、一個輸入框和一顆按鈕。
先用你剛剛學到的觀念想一想：
這兩張圖片中間的空隙，還有按鈕跟輸入框中間的空隙，應該要用 Margin 還是 Padding 來推開呢？
給大家 1 分鐘的時間在腦海裡構思一下結構，等一下我們來看具體的提示。
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
來，答案揭曉！我們把精確的屬性數值都列在表格裡了。
大家在寫的時候可以特別注意：
兩張圖片要排在同一排，而且左邊圖片要用 `margin-right: 24px` 把右邊圖片推開。
中間那塊 `div` 用 `margin: 36px 0`，就是利用縮寫語法，一口氣把上下鄰居各推開 36px。
最後，按鈕用 `margin-left: 18px`，優雅地離輸入框遠一點，這樣畫面才會有漂亮的呼吸感！
-->

---

# 練習 2 — 登入頁面
### 任務說明

使用 HTML + CSS 製作下方登入頁面：

<img src="/images/09-css/practice2-login.png" alt="練習2目標畫面" style="max-height: 320px;" />

<!--
練習二就要動真格的了！我們要親手做出一個看起來有模有樣的「藍色科技風登入卡片」！
這裡會用到背景色、文字對齊、圓角還有剛才學的 Padding、Margin。
這題算是我們今天 CSS 基礎課的「期末大考」。
要是你能夠把這個精緻的登入小卡片切出來，去面試前端助理工程師就已經跨出成功的第一步了！
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
在動手前，我給各位傳授一個業界偷偷在用的「膠囊按鈕小撇步」：
如果你想讓你的輸入框和按鈕邊角變成那種完美的圓弧膠囊形，直接大筆一揮把 `border-radius` 設成一個超大數字比如 `999px`，它就會自動縮成漂亮的圓角，絕對不會破圖！
大家照著表格提示，先寫 HTML 的架構，再慢慢用選擇器把顏色跟間距套上去。開始動手吧！
-->

---
layout: end
---

# CSS 基礎完成
### 讓你的網頁穿上第一件衣服！

<!--
恭喜大家！大功告成！
寫完這兩個練習，你的網頁從原本的水泥毛胚屋，瞬間套上了亮眼的色彩和格局。
剛剛在寫代碼的時候，有沒有人遇到「明明寫了 CSS，但瀏覽器理都不理我」的靈異現象？
或是「明明寬度設 100px，加了 Padding 之後盒子卻變超大」的狀況？
別擔心，這些都是我們工程師每天在踩的日常神主牌，大家有問題隨時舉手，我過去幫你看。
下一堂課，我們要進階學習更多華麗的 CSS 屬性，讓我們的網頁動起來喔！
-->
