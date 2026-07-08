---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 同步與非同步
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
    同步與非同步
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「掌握程式的執行順序，是撰寫可靠非同步邏輯的基礎」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來搞懂一個常常讓初學者頭痛的觀念：同步（Synchronous）跟非同步（Asynchronous）。

想像我們在餐廳點餐，有些店是「點完餐、站在櫃台等餐點做好才能離開」，有些店則是「點完餐先拿號碼牌去坐下，餐點好了再叫號」。程式的世界也有這兩種執行方式，如果不清楚哪段程式碼是同步、哪段是非同步，很容易誤判程式的執行順序，寫出結果跟預期不一樣的 bug。

學完這一章，大家會清楚同步跟非同步的差別、知道 setTimeout 跟 Observable 這些非同步寫法實際執行的順序，之後在 Angular 裡處理 API 呼叫時，就不會再被「怎麼資料還沒回來畫面就跑掉了」這種問題搞混。
-->

---
layout: default
---

# Outline

- **程式執行模型** — 程式碼逐行執行的基本概念
- **同步執行** — 循序執行的定義與行為
- **非同步執行** — 非阻塞執行的定義與行為
- **同步與非同步的比較** — 兩者差異對照
- **常見非同步寫法** — `setTimeout` 與 `Observable`

<!--
這一章的架構是這樣：先講程式最基本的執行模型，再分別介紹同步跟非同步各自的定義跟特性，接著把兩者放在一起比較，最後看幾個實際會用到的非同步寫法，包含 setTimeout 跟 Angular 常用的 Observable。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 程式執行模型

<!--
我們先從最基本的觀念開始：程式碼到底是照什麼順序執行的？這是理解同步跟非同步差異的地基。
-->

---

# 程式執行的基本模型

程式碼預設按照**撰寫的順序**由上至下逐行執行。

```typescript
console.log("1");
console.log("2");
console.log("3");
```

執行結果：

```
1
2
3
```

程式不會跳行、不會亂序——除非使用了特定的非同步機制。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> 同步與非同步的差異，決定了程式碼何時執行、以及執行完畢前是否會阻塞後續步驟。
</div>

<!--
大家看這個最簡單的範例，三行 console.log 依序印出 1、2、3，這應該完全在意料之中，因為預設情況下程式就是照我們寫的順序，由上往下一行一行執行。

⚠️ 這裡要特別強調的重點是：這種「照順序執行」是預設行為，不是所有程式碼都會這樣，一旦程式碼裡用了非同步的機制，執行順序就不再是我們寫的順序了，這也是這一章接下來要拆解的重點。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 同步執行

<!--
我們先從同步開始講起，因為同步是我們比較直覺、也是預設的執行方式，搞懂它之後，等一下對比非同步會更容易理解。
-->

---

# 同步執行（Synchronous）

**同步**：程式按照撰寫順序執行，每一步驟必須完成後才進入下一步。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**特性**
- 執行順序固定：A → B → C
- 前一行未完成，後一行不會啟動
- 程式流程清晰、易於追蹤

</div>
<div>

**類比：排隊點餐**
- 第一位顧客點完餐、拿到餐點
- 第二位才能開始點餐
- 後方每一位都需依序等待

</div>
</div>


<!--
「同步」的定義很直觀：程式按照撰寫順序執行，每一步驟一定要完成，才會進入下一步，前面卡住，後面就得等。

大家可以想像排隊點餐的場景：第一位顧客點完餐、等餐點做好拿到手上，第二位才能開始點，後面每個人都得乖乖排隊等前面的人處理完。同步程式碼就是這樣的邏輯，好處是流程清晰、容易追蹤，因為永遠是 A 做完才換 B。
-->

---

# 同步執行 — 程式碼示範

```typescript
function stepA(): void {
  console.log("執行 A");
}

function stepB(): void {
  console.log("執行 B");
}

function stepC(): void {
  console.log("執行 C");
}

stepA();
stepB();
stepC();
```

輸出結果永遠為：`執行 A` → `執行 B` → `執行 C`

<!--
我們實際用程式碼驗證一下剛剛講的同步概念。這裡定義了三個函式 stepA、stepB、stepC，然後依序呼叫它們。

大家帶著看一下，重點不是這三個函式做了什麼，而是呼叫的順序——因為是同步執行，所以不管這三個函式內容多複雜，輸出結果一定是「執行 A → 執行 B → 執行 C」，絕對不會跳號或亂序，這就是同步最大的特色：可預測、順序固定。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 非同步執行

<!--
同步搞懂之後，我們進入這一章的重點：非同步。非同步的行為跟同步很不一樣，這也是很多同學一開始容易搞混的地方。
-->

---

# 非同步執行（Asynchronous）

**非同步**：啟動一項工作後，程式不等待其完成，立即繼續執行後續程式碼；工作完成時再以回呼（callback）或訂閱通知結果。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**特性**
- 工作啟動後不阻塞主執行緒
- 後續程式碼立即繼續執行
- 結果透過回呼、Promise 或 Observable 回傳

</div>
<div>

**類比：取號等餐**
- 每位顧客點完餐後離開櫃台
- 店員備餐時顧客可做其他事
- 餐點好了再呼叫取餐

</div>
</div>


<!--
「非同步」的定義是：啟動一項工作後，程式不會傻傻地在原地等它做完，而是立刻繼續往下執行，等到那項工作真正完成時，再透過回呼（callback）或訂閱的方式通知我們結果。

延續剛剛排隊點餐的比喻，非同步就像是「取號等餐」：我們點完餐先拿號碼牌去坐下，這段時間可以滑手機、聊天，完全不用站在櫃台傻等，等店員備好餐、廣播叫號，我們再過去取餐就好。這就是非同步「不阻塞」的核心精神——工作在背景進行，我們可以先做別的事。
-->

---

# 非同步執行 — setTimeout 示範

`setTimeout()` 是最基本的非同步寫法，設定延遲時間（毫秒）後執行指定程式碼。

```typescript
console.log("開始");

setTimeout(() => {
  console.log("setTimeout 執行");
}, 1000);

console.log("結束");
```

實際輸出順序：

```
開始
結束
setTimeout 執行   ← 1000 毫秒後才印出
```

`setTimeout` 的回呼函式不會阻塞後續程式碼，`結束` 先於回呼被印出。

<!--
我們用大家最熟悉的 setTimeout 來實際感受一下非同步的行為。這段程式碼依序印出「開始」，接著設定一個 1000 毫秒後才會執行的 setTimeout，最後印出「結束」。

⚠️ 這裡最容易誤判的地方就是：很多同學會直覺以為輸出順序是「開始、setTimeout 執行、結束」，但實際上是「開始、結束、setTimeout 執行」。原因就是 setTimeout 把裡面的回呼函式排到之後才執行，不會卡住主程式，所以「結束」這一行反而比 setTimeout 裡的內容先印出來。

大家可以自己在瀏覽器 console 貼這段程式碼試試看，實際看到這個順序會比單看投影片更有感覺。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 同步與非同步的比較

<!--
講完同步跟非同步各自的定義跟範例，我們把兩者放在同一張表上做個整理跟比較，方便大家一次記起來。
-->

---

# 同步 vs. 非同步

| 比較項目 | 同步（Synchronous） | 非同步（Asynchronous） |
| --- | --- | --- |
| 執行順序 | 嚴格按照程式碼順序 | 工作完成後以回呼通知 |
| 是否阻塞 | 阻塞，前一步未完成則後續等待 | 不阻塞，主執行緒繼續執行 |
| 程式流程 | 清晰、線性 | 較複雜，需處理回呼或訂閱 |
| 適用情境 | 計算、資料轉換、本地邏輯 | API 呼叫、計時器、事件監聽 |
| Angular 常見用法 | 元件邏輯、樣板運算 | `HttpClient`、`Observable`、`setTimeout` |


<!--
這張表大家可以當作總複習：同步的執行順序固定、會阻塞，適合處理計算、資料轉換這種本地邏輯；非同步不會阻塞主執行緒，但流程比較複雜，需要用回呼或訂閱來處理結果，常見於 API 呼叫、計時器、事件監聽這些「需要等外部東西回應」的場景。

在 Angular 裡，大家平常寫元件邏輯、樣板運算大多是同步的；但只要牽涉到 HttpClient 打 API、Observable 資料流、或 setTimeout 計時器，就都是非同步的範疇，這也是接下來我們會花最多篇幅講解的部分。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 常見非同步寫法

<!--
最後一部分，我們把幾種實務上最常見的非同步寫法整理起來，包含 setTimeout 跟 Angular 裡最重要的 Observable。
-->

---

# 非同步寫法（一）：setTimeout

`setTimeout(callback, delay)` — 在指定毫秒後執行一次回呼函式。

| 參數 | 型別 | 說明 |
| --- | --- | --- |
| `callback` | `() => void` | 延遲後要執行的函式 |
| `delay` | `number` | 延遲毫秒數（1000 = 1 秒） |

```typescript
setTimeout(() => {
  console.log("1 秒後執行");
}, 1000);
```

常用於模擬延遲、防抖（debounce）或延後初始化。

<!--
我們正式把 setTimeout 的用法整理一次：它接收兩個參數，第一個是延遲結束後要執行的回呼函式，第二個是延遲的毫秒數，1000 毫秒等於 1 秒。

實務上 setTimeout 很常用來模擬「等待一段時間再做某件事」，例如模擬網路延遲、做輸入防抖（debounce，像是打字時不要每個字都觸發搜尋，而是停頓一下才搜尋）、或是延後某個初始化動作。這裡先讓大家對它的用法有印象，之後遇到需要延遲執行的情境就會想到它。
-->

---

# 非同步寫法（二）：Observable 與 subscribe

`Observable` 是 RxJS 提供的非同步資料流；Angular `HttpClient` 回傳 `Observable`，需呼叫 `subscribe()` 接收資料。

```typescript
import { HttpClient } from '@angular/common/http';

@Component({ ... })
export class AppComponent {
  constructor(private http: HttpClient) {}

  fetchData(): void {
    this.http.get('https://api.example.com/data')
      .subscribe((response) => {
        console.log(response);
      });
  }
}
```

`subscribe()` 的回呼在 API 回應後才執行，不阻塞其他程式碼。

<!--
這一頁我們進入 Angular 裡真正重要的非同步機制：Observable。HttpClient 打 API 的時候不會直接把資料回傳給我們，而是回傳一個 Observable，這個 Observable 可以想成是一個「還沒送到的包裹」，我們必須呼叫 subscribe() 訂閱它，等包裹真的送到（也就是 API 有回應）的時候，subscribe 裡的回呼函式才會執行。

大家看這段程式碼，fetchData() 呼叫了 http.get()，然後馬上接上 subscribe()，這整個過程是非同步的：呼叫 fetchData() 之後，程式不會卡在這裡等 API 回應，而是等回應真的到了，才執行 console.log(response) 這一段。

⚠️ 常見的錯誤是忘記呼叫 subscribe()，只寫 this.http.get(...) 卻不訂閱，這樣 API 請求根本不會真的發出去，這點要特別提醒大家。
-->

---

# 非同步寫法（三）：Observable 完整簽名

`subscribe()` 可接收三個回呼，分別處理資料、錯誤與完成事件。

| 參數 | 說明 |
| --- | --- |
| `next` | 每次收到資料時執行 |
| `error` | 發生錯誤時執行 |
| `complete` | Observable 正常結束時執行 |

```typescript
this.http.get('/api/items').subscribe({
  next: (data) => console.log('資料：', data),
  error: (err) => console.error('錯誤：', err),
  complete: () => console.log('完成'),
});
```

<!--
剛剛的 subscribe() 只寫了一個回呼，其實 subscribe() 完整可以接收三種回呼：next 處理每一次收到的資料、error 處理發生錯誤的情況、complete 則是 Observable 正常結束時執行一次。

大家可以把這三個想成客服中心的三種通知：next 是「你要的東西送到了」、error 是「抱歉，出狀況了」、complete 是「這次服務結束了」。實務上 error 這個回呼常常被忽略，但強烈建議大家養成習慣把它寫上去，不然 API 失敗的時候會完全沒有提示，使用者只會看到畫面卡住。
-->

---

# 非同步執行順序驗證

混合同步與非同步程式碼時，同步程式碼優先執行完畢，非同步回呼排入任務佇列。

```typescript
console.log("第一行");     // 同步

setTimeout(() => {
  console.log("setTimeout"); // 非同步，1 秒後
}, 1000);

console.log("第三行");     // 同步
```

輸出順序：

```
第一行
第三行
setTimeout
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 即使 <code>setTimeout</code> 延遲設為 0，回呼仍排在同步程式碼之後執行。
</div>

<!--
這一頁我們把同步跟非同步混在一起，驗證大家前面學到的觀念。程式碼裡先印「第一行」（同步），接著設定一個 1 秒後執行的 setTimeout（非同步），最後印「第三行」（同步）。

大家可以先自己猜猜看輸出順序，再對照答案：「第一行」「第三行」「setTimeout」。原因是所有同步程式碼會全部先執行完，非同步的回呼函式會被排到一個任務佇列裡，等同步程式碼都跑完了才輪到它。

⚠️ 這裡有一個常見的誤解要破除：就算把 setTimeout 的延遲時間設成 0 毫秒，它的回呼還是會排在所有同步程式碼之後執行，不會因為延遲是 0 就立刻執行，這個觀念很重要，很多 bug 都是從這裡誤判來的。
-->

---

# 在 Angular 元件中使用非同步

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `<p>{{ message }}</p>`,
})
export class AppComponent implements OnInit {
  message = '載入中...';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ text: string }>('/api/hello').subscribe({
      next: (res) => (this.message = res.text),
      error: () => (this.message = '載入失敗'),
    });
  }
}
```

`ngOnInit` 中發出請求，取得回應後更新屬性，Angular 的變更偵測自動更新樣板。

<!--
最後我們把非同步觀念放進一個真實的 Angular 元件情境裡看看。ngOnInit 執行時，message 先被設成「載入中...」，接著呼叫 http.get() 發出請求；因為這是非同步的，畫面會先顯示「載入中...」，等 API 真的回應了，subscribe 裡的 next 才會把 message 換成回傳的文字，Angular 的變更偵測會自動幫我們把畫面更新成最新的內容。

這個「先顯示載入中，資料回來後才更新畫面」的寫法，就是我們在真實專案裡最常見的非同步應用場景，大家可以留意 error 回呼也順手處理了失敗的情況，這是比較完整的寫法，值得大家平常寫程式時參考。
-->

---
layout: default
---

# 練習：使用者列表載入（Loading / Error / Success）
### 任務說明

實務上呼叫 API 幾乎都會遇到「載入中、成功、失敗」三種狀態，請實作一個會員列表元件，完整處理這三種情況。

1. 建立 `UserListComponent`，屬性 `loading`、`errorMessage`、`users` 分別代表三種狀態
2. `ngOnInit()` 一開始先將 `loading` 設為 `true`
3. 呼叫 `HttpClient.get<User[]>('/api/users')`，用 `subscribe()` 接收結果
4. `next` 回呼中將資料存入 `users`，並把 `loading` 設回 `false`
5. `error` 回呼中設定 `errorMessage`，同樣把 `loading` 設回 `false`
6. 樣板依 `loading` / `errorMessage` / `users` 三種狀態切換顯示「載入中」、錯誤訊息、或使用者清單

<!--
這一題模擬的是業界最常見的非同步情境：畫面剛進來時打 API 抓資料，使用者會先看到 loading 畫面，等資料回來才顯示清單，如果失敗則要顯示錯誤訊息，不能讓畫面一直卡在載入中。

大家可以先自己動手寫寫看，尤其留意 loading 狀態什麼時候該設成 true、什麼時候該設回 false，卡住的地方沒關係，下一頁會有解題提示。
-->

---
layout: default
---

# 練習：解題提示
### 提示說明

1. `loading` 要在發出請求「之前」設為 `true`，並在 `next` 與 `error` 兩個回呼裡都要設回 `false`
2. `error` 回呼一定要處理，否則 API 失敗時畫面會永遠停在「載入中」
3. 樣板可用 `@if` / `*ngIf` 依 `loading`、`errorMessage`、`users` 三種狀態切換內容
4. `subscribe()` 是非同步的，`ngOnInit()` 方法本身不會等 API 回應才結束
5. 型別可用泛型 `HttpClient.get<User[]>(...)` 讓 `next` 收到的資料有型別提示

<!--
對照一下大家寫的答案，最容易漏掉的地方是忘記在 error 回呼裡把 loading 設回 false，這樣一旦 API 失敗，畫面就會卡在載入中動畫，使用者完全不知道發生什麼事。另一個常見疏漏是三種狀態的樣板判斷寫得不完整，導致 loading 跟資料同時顯示。下一頁我們直接看完整解答。
-->

---
layout: default
---

# 完整解答 — Component TypeScript（一）

`user-list.component.ts` 匯入與屬性宣告：

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
})
export class UserListComponent implements OnInit {
  private readonly http = inject(HttpClient);

  loading = false;
  errorMessage = '';
  users: User[] = [];
```

<!--
先看檔案開頭：匯入 HttpClient 並定義 User 介面描述每筆會員資料的形狀。@Component 裝飾器設定好 selector 跟 templateUrl 之後，class 裡先用 inject(HttpClient) 拿到服務，接著宣告 loading、errorMessage、users 三個屬性，分別對應載入中、錯誤訊息、成功資料三種狀態。class 本體下一頁接著看。
-->

---
layout: default
---

# 完整解答 — Component TypeScript（二）

`ngOnInit()` 發出請求並依結果更新狀態：

```typescript
  ngOnInit(): void {
    this.loading = true;

    this.http.get<User[]>('/api/users').subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = '會員資料載入失敗，請稍後再試';
        this.loading = false;
      },
    });
  }
}
```

<!--
接續上一頁的 class，ngOnInit() 一開始先把 loading 設成 true，接著呼叫 http.get() 拿到 Observable，訂閱之後：next 拿到資料時把 users 填入、loading 關掉；error 發生時把 errorMessage 填入、loading 一樣要關掉。這個「先開 loading、無論成功失敗都要關 loading」的模式，是實務上處理 API 請求最基本也最重要的寫法。
-->

---
layout: default
---

# 完整解答 — Component HTML

`user-list.component.html` 完整內容：

```html
@if (loading) {
  <p>載入中...</p>
} @else if (errorMessage) {
  <p class="error">{{ errorMessage }}</p>
} @else {
  <ul>
    @for (user of users; track user.id) {
      <li>{{ user.name }}（{{ user.email }}）</li>
    }
  </ul>
}
```

<!--
樣板依序判斷三種狀態：loading 為 true 時顯示「載入中...」；否則如果 errorMessage 有值，顯示錯誤訊息；都不是的話，才代表資料成功回來了，用 @for 把 users 陣列渲染成清單。

這三段互斥的判斷，剛好對應到 TypeScript 那邊 loading、errorMessage、users 三個屬性的狀態切換，把畫面跟資料流對照著看，會更清楚「非同步請求」在真實專案裡是怎麼跟畫面串在一起的。
-->

---
layout: end
---

# 課程結束
### 分清同步與非同步的執行順序，讓非同步程式碼不再讓人意外

<!--
這一章我們把同步跟非同步的觀念從頭到尾理了一遍：同步是照順序、會阻塞的執行方式；非同步則是啟動後不等待，結果透過回呼或訂閱通知我們。setTimeout 是最基本的非同步寫法，而 Observable 搭配 subscribe() 則是 Angular 處理 API 回應最主要的模式。

記得一個核心原則：不管非同步程式碼寫在哪裡，同步程式碼永遠會優先執行完畢，這個順序觀念會一直跟著大家，之後不管是處理 HttpClient、RxJS 的各種 operator，都是建立在今天這個基礎上，把它記熟，後面學起來會輕鬆很多。
-->
