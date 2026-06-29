---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Tabs
routeAlias: ch40
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
    Tabs
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用索引標籤在同一頁面切換多個視圖」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是 Tabs？** — 索引標籤的概念與應用場景
- **mat-tab-group 基本用法** — 靜態內容頁籤
- **mat-tab-nav-bar 導覽列用法** — 與路由整合的動態頁籤
- **TypeScript 設定** — 匯入模組、定義 links 與 activeLink
- **HTML 完整整合** — 綁定路由與 active 狀態
- **完成畫面展示** — 頁籤切換成功

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Tabs？
# What Are Tabs?

---
layout: two-cols
---

# 什麼是 Tabs？

Tabs（索引標籤）是一種常見的 UI 元件，廣泛應用於網頁導覽、設定介面和表單中。

**核心概念**

- 在同一頁面中切換多個視圖
- 同一時間只顯示一個頁籤的內容
- 使用者點擊標籤標題來切換

**常見應用場景**

- 網頁導覽列 / 設定介面分類
- 表單多步驟切換 / 儀表板資料視圖

::right::

<div class="flex items-center justify-center h-full">
  <img src="/images/39-tabs/tabs-concept-overview.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-tab-group 基本用法
# Basic Tab Group

---

# mat-tab-group — 官方範例

Angular Material 的 `mat-tab-group` 提供靜態頁籤切換，畫面有 First、Second、Third 三個頁籤。

<div class="flex justify-center">
  <img src="/images/39-tabs/mat-tab-group-basic-demo.png" class="rounded shadow-md max-h-80" />
</div>

參考：**https://material.angular.io/components/tabs/overview**

---

# mat-tab-group — HTML 語法

使用 `<mat-tab-group>` 包裹多個 `<mat-tab>`，`label` 屬性設定頁籤名稱，標籤內容直接寫在標籤內部。

```html
<mat-tab-group>
  <mat-tab label="First"> Content 1 </mat-tab>
  <mat-tab label="Second"> Content 2 </mat-tab>
  <mat-tab label="Third"> Content 3 </mat-tab>
</mat-tab-group>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 此寫法適合頁籤內容為純文字的靜態情境。若需與路由整合，應改用 <code>mat-tab-nav-bar</code>。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-tab-nav-bar 導覽列用法
# Tab Nav Bar with Router

---

# mat-tab-nav-bar — 概念說明

`mat-tab-nav-bar` 是與路由整合的頁籤導覽列，適合多頁路由切換場景。

| 元件／指令 | 說明 |
|---|---|
| `mat-tab-nav-bar` | 頁籤導覽列容器，套用 Material 樣式 |
| `[tabPanel]` | 綁定對應的 `<mat-tab-nav-panel>` |
| `mat-tab-link` | 每個頁籤連結，套用 Material 樣式 |
| `[active]` | 判斷此連結是否為當前作用中頁籤 |
| `[routerLink]` | 綁定路由路徑 |
| `mat-tab-nav-panel` | 頁籤內容顯示區，搭配 `#tabPanel` 樣板變數 |

---

# mat-tab-nav-bar — HTML 結構 (一)

基本導覽列結構：`<nav>` 內透過 `@for` 迴圈產生頁籤連結，並搭配一個停用的 `Disabled Link`。

```html
<nav mat-tab-nav-bar [tabPanel]="tabPanel">
  @for (link of links; track link) {
    <a mat-tab-link
       (click)="activeLink = link"
       [active]="activeLink == link"> {{link}} </a>
  }
  <a mat-tab-link disabled>Disabled Link</a>
</nav>
<mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> <code>@for</code> 迴圈依據 TypeScript 中定義的 <code>links</code> 陣列產生對應數量的頁籤。若 TS 尚未定義 <code>links</code>，程式會報錯。
</div>

---

# mat-tab-nav-bar — HTML 結構 (二)

整合路由後，`[routerLink]` 綁定路徑，`[active]` 比對 `link.name`，`<router-outlet>` 顯示對應路由內容。

```html
<nav mat-tab-nav-bar [tabPanel]="tabPanel">
  @for (link of links; track link) {
    <a mat-tab-link
       (click)="activeLink = link.name"
       [routerLink]="link.path"
       [active]="activeLink == link.name"> {{link.name}} </a>
  }
  <a mat-tab-link disabled>Disabled Link</a>
</nav>
<mat-tab-nav-panel #tabPanel>
  <router-outlet></router-outlet>
</mat-tab-nav-panel>
```

---

# mat-tab-nav-bar — 屬性說明

| 屬性／事件 | 位置 | 說明 |
|---|---|---|
| `mat-tab-nav-bar` | `<nav>` | 套用 Material 頁籤導覽列樣式 |
| `[tabPanel]="tabPanel"` | `<nav>` | 將導覽列與下方面板做綁定 |
| `mat-tab-link` | `<a>` | 套用 Material 頁籤連結樣式 |
| `(click)="activeLink = link.name"` | `<a>` | 點擊後更新 activeLink |
| `[routerLink]="link.path"` | `<a>` | 導向對應的路由路徑 |
| `[active]="activeLink == link.name"` | `<a>` | 判斷是否為作用中頁籤，成立時顯示底線 |
| `disabled` | `<a>` | 停用此頁籤連結 |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# TypeScript 設定
# TypeScript Configuration

---

# 步驟一：匯入 MatTabsModule

在元件的 TypeScript 檔中匯入 `MatTabsModule` 並加入 `imports` 陣列。

```typescript
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // 下一步定義 links 與 activeLink
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 若使用 <code>[routerLink]</code>，需同時匯入 <code>RouterLink</code>；使用 <code>&lt;router-outlet&gt;</code> 則需匯入 <code>RouterOutlet</code>。
</div>

---

# 步驟二：定義 links 與 activeLink

在元件類別中定義頁籤資料陣列 `links` 與目前作用中頁籤 `activeLink`。

```typescript
links = [
  { path: '/test',  name: 'TEST'  },
  { path: '/test2', name: 'TEST2' },
  { path: '/test3', name: 'TEST3' }
];

activeLink = this.links[0].name;
```

- `links`：每個物件包含路由路徑 `path` 與顯示名稱 `name`
- `activeLink`：初始值設為第一個頁籤的名稱
- 路由設定（`app.routes.ts`）需有對應的路由才能正常切換

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>activeLink</code> 與 HTML 中 <code>[active]="activeLink == link.name"</code> 的比對邏輯需一致，才能正確顯示底線。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 完成畫面展示
# Final Result

---

# 完成畫面

整合路由後，頁籤切換正常，點擊不同頁籤會導向對應路由，作用中頁籤顯示藍色底線，停用頁籤呈灰色。

<div class="flex justify-center">
  <img src="/images/39-tabs/mat-tab-nav-bar-final-result.png" class="rounded shadow-md max-h-80" />
</div>

---

# mat-tabs 完整使用流程

| 步驟 | 說明 |
|---|---|
| 1 | 在 `.ts` 中 `import { MatTabsModule }` 並加入 `imports` |
| 2 | 同時匯入 `RouterLink`、`RouterOutlet` |
| 3 | 定義 `links` 陣列（含 `path` 與 `name`）及 `activeLink` 初始值 |
| 4 | 在 HTML 使用 `<nav mat-tab-nav-bar>` + `@for` 迴圈產生 `<a mat-tab-link>` |
| 5 | 綁定 `[routerLink]`、`(click)`、`[active]` 屬性 |
| 6 | 在 `<mat-tab-nav-panel>` 內放置 `<router-outlet>` |
| 7 | 確認 `app.routes.ts` 有對應路由設定 |

---
layout: end
---

# 課程結束
### 使用 mat-tabs 與路由整合，打造流暢的多頁籤導覽體驗
