---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 圓餅圖
routeAlias: ch41
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

---
layout: default
---

# Outline

- **第一部分：Chart.js 簡介與圖表類型**
- **第二部分：安裝 Chart.js**
- **第三部分：建立圓餅圖（HTML 與 TypeScript）**
- **第四部分：資料結構說明（labels、datasets）**
- **第五部分：圖表選項說明（hoverOffset、type）**
- **第六部分：其他圖表類型展示**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第一部分
## Chart.js 簡介與圖表類型

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第二部分
## 安裝 Chart.js

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第三部分
## 建立圓餅圖

---

# 建立圓餅圖 — HTML 範本

在目標元件的 HTML 範本中，加入一個 `<canvas>` 標籤作為圖表的繪製區域：

```html
<canvas id="chart"></canvas>
```

- `id="chart"` 用於在 TypeScript 中透過 DOM 取得該元素
- Chart.js 以 `<canvas>` 作為繪圖表面，不使用其他 HTML 元素

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第四部分
## 資料結構說明

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第五部分
## 圖表選項說明

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

---

# hoverOffset 效果示意

`hoverOffset` 設為正整數時，滑鼠移至某個區塊，該區塊會向圓心外側偏移對應像素，提升可讀性。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第六部分
## 完整實作總覽

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

---
layout: end
---

# 結束
