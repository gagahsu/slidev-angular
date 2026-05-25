# 第55章：Angular 部署（Firebase Hosting）

Firebase Hosting 是 Google 提供的靜態網站託管服務，
免費方案足夠 Angular SPA 使用，部署只需幾個指令。

---

## 前置條件

1. Angular 專案已建立並可正常執行
2. 已執行 `ng build` 產生 `dist/` 資料夾
3. 有 Google 帳號

---

## Step 1：安裝 Firebase CLI

```bash
npm install -g firebase-tools
```

驗證安裝：

```bash
firebase --version
```

---

## Step 2：登入 Firebase

```bash
firebase login
```

瀏覽器會開啟 Google 登入頁面，授權後回到終端機。

---

## Step 3：初始化 Firebase Hosting

在 **Angular 專案根目錄**執行：

```bash
firebase init hosting
```

依序回答問題：

```
? Please select an option:
  ❯ Create a new project        ← 第一次使用，建立新專案
    Use an existing project

? Project ID:
  my-angular-app-2024           ← 自訂，6-30 字元，之後無法修改
                                   這也是你的網址：my-angular-app-2024.web.app

? What do you want to use as your public directory?
  dist/<project-name>/browser   ← 輸入這個路徑（dist 資料夾下的 browser）

? Configure as a single-page app (rewrite all urls to /index.html)?
  Yes (y)                       ← 必須選 Y，否則重整頁面會 404

? Set up automatic builds and deploys with GitHub?
  No (N)                        ← 初學先選 N
```

完成後產生兩個檔案：

```
.firebaserc        ← 記錄綁定的 Firebase 專案
firebase.json      ← Hosting 設定（public 路徑、rewrites 等）
```

---

## Step 4：部署

每次更新後重新打包再部署：

```bash
# 先打包
ng build

# 再部署
firebase deploy
```

部署完成後看到：

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/my-angular-app-2024
Hosting URL:     https://my-angular-app-2024.web.app
```

打開 `Hosting URL` 就是你的線上網站 🎉

---

## firebase.json 內容說明

```json
{
  "hosting": {
    "public": "dist/<project-name>/browser",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

`rewrites`：把所有路徑都導向 `index.html`，這樣 Angular Router 才能正確運作。

---

## 常用指令速查

```bash
firebase login              # 登入
firebase init hosting       # 初始化（第一次）
firebase deploy             # 部署
firebase deploy --only hosting  # 只部署 Hosting（有其他服務時）
firebase serve              # 本機預覽（不需要 deploy）
firebase open hosting:site  # 在瀏覽器打開已部署的網站
```

---

## 部署流程圖

```
修改程式碼
    ↓
ng build（打包）
    ↓
firebase deploy（上傳 dist/ 到 Firebase）
    ↓
https://your-project.web.app（對外公開）
```
