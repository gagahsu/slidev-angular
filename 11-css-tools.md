---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: CSS 進階工具
routeAlias: ch11
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
    CSS 進階工具
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「背景、定位、堆疊，掌控版面細節」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **背景設定 — background-image / repeat / position / size**
- **Position — fixed / relative & absolute**
- **z-index — 堆疊順序**
- **後蓋前觀念 — CSS 優先權**
- **練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 背景設定
# Background Properties

---

# 背景設定 — 屬性總覽

`background-*` 系列屬性可精細控制元素的背景圖片顯示方式：

| 屬性 | 說明 |
| --- | --- |
| `background-image` | 設定背景圖片，使用 `url(...)` 指定路徑 |
| `background-repeat` | 控制背景是否重複平鋪，常用 `no-repeat` |
| `background-position` | 設定背景位置，格式為 `X Y`（水平 垂直） |
| `background-size` | 指定背景圖片大小（px、%、`cover`、`contain`） |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>background-position</b> 前方數值代表水平位置（X），後方代表垂直位置（Y）
</div>

---

# background-image — 本地端圖片

`url()` 可以放入**本地端（電腦）圖片的路徑**：

```css
background-image: url("./IMG_8536(1).jpg");
```

<div style="display: flex; gap: 2rem; align-items: center; margin-top: 0.8rem;">
  <img src="/images/11-css/bg-local.png" alt="本地端背景圖片效果示意" style="max-height: 220px; border-radius: 6px; border: 1px solid #e2e8f0; flex-shrink: 0;" />
  <div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm">
    💡 路徑以 <code>./</code> 開頭代表相對路徑，與 CSS 檔案位於同一層目錄<br/><br/>
    ⚠️ 圖片名稱含括號、空格等特殊字元時，記得確認路徑格式正確
  </div>
</div>

---

# background-image — 網路圖片：取得網址

`url()` 也可以放入**網路圖片的網址**，三步驟取得圖片網址：

<img src="/images/11-css/bg-network-steps.png" alt="Google 搜尋圖片後複製圖片網址的步驟截圖" style="max-height: 300px; margin-top: 0.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />

<div class="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ 使用網路圖片前請注意版權，此處僅作練習用途
</div>

---

# background-image — 網路圖片：範例

```css
background-image: url("https://pic.pimg.tw/twfish0999/1361897489-2554509122_n.jpg");
```

<div style="display: flex; gap: 2rem; align-items: center; margin-top: 0.8rem;">
  <img src="/images/11-css/bg-network.png" alt="網路圖片設為背景的效果示意" style="max-height: 230px; border-radius: 6px; border: 1px solid #e2e8f0; flex-shrink: 0;" />
  <div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm">
    💡 直接貼上圖片的完整 URL，效果與本地端相同<br/><br/>
    預設情況下背景圖片會<b>重複平鋪</b>填滿整個元素
  </div>
</div>

---

# background-repeat — 背景是否重複

預設背景圖片會重複平鋪，加上 `no-repeat` 可取消重複：

```css
background-repeat: no-repeat;
```

<div style="display: flex; gap: 2.5rem; align-items: flex-start; margin-top: 0.8rem;">
  <div>
    <div style="font-weight: bold; margin-bottom: 0.4rem;">預設（重複平鋪）</div>
    <div style="border: 2px solid #ccc; width: 180px; height: 160px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.8rem; text-align: center;">圖片重複排列<br/>填滿容器</div>
  </div>
  <div>
    <div style="font-weight: bold; margin-bottom: 0.4rem;">no-repeat（不重複）</div>
    <img src="/images/11-css/bg-no-repeat.png" alt="background-repeat: no-repeat 效果示意" style="max-height: 160px; border: 2px solid #ccc; border-radius: 4px;" />
  </div>
</div>

---

# background-position — 設定背景位置

格式 `X Y`：前方數值為水平位置，後方為垂直位置：

```css
background-repeat: no-repeat;
background-position: 50% 50%;
```

<div style="display: flex; gap: 2rem; align-items: center; margin-top: 0.8rem;">
  <img src="/images/11-css/bg-position.png" alt="background-position: 50% 50% 效果示意（圖片置中）" style="max-height: 220px; border-radius: 6px; border: 1px solid #e2e8f0; flex-shrink: 0;" />
  <div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm">
    💡 <b>X / Y 數值對照：</b><br/>
    X：<code>0%</code> = 靠左，<code>50%</code> = 置中，<code>100%</code> = 靠右<br/>
    Y：<code>0%</code> = 頂端，<code>50%</code> = 置中，<code>100%</code> = 底端<br/><br/>
    <code>50% 50%</code> 表示圖片顯示在正中央
  </div>
</div>

---

# background-size — 設定背景圖片大小

| 值 | 說明 |
| --- | --- |
| `px` / `%` | 直接指定圖片寬高 |
| `cover` | 等比放大至填滿容器，可能裁切；解析度低時易失真 |
| `contain` | 等比縮放至可完整放入容器，不裁切 |

```css
background-repeat: no-repeat;
background-size: contain;
```

<img src="/images/11-css/bg-size-contain.png" alt="background-size: contain 效果示意" style="max-height: 145px; margin-top: 0.4rem; border-radius: 4px; border: 1px solid #ccc;" />

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Position（位置）
# fixed / relative / absolute

---

# position: fixed — 定錨

`position: fixed` 將標籤**固定在視窗的絕對位置**，不隨滾輪移動：

- 定位方式以**視窗**的上下左右為基準
- 不論如何縮放網頁或滾動滾輪，位置始終不變
- 搭配 `top`、`right`、`bottom`、`left` 指定距視窗邊緣的距離

```css
.topContent {
  position: fixed;
  top: 20px;
  right: 50px;
}
```

<div class="mt-3 p-2 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 常用於固定導覽列、懸浮按鈕、回頂端按鈕等不隨頁面捲動的元件
</div>

---

# position: fixed — 示意圖

滾輪滾動後，`fixed` 元素位置相對視窗**保持不變**：

<div style="display: flex; gap: 3rem; justify-content: center; align-items: flex-start; margin-top: 1.2rem;">
  <div>
    <div style="font-weight: bold; margin-bottom: 0.5rem; text-align: center; color: #444;">滾輪滾動前</div>
    <div style="position: relative; width: 160px; height: 210px; border: 2px solid #888; background: #fff; overflow: hidden;">
      <div style="position: absolute; top: 12px; right: 12px; width: 48px; height: 48px; background: #ee9b9b; border: 2px solid #c04040; z-index: 2;"></div>
      <div style="height: 90px; background: #e8f4e8; border-bottom: 1px dashed #bbb; display: flex; align-items: center; justify-content: center; color: #888; font-size: 0.75rem;">頁面內容</div>
    </div>
  </div>
  <div style="display: flex; align-items: center; font-size: 1.8rem; color: #666; padding-top: 90px;">→</div>
  <div>
    <div style="font-weight: bold; margin-bottom: 0.5rem; text-align: center; color: #444;">滾輪滾動後（其位置仍不變）</div>
    <div style="position: relative; width: 160px; height: 210px; border: 2px solid #888; background: #fff; overflow: hidden;">
      <div style="position: absolute; top: 12px; right: 12px; width: 48px; height: 48px; background: #ee9b9b; border: 2px solid #c04040; z-index: 2;"></div>
      <div style="height: 170px; background: #e8f4e8; border-bottom: 1px dashed #bbb; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 8px; color: #888; font-size: 0.75rem;">（內容已往上捲）</div>
    </div>
  </div>
</div>

---

# position: relative & absolute — 父子關係定錨

`relative` 與 `absolute` **搭配使用**，讓子標籤在父標籤範圍內進行定位：

| 角色 | CSS 設定 | 說明 |
| --- | --- | --- |
| 父標籤 | `position: relative` | 建立定位基準，本身位置不移動 |
| 子標籤 | `position: absolute` | 在父標籤區域內進行定錨 |

```html
<div class="top">
  <div class="topContent"></div>
</div>
```

<div class="mt-2 p-2 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 標籤 <code>topContent</code> 被 <code>top</code> 包住，即形成父子關係：父 → <code>top</code>，子 → <code>topContent</code>
</div>

---

# position: relative & absolute — CSS 範例

```css
.top {
  width: 100vw;
  height: 110vh;
  position: relative;
}
```

```css
.topContent {
  width: 100px;
  height: 100px;
  background-color: #ee9b9b;
  position: absolute;
  top: 5%;
  right: 1%;
}
```

<div class="mt-2 p-2 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 滾動頁面時，<code>absolute</code> 元素的位置會跟著父標籤移動（非固定在視窗）
</div>

---

# position: relative & absolute — 示意圖

`absolute` 元素釘在父標籤的某一位置，滾動時**跟著父標籤移動**：

<div style="display: flex; gap: 3rem; justify-content: center; align-items: flex-start; margin-top: 1.2rem;">
  <div>
    <div style="font-weight: bold; margin-bottom: 0.5rem; text-align: center; color: #444;">滾輪滾動前</div>
    <div style="position: relative; width: 160px; height: 210px; border: 2px solid #888; background: #fff; overflow: hidden;">
      <div style="position: absolute; top: 12px; right: 12px; width: 48px; height: 48px; background: #ee9b9b;"></div>
      <div style="height: 90px; background: #e8f4e8; display: flex; align-items: center; justify-content: center; color: #888; font-size: 0.75rem;">父標籤範圍</div>
    </div>
  </div>
  <div style="display: flex; align-items: center; font-size: 1.8rem; color: #666; padding-top: 90px;">→</div>
  <div>
    <div style="font-weight: bold; margin-bottom: 0.5rem; text-align: center; color: #444;">滾輪滾動後（跟著父層移動）</div>
    <div style="position: relative; width: 160px; height: 210px; border: 2px solid #888; background: #fff; overflow: hidden;">
      <div style="position: absolute; top: -40px; right: 12px; width: 48px; height: 48px; background: #ee9b9b;"></div>
      <div style="height: 210px; background: #e8f4e8; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 8px; color: #888; font-size: 0.75rem;">（父標籤已往上捲動）</div>
    </div>
  </div>
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# z-index
# 堆疊順序

---

# z-index — 堆疊順序

`z-index` 設定元素的**前後堆疊順序**，數值越高越前面：

- 可設為負數（元素會疊在其他元素後方）
- **只對有設定 `position` 的元素有效**
- 注意：`position: relative` 的父層本身無法移動

<div style="display: flex; justify-content: center; margin-top: 1rem;">
  <div style="position: relative; width: 240px; height: 170px;">
    <div style="position: absolute; top: 0; left: 0; width: 110px; height: 110px; background: #4472C4; z-index: 1; display: flex; align-items: flex-start; padding: 6px; color: white; font-weight: bold; font-size: 0.9rem;">z-index:1</div>
    <div style="position: absolute; top: 25px; left: 50px; width: 110px; height: 110px; background: #ED7D31; z-index: 2; display: flex; align-items: flex-start; padding: 6px; color: white; font-weight: bold; font-size: 0.9rem;">z-index:2</div>
    <div style="position: absolute; top: 50px; left: 100px; width: 110px; height: 110px; background: #7030A0; z-index: 3; display: flex; align-items: flex-start; padding: 6px; color: white; font-weight: bold; font-size: 0.9rem;">z-index:3</div>
  </div>
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 後蓋前觀念
# CSS 優先權

---

# 後蓋前觀念

在 CSS 中，針對**相同標籤**的樣式設定，**後方的規則會覆蓋前方的規則**：

```css
h1 { color: red; }
h1 { color: blue; }
```

<div style="display: flex; align-items: center; gap: 1.5rem; margin-top: 0.8rem;">
  <div style="padding: 6px 16px; background: #f5f5f5; border-radius: 4px; font-size: 0.85rem; font-family: monospace;">
    color: red → color: blue（後方覆蓋）
  </div>
  <div style="font-size: 1.5rem; color: #666;">→</div>
  <div style="font-size: 2rem; font-weight: bold; color: blue;">XXX</div>
</div>

以這個 `h1` 標籤為例：

```html
<h1 class="x1">XXX</h1>
```

當兩條規則都以**標籤名稱（`h1`）**為選擇器時，後方規則生效。

---

# 後蓋前觀念 — class 選擇器

若指定 `.class` 名稱，**不會受後方標籤設定的樣式影響**：

```css
.x1 { color: red; }
h1  { color: blue; }
```

<div style="display: flex; align-items: center; gap: 1.5rem; margin-top: 0.8rem;">
  <div style="padding: 6px 16px; background: #f5f5f5; border-radius: 4px; font-size: 0.85rem; font-family: monospace;">
    .x1 → class 選擇器優先權高於標籤選擇器
  </div>
  <div style="font-size: 1.5rem; color: #666;">→</div>
  <div style="font-size: 2rem; font-weight: bold; color: red;">XXX</div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 CSS 選擇器優先權（Specificity）由高至低：<br/>
<code>id (#id)</code> &gt; <code>class (.class)</code> &gt; <code>標籤 (h1, div)</code><br/>
class 選擇器優先權高，不會被後方的標籤選擇器覆蓋
</div>

---

# 後蓋前小注意（一）

- **ID**
  - 一般標籤除了設定 `class` 名稱，也會設定 `id` 名稱
  - `id` 普遍用途在於方便 JavaScript 開發時取得指定值
  - `id` 的特性在於**不重複**，偏向功能性開發用途，而非樣式設定

- **樣式鎖定（較不常用）**
  - 在樣式設定中加上 `!important`，即使後方有同標籤的規則，該樣式也**不會被覆蓋**
  - 無必要情況時不添加

```css
h1 { color: red !important; }
h1 { color: blue; }
```

<div style="display: flex; align-items: center; gap: 1.2rem; margin-top: 0.4rem;">
  <div style="font-size: 0.85rem; color: #555;">加了 <code>!important</code> 的 red 不會被 blue 覆蓋 →</div>
  <div style="font-size: 1.8rem; font-weight: bold; color: red;">XXX</div>
</div>

---

# 後蓋前小注意（二）

- **語法建議**
  - 接收他人編輯過的網頁時，建議以後蓋前的觀念建立**新的 `.css` 檔案**覆蓋舊檔
  - 避免前人設計的樣式被更動後無法挽回

- **檔案管理**
  - CSS、TS 個別放，共用的放在一起

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習
# CSS Practice

---

# 練習 — Position 定位排版
### 任務說明

使用 `position` 屬性，試著做出下方的三層色塊排版：

<div style="display: flex; gap: 3rem; align-items: center; margin-top: 0.8rem;">
  <div style="flex: 1; font-size: 0.9rem;">
    <div style="margin-bottom: 0.5rem; font-weight: bold;">圖形規格：</div>
    <div style="margin-bottom: 0.3rem;">■ <span style="color: #474a4d; font-weight: bold;">深灰色</span>　300px × 300px　<code>#474a4d</code></div>
    <div style="margin-bottom: 0.3rem;">■ <span style="color: #c08020; font-weight: bold;">橘色</span>　　200px × 200px　<code>#f7b977</code></div>
    <div style="margin-bottom: 0.5rem;">■ <span style="color: #028760; font-weight: bold;">綠色</span>　　100px × 100px　<code>#028760</code></div>
    <div class="p-2 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm">
      💡 更改顏色：<code>background-color: 色碼;</code>
    </div>
  </div>
  <div style="flex-shrink: 0;">
    <div style="position: relative; width: 200px; height: 200px; background: #474a4d;">
      <div style="position: absolute; top: 0; right: 0; width: 133px; height: 133px; background: #f7b977;">
        <div style="position: absolute; bottom: 0; left: 0; width: 67px; height: 67px; background: #028760;"></div>
      </div>
    </div>
  </div>
</div>

---

# 練習 — Position 定位排版
### 解題提示

1. 深灰色為**最外層父標籤**，設定 `position: relative`
2. 橘色為深灰色的子標籤，設定 `position: absolute`，靠右上角（`top: 0; right: 0`）
3. 綠色為橘色的子標籤，設定 `position: absolute`，靠左下角（`bottom: 0; left: 0`）

```css
.black { position: relative; width: 300px; height: 300px; }
.orange { position: absolute; top: 0; right: 0; width: 200px; height: 200px; }
.green  { position: absolute; bottom: 0; left: 0; width: 100px; height: 100px; }
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 記得在 HTML 中建立正確的巢狀結構：<code>black &gt; orange &gt; green</code>
</div>

---
layout: end
---

# CSS 進階工具完成
### 背景、定位、堆疊，全部就位！
