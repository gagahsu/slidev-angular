---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 資料轉換與呈現
routeAlias: ch19
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
    資料轉換與呈現
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「從畫面設計到資料結構，讓資料驅動畫面」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎回來！
在前面的課程中，我們已經學會了寫程式的骨架、皮肉和簡單的大腦。
現在，我們要開始接觸前端開發中一個極具分水嶺意義的技能——「資料轉換與呈現的設計思維」。
很多新手寫網頁，都是看到畫面有什麼字，就直接在 HTML 裡打什麼字。
但那只是在做「電子看板」，不是真正的「動態網頁」。
今天，我們要學會像一個專業的前端架構師一樣，從畫面設計反推資料結構，設計出可以隨資料量動態長大、縮小的網頁！
-->

---
layout: default
---

# Outline

- **為什麼要學資料轉換** — 前端資料設計的重要性
- **步驟一：思考畫面設計** — 讓 HTML 能隨資料動態成長
- **步驟二：思考畫面需要什麼內容** — UI/UX 需求分析
- **步驟三：設計資料格式** — Array、JSON 的應用
- **實作練習**

<!--
今天我們的作戰計畫很清晰，就是前端開發的黃金三部曲：
首先，我們會聊聊為什麼一定要學會資料轉換。
接著，一步步帶大家走過「畫面思考」、「UI/UX需求拆解」到「資料格式設計」這三個步驟。
最後，我們會做一個電商商城的資料結構設計實作，讓大家直接上手練習！
-->

---

# 為什麼要學習資料轉換

前端在設計畫面或接收 API 資料時，需要設計並撈取資料的格式。

以「動態問卷」為例，前端開發前需思考三個步驟：

- **1. 思考你的畫面設計**
- **2. 思考你的畫面需要什麼內容**
- **3. 設計你的資料的格式**

<!--
為什麼要學這個？
你想想看，今天老闆交給你一個任務，要你做一個「動態線上問卷系統」。
這個問卷，每次打開，裡面的問題、選項數量都不一樣。
你不可能在 HTML 裡寫死這題有三個選項、那題有兩個。
這時候，你就必須先撈取後端 API 給你的原始資料，並把它們轉換成前端 HTML 好渲染的格式。
要做好這件事，我們有黃金三步驟：
第一，思考畫面設計；
第二，思考畫面需要什麼內容；
第三，設計資料格式。
這三步，是我們動手寫扣之前的「沙盤推演」，非常關鍵！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 三個設計步驟
# Three Design Steps

<!--
接下來，我們就來詳細看看這三個步驟是怎麼運作的。
-->

---

# 步驟一：思考畫面設計

畫面結構必須能配合資料量動態調整，而非寫死靜態內容。

以動態問卷為例，問題與選項數量不固定：

| 情況 | 結果 |
| --- | --- |
| HTML 內容固定 | 資料量改變時，畫面呈現不符預期或報錯 |
| HTML 動態增長 | 資料有幾筆，畫面就渲染幾筆，自動對應 |

**原則：HTML 結構需根據資料量動態增減，不可靜態寫死。**

<!--
第一步：思考畫面設計。
當你拿到設計師的設計圖，或是自己構思好畫面時，大腦要先開啟「動態模擬器」。
你要想：「如果這個問卷，今天只有一題，畫面長怎樣？如果突然變多到一百題，畫面會不會擠壓變形？選項要是字數很長，網頁會不會破圖？」
這就決定了你的 HTML 結構必須是「動態的」，要能夠根據資料的數量自動增長或隱藏，而不是一個個寫死。
-->

---

# 步驟二：分析畫面所需內容

在設計資料格式前，先從 UI/UX 角度釐清畫面需求：

- 畫面需要呈現哪些欄位？
- 哪些欄位由後端 API 提供？哪些由使用者輸入？
- 哪些欄位是唯讀的？哪些是可編輯的？

> 確認好需求清單，才能準確定義資料格式與 API 規格。

<!--
第二步：思考畫面需要的內容。
這就是標準的 UI/UX 需求分析。
你要列出：
這個畫面要顯示什麼字？有哪幾個輸入框？
使用者輸入完的資料，我該怎麼收集起來？
哪些資料是唯讀的、哪些是可編輯的？
這就像是你要去買菜，得先把菜單列出來，你才知道要去超市買哪些材料一樣。
-->

---

# 步驟三：設計資料格式

根據前兩步的畫面分析，套用以下口訣決定資料型別：

以動態問卷為例：

- 一張問卷有「多個」問題 → 問題的欄位是 **Array**
- 一個問題裡包含許多內容（問題標題、問題id、問題選項）→ 問題的欄位（Array 中每筆資料）是 **JSON** 格式

```typescript
const questions = [
  { id: 1, title: '您對服務的評價？', options: ['非常滿意', '滿意', '不滿意'] },
  { id: 2, title: '您會推薦給朋友嗎？', options: ['會', '不會'] }
];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>口訣：</b> 看到「多個」→ Array；包含許多欄位 → JSON（Object）
</div>

<!--
第三步，也就是把需求轉化成程式碼的「資料格式設計」。
大叔教大家一個「無痛設計口訣」：
小括號、中括號、大括號分清楚。
只要你在畫面上看到「多個重複的項目」，例如多個問題、多個商品，這就代表你要宣告為「Array（陣列）」！
如果每個項目裡面，又「包含許多不同的細節屬性」，比如問題有標題、有id、有選項，這就代表這個項目本身是一個「JSON（物件）」。
你看看這段程式碼：
`questions` 是一個中括號包起來的 Array，
裡面每一個元素，都是用大括號包起來的 JSON 物件。
物件裡面的 `options`（問題選項）因為也是多個，所以它又是一個陣列！
這就是經典的「陣列包物件，物件再包陣列」結構。
多做幾次，你看到畫面就能秒懂資料該怎麼設計了！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

<!--
空談無益，我們馬上來一場實戰演練！
-->

---
layout: default
---

# 練習：資料格式設計
### 任務說明

當你看到以下畫面，要怎麼去做**資料的設計**？請試著用 TypeScript 設計出可以對應此畫面的資料結構。

<div class="mt-4 flex justify-center">
  <img src="/images/17-pipes/practice-ecommerce.png" class="rounded shadow-md object-contain" style="width: 90%; max-height: 55vh;" />
</div>

<!--
請看投影片上這個經典的電商商城畫面。
左邊有一個「辦公周邊」的精選廣告區；
右上角有一排「分類選單（menu）」；
右下角則是「商品卡片列表」。
現在，請你閉上眼睛，或者是拿出一張紙，試著用我們剛學的口訣，寫出能夠完全對應這張圖的 TypeScript 資料結構！
-->

---
layout: default
---

# 練習：解題提示（1／2）
### 拆解畫面結構

<img src="/images/17-pipes/practice-ecommerce.png" class="rounded shadow-md" style="float: right; width: 38%; margin: 0 0 0.5rem 1.5rem;" />

先把這張圖的內容切開來：

- **左邊**：廣告區（一張圖 + 標題）→ Object
- **右上**：menu 分類（多個選項）→ Array
- **下方**：商品列表（多筆商品，每筆含**圖片、名稱、價格**）→ Array of Object

<!--
大家都設計好了嗎？我們一起來拆解一下：
左邊的廣告區只有一個，但裡面包含圖片網址和標題，所以我們用一個 Object。
右上角的選單，是「多個純文字分類」，所以我們用簡單的字串陣列。
下方的商品列表，是「多個商品卡片，而且每個卡片都有名稱和價格」，所以我們用物件陣列。
-->

---
layout: default
---

# 練習：解題提示（2／2）
### TypeScript 資料結構

```typescript
const ad = {
  imageUrl: '/images/17-pipes/practice-ecommerce.png',
  title: '辦公周邊'
};

const categoryMenu = ['辦公配件', '印表機', '鍵盤滑鼠', '喇叭耳麥'];

const products = [
  { name: 'iFLYTEK AINOTE Air 2 AI智能會議筆記', price: 16840, imageUrl: '/images/products/product-1.png' },
  { name: 'BELKIN USB-C 7合1高速多媒體集線器',   price: 1130,  imageUrl: '/images/products/product-2.png' },
  { name: 'TDGB 17-49吋 高承重 20KG 無重力 電',  price: 2391,  imageUrl: '/images/products/product-3.png' },
  { name: 'Raymii瑞米 LS-98-M1 氣壓式 螢幕支架', price: 999,   imageUrl: '/images/products/product-4.png' },
  { name: 'BELKIN Thunderbolt 4 5合1 dock 擴',   price: 5752,  imageUrl: '/images/products/product-5.png' },
];
```

<!--
你看，透過這種結構化拆解，複雜的畫面瞬間就變成了清爽的 TypeScript 資料結構。
這就是前端工程師的功力體現！
-->

---
layout: default
---

# 練習 2：實作畫面
### 任務說明

把你剛剛建立的資料，試著用那些資料**做出類似的畫面**。

<div class="mt-4 flex justify-center">
  <img src="/images/17-pipes/practice-ecommerce.png" class="rounded shadow-md object-contain" style="width: 90%; max-height: 55vh;" />
</div>

<!--
好，資料格式設計完了。
下一部分的練習就是：請你把剛剛在 TS 裡定義好的 `ad`、`categoryMenu` 和 `products` 變數。
搭配上我們之前學過的雙大括號和中括號屬性綁定，在 HTML 裡把這個畫面動態呈現出來！
這題要結合你之前的 HTML/CSS 與變數綁定功力，好好給它寫出來吧！
-->

---
layout: default
---

# 練習 2：解題提示（1／8）
### TypeScript — 資料宣告

```typescript
ad = {
  imageUrl: '/images/products/ad.png',
  title: '辦公周邊'
};

categoryMenu = ['辦公配件', '印表機', '鍵盤滑鼠', '喇叭耳麥'];

products = [
  { name: 'iFLYTEK AINOTE Air 2 AI智能會議筆記', price: 16840, imageUrl: '/images/products/product-1.png' },
  { name: 'BELKIN USB-C 7合1高速多媒體集線器',   price: 1130,  imageUrl: '/images/products/product-2.png' },
  { name: 'TDGB 17-49吋 高承重 20KG 無重力 電',  price: 2391,  imageUrl: '/images/products/product-3.png' },
  { name: 'Raymii瑞米 LS-98-M1 氣壓式 螢幕支架', price: 999,   imageUrl: '/images/products/product-4.png' },
  { name: 'BELKIN Thunderbolt 4 5合1 dock 擴',   price: 5752,  imageUrl: '/images/products/product-5.png' },
];
```

<!--
三個變數：廣告物件、分類字串陣列、商品物件陣列。
每筆商品包含名稱、價格、圖片網址三個欄位。
-->

---
layout: default
---

# 練習 2：解題提示（2／8）
### HTML — 廣告區與分類選單

```html
<div class="shop-layout">
  <!-- 廣告區 -->
  <div class="ad-panel">
    <img [src]="ad.imageUrl" alt="廣告" />
    <p>{{ ad.title }}</p>
  </div>

  <div class="main-panel">
    <!-- 分類選單（靠右；active 為藍底白字） -->
    <div class="category-menu">
      <button class="active">{{ categoryMenu[0] }}</button>
      <button>{{ categoryMenu[1] }}</button>
      <button>{{ categoryMenu[2] }}</button>
      <button>{{ categoryMenu[3] }}</button>
    </div>

    <!-- 商品列表見下一頁 -->
    <div class="product-grid"> ... </div>
  </div>
</div>
```

<!--
[src] 是 Angular 屬性綁定，把 ad.imageUrl 的值傳給 img 的 src 屬性。
categoryMenu 是字串陣列，用索引 [0]~[3] 逐一取值放進 button。
-->

---
layout: default
---

# 練習 2：解題提示（3／8）
### HTML — 商品列表

```html
<!-- product-grid 內部 -->
<div class="product-grid">
  <div class="product-card">
    <img [src]="products[0].imageUrl" alt="{{ products[0].name }}" />
    <p>{{ products[0].name }}</p>
    <p class="price">${{ products[0].price }}</p>
  </div>

  <div class="product-card">
    <img [src]="products[1].imageUrl" alt="{{ products[1].name }}" />
    <p>{{ products[1].name }}</p>
    <p class="price">${{ products[1].price }}</p>
  </div>

  <!-- products[2] ~ products[4] 結構相同，以此類推 -->
</div>
```

<div class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ 目前用索引取值是暫時做法。完整的動態清單需使用 <b>第 26 章</b>的 <code>*ngFor</code> 語法。
</div>

<!--
每張商品卡片結構相同：圖片用 [src] 綁定，名稱與價格用雙大括號插值。
目前手動複製五份，之後學 *ngFor 就能自動產生。
-->

---
layout: default
---

# 練習 2：解題提示（4／8）
### CSS — 整體版型與廣告區

```css
/* 整體左右版型 */
.shop-layout {
  display: flex;               /* 左右欄排列 */
  gap: 1rem;                   /* 廣告區與商品區的間距 */
  padding: 1.5rem;             /* 內容與外框的距離 */
  border-radius: 12px;         /* 四個角變圓 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 浮雕陰影 */
}
/* 廣告區固定寬度，不隨畫面縮小 */
.ad-panel {
  width: 220px;           /* 固定寬度，不隨視窗縮小 */
  flex-shrink: 0;         /* 禁止被 flex 壓縮 */
  display: flex;          /* 讓子元素可用 flex 撐高 */
  flex-direction: column; /* 子元素垂直排列 */
}
.ad-panel img {
  width: 100%;            /* 圖片撐滿廣告區寬度 */
  flex: 1;                /* 撐滿廣告區剩餘高度 */
  object-fit: cover;      /* 填滿空間，超出部分裁切 */
  border-radius: 8px;     /* 圖片四角圓角 */
}
```

<!--
shop-layout 用 flex 做左右欄分割。padding 讓內容和外框保持距離，border-radius 讓四個角變圓，box-shadow 製造出整體區塊浮起來的陰影感。ad-panel 固定 220px，flex-shrink: 0 防止它被壓縮。ad-panel 加 display: flex + flex-direction: column，讓 img 能用 flex: 1 撐滿整個廣告區高度；object-fit: cover 讓圖片填滿空間不留白。
-->

---
layout: default
---

# 練習 2：解題提示（5／8）
### CSS — 分類選單容器

```css
/* 分類選單靠右對齊，底部分隔線 */
.category-menu {
  display: flex;                       /* 按鈕橫向排列 */
  justify-content: flex-end;           /* 靠右對齊 */
  gap: 0.5rem;                         /* 按鈕間距 */
  padding-bottom: 0.75rem;             /* 分隔線上方的內距 */
  margin-bottom: 1rem;                 /* 分隔線與商品格的距離 */
  border-bottom: 1px solid #e2e8f0;   /* 灰色分隔線 */
}
```

<!--
category-menu 用 flex + justify-content: flex-end 讓按鈕靠右排列，對應圖片右上角的選單位置。gap 控制按鈕間距。padding-bottom 在選單下方留出內距，border-bottom 畫出一條灰色分隔線，視覺上把選單和商品格分開。margin-bottom 讓分隔線和商品格之間再保留額外空白。
-->

---
layout: default
---

# 練習 2：解題提示（6／8）
### CSS — 分類按鈕樣式

```css
/* 分類按鈕：預設無底色、黑字 */
.category-menu button {
  padding: 4px 14px;         /* 上下 4px、左右 14px 內距 */
  border: none;              /* 移除瀏覽器預設邊框 */
  border-radius: 4px;        /* 輕微圓角 */
  background: transparent;   /* 預設無底色 */
  color: #333;               /* 深灰黑字 */
  cursor: pointer;           /* 滑鼠移過去變手形 */
  font-size: 0.9rem;         /* 字體略小 */
}

/* 選中狀態：藍色底色、白字 */
.category-menu button.active {
  background: #3b82f6;  /* 藍色底色 */
  color: white;         /* 白字 */
}
```

<!--
button 預設無底色黑字，加上 .active class 才變成藍底白字。這個「預設 + active 覆蓋」的模式和其他章節的分類按鈕邏輯完全一樣，border: none 移除瀏覽器預設按鈕邊框。
-->

---
layout: default
---

# 練習 2：解題提示（7／8）
### CSS — 商品列表

```css
/* 商品列表五欄 grid */
.product-grid {
  display: grid;                          /* 啟用 Grid 排版 */
  grid-template-columns: repeat(5, 1fr); /* 平均分成 5 欄 */
  gap: 1rem;                              /* 欄與列的間距 */
}
```

**`grid-template-columns` 語法說明：**

| 寫法 | 效果 |
|---|---|
| `repeat(5, 1fr)` | 平均分成 5 欄（本例） |
| `repeat(3, 1fr)` | 改成 3 欄 |
| `200px 1fr 1fr` | 第一欄固定 200px，其餘兩欄均分 |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>1fr</code> = 「1 份剩餘空間」；<code>repeat(N, 1fr)</code> = 平均切成 N 欄，改數字就能調整欄數
</div>

<!--
product-grid 用 CSS Grid 五欄平均分配空間。Grid 和 Flexbox 的差別在於：Flexbox 控制「一個方向」的排列，Grid 同時控制「欄和列」。`repeat(5, 1fr)` 是最常用的等寬多欄語法——同學只要記住這個格式，改數字就能換欄數。
-->

---
layout: default
---

# 練習 2：解題提示（8／8）
### CSS — 商品卡片與價格

```css
/* 商品卡片圖片 */
.product-card img {
  width: 100%;            /* 撐滿卡片寬度 */
  aspect-ratio: 1 / 1;   /* 強制正方形比例 */
  object-fit: contain;   /* 圖片縮放不裁切、不變形 */
}

/* 商品名稱 */
.product-card p {
  font-size: 0.9rem;     /* 字體略小 */
  margin: 0.25rem 0;     /* 上下留細間距 */
}

/* 價格紅字 */
.price {
  color: #e53e3e;        /* 紅色 */
  font-weight: bold;     /* 粗體 */
}
```

<!--
aspect-ratio: 1 / 1 讓圖片保持正方形比例，object-fit: contain 避免圖片變形。
price class 對應 HTML 中 <p class="price"> 的紅色價格樣式。
-->

---
layout: end
---

# 課程結束
### 設計好資料結構，畫面自然水到渠成

<!--
恭喜大家，順利完成了資料設計與轉換的第一關！
記住這個觀念：前端的 HTML 只是皮肉，資料結構才是靈魂。
靈魂設計得好，皮肉自然水到渠成。
回去把這個拆解畫面的思考邏輯印在腦海裡。
下一堂課，我們要迎來「TypeScript 練習二」，我們要來學習如何處理日期物件（Date）以及更進階的資料重組實戰！大家大腦充飽電，我們等一下見！
-->
