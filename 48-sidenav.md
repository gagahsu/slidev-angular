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
layout: default
---

# 練習：路由導覽側邊選單
### 情境說明

專案的 `app.routes.ts` 定義了一整批頁面路由，隨著頁面越加越多，使用者要在網址列手動輸入路徑才能切換，非常不方便。這一題要用 `mat-sidenav` 做一個導覽選單，把 `app.routes.ts` 裡的所有頁面路徑列出來，點擊就能切換頁面。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**需求**
- 側邊導覽列出 `app.routes.ts` 中幾個代表性頁面路徑
- 每個項目點擊後導向對應頁面，目前所在頁面要有醒目樣式
- 用 `mat-toolbar` 上的漢堡圖示按鈕控制側邊導覽開關

</div>
<div>

**限制**
- 路徑清單存成陣列，用 `@for` 迴圈產生選單項目，不能一條一條手刻
- 導覽用 `routerLink` 指令，不用 `(click)` 手動呼叫 `router.navigate()`
- `mode` 使用 `side`，選單需與主內容並排常駐顯示
- 開關按鈕用 `mat-icon-button` + `mat-icon`，不要用一整顆文字大按鈕

</div>
</div>

<!--
這一題的動機很生活化：專案頁面一多，光靠網址列輸入路徑很痛苦，實務上幾乎每個多頁應用都會有一個側邊選單，把所有可以去的頁面列出來。這一題就是把前面學到的 mat-drawer 結構，加上路由清單陣列，兩者串起來變成一個真正可以用的導覽選單。

⚠️ 提醒同學，這裡限制用 routerLink 而不是自己寫 (click) 呼叫 Router，是因為 routerLink 是 Angular 官方提供給模板導覽用的標準寫法，能直接在 a 標籤或任何元素上使用，比手動呼叫 router.navigate() 更簡潔。

⚠️ 另外提醒，實務上很少看到側邊導覽用一整顆寫著文字的大按鈕來收合，通常是在頂部 `mat-toolbar` 放一個小小的漢堡圖示按鈕，這一題刻意要求用 `mat-icon-button`，練習更貼近業界常見的介面設計。
-->

---
layout: default
---

# 練習：任務說明

1. 在元件的 TypeScript 中，建立 `pages` 陣列，屬性含 `path`（路由路徑）與 `label`（顯示名稱），內容對應 `app.routes.ts` 中幾個代表性路徑
2. `imports` 陣列加入 `MatSidenavModule`、`MatListModule`、`MatToolbarModule`、`MatIconModule`、`MatButtonModule`、`RouterLink`、`RouterLinkActive`
3. HTML 用 `mat-drawer-container` 包裹版面，`mat-drawer` 設定 `mode="side"` 且預設展開（`opened`）
4. `mat-drawer` 內用 `mat-nav-list` + `@for` 跑過 `pages`，每筆產生一個項目，用 `routerLink` 綁 `page.path`，並用 `routerLinkActive` 加上目前頁面的醒目樣式
5. 主內容區最上方放 `mat-toolbar`，裡面放 `mat-icon-button`（含漢堡圖示 `menu`），綁定 `(click)="drawer.toggle()"`
6. `mat-toolbar` 下方用 `<router-outlet>` 顯示目前頁面內容

<!--
大家可以先自己動手寫寫看。重點是想清楚兩件事：第一，選單資料要用陣列 + @for 產生；第二，開關按鈕不要用文字按鈕，改用 mat-toolbar 搭配 mat-icon-button，這是現代網頁最常見的側邊選單開關寫法。卡住的地方沒關係，下一頁有提示。
-->

---
layout: default
---

# 練習：解題提示

1. `pages` 陣列每個元素長這樣：`{ path: '/home', label: '首頁' }`，`path` 要跟 `app.routes.ts` 裡的 `path` 屬性對得起來
2. `@for (page of pages; track page.path)` — `track` 用 `path` 即可，因為每個路徑是唯一的
3. `mat-icon` 內直接寫 Material 圖示名稱當文字內容即可，例如 `<mat-icon>menu</mat-icon>` 就是漢堡圖示
4. `RouterLink`、`RouterLinkActive` 都要從 `@angular/router` 匯入，不包含在 Material 模組裡
5. `mat-drawer` 要加上 `opened` 屬性，畫面載入時才會預設展開，不然要先按按鈕才看得到選單

<!--
对照一下大家的答案，最容易漏掉的地方是忘記匯入 RouterLinkActive，這時候 routerLinkActive 屬性會直接報錯找不到這個指令。另一個常見疏漏是 track 用了整個 page 物件而不是 page.path，物件參照每次都不一樣，@for 就會覺得每筆資料都變了，效能上不划算。下一頁看完整解答。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.ts（一）

匯入模組與元件裝飾器（imports 陣列見下一頁）：

```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidenav-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    // ...接下一頁
```

<!--
除了前面用過的 MatSidenavModule、MatListModule，這一版多匯入了三個模組：MatToolbarModule 提供頂部工具列、MatIconModule 讓 mat-icon 能顯示圖示、MatButtonModule 提供 mat-icon-button 這種只有圖示的按鈕。RouterLinkActive 則是用來偵測「目前路由是不是這個連結」，等一下要拿來加醒目樣式。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.ts（二）

`imports` 陣列其餘部分、`pages` 陣列：

```typescript
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sidenav-menu.component.html',
  styleUrl: './sidenav-menu.component.scss',
})
export class SidenavMenuComponent {

  // 對應 app.routes.ts 中幾個代表性頁面路徑
  pages = [
    { path: '/home', label: 'Home 首頁' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/cart', label: 'Cart 購物車' },
  ];
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b>這裡只節錄 3 筆示範，實務上可依 <code>app.routes.ts</code> 需要展示的頁面自行增減 <code>pages</code> 陣列內容。
</div>

<!--
pages 陣列這裡只節錄 home、dashboard、cart 三筆示範，每一筆對照 app.routes.ts 裡的 { path: ..., component: ... }，轉成 { path, label } 物件，label 只是給使用者看的顯示文字，跟實際路徑無關，可以自己取名字。實務上想列出多少頁面，就照這個格式繼續往陣列裡加就好。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.html（一）

側邊導覽本體，用 `mat-nav-list` 呈現連結清單：

```html
<mat-drawer-container class="menu-container" autosize>

  <mat-drawer #drawer class="menu-sidenav" mode="side" opened>
    <div class="sidenav-header">
      <mat-icon>apps</mat-icon>
      <span>頁面導覽</span>
    </div>
    <mat-nav-list>
      @for (page of pages; track page.path) {
        <a mat-list-item
           [routerLink]="page.path"
           routerLinkActive="active-link">
          {{ page.label }}
        </a>
      }
    </mat-nav-list>
  </mat-drawer>
  <!-- 主內容區見下一頁 -->
```

<!--
mat-nav-list 是 Material 專門給「導覽用清單」的元件，語意上比純 mat-list 更適合放連結。sidenav-header 是選單頂部的一小塊標題區，純粹裝飾用。重點看 @for 迴圈裡的 a 標籤：routerLink 綁路徑負責導覽，routerLinkActive="active-link" 則是只要目前網址符合這個連結，就自動幫這個 a 標籤加上 active-link 這個 class，等一下 CSS 會用這個 class 做醒目樣式。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.html（二）

頂部工具列與主內容區：

```html
  <mat-drawer-content>
    <mat-toolbar color="primary" class="menu-toolbar">
      <button mat-icon-button (click)="drawer.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>我的應用程式</span>
    </mat-toolbar>

    <div class="menu-content">
      <router-outlet></router-outlet>
    </div>
  </mat-drawer-content>

</mat-drawer-container>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>驗證方式：</b> 畫面載入時側邊選單應直接展開，點選單裡任一項目網址列應跟著切換、該項目要呈現醒目樣式，且主內容區顯示對應頁面；點工具列的漢堡圖示，側邊選單應可正常收合與再次展開。
</div>

<!--
mat-drawer-content 是主內容的正式容器，跟 mat-drawer 是兄弟關係，兩個都包在 mat-drawer-container 裡。工具列裡放的不是文字按鈕，而是 mat-icon-button 搭配 mat-icon>menu</mat-icon>，這是現代網頁最常見的漢堡選單開關寫法，視覺上小巧不佔版面，(click) 一樣呼叫 drawer.toggle()，邏輯完全沒變，只是換了個更精緻的按鈕元件。

執行結果：這一題做完，就等於幫整個專案做出一份「頁面地圖」，之後每次要看某個章節的範例，直接從側邊選單點過去，不用再手動改網址，目前所在頁面也會有清楚的視覺提示。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.scss（一）

容器與側邊導覽的基本版面：

```scss
.menu-container {
  height: 100vh;
}

.menu-sidenav {
  width: 220px;
  border-right: none;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
}

.sidenav-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  font-weight: 600;
  color: #1a5c5c;
}
```

<!--
mat-drawer-container 預設高度是 0，一定要自己給高度選單才會撐開，這裡用 height: 100vh 撐滿視窗。menu-sidenav 給固定寬度 220px，並拿掉預設邊框改用淡淡的陰影，視覺上更柔和、更接近現代後台系統的側邊欄。sidenav-header 用 flex 排版，把圖示跟文字放在同一行。下一頁補工具列跟目前頁面的醒目樣式。
-->

---
layout: default
---

# 完整解答 — sidenav-menu.component.scss（二）

工具列與目前頁面的醒目樣式：

```scss
.menu-toolbar {
  position: sticky;
  top: 0;
  z-index: 10;
}

.menu-content {
  padding: 24px;
}

::ng-deep .active-link {
  background: rgba(94, 173, 160, 0.12) !important;
  color: #5eada0 !important;
  font-weight: 600;
  border-radius: 8px;
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
⚠️ <b>易錯點：</b> <code>routerLinkActive</code> 加上去的 class 是套在元件外層產生的元素上，一般 <code>.active-link</code> 選擇器可能吃不到樣式，需要 <code>::ng-deep</code> 才能穿透 Angular 的樣式封裝。
</div>

<!--
menu-toolbar 加上 position: sticky，往下捲動頁面時工具列會固定在頂部，這也是現代網頁常見的做法。menu-content 加一點 padding，讓內容不要貼邊。最後 .active-link 就是搭配上一頁 routerLinkActive="active-link" 的樣式：目前所在的頁面連結會有淡綠色底色跟文字色、字重加粗、圓角，一眼就能看出使用者現在在哪一頁，這比什麼提示都沒有的純文字清單更符合現代網頁的使用體驗。
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

