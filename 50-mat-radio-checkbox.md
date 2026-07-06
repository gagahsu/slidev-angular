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

<!--
大家好，這一章我們要來學表單裡兩個很常見的元件：單選按鈕跟多選框，也就是 mat-radio 跟 mat-checkbox。

想像我們在填一份問卷，「性別」這種只能選一個的題目要用單選，「興趣」這種可以複選的題目就要用多選框。如果自己用純 HTML 刻，樣式跟互動邏輯都要自己處理，Angular Material 幫我們把這兩種元件都做好了，還能跟純 HTML 版本互相對照。

學完這一章，大家會知道怎麼用 mat-radio-button 做互斥的單選題，怎麼用 mat-checkbox 做獨立的多選題，也會搞懂純 HTML 寫法跟 Angular Material 寫法的差異。
-->

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

<!--
這張投影片先帶大家看一下今天的路線圖。我們會先講 mat-radio 單選元件，包含它的 HTML Material 寫法跟純 HTML 寫法各自要注意什麼，接著換到 Checkbox 多選元件，一樣兩種寫法都會看到，最後會有一張表把兩者的差異整理起來給大家對照。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Mat-radio

單選按鈕元件

<!--
先問大家一個問題：像「性別」「訂單狀態」這種只能選一個答案的題目，我們要怎麼確保使用者不會同時勾選兩個選項？這就是單選按鈕要解決的問題，我們先從 Angular Material 提供的 mat-radio 開始看。
-->

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

<!--
mat-radio-button 就是 Angular Material 版本的單選按鈕，用之前記得要先裝好 @angular/material。

大家可以把它想成一組「單選題的選項卡」，外面用 mat-radio-group 這個外框包住所有選項，代表「這些選項是同一組，只能選一個」，裡面每個選項就是一個 mat-radio-button，各自帶著一個 value 值，使用者選了哪個，我們綁定的變數就會拿到那個 value。

這種一組互斥選項的設計，在實務上很常見，像是付款方式、性別、會員等級這種單選題目，都很適合用它。
-->

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

<!--
這段範例的目的，是示範怎麼寫出一組「只能二選一」的單選題。大家帶著看一下，外層是 mat-radio-group，裡面包了兩個 mat-radio-button，各自的 value 分別是 1 跟 2。

mat-radio-group 負責管理這一整組的互斥邏輯，我們不用自己寫 JavaScript 去判斷「選了這個就要把別的取消」，它自動幫我們處理好。實際串資料的時候，通常會搭配 ngModel 雙向綁定，或是 Reactive Forms 的 formControl，選中哪個選項，綁定的變數就會拿到對應的 value。

⚠️ 提醒大家，用 mat-radio-group 之前一定要先在模組裡匯入 MatRadioModule，不然這個標籤 Angular 是不認得的。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# input radio

純 HTML 單選寫法

<!--
看完 Angular Material 的寫法，我們回頭看一下最原始的 HTML 要怎麼做出單選按鈕，這樣大家也能理解 Material 版本背後其實是在解決什麼問題。
-->

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

<!--
這段範例的目的，是讓大家看到純 HTML 版本的單選按鈕怎麼寫。跟 Material 版本不一樣的地方是，這裡沒有像 mat-radio-group 那種外框標籤，取而代之的是每個 input 上都要標記同一個 name 屬性。

大家可以看到這兩個 input 的 name 都是 A，這代表瀏覽器會把它們視為同一組，同一時間只能選一個。這個 name 就是純 HTML 版本用來模擬「群組」概念的方式。

⚠️ 這裡是最容易出錯的地方，等一下下一頁我們會實際看一下，如果忘記加 name 會發生什麼事。
-->

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

<!--
這一頁要示範的，是很多同學一開始寫 radio 常踩到的坑：沒有加 name 屬性。

大家對照左右兩邊的程式碼，左邊是錯誤寫法，兩個 input 各自獨立，沒有共同的 name，所以瀏覽器不知道它們是同一組，結果就是兩個都可以被選取，完全失去「單選」的意義。右邊是正確寫法，兩個 input 都標記了相同的 name="A"，瀏覽器才知道這是同一群組，同一時間只能選一個。

⚠️ 這個錯誤在畫面上不會報錯、也不會有警告，只有實際點兩下才會發現「怎麼兩個都被選起來了」，所以特別容易被忽略，大家寫 radio 的時候一定要養成習慣檢查 name 有沒有加。預期結果大家可以看一下截圖，左邊示範的行為就是這樣跑出來的。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Checkbox

多選元件

<!--
講完單選，我們換一個情境：如果題目是「請勾選你有興趣的項目（可複選）」，這種每個選項都能獨立勾選、彼此互不影響的需求，就要靠 Checkbox 來實現了。
-->

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

<!--
Checkbox 跟 radio 最大的不同，就是它不需要群組觀念，每一個都是獨立的個體，你勾我不勾互不影響。

大家可以留意一下，radio 綁定的是 value 這種任意型別的值，但 checkbox 綁定的是布林值，也就是勾選就是 true，沒勾就是 false，不需要另外設定 value。畫面上這張截圖就是兩個獨立的 checkbox，各自勾選互不影響。

業界實務上，像是「同意服務條款」「訂閱電子報」這種是非題，或是複選興趣這種情境，都是 checkbox 的典型用法。
-->

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

<!--
這段範例的目的，是示範怎麼把 checkbox 的勾選狀態跟 TypeScript 裡的變數綁在一起。我們先在元件裡宣告兩個布林變數 checkBoxData1、checkBoxData2，預設都是 false，接著在 HTML 用 [(ngModel)] 雙向綁定到對應的 input。

大家帶著看一下，這裡是「一對一」的關係，每個 checkbox 對應一個獨立的布林變數，彼此互不干擾，跟 radio 那種「一組共用一個變數」的邏輯完全不一樣。

執行後的預期結果是，勾選第一個 checkbox，checkBoxData1 就會變成 true，勾選或取消第二個完全不會影響第一個的狀態。
-->

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

<!--
mat-checkbox 的寫法跟前面純 HTML 的 input checkbox 幾乎一模一樣，一樣是用 [(ngModel)] 綁定布林變數，差別只在於標籤換成了 mat-checkbox，外觀會套用 Material Design 的樣式。

大家帶著看一下模組匯入的部分，除了要匯入 MatCheckboxModule 讓 Angular 認得這個標籤之外，因為我們用了 [(ngModel)]，還要記得同時匯入 FormsModule，這兩個模組是缺一不可的。

⚠️ 這裡最常見的錯誤，就是只匯入了 MatCheckboxModule，卻忘記匯入 FormsModule，結果雙向綁定完全沒有反應，畫面上也不一定會馬上報錯，大家要養成兩個一起檢查的習慣。
-->

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

<!--
這張表把今天學的兩個元件做個總整理。大家可以看到最核心的差異，就是「選取模式」：radio 是互斥的單選，一組裡面只能選一個，所以需要 mat-radio-group 這個群組標籤；checkbox 是獨立的多選，每個都各自運作，不需要群組概念。

另外綁定值的型別也不一樣，radio 綁定的是我們自訂的 value，可以是任意型別；checkbox 綁定的永遠是布林值，簡單明瞭。以後遇到「這題該用單選還是多選」的設計決策，直接回想這張表就能快速判斷。
-->

---
layout: end
---

# 課程結束

### 掌握 `mat-radio-button` 實現單選互斥邏輯，善用 `mat-checkbox` 進行多選布林綁定，並瞭解 Angular Material 與純 HTML 寫法的差異與對應關係

<!--
這一章我們學會了 mat-radio-button 跟 mat-checkbox 這兩個表單常用元件，也搞懂了純 HTML 寫法跟 Angular Material 寫法之間的對應關係，還有各自最容易出錯的地方，像是 radio 忘記加 name、checkbox 忘記匯入 FormsModule。下次大家在做表單的時候，就能依照需求選對元件了。辛苦大家了！
-->

