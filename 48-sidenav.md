---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Sidenav
routeAlias: ch47
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
    Sidenav
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用側邊導覽列切換頁面，提升應用導覽體驗」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是 Sidenav？** — 側邊導覽元件的概念與應用場景
- **三種顯示模式** — `over`、`push`、`side` 的差異
- **HTML 結構** — `mat-drawer-container`、`mat-drawer` 基本語法
- **TypeScript 設定** — 匯入 `MatSidenavModule` 與 `MatListModule`
- **drawer.toggle() 控制** — 以按鈕開關側邊導覽

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Sidenav？
# What Is Sidenav?

---

# 什麼是 Sidenav？

`mat-sidenav`（滑出側邊導覽元件）是 Angular Material 提供的側邊欄元件，常用於頁面切換導覽功能。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**核心概念**

- 側邊導覽面板可顯示或隱藏
- 搭配按鈕觸發 `drawer.toggle()` 開關
- 導覽連結列於側邊，主內容在右側呈現

</div>
<div>

**常見應用場景**

- 後台管理介面左側選單
- 行動裝置的漢堡選單
- 多頁面應用的主要導覽結構

</div>
</div>

<div class="flex justify-center">
  <img src="/images/47-sidenav/sidenav-concept-overview.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 三種顯示模式
# Display Modes

---

# 三種顯示模式

`mat-drawer`（`mat-sidenav`）支援三種 `mode` 屬性值，控制側邊導覽與主內容的互動方式。

| 模式 | 說明 |
|---|---|
| `over`（預設） | Sidenav 漂浮在主要內容之上，主內容被半透明遮罩覆蓋 |
| `push` | Sidenav 將主要內容向右推開，並以遮罩覆蓋主內容 |
| `side` | Sidenav 與主要內容並排顯示，主內容寬度縮小以騰出空間 |

---

# 模式示意：over

`mode="over"` 時，側邊導覽展開後浮層覆蓋主內容，主內容區仍保持原始寬度。

<div class="flex justify-center">
  <img src="/images/47-sidenav/mode-over-demo.png" class="rounded shadow-md max-h-80" />
</div>

---

# 模式示意：push

`mode="push"` 時，側邊導覽展開後將主內容向右推移，並以遮罩覆蓋主內容。

<div class="flex justify-center">
  <img src="/images/47-sidenav/mode-push-demo.png" class="rounded shadow-md max-h-80" />
</div>

---

# 模式示意：side

`mode="side"` 時，側邊導覽與主內容並排顯示，主內容寬度自動縮減，不使用遮罩。

<div class="flex justify-center">
  <img src="/images/47-sidenav/mode-side-demo.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# HTML 結構
# HTML Structure

---

# HTML 結構 (一) — 容器與側邊導覽

使用 `mat-drawer-container` 將整個頁面包裹，側邊導覽內容寫在 `mat-drawer` 中，並以 `#drawer` 樣板變數供按鈕呼叫。

```html
<!-- 導覽最外層 -->
<mat-drawer-container class="example-container" autosize>

  <!-- 側導覽頁面 -->
  <mat-drawer #drawer class="example-sidenav" mode="side">
    <mat-list role="list">
      <mat-list-item role="listitem">頁面1</mat-list-item>
      <mat-list-item role="listitem">頁面2</mat-list-item>
      <mat-list-item role="listitem">頁面3</mat-list-item>
    </mat-list>
  </mat-drawer>
```

---

# HTML 結構 (二) — 主內容區與切換按鈕

主內容區寫在 `mat-drawer-container` 內的 `div` 中，使用 `drawer.toggle()` 控制側邊導覽的開關。

```html
  <!-- 導覽內容 -->
  <div class="example-sidenav-content">
    <div>
      <br>
      <h3>網頁內容</h3>
      <button type="button" (click)="drawer.toggle()">
        顯示sidenav
      </button>
    </div>
  </div>

</mat-drawer-container>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>drawer.toggle()</code> 透過樣板變數 <code>#drawer</code> 直接呼叫，無需在 TypeScript 另外定義方法。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# TypeScript 設定
# TypeScript Configuration

---

# TypeScript 設定 — 匯入所需模組

在元件的 TypeScript 檔中匯入 `MatSidenavModule` 與 `MatListModule`，並加入 `imports` 陣列。

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { }
```

---

# 完整使用流程

| 步驟 | 說明 |
|---|---|
| 1 | 在 `.ts` 中匯入 `MatSidenavModule`、`MatListModule` 並加入 `imports` |
| 2 | 在 HTML 以 `<mat-drawer-container>` 包裹整個版面 |
| 3 | 在 `<mat-drawer>` 中撰寫側邊導覽內容（導覽連結清單） |
| 4 | 設定 `mode` 屬性為 `over`、`push` 或 `side` |
| 5 | 在主內容區的按鈕綁定 `(click)="drawer.toggle()"` |
| 6 | 使用樣板變數 `#drawer` 讓按鈕直接控制 drawer |

---
layout: end
---

# 課程結束
### 使用 mat-sidenav 打造具備滑出側邊導覽的 Angular Material 應用程式
