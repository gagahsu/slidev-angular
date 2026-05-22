# 第05章：安裝 / 新建 Angular 專案

## 安裝順序（重要！必須依序來）

```
① 安裝 NVM  →  ② 用 NVM 安裝 Node.js  →  ③ 安裝 Angular CLI
```

---

## 步驟一：安裝 NVM（版本管理工具）

NVM = Node Version Manager，讓你可以在同一台電腦上安裝多個 Node.js 版本，
不同專案可以切換不同版本，不會互相干擾。

**Windows 使用者：**
下載 `nvm-setup.exe`（請參考投影片的安裝連結）

**macOS 使用者（終端機輸入）：**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```

---

## 步驟二：用 NVM 安裝 Node.js

打開終端機，輸入以下指令：

```bash
# 安裝 Node.js 的 LTS（長期支援）版本
# LTS = Long Term Support，代表這個版本比較穩定，適合正式開發
nvm install --lts

# 確認安裝成功
node -v
# 預期輸出：v20.xx.x 或更新版本

npm -v
# 預期輸出：10.x.x 或更新版本
```

---

## 步驟三：安裝 Angular CLI

Angular CLI（命令列工具）讓你可以用指令快速建立 Angular 專案。

```bash
# -g 代表「全域安裝」（global），這樣不管在哪個資料夾都能使用 ng 指令
npm install -g @angular/cli

# 確認安裝成功
ng version
```

---

## 步驟四：建立新的 Angular 專案

```bash
# ng new 指令 + 你的專案名稱
ng new my-first-app

# 過程中會問你幾個問題：
# ? Which stylesheet format would you like to use? → 選 CSS
# ? Do you want to enable Server-Side Rendering (SSR)? → 輸入 N（不需要）
```

---

## 步驟五：啟動開發伺服器

```bash
# 先進入你的專案資料夾
cd my-first-app

# 啟動開發伺服器
ng serve

# 啟動後打開瀏覽器，前往 http://localhost:4200
# 你就能看到 Angular 的預設歡迎頁面了！
```

---

## 常用 Angular CLI 指令

| 指令 | 說明 |
|------|------|
| `ng new 專案名` | 建立新的 Angular 專案 |
| `ng serve` | 啟動開發伺服器（即時預覽修改） |
| `ng build` | 打包專案（準備部署用） |
| `ng generate component 元件名` | 新增一個元件（縮寫：`ng g c 元件名`） |
| `ng generate service 服務名` | 新增一個服務 |
