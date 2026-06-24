---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: RXJS
routeAlias: ch54
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

---
layout: default
---

# Outline

- **第一部分：RxJS 簡介**
- **第二部分：可觀察者（Observable）**
- **第三部分：觀察者（Observer）**
- **第四部分：運算子（Operators）**
  - 可聯入通道的運算子（Pipeable Operators）
  - 建立運算子（Creation Operators）
  - 聯結建立運算子（Join Creation Operators）
- **第五部分：訂閱（Subscription）**
- **第六部分：主體（Subject）**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第一部分：RxJS 簡介
## Reactive Extensions for JavaScript

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第二部分：可觀察者
## Observable

---

# Observable 概念

Observable 是一個**多值的惰性 Push 集合**。

- **惰性（Lazy）**：在被訂閱之前不會執行
- **Push 模型**：由 Observable 決定何時推送值給 Observer
- **多值**：可在不同時間點推送多個值
- **可同步或非同步**：兩者皆可

---

# Observable 與 Promise 的差異

| | Observable | Promise |
|---|---|---|
| 值數量 | 多值 | 單值 |
| 惰性 | 是 | 否 |
| 可取消 | 是 | 否 |

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第三部分：觀察者
## Observer

---

# Observer 概念與用法

Observer 是 Observable 所推送值的**消費者**，本質上是一組回呼函式，對應 Observable 推送的三種通知類型。

| 回呼屬性 | 觸發時機 | 說明 |
|---|---|---|
| `next` | Observable 推送正常值時 | 接收並處理每個推送值 |
| `error` | 發生錯誤時 | 接收錯誤物件，序列終止 |
| `complete` | 序列正常結束時 | 無參數，表示無更多值推送 |

要使用 Observer，將其作為引數傳入 `observable.subscribe(observer)`。

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第四部分：運算子
## Operators

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第五部分：訂閱
## Subscription

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第六部分：主體
## Subject

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

---

# Subject 的變體類型

RxJS 提供多種 Subject 變體，適用於不同的多播場景。

| 型別 | 說明 |
|---|---|
| `Subject` | 基本多播，新訂閱者只接收訂閱後推送的值 |
| `BehaviorSubject(初始值)` | 持有當前值，新訂閱者立即收到最新值 |
| `ReplaySubject(n)` | 快取最近 n 個值，新訂閱者可重播歷史值 |
| `AsyncSubject` | 僅在 `complete()` 後，發出最後一個值 |

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

---
layout: end
---

# 課程結束

### Observable 為核心、Operator 組合資料流、Subject 實現多播 — 掌握 RxJS 三大要素，駕馭 Angular 非同步開發
