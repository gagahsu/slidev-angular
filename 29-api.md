---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 串接 API
routeAlias: ch29
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
    串接 API
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用 HttpClient 讓 Angular 與後端服務溝通」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎來到「串接 API」的主題！
這堂課是整個前端工程師修行之路的「分水嶺」！
在今天之前，我們寫的資料不是寫死在變數裡，就是放在本機的 Storage 裡，這叫「單機版網頁」。
但是，真實世界裡的網頁，是要能夠看最新的天氣預報、查即時的火車時刻表、或是跟國外的伺服器通訊。
這就像是，你的電腦插上了網路線，準備跟全世界連線！
今天，我們就要來學習如何利用 `HttpClient`，讓你的 Angular 網頁直接去跟遠端的伺服器「對話、拿資料」！
-->

---
layout: default
---

# Outline

- **什麼是 API** — Application Programming Interface 的定義與概念
- **如何使用 API** — 在 Angular 中呼叫 API 的三個步驟
- **將 HttpClient 透過依賴注入** — 在 app.config.ts 加入 provideHttpClient()
- **撰寫 HttpClient 文件** — 建立 http-service.ts 封裝四種 HTTP 方法
- **呼叫方法** — 注入 Service 並以 subscribe 接收回傳值
- **呼叫方法 (post/put)** — 打包 JSON 資料後呼叫 postApi / putApi
- **免費 API 網址** — 練習用的免費公開 API 資源
- **練習** — 串接氣象開放資料 API 並呈現在畫面上

<!--
今天我們的 API 登陸作戰計畫如下：
首先，用最接地氣的比喻搞懂什麼是 API。
接著，拆解在 Angular 裡呼叫 API 的黃金三步驟。
第一步，在 `app.config.ts` 裡接通 HttpClient 全域大動脈。
第二步，親手撰寫 `http-client-service.ts` 文件，把四大 HTTP 方法封裝起來。
第三步，在元件內部用 `subscribe` 訂閱法術把資料召喚出來。
最後，介紹免費的 API 測試資源，並交給大家一項任務——串接「中央氣象署」的實時天氣 API，設計出一個氣象卡片網頁！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 API？
# What is an API?

<!--
第一站，我們先來戳破 API 這三個英文大寫字母的恐怖面紗，其實它非常親切！
-->

---

# 什麼是 API？

API（Application Programming Interface），中文叫**應用程式介面**，是一種提供不同軟體系統間互動的工具，定義了不同軟體間的互動規範，API 允許不同的應用程式、服務或系統之間能夠共享資訊與功能，以約定好的 API 接口實現互聯互通。

簡單來說，API 提供了一組定義好的規則與協定，透過資訊的傳遞，讓開發者可以輕鬆整合與使用不同的服務，從而提高應用程式的功能與效能。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> API 就是不同系統之間溝通的「規範與橋樑」，前端透過 API 向後端取得或傳送資料。
</div>

<!--
API 的全名是「應用程式介面」。
聽起來很像教科書上的催眠術語，對吧？
簡單來說，API 就是「不同軟體系統之間約定好的溝通規則」。
這就像是，你在家裡想用吹風機，你不需要自己去接電線、蓋發電廠。
你只需要把吹風機的插頭，插進牆壁上的「插座」就行了。
那個牆壁上的「插座」，就是電力系統提供給你的「API 介面」！
你按照插座的規格（兩孔、110V）去插，電就會源源不絕地送過來。
在前端開發裡，API 就是後端工程師在伺服器上留給我們的「數據插座」。
-->

---

# 什麼是 API？

### API 案例說明

<div class="grid grid-cols-2 gap-6 my-2">
<div>

- **我（使用者）** 發出請求
- **服務員（API）** 接收請求，傳給廚師
- **廚師（後台）** 處理並回傳結果

</div>
<div>

- **我（使用者）** 操作提款機
- **提款機（API）** 接收指令，連線銀行
- **銀行（後台）** 處理帳戶資料並回傳

</div>
</div>

<div class="flex justify-center mt-2">
  <img src="/images/27-api/api-concept-diagram.png" class="rounded shadow-md max-h-72" />
</div>

<!--
大叔再給大家講一個經典的「餐廳點餐比喻」。
你（使用者）坐在餐桌前，想要吃椒麻雞。
後台的廚房（資料庫與後端伺服器）會做椒麻雞，但你不能直接跑進人家的廚房裡伸手去拿，那樣會被廚師用菜刀砸。
這時候，你需要一位「服務生（API）」。
你跟服務生說：「我要一份椒麻雞（發送 API 請求）」。
服務生把菜單傳給廚房（把參數丟給後端）。
廚房做好了，再由服務生把熱騰騰的雞肉端到你桌上（回傳 API 資料）。
這就是 API 的運作邏輯！
不管你是去 ATM 提款、還是在網路上用 LINE 登入，背後整個數據交換，全部都是這套服務生體制在運作。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 如何使用 API？
# How to Use an API?

<!--
了解了服務生的概念，我們馬上來看看在 Angular 專案裡，要怎麼把這套 HttpClient 傳送機制給搭建起來。
-->

---

# 如何使用 API？

在 Angular 中呼叫 API 需完成以下三個步驟：

- 將 HttpClient 透過依賴注入
- 撰寫 HttpClient 文件
- 呼叫方法

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>流程：</b> 先在全域注入 HttpClient → 建立封裝 Service → 在元件中注入 Service 並訂閱結果。
</div>

<!--
簡而言之就是三步：
第一步，先配電，把 HttpClient 大動脈接入全域。
第二步，建文件，把 HttpClient Service 給寫好包起來。
第三步，按開關，在你的元件裡呼叫方法並 subscribe 倒出資料！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 將 HttpClient 透過依賴注入
# Register HttpClient via DI

<!--
大招起手式：我們先去把 Angular 內建的網路傳送引擎給啟動！
-->

---

# 將 HttpClient 透過依賴注入

開啟 `app.config.ts`，在 `providers` 陣列中加入 `provideHttpClient()`，讓 Angular DI 系統得知 HttpClient 可被注入。

```typescript
import { provideHttpClient } from '@angular/common/http';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
```

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> Angular 21 起，不加也能注入 <code>HttpClient</code>；但之後要用攔截器（<code>withInterceptors</code>）等設定就必須寫在 <code>provideHttpClient()</code> 裡，所以我們養成習慣，一開始就把它加進 <code>providers</code>。
</div>

<!--
在 Angular 21 裡，HttpClient 其實已經可以直接注入使用，但是想要調整網路通訊的設定（例如之後要學的攔截器）就要靠 `provideHttpClient()`。
所以我們第一步，先打開全域設定檔 `app.config.ts`。
在 providers 陣列中，塞入一行 `provideHttpClient()`。
這就像是在專案的總配電盤上，合上「網路通訊」的無熔絲開關。
舊版 Angular（19 以前）如果不做這一步，會噴出 `No provider for HttpClient` 的世紀大紅字，所以請記住這個起手式；到了後面的攔截器章節，更是一定要用它。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 撰寫 HttpClient 文件
# Write HttpClient Service

<!--
開關合上了，接著第二步：我們建一個專屬的「物流小幫手（Service）」來統一處理網路封包。
-->

---

# 撰寫 HttpClient 文件（一）

建立 `http-service/http-client-service.ts`，將所有 API 呼叫方法集中管理，避免重複程式碼分散各元件。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>資料夾結構：</b>
</div>

```
app/
└── @http-services/
    └── http-service.ts
```

<!--
大叔又要來耳提面命了：
**千萬不要在每個元件（Component）裡直接呼叫原生的 HttpClient**！
因為如果你的 API 網址改了，或者要加上統一的身分驗證 header，你如果寫在幾十個元件裡，你就要改幾十次，會改到吐血。
我們一律要建一個叫 `HttpClientService` 的服務。
把所有的 API 傳送工作，通通集中在這個轉運中心裡進行。
這才是業界大廠的標準架構！
-->

---

# 撰寫 HttpClient 文件（二）

在 `http-client-service.ts` 中加入以下程式。`@Injectable({ providedIn: 'root' })` 讓 Angular 在應用啟動時自動建立此 Service 的單例，無需手動 `new`。

```typescript
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
}
```

<!--
我們可以用 CLI 指令 產生服務。
在這個 TS 檔裡，我們保留 `@Injectable({ providedIn: 'root' })`。
這樣全專案的元件，都能隨時呼叫我們這台唯一的 API 傳送中心，不需要你手動去 `new` 一個。
-->

---

# 撰寫 HttpClient 文件（三）

透過 constructor 將 `HttpClient` 注入，後續即可使用 `this.http` 呼叫各 HTTP 方法。

```typescript
import { HttpClient } from "@angular/common/http";

export class HttpClientService {
  constructor(private http: HttpClient) {}
}
```

<!--
接著在 constructor 的括號裡，寫上 `private http: HttpClient`。
這代表我們把剛才配電盤開通的 `HttpClient` 引擎，正式引流到這個 Service 的體內。
-->

---

# 撰寫 HttpClient 文件（四）— 四種 HTTP 方法

將四種基礎 HTTP 方法封裝至 Service，每個方法將 `this.http` 的回傳值直接 `return` 給呼叫者。`url: string` 為必填參數，`postData` / `putData` 為 body 內容。

```typescript
// 讀取
getApi(url: string) {
  return this.http.get(url);
}

// 新增
postApi(url: string, postData: any) {
  return this.http.post(url, postData);
}

// 更新
putApi(url: string, putData: any) {
  return this.http.put(url, putData);
}

// 刪除
delApi(url: string) {
  return this.http.delete(url);
}
```

<!--
接下來，我們在這個 Service 裡，把 HTTP 最常用的四大神功封裝好：
`getApi`：去跟後端「拿資料」（GET）。
`postApi`：去跟後端「新增資料」，需要帶上要打包的 `postData`（POST）。
`putApi`：去跟後端「更新舊資料」，需要帶上要修改的 `putData`（PUT）。
`delApi`：去跟後端「刪除資料」（DELETE）。
這四個方法寫好後，它們都會把 `this.http.xxx` 的成果「Return（回傳）」出去。
這台 API 轉運車就組裝完成，隨時可以載客出發了！
-->

---
layout: default
---

# HttpClient Service — 小節練習

請根據前面投影片的內容，建立 `HttpClientService`：

1. 建立 `http-service/http-client-service.ts`，加上 `@Injectable({ providedIn: 'root' })`
2. 透過 constructor 注入 `HttpClient`
3. 撰寫 `getApi(url: string)`，回傳 GET 請求
4. 撰寫 `postApi(url: string, postData: any)`，回傳 POST 請求
5. 撰寫 `putApi(url: string, putData: any)`，回傳 PUT 請求
6. 撰寫 `delApi(url: string)`，回傳 DELETE 請求

<!--
考察 HttpClient 四大方法的封裝寫法，getApi/delApi 只需 url，postApi/putApi 需額外帶 body 參數。改為需求描述題，讓學員自行從零建立 Service 檔案與方法。
-->

---
layout: default
---

# HttpClient Service — 小節練習解答

```typescript
getApi(url: string) {
  return this.http.get(url);
}

postApi(url: string, postData: any) {
  return this.http.post(url, postData);
}

putApi(url: string, putData: any) {
  return this.http.put(url, putData);
}

delApi(url: string) {
  return this.http.delete(url);
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>getApi</code>、<code>delApi</code> 只需 <code>url</code> 一個參數；<code>postApi</code>、<code>putApi</code> 必須帶第二個參數作為 HTTP body——即使沒有資料也要傳入空物件 <code>&#123;&#125;</code>
</div>

<!--
所有方法都直接 return this.http.xxx()，讓呼叫方決定如何 subscribe 處理回傳值，這是業界標準的 Service 封裝方式。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 呼叫方法
# Calling the Methods

<!--
最後一步，也是最興奮的一步：我們要在畫面上呼叫 Service，把資料拉下來！
-->

---

# 呼叫方法（一）— 注入 Service

完成前兩步後，在目標元件 we TS 中注入 `HttpClientService`，並透過 constructor 取得實例。

```typescript
import { RouterOutlet } from '@angular/router';
import { HttpClientService } from '../http-service/http-client-service';
```

```typescript
constructor(private http: HttpClientService) {}
```

<!--
我們隨便打開一個要串資料的元件（比如 App）。
在建構子 constructor 括號裡，注入剛寫好的 `private http: HttpClientService`。
拿到這台轉運車的鑰匙後，我們就能在元件的大腦裡隨時發號施令了。
-->

---

# 呼叫方法（二）— subscribe 訂閱

呼叫 `getApi(url)` 後，連結 `.subscribe()` 接收回傳資料。`res` 為回傳內容，可自行命名。HttpClient 回傳 Observable，必須 subscribe 才會發送請求。

```typescript
ngOnInit(): void {
  this.http.getApi('https://api.freeapi.app/api/v1/public/randomusers')
    .subscribe((res) => console.log(res));
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> <code>subscribe()</code> 是 RxJS Observable 的訂閱方式，Angular 的 HttpClient 回傳的都是 Observable，必須透過 subscribe 才會實際發送請求。
</div>

<!--
大家看這段 ngOnInit 裡面的代碼。
我們呼叫 `this.http.getApi(免費 API 網址)`。
這時候，**最後面一定要加上一個 `.subscribe()`**！
這個 subscribe 在 RxJS 裡叫做「訂閱」。
大叔把它比喻成「訂閱 YouTube 頻道」或者是「點外送」。
Angular 的 HttpClient 回傳的是一個「神奇的預約信封（Observable）」。
如果你只是寫了 getApi 而不加上 subscribe。
這就像是你在外送 App 上把雞排點進了購物車，卻從來沒有按「送出訂單」一樣。
外送員（瀏覽器）是死活都不會幫你出餐發送請求的！
只有當你呼叫了 `.subscribe((res) => { ... })`，訂單才會正式送出，當資料送回來時，就會灌進 `res` 變數裡，讓你可以在裡面印 log 或是指派給變數。
這顆 subscribe 鈕，是新手漏寫率高達 99% 的超級地雷，請大家一定要牢牢記住！
-->

---
layout: default
---

# 呼叫方法 — 小節練習

在 `ngOnInit` 中透過注入的 `HttpClientService`，呼叫以下 GET API 並用 `console.log` 印出回傳結果：

```
https://api.freeapi.app/api/v1/public/randomusers
```

```typescript
constructor(private http: HttpClientService) {}

ngOnInit(): void {
  // 補完呼叫與訂閱
  this.___.___('https://api.freeapi.app/api/v1/public/randomusers')
    .___((___)  => console.log(___));
}
```

<!--
考察 Service 注入 + getApi 呼叫 + subscribe 訂閱三步驟的完整寫法。
-->

---
layout: default
---

# 呼叫方法 — 小節練習解答

```typescript
constructor(private http: HttpClientService) {}

ngOnInit(): void {
  this.http.getApi('https://api.freeapi.app/api/v1/public/randomusers')
    .subscribe((res) => console.log(res));
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 HttpClient 回傳 Observable，必須 <code>.subscribe()</code> 才會實際發送請求——不加 subscribe 就像點餐沒按送出，瀏覽器不會對伺服器發出任何請求
</div>

<!--
subscribe 的回呼函式參數 res 可自行命名，習慣上用 res（response 縮寫）代表伺服器回傳的整個回應物件。
-->

---

# 呼叫方法（post/put）（一）

`post` 與 `put` 需傳送資料給後端，呼叫前先將資料打包為 JSON 物件作為第二個參數傳入。

```typescript
ngOnInit(): void {
  // 在呼叫 post api 之前先把要傳遞的資料打包
  let postData = {
    userName: 'Allen',
    userAge: 18
  }

  // 呼叫 post 的方法 第一個值帶 api Url 第二個帶要傳遞的值
  // (post 一定要帶值 如果真的沒有內容也可以給他一個空 {})
  this.httpClientService
    .postApi('https://api.freeapi.app/api/v1/kitchen-sink/http-methods/post', postData)
    .subscribe((res: any) => {
      console.log(res);
    })
}
```

<!--
如果是要送資料給後端的 post / put 請求呢？
在發送之前，我們得先把我們的貨物「裝箱（打包成 JSON 物件）」。
比如寫一個 `let postData = { userName: 'Allen', userAge: 18 }`。
然後呼叫 `postApi` 時，把這個 `postData` 當作第二個參數塞進去。
這樣網路封包在發送時，就會把這箱貨物塞進 HTTP Request 的 Body 裡，整箱運送給後端。
一樣，最後一定要 subscribe 才會出發喔！
-->

---

# 呼叫方法（post/put）（二）

以下呼叫免費 post API，收到 `res` 即代表請求成功：

```typescript
ngOnInit(): void {
  // 在呼叫 post api 之前先把要傳遞的資料打包
  let postData = {
    userName: 'Allen',
    userAge: 18
  }

  // 呼叫 post 的方法 第一個值帶 api Url 第二個帶要傳遞的值
  // (post 一定要帶值 如果真的沒有內容也可以給他一個空 {})
  this.httpClientService
    .postApi('https://api.freeapi.app/api/v1/kitchen-sink/http-methods/post', postData)
    .subscribe((res: any) => {
      console.log(res);
    })
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> post 一定要帶第二個參數（body），如果真的沒有內容也要傳入一個空物件 <code>{}</code>。
</div>

<!--
這裏再看一遍 post 請求的完整範例。
如果後端收到了，通常會回傳一個 `res`，裡面寫著「新增成功」或是新增好的資料 ID。
大叔特別叮嚀：
就算你發送的 post 請求不需要傳遞任何值給後端，
你也必須在第二個參數塞一個空的 `{}`，因為我們的 `postApi(url, postData)` 宣告了兩個必填參數，漏寫了編譯器是會直接對你亮紅牌的！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 免費 API 網址
# Free API Resources

<!--
「大叔，那如果我的後端同事還在寫扣、或者我根本沒有後端，我該去哪裡找 API 來練手呢？」
這裡大叔幫大家整理了幾個免費的網路公共資源。
-->

---
layout: two-cols
---

# 免費 API 網址

以下提供免費可呼叫的 API，可搭配畫面顯示練習串接：

**Freeapi 文件：**

`https://freeapi.hashnode.space/api-guide/apireference/getUsers`

可用的 API 類型包含：
- GET 類：取得使用者、隨機資料、圖片等
- POST 類：送出資料
- DEL 類：刪除資料

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/27-api/freeapi-reference.png" class="rounded shadow-md max-h-80" />
</div>

<!--
畫面上這個 `freeapi.app` 或者是投影片中的 Hashnode API 文件。
它提供了一大堆隨機產生使用者、隨機產品、隨機貓咪圖的免費 GET 與 POST API。
大家在練習時，不用註冊、不用付錢，直接把裡面的 API 網址拷貝下來貼進你的程式碼裡，就能拿到非常豐富的 JSON 資料。
寫程式沒有捷徑，今天晚上回家，就拿這幾條隨機使用者網址來回呼叫十遍，練練手感！
-->

---
layout: default
---

# 練習：串接問卷 API — 任務說明

Spring Boot 課做出的問卷 API 已經在 `http://localhost:8080` 跑起來了（`reference/dynamic-survey`，或你自己完成的專案）。請在 `survey-web` 串接它：

1. 建立 `models.ts`，定義 `Survey`、`PageResult<T>`、`AppResponse<T>` 三個型別
2. 建立 `SurveyService`，用 `HttpClient` 呼叫 `GET /api/surveys?page=0&size=10`
3. 在 `survey-list` 元件的 `ngOnInit` 訂閱結果，把問卷用**表格**顯示：名稱、狀態、開始日期、結束日期
4. 後端沒有資料或連不上時，畫面顯示提示，不要一片空白

**API 回傳格式**（所有 API 都是這個外層，`data` 才是內容）：

```json
{ "code": "SUCCESS", "message": "成功",
  "data": { "content": [ { "id": 2, "title": "午餐偏好調查", "statusLabel": "進行中", ... } ],
            "page": 0, "size": 10, "totalElements": 4, "totalPages": 1 } }
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
好，這一章的終極練習，我們不再打氣象署的 API，而是接上自己人做的後端：動態問卷系統的 API。這是整個課程的重點，也是後面所有練習的基礎。

請大家先確認 Spring Boot 有跑起來，用瀏覽器打開 http://localhost:8080/api/surveys，應該看得到 JSON。

看回傳格式：所有 API 都包了一層 AppResponse，有 code、message 和 data；分頁的結果放在 data 裡面，content 才是問卷陣列，還有 page、size、totalElements、totalPages 這些分頁資訊。這個格式是 Spring Boot 課設計的，前後端要對得起來。

第 4 點的提示：有時候後端還沒啟動，或是網路錯誤，這時候 subscribe 的 error 回呼會被觸發，要處理這種情況。
-->

---
layout: default
---

# 練習：解題提示

1. 型別對應後端的 JSON，日期在 JSON 裡是 `'yyyy-MM-dd'` 字串，型別用 `string`
2. `Service` 用 `inject(HttpClient)`，`get<AppResponse<PageResult<Survey>>>(url, { params })`
3. 用 RxJS 的 `map` 把外層 `AppResponse` 拆掉，只回傳 `data`
4. 非同步回來的資料要放進 `signal`，畫面才會更新（Angular 21 預設沒有 zone.js，第 47 章會詳細說明）
5. **CORS**：瀏覽器（`localhost:4200`）呼叫另一個網址（`localhost:8080`）會被擋，後端要允許

```java
// Spring Boot 端（自己的專案才需要；reference/dynamic-survey 已設定好）
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**").allowedOrigins("http://localhost:4200");
        }
    };
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
第一個提示：JSON 裡沒有日期型別，日期都是字串，前端就用 string。

第二、三個提示：Service 的職責是呼叫 API 並回傳資料，外層 AppResponse 是「前後端的約定格式」，不是畫面要用的資料，所以在 Service 裡面用 map 拆掉，元件拿到的就是乾淨的 PageResult。

第四點很重要：Angular 21 預設不再使用 zone.js，subscribe 回呼裡改一般變數，畫面不會更新。所以要用 signal 存資料。

第五點是 CORS：跨來源資源共用。瀏覽器基於安全，預設不允許網頁去呼叫「另一個來源」（協定、網域、埠號只要有一個不一樣就算不同來源）。前端 4200、後端 8080，埠號不同，所以後端要明確表示「我允許 4200 來呼叫」。這是後端的設定，不是前端能解決的。如果在瀏覽器的 Console 看到 blocked by CORS policy，就是這個原因。
-->

---
layout: default
---

# 練習：完整解答（型別與 Service）

```typescript
// models.ts
export interface AppResponse<T> { code: string; message: string; data: T; }
export interface PageResult<T> {
  content: T[]; page: number; size: number; totalElements: number; totalPages: number;
}
export interface Survey {
  id: number; title: string; description: string;
  startDate: string; endDate: string; published: boolean; statusLabel: string;
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
型別檔案是前後端的契約。AppResponse 和 PageResult 是泛型，T 代表 data 或 content 裡面裝的東西，這樣所有 API 都可以重複使用同一組型別。

Service 用 providedIn: 'root' 讓它成為全域單例，任何元件都可以 inject 它。
-->

---
layout: default
---

# 練習：完整解答（型別與 Service）（續）

```typescript
// survey-service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { AppResponse, PageResult, Survey } from './models';

@Injectable({ providedIn: 'root' })
export class SurveyService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api';

  list(page = 0, size = 10) {
    return this.http
      .get<AppResponse<PageResult<Survey>>>(`${this.api}/surveys`, { params: { page, size } })
      .pipe(map(res => res.data));
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
params 直接傳物件，HttpClient 會自動組成 ?page=0&size=10 的查詢字串。pipe(map(...)) 拆掉外層，呼叫端拿到的就是 PageResult<Survey>。
-->

---
layout: default
---

# 練習：完整解答（元件）

```typescript
// survey-list.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { SurveyService } from './survey-service';
import { Survey } from './models';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.html',
})
export class SurveyList implements OnInit {
  private api = inject(SurveyService);

  surveys = signal<Survey[]>([]);
  error = signal('');

  ngOnInit(): void {
    this.api.list().subscribe({
      next: page => this.surveys.set(page.content),
      error: () => this.error.set('無法連線到後端，請確認 Spring Boot 已啟動'),
    });
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
元件的流程跟前面教的一樣：注入 Service、在 ngOnInit 訂閱、把結果放進 signal。

surveys 和 error 都是 signal，讀取的時候記得加括號：surveys()、error()。
-->

---
layout: default
---

# 練習：完整解答（元件）（續）

```html
<!-- survey-list.html -->
@if (error()) { <p class="error">{{ error() }}</p> }
<table>
  <tr><th>名稱</th><th>狀態</th><th>開始</th><th>結束</th></tr>
  @for (s of surveys(); track s.id) {
    <tr><td>{{ s.title }}</td><td>{{ s.statusLabel }}</td><td>{{ s.startDate }}</td><td>{{ s.endDate }}</td></tr>
  } @empty {
    <tr><td colspan="4">沒有問卷</td></tr>
  }
</table>
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>成功標準：</b> 打開 <code>http://localhost:4200/surveys</code>，看到後端 <code>seed.sql</code> 的問卷（午餐偏好調查⋯⋯）；把 Spring Boot 關掉再重新整理，畫面顯示錯誤提示。
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
@empty 區塊處理「沒有資料」的情況，前面的 @if 處理連線錯誤。

驗收方式：先看到資料，再把後端關掉重新整理，確認錯誤提示有出現。這種「壞掉的時候畫面也不能亂」，是做前端很實際的習慣。這份表格下一個章節（Mat-table）會升級成漂亮的表格，還會加上分頁。
-->

---
layout: default
---

# 補充：跟後端交換 Cookie（withCredentials）

問卷的「作答暫存」與「後台編輯暫存」是放在後端的 **Session**，靠瀏覽器的 Cookie（`JSESSIONID`）辨識同一個使用者。跨來源呼叫時，瀏覽器預設**不會**帶 Cookie，要明確打開：

```typescript
// 每一個需要 Session 的請求都要加
this.http.post(`${this.api}/surveys/${id}/draft`, body, { withCredentials: true });
```

後端也要配合：`allowCredentials(true)`，而且 `allowedOrigins` **不能是 `*`**，必須指定 `http://localhost:4200`。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 每個請求都寫 <code>withCredentials</code> 很麻煩，第 57 章的<b>攔截器</b>會一次替所有請求加上。
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
這一頁是預告。問卷系統的填寫流程是：填完按「送出」，並不是直接寫進資料庫，而是先暫存在後端的 Session，讓使用者在確認頁檢查，按下確認才真正寫入。

後端怎麼知道是同一個人？靠 Cookie 裡的 JSESSIONID。但瀏覽器在跨來源請求時，預設不會附上 Cookie，這是安全機制。所以前端要在請求選項加 withCredentials: true，後端也要設定 allowCredentials。

有一個常見的坑：當允許帶 Cookie 時，後端的 allowedOrigins 不能寫星號，一定要指定明確的網址，否則瀏覽器會拒絕。

每個請求都要寫一次很煩，這也是第 57 章攔截器的主要用途之一。
-->

---
layout: end
---

# 課程結束
### 學會串接 API，讓 Angular 應用與後端真正連線！

<!--
恭喜大家！成功跨過了前端開發最關鍵的一道分水嶺！
從今天開始，你再也不是寫單機版網頁了。你已經掌握了跟全世界任何伺服器通訊的 HttpClient 密碼。
不管是天氣預報、新聞、還是串接 OpenAI，對你來說都只是改個網址而已！
把這段 API 串接流程反覆敲打，特別是 `subscribe` 的觀念。
下一堂課，我們要挑戰更高級的玩法——「串接 OpenAI API」，親手在我們的 Angular 網頁裡做出一隻聰明的人工智慧聊天機器人！大家休息一下，我們等一下見！
-->
