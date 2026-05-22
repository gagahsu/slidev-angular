# 第08章：VS Code 安裝與推薦外掛

## 安裝 VS Code

前往 https://code.visualstudio.com/ 下載並安裝。

---

## 必裝外掛（Extensions）

在 VS Code 左側點擊「四個方塊」的圖示（Extensions），搜尋以下外掛名稱安裝：

### 開發效率必裝

| 外掛名稱 | 用途 |
|---------|------|
| **Angular Language Service** | Angular 語法提示、錯誤提醒 |
| **Prettier - Code formatter** | 存檔時自動排版，告別手動對齊 |
| **ESLint** | 找出程式碼潛在問題 |
| **Auto Rename Tag** | 修改 HTML 開頭標籤時，結尾標籤自動同步修改 |
| **Auto Close Tag** | 打完 `<div>` 自動補上 `</div>` |
| **Path Intellisense** | 寫路徑時自動補全（例如 img src） |
| **GitLens** | 看每一行程式碼是誰、何時修改的 |

### 外觀美化（選裝）

| 外掛名稱 | 用途 |
|---------|------|
| **Material Icon Theme** | 讓資料夾和檔案有漂亮的圖示 |
| **One Dark Pro** | 深色主題（護眼） |
| **Bracket Pair Color DLW** | 讓成對的括號顯示不同顏色，不容易搞混 |

---

## 設定 Prettier 自動存檔排版

1. 按 `Ctrl + Shift + P`（Mac: `Cmd + Shift + P`）打開命令面板
2. 搜尋「Open Settings (JSON)」
3. 加入以下設定：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

之後只要按 `Ctrl + S` 存檔，程式碼就會自動排版整齊！

---

## VS Code 常用快捷鍵

| 快捷鍵 | 功能 |
|-------|------|
| `Ctrl + S` | 存檔 |
| `Ctrl + Z` | 復原 |
| `Ctrl + /` | 快速加/移除註解 |
| `Ctrl + D` | 選取下一個相同的文字 |
| `Alt + Shift + F` | 手動觸發排版 |
| `Ctrl + `` ` `` | 開啟 VS Code 內建終端機 |
| `Ctrl + P` | 快速開啟檔案（搜尋檔名） |
| `F2` | 重新命名變數（全部自動更新） |
