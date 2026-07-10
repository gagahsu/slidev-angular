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

<!--
大家好，上一章我們學會了怎麼用 ng build 把 Angular 專案打包成靜態檔案，這一章我們要更進一步，把打包好的網站真的發布到網際網路上，讓全世界的人都能用網址連過來。

我們會用 Firebase Hosting 這個工具。大家可以把它想成是 Google 提供的一個免費「網站倉庫」，我們只要把打包好的檔案交給它，它就會幫我們架好伺服器、配好網址，甚至還有 CDN 加速，完全不用自己架主機。

學完這一章，大家會知道怎麼安裝 Firebase CLI、登入帳號、初始化專案設定，最後執行一行指令就把網站部署上線。
-->

---
layout: default
---

# Outline

- **部署概念與 Firebase Hosting 介紹**
- **安裝 Firebase CLI 與登入**
- **初始化 Firebase Hosting（firebase init hosting）**
- **連結 Firebase 專案與設定選項**
- **部署至 Firebase（firebase deploy）**

<!--
這張投影片先讓大家看一下今天的流程。我們會先講為什麼要部署、什麼是 Firebase Hosting，接著安裝 Firebase CLI 並登入帳號，然後執行 firebase init hosting 走過一連串的設定問題，最後執行 firebase deploy 把網站真正發布出去。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 部署概念與 Firebase Hosting 介紹

Introduction to Deployment and Firebase Hosting

<!--
這一段我們先來搞清楚，為什麼打包完之後還需要一個「托管服務」，以及 Firebase Hosting 適合在什麼情況下使用。
-->

---

# 為何使用 Firebase Hosting 部署

Angular 專案完成 `ng build` 打包後，需要一個網頁托管服務才能讓外界存取。Firebase Hosting 是 Google 提供的免費靜態網站托管平台，適合部署 Angular 單頁應用程式。

- Angular 打包後產出純靜態檔案（HTML、CSS、JavaScript）
- Firebase Hosting 提供免費的 HTTPS 域名與全球 CDN 加速
- 部署流程透過 Firebase CLI 指令完成，操作簡便
- 支援 SPA 路由設定，可將所有請求導向 `index.html`

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-hosting-logo.png" class="rounded shadow-md max-h-80" /></div>

<!--
大家想想看，上一章我們已經有了 dist 資料夾，裡面裝著打包好的網站，但這個資料夾目前只存在我們自己的電腦裡，其他人根本連不到。這就好像我們做好了一道菜，但廚房沒有對外開放，客人進不來。

Firebase Hosting 要解決的就是這個問題——它是 Google 提供的免費靜態網站托管平台，我們只要把 dist 裡的檔案交給它，它就會幫我們架好對外的網址，還附贈 HTTPS 加密跟全球 CDN 加速，讓不同地區的使用者都能快速連上。因為 Angular 打包後就是純靜態的 HTML、CSS、JS 檔案，跟 Firebase Hosting 的定位完全吻合，所以是業界很常見的 Angular 部署選擇之一。

它也支援 SPA 路由設定，這點等一下在初始化的時候我們會實際設定到。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝 Firebase CLI 與登入

Installing Firebase CLI and Logging In

<!--
要用 Firebase Hosting，第一步得先在電腦上安裝它的指令列工具，並且登入自己的 Google 帳號，我們一步一步來看。
-->

---

# 安裝 Firebase CLI（一）

首先全域安裝 Firebase CLI 套件：

```bash
npm install -g firebase-tools
```

安裝完成後，執行以下指令登入 Firebase 帳號：

```bash
firebase login
```

- `npm install -g firebase-tools` 加上 `-g` 代表全域安裝，整台電腦都能使用這個指令，不侷限在單一專案裡
- 安裝完成後，用 `firebase login` 登入 Google 帳號，後續 CLI 操作才知道要用哪個帳號的身份執行

<!--
這邊有兩個指令，大家帶著一起做一遍。第一個 npm install -g firebase-tools 是全域安裝 Firebase 的指令列工具，加上 -g 代表整台電腦都能用這個指令，不侷限在單一專案裡。

裝好之後，第二個指令 firebase login 是用來登入我們的 Google 帳號。執行之後不會馬上跳出瀏覽器，CLI 會先問幾個設定問題，下一頁我們接著看實際會問到什麼。
-->

---

# 安裝 Firebase CLI（二）

執行 `firebase login` 後，CLI 會先詢問兩個是否啟用的設定：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-login-prompts.png" class="rounded shadow-md max-h-64" /></div>

- **Enable Gemini in Firebase features?**：是否啟用 Gemini 相關功能，選 **No** 即可，不影響部署流程
- **Allow Firebase to collect CLI and Emulator Suite usage and error reporting information?**：是否允許蒐集使用統計與錯誤回報，選 **Y** 或 **n** 皆可，純屬個人選擇
- 回答完上述兩題後，系統才會自動開啟瀏覽器，引導完成 Google 帳號授權
- 授權完成後，終端機會顯示登入成功訊息
- 後續所有 Firebase CLI 操作皆以此帳號身份執行

<!--
執行 firebase login 之後不會馬上跳出瀏覽器，CLI 會先問兩個題目：第一個問要不要啟用 Gemini in Firebase 功能，這跟部署沒有直接關係，選 No 就好；第二個問要不要讓 Firebase 蒐集 CLI 跟 Emulator Suite 的使用狀況跟錯誤回報，這純粹是個人選擇，選 Y 或 n 都不影響後續部署流程。

回答完這兩題之後，瀏覽器才會自動跳出來，走一次 Google 的授權流程，授權完成後終端機會顯示登入成功的訊息，之後我們在這台電腦上執行的所有 Firebase 指令，都會是用這個帳號的身份在操作。

⚠️ 提醒大家，如果瀏覽器沒有自動跳出來，可以看一下終端機有沒有印出一個連結，手動複製貼到瀏覽器打開就可以了。
-->

---

# 登入失敗排解：檢查 Node 版本

若執行 `firebase login` 後一直卡住或授權失敗，優先檢查 Node.js 版本：

```bash
node -v
```

- Firebase CLI 對 Node 版本較敏感，建議使用 **Node 20**
- 若版本不是 20.x，登入流程可能卡住、逾時，或授權後無回應
- 確認版本後，若非 20，接續下一頁改用 nvm 安裝並切換

<!--
如果大家在 firebase login 這邊一直失敗，畫面卡住不動，或是瀏覽器授權完之後終端機沒有反應，先別急著懷疑帳號密碼有問題，第一件事情先檢查 Node.js 的版本。

執行 node -v 看一下目前用的版本號。Firebase CLI 對 Node 版本其實蠻敏感的，官方建議使用 Node 20，如果版本太舊或太新，都有可能造成登入卡住、逾時，或授權完全沒反應這類奇怪的狀況。

如果檢查完發現版本不是 20.x，我們下一頁來看怎麼用 nvm 切換過去。
-->

---

# 使用 nvm 安裝並切換至 Node 20.18.0

透過 nvm 安裝指定版本的 Node，再重新嘗試登入：

```bash
nvm install 20.18.0
nvm use 20.18.0
```

切換完成後，重新執行登入指令：

```bash
firebase login
```

- 安裝完成後，用 `node -v` 再次確認版本已切換為 `20.18.0`
- 大多數登入失敗問題，切換至 Node 20.18.0 後即可正常完成授權

<!--
確認版本不對之後，我們用 nvm 這個工具來安裝並切換 Node 版本。nvm install 20.18.0 會幫我們下載安裝這個指定版本，裝完之後用 nvm use 20.18.0 切換過去。

切換完成，可以再用 node -v 確認一下，畫面上顯示的版本號應該就是 20.18.0 了。這時候再重新執行一次 firebase login，大部分卡住登入不了的狀況，都是因為 Node 版本不合適，切換到 20.18.0 之後就能順利完成授權。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 初始化 Firebase Hosting

Initializing Firebase Hosting

<!--
登入完成後，接下來要在 Angular 專案裡做初始化設定，讓這個專案知道要連結到哪一個 Firebase 專案、要托管哪個資料夾。這一段我們就來看 firebase init hosting 這個指令。
-->

---

# 執行 firebase init hosting

進入 Angular 專案的根目錄後，執行初始化指令：

```bash
firebase init hosting
```

執行後 CLI 會先確認是否要在目前目錄初始化 Firebase 專案：

```
? Are you ready to proceed? (Y/n)
```

- 確認目前所在路徑為要初始化的 Angular 專案根目錄後，輸入 **Y** 繼續
- 選擇 Y 後，CLI 才會接著詢問要連結哪一個 Firebase 專案

<!--
大家帶著一起在專案根目錄執行 firebase init hosting，執行之後 CLI 會先印出一個 FIREBASE 的字樣 Logo，接著問一句 Are you ready to proceed?，這是在跟我們確認目前所在的資料夾路徑沒有錯，因為它接下來要在這個目錄底下產生設定檔。

大家看一下畫面上顯示的路徑，確認是自己 Angular 專案的根目錄之後，輸入 Y 繼續就可以了。選 Y 之後，CLI 才會開始像做問卷一樣，一題一題問我們設定選項。
-->

---

# 選擇要連結的 Firebase 專案

選擇 Y 繼續後，CLI 詢問要連結哪一個 Firebase 專案：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-select-project-option.png" class="rounded shadow-md max-h-80" /></div>

- **Use an existing project**：連結已在 Firebase Console 建立的現有專案
- **Create a new project**：在 Firebase 中新建一個專案並連結
- 第一次操作、尚未在 Firebase Console 建立過專案者，選擇 **Create a new project** 即可

<!--
確認路徑沒問題、選了 Y 之後，CLI 接著問的就是要連結哪一個 Firebase 專案。如果之前已經在 Firebase Console 網站上建立過專案，就選 Use an existing project，把它連結進來；如果是第一次做，就選 Create a new project，讓 CLI 直接幫我們在 Firebase 建一個新的。

大家都是第一次操作，所以這邊統一選 Create a new project 就可以了，用鍵盤的上下鍵選擇，Enter 確認就可以了。
-->

---

# 備援：CLI 建立專案失敗時的處理方式

選擇 Create a new project 後，若出現以下錯誤：

```
✖ Adding Firebase resources to Google Cloud Platform project
Error: Failed to add Firebase to Google Cloud Platform project.
```

- 此錯誤代表 Google 帳號權限被擋（`403 PERMISSION_DENIED`），CLI 端無法自動建立
- 解法：改用 Firebase Console **網頁介面**手動建立專案，再回 CLI 連結既有專案
  1. 開啟 [console.firebase.google.com](https://console.firebase.google.com)，用同一組帳號登入，點選「新增專案」完成建立
  2. 回到終端機，重新執行 `firebase init hosting`
  3. 這次選擇 **Use an existing project**，選取剛剛在網頁建好的專案

<!--
有些同學在選 Create a new project 之後，會遇到一個錯誤：Adding Firebase resources to Google Cloud Platform project 失敗，訊息顯示 Failed to add Firebase to Google Cloud Platform project。

這個狀況通常是因為 Google 帳號權限被擋下來，錯誤代碼是 403 PERMISSION DENIED，CLI 這條自動建立的路線走不通，但不代表帳號完全不能用 Firebase。

解法是換一條路：改成用瀏覽器打開 Firebase Console 網站，用同一個帳號登入，直接在網頁上手動建立專案，網頁這邊的權限檢查機制不太一樣，通常都能順利建立成功。建立完成之後，回到終端機重新執行 firebase init hosting，這次第一題就不要選 Create a new project 了，改選 Use an existing project，把剛剛在網頁上建好的專案選進來就可以了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 連結 Firebase 專案與設定選項

Linking a Firebase Project and Configuring Options

<!--
接下來 CLI 會依序問我們好幾個設定問題，包括專案 ID、專案名稱、公共目錄路徑等等，這一段我們一題一題走過去。
-->

---

# 設定專案 ID（建立新專案時）

若選擇建立新專案，CLI 會要求輸入一個唯一的專案 ID：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-project-id-prompt.png" class="rounded shadow-md max-h-80" /></div>

- 專案 ID 需為 6 至 30 個字元
- ID 一經設定即**無法修改**，請謹慎命名
- ID 將成為 Firebase 托管網址的一部分（如 `https://<project-id>.web.app`）

<!--
如果剛剛選的是 Create a new project，接下來 CLI 會要我們輸入一個專案 ID，這個 ID 要 6 到 30 個字元。

⚠️ 這裡要特別提醒大家一個很重要的地方：這個 ID 一旦設定下去，就沒辦法再改了，有點像我們申請 email 帳號，帳號名稱一開始就要想清楚。而且這個 ID 之後會直接變成網站網址的一部分，例如 https://my-app.web.app，所以取名字的時候盡量想清楚、有意義一點，不要隨便亂打。
-->

---

# 設定專案名稱

設定專案 ID 後，CLI 會詢問專案的顯示名稱，預設值為專案 ID：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-project-name-prompt.png" class="rounded shadow-md max-h-80" /></div>

- 顯示名稱僅用於 Firebase Console 介面辨識，不影響網址
- 可直接按 Enter 採用預設的專案 ID 作為名稱
- 完成後 Firebase 開始在後台建立專案

<!--
接下來這一題比較輕鬆，問的是專案的顯示名稱，這個名稱只是給我們自己在 Firebase Console 網站上辨識用的，不會出現在網址裡，所以不用太緊張，直接按 Enter 採用預設值（也就是剛剛的專案 ID）就可以了。

按下去之後，Firebase 就會開始在後台幫我們建立這個專案，稍等一下它就會準備好。
-->

---

# 設定公共目錄（Public Directory）

Firebase 專案建立完成後，CLI 詢問 Angular 的公共目錄路徑：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-public-directory-prompt.png" class="rounded shadow-md max-h-80" /></div>

- 此路徑需指向 `ng build` 產出的 `dist/<專案名稱>/browser/` 目錄
- 該目錄內必須包含 `index.html` 檔案
- 範例：若專案名稱為 `quest`，則輸入 `dist/quest/browser`

<!--
這一題非常關鍵，大家一定要看清楚。CLI 問的是「public directory」，也就是要托管哪個資料夾裡的內容，這裡一定要指向我們上一章 ng build 打包出來的那個資料夾，也就是 dist/<專案名稱>/browser。

⚠️ 提醒大家最常犯的錯誤，就是不小心打成專案根目錄，或者忘記加 browser 這一層。大家可以記住一個判斷方法：這個資料夾裡面一定要看得到 index.html 這個檔案，如果找不到，代表路徑打錯了。舉例來說，如果專案名稱是 quest，這裡就要輸入 dist/quest/browser。
-->

---

# 設定單頁應用程式（SPA）模式

CLI 詢問是否將網站設定為單頁應用程式：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-spa-rewrite-prompt.png" class="rounded shadow-md max-h-80" /></div>

- Angular 為 SPA，此選項必須選擇 **Y**（是）
- 選擇 Y 後，Firebase 會將所有 URL 請求重新導向至 `/index.html`
- 這樣可確保 Angular Router 能正確處理所有前端路由，避免重新整理時出現 404 錯誤

<!--
這一題也很重要，跟我們之前學的 Angular Router 有直接關係。CLI 問的是要不要把網站設定成單頁應用程式（SPA），這裡一定要選 Y，沒有例外。

大家回想一下，Angular 是靠前端的 Router 來切換畫面的，網址列雖然看起來像 /about、/product/1 這樣有很多路徑，但實際上伺服器上只有一個 index.html。如果沒有設定這個選項，使用者直接在瀏覽器打 /about 或按重新整理，伺服器會去找一個真的叫 about 的檔案，結果當然找不到，就會出現 404。選了 Y 之後，Firebase 會把所有請求都導回 index.html，讓 Angular Router 接手處理路由，這樣才不會出問題。
-->

---

# 設定 GitHub 自動化部署

接著詢問是否透過 GitHub 設定自動建置與部署：

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-init-github-autodeploy-prompt.png" class="rounded shadow-md max-h-80" /></div>

- 初次設定建議選擇 **N**（否），跳過此步驟
- 日後有自動化 CI/CD 需求時，可修改 `firebase.json` 或重新執行 `firebase init` 進行設定

<!--
這一題是問我們要不要設定 GitHub 自動化部署，也就是每次 push 到 GitHub 就自動幫我們建置部署。初次設定的時候，建議大家先選 N，跳過這個步驟，先把手動部署的流程搞熟，之後真的有 CI/CD 的需求，隨時可以回來重新設定，或直接修改 firebase.json 這個檔案。
-->

---

# 設定 Agent Skills（新版 CLI）

新版 Firebase CLI 會詢問是否安裝 AI 開發助理（agent）用的技能套件：

```
? Would you like to install agent skills for Firebase? (Y/n)
```

- 這是給 AI coding agent（如 Claude Code）使用的整合功能，與部署流程無關
- 選擇 **N**（否）即可，不影響後續 `firebase deploy`

<!--
比較新版的 Firebase CLI，在設定的最後會多問一題，問要不要幫像 Claude Code 這種 AI coding agent 安裝 Firebase 的技能套件。這個功能跟我們的部署流程完全無關，是給 AI 工具用的整合功能，這裡選 N 跳過就可以了，不會影響到後面的部署。
-->

---

# 初始化完成

回答完所有問題後，終端機顯示初始化完成訊息：

```
+  Wrote configuration info to firebase.json
+  Wrote project information to .firebaserc

+  Firebase initialization complete!
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>注意：</b> 專案根目錄會自動產生 <code>.firebaserc</code> 與 <code>firebase.json</code> 兩個設定檔，這兩個檔案記錄專案與 Firebase 的連結資訊，請勿刪除。</div>

<!--
回答完所有問題之後，終端機會印出初始化完成的訊息，告訴我們 firebase.json 跟 .firebaserc 這兩個檔案都寫好了，最後顯示 Firebase initialization complete，代表整個初始化流程順利結束。

大家可以留意一下，專案根目錄這時候會多出這兩個檔案，裡面記錄了專案 ID、托管目錄這些設定，之後每次 deploy 都會讀取這裡的設定。

⚠️ 提醒大家，這兩個檔案不要手滑刪掉，不然下次部署的時候 CLI 就不知道要連去哪個 Firebase 專案了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 部署至 Firebase

Deploying to Firebase Hosting

<!--
設定都做好了，終於來到最後一步，也是最爽的一步——把網站真的發布到網際網路上。
-->

---

# 執行 firebase deploy

確認已完成 `ng build` 打包後，在專案根目錄執行部署指令：

```bash
firebase deploy
```

- CLI 會將 `public directory` 路徑內的所有靜態檔案上傳至 Firebase Hosting
- 部署完成後，終端機會顯示專案主控台網址與網站托管網址

<div class="flex justify-center"><img src="/images/55-angular-deploy/firebase-deploy-success-output.png" class="rounded shadow-md max-h-80" /></div>

<!--
大家帶著一起在專案根目錄下這行指令：firebase deploy。要注意的是，執行這個指令之前一定要確認已經跑過 ng build，因為 firebase deploy 只是把我們剛剛設定的 public directory 裡的檔案上傳，如果那個資料夾是舊的或根本不存在，部署出去的內容也會是舊的。

⚠️ 這是很多同學會忘記的地方：修改了程式碼之後，要先 ng build 再 firebase deploy，兩個步驟缺一不可。

執行之後 CLI 會把檔案打包上傳，跑完之後終端機會顯示兩個網址，我們接下來看這兩個網址分別代表什麼。
-->

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

<!--
部署成功後，終端機會印出兩個網址，大家要分清楚它們的用途。Project Console 是 Firebase 的後台管理介面，我們可以在裡面看流量統計、修改設定；Hosting URL 才是真正對外公開的網站網址，把這個網址複製給任何人，他們都可以直接打開瀏覽器連上我們做的網站。

大家可以現在就打開自己的 Hosting URL 看看效果，這就是我們從無到有，一路打包、部署完成的成果。

以後如果程式碼有更新，流程很簡單：重新 ng build 打包一次，再執行 firebase deploy 部署一次就好，網址不會變，內容會自動更新成最新版本。
-->

---
layout: end
---

# 課程結束

### 透過安裝 Firebase CLI、登入帳號、執行 `firebase init hosting` 完成專案連結與設定，最後執行 `firebase deploy` 將 Angular 打包後的靜態檔案部署至 Firebase Hosting，使應用程式可透過公開網址存取。

<!--
這一章我們完整走過了 Angular 專案部署到 Firebase Hosting 的流程：安裝 CLI、登入帳號、執行 firebase init hosting 回答一連串設定問題，最後執行 firebase deploy 把網站發布到網路上。

到這邊，大家已經具備從寫程式、打包到上線的完整能力了，恭喜大家完成這個重要的里程碑。
-->
