---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 日期選擇器
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
    日期選擇器
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「善用 input date 與 mat-datepicker，輕鬆實作日期選擇功能」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是日期選擇器** — input date 與 mat-datepicker 兩種方案比較
- **input type="date" 的 type 類型** — month、date、time、datetime-local、week
- **input date 與 ngModel** — 以 ngModel 綁定日期值、設定 min/max
- **mat-datepicker 介紹** — 官方範例預覽與 HTML 結構說明
- **mat-datepicker HTML 元件說明** — mat-form-field、mat-label、mat-hint、mat-datepicker-toggle、mat-datepicker
- **mat-datepicker TS 設定** — 匯入模組與 provideNativeDateAdapter
- **mat-datepicker 資料綁定** — ngModel 初始值與 min/max 限制

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是日期選擇器？
# What is a Date Picker?

---

# 日期選擇器

頁面需要使用者選擇日期時，可選擇兩種方案：

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**`<input type="date">`**
- 寫法簡單，原生 HTML 支援
- 樣式由瀏覽器控制，各平台外觀不一致

</div>
<div>

**`<mat-datepicker>`**
- 需安裝較多套件
- 版型與資料格式由 Angular Material 統一處理
- 跨瀏覽器外觀一致

</div>
</div>

```html
<!-- 原生 input -->
<label for="birthday">Birthday:</label>
<input type="date" id="birthday" name="birthday">

<!-- mat-datepicker -->
<mat-form-field>
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# input type="date" 的 type 類型
# Input Date Type Variants

---

# input type="date" — 可用的 type 值

`<input type="date">` 可依需求切換 type，各類型分別顯示不同的選擇介面。值的格式為 `yyyy-MM-ddThh:mm`（例如 `2024-11-05T19:30`），月份與日期若小於 10 須補前置 0。

| type | 顯示內容 |
|------|---------|
| `month` | 年份 + 月份 |
| `date` | 年月日 |
| `time` | 時間（時:分） |
| `datetime-local` | 本地年月日 + 時間 |
| `week` | 年份 + 週數 |

每種類型皆支援 `value`、`min`（最小可選時間）、`max`（最大可選時間）屬性。

---

# month（年月）

選擇年份與月份，不含日期。

<div class="flex justify-center">
  <img src="/images/34-date-picker/input-type-month.png" class="rounded shadow-md max-h-80" />
</div>

---

# date（年月日）

選擇完整的年月日，是最常用的類型。

<div class="flex justify-center">
  <img src="/images/34-date-picker/input-type-date.png" class="rounded shadow-md max-h-80" />
</div>

---

# time（時間）

僅選擇時間（時、分），不含日期。

<div class="flex justify-center">
  <img src="/images/34-date-picker/input-type-time.png" class="rounded shadow-md max-h-80" />
</div>

---

# datetime-local（本地年月日 + 時間）

同時選擇日期與時間，左側為日曆，右側為時間滾輪。

<div class="flex justify-center">
  <img src="/images/34-date-picker/input-type-datetime-local.png" class="rounded shadow-md max-h-80" />
</div>

---

# week（年份 + 週數）

以週為單位選取，選中後整週日期全部反白顯示。

<div class="flex justify-center">
  <img src="/images/34-date-picker/input-type-week.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# input date 與 ngModel
# Input Date with ngModel

---
layout: two-cols
---

# input date — 以 ngModel 綁定日期

在 Angular 中以 `[(ngModel)]` 取代原生 `value` 屬性，並可透過 `min`、`max` 屬性限制可選範圍。值的格式為 `yyyy-MM-dd`（例如 `2024-11-05`）。

```html
<input type="date"
       [(ngModel)]="today"
       min="2024-11-05"
       max="2024-11-10">
```

```typescript
today = '2024-11-05';
```

::right::

<div class="flex items-center justify-center h-full">
  <img src="/images/34-date-picker/input-date-ngmodel-preview.png" class="rounded shadow-md max-h-72" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-datepicker
# Angular Material Datepicker

---

# mat-datepicker — 官方範例預覽

Angular Material 提供的 `mat-datepicker` 外觀統一、功能完整，使用前先至官方文件找到 **Basic datepicker** 範例，查看其 HTML 與 TS 程式碼。

<div class="flex justify-center">
  <img src="/images/34-date-picker/mat-datepicker-preview.png" class="rounded shadow-md max-h-72" />
</div>

---

# mat-datepicker — HTML 結構

`<mat-form-field>` 是 Angular Material 的外層容器，負責套用統一樣式與排版；缺少此元件會導致畫面排版錯亂。

```html
<mat-form-field>
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
```

---

# mat-datepicker — 各元件說明（一）

| 元件 / 指令 | 說明 |
|------------|------|
| `<mat-form-field>` | 最外層容器，套用 Angular Material 統一排版與樣式 |
| `<mat-label>` | 輸入框的預設提示標籤文字 |
| `<input matInput [matDatepicker]="picker">` | 實際輸入框，`matInput` 指令加入預設功能與樣式，`[matDatepicker]` 綁定對應的日期選擇器 |

---

# mat-datepicker — 各元件說明（二）

| 元件 / 指令 | 說明 |
|------------|------|
| `<mat-hint>` | 輸入框下方的提示訊息（例如格式說明） |
| `<mat-datepicker-toggle matIconSuffix [for]="picker">` | 顯示在輸入框後方的日曆圖示按鈕；改用 `matIconPrefix` 可移至前方 |
| `<mat-datepicker #picker>` | 點擊圖示後彈出的日期選擇面板，以 `#picker` 作為 ID 與上方元件互相綁定 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>[matDatepicker]</code>、<code>[for]</code>、<code>&lt;mat-datepicker&gt;</code> 三者使用的 ID 必須完全一致，否則選擇器無法正常運作。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-datepicker TS 設定
# TypeScript Configuration

---

# mat-datepicker — 匯入必要模組

在使用 `mat-datepicker` 的元件 TS 檔中，需匯入以下模組並加入 `provideNativeDateAdapter` 作為 provider：

```typescript
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  // ...
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
})
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-datepicker 資料綁定
# Data Binding

---

# mat-datepicker — 以 ngModel 綁定初始值

在 `<input>` 上加入 `[(ngModel)]` 進行雙向資料綁定。初始值需以 `new Date()` 建立 Date 物件。

```html
<input matInput [matDatepicker]="picker" [(ngModel)]="sDate">
```

```typescript
sDate = new Date('2024/11/8');
```

<div class="flex justify-center">
  <img src="/images/34-date-picker/mat-datepicker-ngmodel-initial.png" class="rounded shadow-md max-h-52" />
</div>

---
layout: two-cols
---

# mat-datepicker — 設定 min / max 日期範圍

透過 `[min]` 與 `[max]` 屬性限制可選取的日期範圍，超出範圍的日期會呈現灰色不可點擊狀態。

```html
<input matInput
       [matDatepicker]="picker"
       [min]="minDate"
       [max]="maxDate"
       [(ngModel)]="sDate">
```

```typescript
sDate    = new Date('2024/11/8');
minDate  = new Date('2024/11/3');
maxDate  = new Date('2024/11/20');
```

::right::

<div class="flex items-center justify-center h-full">
  <img src="/images/34-date-picker/mat-datepicker-min-max.png" class="rounded shadow-md max-h-72" />
</div>

---
layout: end
---

# 課程結束
### 善用 input date 與 mat-datepicker，依需求選擇最適合的日期選擇方案
