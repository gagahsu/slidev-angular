---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 安裝 Angular Material
routeAlias: ch32
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
    安裝 Angular Material
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用 ng add 一鍵安裝功能豐富的 Material UI 元件庫」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是 Angular Material** — 內建模組與樣式的 UI 元件庫
- **執行安裝指令** — 使用 `ng add @angular/material`
- **選擇主題（配色）** — Azure/Blue、Rose/Red、Magenta/Violet、Cyan/Orange、Custom
- **設定排版樣式** — 是否套用全域 Angular Material typography
- **選擇動畫模組** — Include and enable / disable / Do not include
- **安裝完成** — 自動更新的專案檔案一覽

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Angular Material？
# What is Angular Material?

---

# 安裝 @angular/material

Angular Material 是 Google 官方提供的 UI 元件庫，內建豐富的元件與樣式，**mat-icon** 即為其中之一。

安裝前請先停止開發伺服器，並在專案根目錄下執行：

```bash
ng add @angular/material
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 執行指令前請先關閉開發伺服器（Ctrl+C），並確認終端機的工作目錄在專案根目錄下。
</div>

---

# 安裝 @angular/material
### 執行安裝指令

執行後 Angular CLI 會下載套件，並依序詢問幾個設定選項。

```bash
ng add @angular/material
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 選擇主題（配色）
# Choose a Theme

---

# 安裝 @angular/material
### 步驟一：選擇主題

CLI 詢問要使用哪種內建主題，若不使用預設主題可選 **Custom**。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

- **Azure/Blue** — 藍色系
- **Rose/Red** — 紅色系
- **Magenta/Violet** — 紫色系

</div>
<div>

- **Cyan/Orange** — 青橙色系
- **Custom** — 自訂主題

</div>
</div>

<div class="flex justify-center">
  <img src="/images/31-angular-material/theme-selector.png" class="rounded shadow-md max-h-52" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 設定全域排版樣式
# Global Typography Styles

---

# 安裝 @angular/material
### 步驟二：設定全域排版樣式

CLI 詢問是否套用全域 Angular Material 排版樣式，建議選 **N**，避免覆蓋專案現有的 CSS 設定。

```bash
? Set up global Angular Material typography styles? (y/N) N
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 選擇動畫模組
# Angular Animations Module

---

# 安裝 @angular/material
### 步驟三：選擇動畫模組

CLI 詢問是否引入 Angular 動畫模組，依開發需求選擇後即開始安裝。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

- **Include and enable animations** — 引入並啟用動畫（預設）
- **Include, but disable animations** — 引入但停用動畫

</div>
<div>

- **Do not include** — 不引入動畫模組

</div>
</div>

<div class="flex justify-center">
  <img src="/images/31-angular-material/animations-prompt.png" class="rounded shadow-md max-h-52" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝完成
# Installation Complete

---
layout: two-cols
---

# 安裝 @angular/material
### 安裝完成 — 自動更新的檔案

安裝完成後，Angular CLI 會自動更新以下專案檔案：

- `package.json` — 新增 @angular/material 相依套件
- `src/app/app.config.ts` — 加入 Material 設定
- `angular.json` — 加入主題 CSS 樣式路徑
- `src/index.html` — 加入 Google Fonts 字型連結
- `src/styles.scss` — 加入主題樣式匯入

::right::

```bash
UPDATE package.json (1105 bytes)
✔ Packages installed successfully.
UPDATE src/app/app.config.ts (421 bytes)
UPDATE angular.json (2892 bytes)
UPDATE src/index.html (491 bytes)
UPDATE src/styles.scss (181 bytes)
```

---
layout: end
---

# 課程結束
### Angular Material 安裝完成，即可開始使用豐富的 UI 元件
