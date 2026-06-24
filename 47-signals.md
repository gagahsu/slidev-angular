---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Signals
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
    Signals
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「響應式狀態管理的現代解法」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **第一部分：Signals 概念介紹**
- **第二部分：以 Observable 實作狀態共享（回顧）**
- **第三部分：改寫為 Signals 寫法**
- **第四部分：在 Template 中使用 Signal**
- **第五部分：偵測 Signal 值變化（effect）**
- **第六部分：注意事項**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第一部分
## Signals 概念介紹

---

# Signals 是什麼？

Signals 是 Angular v16 後推出的響應式狀態管理機制，用於監測值的變化並即時反映至畫面。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**Signals 的特性**
- 必須設定初始值
- 讀取值須以函式呼叫形式：`signal()`
- 值變更時自動通知相依的 template 或 `effect`
- 適用於**同步、即時**的狀態管理

</div>
<div>

**與 Observable 的差異**

| 項目 | Signal | Observable |
| --- | --- | --- |
| 初始值 | 必須提供 | 非必要 |
| 讀取方式 | `signal()` 呼叫 | `.subscribe()` |
| 非同步支援 | 否 | 是 |
| 適用場景 | 同步狀態 | API 呼叫等非同步 |

</div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 若需等待 API 回應等非同步操作，仍須使用 Observable（訂閱）寫法。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第二部分
## 以 Observable 實作狀態共享（回顧）

---

# Observable 寫法回顧：loading.service.ts

原先以 `Subject` + `asObservable()` 實作跨元件狀態共享。

```typescript
export class LoadingService {
  private loading$ = new Subject<boolean>();
  _loading$ = this.loading$.asObservable();

  constructor() { }

  show() {
    this.loading$.next(true);
  }

  hide() {
    this.loading$.next(false);
  }
}
```

---

# Observable 寫法回顧：app.component.ts

訂閱 `_loading$`，等待其值變化以觸發對應邏輯。

```typescript
export class AppComponent {
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService._loading$
      .subscribe((res) => {
        console.log(res);
      });
  }
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第三部分
## 改寫為 Signals 寫法

---

# 改寫 loading.service.ts（一）

將原本的 `Subject` + `asObservable()` 替換為 `signal()`。

- Signal 必須提供初始值，此處設為 `false`
- 更新值改用 `.set()` 方法，取代 `.next()`

```typescript
export class LoadingService {
  // private loading$ = new Subject<boolean>();
  // _loading$ = this.loading$.asObservable();
  loading = signal<boolean>(false);

  constructor() { }

  show() {
    // this.loading$.next(true);
    this.loading.set(true);
  }

  hide() {
    // this.loading$.next(false);
    this.loading.set(false);
  }
}
```

---

# 改寫 app.component.ts（二）

在元件中將 Signal 實例指派給本地屬性，取代 `.subscribe()` 訂閱寫法。

- Signal 是函式型別（`Signal<boolean>`），讀取值需呼叫 `this.loading()`
- 不再需要 `subscribe`，Angular 會自動追蹤依賴

```typescript
export class AppComponent {
  loading!: Signal<boolean>;
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    // this.loadingService._loading$
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    this.loading = this.loadingService.loading;
  }
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第四部分
## 在 Template 中使用 Signal

---

# 在 Template 中綁定 Signal 值

在 HTML template 中，Signal 以函式呼叫方式讀取（`loading()`）。  
當 Signal 值發生變更，Angular 會自動重新渲染相關區塊。

```html
@if (loading()) {
  <h5>loading的值：{{ loading() }}</h5>
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 在 template 中使用 Signal 時，須以 <code>signal()</code>（含括號）的形式呼叫，而非直接寫屬性名稱。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第五部分
## 偵測 Signal 值變化（effect）

---

# 使用 effect() 偵測 Signal 變化

當 Signal 值更新時，若需執行額外的邏輯（如 `console.log`、副作用操作），可使用 `effect()`。

- `effect()` 必須定義於 `constructor` 內
- Angular 會自動追蹤函式內所有被讀取的 Signal，並在其值變更時重新執行

```typescript
export class AppComponent {
  loading!: Signal<boolean>;
  constructor(private loadingService: LoadingService) {
    effect(() => console.log(this.loading()));
  }

  ngOnInit(): void {
    this.loading = this.loadingService.loading;
    setTimeout(() => {
      this.loadingService.show();
    }, 1000);
  }
}
```

---

# effect() 重點說明

| 項目 | 說明 |
| --- | --- |
| 定義位置 | 必須在 `constructor` 中呼叫 |
| 自動追蹤 | 自動追蹤函式內所有被讀取的 Signal |
| 執行時機 | Signal 值變更時立即執行 |
| 用途 | 日誌記錄、DOM 操作、外部副作用 |
| 注意 | 不可在 `effect` 內直接呼叫 `.set()` 修改同一 Signal（可能造成無限迴圈） |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第六部分
## 注意事項

---

# Signals 注意事項

| 項目 | 說明 |
| --- | --- |
| 適用場景 | 同步、即時的元件內或跨元件狀態共享 |
| 不適用場景 | 需等待 API 回應的非同步操作 |
| 非同步處理 | 仍須使用 Observable + `subscribe` |
| 初始值 | Signal 建立時必須提供初始值 |
| 讀取方式 | 以函式呼叫方式讀取：`signal()` |
| 更新方式 | 使用 `.set(value)` 更新值 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>總結：</b> Signals 適用於自身程式邏輯中的同步狀態追蹤；API 呼叫等需等待回應的情境，仍應使用 Observable 訂閱模式。
</div>

---

# Signals vs Observable 使用時機比較

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**使用 Signals 的情境**
- 元件內部狀態管理（如 loading 旗標、計數器）
- 跨元件共享同步狀態（透過 Service）
- 需要在 template 直接綁定且自動更新的值
- 搭配 `effect()` 執行副作用邏輯

</div>
<div>

**使用 Observable 的情境**
- 呼叫 HTTP API，等待後端回應
- 需要 `pipe`、`map`、`filter` 等 RxJS 操作子
- 事件流（如使用者輸入、WebSocket）
- 需要取消訂閱（`unsubscribe`）管理

</div>
</div>

---
layout: end
---

# 課程結束

### 掌握 Angular Signals 的核心概念：以 signal() 建立響應式狀態，以 .set() 更新值，以 effect() 偵測變化，取代同步場景下的 Observable 訂閱模式。
