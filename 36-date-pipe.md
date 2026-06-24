---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: DatePipe
routeAlias: ch35
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
    DatePipe
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「善用 Angular DatePipe，輕鬆將日期格式轉換為可讀性高的字串」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **DatePipe 是什麼** — 為什麼需要日期格式轉換
- **日期資料轉換（手動）** — 用 TypeScript 方法提取年／月／日
- **日期資料轉換（DatePipe）** — 匯入 CommonModule 並套用管道語法

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# DatePipe 是什麼？
# What is DatePipe?

---

# DatePipe 是什麼？

直接將 `Date` 物件綁定到範本時，Angular 會呈現原始格式（例如 `Sun Nov 01 2025...`），與實際需要的顯示格式（如 `2025/01/13`）不同，因此需要進行資料轉換。

`DatePipe` 是 Angular 內建管道，能以簡短的模板語法將日期格式化為指定字串，無需手動撰寫轉換邏輯。

<div class="flex justify-center">
  <img src="/images/35-date-pipe/angular-datepipe-banner.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 日期資料轉換
# Date Formatting

---

# 日期資料轉換
### 方法一：用 TypeScript 手動轉換

當變數為 `Date` 型別時，可透過日期方法提取年、月、日，再組合成目標格式：

```typescript
today = new Date();

ngOnInit(): void {
  // 輸出範例：Thu Feb 12 2026 14:59:56 GMT+0800 (台北標準時間)
  console.log(this.today);
}
```

---

# 日期資料轉換
### 提取年、月、日

若目標格式為 `yyyy/MM/dd`，需分別提取年、月、日：

```typescript
tidyDate(date: Date) {
  // 提取年
  console.log(date.getFullYear());
  // 提取月（從 0 起算，需 +1）
  console.log(date.getMonth());
  // 提取日
  console.log(date.getDate());
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>getMonth()</code> 回傳值從 0 開始，1 月為 0、12 月為 11，使用時需加 1。
</div>

---

# 日期資料轉換
### 組合日期字串（一）— 方法定義

```typescript
// 接收一個 Date 值，回傳格式化後的 string
tidyDate(date: Date): string {
  let newDate = '';

  // 加入年份與分隔符
  newDate = newDate + date.getFullYear() + '/';

  // 月份補零（月份從 0 起算，需 +1）
  if ((date.getMonth() + 1) < 10) {
    newDate = newDate + 0 + (date.getMonth() + 1) + '/';
  } else {
    newDate = newDate + (date.getMonth() + 1) + '/';
  }
```

---

# 日期資料轉換
### 組合日期字串（二）— 日期補零與回傳

```typescript
  // 日期補零
  if (date.getDate() < 10) {
    newDate = newDate + 0 + date.getDate();
  } else {
    newDate = newDate + date.getDate();
  }

  // 回傳組合好的日期字串
  return newDate;
}
```

月份與日期若為個位數則補 `0`，確保格式固定為兩位數。

---
layout: two-cols
---

# 日期資料轉換
### 在 HTML 與 TS 中使用 tidyDate

完成方法後，可在 HTML 範本或 TS 中呼叫：

**在 TS 中呼叫：**

```typescript
ngOnInit(): void {
  console.log(this.tidyDate(this.today));
}
```

**在 HTML 中呼叫：**

```html
{{ tidyDate(today) }}
```

::right::

<div class="flex flex-col items-center justify-center h-full gap-4">
  <p class="text-gray-500 text-sm">輸出結果</p>
  <div class="px-6 py-3 bg-teal-50 border border-teal-300 rounded-lg text-2xl font-mono text-teal-700">
    2026/02/12
  </div>
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 使用 DatePipe
# Using DatePipe

---

# 使用 DatePipe
### 方法二：Angular 內建管道

若只需在 HTML 中顯示格式化日期，不須另外撰寫轉換方法，可直接使用 Angular 的 `DatePipe`。

**步驟：**

1. 在元件的 `imports` 中加入 `CommonModule`
2. 在範本中使用內嵌繫結顯示日期變數
3. 在變數名稱後加上 `| date: '格式字串'`

---

# 使用 DatePipe
### 匯入 CommonModule

```typescript
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-...',
  imports: [
    CommonModule
  ],
})
```

---

# 使用 DatePipe
### 範本語法與輸出結果

```html
{{ today | date: 'yyyy-MM-dd' }}
```

輸出結果：`2026-02-12`

| 格式字串 | 輸出範例 |
|---|---|
| `'yyyy/MM/dd'` | `2026/02/12` |
| `'yyyy-MM-dd'` | `2026-02-12` |
| `'MM/dd/yyyy'` | `02/12/2026` |
| `'fullDate'` | `Thursday, February 12, 2026` |
| `'shortDate'` | `2/12/26` |

---
layout: end
---

# 課程結束
### 善用 Angular DatePipe，以簡潔的管道語法取代手動日期格式轉換
