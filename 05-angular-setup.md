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
哈囉大家！聽了這麼多理論，手是不是很癢、鍵盤是不是在震動？
今天我們終於要擼起袖子，正式在你的電腦裡蓋起 Angular 的萬丈高樓地基啦！
俗話說：「工欲善其事，必先利其器。」這堂課的每一個安裝步驟都非常關鍵。
只要今天把環境安裝得順順利利，以後你寫扣就會像開跑車一樣順暢；如果今天安裝沒裝好，以後你每天都會在跟電腦環境搏鬥中度過。
今天結束後，你的電腦就會具備專業開發者的全套配備，並且你還能親手跑起你人生中的第一個 Angular 網頁，超令人期待的吧！
-->

---
layout: default
---

# Outline

- **1. 安裝前置工具** — NVM、Node.js、Angular CLI
- **2. 建立與執行專案** — ng new、ng serve
- **3. 認識專案結構** — 根目錄、src 資料夾、元件組成

<!--
今天的行程非常紮實：
首先，我們會先在電腦安裝三個前置小助手。
接著，我們會用指令親手召喚出一個全新的 Angular 專案。
最後，我們會像拆解樂高一樣，看看這個專案目錄裡到底藏了些什麼寶貝。
我們會採用業界標準流程，使用 NVM 這個版本管理大師，這能保證你以後手頭上有不同年代的案子時，電腦環境不會互相打架！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 1. 安裝前置工具
# Install Prerequisites

<!--
好，事不宜遲，我們先來安裝第一層防禦工具——NVM！
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
什麼是 NVM 呢？它全名是 Node Version Manager，也就是 Node.js 的「版本切換遙控器」。
你想想，如果你有一台時光機，按一下按鈕，你的電腦環境就會切換到 2024 年最新版，再按一下，又會變回三年前的舊版環境。
為什麼要這麼麻煩？
因為在業界，你可能會同時接手多個專案。有些專案是三年前寫的，只能跑在舊版的 Node 引擎上；有些是昨天寫的，需要最新版。
如果你不用 NVM，你每次切換專案都要把 Node 解除安裝、重新下載、重新安裝，你的肝絕對受不了。
初學者常為了圖方便跳過這步直接裝 Node， believe me，半年後你接新工作時一定會後悔到抱頭痛哭！
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
Windows 的同學們，請看這裡。我們要去這個 GitHub 連結下載安裝包。
點進去 releases 頁面後，找 `nvm-setup.zip` 或 `nvm-setup.exe` 下載。
下載完後就跟裝遊戲一樣，雙擊打開，一路「Next」、「下一步」按到底就好。
裝完之後，請打開你的 cmd 黑視窗，輸入 `nvm` 看看。
如果跑出一大串英文指令說明，就代表安裝成功了！
如果它顯示「找不到此指令」，千萬別慌，這只是因為你沒有「重開」黑視窗。
把它關掉，重新開啟一個，它就會乖乖聽話了。
-->

---

# 安裝 NVM（macOS）

macOS 需透過終端機執行下列指令安裝 NVM：

```bash
# 安裝 NVM（v0.40.5）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
```

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 上方版本號（<code>v0.40.5</code>）可至 <a href="https://github.com/nvm-sh/nvm#installing-and-updating" target="_blank">https://github.com/nvm-sh/nvm#installing-and-updating</a> 查看最新版本。安裝後可能需要重新開啟終端機。
</div>

<!--
Mac 的同學，你們的路徑會稍微硬派一點點。我們沒有 `.exe` 安裝檔可以點，只能用終端機下指令。
去 NVM 的官方 GitHub，複製那行長長的 `curl` 或 `wget` 指令，然後貼到你的終端機裡按 Enter。
Mac 最容易卡關的地方是裝完之後，終端機還是認不得 `nvm`。
這通常是因為你沒有設定「環境變數」。你得去編輯你家目錄下的 `.zshrc` 或 `.bash_profile`，把官方給的幾行設定貼進去。
這對新手來說有點像是在給電腦動微創手術，別怕，如果卡住了隨時舉手，我是你們的專屬 Debug 助手！
-->

---

# 安裝 Node.js

NVM 安裝完成後，用它來安裝 Node.js。建議先至官方確認目前的 LTS（長期支援）穩定版本。

```bash
# 安裝指定版本（例如安裝 22.x 最新版）
nvm install 22

# 列出已安裝的 Node.js 版本
nvm list

# 切換使用指定版本（依 nvm list 顯示的版本填入）
nvm use 22.xx.x

# 確認安裝成功
node -v
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>技巧：</b> 只輸入主版本號（如 <code>22</code>），NVM 會自動安裝該版本最新的小版號。可用 <code>nvm list</code> 查看已安裝版本，再用 <code>nvm use</code> 切換。若 <code>node -v</code> 無反應，關閉命令提示字元重開再試。
</div>

<!--
好，時光機（NVM）裝好了，現在我們要請它幫我們把 Node.js 這個發動機搬進電腦裡！
我們在黑視窗輸入 `nvm install 22`。
這時候它會自動去官網下載 Node.js 的 22 版本，並幫你自動裝好。
裝完之後，輸入 `node -v`。如果看到 `v22.x.x` 字樣，就代表 Node.js 發動機正式在你的電腦裡啟動了！
在業界，我們通常會挑選 **LTS 版本**（也就是長期支援版），因為它就像「老牌公車」一樣穩健，不會像測試版一樣天天改引擎改到網頁壞掉。
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
前置環境完成，現在要來安裝今天的主角了——Angular CLI！
這個 CLI 就是你的「Angular 專屬管家機器人」。
我們輸入 `npm install -g @angular/cli@19.0.5`。
這個 `-g` 是 Global 的縮寫，代表「全域安裝」。意思是一旦裝好，你的管家機器人就無所不在，不論你在哪個資料夾呼叫它，它都會隨傳隨到。
我們這次統一安裝 `19.0.5` 版本，確保所有人的環境一模一樣。
安裝完之後，大膽地輸入 `ng v`！
如果你看到黑視窗裡出現一個由文字符號組成的巨大「Angular」Logo，那代表管家機器人已經成功在你的電腦裡醒來，我們準備起飛啦！
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
既然機器人管家已經準備好了，我們現在命令它幫我們蓋新房子！
輸入 `ng new 專案名稱`。
這是一個超神奇的指令，只要你下一行命令，機器人就會在幾秒鐘內一鍵幫你生出幾百個專案檔案！
這就像是去買了個「房屋懶人包」，你只要跟它說：「我要一棟叫 `my-first-app` 的別墅」，它就會把水電、地基、梁柱、隔間全部幫你建好。
新手注意喔！專案名稱「千萬不能用中文」，也「不要有空格」，不然電腦會看不懂。
最好是用英文小寫，中間用連字號 `-` 連接，像 `my-awesome-app` 這樣。
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
在機器人幫你蓋房子時，它會問你兩個問題來確認房屋的裝修風格：
第一個問題：問你樣式表要選哪一種？
請用鍵盤方向鍵選到 **Sass (SCSS)**。這比一般的 CSS 強大太多，是現代前端必學的裝潢魔法。
第二個問題：問你要不要開啟 SSR（Server-Side Rendering）？
請大膽地打上 **N**，然後按 Enter。
因為 SSR 會把房子的管線搞得很複雜，我們新手先從簡單的單頁應用開始就好。
按完之後，電腦就會開始跑進度，這時可以去喝口水、伸個懶腰，等待你的房子蓋好。
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
別墅建好了！現在我們要插上電源，讓它通電運作！
這裡有一步是「新手最容易犯的低級錯誤」，那就是忘記 `cd` 進去資料夾。
你得先輸入 `cd 專案名稱`，進到剛蓋好的房子裡。
接著，輸入啟動咒語：`ng serve`（或者簡寫成 `ng s --open`）。
這時，Angular 會在你的電腦裡啟動一個「臨時的試營運小伺服器」，並自動在你的瀏覽器打開網頁。
當你看到黑畫面上顯示「Compiled successfully」，並且瀏覽器成功加載出一個超炫的 Angular 預設畫面時——恭喜你！你已經正式踏入 Angular 開發者的殿堂了！
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
現在我們來拆解 Angular 最重要的靈魂結構：元件（Component）。
我們把每個元件想成是一塊「樂高積木」。
`.html` 檔就是這塊樂高積木的**「外觀與形狀」**，決定哪裡有凹槽、哪裡有凸起。
`.scss` 檔就是這塊積木的**「顏色與塗裝」**，決定它是紅色的還是藍色的。
`.ts` 檔則是藏在積木裡面的**「電子晶片與電池」**，決定這塊樂高按下去會發出什麼聲音、會有什麼反應。
在 Angular 中，我們不是寫一整張大網頁，而是把網頁拆成許多樂高積木。
比如：把頂部導覽列做成一塊積木，把側邊欄做成另一塊積木，最後把它們疊拼在一起。
大家可以試著在 VS Code 打開 `app.component.html`，把裡面的字隨便改成「Hello 阿嬤！」，然後存檔。
你會發現瀏覽器根本不用重新整理，畫面就自動改變了！這就是 Angular 自動同步的魔法！
-->

---
layout: end
---

# 課程結束
### 環境建置完成，準備開始開發你的 Angular 應用程式！
