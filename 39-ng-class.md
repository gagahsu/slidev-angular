---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: ngClass
routeAlias: ch39
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
    ngClass
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「依條件動態套用或移除 CSS class」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來學 ngClass。

之前我們寫 CSS class 都是寫死在 HTML 裡，但實際開發時常常會遇到「這個 class 要不要出現，得看某個條件」的情境，像是按鈕在選取的時候要變色、表單有錯誤要顯示紅框。如果每次都要手動判斷再拼字串，會很麻煩又容易出錯。ngClass 就是 Angular 幫我們解決這個問題的內建指令。

學完這一章，大家會知道怎麼用 ngClass 做靜態、條件式、甚至用方法回傳的方式來動態控制 class。
-->

---
layout: default
---

# Outline

- **ngClass 介紹** — 什麼是 ngClass 及使用前置作業
- **靜態用法** — 以 ngClass 替代一般 class 屬性
- **動態條件綁定** — 依布林變數控制 class 的套用
- **方法回傳** — 將複雜邏輯封裝在 TypeScript 方法中

<!--
這張投影片先讓大家看一下今天的路線圖：我們會先介紹 ngClass 是什麼、使用前要匯入什麼模組，接著看最簡單的靜態用法，再進到大家最常用的動態條件綁定，最後看邏輯比較複雜時怎麼用方法回傳來處理。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# ngClass 介紹
# What is ngClass

<!--
我們先來看 ngClass 到底是什麼，為什麼會需要它。這一段會建立大家對 ngClass 的基本認識，之後的範例都會建立在這個概念上。
-->

---

# ngClass 介紹

`ngClass` 是 Angular 的內建指令，用於**動態**增加或移除 HTML 元素的 CSS class。

| 特性 | 說明 |
| --- | --- |
| 動態綁定 | 依據變數或條件決定套用哪些 class |
| 靜態替代 | 也可用來替代一般 `class` 屬性（固定值） |
| 前置需求 | 使用前需在元件的 `.ts` 匯入 `CommonModule` |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 若元件為 standalone，請在 <code>imports</code> 陣列中加入 <code>CommonModule</code>；若使用 NgModule 架構，則在對應模組中匯入。
</div>

<!--
ngClass 是 Angular 內建的一個指令，白話來說就是「幫我們動態加或拿掉 CSS class」。

大家可以把它想成衣櫃裡的標籤貼紙——今天天氣冷就貼上「保暖」標籤，天氣熱就撕掉，衣服本身沒變，但標籤（也就是 class）會依情況變動。這在實務上非常常用，像是表單驗證錯誤要加紅框、按鈕被選取要變色，都是靠 ngClass 做到的。

⚠️ 提醒大家，使用 ngClass 之前有個前置作業：一定要先在元件的 .ts 裡匯入 CommonModule，不然模板裡的 [ngClass] 會直接報錯，這是新手很容易漏掉的一步。
-->

---

# 匯入 CommonModule

在元件的 `.ts` 檔匯入 `CommonModule`，並加入 `imports` 陣列。

```typescript
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questionnaire.component.html',
})
export class QuestionnaireComponent {}
```

<!--
這段範例的目的是讓大家看到匯入 CommonModule 的實際寫法，因為前一頁只是提醒，這裡我們實際帶著大家看程式碼。

大家可以看到，重點就是 import 那一行，還有下面 imports 陣列裡要把 CommonModule 加進去，跟我們平常匯入其他模組的方式是一樣的套路。

⚠️ 易錯點是很多同學會忘記把它加進 imports 陣列，只 import 進來但沒放進陣列，這樣還是不會生效，記得兩個步驟都要做。

執行後，這個元件就具備使用 [ngClass] 的能力了，接下來我們就可以在模板裡開始寫語法。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 靜態用法
# Static Class Binding

<!--
接下來我們從最簡單的用法開始，看 ngClass 怎麼當作一般 class 屬性的替代寫法。這一段還沒有牽涉到動態邏輯，主要是讓大家熟悉語法長什麼樣子。
-->

---

# ngClass 靜態用法

匯入 `CommonModule` 後，可在模板中使用 `[ngClass]`。

將字串字面值傳入 `[ngClass]`，效果與直接使用 `class` 屬性相同，但尚未具備動態能力。

| 寫法 | 範例 |
| --- | --- |
| 原生 class | `<h3 class="test"></h3>` |
| ngClass 靜態 | `<h3 [ngClass]="'test'"></h3>` |

```html
<!-- 兩種寫法效果相同 -->
<h3 class="test"></h3>
<h3 [ngClass]="'test'"></h3>
```

<!--
這段範例的目的是讓大家對照一般 class 屬性跟 ngClass 靜態寫法的差異，其實效果完全一樣，只是把字串包進 [ngClass] 的中括號綁定語法而已。

大家可以看到，這裡傳進去的是一個字串字面值 'test'，跟原生 class="test" 效果一模一樣，還沒有用到任何動態邏輯。

預期結果就是這個 h3 元素會套上 test 這個 class，畫面上看不出跟原生寫法有任何差別。那大家可能會想，那我幹嘛不直接用 class 就好？沒錯，靜態情境確實用原生 class 就夠了，ngClass 真正厲害的地方在下一段動態條件綁定，我們接著看。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 動態條件綁定
# Conditional Class Binding

<!--
這一段才是 ngClass 真正發揮作用的地方。我們要來看怎麼用物件語法，依照條件動態決定 class 要不要套用，這也是大家實務上最常用到的寫法。
-->

---

# ngClass 動態條件綁定

傳入物件語法 `{ 'class名稱': 條件 }` 可讓 class 依條件動態套用或移除。

| 語法 | 說明 |
| --- | --- |
| `{ 'class': boolean }` | 條件為 `true` 時套用 class |
| `{ 'c1': expr1, 'c2': expr2 }` | 同時控制多個 class |

```html
<!-- 單一條件 -->
<h3 [ngClass]="{ 'test': ngclassBoolean == true }"></h3>

<!-- 多個條件 -->
<h3 [ngClass]="{ 'test': ngclassBoolean == true,
                 'test2': ngclassBoolean == true }"></h3>
```

<!--
這段範例的目的是介紹 ngClass 最常見也最實用的物件語法，大家可以把它想成一份「檢查清單」——每個 key 是 class 名稱，value 是條件，條件成立就打勾套用，不成立就不套用。

大家看第一個例子，[ngClass]="{ 'test': ngclassBoolean == true }"，意思是當 ngclassBoolean 是 true 的時候，就套用 test 這個 class。第二個例子則是同時檢查兩個條件，可以一次控制多個 class，彼此互不影響。

⚠️ 易錯點是大括號裡的 key 記得要用引號包起來，因為 class 名稱可能包含連字號等特殊字元，這跟我們寫一般物件字面值的規則是一樣的。

接下來我們看看這個布林變數 ngclassBoolean 是從哪裡來的。
-->

---

# 動態條件綁定 — TypeScript 變數

在元件的 `.ts` 中宣告布林變數，模板依此變數決定是否套用 class。

```typescript
export class QuestionnaireComponent {
  ngclassBoolean: boolean = true;
}
```

```html
<h3 [ngClass]="{ 'test': ngclassBoolean == true }"></h3>
```

- 當 `ngclassBoolean` 為 `true` → `test` class 生效
- 當 `ngclassBoolean` 為 `false` → `test` class 被移除

<!--
這段範例的目的是讓大家看到條件綁定的資料來源，也就是元件 .ts 裡宣告的布林變數 ngclassBoolean。

大家可以看到，模板裡的 ngClass 綁定和 TypeScript 裡的變數是連動的，只要這個變數的值改變，畫面上的 class 就會跟著即時更新，這就是 Angular 資料綁定的威力，我們不用手動去操作 DOM 加減 class。

預期結果是，當 ngclassBoolean 是 true，h3 元素會有 test 這個 class；如果程式邏輯把它改成 false，test class 就會自動被拿掉，完全不需要我們手動處理。

⚠️ 提醒大家，這裡的條件不一定要寫成 == true 這種寫法，直接寫變數本身（比如 { 'test': ngclassBoolean }）也可以，只是這裡為了讓初學者看清楚條件判斷的邏輯，才刻意寫出完整的比較式。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 方法回傳
# Method-based Class Binding

<!--
最後我們來看第三種用法，如果判斷邏輯變得比較複雜，直接寫在模板裡會很亂，這時候我們可以把邏輯包裝成方法，讓 ngClass 呼叫這個方法拿到結果。
-->

---

# ngClass 方法回傳

當判斷邏輯較複雜時，可將邏輯封裝在 TypeScript 方法中，由方法回傳 class 名稱字串。

| 綁定方式 | 模板寫法 |
| --- | --- |
| 方法回傳字串 | `[ngClass]="getClassCss()"` |
| 方法回傳物件 | `[ngClass]="getClassObj()"` |

```html
<h3 [ngClass]="getClassCss()"></h3>
```

```typescript
getClassCss(): string {
  return 'test';
}
```

<!--
這段範例的目的是示範當判斷邏輯太複雜、不適合寫在模板裡的時候，怎麼把邏輯搬到 TypeScript 方法裡。大家可以想像成外送 App 判斷「今天要不要顯示折扣標籤」，如果條件一大堆（會員等級、時段、庫存），寫在畫面上會很亂，不如寫成一個函式，畫面只要呼叫它、拿結果就好。

模板裡只要寫 [ngClass]="getClassCss()"，方法回傳字串或物件都可以，Angular 會自動判斷回傳的型別去套用對應的 class。

⚠️ 易錯點是這個方法會在每次變更偵測（change detection）時被呼叫，所以裡面不建議放太複雜或耗效能的運算，這跟我們之前提過方法綁定的效能考量是同一個道理。

執行後畫面上會套用 test 這個 class，效果跟前面條件綁定一樣，只是邏輯換了個地方存放。
-->

---

# ngClass 三種用法比較

| 用法 | 模板範例 | 適用情境 |
| --- | --- | --- |
| 靜態字串 | `[ngClass]="'test'"` | 固定 class，不需動態切換 |
| 物件條件 | `[ngClass]="{ 'test': flag }"` | 依單一或多個布林條件切換 |
| 方法回傳 | `[ngClass]="getClass()"` | 判斷邏輯複雜，需封裝在 TS 中 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>建議：</b> 優先使用物件條件語法；邏輯超過兩個條件或需要額外運算時，改用方法回傳。
</div>

<!--
我們用一張表把今天學的三種用法整理起來，幫大家做個總結。

靜態字串適合完全不會變的 class；物件條件是我們最常用的寫法，一個或多個布林條件都能處理；方法回傳則是留給邏輯比較複雜、需要額外運算的情境。

💡 我這邊給大家一個實務建議：預設優先用物件條件語法，因為它最直覺、可讀性也好；只有當條件超過兩個、或需要做額外運算時，才考慮抽成方法，不要一開始就把邏輯都寫進方法裡，反而會失去 Angular 模板語法的簡潔性。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習
# Practice Exercise

<!--
三種用法都學完了，接下來用一個實務情境把它們串在一起：訂單清單依狀態顯示不同顏色標籤。
-->

---
layout: default
---

# 練習：訂單狀態標籤
### 任務說明

做一個訂單清單，把今天學的三種 `ngClass` 用法都用上：

1. 定義 `Order` interface：`id`、`customer`、`status`（`'pending' | 'shipped' | 'completed' | 'cancelled'`）、`isOverdue`
2. 準備至少 5 筆假資料，用 `@for` 顯示成清單
3. 每筆訂單用 `[ngClass]` **物件語法**，依 `status` 套上對應顏色 class：`badge-pending`、`badge-shipped`、`badge-completed`、`badge-cancelled`
4. 若該筆 `isOverdue` 為 `true`，同一個物件語法裡再多加一個 `badge-overdue` class（同時符合兩個條件）
5. 寫一個方法 `getRowClass(order)`，若訂單狀態為 `cancelled` 就回傳 `'row-cancelled'`，否則回傳空字串，並用**方法回傳**語法綁在整個 `<li>` 上

<!--
這個練習把三種用法各用一次：物件語法處理狀態顏色跟逾期提示，方法回傳處理「整列要不要變灰階」這種稍微複雜一點的邏輯。

大家可以先自己動手做做看，做不出來再往下看提示。
-->

---
layout: default
---

# 練習：訂單狀態標籤
### 畫面預覽

<div class="flex flex-col gap-2 mt-4" style="max-width: 480px; margin-left: auto; margin-right: auto;">
  <div class="flex justify-between items-center rounded-lg px-4 py-2" style="border: 1px solid #e2e8f0;">
    <span><span class="text-gray-400 text-xs mr-1">#1</span><b>王小明</b></span>
    <span class="text-xs font-semibold rounded-full px-2 py-1" style="background:#fef3c7; color:#92400e;">pending</span>
  </div>
  <div class="flex justify-between items-center rounded-lg px-4 py-2" style="border: 1px solid #e2e8f0;">
    <span><span class="text-gray-400 text-xs mr-1">#2</span><b>陳美玲</b></span>
    <span class="flex gap-1">
      <span class="text-xs font-semibold rounded-full px-2 py-1" style="background:#dbeafe; color:#1e40af;">shipped</span>
      <span class="text-xs font-semibold rounded-full px-2 py-1" style="background:#fee2e2; color:#991b1b;">overdue</span>
    </span>
  </div>
  <div class="flex justify-between items-center rounded-lg px-4 py-2" style="border: 1px solid #e2e8f0;">
    <span><span class="text-gray-400 text-xs mr-1">#3</span><b>林大偉</b></span>
    <span class="text-xs font-semibold rounded-full px-2 py-1" style="background:#dcfce7; color:#166534;">completed</span>
  </div>
  <div class="flex justify-between items-center rounded-lg px-4 py-2" style="border: 1px solid #e2e8f0; opacity: 0.5; text-decoration: line-through;">
    <span><span class="text-gray-400 text-xs mr-1">#4</span><b>張雅婷</b></span>
    <span class="text-xs font-semibold rounded-full px-2 py-1" style="background:#f3f4f6; color:#6b7280;">cancelled</span>
  </div>
  <div class="flex justify-between items-center rounded-lg px-4 py-2" style="border: 1px solid #e2e8f0;">
    <span><span class="text-gray-400 text-xs mr-1">#5</span><b>李志豪</b></span>
    <span class="flex gap-1">
      <span class="text-xs font-semibold rounded-full px-2 py-1" style="background:#fef3c7; color:#92400e;">pending</span>
      <span class="text-xs font-semibold rounded-full px-2 py-1" style="background:#fee2e2; color:#991b1b;">overdue</span>
    </span>
  </div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 第 2、5 筆同時掛兩個 badge（物件語法多條件成立）；第 4 筆整列變灰階刪除線（方法回傳 <code>row-cancelled</code>）。
</div>

<!--
先讓大家看一下做完之後畫面長什麼樣子，再回頭寫程式會比較有方向感。

大家可以看到第 2 筆跟第 5 筆，狀態標籤旁邊多了一個紅色的 overdue 標籤，這就是物件語法裡兩個條件同時成立的效果：一個管狀態顏色，一個管逾期提示，彼此互不干擾。第 4 筆整列變成半透明加刪除線，這個效果不是物件語法做的，是掛在 `<li>` 上的 getRowClass() 方法回傳的 row-cancelled class 造成的。
-->

---
layout: default
---

# 練習：訂單狀態標籤
### 解題提示

1. `status` 的型別用聯合型別（union type）宣告，`'pending' | 'shipped' | 'completed' | 'cancelled'`，這樣打錯字 TypeScript 會直接標紅
2. 物件語法裡可以同時放 4 個狀態 class 加 1 個逾期 class，5 個 key 互不影響，符合條件的都會套用（ch39 動態條件綁定）
3. `@for` 語法別忘記 `track`，這裡資料有唯一的 `id`，直接 `track order.id`（ch26 重點）
4. `getRowClass()` 只回傳 `row-cancelled` 或空字串，`[ngClass]="getRowClass(order)"` 綁的是方法呼叫，不是物件（ch39 方法回傳）
5. `badge-*` 這些 class 的 CSS 樣式本身（顏色、底色）不是這次練習重點，可以先用簡單顏色隨意定義，重點是 class 有沒有正確被套上去

<!--
提示的順序照著任務說明的步驟走，卡住的時候可以回頭對照對應那一段的投影片。

⚠️ 大家很容易漏掉的地方是 status 明明已經確定只有四種值，物件語法卻還在寫 `order.status == 'pending'` 這種字串比對沒問題，但如果打錯字（例如打成 'pending'），因為型別是聯合型別，TypeScript 編譯期就會抓出來，這也是為什麼建議一開始就把型別定義清楚。
-->

---

# 完整解答 — Interface 與假資料

```typescript
export interface Order {
  id: number;
  customer: string;
  status: 'pending' | 'shipped' | 'completed' | 'cancelled';
  isOverdue: boolean;
}

orders: Order[] = [
  { id: 1, customer: '王小明', status: 'pending',   isOverdue: false },
  { id: 2, customer: '陳美玲', status: 'shipped',   isOverdue: true  },
  { id: 3, customer: '林大偉', status: 'completed', isOverdue: false },
];
```

<!--
先定義 Order 的型別，status 用聯合型別限制只能是這四種字串，isOverdue 是布林值，代表這筆訂單是否逾期。orders 這裡先放三筆示範，大家實作時記得補到至少 5 筆，涵蓋四種狀態跟逾期、未逾期的情境。
-->

---

# 完整解答 — 假資料（續）與方法

```typescript
  { id: 4, customer: '張雅婷', status: 'cancelled', isOverdue: false },
  { id: 5, customer: '李志豪', status: 'pending',   isOverdue: true  },
];

getRowClass(order: Order): string {
  return order.status === 'cancelled' ? 'row-cancelled' : '';
}
```

<!--
補齊剩下兩筆資料，第 4 筆是 cancelled 狀態，第 5 筆是 pending 但 isOverdue 為 true，等一下畫面上會同時看到 badge-pending 跟 badge-overdue 兩個 class 一起出現。

getRowClass() 就是這次練習的方法回傳範例，邏輯很單純：狀態是 cancelled 就回傳 row-cancelled 這個 class 名稱，其他狀態一律回傳空字串，讓 [ngClass] 什麼都不加。
-->

---

# 完整解答 — HTML

```html
<ul>
  @for (order of orders; track order.id) {
    <li [ngClass]="getRowClass(order)">
      <span [ngClass]="{
        'badge-pending': order.status === 'pending',
        'badge-shipped': order.status === 'shipped',
        'badge-completed': order.status === 'completed',
        'badge-cancelled': order.status === 'cancelled',
        'badge-overdue': order.isOverdue
      }">
        {{ order.customer }} — {{ order.status }}
      </span>
    </li>
  }
</ul>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>@for</code> 是 Angular 17+ 內建語法，不需要額外 import；<code>[ngClass]</code> 物件語法裡的 5 個 key 是各自獨立判斷的，一筆訂單可以同時套上 <code>badge-pending</code> 跟 <code>badge-overdue</code> 兩個 class。
</div>

<!--
外層用 @for 搭配 track order.id 跑過整個 orders 陣列，這是 ch26 教過的語法，忘記 track 會直接編譯錯誤。

<li> 上綁的是 getRowClass(order) 這個方法呼叫，狀態是 cancelled 的那一筆會多一個 row-cancelled class，畫面上可以用這個 class 做灰階或刪除線效果。<span> 上綁的是物件語法，四個狀態 class 只會有一個成立，但 badge-overdue 是獨立判斷的，跟狀態沒有關係，只要 isOverdue 是 true 就會出現，所以逾期的訂單畫面上會同時看到狀態顏色跟逾期警示兩個標籤。
-->

---

# 完整解答 — SCSS

`ngClass` 只負責「加不加這個 class」，class 實際長怎樣（顏色、底色、刪除線）還是要靠 CSS／SCSS 定義：

```scss
.badge-pending   { background: #fef3c7; color: #92400e; }
.badge-shipped   { background: #dbeafe; color: #1e40af; }
.badge-completed { background: #dcfce7; color: #166534; }
.badge-cancelled { background: #f3f4f6; color: #6b7280; }
.badge-overdue   { background: #fee2e2; color: #991b1b; }

.row-cancelled {
  opacity: 0.5;
  text-decoration: line-through;
}
```

上述樣式共用的排版（圓角、字級、padding）可另外抽一個 `.badge` 共用 class，`[ngClass]` 綁定時同時放 `'badge': true` 或直接在 HTML 上寫死 `class="badge"`。

<!--
這頁補上前面一直沒放的 SCSS，讓大家知道 ngClass 跟 CSS 是分工的：ngClass 決定「這個元素現在要不要有 badge-pending 這個名字」，實際 badge-pending 長什麼顏色、字級大小，還是得回到 SCSS 這邊自己定義，Angular 不會幫我們生樣式。

⚠️ 提醒大家，五個 badge class 的顏色只是示範用，重點是每個 class 都要能獨立存在、互不干擾，因為 HTML 那邊 [ngClass] 物件語法本來就可能讓一個元素同時套上兩個 badge（像 badge-pending 加 badge-overdue），所以顏色設計上不要讓兩個 class 用了同一個 CSS 屬性互相覆蓋，例如都設定 background 就會蓋掉，這裡沒有互相衝突的屬性，所以兩個能同時生效。

row-cancelled 就是 getRowClass() 回傳的那個 class，opacity 讓整列變淡，text-decoration: line-through 加上刪除線，兩個效果搭配起來就是畫面預覽看到的「取消訂單」樣式。

到這裡練習的完整解答就講完了，大家可以對照自己寫的版本，看看物件語法跟方法回傳有沒有配對正確，樣式有沒有跟著套上去。
-->

---
layout: end
---

# 課程結束
### 透過 ngClass 可依條件動態控制元素的 CSS class，讓樣式管理更靈活。

<!--
好，這一章 ngClass 就到這邊告一個段落。我們從最簡單的靜態用法，一路學到動態條件綁定，最後看了邏輯複雜時怎麼用方法回傳來處理。

大家現在應該已經能夠說出「我學會了 ngClass」——知道怎麼依條件動態控制元素的 class，讓樣式管理更有彈性，也知道什麼情境該用哪一種寫法。下一章我們會繼續往下學新的內容，大家休息一下。
-->

