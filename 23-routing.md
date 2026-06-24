---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 路由
routeAlias: ch22
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
    路由
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「不換頁，只換畫面」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎來到「路由（Routing）」的主題！
之前我們把網頁拆成一個個積木，也在同個頁面玩了半天等級計算機。
但這就像是你買了一間透天厝，結果你所有的活動、睡覺、廚房、衛浴，通通都塞在客廳，這像話嗎？
我們當然要上樓去房間、去廚房啊！
今天，我們就要來學習 Angular 路由系統。
它是我們網頁的「傳送門與隔間設計圖」，有了它，你的網頁才能在多個頁面之間自由穿梭！
-->

---
layout: default
---

# Outline

- **什麼是 Routing？** — SPA 與傳統瀏覽流程差異
- **設定路由** — app.routes.ts 與 app.config.ts
- **定義路線** — path、component、錯誤頁、重新導向、嵌套路由
- **HTML 導航** — RouterOutlet、RouterLink、RouterLinkActive
- **TS 導航** — 注入 Router 程式切換
- **網址帶值** — Route Params 與 Query Params
- **實作練習**

<!--
今天我們的傳送作戰計畫如下：
先了解什麼是單頁應用（SPA）與傳統多頁網頁的對決。
接著學會怎麼在專案裡設定路由表，並且定義我們的「路線地圖」，包含處理找不到路時的 404 頁面與子路徑嵌套。
隨後，我們學習在 HTML 和 TS 代碼裡呼叫傳送門的方法。
最後，看看怎麼透過網址偷偷帶小抄（傳遞資料）到下一頁，並完成基本路由與嵌套路由的實戰練習！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是路由？
# What is Routing?

<!--
第一站，我們先來戳破傳統換頁的騙局，看看為什麼現代網頁切換速度可以這麼快。
-->

---

# 傳統瀏覽器流程

當使用者輸入 URL 並按確認，瀏覽器會依以下流程取得新頁面：

| 步驟 | 說明 |
| --- | --- |
| 1. URL | 使用者輸入網址 |
| 2. HTTP | 瀏覽器向服務端發送 HTTP 請求 |
| 3. HTML | 服務端回傳 HTML 格式內容 |
| 4. Render | 瀏覽器渲染出畫面 |

每次換頁都需要向伺服器請求新的 HTML，整頁重新載入。

<!--
你想看，以前讀大學的時候，點進某些傳統選課網站，點一個按鈕，整個網頁就「白畫面」一下，轉圈圈轉了三秒鐘才出現新網頁。
這就是「傳統瀏覽器的換頁流程」。
你每次點個連結，瀏覽器就像個外送員一樣，重新跑去伺服器下載整套 HTML，再全部重新渲染。
這不僅浪費後端頻寬，使用者的體驗也差到極限。
要是搶課搶不到，真的會讓人想砸螢幕！
-->

---

# 什麼是 Routing？

在**單頁應用程式（SPA）**中，不再向伺服器請求新頁面，而是透過顯示或隱藏特定元件來改變使用者所見的內容。

| 傳統網站 | SPA（Angular） |
| --- | --- |
| 每次換頁都向伺服器請求 HTML | 只載入一次 HTML，透過 JS 切換畫面 |
| 整頁重新載入，速度較慢 | 只更換元件，速度較快 |
| URL 改變 → 完整頁面重載 | URL 改變 → 元件切換，畫面局部更新 |

Angular Router 透過**解讀瀏覽器 URL** 來決定顯示哪個元件。

<!--
而 Angular 採用的是「SPA（單頁應用程式）」的架構。
這就像是我們去逛大型百貨公司。
我們只需要「開門走進來一次」（載入一次 index.html）。
之後想看服飾、想吃美食，我們不用重新進百貨公司大門，我們只需要坐電梯到對應的樓層（切換 Component 顯示）就行了！
網頁的網址會變，但其實背後根本沒有換檔案，只是 Angular 在悄悄把舊積木收起來、把新積木擺出來。
這切換速度簡直是瞬移，使用者體驗無痛升級！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 設定路由
# Setup Routing

<!--
那我們要怎麼在 Angular 裡把這張百貨公司的樓層地圖（路由）設定好呢？
-->

---

# 如何使用 Routing？

建立專案後，新增兩個元件 `first` 與 `second`：

```bash
ng new my-app --routing
ng g c first
ng g c second
```

接著到 `app.routes.ts` 匯入這兩個元件，準備定義路線：

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

export const routes: Routes = [];
```

<!--
當我們用 CLI 建立專案時，如果加上了 `--routing` 參數，它就會自動幫我們生出 `app.routes.ts` 路由表檔案。
為了說明，我們用 CLI 產生兩個新積木：`first` 和 `second`。
然後，打開 `app.routes.ts`，把這兩個元件 import 進來。
接下來，我們就可以準備在空空的 `routes` 陣列裡，為他們指引明路了。
-->

---

# 確認 app.config.ts

確認路由是否正確載入：打開 `app.config.ts`，確認 `routes` 有被加入 `provideRouter()` 中。

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 Angular CLI 建立專案時會自動設定好，若是手動新增路由才需要自行處理。
</div>

<!--
在出發定義路線之前，大叔先帶大家做個安檢：
去打開 `app.config.ts`。
看看 providers 陣列裡面，有沒有一行 `provideRouter(routes)`？
這行代碼就是在告訴 Angular 引擎：「請把我們剛剛寫的路由地圖，灌進整個系統的血管裡！」
一般 CLI 會幫你寫好，但如果你之後手動寫路由遇到奇怪的紅字，記得先來這裡檢查這條神經有沒有接通！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 定義路線
# Define Routes

<!--
好，神經接通了，我們馬上來畫路線圖！
-->

---

# 定義基本路線

路由設定由三個基礎建構組成：

| 步驟 | 說明 |
| --- | --- |
| 1. 設定路線陣列 | Angular CLI 建立專案時已自動新增 |
| 2. 在陣列中定義路線 | 設定 `path` 與對應的 `component` |
| 3. 將路線加入程式中 | 在 HTML 或 TS 中使用路由導航 |

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'first',  component: FirstComponent },
  { path: 'second', component: SecondComponent },
];
```

<!--
定義路線的寫法非常直覺：
在 `routes` 陣列中塞入一個個大括號的物件。
裡面包含兩個主要鑰匙：
`path` 指的是網址後面的名字，比如 `/first`、`/second`，**注意這裡不要寫斜線 `/` 喔，直接寫字串就行了**。
`component` 則是指當使用者切到這個網址時，你要把哪一個積木呈現在畫面上。
設定完這兩行，地圖的主幹線就拉好了！
-->

---

# 錯誤頁面（404）

當 URL 不符合任何已定義路徑時，顯示錯誤頁面。使用萬用字元 `**` 作為路徑。

```typescript
// app.routes.ts
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'first',  component: FirstComponent },
  { path: 'second', component: SecondComponent },
  { path: '**',     component: NotFoundComponent }, // 必須放最後
];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> <code>**</code> 必須寫在陣列<b>最下面</b>，否則上面的路線將無法正常顯示。
</div>

<!--
「大叔，那要是使用者在網址列亂打，打了一個我們根本沒設定過的路徑呢？」
這時候如果什麼都沒寫，網頁就會顯示一片空白，或者是 console 瘋狂噴錯。
所以，我們必須做防呆！
我們在路由表的最後一行，加上一個 `path: '**'`（雙星號）。
這個雙星號在路由裡代表「萬用字元（任何路徑）」。
只要前面沒有人匹配成功的，通通都會被這顆網民黑洞吸進來，送到 `NotFoundComponent`（錯誤頁）。
大叔千叮嚀萬交代：**這個雙星號萬用路由，一定要寫在整個 routes 陣列的最尾巴**！
如果你把它寫在最上面，因為它匹配任何路徑，後面的 `first`、`second` 就永遠都不會被匹配到，所有人一點進來都直接被送去 404 頁面，那就太悲劇了！
-->

---

# 設定重新導向

讓特定 URL 自動跳轉到另一個頁面，使用 `redirectTo` + `pathMatch`。

| `pathMatch` 值 | 說明 | 範例 |
| --- | --- | --- |
| `'full'` | URL 需與 `path` 完全一致才導向 | `path: ''` 只匹配根路徑 |
| `'prefix'` | URL 以 `path` 開頭就導向 | `path: 'bbb'` 匹配 `/bbb/aaa` |

```typescript
export const routes: Routes = [
  { path: '',     redirectTo: '/first', pathMatch: 'full' },
  { path: 'first',  component: FirstComponent },
  { path: 'second', component: SecondComponent },
  { path: '**',     component: NotFoundComponent },
];
```

<!--
「大叔，那如果使用者一開點進來只輸入域名，後面空空的（根路徑），我該讓他看什麼？」
這時候我們就需要用「重新導向（Redirect）」。
我們寫 `path: ''`（空字串路徑），然後設定 `redirectTo: '/first'`，也就是當他一進來，我們立刻把他傳送到 `/first` 頁面。
後面還要加上一個 `pathMatch: 'full'`。
這是在告訴 Angular：「必須是網址完全空空如也時才觸發重新導向，不能只是開頭是空字串就觸發。」
這樣寫，可以避免系統陷入無限跳轉的鬼打牆狀態！
-->

---

# 嵌套路由（子路由）

想在某個元件內部再有下一層路由（例如 根元件 → first → child-a），使用 `children` 定義子路由。

```typescript
// app.routes.ts
import { ChildAComponent } from './first/child-a/child-a.component';

export const routes: Routes = [
  {
    path: 'first',
    component: FirstComponent,
    children: [
      { path: 'child-a', component: ChildAComponent }
    ]
  },
  { path: 'second', component: SecondComponent },
];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 子路由的 <code>&lt;router-outlet&gt;</code> 要放在父元件（FirstComponent）的 HTML 中。
</div>

<!--
更高級的玩法是「嵌套路由（子路由）」。
這就像是：點進「會員專區（/first）」，裡面又分「基本資料（/child-a）」和「修改密碼」。
這時候我們不用在頂層寫好幾條長路徑。
我們可以直接在 `first` 的路徑大括號裡，加開一個 `children: []` 陣列！
在裡面繼續定義子路徑。
注意喔！子路由的 `path` 只需要寫最後的名字（比如 `child-a`），不用重複寫 `first/child-a`，Angular 會非常聰明地幫你拼接！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 頁面導航
# Navigation

<!--
地圖畫好了，接下來我們要來做 HTML 畫面上的導航連結，讓使用者可以用滑鼠點點點來換頁。
-->

---

# HTML 導航 — 匯入三個模組

使用 HTML 進行頁面導航前，需將以下三個模組加入元件的 `imports`：

| 模組 | 功能 |
| --- | --- |
| `RouterOutlet` | 在 HTML 中使用 `<router-outlet>` 顯示路由內容 |
| `RouterLink` | 在 HTML 中使用 `routerLink` 設定導航路徑 |
| `RouterLinkActive` | 在 HTML 中使用 `routerLinkActive` 設定當前頁 CSS |

```typescript
// app.component.ts
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {}
```

<!--
在 HTML 寫導航之前，因為新版 Angular 是 Standalone Component。
所以，你必須在你元件的 `imports` 陣列中，把路由的三大金剛匯進來：
`RouterOutlet`：用來開天窗顯示畫面的。
`RouterLink`：用來設定跳轉網址的。
`RouterLinkActive`：用來做選單高亮效果的。
漏了任何一個，你的 HTML 就會直接裝死給你看喔！
-->

---

# RouterOutlet

`<router-outlet>` 是路由的**顯示容器**，切換頁面時，對應元件的內容會渲染在此標籤的位置。

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/first">第一頁</a>
  <a routerLink="/second">第二頁</a>
</nav>

<!-- 路由元件渲染在這裡 -->
<router-outlet></router-outlet>
```

<!--
第一個是 `<router-outlet>`。
大叔把它生動地比喻成「天窗」。
你在 `app.component.html` 裡擺了這行標籤。
當使用者切換到 `/first` 時，`FirstComponent` 的內容就會從這個天窗降落、塞進這個位置。
切換到 `/second` 時，舊內容會飛走，新內容又會降落。
所以，沒有這個天窗，你的元件是根本沒有地方顯示的喔！
-->

---

# RouterLink

`routerLink` 屬性指定要切換的路由路徑，可用於任何 HTML 標籤（`<a>`、`<button>`、`<h1>` 等）。

```html
<!-- 使用 <a> 超連結 -->
<a routerLink="/first">前往第一頁</a>

<!-- 使用 <button> 按鈕 -->
<button routerLink="/second">前往第二頁</button>

<!-- 動態路徑：用 [routerLink] 搭配變數 -->
<a [routerLink]="['/first', userId]">查看使用者</a>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 建議根據操作邏輯選擇標籤，導覽連結用 <code>&lt;a&gt;</code>，觸發動作用 <code>&lt;button&gt;</code>。
</div>

<!--
第二個是 `routerLink`。
在 SPA 網頁中，我們**絕對不要用原生的 `<a href="...">`**！
因為 `href` 會強迫瀏覽器重新載入整頁，直接摧毀 SPA 的秒切優勢。
我們一律要把 `href` 改寫成 `routerLink`！
它可用於 `<a>` 標籤、也可寫在 `<button>` 上。
如果是要傳變數的動態路徑，我們就用中括號 `[routerLink]="['/first', userId]"`。
這樣一來，Angular 就會接管點擊事件，在不重載網頁的前提下，優雅地換頁。
-->

---

# RouterLinkActive

當目前 URL 與 `routerLink` 路徑相符時，自動套用指定的 CSS class。需與 `routerLink` 搭配使用。

```html
<a routerLink="/first"  routerLinkActive="active-link">第一頁</a>
<a routerLink="/second" routerLinkActive="active-link">第二頁</a>

<router-outlet></router-outlet>
```

```css
/* 當前頁面連結的樣式 */
.active-link {
  color: #5eada0;
  font-weight: bold;
  border-bottom: 2px solid #5eada0;
}
```

<!--
第三個是 `routerLinkActive`。
你看很多網站，當你點進「首頁」時，首頁按鈕會變綠色或加底線，這叫選單高亮。
Angular 幫我們寫好這個高難度功能了！
我們在 HTML 寫上 `routerLinkActive="active-link"`。
只要網址匹配到這個連結，Angular 就會自動在這個標籤上追加 `active-link` 這個 CSS class。
我們只要在 CSS 裡給這個 class 寫好顏色，高亮效果就自動完成了！
省下了我們自己用 JS 判定網址的麻煩，非常香！
-->

---

# TS 導航 — 注入 Router

當換頁需要依據邏輯判斷（例如登入後跳轉），使用 TypeScript 程式導航。首先注入 `Router`：

```typescript
// app.component.ts
import { Router } from '@angular/router';

@Component({ standalone: true, imports: [RouterOutlet] })
export class AppComponent {
  constructor(private router: Router) {}

  goToFirst() {
    this.router.navigate(['/first']);
  }
}
```

<!--
「大叔，那如果我是要在按鈕按下後，先做 API 檢查，檢查通過才跳轉，這就不能在 HTML 寫死 routerLink 了吧？」
沒錯！這時候我們就必須在 TypeScript 大腦裡用寫程式的方式切換。
第一步：在 constructor 裡「注入 `Router` 服務」。
接著在方法內部呼叫 `this.router.navigate(...)`。
這樣你就能在程式碼跑完任何判斷邏輯後，隨心所欲地控制跳轉了！
-->

---

# TS 導航 — 切換頁面

注入 Router 後，使用 `this.router.navigate()` 或 `navigateByUrl()` 切換頁面。

| 方法 | 語法 | 說明 |
| --- | --- | --- |
| `navigate()` | `this.router.navigate(['/path'])` | 使用陣列傳入路徑 |
| `navigateByUrl()` | `this.router.navigateByUrl('/path')` | 直接傳入字串路徑 |

```typescript
// 兩種寫法效果相同
this.router.navigate(['/second']);
this.router.navigateByUrl('/second');
```

<!--
用程式碼導航，有兩種常用寫法：
第一種是 `this.router.navigate(['/second'])`，裡面傳的是陣列。
第二種是 `this.router.navigateByUrl('/second')`，直接傳字串網址。
兩者效果完全相同，看你個人的習慣。
大叔自己比較喜歡第一種，因為如果有要帶動態參數，陣列寫法會比較清晰好維護。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 網址帶值
# Route Parameters

<!--
接下來，我們來看看怎麼在跳轉時，像夾帶小抄一樣把資料帶到下一頁去。
-->

---

# 網址帶值 — 兩種方式

切換頁面時可將資料塞入網址，另一頁再從網址取出，適合傳遞簡單值（如 ID、使用者名稱）。

| 方式 | 範例網址 | 說明 |
| --- | --- | --- |
| Route Params | `/list/Allen` | 在 router.ts 設定 `/:name` |
| Query Params | `/list?name=Allen` | 網址後直接加 `?key=value` |

兩種方式都不需透過 Service 傳遞，但不適合傳遞大量或複雜的資料。

<!--
網址帶值，江湖上有兩大流派：
第一流派叫 `Route Params`（路徑參數）：
網址長成像 `/list/Allen` 這樣，參數變成了網址路徑的一部分。這需要去路由表設定變數。
第二流派叫 `Query Params`（查詢參數）：
網址後面掛個問號 `?name=Allen`。這不需要改路由表，隨插即用。
這兩招都很適合傳遞簡單的 ID 或搜尋關鍵字，但如果是複雜的大資料，記得不要塞在網址裡，網址是會長度爆炸的喔！
-->

---

# Route Params — 設定路由

在 `app.routes.ts` 的路徑後面加上 `/:參數名稱`，可帶多個參數。

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'list',        component: ListComponent },      // 不帶值
  { path: 'list/:name',  component: ListComponent },      // 帶一個值
  { path: 'list/:name/:age', component: ListComponent },  // 帶多個值
];
```

導航時在路徑後帶上值：

```typescript
// 導航到 /list/Allen
this.router.navigate(['/list', 'Allen']);
```

<!--
我們先看 `Route Params` 的玩法。
首先，在 `app.routes.ts` 裡，路徑後面加上一個冒號 `/:name`。
這個冒號就是「預留坑位」的意思。
當我們呼叫 `navigate(['/list', 'Allen'])` 時。
Allen 這個字串就會自動塞進 `:name` 這個坑位，網址就會變成 `/list/Allen`。
你也可以預留多個坑位，比如 `/:name/:age`，用起來非常靈活。
-->

---

# Route Params — 取值

在目標元件中注入 `ActivatedRoute`，使用 `snapshot.paramMap.get()` 取出值。

```typescript
// list.component.ts
import { ActivatedRoute } from '@angular/router';

export class ListComponent {
  name: string | null = '';

  constructor(private route: ActivatedRoute) {
    this.name = this.route.snapshot.paramMap.get('name');
  }
}
```

```html
<p>使用者名稱：{{ name }}</p>
```

<!--
資料帶過去了，下一頁要怎麼把小抄打開？
首先，在下一頁元件的建構式裡注入 `ActivatedRoute`。
這個服務可以用來取得當前路線的狀態。
接著，我們呼叫 `this.route.snapshot.paramMap.get('name')`。
這行落落長的指令，就是「在這一瞬間的路徑地圖快照裡，把叫 name 的變數值拔出來」！
這樣我們就能在畫面上顯示出「使用者名稱：Allen」囉！
-->

---

# Query Params — URL 寫法

不需修改 `app.routes.ts`，直接在網址後加上 `?key=value`，多個值用 `&` 分隔。

```typescript
// 導航到 /list?name=Allen&age=12
this.router.navigate(['/list'], {
  queryParams: { name: 'Allen', age: 12 }
});
```

```html
<!-- routerLink 寫法 -->
<a [routerLink]="['/list']" [queryParams]="{ name: 'Allen' }">前往</a>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> Query Params 取出的值皆為 <code>string</code> 型別，使用時需自行轉換型別。
</div>

<!--
再來是 `Query Params` 問號流派。
這招不需要去改 `app.routes.ts`。
我們直接在 `navigate` 時，傳入第二個參數物件，在裡面寫 `queryParams: { name: 'Allen', age: 12 }`。
網址就會被自動組合成 `?name=Allen&age=12`。
如果在 HTML 裡，就寫成 `[queryParams]="{ name: 'Allen' }"`。
這招非常適合用在商品列表的「篩選器」或者「搜尋框」跳轉！
-->

---

# Query Params — 取值 + 比較

一樣注入 `ActivatedRoute`，但改用 `snapshot.queryParamMap.get()` 取值。

```typescript
// list.component.ts
constructor(private route: ActivatedRoute) {
  const name = this.route.snapshot.queryParamMap.get('name');
  const age  = this.route.snapshot.queryParamMap.get('age');
}
```

| 比較項目 | Route Params | Query Params |
| --- | --- | --- |
| 需修改 router.ts | ✅ 是 | ❌ 否 |
| 網址格式 | `/list/Allen` | `/list?name=Allen` |
| 取值方法 | `paramMap.get()` | `queryParamMap.get()` |
| 值的型別 | string | string |

<!--
Query Params 的取值方式大同小異，一樣是用 `ActivatedRoute`。
只是把指令改成了 `snapshot.queryParamMap.get('name')`，多了一個 `query` 字樣！
我們把這兩大流派放在這個表格裡做個世紀對決。
通常，如果是定位特定資源的（比如看特定 ID 的會員資料），我們用 Route Params；
如果是做輔助篩選的（比如排序、分頁、搜尋），我們就用 Query Params。
把這兩招學起來，你網址帶值的能力就滿分了！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

<!--
好，路由學完了，我們馬上來拼裝傳送門！
-->

---
layout: two-cols
---

# 練習：基本路由
### 任務說明

1. 新增 `first`、`second` 兩個元件
2. 在 `app.routes.ts` 定義兩條路線
3. 在根元件 HTML 加入導航按鈕
4. 加入 `<router-outlet>` 顯示內容
5. 設定根路徑重新導向至 `/first`

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/21-routing/practice-basic.png" class="rounded shadow-md max-h-80" />
</div>

<!--
第一個是基本路由任務：
請新增 `first` 與 `second` 元件。
在 `app.routes.ts` 設定這兩條路線。
在根元件放上導航按鈕，並加上 `<router-outlet>` 天窗。
最後，利用重新導向，讓使用者一打開網頁，就自動瞬移到 `/first` 頁面！
動手寫寫看，體驗一下 SPA 不換頁跳轉的快感！
-->

---
layout: default
---

# 練習：基本路由 解題提示
### 提示說明

1. 匯入 `RouterOutlet`、`RouterLink`、`RouterLinkActive` 到根元件
2. `app.routes.ts` 中加入：
   - `{ path: 'first', component: FirstComponent }`
   - `{ path: 'second', component: SecondComponent }`
   - `{ path: '', redirectTo: '/first', pathMatch: 'full' }`
3. HTML 中按鈕加上 `routerLink="/first"` 和 `routerLink="/second"`
4. HTML 中加入 `<router-outlet></router-outlet>`

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 記得在 <code>app.component.ts</code> 的 <code>imports</code> 加入這三個 Router 模組。
</div>

<!--
如果有點小迷路，請看這裡：
記得去 `app.component.ts` 的 `imports` 陣列補上三個金剛：`RouterOutlet, RouterLink, RouterLinkActive`。
在 `routes` 陣列裡加好那三條路，包含 `pathMatch: 'full'` 的空路由重新導向。
然後在 HTML 裡加上 `<router-outlet></router-outlet>`。
儲存後，看看是不是一打開網頁，網址就自動跳去 `/first`，而且點按鈕畫面能秒切了？
-->

---
layout: two-cols
---

# 進階練習：子路由
### 任務說明

1. 在 `first` 下新增子元件 `child-a`
2. 在 `app.routes.ts` 設定子路由
3. 在 `first.component.html` 加入 `<router-outlet>`
4. 加入導航按鈕切換到子路由頁面
5. 子路由頁面顯示自訂內容

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/21-routing/practice-advanced.png" class="rounded shadow-md max-h-80" />
</div>

<!--
第二關是「子路由進階練習」：
請在 first 底下，建一個子元件 `child-a`。
並在 `app.routes.ts` 裡面用 `children: []` 來嵌套這條路線。
最後，在 `first.component.html` 裡面加開一個「子天窗」，並寫好導航連結去觸發它！
這題要特別注意「天窗開在哪裡」跟「路徑是拼接的」這兩個細節喔！
-->

---
layout: default
---

# 進階練習：子路由 解題提示
### 提示說明

1. 建立子元件：`ng g c first/child-a`
2. `app.routes.ts` 修改 first 路線：
   ```typescript
   { path: 'first', component: FirstComponent,
     children: [{ path: 'child-a', component: ChildAComponent }] }
   ```
3. 在 `first.component.html` 中加入 `<router-outlet>`（顯示子路由）
4. 導航用 `routerLink="/first/child-a"` 完整路徑

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 子路由的 <code>&lt;router-outlet&gt;</code> 放在<b>父元件</b>的 HTML 中，不是根元件。
</div>

<!--
大叔給大家指點迷津：
首先，在 terminal 執行 `ng g c first/child-a` 產生子元件。
接著，在路由表中，把 `child-a` 的 path 寫在 `FirstComponent` 的 `children` 裡面。
最關鍵的一步：**你必須去 `first.component.html`（也就是父元件的 HTML）裡放上 `<router-outlet>` 天窗**！
如果你把天窗放錯地方放去根元件，子路由的內容就長不出來了。
最後，導航連結要寫完整路徑 `/first/child-a`！
這關能順利通過，你的路由基本功就通關了！
-->

---
layout: end
---

# 課程結束
### 掌握路由，打造多頁面的 SPA 應用

<!--
恭喜大家！成功征服了 Angular 路由系統！
現在的你，已經能把本來黏在一起的大網頁，隔成一間間有規律、有門牌號碼的公寓了。
回去把這幾招多練幾遍，特別是網址傳值和子路由。
下一堂課，我們要迎來非常經典的主題——「元件之間的資料傳遞（Input / Output）」，去看看不能通過網址傳遞的複雜資料，是怎麼在積木與積木之間互相傳遞的！大家休息一下，我們等一下見！
-->
