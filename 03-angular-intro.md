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
哈囉大家！學完了前端骨架跟衣服，今天我們要正式進入大魔王的世界了——那就是 Google 撐腰、企業最愛的大型前端框架：Angular！
如果你想開發像 Google Maps、Gmail、甚至是國防部/大型銀行的系統，你就需要一個超穩固的「摩天大樓地基」。
Angular 就是為這種「重量級任務」而生的！
今天我們就來聊聊，這傢伙到底厲害在哪裡？為什麼大公司都搶著指名要它？
以及在我們開始煮這道大菜之前，你的電腦廚房裡需要配備哪些「基礎廚具」。
-->

---
layout: default
---

# Outline

- **1. Angular 是什麼** — 平台定義與三大組成
- **2. 為什麼選 Angular** — 三大框架比較、優缺點分析
- **3. 前置學習需求** — HTML/CSS/JS 基礎、Node.js、npm

<!--
今天我們的選單有三大主菜：
第一，幫 Angular「驗明正身」，搞懂它到底是個啥。
第二，拿它跟隔壁棚的網紅 React 和 Vue 來場生死大比拼，分析優缺點。
第三，介紹兩位開發 Angular 絕對少不了的「終身伴侶」：Node.js 與 npm。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 1. Angular 是什麼？
# What is Angular?

<!--
首先，第一道主菜：Angular 到底是個什麼東東？
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
Angular 官方很驕傲地稱自己是個「開發平台」而不只是個框架。
這怎麼說呢？
如果寫網頁是煮飯，有些框架（像 React）只提供你一個「平底鍋」。你要切菜？自己去買菜刀；要盛盤？自己去買盤子。雖然靈活，但容易買錯不相容的牌子。
而 Angular 則是直接送你一間**「五星級奢華中央廚房」**！
大至抽油煙機、雙門冰箱，小至鹽巴、胡椒粉、菜刀、砧板（比如路由跳轉、表單驗證、通訊協定），它全部幫你內建準備好了！
你進去只需要專心做菜就好。這在業界超受歡迎，因為不論哪個廚師進去，用到的都是同一把官方名刀，完全不用怕吵架！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 2. 為什麼選 Angular？
# Why Angular?

<!--
既然有這麼多選擇，為什麼我們要選這個號稱「陡峭學習曲線、新手終結者」的 Angular 呢？
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
來，這張表就是前端界著名的「三國演義」。
Vue 學習難度最低，像是在開小轎車；React 適中，像在騎重機；而 Angular 難度最高，像是在開波音 747 客機！
難度高是因為，Angular 就像是**「超級大財團/國軍部隊」**，規範無比嚴密。
所有人進來必須穿一樣的制服、帶一樣的裝備、踏著一樣的步操。
雖然沒有別人的花拳繡腿，但非常適合大型團隊合作。
你想想，系統如果要維護十年，寫程式的人換了三代，如果大家寫法都隨性（像 React），那最後程式碼肯定會變成「義大利麵大亂鬥」。
所以大型銀行和保險公司特別指名要用 Angular，就是圖它夠嚴謹、夠穩定！
-->

---

# Angular 優點

| 優點 | 說明 |
| --- | --- |
| 適合各規模專案 | 大型 / 小型專案皆可使用 |
| 規範嚴謹 | 統一的寫法，降低後續維護成本 |
| 官方文件齊全 | 文件完整，討論社群活躍 |

<!--
Angular 的最大優點就是「一條龍的統一標準」。
因為官方管得很寬，這意味著不管你從 A 公司的 Angular 專案跳到 B 公司的專案，程式碼的長相跟結構都大同小異。
你完全不用花三個星期去猜前輩的「個人風格」。
這就是為什麼 Google 內部幾萬個專案都強制使用 Angular 的原因——好維護、好交接，你的肝就不會那麼累。
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
不過，我們也要誠實面對它的缺點。
因為它像波音 747，限制特別多。
比如你不能在飛機飛到一半的時候，把引擎拆下來換成別的牌子（這叫靈活性低）。
而且以前 Angular 每次大版本升級都像是在「動大手術」，工程師會升級到流眼淚。
幸好，現在官方已經優化很多，只要你乖乖遵守官方寫法，不用邪門歪道，升級已經不再是噩夢了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 3. 前置學習需求
# Prerequisites

<!--
那在起飛之前，我們需要拿到什麼飛行執照呢？
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
很簡單：紙、筆、墨。
HTML 就是紙，CSS 就是墨，JavaScript / TypeScript 就是你的毛筆。
如果你紙都鋪不平，毛筆字怎麼可能寫得好看？
另外，你還得學會用「終端機指令」跟電腦對話。
因為我們晚點要召喚 Angular 機器人來幫我們寫檔案，它是個解說，看不見滑鼠，只聽得懂鍵盤指令！
別怕，我們下一章就會帶大家克服這個黑畫面的恐懼。
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
再來介紹一位重磅嘉賓：**Node.js**。
以前，JavaScript 就像是被**「關在瀏覽器監獄裡的犯人」**，除了在網頁上搞搞小特效，什麼事都幹不了。
而 Node.js 就像是**「給了 JavaScript 一張假釋令與通行證」**！
讓它可以走出網頁，在你的電腦硬碟裡自由穿梭，直接讀寫檔案、開啟本機伺服器。
我們開發 Angular 時，背後負責打包檔案、把程式碼翻譯給瀏覽器聽的機器人助手（Angular CLI），就是跑在 Node.js 這個引擎之上的。
所以它必裝！
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
既然有了引擎，我們還需要一個「軟體商店」，它叫 **npm**。
npm 就像是工程師專屬的**「App Store」**。
如果你想要在網頁上加一個「酷炫的圓餅圖」、「即時聊天的對話框」或「美美的月曆」，你完全不需要自己從零捏出來。
只要去 npm 商店搜尋，複製它給你的指令，在黑視窗裡敲一下，它就自動下載並裝進你的專案裡了。
超方便吧！而且它會隨著 Node.js 一起附贈，不用另外裝喔。
-->

---
layout: end
---

# 課程結束
### 接下來：安裝 Angular 開發環境，開始實作！

<!--
好啦！這就是 Angular 的新手初體驗。
雖然聽起來它規矩很多、看起來很難纏，但只要你摸熟了它的脾氣，你會發現它在開發大型專案時簡真是神隊友。
十秒鐘，看看大家有沒有問題？
沒問題的話，下一堂課我們就來打開那個黑黑的視窗，開始安裝環境囉！
-->
