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

---
layout: default
---

# Outline

- **ngClass 介紹** — 什麼是 ngClass 及使用前置作業
- **靜態用法** — 以 ngClass 替代一般 class 屬性
- **動態條件綁定** — 依布林變數控制 class 的套用
- **方法回傳** — 將複雜邏輯封裝在 TypeScript 方法中

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# ngClass 介紹
# What is ngClass

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 靜態用法
# Static Class Binding

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 動態條件綁定
# Conditional Class Binding

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 方法回傳
# Method-based Class Binding

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

---
layout: end
---

# 課程結束
### 透過 ngClass 可依條件動態控制元素的 CSS class，讓樣式管理更靈活。
