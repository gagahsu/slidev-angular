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

---
layout: default
---

# Outline

- **包板的概念與必要性**
- **執行 `ng build` 指令**
- **處理 Bundle Budget 錯誤**
- **`ng build` 輸出結果解讀**
- **dist 資料夾結構與部署方式**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 包板的概念

Angular Build — Why We Need It

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 執行 ng build

Running the Build Command

---

# 執行 ng build 指令

在專案根目錄執行以下指令，即可開始建置：

```bash
ng build
```

建置完成後，Angular CLI 會輸出各 chunk 檔案的大小與壓縮後的傳輸大小，並在專案根目錄產生 `dist/` 資料夾。

<div class="flex justify-center"><img src="/images/54-angular-build/ng-build-output.png" class="rounded shadow-md max-h-80" /></div>

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 處理 Bundle Budget 錯誤

Handling Bundle Size Budget Errors

---

# Bundle Budget 錯誤說明

執行 `ng build` 時，若 bundle 大小超過設定上限，會出現以下警告或錯誤：

<div class="flex justify-center"><img src="/images/54-angular-build/bundle-budget-error.png" class="rounded shadow-md max-h-80" /></div>

| 層級 | 觸發條件 | 影響 |
| --- | --- | --- |
| `WARNING` | 超過 `maximumWarning` 設定值 | 顯示警告，建置繼續 |
| `ERROR` | 超過 `maximumError` 設定值 | 建置中止，需處理後重新執行 |

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# dist 資料夾與部署

The dist Folder and Deployment

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

---
layout: end
---

# 課程結束

### 學習重點回顧：執行 `ng build` 將 Angular 專案編譯為靜態檔案；若遇到 bundle budget 錯誤，調整 `angular.json` 中的 `maximumWarning` / `maximumError`；建置完成後將 `dist/` 資料夾部署至網頁伺服器即完成交付。
