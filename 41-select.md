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

<!--
大家好，這一章我們要來學下拉選單，也就是 select。

平常填表單的時候，選手機品牌、選城市、選付款方式，常常都是用下拉選單，因為它可以把一堆選項收在一個小小的空間裡，不占畫面。在 Angular 裡，我們有兩種做法可以實現下拉選單：一種是最原始的 HTML select，另一種是 Angular Material 提供的樣式版本。

學完這一章，大家會知道這兩種寫法怎麼寫、差在哪裡，以及什麼情況下該選哪一種。
-->

---
layout: default
---

# Outline

- **Select 簡介** — HTML 原生 select 與 Angular Material mat-select 的差異
- **HTML select 寫法** — `<select>` 搭配 `[(ngModel)]` 雙向綁定
- **mat-select 寫法** — `<mat-select>`/`<mat-option>` 元件寫法、`matNativeControl` 屬性與必要模組匯入
- **何時選擇哪種** — 根據需求選用原生或 Material 元件

<!--
這張投影片先帶大家看一下今天的路線圖：先介紹 select 的兩種實作方式，接著分別示範 HTML 原生寫法跟 Angular Material 的寫法，最後我們會把兩種方式放在一起比較，幫助大家判斷實務上該怎麼選。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Select 簡介
# Introduction to Select

<!--
這一節先建立一個大概念：select 到底是什麼、Angular 裡有哪些做法可以選。
-->

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

<!--
我們先來看這張對照表。左邊是 HTML 原生的 select，用最基本的 select 跟 option 標籤，樣式就是瀏覽器本身長的樣子，不同瀏覽器、不同作業系統看起來可能都不太一樣；右邊是 Angular Material 的寫法，統一套用 Material Design 的視覺風格，但相對地要多匯入幾個模組。

大家可以先記住這個對照的印象，等一下我們會實際動手寫這兩種寫法，寫完再回頭看這張圖會更有感覺。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# HTML select 寫法
# Native HTML Select

<!--
接下來我們先從最基本、最原始的 HTML select 開始，這是最基礎的寫法，之後理解 Material 版本會更容易。
-->

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

<!--
我們先帶大家看一下這段 HTML select 的基本結構。select 標籤就像是一個容器，裡面放的每一個 option 就是一個選項，option 的 value 屬性才是真正會被綁定到程式碼變數的值，option 中間顯示的文字只是給使用者看的。

大家注意這裡第一個 option，value 是空字串，這是刻意設計的預設佔位選項，讓使用者一開始看到的是「請選擇」而不是直接選中某個品牌。

⚠️ 這裡容易搞混的地方是：畫面上顯示的文字（像「Volvo」）跟 value 屬性的值（像 "volvo"）不是同一件事，[(ngModel)] 綁定到的永遠是 value，不是顯示文字。

執行後大家會看到一個下拉選單，選了 Volvo 之後，selectData 這個變數的值就會變成字串 "volvo"。
-->

---

# HTML select — ngModel 說明（一）

| 元素 | 角色 |
|------|------|
| `<select [(ngModel)]="selectData">` | 選單容器，雙向綁定到 `selectData` 變數 |
| `<option value="volvo">Volvo</option>` | 選項，`value` 為綁定到 `selectData` 的實際值 |
| 使用者選擇 Volvo 後 | `selectData === "volvo"` |

<!--
這張表格把剛剛講的三個角色再整理一次，讓大家一眼看懂 select、option、跟綁定變數之間的對應關係。

大家可以把它想成點餐機：select 是整台點餐機，option 是每一個餐點按鈕，我們按下按鈕之後，機器記住的是餐點代號（value），不是按鈕上印的圖片文字。
-->

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

<!--
要讓 [(ngModel)] 這種雙向綁定語法可以用，我們必須先在元件裡匯入 FormsModule，這點跟之前教過的表單雙向綁定是一樣的規則，忘記匯入的話 ngModel 就會完全沒作用甚至報錯。

⚠️ 這是新手最常忘記的地方：只寫了 [(ngModel)] 但沒有匯入 FormsModule，結果畫面沒反應還一頭霧水，所以看到 ngModel 就要先反射性檢查有沒有匯入這個模組。

執行後，selectData 這個屬性的初始值是空字串，對應到我們前面 option 裡那個空的 value，也就是預設顯示「請選擇」。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-select 寫法
# Angular Material mat-select

<!--
剛剛我們學會了最原始的 select 寫法，接下來我們換個角度，看看怎麼把它包裝成 Material Design 風格，讓整個表單看起來更統一、更漂亮。
-->

---

# mat-select — 基本用法

Angular Material 提供兩種整合方式：`<mat-select>` 元件、與在原生 `<select>` 上加 `matNativeControl` 屬性。先看 `<mat-select>` 元件本身怎麼寫。

```html
<mat-form-field>
  <mat-label>Favorite food</mat-label>
  <mat-select>
    @for (food of foods; track food) {
      <mat-option [value]="food.value">{{food.viewValue}}</mat-option>
    }
  </mat-select>
</mat-form-field>
```

- `<mat-select>` 取代原生 `<select>`，`<mat-option>` 取代 `<option>`
- `@for` 迴圈搭配 `track food` 產生選項，`[value]` 綁定實際值，內容顯示 `viewValue`

<!--
先看 mat-select 元件本身的寫法。跟原生 select 最大差異：option 換成 mat-option，而且選項通常用 @for 迴圈從陣列產生，不會像原生那樣一個一個手動寫。

mat-select 標籤本身不用額外屬性，Material 會自動套用樣式；每個 mat-option 用 [value] 綁定實際存到程式碼裡的值，中間文字則是顯示給使用者看的 viewValue。

track food 是 Angular 新版 control flow 語法要求的，用來幫 Angular 追蹤每個選項的身分，避免不必要的重新渲染。
-->

---

# mat-select — 元件程式碼

```typescript
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'select-overview-example',
  templateUrl: 'select-overview-example.html',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule],
})
export class SelectOverviewExample {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
}
```

- `foods` 陣列即為 `@for` 迴圈的資料來源，每筆含 `value`（實際值）與 `viewValue`（顯示文字）
- 需匯入 `MatFormFieldModule`、`MatSelectModule`

<!--
配合前一頁的 template，這裡是對應的元件程式碼。重點是 foods 這個陣列，每一筆資料都有 value 跟 viewValue 兩個欄位，分別對應到前面看到的 [value] 綁定跟中間顯示的文字。

imports 陣列要記得放 MatFormFieldModule 跟 MatSelectModule，這是 mat-select 元件運作的基本需求。

大家可以看到，這種寫法很適合選項是動態資料的情境，例如從後端 API 拿到的清單，直接丟進 foods 陣列、模板完全不用改。
-->

---

# mat-select — 使用 matNativeControl

`<mat-select>` 元件之外，Angular Material 也支援在原生 `<select>` 上加 `matNativeControl` 屬性。使用 `matNativeControl` 可保留原生 select 語意，同時套用 Material 樣式。

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

<!--
這裡我們示範的是一個很方便的做法：不用整個換成 mat-select 元件，只要在原本的 select 標籤上加一個 matNativeControl 屬性，就能讓 Angular Material 認出它、套用對應的樣式，同時保留原生 select 的操作行為，等於是「舊瓶裝新酒」。

大家帶著看一下這幾個關鍵：mat-form-field 是最外層的外框，負責畫出 Material 風格的邊框跟動畫；mat-label 就是那個會飄動的標籤文字；matNativeControl 這個屬性才是真正讓 Angular Material 認出這個原生 select 的關鍵字。

執行後大家會看到一個有 Material 外框跟浮動標籤的下拉選單，但操作起來跟原生 select 完全一樣。
-->

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

<!--
光是在 HTML 裡加 matNativeControl 還不夠，Angular Material 是模組化設計的，我們用到哪個功能就要匯入對應的模組，這裡總共要匯入四個：MatFormFieldModule、MatSelectModule、MatInputModule，還有讓雙向綁定能運作的 FormsModule。

⚠️ 提醒大家特別注意 MatInputModule，這個很容易被忽略，因為我們沒有直接用到 mat-input 元件，但 matNativeControl 的樣式渲染其實依賴它，少了它外框樣式可能會跑掉、看起來怪怪的。

如果編譯或畫面出現找不到指令的錯誤，第一件事就是回來檢查這幾個模組是不是都匯入了。
-->

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

<!--
這張投影片我們直接放兩張截圖給大家比對，左邊是原生 HTML select 的樣子，外觀完全由瀏覽器決定，也沒有浮動標籤；右邊是加了 matNativeControl 之後的樣子，多了 Material 的外框跟浮動 label，而且會跟頁面上其他 mat-form-field 元件（像輸入框）風格一致。

大家可以看到，同樣是下拉選單，視覺上的差異其實蠻明顯的，這就是為什麼很多專案會選擇用 Material 版本，讓整個表單看起來統一。
-->

---

# 兩種寫法對照

| 項目 | HTML 原生 `<select>` | Angular Material `matNativeControl` |
|------|----------------------|--------------------------------------|
| 外框樣式 | 瀏覽器預設 | Material Design |
| 浮動標籤 | 無 | 有（`<mat-label>`） |
| 雙向綁定 | `[(ngModel)]` | `[(ngModel)]` |
| 必要模組 | `FormsModule` | `MatFormFieldModule`, `MatSelectModule`, `MatInputModule`, `FormsModule` |
| 適用場景 | 簡單表單、無 Material 風格需求 | 統一 Material Design 風格的表單 |

<!--
我們把今天學的兩種寫法整理成一張表格，大家可以看到主要差異就是外框樣式、有沒有浮動標籤、還有需要匯入的模組數量，雙向綁定的方式其實是一樣的，都是用 [(ngModel)]。

實務上怎麼選呢？如果專案本身沒有用 Material，或者只是一個很簡單的小表單，用原生 select 就很夠了，不用多裝一堆模組；但如果專案已經在用 Material 元件、或者對視覺一致性有要求，那就選 matNativeControl 或 mat-select，會讓整個介面看起來更專業。
-->

---
layout: end
---

# 課程結束
### 選用合適的 select 實作方式，兼顧功能需求與視覺一致性

<!--
今天我們學會了兩種做下拉選單的方式：原生 HTML select 搭配 ngModel，還有 Angular Material 的 matNativeControl 寫法。大家現在應該已經知道怎麼選、怎麼寫、遇到問題要檢查哪裡了。

下一章我們會接著看更多實用的元件，大家先把今天的內容練習一下，確保兩種寫法都能自己動手寫出來。
-->

