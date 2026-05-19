---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 資料轉換與呈現
routeAlias: ch17
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

---
layout: default
---

# Outline

- **為什麼要學資料轉換** — 前端資料設計的重要性
- **步驟一：思考畫面設計** — 讓 HTML 能隨資料動態成長
- **步驟二：思考畫面需要什麼內容** — UI/UX 需求分析
- **步驟三：設計資料格式** — Array、JSON 的應用
- **實作練習**

---

# 為什麼要學習資料轉換

前端在設計畫面或接收 API 資料時，需要設計並撈取資料的格式。

以「動態問卷」為例，前端開發前需思考三個步驟：

- **1. 思考你的畫面設計**
- **2. 思考你的畫面需要什麼內容**
- **3. 設計你的資料的格式**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 三個設計步驟
# Three Design Steps

---

# 步驟一：思考你的畫面設計

為什麼要思考畫面設計？因為當你設計前端畫面時，要想一下這個畫面怎麼設計才會符合你的資料，接收到資料的時候呈現會不會有問題。

例如：問卷的問題跟選項數量不固定，如果 HTML 的內容是固定的：

- 資料量變多 → 程式報錯或少呈現資料
- 所以 HTML 必須根據資料量去做動態增長

---

# 步驟二：思考你的畫面需要什麼內容

這點就是 UI/UX 設計思維：這個畫面要呈現的東西是什麼？有幾個輸入框要讓使用者輸入？這些輸入框的資料是後端來的還是要讓使用者填寫的？

這些東西思考完，才有辦法去做後端資料的設計。當然也可以在開發階段一邊開發一邊做新增。

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

---
layout: default
---

# 練習：資料格式設計
### 任務說明

當你看到以下畫面，要怎麼去做**資料的設計**？請試著用 TypeScript 設計出可以對應此畫面的資料結構。

<div class="mt-4 flex justify-center">
  <img src="/images/17-pipes/practice-ecommerce.png" class="rounded shadow-md object-contain" style="width: 90%; max-height: 55vh;" />
</div>

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

---
layout: default
---

# 練習 2：實作畫面
### 任務說明

把你剛剛建立的資料，試著用那些資料**做出類似的畫面**。

<div class="mt-4 flex justify-center">
  <img src="/images/17-pipes/practice-ecommerce.png" class="rounded shadow-md object-contain" style="width: 90%; max-height: 55vh;" />
</div>

---
layout: end
---

# 課程結束
### 設計好資料結構，畫面自然水到渠成
