---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 開啟 Angular 專案
routeAlias: ch08
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
    開啟 Angular 專案
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「打開專案，從第一個元件開始！」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好！在前幾章我們完成了環境安裝：Node.js、Angular CLI、VS Code 都就位了。
今天這一章，我們要把這些工具串起來，實際打開剛建好的 Angular 專案，認識三個核心動作——
用 VS Code 開專案、用指令建立元件、以及快速設定路由。
這三步做完，一個最基本的多頁面 Angular 應用就成形了！
更深入的細節，我們會在後面的章節一一拆解。
-->

---
layout: default
---

# Outline

- **用 VS Code 開啟 Angular 專案**
- **使用 `ng g c` 建立 Angular 元件**
- **快速設定 Route**

<!--
今天三個主題，每個都只點到為止，讓你知道「怎麼做」。
背後的原理和更多用法，後面章節會深入說明。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 用 VS Code 開啟 Angular 專案
# Open Project in VS Code

<!--
第一步：把你的 Angular 專案在 VS Code 裡打開來。
-->

---

# 方法一：使用終端機指令

在終端機 / 命令提示字元中，先 `cd` 到你的專案資料夾，再執行：

```bash
code .
```

<div class="mt-6 p-4 bg-teal-50 border-l-4 border-teal-500 text-gray-700 text-sm text-left">
💡 <b>code .</b> 指令會直接用 VS Code 開啟「目前資料夾」，是最快速的方式
</div>

| 步驟 | 指令 | 說明 |
| --- | --- | --- |
| 1 | `cd 專案資料夾路徑` | 切換到 Angular 專案目錄 |
| 2 | `code .` | 用 VS Code 開啟此資料夾 |

<!--
這是最常用的方式。
只要在終端機裡先 cd 進去你的專案，再打 code 一個點，VS Code 就會自動彈出來，而且左側的檔案總管已經幫你定位到這個專案了。
-->

---

# 方法二：從 VS Code 內開啟

直接在 VS Code 介面操作，不用打指令：

<div class="mt-4 grid grid-cols-2 gap-6">
  <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div class="font-bold text-teal-700 mb-2">選單開啟</div>
    <ol class="text-sm space-y-1 text-gray-700 list-decimal list-inside">
      <li>點選上方選單 <b>File</b></li>
      <li>選擇 <b>Open Folder...</b></li>
      <li>選取 Angular 專案資料夾</li>
      <li>點擊「選擇資料夾」</li>
    </ol>
  </div>
  <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div class="font-bold text-teal-700 mb-2">快速鍵</div>
    <div class="text-sm text-gray-700 space-y-2">
      <div><b>Windows：</b> <code>Ctrl + K, Ctrl + O</code></div>
      <div><b>macOS：</b> <code>⌘K, ⌘O</code></div>
    </div>
  </div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 開啟後，左側「檔案總管」會顯示 Angular 專案的完整結構（<code>src/</code>、<code>package.json</code> 等）
</div>

<!--
如果你還不習慣用指令，直接從選單開啟也完全沒問題。
兩種方式效果完全一樣，選你喜歡的就好。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 使用 `ng g c` 建立 Angular 元件
# Generate Component

<!--
開好專案，第二步就是建立元件。
Angular 的精髓就是把 UI 切成一個一個可重複使用的元件。
-->

---

# `ng g c` — 快速建立元件

在 VS Code 的**內建終端機**中輸入：

```bash
ng generate component 元件名稱
# 縮寫
ng g c 元件名稱
```

**範例：建立一個首頁元件**

```bash
ng g c home
```

執行後，Angular CLI 會自動在 `src/app/` 下建立四個檔案：

```
src/app/home/
  ├── home.component.ts       ← 邏輯（TypeScript）
  ├── home.component.html     ← 畫面（HTML 模板）
  ├── home.component.css      ← 樣式（CSS）
  └── home.component.spec.ts  ← 測試檔
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 元件的詳細結構與使用方式，將在後續章節深入說明
</div>

<!--
ng g c 是 Angular CLI 最常用的指令之一。
它幫你一次建好四個檔案，而且會自動幫你設定好基本的 decorator 和 class，省去手動建檔的麻煩。
以後建立每一個新頁面或可重複使用的 UI 區塊，都是用這個指令。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 快速設定 Route
# Quick Routing Setup

<!--
有了元件，第三步就是讓這個元件能被「路由」到——也就是設定網址對應哪個畫面。
-->

---

# 快速設定 Route

Angular 的路由設定在 `src/app/app.routes.ts`：

```ts {all}
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
];
```

接著在 `app.component.html` 中加入路由出口：

```html
<router-outlet />
```

<div class="mt-4 p-3 bg-teal-50 border-l-4 border-teal-500 text-gray-700 text-sm text-left">
💡 <b>path</b> 對應瀏覽器的網址路徑，<b>component</b> 指定要顯示的元件<br>
更完整的路由設定（巢狀路由、參數、Guard 等）將在後續路由章節詳細說明
</div>

<!--
這是最基本的路由設定。
你只需要把元件 import 進來，然後在 routes 陣列裡加一個物件：path 是網址、component 是要顯示的元件。
app.component.html 裡的 router-outlet 就是「頁面切換的舞台」，Angular 會把對應的元件渲染在這裡。
更進階的路由功能——懶加載、路由守衛、巢狀路由——我們後面會有專門的章節來說明。
-->

---

# 本章流程回顧

<div class="mt-4 grid grid-cols-3 gap-4">
  <div class="p-4 bg-teal-50 border-2 border-teal-300 rounded-xl text-center">
    <div class="text-3xl font-black text-teal-600 mb-2">①</div>
    <div class="font-bold text-teal-800 mb-1">開啟專案</div>
    <div class="text-sm text-gray-600"><code>code .</code><br>或 File → Open Folder</div>
  </div>
  <div class="p-4 bg-blue-50 border-2 border-blue-300 rounded-xl text-center">
    <div class="text-3xl font-black text-blue-600 mb-2">②</div>
    <div class="font-bold text-blue-800 mb-1">建立元件</div>
    <div class="text-sm text-gray-600"><code>ng g c 元件名稱</code><br>自動產生四個檔案</div>
  </div>
  <div class="p-4 bg-purple-50 border-2 border-purple-300 rounded-xl text-center">
    <div class="text-3xl font-black text-purple-600 mb-2">③</div>
    <div class="font-bold text-purple-800 mb-1">設定路由</div>
    <div class="text-sm text-gray-600"><code>app.routes.ts</code><br>加上 router-outlet</div>
  </div>
</div>

<div class="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-gray-700 text-sm text-left">
✅ 這三個步驟完成後，就能在瀏覽器看到你建立的頁面了！更深入的功能將在後續章節一一介紹。
</div>

<!--
好，我們今天的三步驟就是這樣：開專案、建元件、設路由。
每一步做完，你的 Angular 應用就能在瀏覽器跑起來看到畫面了。
後面我們還有很多章節要一起玩，今天先記住這三個基本動作！
-->

---
layout: end
---

# 開始動手吧！
### 打開你的 Angular 專案，建立第一個元件！

<!--
恭喜大家學完了這一章的三個核心動作！
現在去試試看，打開你的 Angular 專案，執行 ng g c，看看 CLI 幫你生出了什麼。
下一章我們進入 HTML 基礎，讓你的元件畫面能有內容可以呈現！
-->
