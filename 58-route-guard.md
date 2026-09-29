---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 路由守衛
routeAlias: ch58
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
    路由守衛
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「替頁面把關：要登入、要是管理員、離開前要確認」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，上一章我們讓每一個請求都自動帶著 Token。這一章來處理另一個問題：沒有登入的人，能不能直接輸入網址，跑到後台去？

在前端的世界，網址是使用者自己可以輸入的。只要在瀏覽器輸入 /admin，Angular 就會乖乖把後台頁面畫出來。雖然沒登入的人拿不到資料，因為 API 會回傳 401，但是畫面已經出來了，體驗很差，也不專業。

路由守衛（Route Guard）就是路由的「門禁」：在進入某個路由之前，先檢查條件，符合才放行，不符合就導去別的地方。
-->

---
layout: default
---

# Outline

- **為什麼需要路由守衛**
- **守衛的種類與回傳值**
- **練習 1：`authGuard` — 要登入才能進入**
- **練習 2：`adminGuard` — 只有管理員能進後台**
- **練習 3：`canDeactivate` — 編輯到一半離開，先確認**
- **導覽列依身分顯示**
- **安全提醒：前端守衛不是真正的安全**

<!--
路線圖：先講守衛是什麼、有哪幾種；接著三個練習，分別是要登入才能進、要是管理員才能進後台、離開編輯頁前的確認；然後把導覽列也依身分調整；最後很重要的一點：前端守衛只是使用者體驗，真正的安全一定要靠後端。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 為什麼需要路由守衛
## Why Route Guards?

<!--
先看問題。
-->

---

# 網址是使用者可以隨便輸入的

問卷系統的頁面，有三種存取規則：

| 頁面 | 規則 |
| --- | --- |
| 問卷列表、填寫、統計 | 任何人都可以 |
| 我的填寫紀錄、會員資料 | 要**登入** |
| 後台（`/admin/...`） | 要是**管理員**（`ADMIN`） |

只靠「導覽列不顯示連結」是不夠的：使用者仍然可以直接輸入 `http://localhost:4200/admin`。

**路由守衛**：在路由啟用（進入頁面）**之前**先檢查，符合才放行；不符合就導去別的頁面（例如登入頁）。

<!--
「把連結藏起來」不算保護。使用者可以直接輸入網址、可以用瀏覽器的上一頁、可以收藏書籤，這些都繞過了導覽列。

守衛把檢查放在路由層，不管使用者用什麼方式想進入某個頁面，都要先通過守衛。
-->

---
layout: default
---

# 守衛的種類

Angular 提供幾種守衛，都是「函式」（`CanActivateFn` 等），設定在路由的屬性上：

| 守衛 | 時機 | 常見用途 |
| --- | --- | --- |
| `canActivate` | 進入路由**之前** | 登入檢查、權限檢查 |
| `canActivateChild` | 進入**子路由**之前 | 一次保護整個區塊 |
| `canDeactivate` | **離開**路由之前 | 編輯中離開的確認 |
| `canMatch` | 決定這條路由是否「符合」 | 依角色載入不同的頁面 |

**回傳值決定結果：**

| 回傳 | 意義 |
| --- | --- |
| `true` | 放行 |
| `false` | 拒絕（停在原地，什麼也不發生） |
| `UrlTree` | **拒絕，並導向另一個網址**（用 `router.createUrlTree([...])` 產生） |

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
守衛的名字都是 can 開頭，意思是「能不能」：能不能進入、能不能離開、能不能符合。這一章我們用最常用的兩種：canActivate 和 canDeactivate。

回傳值最有意思的是 UrlTree。如果只回傳 false，使用者點了連結卻什麼事都沒有，會很困惑；回傳 UrlTree，等於同時「拒絕」加「導去別的頁」，例如沒登入導去登入頁，體驗好很多。

守衛也可以回傳 Observable 或 Promise，做非同步的檢查，例如呼叫後端確認權限。這一章的檢查都是同步的，所以直接回傳。
-->

---
layout: default
---

# 基本寫法

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/login']);      // 沒登入 → 導去登入頁
};
```

```typescript
// app.routes.ts：加在路由上
{ path: 'my-records', component: MyRecords, canActivate: [authGuard] }
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 跟攔截器一樣，守衛是函式，用 <code>inject()</code> 取得 Service 與 Router；<code>state.url</code> 是使用者「想要去的網址」。
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
守衛函式有兩個參數：route 是要進入的路由資訊，state 是路由狀態，其中 state.url 是使用者原本想去的網址，這個我們等一下會用到。

註冊在路由上：canActivate 是陣列，可以放多個守衛，全部都通過才放行。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習 1：authGuard
## Practice 1

<!--
第一個練習：要登入才能看的頁面。
-->

---
layout: default
---

# 練習 1：任務說明

「我的填寫紀錄」（`/my-records`）與「會員資料」（`/profile`）要登入後才能進入：

1. 建立 `authGuard`：已登入回傳 `true`；沒登入導向 `/login`，並帶上 **`redirect` 查詢參數**（使用者原本想去的網址）
2. 把 `authGuard` 加到 `my-records`、`profile` 兩條路由
3. 登入成功後，回到 `redirect` 指定的頁面（第 57 章的登入頁已經有這段）
4. 驗證：
   - 沒登入，直接輸入 `/my-records` → 跳到 `/login?redirect=%2Fmy-records`
   - 登入後 → 自動回到 `/my-records`

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這個練習的重點是使用者體驗：不只是把沒登入的人趕走，還要「登入之後帶他回原本想去的地方」。

你有沒有遇過這種情況：從收藏的書籤點進去，要求登入，登入完卻跑到首頁，還要自己再找一次？這就是沒有做 redirect 的體驗。

做法是把目標網址放在登入頁網址的查詢參數，登入成功後，登入頁讀取這個參數，導回去。
-->

---
layout: default
---

# 練習 1：解題提示與解答

1. 導向登入頁：`router.createUrlTree(['/login'], { queryParams: { redirect: state.url } })`
2. `state.url` 是使用者想去的完整網址，例如 `/my-records`
3. 守衛用 `inject()` 取得 `AuthService` 與 `Router`

```typescript
// auth-guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

/** 要登入才能進入 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? true
    : inject(Router).createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};
```

```typescript
// app.routes.ts
{ path: 'profile', component: Profile, canActivate: [authGuard] },
{ path: 'my-records', component: MyRecords, canActivate: [authGuard] },
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>成功標準：</b> 登出狀態輸入 <code>/my-records</code> → 網址變成 <code>/login?redirect=%2Fmy-records</code>；登入後回到 <code>/my-records</code>。
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
authGuard 只有兩行：判斷有沒有登入，沒登入回傳 UrlTree。

createUrlTree 的第二個參數可以設定查詢參數，這裡放 redirect，值是 state.url。網址中的斜線會被編碼成 %2F，這是正常的。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習 2：adminGuard
## Practice 2

<!--
第二個練習：後台只有管理員能進。
-->

---
layout: default
---

# 練習 2：任務說明

後台（`/admin` 與底下所有子路由）只有 `role === 'ADMIN'` 的使用者可以進入：

1. 建立 `adminGuard`：
   - 沒登入 → 導向 `/login`（帶 `redirect`）
   - 已登入但不是管理員 → 導向問卷列表 `/surveys`
   - 是管理員 → 放行
2. 把守衛加在 `admin` 這條**父路由**上，讓整個後台都受保護（不需要每個子路由各加一次）
3. 驗證三種身分：
   - 沒登入輸入 `/admin` → 登入頁
   - `ming@example.com`（一般會員）→ 被導回問卷列表
   - `admin@example.com`（管理員）→ 進入後台

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這個練習有兩個重點。第一，守衛要判斷三種情況：沒登入、登入但沒權限、有權限。前兩種去的地方不一樣：沒登入應該去登入，登入了卻沒權限，再去登入頁就很奇怪了，應該去問卷列表。

第二，守衛放在父路由。回想第 23 章的子路由：/admin 是父路由，底下的 edit、view 等都是子路由。canActivate 加在父路由上，子路由也就一併被保護，這樣以後新增後台頁面，也不會忘記加。

測試帳號在 seed 資料裡：admin@example.com 是管理員，ming@example.com 是一般會員，密碼都是 Passw0rd12。
-->

---
layout: default
---

# 練習 2：完整解答

```typescript
// auth-guard.ts（新增）
/** 要是管理員才能進入後台 */
export const adminGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
  }
  return auth.isAdmin() ? true : router.createUrlTree(['/surveys']);
};
```

```typescript
// app.routes.ts
{
  path: 'admin',
  canActivate: [adminGuard],          // 加在父路由：底下所有子路由都受保護
  children: [
    { path: '', component: AdminList },
    { path: 'edit', component: AdminEditor },
    { path: 'edit/:id', component: AdminEditor },
    { path: ':id/responses', component: AdminResponses },
  ],
},
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
adminGuard 的邏輯依序檢查：先看有沒有登入；沒登入的就導去登入頁並帶 redirect；已登入的再看是不是管理員，是就放行，不是就導回問卷列表。

這個判斷順序很重要，如果先判斷 isAdmin，沒登入的人也會得到 false，就分不清楚是「沒登入」還是「沒權限」，也就沒辦法導去不同的地方了。
-->

---
layout: default
---

# 練習 2：完整解答（續）

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>成功標準：</b> 三種身分的結果如任務說明；已登入的一般會員，即使手動輸入 <code>/admin/edit</code> 也進不去。
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
路由設定：canActivate 放在 admin 這一層。子路由沒有 component 的父路由（只有 children）也可以設定守衛，這種寫法叫做「無元件路由」，很適合用來做「保護一整區」。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習 3：canDeactivate
## Practice 3

<!--
第三個練習：離開頁面之前的確認。
-->

---
layout: default
---

# 練習 3：任務說明

後台「新增／編輯問卷」填到一半，使用者不小心點了導覽列或按上一頁，內容就全部遺失了。請加上「離開前確認」：

1. 建立 `unsavedGuard`：`CanDeactivateFn`，如果元件有**未儲存的變更**，跳出確認對話框（第 43 章的 `Dialogs.confirm`）：「有尚未儲存的內容，確定要離開嗎？」，使用者按「取消」就留在原頁
2. 編輯元件實作 `hasUnsavedChanges()`：表單被修改過（`form.dirty`）且還沒儲存就是 `true`
3. 在 `admin/edit` 路由加上 `canDeactivate: [unsavedGuard]`
4. 儲存成功後，要先把表單標記為「乾淨」（`form.markAsPristine()`），再導向列表，不然儲存後離開也會被問

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
canDeactivate 是離開的守衛。它跟 canActivate 有一個重要的差別：它需要「問元件」。要不要擋住使用者，取決於元件目前的狀態：表單有沒有被改過。所以守衛的函式會拿到目前的元件實例，用這個元件實例去問「你有未儲存的變更嗎」。

為了讓守衛可以通用，我們定義一個介面：元件只要實作 hasUnsavedChanges 方法，守衛就能問它。

第 4 點是實作上最容易遺漏的：儲存成功之後，程式會導向列表頁，這也算「離開」，如果沒有先把表單標記成乾淨，守衛會判斷還有未儲存的變更，又跳一次確認，很奇怪。
-->

---
layout: default
---

# 練習 3：完整解答

```typescript
// unsaved-guard.ts
import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Dialogs } from './dialogs';

/** 元件只要有這個方法，就能被 unsavedGuard 保護 */
export interface HasUnsavedChanges { hasUnsavedChanges(): boolean; }

export const unsavedGuard: CanDeactivateFn<HasUnsavedChanges> = (component) =>
  component.hasUnsavedChanges()
    ? inject(Dialogs).confirm('有尚未儲存的內容，確定要離開嗎？')     // 回傳 Promise<boolean>
    : true;
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
守衛拿到的第一個參數就是即將被離開的元件。我們用一個介面 HasUnsavedChanges 描述「有這個方法的元件」，這樣 unsavedGuard 可以套用在任何符合的元件上，不只是 AdminEditor。

守衛可以直接回傳 Promise：Dialogs.confirm 回傳 Promise<boolean>，Angular 會等待它完成。使用者按確定就是 true，放行；按取消是 false，留在原頁。
-->

---
layout: default
---

# 練習 3：完整解答（續）

```typescript
// admin-editor.ts（元件端）
export class AdminEditor implements HasUnsavedChanges {
  form = this.fb.nonNullable.group({ title: [''] /* ... */ });

  hasUnsavedChanges() { return this.form.dirty; }

  save() {
    this.api.commit(false).subscribe(() => {
      this.form.markAsPristine();                  // 先標記為「沒有未儲存的變更」
      this.router.navigate(['/admin']);
    });
  }
}
```

```typescript
// app.routes.ts
{ path: 'edit', component: AdminEditor, canDeactivate: [unsavedGuard] },
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>成功標準：</b> 在新增問卷頁輸入標題，按導覽列離開 → 跳出確認框；按「取消」留在原頁，按「確定」離開；「儲存」之後導向列表，不會再問。
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
dirty 是表單的狀態屬性，第 52 章教過：使用者修改過任何欄位就是 dirty。儲存之後呼叫 markAsPristine，把 dirty 重置成 false。
-->

---
layout: default
---

# 導覽列依身分顯示

守衛是「擋」，導覽列是「引導」：使用者看不到不該看的連結，體驗才完整。

```html
<!-- app.html -->
<nav>
  <a routerLink="/surveys">問卷列表</a>
  @if (auth.isLoggedIn()) {
    <a routerLink="/my-records">我的填寫紀錄</a>
    <a routerLink="/profile">會員資料</a>
  }
  @if (auth.isAdmin()) { <a routerLink="/admin">後台管理</a> }

  <span class="spacer"></span>
  @if (auth.user(); as u) {
    <span>{{ u.name }}</span><button (click)="auth.logout()">登出</button>
  } @else {
    <a routerLink="/login">登入</a><a routerLink="/register">註冊</a>
  }
</nav>
```

```typescript
// app.ts
export class App { auth = inject(AuthService); }
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
導覽列直接使用 AuthService 裡的 signal：isLoggedIn、isAdmin、user。因為它們是 signal，登入或登出的當下，導覽列就會自動更新，不需要重新整理頁面。

這就是為什麼第 57 章我們堅持用 signal 存登入狀態：畫面會自動反應，不管 Angular 有沒有 zone.js。

再強調一次：導覽列只是「引導」，不是「保護」。即使 admin 連結不顯示，使用者仍然可以直接輸入網址，那一關要靠守衛來擋。
-->

---
layout: default
---

# 安全提醒：前端守衛不是真正的安全

| 前端（Angular） | 後端（Spring Boot） |
| --- | --- |
| 路由守衛、隱藏連結 | Spring Security 的 `hasRole('ADMIN')` |
| 目的：**使用者體驗** | 目的：**真正的安全** |
| 使用者可以修改、繞過 | 每個 API 都會檢查 Token 與角色 |

> 前端的程式碼在使用者的瀏覽器裡執行，使用者可以任意修改（例如把 `localStorage` 裡的角色改成 `ADMIN`）。

**所以：**

- 守衛只是讓正常使用者不要走到不該去的頁面
- 後台 API 一定要由**後端**檢查角色：一般會員即使偷偷改成管理員畫面，呼叫 `/api/admin/...` 仍然會得到 **403**

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 第 57 章的 <code>errorInterceptor</code> 會處理這個 403，跳出「沒有權限執行這個操作」。
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
這一頁是本章最重要的觀念。

前端的所有東西，都在使用者的手上。他可以打開開發者工具，把 localStorage 的 user 改成 role 是 ADMIN，那麼我們的 isAdmin 就會回傳 true，守衛就會放行，他就能看到後台的畫面。

但是，畫面看到了，資料呢？後台的 API 是後端負責的，後端每一次都會檢查 Token 裡的角色（Token 是簽章過的，不能偽造），不是管理員就回 403。所以他只會看到一個空的後台。

結論：前端守衛是讓「好人」有更好的體驗；後端的授權才是擋「壞人」的。兩者都要做，但不能只做前端。
-->

---
layout: default
---

# 本章重點整理

| 主題 | 重點 |
| --- | --- |
| 守衛是什麼 | 路由的「門禁」，進入／離開前先檢查 |
| 寫法 | `CanActivateFn`、`CanDeactivateFn`，用 `inject()` 取得 Service |
| 回傳值 | `true` 放行、`false` 拒絕、`UrlTree` 拒絕並導向 |
| `authGuard` | 沒登入 → `/login?redirect=原網址`；登入後回原頁 |
| `adminGuard` | 加在**父路由**，保護整個後台；依序判斷未登入 / 非管理員 |
| `canDeactivate` | 元件實作 `hasUnsavedChanges()`，離開前確認；儲存後 `markAsPristine()` |
| 安全 | 前端只是體驗，真正的權限在後端 |

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這一章我們學了守衛，加上上一章的攔截器，前端的登入機制就完整了：攔截器負責「請求」，守衛負責「路由」。

下一章是整個課程的綜合練習：把所有學過的東西，包括路由、元件、表單、API、對話框、攔截器、守衛，組裝成一個完整的動態問卷系統，前台加後台。這是課程的終點，也是一個可以放進作品集的專案。大家休息一下，我們等一下見！
-->

---
layout: end
---

# 課程結束
### 用路由守衛替頁面把關，並記得：真正的安全在後端

<!--
恭喜大家完成路由守衛。現在的問卷系統，已經有登入、Token、權限這些機制了。

下一章，就是最後的綜合練習。
-->
