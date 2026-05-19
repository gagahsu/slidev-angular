---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 串接 API
routeAlias: ch27
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

---
layout: default
---

# Outline

- **什麼是 API** — Application Programming Interface 的定義與概念
- **如何使用 API** — 在 Angular 中呼叫 API 的三個步驟
- **將 HttpClient 透過依賴注入** — 在 app.config.ts 加入 provideHttpClient()
- **撰寫 HttpClient 文件** — 建立 http.service.ts 封裝四種 HTTP 方法
- **呼叫方法** — 注入 Service 並以 subscribe 接收回傳值
- **呼叫方法 (post/put)** — 打包 JSON 資料後呼叫 postApi / putApi
- **免費 API 網址** — 練習用的免費公開 API 資源
- **練習** — 串接氣象開放資料 API 並呈現在畫面上

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 API？
# What is an API?

---

# 什麼是 API？

API（Application Programming Interface），中文叫**應用程式介面**，是一種提供不同軟體系統間互動的工具，定義了不同軟體間的互動規範，API 允許不同的應用程式、服務或系統之間能夠共享資訊與功能，以約定好的 API 接口實現互聯互通。

簡單來說，API 提供了一組定義好的規則與協定，透過資訊的傳遞，讓開發者可以輕鬆整合與使用不同的服務，從而提高應用程式的功能與效能。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> API 就是不同系統之間溝通的「規範與橋樑」，前端透過 API 向後端取得或傳送資料。
</div>

---
layout: two-cols
---

# 什麼是 API？

### API 案例說明

- **我（使用者）** 發出請求
- **服務員（API）** 接收請求，傳給廚師
- **廚師（後台）** 處理並回傳結果

---

- **我（使用者）** 操作提款機
- **提款機（API）** 接收指令，連線銀行
- **銀行（後台）** 處理帳戶資料並回傳

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/27-api/api-concept-diagram.png" class="rounded shadow-md max-h-80" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 如何使用 API？
# How to Use an API?

---

# 如何使用 API？

要如何在 Angular 專案中呼叫 API，首先需要先做到幾件事情。

- 將 HttpClient 透過依賴注入
- 撰寫 HttpClient 文件
- 呼叫方法

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>流程：</b> 先在全域注入 HttpClient → 建立封裝 Service → 在元件中注入 Service 並訂閱結果。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 將 HttpClient 透過依賴注入
# Register HttpClient via DI

---

# 將 HttpClient 透過依賴注入

首先先打開你的 `app.config.ts` 文件，在 `providers` 中加入 `provideHttpClient()`，這邊就是在告訴系統我引用了這個並且告訴系統引用的位置在哪裡。

```typescript
import { provideHttpClient } from '@angular/common/http';
```

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>provideHttpClient()</code> 必須加入 <code>providers</code> 陣列，否則注入 HttpClient 時會報錯。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 撰寫 HttpClient 文件
# Write HttpClient Service

---

# 撰寫 HttpClient 文件（一）

之前有說過建議大家每種文件要放到固定的資料夾中，所以我們這邊先手動建立一個 `http-service` 的資料夾並且新增一個檔案 `http-client.service.ts`，這個檔案會是我們後面如果有需要用到串接 API 的方法我們都會寫在裡面，這樣可以減少同樣的 code 一直在不同的地方被重複呼叫。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>資料夾結構：</b>
</div>

```
app/
└── @http-services/
    └── http.service.ts
```

---

# 撰寫 HttpClient 文件（二）

接下來打開 `http-client.service.ts` 並且寫入以下程式，這邊是什麼意思呢？簡單來說撇除 `export class HttpClientService`（命名）之外，上面那邊都只是為了讓系統在網頁一開始打開時就去新建這個檔案放在後台，避免每次要使用時候需要去 `new` 這個檔案才能使用。

```typescript
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
}
```

---

# 撰寫 HttpClient 文件（三）

接下來將 `HttpClient` 注入這個 ts 中，然後我們就可以開始寫方法了。

```typescript
import { HttpClient } from "@angular/common/http";

export class HttpClientService {
  constructor(private http: HttpClient) {}
}
```

---

# 撰寫 HttpClient 文件（四）— 四種 HTTP 方法

接下來將 HttpClient 注入這個 ts 中，然後我們就可以開始寫方法了。一開始可以先將這四種基礎的方法寫進去，這邊的寫法就是我們會將注入的 http 裡面的方法回傳給呼叫這個方法的人，用這樣來達到統一處理。這邊會看到方法後面有 `(url: string)` 這個跟後端一樣是指呼叫這個方法時需傳入的數據與數據的類型。

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 呼叫方法
# Calling the Methods

---

# 呼叫方法（一）— 注入 Service

當你完成上面兩部之後，你就可以開始在你要呼叫的 ts 去呼叫剛剛寫的 HttpClient 文件裡面的方法，你需要先在你要呼叫得 ts 中注入 HttpClient 文件（他的名稱）並且為他取一個名稱讓下面方法可以指定。

```typescript
import { RouterOutlet } from '@angular/router';
import { HttpClientService } from '../http-service/http-client.service';
```

```typescript
constructor(private http: HttpClientService) {}
```

---

# 呼叫方法（二）— subscribe 訂閱

接著你就可以在你的方法中去呼叫，範例是呼叫 get 的方法所以我呼叫 `getApi` 方法時只需要傳入 url，接下來 `subscribe`（訂閱）的用法就是我們呼叫這個方法時會等 `getApi` 回傳才去處理裡面的動作，`res` 就是指回傳的內容，`res` 可自行命名。

```typescript
ngOnInit(): void {
  this.http.getApi('https://api.freeapi.app/api/v1/public/randomusers')
    .subscribe((res) => console.log(res));
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> <code>subscribe()</code> 是 RxJS Observable 的訂閱方式，Angular 的 HttpClient 回傳的都是 Observable，必須透過 subscribe 才會實際發送請求。
</div>

---

# 呼叫方法（post/put）（一）

跟 get 不同，post 跟 put 是前端呼叫 API 時需要回傳內容給後端，所以我們在呼叫 post 或者 put 的 API 前會先將要回傳的內容先打包成 JSON 格式（大部分回傳跟接收 API 的資料格式皆為 JSON）。

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

---

# 呼叫方法（post/put）（二）

可以試著呼叫 `https://api.freeapi.app/api/v1/kitchen-sink/http-methods/post` 這隻免費的 post API，如果有收到 res 內容就代表成功了。

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 免費 API 網址
# Free API Resources

---
layout: two-cols
---

# 免費 API 網址

這個網址有免費的 API 可以呼叫，請各位試著去嘗試呼叫並且結合畫面顯示將內容顯示出來。

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

---

# 練習

使用以下中央氣象署開放資料 API，將資料呈現在畫面上，並且做出畫面（非單純顯示資料）與樣式設計。

```
https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-065?Authorization=CWA-69B5A9F7-1D8D-495E-A1F2-C160E39B4D44&limit=10&format=JSON
```

**任務要求：**

1. 使用 `HttpClientService` 的 `getApi` 方法呼叫上方 API
2. 在 `ngOnInit` 中發送請求並 `subscribe` 取得資料
3. 將回傳的氣象資料呈現在畫面上
4. 設計適合的 UI 版面與 CSS 樣式（非單純文字列表）

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>提示：</b> 可以用 card 卡片、表格或其他有設計感的排版方式呈現氣象資料，避免單純顯示 JSON。
</div>

---
layout: end
---

# 課程結束
### 學會串接 API，讓 Angular 應用與後端真正連線！
