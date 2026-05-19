---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 資料傳遞
routeAlias: ch22
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
    資料傳遞
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓頁面與元件之間溝通無阻」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **路由資料傳遞** — 使用 Service 在頁面間共享資料
- **建立 Service** — 指令、預設內容、宣告共用變數
- **頁面傳遞資料** — 跨頁面存取 Service 中的值
- **組件傳遞資料** — 為什麼需要 @Input / @Output
- **@Input** — 父元件傳值給子元件
- **@Output** — 子元件觸發父元件方法
- **實作練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 路由資料傳遞
# Route Data Sharing

---

# 為什麼需要 Service？

切換路由時，若需要將 A 頁面的資料傳給 B 頁面，但 B 頁面無法直接呼叫 A 頁面的資料。

| 問題 | 說明 |
| --- | --- |
| 路由切換 | A 頁面的元件實例已被銷毀，B 頁面無法存取 |
| 解決方式 | 建立 **Service** 作為中介儲存空間 |
| Service 特性 | 每個頁面都可以注入並讀取其中的資料 |

**Service 不只能放變數，也能放多個頁面共用的方法。**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 建立 Service
# Create a Service

---

# 建立 Service — 指令

建議在 `src` 目錄下新增 `@services` 資料夾統一管理所有 Service 檔案（一個專案可能有多個）。

```bash
# 指令格式
ng g s 檔案路徑/檔案名稱

# 範例：在 @services 資料夾中建立 example service
ng g s @services/example
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 檔案名稱<b>不需要</b>加 <code>.service.ts</code>，Angular CLI 會自動加上後綴，產生 <code>example.service.ts</code>。
</div>

---

# Service 預設內容

建立後，`example.service.ts` 的預設內容如下：

```typescript
// @services/example.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

}
```

`providedIn: 'root'` 表示這個 Service 在整個應用程式中只有一個實例（Singleton），所有頁面共用同一份資料。

---

# Service 中宣告共用變數

在 Service 中宣告需要傳遞的變數，建議命名與原頁面變數相同以方便識別。

```typescript
// @services/example.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExampleService {
  userName: string = '';
}
```

以此例：A 頁面（`first.component.ts`）要將 `userName` 傳給 B 頁面（`second.component.ts`），就在 Service 中同樣宣告 `userName`。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 頁面傳遞資料
# Pass Data Between Pages

---

# 傳遞資料 — 塞值到 Service

在 **A 頁面（發送方）** 注入 Service，並將資料塞入 Service 的變數。

```typescript
// first.component.ts
import { ExampleService } from '../@services/example.service';

export class FirstComponent {
  constructor(private exampleService: ExampleService) {}

  sendData() {
    this.exampleService.userName = 'Allen';
  }
}
```

此時 Service 中的 `userName` 就等於 `'Allen'`。

---

# 取出資料 — 從 Service 讀值

在 **B 頁面（接收方）** 同樣注入 Service，直接讀取其中的變數值。

```typescript
// second.component.ts
import { ExampleService } from '../@services/example.service';

export class SecondComponent {
  userName: string = '';

  constructor(private exampleService: ExampleService) {
    this.userName = this.exampleService.userName;
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 需確認 A 頁面已將資料塞入 Service 後，B 頁面才能讀到正確值（時序問題）。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 組件傳遞資料
# Component Data Passing

---

# 為什麼需要 @Input / @Output？

在頁面中使用子元件時，Service 無法即時反映資料更新：

| 傳遞方式 | 即時更新 | 適用情境 |
| --- | --- | --- |
| Service | ❌ 只讀一次，不即時更新 | 路由頁面之間傳遞 |
| @Input | ✅ 父元件變數更新時即時同步 | 父元件 → 子元件（傳入資料） |
| @Output | ✅ 子元件觸發時即時回傳 | 子元件 → 父元件（回傳事件） |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# @Input
# Pass Data Into Component

---

# @Input — 子元件宣告

在**子元件**中宣告接收用變數，並加上 `@Input` 裝飾器與匯入。

```typescript
// second.component.ts（子元件）
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-second',
  standalone: true,
  templateUrl: './second.component.html',
})
export class SecondComponent {
  @Input() value: string = '';
}
```

```html
<!-- second.component.html -->
<p>接收到的值：{{ value }}</p>
```

---

# @Input — 父元件使用

在**父元件**的 HTML 中，使用子元件標籤並加上 `[變數名稱]="父元件變數"` 綁定。

```typescript
// first.component.ts（父元件）
export class FirstComponent {
  parentName = 'Allen';
}
```

```html
<!-- first.component.html -->
<app-second [value]="parentName"></app-second>
```

當 `parentName` 更新時，子元件的 `value` 也會即時同步更新。

---
layout: two-cols
---

# 練習 1：@Input 練習
### 任務說明

1. 建立父頁面（A）與子元件（B）
2. 父頁面有三個輸入欄位
3. 子元件即時顯示父頁面輸入的內容
4. 三個欄位同步更新

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/22-data-passing/practice-1.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: default
---

# 練習 1：解題提示
### 提示說明

1. 子元件宣告三個 `@Input` 變數（對應三個欄位）
2. 父元件宣告三個變數，各用 `[(ngModel)]` 與輸入框雙向繫結
3. 父元件 HTML 中的子元件標籤：
   ```html
   <app-second [name]="name" [age]="age" [title]="title">
   </app-second>
   ```
4. 子元件 HTML 中用 `{{ name }}`、`{{ age }}`、`{{ title }}` 顯示

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 父元件需匯入 <code>FormsModule</code>（雙向繫結用）與 <code>SecondComponent</code>（子元件用）。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# @Output
# Pass Data Out of Component

---

# @Output — 子元件宣告

在**子元件**中宣告 `output<T>()` 變數，當需要回傳資料或觸發父元件動作時使用。

```typescript
// second.component.ts（子元件）
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-second',
  standalone: true,
  templateUrl: './second.component.html',
})
export class SecondComponent {
  changeUserName = output<string>();
}
```

---

# @Output — 子元件觸發

在子元件的方法中，使用 `.emit()` 回傳值給父元件。

```typescript
// second.component.ts（子元件）
export class SecondComponent {
  changeUserName = output<string>();
  inputName = '';

  emitName() {
    this.changeUserName.emit(this.inputName);
  }
}
```

```html
<!-- second.component.html -->
<input [(ngModel)]="inputName">
<button (click)="emitName()">送出</button>
```

---

# @Output — 父元件接收

在父元件的子元件標籤上，用 `(output變數名稱)="父元件方法($event)"` 監聽並接收回傳值。

```html
<!-- first.component.html -->
<app-second (changeUserName)="onNameChanged($event)"></app-second>
<p>收到的名稱：{{ receivedName }}</p>
```

```typescript
// first.component.ts（父元件）
export class FirstComponent {
  receivedName = '';

  onNameChanged(name: string) {
    this.receivedName = name;
  }
}
```

---
layout: two-cols
---

# 練習 2：@Output 練習
### 任務說明

1. 子元件（B）有一個輸入框與一個按鈕
2. 按下按鈕後，將值輸出給父頁面（A）
3. 父頁面（A）接收到值後顯示

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/22-data-passing/practice-2.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: default
---

# 練習 2：解題提示
### 提示說明

1. 子元件宣告 `output<string>()` 變數與 `inputValue` 變數
2. 子元件按鈕 `(click)` 呼叫方法，方法中執行 `.emit(this.inputValue)`
3. 父元件 HTML 監聽子元件的 output：
   ```html
   <app-second (myOutput)="onReceive($event)"></app-second>
   ```
4. 父元件宣告接收變數，在 `onReceive()` 方法中賦值

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>記得</b> 子元件需匯入 <code>FormsModule</code>（雙向繫結用），父元件需匯入子元件。
</div>

---
layout: end
---

# 課程結束
### 掌握 Service、@Input、@Output，讓元件之間資料自由流通
