---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Select
routeAlias: ch41
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
    Select
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「掌握 HTML select 與 Angular Material mat-select，打造靈活的下拉選單」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **Select 簡介** — HTML 原生 select 與 Angular Material mat-select 的差異
- **HTML select 寫法** — `<select>` 搭配 `[(ngModel)]` 雙向綁定
- **mat-select 寫法** — `<mat-form-field>` 包裝、`matNativeControl` 屬性與必要模組匯入
- **何時選擇哪種** — 根據需求選用原生或 Material 元件

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Select 簡介
# Introduction to Select

---

# Select 簡介

下拉選單（select）提供使用者從多個選項中擇一的輸入方式。Angular 支援兩種實作方式：

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**HTML 原生寫法**
- 使用 `<select>` 與 `<option>` 標籤
- 樣式為瀏覽器預設，跨平台外觀不一致
- 搭配 `[(ngModel)]` 雙向綁定

</div>
<div>

**Angular Material 寫法**
- 使用 `<mat-select>` 或 `matNativeControl`
- 統一 Material Design 視覺樣式
- 需匯入 `MatSelectModule`、`MatFormFieldModule`

</div>
</div>

<div class="flex justify-center mt-2">
  <img src="/images/40-select/html-vs-mat-select-comparison.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# HTML select 寫法
# Native HTML Select

---

# HTML select — 基本結構

`<select>` 是最外層的選單容器，`[(ngModel)]` 的值等於目前選中的 `<option>` 的 `value`。

```html
<select [(ngModel)]="selectData">
  <option value="">--Please choose an option--</option>
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
</select>
```

<div class="grid grid-cols-2 gap-4 my-3">
<div>

- 選擇「Volvo」後，`selectData` 的值為 `"volvo"`
- 第一個 `<option>` 的 `value=""` 作為預設佔位選項

</div>
<div>

<div class="flex justify-center">
  <img src="/images/40-select/html-select-dropdown-preview.png" class="rounded shadow-md max-h-52" />
</div>

</div>
</div>

---

# HTML select — ngModel 說明（一）

| 元素 | 角色 |
|------|------|
| `<select [(ngModel)]="selectData">` | 選單容器，雙向綁定到 `selectData` 變數 |
| `<option value="volvo">Volvo</option>` | 選項，`value` 為綁定到 `selectData` 的實際值 |
| 使用者選擇 Volvo 後 | `selectData === "volvo"` |

---

# HTML select — ngModel 說明（二）

使用前需在 TS 中匯入 `FormsModule`：

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  // ...
})
export class AppComponent {
  selectData = '';
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-select 寫法
# Angular Material mat-select

---

# mat-select — 使用 matNativeControl

Angular Material 提供兩種整合方式：`<mat-select>` 元件與在原生 `<select>` 上加 `matNativeControl` 屬性。使用 `matNativeControl` 可保留原生 select 語意，同時套用 Material 樣式。

```html
<mat-form-field>
  <mat-label>Cars</mat-label>
  <select matNativeControl [(ngModel)]="selectData">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </select>
</mat-form-field>
```

- `<mat-form-field>` 提供 Material 外框與標籤
- `<mat-label>` 為浮動標籤文字
- `matNativeControl` 讓 Angular Material 識別並套用樣式

---

# mat-select — 必要模組匯入

HTML 加入後若出現錯誤，需在 TS 的 `imports` 陣列中加入對應模組：

```typescript
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectData = '';
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>MatInputModule</code> 支援 <code>matNativeControl</code> 的樣式渲染，缺少時外框樣式可能不正確。
</div>

---
layout: two-cols
---

# mat-select — 效果預覽

**原生 HTML select**
- 外觀由瀏覽器決定
- 無浮動標籤
- 樣式難以統一

**matNativeControl**
- Material Design 外框
- 浮動 label 效果
- 與其他 mat-form-field 元件風格一致

::right::

<div class="flex items-center justify-center h-full">
  <img src="/images/40-select/mat-native-control-preview.png" class="rounded shadow-md max-h-80" />
</div>

---

# 兩種寫法對照

| 項目 | HTML 原生 `<select>` | Angular Material `matNativeControl` |
|------|----------------------|--------------------------------------|
| 外框樣式 | 瀏覽器預設 | Material Design |
| 浮動標籤 | 無 | 有（`<mat-label>`） |
| 雙向綁定 | `[(ngModel)]` | `[(ngModel)]` |
| 必要模組 | `FormsModule` | `MatFormFieldModule`, `MatSelectModule`, `MatInputModule`, `FormsModule` |
| 適用場景 | 簡單表單、無 Material 風格需求 | 統一 Material Design 風格的表單 |

---
layout: end
---

# 課程結束
### 選用合適的 select 實作方式，兼顧功能需求與視覺一致性
