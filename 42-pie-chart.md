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

<img src="/images/41-pie-chart/bar-chart-monthly-sales.png" class="rounded shadow-md max-h-80" />

</div>
<div>

**直線圖（Line Chart）**

<img src="/images/41-pie-chart/line-chart-monthly-sales.png" class="rounded shadow-md max-h-80" />

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

<img src="/images/41-pie-chart/doughnut-chart-expense-breakdown.png" class="rounded shadow-md max-h-80" />

</div>
<div>

**泡泡圖（Bubble Chart）**

<img src="/images/41-pie-chart/bubble-chart-team-coordinates.png" class="rounded shadow-md max-h-80" />

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

在目標元件的 HTML 範本中，加入一個 `<canvas>` 標籤作為圖表的繪製區域：

```html
<canvas id="chart"></canvas>
```

- `id="chart"` 用於在 TypeScript 中透過 DOM 取得該元素
- Chart.js 以 `<canvas>` 作為繪圖表面，不使用其他 HTML 元素

<!--
我們先看 HTML 的部分，其實非常單純，只需要一個 canvas 標籤，可以把它想成一塊空白畫布，等一下 Chart.js 會直接在這塊畫布上把圖表畫出來。

這裡的重點是 id="chart"，我們等一下會在 TypeScript 裡用這個 id 找到這個 canvas 元素，所以這個 id 一定要記得對應好，兩邊名稱要一致。

⚠️ 提醒大家，Chart.js 只認 canvas 這個元素，不能用 div 或其他標籤取代，這是它繪圖機制的基礎。
-->

---

# 建立圓餅圖 — TypeScript（一）

在元件的 TypeScript 檔案中，引入 Chart.js 並取得 canvas 元素，再設定圖表資料：

```typescript
import Chart from 'chart.js/auto';

// 取得 canvas 元素
const ctx = document.getElementById('chart') as HTMLCanvasElement;

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
我們帶大家看一下這段程式碼的關鍵部分。第一步用 document.getElementById 取得剛剛那塊 canvas 畫布；接著準備一個 data 物件，這個物件就是圖表要畫的內容，裡面有 labels 陣列，決定圖表要分成幾個區塊、每個區塊叫什麼名字。

這裡我們用記帳的例子：餐費、交通費、租金三個分類，對應的數值分別是 200、3000、9000。大家注意這個 data 陣列的順序要跟 labels 的順序對應，第一個數值對應第一個標籤，以此類推。

這段程式碼還沒結束，資料物件還有顏色設定，我們下一頁接著看。
-->

---

# 建立圓餅圖 — TypeScript（二）

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
const chart = new Chart(ctx, {
  type: 'pie',   // 'pie' 為圓餅圖；'doughnut' 為環狀圖
  data: data,
});
```

<!--
接續上一頁，我們補上 backgroundColor，這是每個區塊的填色，順序一樣要對應 labels；hoverOffset 則是滑鼠移過去的時候，那個區塊會往外彈開多少像素，讓使用者更容易看清楚自己指到哪個區塊。

最後一步就是呼叫 new Chart，把剛剛拿到的 canvas 元素跟準備好的 data 物件傳進去，並且指定 type 為 'pie'。

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

# 練習：繪製支出圓餅圖
### 任務說明

建立一個 Angular 元件，使用 Chart.js 繪製個人月支出圓餅圖，包含以下三個分類：

- 餐費：2,000 元
- 交通費：3,000 元
- 租金：9,000 元

**要求：**
1. 安裝 Chart.js 套件
2. 在 HTML 中加入 `<canvas id="chart"></canvas>`
3. 在 TypeScript 中定義資料並建立圓餅圖（type: `'pie'`）
4. 自訂三個區塊的 `backgroundColor`

<!--
好，接下來輪到大家自己動手了。我們剛剛已經一起做過一次幾乎一模一樣的範例，這次請大家先不要看提示，自己把步驟走一遍，看看能不能獨立做出一個圓餅圖。

大家可以先想想：我需要幾個 labels？每個 label 對應的數值是多少？資料準備好之後，剩下的步驟其實跟我們剛剛示範的流程一模一樣。如果卡住了，別擔心，等一下我們會分兩頁給大家解題提示。
-->

---

# 練習：繪製支出圓餅圖
### 解題提示（一）

1. 終端機執行 `npm install chart.js`
2. HTML 中加入 `<canvas id="chart"></canvas>`
3. TypeScript 中匯入 Chart.js 並取得 canvas 元素：

```typescript
import Chart from 'chart.js/auto';

ngAfterViewInit() {
  const ctx = document.getElementById('chart') as HTMLCanvasElement;
```

<!--
這是第一部分的提示：先確認套件裝好、canvas 標籤加上去，接著在元件裡匯入 Chart.js，並且記得把取得 canvas 元素的程式碼放在 ngAfterViewInit 裡面，這一點呼應我們前面特別提醒過的地方。

大家做到這邊，先確認 ctx 有正確抓到 canvas 元素，沒問題的話我們再往下看資料要怎麼定義。
-->

---

# 練習：繪製支出圓餅圖
### 解題提示（二）

4. 建立圖表並傳入資料：

```typescript
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['餐費', '交通費', '租金'],
      datasets: [{
        data: [2000, 3000, 9000],
        backgroundColor: ['rgb(255,99,132)', 'rgb(54,162,235)', 'rgb(255,205,86)'],
        hoverOffset: 4,
      }],
    },
  });
}
```

<!--
這是完整的解答：資料裡定義三個 labels、對應三個數值，加上自訂的 backgroundColor，最後呼叫 new Chart 並指定 type 為 'pie'，整個練習就完成了。

大家可以對照一下自己寫的版本，如果數字或顏色不同也沒關係，重點是資料結構跟呼叫方式要正確。做完之後，大家應該能感覺到——只要準備好 labels 跟 data，Chart.js 剩下的比例計算跟畫圖工作都幫我們處理好了，這就是使用現成函式庫的好處。
-->

---

# 完整解答 — HTML

`expense-pie-chart.component.html` 完整內容：

```html
<canvas id="chart"></canvas>
```

<!--
這三張投影片把完整的元件程式碼列出來，讓大家可以對照自己寫的內容逐行檢查，不省略任何一段。HTML 這邊很單純，就只有一個 canvas 標籤。
-->

---

# 完整解答 — TypeScript（一）

`expense-pie-chart.component.ts` 完整內容：

```typescript
import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-expense-pie-chart',
  standalone: true,
  templateUrl: './expense-pie-chart.component.html',
})
export class ExpensePieChartComponent implements AfterViewInit {
  ngAfterViewInit() {
    const ctx = document.getElementById('chart') as HTMLCanvasElement;
```

<!--
先看 import 跟 @Component 設定：Chart 從 chart.js/auto 匯入，元件實作 AfterViewInit 這個介面，把畫圖邏輯放進 ngAfterViewInit 裡，這是前面特別強調過的重點，canvas 一定要等畫面渲染完才抓得到。

這裡故意留著 ngAfterViewInit 的左大括號沒收尾，下一張投影片接著看資料跟 new Chart 呼叫。
-->

---

# 完整解答 — TypeScript（二）

```typescript
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['餐費', '交通費', '租金'],
        datasets: [
          {
            label: '月支出',
            data: [2000, 3000, 9000],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }
}
```

<!--
接續上一張還沒收尾的 ngAfterViewInit，這裡呼叫 new Chart，傳入剛剛抓到的 ctx，type 指定為 'pie'。data 裡三個 labels 對應三個支出分類，data 陣列是對應的金額，backgroundColor 是自訂的三種顏色，hoverOffset 讓滑鼠移過去時區塊往外彈開。

最後兩個右大括號，一個收尾 ngAfterViewInit 方法，一個收尾整個元件類別。大家可以拿這份完整程式碼對照自己專案裡的檔案，看看有沒有漏掉 import、忘記加 AfterViewInit 介面，或是把 new Chart 誤放到 ngOnInit 裡。
-->

---
layout: end
---

# 結束

<!--
今天我們從認識 Chart.js 開始，一路學到安裝套件、準備資料、畫出圓餅圖，也自己動手完成了一個記帳圓餅圖的練習。大家現在應該對圖表資料結構跟 Chart.js 的基本用法有清楚的概念了。

之後大家在做報表或儀表板功能時，都可以用今天學到的方式，把數字轉換成一眼就能看懂的視覺化圖表。
-->

