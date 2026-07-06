---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Sidenav
routeAlias: ch48
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
    Sidenav
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用側邊導覽列切換頁面，提升應用導覽體驗」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來認識 Angular Material 的 Sidenav（側邊導覽）元件。

大家平常滑手機 App 或使用後台管理系統時，應該都看過從側邊滑出來的選單，點一下漢堡圖示，左邊就跳出一排導覽連結。如果自己刻這種效果，要處理顯示/隱藏動畫、遮罩、版面推擠等等，其實蠻繁瑣的。Sidenav 就是 Angular Material 幫我們把這一整套邏輯包好的元件。

學完這一章，大家會知道怎麼用 mat-drawer-container 搭配 mat-drawer 建立側邊導覽、三種顯示模式的差異，以及怎麼用一個按鈕控制它的開關。
-->

---
layout: default
---

# Outline

- **什麼是 Sidenav？** — 側邊導覽元件的概念與應用場景
- **三種顯示模式** — `over`、`push`、`side` 的差異
- **HTML 結構** — `mat-drawer-container`、`mat-drawer` 基本語法
- **TypeScript 設定** — 匯入 `MatSidenavModule` 與 `MatListModule`
- **drawer.toggle() 控制** — 以按鈕開關側邊導覽

<!--
這張投影片先帶大家看一下整章的走法：先認識 Sidenav 是什麼、能用在哪些場景，接著比較三種顯示模式的差異，然後實際看 HTML 結構怎麼寫、TypeScript 要匯入哪些模組，最後看怎麼用按鈕控制側邊導覽的開關。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Sidenav？
# What Is Sidenav?

<!--
我們先花一點時間搞懂 Sidenav 到底是什麼、什麼情況下我們會需要它，再進入實作。
-->

---

# 什麼是 Sidenav？

`mat-sidenav`（滑出側邊導覽元件）是 Angular Material 提供的側邊欄元件，常用於頁面切換導覽功能。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**核心概念**

- 側邊導覽面板可顯示或隱藏
- 搭配按鈕觸發 `drawer.toggle()` 開關
- 導覽連結列於側邊，主內容在右側呈現

</div>
<div>

**常見應用場景**

- 後台管理介面左側選單
- 行動裝置的漢堡選單
- 多頁面應用的主要導覽結構

</div>
</div>

<div class="flex justify-center">
  <img src="/images/47-sidenav/sidenav-concept-overview.png" class="rounded shadow-md max-h-80" />
</div>

<!--
白話來說，mat-sidenav 就是一塊「可以滑出來、也可以收起來」的側邊面板，通常放導覽連結或選單項目，跟主要內容區並排或疊在一起。

生活化一點的比喻，大家可以想像成餐廳的菜單抽屜，平常收在櫃檯下面不佔空間，客人需要點餐時才拉開來看，看完可以收回去，不會一直佔用桌面。Sidenav 的概念也是一樣：需要導覽的時候滑出來，不需要的時候收起來，節省畫面空間。

業界實務上，這種側邊導覽幾乎是後台管理系統、電商後台、CMS 系統的標準配置，大家之後接觸企業內部系統應該會很常看到。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 三種顯示模式
# Display Modes

<!--
Sidenav 有三種不同的顯示行為，這一節我們一個一個看它們展開時，跟主內容區的互動方式有什麼不一樣。
-->

---

# 三種顯示模式

`mat-drawer`（`mat-sidenav`）支援三種 `mode` 屬性值，控制側邊導覽與主內容的互動方式。

| 模式 | 說明 |
|---|---|
| `over`（預設） | Sidenav 漂浮在主要內容之上，主內容被半透明遮罩覆蓋 |
| `push` | Sidenav 將主要內容向右推開，並以遮罩覆蓋主內容 |
| `side` | Sidenav 與主要內容並排顯示，主內容寬度縮小以騰出空間 |

<!--
這張表是這三種模式的總覽，重點解說一下：over 跟 push 都會加上遮罩蓋住主內容，差別在於 push 會把內容推開、over 則是內容原地不動只是被蓋住；side 完全不加遮罩，是真正的並排顯示。

在業界實務上，over 是預設值也最常見，適合手機版或內容比較窄的畫面；side 常用在寬螢幕的後台系統，讓側邊選單常駐畫面；push 比較少單獨用，但概念上要理解它跟 over 的差異。

接下來我們用三張示意圖，實際看一下三種模式展開後長什麼樣子。
-->

---

# 模式示意：over

`mode="over"` 時，側邊導覽展開後浮層覆蓋主內容，主內容區仍保持原始寬度。

<div class="flex justify-center">
  <img src="/images/47-sidenav/mode-over-demo.png" class="rounded shadow-md max-h-80" />
</div>

<!--
大家看這張截圖，重點是側邊導覽像一張「浮在上面的紙」蓋住了主內容，主內容本身的寬度完全沒有改變，只是被半透明的遮罩蓋住而已。

⚠️ 提醒同學，因為主內容有遮罩，這時候使用者點主內容區是點不到的，通常點一下遮罩或再按一次按鈕，側邊導覽就會收回去，這是 over 模式常見的互動設計。
-->

---

# 模式示意：push

`mode="push"` 時，側邊導覽展開後將主內容向右推移，並以遮罩覆蓋主內容。

<div class="flex justify-center">
  <img src="/images/47-sidenav/mode-push-demo.png" class="rounded shadow-md max-h-80" />
</div>

<!--
這張截圖跟 over 最大的差別是：主內容整個被「推」到右邊去了，不是原地被蓋住，畫面上可以看到主內容的起始位置往右移動了一段距離。

大家可以留意一下，push 模式一樣會加遮罩，所以互動行為（點遮罩收合）跟 over 是一樣的，差別只在於視覺呈現的方式。
-->

---

# 模式示意：side

`mode="side"` 時，側邊導覽與主內容並排顯示，主內容寬度自動縮減，不使用遮罩。

<div class="flex justify-center">
  <img src="/images/47-sidenav/mode-side-demo.png" class="rounded shadow-md max-h-80" />
</div>

<!--
side 模式跟前面兩種最不一樣：完全沒有遮罩，側邊導覽跟主內容是「肩並肩」站著的，主內容的寬度會自動縮減，把空間讓給側邊導覽。

⚠️ 易錯點提醒同學：因為沒有遮罩，使用者可以同時操作側邊導覽跟主內容，這跟 over/push 的使用情境不太一樣，比較適合當作「常駐選單」而不是「暫時彈出的選單」。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# HTML 結構
# HTML Structure

<!--
了解三種模式的差異之後，接下來我們動手看看 Sidenav 的 HTML 結構要怎麼寫，才能真正把它放進畫面裡。
-->

---

# HTML 結構 (一) — 容器與側邊導覽

使用 `mat-drawer-container` 將整個頁面包裹，側邊導覽內容寫在 `mat-drawer` 中，並以 `#drawer` 樣板變數供按鈕呼叫。

```html
<!-- 導覽最外層 -->
<mat-drawer-container class="example-container" autosize>

  <!-- 側導覽頁面 -->
  <mat-drawer #drawer class="example-sidenav" mode="side">
    <mat-list role="list">
      <mat-list-item role="listitem">頁面1</mat-list-item>
      <mat-list-item role="listitem">頁面2</mat-list-item>
      <mat-list-item role="listitem">頁面3</mat-list-item>
    </mat-list>
  </mat-drawer>
```

<!--
帶大家看這段結構，最外層一定要用 mat-drawer-container 包起來，這是 Sidenav 能運作的必要容器，缺了它側邊導覽跟主內容區就沒辦法正確排列。

裡面的 mat-drawer 就是側邊導覽本體，內容通常放 mat-list 這種清單元件列出導覽連結。這裡有個重點：#drawer 這個樣板變數，等一下按鈕要呼叫 drawer.toggle() 就是靠它抓到這個元素。

⚠️ 提醒同學，autosize 屬性是讓容器自動根據內容調整高度，如果版面跑掉，可以檢查一下這個屬性有沒有加。
-->

---

# HTML 結構 (二) — 主內容區與切換按鈕

主內容區寫在 `mat-drawer-container` 內的 `div` 中，使用 `drawer.toggle()` 控制側邊導覽的開關。

```html
  <!-- 導覽內容 -->
  <div class="example-sidenav-content">
    <div>
      <br>
      <h3>網頁內容</h3>
      <button type="button" (click)="drawer.toggle()">
        顯示sidenav
      </button>
    </div>
  </div>

</mat-drawer-container>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>drawer.toggle()</code> 透過樣板變數 <code>#drawer</code> 直接呼叫，無需在 TypeScript 另外定義方法。
</div>

<!--
這頁把整個 HTML 結構補完，主內容區就是一個普通的 div，重點看按鈕上的 (click)="drawer.toggle()"。

大家可以留意一下，這裡的 drawer 就是前一頁定義的 #drawer 樣板變數，透過它可以直接呼叫 mat-drawer 內建的 toggle() 方法，完全不需要在 TypeScript 檔案裡另外寫一個方法去控制開關，這是 Angular 樣板變數的一個好用之處。

執行結果是：點按鈕之後，側邊導覽就會依照設定的 mode 展開或收合。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# TypeScript 設定
# TypeScript Configuration

<!--
HTML 結構寫好之後，光有標籤還不夠，我們還需要在元件的 TypeScript 檔裡匯入對應的模組，畫面才能正確顯示。
-->

---

# TypeScript 設定 — 匯入所需模組

在元件的 TypeScript 檔中匯入 `MatSidenavModule` 與 `MatListModule`，並加入 `imports` 陣列。

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent { }
```

<!--
這段範例目的是讓大家看清楚，standalone 元件要用 mat-drawer、mat-drawer-container、mat-list 這些標籤，就一定要在 imports 陣列裡加上對應的模組，這裡是 MatSidenavModule 跟 MatListModule。

⚠️ 常見錯誤是同學寫了 HTML 標籤，卻忘記匯入模組，這時候 Angular 會出現「找不到這個元素」的錯誤，或是畫面直接顯示不出樣式，遇到這種狀況第一件事就是回來檢查 imports 陣列有沒有漏掉。

匯入完成後，執行結果就是畫面上能正確顯示側邊導覽與清單樣式。
-->

---

# 完整使用流程

| 步驟 | 說明 |
|---|---|
| 1 | 在 `.ts` 中匯入 `MatSidenavModule`、`MatListModule` 並加入 `imports` |
| 2 | 在 HTML 以 `<mat-drawer-container>` 包裹整個版面 |
| 3 | 在 `<mat-drawer>` 中撰寫側邊導覽內容（導覽連結清單） |
| 4 | 設定 `mode` 屬性為 `over`、`push` 或 `side` |
| 5 | 在主內容區的按鈕綁定 `(click)="drawer.toggle()"` |
| 6 | 使用樣板變數 `#drawer` 讓按鈕直接控制 drawer |

<!--
這張表把整個 Sidenav 的建置流程串起來，從匯入模組、寫 HTML 結構、設定 mode、到最後用按鈕控制開關，大家可以照這個順序檢查自己的專案有沒有漏掉哪一步。

如果畫面跑掉或按鈕沒反應，通常都是這六個步驟裡漏了某一項，比如忘記匯入模組、或是樣板變數名稱跟按鈕綁定的名稱對不起來，大家自己練習時可以照這張表一步一步排查。
-->

---
layout: end
---

# 課程結束
### 使用 mat-sidenav 打造具備滑出側邊導覽的 Angular Material 應用程式

<!--
這一章我們認識了 Angular Material 的 Sidenav 元件，從三種顯示模式的差異、HTML 結構怎麼搭、到 TypeScript 要匯入哪些模組，最後也看了怎麼用一個按鈕控制它的開關。

課後大家可以試著在自己的專案裡，把某個頁面改造成有側邊導覽的版面，練習看看 over、push、side 三種模式實際用起來的手感有什麼不同，也想想看什麼樣的畫面尺寸或使用情境比較適合哪一種模式。
-->

