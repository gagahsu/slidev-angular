# 第54章：Angular Build（打包部署）

`ng build` 把 Angular 專案編譯並打包成可以部署到伺服器的靜態檔案。

---

## 打包指令

```bash
ng build
```

執行後在專案根目錄產生 `dist/` 資料夾。

---

## dist 資料夾結構

```
dist/
└── <project-name>/
    └── browser/
        ├── index.html          ← 入口 HTML
        ├── main-[hash].js      ← 主程式（你寫的 Angular 程式碼）
        ├── polyfills-[hash].js ← 瀏覽器相容補丁
        ├── styles-[hash].css   ← 全域樣式
        └── chunk-[hash].js     ← 懶載入的模組（有的話）
```

檔名裡的 hash（如 `main-abc123.js`）是內容雜湊，
讓瀏覽器知道檔案內容改變了，要重新載入，而不是用快取舊版本。

---

## Bundle 大小警告

如果打包後的 JS 檔案太大，Angular 會警告：

```
Warning: bundle initial exceeded maximum budget.
Budget $500.00 kB was not met by $200.00 kB with a total of $700.00 kB.
```

在 `angular.json` 裡可以調整預算：

```json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "500kB",
    "maximumError": "1MB"
  }
]
```

---

## 本機測試打包結果

⚠️ **不能直接用瀏覽器雙擊 index.html！**
因為 Angular 的路由需要透過 Web Server 才能正確運作。

使用 `http-server` 在本機模擬 Web Server：

```bash
# 安裝（一次就好）
npm install -g http-server

# 啟動（把路徑改成你的 dist 路徑）
npx http-server dist/<project-name>/browser

# 或直接指定 port
npx http-server dist/<project-name>/browser -p 8080
```

然後打開瀏覽器連到 `http://localhost:8080`。

---

## 常見問題

| 問題 | 原因 | 解法 |
|------|------|------|
| 雙擊 index.html 白畫面 | 沒有 Web Server | 用 http-server 啟動 |
| 重新整理頁面 404 | 路由需要 server 設定 | 部署時設定 SPA rewrite |
| Bundle 超過 budget | 套件太多/太大 | 懶載入或移除不必要套件 |

---

## 打包最佳化（自動啟用）

`ng build` 預設開啟以下最佳化：

- **Tree-shaking**：移除未使用的程式碼
- **Minification**：壓縮 JS / CSS，移除空格和註解
- **AOT 編譯**：提前編譯模板，讓瀏覽器載入更快
- **Content Hash**：確保快取正確更新
