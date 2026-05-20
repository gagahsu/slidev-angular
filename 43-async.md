---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 同步與非同步
routeAlias: ch43
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

---
layout: default
---

# Outline

- **第一部分：程式執行模型** — 程式碼逐行執行的基本概念
- **第二部分：同步執行** — 循序執行的定義與行為
- **第三部分：非同步執行** — 非阻塞執行的定義與行為
- **第四部分：同步與非同步的比較** — 兩者差異對照
- **第五部分：常見非同步寫法** — `setTimeout` 與 `Observable`

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第一部分

## 程式執行模型

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第二部分

## 同步執行

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

<img src="/images/43-async/sync-queue-diagram.png" class="rounded shadow-md max-h-80 mx-auto mt-2" alt="同步執行流程示意圖" />

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第三部分

## 非同步執行

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

<img src="/images/43-async/async-queue-diagram.png" class="rounded shadow-md max-h-80 mx-auto mt-2" alt="非同步執行流程示意圖" />

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第四部分

## 同步與非同步的比較

---

# 同步 vs. 非同步

| 比較項目 | 同步（Synchronous） | 非同步（Asynchronous） |
| --- | --- | --- |
| 執行順序 | 嚴格按照程式碼順序 | 工作完成後以回呼通知 |
| 是否阻塞 | 阻塞，前一步未完成則後續等待 | 不阻塞，主執行緒繼續執行 |
| 程式流程 | 清晰、線性 | 較複雜，需處理回呼或訂閱 |
| 適用情境 | 計算、資料轉換、本地邏輯 | API 呼叫、計時器、事件監聽 |
| Angular 常見用法 | 元件邏輯、樣板運算 | `HttpClient`、`Observable`、`setTimeout` |

<img src="/images/43-async/sync-vs-async-comparison.png" class="rounded shadow-md max-h-80 mx-auto mt-3" alt="同步與非同步比較示意圖" />

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第五部分

## 常見非同步寫法

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

---
layout: end
---

# 本章重點回顧

- **同步執行**：程式碼循序執行，每步完成後才進行下一步
- **非同步執行**：工作啟動後不阻塞，結果透過回呼或訂閱接收
- **`setTimeout()`**：最基本的非同步延遲執行機制
- **`Observable` + `subscribe()`**：Angular 處理 API 回應的主要非同步模式
- 混合使用時，同步程式碼永遠優先於非同步回呼執行
