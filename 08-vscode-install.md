---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 安裝 VS Code
routeAlias: ch08
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
【開場白】
大家好！學過了 HTML 的理論，現在我們要來幫電腦準備一個「專業的書桌」。今天要安裝的就是目前全球工程師最愛用的編輯器：VS Code。

【為什麼要學這個？】
工欲善其事，必先利其器。雖然用記事本也能寫 code，但那就像是用原子筆畫設計圖。VS Code 則是像一台擁有自動導航和智慧修正功能的電腦繪圖機，能幫你省下大量的除錯時間。

【今天學完你會能做什麼】
今天結束後，你的電腦就會裝好最強的前端開發工具，並且裝上 Angular 專用的「大禮包」，讓你在寫 Angular 的時候可以像開外掛一樣快！
-->

---
layout: default
---

# Outline

- **什麼是 VS Code？**
- **下載與安裝 VS Code**
- **安裝 Angular Extension Pack 套件**

<!--
【核心說明】
今天的行程很簡單，只有三步：認識它、擁有它、強化它。

【程式世界怎麼用】
我們會先聊聊為什麼大家都在用 VS Code。接著動手下載安裝，最後也是最關鍵的，我們會幫它裝上「翅膀」，也就是 Angular 的擴充套件，讓它變得更聰明。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 VS Code？
# Visual Studio Code

<!--
【開場白】
我們先來認識一下這位未來的親密戰友。
-->

---

# 什麼是 VS Code？

VS Code 全名 **Visual Studio Code**，是微軟開發的免費、跨平台程式碼編輯器。

<div class="flex justify-center my-6">
  <img src="/images/08-vscode/vscode-logo.png" alt="VS Code Logo" style="height: 60px; object-fit: contain;" />
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
【核心說明】
VS Code 本質上就是一個「超級強大的記事本」。

【生活化比喻】
想像一般記事本是一把普通的小刀。那 VS Code 就是一把「瑞士刀」，它內建了各種你需要的工具，像是放大鏡（Debug）、導航（Git），甚至是自動修復功能。

【程式世界怎麼用】
最厲害的一點是第 3 點「豐富套件」。VS Code 本身很輕，但你可以根據你的工作內容，隨意安裝各式各樣的插件。就像手機可以裝各種 App 一樣，讓它變成你專屬的強力工具。

💼 業界實務：
在業界，VS Code 的市佔率超過 70%。也就是說，你在這裡學會的快速鍵和操作方式，去到哪家公司都通用。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 下載與安裝
# Download & Install

<!--
【開場白】
百聞不如一見，我們直接來下載。
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
  <img src="/images/08-vscode/vscode-download-page.png" alt="VS Code 下載頁面截圖" style="max-height: 240px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 網頁會<b>自動偵測你的作業系統</b>並顯示對應版本；若未自動偵測，請手動選擇 Windows / macOS / Linux
</div>

<!--
【核心說明】
下載流程非常直覺。

【逐步解說】
點進官網後，中間那個大大的藍色按鈕按下去就對了。
如果你是 Windows 就下載 Windows 版，Mac 就下載 Mac 版。它會自動幫你挑好最適合你的版本。

⚠️ 學生常見誤解：
注意不要下載到「VS Code Insiders」（綠色 Logo），那是給喜歡嘗鮮的開發者測試用的，不一定穩定。我們安裝藍色 Logo 的穩定版就好。
-->

---

# Step 2 — 安裝完成後開啟

下載安裝檔後依指示完成安裝，開啟 VS Code 會看到歡迎頁面。

<div class="flex justify-center mt-4">
  <img src="/images/08-vscode/vscode-welcome-screen.png" alt="VS Code 安裝後歡迎畫面截圖" style="max-height: 320px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 第一次開啟會看到歡迎頁面，左側 Activity Bar 有檔案、搜尋、Git、Debug、套件等五大功能區
</div>

<!--
【核心說明】
裝完之後，我們來看一下它的「駕駛艙」。

【逐步帶著看】
你看左邊那一排直直的圖示，我們叫它「側邊欄」。
第一個是「檔案總管」，以後你的程式碼都從這裡看。
最後一個「方塊圖示」是重點，那就是安裝套件的地方，等一下我們會用到。

💼 業界實務：
如果你覺得 VS Code 是英文版看不太習慣，等一下你也可以在套件區搜尋「Chinese」，安裝繁體中文包，它就會變回中文介面囉！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝 Angular 套件
# Install Angular Extension Pack

<!--
【開場白】
接下來，我們要來幫編輯器「開掛」了。
-->

---

# Step 3 — 開啟延伸模組面板

要安裝套件，請點擊左側 Activity Bar 中**長得像方塊的圖示**（延伸模組）。

<div class="flex justify-center mt-6">
  <img src="/images/08-vscode/vscode-extension-icon.png" alt="VS Code 延伸模組 icon 截圖" style="max-height: 200px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>快速鍵：</b> Windows <code>Ctrl + Shift + X</code>、macOS <code>⇧⌘X</code> 可直接開啟延伸模組面板
</div>

<!--
【核心說明】
這是在 VS Code 裡最重要的一個功能，叫做「延伸模組 (Extensions)」。

【生活化比喻】
這就像是手機的「App Store」。你的手機本來只能打電話，裝了 LINE 就能聊天，裝了 YouTube 就能看影片。我們幫 VS Code 裝上 Angular 套件，它就會變得很懂 Angular 語法。

【練習引導】
大家可以試著按按看那個快速鍵 `Ctrl + Shift + X`。身為工程師，手不離鍵盤才是最帥的！
-->

---

# Step 4 — 搜尋 Angular 套件

在搜尋欄輸入 **`Angular`**，在結果清單中找到製作者為 **Will 保哥** 的套件。

<div class="flex justify-center mt-4">
  <img src="/images/08-vscode/vscode-search-angular-extension.png" alt="延伸模組搜尋 Angular，Angular Extension Pack by Will 保哥" style="max-height: 300px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 請選擇「<b>Angular Extension Pack</b>」，製作者為 <b>Will 保哥</b>，不要裝錯成其他同名套件
</div>

<!--
【核心說明】
搜尋結果會有很多個，我們要選「大禮包」類型的。

【逐步解說】
我們推薦安裝由台灣 Angular 大師 **Will 保哥** 整理的套件包。
為什麼？因為他已經幫你挑好了 10 幾個開發 Angular 必備的小工具，你裝這一個就等於一次裝好了所有好料，不用一個一個慢慢搜。

⚠️ 學生常見誤解：
很多人會看到第一個就裝，但有些是個人開發的小實驗套件，可能會讓你的編輯器變慢。請務必認明「Will 保哥」的標誌。
-->

---

# Step 5 — 點擊安裝

點擊 **Angular Extension Pack** 後，右側會出現套件詳細頁面，點擊「**安裝**」按鈕。

<div class="flex justify-center mt-4">
  <img src="/images/08-vscode/vscode-install-extension-button.png" alt="Angular Extension Pack 詳細頁面，點擊安裝按鈕" style="max-height: 280px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 安裝完成後按鈕會變成「<b>停用 / 解除安裝</b>」，代表已成功安裝
</div>

<!--
【核心說明】
最後一步，按下去就好。

【逐步解說】
點擊安裝後，你會看到進度條。因為這個是大禮包，它會連帶幫你安裝很多相關套件，所以會跑一點點時間。
等它顯示為「停用」或「解除安裝」的時候，代表你的裝備已經全部升級完畢了。

💼 業界實務：
裝完這些套件後，以後你只要打一兩個字母，VS Code 就會自動幫你寫完一整行 Angular 程式碼。這就是為什麼高手寫 code 這麼快的原因！
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
【核心說明】
這是一個最後的檢查點。

【類比說明】
這就像是你要去考駕照，現在車子也牽好了（VS Code），駕訓班的 GPS（套件）也裝好了。

【練習引導】
大家可以點一下左上角的「檔案」，隨便開啟一個專案檔案，看看字體是不是有了漂亮的顏色？如果有，代表你的開發環境已經非常健康了！
-->

---
layout: end
---

# 安裝完成
### 工具就位，開始你的 Angular 開發之旅！

<!--
【結語】
好啦，恭喜大家順利完成了工具的架設。雖然這只是幾分鐘的事，但這套工具會陪伴你接下來幾百、幾千個小時的開發時光。

【互動引導】
除了 Angular 套件，有沒有同學想問：有沒有什麼套件可以讓編輯器變更漂亮？（可以順勢介紹 Theme 套件或 Material Icon 套件）

下一堂課，我們要回頭繼續學習 CSS 的基礎囉！
-->
