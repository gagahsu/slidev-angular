---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: JavaScript 介紹
routeAlias: ch12
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
    JavaScript 介紹
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓網頁動起來的語言」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **JavaScript 是什麼？**
- **TypeScript 是什麼？**
- **TypeScript VS JavaScript**
- **JavaScript 實例**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JavaScript 是什麼？
# What is JavaScript?

---

# JavaScript 是什麼？

JavaScript 是一種腳本，也能稱它為**程式語言**，可以讓你在網頁中實現出複雜的功能。

當網頁不只呈現靜態的內容，另外提供了像是：

- 內容即時更新
- 地圖互動
- 繪製 2D / 3D 圖形
- 影片播放控制……

你就可以大膽地認為 **JavaScript 已經參與其中**。

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 網頁的三層架構：<b>HTML</b>（內容）→ <b>CSS</b>（樣式）→ <b>JavaScript</b>（互動）
</div>

---

# JavaScript — 三層架構

HTML、CSS、JavaScript 分別負責網頁的不同層次：

<div style="display: flex; justify-content: center; align-items: center; gap: 3rem; margin-top: 1.2rem;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <div style="width: 220px; padding: 12px 0; background: #f7b977; text-align: center; font-weight: bold; font-size: 1rem; border-radius: 4px; color: #5a3a00;">JavaScript</div>
    <div style="width: 260px; padding: 12px 0; background: #5eada0; text-align: center; font-weight: bold; font-size: 1rem; border-radius: 4px; color: #fff;">CSS</div>
    <div style="width: 300px; padding: 12px 0; background: #4472C4; text-align: center; font-weight: bold; font-size: 1rem; border-radius: 4px; color: #fff;">HTML</div>
  </div>
  <div style="font-size: 0.95rem; line-height: 2.2;">
    <div><span style="color: #b07800; font-weight: bold;">JavaScript</span>：負責互動與行為邏輯</div>
    <div><span style="color: #3a8a80; font-weight: bold;">CSS</span>：負責視覺樣式與排版</div>
    <div><span style="color: #2a52a0; font-weight: bold;">HTML</span>：負責頁面結構與內容</div>
  </div>
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# TypeScript 是什麼？
# What is TypeScript?

---

# TypeScript 是什麼？

TypeScript 是一種由 **Microsoft** 開發的開源程式語言，它是 JavaScript 的一種**超集（Superset）**。

- 任何有效的 JavaScript 程式碼，也是有效的 TypeScript 程式碼
- TypeScript 為 JavaScript 新增了**類型系統（型別）**和其他功能：
  - `Interfaces`
  - `Generics`
  - `Enums`

這些功能使開發者能更有效地撰寫大型專案。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>Angular</b> 就是使用 TypeScript 開發，所以要有一定的 JavaScript 基礎，才能更好地理解 TypeScript 的使用
</div>

---

# TypeScript VS JavaScript

雖然 TypeScript 與 JavaScript 在許多方面都很相似，但它們之間仍存在一些重要的區別：

| 比較項目 | JavaScript | TypeScript |
| --- | --- | --- |
| **類型系統** | 動態型別，變數類型可在執行期間改變 | 靜態型別，宣告時確定類型，有助於預先找出錯誤 |
| **編譯器** | 無需編譯，可在瀏覽器直接執行 | 需要編譯成 JavaScript 才能在瀏覽器執行 |
| **物件導向** | 有 `class` 與 `object`，但無 `interface` | 支援 `interface`、`class`、`object`，物件導向更直觀 |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JavaScript 實例
# JavaScript in Action

---

# JavaScript 實例 — Step 1：HTML

先在 HTML 中建立一個按鈕，加入 `class` 命名樣式名稱，並加入 `onclick` 方法（觸發動作的固定寫法）：

```html
<!-- body 內是寫 HTML 內容 -->
<body>
  <button class="bntCss" onclick="clickBnt()">我是按鈕!點我!</button>
</body>
```

<div style="margin-top: 1rem; display: flex; align-items: center; gap: 1rem;">
  <div style="font-size: 0.9rem; color: #555;">畫面預覽：</div>
  <button style="padding: 4px 12px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer; font-size: 0.95rem;">我是按鈕!點我!</button>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>onclick="clickBnt()"</code> 表示「點擊時，執行名為 <code>clickBnt</code> 的方法」，方法名稱可自訂
</div>

---

# JavaScript 實例 — Step 2：CSS

用剛才在 HTML 設定的 `class` 名稱，來編輯按鈕的樣式：

```html
<!-- style 內是寫 CSS 內容 -->
<style>
  .bntCss {
    color: red;
  }
</style>
```

<div style="margin-top: 1rem; display: flex; align-items: center; gap: 1rem;">
  <div style="font-size: 0.9rem; color: #555;">套用樣式後：</div>
  <button style="padding: 4px 12px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer; font-size: 0.95rem; color: red;">我是按鈕!點我!</button>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 HTML、CSS 都已就位。接下來進入與使用者<b>互動</b>的部分 — JavaScript
</div>

---

# JavaScript 實例 — Step 3：JavaScript

宣告剛才在 `onclick` 中自訂的方法名稱，並在其中撰寫要執行的動作：

```html
<!-- script 內是寫 JavaScript 內容 -->
<script>
  function clickBnt() {
    alert("你按按鈕了！")
  }
</script>
```

<div style="margin-top: 1rem; display: flex; align-items: center; gap: 1.5rem;">
  <div style="font-size: 0.9rem; color: #555;">點擊按鈕後：</div>
  <div style="border: 1px solid #aaa; border-radius: 6px; padding: 10px 18px; background: #f5f5f5; font-size: 0.9rem; box-shadow: 2px 2px 6px rgba(0,0,0,0.15);">
    <div style="font-weight: bold; margin-bottom: 4px; color: #333;">這個網頁顯示</div>
    <div style="color: #444; margin-bottom: 8px;">你按按鈕了！</div>
    <button style="padding: 3px 16px; border: 1px solid #aaa; background: #e8e8e8; border-radius: 3px; font-size: 0.85rem;">確定</button>
  </div>
</div>

---
layout: end
---

# JavaScript 介紹完成
### 互動的起點，從這裡開始！
