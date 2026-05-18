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

---
layout: default
---

# Outline

- **CSS 互動 — :hover 與 :active**
- **display: flex — 主軸與次軸**
- **對齊 — justify-content 與 align-items**
- **安裝 Bootstrap**
- **練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS 互動
# :hover 與 :active

---

# CSS 互動 — 概念

前端標籤樣式可以設定成**互動式樣式**，根據使用者操作產生不同的視覺回饋：

| 偽類 | 觸發條件 | 說明 |
| --- | --- | --- |
| `.class:hover` | 滑鼠移至標籤 | 滑鼠懸停時的樣式回饋 |
| `.class:active` | 滑鼠點擊時 | 按下滑鼠時的樣式回饋 |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>SCSS 寫法：</b> <code>.class { &amp;:hover { } }</code>，注意 <code>&amp;:hover</code> 在 SCSS 中算是子層<br/>
💡 搭配 <code>transition</code> 屬性調整互動時間，能大幅提升使用質感
</div>

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# display: flex
# 主軸與次軸

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 對齊
# justify-content & align-items

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝 Bootstrap
# Bootstrap Integration

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

---

# 安裝 Bootstrap — 原理

`npm i bootstrap` 的用途是將 Bootstrap 套件**安裝進專案**，就像 HTML 的 `<link>` import 一樣（差別在於 `npm i` 是安裝套件進專案中）。

在 `angular.json` 的 `styles` 加入套件路徑，等同於告訴專案「我要匯入這個 CSS，並告訴它 CSS 的位置」。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 安裝後的套件都存放在 <code>node_modules/</code> 資料夾，路徑以 <code>./node_modules/</code> 開頭
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習
# CSS Practice

---

# 練習 — Flex 排版
### 任務說明

試著做出下圖的排版：
- 中間間隔為 **10px**
- Flex item 3 左右各間隔 **10px**
- Flex item 1 跟 5 高度為 **80px**

<img src="/images/10-css/practice-flex-layout.png" alt="練習目標排版" style="max-height: 260px; margin-top: 0.8rem;" />

---
layout: end
---

# CSS 樣式編輯完成
### 互動、排版、套件，全部就位！
