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

<!--
大家好，這一章我們要進入 Reactive Forms，也就是響應式表單。

之前我們做表單大概都是用 `[(ngModel)]` 這種雙向繫結，寫起來很快，但如果表單一複雜——欄位一多、驗證規則一多、甚至欄位數量還會動態增減——HTML 裡的邏輯就會變得又亂又難維護。這就像是家裡東西全部堆在客廳，找東西的時候很痛苦。Reactive Forms 就是把表單的「控制權」搬到 TypeScript，用程式碼把每個欄位、每條規則都定義清楚，就像把東西分類收進不同的抽屜。

學完這一章，大家會知道 Reactive Forms 是什麼、跟 Template-Driven Forms 有什麼差別，以及怎麼用 FormControl、FormGroup、FormArray 做出一個可以動態新增刪除題目的問卷表單。
-->

---
layout: default
---

# Outline

- **Reactive Forms 是什麼** — 模型驅動表單的概念與特性
- **為什麼要用 Reactive Forms** — 四大使用優勢
- **Reactive Forms 核心** — FormControl、FormGroup、FormArray
- **動態增減欄位** — 使用 FormArray 實作新增／刪除題目
- **畫面顯示** — HTML 樣板繫結 `formGroup`、`formControlName`、`formArrayName`

<!--
這張投影片先讓大家掌握整章的地圖。我們會先講 Reactive Forms 是什麼、為什麼要用它，接著介紹三個核心積木 FormControl、FormGroup、FormArray，然後實際動手做一個可以動態新增刪除題目的問卷，最後看怎麼把這些東西繫結到 HTML 畫面上。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Reactive Forms 是什麼？
# What is Reactive Forms?

<!--
先問大家一個問題：如果表單的驗證規則、欄位狀態全部都寫在 HTML 樣板裡，會發生什麼事？欄位一多，樣板就會塞滿一堆邏輯，很難讀也很難測試。

這就是 Reactive Forms 想解決的問題——它讓我們用「模型驅動」的方式，在 TypeScript 裡把整個表單的結構跟規則定義清楚，畫面只負責顯示。
-->

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

<!--
這邊幫大家把 Reactive Forms 的定義講清楚：它是「以 TypeScript 顯式定義表單結構與驗證邏輯」的技術，讓視圖跟模型保持同步。

大家可以把它想成填寫紙本申請表之前，先有一份「表單設計圖」放在辦公室裡，設計圖上寫清楚每一欄要填什麼、哪些是必填、格式限制是什麼，畫面只是照著設計圖印出來給人填而已。

核心特性我們看一下：狀態完全由 TypeScript 管理，所以很穩定；驗證邏輯集中，好維護；也因為邏輯都在程式碼裡，適合複雜表單，而且方便寫單元測試。這在業界做後台管理系統、動態問卷這種複雜表單時特別常用。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 為什麼要用 Reactive Forms？
# Why Use Reactive Forms?

<!--
講完定義，我們來看實際的理由：為什麼要選 Reactive Forms 而不是我們比較熟悉的 Template-Driven Forms？
-->

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

<!--
這張表把兩種表單方式並排比較，大家可以看到 Template-Driven Forms 邏輯散在 HTML 裡，適合簡單表單；Reactive Forms 則是把邏輯集中在 TypeScript，適合複雜、會變動的表單。

四大優勢我們特別強調一下：動態增減欄位，像等一下要做的問卷題目可以自由新增刪除；即時監聽變化，可以隨時訂閱表單值的變動；複雜驗證邏輯好組合；還有處理巢狀資料的能力，這些都是 Template-Driven Forms 比較難做到的。業界只要遇到「表單會變、規則會變」的情境，幾乎都會選 Reactive Forms。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Reactive Forms 核心
# Core Building Blocks

<!--
接下來我們認識 Reactive Forms 的三個核心積木，等一下實作動態問卷的時候都會用到。
-->

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

<!--
這三個積木大家可以想成收納盒的概念：FormControl 是最小的一格，裝一個值，例如姓名或 Email；FormGroup 是把好幾個 FormControl 放進同一個盒子，變成一組，像地址就是縣市、區域、路名綁在一起；FormArray 則是「盒子的清單」，裡面可以動態增加或減少 FormGroup，像問卷題目數量不固定就很適合用它。

記得三者關係：FormGroup 可以包 FormControl 也可以包巢狀 FormGroup，FormArray 通常包的是一組一組的 FormGroup，整份表單最外層一般會是一個根 FormGroup。等一下的問卷範例會把這三個全部用上。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 動態增減欄位
# Dynamic Form Controls with FormArray

<!--
接下來我們用一個實際案例——動態問卷——來練習怎麼用 FormArray 做出可以自由增減欄位的表單。
-->

---

# 動態增減欄位 — 使用情境

當表單題目數量不固定（例如：動態問卷），需以程式動態新增或刪除欄位。

單純使用 JavaScript `Array` 無法獲得 Reactive Forms 的驗證與狀態管理，因此使用 `FormArray`。

**範例情境：**

- 問卷固定欄位：`title`（標題，必填）
- 動態欄位：`questions`（題目，可新增／刪除）
- 每道題目包含：題目名稱（`title`）、題目類型（`type`）、是否必填（`required`）

<!--
想像我們要做一個問卷系統，問卷標題是固定的一欄，但題目數量完全不知道——使用者可能加兩題，也可能加二十題。如果用一般的 JavaScript Array 存這些題目，雖然也能新增刪除，但拿不到 Reactive Forms 幫我們處理好的驗證跟狀態管理，等於少了很多好處。

所以這裡我們選用 FormArray。等一下的範例會有一個固定欄位 title，跟一個動態欄位 questions，每道題目底下又有題目名稱、類型、是否必填三個小欄位，這正好是 FormGroup 包在 FormArray 裡的典型情境。
-->

---

# 動態增減欄位 — 初始化（一）

**步驟一：** 在 `@Component` 的 `imports` 加入 `ReactiveFormsModule`。

**步驟二：** 以 `inject(FormBuilder)` 取得 `fb` 實例。

**步驟三：** 以 `fb.group()` 定義根 `FormGroup`：
- `title`：`['', Validators.required]` — 初始值為空字串，加必填驗證
- `questions`：`fb.array([])` — 初始化空的 `FormArray`

<!--
我們一步一步來建立這個問卷表單。第一步別忘記把 ReactiveFormsModule 加進 imports，這是很多同學第一次用 Reactive Forms 時會漏掉的地方，沒加的話畫面上的 formGroup、formControlName 這些指令都會抓不到。

第二步用 inject(FormBuilder) 拿到 fb，這是 Angular 官方建議的建構方式，比自己手動 new FormGroup 更簡潔。第三步就是用 fb.group() 定義整份表單的根結構，這邊 title 是固定欄位，questions 先給一個空陣列，之後再動態塞資料進去。
-->

---

# 動態增減欄位 — 初始化（一）程式碼

```typescript
// app.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule], // 步驟一：加入 ReactiveFormsModule
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  fb = inject(FormBuilder); // 步驟二：取得 FormBuilder 實例

  // 步驟三：以 fb.group() 定義根 FormGroup
  form = this.fb.group({
    title: ['', Validators.required], // 問卷標題
    questions: this.fb.array([])            // 題目空陣列
  });
}
```

<!--
我們帶大家看一下這段程式碼的重點。imports 裡加了 ReactiveFormsModule，這是必要條件。fb 這個屬性透過 inject(FormBuilder) 拿到，之後所有 group、array、control 的建立都靠它。

最重要的是 form 這個屬性，它就是我們整份表單的根 FormGroup，裡面 title 給了初始值跟必填驗證，questions 先建立一個空的 FormArray，等一下我們會用程式把題目一筆一筆推進去。

⚠️ 提醒大家，這邊的 fb.group() 只是「宣告結構」，實際資料還要等後面 addQuestion() 執行才會出現。
-->

---

# 動態增減欄位 — 初始化（二）

**`title` 陣列語法：**
- 第一個元素：欄位初始值（空字串）
- 第二個元素：驗證規則（`Validators.required`）

**`fb.array([])` 說明：** 建立空的 `FormArray`，後續以程式動態推入 `FormGroup`。

建立 getter `questionsArray`，方便 TypeScript 與 HTML 存取該 `FormArray`，需將 `form.get('questions')` 強型轉換為 `FormArray`。

<!--
先講一下 title 這個陣列語法：第一個位置放初始值，第二個位置放驗證規則，這個結構我們之後在 Validators 那一章還會再深入講。

fb.array([]) 就是建立一個空的 FormArray，這時候裡面還沒有任何題目。因為 form.get('questions') 回傳的型別預設是比較通用的型別，所以我們額外寫一個 questionsArray 的 getter，把它強制轉型成 FormArray，這樣不管是 TypeScript 還是 HTML 樣板要存取題目陣列，都可以直接呼叫這個 getter，程式碼會乾淨很多。

⚠️ 這邊常見的錯誤是忘記轉型，直接把 form.get('questions') 當 FormArray 用，TypeScript 會報型別錯誤。
-->

---

# 動態增減欄位 — 初始化（二）程式碼

```typescript
// app.ts
import { FormArray, FormBuilder, Validators } from '@angular/forms';

export class App {
  fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', Validators.required], // 第一個元素：初始值；第二個：驗證規則
    questions: this.fb.array([])            // fb.array([])：建立空的 FormArray
  });

  // getter：將 form.get('questions') 轉型為 FormArray 供外部存取
  get questionsArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }
}
```

<!--
帶大家看一下這段程式碼，重點是最下面的 getter：questionsArray 回傳的是把 form.get('questions') 轉型成 FormArray 之後的結果。之後不管是要 push 新題目、還是要在 HTML 用 @for 迭代題目，都直接呼叫 this.questionsArray，不用每次都重複寫轉型的程式碼。

執行這段之後，表單裡就有 title 跟一個空的 questions 陣列，接下來我們就要學怎麼把題目動態加進 questions 裡。
-->

---

# 動態增減欄位 — 新增題目

呼叫 `addQuestion()` 時：

1. 以 `fb.group()` 建立新的題目 `FormGroup`，包含三個欄位：`title`（必填）、`type`（預設 `'SINGLE'`）、`required`（預設 `false`）
2. 以 `questionsArray.push()` 將新 `FormGroup` 推入陣列
3. `console.log(this.form.value)` 可查看目前表單完整資料

```typescript
// app.ts
addQuestion() {
  const questionGroup = this.fb.group({
    title: ['', Validators.required], // 題目名稱
    type: ['SINGLE'],                 // 題目類型（單選/多選/文字）
    required: [false]                 // 是否必填
  });

  this.questionsArray.push(questionGroup);

  // 可用以下 log 查看目前表單資料
  console.log(this.form.value);
}
```

<!--
這段就是動態新增題目的核心邏輯，我們一步一步帶大家看。第一步用 fb.group() 建立一個新的題目 FormGroup，裡面有三個欄位：title 必填、type 預設是 'SINGLE'、required 預設是 false。

第二步是關鍵：用 questionsArray.push() 把這個新的 FormGroup 推進題目陣列裡，這就是「動態新增欄位」真正發生的地方。第三步是個小技巧，執行完之後可以用 console.log(this.form.value) 印出整份表單的資料，方便我們在開發時確認結構有沒有跑對。

執行這個方法之後，畫面上題目列表就會多出一筆新的題目輸入區塊，因為 HTML 那邊會用 @for 迭代 questionsArray，陣列多了元素，畫面就會跟著多渲染一組。
-->

---

# 動態增減欄位 — 刪除題目

刪除操作與 JavaScript Array 概念相同：指定要移除資料的索引位置，呼叫 `FormArray` 的 `removeAt(index)` 方法即可移除對應的 `FormGroup`。

**`removeAt(index)`：** `FormArray` 的內建方法，依位置移除元素，後續索引自動重新排列。

```typescript
// app.ts

// 刪除題目（根據資料位置移除）
removeQuestion(index: number) {
  this.questionsArray.removeAt(index);
}
```

<!--
刪除的邏輯其實跟大家平常操作 JavaScript Array 一模一樣，只是換成呼叫 FormArray 提供的方法。removeAt(index) 就是依照索引位置把對應的 FormGroup 從陣列裡拿掉，之後面的元素會自動往前遞補索引。

這裡的重點只有一行：this.questionsArray.removeAt(index)。等一下 HTML 那邊我們會在每個題目旁邊放一個刪除按鈕，按下去就會呼叫這個方法，把該題目從畫面跟資料裡同時移除。

⚠️ 提醒大家，index 一定要對應到目前畫面上的位置，如果搭配 @for 的 $index 使用就不會有問題，但如果自己額外去記錄索引就要小心陣列變動後索引跟著改變的情況。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 畫面顯示
# Template Binding

<!--
邏輯都寫好了，接下來我們把這份表單繫結到 HTML 畫面上，讓使用者實際看得到、填得到這個問卷。
-->

---

# 畫面顯示 — 繫結 formGroup（一）

**步驟一：** 在 HTML 的 `<form>` 標籤加上 `[formGroup]="form"`，將整個表單繫結至 TypeScript 中的 `form` 變數。

`ReactiveFormsModule` 必須已匯入至 `@Component` 的 `imports`，否則 `[formGroup]` 指令無法識別，畫面會報錯。

```html
<!-- app.html -->
<h2>動態問卷設計</h2>

<form [formGroup]="form">
</form>
```

```typescript
// app.ts
@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
```

<!--
第一步很單純，就是在 <form> 標籤上加 [formGroup]="form"，這一行等於是告訴 Angular：「這張表單接下來的所有內容，都要對應到 TypeScript 裡的 form 這個變數」。

⚠️ 這裡最容易漏掉的地方，就是忘記在 @Component 的 imports 加上 ReactiveFormsModule。如果沒加，[formGroup] 這個指令 Angular 根本不認識，畫面打開就會直接報錯，這個錯誤訊息也是同學最常來問的問題之一，大家實作時務必先檢查這一步。
-->

---

# 畫面顯示 — 繫結 formControlName（二）

在 `<form>` 標籤內，以 `formControlName` 屬性將輸入欄位繫結至 TypeScript 表單中的欄位名稱。

Reactive Forms **不使用** `[(ngModel)]` 做雙向繫結，改用 `formControlName` 對應 `FormGroup` 中定義的 key。

```html
<!-- app.html -->
<form [formGroup]="form">
  <label>問卷名稱：</label>
  <!-- formControlName 後面接的就是 form 中的欄位名稱 -->
  <input type="text" formControlName="title">
</form>
```

<!--
這裡跟大家強調一個很重要的觀念轉換：Reactive Forms 不用 [(ngModel)] 做雙向繫結，而是改用 formControlName。

大家可以這樣記：formControlName 後面接的字串，一定要跟 TypeScript 那邊 fb.group() 裡定義的欄位名稱一模一樣，這邊就是 title。這個屬性就像是一條線，把畫面上的這個 input 跟 TypeScript 裡對應的那個 FormControl 綁在一起。

⚠️ 如果 formControlName 打錯字或大小寫不一致，Angular 不會幫你自動對應，欄位就會抓不到值，這是初學者最容易犯的錯誤之一。
-->

---

# 畫面顯示 — 繫結 formArrayName（三）

呈現 `FormArray` 題目列表：

1. 外層 `<div>` 加上 `formArrayName="questions"`，對應 TypeScript 中的 `FormArray`
2. 以 `@for` 迭代 `questionsArray.controls`，用 `control` 本身追蹤，**不要用 `$index`**
3. 迴圈內的 `<div>` 加上 `[formGroupName]="$index"`，對應每筆題目的 `FormGroup`

<!--
問卷題目是一個陣列，畫面上要用迴圈把每一題都渲染出來，這邊有三個步驟要注意。

第一，外層 div 加 formArrayName="questions"，這行是告訴 Angular「這個範圍裡的內容，對應到 questions 這個 FormArray」。第二，用 @for 迭代 questionsArray.controls，這樣才能拿到陣列裡每一個 FormGroup。第三，迴圈裡的每個 div 要加上 [formGroupName]="$index"，用索引對應到陣列裡的第幾筆題目資料。這三層繫結（FormArray → 迴圈 → 每筆的 FormGroup）是同學第一次接觸時比較容易搞混的地方，我們接下來直接看程式碼會更清楚。

⚠️ 這裡先預告一個地雷：@for 的 track 千萬不要用 $index，要 track control 本身，原因下一頁詳細解釋。
-->

---

# 畫面顯示 — 繫結 formArrayName（三）程式碼

```html
<!-- app.html -->
<form [formGroup]="form">
  <label>問卷名稱：</label>
  <input type="text" formControlName="title">

  <div formArrayName="questions">
    <!-- track control：用 FormGroup 本身的身分追蹤，不要用 $index -->
    @for (control of questionsArray.controls; track control) {
      <!-- formGroupName 對應 questionsArray 的索引位置 -->
      <div [formGroupName]="$index">
        <label>題目：</label>
        <input type="text" formControlName="title"
               placeholder="請輸入問題...">
      </div>
    }
  </div>

  <button type="button" (click)="addQuestion()">新增題目</button>
</form>
```

<!--
帶大家逐段看一下這段 HTML。formArrayName="questions" 鎖定了題目陣列的範圍，@for 迴圈裡用 track control，這樣 Angular 才知道怎麼追蹤每個項目的變化。

最關鍵的是 [formGroupName]="$index"，因為 questionsArray 裡面裝的每一個元素都是一個 FormGroup，所以要用「第幾組」這個索引來對應，而不是像 formControlName 那樣用固定的名字。裡面的 input 再用平常熟悉的 formControlName="title" 對應到題目裡的欄位。

⚠️ 提醒同學，畫面上要真的看得到題目輸入欄位，一定要有個按鈕呼叫 addQuestion()，不然 questionsArray 一開始是空陣列，@for 沒有資料可以跑，畫面上除了問卷名稱欄位之外會完全是空的，這是很多人做這個練習卡住的地方。這裡把 button 放在 formArrayName 的 div 外面、form 裡面即可，type="button" 是為了避免它被瀏覽器當成表單送出按鈕。

⚠️ 另一個更隱蔽的地雷：track 千萬不要用 $index。刪除中間某一題時，track $index 會讓 Angular 誤以為「位置」沒變，於是重複使用同一個輸入框 DOM 節點去顯示不同的題目資料，結果不管點哪一列的刪除按鈕，畫面上看起來永遠是最後一列消失，其他列的內容卻沒有正確更新。改成 track control，讓 Angular 用每個 FormGroup 物件本身的身分去追蹤，DOM 節點才會跟著正確的資料一起被建立或刪除。

執行到這一步，畫面應該會看到：每按一次「新增題目」，就會多出一個題目輸入欄位，並且輸入的內容會即時同步回 TypeScript 的 form 裡；點任何一列的「刪除題目」，也會正確刪掉那一列，而不是永遠刪最後一列。
-->

---

# 畫面顯示 — 完整欄位繫結（四）

在每個題目的 `[formGroupName]="$index"` 區塊內，以 `formControlName` 繫結全部欄位：

```html
<div [formGroupName]="$index">
  <label>題目：</label>
  <input type="text" formControlName="title" placeholder="請輸入問題...">

  <label>類型：</label>
  <select formControlName="type">
    <option value="SINGLE">單選題</option>
    <option value="MULTI">多選題</option>
    <option value="TEXT">文字題</option>
  </select>

  <label>
    <input type="checkbox" formControlName="required"> 設定為必填
  </label>

  <button (click)="removeQuestion($index)">刪除題目</button>
</div>
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>formControlName</code> 的值必須與 TypeScript 中 <code>fb.group()</code> 定義的 key 完全一致，大小寫有別。
</div>

<!--
這張是完整的題目區塊，我們把 title、type、required 三個欄位都用 formControlName 綁上去，另外還加了一個刪除按鈕，按下去呼叫我們前面寫好的 removeQuestion($index)。

大家可以看到 select 裡的 type 對應題目類型，checkbox 的 required 對應是否必填，這些都跟 title 一樣，靠 formControlName 這個字串跟 TypeScript 的欄位名稱對起來。

⚠️ 特別提醒剛剛畫面上那個提示：formControlName 的值一定要跟 fb.group() 裡定義的 key 完全一致，包含大小寫，這個是同學做練習時最常見的 typo 錯誤來源，抓 bug 的時候可以優先檢查這裡。「新增題目」按鈕前面 formArrayName（三）那一頁已經示範過，這裡不重複放。
-->

---
layout: default
---

# 練習：後台題目編輯（選項也是 FormArray）
### 任務說明

上面的範例，每題只有「名稱、類型、必填」。真正的問卷單選／多選題，還要有**選項**，而且選項的數量也不固定：`FormArray` 裡面還有 `FormArray`。請做出後台新增問卷的題目編輯表單：

1. 表單有固定欄位 `title`（問卷名稱），以及動態欄位 `questions`（題目陣列）
2. 每題有 `title`、`type`（單選 / 多選 / 文字）、`required`，以及 `options`（選項，字串的 `FormArray`）
3. 新增題目時，預設有 **2 個空白選項**；每題可以「新增選項」、「刪除選項」
4. 題型是「文字」時，隱藏選項區塊
5. 按「送出」，把表單值轉成後端 API 的格式，印在畫面上：選項要變成 `[{ "label": "便當" }, ...]`，並且**過濾掉空白選項**

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這個練習延伸剛剛的動態題目表單。真正的單選、多選題，需要一組選項，而且選項的數量也不固定，所以是 FormArray 裡面再放 FormArray：題目陣列的每一個元素是一個 FormGroup，這個 FormGroup 裡有一個 options 欄位，又是一個 FormArray。

這是需求文件的規定：預設兩個選項、可以增刪；文字題沒有選項。

最後一步很重要：表單裡的資料形狀，通常跟後端 API 要的形狀不一樣。表單裡選項是字串陣列，但後端要的是物件陣列，每個物件有 label。所以送出前要做一次轉換，同時把空白的選項濾掉。這種「表單值 → API 格式」的轉換，是實務上每個表單都會做的事。
-->

---
layout: default
---

# 練習：解題提示

1. `questions` 的每個元素是一個 `FormGroup`，裡面的 `options` 用 `fb.array(['', ''])` 建立（兩個空白字串）；把「一題的結構」寫成函式，型別才會完整
2. 要操作某一題的選項，先取出那題的 `options`：

```typescript
optionsOf(i: number) { return this.questions.at(i).controls.options; }
```

3. 樣板巢狀綁定：外層 `formArrayName="questions"` + `[formGroupName]="i"`，內層 `formArrayName="options"` + 每個選項用 `[formControlName]="k"`（**索引當作名稱**）
4. 隱藏選項區塊：`@if (!isText(i)) { ... }`
5. 轉換：`options: q.options.filter(o => o.trim()).map(label => ({ label }))`

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>FormArray</code> 裡是「純文字」的欄位，沒有名稱，所以 <code>formControlName</code> 直接寫索引：<code>[formControlName]="k"</code>。
</div>

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
巢狀 FormArray 的重點是「一層一層取出來」：先 questions.at(i) 拿到第 i 題的 FormGroup，再用 controls.options 拿到它的選項 FormArray，型別是完整的，TypeScript 才知道能呼叫 push、removeAt。

樣板綁定的層次跟資料結構要一模一樣：最外層 formGroup，第二層 formArrayName 是 questions，第三層 formGroupName 是第 i 題，第四層 formArrayName 是 options，最後每個選項是 formControlName 用索引。

初學者最常見的錯誤是把這幾層的名稱寫錯，Angular 會噴出 Cannot find control with name 的錯誤，一層一層對照就能找到。
-->

---
layout: default
---

# 練習：完整解答（TypeScript）

```typescript
// survey-form.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

// 一題的表單結構（抽成函式，才拿得到完整的型別）
function questionGroup(fb: FormBuilder) {
  return fb.group({
    title: ['', Validators.required],
    type: ['SINGLE'],
    required: [false],
    options: fb.array(['', '']),               // 預設 2 個空白選項
  });
}
type QuestionGroup = ReturnType<typeof questionGroup>;

// ... 見下一頁
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
TypeScript 這邊，addQuestion 建立一個題目 FormGroup，其中 options 用 fb.array 建立兩個空字串，這就是「預設兩個選項」。
-->

---
layout: default
---

# 練習：完整解答（TypeScript）（續）

```typescript
// ... 接上一頁

@Component({
  selector: 'app-survey-form',
  imports: [ReactiveFormsModule],
  templateUrl: './survey-form.html',
})
export class SurveyForm {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    title: ['', Validators.required],
    questions: this.fb.array<QuestionGroup>([]),
  });
  output = '';

  get questions() { return this.form.controls.questions; }
  optionsOf(i: number) { return this.questions.at(i).controls.options; }
  isText(i: number) { return this.questions.at(i).controls.type.value === 'TEXT'; }

// ... 見下一頁
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
addOption 用 new FormControl 加一個新的空白欄位，nonNullable 讓它的型別是 string，不會出現 null。
-->

---
layout: default
---

# 練習：完整解答（TypeScript）（續）

```typescript
  // ... 接上一頁

  addQuestion() { this.questions.push(questionGroup(this.fb)); }
  removeQuestion(i: number) { this.questions.removeAt(i); }

  addOption(i: number) { this.optionsOf(i).push(new FormControl('')); }
  removeOption(i: number, k: number) { this.optionsOf(i).removeAt(k); }

  // ... 見下一頁
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
submit 是這個練習的重點：getRawValue 取出整份表單的值，再轉成後端要的格式。文字題的 options 直接給空陣列；選擇題的 options 先 filter 掉空白，再用 map 把每個字串轉成 { label } 物件。
-->

---
layout: default
---

# 練習：完整解答（TypeScript）（續）

```typescript
// ... 接上一頁

  submit() {
    const v = this.form.getRawValue();
    const body = {
      title: v.title,
      questions: v.questions.map(q => ({
        title: q.title, type: q.type, required: q.required,
        options: q.type === 'TEXT' ? [] : q.options.filter(o => o?.trim()).map(label => ({ label })),
      })),
    };
    this.output = JSON.stringify(body, null, 2);
  }
}
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
output 是普通字串，因為它是在按鈕的點擊事件裡被設定的，事件處理完後 Angular 一定會更新畫面。
-->

---
layout: default
---

# 練習：完整解答（HTML）

```html
<!-- survey-form.html -->
<form [formGroup]="form" (ngSubmit)="submit()">
  <label>問卷名稱 <input formControlName="title" /></label>

  <div formArrayName="questions">
    @for (q of questions.controls; track $index; let i = $index) {
      <fieldset [formGroupName]="i">
        <input formControlName="title" placeholder="題目名稱" />
        <select formControlName="type">
          <option value="SINGLE">單選題</option>
          <option value="MULTI">多選題</option>
          <option value="TEXT">文字題</option>
        </select>
        <label><input type="checkbox" formControlName="required" /> 必填</label>
        <button type="button" (click)="removeQuestion(i)">刪除題目</button>
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
HTML 的階層要跟資料結構完全一致，大家對照一下：form 對應根 FormGroup；formArrayName questions 對應題目陣列；fieldset 的 formGroupName 用索引 i，對應第 i 題；裡面的 formArrayName options，對應這題的選項陣列；最後每個 input 用索引 k 當作 formControlName。
-->

---
layout: default
---

# 練習：完整解答（HTML）（續）

```html
        @if (!isText(i)) {
          <div formArrayName="options">
            @for (o of optionsOf(i).controls; track $index; let k = $index) {
              <div>
                <input [formControlName]="k" placeholder="選項 {{ k + 1 }}" />
                <button type="button" (click)="removeOption(i, k)">刪除</button>
              </div>
            }
            <button type="button" (click)="addOption(i)">＋ 新增選項</button>
          </div>
        }
      </fieldset>
    }
  </div>
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
按鈕都要加 type="button"，否則在 form 裡面，按鈕預設是 submit，按「新增選項」會直接送出整張表單。這是初學者非常常見的錯誤。
-->

---
layout: default
---

# 練習：完整解答（HTML）（續）

```html
  <button type="button" (click)="addQuestion()">＋ 新增題目</button>
  <button type="submit">送出</button>
</form>
<pre>{{ output }}</pre>
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>成功標準：</b> 新增一題單選題、填兩個選項、第三個選項留空後按「送出」，畫面上 JSON 的 <code>options</code> 只有 2 個 <code>{ "label": ... }</code>；把題型改成「文字」，選項區塊消失，JSON 的 <code>options</code> 是 <code>[]</code>。
</div>

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這個表單的輸出格式，正是後端 POST /api/admin/survey-draft 要的內容，第 59 章的後台編輯頁會用同樣的轉換。
-->

---
layout: end
---

# 課程結束

### Reactive Forms 以 TypeScript 顯式管理表單結構，透過 FormControl、FormGroup、FormArray 三種積木實現動態欄位、複雜驗證與巢狀資料的完整控制

<!--
這一章我們從「為什麼需要 Reactive Forms」講到實際做出一個可以動態新增刪除題目的問卷表單，也認識了 FormControl、FormGroup、FormArray 這三個積木怎麼互相搭配。

大家現在應該能夠自己動手，用 fb.group() 跟 fb.array() 建立一個表單結構，並且知道怎麼把它繫結到 HTML 畫面上。下一章我們會接著講 Validators，也就是怎麼替這些欄位加上更完整的驗證規則。
-->
