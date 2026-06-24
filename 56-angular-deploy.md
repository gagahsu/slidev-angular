---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Angular 部署
routeAlias: ch56
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
    Angular 部署
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「透過 Firebase Hosting 將 Angular 應用程式發布至網際網路」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **第一部分：部署概念與 Firebase Hosting 介紹**
- **第二部分：安裝 Firebase CLI 與登入**
- **第三部分：初始化 Firebase Hosting（firebase init hosting）**
- **第四部分：連結 Firebase 專案與設定選項**
- **第五部分：部署至 Firebase（firebase deploy）**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 部署概念與 Firebase Hosting 介紹

Introduction to Deployment and Firebase Hosting

---

# 為何使用 Firebase Hosting 部署

Angular 專案完成 `ng build` 打包後，需要一個網頁托管服務才能讓外界存取。Firebase Hosting 是 Google 提供的免費靜態網站托管平台，適合部署 Angular 單頁應用程式。

- Angular 打包後產出純靜態檔案（HTML、CSS、JavaScript）
- Firebase Hosting 提供免費的 HTTPS 域名與全球 CDN 加速
- 部署流程透過 Firebase CLI 指令完成，操作簡便
- 支援 SPA 路由設定，可將所有請求導向 `index.html`

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-hosting-logo.png" class="rounded shadow-md max-h-80" /></div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝 Firebase CLI 與登入

Installing Firebase CLI and Logging In

---

# 安裝 Firebase CLI

首先全域安裝 Firebase CLI 套件：

```bash
npm install -g firebase-tools
```

安裝完成後，執行以下指令登入 Firebase 帳號：

```bash
firebase login
```

- 系統會自動開啟瀏覽器，引導完成 Google 帳號授權
- 授權完成後，終端機會顯示登入成功訊息
- 後續所有 Firebase CLI 操作皆以此帳號身份執行

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 初始化 Firebase Hosting

Initializing Firebase Hosting

---

# 執行 firebase init hosting

進入 Angular 專案的根目錄後，執行初始化指令：

```bash
firebase init hosting
```

初始化過程中，CLI 會逐步詢問幾個設定問題。第一個問題為選擇要連結的 Firebase 專案：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-select-project-option.png" class="rounded shadow-md max-h-80" /></div>

- **Use an existing project**：連結已在 Firebase Console 建立的現有專案
- **Create a new project**：在 Firebase 中新建一個專案並連結

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 連結 Firebase 專案與設定選項

Linking a Firebase Project and Configuring Options

---

# 設定專案 ID（建立新專案時）

若選擇建立新專案，CLI 會要求輸入一個唯一的專案 ID：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-project-id-prompt.png" class="rounded shadow-md max-h-80" /></div>

- 專案 ID 需為 6 至 30 個字元
- ID 一經設定即**無法修改**，請謹慎命名
- ID 將成為 Firebase 托管網址的一部分（如 `https://<project-id>.web.app`）

---

# 設定專案名稱

設定專案 ID 後，CLI 會詢問專案的顯示名稱，預設值為專案 ID：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-project-name-prompt.png" class="rounded shadow-md max-h-80" /></div>

- 顯示名稱僅用於 Firebase Console 介面辨識，不影響網址
- 可直接按 Enter 採用預設的專案 ID 作為名稱
- 完成後 Firebase 開始在後台建立專案

---

# 設定公共目錄（Public Directory）

Firebase 專案建立完成後，CLI 詢問 Angular 的公共目錄路徑：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-public-directory-prompt.png" class="rounded shadow-md max-h-80" /></div>

- 此路徑需指向 `ng build` 產出的 `dist/<專案名稱>/browser/` 目錄
- 該目錄內必須包含 `index.html` 檔案
- 範例：若專案名稱為 `quest`，則輸入 `dist/quest/browser`

---

# 設定單頁應用程式（SPA）模式

CLI 詢問是否將網站設定為單頁應用程式：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-spa-rewrite-prompt.png" class="rounded shadow-md max-h-80" /></div>

- Angular 為 SPA，此選項必須選擇 **Y**（是）
- 選擇 Y 後，Firebase 會將所有 URL 請求重新導向至 `/index.html`
- 這樣可確保 Angular Router 能正確處理所有前端路由，避免重新整理時出現 404 錯誤

---

# 設定 GitHub 自動化部署

最後一個問題詢問是否透過 GitHub 設定自動建置與部署：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-github-autodeploy-prompt.png" class="rounded shadow-md max-h-80" /></div>

- 初次設定建議選擇 **N**（否），跳過此步驟
- 日後有自動化 CI/CD 需求時，可修改 `firebase.json` 或重新執行 `firebase init` 進行設定

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>注意：</b> 完成所有設定後，專案根目錄會自動產生 <code>.firebaserc</code> 與 <code>firebase.json</code> 兩個設定檔，這兩個檔案記錄專案與 Firebase 的連結資訊，請勿刪除。</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 部署至 Firebase

Deploying to Firebase Hosting

---

# 執行 firebase deploy

確認已完成 `ng build` 打包後，在專案根目錄執行部署指令：

```bash
firebase deploy
```

- CLI 會將 `public directory` 路徑內的所有靜態檔案上傳至 Firebase Hosting
- 部署完成後，終端機會顯示專案主控台網址與網站托管網址

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-deploy-success-output.png" class="rounded shadow-md max-h-80" /></div>

---

# 部署完成後的輸出資訊

`firebase deploy` 成功後，終端機顯示以下資訊：

```
Project Console: https://console.firebase.google.com/project/<project-id>/overview
Hosting URL:     https://<project-id>.web.app
```

| 項目 | 說明 |
| --- | --- |
| Project Console | Firebase 後台管理介面網址 |
| Hosting URL | 公開可存取的網站網址 |

- 開啟 **Hosting URL** 即可在網際網路上存取已部署的 Angular 應用程式
- 若需更新內容，重新執行 `ng build` 後再次執行 `firebase deploy` 即可

---
layout: end
---

# 課程結束

### 透過安裝 Firebase CLI、登入帳號、執行 `firebase init hosting` 完成專案連結與設定，最後執行 `firebase deploy` 將 Angular 打包後的靜態檔案部署至 Firebase Hosting，使應用程式可透過公開網址存取。
