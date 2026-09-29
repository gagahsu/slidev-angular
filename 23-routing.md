---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 路由
routeAlias: ch23
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
import { First } from './first/first';
import { Second } from './second/second';

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
  { path: 'first',  component: First },
  { path: 'second', component: Second },
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
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: 'first',  component: First },
  { path: 'second', component: Second },
  { path: '**',     component: NotFound }, // 必須放最後
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
只要前面沒有人匹配成功的，通通都會被這顆網民黑洞吸進來，送到 `NotFound`（錯誤頁）。
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
  { path: 'first',  component: First },
  { path: 'second', component: Second },
  { path: '**',     component: NotFound },
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
import { ChildA } from './first/child-a/child-a';

export const routes: Routes = [
  {
    path: 'first',
    component: First,
    children: [
      { path: 'child-a', component: ChildA }
    ]
  },
  { path: 'second', component: Second },
];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 子路由的 <code>&lt;router-outlet&gt;</code> 要放在父元件（First）的 HTML 中。
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
layout: default
---

# 嵌套路由 — 父子元件設計（一）HTML

**父元件** `first.html` 要放自己的第二個 `<router-outlet>`，子路由才有地方渲染：

```html
<!-- first.html -->
<h2>第一頁</h2>

<!-- 導航到子路由（必須寫完整路徑） -->
<a routerLink="/first/child-a">前往 Child-A</a>

<!-- 子路由的顯示容器，放在父元件裡，不是根元件 -->
<router-outlet></router-outlet>
```

```html
<!-- child-a.html -->
<p>我是 Child-A 的內容</p>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
⚠️ 根元件與父元件<b>各有自己的</b> <code>&lt;router-outlet&gt;</code>。忘記在父元件放 outlet，子路由切換後畫面一片空白，且 console 不會報錯
</div>

<!--
根元件有一個 router-outlet，負責渲染 first、second 這層。
first.html 裡面必須再放一個 router-outlet，負責渲染 child-a 這層。
如果忘記在父元件放 router-outlet，子路由切換後什麼都不會出現，而且 console 也不會報錯，很難找到原因。
導航連結要寫完整路徑 /first/child-a，不能只寫 /child-a。
-->

---
layout: default
---

# 嵌套路由 — 父子元件設計（二）TS Import

Standalone component 的 `imports` 各自獨立。父元件 HTML 用了 `routerLink` 與 `<router-outlet>`，就必須在**父元件自己的** `imports` 加入對應模組：

```typescript
// first.ts
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-first',
  imports: [RouterOutlet, RouterLink],  // 缺少這行 HTML 會報錯
  templateUrl: './first.html',
})
export class First {}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 根元件（App）有 import <code>RouterOutlet</code> 不代表子元件也有。每個 Standalone Component 需要用什麼就自己 import 什麼
</div>

<!--
這是 Standalone Component 架構最容易誤解的地方：以為根元件 import 了就全局生效。
實際上每個元件都是獨立的，用到 RouterOutlet 就要自己 import，用到 RouterLink 也要自己 import。
-->

---
layout: default
---

# 定義路線 — 小節練習

根據以下規格，補完 `app.routes.ts` 與 `home.html`（已 import 好所有元件）：

- 根路徑 `''` → 重新導向至 `/home`（`pathMatch: 'full'`）
- `/home` → `Home`，下有子路由 `/home/news` → `News`
- `/about` → `About`
- 任何未定義路徑 → `NotFound`

```typescript
export const routes: Routes = [
  // 補完路線（含子路由）
];
```

```html
<!-- home.html — 補完讓子路由能渲染 -->
<h2>首頁</h2>
<a ___="/home/news">最新消息</a>
<___></___>
```

<!--
考察 redirectTo/pathMatch、children 子路由、** 萬用路由順序、父元件必須放 router-outlet 四個重點。
-->

---
layout: default
---

# 定義路線 — 小節練習解答

```typescript
export const routes: Routes = [
  { path: '',      redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: Home,
    children: [
      { path: 'news', component: News }
    ]
  },
  { path: 'about', component: About },
  { path: '**',    component: NotFound },  // 必須放最後
];
```

```html
<!-- home.html -->
<h2>首頁</h2>
<a routerLink="/home/news">最新消息</a>
<router-outlet></router-outlet>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 子路由 <code>path</code> 只寫最後一段（<code>'news'</code>，不加 <code>/</code>）；導航連結寫完整路徑 <code>/home/news</code>；<code>&lt;router-outlet&gt;</code> 放在父元件 HTML，不是根元件
</div>

<!--
兩個常見錯誤：子路由 path 寫成 '/news' 加了斜線會找不到；忘記在 home.html 加 router-outlet 導致子頁面空白但 console 不報錯。
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
// app.ts
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class App {}
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
<!-- app.html -->
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
你在 `app.html` 裡擺了這行標籤。
當使用者切換到 `/first` 時，`First` 的內容就會從這個天窗降落、塞進這個位置。
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
layout: default
---

# HTML 導航 — 小節練習

在 `app.html` 補完導航列，讓 `/home` 與 `/about` 連結在選中時自動套用 `active` class，並在下方提供路由元件的顯示容器：

```html
<nav>
  <a ___="/home"  ___="active">首頁</a>
  <a ___="/about" ___="active">關於我們</a>
</nav>

<!-- 路由元件渲染區域 -->
<___></___>
```

<!--
考察 routerLink、routerLinkActive、router-outlet 三個指令的語法與位置。
-->

---
layout: default
---

# HTML 導航 — 小節練習解答

```html
<nav>
  <a routerLink="/home"  routerLinkActive="active">首頁</a>
  <a routerLink="/about" routerLinkActive="active">關於我們</a>
</nav>

<router-outlet></router-outlet>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>routerLink</code> 取代原生 <code>href</code>（不會重整頁面）；<code>routerLinkActive</code> 自動加 class；<code>&lt;router-outlet&gt;</code> 是元件的顯示容器，缺少它路由切換不會有任何畫面
</div>

<!--
三個缺一不可：routerLink 控制跳轉、routerLinkActive 控制高亮、router-outlet 決定渲染位置。
-->

---

# TS 導航 — 注入 Router

當換頁需要依據邏輯判斷（例如登入後跳轉），使用 TypeScript 程式導航。在 `constructor` 注入 `Router` 服務：

```typescript
// app.ts
import { Router } from '@angular/router';

@Component({ imports: [RouterOutlet] })
export class App {
  constructor(private router: Router) {}

  goToFirst() {
    this.router.navigate(['/first']);
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>constructor</code> 注入是 Angular 依賴注入（DI）的標準寫法。注入後，整個元件都能透過 <code>this.router</code> 呼叫路由方法。
</div>

<!--
「大叔，那如果我是要在按鈕按下後，先做 API 檢查，檢查通過才跳轉，這就不能在 HTML 寫死 routerLink 了吧？」
沒錯！這時候我們就必須在 TypeScript 大腦裡用寫程式的方式切換。
第一步：在 constructor 裡「注入 Router 服務」。Angular 的 DI 系統會自動把 Router 的實例塞進來，我們只需要用 private router: Router 宣告就好。
接著在方法內部呼叫 this.router.navigate(...)。
這樣你就能在程式碼跑完任何判斷邏輯後，隨心所欲地控制跳轉了！
-->

---

# TS 導航 — 完整範例（一）路由設定

以「登入驗證後跳轉」為例。先在 `app.routes.ts` 定義 `login` 與 `dashboard` 路線：

```typescript
// app.routes.ts
import { Login }     from './login/login';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: 'login',     component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: '',          redirectTo: '/login', pathMatch: 'full' },
];
```

<!--
在看元件程式碼之前，先確認路由表有把 login 和 dashboard 都設定好。
login 是入口頁，dashboard 是登入成功後的目標頁，根路徑重新導向到 login。
-->

---

# TS 導航 — 完整範例（二）元件設定

以「登入驗證後跳轉」為例。先看元件的設定部分：

```typescript
// login.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],           // 雙向綁定 [(ngModel)] 需要
  templateUrl: './login.html',
})
export class Login {
  password = '';   // 綁定輸入框
  error = false;   // 控制錯誤訊息顯示

  constructor(private router: Router) {}  // 注入 Router
}
```

<!--
來看一個實際情境：登入頁面。
使用者輸入密碼，點下登入按鈕，我們先做驗證，通過才跳轉，失敗就顯示錯誤訊息。
這頁先看元件設定：imports 要加 FormsModule 才能用 ngModel；Router 從 constructor 注入，整個元件都可以用 this.router。
-->

---

# TS 導航 — 完整範例（三）邏輯方法

接著是 `login()` 方法，包含判斷與跳轉邏輯：

```typescript
export class Login {
  // ... 承上頁屬性與 constructor

  login() {
    if (this.password === '1234') {
      this.router.navigate(['/dashboard']);  // 驗證通過 → 跳轉
    } else {
      this.error = true;                     // 驗證失敗 → 顯示錯誤訊息
    }
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 程式導航的核心：<b>先執行邏輯判斷，再決定要不要跳轉</b>。這是 <code>routerLink</code> 做不到的。
</div>

<!--
這就是程式導航最關鍵的地方：login() 方法裡先做 if 判斷。
通過就呼叫 this.router.navigate(['/dashboard'])；失敗就把 error 設為 true，讓畫面顯示錯誤提示。
先跑邏輯、再決定去哪，這個概念就是 TS 導航的精華。
-->

---

# TS 導航 — 完整範例（四）HTML

`login.html`：

```html
<input [(ngModel)]="password" placeholder="輸入密碼" />
<button (click)="login()">登入</button>
@if (error) {
  <p>密碼錯誤，請再試一次</p>
}
```

<!--
HTML 這頁很簡單，三行而已。
ngModel 綁定輸入框，click 觸發 login()，@if 控制錯誤訊息顯示。
-->

---

# TS 導航 — 完整範例（五）執行流程

點擊按鈕後的執行流程：

| 步驟 | 說明 |
| --- | --- |
| 1. 使用者輸入密碼、按登入 | `(click)="login()"` 觸發 |
| 2. `login()` 做條件判斷 | `if (password === '1234')` |
| 3a. 通過 → 跳轉 | `router.navigate(['/dashboard'])` |
| 3b. 失敗 → 顯示錯誤 | `error = true`，畫面顯示紅字 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 這就是程式導航的核心：<b>先跑邏輯，再決定要不要跳、要跳去哪裡</b>。用 <code>routerLink</code> 做不到條件跳轉。
</div>

<!--
重點是執行流程要說清楚：click 觸發 login()，login() 先判斷，判斷完才決定要跳還是顯示錯誤。
這個「先判斷再跳」的思路，才是學程式導航最重要的觀念。
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
  { path: 'list',        component: List },      // 不帶值
  { path: 'list/:name',  component: List },      // 帶一個值
  { path: 'list/:name/:age', component: List },  // 帶多個值
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
// list.ts
import { ActivatedRoute } from '@angular/router';

export class List {
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
// list.ts
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
layout: default
---

# Query Params — 小節練習

A 頁面點擊按鈕時，帶著 `keyword = 'Angular'` 跳轉至 `/result`；B 頁面在 `constructor` 中讀取並印出該值：

**A 頁面（導航）：**
```typescript
search() {
  // 帶 queryParams 跳轉至 /result
  this.router.navigate(___);
}
```

**B 頁面（取值）：**
```typescript
constructor(private route: ActivatedRoute) {
  // 讀取 keyword 並 console.log
  console.log(___);
}
```

<!--
考察 navigate 帶 queryParams 物件的寫法，以及在目標頁用 queryParamMap.get() 取值。
-->

---
layout: default
---

# Query Params — 小節練習解答

```typescript
// A 頁面 — 帶值導航
search() {
  this.router.navigate(['/result'], { queryParams: { keyword: 'Angular' } });
}
```

```typescript
// B 頁面 — 取值
constructor(private route: ActivatedRoute) {
  console.log(this.route.snapshot.queryParamMap.get('keyword'));  // Angular
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 傳值用 <code>queryParams: &#123; key: value &#125;</code>；取值用 <code>queryParamMap.get('key')</code>，回傳型別為 <code>string | null</code>
</div>

<!--
與 Route Params 最大的差異：Query Params 不需要修改 routes，直接在 navigate 的第二個參數物件中帶值。
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
layout: default
---

# 練習準備：建立問卷系統的前端專案
### 從這章開始，練習題都圍繞「動態問卷系統」

課程的最後，我們會做出一個完整的「動態問卷系統」（前台填寫、後台管理，規格見 `SURVEY-SPEC.md`）。先建立專案：

```bash
ng new survey-web        # 樣式選 SCSS，SSR 選 N
cd survey-web
ng serve
```

之後每一章的練習，都是在這個專案上「多做一塊」：

| 章節 | 這一塊 |
| --- | --- |
| Ch23 | 導覽列與路由（前台頁面、後台子路由） |
| Ch24 | 元件之間傳資料（問卷預覽、題目編輯） |
| Ch29 | 用 `HttpClient` 呼叫 Spring Boot 的問卷 API |
| Ch33–43 | 列表分頁、日期、搜尋、統計圖、對話框 |
| Ch50–52 | 作答表單與驗證 |

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
從這一章開始，Angular 的練習題不再是各章零散的小題目，而是全部圍繞同一個專案：動態問卷系統。這個系統在 MySQL 課設計了資料庫，在 Spring Boot 課做出了 API，現在輪到 Angular 來做畫面。

所以請大家現在就建立一個 survey-web 專案，後面每一章都往同一個專案裡加東西，最後一章會把它們接成完整的系統。
-->

---
layout: default
---

# 練習準備：建立問卷系統的前端專案（續）
### 從這章開始，練習題都圍繞「動態問卷系統」

| 章節 | 這一塊 |
| --- | --- |
| Ch57–59 | 攔截器、路由守衛、整合前台 + 後台 |

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
建立專案的指令在第 5 章教過了：樣式選 SCSS，SSR 選 N。Angular 21 預設是 zoneless、測試用 Vitest，這些都不用管。
-->

---
layout: default
---

# 練習 1：導覽列與基本路由
### 任務說明

在 `survey-web` 建立前台的三個頁面與導覽列：

1. 建立三個元件：`survey-list`（問卷列表）、`login`（登入）、`not-found`（找不到頁面）
2. 在 `app.routes.ts` 定義路線：`surveys`、`login`，並設定根路徑 `''` 重新導向到 `/surveys`
3. 萬用路由 `**` 顯示 `not-found`
4. 在 `app.html` 放導覽列：問卷列表、登入，目前所在的頁面要有高亮樣式（`routerLinkActive`）
5. 加入 `<router-outlet>` 顯示頁面內容

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
第一個練習是問卷系統前台的骨架：一個導覽列加上三個頁面。

請大家先用 ng g c 產生三個元件：survey-list、login、not-found。注意 Angular 21 的命名，元件檔案是 survey-list.ts，類別名稱是 SurveyList，沒有 Component 後綴。

路由表裡有三個重點：根路徑要重新導向、要有 pathMatch: 'full'、最後要有一個 ** 萬用路由，處理網址打錯的情況。

導覽列的高亮用 routerLinkActive，它會在目前路由符合時，自動幫連結加上 CSS class。
-->

---
layout: default
---

# 練習 1：解題提示

1. `ng g c pages/survey-list`、`ng g c pages/login`、`ng g c pages/not-found`
2. 萬用路由 `**` 一定要放在 `routes` 陣列的**最後一個**
3. 根元件要 `imports: [RouterOutlet, RouterLink, RouterLinkActive]`
4. `routerLinkActive="active"` 會在路由符合時加上 `active` 這個 class

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { SurveyList } from './pages/survey-list/survey-list';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'surveys', pathMatch: 'full' },
  { path: 'surveys', component: SurveyList },
  { path: 'login', component: Login },
  { path: '**', component: NotFound },
];
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
路由表最重要的是順序：Angular 由上往下比對，第一個符合的就用，所以 ** 一定要放最後，否則所有網址都會先被它攔走。

重新導向那一行要加 pathMatch: 'full'，意思是「網址整個都是空的才算符合」。沒有加的話，每個網址的開頭都是空字串，會全部被導走。
-->

---
layout: default
---

# 練習 1：完整解答（根元件）

```typescript
// app.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
```

```html
<!-- app.html -->
<nav class="navbar">
  <span class="brand">動態問卷</span>
  <a routerLink="/surveys" routerLinkActive="active">問卷列表</a>
  <a routerLink="/login" routerLinkActive="active">登入</a>
</nav>
<main><router-outlet /></main>
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
根元件只負責兩件事：畫出導覽列，並提供 router-outlet 這個天窗，讓路由決定的頁面顯示在這裡。
-->

---
layout: default
---

# 練習 1：完整解答（根元件）（續）

```scss
/* app.scss */
.navbar { display: flex; gap: 16px; padding: 12px 24px; background: #5eada0; }
.navbar a { color: white; text-decoration: none; }
.navbar a.active { font-weight: bold; border-bottom: 2px solid white; }
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
routerLink 取代了 a 標籤的 href，點擊時不會重新載入整個網頁，這就是單頁應用（SPA）的關鍵。
-->

---
layout: default
---

# 進階練習：後台的子路由
### 任務說明

後台頁面要共用同一個「側邊選單」，適合用子路由：

1. 建立 `admin`（後台版型）、`admin-list`（後台問卷列表）、`admin-editor`（新增問卷）三個元件
2. `admin` 路由下設定兩條子路由：`''` → `admin-list`、`edit` → `admin-editor`
3. 在 `admin.html` 放側邊選單與 `<router-outlet>`，選單連結：「問卷管理」`/admin`、「新增問卷」`/admin/edit`
4. 使用者輸入 `/admin` 時，右邊要顯示 `admin-list`

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
第二個練習是子路由。後台的每一頁左邊都有同一份選單，如果每個頁面都重複寫一次會很麻煩；比較好的做法是做一個「後台版型」元件，裡面放選單和一個新的天窗，各個後台頁面就顯示在這個天窗裡。

這就是子路由的用途：第二層的 router-outlet 放在父元件（admin）的 HTML 裡面，不是根元件。

這個後台版型，後面的章節會再加上路由守衛，只有管理員才能進來。
-->

---
layout: default
---

# 進階練習：解題提示與解答

```typescript
// app.routes.ts（新增 admin）
import { Admin } from './pages/admin/admin';
import { AdminList } from './pages/admin/admin-list/admin-list';
import { AdminEditor } from './pages/admin/admin-editor/admin-editor';

  {
    path: 'admin',
    component: Admin,
    children: [
      { path: '', component: AdminList },
      { path: 'edit', component: AdminEditor },
    ],
  },
```

```html
<!-- admin.html：子路由的天窗在「父元件」裡 -->
<div class="admin-layout">
  <aside>
    <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">問卷管理</a>
    <a routerLink="/admin/edit" routerLinkActive="active">新增問卷</a>
  </aside>
  <section><router-outlet /></section>
</div>
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
子路由的網址是「拼接」的：父路徑 admin 加上子路徑 edit，就是 /admin/edit。

高亮的細節：routerLinkActive 預設是「前綴比對」，/admin/edit 的開頭也符合 /admin，所以第一個連結要加上 routerLinkActiveOptions 的 exact: true，變成完全比對。
-->

---
layout: default
---

# 進階練習：解題提示與解答（續）

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>/admin</code> 也是 <code>/admin/edit</code> 的開頭，所以「問卷管理」要加 <code>exact: true</code>，否則進到新增頁面時兩個連結都會高亮。
</div>

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
別忘了 Admin 元件的 imports 也要放 RouterOutlet、RouterLink、RouterLinkActive。
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
