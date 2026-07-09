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
- **mat-menu 下拉選單與 matBadge 角標** — 工具列常搭配的兩個延伸元件

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
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-menu 與 matBadge
# Dropdown Menu & Badge

<!--
Toolbar 除了標題跟圖示按鈕，業界實務上很常搭配兩個延伸元件：一個是點擊後彈出選單的 mat-menu，另一個是在圖示右上角顯示數字提示的 matBadge。這兩個接下來的練習會用到，我們先花兩頁把它們的基本用法搞懂。
-->

---

# mat-menu — 下拉選單

`mat-menu` 是 Material 提供的下拉選單元件，點擊觸發按鈕才顯示選單內容，常用於使用者頭像選單、「更多操作」按鈕。

```html
<button mat-icon-button [matMenuTriggerFor]="menu">
  <mat-icon>more_vert</mat-icon>
</button>

<mat-menu #menu="matMenu">
  <button mat-menu-item>選項一</button>
  <button mat-menu-item>選項二</button>
</mat-menu>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>mat-menu</code> 要用 <code>#menu="matMenu"</code> 給樣板變數，按鈕才能用 <code>[matMenuTriggerFor]="menu"</code> 綁定要開啟哪一個選單。
</div>

<!--
mat-menu 平常是隱藏的，只有使用者點擊觸發它的按鈕時才會浮出來，這跟前面學過的 mat-drawer「常駐或手動收合」的行為不一樣，mat-menu 預設就是彈出式、點外面會自動關閉。

大家看一下這段結構：觸發按鈕上用 [matMenuTriggerFor] 指向一個樣板變數，這個樣板變數要寫在 mat-menu 標籤上，並且一定要指定 ="matMenu"，這是固定寫法，代表這個變數代表的是「這一個 mat-menu 的控制器」。選單裡面的每個項目用 mat-menu-item，點下去可以搭配 (click) 執行動作，選單也會自動關閉。

⚠️ 易錯點：mat-menu 忘記加 ="matMenu"，或是 [matMenuTriggerFor] 指到錯的變數名稱，點擊按鈕都不會有反應，是初學者最常卡住的地方。
-->

---

# mat-menu — 匯入模組

使用 `mat-menu`、`mat-menu-item` 與 `matMenuTriggerFor` 前，需匯入 `MatMenuModule`。

```typescript
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

<!--
跟前面學過的每個 Material 元件一樣，用什麼標籤就要匯入對應模組，mat-menu 系列對應的是 MatMenuModule，套件路徑是 @angular/material/menu。忘記匯入的話，[matMenuTriggerFor] 這個綁定會直接報錯，找不到這個指令。
-->

---

# matBadge — 角標提示

`matBadge` 是一個指令，可以直接疊加在任何元素右上角，顯示一個小圓形數字或文字角標，常用於通知未讀數量。

```html
<button mat-icon-button matBadge="3" matBadgeColor="warn">
  <mat-icon>notifications</mat-icon>
</button>
```

```typescript
import { MatBadgeModule } from '@angular/material/badge';
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>提示：</b> <code>matBadge</code> 直接寫值即可（字串或數字），<code>matBadgeColor</code> 可設定 <code>primary</code>、<code>accent</code>、<code>warn</code> 三種顏色。
</div>

<!--
matBadge 用法很單純，不需要額外包裝元素，直接寫在要顯示角標的元素上就好，這裡示範的是通知圖示按鈕加上未讀數字 3，顏色用 warn（紅色）比較醒目。要用這個指令一樣要匯入對應的 MatBadgeModule，套件路徑是 @angular/material/badge。

這兩個元件學完，我們就有足夠的工具可以把 Toolbar 做成業界常見、功能完整的頂部列了，接下來的練習就會同時用到 mat-menu 跟 matBadge。
-->

---
layout: default
---

# 練習：整合 Sidenav 的應用程式頂部列
### 情境說明

業界後台系統的頂部列，通常不只有標題，右側還會有通知鈴鐺（帶未讀數字角標）跟使用者頭像，點頭像會彈出選單顯示「個人資料」「登出」。這一題延續 `ch48-sidenav` 練習做出來的 `sidenav-menu.component`，把它的 `mat-toolbar` 從陽春版擴充成業界常見的完整頂部列。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**需求**
- 沿用 ch48 的漢堡按鈕 + 標題，維持左側原樣
- 標題右側加通知圖示，用角標顯示未讀數量
- 最右側加使用者頭像圖示，點擊彈出選單

</div>
<div>

**限制**
- 標題與右側按鈕之間用 Spacer 技巧撐開，不能用 `margin-left`
- 未讀角標用 `MatBadgeModule` 的 `matBadge`，不要手刻圓角 `div`
- 下拉選單用 `MatMenuModule`，不要自己寫 `*ngIf` 控制顯示/隱藏

</div>
</div>

<!--
這一題的重點是把這一章學到的 Spacer 技巧，跟 ch48 已經做好的 sidenav 整合成一個更完整、更接近真實專案的頂部列。大家平常用的後台系統，像 Gmail、雲端管理後台，幾乎都是這種「左邊選單開關 + 標題 + Spacer + 右側功能圖示 + 使用者選單」的組合，這一題就是把這個業界常見的版面實際做一次。

⚠️ 提醒同學，這一題不需要重寫 sidenav 的部分，drawer、pages、routerLink 這些都維持 ch48 寫好的樣子，只需要修改 mat-toolbar 裡面的內容。
-->

---
layout: default
---

# 練習：任務說明

1. 延續 ch48 的 `sidenav-menu.component.ts`，`imports` 陣列新增 `MatMenuModule`、`MatBadgeModule`
2. `mat-toolbar` 內，標題 `<span>` 後面加一個空的 `<span class="toolbar-spacer"></span>`
3. Spacer 後面加一個通知圖示按鈕，用 `matBadge="3" matBadgeColor="warn"` 顯示未讀角標
4. 再加一個使用者頭像圖示按鈕，用 `[matMenuTriggerFor]="userMenu"` 綁定下拉選單
5. 在 `mat-toolbar` 外面新增 `<mat-menu #userMenu="matMenu">`，內含「個人資料」與「登出」兩個 `mat-menu-item`
6. 在 TypeScript 中新增 `logout()` 方法，「登出」項目綁定 `(click)="logout()"`
7. 在 `.scss` 中為 `.toolbar-spacer` 設定 `flex: 1 1 auto`

<!--
大家可以先自己動手寫寫看。重點是想清楚 Spacer 只是一個「空 span + flex CSS」，不用想得太複雜；mat-menu 則是獨立寫在 mat-toolbar 外面的一個區塊，靠樣板變數 #userMenu 跟按鈕上的 [matMenuTriggerFor] 連結起來，兩者不需要巢狀包在一起。卡住的地方沒關係，下一頁有提示。
-->

---
layout: default
---

# 練習：解題提示

1. `mat-menu` 一定要有樣板變數並指定 `="matMenu"`：`<mat-menu #userMenu="matMenu">`，這個變數才能被 `[matMenuTriggerFor]` 引用
2. `matBadge` 直接寫在要顯示角標的元素上即可：`<button mat-icon-button matBadge="3" matBadgeColor="warn">`
3. `mat-menu-item` 裡可以直接放 `mat-icon` + `span`，兩者並排顯示圖示加文字
4. `MatMenuModule` 對應套件路徑是 `@angular/material/menu`；`MatBadgeModule` 對應 `@angular/material/badge`
5. `.toolbar-spacer` 的效果跟 ch49 教過的 `example-spacer`完全相同，只是換了 class 名稱

<!--
对照一下大家的答案，最容易漏掉的地方是 mat-menu 忘記加 #userMenu="matMenu"，這時候 [matMenuTriggerFor] 會抓不到目標，點擊沒有任何反應。另一個常見疏漏是把 mat-menu 寫在 mat-toolbar 裡面，其實它應該是 mat-toolbar 的同層級元素，因為 mat-menu 本身是一個浮動的選單面板，不是版面排列的一部分。下一頁看完整解答。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.ts（新增部分）

延續 ch48 的元件，只列出這一題新增的部分：

```typescript
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

// imports 陣列新增：MatMenuModule、MatBadgeModule

export class SidenavMenuComponent {
  // ...pages 陣列沿用 ch48，維持不變

  logout(): void {
    console.log('使用者已登出');
  }
}
```

<!--
這裡只列出跟 ch48 版本的差異：多 import 了 MatMenuModule、MatBadgeModule，並記得把它們加進 imports 陣列。新增一個 logout() 方法，這一題先用 console.log 模擬登出動作，實務上這裡通常會呼叫認證服務清除 token、導回登入頁，概念上是一樣的，只是先用最簡單的方式示範綁定邏輯。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.html（整體結構）

先看整個檔案的骨架，確認 `mat-toolbar` 在哪個位置，內容下一頁再放大看：

```html
<mat-drawer-container class="menu-container" autosize>

  <mat-drawer #drawer class="menu-sidenav" mode="side" opened>
    <!-- 側邊選單內容沿用 ch48，不變 -->
  </mat-drawer>

  <mat-drawer-content>
    <mat-toolbar color="primary" class="menu-toolbar">
      <!-- 工具列內容，見下一頁 -->
    </mat-toolbar>

    <div class="menu-content">
      <router-outlet></router-outlet>
    </div>
  </mat-drawer-content>

</mat-drawer-container>
```

<!--
這一題不動 mat-drawer 裡面的側邊選單內容，也不動 mat-drawer-content 裡的 router-outlet，唯一要修改的地方就是 mat-toolbar 裡面的內容，位置在 mat-drawer-content 開頭、router-outlet 的上面。下一頁把 mat-toolbar 裡面放大來看完整內容。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.html（工具列內容）

承接上一頁，`mat-toolbar` 內容從陽春版擴充成含 Spacer、通知、使用者選單：

```html
    <mat-toolbar color="primary" class="menu-toolbar">
      <button mat-icon-button (click)="drawer.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>我的應用程式</span>

      <span class="toolbar-spacer"></span>

      <button mat-icon-button matBadge="3" matBadgeColor="warn">
        <mat-icon>notifications</mat-icon>
      </button>

      <button mat-icon-button [matMenuTriggerFor]="userMenu">
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>
```

<!--
前半段的漢堡按鈕跟標題完全沿用 ch48，沒有變動。重點看後半段：toolbar-spacer 這個空 span 把標題跟右側按鈕撐開；notifications 圖示按鈕加了 matBadge="3"，畫面上會自動在圖示右上角顯示一個紅色角標數字 3；最後 account_circle 圖示按鈕用 [matMenuTriggerFor]="userMenu" 指向下一頁定義的選單。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.html（使用者選單）

`mat-menu` 要寫在 `</mat-drawer-container>` 外面，是整份模板最外層的兄弟元素：

```html
</mat-drawer-container>

<mat-menu #userMenu="matMenu">
  <button mat-menu-item>
    <mat-icon>person</mat-icon>
    <span>個人資料</span>
  </button>
  <button mat-menu-item (click)="logout()">
    <mat-icon>logout</mat-icon>
    <span>登出</span>
  </button>
</mat-menu>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>驗證方式：</b> 點頭像圖示應彈出選單，顯示「個人資料」「登出」兩個選項；點「登出」應在 Console 看到登出訊息，且選單自動關閉（這是 mat-menu-item 的內建行為）。
</div>

<!--
mat-menu 本身不是排版用的元素，而是一個浮動面板，所以不需要跟 mat-toolbar 巢狀寫在一起。這裡刻意標出 </mat-drawer-container>，就是要提醒大家 mat-menu 是放在整個容器外面、跟 mat-drawer-container 平行的位置，Angular Material 會在使用者點擊觸發按鈕時自動運算位置、浮出選單，不受它寫在 HTML 哪個位置影響。

兩個 mat-menu-item 都是圖示加文字的組合，登出項目多綁了 (click)="logout()"，點擊後會執行上一頁定義的方法，同時選單會自動收合，這是 mat-menu-item 內建的行為，不需要額外寫程式碼去關閉選單。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.scss（Spacer）

```scss
.toolbar-spacer {
  flex: 1 1 auto;
}
```

<!--
這一行 CSS 跟這一章前面教的 example-spacer 原理完全相同：flex: 1 1 auto 讓這個空的 span 盡量撐大，把左邊的標題跟右邊的通知、使用者按鈕推開，達到「標題靠左、功能按鈕靠右」的效果。mat-toolbar 預設就是 flex 容器，所以不需要額外設定 display: flex，直接在子元素上調整 flex 屬性就能生效。

這一題做完，就是把 ch48 的側邊導覽跟這一章的 Toolbar、Spacer 技巧整合成一個完整的頂部列，加上通知角標跟使用者選單，已經很接近業界後台系統的標準版面了。
-->

---
layout: end
---

# 課程結束
### 善用 mat-toolbar 與 Spacer 技巧，打造整齊美觀的 Angular 頂部導覽列

<!--
這一章我們學會了用 mat-toolbar 做出頂部工具列，也搞懂了 Spacer 這個左右對齊的排版技巧，還有背後要 import 哪些模組。下次大家在專案裡要做導覽列的時候，就可以直接套用今天教的這套流程。辛苦大家了！
-->

