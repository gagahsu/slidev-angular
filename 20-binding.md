---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 繫結
routeAlias: ch20
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
    繫結
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「連結 TypeScript 與 HTML 的橋樑」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **繫結介紹** — 什麼是繫結、四種類型
- **單向 vs 雙向綁定** — 差異比較
- **內嵌繫結** `{{ }}`
- **屬性繫結** `[attr]`
- **事件繫結** `(event)`
- **雙向繫結** `[(ngModel)]`
- **實作練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 認識繫結
# Binding Overview

---

# 繫結介紹

繫結（Data Binding）是 Angular 協調 **Component（TypeScript）** 與 **Template（HTML）** 互相傳遞資料的機制。

| 繫結類型 | 語法 | 方向 |
| --- | --- | --- |
| 內嵌繫結 | `{{ 變數 }}` | 單向 TS → HTML |
| 屬性繫結 | `[屬性]="變數"` | 單向 TS → HTML |
| 事件繫結 | `(事件)="方法()"` | 單向 HTML → TS |
| 雙向繫結 | `[(ngModel)]="變數"` | 雙向 TS ↔ HTML |

---

# 單向綁定 vs 雙向綁定

| | 單向綁定 (One-Way Binding) | 雙向綁定 (Two-Way Binding) |
| --- | --- | --- |
| 方向 | TS → HTML（或 HTML → TS） | TS ↔ HTML |
| 包含類型 | 內嵌、屬性、事件繫結 | 雙向繫結 |
| 適用情境 | 純顯示（`<title>`）或純觸發 | 使用者輸入（`<input>`） |
| 特性 | HTML 更新不影響 TS | 任一方改變，另一方同步更新 |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 四種繫結方式
# Four Binding Types

---

# 內嵌繫結 Interpolation

在 HTML 中直接顯示 TypeScript 變數值，使用雙大括弧語法。

| 特性 | 說明 |
| --- | --- |
| 語法 | `{{ 變數名稱 }}` |
| 方向 | 單向：TS → HTML |
| 用途 | 顯示文字、數值、表達式 |

```html
<h1>{{ title }}</h1>
<p>等級：{{ level }}</p>
<p>計算結果：{{ 1 + 2 }}</p>
```

---

# 內嵌繫結 — 範例

```typescript
// app.component.ts
export class AppComponent {
  title = '我的 Angular 應用';
  level = 1;
  name = 'Allen';
}
```

```html
<!-- app.component.html -->
<h1>{{ title }}</h1>
<p>玩家：{{ name }}，等級：{{ level }}</p>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 內嵌繫結只能用在標籤的<b>內容</b>（標籤之間），無法直接用在 HTML 屬性值中（例如 <code>src</code>、<code>placeholder</code>）。
</div>

---

# 屬性繫結 Property Binding

將 TypeScript 變數與 HTML 標籤的**屬性**繫結，屬性名稱需加中括弧。

| 特性 | 說明 |
| --- | --- |
| 語法 | `[屬性名稱]="變數名稱"` |
| 方向 | 單向：TS → HTML |
| 用途 | 動態設定 `src`、`placeholder`、`disabled` 等屬性 |

```html
<!-- 屬性繫結寫法：中括弧，值只能放變數 -->
<input [placeholder]="hintText">

<!-- 傳統寫法：可混用文字與變數（用雙層大括弧包變數） -->
<img src="{{ imgUrl }}">
```

---

# 屬性繫結 — 兩種寫法比較

兩種寫法皆可運行，建議依情況選擇最清晰的方式。

| 寫法 | 語法 | 值的來源 | 建議時機 |
| --- | --- | --- | --- |
| 屬性繫結 | `[placeholder]="變數"` | 只能放變數 | ✅ 確定值是變數時 |
| 內嵌屬性 | `src="{{ 變數 }}"` | 可混合文字與變數 | 需要拼接字串時 |

```typescript
// app.component.ts
export class AppComponent {
  hintText = '請輸入姓名';
  imgUrl = 'assets/photo.png';
}
```

---

# 事件繫結 Event Binding

HTML 事件觸發時，呼叫 TypeScript 中對應的方法。

| 特性 | 說明 |
| --- | --- |
| 語法 | `(事件名稱)="方法名稱()"` |
| 方向 | 單向：HTML → TS |
| 常用事件 | `click`、`input`、`change`、`submit` |

```html
<button (click)="levelUp()">升級</button>
<input (input)="onInput($event)">
```

---

# 事件繫結 — 範例

```typescript
// app.component.ts
export class AppComponent {
  level = 1;

  levelUp() {
    this.level++;
  }
}
```

```html
<!-- app.component.html -->
<p>目前等級：{{ level }}</p>
<button (click)="levelUp()">升級</button>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>提示：</b> 事件繫結的方法後面要加 <code>()</code>，表示「呼叫」該方法，而非傳入方法參考。
</div>

---

# 雙向繫結 Two-Way Binding

TS 變數與 HTML 輸入元素同步更新，不管哪邊改變另一邊都會跟著更新。

| 特性 | 說明 |
| --- | --- |
| 語法 | `[(ngModel)]="變數名稱"` |
| 方向 | 雙向：TS ↔ HTML |
| 適用元素 | `<input>`、`<select>`、`<textarea>` |
| 前置條件 | 需匯入 `FormsModule` |

```html
<input [(ngModel)]="username">
<p>您輸入：{{ username }}</p>
```

---

# 雙向繫結 — 匯入 FormsModule

使用 `ngModel` 前，必須將 `FormsModule` 加入元件的 `imports` 陣列，否則 HTML 會報錯「無法識別 ngModel 屬性」。

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  username = '';
}
```

---

# 雙向繫結 — 完整範例

```typescript
// app.component.ts
import { FormsModule } from '@angular/forms';

@Component({ standalone: true, imports: [FormsModule] })
export class AppComponent {
  inputLevel = 1;

  updateStats() {
    // 依 inputLevel 重新計算攻擊力與防禦力
  }
}
```

```html
<input [(ngModel)]="inputLevel" type="number">
<button (click)="updateStats()">修改等級</button>
<p>等級：{{ inputLevel }}</p>
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

---
layout: two-cols
---

# 練習 1：等級計算機
### 任務說明

1. 顯示目前**等級**、**攻擊力**、**防禦力**
2. **升級按鈕**：等級 +1，攻擊力 = 等級 × 3，防禦力 = 等級 × 2
3. **輸入框**：可直接輸入目標等級（使用雙向繫結）
4. **修改等級按鈕**：依輸入框的等級重新計算攻擊力與防禦力
5. **重置按鈕**：等級、攻擊力、防禦力恢復至 1 等（攻擊 3、防禦 2）

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/20-binding/practice-1.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: default
---

# 練習 1：解題提示
### 提示說明

1. 宣告四個變數：`level = 1`、`attack = 3`、`defense = 2`、`inputLevel = 1`
2. **升級方法**：`level++`，然後 `attack = level * 3; defense = level * 2`
3. **修改等級方法**：`level = this.inputLevel`，再重新計算攻擊與防禦
4. **重置方法**：`level = 1; attack = 3; defense = 2`
5. 輸入框使用 `[(ngModel)]="inputLevel"` 進行雙向繫結
6. 三個按鈕各用 `(click)` 事件繫結對應方法

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>記得</b> 在 <code>imports</code> 加入 <code>FormsModule</code> 才能使用 <code>[(ngModel)]</code>
</div>

---
layout: two-cols
---

# 練習 2：等級計算機加強版
### 任務說明

1. **UI 美化**：排版成較美觀的版面（可使用 Bootstrap 或自訂 CSS）
2. **新增降級功能**：點擊降級按鈕，等級 -1
3. **等級下限判斷**：等級不可小於 1（降級時需判斷）

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/20-binding/practice-2.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: default
---

# 練習 2：解題提示
### 提示說明

1. 在練習 1 基礎上新增 `levelDown()` 方法
2. 降級前判斷：`if (this.level > 1) { this.level--; ... }`
3. 攻擊與防禦計算邏輯不變
4. UI 美化建議：
   - 使用 Bootstrap `card` 包覆整體內容
   - 用 `btn-success` / `btn-danger` 區分升降按鈕顏色
   - 數值統計用 `<table>` 呈現

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>降級防呆：</b> 可在降級按鈕加 <code>[disabled]="level &lt;= 1"</code> 來禁用按鈕
</div>

---
layout: end
---

# 課程結束
### 掌握四種繫結，讓 Angular 資料流動起來
