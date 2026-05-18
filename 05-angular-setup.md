---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 安裝 / 新建 Angular 專案
routeAlias: ch05
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
  <h1 style="color: #1a5c5c; font-size: 3.2rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    安裝 / 新建 Angular 專案
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「從零開始，建立你的第一個 Angular 專案」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
【開場白】
大家好！聽完這麼多理論，手是不是很癢？今天我們要正式在你的電腦裡蓋起 Angular 的地基。

【為什麼要學這個？】
工欲善其事，必先利其器。這堂課的每個步驟都很關鍵，只要這裡裝好了，後面寫程式就會順風順水。

【今天學完你會能做什麼】
今天結束後，你的電腦會具備專業開發者的全套配備，並且你會親手跑起你的第一個 Angular 網頁。
-->

---
layout: default
---

# Outline

- **1. 安裝前置工具** — NVM、Node.js、Angular CLI
- **2. 建立與執行專案** — ng new、ng serve
- **3. 認識專案結構** — 根目錄、src 資料夾、元件組成

<!--
【核心說明】
今天的行程很充實：我們先裝工具，再建專案，最後拆解專案裡面到底藏了什麼寶物。

【程式世界怎麼用】
我們會按照專業開發者的標準流程，使用 NVM 來管理環境，這能確保你以後接手不同公司的案子時，電腦環境不會打架。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 1. 安裝前置工具
# Install Prerequisites

<!--
【開場白】
首先，我們先來安裝第一層工具：NVM。
-->

---

# 什麼是 NVM？

開發時有時候會遇到**不同版本的 Node.js 專案**，不同版本有時候會有不同運作方式。

| 工具 | 說明 |
| --- | --- |
| NVM | Node Version Manager，讓同一台電腦安裝多個 Node.js 版本 |
| 用途 | 依專案需求自由切換 Node.js 版本 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>安裝順序：</b> NVM → Node.js → Angular CLI，需依序安裝。
</div>

<!--
【核心說明】
NVM 就像是 Node.js 的「版本切換器」。

【生活化比喻】
想像你有一個遙控器，按個鈕，你的電腦就會變成「2024 年最新版」的環境；再按個鈕，又會切換回「三年前舊版」的環境。這就是 NVM 在做的事。

【程式世界怎麼用】
為什麼要這麼麻煩？因為有些舊案子只能在舊版 Node.js 上跑，如果你的電腦只有裝最新版，舊案子就跑不動了。

⚠️ 學生常見誤解：
很多人會跳過 NVM 直接裝 Node.js。雖然現在可以跑，但相信我，半年後你一定會後悔，到時候要砍掉重裝更麻煩。
-->

---

# 安裝 NVM（Windows）

前往以下網址，下載最新版本的 `nvm-setup` 並安裝：

```bash
# 網址
https://github.com/coreybutler/nvm-windows/releases
```

安裝完成後，開啟命令提示字元並輸入 `nvm`，若看到說明畫面即安裝成功。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>下載選項：</b> 選擇 <code>nvm-setup</code>（安裝版），不要選 <code>nvm-noinstall</code>。
</div>

<!--
【帶讀程式碼前的鋪陳】
Windows 同學請看這裡，我們要去 GitHub 下載。

【逐步解說】
點進去網址後，找 `nvm-setup.exe`。下載、開啟、然後一路按「下一步」到底就好。
裝完後，記得打開那個黑視窗（cmd），輸入 `nvm`。如果有跑出一大串英文說明，恭喜你，第一關過了！

⚠️ 學生常見誤解：
如果在 cmd 輸入 `nvm` 顯示「找不到指令」，通常是因為你裝完 NVM 之後還沒「重開」cmd。關掉重開通常就能解決 90% 的問題。
-->

---

# 安裝 NVM（macOS）

macOS 安裝較為複雜，需至 NVM 官方 GitHub 依說明步驟安裝：

```bash
# 官方 GitHub
https://github.com/nvm-sh/nvm
```

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> macOS 需依照 GitHub 上的說明一步一步執行，安裝後可能需要重新開啟終端機。
</div>

<!--
【帶讀程式碼前的鋪陳】
Mac 同學這邊稍微硬一點，我們不下載 exe，我們要用指令安裝。

【逐步解說】
去 GitHub 複製那行長長的 `curl` 指令，貼到你的終端機。
裝完之後，Mac 最容易卡住的地方是「設定環境變數」。如果你發現裝完不能用，通常是要去改一個叫 `.zshrc` 的檔案。

💼 業界實務：
如果你覺得 NVM 真的很難裝，業界還有另一個工具叫 `Homebrew`，也可以用來裝 Node.js，但 NVM 還是最推薦的標準作法。
-->

---

# 安裝 Node.js

NVM 安裝完成後，用它來安裝 Node.js。建議先至官方確認目前的 LTS（長期支援）穩定版本。

```bash
# 安裝指定版本（例如安裝 22.x 最新版）
nvm install 22

# 確認安裝成功
node -v
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>技巧：</b> 只輸入主版本號（如 <code>22</code>），NVM 會自動安裝該版本最新的小版號。若 <code>node -v</code> 無反應，關閉命令提示字元重開再試。
</div>

<!--
【核心說明】
有了 NVM，現在我們要請它幫我們把 Node.js 搬進電腦。

【逐步解說】
打這行 `nvm install 22`。電腦會開始跑進度條。
裝完後，輸入 `node -v`。如果看到 `v22.x.x` 之類的數字，代表 JavaScript 已經可以在你的電腦裡跑了。

💼 業界實務：
業界通常會選擇 **LTS (Long Term Support)** 版本，因為它最穩定，不會今天跑得好好的、明天就改版壞掉。
-->

---

# 安裝 @angular/cli

Node.js 安裝完成後，用 npm 全域安裝 Angular CLI：

```bash
# 安裝 Angular CLI
npm install -g @angular/cli@19.0.5

# 確認安裝成功
ng v
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>確認成功：</b> 輸入 <code>ng v</code> 後若看到版本清單，即代表安裝成功，之後即可使用 <code>ng</code> 指令。
</div>

<!--
【核心說明】
最後，我們要安裝 Angular 的「專屬小助手」，也就是 CLI。

【逐步解說】
這行指令裡的 `-g` 非常重要，它代表 Global（全域）。意思是不管你在電腦的哪個角落，都可以召喚 Angular 助手。
我們這次課程指定用 `19.0.5` 版本，這能確保我們大家的環境都一模一樣，不會因為版本不同而產生奇怪的錯誤。

【練習引導】
安裝完請一定要打 `ng v`。如果你看到一個用文字排出來的「Angular」大 Logo，那就代表你準備好起飛了！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 2. 建立與執行專案
# Create & Run Project

---

# 建立 Angular 專案

開啟命令提示字元，切換至想放置專案的目錄，再執行 `ng new`：

```bash
# 建立新專案
ng new 專案名稱
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>Windows 快捷：</b> 在資料夾路徑列直接輸入 <code>cmd</code>，可直接在該目錄開啟命令提示字元。
</div>

<!--
【核心說明】
`ng new` 是 Angular 最神奇的指令，它會幫你一鍵產生好幾百個檔案。

【生活化比喻】
這就像是買了「懶人包」，你只要說你要蓋一間叫 `my-app` 的房子，Angular 就會幫你把地基、梁柱、水電、隔間全部一次搞定。

⚠️ 學生常見誤解：
專案名稱「不要用中文」，也不要用空格，最好都是小寫加連字號（例如 `my-first-app`）。
-->

---

# 建立專案 — 安裝選項

執行 `ng new` 後會出現兩個問題：

| 問題 | 選擇 | 說明 |
| --- | --- | --- |
| 第一個選項（樣式格式） | **Sass (SCSS)** | 選擇 SCSS 作為樣式格式 |
| 第二個選項（Server-Side Rendering） | **N** | 輸入 N，不啟用 SSR |

選完後等待安裝完成，看到成功畫面即代表專案建立完畢。

<!--
【核心說明】
這是在設定房子的細節。

【逐步解說】
第一個問題問你要用什麼寫樣式？我們選 **SCSS**。這比一般的 CSS 強大很多，是業界的主流。
第二個問題問要不要 SSR？我們目前是初學，選 **N**（不要）。SSR 會讓專案結構變得太複雜，我們以後再挑戰。

💼 業界實務：
SCSS 的選擇非常重要。雖然一般的 CSS 也能跑，但幾乎所有現代前端職缺都要求會寫 SCSS。
-->

---

# 執行 Angular 專案

進入剛建立的專案目錄，執行 `ng serve` 啟動開發伺服器：

```bash
# 進入專案目錄
cd 專案名稱

# 啟動專案
ng serve

# 啟動並自動開啟瀏覽器（簡寫）
ng s --open
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>預設網址：</b> 開啟瀏覽器後前往 <code>http://localhost:4200</code>，看到 Angular 預設頁面即代表成功。
</div>

<!--
【帶讀程式碼前的鋪陳】
房子蓋好了，我們要插上電，讓它跑起來。

【逐步解說】
記得要先 `cd` 進去你的專案資料夾喔！這是新手最常忘記的步驟。
接著打 `ng serve`。這時候 Angular 會幫你把程式碼打包，然後在你的電腦開一個「臨時的小型網頁伺服器」。
當你看到「Compiled successfully」，就可以去瀏覽器打 `localhost:4200` 看看成果了！

【類比說明】
這就像是試營運。只有你的電腦看得到這個網站，全世界其他人都還看不到。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 3. 認識專案結構
# Project Structure

---

# 專案根目錄 — 重要檔案

用 VS Code 開啟專案資料夾後，初期只需了解以下三個：

| 檔案 / 資料夾 | 說明 |
| --- | --- |
| `node_modules/` | 存放所有套件（底層與新增套件都在這） |
| `package.json` | 記錄專案使用的套件與版本，可在此指定版本 |
| `src/` | 存放網站內容（HTML、SCSS、TS 等原始碼） |

---

# src 資料夾 — 核心檔案

| 檔案 | 說明 |
| --- | --- |
| `styles.scss` | 全站 Global CSS 設定 |
| `main.ts` | 整個網站的啟動入口點 |
| `app.component.html` | 使用者看到的畫面模板（HTML） |
| `app.component.scss` | 對應 HTML 的樣式（SCSS） |
| `app.component.spec.ts` | 測試案例撰寫檔案 |
| `app.component.ts` | 元件的邏輯程式碼（Class） |
| `app.config.ts` | 應用程式配置文件 |
| `app.routes.ts` | 路由配置文件 |

---

# Angular 元件組成

一個 Angular 元件（Component）最少包含以下三個檔案，**缺一不可**：

| 檔案 | 職責 |
| --- | --- |
| `.html` | 畫面 UI 模板（使用者看到的畫面） |
| `.scss` | UI 的樣式（CSS） |
| `.ts` | 程式碼邏輯（Class） |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> 三個檔案相輔相成，HTML 負責結構、SCSS 負責外觀、TS 負責邏輯，共同組成一個完整元件。
</div>

<!--
【核心說明】
這就是我們說教的「黃金三角」。

【生活化比喻】
把一個元件想成一個「樂高方塊」。
HTML 是這塊樂高的形狀，SCSS 是它的顏色，而 TS 則是讓這塊樂高按下去會發光、會發聲的電子零件。

【程式世界怎麼用】
在 Angular 裡，我們不再是一次寫一個超長網頁，而是把網頁拆成一個個小方塊（元件），例如「導覽列元件」、「商品列表元件」，最後再把它們拼在一起。

【練習引導】
大家可以試著打開 `app.component.html`，隨便改幾個字，然後看看瀏覽器會不會自動更新。這就是開發 Angular 的樂趣！
-->

---
layout: end
---

# 課程結束
### 環境建置完成，準備開始開發你的 Angular 應用程式！
