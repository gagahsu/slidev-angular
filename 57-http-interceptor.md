---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: HTTP 攔截器
routeAlias: ch57
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
    HTTP 攔截器
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「寫一次，全站的請求都自動帶上 Token、處理過期與錯誤」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要學 HTTP 攔截器（Interceptor）。第 46 章做 Loading 動畫的時候，已經用過一次：那個 loadingInterceptor 讓每一個 HTTP 請求都自動顯示、隱藏載入動畫，不用每個元件各寫一次。

這一章要把攔截器用在更重要的地方：登入。動態問卷系統的後台 API 需要登入才能呼叫，也就是每一個請求都要帶上 Token；作答暫存又需要 Cookie。如果每個 API 呼叫都自己加，程式會又長又容易漏。攔截器讓我們「寫一次，全站生效」。

學完這一章，大家會做出：登入頁、自動附帶 Token 的攔截器、Token 過期時自動更新並重送請求、還有統一的錯誤提示。
-->

---
layout: default
---

# Outline

- **為什麼需要攔截器**
- **攔截器的運作方式：請求與回應的管線**
- **函式型攔截器 `HttpInterceptorFn` 與 `req.clone()`**
- **練習 1：登入與 Token 攔截器（含 `withCredentials`）**
- **Token 過期：Refresh Token 與自動重送**
- **練習 2：401 自動更新 Token**
- **練習 3：統一的錯誤處理**
- **安全提醒：Token 存在哪裡？**

<!--
路線圖：先講攔截器解決什麼問題，再看它怎麼運作、怎麼寫。接著是三個練習：第一個讓每個請求自動帶上 Token；第二個處理 Token 過期，自動換新的再重送；第三個把各種錯誤統一用對話框告訴使用者。最後提醒大家 Token 放在哪裡有什麼安全上的取捨。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 為什麼需要攔截器
## Why Interceptors?

<!--
先從一個實際的問題開始。
-->

---

# 每個請求都要做的事

問卷系統的 API 呼叫，有三件事**每一次**都要做：

| 要做的事 | 原因 |
| --- | --- |
| 帶上 `Authorization: Bearer <token>` | 後台 API 需要 JWT 才能通過 Spring Security |
| `withCredentials: true` | 作答暫存、後台編輯暫存放在後端 Session，要帶 Cookie |
| 出錯時提示使用者 | 網路斷線、Token 過期、伺服器錯誤，畫面不能一片空白 |

如果每個 `http.get(...)` 都自己寫：

```typescript
this.http.get(url, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
```

程式碼重複、容易漏、改一次要改幾十處。

<!--
想像問卷系統有二十幾支 API，每一支都要寫這三件事。第一，重複；第二，只要漏掉一處，那個功能就會壞掉，而且是「有時候壞」，因為只有沒登入才會發現；第三，以後想改，例如把 Token 從 localStorage 換成別的地方，要改幾十個地方。

這種「每個請求都要做的事」，程式設計上稱為橫切關注點（cross-cutting concern）。Angular 提供的解法就是攔截器：在請求離開瀏覽器之前、回應回到程式之前，插進一段共用的邏輯。
-->

---
layout: default
---

# 攔截器的運作方式

HTTP 請求與回應，會依序穿過一條**管線**：

| 方向 | 順序 |
| --- | --- |
| 請求（Request） | 元件 → 攔截器 A → 攔截器 B → 網路 |
| 回應（Response） | 網路 → 攔截器 B → 攔截器 A → 元件 |

每個攔截器可以：

- **修改請求**：加 Header、加 Cookie 設定、改網址
- **檢查回應**：統一處理錯誤、記錄時間
- **決定要不要往下傳**：`next(req)` 呼叫才會往下一個走

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 註冊順序決定執行順序：<code>withInterceptors([a, b])</code>，請求先經過 a 再經過 b，回應則反過來，先 b 再 a。
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
可以把攔截器想成機場的安檢：出境（請求）要依序過檢查站 A、B，回來（回應）的時候，順序剛好反過來。

每個檢查站都可以「加東西」（例如蓋章：加 Header）、「檢查內容」（看回應有沒有錯），也可以「攔下來不放行」（不呼叫 next）。

順序的規則很重要：先註冊的，請求時先執行，回應時最後執行。
-->

---
layout: default
---

# 函式型攔截器：基本結構

Angular 15 之後，攔截器可以直接寫成一個**函式**（`HttpInterceptorFn`），不需要 class：

```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('送出：', req.method, req.url);
  return next(req);          // 交給下一個攔截器（最後一個會真的送出）
};
```

```typescript
// app.config.ts：註冊
provideHttpClient(withInterceptors([logInterceptor]))
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 需要 Service 的時候，用 <code>inject()</code>：函式在「注入環境」中執行，可以直接 <code>const auth = inject(AuthService);</code>
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
函式型攔截器的結構非常簡單：接收 req（請求）和 next（下一站），回傳一個 Observable。呼叫 next(req) 就是「放行」。

註冊的地方是 app.config.ts 裡的 provideHttpClient，用 withInterceptors 傳入陣列。

如果需要用到 Service，例如取得 Token，直接在函式裡呼叫 inject 就可以，這跟元件建構式注入不同：函式型攔截器是在 Angular 的注入環境中執行的，所以 inject 可以用。這是第 46 章 loadingInterceptor 的做法。
-->

---
layout: default
---

# 修改請求：`req.clone()`

`HttpRequest` 是**不可變（immutable）**的，不能直接改，要 `clone` 出一個新的：

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).accessToken;

  const newReq = req.clone({
    withCredentials: true,                                    // 帶 Cookie
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},   // 加 Header
  });
  return next(newReq);       // 送出「新的」請求
};
```

| `clone` 的常用選項 | 說明 |
| --- | --- |
| `setHeaders` | 新增或覆蓋 Header |
| `withCredentials` | 是否帶 Cookie |
| `url`、`params`、`body` | 改網址、查詢參數、內容 |

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
為什麼請求是不可變的？因為同一個請求可能被重送（例如失敗重試），如果原本的請求被改過，重試的時候就會帶著被污染的內容。所以 Angular 規定，要修改就必須 clone 一份新的。

clone 的參數就是「要改的欄位」，沒寫的欄位維持原樣。這裡加了兩件事：withCredentials 設成 true，還有把 Token 放進 Authorization Header。

千萬別忘了最後 return next(newReq)：如果傳的是 next(req)，就等於白改了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習 1：登入與 Token 攔截器
## Practice 1

<!--
現在我們動手做。第一個練習：做登入頁和攔截器，讓之後的每個請求都自動帶著 Token。
-->

---
layout: default
---

# 練習 1：任務說明
### 登入 API 與規格

後端（Spring Boot 第 45 章）提供：

| API | 內容 |
| --- | --- |
| `POST /api/auth/login` | 傳 `{ email, password }`，回傳 `{ accessToken, refreshToken, user }` |
| `GET /api/users/me/responses` | 需要登入：我的填寫紀錄 |

**任務：**

1. 建立 `AuthService`：`login(email, password)` 成功後，把 `accessToken`、`refreshToken`、`user` 存進 `localStorage`；用 **signal** 保存目前使用者
2. 建立 `Login` 元件：Email + 密碼（8～12 字元）的表單，登入成功導向 `/surveys`
3. 建立 `authInterceptor`：**每個請求** `withCredentials: true`，並帶上 `Authorization: Bearer <accessToken>`，但 `/api/auth/` 開頭的請求（登入、註冊）**不帶** Token
4. 在 `app.config.ts` 註冊攔截器，用 Network 面板確認 Header

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這個練習有三個部分：AuthService 管理登入狀態、Login 元件是畫面、authInterceptor 讓 Token 自動附帶。

第 1 點要注意：登入狀態要用 signal 存，因為畫面上會用到，例如導覽列要顯示「登入」還是使用者名字。Angular 21 是 zoneless，非同步登入成功之後，只有 signal 的變動能讓畫面更新。

第 3 點有個小細節：登入與註冊的 API 本身不需要 Token，而且這時候使用者根本還沒有 Token。所以攔截器要判斷網址，是 /api/auth/ 開頭就跳過。

驗收方式最直接：打開 Network 面板，點一個 API 請求，看 Request Headers 有沒有 Authorization。
-->

---
layout: default
---

# 練習 1：解題提示

1. Token 用 `localStorage.setItem` 存；取用時 `localStorage.getItem`。登入狀態的 signal 用 `localStorage` 裡的 `user` 當初始值，**重新整理頁面**後才不會被登出
2. 登入用 `map` 把外層 `AppResponse` 拆掉，並在 `map` 裡存 Token（副作用）
3. 表單密碼欄位：`[Validators.required, Validators.minLength(8), Validators.maxLength(12)]`
4. 攔截器判斷網址：`req.url.includes('/api/auth/')`
5. 註冊攔截器：`provideHttpClient(withInterceptors([authInterceptor]))`
6. 登入後要回到原本想去的頁面（第 58 章的守衛會用到）：`redirect` 查詢參數

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 後端 CORS 要 <code>allowCredentials(true)</code> 而且指定 <code>allowedOrigins</code>（不能是 <code>*</code>）；<code>reference/dynamic-survey</code> 已設定好。
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
提示 1 是實際開發會踩到的：如果登入狀態只放在記憶體（例如普通變數），使用者按 F5 重新整理，整個 Angular 應用重啟，登入狀態就沒了。所以要存在 localStorage，並在 AuthService 建立時讀回來。

提示 2 用 map 拆掉外層並存 Token：這是一個「副作用」寫在 map 裡的做法，簡單但不夠純粹；更嚴謹的做法是用 tap。這裡為了讓程式短，我們用 map 同時完成兩件事。
-->

---
layout: default
---

# 練習 1：完整解答（AuthService）

```typescript
// auth-service.ts
import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AppResponse, LoginResponse, UserInfo } from './models';

const API = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly user = signal<UserInfo | null>(this.load('user'));
  readonly isLoggedIn = computed(() => this.user() !== null);
  readonly isAdmin = computed(() => this.user()?.role === 'ADMIN');

  get accessToken(): string | null { return localStorage.getItem('accessToken'); }
  get refreshToken(): string | null { return localStorage.getItem('refreshToken'); }

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
AuthService 有三塊：狀態、動作、儲存。

狀態：user 是 signal，isLoggedIn 和 isAdmin 是 computed，從 user 推導出來。這樣不管在哪個元件用 auth.isAdmin()，值都是同步且自動更新的。
-->

---
layout: default
---

# 練習 1：完整解答（AuthService）（續）

```typescript
  // ... 接上一頁

  login(email: string, password: string) {
    return this.http.post<AppResponse<LoginResponse>>(`${API}/auth/login`, { email, password })
      .pipe(map(res => { this.save(res.data); return res.data.user; }));
  }

  logout() {
    this.clear();
    this.router.navigate(['/login']);
  }

  save(r: LoginResponse) {
    localStorage.setItem('accessToken', r.accessToken);
    localStorage.setItem('refreshToken', r.refreshToken);
    localStorage.setItem('user', JSON.stringify(r.user));
    this.user.set(r.user);
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
動作：login 呼叫 API；logout 清除所有東西後導向登入頁。
-->

---
layout: default
---

# 練習 1：完整解答（AuthService）（續）

```typescript
// ... 接上一頁

  clear() {
    ['accessToken', 'refreshToken', 'user'].forEach(k => localStorage.removeItem(k));
    this.user.set(null);
  }

  private load(key: string) {
    try { return JSON.parse(localStorage.getItem(key) ?? 'null'); } catch { return null; }
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
儲存：save、clear 負責 localStorage 與 signal 兩邊同步更新；load 用 try/catch，避免 localStorage 裡的資料被改壞的時候，整個程式崩潰。

models.ts 需要新增 UserInfo 和 LoginResponse 兩個型別，跟後端的 JSON 對應。
-->

---
layout: default
---

# 練習 1：完整解答（型別、攔截器、登入元件）

```typescript
// models.ts（新增）
export interface UserInfo { id: number; name: string; email: string; phone: string; role: 'USER' | 'ADMIN'; }
export interface LoginResponse { accessToken: string; refreshToken: string; user: UserInfo; }
```

```typescript
// auth-interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).accessToken;
  const isAuthApi = req.url.includes('/api/auth/');     // 登入、註冊不帶 Token

  return next(req.clone({
    withCredentials: true,
    setHeaders: token && !isAuthApi ? { Authorization: `Bearer ${token}` } : {},
  }));
};
```

```typescript
// app.config.ts
providers: [ provideHttpClient(withInterceptors([authInterceptor])), provideRouter(routes) ]
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
攔截器只有十行左右，卻改變了所有的 API 呼叫。

withCredentials 每個請求都是 true，所以後端 Session 的 Cookie 一定會被帶上。Token 則是「有 Token 而且不是登入 API」才加。

app.config.ts 用 withInterceptors 註冊，這樣之後不管在哪個 Service 呼叫 http.get、http.post，都會自動經過這個攔截器。
-->

---
layout: default
---

# 練習 1：完整解答（登入元件）

```typescript
// login.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth-service';
import { Dialogs } from './dialogs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogs = inject(Dialogs);

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
登入元件把前面幾章的知識串起來：Reactive Forms（第 51 章）、Validators（第 52 章）、Dialogs（第 43 章）、路由（第 23 章）。
-->

---
layout: default
---

# 練習 1：完整解答（登入元件）（續）

```typescript
// ... 接上一頁

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
  });

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: () => this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('redirect') ?? '/surveys'),
      error: e => this.dialogs.alert(e.error?.message ?? '登入失敗'),
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
登入成功後，先看網址有沒有 redirect 參數：如果使用者原本想去某個頁面，被導到登入頁，登入後就應該回到那個頁面，而不是固定回首頁。沒有的話才去 /surveys。
-->

---
layout: default
---

# 練習 1：完整解答（登入元件）（續）

```html
<!-- login.html -->
<form [formGroup]="form" (ngSubmit)="submit()">
  <label>Email <input formControlName="email" /></label>
  <label>密碼（8 到 12 個字元） <input type="password" formControlName="password" /></label>
  <button type="submit">登入</button>
</form>
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>成功標準：</b> 用 <code>ming@example.com</code> / <code>Passw0rd12</code> 登入後，Network 面板中之後每個 <code>/api/</code> 請求都有 <code>Authorization: Bearer ...</code>；登入請求本身沒有；按 F5 之後仍維持登入。
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
錯誤時用 dialogs.alert 顯示後端回傳的訊息，例如「帳號或密碼錯誤」。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Token 過期：Refresh Token
## Token Expiry & Refresh

<!--
Token 不會永遠有效，這一節看怎麼優雅地處理過期。
-->

---

# 為什麼要 Refresh Token？

JWT 為了安全，有效時間都很短（我們的後端：**Access Token 15 分鐘**）。過期後，API 會回傳 **401 Unauthorized**。

| Token | 有效期 | 用途 |
| --- | --- | --- |
| Access Token | 15 分鐘 | 每個 API 請求都帶，短命，被偷了風險有限 |
| Refresh Token | 7 天 | 只用來換新的 Access Token，存在資料庫，可以隨時作廢 |

不處理的話，使用者填問卷填到一半，Token 過期，操作失敗，被迫重新登入。

**期望的流程：** 收到 401 → 用 Refresh Token 換新的 Access Token → **自動重送**剛剛失敗的請求 → 使用者完全沒有感覺。

<!--
為什麼不乾脆把 Access Token 的有效期設成一個月？因為 Token 一旦被偷走，在有效期內任何人都可以用它。有效期越短，風險越低。但太短使用者又要一直登入，很煩。

所以有雙 Token 的設計：Access Token 短命，每次請求都帶；Refresh Token 長命，但只有在換 Token 的時候才會用到，而且存在後端資料庫，可以隨時作廢（例如使用者登出，就把它刪掉）。

前端要做的，就是在 Access Token 過期時，自動用 Refresh Token 換新的，並把剛剛失敗的請求重送一次。整個過程使用者完全沒有感覺。
-->

---
layout: default
---

# 401 自動更新的流程

```text
1. 送出請求（帶著舊的 Access Token）
2. 後端回 401（Token 過期）
3. 攔截器攔到 401，而且不是登入相關 API
4. 呼叫 POST /api/auth/refresh，帶 Refresh Token
5a. 成功 → 存新的 Token → 用新的 Token「重送原本的請求」→ 元件拿到結果
5b. 失敗（Refresh Token 也過期）→ 清除登入狀態 → 導向登入頁
```

**要處理的陷阱：**

- 登入、更新 Token 這些 `/api/auth/` 的 API，本身回 401 **不能**再觸發更新，否則會無限迴圈
- 更新失敗時，要把**原本的錯誤**丟回去（或導向登入），不能吞掉

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這個流程寫成攔截器，關鍵是 RxJS 的 catchError：它可以「攔截錯誤」，並決定要回傳什麼來取代。

第 5a 步的「重送」是這個設計最漂亮的地方：在 catchError 裡，用新的 Token 再呼叫一次 next(...)，把新的回應當作結果回傳，元件完全不知道中間發生過錯誤。

陷阱一定要記得：如果 /api/auth/refresh 本身也回 401（Refresh Token 過期），攔截器又去呼叫 refresh，就會無限迴圈，所以 /api/auth/ 的請求要排除。
-->

---
layout: default
---

# 練習 2：401 自動更新 Token
### 任務說明

1. 在 `AuthService` 加入 `refresh()`：呼叫 `POST /api/auth/refresh`（body：`{ refreshToken }`），成功就存新的 Token 並回傳新的 Access Token；失敗就清除登入狀態、回傳 `null`
2. 修改 `authInterceptor`：收到 **401**（且不是 `/api/auth/` 的請求，而且有 Refresh Token）時，呼叫 `refresh()`，用新的 Token 重送原請求；`refresh()` 失敗就把原本的錯誤丟出去
3. 驗證：登入後，在 Console 執行 `localStorage.setItem('accessToken', 'bad')` 模擬過期，然後重新整理「我的填寫紀錄」頁面，資料仍然正常顯示，Network 面板可以看到：第一次 401 → `refresh` → 第二次 200

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這個練習是這一章最難的部分，但寫完之後，會很有成就感。

驗證的方法很巧妙：我們不用等 15 分鐘，直接把 localStorage 裡的 accessToken 改成一個亂碼，等於模擬「Token 過期」。然後呼叫 API，就可以看到完整的流程：第一次請求 401、自動呼叫 refresh、第二次請求成功。

這個技巧在開發時很實用：任何需要「等很久才會發生」的情況，都可以想辦法直接模擬。
-->

---
layout: default
---

# 練習 2：解題提示

1. `refresh()` 用 `async/await` 比較好讀：`firstValueFrom(this.http.post(...))`，失敗用 `try/catch`
2. 在攔截器裡，Promise 要轉回 Observable：`from(auth.refresh())`
3. 用 `switchMap` 接續：拿到新 Token → 再呼叫 `next(...)` 重送
4. 把「加 Header」寫成共用函式 `withToken(req, token)`，第一次與重送都能用
5. `catchError` 裡不符合條件的錯誤，一律 `throwError(() => err)` 丟回去

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>switchMap</code>：把上一個 Observable 的結果，換成另一個 Observable。這裡是「拿到新 Token 之後，換成重送請求的 Observable」。
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
提示 1 和 2 是 Promise 和 Observable 混用的技巧：refresh 用 async/await 寫比較直覺，但攔截器需要回傳 Observable，所以用 from() 把 Promise 轉回 Observable。

提示 3 的 switchMap 是第 54 章 RxJS 會深入介紹的運算子。現在先記住它的意思：「上一步完成後，接著執行下一步，並把下一步的結果當作最終結果」。

提示 5 是好習慣：不是自己要處理的錯誤，原封不動丟回去，讓呼叫端或下一層的攔截器處理。
-->

---
layout: default
---

# 練習 2：完整解答

```typescript
// auth-service.ts（新增）
async refresh(): Promise<string | null> {
  const token = this.refreshToken;
  if (!token) return null;
  try {
    const res = await firstValueFrom(
      this.http.post<AppResponse<LoginResponse>>(`${API}/auth/refresh`, { refreshToken: token }));
    this.save(res.data);
    return res.data.accessToken;
  } catch {
    this.clear();          // Refresh Token 也失效了 → 登出
    return null;
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
refresh 有兩種結局：成功，存新 Token 並回傳；失敗（Refresh Token 過期或已被作廢），清除登入狀態，回傳 null。

攔截器的重點是 catchError 裡的判斷：三個條件同時成立才更新，狀態碼是 401、不是登入 API、手上有 Refresh Token。符合就呼叫 refresh，成功拿到新 Token 就重送原本的請求 req；失敗就把原本的 401 錯誤丟出去。
-->

---
layout: default
---

# 練習 2：完整解答（續）

```typescript
// auth-interceptor.ts（改寫）
import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth-service';

const withToken = (req: HttpRequest<unknown>, token: string | null) =>
  req.clone({ withCredentials: true, setHeaders: token ? { Authorization: `Bearer ${token}` } : {} });

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const isAuthApi = req.url.includes('/api/auth/');

  return next(withToken(req, isAuthApi ? null : auth.accessToken)).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !isAuthApi && auth.refreshToken) {
        return from(auth.refresh()).pipe(
          switchMap(token => token ? next(withToken(req, token)) : throwError(() => err)));
      }
      return throwError(() => err);
    }));
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
重送用的是 next(withToken(req, token))：注意是用「原本的 req」再 clone 一次，帶上新 Token。這也是為什麼請求要設計成不可變：原本的 req 沒有被污染，可以安全地重送。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 統一的錯誤處理
## Global Error Handling

<!--
第三個攔截器：所有錯誤，用同一種方式告訴使用者。
-->

---
layout: default
---

# 練習 3：統一的錯誤提示
### 任務說明

後端所有錯誤都回相同格式：`{ "code": "...", "message": "給使用者看的訊息", ... }`。請寫 `errorInterceptor`，讓元件不用每個 `subscribe` 都寫 `error` 回呼：

| 情況 | 處理 |
| --- | --- |
| `status === 0`（連不上後端） | `alert('無法連線到伺服器，請確認網路或稍後再試')` |
| `status >= 500` | `alert('伺服器發生錯誤，請稍後再試')` |
| `status === 403` | `alert('沒有權限執行這個操作')` |
| `400 / 409 ...`（業務錯誤） | **不處理**（由畫面自己顯示 `message`，例如「這個 Email 已經填寫過」） |
| `401` | **不處理**（由上一個練習的攔截器負責） |

註冊順序：`withInterceptors([authInterceptor, errorInterceptor])`。

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
統一錯誤處理有一個設計上的判斷：哪些錯誤該在全域處理，哪些該留給畫面自己處理？

系統層級的錯誤，例如連不上、伺服器壞了、沒權限，任何頁面遇到，處理方式都一樣：跳個提示。這種適合統一處理。

但業務錯誤，例如「這個 Email 已經填寫過」，只有那個畫面知道該怎麼呈現，例如標記在某個欄位旁邊，所以不要在全域處理，留給畫面。

401 也不處理，因為 authInterceptor 已經處理了：注意註冊順序，authInterceptor 在前，所以回應時它是最後才處理，如果 401 換新 Token 成功，錯誤根本不會傳到 errorInterceptor。
-->

---
layout: default
---

# 練習 3：完整解答

```typescript
// error-interceptor.ts
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Dialogs } from './dialogs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const dialogs = inject(Dialogs);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 0) dialogs.alert('無法連線到伺服器，請確認網路或稍後再試');
      else if (err.status >= 500) dialogs.alert('伺服器發生錯誤，請稍後再試');
      else if (err.status === 403) dialogs.alert('沒有權限執行這個操作');
      return throwError(() => err);      // 一律把錯誤繼續往下丟，讓畫面也能處理
    }));
};
```

```typescript
// app.config.ts
provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>成功標準：</b> 關掉 Spring Boot 後重新整理列表頁 → 跳出「無法連線到伺服器」；重複填寫同一個 Email → <b>不會</b>跳全域提示，而是畫面自己顯示「這個 Email 已經填寫過」。
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
errorInterceptor 用 catchError 攔錯誤，依狀態碼決定要不要提示，最後一律 throwError 把錯誤丟回去。為什麼還要丟？因為攔截器只是「順便」處理，呼叫端如果想針對某個錯誤做特別的處理，仍然需要拿到它。

status 等於 0 是特別的：代表瀏覽器根本沒收到回應，例如後端沒開、網路斷線、被 CORS 擋住。這種情況沒有 HTTP 狀態碼，Angular 用 0 表示。

這樣寫完之後，全站的元件都不用再寫這幾種錯誤的處理。
-->

---
layout: default
---

# 安全提醒：Token 存在哪裡？

| 存放位置 | 優點 | 風險 |
| --- | --- | --- |
| `localStorage`（本課程） | 簡單，重新整理後還在 | 網站若有 **XSS** 漏洞，Token 會被腳本讀走 |
| 記憶體（變數） | 讀不到 | 重新整理就消失 |
| `HttpOnly` Cookie | JavaScript 讀不到，最安全 | 需要後端配合，並防範 CSRF |

**降低風險的做法：**

- Access Token 要**短命**（15 分鐘）、Refresh Token 存在**後端**、可以作廢
- 不要用 `innerHTML` 顯示使用者輸入（Angular 的 `{{ }}` 預設會跳脫，是安全的）
- 正式環境使用 HTTPS

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 本課程用 <code>localStorage</code> 是為了讓大家看得到 Token、容易除錯；正式的商業系統，會評估改用 HttpOnly Cookie。
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
最後提醒一個安全上的取捨。Token 存在 localStorage 很方便，但如果網站有 XSS 漏洞，也就是攻擊者可以在你的網頁上執行腳本，那麼 localStorage 裡的東西全部都能被讀走。

比較安全的做法是 HttpOnly Cookie，JavaScript 完全讀不到，但需要後端配合，還要防範另一種攻擊 CSRF。

沒有絕對安全的做法，只有取捨。原則是：降低被偷之後的傷害，所以 Access Token 要短命；Refresh Token 放在後端資料庫，被偷了也能作廢。
-->

---
layout: default
---

# 本章重點整理

| 主題 | 重點 |
| --- | --- |
| 攔截器是什麼 | 請求與回應必經的管線，寫一次、全站生效 |
| 寫法 | `HttpInterceptorFn = (req, next) => ...`，`inject()` 取用 Service |
| 修改請求 | `req.clone({ setHeaders, withCredentials })`，請求不可變 |
| 註冊 | `provideHttpClient(withInterceptors([a, b]))`，請求 a→b，回應 b→a |
| Token | 每個請求自動帶 `Bearer`；登入、註冊 API 除外 |
| 401 | `catchError` → `refresh()` → `switchMap` 重送；`/api/auth/` 要排除 |
| 錯誤 | 系統層級的統一處理，業務錯誤留給畫面，最後 `throwError` 丟回去 |

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這一章的核心，就是「橫切關注點」這個觀念：凡是每個請求都要做的事，就交給攔截器。

三個攔截器：Loading（第 46 章）、Auth（Token 與 401）、Error（統一錯誤）。它們各司其職，順序也很重要：Auth 在前，Error 在後。

下一章，我們要處理另一個「每次進入頁面都要檢查」的問題：使用者沒登入，能不能進後台？這就是路由守衛（Route Guard）。
-->

---
layout: end
---

# 課程結束
### 用攔截器把 Token、Cookie、錯誤處理集中在一個地方

<!--
恭喜大家，做完這一章，你的前端已經有完整的登入與 Token 機制。

回顧一下：攔截器讓我們用十幾行程式，取代了幾十處重複；Refresh Token 讓使用者不會在操作到一半被登出；統一的錯誤處理讓使用者永遠知道發生了什麼。

下一章，路由守衛：沒登入的人，連後台的網址都進不去。大家休息一下，我們等一下見！
-->
