---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Angular 降版
routeAlias: ch06
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
    Angular 降版
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「切換到 Angular 19，讓專案與套件版本相互對應」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
【開場白】
大家好！今天我們要聊一個聽起來有點「退步」，但其實非常實用的技術：降版。

【為什麼要學這個？】
寫程式不是永遠追求最新就是最好。有時候最新版的 Angular 太新了，很多好用的套件還跟不上，這時候為了專案穩定，我們得學會怎麼精準地回到特定的舊版本。

【今天學完你會能做什麼】
學完這堂課，你就不會被「版本不相容」的紅色錯誤訊息嚇到。你會學會如何把電腦裡的 Angular 環境調整成你需要的樣子。
-->

---
layout: default
---

# Outline

- **1. 為什麼需要降版** — 常見情境與需求
- **2. 版本管理概念** — CLI、Core、RxJS、TypeScript 的對應關係
- **3. 降版流程** — 三步驟：確認版本、移除 CLI、重新安裝
- **4. 降版注意事項** — 套件相容性問題與處理方式

<!--
【核心說明】
這堂課我們分三個部分。首先是探討「為什麼要降」，接著釐清 Angular 複雜的版本對應關係。最後，我們會手把手帶大家走一遍降版的標準流程。

【程式世界怎麼用】
這就像是學會「時光旅行」。當你發現未來（最新版）太危險，我們要能安全地回到過去（穩定版）。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 1. 為什麼需要降版？
# Why Downgrade?

<!--
【開場白】
為什麼大家都在衝最新版，我們卻要往回走？
-->

---

# 為什麼需要降版？

| 情境 | 說明 |
| --- | --- |
| 套件不相容 | 專案使用了與新版 Angular 不相容的套件 |
| 團隊架構考量 | 既有架構與 Angular 19 相容性較高 |
| CI/CD 環境限制 | 建置環境尚未支援新版 Angular |
| 避免升級成本 | 想避免不必要的重大版本升級風險 |
| 新版功能變更 | 特定功能在新版遭移除/變更，希望保留 Angular 19 行為 |

<!--
【核心說明】
降版通常不是為了好玩，而是為了「活下去」。

【生活化比喻】
就像你的手機突然更新了作業系統，結果你最愛玩的遊戲卻狂斷線，這時候你就會想：要是能變回舊版就好了。

【程式世界怎麼用】
最常見的原因是「套件相容性」。有些公司開發的圖表庫或地圖工具，可能一年才更新一次，如果 Angular 跑太快，兩邊就會吵架（報錯）。

💼 業界實務：
在業界，穩定性（Stability）永遠大於新奇感。如果 Angular 19 已經能滿足客戶需求且非常穩定，我們通常不會為了追求流行而冒險升級。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 2. Angular 版本管理概念
# Version Management

<!--
【開場白】
在動手之前，我們先來搞清楚 Angular 是怎麼管理版本的。
-->

---

# Angular 版本管理概念

| 概念 | 說明 |
| --- | --- |
| 套件相互對應 | Angular CLI、Angular Core、RxJS、TypeScript 版本需彼此對應 |
| 全域 CLI 影響指令 | 全域安裝的 `@angular/cli` 決定 `ng` 指令的行為 |
| 專案版本以 package.json 為準 | 實際執行版本由專案的 `package.json` 決定 |
| 降版 = 三步調整 | 調整 CLI + 調整專案套件版本 + 重新安裝依賴 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>關鍵：</b> 全域 CLI 與專案版本是獨立的，兩者都需要調整才能正確降版。
</div>

<!--
【核心說明】
Angular 的版本不是只有一個數字，它是一整組「套裝」。

【生活化比喻】
就像一組樂高，你要搭配正確大小的零件。Angular 21 可能要配 TypeScript 5.5，而 Angular 19 可能要配 TypeScript 5.2。如果你混著用，樂高就拼不起來。

⚠️ 學生常見誤解：
很多同學以為只要在黑視窗打指令降級就好。其實「全域的 ng 指令」跟「專案裡的 Angular」是兩回事。如果你只改了一個，專案跑起來還是會報錯。

【程式世界怎麼用】
我們要學會看 `package.json`，這就是專案的「身份證」，上面寫的版本才是真的。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 3. 降版流程
# Downgrade Steps

<!--
【開場白】
準備好了嗎？我們要開始進行時光旅行了。
-->

---

# 步驟 1：確認目前版本

降版前先確認目前安裝的 Angular 版本：

```bash
ng version
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>用途：</b> 確認全域 CLI 版本、Angular Core 版本、Node.js 版本等，作為降版前的基準記錄。
</div>

<!--
【帶讀程式碼前的鋪陳】
出發前，先看看你現在在哪裡。

【逐步解說】
輸入 `ng version`（或 `ng v`）。這個畫面會顯示非常詳細的資訊，包含你的 Node 版本、OS 版本，以及最關鍵的 Angular CLI 版本。
請把這個畫面拍下來或記下來，萬一等一下降版失敗，我們才知道怎麼回到這裡。
-->

---

# 步驟 2：移除全域 Angular CLI

移除目前安裝的全域 Angular CLI：

```bash
npm uninstall -g @angular/cli
```

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 移除後 <code>ng</code> 指令暫時無法使用，需完成步驟 3 後才會恢復。
</div>

<!--
【核心說明】
這是要把舊的（或太新的）工具清乾淨。

【逐步解說】
這一行指令會把你電腦裡全域的 Angular 助手請走。
記得那個 `-g`，一定要加，因為我們要刪的是全域的那一個。
刪完之後，如果你打 `ng`，電腦應該會回你「找不到指令」，這是正常的，別擔心。

⚠️ 學生常見誤解：
有些同學會擔心「專案會不會壞掉」？不會的，這只是刪除你電腦裡的「通用工具」，不會動到你寫好的程式碼檔案。
-->

---

# 步驟 3：安裝 Angular 19 並建立專案

使用 `npx` 直接以指定版本建立新專案，無需重新全域安裝：

```bash
npx @angular/cli@19 new my-app-19
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> <code>npx</code> 會臨時下載並執行指定版本的 Angular CLI，專案建立後即可在 <code>package.json</code> 中確認版本是否正確。
</div>

<!--
【核心說明】
這一招超強，叫做「臨時徵調」。

【逐步解說】
以前我們要先裝工具、再建專案。現在我們用 `npx`。這行指令的意思是：「電腦啊，請你幫我臨時去下載 Angular 19 的工具，幫我蓋好這間房子，蓋完之後就把工具丟掉，不用佔我空間」。
這樣你的電腦就不會被各種版本的 CLI 塞滿，非常乾淨！

💼 業界實務：
`npx` 是現代前端工程師的愛用工具，它可以讓你不用安裝一大堆東西在電腦裡，也能執行各種最新（或指定版本）的任務。
-->

---

# package.json 版本確認 — dependencies

安裝完成後，確認 `package.json` 中的 `dependencies` 版本：

```json
"dependencies": {
  "@angular/cdk": "^19.2.19",
  "@angular/common": "^19.2.0",
  "@angular/compiler": "^19.2.0",
  "@angular/core": "^19.2.0",
  "@angular/forms": "^19.2.0",
  "@angular/material": "^19.2.19",
  "@angular/platform-browser": "^19.2.0",
  "@angular/router": "^19.2.0"
```

<!--
【帶讀程式碼前的鋪陳】
房子蓋好了，我們進去檢查一下建材對不對。

【逐步解說】
打開 `package.json`，看 `dependencies` 這區。
你會看到 `@angular/core` 開頭是 `19`。這代表我們成功回到 19 版的世界了！
如果這裡顯示的是 20 或 21，那代表你剛才的 `npx` 指令可能打錯了。
-->

---

# package.json 版本確認 — dependencies（續）& devDependencies

```json
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.15.0"
```

```json
"devDependencies": {
  "@angular-devkit/build-angular": "^19.2.19",
  "@angular/cli": "^19.2.19",
  "@angular/compiler-cli": "^19.2.0",
  "typescript": "~5.7.2"
}
```

<!--
【核心說明】
別忘了檢查配角們的版本。

【逐步解說】
除了 Angular 本身，RxJS 和 TypeScript 的版本也很關鍵。
如果 Angular 是 19 版，TypeScript 通常會在 5.x 左右。這些對應關係 Angular CLI 通常會幫你處理好，但我們要學會在這裡確認它們有沒有乖乖聽話。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 4. 降版注意事項
# Known Issues

<!--
【開場白】
時光旅行雖然帥，但偶爾會有副作用，我們要怎麼預防呢？
-->

---

# 降版注意事項

| 問題類型 | 說明 |
| --- | --- |
| 套件相容性（最常見） | 第三方套件與降版後的 Angular 不相容 |
| TypeScript / RxJS 版本 | 套件編譯時依賴特定 TS / RxJS 版本 |
| Build pipeline 版本 | `builder` / `angular.json` 設定與版本不符 |
| Material / UI libs | 部分 UI 套件不支援舊版 Angular |
| 新功能反向不支援 | 使用到新版語法，降版後需調整 code |

<!--
【核心說明】
降版後最容易遇到的就是「 peer dependencies」報錯，白話文就是「朋友不合」。

【生活化比喻】
就像你把手機降級回 iPhone 4，結果你想裝最新版的 LINE，它會告訴你「此版本不支援」。這時候你就得去找「舊版的 LINE」來裝。

⚠️ 學生常見誤解：
以為降完 Angular 就沒事了。其實你可能還要順便把 `npm install` 的其他套件也跟著降級，專案才跑得起來。
-->

---

# 套件相容性問題

| 項目 | 說明 |
| --- | --- |
| 情境 | 降版後，第三方套件（charts、auth、firebase、UI libs 等）直接報錯或 build 失敗 |
| 原因 | 套件是為新版 Angular / TypeScript 編譯的，使用到 Angular 19 不支援的語法或 API |

常見錯誤訊息：

```bash
This version of XXX requires Angular >=20
NG0901: Unable to instantiate class...
```

<!--
【核心說明】
這就是我們常看到的「紅色恐佈」。

【逐步解說】
看到 `Requires Angular >= 20` 這種訊息，就是在明示你：你現在用的是 19 版，但我這個套件太新了，我看不懂 19 版的東西。

【類比說明】
這就像是拿著 PS5 的光碟，硬要塞進 PS4 裡面玩。雖然長得很像，但讀取不出來就是讀取不出來。
-->

---

# 套件相容性問題 — 處理方式

| 處理方式 | 說明 |
| --- | --- |
| 降版該套件 | 將第三方套件降版到與 Angular 19 相容的版本 |
| 查詢 release notes | 找到官方說明的「Angular 19 支援區間」 |
| 替換 library | 若無相容版本，需改用其他替代套件 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>建議流程：</b> 先查套件官方文件確認支援版本 → 嘗試降版 → 若無解，評估替換方案。
</div>

<!--
【核心說明】
遇到問題，我們有三招：降級、查表、換人。

【逐步解說】
第一招：把套件也降級。
第二招：去 GitHub 看這個套件的歷史紀錄，看看哪一個版本說它「支援 Angular 19」。
第三招：如果這個套件死活都不支援舊版，那我們就揮淚斬馬謖，找一個功能差不多但支援舊版的套件。

💼 業界實務：
在選用第三方套件時，資深工程師一定會看它的「下載量」和「維護頻率」。維護頻率高的套件，通常對不同版本的 Angular 支援度也比較好。
-->

---
layout: end
---

# 課程結束
### 掌握降版技巧，讓專案在正確的版本環境中穩定運行！

<!--
【結語】
好啦，關於降版的課程就到這裡。雖然這是一個比較進階的操作，但學會了它，你才真正擁有了掌控開發環境的能力。

【互動引導】
有沒有同學覺得奇怪，為什麼我們不直接學最新版，而要回頭學 19 版？（可以引導學生思考企業穩定性與套件生態圈的關係）

下一堂課，我們要回歸基礎，來看看網頁的靈魂：HTML 囉！
-->
