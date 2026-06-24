---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 新增組件
routeAlias: ch21
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
    新增組件
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「將畫面切割成可重複使用的積木」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎回來！
在前面的學習中，我們的網頁功能越來越強大，但不知道大家有沒有發現一個隱憂：
「如果我們把整張網頁的選單、內容、按鈕、側邊欄、頁尾，幾千行 HTML 通通塞在一個 app.component.html 裡面，那這個檔案會有多難看、多難維護？」
這就像是把整間公司的所有員工，通通擠在同一間辦公室裡大吵大鬧一樣，效率極低。
今天，我們要來學習 Angular 最核心的「樂高積木哲學」——「元件拆解（Components）」。
我們會學習怎麼把大畫面切成一個個獨立、好管理、而且可以重複利用的 UI 零件！
-->

---
layout: default
---

# Outline

- **為什麼要用元件** — Component 的概念與價值
- **新增元件** — 使用 Angular CLI 產生組件
- **元件的四個檔案** — `.html`、`.scss`、`.spec.ts`、`.ts`
- **元件的 TypeScript 設定** — `@Component` 裝飾器
- **引用元件** — 在頁面中使用自訂組件
- **好用工具** — VS Code 快速修正
- **實作練習**

<!--
今天我們的組裝任務如下：
首先，我們要了解為什麼現代網頁都必須「元件化」。
接著，學習使用 Angular CLI 工具，用一行指令秒建元件。
再來，我們會拆解元件背後的四個核心檔案與 `@Component` 裝飾器的設定。
然後，學習如何把新建的積木引入到我們的頁面中。
最後，大叔會分享一個 VS Code 的神級偷懶小工具，並帶大家做一個同時新增並引用兩個元件的實作練習！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 為什麼要用元件
# Why Components?

<!--
第一站，我們先來聊聊，為什麼要把好好的網頁切得碎碎的？
-->

---

# Component 是什麼？

Component（元件）是 Angular 的核心構建單位，代表畫面上一個獨立的區塊。

| 特性 | 說明 |
| --- | --- |
| 組合性 | 一個畫面可由多個 Component 共同組成 |
| 可重複使用 | 相同元件可在不同頁面多次使用 |
| 獨立性 | 每個元件有自己的 HTML、CSS、TypeScript |
| 維護性 | 修改某元件不影響其他元件 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>傳統 vs 元件化：</b> 傳統開發以整個網頁為單位寫程式；元件化開發將畫面拆成多個小積木，更易維護與擴充。
</div>

<!--
什麼是 `Component` 元件？
你可以把它想像成「樂高積木」。
在傳統的網頁開發中，我們寫網頁像是在捏黏土，整張網頁黏在一起。
而 Angular 是在堆樂高。
元件有四大神級優勢：
第一是「組合性」：一張大網頁可以由選單積木、按鈕積木組合而成。
第二是「重複使用」：寫好一個漂亮的按鈕元件，在首頁能用，在購物車也能直接拿去用，不用複製貼上 HTML。
第三是「獨立性」：每個積木有自己獨立的 HTML、SCSS 和 TypeScript 邏輯，互不干擾。
第四是「維護性」：如果按鈕長相要改，我只要修改按鈕積木，全站的按鈕就自動同步更新，不用一個個去改。
這就是現代前端工程的降維打擊！
-->

---

# 畫面拆分範例

一個後台畫面可以依功能切割成多個獨立的 Component：

<div class="flex justify-center mt-2">
  <img src="/images/19-components/component-layout.png" class="rounded shadow-md object-contain" style="width: 85%; max-height: 58vh;" />
</div>

<!--
這是一張典型的後台系統畫面。
如果讓你來設計，你會怎麼拆？
看投影片上的色塊，我們通常會把它拆成四大積木：
最上方的 Header 頁首元件（藍色）、
左邊的 Sidebar 側邊欄元件（綠色）、
右邊的 Content 主要內容區（橘色）、
以及最底下的 Footer 頁尾元件。
這樣拆分完後，你的主畫面 HTML 就只會剩下四行，非常清爽！
-->

---

# 畫面拆分範例 — 各區塊說明

| 區塊 | 說明 |
| --- | --- |
| Header（頁首） | 網站 Logo、導覽列、使用者資訊 |
| Sidebar（側邊欄） | 選單、功能連結 |
| Content（主內容） | 當前頁面的核心資料 |
| Footer（頁尾） | 版權資訊、連結 |
| 共用元件 | 按鈕、卡片、彈窗等可重複使用的 UI 單元 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>提示：</b> 每個大區塊內部還可以繼續往下拆成更小的子元件，拆分的粒度取決於重複使用的需求。
</div>

<!--
這頁是這幾個區塊的細部說明。
大家只要記住一個原則：
「只要是功能獨立、或者是在多個地方會重複出現的 UI，就值得把它拆成一個獨立的元件。」
拆分得越合理，你的專案架構就越漂亮。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 新增元件
# Generate a Component

<!--
那麼在 Angular 裡，我們要怎麼動手新增一個新元件呢？非常簡單，叫出我們的 CLI 助手！
-->

---

# 使用 Angular CLI 新增元件

打開命令提示字元 / 終端機，切換至專案根目錄後執行以下指令：

| 指令 | 說明 |
| --- | --- |
| `ng generate component 資料夾/組件名稱` | 完整寫法 |
| `ng g c 資料夾/組件名稱` | 縮寫（效果相同） |

```bash
# 在 components 資料夾下新增 header 元件
ng g c components/header
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>建議：</b> 將元件放入 <code>components</code> 資料夾做統一管理。若資料夾不存在，Angular CLI 會自動幫你建立。
</div>

<!--
在 Angular 中，我們絕對不會用滑鼠右鍵慢慢去建立 .html、.ts、.scss 檔案。
我們直接在終端機輸入這行指令：
`ng generate component components/header`。
或者用縮寫：`ng g c components/header`。
這個 `ng g c` 就是 generate component 的簡寫。
它會自動在 `src/app/components` 下面建立一個叫 `header` 的資料夾，並且幫你把所有檔案都建好，連裡面基本的 class 名稱都填好了。
這就是框架的威力，自動化拉滿！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 元件的四個檔案
# Component Files

<!--
CLI 跑完之後，我們去目錄看看，到底生出了哪四個孿生兄弟檔案。
-->

---

# 新增元件後產生的檔案

執行 `ng g c` 後，Angular CLI 會自動產生四個檔案：

| 檔案 | 說明 |
| --- | --- |
| `組件名稱.component.html` | 放置 HTML 模板的地方 |
| `組件名稱.component.scss` | 放置元件專屬樣式（CSS/SCSS）的地方 |
| `組件名稱.component.spec.ts` | 放置測試程式碼的地方 |
| `組件名稱.component.ts` | 放置 TypeScript 程式碼（元件邏輯）的地方 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 每次執行 <code>ng g c</code> 前，建議先將已開啟的 <code>ng serve</code> 關閉，再新增元件，避免衝突。
</div>

<!--
這四個檔案各司其職，形成一個完美的元件生態系：
`.html` 負責肉體結構；
`.scss` 負責衣服樣式；
`.spec.ts` 負責自動化單元測試（這在進階測試時才會寫）；
`.ts` 負責大腦邏輯。
大叔這裡要給一個「血淚提示」：
**如果你本來正開著 `ng serve` 在啟動網頁，當你要用 CLI 產生新元件時，大叔強烈建議你先按下 Ctrl+C 把 `ng serve` 關掉**！
元件生好之後再重新開。
因為在 server 運行的狀態下動態加檔案，Angular 有時候會發生記憶體抓不到新檔案的靈異事件喔。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 元件的 TypeScript 設定
# @Component Decorator

<!--
接下來，我們打開大腦 `.ts` 檔案，看看 Angular 是怎麼把這四個檔案黏在一起的。
-->

---

# @Component 裝飾器

開啟 `.component.ts` 檔，可以看到 Angular 的核心設定：

| 屬性 | 說明 |
| --- | --- |
| `selector` | 元件的標籤名稱，在 HTML 中以此名稱使用 |
| `templateUrl` | 指定此元件使用的 HTML 檔案路徑 |
| `styleUrl` | 指定此元件使用的 SCSS 檔案路徑 |

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}
```

<!--
在 `.ts` 檔案的最上方，你會看到一個用小老鼠開頭的 `@Component` 裝飾器。
這個裝飾器就是元件的「身份設定檔」！
裡面有三個核心鑰匙：
第一個是 `selector`：這是在定義這個元件的「HTML 標籤名稱」，比如叫 `app-header`。
第二個是 `templateUrl`：指定要跟哪一個 HTML 網頁連結。
第三個是 `styleUrl`：指定要套用哪一個 SCSS 樣式檔。
只要有這三個設定，Angular 就會自動把它們編譯成一個完整的網頁積木。
-->

---

# Selector 的使用方式

`selector` 定義了元件的「標籤名稱」，讓你可以在其他 HTML 模板中像使用原生 HTML 標籤一樣使用此元件。

| 設定值 | 在 HTML 中的用法 |
| --- | --- |
| `selector: 'app-header'` | `<app-header></app-header>` |
| `selector: 'app-sidebar'` | `<app-sidebar></app-sidebar>` |
| `selector: 'app-footer'` | `<app-footer></app-footer>` |

```html
<!-- app.component.html -->
<app-header></app-header>
<app-sidebar></app-sidebar>
<app-footer></app-footer>
```

<!--
這個 `selector` 該怎麼用呢？
單是設定了 `selector: 'app-header'` 還不夠。
這是在定義 HTML 中的標籤名稱。
在別人的 HTML 裡，你可以直接打像 `<app-header></app-header>` 這樣的自訂標籤！
瀏覽器在渲染時，一看到這個標籤，就會自動把 header 的 HTML 內容塞進這個位置。
你看下面 app.component.html 的寫法，
是不是就像是堆積木一樣，把 Header、Sidebar、Footer 排排站排好？
這代碼的可讀性，簡直舒服得像在看童書！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 引用元件
# Using Components

<!--
「大叔，那我在 HTML 裡打了 `<app-header>`，為什麼畫面一片空白，還跳紅字說不認識這個標籤？」
別急！因為在新版 Standalone 模式下，你需要手動去 TS 檔案裡做「元件引用（Import）」。我們來看看怎麼做。
-->

---

# 如何在頁面中引用元件

要在某個頁面使用新增的元件，需要完成兩個步驟：

| 步驟 | 操作 | 位置 |
| --- | --- | --- |
| 1 | 在 `.ts` 檔中 `import` 元件類別 | `app.component.ts` |
| 2 | 在 `.html` 中使用元件標籤 | `app.component.html` |

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

<!--
要讓 AppComponent 能夠認得 HeaderComponent。
我們必須在 `app.component.ts` 檔裡做兩件事：
第一，在最上面寫 `import { HeaderComponent } from ...` 把對方的 class 匯進來。
第二，**在 `@Component` 裝飾器的 `imports: []` 陣列中，把 `HeaderComponent` 放進去**！
這就像是你要帶新朋友回家，你得先跟警衛登記這個人的名字。
登記完之後，你在 `app.component.html` 裡打的 `<app-header>` 標籤，Angular 才能順利解析它！
這一步很多初學者常常會漏掉，導致卡關一下午，大家一定要小心！
-->

---

# 引用元件 — 在 HTML 中使用

完成 import 後，即可在 HTML 模板中使用元件標籤：

```html
<!-- app.component.html -->
<app-header></app-header>
<main>
  <p>主要內容區域</p>
</main>
<app-footer></app-footer>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>流程：</b> 先查看元件 <code>.ts</code> 中的 <code>selector</code> 名稱 → 在目標 <code>.ts</code> 的 <code>imports</code> 加入元件類別 → 在目標 <code>.html</code> 用標籤名稱呼叫元件。
</div>

<!--
完成 import 之後，在 `app.component.html` 裡，我們就可以像使用普通 div 標籤一樣，把 `<app-header>` 和 `<app-footer>` 擺在頁面的最上方 and 最下方。
這時候，整個網頁就順利拼裝成功囉！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 好用工具
# VS Code Quick Fix

<!--
「大叔，每次手動寫 import 還有 imports 陣列好累喔，有沒有更懶人的方式？」
哈哈，工程師最大的美德就是懶！
VS Code 其實有內建神級偷懶工具，我們來學學。
-->

---

# VS Code 快速修正（Quick Fix）

當你在 HTML 中輸入元件標籤但尚未 import 時，VS Code 會顯示紅色底線並提示快速修正：

| 步驟 | 操作 |
| --- | --- |
| 1 | 在 HTML 中輸入元件標籤（如 `<app-header>`） |
| 2 | 注意紅色底線（系統不認識此標籤） |
| 3 | 點擊標籤名稱，注意畫面右邊出現的**藍色燈泡** |
| 4 | 點擊燈泡 → 選擇「快速修正」 |
| 5 | VS Code 自動將對應 import 加入 `.ts` 檔案 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>前提：</b> 元件標籤名稱必須正確（與 <code>selector</code> 一致），VS Code 才能找到對應的元件進行自動匯入。
</div>

<!--
如果你懶得手動寫 import，你可以直接去 `app.component.html` 裡輸入 `<app-header></app-header>`。
這時候，因為還沒有登記，VS Code 會在它下面畫一條紅色波浪線。
別慌！用滑鼠點擊 `app-header`，這時候左邊或右邊會出現一個「藍色的小燈泡」。
按一下小燈泡，選擇「快速修正（Quick Fix）」。
VS Code 就會發揮 AI 的超能力，自動去背景幫你把 `app.component.ts` 的 import 語句與 imports 陣列通通補齊！
全程只需要滑鼠點兩下，一秒搞定。
這個快捷鍵一定要學會，這能幫你省下大把寫無聊程式碼的時間！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

<!--
好，樂高積木的理論大家都懂了，我們馬上來動手組裝自己的 Header 與 Footer 吧！
-->

---
layout: two-cols
---

# 練習：新增兩個組件
### 任務說明

1. 使用 Angular CLI 在 `components` 資料夾下新增兩個元件
2. 分別為 `header` 與 `footer`（或自訂名稱）
3. 在各元件的 HTML 中加入一些辨識文字（例如「這是 Header」）
4. 將兩個元件引入 `app.component.ts` 的 `imports` 中
5. 在 `app.component.html` 中使用這兩個元件標籤，讓畫面同時顯示兩個元件

::right::

<div class="flex items-center justify-center h-full ml-4">
  <img src="/images/19-components/practice.png" class="rounded shadow-md w-full object-contain" style="max-height: 70vh;" />
</div>

<!--
這次的任務是「新增兩個組件並引用它」：
第一步，用 CLI 產生 `header` 和 `footer` 元件。
第二步，分別在他們的 HTML 裡加點簡單的文字（像是「這是 Header」）。
第三步，在 `app.component.ts` 裡引用這兩個元件。
第四步，在主畫面裡呈現出來。
大家動手做做看，順便可以測試看看 VS Code 的藍色小燈泡好不好用喔！
-->

---
layout: default
---

# 練習：解題提示
### 提示說明

1. 新增元件：`ng g c components/header` 與 `ng g c components/footer`
2. 編輯各元件 HTML，加入識別文字
3. 在 `app.component.ts` 加入 import：

```typescript
import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

4. 在 `app.component.html` 使用：`<app-header>` 與 `<app-footer>`

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>小技巧：</b> 也可以在 HTML 先打好標籤，再用 VS Code 藍色燈泡快速自動 import。
</div>

<!--
如果稍微卡住了，請看解題步驟：
首先，在 terminal 執行 `ng g c components/header`，接著執行 `ng g c components/footer`。
然後，打開 `app.component.ts`，在 `@Component` 的 `imports` 裡填入 `HeaderComponent` 和 `FooterComponent`。
最後，去 `app.component.html` 裡，
把 `<app-header></app-header>` 放最上面，
把 `<app-footer></app-footer>` 放最下面。
儲存後，看看瀏覽器是不是成功顯示出「這是 Header」與「這是 Footer」的文字？
有出現，就代表你已經成功解鎖了 Angular 元件化的偉大旅程！
-->

---
layout: end
---

# 課程結束
### 用元件切割畫面，讓程式更易維護與重用

<!--
恭喜大家！成功征服了「元件新增與引用」！
現在你的網頁已經正式告別了「幾千行代碼塞同一個檔案」的史前時代，跨入了模組化積木的現代前端世界。
回去把 CLI 指令和 import 流程多練習幾次。
下一堂課，我們要迎來元件化開發最精彩的重頭戲——「元件資料綁定（Component Data Binding）」，去看看父積木與子積木是怎麼進行資料傳遞的！大家休息一下，我們等一下見！
-->
