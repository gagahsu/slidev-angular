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
大家好！今天我們要聊一個非常重要，但初學者常常會踩雷的主題：Coding 習慣。
很多人一開始寫程式，覺得「只要電腦跑得動就是神作」。
但根據業界血淋淋的經驗，我們寫程式的時間，其實有 80% 都在「讀」程式碼。
如果習慣不好，兩個月後你再回來看，你一定會指著螢幕罵：「這是哪個白癡寫的？」然後發現作者的名字寫著你。
學完今天這堂課，你的程式碼會變得專業又乾淨，連未來的你都會流淚感謝現在的自己！
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
今天我們的修煉內容包含五個面向。
從最小的「變數怎麼取名」開始，到「檔案怎麼收納」、「程式碼怎麼排版」、「註解怎麼寫」，最後到最高深的「如何避免複製貼上（DRY 原則）」。
這五個習慣，就是分出「野生菜鳥」與「正規資深工程師」的關鍵分水嶺！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 1. 命名方式
# Naming Convention

<!--
首先，第一關：變數命名。
在程式界有一句名言：「電腦科學領域有兩大難題：一個是快取過期，另一個是變數命名。」
別笑，這真的很難！好的命名可以讓你的程式碼「自己會說話」，接手的人看一眼就懂，完全不需要你去解釋。
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
命名的核心法則就兩個字：「別猜！」
想像你去別人家作客，走進廚房，發現鹽罐、糖罐、醋瓶上面，都沒有寫名字，全部貼著「白色粉末A」、「液體B」。這你敢拿來做菜嗎？吃了直接送醫吧！
如果你把使用者姓名變數取名叫 `un`，把密碼叫 `pw`，這就跟標示「粉末A」是一樣的犯罪行為。
老老實實地寫下 `userName`、`password`。
初學者常為了省兩秒鐘少打幾個字而用自創縮寫，相信我，你省下來的兩秒鐘，以後會變成你花兩小時在那邊猜 `un` 到底代表什麼意思。
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
我們來做個殘酷的對比。
你看上面這段代碼，`let un = "Allen"`，這個 `un` 到底是 `userName` 還是 `unidentified`？
還有這個 `calc` 函式，到底在算什麼？算生命值嗎？還是算肝指數？
但你再看看下面整理過後的程式碼：`userName`、`password`、`calculateTotal`，是不是清爽無比？就算不會寫扣的阿嬤來，也大概能猜出這是在算總金額。
在命名風格上，我們通常會用 `camelCase`（小駝峰，字首小寫，後面大寫，像駱駝一樣起伏）。記住，命名清楚是工程師的基本美德！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 2. 檔案放置位置
# File Structure / Layout

<!--
名字取好了，接下來我們來聊聊專案裡的「收納哲學」。
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
這其實跟整理房間一模一樣。
如果你的衣服放在衣櫃，碗盤放在廚房，鞋子放在玄關，你生活就會很有條理。
但如果你把髒襪子塞進冰箱，把叉子放在鞋櫃，把鹽巴放在浴室，那你煮飯時肯定會崩潰。
寫專案也是這樣！我們的 HTML、CSS、圖片、API 檔案都有各自的家。
如果大家胡亂塞，今天想改張圖，找了半個小時都找不到在哪，那就準備加班吧。
以團隊協作為主的開發，檔案收納規範比你的個人喜好更重要！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 3. 排版
# Code Formatting

<!--
第三關：排版。這直接決定了你的程式碼看起來是「高檔法式料理」還是「夜市廚餘」。
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
來，看看這段扣。是不是覺得胸口很悶，有點呼吸困難？
對，它擠在同一行，沒有任何空格和縮排。
這就像是一篇沒有分段、沒有標點符號的長文章。
雖然電腦編譯器看得懂，但人類看一眼就想辭職。
千萬不要覺得「反正電腦跑得過就沒差」，寫程式是為了讓你的隊友（還有未來的你）能活下去！
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
你看！整理過後的程式碼，是不是賞心悅目多了？
我們用 Tab 鍵把裡面的邏輯往右邊推（這叫縮排 Indentation），讓結構一層包一層，清清楚楚。
好消息是，現代工程師不需要手動在那邊敲空格。
我們會安裝像是 `Prettier` 這種排版神兵利器，只要一按儲存，它就會像神仙教母一樣，一秒幫你把垃圾堆變成漂亮的舞會禮服！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 4. 註解
# Code Comments

<!--
第四關：註解。這就是我們在程式碼裡留下來的「便利貼」。
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
寫註解最重要的一點是：**「不要說廢話！」**
如果你寫 `let age = 18; // 宣告年齡變數為 18`。這就跟你指著一隻香蕉，然後貼標籤說「這是一隻黃色的香蕉」一樣，簡直在侮辱大家的智商。
註解是用來記錄「為什麼要這樣寫」（比如：為了解決某個神奇的 Bug，或者這裡晚點要接 API 記得標註 TODO）。
它是地圖上的「警告標示」，而不是單純的複讀機。
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
我們來看看這兩個業界常見的註解。
第一個用了 `TODO` 標記。這行會亮起來，告訴團隊：「這裡目前是假資料喔，之後要換掉！」這可以避免大家忘記漏做。
第二個則是附上了解法出處的官方文件連結。
這非常有愛！因為三個月後如果這段出事了，接手的人可以直接點連結去查官方說法，而不是在那裡通靈。
寫出有愛的註解，你的肝和同事的肝都會多活好幾年！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 5. 避免重複程式碼
# DRY Principle

<!--
最後一關，也是最至高無上的金科玉律：不要寫重複的程式碼！
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
這個原則英文簡稱叫 **DRY** (Don't Repeat Yourself) —— 不要重複你自己！
你想看，你為了提醒家人明天去買牛奶，在客廳貼了一張便利貼、廚房貼了一張、浴室又貼了一張。
結果晚點你媽打來說已經買了。這時你得跑三個地方去撕便利貼。要是漏撕了浴室那張，明天你弟進去看到，還是會白跑一趟去買牛奶。
寫程式複製貼上也是這個下場！如果你把同一段算稅金的代碼複製貼上到三個地方。
當稅率從 5% 改到 10% 的時候，你得改三個地方。漏掉一個，你的系統就報錯。這就叫給自己挖坑！
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
那要怎麼解決？我們把這段重複的邏輯「抽出來」，做成一個獨立的、叫 `calculateTax` 的「大腦/工具」。
不論是 A 功能還是 B 功能需要算稅金，都去打電話給這個 `calculateTax` 就好。
這樣一來，要是稅率真的改了，我只要在 `calculateTax` 裡面改一次，全站的資料就自動更新了！
這就像是社區的中央廣播系統，你只要在廣播室講一次，全村的人都聽得到，你不用傻傻地一家一家去敲門通知！
-->

---
layout: end
---

# 課程結束
### 養成好習慣，寫出易讀、易維護的程式碼！

<!--
好啦，關於 Coding 習慣的五大心法就到這邊。
這五點雖然不影響程式能不能執行，但絕對決定了你是一個「專業優質的工程師」還是「準備離職的 Bug 製造機」。
大家回去想想看，平常你有沒有把鹽巴標示成白色粉末的壞習慣？
下一堂課，我們就要正式準備環境，來跟 Angular 見面囉！
-->
