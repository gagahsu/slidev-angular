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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS
# 前端之肉

---

# CSS 常用屬性（一）

| 屬性 | 說明 |
| --- | --- |
| `color` | 字體顏色 |
| `font-size` | 字體大小 |
| `text-align` | 文字對齊（`left`、`right`、`center`、`end`） |
| `text-decoration` | 文字裝飾（`underline` 底線、`line-through` 刪除線） |
| `letter-spacing` | 文字間距 |

---

# CSS 常用屬性（二）

| 屬性 | 說明 |
| --- | --- |
| `width` | 寬度 |
| `height` | 高度 |
| `border-radius` | 外框圓弧效果 |
| `box-shadow` | 陰影效果 |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Inline Style
# 在標籤上直接寫 CSS

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

---

# 加入 Inline Style — 單個屬性

在 `<p>` 標籤上加入 `style` 屬性，直接寫入 CSS：

```html
<p style='color:red;'>CSS練習</p>
```

<div class="mt-6 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>語法格式：</b> <code>style='屬性名稱: 值;'</code>，每個屬性結尾加 <code>;</code>
</div>

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS 選擇器
# Selector

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 單位與 Box Model
# CSS Units & Box Model

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

---

# CSS Box Model — Content（內容）

Content 為區塊的**主要內容**，像是文字、圖片、影片等，位於 Box Model 的**最內層**。大小由文字內容的多寡或圖片的長寬決定。

<div style="margin: 1.2rem 0; background: #b0c4de; font-weight: bold; padding: 6px 12px;">HTML練習</div>

<div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 藍色區域即為 Content；設定 <code>width</code> 和 <code>height</code>，就是在控制此區域的大小
</div>

---

# CSS Box Model — Padding（內距）

Padding 是元素**內部**的空間距離，位於 Content 和 Border 之間。若有設定背景顏色，背景色會**隨著 Padding 延伸**。

<div style="margin: 1.2rem 0; background: #90c878; padding: 24px;">
  <div style="background: white; font-weight: bold; padding: 6px 12px;">HTML練習</div>
</div>

<div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 綠色外框 = Padding 區域（元素背景色延伸）；白色內框 = Content；可分別設定上下左右四個方向
</div>

---

# CSS Box Model — Border（邊框）

Border 是元素的**邊框**，位於 Padding 外側。通常 1–5px 細線條，用來畫出元素邊界。可設定樣式（`solid` 實心 / `dashed` 虛線）、顏色與粗細。

<div style="margin: 1.2rem 0; border: 2px solid black; font-weight: bold; padding: 6px 12px;">HTML練習</div>

```css
border: 2px solid black;
```

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習
# CSS Practice

---

# 練習 1 — Box Model 尺寸設計
### 任務說明

根據線框圖建立 HTML 結構，並套用 CSS 設定各元素的寬高與間距：

<img src="/images/09-css/practice1-wireframe.png" alt="練習1線框圖" style="max-height: 320px;" />

---

# 練習 1 — 解題提示

| 元素 | 屬性 | 值 |
| --- | --- | --- |
| `img`（左） | `width` / `height` / `margin-right` | `200px` / `200px` / `24px` |
| `img`（右） | `width` / `height` | `300px` / `200px` |
| `div` | `height` / `margin` | `100px` / `36px 0` |
| `input` | `height` | `20px` |
| `button` | `width` / `height` / `margin-left` | `120px` / `20px` / `18px` |

---

# 練習 2 — 登入頁面
### 任務說明

使用 HTML + CSS 製作下方登入頁面：

<img src="/images/09-css/practice2-login.png" alt="練習2目標畫面" style="max-height: 320px;" />

---

# 練習 2 — 解題提示

| 區塊 | 使用標籤 | CSS 重點 |
| --- | --- | --- |
| 外框 | `div` | `background-color: blue` |
| 標題 | `h1` "登入" | `color: white; text-align: center` |
| 帳號 / 密碼標籤 | `p` | `color: white` |
| 帳號 / 密碼輸入框 | `input` | `border-radius: 999px` |
| 登入按鈕 | `button` | `background-color: red; color: white; border-radius: 999px` |

---
layout: end
---

# CSS 基礎完成
### 讓你的網頁穿上第一件衣服！
