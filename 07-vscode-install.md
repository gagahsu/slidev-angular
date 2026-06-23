---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 安裝 VS Code
routeAlias: ch07
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
    安裝 VS Code
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「開發工具就位，前端開發正式啟動」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
哈囉大家！學完 HTML 這副骨架之後，現在我們要來幫電腦佈置一張「超專業的開發書桌」。
今天要裝的，就是目前全宇宙程式工程師市佔率第一、最愛不釋手的編輯器——VS Code！
俗話說：「工欲善其事，必先利極器。」
雖然你用電腦內建的「記事本」也可以寫網頁，但那感覺就像是用毛筆去畫高科技晶片設計圖一樣痛苦。
而 VS Code 就像是一台有 AI 自動導航、還會自動幫你改錯的數位繪圖工作站，能幫你的肝省下大把的 Debug 時間。
今天搞定後，你的電腦就具備了專業開發者的武器，還能裝上 Angular 專用大禮包，讓你寫扣速度像開外掛一樣飛起來！
-->

---
layout: default
---

# Outline

- **什麼是 VS Code？**
- **下載與安裝 VS Code**
- **安裝 Angular Extension Pack 套件**

<!--
今天的行程非常簡單明瞭，只有三步：
第一，認識這位未來的靈魂伴侶；
第二，下載並擁有它；
第三，也是最關鍵的，幫它插上翅膀，安裝 Angular 的超強外掛。
這就是一趟把普通編輯器改裝成「跑車」的過程！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 VS Code？
# Visual Studio Code

<!--
首先，第一站：我們來認識一下這位未來要天天黏在一起的親密戰友。
-->

---

# 什麼是 VS Code？

VS Code 全名 **Visual Studio Code**，是微軟開發的免費、跨平台程式碼編輯器。

<div class="flex justify-center my-6">
  <img src="/images/07-vscode/vscode-logo.png" alt="VS Code Logo" style="height: 60px; object-fit: contain;" />
</div>

| 特性 | 說明 |
| --- | --- |
| **免費 & 開源** | 完全免費，原始碼公開於 GitHub |
| **跨平台** | 支援 Windows、macOS、Linux |
| **豐富套件** | 擁有大量擴充套件可安裝 |
| **內建工具** | Debug 工具、Git 整合、自動排版、IntelliSense |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>為什麼選 VS Code？</b> 輕量、啟動快、套件生態豐富，是目前前端開發的主流編輯器
</div>

<!--
VS Code 的本質，其實就是一個「超級進階版」的文字記事本。
我們用生活例子來比喻。
普通記事本就像是「削鉛筆的普通美工刀」，而 VS Code 則是功能豪華的「多功能瑞士軍刀」！
它不但有小刀，還配備了開罐器、手電筒（Debug 工具）、指南針（Git 整合版本控制）以及各種神奇的小夾子。
它最性感的優勢，就是擁有無窮無盡的「延伸套件生態系」。
VS Code 本身非常輕巧，就像剛買來的新手機，你可以去它的應用商店裡隨意下載各種 App 插件。
你想寫什麼語言，就裝什麼插件，一秒讓它變成你專屬的終極兵器。
在業界，VS Code 的市佔率高達七成以上。
這代表你今天學會了它的快速鍵和操作方式，以後去任何一家公司上班，都可以無縫接軌，完全不用重新適應！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 下載與安裝
# Download & Install

<!--
好，講這麼多不如直接動手，我們去官網下載安裝檔！
-->

---

# Step 1 — 前往官網下載

開啟瀏覽器，前往 VS Code 官方網站：

<div class="flex justify-center my-2">
  <div class="px-6 py-3 bg-teal-50 border-2 border-teal-400 rounded-lg text-teal-800 font-mono text-lg">
    https://code.visualstudio.com/
  </div>
</div>

<div class="flex justify-center mt-4">
  <img src="/images/07-vscode/vscode-download-page.png" alt="VS Code 下載頁面截圖" style="max-height: 240px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 網頁會<b>自動偵測你的作業系統</b>並顯示對應版本；若未自動偵測，請手動選擇 Windows / macOS / Linux
</div>

<!--
點進去官網後，畫面中間會看到一個超大的藍色按鈕。
網頁非常聰明，會自動偵測你的電腦系統並幫你挑好版本。你是 Windows 它就給你 Windows 安裝檔，你是 Mac 就給 Mac 壓縮包。直接大膽地按下去下載！
這裏新手要注意一個小細節：
千萬不要下載到旁邊一個綠色圖標、寫著「VS Code Insiders」的版本。
那個綠色版是微軟的「實驗測試版」，裡面可能藏了一堆未知的 Bug，寫扣寫到一半崩潰你會欲哭無淚。
認明這個尊絕不凡的「經典藍色 Logo」穩定版就對了！
-->

---

# Step 2 — 安裝完成後開啟

下載安裝檔後依指示完成安裝，開啟 VS Code 會看到歡迎頁面。

<div class="flex justify-center mt-4">
  <img src="/images/07-vscode/vscode-welcome-screen.png" alt="VS Code 安裝後歡迎畫面截圖" style="max-height: 320px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 第一次開啟會看到歡迎頁面，左側 Activity Bar 有檔案、搜尋、Git、Debug、套件等五大功能區
</div>

<!--
下載完後雙擊安裝，一路點「下一步」到底，打開後就會看到這個高科技的歡迎畫面。
我們來參觀一下你的新駕駛艙。
請看最左邊那一排垂直的小圖示，我們稱它為「活動列」。
最上面那個「兩張紙疊在一起」的圖標是「檔案總管」，以後你寫的所有程式碼檔案，都會在這裡排排站給你看。
底下的那個「四個正方形拼在一起、其中一個飛出來」的圖標，就是我們的重頭戲——「延伸套件商店」。
如果你覺得全英文的介面看起來很吃力，別擔心，你可以先在這個套件商店搜尋 `Chinese`，安裝繁體中文包，它一秒就會變回熟悉的繁中介面，完全沒有障礙！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝 Angular 套件
# Install Angular Extension Pack

<!--
環境就緒，現在我們要來給 VS Code 進行「改裝開掛」！
-->

---

# Step 3 — 開啟延伸模組面板

要安裝套件，請點擊左側 Activity Bar 中**長得像方塊的圖示**（延伸模組）。

<div class="flex justify-center mt-6">
  <img src="/images/07-vscode/vscode-extension-icon.png" alt="VS Code 延伸模組 icon 截圖" style="max-height: 200px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>快速鍵：</b> Windows <code>Ctrl + Shift + X</code>、macOS <code>⇧⌘X</code> 可直接開啟延伸模組面板
</div>

<!--
點擊左側那個積木方塊圖示，就能開啟延伸模組面板。
這就像是 VS Code 的「App Store」。
本來這台編輯器只是一個普通的記事本，但當你安裝了各式各樣的 App，它就能變身成萬能的開發利器。
我們來練習一個工程師的帥氣動作，不要用滑鼠去點，請在鍵盤按 `Ctrl + Shift + X`（Mac 同學按 `Command + Shift + X`）。
看！面板是不是自動彈出來了？
手不用離開鍵盤就能完成操作，這就是專業工程師的第一步！
-->

---

# Step 4 — 搜尋 Angular 套件

在搜尋欄輸入 **`Angular`**，在結果清單中找到製作者為 **Will 保哥** 的套件。

<div class="flex justify-center mt-4">
  <img src="/images/07-vscode/vscode-search-angular-extension.png" alt="延伸模組搜尋 Angular，Angular Extension Pack by Will 保哥" style="max-height: 300px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 請選擇「<b>Angular Extension Pack</b>」，製作者為 <b>Will 保哥</b>，不要裝錯成其他同名套件
</div>

<!--
在搜尋框輸入 `Angular`，你會看到底下跑出幾十個相關套件。
請大家睜大眼睛，找到由台灣 Angular 大宗師 **Will 保哥** 整理製作的「**Angular Extension Pack**」。
為什麼推薦裝這個？
因為這個是「全套懶人包」。
保哥已經幫你把自動完成、語法高亮、排版工具等十多個寫 Angular 必備的神級套件，全部打包在裡面。
你只需要按一次安裝，就能一次裝滿全套頂級裝備，不用在套件海裡一個一個撈。
認明這個「Will 保哥」的作者名字，千萬不要裝到其他來路不明的同名套件喔！
-->

---

# Step 5 — 點擊安裝

點擊 **Angular Extension Pack** 後，右側會出現套件詳細頁面，點擊「**安裝**」按鈕。

<div class="flex justify-center mt-4">
  <img src="/images/07-vscode/vscode-install-extension-button.png" alt="Angular Extension Pack 詳細頁面，點擊安裝按鈕" style="max-height: 280px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 安裝完成後按鈕會變成「<b>停用 / 解除安裝</b>」，代表已成功安裝
</div>

<!--
點擊那個綠色的「安裝」按鈕。
這時候 VS Code 會開始在背景跑安裝。因為是懶人包，它會連帶安裝很多小兄弟套件，所以請給它跑個十幾秒。
當你看到按鈕字體變成「停用」或「解除安裝」時，就代表安裝成功了！
裝完這個套件後，你的編輯器就擁有了「心靈感應」超能力。
以後你在寫 Angular 代碼時，可能只要打出 `a-` 開頭，VS Code 就會自動幫你吐出一整行結構完整的代碼，省去你手打的繁瑣過程。
這就是為什麼有些高手寫扣看起來像在彈鋼琴一樣快，因為他們的外掛裝得很齊全！
-->

---

# 安裝完成！

完成以下兩個步驟後，VS Code 就設定好了：

| 步驟 | 操作 | 狀態確認 |
| --- | --- | --- |
| ① 安裝 VS Code | 從官網下載並安裝 | 可正常開啟 VS Code |
| ② 安裝套件 | 搜尋並安裝 Angular Extension Pack | 套件按鈕顯示「停用/解除安裝」 |

<div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-gray-700 text-sm text-left">
✅ <b>恭喜！</b> 開發環境已就緒，接下來可以開始撰寫 Angular 專案了！
</div>

<!--
現在我們來做最後的總複習和檢查：
第一，確認你的電腦裡已經順利開啟了藍色標誌的 VS Code。
第二，確認延伸套件面板裡的 Angular Extension Pack 已經成功安裝，按鈕顯示為「解除安裝」。
這就像是你要開車上路，車子（VS Code）牽好了，導航 GPS（套件）也掛上去了。
大家現在可以隨便開一個副檔名是 `.html` 的檔案，看看裡面的英文字是不是自動變成了五顏六色、層次分明的漂亮顏色？
如果是，那就代表你的編輯器已經徹底開竅，準備好迎接挑戰了！
-->

---
layout: end
---

# 安裝完成
### 工具就位，開始你的 Angular 開發之旅！

<!--
好啦，恭喜大家順利完成了我們核心開發工具 VS Code 的架設！
雖然這整個過程只有短短幾分鐘，但這套工具在未來將會陪伴你幾百甚至幾千個小時的開發生活。
下課時間大家可以逛逛套件商店，有沒有人想問除了 Angular，還有什麼套件能讓編輯器背景發光或是字體變更可愛的？都可以來找我聊。
下堂課，我們就要正式回歸前端的基本功，來看看網頁的化妝師——CSS 基礎囉！
-->
