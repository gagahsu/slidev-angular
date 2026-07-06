---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Tabs
routeAlias: ch40
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
    Tabs
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用索引標籤在同一頁面切換多個視圖」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來學 Tabs（索引標籤）。

大家平常用的網站或 App，是不是常常在同一個畫面上看到好幾個標籤可以切換，像是設定頁面有「帳號」「隱私」「通知」這幾個分頁？如果每個分類都要開一個新頁面，使用者會覺得很麻煩，切換也不流暢。Tabs 這個 UI 元件解決的就是這個問題——在同一個畫面內，用點擊標題的方式切換不同內容。

學完這一章，大家會知道 Angular Material 提供的兩種頁籤元件怎麼用，一種是純靜態內容的 mat-tab-group，另一種是可以跟路由整合的 mat-tab-nav-bar。
-->

---
layout: default
---

# Outline

- **什麼是 Tabs？** — 索引標籤的概念與應用場景
- **mat-tab-group 基本用法** — 靜態內容頁籤
- **mat-tab-nav-bar 導覽列用法** — 與路由整合的動態頁籤
- **TypeScript 設定** — 匯入模組、定義 links 與 activeLink
- **HTML 完整整合** — 綁定路由與 active 狀態
- **完成畫面展示** — 頁籤切換成功

<!--
這張投影片先讓大家看一下今天的路線圖。我們會先從概念切入，了解 Tabs 是什麼、用在哪些場景，接著看最簡單的 mat-tab-group 靜態用法，然後進到跟路由整合的 mat-tab-nav-bar，中間會帶大家看 TypeScript 設定跟 HTML 完整整合，最後看一下實際跑起來的成果畫面。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Tabs？
# What Are Tabs?

<!--
我們先花一點時間建立 Tabs 的基本概念，之後看程式碼的時候才知道每個元件在解決什麼問題。
-->

---
layout: two-cols
---

# 什麼是 Tabs？

Tabs（索引標籤）是一種常見的 UI 元件，廣泛應用於網頁導覽、設定介面和表單中。

**核心概念**

- 在同一頁面中切換多個視圖
- 同一時間只顯示一個頁籤的內容
- 使用者點擊標籤標題來切換

**常見應用場景**

- 網頁導覽列 / 設定介面分類
- 表單多步驟切換 / 儀表板資料視圖

::right::

<div class="flex items-center justify-center h-full">
  <img src="/images/39-tabs/tabs-concept-overview.png" class="rounded shadow-md max-h-80" />
</div>

<!--
Tabs（索引標籤）其實大家在生活中天天都會遇到，最直接的比喻就是資料夾的分類標籤——同一個抽屜裡放了很多資料夾，每個資料夾有自己的標籤名稱，我們要看哪一類資料，就抽出對應的那一份，其他的先收起來不看。網頁上的 Tabs 也是同樣的道理，同一時間只顯示一個頁籤的內容，其他都先隱藏。

大家可以看到右邊這張圖，核心概念就是：在同一個頁面切換多個視圖，使用者點擊標題就能切換。這在業界實務上非常常見，像是網頁的設定介面分類、表單的多步驟填寫、儀表板的多個資料視圖，都會用到 Tabs 這個元件。

接下來我們就實際動手，看 Angular Material 提供的兩種頁籤元件怎麼實作。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-tab-group 基本用法
# Basic Tab Group

<!--
我們先從最簡單的 mat-tab-group 開始，這是純靜態內容的頁籤寫法，還沒有牽涉到路由整合，讓大家先熟悉基本語法。
-->

---

# mat-tab-group — 官方範例

Angular Material 的 `mat-tab-group` 提供靜態頁籤切換，畫面有 First、Second、Third 三個頁籤。

<div class="flex justify-center">
  <img src="/images/39-tabs/mat-tab-group-basic-demo.png" class="rounded shadow-md max-h-80" />
</div>

參考：**https://material.angular.io/components/tabs/overview**

<!--
這張投影片的目的是讓大家先看到 mat-tab-group 跑起來長什麼樣子，官方範例裡有 First、Second、Third 三個頁籤，畫面上大家可以看到點擊不同標題會切換內容。

這是 Angular Material 官網的展示畫面，大家之後也可以直接連到這個網址，官網上有互動範例可以自己玩玩看，這也是我們平常查元件用法時很常用的參考資源。

看完效果之後，我們來看實際的 HTML 要怎麼寫。
-->

---

# mat-tab-group — HTML 語法

使用 `<mat-tab-group>` 包裹多個 `<mat-tab>`，`label` 屬性設定頁籤名稱，標籤內容直接寫在標籤內部。

```html
<mat-tab-group>
  <mat-tab label="First"> Content 1 </mat-tab>
  <mat-tab label="Second"> Content 2 </mat-tab>
  <mat-tab label="Third"> Content 3 </mat-tab>
</mat-tab-group>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 此寫法適合頁籤內容為純文字的靜態情境。若需與路由整合，應改用 <code>mat-tab-nav-bar</code>。
</div>

<!--
這段範例的目的是讓大家看到 mat-tab-group 最基本的 HTML 寫法，重點就是用 mat-tab-group 包住多個 mat-tab，每個 mat-tab 的 label 屬性設定標題文字，內容直接寫在標籤內部。

大家可以看到，這個寫法非常單純，Content 1、Content 2、Content 3 直接寫死在 HTML 裡面，沒有任何動態綁定。

⚠️ 提醒大家，這種寫法適合內容是固定文字的靜態情境。如果我們的頁籤內容其實是不同的路由頁面，需要跟著網址切換，這種寫法就不太適合了，接下來我們要看的 mat-tab-nav-bar 才是專門處理路由整合的元件。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# mat-tab-nav-bar 導覽列用法
# Tab Nav Bar with Router

<!--
接下來我們進入這一章的重點：mat-tab-nav-bar。這個元件跟前面的 mat-tab-group 最大的差別，就是它可以跟 Angular 的路由系統整合，讓每個頁籤對應到不同的網址。
-->

---

# mat-tab-nav-bar — 概念說明

`mat-tab-nav-bar` 是與路由整合的頁籤導覽列，適合多頁路由切換場景。

| 元件／指令 | 說明 |
|---|---|
| `mat-tab-nav-bar` | 頁籤導覽列容器，套用 Material 樣式 |
| `[tabPanel]` | 綁定對應的 `<mat-tab-nav-panel>` |
| `mat-tab-link` | 每個頁籤連結，套用 Material 樣式 |
| `[active]` | 判斷此連結是否為當前作用中頁籤 |
| `[routerLink]` | 綁定路由路徑 |
| `mat-tab-nav-panel` | 頁籤內容顯示區，搭配 `#tabPanel` 樣板變數 |

<!--
mat-tab-nav-bar 白話來說，就是「長得像頁籤，但其實是導覽列」。大家可以把它想成餐廳menu上的分類標籤，點「主餐」「飲料」「甜點」其實是切換到不同的頁面內容，只是用頁籤的樣式呈現，這就是它跟一般 mat-tab-group 最大的不同——內容不是寫死的，而是隨路由切換。

這張表列出的元件跟屬性大家先有個印象就好，等一下看實際程式碼的時候我們會一一對應：mat-tab-nav-bar 是外層容器，mat-tab-link 是每個連結，[active] 判斷目前作用中的是哪一個，[routerLink] 負責綁定路由路徑，mat-tab-nav-panel 則是內容顯示的地方。

業界實務上，這種寫法很常用在後台管理系統的頂部導覽，或是同一個功能模組底下有多個子頁面的情境。
-->

---

# mat-tab-nav-bar — HTML 結構 (一)

基本導覽列結構：`<nav>` 內透過 `@for` 迴圈產生頁籤連結，並搭配一個停用的 `Disabled Link`。

```html
<nav mat-tab-nav-bar [tabPanel]="tabPanel">
  @for (link of links; track link) {
    <a mat-tab-link
       (click)="activeLink = link"
       [active]="activeLink == link"> {{link}} </a>
  }
  <a mat-tab-link disabled>Disabled Link</a>
</nav>
<mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> <code>@for</code> 迴圈依據 TypeScript 中定義的 <code>links</code> 陣列產生對應數量的頁籤。若 TS 尚未定義 <code>links</code>，程式會報錯。
</div>

<!--
這段範例的目的是先看 mat-tab-nav-bar 最基本的結構，還沒有整合路由，先讓大家熟悉 @for 迴圈跟頁籤元件怎麼搭配。

大家看一下這段程式碼，nav 標籤上加了 mat-tab-nav-bar，並且用 [tabPanel] 綁定下面的 mat-tab-nav-panel。裡面用 @for 迴圈跑過 links 陣列，每個 link 產生一個 mat-tab-link，點擊的時候把 activeLink 設成目前這個 link，[active] 就用來判斷這個連結是不是目前作用中的。最後還加了一個 disabled 的連結，示範停用狀態長什麼樣子。

⚠️ 易錯點是這裡的 links 陣列必須先在 TypeScript 裡定義好，@for 才有資料可以跑，如果忘記定義，畫面就會直接報錯，這是等一下我們到 TypeScript 設定那一段要處理的事情。

這一版還只是單純的 UI 切換，還沒有真的換頁面，下一頁我們就要把它跟路由串起來。
-->

---

# mat-tab-nav-bar — HTML 結構 (二)

整合路由後，`[routerLink]` 綁定路徑，`[active]` 比對 `link.name`，`<router-outlet>` 顯示對應路由內容。

```html
<nav mat-tab-nav-bar [tabPanel]="tabPanel">
  @for (link of links; track link) {
    <a mat-tab-link
       (click)="activeLink = link.name"
       [routerLink]="link.path"
       [active]="activeLink == link.name"> {{link.name}} </a>
  }
  <a mat-tab-link disabled>Disabled Link</a>
</nav>
<mat-tab-nav-panel #tabPanel>
  <router-outlet></router-outlet>
</mat-tab-nav-panel>
```

<!--
這段範例的目的是把上一頁的基礎結構，正式跟路由串起來，這才是 mat-tab-nav-bar 真正發揮價值的地方。

大家可以比對一下跟上一頁的差異：(click) 現在設定的是 activeLink = link.name，多了 [routerLink]="link.path" 綁定實際的路由路徑，[active] 的判斷條件也改成比對 link.name。最後在 mat-tab-nav-panel 裡面放進 router-outlet，這樣點擊頁籤的時候，Angular Router 就會把對應的路由元件渲染到這個位置。

⚠️ 提醒大家，link 現在是個物件（有 path 跟 name 兩個屬性），跟前一頁單純的字串陣列不一樣，這邊的綁定要對應清楚，不要搞混 link 跟 link.name。

執行後，點擊不同頁籤，網址列會跟著改變，router-outlet 的位置也會顯示對應路由的內容，就像我們平常在做多頁應用程式一樣，只是用頁籤的樣式呈現導覽。
-->

---

# mat-tab-nav-bar — 屬性說明

| 屬性／事件 | 位置 | 說明 |
|---|---|---|
| `mat-tab-nav-bar` | `<nav>` | 套用 Material 頁籤導覽列樣式 |
| `[tabPanel]="tabPanel"` | `<nav>` | 將導覽列與下方面板做綁定 |
| `mat-tab-link` | `<a>` | 套用 Material 頁籤連結樣式 |
| `(click)="activeLink = link.name"` | `<a>` | 點擊後更新 activeLink |
| `[routerLink]="link.path"` | `<a>` | 導向對應的路由路徑 |
| `[active]="activeLink == link.name"` | `<a>` | 判斷是否為作用中頁籤，成立時顯示底線 |
| `disabled` | `<a>` | 停用此頁籤連結 |

<!--
這張投影片幫大家把前兩頁看過的屬性做個總整理，我們不逐行講解，重點抓幾個大家比較容易搞混的地方。

[tabPanel] 跟 [active] 是最關鍵的兩個，一個負責把導覽列跟內容面板綁在一起，一個負責控制哪個頁籤要顯示底線效果。(click) 跟 [routerLink] 則是分工合作——[routerLink] 負責真正導向路由，(click) 負責更新我們自己追蹤的 activeLink 狀態，兩個要同時設定，缺一不可。

大家可以把這張表當作之後複習的參考卡，忘記某個屬性做什麼的時候回來查一下就好。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# TypeScript 設定
# TypeScript Configuration

<!--
講完 HTML 的部分，我們接著回到 TypeScript，看看要匯入哪些模組、定義哪些變數，這一段的內容才是讓前面的 HTML 真正能跑起來的關鍵。
-->

---

# 步驟一：匯入 MatTabsModule

在元件的 TypeScript 檔中匯入 `MatTabsModule` 並加入 `imports` 陣列。

```typescript
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // 下一步定義 links 與 activeLink
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 若使用 <code>[routerLink]</code>，需同時匯入 <code>RouterLink</code>；使用 <code>&lt;router-outlet&gt;</code> 則需匯入 <code>RouterOutlet</code>。
</div>

<!--
這段範例的目的是讓 mat-tab-nav-bar 具備可以使用的能力，跟我們之前學 ngClass 要先匯入 CommonModule 是同樣的道理——用什麼功能，就要匯入對應的模組。

大家看一下 imports 陣列，這裡我們同時匯入了三個東西：MatTabsModule 讓我們能用 mat-tab-nav-bar 相關的元件跟指令，RouterLink 讓 [routerLink] 這個綁定能生效，RouterOutlet 讓 router-outlet 這個標籤能運作。

⚠️ 易錯點是很多同學只記得匯入 MatTabsModule，卻忘了 RouterLink 跟 RouterOutlet，這樣即使 HTML 寫得完全正確，畫面還是會報錯或無法正常渲染，因為 standalone 元件的每個模板功能都要各自宣告要用的模組。

匯入完成之後，下一步我們就要在這個元件類別裡定義實際的資料。
-->

---

# 步驟二：定義 links 與 activeLink

在元件類別中定義頁籤資料陣列 `links` 與目前作用中頁籤 `activeLink`。

```typescript
links = [
  { path: '/test',  name: 'TEST'  },
  { path: '/test2', name: 'TEST2' },
  { path: '/test3', name: 'TEST3' }
];

activeLink = this.links[0].name;
```

- `links`：每個物件包含路由路徑 `path` 與顯示名稱 `name`
- `activeLink`：初始值設為第一個頁籤的名稱
- 路由設定（`app.routes.ts`）需有對應的路由才能正常切換

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>activeLink</code> 與 HTML 中 <code>[active]="activeLink == link.name"</code> 的比對邏輯需一致，才能正確顯示底線。
</div>

<!--
這段範例的目的是把 HTML 裡 @for 迴圈需要的資料真正定義出來，links 陣列就像是我們的「頁籤名單」，每一筆資料告訴 Angular 這個頁籤要顯示什麼名稱、要對應哪個路由路徑。

大家可以看到，links 是一個物件陣列，每個物件都有 path 跟 name 兩個屬性；activeLink 則初始設成第一筆資料的名稱，代表頁面一開始載入時，預設作用中的是第一個頁籤。

⚠️ 提醒大家兩個容易漏掉的地方：第一，activeLink 的比對邏輯要跟 HTML 裡 [active] 的寫法一致，不然底線效果不會正確顯示；第二，這裡的 path 要跟 app.routes.ts 裡實際設定的路由路徑對得起來，路徑打錯的話點擊頁籤會導向不存在的路由。

定義完這兩個變數，我們的 TypeScript 設定就完成了，接下來看一下整合起來的完整效果。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 完成畫面展示
# Final Result

<!--
最後我們來看整合完成後實際跑起來的樣子，驗證一下前面所有設定是不是都串接正確。
-->

---

# 完成畫面

整合路由後，頁籤切換正常，點擊不同頁籤會導向對應路由，作用中頁籤顯示藍色底線，停用頁籤呈灰色。

<div class="flex justify-center">
  <img src="/images/39-tabs/mat-tab-nav-bar-final-result.png" class="rounded shadow-md max-h-80" />
</div>

<!--
大家看一下這張成果圖，這就是我們前面所有設定加起來之後的實際效果：點擊不同頁籤會導向對應的路由，網址也會跟著改變，作用中的頁籤下方會顯示藍色底線，被停用的頁籤則呈現灰色、無法點擊。

預期結果就是這樣——如果大家自己動手做的時候畫面跟這個不一樣，通常就是某個綁定漏掉了，可以回頭檢查 imports 陣列、links 資料，還有 [active] 的比對邏輯。

看到這個畫面，就代表我們已經成功把 mat-tab-nav-bar 跟路由整合起來了，接下來我們用一張流程表把整個步驟總結一下。
-->

---

# mat-tabs 完整使用流程

| 步驟 | 說明 |
|---|---|
| 1 | 在 `.ts` 中 `import { MatTabsModule }` 並加入 `imports` |
| 2 | 同時匯入 `RouterLink`、`RouterOutlet` |
| 3 | 定義 `links` 陣列（含 `path` 與 `name`）及 `activeLink` 初始值 |
| 4 | 在 HTML 使用 `<nav mat-tab-nav-bar>` + `@for` 迴圈產生 `<a mat-tab-link>` |
| 5 | 綁定 `[routerLink]`、`(click)`、`[active]` 屬性 |
| 6 | 在 `<mat-tab-nav-panel>` 內放置 `<router-outlet>` |
| 7 | 確認 `app.routes.ts` 有對應路由設定 |

<!--
這張投影片幫大家把今天學的整合流程，濃縮成七個步驟，之後大家自己動手做的時候，可以直接照這張表一步一步核對。

從匯入模組、定義資料，到 HTML 綁定，再到確認路由設定，這七步環環相扣，只要漏了一步，畫面通常就會出現前面提過的那些錯誤，像是白畫面、報錯或是底線不顯示。

大家可以把這張表存起來，之後遇到類似需求時直接參考，不用重新從頭想一次邏輯。
-->

---
layout: end
---

# 課程結束
### 使用 mat-tabs 與路由整合，打造流暢的多頁籤導覽體驗

<!--
好，這一章 Tabs 就到這邊。我們從 Tabs 的基本概念開始，看了純靜態的 mat-tab-group，接著深入學了跟路由整合的 mat-tab-nav-bar，包含 TypeScript 設定跟 HTML 完整綁定，最後也看到實際跑起來的成果畫面。

大家現在應該能夠說出「我學會了 Tabs」——知道怎麼用 Angular Material 的頁籤元件，打造出跟路由整合、切換流暢的多頁籤導覽介面。這個技巧在實務上很常用，尤其是後台管理系統或多步驟功能模組，大家可以多練習幾次熟悉整個流程。
-->

