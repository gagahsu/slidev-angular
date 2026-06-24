---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Validators
routeAlias: ch52
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
    Validators
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「透過內建驗證器，確保表單資料的正確性與完整性」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **Validators 概念** — 表單驗證器的定義與用途
- **Validators 的使用方式** — import 與基本語法
- **多個 Validators 的組合** — 陣列語法與注意事項
- **常用內建 Validators 一覽** — 8 種常用驗證器
- **Validators.pattern 與 Regex** — 正規表達式應用
- **驗證結果的讀取** — `.invalid` 的用法與範例

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Validators 概念
## What Are Validators

---

# Validators 是什麼？

Validators（驗證器）是 Angular Forms 的輸入驗證機制，負責檢查使用者輸入的資料是否符合預設規則。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**驗證失敗時的行為**
- 將表單欄位標記為「無效（invalid）」
- 提供對應的錯誤代碼
- 可用於阻止表單送出

</div>
<div>

**適用表單類型**
- Reactive Forms（響應式表單）
- Template-driven Forms（範本驅動表單）
- 本課程以 Reactive Forms 為主

</div>
</div>

<div class="flex justify-center">
  <img src="/images/51-validators/angular-form-validation-concept.png" class="rounded shadow-md max-h-48" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Validators 的使用方式
## How to Use Validators

---

# 引入 Validators

使用 Validators 前，需先從 `@angular/forms` 匯入。

```typescript
import { Validators } from '@angular/forms';
```

在 `FormGroup` 的欄位定義中，陣列的第二個元素用於指定驗證器（非必填）：

```typescript
// 語法結構：[初始值, 驗證器]
form = this.fb.group({
  surveyTitle: ['', Validators.required],  // 必填驗證
  questions:   this.fb.array([])           // 無驗證
});
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> 陣列第一個元素為欄位初始值，第二個元素為驗證器，驗證器非必填，可省略。
</div>

---

# 使用多個 Validators

若需同時套用多個驗證器，將驗證器以陣列包覆，並以逗號分隔。

```typescript
form = this.fb.group({
  surveyTitle: ['', [Validators.required, Validators.maxLength(5)]],
});
```

**注意事項**
- 驗證器之間無數量上限
- 避免設定互相衝突的驗證規則（例如同時設定 `minLength(10)` 與 `maxLength(5)`）

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 常用內建 Validators
## Built-in Validators

---

# 常用 Validators 一覽

| 驗證器 | 說明 |
| --- | --- |
| `Validators.required` | 必填。欄位值不可為空字串、`null` 或 `undefined` |
| `Validators.requiredTrue` | 值必須為 `true`，常用於 Checkbox 勾選確認 |
| `Validators.email` | 驗證 Email 格式，需包含 `@` 與 `.` |
| `Validators.minLength(n)` | 字串長度不得少於 n 個字元 |
| `Validators.maxLength(n)` | 字串長度不得超過 n 個字元 |
| `Validators.min(n)` | 數值不得小於 n（用於數字欄位） |
| `Validators.max(n)` | 數值不得大於 n（用於數字欄位） |
| `Validators.pattern(/regex/)` | 值必須符合指定的正規表達式 |

---

# 常用 Validators — 範例

```typescript
form = this.fb.group({
  username: ['', [Validators.required, Validators.minLength(3)]],
  email:    ['', [Validators.required, Validators.email]],
  age:      [null, [Validators.min(18), Validators.max(99)]],
  agree:    [false, Validators.requiredTrue],
  zipCode:  ['', Validators.pattern(/^\d{5}$/)],
});
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Validators.pattern 與 Regex
## Pattern Validator and Regular Expressions

---

# Validators.pattern 與正規表達式

`Validators.pattern()` 接受一個正規表達式（Regular Expression，簡稱 Regex），用於比對輸入值是否符合指定格式。

**正規表達式**是一種文字匹配規則，可定義字元類型、範圍與數量等條件。

<div class="flex justify-center">
  <img src="/images/51-validators/regex-syntax-diagram.png" class="rounded shadow-md max-h-80" />
</div>

---

# Regex 常用語法

| 符號 | 說明 | 範例 |
| --- | --- | --- |
| `^` | 字串起始位置 | `^A` 表示以 A 開頭 |
| `$` | 字串結束位置 | `Z$` 表示以 Z 結尾 |
| `[A-Z]` | 大寫字母 A 到 Z 的任一字元 | `[A-Z]{3}` |
| `\d` | 任意數字（等同 `[0-9]`） | `\d{4}` |
| `{n}` | 恰好重複 n 次 | `\d{5}` |

**範例：驗證台灣郵遞區號（5 位數字）**

```typescript
Validators.pattern(/^\d{5}$/)
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 驗證結果的讀取
## Reading Validation State

---

# 讀取驗證狀態：.invalid

設定驗證器後，透過 `form.get('欄位名稱')?.invalid` 讀取該欄位是否驗證失敗。

| 回傳值 | 意義 |
| --- | --- |
| `false` | 欄位值符合所有驗證規則（有效） |
| `true` | 欄位值不符合至少一項驗證規則（無效） |

---

# 驗證狀態範例（一）

在 TypeScript 中，於送出前判斷欄位是否有效：

```typescript
// 送出表單
onSubmit() {
  if (this.form.get('surveyTitle')?.invalid) {
    console.log('標題的內容請符合限制');
    return;
  }
  // 繼續執行送出邏輯
}
```

---

# 驗證狀態範例（二）

在 HTML 範本中，根據驗證狀態動態顯示錯誤提示：

```html
<input formControlName="surveyTitle" />
<p *ngIf="form.get('surveyTitle')?.invalid &&
          form.get('surveyTitle')?.touched">
  標題為必填，且長度不得超過 5 個字元。
</p>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>建議：</b> 搭配 <code>touched</code> 屬性判斷，避免在使用者尚未輸入時即顯示錯誤訊息。
</div>

---

# 常用驗證狀態屬性

| 屬性 | 說明 |
| --- | --- |
| `.invalid` | 欄位值不符合驗證規則時為 `true` |
| `.valid` | 欄位值符合所有驗證規則時為 `true` |
| `.touched` | 使用者曾聚焦並離開該欄位時為 `true` |
| `.untouched` | 使用者尚未觸碰該欄位時為 `true` |
| `.dirty` | 使用者已變更欄位值時為 `true` |
| `.pristine` | 欄位值尚未被變更時為 `true` |
| `.errors` | 回傳所有驗證錯誤的物件（無錯誤時為 `null`） |

---
layout: end
---

# 課程結束

### 透過 Validators 設定驗證規則、搭配 .invalid 讀取狀態，確保表單資料完整且正確後再送出
