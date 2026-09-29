---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 圓餅圖
routeAlias: ch42
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
    圓餅圖
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「以 Chart.js 繪製互動式圓餅圖與各類圖表」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來學怎麼在 Angular 裡畫圖表，特別是大家很常看到的圓餅圖。

想像一下記帳 App，要是把一整個月的支出都用文字列出來，餐費多少、交通費多少、房租多少，其實不太直覺，但如果換成一個圓餅圖，一眼就能看出哪個項目佔的比例最大。這就是圖表的價值——把數字轉成視覺化的資訊。我們會使用一套很流行的圖表函式庫叫 Chart.js。

學完這一章，大家會知道怎麼安裝 Chart.js、怎麼準備資料、怎麼畫出一個圓餅圖，也會認識幾種其他常見的圖表類型。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Chart.js 簡介與圖表類型

<!--
我們先從認識 Chart.js 這個函式庫開始，看看它是什麼、能幫我們畫出哪些類型的圖表。
-->

---

# Chart.js 簡介

Chart.js 是一套基於 HTML5 `<canvas>` 的開源圖表函式庫，可在 Angular 專案中直接引用。

| 圖表類型 | 說明 |
| --- | --- |
| 長條圖（Bar chart） | 比較各類別數值大小 |
| 直線圖（Line chart） | 呈現數值的趨勢變化 |
| 圓餅圖（Pie chart） | 顯示各部分佔整體的比例 |
| 環狀圖（Doughnut chart） | 圓餅圖的中空變形版本 |
| 泡泡圖（Bubble chart） | 以座標與泡泡大小呈現三維資料 |
| 混合圖（Mixed chart） | 結合兩種以上圖表類型 |

<!--
Chart.js 是一套基於瀏覽器原生 canvas 畫布的開源圖表函式庫，不需要依賴其他重量級套件，安裝一個套件就能畫出各種常見圖表。

大家可以把它想成一個「畫圖工具箱」，我們只要準備好資料，告訴它要畫哪一種類型的圖，它就會自動幫我們算比例、上色、畫出來。這張表格列出的六種類型大家先有個印象就好，今天會以圓餅圖為主，其他類型結尾會再帶大家看一下。

業界實務上，這種圖表函式庫在儀表板（dashboard）、報表系統裡非常常見，幾乎是做資料視覺化的標配工具之一。
-->

---

# 各圖表類型示意

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**長條圖（Bar Chart）**

<img src="/images/41-pie-chart/bar-chart-monthly-sales.png" class="rounded shadow-md max-h-80 max-w-full" />

</div>
<div>

**直線圖（Line Chart）**

<img src="/images/41-pie-chart/line-chart-monthly-sales.png" class="rounded shadow-md max-h-80 max-w-full" />

</div>
</div>

<!--
這張投影片給大家看兩種常見圖表的實際樣子。長條圖適合拿來比較不同類別之間的數值大小，比如比較每個月的業績；直線圖則適合看趨勢變化，比如看業績是逐月上升還是下降。

大家看圖的時候可以想：如果我手上有這種資料，我會想用哪一種圖表來呈現？這其實就是選擇圖表類型的思考方式——先看資料的性質，再決定用哪種視覺呈現最清楚。
-->

---

# 各圖表類型示意（續）

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**圓餅圖（Pie / Doughnut Chart）**

<img src="/images/41-pie-chart/doughnut-chart-expense-breakdown.png" class="rounded shadow-md max-h-80 max-w-full" />

</div>
<div>

**泡泡圖（Bubble Chart）**

<img src="/images/41-pie-chart/bubble-chart-team-coordinates.png" class="rounded shadow-md max-h-80 max-w-full" />

</div>
</div>

<!--
這張接續前一張，補上圓餅圖／環狀圖跟泡泡圖的示意。大家可以特別看一下圓餅圖跟環狀圖的差別，環狀圖其實就是圓餅圖中間挖空，兩者用途類似，都是呈現各部分佔整體的比例，只是視覺風格不同。

今天我們的重點會放在圓餅圖，等一下會實際帶大家從零開始畫出一個。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝 Chart.js

<!--
認識完 Chart.js 能做什麼之後，我們進入第二部分，實際把這個套件裝進我們的 Angular 專案。
-->

---

# 安裝 Chart.js

在終端機切換至 Angular 專案的根目錄，執行以下指令安裝 Chart.js：

```bash
npm install chart.js
```

安裝完成後，即可在元件的 TypeScript 檔案中引入：

```typescript
import Chart from 'chart.js/auto';
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 使用 <code>chart.js/auto</code> 路徑會自動載入所有圖表模組，適合快速開發；正式專案建議只引入需要的模組以縮減打包體積。
</div>

<!--
安裝的方式跟我們裝其他套件一樣，用 npm install chart.js 就好，這個大家應該很熟悉了。裝完之後，我們在元件的 TypeScript 檔案裡用 import Chart from 'chart.js/auto' 把它引進來。

⚠️ 這裡提醒大家注意 chart.js/auto 這個路徑，auto 的意思是自動載入 Chart.js 裡所有的圖表模組，包含長條圖、直線圖、圓餅圖等等全部都會打包進來，這樣寫最方便、最不容易出錯，適合我們現在學習階段使用；但如果是正式上線的專案，因為要在意打包後的檔案大小，通常會改成只引入真正用到的模組。

裝完之後，我們就可以開始準備 HTML 跟資料，來畫出第一個圖表了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 建立圓餅圖

<!--
套件裝好了，接下來進入今天的重頭戲：實際動手建立一個圓餅圖，我們會分成 HTML 跟 TypeScript 兩部分來看。
-->

---

# 建立圓餅圖 — HTML 範本

在目標元件的 HTML 範本中，加入一個 `<canvas>` 標籤作為圖表的繪製區域，並用一個限制寬高的容器包住：

```html
<div style="width: 300px; height: 300px;">
  <canvas id="chart"></canvas>
</div>
```

- `id="chart"` 用於在 TypeScript 中透過 DOM 取得該元素
- Chart.js 以 `<canvas>` 作為繪圖表面，不使用其他 HTML 元素
- Chart.js 預設 `responsive: true`，畫布會撐滿外層容器 → 外層沒限制寬高時圖表會過大

<!--
我們先看 HTML 的部分，其實非常單純，只需要一個 canvas 標籤，可以把它想成一塊空白畫布，等一下 Chart.js 會直接在這塊畫布上把圖表畫出來。

這裡的重點是 id="chart"，我們等一下會在 TypeScript 裡用這個 id 找到這個 canvas 元素，所以這個 id 一定要記得對應好，兩邊名稱要一致。

⚠️ 提醒大家，Chart.js 只認 canvas 這個元素，不能用 div 或其他標籤取代，這是它繪圖機制的基礎。

⚠️ 另一個新手常踩的坑：Chart.js 預設是 responsive，畫布會自動撐滿父層容器的大小。如果 canvas 外面沒有包一層限制寬高的 div，圖表在畫面上可能會變得非常巨大，甚至超出可視範圍。這裡我們用一個 300x300 的 div 包住 canvas，把圖表大小限制住。
-->

---

# 建立圓餅圖 — TypeScript（一）

在元件的 TypeScript 檔案中，引入 Chart.js，並於 `ngAfterViewInit()` 中取得 canvas 元素：

```typescript
import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-expense-pie-chart',
  templateUrl: './expense-pie-chart.html',
})
export class ExpensePieChart implements AfterViewInit {
  ngAfterViewInit() {
    // 取得 canvas 元素
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
```

<!--
我們帶大家看一下這段程式碼的關鍵部分。元件實作 AfterViewInit 介面，把畫圖邏輯放進 ngAfterViewInit，因為 canvas 元素要等畫面渲染完才抓得到，這點跟後面完整解答的寫法是一致的。

第一步用 document.getElementById 取得剛剛那塊 canvas 畫布，準備好之後，下一頁接著設定圖表資料。
-->

---

# 建立圓餅圖 — TypeScript（二）

接續上一頁，設定圖表資料：

```typescript
    // 設定圖表資料
    const data = {
      // 各區塊的標籤
      labels: ['餐費', '交通費', '租金'],
      datasets: [
        {
          label: '支出比',
          // 各標籤對應的數值（系統自動換算為百分比）
          data: [200, 3000, 9000],
```

<!--
接著準備一個 data 物件，這個物件就是圖表要畫的內容，裡面有 labels 陣列，決定圖表要分成幾個區塊、每個區塊叫什麼名字。

這裡我們用記帳的例子：餐費、交通費、租金三個分類，對應的數值分別是 200、3000、9000。大家注意這個 data 陣列的順序要跟 labels 的順序對應，第一個數值對應第一個標籤，以此類推。

這段程式碼還沒結束，資料物件還有顏色設定跟建立圖表的呼叫，我們下一頁接著看。
-->

---

# 建立圓餅圖 — TypeScript（三）

```typescript
          // 各區塊的填充顏色（對應 labels 順序）
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          // 滑鼠懸停時區塊的偏移距離（px）
          hoverOffset: 4,
        },
      ],
    };

    // 建立圖表實例
    new Chart(ctx, {
      type: 'pie',   // 'pie' 為圓餅圖；'doughnut' 為環狀圖
      data: data,
    });
  }
}
```

<!--
接續上一頁，我們補上 backgroundColor，這是每個區塊的填色，順序一樣要對應 labels；hoverOffset 則是滑鼠移過去的時候，那個區塊會往外彈開多少像素，讓使用者更容易看清楚自己指到哪個區塊。

最後一步就是呼叫 new Chart，把剛剛拿到的 canvas 元素跟準備好的 data 物件傳進去，並且指定 type 為 'pie'，接著收尾 ngAfterViewInit 方法跟整個元件類別。

⚠️ 這裡容易出錯的地方是：labels、data、backgroundColor 這三個陣列的長度一定要一致，如果數量對不上，圖表可能會顯示錯誤或缺色。

執行完這段程式碼之後，畫面上就會出現一個圓餅圖，三個區塊分別代表餐費、交通費、租金，比例會依照數值大小自動計算。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 資料結構說明

<!--
圓餅圖畫出來了，接下來我們花一點時間，把剛剛用到的資料結構拆開來仔細講清楚。
-->

---

# 資料結構：labels 與 datasets

| 屬性 | 型別 | 說明 |
| --- | --- | --- |
| `labels` | `string[]` | 各區塊的名稱，決定區塊數量 |
| `datasets[].label` | `string` | 圖例中顯示的資料集名稱 |
| `datasets[].data` | `number[]` | 各標籤對應的數值，長度須與 `labels` 一致 |
| `datasets[].backgroundColor` | `string[]` | 各區塊的填充顏色，長度須與 `labels` 一致 |
| `datasets[].hoverOffset` | `number` | 滑鼠懸停時區塊向外偏移的像素距離 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>data</code> 陣列中的數值無需手動換算為百分比，Chart.js 會依各值的比例自動計算並顯示於圖表中。
</div>

<!--
這張表格把 data 物件裡每個屬性的角色講清楚。labels 決定圖表要切成幾塊；datasets 底下的 label 是圖例上顯示的名稱；data 是實際數值；backgroundColor 是顏色；hoverOffset 是滑鼠懸停的偏移效果。

大家可以把這個結構想成填問卷：labels 是問卷的題目選項，data 是每個選項收到的票數，Chart.js 幫我們把票數自動換算成圓餅圖上的角度跟比例，我們完全不用自己手算百分比。

⚠️ 提醒大家，data 跟 backgroundColor 這兩個陣列的長度一定要跟 labels 一致，不然對應就會亂掉。
-->

---

# 資料結構範例

```typescript
const data = {
  labels: ['餐費', '交通費', '租金'],
  datasets: [
    {
      label: '支出比',
      data: [200, 3000, 9000],
      backgroundColor: [
        'rgb(255, 99, 132)',   // 餐費 → 紅色
        'rgb(54, 162, 235)',   // 交通費 → 藍色
        'rgb(255, 205, 86)',   // 租金 → 黃色
      ],
      hoverOffset: 4,
    },
  ],
};
```

- `labels` 有 3 個項目 → `data` 與 `backgroundColor` 也須各有 3 個元素
- 數值 `200 + 3000 + 9000 = 12200`，各區塊佔比由 Chart.js 自動計算

<!--
我們用同一份記帳資料再走一次，讓大家確認自己理解對應關係：三個 labels，對應三個 data 數值，也對應三個顏色，三個陣列的元素數量都是 3，缺一不可。

大家可以自己心算一下：總和是 12200，餐費佔的比例大概是多少？這樣的心算練習可以幫助大家更直覺地理解 Chart.js 幫我們做的自動換算是怎麼一回事。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 圖表選項說明

<!--
資料結構講完了，接下來我們看幾個常用的圖表選項，像是圖表類型跟滑鼠互動效果。
-->

---

# 圖表類型與選項

| 屬性 | 可選值 | 說明 |
| --- | --- | --- |
| `type` | `'pie'` | 標準圓餅圖，各區塊填滿整個圓形 |
| `type` | `'doughnut'` | 環狀圖，中央為空心圓 |
| `hoverOffset` | `number`（如 `4`） | 滑鼠懸停時，對應區塊向外偏移的距離（px），方便使用者辨識所在區塊 |

**建立圖表實例語法**

```typescript
const chart = new Chart(ctx, {
  type: 'pie',      // 或 'doughnut'
  data: data,
});
```

<!--
這張投影片整理了兩個常用的圖表選項。type 決定圖表的整體形狀，'pie' 是實心的圓餅圖，'doughnut' 是中間挖空的環狀圖，兩者要切換非常簡單，就只是改一個字串而已。

hoverOffset 則是滑鼠互動的細節，設定一個像素數值之後，滑鼠移到某個區塊時，那塊會稍微彈出來，方便使用者確認自己指到的是哪個項目，這在區塊比較多、顏色相近的時候特別有用。

業界實務上，這種小小的互動細節其實蠻重要的，能提升使用者體驗，讓圖表不只是靜態圖片。
-->

---

# hoverOffset 效果示意

`hoverOffset` 設為正整數時，滑鼠移至某個區塊，該區塊會向圓心外側偏移對應像素，提升可讀性。

<!--
這張投影片文字比較少，我們可以直接帶大家實際操作一次，把滑鼠移到圓餅圖不同區塊上，讓大家親眼看到 hoverOffset 的效果——區塊會往外彈一點點，像是被輕輕推出去一樣。

大家可以想像這個效果就像百貨公司電梯前的樓層指示燈，滑鼠移到哪一層，那個按鈕就會亮起來、凸出來，讓人一眼確認自己選的是哪一層。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 完整實作總覽

<!--
最後一部分，我們把今天學的所有步驟整理成一張總表，幫大家做個總複習，也順便安排一個練習讓大家動手做。
-->

---

# 圓餅圖完整實作步驟

| 步驟 | 操作位置 | 內容 |
| --- | --- | --- |
| 1 | 終端機 | 執行 `npm install chart.js` |
| 2 | `component.html` | 加入 `<canvas id="chart"></canvas>` |
| 3 | `component.ts` | 匯入 `import Chart from 'chart.js/auto'` |
| 4 | `component.ts` | 以 `document.getElementById('chart')` 取得 canvas |
| 5 | `component.ts` | 定義 `data` 物件（labels、datasets、backgroundColor） |
| 6 | `component.ts` | 呼叫 `new Chart(ctx, { type: 'pie', data: data })` |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 建議將 <code>new Chart(...)</code> 的呼叫放在 <code>ngAfterViewInit()</code> 生命週期鉤子中，確保 DOM 元素已完成初始化後再進行繪製。
</div>

<!--
我們把整個流程從頭到尾整理成六個步驟，從安裝套件、寫 HTML、匯入 Chart.js、抓 canvas 元素、準備資料，到最後呼叫 new Chart 畫出圖表，大家可以對照這張表確認自己每一步都有做到。

⚠️ 這裡有一個很重要的提醒：new Chart 這個呼叫，建議放在 ngAfterViewInit 這個生命週期鉤子裡面，而不是 ngOnInit。原因是 canvas 元素必須等畫面（DOM）真正渲染出來之後才抓得到，如果太早呼叫，document.getElementById 會抓不到元素，回傳 null，畫圖就會失敗。

大家可以把 ngAfterViewInit 想成「等房間裝潢完工才進去擺家具」，順序不能顛倒。
-->

---
layout: default
---

# 練習：問卷統計圓餅圖
### 任務說明

問卷結束後，前台要能看「觀看統計」：每一題單選／多選題畫一張圓餅圖，文字題列出所有回答。

呼叫 `GET /api/surveys/{id}/statistics`，回傳（放在 `data` 裡）：

```json
{ "surveyId": 2, "title": "午餐偏好調查", "totalResponses": 4,
  "questions": [
    { "questionId": 1, "title": "你平常午餐吃什麼？", "type": "SINGLE",
      "options": [ { "label": "便當", "count": 2, "percent": 50 }, ... ], "texts": [] },
    { "questionId": 3, "title": "想給餐廳的建議", "type": "TEXT", "options": [], "texts": ["希望有更多素食"] } ] }
```

**要求：**
1. 建立 `pie-chart` 子元件（用 `@Input` 接收 `labels`、`values`，在 `ngAfterViewInit` 畫圖）
2. 建立 `survey-stats` 頁面（路由 `/surveys/:id/stats`）：顯示標題、作答人數
3. 單選／多選題：每一題畫一張圓餅圖，圖表下方列出「選項：票數（百分比）」
4. 文字題：列出所有回答；沒有回答時顯示「沒有回答」

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這個練習把 Chart.js 接上真的統計 API。跟範例最大的差別有兩個：

第一，資料是非同步回來的，而且有很多題，每一題一張圖。前面範例用 document.getElementById 抓 canvas，只適用「頁面上只有一張圖」的情況；現在圖表數量是動態的，所以我們把「畫一張圓餅圖」包成一個子元件，每個子元件有自己的 canvas，用 ViewChild 抓自己的 canvas，就不會互相干擾。

第二，資料要等 API 回來才有。所以父元件用 @if 判斷資料到了才建立子元件，這樣子元件的 ngAfterViewInit 執行的時候，labels 跟 values 一定已經有值。

統計的百分比是後端算好的，前端只負責顯示，不要自己再算一次。
-->

---
layout: default
---

# 練習：解題提示

1. 子元件的 canvas 用範本參考變數：`<canvas #canvas>`，TypeScript 用 `@ViewChild('canvas')` 取得
2. `new Chart(this.canvas.nativeElement, { type: 'pie', data: { labels, datasets: [{ data: values }] } })`
3. 元件銷毀時要 `chart.destroy()`，避免離開頁面後圖表殘留（`ngOnDestroy`）
4. 父元件在 `subscribe` 裡，**一次**把每一題整理成 `{ title, labels, values }` 存進 signal，不要在樣板裡用方法每次產生新陣列
5. 子元件要放在 `@if (stats(); as s)` 裡面，資料到了才建立

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 如果在樣板裡寫 <code>[labels]="q.options.map(...)"</code>，每次變更偵測都會產生新陣列，開發模式會噴 <code>NG0100</code> 錯誤。整理好資料再存起來，是這類錯誤的標準解法。
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
提示 1 到 3 是圖表元件本身：canvas 用 #canvas 這種範本參考變數標記，ViewChild 才抓得到；用 nativeElement 取得真正的 canvas 元素；離開頁面要 destroy，否則舊圖表的資源沒釋放。

提示 4 是這個練習最容易踩的坑。Angular 開發模式會在每次變更偵測後，再檢查一次「綁定的值有沒有變」。如果在樣板裡直接呼叫 map，每次都會回傳一個新的陣列，內容雖然一樣，但是參考不同，Angular 就認為值變了，報 NG0100 ExpressionChangedAfterItHasBeenChecked。解法是在 subscribe 裡先整理好、存起來，樣板只讀取現成的資料。
-->

---
layout: default
---

# 練習：完整解答（圓餅圖子元件）

```typescript
// pie-chart.ts
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  template: `<div style="max-width: 320px"><canvas #canvas></canvas></div>`,
})
export class PieChart implements AfterViewInit, OnDestroy {
  @Input() labels: string[] = [];
  @Input() values: number[] = [];
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  ngAfterViewInit() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'pie',
      data: { labels: this.labels, datasets: [{ data: this.values }] },
      options: { plugins: { legend: { position: 'bottom' } } },
    });
  }

  ngOnDestroy() { this.chart?.destroy(); }
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
子元件只做一件事：拿到 labels 跟 values，畫一張圓餅圖。

ViewChild 的 canvas 在 ngAfterViewInit 之後才有值，所以畫圖一定要放在這個生命週期，這是第 20 章教的，也是本章前面反覆提醒的重點。

legend 的 position 設成 bottom，讓圖例放在圖表下方，版面比較整齊。
-->

---
layout: default
---

# 練習：完整解答（統計頁）

```typescript
// survey-stats.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from './survey-service';
import { OptionStat, Statistics } from './models';
import { PieChart } from './pie-chart';

interface QuestionChart {
  title: string; type: string; labels: string[]; values: number[];
  options: OptionStat[]; texts: string[];
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
父元件在 subscribe 裡一次整理好每一題要畫的資料：labels、values 是給圓餅圖用的；options 是給下面「選項：票數」文字用的。
-->

---
layout: default
---

# 練習：完整解答（統計頁）（續）

```typescript
// ... 接上一頁

@Component({
  selector: 'app-survey-stats',
  imports: [PieChart],
  templateUrl: './survey-stats.html',
})
export class SurveyStats implements OnInit {
  private api = inject(SurveyService);
  private route = inject(ActivatedRoute);

  stats = signal<Statistics | null>(null);
  charts = signal<QuestionChart[]>([]);

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
（接續上一頁。）
-->

---
layout: default
---

# 練習：完整解答（統計頁）（續）

```typescript
// ... 接上一頁

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.statistics(id).subscribe(s => {
      this.stats.set(s);
      this.charts.set(s.questions.map(q => ({
        title: q.title, type: q.type, options: q.options, texts: q.texts,
        labels: q.options.map(o => o.label), values: q.options.map(o => o.count),
      })));
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
stats 和 charts 都存在 signal 裡，因為它們是 API 回來才有的資料。
-->

---
layout: default
---

# 練習：完整解答（統計頁 HTML 與 Service）

```html
<!-- survey-stats.html -->
@if (stats(); as s) {
  <h2>{{ s.title }}：統計</h2>
  <p>共 {{ s.totalResponses }} 份作答</p>
  @for (q of charts(); track $index; let i = $index) {
    <h3>{{ i + 1 }}. {{ q.title }}</h3>
    @if (q.type === 'TEXT') {
      @for (t of q.texts; track $index) { <div>• {{ t }}</div> } @empty { <span>沒有回答</span> }
    } @else {
      <app-pie-chart [labels]="q.labels" [values]="q.values" />
      @for (o of q.options; track o.label) { <div>{{ o.label }}：{{ o.count }} 票（{{ o.percent }}%）</div> }
    }
  }
}
```

```typescript
// survey-service.ts（新增）
statistics(id: number) {
  return this.http.get<AppResponse<Statistics>>(`${this.api}/surveys/${id}/statistics`)
    .pipe(map(res => res.data));
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
樣板的邏輯：文字題用 @for 列出所有回答，沒有回答用 @empty；選擇題就畫一張圓餅圖，下面再用文字列出票數與百分比，這是需求文件的要求。
-->

---
layout: default
---

# 練習：完整解答（統計頁 HTML 與 Service）（續）

```typescript
// models.ts（新增）
export interface OptionStat { label: string; count: number; percent: number; }
export interface QuestionStat {
  questionId: number; title: string; type: 'SINGLE' | 'MULTI' | 'TEXT';
  options: OptionStat[]; texts: string[];
}
export interface Statistics { surveyId: number; title: string; totalResponses: number; questions: QuestionStat[]; }
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>成功標準：</b> 開啟 <code>/surveys/2/stats</code>，第 1 題是三個選項的圓餅圖，第 3 題（文字題）列出文字回答；尚未開始的問卷（例如 4 號）後端會回傳錯誤，畫面不應該出現空白圖表。
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
最後一個驗收條件是一個真實情況：後端規定「尚未開始」的問卷不能看統計，會回傳錯誤。前端此時 stats 一直是 null，@if 不成立，所以整頁什麼都不畫。更完整的做法，是在 subscribe 的 error 回呼跳出提示，第 43 章的對話框就是為這個準備的。
-->

---
layout: end
---

# 結束

<!--
今天我們從認識 Chart.js 開始，一路學到安裝套件、準備資料、畫出圓餅圖，也自己動手把問卷統計畫成圓餅圖。大家現在應該對圖表資料結構跟 Chart.js 的基本用法有清楚的概念了。

之後大家在做報表或儀表板功能時，都可以用今天學到的方式，把數字轉換成一眼就能看懂的視覺化圖表。
-->

