---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Loading
routeAlias: ch46
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
    Loading
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用載入動畫告知使用者系統正在處理，提升操作體驗」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **為什麼需要 Loading 動畫**
- **mat-spinner 元件介紹**
- **安裝與基本用法**
- **CSS 定位：置中與全螢幕遮罩**
- **LoadingService：以 RxJS 控制顯示狀態**
- **AppComponent 整合：單一入口統一管理**
- **async pipe 搭配 Observable**
- **在各頁面觸發 show() / hide()**
- **客製化顏色與大小**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 為什麼需要 Loading 動畫
## Why Loading Matters

---

# 問題：等待 API 回傳時的使用者體驗

串接 API 後，若回傳需要較長時間而畫面毫無回應，使用者可能誤判網頁已損壞，進而重新整理或重複點擊按鈕。

<div class="flex justify-center">
  <img src="/images/45-loading/loading-spinner-preview.png" class="rounded shadow-md max-h-80" />
</div>

**解決方案：** 在資料回傳前顯示載入動畫，資料就緒後隱藏。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-spinner
## Angular Material Progress Spinner

---

# mat-spinner 簡介

Angular Material 提供內建的載入動畫元件 `mat-spinner`（即 `MatProgressSpinnerModule`）。

使用前需先安裝 Angular Material：

```bash
ng add @angular/material
```

<div class="flex justify-center">
  <img src="/images/45-loading/mat-spinner-official-preview.png" class="rounded shadow-md max-h-52" />
</div>

---

# mat-spinner 基本用法

HTML 中只需一行標籤即可顯示旋轉動畫：

```html
<mat-spinner></mat-spinner>
```

在 Module 或 Component 中匯入 `MatProgressSpinnerModule`：

```typescript
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// @NgModule 或 standalone component imports:
imports: [MatProgressSpinnerModule],
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS 定位
## 置中顯示與全螢幕遮罩

---

# CSS：讓 Spinner 固定在畫面正中央

預設情況下 `mat-spinner` 會出現在頁面最下方。需自訂 CSS 將其固定至中央：

```css
mat-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
}
```

`position: fixed` 使元件相對於視窗定位，`transform` 修正偏移量。

---

# CSS：Overlay 遮罩阻擋使用者操作

Loading 期間需阻止使用者點擊頁面其他元素，可新增一個透明遮罩層：

```html
<div class="overlay"></div>
<mat-spinner></mat-spinner>
```

```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  backdrop-filter: blur(2px);
}
```

`z-index: 2` 使遮罩蓋住頁面，`backdrop-filter` 產生模糊背景效果。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# LoadingService
## 以 RxJS BehaviorSubject 集中管理狀態

---

# 建立 LoadingService

將 Loading 控制邏輯抽離至 Service，避免各頁面重複撰寫相同程式碼。

使用 Angular CLI 建立：

```bash
ng g s loading
```

產生 `loading.service.ts`，預設結構如下：

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {}
```

---

# LoadingService：BehaviorSubject 設計

使用 RxJS `BehaviorSubject` 儲存 Loading 狀態，並公開唯讀的 Observable 供外部訂閱：

```typescript
import { BehaviorSubject } from 'rxjs';

export class LoadingService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  loading$ = this._loading$.asObservable();

  show() {
    this._loading$.next(true);
  }

  hide() {
    this._loading$.next(false);
  }
}
```

---

# BehaviorSubject 說明

| 屬性 / 方法 | 說明 |
| --- | --- |
| `new BehaviorSubject<boolean>(false)` | 建立可攜帶初始值的 Subject，初始值為 `false` |
| `_loading$` | 私有屬性，外部無法直接修改 |
| `asObservable()` | 回傳唯讀的 Observable，外部只能訂閱，不能呼叫 `next()` |
| `next(true)` | 觸發 `show()`，通知所有訂閱者狀態變為 `true` |
| `next(false)` | 觸發 `hide()`，通知所有訂閱者狀態變為 `false` |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 外部元件應使用 <code>loading$</code>（Observable）而非 <code>_loading$</code>（BehaviorSubject）來訂閱，避免外部直接修改狀態。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# AppComponent 整合
## 將 Loading 放在應用程式根元件

---

# 將 Spinner 移至 AppComponent

把 `<mat-spinner>` 移至 `app.component.html`，使所有頁面共用同一個 Loading 動畫，不必在每個頁面重複撰寫：

```html
<router-outlet></router-outlet>
<mat-spinner></mat-spinner>
```

---

# AppComponent：宣告 loading$ 並注入 Service

在 `app.component.ts` 中注入 `LoadingService`，並在 `ngOnInit` 取得 `loading$` 參照：

```typescript
loading$!: any;

constructor(private loadingService: LoadingService) {}

ngOnInit(): void {
  this.loading$ = this.loadingService.loading$;
}
```

`loading$` 指向 Service 的公開 Observable，不可直接指向私有的 `_loading$`。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# async Pipe
## 在 Template 中訂閱 Observable

---

# async Pipe：搭配 @if 控制顯示

在 `app.component.html` 以 `@if` 包裹 Spinner，使用 `async` pipe 自動訂閱 Observable：

```html
@if (loading$ | async) {
  <div class="overlay"></div>
  <mat-spinner></mat-spinner>
}
```

需在元件的 `imports` 陣列中加入 `CommonModule`：

```typescript
import { CommonModule } from '@angular/common';
imports: [CommonModule],
```

---

# async Pipe 說明

`async` pipe 用於在 Template 中訂閱 `Observable` 或 `Promise`：

- 當 `show()` 呼叫 `_loading$.next(true)` 時，`async` 收到新值 `true`，`@if` 條件成立，Spinner 顯示
- 當 `hide()` 呼叫 `_loading$.next(false)` 時，`async` 收到 `false`，Spinner 隱藏
- 元件銷毀時，`async` 自動取消訂閱，無需手動 `unsubscribe()`

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 在各頁面觸發 Loading
## 呼叫 show() 與 hide()

---

# 在頁面元件中觸發 LoadingService

於需要顯示 Loading 的元件中，透過 `constructor` 注入 `LoadingService`，並在適當時機呼叫：

```typescript
constructor(private loadingService: LoadingService) {}

ngOnInit(): void {
  this.loadingService.show();
  // 在 API 回傳後呼叫 hide()
}
```

呼叫 `show()` 後，`BehaviorSubject` 發出 `true`，`AppComponent` 的 `async` pipe 收到通知，Loading 動畫立即顯示。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 使用 Service 前必須在元件的 <code>constructor</code> 中注入，Angular 才能提供依賴注入的實例。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 客製化 Spinner
## 調整顏色與大小

---

# 客製化：顏色與大小

**顏色**：透過 CSS 自訂屬性覆寫 Material Design token：

```css
.mat-mdc-progress-spinner {
  --mdc-circular-progress-active-indicator-color: white;
}
```

**大小**：在 HTML 標籤上使用 `[diameter]` 屬性（單位：px）：

```html
<mat-spinner [diameter]="70"></mat-spinner>
```

---

# 完整架構總覽

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**LoadingService（核心）**
- `_loading$`：私有 BehaviorSubject
- `loading$`：公開 Observable
- `show()` / `hide()`：狀態控制

**AppComponent（根元件）**
- 注入 `LoadingService`
- 訂閱 `loading$`
- Template 以 `async` + `@if` 控制顯示

</div>
<div>

**各功能頁面**
- 注入 `LoadingService`
- API 呼叫前：`loadingService.show()`
- API 回傳後：`loadingService.hide()`

**CSS 關鍵設定**
- `mat-spinner`：`position: fixed` 置中
- `.overlay`：全螢幕遮罩（`z-index: 2`）
- Spinner 的 `z-index: 5` 高於遮罩

</div>
</div>

---
layout: end
---

# 課程結束

### Loading 動畫透過 mat-spinner + LoadingService + async pipe 三者協作，實現全域統一的載入狀態管理
