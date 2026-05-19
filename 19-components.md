---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 新增組件
routeAlias: ch19
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
    新增組件
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「將畫面切割成可重複使用的積木」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **為什麼要用元件** — Component 的概念與價值
- **新增元件** — 使用 Angular CLI 產生組件
- **元件的四個檔案** — `.html`、`.scss`、`.spec.ts`、`.ts`
- **元件的 TypeScript 設定** — `@Component` 裝飾器
- **引用元件** — 在頁面中使用自訂組件
- **好用工具** — VS Code 快速修正
- **實作練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 為什麼要用元件
# Why Components?

---

# Component 是什麼？

Component（元件）是 Angular 的核心構建單位，代表畫面上一個獨立的區塊。

| 特性 | 說明 |
| --- | --- |
| 組合性 | 一個畫面可由多個 Component 共同組成 |
| 可重複使用 | 相同元件可在不同頁面多次使用 |
| 獨立性 | 每個元件有自己的 HTML、CSS、TypeScript |
| 維護性 | 修改某元件不影響其他元件 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>傳統 vs 元件化：</b> 傳統開發以整個網頁為單位寫程式；元件化開發將畫面拆成多個小積木，更易維護與擴充。
</div>

---

# 畫面拆分範例

一個後台畫面可以依功能切割成多個獨立的 Component：

<div class="flex justify-center mt-2">
  <img src="/images/19-components/component-layout.png" class="rounded shadow-md object-contain" style="width: 85%; max-height: 58vh;" />
</div>

---

# 畫面拆分範例 — 各區塊說明

| 區塊 | 說明 |
| --- | --- |
| Header（頁首） | 網站 Logo、導覽列、使用者資訊 |
| Sidebar（側邊欄） | 選單、功能連結 |
| Content（主內容） | 當前頁面的核心資料 |
| Footer（頁尾） | 版權資訊、連結 |
| 共用元件 | 按鈕、卡片、彈窗等可重複使用的 UI 單元 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>提示：</b> 每個大區塊內部還可以繼續往下拆成更小的子元件，拆分的粒度取決於重複使用的需求。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 新增元件
# Generate a Component

---

# 使用 Angular CLI 新增元件

打開命令提示字元 / 終端機，切換至專案根目錄後執行以下指令：

| 指令 | 說明 |
| --- | --- |
| `ng generate component 資料夾/組件名稱` | 完整寫法 |
| `ng g c 資料夾/組件名稱` | 縮寫（效果相同） |

```bash
# 在 components 資料夾下新增 header 元件
ng g c components/header
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>建議：</b> 將元件放入 <code>components</code> 資料夾做統一管理。若資料夾不存在，Angular CLI 會自動幫你建立。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 元件的四個檔案
# Component Files

---

# 新增元件後產生的檔案

執行 `ng g c` 後，Angular CLI 會自動產生四個檔案：

| 檔案 | 說明 |
| --- | --- |
| `組件名稱.component.html` | 放置 HTML 模板的地方 |
| `組件名稱.component.scss` | 放置元件專屬樣式（CSS/SCSS）的地方 |
| `組件名稱.component.spec.ts` | 放置測試程式碼的地方 |
| `組件名稱.component.ts` | 放置 TypeScript 程式碼（元件邏輯）的地方 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 每次執行 <code>ng g c</code> 前，建議先將已開啟的 <code>ng serve</code> 關閉，再新增元件，避免衝突。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 元件的 TypeScript 設定
# @Component Decorator

---

# @Component 裝飾器

開啟 `.component.ts` 檔，可以看到 Angular 的核心設定：

| 屬性 | 說明 |
| --- | --- |
| `selector` | 元件的標籤名稱，在 HTML 中以此名稱使用 |
| `templateUrl` | 指定此元件使用的 HTML 檔案路徑 |
| `styleUrl` | 指定此元件使用的 SCSS 檔案路徑 |

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}
```

---

# Selector 的使用方式

`selector` 定義了元件的「標籤名稱」，讓你可以在其他 HTML 模板中像使用原生 HTML 標籤一樣使用此元件。

| 設定值 | 在 HTML 中的用法 |
| --- | --- |
| `selector: 'app-header'` | `<app-header></app-header>` |
| `selector: 'app-sidebar'` | `<app-sidebar></app-sidebar>` |
| `selector: 'app-footer'` | `<app-footer></app-footer>` |

```html
<!-- app.component.html -->
<app-header></app-header>
<app-sidebar></app-sidebar>
<app-footer></app-footer>
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 引用元件
# Using Components

---

# 如何在頁面中引用元件

要在某個頁面使用新增的元件，需要完成兩個步驟：

| 步驟 | 操作 | 位置 |
| --- | --- | --- |
| 1 | 在 `.ts` 檔中 `import` 元件類別 | `app.component.ts` |
| 2 | 在 `.html` 中使用元件標籤 | `app.component.html` |

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

---

# 引用元件 — 在 HTML 中使用

完成 import 後，即可在 HTML 模板中使用元件標籤：

```html
<!-- app.component.html -->
<app-header></app-header>
<main>
  <p>主要內容區域</p>
</main>
<app-footer></app-footer>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>流程：</b> 先查看元件 <code>.ts</code> 中的 <code>selector</code> 名稱 → 在目標 <code>.ts</code> 的 <code>imports</code> 加入元件類別 → 在目標 <code>.html</code> 用標籤名稱呼叫元件。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 好用工具
# VS Code Quick Fix

---

# VS Code 快速修正（Quick Fix）

當你在 HTML 中輸入元件標籤但尚未 import 時，VS Code 會顯示紅色底線並提示快速修正：

| 步驟 | 操作 |
| --- | --- |
| 1 | 在 HTML 中輸入元件標籤（如 `<app-header>`） |
| 2 | 注意紅色底線（系統不認識此標籤） |
| 3 | 點擊標籤名稱，注意畫面右邊出現的**藍色燈泡** |
| 4 | 點擊燈泡 → 選擇「快速修正」 |
| 5 | VS Code 自動將對應 import 加入 `.ts` 檔案 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>前提：</b> 元件標籤名稱必須正確（與 <code>selector</code> 一致），VS Code 才能找到對應的元件進行自動匯入。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

---
layout: two-cols
---

# 練習：新增兩個組件
### 任務說明

1. 使用 Angular CLI 在 `components` 資料夾下新增兩個元件
2. 分別為 `header` 與 `footer`（或自訂名稱）
3. 在各元件的 HTML 中加入一些辨識文字（例如「這是 Header」）
4. 將兩個元件引入 `app.component.ts` 的 `imports` 中
5. 在 `app.component.html` 中使用這兩個元件標籤，讓畫面同時顯示兩個元件

::right::

<div class="flex items-center justify-center h-full ml-4">
  <img src="/images/19-components/practice.png" class="rounded shadow-md w-full object-contain" style="max-height: 70vh;" />
</div>

---
layout: default
---

# 練習：解題提示
### 提示說明

1. 新增元件：`ng g c components/header` 與 `ng g c components/footer`
2. 編輯各元件 HTML，加入識別文字
3. 在 `app.component.ts` 加入 import：

```typescript
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
})
export class AppComponent {}
```

4. 在 `app.component.html` 使用：`<app-header>` 與 `<app-footer>`

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>小技巧：</b> 也可以在 HTML 先打好標籤，再用 VS Code 藍色燈泡快速自動 import。
</div>

---
layout: end
---

# 課程結束
### 用元件切割畫面，讓程式更易維護與重用
