---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Angular 介紹
routeAlias: ch03
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
    Angular 介紹
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「一個整合了路由、表單、通訊的全功能前端開發平台」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
【開場白】
大家好！學過了前端基礎，今天我們要正式進入目前企業最愛用的大型框架：Angular。

【為什麼要學這個？】
如果你想開發像 Google Map、Gmail 這種複雜且龐大的應用程式，你就需要一個夠強大的「地基」。Angular 就是為了這種「重量級」任務而生的。

【今天學完你會能做什麼】
學完這堂課，你會知道 Angular 到底厲害在哪裡，為什麼這麼多大公司指定要用它，以及在開始動手寫程式之前，我們電腦裡需要準備哪些工具。
-->

---
layout: default
---

# Outline

- **1. Angular 是什麼** — 平台定義與三大組成
- **2. 為什麼選 Angular** — 三大框架比較、優缺點分析
- **3. 前置學習需求** — HTML/CSS/JS 基礎、Node.js、npm

<!--
【核心說明】
今天的課程分為三個重點：定義、選擇原因以及必備工具。

【程式世界怎麼用】
我們會先幫 Angular 定位，接著跟其他有名的框架（如 React、Vue）做個大比拼。最後，我們會聊聊 Node.js 和 npm，這兩位是開發 Angular 絕對少不了的好夥伴。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 1. Angular 是什麼？
# What is Angular?

<!--
【開場白】
首先，什麼是 Angular？它可不只是一個「框架」這麼簡單。
-->

---

# Angular 是什麼？

Angular 是一個**基於 TypeScript 的開發平台**，不只是框架，而是一套完整的工具生態系。

| 組成要素 | 說明 |
| --- | --- |
| 元件化框架 | 建構可延展的 Web 應用程式 |
| 整合函式庫 | 路由機制、表單管理、Client/Server 通訊等 |
| 開發工具 | 幫助開發、建置、測試、更新程式碼 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>簡單來說：</b> Angular 是一個幫你整合了許多工具的網頁開發平台。
</div>

<!--
【核心說明】
Angular 官方稱自己為一個「開發平台」，因為它什麼都幫你準備好了。

【生活化比喻】
如果寫網頁是煮飯，有些框架只提供你一個「平底鍋」，剩下的菜刀、調味料、餐盤你都要自己去買。但 Angular 像是提供你一間「五星級廚房」，所有配備一應俱全。

【程式世界怎麼用】
它整合了「路由」（網址跳轉）、「表單」（填資料）和「通訊」（跟後端拿資料），這代表你不需要再去學一大堆雜七雜八的第三方工具，Angular 官方通通有。

💼 業界實務：
這對企業來說超棒，因為大家用的工具都一樣，新人進來很快就能接手專案。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 2. 為什麼選 Angular？
# Why Angular?

<!--
【開場白】
市面上這麼多框架，為什麼我們要學這一個號稱「最難」的 Angular？
-->

---

# 三大前端框架比較

目前主流三大前端框架：Vue、React、Angular。

| 框架 | 學習難度 | 靈活性 | 規範程度 |
| --- | --- | --- | --- |
| Vue | ⭐ 最低 | 高 | 寬鬆 |
| React | ⭐⭐ 適中 | 高 | 寬鬆 |
| Angular | ⭐⭐⭐ 最高 | 較低 | 嚴謹 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>為什麼選 Angular：</b> 雖然學習難度最高，但其嚴謹規範能有效降低後續維護成本，適合團隊協作。
</div>

<!--
【核心說明】
這張表是前端開發者的戰場圖。

【生活化比喻】
React 和 Vue 就像是「自由接案者」，你想怎麼穿、怎麼做都隨便你，很自由但有時候會亂糟糟。
Angular 就像是「國軍」或「大企業」，每個人穿制服、拿同樣的裝備、走同樣的步法。

⚠️ 學生常見誤解：
看到「學習難度最高」不要被嚇到。難是因為它在前期就強迫你學會正確、專業的寫法（TypeScript、設計模式）。

💼 業界實務：
銀行、保險、大型 ERP 系統特別愛用 Angular，因為系統要跑十年、二十年，穩定和規範比靈活更重要。
-->

---

# Angular 優點

| 優點 | 說明 |
| --- | --- |
| 適合各規模專案 | 大型 / 小型專案皆可使用 |
| 規範嚴謹 | 統一的寫法，降低後續維護成本 |
| 官方文件齊全 | 文件完整，討論社群活躍 |

<!--
【核心說明】
Angular 的優點就在於它的「一條龍服務」。

【程式世界怎麼用】
因為規範嚴謹，當你在 A 公司的 Angular 專案跳到 B 公司的 Angular 專案時，你會發現程式碼長得差不多，不用重新適應。

💼 業界實務：
Google 內部有幾萬個專案都是用 Angular 寫的，這證明了它處理超大型專案的能力。
-->

---

# Angular 缺點

| 缺點 | 說明 |
| --- | --- |
| 學習難度高 | 相較 Vue、React 學習曲線較陡 |
| 彈性較低 | 嚴格規範，開發方式較不靈活 |
| 升級較為困難 | 版本升級複雜（官方持續優化中） |

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 缺點中「升級較困難」是相對於其他框架而言，Angular 官方也在持續改善升級體驗。
</div>

<!--
【核心說明】
我們也要誠實面對它的缺點。

【生活化比喻】
就像開一台波音 747 飛機，儀表板超多、學很久，而且你不能隨便在空中換引擎。比起開小轎車（Vue），它的限制真的很多。

⚠️ 學生常見誤解：
升級困難通常是因為舊版寫法太髒，或是太依賴外部壞掉的套件。如果乖乖照官方寫法，現在 Angular 升級已經比以前輕鬆很多了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 3. 前置學習需求
# Prerequisites

<!--
【開場白】
想要駕馭這台波音 747，我們需要先拿到哪些駕照呢？
-->

---

# 前置知識需求

學習 Angular 前，需先具備以下基礎：

| 知識領域 | 說明 |
| --- | --- |
| HTML | 網頁結構語言，負責畫面骨架 |
| CSS | 網頁樣式語言，負責畫面外觀 |
| JavaScript | 前端程式語言基礎 |
| 終端機 / 命令提示字元 | 基本指令操作能力 |

<!--
【核心說明】
基礎、基礎、還是基礎！

【生活化比喻】
就像學寫書法（Angular）之前，你得先認識什麼是紙（HTML）、墨（CSS）和毛筆（JavaScript）。

⚠️ 學生常見誤解：
尤其是「終端機」，新手最怕黑漆漆的畫面。但在 Angular 開發中，我們會大量使用指令來自動產生檔案，這是必經之路。
-->

---

# Node.js

| 項目 | 說明 |
| --- | --- |
| 全名 | Node.js |
| 類型 | 開源的 JavaScript 運行環境 |
| 用途 | 允許開發者在**伺服器端**運行 JavaScript（TypeScript 也適用） |
| 為何需要 | Angular CLI 與開發工具建置在 Node.js 環境上 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> Node.js 讓 JavaScript 不只能在瀏覽器執行，也能在本機環境執行開發工具。
</div>

<!--
【核心說明】
這是一個讓 JavaScript 走出瀏覽器、來到你電腦作業系統的工具。

【生活化比喻】
瀏覽器就像是 JavaScript 的「監獄」，JavaScript 以前只能在網頁裡跑。Node.js 就像是給了 JavaScript 一把鑰匙，讓它可以出來在你的 Windows 或 Mac 上直接檔案搬移、啟動網頁伺服器。

【程式世界怎麼用】
我們開發 Angular 時，會用到一個叫 CLI 的「小助手」，這個小助手就是跑在 Node.js 上面的。
-->

---

# npm（Node Package Manager）

| 項目 | 說明 |
| --- | --- |
| 全名 | Node Package Manager |
| 字面意義 | 管理 Node 套件的工具 |
| 用途 | 提供開發者分享、發布、管理 Node.js 模組的平台與工具 |
| 安裝方式 | 隨 Node.js 一起安裝，無需另外安裝 |

```bash
# 確認安裝版本
node -v
npm -v
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>關係：</b> 安裝 Node.js 時會自動附帶 npm，兩者一起安裝。
</div>

<!--
【核心說明】
這是全球最大的程式碼圖書館。

【生活化比喻】
npm 就像是「App Store」或「手機的商店」。如果你需要一個畫圓餅圖的功能、一個漂亮的按鈕庫，你不用自己寫，去 npm 搜尋，打一行指令就能「下載並安裝」到你的專案裡。

⚠️ 學生常見誤解：
不需要去官方網站另外找 npm 安裝，只要你裝好 Node.js，它就已經乖乖待在你的電腦裡了。
-->

---
layout: end
---

# 課程結束
### 接下來：安裝 Angular 開發環境，開始實作！

<!--
【結語】
好啦，大家現在對 Angular 應該有個初步的認識了。它很強大，但也很有挑戰性。

【互動引導】
在我們安裝環境之前，有沒有人想猜猜看，為什麼 Google 要把它做成這麼嚴謹、這麼多規範的樣子？這跟大公司的團隊合作有什麼關係？

準備好了嗎？下一堂課，我們就要動手安裝 Node.js 和 Angular 囉！
-->
