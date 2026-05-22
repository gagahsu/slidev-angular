---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 訂閱
routeAlias: ch44
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
    訂閱
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「以 RxJS Subject 實現跨元件的即時資料同步」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **訂閱是什麼** — Observable 與 Subject 的核心概念
- **為什麼要用訂閱** — 解決 ngOnInit 無法即時感知資料變更的問題
- **訂閱的三種類型** — Subject、BehaviorSubject、ReplaySubject 比較
- **建立 Service 檔案** — 將訂閱邏輯集中於獨立的 Service
- **宣告 Subject 變數** — 以 private 宣告可被訂閱的資料來源
- **公開 Observable** — 以 asObservable() 對外暴露可觀察物件
- **撰寫 next 方法** — 透過 next() 更新訂閱內容
- **如何訂閱** — 在元件中注入 Service 並呼叫 subscribe()

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 訂閱是什麼？
# What is a Subscription?

---

# 訂閱是什麼？

訂閱（Subscription）是 RxJS 的核心機制，讓程式可以**監聽資料來源的變化**，並在資料更新時自動執行對應邏輯。

以影音平台為例：

- **未訂閱**：頻道更新再多內容，使用者都不會收到任何通知。
- **已訂閱**：頻道一有新內容，訂閱者立即收到推播通知。

| | 未訂閱 | 已訂閱 |
|---|---|---|
| 頻道有更新時 | 不會收到通知 | 立即收到推播通知 |
| Angular 元件角度 | `ngOnInit` 只讀取一次，資料更新後無感知 | 資料一變更，訂閱回呼自動觸發 |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 為什麼要用訂閱？
# Why Use Subscription?

---

# 為什麼要用訂閱？

在頁面切換時，通常會透過 Service 傳遞資料，並在 `ngOnInit` 中讀取。然而 `ngOnInit` **只會在元件初始化時執行一次**，當 Service 中的資料再次更新，元件無法感知，畫面不會自動反映最新內容。

使用訂閱後，只要 Service 中被訂閱的資料有所變更，所有訂閱者都能即時收到更新，無需手動觸發。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**不使用訂閱**
- 在 `ngOnInit` 中主動拉取一次
- 資料更新後必須手動重新讀取
- 需額外按鈕或事件觸發

</div>
<div>

**使用訂閱**
- 元件自動監聽資料流
- 資料一變更，畫面立即更新
- 無需額外觸發機制

</div>
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 訂閱的三種類型
# Three Types of Subject

---

# 訂閱的三種類型

RxJS 提供三種常見的 Subject，依使用情境選擇：

| 類型 | 說明 |
|------|------|
| `Subject` | 最基本的訂閱，無初始值，訂閱後只接收後續推送的資料 |
| `BehaviorSubject` | 需設定初始值，訂閱時立即取得最新一筆資料 |
| `ReplaySubject` | 訂閱時可重新接收最後 N 筆歷史資料 |

本章重點介紹 **Subject** 與 **BehaviorSubject**，這兩種是實務中最常使用的類型。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 建立 Service 檔案
# Create a Dedicated Service

---

# 建立 Service 檔案

建議為每個訂閱功能建立獨立的 Service 檔案，名稱以功能命名。例如要管理載入狀態，可在 `@service/` 資料夾下建立 `loading.service.ts`。

```
app/
└── @service/
    └── loading.service.ts
```

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>慣例：</b> 一個訂閱功能對應一個 Service 檔案，集中管理該功能的變數、方法與訂閱內容。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 宣告 Subject 變數
# Declare Subject Variables

---

# 宣告 Subject 變數

在 Service 中新增 `private` 的 Subject 變數作為資料來源。以 `private` 修飾，確保資料只能在 Service 內部透過 `next()` 修改，外部無法直接變更。

```typescript
import { BehaviorSubject, Subject } from 'rxjs';

export class LoadingService {

  // BehaviorSubject：需設定初始值
  private loading$ = new BehaviorSubject<boolean>(false);

  // Subject：不需要初始值
  private loading2$ = new Subject<boolean>();

}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 變數加上 <code>private</code> 是為了將修改權限限制在 Service 內部，外部元件只能透過公開的 Observable 觀察，不能直接呼叫 <code>next()</code>。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 公開 Observable
# Expose as Observable

---

# 公開 Observable

`private` 的 Subject 無法被外部元件直接訂閱，需再宣告對應的公開變數，呼叫 `asObservable()` 將其轉為只可觀察（不可修改）的 Observable。

```typescript
export class LoadingService {

  private loading$ = new BehaviorSubject<boolean>(false);
  private loading2$ = new Subject<boolean>();

  // 取得 loading$ 的可觀察物件（供外部訂閱使用）
  _loading$ = this.loading$.asObservable();

  // 取得 loading2$ 的可觀察物件
  _loading2$ = this.loading2$.asObservable();

}
```

外部元件透過 `_loading$` 訂閱資料，但無法呼叫 `next()` 修改內容，達到資料封裝的目的。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 撰寫 next 方法
# Update via next()

---

# 撰寫 next 方法

在 Service 中撰寫公開方法，內部呼叫 `next()` 更新 Subject 的值。外部元件統一透過這些方法修改訂閱內容，不直接操作 Subject。

```typescript
export class LoadingService {

  private loading$ = new BehaviorSubject<boolean>(false);
  _loading$ = this.loading$.asObservable();

  // 顯示 loading
  show() {
    this.loading$.next(true);
  }

  // 隱藏 loading
  hide() {
    this.loading$.next(false);
  }

}
```

---

# 撰寫 next 方法 — 注意事項

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 修改訂閱內容只能使用 <code>next()</code>，且必須呼叫 <code>private</code> 的原始 Subject（<code>loading$</code>），而非公開的 <code>_loading$</code>，因為 Observable 不具備 <code>next()</code> 方法。
</div>

| 變數 | 型別 | 可呼叫 `next()` | 說明 |
|---|---|---|---|
| `loading$` | `BehaviorSubject` | ✅ | Service 內部使用，負責推送資料 |
| `_loading$` | `Observable` | ❌ | 對外公開，僅供訂閱觀察 |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 如何訂閱？
# How to Subscribe?

---

# 如何訂閱？（一）— 注入 Service

在目標元件的 constructor 中注入 `LoadingService`，使元件得以存取 Service 中的訂閱變數與方法。

```typescript
// app.component.ts
import { LoadingService } from '../@service/loading.service';

@Component({
  selector: 'app-root',
  ...
})
export class AppComponent {

  constructor(private loadingService: LoadingService) { }

}
```

---

# 如何訂閱？（二）— 呼叫 subscribe

在 `ngOnInit` 中訂閱 `_loading$`，元件初始化後即開始監聽。當 Service 呼叫 `next()` 推送新值，`subscribe` 的回呼函式會自動執行，`res` 為收到的最新資料。

```typescript
ngOnInit(): void {
  this.loadingService._loading$.subscribe((res) => {
    console.log('loading$:', res);
  });
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> <code>subscribe()</code> 的回呼參數（此處為 <code>res</code>）可自行命名，代表每次推送的訂閱內容。訂閱通常寫在 <code>ngOnInit</code> 中，確保元件載入後即開始監聽。
</div>

---

# 完整流程回顧

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**loading.service.ts**

1. 宣告 `private` Subject 作為資料來源
2. 以 `asObservable()` 對外公開 Observable
3. 提供 `show()` / `hide()` 方法，透過 `next()` 更新值

</div>
<div>

**app.component.ts**

1. 在 constructor 注入 `LoadingService`
2. 在 `ngOnInit` 訂閱 `_loading$`
3. 訂閱回呼中取得最新值並更新畫面

</div>
</div>


---
layout: end
---

# 課程結束
### 掌握 RxJS Subject，實現元件間的即時資料同步！
