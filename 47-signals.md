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

<!--
這段大家應該不陌生，我們在 Service 裡建立一個 Subject，再透過 asObservable() 包裝成外部可訂閱、但不能直接 next 的版本，show/hide 兩個方法負責推送新的值。

帶大家看一下重點：_loading$ 是暴露給外部訂閱用的，loading$ 本身是 private，這是為了避免外部元件亂呼叫 .next()，只能透過 show()/hide() 這種受控的方法去改變狀態。

等一下我們會看到，改成 Signal 之後，這整個「包一層 Observable」的動作就可以省略了。
-->

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

<!--
這裡的重點是 subscribe：元件要拿到 Service 的狀態，得先訂閱，訂閱之後每次值變化都會跑進這個 callback。

大家可以留意一下，這種寫法有個隱藏的責任——訂閱了就要記得取消訂閱（unsubscribe），不然元件銷毀後這個訂閱還留著，可能造成記憶體洩漏。這也是等一下我們要提到 Signal 的一個優勢：不需要手動管理訂閱生命週期。
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

<!--
帶大家看一下改寫的重點：原本兩行「宣告 Subject + asObservable()」現在合併成一行 signal(false)，而且一定要給初始值，這是跟 Observable 最大的不同。

⚠️ 提醒同學，這裡的初始值不能省略，Signal 建立時一定要指定型別對應的初始狀態，不像 Observable 可以先不給值。

更新狀態的方式也從 .next() 改成 .set()，語意上更直覺：「把值設成什麼」，而不是「推送一個新值到串流裡」。
-->

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

<!--
這段最關鍵的地方是 ngOnInit 裡那一行：this.loading = this.loadingService.loading，我們不是「訂閱」，而是直接把 Signal 本身指派過來。

大家可以留意一下型別，loading 宣告成 Signal<boolean>，代表它是一個「函式型別」的物件，不是單純的布林值，等一下在 template 或程式碼中要讀值，都得用 this.loading() 這種函式呼叫的形式。

跟 Observable 版本比較起來，這裡完全不需要 subscribe，也就不需要在 ngOnDestroy 手動取消訂閱，Angular 會自動幫我們追蹤依賴關係。
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
@if (loading()) {
  <h5>loading的值：{{ loading() }}</h5>
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 在 template 中使用 Signal 時，須以 <code>signal()</code>（含括號）的形式呼叫，而非直接寫屬性名稱。
</div>

<!--
帶大家看這段範例：@if (loading()) 這裡的 loading() 一定要加括號，這是同學最容易忘記的地方，因為我們平常寫 {{ 屬性名稱 }} 已經寫習慣了，Signal 卻要多加一組括號才能拿到裡面的值。

⚠️ 易錯點提醒：如果忘記加括號，寫成 loading（沒有括號），Angular 不會報錯，但你拿到的是一個函式物件而不是布林值，畫面邏輯就會整個跑掉，這個坑務必提醒同學小心。

執行結果是：只要 Service 裡的 loading 值一變，這段 @if 區塊就會自動重新渲染，完全不用我們手動處理更新畫面的邏輯。
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
layout: end
---

# 課程結束

### 掌握 Angular Signals 的核心概念：以 signal() 建立響應式狀態，以 .set() 更新值，以 effect() 偵測變化，取代同步場景下的 Observable 訂閱模式。

<!--
這一章我們從 Observable 的舊寫法出發，一步一步改寫成 Signals，希望大家現在能感受到 Signal 在同步狀態管理上的簡潔感：不用包一層 Observable、不用 subscribe、也不用手動取消訂閱。

回家可以練習看看，把自己專案裡某個簡單的同步狀態（像是一個開關、一個計數器）改寫成 Signal 版本，感受一下差異。下一章我們會接著看更多 Angular Material 相關的元件應用。
-->

