---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 訂閱
routeAlias: ch45
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

<!--
大家好，這一章我們要來學「訂閱」，也就是 RxJS 裡的 Subscription。

大家有沒有遇過這種情況：一個頁面的資料在 Service 裡改變了，另一個正在畫面上的元件卻完全不知道，還是顯示舊資料？這就是我們接下來要解決的問題——讓元件之間可以「即時」同步資料，而不是各自讀各自的、資料一改就對不上。

學完這一章，大家會知道怎麼用 RxJS 的 Subject 建立一個可以被訂閱的資料來源，並且讓多個元件同時監聽同一份資料的變化。
-->

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

<!--
這張投影片先讓大家看一下整章的路線圖。我們會先搞懂訂閱跟三種 Subject 的差異，接著實際動手，在一個獨立的 Service 檔案裡，一步一步宣告 Subject、公開成 Observable、寫 next() 方法，最後回到元件裡示範怎麼呼叫 subscribe() 完成訂閱。整個流程走完，大家就能自己刻出一套可重複使用的訂閱機制。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 訂閱是什麼？
# What is a Subscription?

<!--
先讓大家對「訂閱」這個詞有點感覺。我們平常訂閱一個 YouTube 頻道，代表以後那個頻道一有新影片，我們就會收到通知，不用自己每天跑去看有沒有更新。RxJS 的訂閱其實就是一樣的概念，只是把「頻道」換成程式裡的資料來源。
-->

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

<!--
這張投影片把訂閱的概念講清楚。訂閱最重要的一句話就是「監聽資料來源的變化，資料更新時自動執行對應邏輯」，大家可以先把這句話記起來。

延續剛剛 YouTube 的比喻：頻道沒訂閱，不管更新幾支影片我們都不會知道；訂閱了之後，一有新內容就會推播通知我們。放到 Angular 裡也一樣——`ngOnInit` 就像是我們自己「主動」跑去看一次頻道，只看得到當下的內容；訂閱之後，資料一變，回呼函式就會自動被觸發，完全不用我們手動去檢查。

這個機制在實務上非常常見，只要牽扯到「一個地方改資料、多個地方要同步顯示」的情境，幾乎都會用到訂閱。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 為什麼要用訂閱？
# Why Use Subscription?

<!--
接下來我們具體來看，沒有訂閱機制時，Angular 元件會遇到什麼樣的痛點。
-->

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

<!--
這張投影片點出了問題的核心：`ngOnInit` **只會在元件初始化時執行一次**，這是它的天生限制，不是寫錯了。所以如果 Service 裡的資料之後又被改了，元件完全不會知道，畫面就會一直停留在舊資料。

我們可以想成，`ngOnInit` 就像是「開店前先看一次進貨單」，只看那一次；訂閱則像是請廠商「以後每次補貨都主動通知我」，貨一到我們馬上就知道，不用自己一直跑去倉庫確認。

用了訂閱之後，大家可以看到右邊這一欄，元件不用手動觸發、不用額外按鈕，資料一變就自動反映在畫面上，這也是我們接下來要動手實作的目標。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 訂閱的三種類型
# Three Types of Subject

<!--
訂閱的觀念有了，接著我們來看 RxJS 到底提供了哪幾種 Subject 可以用。
-->

---

# 訂閱的三種類型

RxJS 提供三種常見的 Subject，依使用情境選擇：

| 類型 | 說明 |
|------|------|
| `Subject` | 最基本的訂閱，無初始值，訂閱後只接收後續推送的資料 |
| `BehaviorSubject` | 需設定初始值，訂閱時立即取得最新一筆資料 |
| `ReplaySubject` | 訂閱時可重新接收最後 N 筆歷史資料 |

本章重點介紹 **Subject** 與 **BehaviorSubject**，這兩種是實務中最常使用的類型。

<!--
這三種 Subject 大家可以用「加入群組聊天」的時間點來理解差異。`Subject` 就像是你加入群組後，只看得到你加入之後大家傳的訊息，之前聊過什麼完全看不到；`BehaviorSubject` 則像是加入時管理員會先告訴你「目前的狀態」（也就是初始值），之後也能收到後續更新；`ReplaySubject` 更貼心一點，會把最近 N 則歷史訊息重播給你看，讓你補上之前錯過的內容。

實務上我們最常用的是 `Subject` 跟 `BehaviorSubject`，尤其 `BehaviorSubject` 因為一定有初始值、訂閱當下就能拿到最新狀態，非常適合拿來管理像 Loading 狀態這種「隨時都要有一個值」的情境。接下來的範例我們就會用這兩種來實作。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 建立 Service 檔案
# Create a Dedicated Service

<!--
了解類型之後，我們開始動手實作，第一步是把訂閱邏輯集中放到一個獨立的 Service 檔案裡。
-->

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

<!--
帶大家看一下這個範例，目的是建立我們後面要用的 `LoadingService`，先把骨架搭起來。我們在 `@service/` 資料夾下新增 `loading.service.ts`，命名上就直接對應這個 Service 要管理的功能，這樣之後回頭找程式碼會很好找。

這裡先產生一個空的 class，加上 `@Injectable({ providedIn: 'root' })`，讓 Angular 知道這是一個可以在整個應用程式共用的服務。等一下我們會陸續把 Subject 變數、公開的 Observable、還有 show/hide 方法都加進這個檔案。

⚠️ 提醒大家，慣例上是一個訂閱功能對應一個 Service，不要把不相關的功能全部塞進同一個 Service，不然之後維護會很痛苦。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 宣告 Subject 變數
# Declare Subject Variables

<!--
Service 骨架有了，接下來我們要在裡面放進真正負責存資料的 Subject 變數。
-->

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

<!--
這段範例的目的是在 Service 裡宣告真正存資料的 Subject。大家可以看到我們同時示範了 `BehaviorSubject` 跟 `Subject` 兩種寫法，`BehaviorSubject` 一定要給初始值（這裡是 `false`），`Subject` 則不用。

關鍵行是變數前面的 `private`，這個修飾詞很重要——它就像是把資料放進「員工專用倉庫」，只有 Service 內部的人（也就是我們自己寫的方法）可以直接進去搬動東西，外部元件完全不能碰。

⚠️ 這是同學很容易忽略的一個細節：如果忘記加 `private`，外部元件就能直接呼叫 `loading$.next()`，資料就不再是「集中管理」，之後除錯會很痛苦，因為你不知道到底是誰改了這個值。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 公開 Observable
# Expose as Observable

<!--
資料來源鎖起來了，但外部完全看不到也不行，所以我們需要開一個「觀察窗口」給外部元件用。
-->

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

<!--
這段範例的目的是幫剛剛鎖起來的 Subject 開一個「唯讀窗口」。我們新增一個公開變數 `_loading$`，呼叫 `asObservable()` 把 `private` 的 Subject 轉成 Observable。

大家可以想成，`private` 的 Subject 是倉庫裡的貨物本體，`asObservable()` 產生的則是一面「單向玻璃窗」——外面的人（其他元件）可以透過這面窗看到裡面貨物的狀態變化，但沒辦法伸手進去動貨物。這就是為什麼 Observable 沒有 `next()` 方法。

⚠️ 提醒同學，命名習慣上加底線的 `_loading$` 代表這是要公開給外部訂閱用的，跟前面 `private` 的 `loading$` 要區分清楚，不要搞混两者的用途。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 撰寫 next 方法
# Update via next()

<!--
外部能看到資料了，但總要有人負責改資料，這一段我們就來寫真正觸發更新的方法。
-->

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

<!--
這段範例的目的是提供對外的公開方法，讓外部元件透過 `show()` 跟 `hide()` 來改資料，而不是直接操作 Subject。

大家看一下這兩個方法內部做的事情很單純，就是呼叫 `next()` 把新的值推送出去——`show()` 推 `true`，`hide()` 推 `false`。所有訂閱這個 Subject 的地方，都會在這一刻同時收到最新的值。

這樣設計的好處是，以後如果我們想在改資料的同時做一些額外處理（比如記錄 log），只需要改這兩個方法，不用去改每個呼叫的地方。
-->

---

# 撰寫 next 方法 — 注意事項

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 修改訂閱內容只能使用 <code>next()</code>，且必須呼叫 <code>private</code> 的原始 Subject（<code>loading$</code>），而非公開的 <code>_loading$</code>，因為 Observable 不具備 <code>next()</code> 方法。
</div>

| 變數 | 型別 | 可呼叫 `next()` | 說明 |
|---|---|---|---|
| `loading$` | `BehaviorSubject` | ✅ | Service 內部使用，負責推送資料 |
| `_loading$` | `Observable` | ❌ | 對外公開，僅供訂閱觀察 |

<!--
這張投影片是一個容易搞混的地方，特別整理出來提醒大家。⚠️ 重點是：能呼叫 `next()` 修改資料的，永遠只有 `private` 的原始 Subject（這裡是 `loading$`），公開給外部的 `_loading$` 是 Observable，它天生就沒有 `next()` 這個方法可以呼叫。

同學常犯的錯誤是在 Service 內部寫方法時，不小心呼叫成 `this._loading$.next(...)`，結果編譯器就會報錯說找不到 `next` 方法。看到這種錯誤，第一個要檢查的就是「我是不是呼叫錯變數了」。

這張表格大家可以當作日後複習的小抄，把兩個變數的角色分清楚，之後寫 Service 就不會搞混。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 如何訂閱？
# How to Subscribe?

<!--
Service 那邊的邏輯都準備好了，接下來我們換到元件端，看看實際上要怎麼訂閱這個資料來源。
-->

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

<!--
這段範例的目的是讓元件拿到 `LoadingService` 的實例，這是訂閱前必要的第一步。我們在 constructor 的參數上加 `private loadingService: LoadingService`，Angular 的依賴注入機制就會自動幫我們準備好這個 Service 的實例。

大家可以把這一步想成「先辦一張圖書館借閱證」，有了這張證（也就是注入好的 Service），我們才能接著去借書（訂閱資料）。

⚠️ 注意這裡只是「拿到」Service，還沒有開始訂閱，訂閱的動作我們放在下一頁的 `ngOnInit` 裡進行。
-->

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

<!--
這段範例的目的是真正開始「訂閱」這個動作。我們在 `ngOnInit` 裡呼叫 `this.loadingService._loading$.subscribe(...)`，傳進去的回呼函式，就是每次資料更新時會被自動執行的邏輯。

帶大家看一下這裡的 `res`，它代表 Service 那邊 `next()` 推送過來的最新值，名字可以自己取，習慣上會取一個有意義的名字，例如這裡如果是 boolean 狀態，也可以取名叫 `isLoading`。

執行後的預期結果是：只要 Service 呼叫一次 `show()` 或 `hide()`，這裡的 console.log 就會馬上印出對應的值，完全不需要我們手動再去讀取一次資料，這就是訂閱機制發揮作用的地方。

⚠️ 提醒同學，訂閱通常要寫在 `ngOnInit`，而不是 constructor，因為 constructor 執行時機較早，也不是 Angular 建議放商業邏輯的地方。
-->

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


<!--
我們一起把整個流程串起來複習一次。左邊是 Service 端要做的三件事：先用 `private` 藏好資料來源，再用 `asObservable()` 開一個唯讀窗口給外部看，最後提供 `show()` / `hide()` 這種公開方法，統一透過 `next()` 去改資料。

右邊則是元件端要做的三件事：先在 constructor 注入 Service，再到 `ngOnInit` 訂閱公開的 Observable，訂閱回呼一觸發，就能拿到最新資料去更新畫面。

這一整套模式非常通用，不只是 Loading 狀態，未來大家在處理任何「一個地方改資料、多個地方要同步」的需求時，都可以直接套用這個結構。
-->

---
layout: default
---

# 練習：購物車數量徽章同步
### 情境說明

電商網站常見情境：使用者在商品列表頁按下「加入購物車」，畫面上方導覽列的購物車徽章數字要**立即**同步更新，不需重新整理頁面。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**ProductListComponent**
- 顯示商品清單
- 按下「加入購物車」按鈕

</div>
<div>

**HeaderComponent**
- 顯示購物車數量徽章
- 與商品列表頁不在同一個元件

</div>
</div>

兩個元件彼此沒有父子關係，必須透過 Service 搭配 Subject，才能讓其中一邊改資料、另一邊即時收到通知。

<!--
這是實務上非常典型的訂閱情境：購物車數量要在網站的好幾個地方同步顯示（導覽列徽章、結帳頁、購物車頁），只要有任何一個地方新增商品，其他地方都要立刻反映最新數字，不能等使用者重新整理頁面才看到正確數量。

大家可以想像今天負責開發一個購物網站，商品列表跟導覽列是完全不同的元件、甚至可能不在同一個路由畫面上，這時候就是我們這一章學的訂閱機制派上用場的時候。
-->

---
layout: default
---

# 練習：購物車數量徽章同步
### 任務說明

1. 建立 `CartService`，內部以 `private` 的 `BehaviorSubject<number>` 儲存購物車數量，初始值為 `0`
2. 對外公開 `_cartCount$`（`asObservable()`），供元件訂閱
3. 提供 `addItem()` 方法，每次呼叫將目前數量 `+1` 並透過 `next()` 推送
4. 在 `ProductListComponent` 注入 `CartService`，按鈕點擊時呼叫 `addItem()`
5. 在 `HeaderComponent` 注入 `CartService`，於 `ngOnInit` 訂閱 `_cartCount$`，將收到的最新數量存入元件屬性 `cartCount`
6. `HeaderComponent` 樣板顯示 `cartCount`，確認按下商品列表的按鈕後，徽章數字會即時更新

<!--
大家可以先自己動手寫寫看，重點是想清楚：哪個變數該是 private、哪個該公開；ProductListComponent 該呼叫 Service 的哪個方法；HeaderComponent 又該訂閱哪一個變數。卡住的地方沒關係，下一頁會有解題提示。
-->

---
layout: default
---

# 練習：解題提示
### 提示說明

1. `BehaviorSubject` 一定要給初始值，這裡是 `0`，因為購物車一開始沒有商品
2. 讀取目前值可用 `.value`（`BehaviorSubject` 專屬），計算 `+1` 後再 `next()` 推送出去
3. `ProductListComponent` 只需要呼叫 `addItem()`，不需要也不能直接操作 Subject
4. `HeaderComponent` 訂閱的是公開的 `_cartCount$`，不是 `private` 的原始 Subject
5. 訂閱動作寫在 `ngOnInit`，確保元件一載入就開始監聽後續的數量變化

<!--
對照一下大家的答案，最容易搞混的地方是誤以為 ProductListComponent 也要注入、訂閱 Observable——其實它只負責「推資料」，呼叫 addItem() 就好；真正需要「訂閱、接收資料」的是 HeaderComponent。另一個常見疏漏是忘記用 .value 讀取目前數量，直接把 next() 寫死成固定數字，這樣多次點擊也不會累加。下一頁我們直接看完整解答。
-->

---
layout: default
---

# 完整解答 — CartService（一）

`cart.service.ts` 資料來源宣告：

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartCount$ = new BehaviorSubject<number>(0);

  // 取得 cartCount$ 的可觀察物件（供外部訂閱使用）
  _cartCount$ = this.cartCount$.asObservable();

}
```

<!--
先看 CartService 的資料來源部分：private 的 cartCount$ 是真正存資料的 BehaviorSubject，初始值為 0，代表購物車一開始沒有商品；公開的 _cartCount$ 透過 asObservable() 提供給外部訂閱，但無法呼叫 next()，維持資料封裝。負責改資料的方法下一頁接著看。
-->

---
layout: default
---

# 完整解答 — CartService（二）

`cart.service.ts` 公開方法：

```typescript
  addItem(): void {
    this.cartCount$.next(this.cartCount$.value + 1);
  }

  clear(): void {
    this.cartCount$.next(0);
  }

}
```

<!--
接續上一頁的 class，addItem() 讀取 cartCount$.value 目前的數量、加一後再 next() 推送出去，這也是為什麼一定要用 BehaviorSubject 而不是 Subject——因為 BehaviorSubject 才有 .value 可以直接讀到目前的值。clear() 則示範結帳完成後把購物車數量歸零的情境，同樣是實務上會需要的操作。
-->

---
layout: default
---

# 完整解答 — ProductListComponent

`product-list.component.ts` 與 `product-list.component.html`：

```typescript
import { Component } from '@angular/core';
import { CartService } from '../@service/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {

  constructor(private cartService: CartService) { }

  addToCart(): void {
    this.cartService.addItem();
  }

}
```

```html
<!-- product-list.component.html -->
<button (click)="addToCart()">加入購物車</button>
```

<!--
ProductListComponent 的角色是「推送資料的一方」，注入 CartService 之後，按鈕的 (click) 綁定 addToCart()，內部只單純呼叫 cartService.addItem()，把「數量要怎麼變」這件事完全交給 Service 處理，元件本身不需要知道、也不需要儲存目前的購物車數量。
-->

---
layout: default
---

# 完整解答 — HeaderComponent（一）

`header.component.ts` 完整內容：

```typescript
import { Component, OnInit } from '@angular/core';
import { CartService } from '../@service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  cartCount = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService._cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

}
```

<!--
HeaderComponent 的角色是「接收資料的一方」，注入 CartService 後，ngOnInit 訂閱公開的 _cartCount$，只要 ProductListComponent 那邊呼叫一次 addItem()，這裡的 subscribe 回呼就會自動執行，把最新數量存進 cartCount 屬性。樣板要怎麼顯示這個屬性，下一頁接著看。
-->

---
layout: default
---

# 完整解答 — HeaderComponent（二）

`header.component.html` 完整內容：

```html
<!-- header.component.html -->
<span class="cart-badge">🛒 {{ cartCount }}</span>
```

<!--
樣板只需要單純綁定 cartCount，因為值的更新是在 TypeScript 那邊的 subscribe 回呼裡完成的，Angular 的變更偵測會自動幫我們把最新數字反映到畫面上——完全不需要重新整理頁面，也不需要兩個元件之間有任何父子關係。

大家可以拿這三個元件的完整程式碼跟自己寫的對照，確認「誰負責推資料、誰負責收資料」的分工是不是清楚。
-->

---
layout: default
---

# 完整解答 — 兩元件同時運作

`app.component.ts` 需先 `import` 兩個子元件並加入 `imports` 陣列，`app.component.html` 才能直接使用它們的 selector。

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ProductListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent { }
```

```html
<!-- app.component.html -->
<app-header></app-header>
<app-product-list></app-product-list>
```

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**ProductListComponent（推資料）**
- 注入 `CartService`
- 按鈕點擊呼叫 `addItem()`
- 不儲存、不關心目前數量

</div>
<div>

**HeaderComponent（收資料）**
- 注入 `CartService`
- `ngOnInit` 訂閱 `_cartCount$`
- 收到推送即更新 `cartCount` 畫面

</div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> 兩個元件在 <code>app.component.html</code> 裡是平行關係，沒有互相傳資料，全部靠 <code>CartService</code> 這個共同的訂閱來源串起來。
</div>

<!--
這一頁把兩個元件放在同一張投影片上，讓大家看清楚整體運作：ProductListComponent 跟 HeaderComponent 在畫面上是完全平行、互不認識的兩個元件，兩者也沒有 @Input、@Output 這種父子傳值關係。

它們唯一的共同點，就是都注入了同一個 CartService。點擊商品列表的按鈕，會呼叫 addItem() 推送新數量；這個推送會透過 BehaviorSubject 廣播出去，凡是訂閱了 _cartCount$ 的元件（這裡是 HeaderComponent）都會立刻收到通知並更新畫面。這正是訂閱機制最大的價值：讓沒有直接關係的元件也能保持資料同步。
-->

---
layout: end
---

# 課程結束
### 掌握 RxJS Subject，實現元件間的即時資料同步！

<!--
這一章就到這邊，大家辛苦了。我們從「為什麼 ngOnInit 感知不到資料變化」的痛點出發，一步步認識了 Subject、BehaviorSubject，也親手在 Service 裡搭出一整套訂閱機制。

回去可以試著把今天的 `LoadingService` 範例自己敲一次，感受一下 Service 改一次資料、多個元件同時收到通知的那種感覺，這會幫助大家真正把訂閱這個概念記在腦子裡。下一章我們會延伸應用，看看訂閱在實際專案中還能怎麼玩。
-->
