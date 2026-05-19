---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 網頁儲存
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
    網頁儲存
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「掌握 Cookie、localStorage 與 sessionStorage 的使用時機」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **網頁儲存的三種方法** — Cookie、localStorage、sessionStorage 介紹
- **Cookie 使用** — 安裝 ngx-cookie-service，set 與 get 操作
- **localStorage 與 sessionStorage 差異** — 資料持久性與作用範圍
- **儲存跟讀取** — setItem 與 getItem 用法

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 網頁儲存的三種方法
# Web Storage Overview

---

# 網頁儲存的三種方法

儲存跟傳遞資料的方法除了之前交到各位的 service 用來存放資料傳遞之外，有時候還會用到網頁本身的資料儲存方式。

網頁的資料儲存方式分為三種：**Cookie**、**localStorage**、**sessionStorage**。

Cookie 主要是在串接 Api 時才會去新增，使用到的機會偏低。

localStorage 跟 sessionStorage 就是會儲存在對應網頁的儲存空間（需要同網域）。

| 方式 | 容量 | 主要用途 |
| --- | --- | --- |
| Cookie | 約 4KB | 登入、跨域 Tracking、Session ID |
| localStorage | 約 5–10MB | 自訂資料，手動清除才消失 |
| sessionStorage | 約 5–10MB | 自訂資料，分頁關閉即消失 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> Cookie 的容量最小（約 4KB），大部分用來儲存登入、跨域 Tracking、Session ID 等資料，而 localStorage 跟 sessionStorage 就是要看使用者自己要怎麼設計了。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Cookie 使用
# Cookie Usage

---

# Cookie 使用 — 安裝套件

Angular 官方並沒有內建的 cookieService（以前有使用 cookieStore 但是已經淘汰），現在大部分都會使用 **ngx-cookie-service** 這個套件。

安裝的指令為（這邊指定 19.0.0 版本，最新版有衝突）：

```bash
npm install ngx-cookie-service@19.0.0
```

安裝完後在你要使用的 TS 檔，我們就可以去新增套件並且使用。

---

# Cookie 使用 — 注入 CookieService

要使用的時候要先宣告一個全域變數用來將套件注入，那下面要使用該套件時我們就可以直接宣告該全域變數。

```typescript
import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // 使用 inject 相依注入 CookieService 套件
  cookieService = inject(CookieService);
}
```

---

# Cookie 使用 — 儲存資料 (set)

緊接著就可以用程式將你要儲存的內容存進網頁的 cookie 中（注意容量），要儲存有自己的套件寫法，主要的就是前三個最重要（對應的 key、存入的值、過期天數），如果 cookie 過期瀏覽器將會自動刪除該資料。

```typescript
this.cookieService.set(
  'user_display_name', // 1. Name（名稱）
  'Allen',             // 2. Value（值）
  7,                   // 3. Expires（過期天數）
  '/',                 // 4. Path（路徑）
  '',                  // 5. Domain（網域）
  true,                // 6. Secure（加密傳輸）
  'Strict'             // 7. SameSite（跨站限制）
);
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 前三個參數最重要：對應的 key、存入的值、過期天數。Cookie 過期後瀏覽器會自動刪除該筆資料。
</div>

---

# Cookie 使用 — 瀏覽器確認

儲存完後你可以在瀏覽器的儲存空間看到這筆資料。

打開開發者工具 → **Application** → **Storage** → **Cookies** → 選擇對應的網址，即可看到剛才設定的 cookie 紀錄。

<div class="mt-6 flex justify-center">
  <img src="/images/23-web-storage/cookie-devtools.png" class="rounded shadow-md max-h-64" />
</div>

---

# Cookie 使用 — 讀取資料 (get)

那剛剛我們是儲存（set），如果現在我們要在程式中撈取就變成要使用（get），寫法也很簡單就是在 get 後面的 () 中寫上你要撈取的 cookie 的 key。

```typescript
console.log(this.cookieService.get('user_display_name'));
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 使用 <code>get(key)</code> 取得對應 key 的 cookie 值，若 cookie 不存在或已過期則回傳空字串。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# localStorage 與 sessionStorage
# Differences & Usage

---

# localStorage 跟 sessionStorage 差異

這兩個都是網頁儲存資料的寫法，那他們的差異在哪呢？

他們兩個的儲存跟讀取的寫法都一樣，儲存空間也一樣，唯一的差異就是：

| 比較項目 | localStorage | sessionStorage |
| --- | --- | --- |
| 資料消失時機 | 手動刪除或清除瀏覽器才消失 | 開啟新分頁就會消失 |
| 作用範圍 | 綁定網域（如 localhost:4200） | 綁定當前分頁 |
| 跨埠口 | 不同埠口（4200 vs 4201）無法共用 | 分頁關閉或開新分頁即消失 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> localStorage 是綁定你的網域，簡單來說你的網址現在為 <code>http://localhost:4200/</code>，就算後面開啟的是同一個專案但網址有變化為 <code>http://localhost:4201/</code>，這時候是抓不到 4200 的內容的。而 sessionStorage 是綁在你現在開啟的分頁上，分頁關閉或者開新分頁就會消失。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 儲存跟讀取
# setItem & getItem

---

# 儲存跟讀取

那我們要怎麼儲存資料跟讀取資料呢？

localStorage、sessionStorage 這兩者都是使用鍵與值（key-value）的方式儲存在用戶本地端，簡單來說跟我們開變數一樣，你要儲存內容要開一個變數用來儲存，你要存網頁暫存也是一樣要開一個對應的名稱來儲存，那撈取的時候就用對應的名稱去撈取內容。

所以他們的函式就分成兩種：

| 操作 | 函式 | 說明 |
| --- | --- | --- |
| 儲存 | `setItem("key", "value")` | 以 key 為名稱儲存 value |
| 讀取 | `getItem("key")` | 以 key 取得對應的值 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 你可以儲存很多個資料，只要 key 不一樣，而當你的 key 值相同時舊資料就會被覆蓋，所以寫的時候要注意 key 值的部分。
</div>

---

# 儲存跟讀取 — 程式碼範例

要用的時候會在要儲存的地方使用 `setItem` 將資料儲存近網頁中，而當你要撈取資料時就要用 `getItem` 來去撈取你要撈取的內容。

你可以儲存很多個資料，只要 key 不一樣，而當你的 key 值相同時舊資料就會被覆蓋，所以要注意 key 值的部分。

```javascript
// 儲存資料
localStorage.setItem('name', 'Allen');
sessionStorage.setItem('name', 'Allen');

// 讀取資料
localStorage.getItem('name');
sessionStorage.getItem('name');
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> localStorage 與 sessionStorage 的 API 寫法完全相同，差別只在資料的生命週期。直接使用原生 Web API，不需要額外安裝套件。
</div>

---
layout: end
---

# 課程結束
### Cookie、localStorage、sessionStorage — 依需求選擇合適的儲存方式
