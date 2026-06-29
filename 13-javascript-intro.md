---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: JavaScript 與 TypeScript 介紹
routeAlias: ch13
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
    JavaScript 與 TypeScript 介紹
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓網頁動起來，從 JS 到 TS 的演進」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，恭喜大家順利通關了 HTML 和 CSS 的視覺裝修期！
現在，我們要開始接觸程式開發的真正核心——「JavaScript（簡稱 JS）」。
如果 HTML 是蓋一棟房子的鋼筋水泥，CSS 是幫房子刷油漆、挑選家具；那麼 JavaScript 就是幫房子接通水電、安裝自動感應門和防盜系統！
今天，我們要來認識這個讓網頁「活過來」的靈魂語言，並且了解它與它的大哥 TypeScript 到底有什麼愛恨情仇。
-->

---
layout: default
---

# Outline

- **JavaScript 是什麼？**
- **TypeScript 是什麼？**
- **TypeScript VS JavaScript**
- **JavaScript 實例**
- **TypeScript 在 Angular 中** — 元件結構、`@Component` 裝飾器
- **實作練習**

<!--
今天我們的作戰路線圖：
首先，我們要了解 JavaScript 的基本定位。
接著，介紹我們在 Angular 專案中天天都會寫的 TypeScript 又是什麼。
再來，我們把這兩兄弟拉出來 PK 一下，看看它們的差別。
接著，我們會用一個極其簡單的「按鈕點擊」小實例，讓你親眼看看 HTML、CSS 與 JS 是怎麼合體運作的！
然後，我們進入 Angular 的 TypeScript 世界，看看怎麼在 class 裡宣告帶型別的變數。
最後，兩道實作練習——分別針對 TypeScript 和 JavaScript！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JavaScript 是什麼？
# What is JavaScript?

<!--
第一站，我們先來認識這位稱霸瀏覽器世界數十年的超級霸主——JavaScript。
-->

---

# JavaScript 是什麼？

JavaScript 是一種腳本，也能稱它為**程式語言**，可以讓你在網頁中實現出複雜的功能。

當網頁不只呈現靜態的內容，另外提供了像是：

- 內容即時更新
- 地圖互動
- 繪製 2D / 3D 圖形
- 影片播放控制……

你就可以大膽地認為 **JavaScript 已經參與其中**。

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 網頁的三層架構：<b>HTML</b>（內容）→ <b>CSS</b>（樣式）→ <b>JavaScript</b>（互動）
</div>

<!--
JavaScript 是一種腳本，也就是所謂的「程式語言」。
它是前端開發的「大腦」，專門負責實現複雜的互動邏輯。
你想想看，當你滑手機滑到 FB 貼文底部，網頁「不用重新整理」就自動載入新貼文；或是點擊 Google 地圖時，地圖會跟著你的手指滑動；又或者你在 Netflix 上點擊播放，影片就開始順暢播放。
只要網頁上發生的不是那種死板板的文字跳轉，而是「有生命力、即時回應」的功能，你就可以一百％肯定——JavaScript 在裡面扮演著幕後推手！
-->

---

# JavaScript — 三層架構

HTML、CSS、JavaScript 分別負責網頁的不同層次：

<div style="display: flex; justify-content: center; align-items: center; gap: 3rem; margin-top: 1.2rem;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <div style="width: 220px; padding: 12px 0; background: #f7b977; text-align: center; font-weight: bold; font-size: 1rem; border-radius: 4px; color: #5a3a00;">JavaScript</div>
    <div style="width: 260px; padding: 12px 0; background: #5eada0; text-align: center; font-weight: bold; font-size: 1rem; border-radius: 4px; color: #fff;">CSS</div>
    <div style="width: 300px; padding: 12px 0; background: #4472C4; text-align: center; font-weight: bold; font-size: 1rem; border-radius: 4px; color: #fff;">HTML</div>
  </div>
  <div style="font-size: 0.95rem; line-height: 2.2;">
    <div><span style="color: #b07800; font-weight: bold;">JavaScript</span>：負責互動與行為邏輯</div>
    <div><span style="color: #3a8a80; font-weight: bold;">CSS</span>：負責視覺樣式與排版</div>
    <div><span style="color: #2a52a0; font-weight: bold;">HTML</span>：負責頁面結構與內容</div>
  </div>
</div>

<!--
我們來複習並總結一下網頁開發的三大支柱。
請看投影片上的三層積木：
最底層是藍色的 HTML，它是「內容與結構」，就像是你的骨架、或者是水泥毛胚屋。
中間層是綠色的 CSS，它是「外觀與樣式」，負責化妝、排版、穿搭，讓毛胚屋變成漂亮的樣品屋。
最上層是橘色的 JavaScript，它是「互動與行為」，負責寫大腦的邏輯。
這三者合一，才是一個現代化、合格的網頁應用程式。缺了 JavaScript，你的網頁就只是一張好看的「電子傳單」而已！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# TypeScript 是什麼？
# What is TypeScript?

<!--
知道了 JavaScript，那經常聽到的 TypeScript（簡稱 TS）又是什麼呢？
-->

---

# TypeScript 是什麼？

TypeScript 是一種由 **Microsoft** 開發的開源程式語言，它是 JavaScript 的一種**超集（Superset）**。

- 任何有效的 JavaScript 程式碼，也是有效的 TypeScript 程式碼
- TypeScript 為 JavaScript 新增了**類型系統（型別）**和其他功能：
  - `Interfaces`
  - `Generics`
  - `Enums`

這些功能使開發者能更有效地撰寫大型專案。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>Angular</b> 就是使用 TypeScript 開發，所以要有一定的 JavaScript 基礎，才能更好地理解 TypeScript 的使用
</div>

<!--
TypeScript 是微軟（Microsoft）大爸爸開發的一門程式語言。
它在程式界的名詞叫做 JavaScript 的「超集（Superset）」。
什麼叫超集？
簡單來說，就是「你有的我全都有，而且我還比你更強」！
任何原本可以在 JavaScript 裡執行的程式碼，直接複製到 TypeScript 裡，都百分之百能跑。
但是，TypeScript 額外加上了強大的「型別系統（Types）」以及像介面（Interfaces）、泛型（Generics）這些高級功能。
為什麼要多此一舉呢？
因為 JavaScript 太自由了，自由到它常常「寫錯了也不會警告你」，直到網頁跑起來 crash 了你才知道。
而 TypeScript 就像是一個嚴格的輔導老師，在你寫錯型別的瞬間就嗶嗶警告你，這對我們在寫 Angular 這種大型專案時，能省下無數的 debug 時間！
-->

---

# TypeScript VS JavaScript

雖然 TypeScript 與 JavaScript 在許多方面都很相似，但它們之間仍存在一些重要的區別：

| 比較項目 | JavaScript | TypeScript |
| --- | --- | --- |
| **類型系統** | 動態型別，變數類型可在執行期間改變 | 靜態型別，宣告時確定類型，有助於預先找出錯誤 |
| **編譯器** | 無需編譯，可在瀏覽器直接執行 | 需要編譯成 JavaScript 才能在瀏覽器執行 |
| **物件導向** | 有 `class` 與 `object`，但無 `interface` | 支援 `interface`、`class`、`object`，物件導向更直觀 |

<!--
我們把這兩兄弟拉出來直接做個表格PK。
首先是「型別系統」：JS 是動態型別，變數裝蘋果還是裝香蕉隨便你換，很有彈性，但也容易翻車；TS 是靜態型別，你宣告了裝蘋果，以後塞香蕉進去，編譯器就會立刻賞你一個紅色底線。
第二是「執行方式」：瀏覽器其實只看得懂 JavaScript。所以，我們寫的 TypeScript 程式碼，在給瀏覽器跑之前，都必須經過編譯器「翻譯」成標準的 JavaScript。
第三是「物件導向」：TS 提供了非常完整、像 Java 那樣的 `interface` 功能，讓架構規劃起來更舒服。
因為 Angular 框架原生就是以 TypeScript 為核心設計的，所以今天我們先建立好 JS 的基本觀念，等一下寫 TS 才會如魚得水喔！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JavaScript 實例
# JavaScript in Action

<!--
接下來，大叔不說空話，我們直接用一個最簡單的「點擊按鈕跳通知」的實例，來看看三者是怎麼配合工作的！
-->

---

# JavaScript 實例 — Step 1：HTML

先在 HTML 中建立一個按鈕，加入 `class` 命名樣式名稱，並加入 `onclick` 方法（觸發動作的固定寫法）：

```html
<!-- body 內是寫 HTML 內容 -->
<body>
  <button class="bntCss" onclick="clickBnt()">我是按鈕!點我!</button>
</body>
```

<div style="margin-top: 1rem; display: flex; align-items: center; gap: 1rem;">
  <div style="font-size: 0.9rem; color: #555;">畫面預覽：</div>
  <button style="padding: 4px 12px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer; font-size: 0.95rem;">我是按鈕!點我!</button>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>onclick="clickBnt()"</code> 表示「點擊時，執行名為 <code>clickBnt</code> 的方法」，方法名稱可自訂
</div>

<!--
第一步，我們先用 HTML 捏出按鈕的骨架。
程式碼裡，我們寫了一個 `<button>` 標籤，上面寫「我是按鈕！點我！」。
特別注意，裡面有一個特別的屬性叫 `onclick="clickBnt()"`。
這個 `onclick` 就是網頁的「點擊事件監聽器」。
這句的意思就是告訴瀏覽器：「喂！當使用者用滑鼠點擊這個按鈕時，請去大腦呼叫執行一個叫作 `clickBnt` 的指令！」
-->

---

# JavaScript 實例 — Step 2：CSS

用剛才在 HTML 設定的 `class` 名稱，來編輯按鈕的樣式：

```html
<!-- style 內是寫 CSS 內容 -->
<style>
  .bntCss {
    color: red;
  }
</style>
```

<div style="margin-top: 1rem; display: flex; align-items: center; gap: 1rem;">
  <div style="font-size: 0.9rem; color: #555;">套用樣式後：</div>
  <button style="padding: 4px 12px; border: 1px solid #ccc; background: #f5f5f5; cursor: pointer; font-size: 0.95rem; color: red;">我是按鈕!點我!</button>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 HTML、CSS 都已就位。接下來進入與使用者<b>互動</b>的部分 — JavaScript
</div>

<!--
第二步，雖然有了按鈕，但它是灰灰乾乾的預設樣式。
我們用上堂課學過的 CSS 選擇器，選中 `.bntCss`，把 `color` 改成紅色。
你看，套用樣式後，按鈕上的文字就變成了紅色，看起來稍微顯眼一點了。
此時骨架（HTML） and 外皮（CSS）都有了，只差讓它做出回應的大腦了！
-->

---

# JavaScript 實例 — Step 3：JavaScript

宣告剛才在 `onclick` 中自訂的方法名稱，並在其中撰寫要執行的動作：

```html
<!-- script 內是寫 JavaScript 內容 -->
<script>
  function clickBnt() {
    alert("你按按鈕了！")
  }
</script>
```

<div style="margin-top: 1rem; display: flex; align-items: center; gap: 1.5rem;">
  <div style="font-size: 0.9rem; color: #555;">點擊按鈕後：</div>
  <div style="border: 1px solid #aaa; border-radius: 6px; padding: 10px 18px; background: #f5f5f5; font-size: 0.9rem; box-shadow: 2px 2px 6px rgba(0,0,0,0.15);">
    <div style="font-weight: bold; margin-bottom: 4px; color: #333;">這個網頁顯示</div>
    <div style="color: #444; margin-bottom: 8px;">你按按鈕了！</div>
    <button style="padding: 3px 16px; border: 1px solid #aaa; background: #e8e8e8; border-radius: 3px; font-size: 0.85rem;">確定</button>
  </div>
</div>

<!--
第三步，也就是我們的 JS 登場！
我們在 `<script>` 標籤中，宣告一個叫作 `function clickBnt()` 的函數。
裡面只寫了一行程式碼：`alert("你按按鈕了！")`。
這個 `alert` 是瀏覽器內建的功能，它會彈出一個系統警告對話框。
一旦這三者在同一個網頁合體，當使用者伸出手指點擊紅色按鈕時，按鈕就會觸發 `onclick`，去執行 JS 裡的 `clickBnt()`，網頁就會「噹」一聲彈出「你按按鈕了！」的對話框！
這就是網頁前端互動最基本的運行公式啦！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# TypeScript 在 Angular 中
# TypeScript in Angular

<!--
好，現在我們知道 TypeScript 是什麼了，也看完了 JavaScript 的基本運作方式。
接下來，大叔帶你看看 TypeScript 在 Angular 專案裡長什麼樣子、要怎麼寫。
-->

---

# TypeScript 在 Angular — 元件結構

Angular 的邏輯寫在 `.ts` 檔案裡。打開 `app.component.ts`，你會看到這樣的結構：

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  // ← 在這裡宣告變數
  // ← 在這裡宣告方法
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>export class AppComponent { }</code> 就是我們撰寫 TypeScript 的舞台，所有邏輯都寫在這對大括號裡
</div>

<!--
打開 Angular 專案的 app.component.ts，你會看到這樣的結構。
上面的 @Component({}) 是「裝飾器」，告訴 Angular 這個 class 是一個元件。
真正要寫的邏輯，包括變數和方法，全部寫在最下面 export class AppComponent { } 的大括號裡。
這個大括號，就是我們寫 TypeScript 的家！
-->

---

# TypeScript 在 Angular — @Component 裝飾器

`@Component` 是 Angular 的**裝飾器（Decorator）**，告訴框架這個 class 是一個元件，並設定它的基本行為：

| 屬性 | 說明 | 範例值 |
| --- | --- | --- |
| `selector` | 此元件在 HTML 中使用的自訂標籤名稱 | `'app-root'` |
| `standalone` | 是否為獨立元件（Angular 14+ 推薦） | `true` |
| `templateUrl` | 此元件對應的 HTML 模板檔案路徑 | `'./app.component.html'` |

```typescript
@Component({
  selector: 'app-root',       // → 在 HTML 中以 <app-root> 使用
  standalone: true,           // → 不需要 NgModule 包裝
  templateUrl: './app.component.html',  // → 對應的 HTML 檔案
})
export class AppComponent { }
```

<!--
@Component 是 Angular 賦予這個 class「元件身份」的魔法標籤。
selector 就是這個元件的「身份證名稱」，設定成 app-root 後，你就可以在其他 HTML 裡寫 <app-root> 來嵌入它。
standalone: true 是 Angular 14 之後推薦的寫法，代表這個元件不需要傳統的 NgModule 來管理，可以獨立運作。
templateUrl 則是告訴 Angular：「這個元件的畫面長什麼樣，請去 app.component.html 那個檔案裡找。」
這三行是 Angular 元件的標準配備，之後每個章節的程式碼範例都會看到它，記住這三個屬性的意義就對了！
-->

---

# TypeScript 在 Angular — 宣告帶型別的變數

在 class 的大括號內，用 `變數名稱: 型別 = 初始值` 格式宣告變數：

```typescript
export class AppComponent {
  title: string = 'Hello Angular';
  count: number = 0;
  isLoading: boolean = false;
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 型別緊接在冒號後面。賦值型別不符時，TypeScript 立刻劃紅線警告——不必等到執行才發現錯誤
</div>

<!--
格式是：變數名稱，冒號，型別，等號，初始值。
title 後面寫 : string，代表這個變數只能裝字串。
count 後面寫 : number，只能裝數字。
isLoading 後面寫 : boolean，只能是 true 或 false。
如果你不小心把數字塞給 string 的變數，TypeScript 在你打完的瞬間就會劃紅線——這就是 TypeScript 最大的價值！
-->

---
layout: default
---

# TypeScript 練習：任務說明
### 在 Angular 中宣告帶型別的變數

在 `app.component.ts` 的 `AppComponent` class 中，宣告以下三個帶型別的變數：

1. `myName`：字串型別，初始值為你的名字
2. `myAge`：數字型別，初始值為你的年齡
3. `isStudent`：布林型別，初始值為 `true` 或 `false`

完成後，試著把 `myAge` 指定為一個字串（如 `'twenty'`），觀察 TypeScript 的報錯訊息，再改回數字。

<!--
這個練習的目的很單純：讓你親眼確認「TypeScript 的型別保護是真實存在的」。
當你改成字串，VSCode 會立刻劃紅線，告訴你型別不對。
這種「寫錯立刻知道」的保護，正是我們要用 TypeScript 而不用 JavaScript 的核心原因。
-->

---
layout: default
---

# TypeScript 練習：解題提示

在 `app.component.ts` 的 class 裡加入三行：

```typescript
export class AppComponent {
  myName: string = '你的名字';
  myAge: number = 20;
  isStudent: boolean = true;
}
```

嘗試把 `myAge` 改成字串時，TypeScript 立刻報錯：

```
Type 'string' is not assignable to type 'number'
```

改回數字後紅線消失。這就是**靜態型別檢查**的威力——在編譯階段就攔截錯誤！

<!--
解法非常單純，就是三行變數宣告。
重點在於體驗那個報錯訊息：Type 'string' is not assignable to type 'number'。
意思是：「你想把字串塞給一個只能裝數字的盒子，我不幹！」
這種保護機制，在你的 Angular 專案規模變大之後，會讓你省下非常多除錯時間。
-->

---
layout: default
---

# 練習：任務說明
### 整合 HTML、CSS、JavaScript

建立一個 HTML 網頁，在同一個檔案中整合三層，實作以下功能：

1. 建立「打招呼」和「掰掰」兩個按鈕
2. 點擊「打招呼」按鈕時，`alert` 顯示 `'哈囉！歡迎來到 JavaScript 的世界！'`
3. 點擊「掰掰」按鈕時，`alert` 顯示 `'掰掰！下次再見！'`
4. 在 `<style>` 中為兩個按鈕各自設定不同的文字顏色

<!--
這題考驗的是 HTML、CSS、JavaScript 三者如何在同一個檔案裡互相配合。
可以直接新建一個 .html 檔案，用 VSCode 開啟後以 Live Server 執行，或貼入 CodePen 測試。
-->

---
layout: default
---

# 練習：解題提示（1 / 2）
### Step 1 & 2 — HTML 結構與 CSS 樣式

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .btn-hello { color: green; }
    .btn-bye   { color: red;   }
  </style>
</head>
<body>

  <button class="btn-hello" onclick="sayHello()">打招呼</button>
  <button class="btn-bye"   onclick="sayBye()">掰掰</button>

</body>
</html>
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 按鈕的 <code>onclick</code> 填入方法名稱（<code>sayHello()</code>），方法名稱可自訂，但要與下一步的 function 名稱完全一致
</div>

<!--
先把 HTML 的按鈕骨架與 CSS 樣式寫好。
兩個按鈕分別給不同的 class，style 裡用 class 選擇器各自設定顏色。
onclick 屬性先填好要呼叫的方法名稱，但方法的本體還沒寫，所以現在點按鈕不會有反應。
-->

---
layout: default
---

# 練習：解題提示（2 / 2）
### Step 3 — 在 `</body>` 前加入 JavaScript

```html
  <script>
    function sayHello() {
      alert('哈囉！歡迎來到 JavaScript 的世界！');
    }
    function sayBye() {
      alert('掰掰！下次再見！');
    }
  </script>

</body>
</html>
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>&lt;script&gt;</code> 內的 <code>function</code> 名稱必須與 HTML 的 <code>onclick</code> 完全一致；這裡不是 Angular，不需要 <code>class</code>，直接宣告 <code>function</code> 即可
</div>

<!--
最後在 </body> 前面加入 <script> 標籤，宣告兩個 function。
function 名稱跟 HTML 裡 onclick 填的名稱完全一致，三層就正式接通了。
儲存後用 Live Server 或直接用瀏覽器開啟，點兩個按鈕，確認 alert 各自彈出對應訊息。
-->

---
layout: end
---

# JavaScript 介紹完成
### 互動的起點，從這裡開始！

<!--
恭喜大家！成功跨出了程式邏輯的第一步！
這雖然只是一個小小的 `alert`，但這就是所有網頁大腦互動的起點。
萬丈高樓平地起，學會了 JS 的運作原理，
下一堂課，我們要開始真正動手撰寫程式碼中的核心要素——「資料型態」囉！大家休息一下，我們等一下繼續！
-->
