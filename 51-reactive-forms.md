---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Reactive Forms
routeAlias: ch51
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
    Reactive Forms
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「以程式碼驅動表單，掌控每一個輸入細節」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **Reactive Forms 是什麼** — 模型驅動表單的概念與特性
- **為什麼要用 Reactive Forms** — 四大使用優勢
- **Reactive Forms 核心** — FormControl、FormGroup、FormArray
- **動態增減欄位** — 使用 FormArray 實作新增／刪除題目
- **畫面顯示** — HTML 樣板繫結 `formGroup`、`formControlName`、`formArrayName`

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Reactive Forms 是什麼？
# What is Reactive Forms?

---

# Reactive Forms 是什麼？

Reactive Forms（響應式表單）是 Angular 中以**模型驅動（Model-Driven）**方式處理表單的技術。表單結構與驗證邏輯在 TypeScript 中顯式定義，實現視圖（HTML）與模型（Component）的同步。

**核心特性：**

- 高穩定性——表單狀態完全由 TypeScript 管理
- 易於驗證——驗證邏輯集中在程式碼層
- 適合複雜表單與動態表單
- 易於單元測試

<div class="flex justify-center mt-4">
  <img src="/images/50-reactive-forms/angular-forms-overview.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 為什麼要用 Reactive Forms？
# Why Use Reactive Forms?

---

# 為什麼要用 Reactive Forms？

Reactive Forms 將表單的「控制權」從 HTML 移至 TypeScript，以程式碼精確控制表單中的每一個細節。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**Template-Driven Forms**
- 邏輯散落於 HTML 樣板
- 適合簡單、靜態表單
- 雙向繫結 `[(ngModel)]`
- 不易進行單元測試

</div>
<div>

**Reactive Forms**
- 邏輯集中於 TypeScript
- 適合複雜、動態表單
- 顯式宣告表單結構
- 易於單元測試與重用

</div>
</div>

**四大優勢：**

1. 動態增減欄位（Dynamic Controls）
2. 即時監聽變化（Real-time Observation）
3. 複雜的驗證邏輯（Complex Validation）
4. 處理深層巢狀資料（Nested Data Structures）

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Reactive Forms 核心
# Core Building Blocks

---

# Reactive Forms 核心

Reactive Forms 由三種積木組合而成：

| 類別 | 說明 | 範例 |
|---|---|---|
| **FormControl** | 最小單位，代表單一輸入欄位 | 姓名、Email、密碼 |
| **FormGroup** | 容器，將多個 FormControl 包成一個物件 | 地址欄位（縣市／區域／路） |
| **FormArray** | 動態陣列，管理數量不固定的欄位群組 | 問卷題目列表 |

**三者關係：**

- `FormGroup` 可包含多個 `FormControl` 與巢狀 `FormGroup`
- `FormArray` 可包含多個 `FormGroup`，每組代表一筆動態資料
- 整份表單通常以一個根 `FormGroup` 為起點

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 動態增減欄位
# Dynamic Form Controls with FormArray

---

# 動態增減欄位 — 使用情境

當表單題目數量不固定（例如：動態問卷），需以程式動態新增或刪除欄位。

單純使用 JavaScript `Array` 無法獲得 Reactive Forms 的驗證與狀態管理，因此使用 `FormArray`。

**範例情境：**

- 問卷固定欄位：`surveyTitle`（標題，必填）
- 動態欄位：`questions`（題目，可新增／刪除）
- 每道題目包含：題目名稱（`qTitle`）、題目類型（`qType`）、是否必填（`need`）

---

# 動態增減欄位 — 初始化（一）

**步驟一：** 在 `@Component` 的 `imports` 加入 `ReactiveFormsModule`。

**步驟二：** 以 `inject(FormBuilder)` 取得 `fb` 實例。

**步驟三：** 以 `fb.group()` 定義根 `FormGroup`：
- `surveyTitle`：`['', Validators.required]` — 初始值為空字串，加必填驗證
- `questions`：`fb.array([])` — 初始化空的 `FormArray`

---

# 動態增減欄位 — 初始化（一）程式碼

```typescript
// app.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule], // 步驟一：加入 ReactiveFormsModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  fb = inject(FormBuilder); // 步驟二：取得 FormBuilder 實例

  // 步驟三：以 fb.group() 定義根 FormGroup
  form = this.fb.group({
    surveyTitle: ['', Validators.required], // 問卷標題
    questions: this.fb.array([])            // 題目空陣列
  });
}
```

---

# 動態增減欄位 — 初始化（二）

**`surveyTitle` 陣列語法：**
- 第一個元素：欄位初始值（空字串）
- 第二個元素：驗證規則（`Validators.required`）

**`fb.array([])` 說明：** 建立空的 `FormArray`，後續以程式動態推入 `FormGroup`。

建立 getter `questionsArray`，方便 TypeScript 與 HTML 存取該 `FormArray`，需將 `form.get('questions')` 強型轉換為 `FormArray`。

---

# 動態增減欄位 — 初始化（二）程式碼

```typescript
// app.component.ts
import { FormArray, FormBuilder, Validators } from '@angular/forms';

export class AppComponent {
  fb = inject(FormBuilder);

  form = this.fb.group({
    surveyTitle: ['', Validators.required], // 第一個元素：初始值；第二個：驗證規則
    questions: this.fb.array([])            // fb.array([])：建立空的 FormArray
  });

  // getter：將 form.get('questions') 轉型為 FormArray 供外部存取
  get questionsArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }
}
```

---

# 動態增減欄位 — 新增題目

呼叫 `addQuestion()` 時：

1. 以 `fb.group()` 建立新的題目 `FormGroup`，包含三個欄位：`qTitle`（必填）、`qType`（預設 `'M'`）、`need`（預設 `false`）
2. 以 `questionsArray.push()` 將新 `FormGroup` 推入陣列
3. `console.log(this.form.value)` 可查看目前表單完整資料

```typescript
// app.component.ts
addQuestion() {
  const questionGroup = this.fb.group({
    qTitle: ['', Validators.required], // 題目名稱
    qType: ['M'],                      // 題目類型（單選/多選/簡答）
    need: [false]                      // 是否必填
  });

  this.questionsArray.push(questionGroup);

  // 可用以下 log 查看目前表單資料
  console.log(this.form.value);
}
```

---

# 動態增減欄位 — 刪除題目

刪除操作與 JavaScript Array 概念相同：指定要移除資料的索引位置，呼叫 `FormArray` 的 `removeAt(index)` 方法即可移除對應的 `FormGroup`。

**`removeAt(index)`：** `FormArray` 的內建方法，依位置移除元素，後續索引自動重新排列。

```typescript
// app.component.ts

// 刪除題目（根據資料位置移除）
removeQuestion(index: number) {
  this.questionsArray.removeAt(index);
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 畫面顯示
# Template Binding

---

# 畫面顯示 — 繫結 formGroup（一）

**步驟一：** 在 HTML 的 `<form>` 標籤加上 `[formGroup]="form"`，將整個表單繫結至 TypeScript 中的 `form` 變數。

`ReactiveFormsModule` 必須已匯入至 `@Component` 的 `imports`，否則 `[formGroup]` 指令無法識別，畫面會報錯。

```html
<!-- app.component.html -->
<h2>動態問卷設計</h2>

<form [formGroup]="form">
</form>
```

```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
```

---

# 畫面顯示 — 繫結 formControlName（二）

在 `<form>` 標籤內，以 `formControlName` 屬性將輸入欄位繫結至 TypeScript 表單中的欄位名稱。

Reactive Forms **不使用** `[(ngModel)]` 做雙向繫結，改用 `formControlName` 對應 `FormGroup` 中定義的 key。

```html
<!-- app.component.html -->
<form [formGroup]="form">
  <label>問卷名稱：</label>
  <!-- formControlName 後面接的就是 form 中的欄位名稱 -->
  <input type="text" formControlName="surveyTitle">
</form>
```

---

# 畫面顯示 — 繫結 formArrayName（三）

呈現 `FormArray` 題目列表：

1. 外層 `<div>` 加上 `formArrayName="questions"`，對應 TypeScript 中的 `FormArray`
2. 以 `@for` 迭代 `questionsArray.controls`，用 `$index` 追蹤索引
3. 迴圈內的 `<div>` 加上 `[formGroupName]="$index"`，對應每筆題目的 `FormGroup`

---

# 畫面顯示 — 繫結 formArrayName（三）程式碼

```html
<!-- app.component.html -->
<form [formGroup]="form">
  <label>問卷名稱：</label>
  <input type="text" formControlName="surveyTitle">

  <div formArrayName="questions">
    <!-- controls 寫法固定，抓這個 formArray 的內容 -->
    @for (control of questionsArray.controls; track $index) {
      <!-- formGroupName 對應 questionsArray 的索引位置 -->
      <div [formGroupName]="$index">
        <label>題目：</label>
        <input type="text" formControlName="qTitle"
               placeholder="請輸入問題...">
      </div>
    }
  </div>
</form>
```

---

# 畫面顯示 — 完整欄位繫結（四）

在每個題目的 `[formGroupName]="$index"` 區塊內，以 `formControlName` 繫結全部欄位：

```html
<div [formGroupName]="$index">
  <label>題目：</label>
  <input type="text" formControlName="qTitle" placeholder="請輸入問題...">

  <label>類型：</label>
  <select formControlName="qType">
    <option value="text">簡答題</option>
    <option value="radio">單選題</option>
    <option value="check">多選題</option>
  </select>

  <label>
    <input type="checkbox" formControlName="need"> 設定為必填
  </label>

  <button (click)="removeQuestion($index)">刪除題目</button>
</div>
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>formControlName</code> 的值必須與 TypeScript 中 <code>fb.group()</code> 定義的 key 完全一致，大小寫有別。
</div>

---
layout: end
---

# 課程結束

### Reactive Forms 以 TypeScript 顯式管理表單結構，透過 FormControl、FormGroup、FormArray 三種積木實現動態欄位、複雜驗證與巢狀資料的完整控制
