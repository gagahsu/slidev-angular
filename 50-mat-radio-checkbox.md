---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Mat-radio & Checkbox
routeAlias: ch50
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
    Mat-radio &amp; Checkbox
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「掌握單選與多選元件，打造互動豐富的 Angular Material 表單」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **Mat-radio 簡介** — 單選元件與 `mat-radio-group` / `mat-radio-button` 的結構
- **mat-radio-group 語法** — 以 `value` 屬性定義各選項對應值
- **HTML input radio** — 純 HTML 寫法與 `name` 群組屬性
- **input radio 群組問題** — 未宣告 `name` 導致多選的情況
- **Checkbox 簡介** — 多選元件與布林值綁定
- **input checkbox 語法** — 純 HTML 寫法與 `ngModel` 雙向綁定
- **mat-checkbox 語法** — Angular Material 版本與模組匯入

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Mat-radio

單選按鈕元件

---
layout: default
---

# Mat-radio 簡介

`mat-radio-button` 是 Angular Material 提供的單選元件，需先安裝 `@angular/material`。

- 一組問題使用一個 `mat-radio-group` 標籤包覆所有選項
- 每個選項以 `mat-radio-button` 標籤呈現
- 透過 `value` 屬性指定該選項被選中時的對應值
- 當使用者選取某選項時，綁定變數的值即更新為該 `value`

<div class="flex justify-center">
  <img src="/images/49-mat-radio-checkbox/mat-radio-preview.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: default
---

# mat-radio-group 語法

使用 `mat-radio-group` 包覆所有 `mat-radio-button`，每個按鈕透過 `value` 定義對應值。

```html
<mat-radio-group>
  <mat-radio-button value="1">Option 1</mat-radio-button>
  <mat-radio-button value="2">Option 2</mat-radio-button>
</mat-radio-group>
```

- `mat-radio-group` 負責管理群組內的互斥選取邏輯
- `value` 屬性決定選取後綁定變數所接收的值
- 可搭配 `[(ngModel)]` 或 Reactive Forms 的 `formControl` 進行資料綁定

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>注意：</b> 使用 <code>mat-radio-group</code> 前須在模組中匯入 <code>MatRadioModule</code>。</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# input radio

純 HTML 單選寫法

---
layout: default
---

# HTML input radio — 基本寫法

純 HTML 單選使用 `<input type="radio">`，並透過 `name` 屬性將選項歸為同一群組。

```html
<input type="radio" value="1" name="A">Option 1
<input type="radio" value="2" name="A">Option 2
```

- HTML 原生寫法沒有 `radio-group` 標籤
- 必須在每個 `<input>` 上宣告相同的 `name` 值，系統才能識別為同一組選項
- 相同 `name` 群組中，同一時間僅能選取一個選項

---
layout: default
---

# HTML input radio — 未設定 name 的問題

若未宣告 `name` 屬性，各個 radio button 各自獨立，導致可同時選取多項。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**錯誤寫法（未宣告 name）**

```html
<input type="radio" value="1">Option 1
<input type="radio" value="2">Option 2
```

結果：兩個選項皆可被選取，失去單選互斥效果。

</div>
<div>

**正確寫法（宣告相同 name）**

```html
<input type="radio" value="1" name="A">Option 1
<input type="radio" value="2" name="A">Option 2
```

結果：同一群組，僅能選取一項。

</div>
</div>

<div class="flex justify-center">
  <img src="/images/49-mat-radio-checkbox/input-radio-no-name-issue.png" class="rounded shadow-md max-h-48" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Checkbox

多選元件

---
layout: default
---

# Checkbox 簡介

Checkbox 用於讓使用者進行多選操作，畫面呈現為正方形選取框（勾選 / 取消）。

- 每個 checkbox 獨立運作，不需要群組標籤
- 選取狀態為布林值（`true` / `false`），不需另外設定 `value`
- 需在 TypeScript 中宣告對應的布林變數，並透過 `[(ngModel)]` 進行雙向綁定

```html
<input type="checkbox">多選1
<input type="checkbox">多選2
```

<div class="flex justify-center">
  <img src="/images/49-mat-radio-checkbox/input-checkbox-preview.png" class="rounded shadow-md max-h-48" />
</div>

---
layout: default
---

# input checkbox — 雙向綁定

Checkbox 的選取狀態為布林值，在 TypeScript 中宣告布林變數後，透過 `[(ngModel)]` 完成綁定。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**HTML**

```html
<input type="checkbox" [(ngModel)]="checkBoxData1">多選1
<input type="checkbox" [(ngModel)]="checkBoxData2">多選2
```

</div>
<div>

**TypeScript**

```typescript
export class AppComponent {
  checkBoxData1: boolean = false;
  checkBoxData2: boolean = false;
}
```

</div>
</div>

- 選取時變數值為 `true`，取消選取時為 `false`
- 多個 checkbox 各自對應獨立的布林變數

---
layout: default
---

# mat-checkbox — Angular Material 寫法

`mat-checkbox` 的用法與 HTML input checkbox 相似，差異在於需額外匯入 `MatCheckboxModule`。

**HTML**

```html
<mat-checkbox [(ngModel)]="checkBoxData1">多選1</mat-checkbox>
<mat-checkbox [(ngModel)]="checkBoxData2">多選2</mat-checkbox>
```

**模組匯入（app.module.ts）**

```typescript
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    MatCheckboxModule,
    FormsModule
  ]
})
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">💡 <b>注意：</b> 使用 <code>[(ngModel)]</code> 雙向綁定時，須同時匯入 <code>FormsModule</code>。</div>

---
layout: default
---

# mat-radio vs mat-checkbox — 比較

| 特性 | mat-radio-button | mat-checkbox |
|---|---|---|
| 選取模式 | 單選（互斥） | 多選（獨立） |
| 群組標籤 | `mat-radio-group` | 不需要 |
| 綁定值型別 | 任意型別（`value` 屬性） | 布林值（`boolean`） |
| 所需模組 | `MatRadioModule` | `MatCheckboxModule` |
| HTML 對應 | `<input type="radio">` | `<input type="checkbox">` |

---
layout: end
---

# 課程結束

### 掌握 `mat-radio-button` 實現單選互斥邏輯，善用 `mat-checkbox` 進行多選布林綁定，並瞭解 Angular Material 與純 HTML 寫法的差異與對應關係
