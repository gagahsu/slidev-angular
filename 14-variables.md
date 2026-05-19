---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 變數使用
routeAlias: ch14
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
    Angular Full-Stack Masterclass
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    變數使用
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓資料從 TypeScript 流向畫面」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **全域變數**
- **區域變數**
- **let / const / var 比較**
- **let VS var**
- **Angular 中宣告變數**
- **畫面呈現（Data Binding）**
- **實作練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 變數的種類
# Variable Scope

---

# 全域變數

當你需要一個值，要讓整個 TS 都可以使用到，並且值不會消失，那你就需要宣告一個**全域變數**。

在方法中需要取得這個變數的值時，必須使用 `this.` 去呼叫它。

```typescript
export class AppComponent {
  title = 'demo2';

  showTitle() {
    alert(this.title);
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 全域變數宣告在 class 的最上層，方法內透過 <code>this.變數名稱</code> 存取
</div>

---

# 區域變數

當你需要一個值**只在某個方法中使用**，並且使用完之後不需要繼續存在記憶體中，那你就可以宣告一個**區域變數**。

方法執行結束後，這個變數就會消失，無法在這個 TS 的其他地方呼叫它。

```typescript
showTitle() {
  let title = "demo2";
  alert(title);
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 區域變數的生命週期只在方法執行期間；全域變數則在 class 實例存活期間都可使用
</div>

---

# 區域變數 — let / const / var

宣告區域變數時會遇到一個問題：我該使用 `let`、`var` 還是 `const`？

| 關鍵字 | 說明 | 建議使用時機 |
| --- | --- | --- |
| `const` | 識別值（identifier），宣告後**不能**重新指定值 | 不會改變的固定值 |
| `let` | 變數（variable），可以被重新指定值 | 一般變數，**最常用** |
| `var` | 最弱的宣告方式，有 hoisting 問題 | **不建議使用** |

---

# let VS var — 為什麼不用 var？

`let` 和 `var` 功能類似，但 `var` 不夠嚴謹：**`var` 可以在宣告前就使用（hoisting）**，導致對值的理解很容易出錯。

```typescript
// ❌ var 的危險：宣告在使用之後，系統不會報錯
showTitle() {
  title = "demo";     // 先使用
  alert(title);
  var title: string;  // 再宣告（var hoisting）
}
```

```typescript
// ✅ let 的正確習慣：必須先宣告才能使用
showTitle() {
  let title = "demo2";
  alert(title);
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Angular 中宣告變數
# Declaring Variables in Angular

---

# 宣告變數（一）

當畫面需要顯示一個**會根據使用者操作而改變的值**，你需要先在該 HTML 的 TS 檔案中宣告一個全域變數，HTML 就可以串接 TS 中的資料並展現在畫面中。

```typescript
export class AppComponent {
  testTitle: string = '我是標題';  // 有初始值 ✅
  testContent: string;             // 沒有初始值 ❌ TypeScript 會報錯
}
```

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/declare-var-ts.png" style="max-height: 200px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

---

# 宣告變數（二）— 處理無初始值

當變數確實不需要初始值時，有兩種寫法可以消除錯誤：

| 寫法 | 語意 | 使用時機 |
| --- | --- | --- |
| `testContent!: string` | 非空斷言：我保證執行時一定有值，跳過檢查 | 確定之後會被賦值 |
| `testContent?: string` | 可選屬性：此屬性可能不存在（即 `undefined`） | 值本來就可能不存在 |

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/declare-var-error.png" style="max-height: 200px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 畫面呈現
# Data Binding

---

# 畫面呈現（一）— 字串插值

全域變數宣告完後，在 HTML 中用 `{{ 變數名稱 }}` 將變數名稱包起來，畫面就會呈現出變數的內容。

**HTML（顯示變數）：**

```html
{{ testTitle }}
```

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/binding-interpolation.png" style="max-height: 200px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>&#123;&#123; &#125;&#125;</code> 是 Angular 的<b>字串插值（String Interpolation）</b>語法，會將 TS 變數的值直接顯示在 HTML 中
</div>

---

# 畫面呈現（二）— 搭配 HTML 標籤

顯示的變數也可以用 HTML 標籤包起來，用來取代原本固定的值。

```html
<h1>{{ testTitle }}</h1>
```

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/binding-h1.png" style="max-height: 200px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>{{ }}</code> 可以放在任何 HTML 標籤的<b>文字內容位置</b>，但無法直接放在屬性值內（屬性需用屬性綁定）
</div>

---

# 畫面呈現（三）— 屬性綁定

除了顯示文字，也可以用來替代標籤的**屬性（Attribute）**內容，例如按鈕文字或圖片來源。

```html
<button>{{ buttonText }}</button>
<img [src]="imgSrc">
```

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/binding-attr.png" style="max-height: 200px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 屬性內容使用<b>屬性綁定（Property Binding）</b>語法 <code>[屬性名稱]="變數名稱"</code>，而非 <code>{{ }}</code>
</div>

---
layout: default
---

# 練習：任務說明
### HTML 全部改用變數顯示

將下面頁面的所有內容，改為從 TS 的全域變數來讀取並顯示，包括圖片來源也是。

**目標畫面包含：**

- `<h1>` 顯示標題文字
- `<h3>` 顯示內容文字
- `<img>` 顯示一張圖片

不可以在 HTML 中直接寫死文字或網址，全部透過 TS 變數傳入。

<div class="mt-3 flex justify-center">
  <img src="/images/14-variables/practice-result.png" style="max-height: 220px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
</div>

---
layout: default
---

# 練習：解題提示
### 完成步驟

1. 在 `app.component.ts` 的 class 內宣告三個全域變數：
   - `titleText: string = '我是標題'`
   - `contentText: string = '內容是我'`
   - `imageSrc: string = '你的圖片網址'`

2. 在 `app.component.html` 中：
   - 用 `{{ titleText }}` 放入 `<h1>` 標籤內
   - 用 `{{ contentText }}` 放入 `<h3>` 標籤內
   - 用 `[src]="imageSrc"` 設定 `<img>` 的圖片來源

3. 儲存後觀察瀏覽器是否正確顯示

---
layout: end
---

# 變數使用完成
### 讓資料從 TypeScript 流向畫面！
