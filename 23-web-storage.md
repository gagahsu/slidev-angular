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

<!--
各位學員，歡迎來到「網頁儲存（Web Storage）」的主題！
你想想看，今天我們點了一款線上養成遊戲，辛辛苦苦把勇者練到 99 級。
結果不小心按到鍵盤 F5 重新整理，或者是瀏覽器閃退，再打開時勇者居然回到了 1 級新手村！
這絕對會讓人氣到想砸電腦！
之前我們學的 Service，雖然能幫我們在各個房間傳遞貨物。
但只要你一刷新網頁，Service 還是會當場「失憶」，重新歸零。
所以，今天我們要來學習如何把資料「刺青（持久化）」在瀏覽器的硬碟裡！
-->

---
layout: default
---

# Outline

- **網頁儲存的三種方法** — Cookie、localStorage、sessionStorage 介紹
- **Cookie 使用** — 安裝 ngx-cookie-service，set 與 get 操作
- **localStorage 與 sessionStorage 差異** — 資料持久性與作用範圍
- **儲存跟讀取** — setItem 與 getItem 用法

<!--
今天我們的瀏覽器置物櫃大作戰計畫如下：
先了解三種網頁儲存的法寶：Cookie、localStorage 與 sessionStorage。
接著，看看比較古老但身分驗證必備的 Cookie 怎麼在 Angular 裡透過套件安裝與 set / get 使用。
然後，對決 localStorage 和 sessionStorage 這兩個親兄弟，釐清它們的生命週期和地盤範圍。
最後，掌握最核心的儲存與讀取 API：setItem 和 getItem 的用法！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 網頁儲存的三種方法
# Web Storage Overview

<!--
第一站，我們先來挑選合適的置物櫃。
-->

---

# 網頁儲存的三種方法

除了 service 負責元件間資料傳遞外，有時也需要將資料持久化至瀏覽器本地端。網頁的資料儲存方式分為三種：**Cookie**、**localStorage**、**sessionStorage**。

Cookie 主要用於 API 身分驗證，使用頻率較低。localStorage 與 sessionStorage 則儲存在對應網域的瀏覽器空間中。

| 方式 | 容量 | 主要用途 |
| --- | --- | --- |
| Cookie | 約 4KB | 登入、跨域 Tracking、Session ID |
| localStorage | 約 5–10MB | 自訂資料，手動清除才消失 |
| sessionStorage | 約 5–10MB | 自訂資料，分頁關閉即消失 |

<!--
網頁的儲存方式主要有這三種：Cookie、localStorage 和 sessionStorage。
這三種地方，大叔用日常生活的容器來比喻。
第一種 Cookie：容量極小（只有 4KB），它就像是你的「通行證/身分證」。通常是伺服器要用來確認你到底是誰的，每次發請求都會自動帶上它。
第二種 localStorage：容量非常大（有 5 到 10MB），它就像是網頁在你瀏覽器裡的「保險箱」。只要你不主動去把它清空，它裡面的資料就算放了一萬年、關掉瀏覽器再開，依然都在。
第三種 sessionStorage：容量一樣大，但它像是一個「臨時保管箱」。小命比較短。只要你把這個網頁分頁關掉，保管箱裡的東西就會當場銷毀，開新分頁也是讀不到的喔！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Cookie 使用
# Cookie Usage

<!--
既然認識了置物櫃，我們先來看看那個管身分驗證的 Cookie 要怎麼在 Angular 裡使用。
-->

---

# Cookie 使用 — 安裝套件

Angular 未內建 CookieService（舊版 `cookieStore` 已淘汰），目前主流使用 **ngx-cookie-service**。

指定 19.0.0 版本安裝（最新版與 Angular 19 有衝突）：

```bash
npm install ngx-cookie-service@19.0.0
```

<!--
因為 Angular 本身沒有內建方便操作 Cookie 的功能。
所以在業界，我們通常會安裝第三方套件 `ngx-cookie-service`。
大叔特別提醒大家：安裝時請指定安裝 `@19.0.0` 版本！
因為最新版有時候會跟 Angular 的版本打架，噴出一堆相容性紅字，裝這個穩定版本可以讓我們少掉很多白頭髮！
-->

---

# Cookie 使用 — 注入 CookieService

使用 `inject()` 將 `CookieService` 注入為類別屬性，後續即可透過該屬性操作 cookie。

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

<!--
安裝完成後，在你的元件 TS 檔裡。
我們用 `inject(CookieService)` 的方式注入這個服務。
把它指派給 `cookieService` 變數。
這樣我們就能在元件內部，透過這個服務來存取 Cookie 了。
-->

---

# Cookie 使用 — 儲存資料 (set)

使用 `cookieService.set()` 儲存資料，前三個參數最為關鍵：key 名稱、儲存值、過期天數。Cookie 到期後瀏覽器將自動刪除。

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

<!--
存資料的語法是 `cookieService.set()`。
這裡面最多可以傳入 7 個參數，其中前三個最重要：
第一個是 Key（名稱），比如 'user_display_name'。
第二個是 Value（值），比如 'Allen'。
第三個是 Expires（過期天數），比如我們寫 7，就代表這個 Cookie 在 7 天後會自動灰飛煙滅。
剩下的參數是用來做安全防護的，一般維持預設就可以了。
-->

---

# Cookie 使用 — 瀏覽器確認

開啟開發者工具 → **Application** → **Storage** → **Cookies** → 選擇對應網址，即可看到剛才設定的 cookie 紀錄。

<div class="mt-6 flex justify-center">
  <img src="/images/23-web-storage/cookie-devtools.png" class="rounded shadow-md max-h-64" />
</div>

<!--
如果你想親眼看看它是不是真的存進去了。
可以在瀏覽器按下 F12 開啟開發者工具。
切換到「Application」分頁，在左側找到「Cookies」，點開你正在測試的網址。
登登！你會看到剛才設定的 Key、Value 還有到期時間，都整整齊齊地躺在表格裡囉！
-->

---

# Cookie 使用 — 讀取資料 (get)

使用 `cookieService.get(key)` 讀取對應 key 的 cookie值，不存在或已過期則回傳空字串。

```typescript
console.log(this.cookieService.get('user_display_name'));
```

<!--
讀取的語法非常簡單：
`cookieService.get('Key 名稱')`。
拿剛才的例子來說，我們傳入 'user_display_name'，它就會回傳字串 'Allen'。
如果這個 Key 根本不存在或者是早就過期被瀏覽器擦掉了，它就會摸摸鼻子回傳一個空字串給你。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# localStorage 與 sessionStorage
# Differences & Usage

<!--
接下來，我們來看看更常用、而且不需要安裝任何套件的原生 Web Storage：localStorage 和 sessionStorage！
-->

---

# localStorage 跟 sessionStorage 差異

兩者的 API 寫法與儲存空間相同，唯一差異在於資料的生命週期：

| 比較項目 | localStorage | sessionStorage |
| --- | --- | --- |
| 資料消失時機 | 手動刪除或清除瀏覽器才消失 | 開啟新分頁就會消失 |
| 作用範圍 | 綁定網域（如 localhost:4200） | 綁定當前分頁 |
| 跨埠口 | 不同埠口（4200 vs 4201）無法共用 | 分頁關閉或開新分頁即消失 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> localStorage 綁定網域，<code>localhost:4200</code> 與 <code>localhost:4201</code> 為不同來源，無法共用資料。sessionStorage 綁定當前分頁，分頁關閉或開新分頁即消失。
</div>

<!--
我們把這兩兄弟的差別列在這張表格。
主要的勝負在於「生命週期（壽命）」：
localStorage 的資料是「萬年不老」的。除非使用者自己去清除瀏覽器快取，或者是我們用程式碼手動 delete 它，否則它會一直在。
sessionStorage 的資料則是「短命鬼」。它只活在這個特定的瀏覽器分頁裡。一旦分頁被叉掉關閉，資料就瞬間灰飛煙滅。
而且注意喔！這兩個儲存空間都有「網域防護」。
你在 `localhost:4200` 存的東西，換到 `localhost:4201` 是讀不到的！這也是瀏覽器為了安全性所做的一種保護防線。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 儲存跟讀取
# setItem & getItem

<!--
那我們要怎麼對這兩個保管箱寫扣進行存取呢？
-->

---

# 儲存跟讀取

localStorage 與 sessionStorage 皆以 key-value 方式儲存資料，提供兩種操作函式：

| 操作 | 函式 | 說明 |
| --- | --- | --- |
| 儲存 | `setItem("key", "value")` | 以 key 為名稱儲存 value |
| 讀取 | `getItem("key")` | 以 key 取得對應的值 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 同一個 key 再次 setItem 會覆蓋原有資料，請確保 key 值唯一。
</div>

<!--
這兩個保管箱用的是瀏覽器內建的原生 API，語法非常一致且好記：
要塞東西，叫 `setItem(Key, Value)`。
要拿東西，叫 `getItem(Key)`。
這兩個方法都只需要傳入字串。
大叔要特別提醒一件事：**如果你用同一個 Key 再次呼叫 setItem，舊的資料會被新資料直接覆蓋過去**！
所以取名字（Key）的時候一定要注意，不要撞名，免得自己的資料被鬼隱了！
-->

---

# 儲存跟讀取 — 程式碼範例

兩者 API 語法相同，只需替換前綴。屬於原生 Web API，不需安裝套件。

```javascript
// 儲存資料
localStorage.setItem('name', 'Allen');
sessionStorage.setItem('name', 'Allen');

// 讀取資料
localStorage.getItem('name');
sessionStorage.getItem('name');
```

<!--
我們看看寫法。
因為是瀏覽器內建的，不需要 import 任何東西，在 TS 或 JS 裡直接寫 `localStorage.setItem(...)` 或者是 `sessionStorage.setItem(...)` 就可以了。
讀取就是 `localStorage.getItem(...)`。
非常直覺！
但有一個小陷阱：**它們只能存字串（String）**！
如果你要把一個複雜的 JS 物件（Object）存進去，你直接丟進去，它會變成一串沒用的 `[object Object]`。
所以如果想存物件，我們要先用 `JSON.stringify()` 把物件烤成 JSON 字串才能存；
讀出來時，再用 `JSON.parse()` 把它還原成物件。這個是業界最常用的小技巧，大家先記在大腦裡！
-->

---
layout: end
---

# 課程結束
### Cookie、localStorage、sessionStorage — 依需求選擇合適的儲存方式

<!--
恭喜大家！學會了這三種瀏覽器的本地儲存法寶！
現在你寫的網頁再也不會一重整就鬧失憶了，不論是使用者的自訂偏好、Token、還是暫存資料，你都有合適的地方可以安放它們。
下一堂課，我們要迎來重頭戲了——「陣列顯示（Array Display）」，去看怎麼在網頁畫面上，用循環語法把一整張陣列的清單列表一口氣畫出來！大家休息一下，我們等一下見！
-->
