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

<!--
大家好，這一章我們要進入 RxJS，這是 Angular 開發中處理非同步資料非常重要的一個工具庫。

想像我們平常寫程式處理非同步事件，像是 API 回應、使用者點擊、計時器，如果每個都用 callback 或 Promise 各自處理，程式碼很快就會變得又亂又難維護，尤其是要把好幾個非同步來源組合起來的時候。RxJS 要解決的就是這個問題：它用「可觀察序列」這個統一的概念，把各種非同步事件都變成同一種資料流，再用運算子把它們串接組合起來。

學完這一章，大家會了解 Observable、Observer、運算子、訂閱、Subject 這幾個核心概念，並且知道怎麼在 Angular 專案裡實際運用它們處理非同步資料流。
-->

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

<!--
這張投影片先讓大家看一下今天的地圖，我們會照這個順序走：先認識 RxJS 是什麼，接著介紹 Observable 跟 Observer 這兩個核心角色，再學各種運算子怎麼組合資料流，然後看訂閱的生命週期怎麼管理，最後介紹 Subject 這種可以多播的特殊 Observable。內容不少，我們一步一步來，不用擔心。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第一部分：RxJS 簡介
## Reactive Extensions for JavaScript

<!--
先問大家一個問題：如果我們要同時處理使用者輸入、API 回應、還有計時器事件，而且這幾個還要互相搭配，一般寫法是不是要用一堆 callback 疊在一起，看起來很難讀？

RxJS 的全名是 Reactive Extensions for JavaScript，它提供一套統一的方式來描述和組合這些非同步事件，讓程式碼變得更宣告式、更好維護。我們先從它的基本概念認識起。
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
白話來說，RxJS 就是一套「用集合的方式看待非同步事件」的工具庫。以前我們可能覺得非同步事件是一次性的，比如點一次按鈕觸發一次 callback，但 RxJS 把這些事件都想成一條「流」，可以像操作陣列一樣，用 filter、map 這些熟悉的方法去過濾、轉換它。

如果大家對 Lodash 或陣列的 map/filter 熟悉的話，可以把 RxJS 想成是「事件版的 Lodash」——一樣是提供一堆現成的運算子，只是操作的對象從陣列變成了非同步事件流。這在實務上非常常用，尤其是處理表單輸入、HTTP 請求、WebSocket 訊息這些場景。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第二部分：可觀察者
## Observable

<!--
RxJS 的核心角色有兩個，一個是資料的「來源」，一個是資料的「消費者」。我們先來看資料來源這一方——Observable。
-->

---

# Observable 概念

Observable 是一個**多值的惰性 Push 集合**。

- **惰性（Lazy）**：在被訂閱之前不會執行
- **Push 模型**：由 Observable 決定何時推送值給 Observer
- **多值**：可在不同時間點推送多個值
- **可同步或非同步**：兩者皆可

<!--
這裡的定義大家可以拆開來看。「惰性」是說 Observable 建立起來之後，程式碼不會馬上執行，要等到有人「訂閱」它才會真的跑起來，這跟我們平常寫函式呼叫就馬上執行不太一樣。

「Push 模型」則是說，主導權在 Observable 身上，它決定什麼時候要推送值給我們，我們只是被動接收，這跟主動去「拉」資料的方式（像是輪詢）是相反的概念。加上它可以推送多個值、也可以同步或非同步，這幾個特性合起來，就是 Observable 跟我們熟悉的 Promise 最大的不同，等一下我們就直接來比較。
-->

---

# Observable 與 Promise 的差異

| | Observable | Promise |
|---|---|---|
| 值數量 | 多值 | 單值 |
| 惰性 | 是 | 否 |
| 可取消 | 是 | 否 |

<!--
這張表把 Observable 跟 Promise 三個關鍵差異列出來，我們可以用一個生活比喻理解：Promise 像是叫外送，下單之後餐點只會送一次，送到就結束，中途也不能取消；Observable 則像訂閱電視頻道，會持續推送新的節目內容，而且我們隨時可以退訂。

這也是為什麼在需要處理「持續性」事件，例如使用者輸入、WebSocket 訊息、計時器的時候，我們會選 Observable 而不是 Promise，因為它天生就是設計來處理多次、可取消的資料流。
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
這段範例的目的是讓大家看看 Observable 最原始的建立方式，親手感受一下「推送值」是怎麼一回事。

大家看 `new Observable()` 裡面傳入的這個函式，參數 `subscriber` 就是負責推送值的窗口，呼叫 `subscriber.next(值)` 就是推送一個值出去，呼叫 `subscriber.complete()` 就是宣告這條資料流結束了。這裡我們先同步推送 1、2、3，再用 `setTimeout` 模擬 1 秒後才推送的第 4 個值，混合了同步跟非同步兩種情境。

⚠️ 這裡要提醒大家，這段程式碼本身建立好之後「還沒有執行」，因為 Observable 是惰性的，一定要等到下一頁我們呼叫 `subscribe()` 才會真的開始推送這些值。
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
這段範例的目的是驗證前一頁講的「惰性」跟「同步/非同步混合」這兩個特性，我們實際呼叫 `subscribe()` 傳入一組回呼函式，分別處理 next、error、complete 三種通知。

大家帶著眼睛看一下執行順序：`just before subscribe` 先印出來，接著馬上印出 1、2、3，這證明呼叫 subscribe 之前程式碼真的沒有執行；`just after subscribe` 會在 1、2、3 之後、但在 4 之前印出，因為 4 是 1 秒後才非同步推送的。

⚠️ 這是同學最容易搞混的地方：不要以為 next 的呼叫順序一定跟程式碼撰寫順序一樣，非同步的部分永遠會排到後面才執行，這跟我們平常寫 JavaScript 的事件循環概念是一致的。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第三部分：觀察者
## Observer

<!--
剛剛我們看的都是「資料怎麼被推送出去」，現在換個角度，來看「誰在接收這些資料」——也就是 Observer。
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
白話來說，Observer 就是我們寫的「接電話的人」。Observable 打電話過來（推送值），Observer 負責接聽並決定怎麼處理——正常收到訊息就是 next，電話中斷出錯就是 error，對方掛電話就是 complete。

這三個回呼剛好對應 Observable 可能發生的三種狀況，業界實務上我們常常會針對這三種情況分別寫不同的處理邏輯，比如 next 拿到資料後更新畫面、error 顯示錯誤訊息、complete 做一些收尾清理。
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
這段範例的目的是示範怎麼把三個回呼包裝成一個 observer 物件，再傳給 subscribe，效果跟直接寫在 subscribe 裡面是一樣的，只是拆出來命名，程式碼會更好維護。

⚠️ 這裡要提醒大家，這三個回呼都是選用的，不是強制要全部寫。比如如果我們不在意錯誤處理，可以只給 next，但這樣萬一發生錯誤，Observable 會把錯誤通知默默吞掉，不會有任何提示，所以實務上還是建議至少處理一下 error，不然除錯會很辛苦。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第四部分：運算子
## Operators

<!--
知道了 Observable 跟 Observer 這兩個角色之後，接下來的重點是怎麼「加工」資料流——這就要靠運算子（Operators）了，這也是 RxJS 最強大、也最常用到的部分。
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
運算子大家可以想成是工廠的生產線上的一道道加工站。原料（資料）從一端進去，經過每一站的處理（過濾、轉換、合併），最後變成我們要的成品。RxJS 裡的運算子基本上就分兩大類。

第一類是 Pipeable Operators，用 `pipe()` 串起來，功能是「加工」已經存在的 Observable，像是篩選、轉換裡面的值，但不會改變原本的 Observable，而是回傳一個新的。第二類是 Creation Operators，功能是「從無到有」建立一個全新的 Observable，例如把一般的值或陣列包裝成 Observable。這兩類運算子分工不同，我們接下來分別介紹。
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
這段範例的目的是示範 `pipe()` 最基本的用法。我們先用 `of(1, 2, 3)` 建立一個依序發出 1、2、3 的 Observable，再用 `.pipe(map(x => x * x))` 把每個值平方之後才推送出去。

執行結果如註解所寫，會依序印出 1、4、9，這就是原始值經過 map 運算子加工後的結果。

⚠️ 提醒大家，`pipe()` 裡面可以放很多個運算子，用逗號隔開，資料會像水管一樣，從左邊流進去，依序經過每一節加工，最後從右邊流出來，這也是「pipe（管線）」這個命名的由來。
-->

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
這段範例的目的是示範建立運算子跟 Pipeable Operators 的不同之處：這裡傳進去的不是 Observable，而是一個單純的數字 1000（毫秒數）。

大家看 `interval(1000)`，它會建立一個每隔 1 秒就發出遞增整數（0, 1, 2, 3...）的 Observable，很適合拿來做輪詢或倒數計時這類需求。

下面表格列出的這幾個建立運算子都很常用，業界實務上像是把陣列轉成 Observable 用 `from`，把 DOM 點擊事件轉成 Observable 用 `fromEvent`，大家可以先有個印象，之後用到的時候再回來查。
-->

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
聯結建立運算子跟前一頁的建立運算子很像，都是「從無到有」建立新的 Observable，差別在於它們的輸入本身就是「多個 Observable」，功能是把好幾條資料流合併成一條。

這幾個運算子的差異主要在「合併的時機」跟「等待的邏輯」：`combineLatest` 是任何一個來源更新就重新組合最新值；`concat` 是排隊等前一個做完才做下一個；`forkJoin` 是全部都完成後才一次給結果，很像 `Promise.all`；`merge` 則是誰先到就先轉發，互不等待。這些細節不用死背，大家實務上遇到需求時，可以照著這張表去對應該用哪一個。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第五部分：訂閱
## Subscription

<!--
運算子講完了，接下來我們回頭看訂閱這件事——當我們呼叫 subscribe 之後，會拿到一個東西叫 Subscription，它負責管理這條資料流的生命週期。
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
這段範例的目的是示範 Subscription 最基本的用法：訂閱一個每秒發出遞增數字的 Observable，並且在需要的時候手動取消。

大家可以把 Subscription 想成家裡的水龍頭開關，`subscribe()` 就是打開水龍頭，水（資料）開始流出來；`unsubscribe()` 就是關掉水龍頭，停止流動並釋放資源。

⚠️ 這裡要特別提醒大家，在 Angular 元件裡如果訂閱了 Observable，卻忘記在元件銷毀時呼叫 `unsubscribe()`，就會造成記憶體洩漏，這是實務上非常常見的錯誤，尤其是像 `interval` 這種會一直發送值的 Observable，忘記取消訂閱的話會一直在背景執行、耗費資源。
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
這段範例的目的是解決一個實務上很常遇到的問題：一個元件裡往往不只訂閱一個 Observable，如果每個訂閱都要各自呼叫一次 `unsubscribe()`，程式碼會又長又容易漏掉。

解法就是用 `subscription.add(childSubscription)`，把子訂閱掛在父訂閱底下，這樣以後只要呼叫父訂閱的 `unsubscribe()`，就會一次把所有掛在下面的訂閱全部取消，不用一個一個手動處理。

這個模式在 Angular 元件裡非常實用，大家可以把它想成把好幾條水管接到同一個總開關，關掉總開關就能同時關掉所有水管，管理起來輕鬆很多。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第六部分：主體
## Subject

<!--
最後一個主題是 Subject，它是一種比較特別的 Observable，可以讓多個訂閱者同時收到同一份資料，這在需要「廣播」的場景非常有用。
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
一般的 Observable 大家可以想成是「單人客製化外送」，每個訂閱者各自收到自己的一份，互不影響；Subject 則像是「電台廣播」，同一時間發送出去的內容，所有訂閱的聽眾都會同時收到一樣的內容，這就是單播跟多播的差異。

Subject 特別的地方在於它同時具備 Observable 跟 Observer 兩種身份：一方面它可以被訂閱（像 Observable），另一方面它自己也能主動呼叫 next 推送值出去（像 Observer）。這種雙重身份是它能拿來做「橋接」用途的關鍵，等一下範例會看到。業界實務上，像是登入登出狀態這種需要同步通知多個元件的場景，就很適合用 Subject。
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
這段範例的目的是驗證 Subject 的多播特性：我們建立一個 Subject，讓 observerA 跟 observerB 都訂閱它，然後呼叫兩次 `subject.next()`。

大家看執行結果，每呼叫一次 `next()`，兩個訂閱者都會同時收到同一個值，這就是「多播」——資料只發送一次，但所有訂閱者一起收到，不像一般 Observable 每個訂閱各自獨立執行一次。

⚠️ 提醒大家，Subject 要先訂閱才能收到之後推送的值，如果訂閱的時間點在 `next()` 呼叫之後，那之前推送過的值就收不到了，這點跟等一下會介紹的 BehaviorSubject、ReplaySubject 不一樣。
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
這段範例的目的是示範 Subject 一個很實用的用法：把單播的 Observable 轉換成多播。

大家看這裡的關鍵行是 `observable.subscribe(subject)`——因為 Subject 本身也是一個 Observer，我們可以直接把它當成 observer 傳給 `subscribe()`。這樣一來，原本只能被訂閱一次的 `from([1, 2, 3])`，透過 Subject 這座橋樑，就能同時廣播給 observerA 跟 observerB 兩個訂閱者。

這個技巧在實務上常用在「多個元件需要共享同一個 HTTP 請求結果」的情境，避免同一個 API 被重複呼叫好幾次。
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
基本的 Subject 有個限制：新加入的訂閱者只能收到「訂閱之後」推送的值，之前發生的事情它完全不知道。為了因應不同需求，RxJS 提供了幾個變體。

大家可以把這幾個變體想成不同的「補課機制」：`BehaviorSubject` 像是隨時能查看的最新公告，新人加入馬上就能看到目前的狀態；`ReplaySubject` 像是有錄影回放，可以把過去 n 筆訊息重播一次給新加入的人看；`AsyncSubject` 則比較特別，只有等整個流程「結束」了，才會把最後一個結果發布出來，很像等考試全部改完才公布最終成績。業界最常用的是 `BehaviorSubject`，尤其是拿來管理應用程式的共享狀態，例如登入使用者資訊。
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
這段範例的目的是示範 BehaviorSubject「保留當前值」的特性，這是它跟一般 Subject 最大的不同。

大家跟著程式碼順序看一下：建立時給了初始值 0，所以 A 一訂閱就馬上收到 0；接著呼叫 `next(1)`，A 收到 1；這時候 B 才訂閱進來，但 B 依然立刻收到最新的值 1，而不是要等到下一次 `next()` 才有反應；最後呼叫 `next(2)`，A 跟 B 就都同時收到 2 了。

⚠️ 這裡也提醒大家，正因為 BehaviorSubject 一定要有初始值，這也是它跟 `Subject`、`ReplaySubject` 在建構子語法上最明顯的差異，建立的時候別忘了帶入初始值。
-->

---
layout: end
---

# 課程結束

### Observable 為核心、Operator 組合資料流、Subject 實現多播 — 掌握 RxJS 三大要素，駕馭 Angular 非同步開發

<!--
這一章的內容比較多，我們一起走過了 Observable 怎麼建立跟訂閱、Observer 怎麼接收通知、各種運算子怎麼加工跟組合資料流、Subscription 怎麼管理生命週期，最後是 Subject 怎麼做到多播。

如果要濃縮成一句話：Observable 是資料的來源、Operator 負責組合加工、Subject 則是讓多個地方能同時收到同一份資料。這幾個概念在 Angular 開發中會反覆用到，尤其是搭配 HttpClient、表單、路由的時候，大家平常寫程式可以多留意哪裡其實可以用 RxJS 讓程式碼更簡潔。這一章就到這裡，謝謝大家。
-->
