---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: RWD
routeAlias: ch52
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
    RWD
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓網頁自動適應各種螢幕尺寸，提供一致的使用體驗」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是 RWD？** — 響應式網頁設計的定義與目標
- **響應式單位** — `%`、`vw`、`vh` 與固定 `px` 的差異
- **斷點設計** — 桌機、平板、手機的常見寬度分界
- **Media Query 語法** — `@media` 的結構與條件關鍵字
- **Angular 實作範例** — 在元件 SCSS 中撰寫 Media Query
- **實際效果示範** — 縮放視窗觀察背景顏色切換

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 RWD？

Responsive Web Design

---

# 什麼是 RWD？

**RWD（Responsive Web Design，響應式網頁設計）** 指網頁能自動適應不同裝置的螢幕尺寸，無論手機、平板或桌機瀏覽，畫面皆能正確呈現。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**固定單位（`px`）**
- 每個螢幕上顯示大小固定不變
- 在小螢幕可能出現水平捲軸
- 不具備自適應能力

</div>
<div>

**相對單位（`%`、`vw`、`vh`）**
- 依視窗或父元素大小動態計算
- 畫面縮放時元素隨之調整
- 是實現 RWD 的基礎手段

</div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> CSS 中使用 <code>%</code>、<code>vw</code>（Viewport Width）、<code>vh</code>（Viewport Height）等相對單位，即是 RWD 最基本的實作方式。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 響應式單位

Responsive CSS Units

---

# 響應式單位比較

| 單位 | 基準 | 特性 |
| --- | --- | --- |
| `px` | 固定像素 | 不隨視窗變化，非響應式 |
| `%` | 父容器寬度 | 寬度隨父容器等比縮放 |
| `vw` | 視窗寬度（Viewport Width） | `1vw` = 視窗寬度的 1% |
| `vh` | 視窗高度（Viewport Height） | `1vh` = 視窗高度的 1% |

---

# 響應式單位 — 範例

```css
/* 固定寬度：所有螢幕永遠顯示 300px */
.box-fixed {
  width: 300px;
}

/* 相對寬度：佔父容器的 80% */
.box-percent {
  width: 80%;
}

/* 視窗相對：佔視窗寬度 50%、高度 30% */
.box-viewport {
  width: 50vw;
  height: 30vh;
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 斷點設計

Breakpoints

---

# 常見裝置斷點

**斷點（Breakpoint）** 是 Media Query 中定義版面切換的寬度臨界值。

| 裝置類型 | 寬度範圍 | 版面說明 |
| --- | --- | --- |
| 桌機（Desktop） | `> 1024px` | 多欄寬版面 |
| 平板（Tablet） | `601px ~ 768px` | 二欄或單欄 |
| 手機（Mobile） | `≤ 600px` | 單欄垂直排列 |

<div class="flex justify-center"><img src="/images/52-rwd/breakpoints-device-diagram.png" class="rounded shadow-md max-h-80" /></div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Media Query

@media 語法結構

---

# @media 語法結構

`@media` 規則讓開發者針對特定視窗條件套用獨立的 CSS 樣式，是實作 RWD 最核心的工具。

**基本語法**

```css
@media (條件) {
  選擇器 {
    屬性: 值;
  }
}
```

**常用條件關鍵字**

| 關鍵字 | 說明 | 範例 |
| --- | --- | --- |
| `max-width` | 視窗寬度不超過指定值時套用 | `(max-width: 600px)` |
| `min-width` | 視窗寬度不小於指定值時套用 | `(min-width: 1024px)` |
| `and` | 同時滿足多個條件 | `(min-width: 601px) and (max-width: 768px)` |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Angular 實作範例

Media Query in Angular Component

---

# 在 Angular 中套用 Media Query

Media Query 寫在 Angular 元件對應的 `.scss` 檔案內，與一般 CSS 寫法完全相同。

**HTML 範本**

```html
<!-- practise1.component.html -->
<div class="box"></div>
```

**SCSS — 預設（桌機）樣式**

```css
/* practise1.component.scss */
.box {
  width: 100%;
  background: lightblue;
}
```

---

# Media Query 實作範例（一）

```css
/* 手機版：視窗寬度 ≤ 600px */
@media (max-width: 600px) {
  .box {
    width: 100%;
    background: lightcoral;
  }
}
```

---

# Media Query 實作範例（二）

```css
/* 平板版：601px ≤ 視窗寬度 ≤ 768px */
@media (max-width: 768px) and (min-width: 601px) {
  .box {
    width: 100%;
    background: lightgreen;
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> CSS 樣式具有覆蓋特性，應確保各 <code>@media</code> 條件的寬度範圍不重疊，以避免非預期的樣式覆蓋。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實際效果示範

Visual Result

---

# 瀏覽器縮放效果

儲存後在瀏覽器中縮放視窗，`.box` 的背景色依斷點自動切換：

| 視窗寬度 | 套用規則 | 背景顏色 |
| --- | --- | --- |
| `> 768px`（桌機） | 預設樣式 | 淺藍色（`lightblue`） |
| `601px ~ 768px`（平板） | 平板 Media Query | 淺綠色（`lightgreen`） |
| `≤ 600px`（手機） | 手機 Media Query | 淺粉紅（`lightcoral`） |

<div class="flex justify-center"><img src="/images/52-rwd/media-query-color-result.png" class="rounded shadow-md max-h-80" /></div>

---

# 實際畫面示意

三種裝置寬度下的背景顏色切換（由上至下：桌機 → 平板 → 手機）：

<div class="flex justify-center"><img src="/images/52-rwd/browser-responsive-demo.png" class="rounded shadow-md max-h-80" /></div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>驗證方式：</b> 按 <code>F12</code> 開啟 DevTools，拖曳視窗邊緣或使用裝置模擬器（Toggle Device Toolbar），即可即時觀察樣式切換效果。
</div>

---
layout: end
---

# 課程結束

### 透過相對單位（`%`、`vw`、`vh`）與 `@media` 斷點語法，在同一份程式碼中實現跨裝置的響應式自適應版面
