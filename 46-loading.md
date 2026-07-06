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

<!--
大家好，這一章我們要來做一個幾乎每個網站都有的東西：Loading 動畫。

不曉得大家有沒有遇過這種經驗：點了一個按鈕之後，畫面完全沒反應，心裡會想「是不是當掉了」，然後忍不住連續點好幾下，甚至直接重新整理頁面。這其實是很常見的使用者體驗問題——系統明明在處理，但使用者看不到任何回饋。

學完這一章，大家會知道怎麼用 Angular Material 的 `mat-spinner`，搭配我們上一章學到的訂閱機制，做出一套全站共用、集中管理的 Loading 動畫系統。
-->

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

<!--
先帶大家看一下這一章的路線圖。我們會先講為什麼需要 Loading、認識 `mat-spinner` 這個元件，接著處理它的 CSS 定位問題，然後把顯示邏輯集中到 `LoadingService`，在 `AppComponent` 統一管理，搭配 `async` pipe 讓畫面自動反應狀態，最後看看怎麼在各個頁面觸發它、以及怎麼客製化外觀。整體架構其實就是把上一章學的訂閱機制，實際應用在一個真實的功能上。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 為什麼需要 Loading 動畫
## Why Loading Matters

<!--
我們先從使用者的角度出發，想想看沒有 Loading 動畫時會發生什麼事。
-->

---

# 問題：等待 API 回傳時的使用者體驗

串接 API 後，若回傳需要較長時間而畫面毫無回應，使用者可能誤判網頁已損壞，進而重新整理或重複點擊按鈕。

<div class="flex justify-center">
  <img src="/images/45-loading/loading-spinner-preview.png" class="rounded shadow-md max-h-80" />
</div>

**解決方案：** 在資料回傳前顯示載入動畫，資料就緒後隱藏。

<!--
這張投影片講的就是我們前面提到的痛點。想像大家去銀行提款機領錢，如果螢幕完全沒有任何顯示，我們一定會懷疑機器是不是壞了，可能會去按其他按鈕，甚至拍打機器。但如果螢幕顯示「處理中，請稍候」的轉圈動畫，我們就會安心等待，因為知道系統正在運作。

網頁串接 API 也是一樣的道理，如果後端回應需要一兩秒甚至更久，畫面卻毫無反應，使用者很容易誤判、重複點擊，甚至造成重複送出表單這種更嚴重的問題。

解決方式很單純：資料還沒回來之前，先顯示一個載入動畫告訴使用者「系統正在處理」，資料一到就把動畫收起來。這就是我們這一章要實作的功能。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-spinner
## Angular Material Progress Spinner

<!--
Angular 生態系其實已經幫我們準備好現成的載入動畫元件，不用自己刻，我們來認識一下它。
-->

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

<!--
這段範例的目的是先確認我們有安裝 Angular Material 這個套件。`mat-spinner` 其實就是 Angular Material 裡的 `MatProgressSpinnerModule`，是官方內建的旋轉載入動畫。

大家可以把它想成一個已經幫我們設計好、測試好的「現成零件」，不用自己用 CSS 刻旋轉動畫，直接安裝套件就能用。

如果專案還沒裝過 Angular Material，執行 `ng add @angular/material` 就能安裝，安裝過程 CLI 也會順便問我們主題配色這些設定，這部分我們在之前的章節已經介紹過。
-->

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

<!--
帶大家看一下這段範例，目的是示範最基本、最快速的用法——只要在 HTML 裡寫一行 `<mat-spinner></mat-spinner>`，畫面上就會出現一個旋轉的載入動畫，完全不用自己寫任何 CSS 動畫。

⚠️ 唯一要注意的是，記得在 Module 或 standalone component 的 `imports` 裡加入 `MatProgressSpinnerModule`，這是很多同學第一次用會漏掉的步驟，漏了的話畫面上什麼都不會顯示，也不一定會報明顯的錯誤，容易讓人以為程式碼哪裡寫錯了。

預期結果：畫面上會出現一個圈圈持續旋轉的動畫，但預設位置通常在頁面偏下方，下一段我們會處理定位問題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS 定位
## 置中顯示與全螢幕遮罩

<!--
Spinner 顯示出來了，但預設的位置不太理想，接下來我們用 CSS 把它調整到畫面正中央，並且加上遮罩阻擋使用者操作。
-->

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

<!--
這段範例的目的是把預設跑到頁面下方的 Spinner，固定移到畫面正中央。

大家可以把 `position: fixed` 想成把 Spinner「釘」在瀏覽器視窗上，不管頁面怎麼捲動，它都待在同一個相對位置；`top: 50%; left: 50%` 先把它的左上角移到畫面正中間，但這樣元件的中心點還是會偏右下，所以還需要 `transform: translate(-50%, -50%)` 把它往回拉半個自身的寬高，才能真正讓元件的正中心對齊畫面正中心。

⚠️ 這裡最容易漏掉的就是這個 `transform` 屬性，如果只設定 `top/left: 50%` 而沒有做這個修正，Spinner 看起來會偏一邊，不是真正的置中。
-->

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

<!--
這段範例的目的是解決另一個問題：Loading 期間，使用者其實還是可以點擊畫面上其他按鈕或連結，這樣可能會造成重複送出、或是點到還沒準備好的功能。

我們新增一個 `.overlay` 的透明遮罩層，鋪滿整個畫面，蓋在原本的內容之上，讓使用者在 Loading 期間點不到底下的元素。`backdrop-filter: blur(2px)` 則是額外加分的視覺效果，讓背景稍微模糊，給使用者更明確「畫面正在忙碌中」的感覺。

⚠️ 這裡要注意 `z-index` 的層級關係：遮罩要蓋住頁面內容，但 Spinner 本身還要能顯示在遮罩之上，所以等一下大家會看到 Spinner 的 `z-index` 設定要比遮罩更高（後面的完整架構總覽會再整理一次這個關係）。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# LoadingService
## 以 RxJS BehaviorSubject 集中管理狀態

<!--
CSS 的外觀問題解決了，接下來我們要處理更核心的問題：怎麼「集中管理」Loading 動畫的顯示與隱藏邏輯。這裡我們會直接沿用上一章學到的訂閱機制。
-->

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

<!--
這段範例的目的是用 Angular CLI 快速產生一個乾淨的 Service 檔案，不用自己手動建立檔案再一行一行打樣板程式碼。

執行 `ng g s loading` 之後，CLI 會自動幫我們建立 `loading.service.ts`，並且加上 `@Injectable({ providedIn: 'root' })`，代表這個 Service 在整個應用程式中只會有一份實例，所有元件注入的都是同一個。

這也是我們把 Loading 邏輯抽離出來的原因：如果每個頁面都各自寫一套顯示/隱藏的邏輯，之後要改行為（例如加個延遲效果）就要改很多地方，集中在一個 Service 裡維護起來輕鬆很多。
-->

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

<!--
這段範例的目的是把上一章學到的訂閱模式，直接套用在 Loading 這個實際功能上。大家可以發現整體結構跟上一章一模一樣：`private` 的 `_loading$` 負責存資料，公開的 `loading$` 透過 `asObservable()` 對外開放訂閱，再提供 `show()` 跟 `hide()` 兩個方法統一修改狀態。

這裡選用 `BehaviorSubject` 而不是普通的 `Subject`，是因為 Loading 狀態這種東西必須「隨時都有一個值」——不管有沒有人正在訂閱，畫面上的 Loading 動畫都要知道現在該顯示還是隱藏，所以一定要有初始值（這裡是 `false`，代表預設不顯示）。

執行後的預期結果是：任何元件呼叫 `show()`，所有訂閱 `loading$` 的地方都會同時收到 `true`；呼叫 `hide()` 則收到 `false`。
-->

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

<!--
這張表格幫大家把 `LoadingService` 裡每個屬性、方法的角色整理一遍，建議大家對照著上一頁的程式碼一起看。

`_loading$` 就是資料本體，`loading$` 是對外的觀察窗口，`show()` 跟 `hide()` 則是唯二可以合法改變狀態的入口。

⚠️ 特別提醒同學，外部元件永遠只應該用 `loading$` 訂閱，絕對不要嘗試去用 `_loading$`，因為它是 `private`，在 TypeScript 的型別檢查下，外部元件根本存取不到、也編譯不過，這是刻意設計的保護機制，不是疏漏。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# AppComponent 整合
## 將 Loading 放在應用程式根元件

<!--
Service 準備好了，接下來我們要決定：這個 Loading 動畫要放在畫面的哪裡？答案是放在整個應用程式的根元件，也就是 `AppComponent`。
-->

---

# 將 Spinner 移至 AppComponent

把 `<mat-spinner>` 移至 `app.component.html`，使所有頁面共用同一個 Loading 動畫，不必在每個頁面重複撰寫：

```html
<router-outlet></router-outlet>
<mat-spinner></mat-spinner>
```

<!--
這段範例的目的是說明「為什麼要放在 AppComponent」這個決定。大家可以想像 `AppComponent` 就像是一整棟大樓的大門口，`<router-outlet>` 則是根據不同樓層（路由）顯示不同的房間內容。我們把 Spinner 放在大門口這個位置，不管使用者現在在哪個樓層、瀏覽哪個頁面，Loading 動畫都能顯示在最上層，蓋住整個畫面。

如果每個頁面元件各自放一個 `<mat-spinner>`，不僅要重複寫很多次，畫面切換時動畫也可能對不齊、甚至同時出現兩個。放在根元件是最省事、也最一致的做法。
-->

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

<!--
這段範例的目的是讓 `AppComponent` 拿到 `LoadingService` 公開的 Observable，準備在畫面上使用。我們先在 constructor 注入 `LoadingService`，再到 `ngOnInit` 裡把 `this.loadingService.loading$` 指派給元件自己的 `loading$` 屬性。

大家可以把這步想成「把 Service 的水管接到自己家裡」，接好之後我們才能在 Template 裡用 `async` pipe 去接這條水管流出來的資料，這是下一段要講的內容。

⚠️ 這裡務必接的是公開的 `loading$`，不是 `private` 的 `_loading$`，跟前面提醒的原則是一樣的。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# async Pipe
## 在 Template 中訂閱 Observable

<!--
拿到 Observable 之後，我們可以直接手動 subscribe，但 Angular 其實提供了一個更簡潔的方式——`async` pipe，接下來我們就來看怎麼用。
-->

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

<!--
這段範例的目的是在 Template 裡自動訂閱 `loading$`，不用在 TypeScript 裡手動寫 `subscribe()`。`loading$ | async` 這個寫法，代表把 `loading$` 這個 Observable「餵給」`async` pipe，它會自動幫我們訂閱，並把每次收到的最新值吐出來給 `@if` 判斷。

大家可以把 `async` pipe 想成一個貼心的助理，它會自動幫我們盯著這條資料流，一有新值就更新畫面，而且元件銷毀的時候它也會自動取消訂閱，不用我們自己操心善後。

⚠️ 別忘了在元件的 `imports` 裡加上 `CommonModule`，因為 `async` pipe 是屬於 Angular 的 CommonModule，standalone component 沒有內建這個 pipe。
-->

---

# async Pipe 說明

`async` pipe 用於在 Template 中訂閱 `Observable` 或 `Promise`：

- 當 `show()` 呼叫 `_loading$.next(true)` 時，`async` 收到新值 `true`，`@if` 條件成立，Spinner 顯示
- 當 `hide()` 呼叫 `_loading$.next(false)` 時，`async` 收到 `false`，Spinner 隱藏
- 元件銷毀時，`async` 自動取消訂閱，無需手動 `unsubscribe()`

<!--
這張投影片把 `async` pipe 的運作流程完整串一遍給大家聽。整個鏈路是這樣的：某個頁面呼叫 `show()` → `LoadingService` 內部的 `_loading$` 推送 `true` → `AppComponent` 訂閱的 `loading$` 收到通知 → Template 裡的 `async` pipe 拿到新值 `true` → `@if` 條件成立 → Spinner 顯示。`hide()` 則是反過來，一路推送 `false`，讓 Spinner 收起來。

大家可以特別留意最後一點：手動 `subscribe()` 如果沒有搭配 `ngOnDestroy` 去 `unsubscribe()`，很容易造成記憶體洩漏；但用 `async` pipe 就不用擔心這個問題，Angular 會在元件銷毀時自動處理，這也是為什麼在 Template 裡我們通常優先選用 `async` pipe 而不是手動訂閱。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 在各頁面觸發 Loading
## 呼叫 show() 與 hide()

<!--
整套顯示機制都接好了，現在只差最後一步：在真正需要 Loading 的頁面裡，實際呼叫 `show()` 跟 `hide()`。
-->

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

<!--
這段範例的目的是示範在一個實際頁面裡怎麼使用 `LoadingService`。跟前一章一樣，先在 constructor 注入 Service，接著在需要顯示 Loading 的時機呼叫 `show()`，等資料回來之後再呼叫 `hide()`。

大家可以看到程式碼裡有個註解「在 API 回傳後呼叫 hide()」，這提醒我們一個很重要的觀念：`show()` 跟 `hide()` 通常是成對出現的，`show()` 放在發送請求之前，`hide()` 放在拿到回應之後（不管成功或失敗）。

⚠️ 提醒同學一個容易忘記的地雷：如果 API 呼叫失敗，也要記得呼叫 `hide()`，不然 Loading 動畫會卡住不消失，使用者會以為畫面當掉了。實務上通常會在 `finally` 區塊裡呼叫 `hide()`，確保不管成功失敗都會執行。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 客製化 Spinner
## 調整顏色與大小

<!--
功能都做完了，最後我們看一下怎麼調整 Spinner 的外觀，讓它更符合我們專案的視覺風格。
-->

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

<!--
這段範例的目的是讓 Spinner 的外觀能配合我們專案的主題色，而不是永遠用預設的顏色和大小。

顏色的部分，因為 Angular Material 元件的樣式底層是用 CSS 自訂屬性（CSS variable）控制的，所以我們不需要去改元件內部的樣式檔案，只要在自己的 CSS 裡覆寫 `--mdc-circular-progress-active-indicator-color` 這個變數就好，這裡示範改成白色，適合搭配深色的遮罩背景。

大小的部分則透過 `[diameter]` 屬性直接綁定數字，單位是 px，數字越大圈圈越大。

⚠️ 提醒同學，`diameter` 是綁定屬性要用中括號 `[diameter]`，如果忘記寫成 `diameter="70"`，Angular 會把它當成純文字字串處理，而不是數字，可能會出現預期外的結果。
-->

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

<!--
最後我們把整個架構完整複習一遍。核心是 `LoadingService`：私有的 `_loading$` 存狀態、公開的 `loading$` 讓外部訂閱、`show()` / `hide()` 負責更新狀態。

`AppComponent` 作為根元件，注入 Service、訂閱 `loading$`，並在 Template 用 `async` 搭配 `@if` 自動控制 Spinner 的顯示與隱藏。

各功能頁面則只需要注入 Service，在 API 呼叫前後分別呼叫 `show()` 跟 `hide()`，完全不用管畫面上 Spinner 要怎麼顯示，這些細節都交給 `AppComponent` 統一處理。

CSS 的部分也再提醒一次層級關係：`mat-spinner` 用 `position: fixed` 置中，`.overlay` 遮罩蓋住整個畫面（`z-index: 2`），Spinner 本身的 `z-index: 5` 要比遮罩更高，這樣才能確保遮罩擋住底下內容的同時，Spinner 還能顯示在最上層。
-->

---
layout: end
---

# 課程結束

### Loading 動畫透過 mat-spinner + LoadingService + async pipe 三者協作，實現全域統一的載入狀態管理

<!--
這一章就到這邊，大家辛苦了。我們從使用者體驗的痛點出發，一路把 `mat-spinner`、CSS 定位、上一章學的訂閱機制、還有 `async` pipe，全部串成一套完整可重用的 Loading 系統。

回去可以試著自己動手做一次，特別是把 `show()` 忘記呼叫 `hide()` 的情境也實際測試看看，感受一下如果沒處理好會發生什麼問題，這樣印象會更深刻。這也是我們兩章下來，把訂閱機制實際應用在真實功能上的一個完整案例，希望大家能把這個模式帶到未來自己的專案裡。
-->

