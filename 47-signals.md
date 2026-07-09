---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Signals
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
    Signals
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「響應式狀態管理的現代解法」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來認識 Signals，這是 Angular 近年來主打的響應式狀態管理機制。

前面我們處理跨元件共享狀態時，習慣用 RxJS 的 Subject 搭配 Observable，訂閱值的變化。這種寫法其實有點像請一個郵差每次都要「訂閱」才會收到信，程式碼繞了一圈。Signals 的出現就是想讓「讀值」跟「值變了要更新畫面」這件事變得更直覺，就像看一個隨時更新的看板，讀的時候直接看現在的值就好。

學完這一章，大家會知道怎麼用 signal() 建立狀態、怎麼在 template 中讀取、怎麼用 computed() 做衍生計算、以及用 effect() 監聽變化，取代原本同步情境下的 Observable 寫法。
-->

---
layout: default
---

# Outline

- **Signals 概念介紹**
- **以 Observable 實作狀態共享（回顧）**
- **改寫為 Signals 寫法**
- **在 Template 中使用 Signal**
- **延伸：Signal 與 ch46 的 Interceptor**
- **computed() 計算 Signal**
- **偵測 Signal 值變化（effect）**
- **注意事項**

<!--
這張投影片先讓大家看一下這一章的路線圖。我們會先快速複習一下之前用 Observable 做狀態共享的寫法，接著把同一個範例改寫成 Signals 版本，然後看怎麼在 template 中用、怎麼用 computed() 做衍生值、用 effect() 監聽變化，最後整理 Signals 適用與不適用的場景。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Signals 概念介紹

<!--
這一節我們先建立 Signals 的基本概念，還不急著寫程式，先搞懂它是什麼、跟我們熟悉的 Observable 差在哪裡。
-->

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

<!--
白話來說，Signal 就是一個「會被監控的容器」，裡面裝一個值，只要值變了，任何有讀取這個 Signal 的地方（template、effect）都會自動更新，不用我們手動去通知。

大家可以想像成手機的電池百分比顯示：電量一變，狀態列就自動更新數字，不需要我們每次都去「訂閱」電量變化。這就是 Signal 的同步、即時特性。

在業界實務上，Signal 很適合用在元件內部狀態或簡單的跨元件共享狀態，比如 loading 旗標、計數器。但如果是要等後端 API 回應這種非同步情境，Signal 目前還是不夠用，這時候還是要用 Observable，這點等一下會反覆提醒大家。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 以 Observable 實作狀態共享（回顧）

<!--
在改寫成 Signals 之前，我們先快速複習一下：原本的 loading 狀態共享是怎麼用 Observable 做的，等一下才有基準可以比較兩者的差異。
-->

---

# Observable 寫法回顧：loading.service.ts

上一章（ch46）以 `BehaviorSubject` + `asObservable()` 實作跨元件狀態共享。

```typescript
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

<!--
這段就是上一章 Loading 完成的 Service：在裡面建立一個 BehaviorSubject，再透過 asObservable() 包裝成外部可訂閱、但不能直接 next 的版本，show/hide 兩個方法負責推送新的值。

跟一般 Subject 不同，BehaviorSubject 建立時要給初始值（這裡是 false），而且新訂閱者會馬上拿到「目前」這個最新值，不用等下一次 next() 才有資料，這點跟等一下要介紹的 Signal 概念更接近。

帶大家看一下重點：_loading$ 本身是 private，只有 Service 內部能呼叫 next()；公開的 loading$ 是給外部訂閱用的唯讀窗口，這是為了避免外部元件亂呼叫 .next()，只能透過 show()/hide() 這種受控的方法去改變狀態。

等一下我們會看到，改成 Signal 之後，這整個「包一層 Observable」的動作就可以省略了。
-->

---

# Observable 寫法回顧：app.component.ts

上一章的 `AppComponent` 取得 `loading$`，交由樣板的 `async` pipe 訂閱。

```typescript
export class AppComponent {
  loading$!: Observable<boolean>;
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
  }
}
```

```html
@if (loading$ | async) {
  <div class="overlay"></div>
  <mat-spinner [diameter]="70"></mat-spinner>
}
```

<!--
這也是上一章的原始碼：元件本身沒有 subscribe，只是把 Service 公開的 loading$ 接到自己的屬性上，真正的訂閱交給樣板裡的 async pipe，它會自動訂閱，元件銷毀時也會自動取消訂閱。

大家可以留意一下這條鏈路有多長：BehaviorSubject → asObservable() → 元件屬性 → async pipe → @if，光是「讓畫面知道一個布林值變了」就要串五層。等一下改成 Signal，大家會看到這條鏈路縮短成什麼樣子。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 改寫為 Signals 寫法

<!--
複習完 Observable 版本，現在我們動手把同一個 loading 狀態共享的例子，一步一步改寫成 Signals 版本，讓大家直接感受兩種寫法的差異。
-->

---

# 改寫 loading.service.ts（一）

將原本的 `BehaviorSubject` + `asObservable()` 替換為 `signal()`。

- Signal 必須提供初始值，此處設為 `false`
- 更新值改用 `.set()` 方法，取代 `.next()`

```typescript
import { signal } from '@angular/core';

export class LoadingService {
  // private _loading$ = new BehaviorSubject<boolean>(false);
  // loading$ = this._loading$.asObservable();
  loading = signal<boolean>(false);
  show() {
    // this._loading$.next(true);
    this.loading.set(true);
  }
  hide() {
    // this._loading$.next(false);
    this.loading.set(false);
  }
}
```

<!--
帶大家看一下改寫的重點：原本兩行「宣告 Subject + asObservable()」現在合併成一行 signal(false)，而且一定要給初始值，這是跟 Observable 最大的不同。

⚠️ 提醒同學，這裡的初始值不能省略，Signal 建立時一定要指定型別對應的初始狀態，不像 Observable 可以先不給值。

更新狀態的方式也從 .next() 改成 .set()，語意上更直覺：「把值設成什麼」，而不是「推送一個新值到串流裡」。
-->

---

# 改寫 app.component.ts（二）

在元件中將 Signal 實例指派給本地屬性，取代 `Observable` + `async` pipe 寫法。

- Signal 是函式型別（`Signal<boolean>`），讀取值需呼叫 `this.loading()`
- 不再需要 `Observable` 型別與 `async` pipe，Angular 會自動追蹤依賴

```typescript
import { Signal } from '@angular/core';

export class AppComponent {
  // loading$!: Observable<boolean>;
  loading!: Signal<boolean>;
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    // this.loading$ = this.loadingService.loading$;
    this.loading = this.loadingService.loading;
  }
}
```

<!--
這段最關鍵的地方是 ngOnInit 裡那一行：this.loading = this.loadingService.loading，寫法跟上一章接 loading$ 幾乎一模一樣，只是接過來的東西從 Observable 變成 Signal 本身。

大家可以留意一下型別，loading 宣告成 Signal<boolean>，代表它是一個「函式型別」的物件，不是單純的布林值，等一下在 template 或程式碼中要讀值，都得用 this.loading() 這種函式呼叫的形式。

跟 Observable 版本比較起來，這裡不需要 async pipe 幫忙訂閱，也沒有任何訂閱要取消，Angular 會自動幫我們追蹤依賴關係。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 在 Template 中使用 Signal

<!--
Service 跟元件的邏輯都改寫完了，接下來看看在畫面（template）上要怎麼讀取 Signal 的值。
-->

---

# 在 Template 中綁定 Signal 值

在 HTML template 中，Signal 以函式呼叫方式讀取（`loading()`）。  
當 Signal 值發生變更，Angular 會自動重新渲染相關區塊。

```html
<!-- Observable 版本：需要 async pipe -->
<!-- @if (loading$ | async) { -->

<!-- Signal 版本：直接呼叫，不需要 pipe -->
@if (loading()) {
  <div class="overlay"></div>
  <mat-spinner [diameter]="70"></mat-spinner>
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 在 template 中使用 Signal 時，須以 <code>loading()</code>（含括號）的形式呼叫，而非直接寫屬性名稱。
</div>

<!--
帶大家對照這兩行：上一章的寫法是 loading$ | async，要靠 async pipe 幫忙訂閱；Signal 版本只要 loading() 直接呼叫就好，連 CommonModule 的 async pipe 都不用 import。

@if (loading()) 這裡的 loading() 一定要加括號，這是同學最容易忘記的地方，因為我們平常寫 {{ 屬性名稱 }} 已經寫習慣了，Signal 卻要多加一組括號才能拿到裡面的值。

⚠️ 易錯點提醒：如果忘記加括號，寫成 loading（沒有括號），Angular 不會報錯，但你拿到的是一個函式物件而不是布林值，畫面邏輯就會整個跑掉，這個坑務必提醒同學小心。

執行結果是：只要 Service 裡的 loading 值一變，這段 @if 區塊就會自動重新渲染，完全不用我們手動處理更新畫面的邏輯。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 延伸：Signal 與 ch46 的 Interceptor

<!--
既然 LoadingService 改成了 Signal 版本，我們回頭看一下上一章的 loadingInterceptor：那個為了 NG0100 加的 setTimeout，現在還需要嗎？Interceptor 本身又能不能直接拿掉？
-->

---

# 改用 Signal 後，NG0100 還會發生嗎？

**不會。** ch46 的 NG0100 是「樣板檢查完 `loading$ | async` 的值，同一輪變更偵測裡值又被 `next()` 改掉」造成的。

Signal 的運作方式不同：

- `loading.set(true)` 不會當場改掉「這一輪已檢查」的綁定結果
- 而是把有讀取 `loading()` 的畫面**標記為 dirty**，由 Angular **安排下一輪**變更偵測再更新
- 官方 NG0100 錯誤指南也建議：改用 Signal 是根治這類時序問題的方式之一

因此 Interceptor 裡的 `setTimeout` 補丁可以移除：

```typescript
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  // Signal 版不需要 setTimeout 包裝
  loadingService.show();
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
```

<!--
上一章我們花了整整一頁解釋為什麼 show() 要包 setTimeout：因為 BehaviorSubject 的 next() 是「當下立刻」改值，如果根元件樣板這一輪已經檢查過 loading$ 的值，同一輪裡值又變了，開發模式的二次檢查就會抓到不一致，噴出 NG0100。

Signal 的更新機制天生就避開了這個問題：set() 不是直接闖進正在進行的這一輪檢查，而是把讀取這個 Signal 的畫面標記為 dirty，等 Angular 安排下一輪變更偵測才重新渲染。用拍團體照的比喻來說，Signal 版的舉手的人會自動等這張拍完、下一張再舉手，不用攝影師（我們）另外喊「等一下再舉」（setTimeout）。

所以改用 Signal 之後，攔截器裡那行 setTimeout 補丁可以拿掉，show() 直接呼叫就好，程式碼更乾淨、意圖也更清楚。
-->

---

# 那 Interceptor 可以整個移除嗎？

**不行。** Interceptor 解決的是**兩個**問題，Signal 只解掉其中一個：

| ch46 的問題 | 解法 | 改用 Signal 後 |
| --- | --- | --- |
| NG0100 時序衝突 | `setTimeout` 延後 `show()` | ✅ Signal 天生避開，`setTimeout` 可移除 |
| 每個元件手動 show()/hide()、容易忘記 hide() | Interceptor + `finalize()` | ❌ 問題仍在，Interceptor 必須保留 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>結論：</b> Signal 取代的是「狀態的儲存與通知」（BehaviorSubject + async pipe），不是「何時觸發 show()/hide()」的問題。集中觸發、保證 hide() 這件事，仍然是 Interceptor 的職責。
</div>

<!--
這裡幫大家釐清一個容易混淆的點：Signal 跟 Interceptor 解決的是不同層面的問題，不是二選一的關係。

Signal 負責的是「狀態怎麼存、畫面怎麼知道狀態變了」這一層，它取代的是 BehaviorSubject、asObservable()、async pipe 這一整串。

Interceptor 負責的是「什麼時機呼叫 show()/hide()」這一層：如果拿掉它，就回到 ch46 前半段的手動模式——每個元件自己注入 Service、自己記得在成功跟失敗都呼叫 hide()，漏寫一個 error 分支，Loading 就卡住不消失。finalize() 保證收尾這個好處，跟狀態用什麼技術存完全無關。

所以最終架構是：Signal 版 LoadingService + 拿掉 setTimeout 的 Interceptor，兩者搭配，各司其職。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# computed() 計算 Signal

<!--
接下來我們要看 Signal 的一個好搭檔：computed()，用來處理「這個值是根據另一個 Signal 算出來的」這種情境。
-->

---

# TypeScript Getter — 自動計算屬性

**沒有 getter：** 每個方法都要手動更新衍生值

```typescript
level = 1;
attack = 3;

levelUp() {
  this.level++;
  this.attack = this.level * 3; // 忘記更新就會出錯
}
```

**有 getter：** 定義一次，自動計算

```typescript
level = 1;

get attack(): number {
  return this.level * 3; // level 變了，attack 自動跟著變
}

levelUp() {
  this.level++; // 不需要手動更新 attack
}
```

<!--
getter 是 TypeScript 語法，讓屬性變成「唯讀計算屬性」。
在 ch22 練習中，我們用手動更新 attack/defense，getter 是更乾淨的替代方案。
-->

---

# computed() — Signal 的響應式 Getter

`computed()` 是 Signal 版本的 getter：依賴的 Signal 值一變，計算結果自動更新。

```typescript
import { signal, computed } from '@angular/core';

export class AppComponent {
  level = signal(1);
  attack = computed(() => this.level() * 3);
  defense = computed(() => this.level() * 2);

  levelUp() {
    this.level.update(v => v + 1);
    // attack 與 defense 自動重新計算，不需要手動更新
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>computed()</code> 是<b>唯讀</b>的，不能呼叫 <code>.set()</code>；只要依賴的 Signal 改變，值就自動同步
</div>

<!--
computed() 與 getter 概念一樣，差別在於 computed() 追蹤的是 Signal，變化時 Angular 自動通知 template 更新。
-->

---

# Getter vs computed() 比較

| | TypeScript Getter | Angular computed() |
| --- | --- | --- |
| 適用對象 | 一般屬性（非 Signal） | Signal |
| 讀取方式 | `this.attack` | `this.attack()` |
| Template 寫法 | `{{ attack }}` | `{{ attack() }}` |
| 自動追蹤依賴 | ✗ | ✅ |
| 可呼叫 .set() | ✗ | ✗（唯讀） |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 演進脈絡：手動更新屬性 → getter → computed()，三者解決同一個問題，Signal 場景下優先用 <code>computed()</code>
</div>

<!--
總結：getter 和 computed() 都是「計算屬性」，只是適用的資料型態不同。
記住：Signal 用 computed()，一般屬性用 getter。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 偵測 Signal 值變化（effect）

<!--
除了 computed() 算出新的值，有時候我們想在 Signal 變化的當下「順便做點事」，比如印個 log、操作 DOM，這種副作用邏輯就要靠 effect() 來處理。
-->

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

<!--
帶大家看重點：effect() 一定要寫在 constructor 裡面呼叫，這跟 computed() 不太一樣，是 Angular 對它的硬性要求。

Angular 很聰明的地方是，它會自動偵測 effect 函式內讀取了哪些 Signal（這裡是 this.loading()），只要這個 Signal 之後值一變，effect 裡的程式碼就會重新執行一次，我們不用手動註冊監聽。

範例裡用 setTimeout 模擬一秒後呼叫 show()，執行結果是：一開始 console 先印出初始值 false，一秒後 loading 變成 true，effect 就會自動再印一次 true。

⚠️ 提醒同學，effect 比較像是「監聽用」的工具，不建議在裡面直接改動同一個 Signal 的值，不然容易造成無限迴圈，這點下一頁會再整理。
-->

---

# effect() 重點說明

| 項目 | 說明 |
| --- | --- |
| 定義位置 | 必須在 `constructor` 中呼叫 |
| 自動追蹤 | 自動追蹤函式內所有被讀取的 Signal |
| 執行時機 | Signal 值變更時立即執行 |
| 用途 | 日誌記錄、DOM 操作、外部副作用 |
| 注意 | 不可在 `effect` 內直接呼叫 `.set()` 修改同一 Signal（可能造成無限迴圈） |

<!--
這張表幫大家整理 effect() 的重點，考試或實作時最常忘記的通常是「必須定義在 constructor 中」這一點，同學要特別記住。

⚠️ 最後一項提醒很重要：不要在 effect 裡面又去 .set() 同一個被它追蹤的 Signal，這樣會變成「值變了觸發 effect，effect 又改值，又觸發 effect」，形成無限迴圈，這是實務上很容易踩到的坑。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 注意事項

<!--
這一章的最後，我們來整理一下 Signals 的適用場景，特別是要跟大家強調它「不」適合用在哪裡，避免大家誤用。
-->

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

<!--
這張表大家可以當作查表用，最重要的一句話是：Signal 處理的是「同步、即時」的狀態，不是拿來取代所有的 Observable。

⚠️ 常見誤區是有同學會想「Signal 比較新，是不是以後都不用 Observable 了」，這是不對的。像 HTTP 請求這種需要「等」的非同步操作，Signal 目前沒辦法直接表達「還沒收到值」跟「已經收到值」這種狀態轉換，還是得靠 Observable + subscribe。
-->

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

<!--
這張總結表把兩邊的使用情境並排列出來，大家可以拿它當作日後選擇要用 Signal 還是 Observable 的判斷依據：問自己「這個狀態需不需要等待、需不需要 RxJS 的操作子」，需要就用 Observable，不需要就優先考慮 Signal，程式碼會更簡潔。
-->

---
layout: default
---

# 練習：購物車小計即時計算（Signal 版）
### 情境說明

商品詳情頁常見情境：使用者調整購買數量，畫面上的小計金額要**立即**跟著變化，而且如果金額超過門檻，還要在畫面下方顯示一則提醒。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**需求**
- 顯示目前數量、單價、小計
- 按 `+` / `-` 調整數量（最少為 1）
- 小計超過 `500` 時顯示優惠提醒文字

</div>
<div>

**限制**
- 數量、小計都必須用 Signal 管理
- 小計不可手動計算後指派，須用 `computed()` 自動推導
- 提醒文字的顯示邏輯用 `effect()` 處理

</div>
</div>

這一題不需要 Service，單一元件內用 `signal()` + `computed()` + `effect()` 就能完成，練習三者如何搭配。

<!--
這一題刻意設計成單一元件就能完成，目的是讓大家把這一章學到的 signal、computed、effect 三個工具，在同一個情境裡串起來用一次，感受它們各自負責的角色：signal 存原始狀態、computed 算衍生值、effect 處理副作用。
-->

---
layout: default
---

# 練習：購物車小計即時計算
### 任務說明

1. 建立 `quantity = signal<number>(1)`，代表目前數量
2. 建立常數 `price = 100`，代表單價（不需要是 Signal）
3. 建立 `subtotal = computed(() => this.quantity() * this.price)`，自動算出小計
4. 撰寫 `increase()` / `decrease()` 方法，分別用 `.update()` 將 `quantity` `+1` / `-1`；`decrease()` 要確保數量不會小於 `1`
5. 在 `constructor` 中用 `effect()` 監聽 `subtotal()`，當小計 `> 500` 時，在 console 印出提醒訊息
6. Template 顯示 `quantity()`、`subtotal()`，並提供 `+` / `-` 按鈕分別綁定 `increase()` / `decrease()`

<!--
大家可以先自己動手寫寫看。重點是想清楚：哪個值是「原始狀態」該用 signal，哪個值是「算出來的」該用 computed，哪個邏輯是「順便做的副作用」該用 effect，不要三個工具混在一起用錯地方。卡住的地方沒關係，下一頁會有解題提示。
-->

---
layout: default
---

# 練習：解題提示
### 提示說明

1. `price` 是固定單價，不會被使用者更動，不需要包成 Signal，一般常數即可
2. `decrease()` 呼叫 `.update()` 時，回呼函式裡要加判斷：`v => v > 1 ? v - 1 : v`，避免數量歸零或變負數
3. `computed()` 裡只能讀 Signal（`this.quantity()`），不能呼叫 `.set()` 修改任何 Signal
4. `effect()` 一定要寫在 `constructor` 內，且內部讀取 `this.subtotal()` 才能被自動追蹤到
5. Template 綁定按鈕記得用 `(click)`，讀值記得加括號：`quantity()`、`subtotal()`

<!--
对照一下大家的答案，最容易搞混的地方是把 price 也包成 signal——其實不需要，它從頭到尾不會變，包成 signal 反而多一層不必要的複雜度。另一個常見疏漏是 decrease() 忘記做下限判斷，直接 v - 1，數量按幾次就會變成負數，畫面邏輯就不合理了。下一頁我們直接看完整解答。
-->

---
layout: default
---

# 完整解答 — cart.component.ts（一）

Signal 與 computed 宣告：

```typescript
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
})
export class CartComponent {

  quantity = signal<number>(1);
  price = 100;

  subtotal = computed(() => this.quantity() * this.price);

}
```

<!--
先看狀態宣告部分：quantity 是唯一需要被追蹤變化的原始狀態，所以用 signal，初始值 1；price 是固定不變的單價，維持一般屬性即可；subtotal 用 computed() 包起來，內部讀取 this.quantity()，Angular 會自動追蹤這個依賴關係，quantity 一變，subtotal 就自動重新計算。constructor 跟方法下一頁接著看。
-->

---
layout: default
---

# 完整解答 — cart.component.ts（二）

`constructor` 中的 `effect()` 與數量調整方法：

```typescript
  constructor() {
    effect(() => {
      if (this.subtotal() > 500) {
        console.warn(`小計 ${this.subtotal()} 元，已符合優惠門檻！`);
      }
    });
  }

  increase(): void {
    this.quantity.update(v => v + 1);
  }

  decrease(): void {
    this.quantity.update(v => (v > 1 ? v - 1 : v));
  }
```

<!--
接續上一頁的 class：effect() 寫在 constructor 裡，內部讀取 this.subtotal()，只要小計超過 500 就在 console 印出提醒，這是典型的「值變了、順便做點事」的副作用邏輯，不需要也不應該用 computed() 來做，因為 computed() 是用來「算出一個新值」，不是用來「執行動作」。

increase() 很單純，每次呼叫 quantity 就 +1；decrease() 則在 update() 的回呼裡加了三元判斷，數量大於 1 才減 1，否則維持原值，避免數量歸零或變負數。
-->

---
layout: default
---

# 完整解答 — cart.component.html

```html
<!-- cart.component.html -->
<div class="cart-box">
  <p>數量：{{ quantity() }}</p>
  <button (click)="decrease()">-</button>
  <button (click)="increase()">+</button>
  <p>小計：NT$ {{ subtotal() }}</p>
</div>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>驗證方式：</b> 按 <code>+</code> 加到數量 6（小計 600），開啟瀏覽器 Console，應該會看到優惠提醒的 <code>console.warn</code> 訊息；按 <code>-</code> 減到數量 1 後繼續按，數量應維持在 1，不會變成 0 或負數。
</div>

<!--
Template 部分沒有任何 subscribe、也沒有 async pipe，quantity() 跟 subtotal() 都是直接函式呼叫讀值，按鈕透過 (click) 綁定 increase()/decrease()。

執行結果：每按一次 + 或 -，quantity 更新，Angular 自動重新計算 subtotal 並更新畫面；同時因為 effect() 有在監聽 subtotal()，只要跨過 500 這個門檻，console 就會自動印出提醒，完全不需要在 increase()/decrease() 裡額外寫判斷邏輯，這就是 signal、computed、effect 三者分工合作的完整範例。
-->

---
layout: end
---

# 課程結束

### 掌握 Angular Signals 的核心概念：以 signal() 建立響應式狀態，以 .set() 更新值，以 effect() 偵測變化，取代同步場景下的 Observable 訂閱模式。

<!--
這一章我們從 Observable 的舊寫法出發，一步一步改寫成 Signals，希望大家現在能感受到 Signal 在同步狀態管理上的簡潔感：不用包一層 Observable、不用 subscribe、也不用手動取消訂閱。

回家可以練習看看，把自己專案裡某個簡單的同步狀態（像是一個開關、一個計數器）改寫成 Signal 版本，感受一下差異。下一章我們會接著看更多 Angular Material 相關的元件應用。
-->

