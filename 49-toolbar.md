---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Toolbar
routeAlias: ch49
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
    Toolbar
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「使用 mat-toolbar 打造應用程式頂部導覽列」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是 Toolbar？** — 工具列的用途與常見應用場景
- **基本 HTML 結構** — 使用 `<mat-toolbar>` 包裹內容
- **Spacer 排版技巧** — 以 CSS flex 將按鈕推至右側
- **引入必要模組** — 在 TypeScript 中 import 所需 Material 模組

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Toolbar？
# What Is a Toolbar?

---

# 什麼是 Toolbar？

Toolbar（工具列）通常置於網頁頂部，用於顯示標題或功能按鈕（如登入／登出、開啟側邊導覽列）。

Angular Material 提供 `<mat-toolbar>` 元件，可快速建立符合 Material Design 規範的頂部工具列。

<div class="flex justify-center my-4">
  <img src="/images/48-toolbar/toolbar-preview.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 基本 HTML 結構
# Basic HTML Structure

---

# 基本 HTML 結構 — mat-toolbar 範本

將工具列內容包裹於 `<mat-toolbar>` 中。預設情況下，所有子元素會排列在右側，需透過 Spacer 調整版面。

```html
<mat-toolbar>
  <button mat-icon-button>
    <mat-icon>menu</mat-icon>
  </button>
  <span>My App</span>
  <span class="example-spacer"></span>
  <button mat-icon-button class="example-icon favorite-icon">
    <mat-icon>favorite</mat-icon>
  </button>
  <button mat-icon-button>
    <mat-icon>share</mat-icon>
  </button>
</mat-toolbar>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 若未加入 Spacer，工具列中的所有內容會集中於右側，版面無法正確對齊。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Spacer 排版技巧
# Spacer Layout Technique

---

# Spacer 排版技巧 — flex 推移按鈕

在 HTML 中放置一個空的 `<span class="example-spacer"></span>`，再於 CSS 中設定其 flex 屬性，即可將後續按鈕推至工具列右側。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**HTML**

```html
<span class="example-spacer"></span>
```

</div>
<div>

**CSS**

```css
.example-spacer {
  flex: 1 1 auto;
}
```

</div>
</div>

`flex: 1 1 auto` 等同於同時設定：

- `flex-grow: 1` — 佔滿剩餘空間
- `flex-shrink: 1` — 可隨容器縮小
- `flex-basis: auto` — 初始大小依內容決定

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> Spacer 的作用是佔滿標題與右側按鈕之間的空間，使右側按鈕靠右對齊。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 引入必要模組
# Importing Required Modules

---

# 引入必要模組 — TypeScript 設定

使用 `<mat-toolbar>`、`<mat-icon>` 與 `mat-icon-button` 時，需在元件的 `imports` 陣列中加入對應模組。

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
```

---

# 模組對應表

| 模組 | 套件路徑 | 對應元件／指令 |
|------|----------|----------------|
| `MatToolbarModule` | `@angular/material/toolbar` | `<mat-toolbar>` |
| `MatIconModule` | `@angular/material/icon` | `<mat-icon>` |
| `MatButtonModule` | `@angular/material/button` | `mat-icon-button` 指令 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>提示：</b> 缺少任一模組時，編輯器會顯示紅色錯誤提示；將模組加入 <code>imports</code> 後錯誤即會消失。
</div>

---

# 完整使用流程

| 步驟 | 說明 |
|------|------|
| 1 | 在 HTML 加入 `<mat-toolbar>` 並於其中放置標題與圖示按鈕 |
| 2 | 插入空的 `<span class="example-spacer"></span>` 以區隔左右內容 |
| 3 | 在 CSS 設定 `.example-spacer { flex: 1 1 auto; }` |
| 4 | 在 .ts 中 import `MatToolbarModule`、`MatIconModule`、`MatButtonModule` |
| 5 | 將三個模組加入元件的 `imports` 陣列 |

---
layout: end
---

# 課程結束
### 善用 mat-toolbar 與 Spacer 技巧，打造整齊美觀的 Angular 頂部導覽列
