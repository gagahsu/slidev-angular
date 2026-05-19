---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 路由
routeAlias: ch21
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
    路由
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「不換頁，只換畫面」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是 Routing？** — SPA 與傳統瀏覽流程差異
- **設定路由** — app.routes.ts 與 app.config.ts
- **定義路線** — path、component、錯誤頁、重新導向、嵌套路由
- **HTML 導航** — RouterOutlet、RouterLink、RouterLinkActive
- **TS 導航** — 注入 Router 程式切換
- **網址帶值** — Route Params 與 Query Params
- **實作練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是路由？
# What is Routing?

---

# 傳統瀏覽器流程

當使用者輸入 URL 並按確認，瀏覽器會依以下流程取得新頁面：

| 步驟 | 說明 |
| --- | --- |
| 1. URL | 使用者輸入網址 |
| 2. HTTP | 瀏覽器向服務端發送 HTTP 請求 |
| 3. HTML | 服務端回傳 HTML 格式內容 |
| 4. Render | 瀏覽器渲染出畫面 |

每次換頁都需要向伺服器請求新的 HTML，整頁重新載入。

---

# 什麼是 Routing？

在**單頁應用程式（SPA）**中，不再向伺服器請求新頁面，而是透過顯示或隱藏特定元件來改變使用者所見的內容。

| 傳統網站 | SPA（Angular） |
| --- | --- |
| 每次換頁都向伺服器請求 HTML | 只載入一次 HTML，透過 JS 切換畫面 |
| 整頁重新載入，速度較慢 | 只更換元件，速度較快 |
| URL 改變 → 完整頁面重載 | URL 改變 → 元件切換，畫面局部更新 |

Angular Router 透過**解讀瀏覽器 URL** 來決定顯示哪個元件。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 設定路由
# Setup Routing

---

# 如何使用 Routing？

建立專案後，新增兩個元件 `first` 與 `second`：

```bash
ng new my-app --routing
ng g c first
ng g c second
```

接著到 `app.routes.ts` 匯入這兩個元件，準備定義路線：

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

export const routes: Routes = [];
```

---

# 確認 app.config.ts

確認路由是否正確載入：打開 `app.config.ts`，確認 `routes` 有被加入 `provideRouter()` 中。

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 Angular CLI 建立專案時會自動設定好，若是手動新增路由才需要自行處理。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 定義路線
# Define Routes

---

# 定義基本路線

路由設定由三個基礎建構組成：

| 步驟 | 說明 |
| --- | --- |
| 1. 設定路線陣列 | Angular CLI 建立專案時已自動新增 |
| 2. 在陣列中定義路線 | 設定 `path` 與對應的 `component` |
| 3. 將路線加入程式中 | 在 HTML 或 TS 中使用路由導航 |

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'first',  component: FirstComponent },
  { path: 'second', component: SecondComponent },
];
```

---

# 錯誤頁面（404）

當 URL 不符合任何已定義路徑時，顯示錯誤頁面。使用萬用字元 `**` 作為路徑。

```typescript
// app.routes.ts
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'first',  component: FirstComponent },
  { path: 'second', component: SecondComponent },
  { path: '**',     component: NotFoundComponent }, // 必須放最後
];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> <code>**</code> 必須寫在陣列<b>最下面</b>，否則上面的路線將無法正常顯示。
</div>

---

# 設定重新導向

讓特定 URL 自動跳轉到另一個頁面，使用 `redirectTo` + `pathMatch`。

| `pathMatch` 值 | 說明 | 範例 |
| --- | --- | --- |
| `'full'` | URL 需與 `path` 完全一致才導向 | `path: ''` 只匹配根路徑 |
| `'prefix'` | URL 以 `path` 開頭就導向 | `path: 'bbb'` 匹配 `/bbb/aaa` |

```typescript
export const routes: Routes = [
  { path: '',     redirectTo: '/first', pathMatch: 'full' },
  { path: 'first',  component: FirstComponent },
  { path: 'second', component: SecondComponent },
  { path: '**',     component: NotFoundComponent },
];
```

---

# 嵌套路由（子路由）

想在某個元件內部再有下一層路由（例如 根元件 → first → child-a），使用 `children` 定義子路由。

```typescript
// app.routes.ts
import { ChildAComponent } from './first/child-a/child-a.component';

export const routes: Routes = [
  {
    path: 'first',
    component: FirstComponent,
    children: [
      { path: 'child-a', component: ChildAComponent }
    ]
  },
  { path: 'second', component: SecondComponent },
];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 子路由的 <code>&lt;router-outlet&gt;</code> 要放在父元件（FirstComponent）的 HTML 中。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 頁面導航
# Navigation

---

# HTML 導航 — 匯入三個模組

使用 HTML 進行頁面導航前，需將以下三個模組加入元件的 `imports`：

| 模組 | 功能 |
| --- | --- |
| `RouterOutlet` | 在 HTML 中使用 `<router-outlet>` 顯示路由內容 |
| `RouterLink` | 在 HTML 中使用 `routerLink` 設定導航路徑 |
| `RouterLinkActive` | 在 HTML 中使用 `routerLinkActive` 設定當前頁 CSS |

```typescript
// app.component.ts
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {}
```

---

# RouterOutlet

`<router-outlet>` 是路由的**顯示容器**，切換頁面時，對應元件的內容會渲染在此標籤的位置。

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/first">第一頁</a>
  <a routerLink="/second">第二頁</a>
</nav>

<!-- 路由元件渲染在這裡 -->
<router-outlet></router-outlet>
```

---

# RouterLink

`routerLink` 屬性指定要切換的路由路徑，可用於任何 HTML 標籤（`<a>`、`<button>`、`<h1>` 等）。

```html
<!-- 使用 <a> 超連結 -->
<a routerLink="/first">前往第一頁</a>

<!-- 使用 <button> 按鈕 -->
<button routerLink="/second">前往第二頁</button>

<!-- 動態路徑：用 [routerLink] 搭配變數 -->
<a [routerLink]="['/first', userId]">查看使用者</a>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 建議根據操作邏輯選擇標籤，導覽連結用 <code>&lt;a&gt;</code>，觸發動作用 <code>&lt;button&gt;</code>。
</div>

---

# RouterLinkActive

當目前 URL 與 `routerLink` 路徑相符時，自動套用指定的 CSS class。需與 `routerLink` 搭配使用。

```html
<a routerLink="/first"  routerLinkActive="active-link">第一頁</a>
<a routerLink="/second" routerLinkActive="active-link">第二頁</a>

<router-outlet></router-outlet>
```

```css
/* 當前頁面連結的樣式 */
.active-link {
  color: #5eada0;
  font-weight: bold;
  border-bottom: 2px solid #5eada0;
}
```

---

# TS 導航 — 注入 Router

當換頁需要依據邏輯判斷（例如登入後跳轉），使用 TypeScript 程式導航。首先注入 `Router`：

```typescript
// app.component.ts
import { Router } from '@angular/router';

@Component({ standalone: true, imports: [RouterOutlet] })
export class AppComponent {
  constructor(private router: Router) {}

  goToFirst() {
    this.router.navigate(['/first']);
  }
}
```

---

# TS 導航 — 切換頁面

注入 Router 後，使用 `this.router.navigate()` 或 `navigateByUrl()` 切換頁面。

| 方法 | 語法 | 說明 |
| --- | --- | --- |
| `navigate()` | `this.router.navigate(['/path'])` | 使用陣列傳入路徑 |
| `navigateByUrl()` | `this.router.navigateByUrl('/path')` | 直接傳入字串路徑 |

```typescript
// 兩種寫法效果相同
this.router.navigate(['/second']);
this.router.navigateByUrl('/second');
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 網址帶值
# Route Parameters

---

# 網址帶值 — 兩種方式

切換頁面時可將資料塞入網址，另一頁再從網址取出，適合傳遞簡單值（如 ID、使用者名稱）。

| 方式 | 範例網址 | 說明 |
| --- | --- | --- |
| Route Params | `/list/Allen` | 在 router.ts 設定 `/:name` |
| Query Params | `/list?name=Allen` | 網址後直接加 `?key=value` |

兩種方式都不需透過 Service 傳遞，但不適合傳遞大量或複雜的資料。

---

# Route Params — 設定路由

在 `app.routes.ts` 的路徑後面加上 `/:參數名稱`，可帶多個參數。

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'list',        component: ListComponent },      // 不帶值
  { path: 'list/:name',  component: ListComponent },      // 帶一個值
  { path: 'list/:name/:age', component: ListComponent },  // 帶多個值
];
```

導航時在路徑後帶上值：

```typescript
// 導航到 /list/Allen
this.router.navigate(['/list', 'Allen']);
```

---

# Route Params — 取值

在目標元件中注入 `ActivatedRoute`，使用 `snapshot.paramMap.get()` 取出值。

```typescript
// list.component.ts
import { ActivatedRoute } from '@angular/router';

export class ListComponent {
  name: string | null = '';

  constructor(private route: ActivatedRoute) {
    this.name = this.route.snapshot.paramMap.get('name');
  }
}
```

```html
<p>使用者名稱：{{ name }}</p>
```

---

# Query Params — URL 寫法

不需修改 `app.routes.ts`，直接在網址後加上 `?key=value`，多個值用 `&` 分隔。

```typescript
// 導航到 /list?name=Allen&age=12
this.router.navigate(['/list'], {
  queryParams: { name: 'Allen', age: 12 }
});
```

```html
<!-- routerLink 寫法 -->
<a [routerLink]="['/list']" [queryParams]="{ name: 'Allen' }">前往</a>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> Query Params 取出的值皆為 <code>string</code> 型別，使用時需自行轉換型別。
</div>

---

# Query Params — 取值 + 比較

一樣注入 `ActivatedRoute`，但改用 `snapshot.queryParamMap.get()` 取值。

```typescript
// list.component.ts
constructor(private route: ActivatedRoute) {
  const name = this.route.snapshot.queryParamMap.get('name');
  const age  = this.route.snapshot.queryParamMap.get('age');
}
```

| 比較項目 | Route Params | Query Params |
| --- | --- | --- |
| 需修改 router.ts | ✅ 是 | ❌ 否 |
| 網址格式 | `/list/Allen` | `/list?name=Allen` |
| 取值方法 | `paramMap.get()` | `queryParamMap.get()` |
| 值的型別 | string | string |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

---
layout: two-cols
---

# 練習：基本路由
### 任務說明

1. 新增 `first`、`second` 兩個元件
2. 在 `app.routes.ts` 定義兩條路線
3. 在根元件 HTML 加入導航按鈕
4. 加入 `<router-outlet>` 顯示內容
5. 設定根路徑重新導向至 `/first`

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/21-routing/practice-basic.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: default
---

# 練習：基本路由 解題提示
### 提示說明

1. 匯入 `RouterOutlet`、`RouterLink`、`RouterLinkActive` 到根元件
2. `app.routes.ts` 中加入：
   - `{ path: 'first', component: FirstComponent }`
   - `{ path: 'second', component: SecondComponent }`
   - `{ path: '', redirectTo: '/first', pathMatch: 'full' }`
3. HTML 中按鈕加上 `routerLink="/first"` 和 `routerLink="/second"`
4. HTML 中加入 `<router-outlet></router-outlet>`

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 記得在 <code>app.component.ts</code> 的 <code>imports</code> 加入這三個 Router 模組。
</div>

---
layout: two-cols
---

# 進階練習：子路由
### 任務說明

1. 在 `first` 下新增子元件 `child-a`
2. 在 `app.routes.ts` 設定子路由
3. 在 `first.component.html` 加入 `<router-outlet>`
4. 加入導航按鈕切換到子路由頁面
5. 子路由頁面顯示自訂內容

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/21-routing/practice-advanced.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: default
---

# 進階練習：子路由 解題提示
### 提示說明

1. 建立子元件：`ng g c first/child-a`
2. `app.routes.ts` 修改 first 路線：
   ```typescript
   { path: 'first', component: FirstComponent,
     children: [{ path: 'child-a', component: ChildAComponent }] }
   ```
3. 在 `first.component.html` 中加入 `<router-outlet>`（顯示子路由）
4. 導航用 `routerLink="/first/child-a"` 完整路徑

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 子路由的 <code>&lt;router-outlet&gt;</code> 放在<b>父元件</b>的 HTML 中，不是根元件。
</div>

---
layout: end
---

# 課程結束
### 掌握路由，打造多頁面的 SPA 應用
