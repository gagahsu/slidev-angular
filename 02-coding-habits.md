---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Coding 習慣
routeAlias: ch02
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
    Programming Best Practices
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    Coding 習慣
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「好的習慣，讓程式開發更快速、維護更輕鬆」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
【開場白】
大家好！今天我們要聊一個非常重要，但新手常常會忽略的主題：Coding 習慣。

【為什麼要學這個？】
很多人以為寫程式只要功能跑得動就好，但實際上，我們寫程式的時間，有 80% 都在「讀」程式碼。如果習慣不好，三個月後的你可能根本看不懂現在的自己在寫什麼。

【今天學完你會能做什麼】
學完今天這堂課，你寫出來的程式碼會變得專業、整潔，讓同事（還有未來的你）都會感謝你！
-->

---
layout: default
---

# Outline

- **1. 命名方式** — 清楚命名，讓人一眼看懂
- **2. 檔案放置位置** — 結構統一，方便維護
- **3. 排版** — 整潔排版，提升可讀性
- **4. 註解** — 留下脈絡，方便接手
- **5. 避免重複程式碼** — DRY 原則，減少錯誤

<!--
【核心說明】
今天我們會從五個面向來建立好的開發習慣。

【程式世界怎麼用】
從最微觀的「變數怎麼命名」，到中觀的「程式碼怎麼排版、註解怎麼寫」，最後到宏觀的「專案架構怎麼放」以及「減少重複邏輯」。這五點是成為資深工程師的敲門磚。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 1. 命名方式
# Naming Convention

<!--
【開場白】
首先，我們來聊聊「命名」。這在程式開發中是公認最難的事情之一。

【為什麼要學這個？】
好的命名能讓程式碼「自我解釋」，不用看註解就知道在做什麼。
-->

---

# 命名方式

| 原則 | 說明 |
| --- | --- |
| 清楚易懂 | 讓人一眼看出這個變數 / 方法的用途 |
| 避免自創縮寫 | 真的需要縮寫，請加上註解說明 |
| 使用有意義的名稱 | 例如：使用者名稱用 `userName`，不用 `un` |
| 團隊統一風格 | 可根據開發團隊討論決定命名規則 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> 命名不只是自己看，更是讓一起開發與維護的夥伴能一眼看清楚這是什麼東西。
</div>

<!--
【核心說明】
命名的核心原則就是「不要猜」。

【生活化比喻】
就像你在幫小孩取名，你不會把小孩取名為「人1」、「人2」，因為這樣你根本分不出誰是誰。同樣地，變數名稱要能代表它的內容。

【程式世界怎麼用】
如果你正在寫一個購物車系統，存總金額的變數就應該叫 `totalPrice`，而不是 `a`。

⚠️ 學生常見誤解：
初學者常為了少打幾個字而使用超短縮寫，例如 `fn` 代替 `firstName`。相信我，這省下的幾秒鐘，未來會花幾小時來回想它到底是什麼。
-->

---

# 命名方式 — 範例

```typescript
// ❌ 不好的命名：縮寫不明，難以理解
let un = "Allen";
let pw = "123456";
function calc(a: number, b: number) { return a + b; }

// ✅ 好的命名：清楚表達用途
let userName = "Allen";
let password = "123456";
function calculateTotal(price: number, tax: number) { return price + tax; }
```

<!--
【帶讀程式碼前的鋪陳】
我們來直接看兩段程式碼的對比。

【逐步解說】
上面那段，如果你不告訴我，我可能要猜 `un` 是不是 `unit` 或 `unnamed`？`calc` 是算什麼？
但看下面那段，就算你不是工程師，你也能一眼看出這是在處理使用者名稱、密碼，以及計算總額。

【類比說明】
就像你去超市，上面的標籤寫著「物A $10」跟你寫著「鮮奶 $10」，後者讓你買得更放心。

💼 業界實務：
在業界，有些團隊會使用 `camelCase`（小駝峰，如 `userName`），有些用 `snake_case`（底線連結，如 `user_name`）。不管用哪種，重點是全專案要統一。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 2. 檔案放置位置
# File Structure / Layout

<!--
【開場白】
取好了名字，接著要看東西該放在哪。
-->

---

# 檔案放置位置

| 原則 | 說明 |
| --- | --- |
| 分類放置 | 同類型檔案放在對應資料夾中 |
| 統一結構（Layout） | 專案裡有許多檔案，需統一擺放規則 |
| 範例 | RESTful API 相關檔案放在 `api/` 資料夾 |
| 以團隊為主 | 以團隊開發的便利性為主，統一討論決定 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>為什麼重要：</b> 若每個人隨意擺放，維護時極高機率找不到檔案或少修改某隻檔案，導致系統出現問題。
</div>

<!--
【核心說明】
這是在說專案的「收納術」。

【生活化比喻】
想像你的廚房，餐具應該在碗盤櫃，調味料應該在調味區。如果你把鹽巴放在書房，把叉子放在鞋櫃，你煮飯一定會瘋掉。

【程式世界怎麼用】
我們通常會把 CSS 放在 `styles` 資料夾，圖檔放在 `assets` 或 `images` 資料夾。

💼 業界實務：
大型專案會有嚴格的規範，例如 Angular 的 `component` 檔案要怎麼放，如果亂放，自動化工具可能會抓不到檔案。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 3. 排版
# Code Formatting

<!--
【開場白】
接下來這點，直接決定了你專業的形象：排版。
-->

---

# 排版 — 未整理的程式碼

```c
int main() {printf("Hello World");
return 0;}
```

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
❌ <b>難以閱讀：</b> 程式碼擠在一起，沒有縮排，除錯與維護時容易出錯。
</div>

<!--
【核心說明】
看這段程式碼，是不是感覺呼吸很困難？

【生活化比喻】
這就像是一篇沒有標點符號、沒有段落的長文章。你雖然讀得完，但讀得很累，而且很容易漏看關鍵字。

⚠️ 學生常見誤解：
有些同學會覺得「反正電腦跑得懂就好」，但程式碼是寫給「人」看的，只是順便讓電腦跑而已。
-->

---

# 排版 — 整理後的程式碼

```c
int main() {
    printf("Hello World");
    return 0;
}
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>易於閱讀：</b> 縮排清楚、結構分明，維護與除錯都更方便。程式越大，良好排版的重要性越高。
</div>

<!--
【帶讀程式碼前的鋪陳】
整理過後，是不是清爽多了？

【逐步解說】
我們用了「縮排」（Indentation），讓裡面的邏輯往右推。這樣我們一眼就能看出 `printf` 是包含在 `main` 函式裡面的。

💼 業界實務：
現在我們不會手動排版，我們會用像 `Prettier` 或 `ESLint` 這樣的自動工具。只要一儲存，它就會自動幫你排得整整齊齊。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 4. 註解
# Code Comments

<!--
【開場白】
有時候，程式碼本身不夠，我們需要留一些話給後人。
-->

---

# 註解的用途

| 用途 | 說明 |
| --- | --- |
| 程式出處 | 記錄這段程式碼的來源或背景 |
| 待處理問題 | 開發中尚未解決的 TODO 事項 |
| 參考資料 | 記錄參考的文件或網址 |
| 開發者資訊 | 誰開發了哪段程式碼與開發日期 |

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 註解要讓所有人都能理解，而不是只有自己看得懂，否則就失去了寫註解的意義。
</div>

<!--
【核心說明】
註解是用來補充「為什麼這樣寫」而不是「寫了什麼」。

【生活化比喻】
註解就像是地圖上的備註。地圖顯示了路徑（程式碼），而備註會告訴你「這條路施工中（TODO）」或「這條路是捷徑（原因）」。

⚠️ 學生常見誤解：
不要寫廢話註解，例如 `let x = 10; // 把 x 設為 10`。這大家都看得到，不用寫。
-->

---

# 註解 — 範例

```typescript
// TODO: 待串接後端 API，目前先回傳假資料 (Allen, 2024-01-15)
getUserList(): User[] {
  return mockUsers;
}

// 參考：Angular 官方文件 https://angular.io/guide/http
// 此方法負責處理 HTTP 錯誤回應
handleError(error: HttpErrorResponse): Observable<never> {
  console.error('API Error:', error.message);
  return throwError(() => error);
}
```

<!--
【帶讀程式碼前的鋪陳】
看看這兩個實用的註解範例。

【逐步解說】
第一個用了 `TODO`，這在開發中超好用，這等於在提醒自己或同事：這裡還有事沒做完喔！
第二個則附上了參考文件連結，當未來程式出錯時，接手的人可以直接點進去看官方建議。

💼 業界實務：
業界甚至有自動掃描 `TODO` 註解的工具，幫專案經理追蹤還有哪些小功能還沒補上。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 5. 避免重複程式碼
# DRY Principle

<!--
【開場白】
最後一個原則，可以說是優質程式碼最重要的心法。
-->

---

# 避免重複程式碼 — 問題

當相同（或 8～9 成相似）的程式碼出現在多個地方，代表程式碼不健康。

```typescript
// ❌ 複製貼上：每個地方都有相同邏輯
calculatePriceA() { const tax = price * 0.05; return price + tax; }
calculatePriceB() { const tax = price * 0.05; return price + tax; }
calculatePriceC() { const tax = price * 0.05; return price + tax; }
```

<div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
❌ <b>問題：</b> 若邏輯有誤或需要修改，需要同時改多個地方，很容易遺漏，導致系統出現問題。
</div>

<!--
【核心說明】
我們叫這個原則為 **DRY (Don't Repeat Yourself)**，不要重複你自己。

【生活化比喻】
想像你寫了三張一樣的便條紙放在客廳、廚房、臥室，提醒老婆「明天要去超市」。結果你突然發現不用去了，你得跑三個房間把便條紙都收走。如果漏了一個，老婆還是會白跑一趟。

⚠️ 學生常見誤解：
很多同學習慣「複製貼上」，覺得很快。但這是「技術債」，今天省的時間，未來會變成加倍的除錯時間。
-->

---

# 避免重複程式碼 — 解法

發現相同邏輯時，將其提取為**共用方法**，各處呼叫即可。

```typescript
// ✅ 提取為共用方法
calculateTax(price: number): number {
  return price * 0.05;
}

// 各處呼叫共用方法
calculatePriceA(price: number) { return price + this.calculateTax(price); }
calculatePriceB(price: number) { return price + this.calculateTax(price); }
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>DRY 原則：</b> Don't Repeat Yourself — 只需修改一處，所有地方同步更新，大幅降低出錯機率。
</div>

<!--
【帶讀程式碼前的鋪陳】
我們把算稅金的邏輯抽出來，做成一個專門的工具。

【逐步解說】
你看，現在 A 和 B 都去呼叫 `calculateTax`。如果有一天政府宣布稅率從 5% 變成 10%，我只要在 `calculateTax` 改一個數字，全專案的邏輯就更新了！

【類比說明】
這就像是社區廣播系統，你只要對著麥克風講一次，全社區的人都聽得到，不用挨家挨戶去敲門。
-->

---
layout: end
---

# 課程結束
### 養成好習慣，寫出易讀、易維護的程式碼！

<!--
【結語】
今天講的這五點，雖然不影響功能能不能跑，但絕對影響你能不能成為一個優秀的開發者。

【互動引導】
大家想想看，在日常生活中，還有什麼「收納」或「命名」的例子，是可以運用在程式開發上的？

下一堂課，我們就要正式進入 Angular 的世界囉！
-->
