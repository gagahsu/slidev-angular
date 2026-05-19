---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 方法
routeAlias: ch15
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
    Angular Full-Stack Masterclass
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    方法
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓程式碼可以重複被呼叫的魔法」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是方法**
- **方法的組成**
- **HTML 呼叫方法**
- **TS 中方法呼叫方法**
- **呼叫方法帶入值**
- **多個參數與預設值**
- **實作練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是方法
# What is a Method?

---

# 什麼是方法？

**方法（Function / 函式）** 是一個被命名的程式碼區塊，用來執行特定的任務，並且可以重複被呼叫。

| 特點 | 說明 |
| --- | --- |
| 可重複呼叫 | 同一段邏輯不用寫很多次 |
| 可從 HTML 觸發 | 按鈕點擊等事件可呼叫方法 |
| 可互相呼叫 | 方法可以呼叫其他方法 |
| 可帶入參數 | 呼叫時傳入資料讓方法使用 |
| 可回傳值 | 方法執行完可以回傳結果 |

---

# 方法的組成

建立一個方法需要三個要素：

| 要素 | 說明 | 範例 |
| --- | --- | --- |
| 方法名稱 | 用來辨識與呼叫這個方法 | `showMessage` |
| 參數（可選） | 呼叫時要帶入的資料 | `(name: string)` |
| 程式碼區塊 | 方法執行時要跑的邏輯 | `{ alert(...) }` |

---

# 方法的組成 — 範例

```typescript
export class AppComponent {

  // 方法名稱: showMessage
  // 參數: 無
  // 程式碼區塊: 執行 alert
  showMessage() {
    alert('Hello!');
  }

}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 方法宣告在 class 內部，與全域變數並列，不需要 <code>function</code> 關鍵字
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 在 Angular 中使用方法
# Calling Methods in Angular

---

# HTML 呼叫方法

在 Angular 中，通常會讓使用者點擊某個 HTML 標籤（按鈕、圖片、文字等）時，**觸發 TS 中對應的方法**。

語法：在 HTML 標籤上使用 `(click)` 事件綁定，填入要呼叫的方法名稱。

```html
<!-- app.component.html -->
<button (click)="showMessage()">點我</button>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>(click)="方法名稱()"</code> 是 Angular 的<b>事件綁定（Event Binding）</b>語法，括號代表監聽事件
</div>

---

# HTML 呼叫方法 — TS 端

HTML 用名稱呼叫方法後，TS 檔案中必須有一個**同名方法**來處理這個事件。

```typescript
// app.component.ts
export class AppComponent {

  showMessage() {
    alert('你點了按鈕！');
  }

}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 HTML 的 <code>(click)="showMessage()"</code> 與 TS 的 <code>showMessage()</code> 名稱必須完全一致
</div>

---

# TS 中方法呼叫方法

除了從 HTML 觸發，**方法也可以在 TS 內部去呼叫另一個方法**。

在方法中呼叫同一個 class 的另一個方法，需要用 `this.方法名稱()` 來呼叫。

```typescript
export class AppComponent {

  firstMethod() {
    alert('我是第一個方法');
    this.secondMethod();
  }

  secondMethod() {
    alert('我是被呼叫的第二個方法');
  }

}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 在 class 內存取自己的方法或變數，一律使用 <code>this.</code> 開頭
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 呼叫方法帶入值
# Method Parameters

---

# 呼叫方法帶入值（單一參數）

有時我們希望呼叫方法時，讓呼叫者傳入資料。這時在方法名稱後的 `()` 中定義參數：宣告一個**區域變數**來存放傳入的值。

| 語法部分 | 說明 | 範例 |
| --- | --- | --- |
| 參數名稱 | 在方法內用來讀取傳入值的變數 | `name` |
| 型別 | 指定傳入值的資料型別 | `: string` |
| 呼叫方式 | HTML 或方法中帶入實際值 | `greet('Allen')` |

---

# 呼叫方法帶入值（單一參數）— 範例

```typescript
// TS：定義參數
greet(name: string) {
  alert('Hello, ' + name);
}
```

```html
<!-- HTML：呼叫時帶入值 -->
<button (click)="greet('Allen')">打招呼</button>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 有定義參數的方法，呼叫時<b>一定要帶入值</b>，否則 TypeScript 會報錯
</div>

---

# 多個參數與預設值

方法可以要求帶入**多個值**，也可以為參數設定**預設值**（設定後該參數變成選填）。

| 語法 | 說明 |
| --- | --- |
| `(a: string, b: number)` | 多個參數，呼叫時都必填 |
| `(name: string, age: number = 18)` | `age` 有預設值，可不填 |

---

# 多個參數與預設值 — 範例

```typescript
// 多個參數：兩個都必填
introduce(name: string, age: number) {
  alert(name + ' 今年 ' + age + ' 歲');
}
```

```typescript
// 預設值：age 不填時自動用 18
introduce(name: string, age: number = 18) {
  alert(name + ' 今年 ' + age + ' 歲');
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 有預設值的參數放在最後面，未帶值時使用預設值，帶了值時以傳入值為主
</div>

---
layout: default
---

# 練習：任務說明
### 製作一個互動頁面

建立一個有按鈕的 Angular 頁面，實作以下功能：

1. 頁面有一個「顯示訊息」按鈕，點擊後用 `alert` 彈出一段文字
2. 頁面再新增一個「打招呼」按鈕，點擊後呼叫方法並帶入你的名字，alert 顯示 `Hello, [名字]`
3. 在 TS 中，讓「顯示訊息」的方法執行完後，再呼叫一個名為 `logDone()` 的第二個方法，`logDone()` 執行 `console.log('完成！')`

**完成後開啟瀏覽器的開發者工具 Console 確認 log 有出現。**

---
layout: default
---

# 練習：解題提示
### 完成步驟

1. 在 `app.component.html` 加入兩個按鈕：
   - `<button (click)="showMessage()">顯示訊息</button>`
   - `<button (click)="greet('你的名字')">打招呼</button>`

2. 在 `app.component.ts` 的 class 內定義三個方法：
   - `showMessage()` → `alert('訊息！')` 然後呼叫 `this.logDone()`
   - `greet(name: string)` → `alert('Hello, ' + name)`
   - `logDone()` → `console.log('完成！')`

3. 儲存後測試按鈕，並開啟 F12 → Console 確認 log

---
layout: end
---

# 方法完成
### 讓程式碼可以重複被呼叫！
