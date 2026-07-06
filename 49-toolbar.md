---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Toolbar
routeAlias: ch49
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
    Toolbar
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「使用 mat-toolbar 打造應用程式頂部導覽列」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來學 Toolbar，也就是網頁最上方那條導覽列。

我們平常用的每一個 App，幾乎都有一條固定在頂部的工具列，上面放著標題、選單按鈕、通知圖示。如果要自己刻這種版面，光是把按鈕對齊左右兩側就要花不少時間調 CSS。Angular Material 幫我們把這件事包好了，就是今天要介紹的 mat-toolbar。

學完這一章，大家會知道怎麼用 mat-toolbar 快速做出一條左右對齊的頂部導覽列，也會學到一個很實用的排版技巧叫 Spacer。
-->

---
layout: default
---

# Outline

- **什麼是 Toolbar？** — 工具列的用途與常見應用場景
- **基本 HTML 結構** — 使用 `<mat-toolbar>` 包裹內容
- **Spacer 排版技巧** — 以 CSS flex 將按鈕推至右側
- **引入必要模組** — 在 TypeScript 中 import 所需 Material 模組

<!--
這張投影片先讓大家看一下整章的地圖。我們會先搞懂 Toolbar 是什麼、用在哪裡，接著看它的基本 HTML 結構，然後學一個很關鍵的排版技巧叫 Spacer，最後看 TypeScript 那邊要 import 哪些模組才能讓它正常運作。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Toolbar？
# What Is a Toolbar?

<!--
大家有沒有注意到，幾乎所有網站或 App 打開來，最上面都有一條固定的橫條，放著 Logo、標題、還有一些按鈕？那條就是 Toolbar，工具列。

接下來我們就來看看 Angular Material 怎麼幫我們快速做出這樣的東西。
-->

---

# 什麼是 Toolbar？

Toolbar（工具列）通常置於網頁頂部，用於顯示標題或功能按鈕（如登入／登出、開啟側邊導覽列）。

Angular Material 提供 `<mat-toolbar>` 元件，可快速建立符合 Material Design 規範的頂部工具列。

<div class="flex justify-center my-4">
  <img src="/images/48-toolbar/toolbar-preview.png" class="rounded shadow-md max-h-80" />
</div>

<!--
白話一點說，Toolbar 就是網頁上方那條「常駐工具列」，通常用來放標題、或是登入登出、開關側邊選單這種功能按鈕。

Angular Material 提供了 mat-toolbar 這個元件，我們不用自己刻版面、自己調樣式，直接用它就能做出符合 Material Design 規範的頂部工具列，大家可以看一下畫面上這張截圖的樣子。

這在實際專案裡幾乎是標配，因為前台後台系統的頂部導覽列，十之八九都會用到它。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 基本 HTML 結構
# Basic HTML Structure

<!--
知道 Toolbar 是什麼之後，我們來看看它實際的 HTML 要怎麼寫。
-->

---

# 基本 HTML 結構 — mat-toolbar 範本

將工具列內容包裹於 `<mat-toolbar>` 中。預設情況下，所有子元素會排列在右側，需透過 Spacer 調整版面。

```html
<mat-toolbar>
  <button mat-icon-button>
    <mat-icon>menu</mat-icon>
  </button>
  <span>My App</span>
  <span class="example-spacer"></span>
  <button mat-icon-button class="example-icon favorite-icon">
    <mat-icon>favorite</mat-icon>
  </button>
  <button mat-icon-button>
    <mat-icon>share</mat-icon>
  </button>
</mat-toolbar>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 若未加入 Spacer，工具列中的所有內容會集中於右側，版面無法正確對齊。
</div>

<!--
我們來看一下這段範例，目的是做出一個左邊放選單按鈕跟標題、右邊放兩個圖示按鈕的工具列。大家可以看到，整個結構其實很單純，就是把按鈕跟文字都包在 mat-toolbar 裡面。

這裡要帶大家看一下中間那個 example-spacer 的 span，這個是空的，看起來好像沒作用，但它其實是撐開左右版面的關鍵，等一下下一頁會細講。

⚠️ 提醒大家，如果只是把內容包進 mat-toolbar，沒有加這個 spacer，所有元素預設都會靠左排列在一起，不會自動分散到左右兩側，版面會擠成一團，這是最常見的誤會。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Spacer 排版技巧
# Spacer Layout Technique

<!--
剛剛我們留了一個伏筆，就是那個看起來空空的 spacer 到底在做什麼，現在就來把它講清楚。
-->

---

# Spacer 排版技巧 — flex 推移按鈕

在 HTML 中放置一個空的 `<span class="example-spacer"></span>`，再於 CSS 中設定其 flex 屬性，即可將後續按鈕推至工具列右側。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**HTML**

```html
<span class="example-spacer"></span>
```

</div>
<div>

**CSS**

```css
.example-spacer {
  flex: 1 1 auto;
}
```

</div>
</div>

`flex: 1 1 auto` 等同於同時設定：

- `flex-grow: 1` — 佔滿剩餘空間
- `flex-shrink: 1` — 可隨容器縮小
- `flex-basis: auto` — 初始大小依內容決定

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> Spacer 的作用是佔滿標題與右側按鈕之間的空間，使右側按鈕靠右對齊。
</div>

<!--
這個技巧其實可以想像成彈簧。我們在 HTML 裡放一個空的 span，本身沒有任何內容，但在 CSS 裡把它的 flex 設成 1 1 auto，就等於告訴瀏覽器「這個空白區塊要把剩下的空間全部吃掉」。

大家可以看一下這三個屬性拆開來的意思：flex-grow: 1 表示它會盡量長大佔滿空間，flex-shrink: 1 表示容器變小時它可以縮小，flex-basis: auto 表示一開始的大小看內容決定，因為它是空的，所以初始大小幾乎是零。

結果就是，標題跟右側按鈕之間會被這個看不見的彈簧撐開，右側按鈕自然就被推到最右邊，達到我們要的「左右對齊」效果。這個技巧不只用在 Toolbar，很多需要左右分散排列的版面都可以用同樣的手法。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 引入必要模組
# Importing Required Modules

<!--
版面搞定之後，最後我們來看程式碼那邊還需要準備什麼，才能讓這些元件真的跑得起來。
-->

---

# 引入必要模組 — TypeScript 設定

使用 `<mat-toolbar>`、`<mat-icon>` 與 `mat-icon-button` 時，需在元件的 `imports` 陣列中加入對應模組。

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
```

<!--
這段範例的目的，是讓 mat-toolbar、mat-icon、mat-icon-button 這幾個標籤在畫面上真的能運作起來。我們前面已經在 HTML 裡寫好版面了，但如果沒有在元件裡 import 對應的模組，Angular 是不會認識這些標籤的。

大家帶著看一下 imports 陣列裡面，這裡放了三個模組：MatToolbarModule 對應 mat-toolbar、MatIconModule 對應 mat-icon、MatButtonModule 對應 mat-icon-button。因為這是 standalone component，所以直接把模組放進 imports 陣列就可以，不用像以前一樣去改 NgModule。

⚠️ 這裡最常見的錯誤，就是漏掉某一個模組沒有 import，這樣對應的標籤在畫面上就不會生效，甚至編輯器會出現紅色錯誤提示，等一下下一頁會列出完整的對應表給大家對照。
-->

---

# 模組對應表

| 模組 | 套件路徑 | 對應元件／指令 |
|------|----------|----------------|
| `MatToolbarModule` | `@angular/material/toolbar` | `<mat-toolbar>` |
| `MatIconModule` | `@angular/material/icon` | `<mat-icon>` |
| `MatButtonModule` | `@angular/material/button` | `mat-icon-button` 指令 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>提示：</b> 缺少任一模組時，編輯器會顯示紅色錯誤提示；將模組加入 <code>imports</code> 後錯誤即會消失。
</div>

<!--
這張表格幫大家把剛剛講的三個模組整理起來，一邊是套件路徑，一邊是它對應到畫面上的哪個標籤或指令，之後如果編輯器出現紅字，大家可以直接查這張表確認自己是不是漏 import 了。
-->

---

# 完整使用流程

| 步驟 | 說明 |
|------|------|
| 1 | 在 HTML 加入 `<mat-toolbar>` 並於其中放置標題與圖示按鈕 |
| 2 | 插入空的 `<span class="example-spacer"></span>` 以區隔左右內容 |
| 3 | 在 CSS 設定 `.example-spacer { flex: 1 1 auto; }` |
| 4 | 在 .ts 中 import `MatToolbarModule`、`MatIconModule`、`MatButtonModule` |
| 5 | 將三個模組加入元件的 `imports` 陣列 |

<!--
這張表把整個章節的步驟串起來，我們從 HTML 加上 mat-toolbar、放進標題跟按鈕，中間插入 spacer 把左右內容分開，CSS 設定 flex，最後別忘了在 TypeScript 裡把三個模組都 import 進來。照著這五步走一遍，一個標準的 Angular Material 頂部導覽列就完成了。
-->

---
layout: end
---

# 課程結束
### 善用 mat-toolbar 與 Spacer 技巧，打造整齊美觀的 Angular 頂部導覽列

<!--
這一章我們學會了用 mat-toolbar 做出頂部工具列，也搞懂了 Spacer 這個左右對齊的排版技巧，還有背後要 import 哪些模組。下次大家在專案裡要做導覽列的時候，就可以直接套用今天教的這套流程。辛苦大家了！
-->

