---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: RXJS
routeAlias: ch53
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
    RXJS
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「以可觀察序列驅動非同步資料流的響應式程式庫」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
前面幾章，我們已經用過 Observable、`subscribe` 和 Subject。這一章，我們要有系統地認識它們背後的工具庫：RxJS。

處理 API 回應、使用者點擊、計時器這些非同步事件時，如果各自用不同方式處理，程式很快就會變得又亂又難維護。RxJS 用「可觀察序列」這個統一的概念，把各種事件都變成資料流，再用運算子組合起來。
-->

---
layout: default
---

# Outline

- **RxJS 簡介**
- **可觀察者（Observable）**
- **觀察者（Observer）**
- **運算子（Operators）**
  - 可聯入通道的運算子（Pipeable Operators）
  - 建立運算子（Creation Operators）
  - 聯結建立運算子（Join Creation Operators）
- **訂閱（Subscription）**
- **主體（Subject）**

<!--
這一章會先介紹 RxJS 是什麼，接著認識兩個核心角色：資料來源 Observable，和接收資料的 Observer。然後學習各種運算子，包括串接用的運算子、建立用的運算子，以及合併多個來源的運算子。最後看訂閱的生命週期怎麼管理，以及可以多播的 Subject。內容比較多，我們一步一步來。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# RxJS 簡介
## Reactive Extensions for JavaScript

<!--
多個非同步事件互相搭配時，回呼函式很容易疊成一團。RxJS 提供一套統一的方式來處理。
-->

---

# 什麼是 RxJS？

RxJS（Reactive Extensions for JavaScript）是一個以可觀察序列（Observable sequences）編寫非同步和基於事件的程式的函式庫。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**核心型別**

- `Observable`：可觀察序列，資料流的來源

**周邊型別**

- `Observer`：消費 Observable 發出值的物件
- `Scheduler`：控制並行性的排程器
- `Subject`：多播的特殊 Observable

</div>
<div>

**設計理念**

- 以集合的方式處理非同步事件
- 宣告式（Declarative）組合複雜的非同步邏輯
- 可與 Promise、回呼（Callback）互通

**常見類比**

RxJS 之於事件處理，如同 Lodash 之於資料操作——提供豐富的運算子工具組。

</div>
</div>

<!--
RxJS 是一個「用可觀察序列來撰寫非同步和事件程式」的函式庫。

它的核心型別是 Observable，也就是資料流的來源。周邊還有接收資料的 Observer、控制執行時機的 Scheduler，以及可以多播的 Subject。

它的設計理念，是把非同步事件當成一個集合來處理。以前我們把點擊當成一次性的事件，RxJS 則把它看成一條「流」，可以像操作陣列一樣，用 `filter`、`map` 這些方法過濾和轉換。

所以 RxJS 常被比喻成事件版的 Lodash，提供大量現成的運算子，只是操作的對象從陣列變成了非同步的事件流。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 可觀察者
## Observable

<!--
RxJS 有兩個核心角色：資料的來源，以及資料的接收者。我們先看資料來源 Observable。
-->

---

# Observable 概念

Observable 是一個**多值的惰性 Push 集合**。

- **惰性（Lazy）**：在被訂閱之前不會執行
- **Push 模型**：由 Observable 決定何時推送值給 Observer
- **多值**：可在不同時間點推送多個值
- **可同步或非同步**：兩者皆可

<!--
Observable 的定義是：「一個多值、惰性、推送式的集合」。我們把它拆開來看。

惰性，代表 Observable 建立之後不會馬上執行，要等到有人訂閱，它才會開始運作。推送式，代表主導權在 Observable 身上，由它決定什麼時候把值推送給我們，我們只是被動接收。多值，代表它可以在不同的時間點推送好幾個值。另外，它可以是同步，也可以是非同步。

這幾個特性，就是 Observable 和 Promise 最大的不同。
-->

---

# Observable 與 Promise 的差異

| | Observable | Promise |
|---|---|---|
| 值數量 | 多值 | 單值 |
| 惰性 | 是 | 否 |
| 可取消 | 是 | 否 |

<!--
這張表比較了 Observable 和 Promise 的三個關鍵差異。

可以用生活比喻來理解。Promise 像叫外送，下單後只會送來一次，送到就結束，中途也不能取消。Observable 則像訂閱頻道，會持續推送新內容，而且隨時可以退訂。

所以處理持續性的事件，例如使用者輸入、計時器，我們會選擇 Observable，因為它本來就是設計來處理多次、可以取消的資料流。
-->

---

# Observable 建立與訂閱（一）

建立一個 Observable，在訂閱時同步推送 1、2、3，並於 1 秒後推送 4 後完成。

```typescript
import { Observable } from 'rxjs';

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
```

<!--
我們看 Observable 最原始的建立方式。

`new Observable` 傳入一個函式，參數 `subscriber` 就是推送值的窗口。呼叫 `subscriber.next` 推送一個值，呼叫 `subscriber.complete` 宣告這條資料流結束。這裡先同步推送 1、2、3，再用 `setTimeout`，一秒後推送 4 並結束。

要注意，這段程式建立好之後還不會執行。因為 Observable 是惰性的，要等下一頁呼叫 `subscribe` 才會開始推送。
-->

---

# Observable 建立與訂閱（二）

訂閱並處理推送的值、錯誤與完成通知：

```typescript
console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');
```

執行結果依序為：`just before subscribe` → `got value 1` → `got value 2` → `got value 3` → `just after subscribe` → `got value 4` → `done`

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>注意：</b> 值 1、2、3 為同步推送；值 4 在 1000ms 後非同步推送，因此出現在 <code>just after subscribe</code> 之後。</div>

<!--
這頁呼叫 `subscribe`，傳入三個回呼函式，分別處理 next、error 和 complete。

我們看執行順序。先印出 just before subscribe，接著馬上印出 1、2、3，這證明訂閱之前程式真的沒有執行。然後印出 just after subscribe，一秒後才印出 4，最後印出 done。

為什麼 just after subscribe 會出現在 4 之前？因為 1、2、3 是同步推送的，4 是一秒後才非同步推送。這跟我們在同步與非同步那一章學到的觀念是一樣的。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 觀察者
## Observer

<!--
剛才看的是資料怎麼被推送出去，接下來換個角度，看看是誰在接收資料：Observer。
-->

---

# Observer 概念與用法

Observer 是 Observable 所推送值的**消費者**，本質上是一組回呼函式，對應 Observable 推送的三種通知類型。

| 回呼屬性 | 觸發時機 | 說明 |
|---|---|---|
| `next` | Observable 推送正常值時 | 接收並處理每個推送值 |
| `error` | 發生錯誤時 | 接收錯誤物件，序列終止 |
| `complete` | 序列正常結束時 | 無參數，表示無更多值推送 |

要使用 Observer，將其作為引數傳入 `observable.subscribe(observer)`。

<!--
Observer 是 Observable 推送值的接收者，本質上就是一組回呼函式，對應三種通知。

可以把它想成接電話的人。Observable 打電話來推送值，Observer 負責接聽：正常收到訊息，就執行 `next`；電話中斷出錯，就執行 `error`，資料流也會終止；對方掛電話，就執行 `complete`，代表不會再有新的值。

使用時，把 Observer 傳進 `observable.subscribe` 就可以了。實務上，常會在 next 更新畫面，在 error 顯示錯誤訊息，在 complete 做收尾。
-->

---

# Observer 範例

```typescript
const observer = {
  next: (x) => console.log('Observer got a next value: ' + x),
  error: (err) => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

observable.subscribe(observer);
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>注意：</b> <code>next</code>、<code>error</code>、<code>complete</code> 三個回呼均為選用。省略某個回呼時，Observable 的對應通知將被忽略。</div>

<!--
這頁示範把三個回呼包成一個 `observer` 物件，再傳給 `subscribe`。效果跟直接寫在 `subscribe` 裡一樣，只是拆出來命名，比較好維護。

這三個回呼都是選用的，不一定要全部寫。但如果沒有寫 `error`，發生錯誤時就不會有任何提示，除錯會很辛苦，所以實務上建議至少處理一下錯誤。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 運算子
## Operators

<!--
認識了 Observable 和 Observer，接下來是 RxJS 最強大的部分：運算子。
-->

---

# 運算子概覽

運算子（Operators）是 RxJS 最核心的功能，提供宣告式方式組合複雜的非同步邏輯。**運算子本質上是函式。**

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**可聯入通道的運算子（Pipeable Operators）**

- 以 `observable.pipe(operator())` 語法串接
- 常見範例：`filter()`、`map()`、`mergeMap()`
- 不修改原有 Observable 實例
- 回傳一個新的 Observable

</div>
<div>

**建立運算子（Creation Operators）**

- 獨立函式，以預定義行為或組合其他 Observable 來建立新的 Observable
- 輸入引數通常為純值，而非 Observable
- 常見範例：`of()`、`interval()`、`from()`

</div>
</div>

<!--
運算子是 RxJS 最核心的功能，讓我們用宣告式的方式組合非同步邏輯。運算子本質上就是函式。

可以把運算子想成工廠生產線上的加工站，資料從一端進去，經過過濾、轉換、合併，最後變成我們要的結果。

運算子分成兩大類。第一類是可串接的運算子，用 `pipe` 串起來，例如 `filter`、`map`，它們加工現有的 Observable，不會修改原本的，而是回傳一個新的 Observable。第二類是建立運算子，例如 `of`、`interval`、`from`，用來從無到有建立一個新的 Observable，輸入的通常是一般的值。
-->

---

# 可聯入通道的運算子（Pipeable Operators）

使用 `pipe()` 串接運算子，每個運算子回傳一個新的 Observable：

```typescript
import { of, map } from 'rxjs';

of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((v) => console.log(`value: ${v}`));

// Logs:
// value: 1
// value: 4
// value: 9
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>注意：</b> <code>pipe()</code> 可串接多個運算子，資料流從左至右依序經過每個運算子處理。</div>

<!--
我們看 `pipe` 的基本用法。

先用 `of(1, 2, 3)` 建立一個依序發出 1、2、3 的 Observable，再用 `pipe` 接上 `map`，把每個值平方之後才推送出去。所以結果會依序印出 1、4、9。

`pipe` 裡可以放好幾個運算子，用逗號隔開。資料就像在水管裡流動，依序經過每一個運算子的處理，這也是「pipe」，管線這個名稱的由來。
-->

---
zoom: 0.87
---

# 建立運算子（Creation Operators）

建立運算子以**非 Observable 的引數**建立 Observable。`interval` 是典型範例，接受毫秒數，回傳每隔指定時間發出遞增整數的 Observable：

```typescript
import { interval } from 'rxjs';

const observable = interval(1000 /* number of milliseconds */);

// 每隔 1000ms 發出 0, 1, 2, 3, ...
observable.subscribe((x) => console.log(x));
```

| 常用建立運算子 | 說明 |
|---|---|
| `of(...values)` | 同步依序發出指定值後完成 |
| `from(iterable)` | 將陣列、Promise 或可迭代物件轉為 Observable |
| `interval(ms)` | 每隔指定毫秒發出遞增整數 |
| `timer(delay, ms)` | 延遲後開始，每隔指定毫秒發出值 |
| `fromEvent(target, event)` | 將 DOM 事件轉為 Observable |

<!--
接著是建立運算子，它用不是 Observable 的參數，來建立一個 Observable。

`interval` 是典型的例子，傳入的是毫秒數 1000，它會建立一個每隔一秒發出遞增整數，0、1、2、3 的 Observable，很適合做定時查詢或倒數計時。

表格列了幾個常用的建立運算子：`of` 依序發出指定的值；`from` 把陣列或 Promise 轉成 Observable；`timer` 延遲一段時間後才開始；`fromEvent` 則把畫面上的事件，例如點擊，轉成 Observable。先有個印象，之後用到再回來查。
-->

---
zoom: 0.92
---

# 聯結建立運算子（Join Creation Operators）

聯結建立運算子具有建立運算子的性質，同時能合併多個來源 Observable 的值。

| 運算子 | 說明 |
|---|---|
| `combineLatest(obs[])` | 任一來源發出值時，組合所有來源的最新值發出 |
| `concat(obs[])` | 依序串接多個 Observable，前一個完成後才訂閱下一個 |
| `forkJoin(obs[])` | 等待所有來源完成後，發出各來源的最後一個值 |
| `merge(obs[])` | 同時訂閱所有來源，任一發出值即轉發 |
| `partition(obs, pred)` | 依條件將 Observable 分割為兩個 |
| `race(obs[])` | 僅保留最先發出值的那個來源 |
| `zip(obs[])` | 將各來源相同索引位置的值組合後發出 |

參考資源：[https://rxjs.angular.tw/guide/operators](https://rxjs.angular.tw/guide/operators)

<!--
第三類是聯結建立運算子。它們同樣是建立新的 Observable，但輸入的是好幾個 Observable，用來把多條資料流合併成一條。

這些運算子的差別，主要在合併的時機。`combineLatest` 是任何一個來源更新，就組合所有來源的最新值；`concat` 是排隊，前一個完成才訂閱下一個；`forkJoin` 是等所有來源都完成，才一次給出結果，很像 `Promise.all`；`merge` 則是同時訂閱，誰先到就先轉發。

這些不用死背，遇到需求時，可以照著這張表找出適合的運算子。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 訂閱
## Subscription

<!--
運算子介紹完了，我們回頭看訂閱，以及它的生命週期管理。
-->

---

# Subscription 概念

Subscription 代表 Observable 的**一次執行**，是一個可釋放資源的物件。

| 方法 | 說明 |
|---|---|
| `unsubscribe()` | 取消訂閱並釋放資源，不接受任何引數 |
| `add(childSub)` | 將子訂閱加入父訂閱，統一管理生命週期 |
| `remove(childSub)` | 從父訂閱中移除子訂閱 |

```typescript
import { interval } from 'rxjs';

const observable = interval(1000);
const subscription = observable.subscribe((x) => console.log(x));

// 呼叫後取消 Observable 的執行，釋放資源
subscription.unsubscribe();
```

<!--
Subscription 代表 Observable 的一次執行，是一個可以釋放資源的物件。

可以把它想成水龍頭的開關：`subscribe` 是打開水龍頭，資料開始流出；`unsubscribe` 是關掉水龍頭，停止並釋放資源。

範例中訂閱了一個每秒發出數字的 `interval`，呼叫 `subscription.unsubscribe()` 就會停止。

在 Angular 元件裡，如果訂閱了 Observable，卻沒有在元件銷毀時取消訂閱，就會造成記憶體洩漏。像 `interval` 這種會一直發送值的 Observable，會一直在背景執行。這也是之前生命週期那一章，要在 `ngOnDestroy` 取消訂閱的原因。
-->

---

# 多個訂閱的統一管理

透過 `add()` 將子訂閱加入父訂閱，呼叫一次 `unsubscribe()` 即可同時取消所有訂閱：

```typescript
import { interval } from 'rxjs';

const observable1 = interval(400);
const observable2 = interval(300);

const subscription = observable1.subscribe((x) => console.log('first: ' + x));
const childSubscription = observable2.subscribe(
  (x) => console.log('second: ' + x)
);

subscription.add(childSubscription);

setTimeout(() => {
  // 同時取消 subscription 與 childSubscription
  subscription.unsubscribe();
}, 1000);
```

<!--
一個元件裡常常不只訂閱一個 Observable，如果每個都要各自取消，程式會很長，也容易漏掉。

解決方法是用 `add`，把子訂閱掛在父訂閱底下。範例中訂閱了兩個 `interval`，再用 `subscription.add` 把第二個掛上去。一秒之後，只要呼叫父訂閱的 `unsubscribe`，兩個訂閱就會一起被取消。

就像把好幾條水管接到同一個總開關，關掉總開關，所有水管就一起關掉了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 主體
## Subject

<!--
最後一個主題是 Subject，它是一種特別的 Observable，可以讓好幾個訂閱者同時收到同一份資料。
-->

---

# Subject 概念

Subject 是一種特殊型別的 Observable，允許將值**多播**（Multicast）到多個 Observer。

**Observable 與 Subject 的差異**

| | Observable | Subject |
|---|---|---|
| 播送方式 | 單播（Unicast） | 多播（Multicast） |
| 執行次數 | 每個訂閱各自獨立執行 | 所有訂閱共享同一執行 |
| 同時具備 | 只有 Observable | Observable + Observer |
| 應用場景 | API 呼叫、各自獨立的資料流 | 登入/登出後，所有訂閱 auth 狀態的元件同時切換畫面 |

**Subject 的雙重身份**

- 作為 **Observable**：可被訂閱
- 作為 **Observer**：可呼叫 `next()`、`error()`、`complete()` 主動推送值

<!--
Subject 是一種特殊的 Observable，可以把值「多播」給好幾個 Observer。

一般的 Observable 是單播，像是個人的客製化外送，每個訂閱者各自執行一次，互不影響。Subject 則像電台廣播，所有訂閱者共享同一次執行，同時收到一樣的內容。

Subject 同時有兩種身分：它是 Observable，可以被訂閱；它也是 Observer，可以自己呼叫 `next` 推送值。像登入登出這種需要同時通知多個元件的情況，就很適合用 Subject。我們在訂閱那一章已經實際用過它。
-->

---

# Subject 概念 — 程式碼範例

```typescript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
```

<!--
這個範例驗證 Subject 的多播特性。

建立一個 Subject，讓 observerA 和 observerB 都訂閱它，再呼叫兩次 `next`。結果每呼叫一次，兩個訂閱者都會同時收到同一個值，依序印出 A 收到 1、B 收到 1，A 收到 2、B 收到 2。

要注意，基本的 Subject 要先訂閱，才收得到之後推送的值。如果在 `next` 之後才訂閱，之前推送過的值就收不到了。
-->

---

# Subject 作為 Observable 的橋接

Subject 可作為橋接器，將單播的 Observable 轉換為多播，供多個 Observer 同時接收：

```typescript
import { Subject, from } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({ next: (v) => console.log(`observerA: ${v}`) });
subject.subscribe({ next: (v) => console.log(`observerB: ${v}`) });

const observable = from([1, 2, 3]);

// 將 Subject 作為 Observer 傳入，使多個訂閱者共享同一資料流
observable.subscribe(subject);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```

<!--
Subject 還有一個實用的用法：把單播的 Observable 轉成多播。

關鍵是 `observable.subscribe(subject)`。因為 Subject 本身也是 Observer，可以直接傳給 `subscribe`。這樣 `from([1, 2, 3])` 推送的值，就會透過 Subject 這座橋，同時廣播給 observerA 和 observerB。

實務上，這常用在多個元件要共用同一個資料來源的情況，避免同樣的處理被重複執行。
-->

---

# Subject 的變體類型

RxJS 提供多種 Subject 變體，適用於不同的多播場景。

| 型別 | 說明 |
|---|---|
| `Subject` | 基本多播，新訂閱者只接收訂閱後推送的值 |
| `BehaviorSubject(初始值)` | 持有當前值，新訂閱者立即收到最新值 |
| `ReplaySubject(n)` | 快取最近 n 個值，新訂閱者可重播歷史值 |
| `AsyncSubject` | 僅在 `complete()` 後，發出最後一個值 |

<!--
基本的 Subject 有一個限制：新的訂閱者只能收到訂閱之後的值。RxJS 提供了幾個變體，應付不同的需求。

可以把它們想成不同的補課機制。`BehaviorSubject` 持有目前的值，新的訂閱者會立刻收到最新的值，就像隨時可以查看的最新公告。`ReplaySubject` 會快取最近幾筆值，新的訂閱者可以重播歷史資料，就像錄影回放。`AsyncSubject` 則只在 `complete` 之後，才發出最後一個值，就像考試改完才公布成績。

實務上最常用的是 `BehaviorSubject`，我們在訂閱和載入動畫那兩章都用過它。
-->

---

# Subject 的變體類型 — BehaviorSubject 範例

```typescript
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(0); // 初始值為 0
subject.subscribe((v) => console.log('A: ' + v)); // A: 0（立即接收初始值）
subject.next(1);                                   // A: 1
subject.subscribe((v) => console.log('B: ' + v)); // B: 1（接收當前值）
subject.next(2);                                   // A: 2, B: 2
```

<!--
這個範例示範 `BehaviorSubject` 保留目前值的特性。

建立時給了初始值 0，所以 A 一訂閱就立刻收到 0。接著 `next(1)`，A 收到 1。這時 B 才訂閱，但 B 會立刻收到目前的值 1，不用等下一次 `next`。最後 `next(2)`，A 和 B 同時收到 2。

也因為 `BehaviorSubject` 一定要有初始值，建立時別忘了帶入。
-->

---
layout: end
---

# 課程結束

### Observable 為核心、Operator 組合資料流、Subject 實現多播 — 掌握 RxJS 三大要素，駕馭 Angular 非同步開發

<!--
這一章我們認識了 RxJS。Observable 是惰性、推送式的資料來源，可以推送多個值，也可以取消；Observer 用 next、error、complete 接收通知。運算子用來加工和組合資料流：`pipe` 串接 `map`、`filter`，`of`、`from`、`interval` 建立資料流，`merge`、`forkJoin` 這類運算子合併多個來源。Subscription 用 `unsubscribe` 管理生命週期，Subject 則可以多播，`BehaviorSubject` 會保留目前的值。

下一章，我們會學習如何把 Angular 專案打包。我們下一章見。
-->
