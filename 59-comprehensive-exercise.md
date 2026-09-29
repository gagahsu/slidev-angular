---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 綜合練習：動態問卷系統
routeAlias: ch59
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
    綜合練習
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「動態問卷系統：把整個課程串成一個真實的前台 + 後台」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這是整個課程最後一個練習，也是所有課程的匯合點：動態問卷系統。

在 MySQL 課，我們設計了六張表；在 Spring Boot 課，我們做出了完整的 REST API；現在，輪到 Angular 把它變成使用者看得到、操作得到的網站。

這一章跟以前的綜合練習不一樣。以前是把幾個章節的功能組合成一個頁面；這次是一整個系統，有前台、有後台、有登入、有權限，而且是前後端真的串在一起運作。這是一個可以放進作品集的專案。

前面每一章的練習，都已經做出了這個系統的一部分：路由導覽、問卷預覽、串 API、列表分頁、日期防呆、即時搜尋、統計圖、對話框、作答表單、驗證、攔截器、守衛。這一章要做的，是把這些碎片拼起來，補上剩下的頁面。
-->

---
layout: default
---

# Outline

- **系統總覽** — 頁面地圖與 API
- **前台需求** — 列表、作答、確認、統計、會員
- **後台需求** — 列表與批次刪除、三步驟編輯、回饋、統計
- **實作順序** — 每個階段用到哪一章
- **解題提示與常見問題** — 前後端串接最容易踩的坑
- **關鍵解答** — 專案骨架、作答確認、後台編輯
- **驗收** — 自動化端對端測試

<!--
路線圖：先看系統的全貌，再看需求，然後是建議的實作順序與提示，最後給幾段關鍵的參考解答。完整的、可以執行的參考答案，放在 reference/survey-web 專案裡，建議大家先自己做，卡住的時候再去對照。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 系統總覽
# Overview

<!--
先建立整體的地圖。
-->

---
layout: default
---

# 頁面地圖

| 區塊 | 路徑 | 頁面 | 守衛 |
| --- | --- | --- | --- |
| 前台 | `/surveys` | 問卷列表（搜尋 + 分頁 + 狀態） | — |
| | `/surveys/:id/fill` | 作答頁 | — |
| | `/surveys/:id/confirm` | 確認頁（從 Session 讀取） | — |
| | `/surveys/:id/stats` | 統計頁 | — |
| 會員 | `/login`、`/register` | 登入、註冊 | — |
| | `/profile`、`/my-records` | 會員資料、我的填寫紀錄 | `authGuard` |
| 後台 | `/admin` | 後台列表（勾選批次刪除） | `adminGuard` |
| | `/admin/edit`、`/admin/edit/:id` | 新增、編輯（三步驟） | `unsavedGuard` |
| | `/admin/view/:id` | 唯讀檢視 | |
| | `/admin/:id/responses`、`/admin/responses/:id` | 問卷回饋、作答明細 | |
| | `/admin/:id/stats` | 統計（後台） | |

<style>
.slidev-layout td, .slidev-layout th { padding: 3px 8px !important; font-size: 14px !important; line-height: 1.35 !important; }
.slidev-layout table { margin: 0.4rem 0 !important; }
.slidev-layout p, .slidev-layout li { font-size: 15px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
</style>

<!--
這張表就是整個系統的路由表。前台的頁面任何人都能看，會員頁要登入，後台的所有路徑都在 /admin 底下，用父路由加上 adminGuard 一次保護。

注意編輯頁有一個 unsavedGuard，也就是第 58 章的離開確認。
-->

---
layout: default
---

# 使用的 API（Spring Boot 第 37–47 章）

| 用途 | API |
| --- | --- |
| 會員 | `POST /api/auth/register`、`/login`、`/refresh`；`GET·PUT /api/users/me`；`GET /api/users/me/responses` |
| 前台問卷 | `GET /api/surveys`（`title`、`startDate`、`endDate`、`page`、`size`）、`GET /api/surveys/{id}`、`/statistics` |
| 作答 | `POST·GET /api/surveys/{id}/draft`（暫存在 **Session**）、`POST /api/surveys/{id}/submit`（寫入 DB） |
| 後台問卷 | `GET·POST /api/admin/surveys`、`PUT /api/admin/surveys/{id}`、`DELETE /api/admin/surveys`（Body：id 陣列） |
| 後台暫存 | `POST·GET /api/admin/survey-draft`、`POST /api/admin/survey-draft/commit?publish=` |
| 後台回饋 | `GET /api/admin/surveys/{id}/responses`、`GET /api/admin/responses/{id}`、`GET /api/admin/surveys/{id}/statistics` |

所有回應：`{ code, message, data }`；分頁：`{ content, page, size, totalElements, totalPages }`（`page` 從 0 開始）。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 完整規格在 <code>SURVEY-SPEC.md</code>；後端啟動方式見 <code>slidev-springboot/reference/README.md</code>（<code>./gradlew bootRun</code>，資料庫用 <code>sql/schema.sql</code> + <code>seed.sql</code>）。
</div>

<style>
.slidev-layout td, .slidev-layout th { padding: 3px 8px !important; font-size: 14px !important; line-height: 1.35 !important; }
.slidev-layout table { margin: 0.4rem 0 !important; }
.slidev-layout p, .slidev-layout li { font-size: 15px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
</style>

<!--
API 大部分在前面的章節都用過了。特別留意三組：作答的 draft 與 submit、後台的 survey-draft 與 commit，這兩組都是「先暫存在後端 Session，最後才寫進資料庫」的設計。前端不需要自己保存暫存資料，每次換頁都問後端拿。

執行前，請先確認後端跑起來了，用瀏覽器開 http://localhost:8080/api/surveys，看得到 JSON。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 需求
# Requirements

<!--
接下來是需求，來自需求文件。
-->

---
layout: default
---

# 前台需求

1. **列表頁**：標題模糊搜尋 + 開始／結束日期區間（可組合）；分頁，預設 10 筆、每頁筆數可選；欄位：編號、名稱、狀態、開始、結束、觀看統計
   - 名稱：**進行中**才是連結；其他狀態只是文字
   - 「觀看統計」：只有進行中、已結束才顯示
2. **作答頁**：姓名、手機、Email 必填，年齡選填；動態題目（單選／多選／文字，可設必填）；格式或必填錯誤以**提醒視窗**告知；同一 Email 不能重複填寫同一份問卷
3. **確認頁**：唯讀，資料從 **Session** 讀取；單選、多選只顯示被選取的項目；「送出」寫入資料庫並回列表；「修改」回作答頁並**帶回**先前資料；兩個按鈕都要**先詢問**
4. **統計頁**：選擇題圓餅圖，文字題列出內容
5. **會員**：註冊、登入（JWT）、我的填寫紀錄、修改會員資料；登入是選用的，未登入也能匿名作答

<!--
前台有幾個細節，需求文件寫得很清楚，做的時候一條一條對照。

列表頁的狀態，是後端算好的。名稱是不是連結，要看狀態，這是第 33 章做過的。

作答頁按送出，不是真的送出，是先存在 Session，跳到確認頁。確認頁按「修改」回到作答頁時，要把先前填的內容帶回來，這需要再問後端一次拿 Session 的暫存。

同一個 Email 不能重複，是後端檢查的，前端只要把後端的錯誤訊息用提醒視窗顯示出來。
-->

---
layout: default
---

# 後台需求（限管理員）

1. **列表頁**：搜尋（標題模糊、日期區間）；分頁預設 10 筆；欄位：勾選、編號、名稱（連結）、狀態、開始、結束、結果
   - 名稱連結：未發佈／尚未開始 → **編輯頁**；進行中／已結束 → **唯讀頁**
   - 刪除：只有**未發佈、尚未開始**的列可以勾選；可**批次**刪除，先詢問
2. **新增／編輯（三個步驟）**：
   1. 基本資料：標題、說明必填；日期預設 **今天 + 2**、**今天 + 7**；開始日期必須**晚於今天**；結束日期不能早於開始日期
   2. 題目：新增／編輯／刪除題目；選項是陣列；「加入」暫存到 **Session**；「刪除」只改畫面
   3. 確認：「僅儲存」（`published = 0`）或「儲存並發佈」（`published = 1`）
3. **問卷回饋**：依填寫編號**倒序**，分頁；「前往」看單筆作答（唯讀）
4. **統計**：同前台

<!--
後台的重點是三步驟的編輯頁。第一步的日期規則，是第 35 章和第 52 章的練習；第二步的題目管理，是第 24 章和第 51 章的練習；第三步的兩個儲存按鈕，差別只在傳給後端的 publish 參數。

注意「進行中」與「已結束」的問卷是唯讀的，為什麼？因為已經有人作答了，如果可以修改題目，過去的答案就對不上題目了。這是資料一致性的考量，後端也會擋，前端則是把畫面設成唯讀。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作順序與提示
# Approach

<!--
這麼多功能，從哪裡開始？
-->

---
layout: default
---

# 建議的實作順序

| 階段 | 做什麼 | 對應章節 |
| --- | --- | --- |
| 1 骨架 | 專案、導覽列、路由表、`SurveyService`、`models.ts` | 第 23、29 章 |
| 2 前台列表 | Mat-table + 分頁 + 搜尋（標題、日期） | 第 33、35、38 章 |
| 3 登入 | `AuthService`、登入／註冊頁、攔截器、守衛 | 第 52、57、58 章 |
| 4 作答流程 | 作答頁 → 暫存 → 確認頁 → 送出；重複 Email 處理 | 第 43、50、52 章 |
| 5 統計 | 圓餅圖 + 文字題 | 第 42 章 |
| 6 後台列表 | 批次刪除、依狀態連結 | 第 33、43 章 |
| 7 後台編輯 | 三步驟、題目 CRUD、Session 暫存、離開確認 | 第 24、51、58 章 |
| 8 後台回饋 | 回饋列表、明細 | 第 33 章 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 每完成一個階段，就用真的後端測一次，不要全部寫完才測。
</div>

<style>
.slidev-layout td, .slidev-layout th { padding: 3px 8px !important; font-size: 14px !important; line-height: 1.35 !important; }
.slidev-layout table { margin: 0.4rem 0 !important; }
.slidev-layout p, .slidev-layout li { font-size: 15px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
</style>

<!--
順序的原則是「由簡入繁、每一步都可以測」。先做骨架和列表，因為它們最單純，而且可以先驗證前後端有沒有接通；登入要早點做，因為後台所有功能都需要它；作答流程和後台編輯是最複雜的，放在後面。

每個階段完成，就用真的後端測。前後端串接的問題，越早發現越好處理。
-->

---
layout: default
---

# 解題提示：容易踩的坑

| 現象 | 原因與做法 |
| --- | --- |
| Console：`blocked by CORS policy` | 後端要 `allowedOrigins("http://localhost:4200")` 且 `allowCredentials(true)`（第 29 章） |
| 作答「暫存」後，確認頁說沒有資料 | 請求沒帶 Cookie：要 `withCredentials: true`（攔截器一次搞定，第 57 章） |
| 資料回來畫面沒更新 | Angular 21 是 zoneless：非同步回來的資料要放 **signal**（第 44、47 章） |
| 日期差一天 | `toISOString()` 是 UTC；用年月日自己組字串（第 52 章 `toDateString`） |
| 換頁後頁碼錯亂 | 後端 `page` 從 **0** 開始，`mat-paginator` 的 `pageIndex` 也是 0，直接對接 |
| 搜尋後停在第 3 頁 | 搜尋條件改變，`page` 要回到 0 |
| 登入後重新整理就登出 | 登入狀態要存 `localStorage`，`AuthService` 啟動時讀回來（第 57 章） |
| `NG0100` 錯誤 | 樣板裡 `map()` 每次產生新陣列；資料整理好存進 signal（第 42 章） |
| 多選題答案怎麼傳 | `values: string[]`，後端負責用 `;` 串成一個字串存進資料庫，前端不處理 |

<style>
.slidev-layout td, .slidev-layout th { padding: 3px 8px !important; font-size: 14px !important; line-height: 1.35 !important; }
.slidev-layout table { margin: 0.4rem 0 !important; }
.slidev-layout p, .slidev-layout li { font-size: 15px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
</style>

<!--
這張表把前面各章踩過的坑整理在一起。遇到問題，先來這裡對照。

特別提一下作答暫存的 Cookie 問題：這是最常遇到、也最難查的。症狀是「暫存的時候成功，但確認頁讀不到」。原因是每次請求後端都當成不同的使用者，因為沒有帶 Session 的 Cookie。用攔截器統一加上 withCredentials，就不會漏。

還有一個可能的原因是後端：Spring Security 預設會在每次認證後換掉 Session ID（防止 session fixation），如果前後端同時使用 JWT 與 Session，後端要關掉這個行為。參考專案已經設定好了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 關鍵解答
# Key Solutions

<!--
接下來是幾段關鍵的參考解答。完整版在 reference/survey-web。
-->

---
layout: default
---

# 關鍵解答：專案骨架

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),   // 第 57 章
    provideNativeDateAdapter(),                               // 第 35 章 mat-datepicker
  ],
};
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
專案的核心設定其實很短：providers 裡註冊路由、HTTP（含攔截器）、日期轉接器；路由表決定所有頁面與守衛。
-->

---
layout: default
---

# 關鍵解答：專案骨架（續）

```typescript
// app.routes.ts（節錄）
export const routes: Routes = [
  { path: '', redirectTo: 'surveys', pathMatch: 'full' },
  { path: 'surveys', component: SurveyList },
  { path: 'surveys/:id/fill', component: SurveyFill },
  { path: 'surveys/:id/confirm', component: SurveyConfirm },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  {
    path: 'admin',
    canActivate: [adminGuard],                 // 第 58 章：保護整個後台
    children: [
      { path: '', component: AdminList },
      { path: 'edit', component: AdminEditor, canDeactivate: [unsavedGuard] },
      { path: 'edit/:id', component: AdminEditor, canDeactivate: [unsavedGuard] },
      { path: 'view/:id', component: AdminEditor },           // 同一個元件，唯讀模式
      { path: ':id/responses', component: AdminResponses },
    ],
  },
  { path: '**', redirectTo: 'surveys' },
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
有一個設計值得注意：新增、編輯、檢視，是同一個 AdminEditor 元件，用不同的路由區分。檢視模式是唯讀的，元件從網址判斷自己是哪一種模式，這樣三個功能共用同一份畫面與邏輯。
-->

---
layout: default
---

# 關鍵解答：作答 → 確認 → 送出

```typescript
// survey-fill.ts：按「送出」，不寫資料庫，先暫存到後端 Session，再跳到確認頁
async next() {
  /* …驗證：把所有問題收集成 problems，有就 alert 並 return… */
  const body: Response = { name: v.name, phone: v.phone, email: v.email, age: v.age,
    answers: s.questions.map((q, i) => { /* 每題一筆 { questionId, values: string[] } */ }) };
  this.api.saveDraft(this.id, body).subscribe({
    next: () => this.router.navigate(['/surveys', this.id, 'confirm']),
    error: e => this.dialogs.alert(e.error?.message ?? '暫存失敗'),   // 例如「此 Email 已經填寫過」
  });
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
作答流程有三步：填寫頁送出→暫存到 Session→確認頁讀取→按確認才真正寫入資料庫。

前端不保存暫存資料，每次都問後端：填寫頁按「修改」回來時，用 getDraft 把資料帶回；確認頁進來時，也用 getDraft 讀。這樣即使使用者在確認頁按 F5，資料也不會遺失。
-->

---
layout: default
---

# 關鍵解答：作答 → 確認 → 送出（續）

```typescript
// survey-confirm.ts：從 Session 讀取，兩個按鈕都要先詢問
constructor() {
  this.api.get(this.id).subscribe(s => this.survey.set(s));
  this.api.getDraft(this.id).subscribe({
    next: d => this.draft.set(d),
    error: async e => { await this.dialogs.alert(e.error?.message ?? '沒有暫存的資料'); this.router.navigate(['/surveys', this.id, 'fill']); },
  });
}

async submit() {
  if (!(await this.dialogs.confirm('確定要送出嗎？送出後無法修改'))) return;
  this.api.submit(this.id).subscribe({
    next: async () => { await this.dialogs.alert('已送出，謝謝您的填寫', '完成'); this.router.navigate(['/surveys']); },
    error: e => this.dialogs.alert(e.error?.message ?? '送出失敗'),
  });
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
兩個按鈕的確認詢問，用的是第 43 章的 Dialogs，await 讓程式碼非常直覺。

重複 Email 的錯誤，是在「暫存」的時候，後端就檢查了，所以使用者不必填完整份問卷才發現。
-->

---
layout: default
---

# 關鍵解答：後台編輯的三步驟

```typescript
// admin-editor.ts（節錄）
async toQuestions(stepper: { next(): void }) {            // 第 1 步 → 第 2 步：驗證基本資料
  if (this.readonly || await this.validateBasic()) stepper.next();
}

async toConfirm(stepper: { next(): void }) {              // 第 2 步 → 第 3 步：題目暫存到 Session
  if (this.readonly) { stepper.next(); return; }
  if (this.questions().length === 0) { await this.dialogs.alert('至少要有一題'); return; }
  this.api.saveSurveyDraft(this.toSurvey()).subscribe({
    next: () => stepper.next(),
    error: e => this.dialogs.alert(e.error?.message ?? '暫存失敗'),
  });
}

// ... 見下一頁
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
三步驟用 Material 的 stepper（步驟元件）呈現。每一步的「下一步」按鈕，先做該步驟的檢查或暫存，通過了才呼叫 stepper.next()。

第一步的驗證包含日期規則：預設今天加 2、今天加 7，開始必須晚於今天。這是第 52 章自訂驗證器的規則。
-->

---
layout: default
---

# 關鍵解答：後台編輯的三步驟（續）

```typescript
// ... 接上一頁

commit(publish: boolean) {                                // 第 3 步：僅儲存／儲存並發佈
  this.api.commit(publish).subscribe({
    next: () => {
      this.basic.markAsPristine(); this.changed = false;  // 已儲存：離開時不必再確認（第 58 章）
      this.dialogs.alert(publish ? '已儲存並發佈' : '已儲存').then(() => this.router.navigate(['/admin']));
    },
    error: e => this.dialogs.alert(e.error?.message ?? '儲存失敗'),
  });
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
第二步「下一步」時，把整份問卷暫存到後端 Session，第三步的確認頁只是顯示；按「儲存」時，呼叫 commit，後端才真正寫入資料庫，publish 參數決定要不要發佈。

commit 成功後，先 markAsPristine，再導向列表，才不會被離開確認擋下來。
-->

---
layout: default
---

# 關鍵解答：後台列表的批次刪除

```typescript
// admin-list.ts（節錄）
selected = signal<Set<number>>(new Set());

/** 只有「未發佈」「尚未開始」才能修改、刪除 */
editable(s: Survey) { return s.status === 'DRAFT' || s.status === 'NOT_STARTED'; }

toggle(id: number, checked: boolean) {
  const next = new Set(this.selected());
  checked ? next.add(id) : next.delete(id);
  this.selected.set(next);
}

async remove() {
  if (!(await this.dialogs.confirm(`確定要刪除選取的 ${this.selected().size} 份問卷嗎？`))) return;
  this.api.deleteMany([...this.selected()]).subscribe({
    next: () => this.load(this.page().page, this.page().size),
    error: e => this.dialogs.alert(e.error?.message ?? '刪除失敗'),
  });
}
```

```html
<mat-checkbox [disabled]="!editable(s)" (change)="toggle(s.id, $event.checked)" />
<a [routerLink]="editable(s) ? ['/admin/edit', s.id] : ['/admin/view', s.id]">{{ s.title }}</a>
```

<style>
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.5rem 1.2rem !important; width: calc(100% + 3rem) !important; margin: 0.4rem -3rem 0.4rem 0 !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12px !important; line-height: 1.25 !important; }
</style>

<!--
勾選的 id 用 Set 存在 signal 裡，Set 不能重複，加入或移除都很方便。更新 signal 的時候，要建立一個新的 Set，而不是修改舊的，signal 才知道值變了。

「哪些列可以勾選」是需求文件的規定，用 editable 函式判斷。這個判斷在前端只是為了使用者體驗，後端刪除的時候也會再檢查，如果有人硬送一個進行中的問卷 id，後端會拒絕。

下面的 HTML：只有可編輯的列才有勾選框；名稱連結依狀態決定去編輯頁或唯讀頁。刪除成功後，重新載入目前這一頁。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 驗收
# Acceptance

<!--
最後，怎麼知道自己做對了？
-->

---
layout: default
---

# 驗收清單

| # | 情境 | 預期 |
| --- | --- | --- |
| 1 | 未登入輸入 `/admin` | 導到 `/login?redirect=%2Fadmin` |
| 2 | 一般會員登入後輸入 `/admin` | 導回 `/surveys` |
| 3 | 作答時必填未填 | 提醒視窗列出**所有**問題 |
| 4 | 作答 → 送出 → 確認頁 | 只顯示被選取的項目；「修改」帶回資料 |
| 5 | 同一 Email 重複填寫 | 提醒「此 Email 已經填寫過這份問卷」 |
| 6 | 統計頁 | 選擇題圓餅圖、文字題列表 |
| 7 | 新增問卷 | 日期預設 +2／+7；開始日期選今天 → 被擋；至少一題才能到確認頁 |
| 8 | 編輯到一半點導覽列離開 | 跳出確認視窗；儲存後離開不再問 |
| 9 | 後台列表 | 只有未發佈、尚未開始的列能勾選；批次刪除前詢問 |
| 10 | 後台回饋 | 依填寫編號倒序；「前往」看明細 |
| 11 | Token 過期（`localStorage` 改壞 `accessToken`） | 自動更新後重送，使用者無感 |

<style>
.slidev-layout td, .slidev-layout th { padding: 3px 8px !important; font-size: 14px !important; line-height: 1.35 !important; }
.slidev-layout table { margin: 0.4rem 0 !important; }
.slidev-layout p, .slidev-layout li { font-size: 15px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
</style>

<!--
這張清單就是自己做完之後的驗收表，逐項測試。其中 11 是第 57 章的技巧：把 accessToken 改壞，模擬過期。

建議大家先手動測一遍，體驗一下使用者的角度，然後再用下一頁的自動化測試，確認沒有遺漏。
-->

---
layout: default
---

# 自動化端對端測試

參考專案附了一支用 Playwright 寫的驗收腳本（`reference/survey-web/e2e/e2e.mjs`），把上面的情境自動跑一遍：

```bash
# 1. 後端（資料庫要先匯入 sql/schema.sql、seed.sql）
cd reference/dynamic-survey && ./gradlew bootRun

# 2. 前端
cd reference/survey-web && npm install --legacy-peer-deps && npx ng serve

# 3. 端對端測試（另開一個終端機）
npm i -D playwright && node e2e/e2e.mjs
```

```text
PASS 未登入進後台 → 登入頁
PASS 一般會員進後台 → 問卷列表
PASS 必填未填 → 提醒視窗
PASS 確認頁只顯示被選取的項目
PASS 重複 Email → 提醒
PASS 編輯到一半離開 → 確認視窗
…
全部通過
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 每次測試會新增一筆作答與一份問卷；要重測請重新匯入 <code>seed.sql</code> 讓資料庫回到初始狀態。
</div>

<!--
自動化測試的好處：改了程式，一個指令就能知道有沒有把原本的功能弄壞。這也是為什麼 Spring Boot 課我們也有 e2e.sh 和單元測試。

Playwright 是瀏覽器自動化工具，會真的開一個瀏覽器，照著腳本點擊、輸入，就像真人在操作。大家可以打開 e2e.mjs 看看，每一段都是一個使用情境，跟驗收清單一一對應。
-->

---
layout: default
---

# 課程回顧：一個系統，四門課

| 課程 | 你做出了什麼 |
| --- | --- |
| **MySQL** | 六張表的資料庫、查詢、View、Index |
| **Spring Boot** | REST API、驗證、Session、JWT 登入與權限、測試 |
| **Angular** | 前台與後台、串接 API、表單驗證、攔截器、路由守衛 |
| **Docker** | 把資料庫、後端、前端裝進容器，一個指令啟動整個系統 |

**這套系統包含的實務技術：** 分頁搜尋、狀態計算、批次刪除、Session 暫存、JWT + Refresh Token、角色權限、統一錯誤處理、圖表統計、自動化測試。

<style>
.slidev-layout td, .slidev-layout th { padding: 3px 8px !important; font-size: 14px !important; line-height: 1.35 !important; }
.slidev-layout table { margin: 0.4rem 0 !important; }
.slidev-layout p, .slidev-layout li { font-size: 15px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
</style>

<!--
最後，回顧整個旅程。同一個動態問卷系統，從資料庫設計，到後端 API，到前端畫面，再到 Docker 部署，四門課合起來，就是一個完整的全端專案。

這些技術，正是實務上企業內部系統、後台管理系統最常用到的。希望大家把這個專案整理好，放進作品集，面試的時候，這就是最好的故事。
-->

---
layout: end
---

# 課程結束
### 完成動態問卷系統，就是完成整個前端課程

<!--
恭喜大家，走到了這裡。

從 HTML、CSS、TypeScript 的基礎，到 Angular 的元件、路由、表單、API，到今天完整的前後台系統，大家做到了一件很了不起的事情。

接下來是全課程的總複習，用九站速記、快問快答、易錯 Top 10，幫大家把整個課程的知識點串起來。大家休息一下，我們等一下見！
-->
