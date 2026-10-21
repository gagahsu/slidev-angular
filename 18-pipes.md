---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 資料轉換與呈現
routeAlias: ch18
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
前面幾章，我們練習了 TypeScript 的各種語法，也學會把變數顯示在畫面上。這一章，我們要學一個很重要的設計思維：資料轉換與呈現。

很多初學者寫網頁，是看到畫面上有什麼字，就直接在 HTML 裡寫什麼字。但這樣做出來的只是固定的看板，不是動態網頁。

這一章，我們要學會從畫面設計反推資料結構，讓網頁能隨著資料的多寡自動調整。
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
這一章會先說明為什麼要學資料轉換，接著依序走過三個步驟：思考畫面設計、分析畫面需要的內容，以及設計資料格式。最後用一個電商畫面做實作練習。
-->

---

# 為什麼要學習資料轉換

前端在設計畫面或接收 API 資料時，需要設計並撈取資料的格式。

以「動態問卷」為例，前端開發前需思考三個步驟：

- **1. 思考你的畫面設計**
- **2. 思考你的畫面需要什麼內容**
- **3. 設計你的資料的格式**

<!--
為什麼要學資料轉換？想像我們要做一個動態問卷系統，每份問卷的題目和選項數量都不一樣。

我們不可能在 HTML 裡寫死「這題有三個選項」，而是要先拿到後端給的資料，再依照資料把畫面顯示出來。

要做好這件事，動手寫程式之前，可以先想清楚三個步驟：第一，思考畫面設計；第二，思考畫面需要什麼內容；第三，設計資料的格式。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 三個設計步驟
# Three Design Steps

<!--
接下來，我們一個一個看這三個步驟。
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
第一步，思考畫面設計。

拿到設計圖之後，先在腦中模擬幾種情況：如果問卷只有一題，畫面長什麼樣子？如果變成一百題呢？選項的文字很長，畫面會不會跑版？

看表格，如果 HTML 的內容是固定的，資料量一改變，畫面就可能不符合預期，甚至出錯。如果 HTML 能動態增長，資料有幾筆，畫面就顯示幾筆。

所以原則是：「HTML 結構要根據資料量動態增減，不要寫死」。
-->

---

# 步驟二：分析畫面所需內容

在設計資料格式前，先從 UI/UX 角度釐清畫面需求：

- 畫面需要呈現哪些欄位？
- 哪些欄位由後端 API 提供？哪些由使用者輸入？
- 哪些欄位是唯讀的？哪些是可編輯的？

> 確認好需求清單，才能準確定義資料格式與 API 規格。

<!--
第二步，分析畫面需要的內容，這就是 UI 和 UX 的需求分析。

我們要列出幾個問題：畫面要顯示哪些欄位？哪些資料由後端 API 提供，哪些由使用者輸入？哪些欄位只能看，哪些可以編輯？

就像去買菜之前要先列好菜單，才知道要買哪些材料。把需求清單確認好，才能準確定義資料格式，以及和後端溝通 API 的規格。
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
第三步，把需求轉換成資料格式。

這裡有一個簡單的口訣：「看到多個，就用陣列；包含很多欄位，就用物件」。

以動態問卷來說，一份問卷有多個問題，所以問題要用陣列。每個問題又包含 id、標題和選項這些內容，所以陣列裡的每一筆資料都是一個物件。

看程式碼，`questions` 是一個陣列，裡面每個元素都是物件。而物件裡的 `options` 因為有多個選項，所以又是一個陣列。

這種「陣列包物件，物件裡再包陣列」的結構，在實務上非常常見。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

<!--
接下來，我們用一個實作練習，把這三個步驟用一遍。
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
請看這個電商商城的畫面。左邊有一個辦公周邊的廣告區，右上角有一排分類選單，下方是商品卡片的列表。

請用剛才的口訣，試著用 TypeScript 設計出能對應這個畫面的資料結構。

想一想，哪些部分是「多個」？每個項目又包含哪些欄位？

我們先暫停一下，自己動手試試看。
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
我們來拆解這個畫面。

左邊的廣告區只有一個，但包含一張圖片和一個標題，所以用一個物件。

右上角的分類選單有好幾個選項，每個選項只是一段文字，所以用字串陣列。

下方的商品列表有好幾筆商品，每一筆都有圖片、名稱和價格，所以用物件陣列。
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
這是對應的 TypeScript 資料結構。

`ad` 是一個物件，有圖片網址和標題。`categoryMenu` 是字串陣列，放了四個分類。`products` 是物件陣列，每一筆商品都有名稱、價格和圖片網址。

經過這樣的拆解，複雜的畫面就變成了清楚的資料結構。
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
資料設計好了，接下來第二個練習，是用這些資料把畫面做出來。

請把剛才的 `ad`、`categoryMenu` 和 `products`，搭配雙大括號和中括號屬性綁定，在 HTML 裡呈現出類似的畫面。這題會結合之前學過的 HTML、CSS 和資料綁定。

我們先暫停一下，自己動手試試看。

【講師】接下來八頁是解題提示，可以視時間決定逐頁講解，或讓學生自行參考。
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
解題提示的第一部分，是在元件的 TypeScript 裡宣告資料。

這裡宣告了三個全域變數：廣告物件 `ad`、分類字串陣列 `categoryMenu`，以及商品物件陣列 `products`。每一筆商品都有名稱、價格和圖片網址三個欄位。
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
接著看 HTML 的廣告區和分類選單。

廣告圖片用中括號 `src` 綁定 `ad.imageUrl`，標題用雙大括號顯示 `ad.title`。

分類選單是字串陣列，所以用索引取值，`categoryMenu` 中括號 0 到 3，分別放進四個按鈕裡。
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
再來是商品列表。

每張商品卡片的結構都一樣：圖片用中括號 `src` 綁定，名稱和價格用雙大括號顯示，並用索引取出第幾筆商品。

這裡我們手動寫了好幾份相同的結構，這只是暫時的做法。之後學到 Angular 的迴圈語法，就能依照資料筆數自動產生卡片。
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
接著是 CSS 的部分，先看整體版型和廣告區。

`.shop-layout` 用 flex 把廣告區和商品區左右排列，再加上內距、圓角和陰影，讓整個區塊看起來像浮起來一樣。

`.ad-panel` 固定寬度 220 像素，並用 `flex-shrink: 0` 防止它被壓縮。它本身也設定成直向的 flex，這樣裡面的圖片就能用 `flex: 1` 撐滿整個高度。最後 `object-fit: cover` 讓圖片填滿空間，超出的部分裁掉。
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
接著是分類選單的容器。

`.category-menu` 用 flex 讓按鈕橫向排列，`justify-content: flex-end` 讓它們靠右，對應畫面右上角的位置，`gap` 控制按鈕之間的距離。

下方用 `border-bottom` 畫出一條灰色的分隔線，把選單和商品區分開，再用內距和外距調整分隔線上下的空間。
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
再來是分類按鈕的樣式。

按鈕預設沒有底色，文字是深灰色，並用 `border: none` 拿掉瀏覽器預設的邊框，加上手指游標。

當按鈕加上 `active` 這個 class，就會變成藍底白字，代表目前選中的分類。這種「預設樣式，加上 active 覆蓋」的寫法，在做分類按鈕時很常見。
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
商品列表這裡，我們用到一個新的排版方式：CSS Grid。

`display: grid` 啟用 Grid，`grid-template-columns` 設定欄位。`repeat(5, 1fr)` 代表平均分成 5 欄，`1fr` 的意思是「一份剩餘空間」。看表格，改成 `repeat(3, 1fr)` 就變成 3 欄；也可以混合固定寬度和彈性寬度。

Grid 和 Flexbox 的差別在於，Flexbox 主要控制一個方向的排列，Grid 可以同時控制欄和列。做這種多欄的卡片列表時，Grid 非常方便。
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
最後是商品卡片和價格的樣式。

圖片設定 `aspect-ratio: 1 / 1`，強制維持正方形的比例，再搭配 `object-fit: contain`，讓圖片完整縮放，不會被裁切或變形。

商品名稱用稍小的字體，上下留一點間距。價格則用 `.price` 設定紅色粗體，讓它更醒目。
-->

---
layout: end
---

# 課程結束
### 設計好資料結構，畫面自然水到渠成

<!--
這一章我們學了從畫面反推資料結構的思考方式。三個步驟是：先思考畫面要能隨資料動態調整，再分析畫面需要哪些內容，最後設計資料格式。口訣是看到多個用陣列，包含很多欄位用物件。

記住一個觀念：HTML 是外表，資料結構才是核心。資料設計得好，畫面自然就容易做。

下一章，我們要認識 Angular 元件的生命週期。我們下一章見。
-->
