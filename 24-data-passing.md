---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 資料傳遞
routeAlias: ch24
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
    資料傳遞
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓頁面與元件之間溝通無阻」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎回來！
上一章我們學會了用「路由」把網頁分成好幾個房間，讓使用者能在不同的網址之間跑來跑去。
但是，這時候遇到了一個非常尷尬的狀況：
「大叔，我在首頁讓使用者填好了他的名字，結果他一走到下一頁，剛剛填的名字直接人間蒸發！這是失憶症嗎？」
沒錯！因為在單頁應用裡，切換頁面時，原來的元件會被直接銷毀（Destroy）。
所以，今天我們要來學習如何打通各頁面與各積木之間的「通訊管道」，讓資料可以跨頁面、跨父子積木自由飛翔！
-->

---
layout: default
---

# Outline

- **路由資料傳遞** — 使用 Service 在頁面間共享資料
- **建立 Service** — 指令、預設內容、宣告共用變數
- **頁面傳遞資料** — 跨頁面存取 Service 中的值
- **組件傳遞資料** — 為什麼需要 @Input / @Output
- **@Input** — 父元件傳值給子元件
- **@Output** — 子元件觸發父元件方法
- **實作練習**

<!--
今天我們的通訊建置作戰計畫如下：
首先，了解為什麼需要 `Service` 服務，並動手建立它。
接著，看怎麼用 Service 當作中央轉運站，把資料從 A 頁送往 B 頁。
然後，我們會轉向組件內部的通訊：學習把資料傳進子元件的 `@Input` 絕招，以及子元件向外發送通知的 `@Output` 絕招。
最後，透過兩道組件傳值的實作題，讓我們完全掌握父子通訊的奧義！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 路由資料傳遞
# Route Data Sharing

<!--
第一站，我們先來解決「跨路由頁面（沒有父子關係）」的通訊痛點。
-->

---

# 為什麼需要 Service？

切換路由時，若需要將 A 頁面的資料傳給 B 頁面，但 B 頁面無法直接呼叫 A 頁面的資料。

| 問題 | 說明 |
| --- | --- |
| 路由切換 | A 頁面的元件實例已被銷毀，B 頁面無法存取 |
| 解決方式 | 建立 **Service** 作為中介儲存空間 |
| Service 特性 | 每個頁面都可以注入並讀取其中的資料 |

**Service 不只能放變數，也能放多個頁面共用的方法。**

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
⚠️ <b>限制：</b> Service 只在 SPA 應用程式「存活期間」內有效，僅適用於 <b>router 內部路由跳轉</b>。若使用者直接輸入網址、按 F5 重新整理、或開新分頁，Angular 應用程式會重新啟動，Service 中的資料會全部歸零。
</div>

<!--
你想想看，今天我們點擊路由從第一頁切換到第二頁。
因為第一頁的元件已經被卸載、銷毀了，所以第二頁根本抓不到第一頁大腦裡的變數。
這時候，我們就需要一個「中央轉運倉庫」——也就是 `Service`（服務）！
這個服務是個「Singleton 單例」，也就是在整個網頁運行期間，不管你怎麼換頁，這個倉庫永遠只有一間，而且永遠不會倒塌。
第一頁把貨物（資料）寄存在倉庫，第二頁進來直接去倉庫提貨。
這樣，跨頁面傳值就輕輕鬆鬆搞定了！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 建立 Service
# Create a Service

<!--
既然知道倉庫的好處，我們馬上用 CLI 指令，在專案裡蓋一間轉運倉庫吧！
-->

---

# 建立 Service — 指令

建議在 `src` 目錄下新增 `@services` 資料夾統一管理所有 Service 檔案（一個專案可能有多個）。

```bash
# 指令格式
ng g s 檔案路徑/檔案名稱

# 範例：在 @services 資料夾中建立 example service
ng g s @services/example
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 檔案名稱<b>不需要</b>加 <code>.service.ts</code>，Angular CLI 會自動加上後綴，產生 <code>example-service.ts</code>。
</div>

<!--
怎麼建 Service 呢？
我們打開終端機，輸入 `ng generate service @services/example`，或者是縮寫 `ng g s @services/example`。
大叔這裡習慣把所有的服務檔案，通通丟進一個叫 `@services` 的資料夾裡統一管理。
注意喔！你打指令的時候，後面「不需要寫 .service.ts」，Angular 會自動幫你把後綴補齊。
-->

---

# Service 預設內容

建立後，`example-service.ts` 的預設內容如下：

```typescript
// @services/example-service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

}
```

`providedIn: 'root'` 表示這個 Service 在整個應用程式中只有一個實例（Singleton），所有頁面共用同一份資料。

<!--
產生好檔案後，我們打開它。
你會看到最上面有一個用小老鼠開頭的 `@Injectable` 裝飾器。
裡面寫著 `providedIn: 'root'`。
這行意思就是：「全專案的人，都可以隨時進來使用我這個倉庫！」
有了這個設定，我們就不需要手動在各個地方實例化它，Angular 會自動在背景幫我們管理這個唯一的倉庫實例。
-->

---

# Service 中宣告共用變數

在 Service 中宣告需要傳遞的變數，建議命名與原頁面變數相同以方便識別。

```typescript
// @services/example-service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExampleService {
  userName: string = '';
}
```

以此例：A 頁面（`first.ts`）要將 `userName` 傳給 B 頁面（`second.ts`），就在 Service 中同樣宣告 `userName`。

<!--
既然倉庫蓋好了，我們要怎麼用呢？
很簡單，我們在 Service 的 class 肚子裡宣告變數，比如 `userName: string = ''`。
這就是我們要在 A 頁和 B 頁之間傳遞的貨物。
只要把這個變數準備好，轉運站就正式開始營業囉！
-->

---
layout: default
---

# 建立 Service — 小節練習

補完 `CartService` 的裝飾器與共用變數，讓整個應用程式共用同一個 `cartCount`：

```typescript
import { ___ } from '@angular/core';

@___(___) // 補完裝飾器與 Singleton 設定
export class CartService {
  // 宣告 cartCount，型別 number，初始值 0
}
```

<!--
考察 @Injectable 裝飾器與 providedIn: 'root' 的意義：這兩行決定 Service 是否為全域單例。
-->

---
layout: default
---

# 建立 Service — 小節練習解答

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCount: number = 0;
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>providedIn: 'root'</code> 讓整個應用程式共用同一個 Service 實例（Singleton）——A 頁存入的值，B 頁可以直接讀取
</div>

<!--
@Injectable 是 Service 的身份標記，缺少它 Angular 注入系統無法識別。providedIn: 'root' 讓這個倉庫在全站只有一間。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 頁面傳遞資料
# Pass Data Between Pages

<!--
現在，我們就來演練一下「A 頁寄貨、B 頁收貨」的完整物流流程。
-->

---

# 傳遞資料 — 塞值到 Service

在 **A 頁面（發送方）** 注入 Service，並將資料塞入 Service 的變數。

```typescript
// first.ts
import { ExampleService } from '../@services/example-service';

export class First {
  constructor(private exampleService: ExampleService) {}

  sendData() {
    this.exampleService.userName = 'Allen';
  }
}
```

此時 Service 中的 `userName` 就等於 `'Allen'`。

<!--
首先是 A 頁（寄貨方）。
我們在 `first.ts` 的 constructor 括號裡，寫上 `private exampleService: ExampleService`。
這代表我們把倉庫的鑰匙（注入服務）拿到手了。
接著在送出方法裡，直接寫 `this.exampleService.userName = 'Allen'`。
看！我們直接把貨物塞進了倉庫的置物櫃裡。
A 頁的任務到此圓滿完成！
大叔特別提醒：這個倉庫只在應用程式「運作期間」有效！只要使用者按 F5 重新整理、直接在網址列輸入新網址、或是開新分頁，整個 Angular 應用程式會重新啟動，倉庫就會被砸掉重蓋，裡面的貨物通通清空。這招只適合處理 SPA 內部靠路由（router）切換頁面的情境。
-->

---

# 取出資料 — 從 Service 讀值

在 **B 頁面（接收方）** 同樣注入 Service，直接讀取其中的變數值。

```typescript
// second.ts
import { ExampleService } from '../@services/example-service';

export class Second {
  userName: string = '';

  constructor(private exampleService: ExampleService) {
    this.userName = this.exampleService.userName;
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 需確認 A 頁面已將資料塞入 Service 後，B 頁面才能讀到正確值（時序問題）。
</div>

<!--
再來是 B 頁（收貨方）。
同樣地，在 `second.ts` 的 constructor 注入同一個服務。
接著，我們在大腦初始化時，直接寫 `this.userName = this.exampleService.userName`。
這就是在從置物櫃裡把貨物拿出來，灌給自己的變數！
這樣，使用者就能在第二頁看到剛剛在第一頁填的 'Allen' 了。
大叔特別提醒：這招非常適合在「登入後存取 Token」或是「多步驟結帳表單」使用喔！
-->

---

# 注入 Service — inject() 現代寫法（發送方）

Angular 14+ 提供 `inject()` 函式，可取代 constructor 參數注入，直接以類別屬性方式宣告。

```typescript
// first.ts（發送方）
import { inject } from '@angular/core';
import { ExampleService } from '../@services/example-service';

export class First {
  private exampleService = inject(ExampleService);

  sendData() {
    this.exampleService.userName = 'Allen';
  }
}
```

<!--
inject() 是 Angular 14 推出的函式式注入，適合 Standalone Component。
不需要寫 constructor 參數，直接在屬性初始化時呼叫 inject()，程式碼更簡潔。
-->

---

# 注入 Service — inject() 現代寫法（接收方）

接收方同樣用 `inject()` 取得 Service 實例，讀值邏輯放在 `constructor` 中。

```typescript
// second.ts（接收方）
import { inject } from '@angular/core';
import { ExampleService } from '../@services/example-service';

export class Second {
  userName = '';
  private exampleService = inject(ExampleService);

  constructor() {
    this.userName = this.exampleService.userName;
  }
}
```

<!--
接收方一樣用 inject() 拿到 Service 實例，屬性宣告即完成注入。
constructor 內讀值時機與傳統寫法相同，需確保發送方已寫入資料。
-->

---

# constructor 注入 vs inject() 比較

| | constructor 注入 | inject() 注入 |
| --- | --- | --- |
| 語法 | `constructor(private s: Service) {}` | `private s = inject(Service)` |
| Angular 版本 | 所有版本 | Angular 14+ |
| 宣告位置 | constructor 括號內 | 類別屬性 |
| 適用情境 | 舊版或需相容性的專案 | 新版 Standalone 推薦 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 兩種寫法注入的是<b>同一個 Service 實例</b>，功能完全相同；本課程新版範例以 <code>inject()</code> 為主流
</div>

<!--
constructor 注入是傳統寫法，舊專案幾乎都長這樣。
inject() 是新式函式寫法，可在 ch25（Cookie）、ch43（Dialog）、ch51（ReactiveForm）看到大量應用。
-->

---
layout: default
---

# 頁面傳遞資料 — 小節練習

A 頁面（`login.ts`）登入成功後，將 `token = 'abc123'` 存入 `AuthService`；B 頁面（`dashboard.ts`）在 `constructor` 中讀取並存入自己的 `token` 變數。補完兩頁面的程式碼：

```typescript
// A 頁面
onLogin() {
  this.authService.___ = 'abc123';
}

// B 頁面
token = '';
constructor(private authService: AuthService) {
  this.token = ___;
}
```

<!--
考察 Service 跨頁傳值的完整流程：A 頁存值到 Service 屬性，B 頁讀取 Service 屬性。
-->

---
layout: default
---

# 頁面傳遞資料 — 小節練習解答

```typescript
// A 頁面 — 存值
onLogin() {
  this.authService.token = 'abc123';
}

// B 頁面 — 取值
token = '';
constructor(private authService: AuthService) {
  this.token = this.authService.token;  // 'abc123'
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 兩個頁面注入「同一個」Service 實例；A 頁寫入後切換到 B 頁，B 頁在 constructor 中即可讀到最新值
</div>

<!--
Service 是中央倉庫：A 頁把貨物（token）存進去，B 頁進來直接提貨。這是跨路由傳值最常用的模式。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 組件傳遞資料
# Component Data Passing

<!--
「大叔，那如果我的子積木就嵌套在父網頁裡面，我也要大費周章去建一個 Service 倉庫嗎？」
問得好！如果元件有親近的「父子血緣關係」，我們有更直接、更即時的通訊絕招。
那就是 `@Input` 和 `@Output`！
-->

---

# 為什麼需要 @Input / @Output？

在頁面中使用子元件時，Service 無法即時反映資料更新：

| 傳遞方式 | 即時更新 | 適用情境 |
| --- | --- | --- |
| Service | ❌ 只讀一次，不即時更新 | 路由頁面之間傳遞 |
| @Input | ✅ 父元件變數更新時即時同步 | 父元件 → 子元件（傳入資料） |
| @Output | ✅ 子元件觸發時即時回傳 | 子元件 → 父元件（回傳事件） |

<!--
為什麼有父子關係的積木不用 Service？
因為 Service 雖然能存值，但它沒辦法「即時廣播」。
如果父網頁的輸入框字變了，用 Service 傳遞，子積木是不知道要重新讀取的。
而 `@Input` 和 `@Output` 就像是接在父子積木之間的一根「傳聲筒」。
父網頁的資料一變，子元件的接收端（@Input）會在一毫秒內同步更新！
子元件發生點擊，也能立刻用事件（@Output）震動傳回給父網頁。
這兩招是元件化開發的最核心必修課！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# @Input
# Pass Data Into Component

<!--
首先，我們先來學習「父傳子」的專屬標記：`@Input`！
-->

---

# @Input — 子元件宣告

在**子元件**中宣告接收用變數，並加上 `@Input` 裝飾器與匯入。

```typescript
// second.ts（子元件）
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.html',
})
export class Second {
  @Input() value: string = '';
}
```

```html
<!-- second.html -->
<p>接收到的值：{{ value }}</p>
```

<!--
要讓子元件能夠收錢、收資料，它必須自己先安裝一個「接收天線」。
我們在子元件（Second）的 TS 檔案中，
匯入 `Input`，並在變數前方加上 `@Input()` 裝飾器。
例如 `@Input() value: string = ''`。
這樣就是在對外宣告：「大家聽好，我身上多了一個叫 value 的插孔，歡迎大家把資料插進來！」
子元件的 HTML 就可以直接用雙大括號 `{{ value }}` 來顯示這個隨時會變的值了。
-->

---

# @Input — 父元件使用

在**父元件**的 HTML 中，使用子元件標籤並加上 `[變數名稱]="父元件變數"` 綁定。

```typescript
// first.ts（父元件）
export class First {
  parentName = 'Allen';
}
```

```html
<!-- first.html -->
<app-second [value]="parentName"></app-second>
```

當 `parentName` 更新時，子元件的 `value` 也會即時同步更新。

<!--
那父元件要怎麼把資料塞進去呢？
在父元件的 HTML 裡面，我們呼叫子元件標籤 `<app-second>`。
並且在中括號裡，寫上子元件的插孔名字：`[value]="parentName"`。
這行意思就是：「把父元件 TS 裡的 `parentName` 變數值，源源不斷地灌進子元件的 `value` 插孔！」
只要父元件的 `parentName` 一變，子元件的畫面就立刻同步，不需要寫任何額外的 JS 監聽，非常方便！
-->

---
layout: default
---

# 練習 1：@Input — 問卷預覽卡片
### 任務說明

後台「新增問卷」的畫面，在輸入基本資料的同時，右邊要即時預覽問卷的樣子：

1. 建立父元件 `survey-editor`（新增問卷的畫面）與子元件 `survey-preview`（預覽卡片）
2. 父元件有三個輸入欄位：問卷名稱、開始日期、結束日期
3. 子元件用 `@Input` 接收這三個值，即時顯示在卡片上
4. 名稱是空的時候，卡片顯示「（尚未輸入名稱）」

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
第一個練習是後台新增問卷的預覽。左邊輸入資料，右邊的預覽卡片同步更新，這正是父傳子（@Input）最常見的使用情境。

請大家注意：預覽卡片本身不需要知道資料從哪裡來，它只負責「把收到的三個值排版好」。這也是把它做成獨立元件的好處，之後在問卷列表也可以重複使用。

題目 4 是一個小細節：用 @if 處理空字串的情況，練習 @if 與 @Input 搭配。
-->

---
layout: default
---

# 練習 1：解題提示

1. 子元件宣告三個 `@Input`：`title`、`startDate`、`endDate`
2. 父元件宣告三個變數，各用 `[(ngModel)]` 與輸入框雙向繫結（要匯入 `FormsModule`）
3. 父元件 HTML 中傳值給子元件：

```html
<app-survey-preview [title]="title" [startDate]="startDate" [endDate]="endDate" />
```

4. 日期欄位使用 `<input type="date">`，取得的值是 `yyyy-MM-dd` 字串，跟後端 API 的日期格式一樣

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 父元件需匯入 <code>FormsModule</code>（雙向繫結用）與 <code>SurveyPreview</code>（子元件用）。
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
思路跟前面教的一樣：子元件開三個插孔，父元件用中括號把三個變數灌進去。

日期輸入框 type="date" 的值是字串，格式是 yyyy-MM-dd，剛好就是後端 API 要的日期格式，所以先不需要做任何轉換。這個觀念很重要，後面串 API 的時候還會再用到。
-->

---
layout: default
---

# 練習 1：完整解答

```typescript
// survey-preview.ts（子元件）
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-survey-preview',
  templateUrl: './survey-preview.html',
})
export class SurveyPreview {
  @Input() title = '';
  @Input() startDate = '';
  @Input() endDate = '';
}
```

```html
<!-- survey-preview.html -->
<div class="card">
  @if (title) { <h3>{{ title }}</h3> } @else { <h3 class="muted">（尚未輸入名稱）</h3> }
  <p>期間：{{ startDate || '?' }} ～ {{ endDate || '?' }}</p>
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
子元件只有三個 @Input 和一個很簡單的樣板。@if 判斷 title 是不是空字串（空字串在 JavaScript 是 falsy），空的就顯示提示文字。

日期部分用 || 給預設值：還沒選日期時顯示問號。
-->

---
layout: default
---

# 練習 1：完整解答（父元件）

```typescript
// survey-editor.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SurveyPreview } from './survey-preview';

@Component({
  selector: 'app-survey-editor',
  imports: [FormsModule, SurveyPreview],
  templateUrl: './survey-editor.html',
})
export class SurveyEditor {
  title = '';
  startDate = '';
  endDate = '';
}
```

```html
<!-- survey-editor.html -->
<label>問卷名稱 <input [(ngModel)]="title" /></label>
<label>開始日期 <input type="date" [(ngModel)]="startDate" /></label>
<label>結束日期 <input type="date" [(ngModel)]="endDate" /></label>

<app-survey-preview [title]="title" [startDate]="startDate" [endDate]="endDate" />
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
父元件負責三件事：匯入 FormsModule 與子元件、宣告三個變數、把變數同時綁定到輸入框（雙向）和子元件（單向）。

輸入框打一個字，title 就更新，子元件的 @Input 隨之更新，預覽卡片立刻改變。整條資料流是：輸入框 → 父元件變數 → 子元件插孔 → 畫面。
-->

---
layout: default
---

# 練習 2：@Output — 新增題目
### 任務說明

新增問卷的第二步是「加入題目」。請把「輸入一題」做成子元件，父元件負責管理題目清單：

1. 建立子元件 `question-form`：一個題目名稱輸入框、題型下拉（單選／多選／文字）、「加入」按鈕
2. 子元件用 `@Output() added` 在按下「加入」時，把 `{ title, type }` 傳給父元件
3. 父元件（`survey-editor`）把收到的題目加到 `questions` 陣列，用 `@for` 列出來
4. 每一題後面有「刪除」按鈕，可以從清單移除
5. 題目名稱是空的時候，不要送出事件

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
第二個練習換成子傳父（@Output）。子元件只負責「輸入一題」這件事，按下加入之後，用事件把資料送給父元件；父元件保管整份題目清單。

這樣分工的好處是：子元件不知道也不用知道題目最後被放到哪裡，之後要把這份清單存到 Session、送到後端，都只需要改父元件。

第 5 點是防呆：在子元件裡檢查，空白的題目不送出。
-->

---
layout: default
---

# 練習 2：解題提示

1. 定義型別：`interface Question { title: string; type: 'SINGLE' | 'MULTI' | 'TEXT' }`，放在 `question.ts`
2. 子元件：`@Output() added = new EventEmitter<Question>();`，按下按鈕時 `this.added.emit({ ... })`
3. 父元件 HTML：`<app-question-form (added)="add($event)" />`
4. `$event` 就是子元件 `emit` 出來的物件
5. 刪除用陣列的 `filter`，或 `splice(index, 1)`

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 子元件的表單輸入用 <code>[(ngModel)]</code>，記得匯入 <code>FormsModule</code>。
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
事件從子元件流向父元件：子元件 emit，父元件在標籤上用小括號接住，名稱要跟 @Output 的屬性名稱一致。

$event 這個特殊變數，就是 emit 的時候放進去的東西。這裡放的是一個 Question 物件。

型別放在獨立檔案，是因為父子兩個元件都會用到它，之後串 API 時也會沿用同一份型別定義。
-->

---
layout: default
---

# 練習 2：完整解答（子元件）

```typescript
// question.ts
export interface Question {
  title: string;
  type: 'SINGLE' | 'MULTI' | 'TEXT';
}
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
子元件的重點是 @Output 加 EventEmitter：宣告一個會送出 Question 的事件，按下按鈕時 emit。
-->

---
layout: default
---

# 練習 2：完整解答（子元件）（續）

```typescript
// question-form.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Question } from './question';

@Component({
  selector: 'app-question-form',
  imports: [FormsModule],
  templateUrl: './question-form.html',
})
export class QuestionForm {
  @Output() added = new EventEmitter<Question>();

  title = '';
  type: Question['type'] = 'SINGLE';

  add() {
    if (!this.title.trim()) return;
    this.added.emit({ title: this.title.trim(), type: this.type });
    this.title = '';
  }
}
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
送出之後把 title 清成空字串，輸入框就自動清空，可以連續輸入下一題。
-->

---
layout: default
---

# 練習 2：完整解答（子元件）（續）

```html
<!-- question-form.html -->
<input [(ngModel)]="title" placeholder="題目名稱" />
<select [(ngModel)]="type">
  <option value="SINGLE">單選</option>
  <option value="MULTI">多選</option>
  <option value="TEXT">文字</option>
</select>
<button (click)="add()">加入</button>
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
Question['type'] 是 TypeScript 的索引存取型別，意思是「Question 的 type 屬性的型別」，這樣就不用重寫一次聯合型別。
-->

---
layout: default
---

# 練習 2：完整解答（父元件）

```typescript
// survey-editor.ts（在練習 1 的基礎上新增）
import { QuestionForm } from './question-form';
import { Question } from './question';

@Component({
  selector: 'app-survey-editor',
  imports: [FormsModule, SurveyPreview, QuestionForm],
  templateUrl: './survey-editor.html',
})
export class SurveyEditor {
  title = '';
  startDate = '';
  endDate = '';
  questions: Question[] = [];

  add(q: Question) { this.questions = [...this.questions, q]; }
  remove(i: number) { this.questions = this.questions.filter((_, k) => k !== i); }
}
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
父元件用 (added)="add($event)" 接住子元件的事件。add 方法用展開運算子建立新陣列，而不是直接 push，這是 Angular 常見的習慣：換一個新的陣列參考，變更偵測才一定看得到變化。

@empty 是 @for 的附屬區塊，清單是空的時候顯示，不需要另外寫 @if 判斷。
-->

---
layout: default
---

# 練習 2：完整解答（父元件）（續）

```html
<!-- survey-editor.html（接在預覽卡片後面） -->
<app-question-form (added)="add($event)" />

<ol>
  @for (q of questions; track $index) {
    <li>{{ q.title }}（{{ q.type }}）<button (click)="remove($index)">刪除</button></li>
  } @empty {
    <li class="muted">還沒有題目</li>
  }
</ol>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 這一份「題目清單」，就是之後要送到後端 <code>POST /api/admin/survey-draft</code> 的 <code>questions</code>。
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
這個練習做完，新增問卷的畫面已經有了預覽和題目清單。之後會接上 API，把這些資料真正存進資料庫。
-->

---
layout: end
---

# 課程結束
### 掌握 Service、@Input、@Output，讓元件之間資料自由流通

<!--
恭喜大家！成功克服了元件通訊這座前端大山！
到了這一步，你的網頁積木之間再也不是孤島了，不論是隔壁房間的 Service，還是樓上樓下的 Input/Output，全部都通訊自如。
回去把這幾種傳值方式反覆敲打練習。
下一堂課，我們要跨入一個非常實用的主題——「網頁儲存（Web Storage）」，去看看如何把資料存在瀏覽器裡，就算使用者重新整理甚至關掉瀏覽器，資料依然不會消失！大家休息一下，我們等一下見！
-->
