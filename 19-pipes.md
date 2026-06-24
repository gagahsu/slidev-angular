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

# 步驟一：思考你的畫面設計

為什麼要思考畫面設計？因為當你設計前端畫面時，要想一下這個畫面怎麼設計才會符合你的資料，接收到資料的時候呈現會不會有問題。

例如：問卷的問題跟選項數量不固定，如果 HTML 的內容是固定的：

- 資料量變多 → 程式報錯或少呈現資料
- 所以 HTML 必須根據資料量去做動態增長

<!--
第一步：思考畫面設計。
當你拿到設計師的設計圖，或是自己構思好畫面時，大腦要先開啟「動態模擬器」。
你要想：「如果這個問卷，今天只有一題，畫面長怎樣？如果突然變多到一百題，畫面會不會擠壓變形？選項要是字數很長，網頁會不會破圖？」
這就決定了你的 HTML 結構必須是「動態的」，要能夠根據資料的數量自動增長或隱藏，而不是一個個寫死。
-->

---

# 步驟二：思考你的畫面需要什麼內容

這點就是 UI/UX 設計思維：這個畫面要呈現的東西是什麼？有幾個輸入框要讓使用者輸入？這些輸入框的資料是後端來的還是要讓使用者填寫的？

這些東西思考完，才有辦法去做後端資料的設計。當然也可以在開發階段一邊開發一邊做新增。

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

# 步驟三：設計你的資料的格式

這點需要想法轉換，是可以訓練的。當你多做過幾次設計就會習慣這種思考模式。

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

# 練習：解題提示
### 拆解畫面結構

<img src="/images/17-pipes/practice-ecommerce.png" class="rounded shadow-md" style="float: right; width: 38%; margin: 0 0 0.5rem 1.5rem;" />

先把這張圖的內容切開來：

- **左邊**：廣告區（一張圖 + 標題）→ Object
- **右上**：menu 分類（多個選項）→ Array
- **下方**：商品列表（多筆商品，每筆含名稱與價格）→ Array of Object

```typescript
const ad = { imageUrl: '...', title: '辦公周邊' };
const categoryMenu = ['辦公配件', '印表機', '鍵盤滑鼠', '喇叭耳麥'];
const products = [
  { name: 'iFLYTEK AINOTE Air2', price: 16840 },
  { name: 'BELKIN USB-C 7合1',   price: 1130  },
];
```

<!--
大家都設計好了嗎？我們一起來拆解一下：
左邊的廣告區只有一個，但裡面包含圖片網址和標題，所以我們用一個 Object：`ad = { imageUrl: '...', title: '辦公周邊' }`。
右上角的選單，是「多個純文字分類」，所以我們用簡單的字串陣列：`categoryMenu = ['辦公配件', '印表機', ...]`。
下方的商品列表，是「多個商品卡片，而且每個卡片都有名稱和價格」，所以我們用物件陣列：`products = [ { name: '...', price: 16840 }, ... ]`。
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
