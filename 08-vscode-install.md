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

---
layout: default
---

# Outline

- **什麼是 VS Code？**
- **下載與安裝 VS Code**
- **安裝 Angular Extension Pack 套件**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 VS Code？
# Visual Studio Code

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 下載與安裝
# Download & Install

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

---

# Step 2 — 安裝完成後開啟

下載安裝檔後依指示完成安裝，開啟 VS Code 會看到歡迎頁面。

<div class="flex justify-center mt-4">
  <img src="/images/08-vscode/vscode-welcome-screen.png" alt="VS Code 安裝後歡迎畫面截圖" style="max-height: 320px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 第一次開啟會看到歡迎頁面，左側 Activity Bar 有檔案、搜尋、Git、Debug、套件等五大功能區
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝 Angular 套件
# Install Angular Extension Pack

---

# Step 3 — 開啟延伸模組面板

要安裝套件，請點擊左側 Activity Bar 中**長得像方塊的圖示**（延伸模組）。

<div class="flex justify-center mt-6">
  <img src="/images/08-vscode/vscode-extension-icon.png" alt="VS Code 延伸模組 icon 截圖" style="max-height: 200px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>快速鍵：</b> Windows <code>Ctrl + Shift + X</code>、macOS <code>⇧⌘X</code> 可直接開啟延伸模組面板
</div>

---

# Step 4 — 搜尋 Angular 套件

在搜尋欄輸入 **`Angular`**，在結果清單中找到製作者為 **Will 保哥** 的套件。

<div class="flex justify-center mt-4">
  <img src="/images/08-vscode/vscode-search-angular-extension.png" alt="延伸模組搜尋 Angular，Angular Extension Pack by Will 保哥" style="max-height: 300px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 請選擇「<b>Angular Extension Pack</b>」，製作者為 <b>Will 保哥</b>，不要裝錯成其他同名套件
</div>

---

# Step 5 — 點擊安裝

點擊 **Angular Extension Pack** 後，右側會出現套件詳細頁面，點擊「**安裝**」按鈕。

<div class="flex justify-center mt-4">
  <img src="/images/08-vscode/vscode-install-extension-button.png" alt="Angular Extension Pack 詳細頁面，點擊安裝按鈕" style="max-height: 280px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 安裝完成後按鈕會變成「<b>停用 / 解除安裝</b>」，代表已成功安裝
</div>

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

---
layout: end
---

# 安裝完成
### 工具就位，開始你的 Angular 開發之旅！
