---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 全課程總複習 Ch1–56
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
    Angular Full-Stack Masterclass
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.2rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    全課程總複習
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「從 HTML 第一行到 Firebase 上線：56 章精華一次回顧」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，恭喜大家走到這裡。這一章是整套課程的總複習，我們會把 ch1 到 ch56 學過的所有東西，濃縮成一趟九站的回顧旅程。

這一章的目的不是重新教一遍，而是幫大家把散落在 56 章裡的知識「串成一張地圖」：哪些觀念屬於同一組、彼此怎麼銜接、實務上會在哪裡一起出現。每一站都會有重點速記表跟關鍵程式碼，站與站之間穿插快問快答，最後整理一份全課程最容易踩雷的易錯重點清單。

建議大家用這一章做兩件事：第一，考前或面試前快速掃一遍，找出自己不熟的站，回去重讀該章；第二，把快問快答當自我檢測，答不出來的題目就是你的複習清單。
-->

---
layout: default
---

# Outline

- **課程地圖** — 56 章如何組成九大階段
- **第一站：開發環境與工具**（Ch1–8）
- **第二站：HTML 與 CSS**（Ch9–12）
- **第三站：TypeScript 語法**（Ch13–18）
- **第四站：Angular 核心觀念**（Ch19–25）
- **第五站：模板語法與資料處理**（Ch26–31）
- **第六站：Angular Material**（Ch32–43）
- **第七站：非同步與狀態管理**（Ch44–47）
- **第八站：版面與表單**（Ch48–53）
- **第九站：RxJS 與部署上線**（Ch54–56）
- **全課程易錯重點 Top 10**

<!--
這張投影片是今天的路線圖。我們把 56 章分成九大階段，每一站都會先看「這一站在學什麼、為什麼放在這個位置」，再用速記表把該站的關鍵語法整理出來，並穿插快問快答讓大家自我檢測。

最後的易錯重點 Top 10 是全課程各章「注意」提醒的總整理，實務上大家寫專案最常卡住的地方幾乎都在這十點裡面。
-->

---
layout: default
---

# 課程地圖 — 九大階段

| 階段 | 章節 | 主題 | 你獲得的能力 |
| --- | --- | --- | --- |
| 一 | Ch1–8 | 開發環境與工具 | 建得起環境、開得了專案 |
| 二 | Ch9–12 | HTML 與 CSS | 刻得出靜態畫面 |
| 三 | Ch13–18 | TypeScript 語法 | 寫得出程式邏輯 |
| 四 | Ch19–25 | Angular 核心觀念 | 元件、繫結、路由、資料傳遞 |
| 五 | Ch26–31 | 模板語法與資料處理 | 控制流程、串 API、整理資料 |
| 六 | Ch32–43 | Angular Material | 用元件庫組出專業 UI |
| 七 | Ch44–47 | 非同步與狀態管理 | 訂閱、Loading、Signals |
| 八 | Ch48–53 | 版面與表單 | 後台版型、動態表單、RWD |
| 九 | Ch54–56 | RxJS 與部署 | 打包上線，作品見天日 |

<!--
先看這張全課程地圖。這九個階段不是隨便切的，它其實就是「一個前端工程師從零到上線」的完整工作流程：先有環境跟工具，才刻得出畫面；有畫面之後需要邏輯，所以學 TypeScript；邏輯要組織起來，就進入 Angular 的元件世界；畫面要有資料，所以學模板語法跟串 API；要好看省工，用 Material；要處理等待跟共享狀態，學非同步；要做出完整產品，補上版面表單跟 RWD；最後打包部署，作品正式上線。

大家複習的時候可以問自己：這九格裡面，哪一格我最心虛？那一格對應的章節就是你優先要回去重讀的。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第一站：開發環境與工具
# Ch1–8

<!--
第一站是開發環境與工具，對應 ch1 到 ch8。這一站的內容偏觀念跟操作，考試不太考，但實務上「環境建不起來」是新手放棄的第一大原因，所以我們還是把關鍵指令複習一遍。
-->

---
layout: default
---

# 第一站速記 — 觀念篇

**前端在做什麼？**（Ch1）
- 前端 = 使用者看得到、摸得到的部分；後端 = 資料與商業邏輯
- 三大技術分工：**HTML 是骨架、CSS 是衣服、TypeScript 是動作**

**Coding 習慣五原則**（Ch2）
- 命名有意義（camelCase 變數／方法、PascalCase 類別）
- 檔案放對位置、排版一致、註解寫「為什麼」、**DRY 避免重複程式碼**

**為什麼選 Angular？**（Ch3）
- 完整框架（路由、表單、HTTP 全內建）、TypeScript 原生支援、Google 維護
- 前置需求：**Node.js + npm**（用 `node -v`、`npm -v` 確認）

<!--
觀念篇三件事。第一，前後端分工：前端管畫面跟互動，後端管資料跟邏輯，兩邊靠 API 溝通，這個分工圖是後面 ch29 串 API 的基礎。第二，coding 習慣五原則，其中 DRY 最重要——只要你發現自己在複製貼上同一段程式碼，就該停下來抽成方法或元件。第三，Angular 是「全家桶」框架，路由表單 HTTP 都內建，代價是學習曲線比較陡，但學完就是完整的工程能力。
-->

---
layout: default
---

# 第一站速記 — 指令篇

| 指令 | 用途 | 章節 |
| --- | --- | --- |
| `cd 路徑`／`cd ..` | 切換目錄／回上一層 | Ch4 |
| `nvm install 22`／`nvm use 22` | 安裝／切換 Node.js 版本 | Ch5 |
| `npm install -g @angular/cli` | 全域安裝 Angular CLI | Ch5 |
| `ng new my-app` | 建立新專案 | Ch5 |
| `ng serve -o` | 啟動開發伺服器並開啟瀏覽器 | Ch5, Ch8 |
| `npm uninstall -g @angular/cli` | 移除 CLI（降版第一步） | Ch6 |
| `ng g c components/header` | 建立元件（generate component） | Ch8 |

**專案結構三巨頭**：`src/app` 放程式碼、`app.routes.ts` 管路由、`app.config.ts` 管全域 providers

<!--
指令篇用一張表整理。最常用的就是最後三個：ng new 開專案、ng serve 啟動、ng g c 建元件，這三個指令會跟著大家整個開發生涯。

nvm 的價值在 ch6 降版跟 ch56 部署都出現過：不同專案、不同工具需要不同 Node 版本，nvm 讓你不用重灌就能切換。

專案結構記三個位置就好：程式碼都在 src/app，路由設定在 app.routes.ts，全域服務註冊在 app.config.ts——後面 ch29 的 provideHttpClient() 就是加在這裡。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第二站：HTML 與 CSS
# Ch9–12

<!--
第二站是 HTML 跟 CSS，對應 ch9 到 ch12。這一站是所有畫面的基礎，Angular 的 template 本質上就是 HTML 加上 Angular 語法，所以 HTML/CSS 不熟的話，後面每一章都會卡。
-->

---
layout: default
---

# 第二站速記 — HTML 常用標籤（Ch9）

| 分類 | 標籤 | 重點 |
| --- | --- | --- |
| 標題／段落 | `h1`–`h6`、`p` | 區塊元素，各自獨佔一行 |
| 清單 | `ul`＋`li`、`ol`＋`li` | 無序／有序清單 |
| 連結／圖片 | `a href`、`img src` | `a` 行內、`img` 記得加 `alt` |
| 輸入 | `input type="text/number/date..."` | 搭配 `label`、`button` |
| 表格 | `table` > `tr` > `th`／`td` | 先列（tr）再格（td） |
| 容器 | `div`（區塊）、`span`（行內） | 版面切割的基本單位 |

**行內 vs 區塊**：區塊元素（div、p、h1）獨佔一行；行內元素（span、a、img）並排顯示

<!--
HTML 標籤複習一張表就夠。大家要能不查資料就寫出：標題段落、兩種清單、超連結、圖片、輸入框加按鈕、還有 table 的三層結構——table 包 tr、tr 包 th 或 td，先有列才有格。

行內跟區塊的差別會直接影響 CSS 排版：div 預設獨佔一行，span 會並排，這也是 ch12 display 屬性在控制的東西。表格結構在 ch33 學 mat-table 時會再次出現，mat-table 產生的就是原生 table 結構。
-->

---
layout: default
---

# 第二站速記 — CSS 核心觀念（Ch10–12）

<div class="grid grid-cols-2 gap-4">
<div>

**選擇器與優先權**（Ch10, Ch12）
```css
p { color: gray; }        /* 元素選擇器 */
.title { color: teal; }   /* class 選擇器 */
```
- class 用 `.` 開頭，一個標籤可掛多個 class
- **後蓋前**：同權重時，寫在後面的樣式蓋掉前面

**Box Model（由內而外）**
`content → padding → border → margin`

</div>
<div>

**Flex 排版**（Ch11）
```css
.box {
  display: flex;
  flex-direction: row;     /* 主軸方向 */
  justify-content: center; /* 主軸對齊 */
  align-items: center;     /* 次軸對齊 */
}
```
- 子元素 `flex: 1` 平分剩餘空間

**Position**（Ch12）
- `fixed` 釘在視窗、`relative`＋`absolute` 父子定錨
- `z-index` 決定堆疊順序（大的在上）

</div>
</div>

<!--
CSS 濃縮成四塊。第一，選擇器：元素選擇器選標籤、class 選擇器用點開頭，優先權記「後蓋前」——這個觀念在 ch12 特別強調過，很多「我的樣式怎麼沒生效」都是被後面的規則蓋掉了。

第二，Box Model 由內而外四層：content、padding、border、margin，調間距時先想清楚要調「內距」還是「外距」。

第三，flex 三件套：direction 決定主軸方向，justify-content 管主軸對齊，align-items 管次軸對齊，這組在 ch49 toolbar 的 spacer 技巧、ch53 RWD 都會再用到。

第四，position：fixed 是釘在視窗上不動，absolute 要搭配 relative 的父層當定錨，z-index 管誰蓋誰。
-->

---
layout: default
---

# 快問快答 ①（第一、二站）

1. `ng g c components/card` 這個指令會做什麼事？
2. 一個 `div` 想讓裡面三個子元素**水平置中且垂直置中**，CSS 要寫哪三行？
3. 同一個標籤同時被 `.red { color: red; }` 跟 `.blue { color: blue; }` 選中，`class="red blue"`，字是什麼顏色？為什麼？
4. `padding` 跟 `margin` 差在哪裡？

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 先自己回答，下一頁對答案。答不出來的題目，把對應章節記進你的複習清單。
</div>

<!--
第一次快問快答，範圍是前兩站。大家先把投影片暫停在這裡，四題都在心裡回答過一遍再往下翻。

提醒一下第三題，考的是 CSS 優先權的「後蓋前」，注意這裡的「後」指的是 CSS 檔案裡規則定義的順序，不是 class 屬性裡出現的順序，這是很多人誤解的地方。
-->

---
layout: default
---

# 快問快答 ① — 參考解答

1. 在 `src/app/components/` 下建立 `card` 元件的**四個檔案**（ts／html／scss／spec），並自動宣告好 `@Component` 設定（Ch8, Ch21）
2. ```css
   display: flex;
   justify-content: center;
   align-items: center;
   ```
   （Ch11）
3. 看 **CSS 檔案中誰寫在後面**——後蓋前原則；class 屬性裡的順序不影響（Ch10, Ch12）
4. `padding` 是**內距**（content 到 border 之間），`margin` 是**外距**（border 之外、與其他元素的距離）（Ch10）

<!--
對答案。第一題重點是 ng g c 一次產生四個檔案，而且會自動把 selector、templateUrl 這些設定寫好。第二題 flex 置中三行是前端面試的送分題，一定要背起來。第三題再強調一次：決定顏色的是 CSS 規則在檔案裡的順序，寫在後面的蓋前面。第四題用 Box Model 的圖記：padding 在框裡面，margin 在框外面。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第三站：TypeScript 語法
# Ch13–18

<!--
第三站進入 TypeScript，對應 ch13 到 ch18。這一站是整套課程的「邏輯引擎」，後面所有 Angular 元件的 .ts 檔案寫的都是這些東西。
-->

---
layout: default
---

# 第三站速記 — 型別與變數（Ch13–15）

```typescript
let userName: string = '小明';     // 字串
let age: number = 25;              // 數字
let isVip: boolean = true;         // 布林
let scores: number[] = [80, 90];   // 陣列
let anything: any = '不檢查型別';  // any：盡量避免
```

| 觀念 | 重點 | 章節 |
| --- | --- | --- |
| TS vs JS | TS = JS + 型別檢查，編譯期就抓錯 | Ch13 |
| `let` vs `const` vs `var` | 可重新賦值／不可重新賦值／**不要用 var** | Ch15 |
| 特殊型別 | `tuple`（定長定型）、`enum`（枚舉）、`null`／`undefined` | Ch14 |
| 畫面呈現 | 字串插值 `{{ userName }}` 顯示到 HTML | Ch15 |

<!--
型別與變數複習。最上面五行程式碼就是日常八成的宣告場景：string、number、boolean、陣列。any 雖然合法，但等於把 TypeScript 的型別保護關掉，教材一路都提醒大家盡量不要用。

宣告關鍵字記一個原則：預設用 const，需要重新賦值才用 let，var 因為有作用域陷阱（函式作用域而非區塊作用域），課程明確說不要再用。

宣告好的變數用雙大括號插值就能顯示到畫面上，這是 ch22 四種繫結裡的第一種——內嵌繫結。
-->

---
layout: default
---

# 第三站速記 — 方法與流程控制（Ch16–17）

<div class="grid grid-cols-2 gap-4">
<div>

**方法宣告與呼叫**（Ch16）
```typescript
add(a: number, b: number = 10): number {
  return a + b;
}
this.add(5);      // 15（b 用預設值）
this.add(5, 20);  // 25
```

**if / else if / else**（Ch17）
```typescript
if (score >= 90) { grade = 'A'; }
else if (score >= 60) { grade = 'B'; }
else { grade = 'C'; }
```

</div>
<div>

**for 迴圈兩種寫法**（Ch17）
```typescript
for (let i = 0; i < list.length; i++) { }
for (const item of list) { }  // 推薦
```

**常用陣列／字串方法**（Ch17）
```typescript
list.push(x);              // 加到尾端
list.filter(n => n > 60);  // 過濾
list.map(n => n * 2);      // 轉換
str.indexOf('關鍵字');     // 找位置，-1 = 沒找到
JSON.stringify(obj);       // 物件 → JSON 字串
JSON.parse(jsonStr);       // JSON 字串 → 物件
```

</div>
</div>

<!--
方法與流程控制。方法的組成四件事：名稱、參數（可帶型別跟預設值）、回傳型別、return。在元件裡呼叫自己的方法記得加 this。

迴圈兩種寫法都要看得懂：傳統 for 用索引，for...of 直接拿元素，日常開發推薦 for...of。

右下角這六個方法是全課程出場率最高的工具：filter 在 ch31 排序、ch38 即時搜尋、ch57 封存功能全部用到；indexOf 是即時搜尋的核心判斷；JSON 兩兄弟在 ch25 網頁儲存必用——因為 localStorage 只能存字串，物件進出都要靠 stringify 跟 parse 轉換。
-->

---
layout: default
---

# 第三站速記 — Date 日期物件（Ch18）

```typescript
const now = new Date();                    // 現在時間
const day = new Date('2024/06/15');        // 指定日期

day.getFullYear();  // 2024
day.getMonth();     // 5 ⚠️ 月份從 0 開始！
day.getDate();      // 15
day.getTime();      // 時間戳記（毫秒），用於日期比較
```

**日期比較**：轉成 `getTime()` 的毫秒數再比大小

```typescript
if (dateA.getTime() > dateB.getTime()) { /* A 比較晚 */ }
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b>Date 物件在 ch35 日期選擇器、ch36 DatePipe、ch57 綜合練習反覆出現，getMonth() 從 0 開始是全課程最經典的陷阱之一。
</div>

<!--
Date 物件單獨拉一頁，因為它是後面 Material 章節的常客。三個重點：第一，new Date() 不帶參數是現在，帶字串是指定日期。第二，getMonth() 回傳 0 到 11，六月回傳的是 5，這個陷阱每一屆都有人踩。第三，日期比較不要直接比 Date 物件，先用 getTime() 轉成毫秒數再比，才不會出現奇怪的結果。

ch35 的 mat-datepicker 的 min、max 綁的就是 Date 物件，ch36 的 DatePipe 吃的也是 Date 物件，所以這一頁務必熟練。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第四站：Angular 核心觀念
# Ch19–25

<!--
第四站是整套課程的心臟：Angular 核心觀念，對應 ch19 到 ch25。元件、生命週期、繫結、路由、資料傳遞、網頁儲存，這六個主題構成了 Angular 應用的骨幹，後面所有章節都建立在這一站之上。
-->

---
layout: default
---

# 第四站速記 — 元件與生命週期（Ch20–21）

<div class="grid grid-cols-2 gap-4">
<div>

**元件四檔案**（Ch21）

| 檔案 | 角色 |
| --- | --- |
| `.ts` | 邏輯與資料 |
| `.html` | 畫面模板 |
| `.scss` | 樣式 |
| `.spec.ts` | 測試 |

**引用元件**：把子元件加進 `imports` 陣列，HTML 用 `<app-header />`

</div>
<div>

**最常用的生命週期**（Ch20）

| Hook | 時機 | 典型用途 |
| --- | --- | --- |
| `constructor` | 建立實體 | 相依注入 |
| `ngOnInit` | 初始化完成 | **呼叫 API、初始化資料** |
| `ngAfterViewInit` | 畫面就緒 | 操作 DOM、**接 paginator** |
| `ngOnDestroy` | 元件銷毀 | **取消訂閱、清理資源** |

</div>
</div>

<!--
元件與生命週期。元件四檔案的分工要很清楚：ts 管邏輯、html 管畫面、scss 管樣式。standalone 元件要用別的元件，就把它加進 @Component 的 imports 陣列。

生命週期記四個就夠用：constructor 只做注入、ngOnInit 做初始化跟呼叫 API、ngAfterViewInit 做需要畫面就緒的事——ch33 mat-table 接 paginator 就是在這裡做的，因為 @ViewChild 要等 view 初始化完才拿得到；ngOnDestroy 負責善後，ch45、ch54 強調的取消訂閱就是在這裡呼叫 unsubscribe()。
-->

---
layout: default
---

# 第四站速記 — 四種繫結（Ch22）

| 繫結 | 語法 | 方向 | 範例 |
| --- | --- | --- | --- |
| 內嵌繫結 | `{{ }}` | TS → HTML | `{{ userName }}` |
| 屬性繫結 | `[屬性]` | TS → HTML | `[disabled]="isLocked"` |
| 事件繫結 | `(事件)` | HTML → TS | `(click)="save()"` |
| 雙向繫結 | `[(ngModel)]` | TS ↔ HTML | `[(ngModel)]="keyword"` |

```html
<input [(ngModel)]="keyword" (keyup)="search()">
<button [disabled]="!keyword" (click)="save()">送出 {{ keyword }}</button>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b>使用 <code>[(ngModel)]</code> 必須在元件 <code>imports</code> 加入 <code>FormsModule</code>，忘記匯入是最常見的報錯原因。
</div>

<!--
四種繫結是 Angular 的語法核心，記憶口訣是看符號：雙大括號是純顯示、方括號是 TS 塞值給 HTML 屬性、圓括號是 HTML 事件叫 TS 方法、方括號包圓括號（香蕉包在盒子裡）是雙向繫結。

下面那三行程式碼把四種繫結全用上了，大家要能逐一指出每個符號屬於哪一種。

最下面的注意事項極度重要：ngModel 來自 FormsModule，忘記匯入的話 Angular 會報「Can't bind to ngModel」，這個錯誤訊息大家在 ch38、ch41、ch50 應該都見過，看到它第一反應就是去檢查 imports 陣列。
-->

---
layout: default
---

# 第四站速記 — 路由（Ch23）

<div class="grid grid-cols-2 gap-4">
<div>

**設定路由**（app.routes.ts）
```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/:id', component: UserComponent },
];
```

**HTML 導航**
```html
<a routerLink="/home"
   routerLinkActive="active">首頁</a>
<router-outlet />
```

</div>
<div>

**TS 導航**
```typescript
private router = inject(Router);
goUser() {
  this.router.navigate(['/user', 5]);
}
```

**取得參數**
```typescript
private route = inject(ActivatedRoute);
// Route Params（/user/5）
const id = this.route.snapshot.paramMap.get('id');
// Query Params（?tab=info）
const tab = this.route.snapshot.queryParamMap.get('tab');
```

</div>
</div>

<!--
路由複習分四塊。第一，路由表定義在 app.routes.ts，path 對應到 component，冒號 id 是路由參數的佔位符。第二，HTML 導航用 routerLink，搭配 routerLinkActive 給當前頁面加樣式，router-outlet 是頁面元件實際渲染的位置。第三，TS 導航注入 Router 之後用 navigate，適合「按下按鈕、判斷完邏輯再跳頁」的場景。第四，取參數注入 ActivatedRoute：路徑裡的 /user/5 用 paramMap 拿，問號後面的 ?tab=info 用 queryParamMap 拿，這兩個很容易搞混，記「路徑內 param、問號後 query」。
-->

---
layout: default
---

# 第四站速記 — 資料傳遞三招（Ch24）

| 方式 | 方向 | 適用場景 |
| --- | --- | --- |
| `@Input` | 父 → 子 | 父元件把資料塞給子元件顯示 |
| `@Output` | 子 → 父 | 子元件發事件通知父元件 |
| Service | 任意元件之間 | 跨頁面、跨層級共享資料 |

```typescript
// 子元件
@Input() title: string = '';
@Output() saved = new EventEmitter<string>();

// Service（ng g s services/example 產生）
@Injectable({ providedIn: 'root' })
export class ExampleService { sharedData = ''; }

// 使用端：inject() 現代寫法
private exampleService = inject(ExampleService);
```

<!--
資料傳遞三招對應三種距離。父子之間近距離：往下用 @Input、往上用 @Output 加 EventEmitter，父元件的 HTML 用屬性繫結塞值、事件繫結接通知。距離一遠——例如兩個不同路由的頁面——就改用 Service：ng g s 產生、providedIn root 讓全 App 共用同一份實體，一邊塞值一邊讀值。

注入的寫法課程教了兩種：constructor 參數注入是傳統寫法，inject() 是 Angular 14 之後的現代寫法，兩種都要看得懂，自己寫推薦 inject()，跟 standalone 元件的風格最搭。
-->

---
layout: default
---

# 第四站速記 — 網頁儲存（Ch25）

| 方式 | 生命週期 | 特性 |
| --- | --- | --- |
| `localStorage` | **永久**（手動清除才消失） | 同網域共享 |
| `sessionStorage` | 分頁關閉即消失 | 僅限該分頁 |
| Cookie | 可設定過期時間 | 會隨請求送到後端；需安裝 `ngx-cookie-service` |

```typescript
// 只能存字串！物件要先轉 JSON
localStorage.setItem('user', JSON.stringify(userObj));
const user = JSON.parse(localStorage.getItem('user') ?? '{}');
```

<!--
網頁儲存三種方式用生命週期區分：localStorage 永久存活，適合「記住我」這類設定；sessionStorage 關分頁就消失，適合一次性的暫存；Cookie 可以設過期時間、而且會自動跟著 HTTP 請求送到後端，所以常拿來放登入憑證，在 Angular 裡要裝 ngx-cookie-service 套件來操作。

程式碼那兩行是必考組合：Web Storage 只能存字串，所以物件進去前要 JSON.stringify，出來後要 JSON.parse，這裡剛好呼應第三站教過的 JSON 兩兄弟。
-->

---
layout: default
---

# 快問快答 ②（第三、四站）

1. `ngOnInit` 跟 `constructor` 都在元件建立初期執行，呼叫 API 應該放哪個？為什麼？
2. `[(ngModel)]` 報錯「Can't bind to ngModel」，第一步檢查什麼？
3. 網址 `/product/12?from=list`，`12` 跟 `list` 分別用什麼方法取得？
4. 兩個**沒有父子關係**的元件要共享一個購物車數量，用什麼方式？
5. 要把物件存進 `localStorage`，直接 `setItem('cart', cartObj)` 會發生什麼事？

<!--
第二次快問快答，範圍是 TypeScript 跟 Angular 核心。第五題特別實務：直接把物件丟給 setItem，JavaScript 會自動把它轉成字串 "[object Object]"，資料就毀了，大家想一下正確寫法是什麼。
-->

---
layout: default
---

# 快問快答 ② — 參考解答

1. 放 **`ngOnInit`**。`constructor` 只負責注入，執行時元件輸入與初始化尚未完成；`ngOnInit` 才是官方建議的初始化時機（Ch20）
2. 檢查元件 `imports` 是否加入 **`FormsModule`**（Ch22）
3. `12` 用 `route.snapshot.paramMap.get('id')`（Route Params）；`list` 用 `route.snapshot.queryParamMap.get('from')`（Query Params）（Ch23）
4. 建立 **Service**（`providedIn: 'root'`），兩個元件都注入同一份實體（Ch24）
5. 會存成 `"[object Object]"`，資料遺失。正確作法：`setItem('cart', JSON.stringify(cartObj))`，取出時 `JSON.parse`（Ch25）

<!--
對答案。第一題是觀念題：constructor 的職責只有注入，真正的初始化工作交給 ngOnInit。第二題的 FormsModule 是全課程最高頻錯誤，沒有之一。第三題再複誦一次口訣：路徑內 param、問號後 query。第四題只要元件之間沒有直接的父子關係，Service 就是標準答案。第五題的 stringify/parse 組合，跟 ch25 的教學完全一致。

五題全對的同學，第三、四站可以放心跳過；有錯的，回去重讀對應章節。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第五站：模板語法與資料處理
# Ch26–31

<!--
第五站是模板語法與資料處理，對應 ch26 到 ch31。這一站學的是 Angular 新版控制流程語法 @for、@if、@switch，加上串 API、interface 型別設計跟資料排序——畫面終於開始跟「真實資料」互動了。
-->

---
layout: default
---

# 第五站速記 — 控制流程語法（Ch26–28）

<div class="grid grid-cols-2 gap-4">
<div>

**@for 陣列顯示**（Ch26）
```html
@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <p>目前沒有資料</p>
}
```

**@if 條件顯示**（Ch27）
```html
@if (score >= 90) { <p>優秀</p> }
@else if (score >= 60) { <p>及格</p> }
@else { <p>不及格</p> }
```

</div>
<div>

**@switch 條件切換**（Ch28）
```html
@switch (status) {
  @case ('success') { <p>成功</p> }
  @case ('error')   { <p>失敗</p> }
  @default          { <p>處理中</p> }
}
```

- `track` 為**必填**，幫 Angular 辨識每筆資料
- 條件 2–3 個用 `@if`，多分支等值判斷用 `@switch`

</div>
</div>

<!--
三個控制流程語法一次看。@for 取代舊版的 *ngFor，track 是必填的，通常綁唯一的 id，讓 Angular 知道哪筆資料變了、只重繪那一筆；@empty 是空陣列時的預設顯示，ch57 的已封存清單就用了這個。

@if / @else if / @else 的結構跟 TypeScript 的 if 完全對應，只是搬到 template 而已。@switch 適合「同一個值有很多種可能」的場景，例如訂單狀態、HTTP 狀態碼分類。

選擇原則：兩三個條件用 @if 就好，四種以上的等值分支換 @switch 比較乾淨。
-->

---
layout: default
---

# 第五站速記 — 串接 API（Ch29）

**三步驟**：註冊 → 包 Service → 元件訂閱

```typescript
// ① app.config.ts
providers: [provideHttpClient()]

// ② Service：包裝 HttpClient
private http = inject(HttpClient);
getUsers(): Observable<User[]> {
  return this.http.get<User[]>('https://api.example.com/users');
}

// ③ 元件：subscribe 訂閱取得結果
this.userService.getUsers().subscribe(data => {
  this.users = data;
});
```

**四種 HTTP 方法**：`get`（查）、`post`（增）、`put`（改）、`delete`（刪）

<!--
串 API 的標準三步驟。第一步在 app.config.ts 註冊 provideHttpClient()，這步只做一次，忘記做的話注入 HttpClient 會直接報錯。第二步把 HTTP 呼叫包在 Service 裡，元件不直接碰 HttpClient，這是職責分離的好習慣。第三步元件呼叫 Service 方法之後要 subscribe，因為 HttpClient 回傳的是 Observable——不訂閱的話請求根本不會發出去，這是 ch29 的重要提醒。

四種 HTTP 方法對應資料庫的增查改刪：get 查、post 增、put 改、delete 刪，跟後端溝通的語彙就是這四個。
-->

---
layout: default
---

# 第五站速記 — Interface 與排序（Ch30–31）

<div class="grid grid-cols-2 gap-4">
<div>

**Interface 定義資料形狀**（Ch30）
```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
  note?: string;  // ? = 可選屬性
}
```
- `ng g i interfaces/product` 產生獨立檔案
- API 回傳資料都應該定義 interface，
  取代 `any`

</div>
<div>

**sort() 排序**（Ch31）
```typescript
// 數字升冪：a - b；降冪：b - a
list.sort((a, b) => a.price - b.price);

// 切換排序欄位
sortBy(key: 'price' | 'id') {
  this.list.sort((a, b) => a[key] - b[key]);
}
```
- 回傳負數 → a 在前；正數 → b 在前

</div>
</div>

<!--
Interface 跟排序。Interface 是 TypeScript 型別能力的精華：先定義資料長什麼形狀，API 回傳的資料、表格的每一列都套上型別，打錯屬性名稱編譯器立刻告訴你。問號代表可選屬性，有沒有這個欄位都合法。課程慣例是用 ng g i 產生獨立檔案放在 interfaces 資料夾。

sort() 的核心是比較函式的回傳值：負數表示 a 排前面、正數表示 b 排前面，所以數字升冪寫 a 減 b、降冪寫 b 減 a，這個公式直接背起來。ch33 的 mat-table 資料、ch57 的員工列表排序都是同一套邏輯。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第六站：Angular Material
# Ch32–43

<!--
第六站是 Angular Material，對應 ch32 到 ch43，整整十二章，是課程裡最大的一站。這一站的模式非常固定：裝套件、匯入模組、抄官方範例的 HTML 結構、再客製化。把這個模式學起來，以後遇到沒教過的 Material 元件也能自己看文件上手。
-->

---
layout: default
---

# 第六站速記 — Material 元件總表（一）

| 元件 | 關鍵模組 | 一句話重點 | 章節 |
| --- | --- | --- | --- |
| 安裝 | `ng add @angular/material` | 選主題、動畫、全域字型 | Ch32 |
| Mat-table | `MatTableModule` | `dataSource` + `matColumnDef` 定義欄位 | Ch33 |
| 分頁器 | `MatPaginatorModule` | `ngAfterViewInit` 把 `@ViewChild` 的 paginator 接上 dataSource | Ch33 |
| Mat-icon | `MatIconModule` | 名稱查 Google Fonts Icons，`<mat-icon>home</mat-icon>` | Ch34 |
| Datepicker | `MatDatepickerModule` | **必加 `provideNativeDateAdapter()`**；`[min]`／`[max]` 限制範圍 | Ch35 |
| Tabs | `MatTabsModule` | `mat-tab-group` 包 `mat-tab label="..."` | Ch40 |
| Select | `MatSelectModule` | `mat-select` + `mat-option`，用 `ngModel` 綁值 | Ch41 |

<!--
Material 元件用兩張總表複習。這張表的用法是：遮住右邊兩欄，看元件名稱能不能講出關鍵模組跟重點。

幾個高頻陷阱先點名：mat-table 的欄位顯示由 displayedColumns 陣列控制，matColumnDef 的名稱要跟陣列裡的字串一致；paginator 一定要在 ngAfterViewInit 裡接，因為 @ViewChild 要等畫面初始化完才抓得到；datepicker 的 provideNativeDateAdapter() 忘記加的話，日曆直接壞掉，這是 ch35、ch57 都特別強調的。
-->

---
layout: default
---

# 第六站速記 — Material 元件總表（二）

| 元件 | 關鍵模組 | 一句話重點 | 章節 |
| --- | --- | --- | --- |
| Dialog | `MatDialogModule` | `dialog.open(元件, { data })`；內部注入 `MAT_DIALOG_DATA` 收資料 | Ch43 |
| Sidenav | `MatSidenavModule` | 三種模式：`over`（覆蓋）／`push`（推擠）／`side`（並排） | Ch48 |
| Toolbar | `MatToolbarModule` | Spacer 技巧：`flex: 1 1 auto` 把按鈕推到右邊 | Ch49 |
| Menu／Badge | `MatMenuModule`、`MatBadgeModule` | 下拉選單與角標提示 | Ch49 |
| Radio | `MatRadioModule` | `mat-radio-group` 綁 `ngModel`，單選 | Ch50 |
| Checkbox | `MatCheckboxModule` | 每個選項各綁一個 boolean，複選 | Ch50 |
| Spinner | `MatProgressSpinnerModule` | `mat-spinner` 搭配 Loading 狀態顯示 | Ch46 |

<div class="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 通用模式：<b>裝套件 → 元件 imports 加模組 → 抄官方 HTML 結構 → 客製化</b>。報錯先檢查模組有沒有匯入。
</div>

<!--
第二張總表。Dialog 的資料流要熟：呼叫端用 dialog.open 開啟並透過 data 傳資料進去，Dialog 元件內部注入 MAT_DIALOG_DATA 接收、注入 MatDialogRef 控制關閉。Sidenav 三種模式的差別：over 蓋在內容上、push 把內容推開、side 跟內容並排，後台版型最常用 side。

radio 跟 checkbox 的本質差異：radio 是一組裡選一個，整組綁同一個變數；checkbox 每個選項獨立，各綁各的 boolean。

最下面的通用模式是這一站最重要的帶得走的能力：所有 Material 元件都是同一套流程，報錯的第一反應永遠是「模組匯入了沒」。
-->

---
layout: default
---

# 第六站速記 — Pipe 與畫面技巧（Ch36–39, 42）

<div class="grid grid-cols-2 gap-4">
<div>

**兩個常用 Pipe**（需 `CommonModule`）
```html
<!-- DatePipe（Ch36） -->
{{ hireDate | date: 'yyyy/MM/dd' }}

<!-- JsonPipe（Ch37）：搭配 pre 保留排版 -->
<pre>{{ user | json }}</pre>
```

**ngClass 三種用法**（Ch39）
```html
<td [ngClass]="{ 'high': e.salary >= 60000 }">
<div [ngClass]="statusClass">
<div [ngClass]="getClass(item)">
```

</div>
<div>

**即時搜尋套路**（Ch38）
```html
<input [(ngModel)]="keyword"
       (keyup)="applyFilter()">
```
```typescript
applyFilter() {
  this.dataSource.data = this.items.filter(
    e => e.name.indexOf(this.keyword) !== -1
  );
}
```

**圓餅圖**（Ch42）：`npm install chart.js`，
`new Chart(canvas, { type: 'pie', data, options })`

</div>
</div>

<!--
這一頁是 Material 站的畫面技巧集。DatePipe 把 Date 物件排版成想要的格式，格式字串 yyyy/MM/dd 注意大小寫——MM 是月份、mm 是分鐘，寫錯不會報錯但顯示會很奇怪。JsonPipe 是開發時的偵錯神器，搭配 pre 標籤才有縮排。兩個 pipe 都要匯入 CommonModule。

ngClass 三種用法：物件語法適合條件高亮（ch57 的薪水高亮就是這個）、變數語法適合狀態切換、方法回傳適合複雜邏輯。

即時搜尋的套路要背熟：keyup 觸發、ngModel 存關鍵字、filter 加 indexOf 過濾，然後把結果指回 dataSource.data——注意是「從完整資料重新算」，不是在已過濾的結果上再過濾。
-->

---
layout: default
---

# 快問快答 ③（第五、六站）

1. `@for` 少寫 `track` 會怎樣？`track` 通常綁什麼？
2. 呼叫 `this.http.get(...)` 之後沒有 `subscribe`，請求會發出去嗎？
3. mat-table 的分頁器沒反應，最可能漏了哪一步？
4. mat-datepicker 日曆打不開或報錯，九成是少了什麼設定？
5. 搜尋框先過濾出 3 筆結果，接著在**這 3 筆**上再輸入新關鍵字過濾，會有什麼 bug？正確作法是？

<!--
第三次快問快答，都是實作時真的會遇到的狀況題。第五題是即時搜尋最經典的邏輯錯誤，ch38 跟 ch57 都強調過，大家想清楚「過濾的來源」應該是誰。
-->

---
layout: default
---

# 快問快答 ③ — 參考解答

1. 直接**編譯錯誤**——新版 `@for` 的 `track` 是必填；通常綁唯一值如 `item.id`（Ch26）
2. **不會**。Observable 是惰性的，`subscribe` 才會真正發出請求（Ch29, Ch54）
3. 漏了在 `ngAfterViewInit` 中執行 `this.dataSource.paginator = this.paginator`（Ch33）
4. `providers` 少了 **`provideNativeDateAdapter()`**（Ch35）
5. 越搜越少、刪字也回不來——因為資料來源被覆寫了。正確作法：**每次都從完整的原始陣列**（如 `this.items`）重新 `filter`，把結果指定給 `dataSource.data`（Ch38）

<!--
對答案。第二題的觀念會在第九站 RxJS 再出現一次：Observable 是惰性的，沒人訂閱就不執行，這跟 Promise 建立就執行的行為是關鍵差異。第三題跟第四題是 Material 兩大定番錯誤，建議大家在自己的筆記裡把這兩條列成 checklist。第五題的原則叫「原始資料不可變、顯示資料用算的」，ch57 綜合練習的 applyFilters 就是這個原則的完整示範。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第七站：非同步與狀態管理
# Ch44–47

<!--
第七站是非同步與狀態管理,對應 ch44 到 ch47。這一站處理兩個實務必考題：「資料還沒回來的時候畫面怎麼辦」跟「多個元件怎麼共享同一份狀態」。
-->

---
layout: default
---

# 第七站速記 — 同步與非同步（Ch44）

```typescript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// 輸出順序：1 → 3 → 2
```

| 寫法 | 特性 |
| --- | --- |
| `setTimeout` | 最基本的延遲執行 |
| `Promise` + `then` | 一次性的非同步結果 |
| `async` / `await` | 用同步的寫法處理非同步 |
| Observable | 可多次發值、可取消，Angular 主力 |

**同步**：一行做完才做下一行；**非同步**：先登記、先往下走，結果好了再回來

<!--
非同步的心智模型用上面那三行程式碼建立：即使 setTimeout 延遲設 0，輸出還是 1、3、2——因為非同步工作會先被放到佇列，等同步程式全部跑完才執行。這題是面試經典題，也是理解「為什麼 API 資料要在 subscribe 回呼裡處理」的關鍵。

四種非同步寫法由淺入深：setTimeout 是入門、Promise 處理一次性結果、async/await 是 Promise 的語法糖、Observable 則是 Angular 的主力，能多次發值、能取消，下一頁就展開。
-->

---
layout: default
---

# 第七站速記 — 訂閱與狀態共享（Ch45）

**Service 三步驟：宣告 Subject → 公開 Observable → next() 更新**

```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0); // ① 私有 Subject
  cartCount$ = this.cartCountSubject.asObservable();         // ② 公開 Observable（$ 字尾）

  addToCart() {
    this.cartCountSubject.next(this.cartCountSubject.value + 1); // ③ next() 通知所有訂閱者
  }
}
```

```typescript
// 元件端：訂閱
this.cartService.cartCount$.subscribe(count => this.count = count);
```

<div class="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>BehaviorSubject</b> 需要初始值、新訂閱者立刻收到最新值 — 最適合「狀態」；<b>Subject</b> 只收得到訂閱後發生的事件。
</div>

<!--
這一頁是 ch45 加 ch46 的核心套路，也是業界 Angular 專案最常見的狀態共享模式，三步驟務必能默寫：私有的 Subject 負責收值、asObservable 公開唯讀版本給外面訂閱（命名慣例加錢字號字尾）、next() 發新值通知所有訂閱者。

私有加公開的設計是刻意的：外部元件只能訂閱、不能直接 next，狀態的變更全部集中在 Service 的方法裡，追 bug 的時候才知道去哪找。

Subject 跟 BehaviorSubject 的選擇：狀態類的東西（購物車數量、登入狀態、loading）用 BehaviorSubject，因為新訂閱者需要立刻知道「現在的值」；純事件通知才用 Subject。
-->

---
layout: default
---

# 第七站速記 — Loading 全域架構（Ch46）

**問題**：等 API 時畫面沒回饋 → **解法**：全域 Loading 遮罩

| 角色 | 職責 |
| --- | --- |
| `LoadingService` | `BehaviorSubject<boolean>` 管理 loading 狀態 |
| `HttpInterceptor` | **攔截所有 HTTP 請求**：發出時 `show()`、完成時 `hide()` |
| `AppComponent` | 訂閱 `loading$`，控制 spinner 顯示 |
| CSS Overlay | `position: fixed` 全螢幕遮罩 + 置中 spinner |

```html
<!-- async pipe：自動訂閱、自動退訂 -->
@if (loading$ | async) {
  <div class="overlay"><mat-spinner /></div>
}
```

<!--
Loading 是把 ch45 的訂閱套路應用到真實需求的完整案例。四個角色分工：LoadingService 拿 BehaviorSubject 管布林狀態；HttpInterceptor 是關鍵角色，它攔截所有 HTTP 請求，發出時開 loading、回來時關 loading，所以各頁面完全不用自己寫 show/hide；AppComponent 只負責訂閱跟顯示；CSS 用 fixed 遮罩擋住使用者操作。

HTML 裡的 async pipe 值得特別記：它會自動訂閱、元件銷毀時自動退訂，不用手動 subscribe 也不用擔心記憶體洩漏，是 template 裡消費 Observable 的最佳寫法。
-->

---
layout: default
---

# 第七站速記 — Signals（Ch47）

```typescript
count = signal(0);                          // 建立：必須給初始值
double = computed(() => this.count() * 2);  // 衍生值：相依變了自動重算

increment() {
  this.count.set(5);                 // 直接設值
  this.count.update(v => v + 1);     // 由舊值算新值
}

constructor() {
  effect(() => console.log('count 變成', this.count()));  // 監聽變化
}
```

```html
<p>{{ count() }} 的兩倍是 {{ double() }}</p>  <!-- 讀值要加 () -->
```

| 場景 | 用 Signal | 用 Observable |
| --- | --- | --- |
| 同步狀態（計數、開關、購物車） | ✅ | 可以但繞路 |
| 非同步（API、事件流） | ❌ | ✅ |

<!--
Signals 是 Angular v16 之後的新狀態管理方式，跟 Observable 的訂閱模式相比，它讓「讀值」變得直覺——不用 subscribe，直接呼叫就拿到現在的值,但要記得加小括號，這是最容易忘的語法細節，template 裡也一樣。

四個 API：signal 建立（必須給初始值）、set 直接設值、update 由舊值算新值、computed 做衍生值（相依的 signal 一變就自動重算，比 getter 有效率因為有快取）、effect 監聽變化做副作用。

最下面的選擇表是 ch47 的結論：同步狀態用 Signal 更簡潔，但非同步場景——等 API、事件流——仍然是 Observable 的地盤，兩者是互補不是取代。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第八站：版面與表單
# Ch48–53

<!--
第八站是版面與表單，對應 ch48 到 ch53。sidenav 加 toolbar 組出後台版型、radio checkbox 處理選項、Reactive Forms 加 Validators 做動態表單驗證，最後用 RWD 讓畫面在手機上也能看。這一站做完，一個完整的後台系統就成形了。
-->

---
layout: default
---

# 第八站速記 — Reactive Forms（Ch51）

**三個積木**

| 積木 | 角色 | HTML 繫結 |
| --- | --- | --- |
| `FormControl` | 單一欄位 | `formControlName` |
| `FormGroup` | 多欄位容器 | `[formGroup]`／`formGroupName` |
| `FormArray` | **數量不固定**的欄位列表 | `formArrayName` |

```typescript
form = new FormGroup({
  title: new FormControl(''),
  questions: new FormArray<FormGroup>([]),
});

get questions() { return this.form.get('questions') as FormArray; }
addQuestion()    { this.questions.push(new FormGroup({ text: new FormControl('') })); }
removeQuestion(i: number) { this.questions.removeAt(i); }
```

<!--
Reactive Forms 的核心是三個積木的層級關係：FormControl 是最小單位的一個欄位，FormGroup 把多個 Control 包成物件，FormArray 管理數量會變的欄位列表——像問卷題目可以一直新增刪除，就是 FormArray 的主場。

程式碼示範的是 ch51 動態問卷的骨架：getter 把 FormArray 取出來方便操作，push 新增一組題目、removeAt 刪除指定索引。HTML 那邊對應的繫結指令要配對記：formGroup 綁最外層、formControlName 綁欄位、formArrayName 綁陣列，然後用 @for 跑 controls 把每一組題目畫出來。
-->

---
layout: default
---

# 第八站速記 — Validators 驗證（Ch52）

```typescript
email: new FormControl('', [Validators.required, Validators.email]),
password: new FormControl('', [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(/^(?=.*[a-z])(?=.*\d).+$/),  // Regex 自訂規則
]),
```

| 常用 Validator | 驗證內容 |
| --- | --- |
| `required` | 必填 |
| `minLength(n)`／`maxLength(n)` | 長度下限／上限 |
| `email` | Email 格式 |
| `pattern(regex)` | 正規表達式自訂規則 |

**狀態屬性**：`valid`／`invalid`、`touched`（碰過）、`dirty`（改過）

```html
@if (form.get('email')?.invalid && form.get('email')?.touched) {
  <span class="error">請輸入正確的 Email</span>
}
```

<!--
Validators 直接掛在 FormControl 的第二個參數陣列裡，可以同時掛多個，全部通過欄位才算 valid。四個內建的要熟，更複雜的規則用 pattern 搭配正規表達式，像密碼要同時有小寫字母跟數字這種需求。

錯誤訊息的顯示時機是 ch52 的重點：不能只判斷 invalid，要搭配 touched——使用者碰過這個欄位——才顯示錯誤，不然表單一打開就滿江紅，體驗很差。touched 是「聚焦過再離開」、dirty 是「值改過」，兩個狀態的差別要分清楚。
-->

---
layout: default
---

# 第八站速記 — RWD 響應式設計（Ch53）

```scss
.container { display: flex; gap: 1rem; }

/* 寬度 768px 以下：改直向堆疊 */
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
```

| 斷點 | 裝置 |
| --- | --- |
| `max-width: 576px` | 手機 |
| `max-width: 768px` | 平板直向 |
| `max-width: 992px` | 平板橫向／小筆電 |

**響應式單位**：`%`（相對父層）、`vw`／`vh`（相對視窗）、`rem`（相對根字級）優於寫死的 `px`

<div class="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 開發時用瀏覽器 DevTools 的裝置模擬（Responsive 模式）即時檢查各斷點的畫面。
</div>

<!--
RWD 的核心武器是 media query：平常寫桌面版樣式，再用 @media max-width 在小螢幕覆寫——注意這裡又用到「後蓋前」原則，media query 要寫在一般規則後面才蓋得掉。

最常用的斷點就表格那三個，記 768 這個數字最重要，它是「平板以下改直向」的業界慣用線。搭配 flex-direction 從 row 切成 column，就是最簡單有效的 RWD 手法，ch53 的範例就是這樣做的。

單位的選擇：能用相對單位就不要寫死 px，百分比相對父層、vw/vh 相對視窗、rem 相對根字級，畫面才會跟著螢幕縮放。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第九站：RxJS 與部署上線
# Ch54–56

<!--
最後一站：RxJS 的系統性整理，加上打包跟部署，對應 ch54 到 ch56。RxJS 其實從 ch29 的 subscribe 開始就一直在用了，ch54 是把散落的概念收攏成完整的知識體系；ch55、ch56 則是讓作品真正上線的最後一哩路。
-->

---
layout: default
---

# 第九站速記 — RxJS 核心概念（Ch54）

| 概念 | 角色 |
| --- | --- |
| Observable（可觀察者） | 資料的生產者，**惰性**：有人訂閱才執行 |
| Observer（觀察者） | 消費者：`next`／`error`／`complete` 三個回呼 |
| Subscription | 訂閱憑證，`unsubscribe()` 取消；`add()` 可統一管理多個訂閱 |
| Subject | 既是 Observable 也是 Observer，一對多廣播的橋接器 |
| Operators | `pipe()` 串接 `map`、`filter` 等運算子加工資料流 |

**vs Promise**：Promise 建立就執行、只發一次值、不能取消；Observable 訂閱才執行、可發多次、可取消

<div class="mt-2 p-3 bg-red-50 border-l-4 border-red-400 text-gray-700 text-sm text-left">
⚠️ 元件銷毀時（`ngOnDestroy`）務必 `unsubscribe()`，否則造成記憶體洩漏 — 尤其是 `interval` 這類不會自己結束的 Observable。
</div>

<!--
RxJS 五個概念一張表收攏。Observable 是生產者而且是惰性的——這解釋了 ch29 那個「不 subscribe 請求不會發出」的行為；Observer 是消費者，subscribe 裡傳的物件可以有 next、error、complete 三個回呼；Subscription 是訂閱的憑證，要取消就對它呼叫 unsubscribe，多個訂閱可以用 add 掛在一起、一次全取消；Subject 一對多廣播，ch45 的狀態共享就是靠它；Operators 用 pipe 串接，對資料流做加工。

跟 Promise 的三點差異是面試常客：執行時機、發值次數、可否取消。

最下面的紅色警告是全課程最重要的資源管理原則：訂閱了就要在 ngOnDestroy 退訂，不然元件銷毀了訂閱還活著，記憶體洩漏。
-->

---
layout: default
---

# 第九站速記 — 打包與部署（Ch55–56）

<div class="grid grid-cols-2 gap-4">
<div>

**ng build 打包**（Ch55）
```bash
ng build
```
- 產出 `dist/` 資料夾：壓縮過的 HTML／JS／CSS 靜態檔案
- 部署的就是 `dist/專案名/browser` 的內容
- **Bundle Budget 超標**：在 `angular.json` 調整 `budgets` 上限

</div>
<div>

**Firebase Hosting 部署**（Ch56）
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```
- Public directory 指向 build 產出目錄
- **SPA 模式選 Yes**：所有路徑都導回 `index.html`，路由才不會 404

</div>
</div>

**上線流程**：`ng build` → `firebase init hosting` → `firebase deploy` → 取得正式網址 🎉

<!--
最後一哩路。ng build 把整個專案壓縮打包成純靜態檔案放進 dist，這包東西丟到任何靜態主機都能跑。build 時如果跳 Bundle Budget 錯誤，代表打包後的檔案超過 angular.json 設定的大小預算，去調 budgets 上限即可。

Firebase 部署四個指令：裝 CLI、登入、init、deploy。init 的設定裡最關鍵的是 SPA 模式要選 Yes——Angular 是單頁應用，所有路由都由前端接管，如果不把所有路徑導回 index.html，使用者直接輸入子路由網址或重新整理就會 404，這是 ch56 特別強調的坑。

deploy 成功後拿到正式網址，你的作品就真的在網路上活著了。
-->

---
layout: default
---

# 快問快答 ④（第七、八、九站）

1. 為什麼 Service 裡的 Subject 要宣告成 `private`，再另外公開 `asObservable()`？
2. 購物車數量這種「同步狀態」，用 `BehaviorSubject` 還是 `Subject`？用 Signal 可以嗎？
3. Signal 在 template 讀值，`{{ count }}` 跟 `{{ count() }}` 哪個對？
4. 表單錯誤訊息為什麼要判斷 `invalid && touched`，只判斷 `invalid` 會怎樣？
5. Angular 部署到 Firebase 後，首頁正常、但**重新整理子頁面就 404**，是哪個設定沒做對？

<!--
最後一輪快問快答，範圍是後三站。第五題是真實部署後最常見的災情，答案就藏在剛剛的部署頁裡。
-->

---
layout: default
---

# 快問快答 ④ — 參考解答

1. 讓外部**只能訂閱、不能直接 `next()`**，狀態變更集中在 Service 方法內，可控又好除錯（Ch45）
2. `BehaviorSubject`（新訂閱者需要立刻拿到目前數量）；可以，同步狀態正是 **Signal 的主場**，寫法更簡潔（Ch45, Ch47）
3. `{{ count() }}` — Signal 讀值必須以函式呼叫形式（Ch47)
4. 表單一載入所有必填欄位都是 `invalid`，會**還沒輸入就滿版錯誤訊息**；加上 `touched` 才會等使用者碰過欄位再提示（Ch52）
5. `firebase init hosting` 時 **SPA 模式沒選 Yes**——需要把所有路徑 rewrite 回 `index.html`，讓 Angular 路由接手（Ch56）

<!--
對答案。第一題的封裝觀念是業界 code review 會盯的點。第二題順便複習了 Signal 跟 Observable 的分工：同步狀態 Signal 更簡潔，非同步仍用 Observable。第三題的小括號是 Signals 最容易犯的語法錯誤。第四題的 touched 判斷直接影響使用者體驗。第五題記住關鍵字 SPA rewrite，以後換任何靜態主機部署（Netlify、Vercel、nginx）都是同一個設定。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 全課程易錯重點
# Top 10

<!--
最後我們把 56 章裡所有「注意」、「警告」的提醒，濃縮成十條最高頻的易錯重點。這十條就是大家寫專案時的除錯 checklist，建議直接抄進自己的筆記。
-->

---
layout: default
---

# 易錯重點 Top 10（前五）

| # | 易錯點 | 正確作法 | 章節 |
| --- | --- | --- | --- |
| 1 | `ngModel` 報錯 Can't bind | 元件 `imports` 加 `FormsModule` | Ch22 |
| 2 | Pipe（date／json）沒作用 | 元件 `imports` 加 `CommonModule` | Ch36–37 |
| 3 | `http.get()` 沒反應 | Observable 惰性 — 要 `subscribe()`；且 `app.config.ts` 要有 `provideHttpClient()` | Ch29 |
| 4 | mat-datepicker 壞掉 | `providers` 加 `provideNativeDateAdapter()` | Ch35 |
| 5 | 分頁器不動 | `ngAfterViewInit` 裡 `dataSource.paginator = this.paginator` | Ch33 |

<!--
前五條全部跟「設定漏掉」有關,共同的除錯心法是:元件報錯先看 imports 陣列、注入報錯先看 providers。

第一條 FormsModule 是出場率之王,只要畫面上有 ngModel 就要想到它。第二條 CommonModule 管的是 pipe 們。第三條有兩層:全域要註冊 provideHttpClient,呼叫端要 subscribe。第四、五條是 Material 的兩大定番,前面快問快答已經考過,再看到第三次應該忘不掉了。
-->

---
layout: default
---

# 易錯重點 Top 10（後五）

| # | 易錯點 | 正確作法 | 章節 |
| --- | --- | --- | --- |
| 6 | 訂閱忘記退訂 → 記憶體洩漏 | `ngOnDestroy` 呼叫 `unsubscribe()`，或改用 `async` pipe | Ch45, 54 |
| 7 | 過濾／搜尋越搜越少 | 永遠從**完整原始陣列**重新 `filter`，不要改到資料來源 | Ch38 |
| 8 | `localStorage` 存物件變 `[object Object]` | 進 `JSON.stringify`、出 `JSON.parse` | Ch25 |
| 9 | `getMonth()` 少一個月 | 月份從 **0** 開始，顯示時 `+1` 或交給 `DatePipe` | Ch18, 36 |
| 10 | 樣式寫了沒生效 | CSS **後蓋前** — 檢查是否被後面的規則（或更晚載入的檔案）覆蓋 | Ch10, 12 |

<div class="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 把這十條抄進筆記。實務上八成的「程式不會動」都落在這張清單裡。
</div>

<!--
後五條偏邏輯與觀念。第六條是資源管理的鐵律,訂閱與退訂成對出現,template 裡能用 async pipe 就用,它自動處理退訂。第七條的原則是「原始資料不可變,顯示資料用算的」,ch57 綜合練習整個 applyFilters 設計就是在示範這件事。第八條跟第九條是 JavaScript 語言層面的歷史包袱,記下來就好。第十條回到 CSS 最初的觀念——後蓋前,樣式沒生效時打開 DevTools 看是誰蓋了誰。

這十條清單的價值在於:它們都不是「不會寫」的問題,而是「忘記了」的問題,考前掃一遍,實作時卡住掃一遍,就能省下大量除錯時間。
-->

---
layout: default
---

# 總複習收尾 — 你已經走完的路

<div class="grid grid-cols-3 gap-4 mt-4">
  <div class="p-4 rounded-lg text-left" style="border: 2px solid #5eada0; background: #f0faf9;">
    <div style="color: #1a5c5c; font-weight: 900; font-size: 1.1rem;">🏗️ 基礎工程</div>
    <div class="text-sm mt-2" style="color: #4a7c7c;">環境建置・HTML/CSS・TypeScript — 你能從零刻出有邏輯的畫面</div>
  </div>
  <div class="p-4 rounded-lg text-left" style="border: 2px solid #5eada0; background: #f0faf9;">
    <div style="color: #1a5c5c; font-weight: 900; font-size: 1.1rem;">⚙️ Angular 開發</div>
    <div class="text-sm mt-2" style="color: #4a7c7c;">元件・繫結・路由・API・Material — 你能組出完整功能的系統</div>
  </div>
  <div class="p-4 rounded-lg text-left" style="border: 2px solid #5eada0; background: #f0faf9;">
    <div style="color: #1a5c5c; font-weight: 900; font-size: 1.1rem;">🚀 進階與上線</div>
    <div class="text-sm mt-2" style="color: #4a7c7c;">RxJS・Signals・表單驗證・RWD・部署 — 你的作品已經可以見人</div>
  </div>
</div>

**接下來的建議**

1. 回頭把 **綜合練習 Ch1–31**（四張規格書）與 **綜合練習 Ch33–40**（員工管理系統）不看解答再做一次
2. 快問快答有答錯的站，回到對應章節重讀
3. 用學過的技術做一個**自己的題目**，部署到 Firebase，放進履歷

<!--
最後一張投影片,幫大家把成就感具象化。左邊到右邊就是這門課的三個大階段:基礎工程、Angular 開發、進階與上線,每一塊你都有實際動手做過,不是只有聽過。

接下來的三個建議,按重要性排序。第一,兩個綜合練習是最好的檢測工具,不看解答能independently做完,才算真的會了。第二,今天快問快答答錯的題目就是你個人化的複習清單,別浪費這個訊號。第三,也是最重要的:找一個自己有感的題目——記帳、待辦、追劇清單都好——用課程學過的技術做出來、部署上線,那個網址就是你求職時最有說服力的作品。

恭喜大家完成整套課程,我們有緣再會。
-->

---
layout: end
---

# 課程結束
### 56 章、九大階段、一條從零到上線的完整路徑 — 總複習完成！

<!--
總複習到這裡結束。這一章沒有教新東西,但它幫大家把 56 章的知識收攏成一張可以隨時翻閱的地圖:九站速記、四輪快問快答、十條易錯清單。之後不管是考試、面試還是開發卡關,都可以回到這一章找到對應的章節線索。辛苦大家了!
-->
