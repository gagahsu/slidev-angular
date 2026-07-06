---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Angular 包板
routeAlias: ch55
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
    Angular 包板
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「將 Angular 專案編譯打包，部署至網頁伺服器」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來學 Angular 的「包板」，也就是 build（建置打包）。

前面我們都是用 ng serve 開發伺服器來看畫面，那個環境是給我們自己開發用的，並不適合直接拿去給客戶或上線使用。就好像我們平常在家煮菜可以隨性一點，但要端上桌給客人吃，就得裝盤、擺好看，這個「裝盤」的動作，在 Angular 專案裡就是包板。

學完這一章，大家會知道怎麼執行 ng build 把專案編譯成靜態檔案，遇到 bundle 太大被擋下來時該怎麼調整設定，以及打包出來的 dist 資料夾要怎麼部署到網頁伺服器上。
-->

---
layout: default
---

# Outline

- **包板的概念與必要性**
- **執行 `ng build` 指令**
- **處理 Bundle Budget 錯誤**
- **`ng build` 輸出結果解讀**
- **dist 資料夾結構與部署方式**

<!--
這張投影片先讓大家看一下今天的路線圖。我們會先講為什麼需要包板，再實際執行 ng build 指令，接著看建置完成後終端機顯示的資訊要怎麼解讀，中間如果遇到 bundle 太大被擋下來，也會教大家怎麼調整設定，最後看打包出來的 dist 資料夾長什麼樣子、該怎麼部署出去。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 包板的概念

Angular Build — Why We Need It

<!--
這一段我們先來搞清楚，為什麼 Angular 專案不能直接把原始碼交給客戶，一定要經過包板這個步驟。
-->

---

# 為何需要包板？

完成 Angular 專案後，不能直接將原始程式碼交付給客戶，原因如下：

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**直接交付原始碼的問題**

- 客戶須自行安裝 Node.js 環境
- 客戶須安裝 Angular CLI
- 客戶須執行 `ng serve` 才能啟動
- 開發伺服器不適合正式部署

</div>
<div>

**包板後的交付方式**

- 將程式碼編譯為靜態檔案
- 產生一組可直接部署的檔案包
- 客戶只需將檔案放入網頁伺服器資料夾
- 網站即可正常運作，無需額外環境設定

</div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>說明：</b> <code>ng build</code> 會將 TypeScript、HTML、CSS 編譯並最佳化為瀏覽器可直接執行的靜態檔案。</div>

<!--
大家想想看，如果我們把整個專案的原始碼直接壓縮檔傳給客戶，客戶收到之後要做什麼？他得先裝 Node.js，再裝 Angular CLI，還要下 ng serve 才能把網站跑起來，而且開發伺服器本來就不是為了正式營運設計的，效能跟安全性都不夠。

這就好像我們去餐廳吃飯，廚房不會把生食材直接端給客人，一定是煮熟、擺盤之後才上桌。包板的作用就是把我們寫的 TypeScript、HTML、CSS 這些「食材」，編譯、壓縮、最佳化成瀏覽器可以直接執行的靜態檔案，客戶只要有網頁伺服器就能用，完全不需要裝任何開發工具。

這在業界是每個專案上線前一定會做的事，也是前端工程師交付成果的標準流程。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 執行 ng build

Running the Build Command

<!--
接下來我們實際動手，看看 ng build 這個指令怎麼下、跑完之後會出現什麼結果。
-->

---

# 執行 ng build 指令

在專案根目錄執行以下指令，即可開始建置：

```bash
ng build
```

建置完成後，Angular CLI 會輸出各 chunk 檔案的大小與壓縮後的傳輸大小，並在專案根目錄產生 `dist/` 資料夾。

<div class="flex justify-center"><img src="/images/54-angular-build/ng-build-output.png" class="rounded shadow-md max-h-80" /></div>

<!--
這段指令很單純，就是在專案根目錄下打 ng build，按下 Enter 之後 Angular CLI 會開始編譯整個專案。

大家帶著看一下畫面，CLI 跑完之後會列出一大串檔案清單，還有每個檔案的大小，這些等一下我們會逐一解釋。跑完之後最重要的一件事，是專案根目錄下會多出一個 dist 資料夾，這個資料夾就是等一下要拿去部署的東西。

⚠️ 提醒大家，如果專案裡有沒存檔的變更，記得先存檔再執行，不然編譯出來的內容不會包含最新的修改。
-->

---

# ng build 輸出解讀

建置成功後，終端機顯示各 chunk 檔案資訊：

| 欄位 | 說明 |
| --- | --- |
| Initial chunk files | 應用程式啟動時必須載入的檔案 |
| Lazy chunk files | 延遲載入的模組檔案（Lazy Loading） |
| Raw size | 原始檔案大小 |
| Estimated transfer size | 壓縮（gzip）後的預估傳輸大小 |
| Output location | 輸出資料夾路徑（`dist/<專案名稱>/browser/`） |

<!--
我們來看一下剛剛終端機跑出來的那一堆資訊，其實分類起來很簡單。

Initial chunk files 是使用者一打開網站就一定要載入的檔案，這些會影響第一次進站的速度；Lazy chunk files 則是我們之前教過的 Lazy Loading 模組，只有使用者真的切到那個路由時才會被下載，這樣可以讓首次載入變快。Raw size 是檔案原本的大小，Estimated transfer size 則是經過 gzip 壓縮後、實際在網路上傳輸的大小，通常會小很多。最後 Output location 就是告訴我們打包好的檔案放在哪裡。

大家看到這些數字先不用緊張，重點是知道去哪裡找到最後要交付的檔案就好。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 處理 Bundle Budget 錯誤

Handling Bundle Size Budget Errors

<!--
包板的時候有時候會遇到一個狀況——建置失敗，錯誤訊息說 bundle 太大了。這一段我們就來看這是什麼意思，該怎麼處理。
-->

---

# Bundle Budget 錯誤說明

執行 `ng build` 時，若 bundle 大小超過設定上限，會出現以下警告或錯誤：

<div class="flex justify-center"><img src="/images/54-angular-build/bundle-budget-error.png" class="rounded shadow-md max-h-80" /></div>

| 層級 | 觸發條件 | 影響 |
| --- | --- | --- |
| `WARNING` | 超過 `maximumWarning` 設定值 | 顯示警告，建置繼續 |
| `ERROR` | 超過 `maximumError` 設定值 | 建置中止，需處理後重新執行 |

<!--
大家可以把 bundle budget 想成行李箱的重量限制，航空公司會設一個警告線跟一個直接不給你登機的上限。Angular 也一樣，maximumWarning 是警告線，超過了還是可以建置成功，只是會提醒你「檔案有點大囉」；maximumError 是硬性上限，一旦超過，ng build 就會直接失敗，畫面上顯示紅色的 ERROR，這時候一定要處理才能繼續。

⚠️ 特別提醒大家，看到 WARNING 不代表沒事，通常代表專案的 bundle 已經偏大，值得注意一下；看到 ERROR 就一定要處理，不然根本拿不到 dist 資料夾。
-->

---

# 調整 Bundle Budget 設定

在 `angular.json` 中找到 `budgets` 陣列，修改 `type: "initial"` 項目的大小限制：

```json
{
  "type": "initial",
  "maximumWarning": "500kB",
  "maximumError": "1MB"
}
```

調整為適合專案實際大小的數值後，重新執行 `ng build` 即可完成建置。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>注意：</b> 調整預算上限前，應優先考慮是否能縮減 bundle 大小，例如移除未使用的套件或採用 Lazy Loading。</div>

<!--
遇到 bundle 太大的錯誤，最直覺的做法就是去 angular.json 裡把 budgets 這個數字調大，讓它通過。這段範例就是示範怎麼把 initial 這個項目的 maximumWarning 跟 maximumError 都調高。

大家帶著看一下這段 JSON，其實就是把數字改成符合我們專案實際大小的數值，改完存檔重新跑一次 ng build 就會過關了。

⚠️ 但這裡要提醒大家一個很重要的觀念：調高上限只是治標,不是治本。就像行李超重了不是把秤動手腳，而是應該想辦法把東西減量。真正該做的是檢查專案裡有沒有用不到的套件、或者能不能把某些功能改成 Lazy Loading，先縮減 bundle 大小，真的縮不下去了，再考慮調整預算。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# dist 資料夾與部署

The dist Folder and Deployment

<!--
最後這一段，我們來看包板完成後產生的 dist 資料夾裡面到底有什麼，以及要怎麼把它交付、部署出去。
-->

---

# dist 資料夾結構

`ng build` 成功後，專案根目錄會新增 `dist/` 資料夾，結構如下：

<div class="grid grid-cols-2 gap-4 my-3">
<div>

| 檔案 | 說明 |
| --- | --- |
| `index.html` | 應用程式進入點 HTML |
| `main-[hash].js` | 應用程式主要程式碼 |
| `polyfills-[hash].js` | 瀏覽器相容性補丁 |
| `styles-[hash].css` | 全域樣式表 |
| `chunk-[hash].js` | 額外切割的程式碼區塊（含 Lazy 模組） |

</div>
<div>

<img src="/images/54-angular-build/dist-folder-structure.png" class="rounded shadow-md w-full" />

</div>
</div>

<!--
大家看一下 dist 資料夾裡面，其實跟我們平常看到的網站原始檔案很像：index.html 是進入點，瀏覽器一開始就是先讀這個檔案；main-[hash].js 是我們寫的應用程式邏輯打包後的結果；polyfills 是為了讓舊版瀏覽器也能相容一些新語法的補丁；styles 就是全域樣式；如果有用到 Lazy Loading，還會看到額外切出來的 chunk 檔案。

檔名後面那串 hash 是根據內容自動產生的雜湊值，好處是只要內容有變，檔名就會跟著變，這樣瀏覽器快取才不會抓到舊版本的檔案，這個細節大家知道就好，不用特別去記。
-->

---

# 部署注意事項

`dist/` 資料夾內的所有檔案即為交付給客戶的網站內容。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**正確的部署方式**

- 將 `dist/<專案名稱>/browser/` 內所有檔案上傳至網頁伺服器（Apache、Nginx、IIS 等）
- 伺服器需設定所有路由導向 `index.html`，以支援 Angular 的 SPA 路由

</div>
<div>

**常見錯誤**

- 直接在本機雙擊開啟 `index.html`
- 因瀏覽器安全限制（CORS、相對路徑問題），頁面無法正常顯示
- 必須透過網頁伺服器提供服務才能正常運作

</div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>注意：</b> 本機測試部署時，可使用 <code>npx http-server dist/&lt;專案名稱&gt;/browser</code> 快速啟動一個靜態檔案伺服器。</div>

<!--
最後這張很重要，大家一定要記住：dist 資料夾裡面的內容，就是我們最終要交給客戶或上線的網站本體。

正確的做法是把 dist/<專案名稱>/browser 底下的所有檔案，整包上傳到 Apache、Nginx 或 IIS 這類網頁伺服器，而且伺服器要設定成不管使用者輸入什麼路徑，都導回 index.html，這樣 Angular 的前端路由才能正常運作，不然重新整理頁面就會出現 404。

⚠️ 最常見的錯誤，就是有人直接在自己電腦上雙擊 index.html 用瀏覽器打開，這樣一定會出問題，因為瀏覽器對本機檔案有安全限制，CORS 跟相對路徑都會出錯，一定要透過網頁伺服器來提供服務。如果只是想在本機快速驗證打包結果，可以用 npx http-server 起一個簡單的靜態伺服器來測試。
-->

---
layout: end
---

# 課程結束

### 學習重點回顧：執行 `ng build` 將 Angular 專案編譯為靜態檔案；若遇到 bundle budget 錯誤，調整 `angular.json` 中的 `maximumWarning` / `maximumError`；建置完成後將 `dist/` 資料夾部署至網頁伺服器即完成交付。

<!--
這一章我們一起走過了 Angular 包板的完整流程：從為什麼需要包板開始，到執行 ng build、看懂輸出結果、處理 bundle budget 錯誤，最後把 dist 資料夾部署到網頁伺服器。

大家現在應該能自己完成「打包 + 部署」這整套流程了。下一章我們會接著看更進一步的部署方式，把今天學的包板知識實際應用上去。
-->
