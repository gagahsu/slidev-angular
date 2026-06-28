---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 綜合練習 Ch1–Ch17
routeAlias: practice-ch17
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
---

<div class="flex flex-col justify-center items-center h-full" style="background: #ffffff;">
  <p style="color: #5eada0; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.2rem;">
    Angular Full-Stack Masterclass
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.5rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    綜合練習<br>Ch1 – Ch17
  </h1>
  <div style="height: 4px; width: 360px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「HTML、CSS、TypeScript 三位一體大挑戰」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
這份練習整合了 ch1 到 ch17 的所有重點：HTML 結構、CSS 樣式、TypeScript 型別、函式設計，以及 if / 陣列 / 迴圈的綜合應用。
六大題涵蓋不同難度，建議從頭到尾獨立完成，完成後再對照解答。
-->

---
layout: default
---

# 練習題清單

| 題號 | 主題 | 涵蓋章節 | 難度 |
| --- | --- | --- | --- |
| **Q1** | HTML 學生個人頁面 | Ch9 HTML | ⭐ |
| **Q2** | CSS 導覽列 + 卡片樣式 | Ch10–12 CSS | ⭐⭐ |
| **Q3** | TypeScript 型別宣告 | Ch13–15 Types & Variables | ⭐⭐ |
| **Q4** | 函式設計 | Ch16 Methods | ⭐⭐ |
| **Q5** | 邏輯綜合（陣列 + 迴圈 + if） | Ch17 Practice | ⭐⭐⭐ |
| **Q6** | Angular 元件模擬（Class + 方法） | Ch14–17 綜合 | ⭐⭐⭐ |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 建議先獨立作答，再看解答。每題後方附有解說說明。
</div>

<!--
一共六題，從 HTML 結構、CSS 排版，一路到 TypeScript 的型別、函式、邏輯與 Class，逐步加深。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q1 — HTML 學生個人頁面
# Ch9 HTML

<!--
第一題考 HTML 結構能力，看看你對常用標籤的掌握程度。
-->

---
layout: default
---

# Q1：任務說明

用 **純 HTML** 建立一個「學生個人頁面」，包含以下內容：

1. 用 `<h1>` 顯示姓名「王小明」
2. 用 `<table>` 呈現個人資料（學號、科系、年級）
3. 用 `<ul>` 列出三個興趣（打程式、看電影、打籃球）
4. 用 `<form>` 建立一個簡易聯絡表單，含：
   - 文字輸入框（placeholder：請輸入您的留言）
   - 下拉選單（選項：問題回報、課程建議、其他）
   - 送出按鈕

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⏱️ 建議時間：10 分鐘
</div>

<!--
這題考 h1、table（thead/tbody/tr/th/td）、ul/li、form（input/select/option/button），是 Ch9 的核心標籤組合。
-->

---
layout: default
---

# Q1：解答

```html
<h1>王小明</h1>

<table border="1">
  <thead>
    <tr><th>學號</th><th>科系</th><th>年級</th></tr>
  </thead>
  <tbody>
    <tr><td>B11234567</td><td>資訊工程</td><td>大二</td></tr>
  </tbody>
</table>

<ul>
  <li>打程式</li>
  <li>看電影</li>
  <li>打籃球</li>
</ul>

<form>
  <input type="text" placeholder="請輸入您的留言"><br><br>
  <select>
    <option>問題回報</option>
    <option>課程建議</option>
    <option>其他</option>
  </select><br><br>
  <button type="submit">送出</button>
</form>
```

<!--
重點：table 要有 thead/tbody 結構；select 配 option；form 內的 button type="submit" 才能送出表單。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q2 — CSS 導覽列 + 卡片樣式
# Ch10–12 CSS

<!--
第二題考 Flexbox、hover 效果、box-shadow，以及 position 定位的組合應用。
-->

---
layout: default
---

# Q2：任務說明

用 **HTML + CSS** 完成以下畫面：

**① 導覽列（Navbar）**
- 左側顯示品牌名稱「My App」
- 右側顯示三個連結：首頁、關於、聯絡
- 整列使用 Flexbox 排版（左右分開）
- 連結滑鼠移入時顏色變為 `#5eada0`

**② 資訊卡片**
- 白色背景、圓角（`border-radius: 12px`）、陰影
- 卡片內有標題與一段描述文字
- 滑鼠移入時卡片向上浮起（`translateY(-4px)`）並加深陰影

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⏱️ 建議時間：15 分鐘
</div>

<!--
這題綜合 Ch10 的 Flexbox + hover，以及 Ch11 的 box-shadow 和 CSS transition 動畫效果。
-->

---
layout: default
---

# Q2：解答 — HTML

```html
<nav class="navbar">
  <div class="brand">My App</div>
  <ul class="nav-links">
    <li><a href="#">首頁</a></li>
    <li><a href="#">關於</a></li>
    <li><a href="#">聯絡</a></li>
  </ul>
</nav>

<div class="card">
  <h3>課程介紹</h3>
  <p>這是一個 Angular 全端開發課程，從基礎到進階一次搞定。</p>
</div>
```

---
layout: default
---

# Q2：解答 — CSS

```css
/* 導覽列 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #1a5c5c;
}
.brand { color: white; font-weight: bold; font-size: 1.2rem; }
.nav-links { display: flex; list-style: none; gap: 20px; }
.nav-links a { color: white; text-decoration: none; transition: color 0.2s; }
.nav-links a:hover { color: #5eada0; }

/* 資訊卡片 */
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
```

<!--
Flexbox 的 justify-content: space-between 讓兩側自動撐開；transition 讓 hover 效果有平滑動畫。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q3 — TypeScript 型別宣告
# Ch13–15 Types & Variables

<!--
第三題考型別系統，從基本型別到 enum、陣列都要用到。
-->

---
layout: default
---

# Q3：任務說明

為一個「線上書店」宣告以下變數，**必須標注正確型別**：

1. 書名（字串）、單價（數字）、是否有庫存（布林）
2. 一個存放三本書名的**字串陣列**
3. 一個代表書籍基本資訊的 **tuple**（順序：id 為數字、書名為字串、售價為數字）
4. 一個 **enum** 命名為 `OrderStatus`，包含三個狀態：`Pending`、`Shipped`、`Delivered`
5. 宣告一個 `currentOrder` 變數，型別為 `OrderStatus`，值設為 `Shipped`

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⏱️ 建議時間：10 分鐘
</div>

<!--
這題考 Ch14 的五種基本型別 + array + tuple + enum，是最常在 Angular 開發中用到的型別組合。
-->

---
layout: default
---

# Q3：解答

```typescript
// 1. 基本型別
let bookTitle: string = 'TypeScript 精通之路';
let price: number = 480;
let inStock: boolean = true;

// 2. 字串陣列
let bookList: string[] = ['HTML 入門', 'CSS 精通', 'Angular 實戰'];

// 3. Tuple（固定長度、固定型別）
let bookInfo: [number, string, number] = [1, 'TypeScript 精通之路', 480];

// 4. Enum（訂單狀態）
enum OrderStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered'
}

// 5. 使用 Enum
let currentOrder: OrderStatus = OrderStatus.Shipped;
console.log(currentOrder);  // 'shipped'
```

<!--
Tuple 的每個位置型別固定，不能亂放；Enum 用字串值更直觀，後端 API 回傳的狀態欄位通常也是字串格式。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q4 — 函式設計
# Ch16 Methods

<!--
第四題考函式的各種寫法，從有參數到可選參數、預設參數和箭頭函式。
-->

---
layout: default
---

# Q4：任務說明

設計以下四個函式：

1. **`calculateBMI`**：接收體重（公斤）與身高（公尺），回傳 BMI 數值（`weight / height²`），型別為 `number`

2. **`formatGreeting`**：接收姓名（必填）與稱謂（可選），若有稱謂則輸出「您好，XX 先生/女士！」，否則輸出「你好，XX！」

3. **`calcDiscount`**：接收原價（必填）與折扣率（預設 0.9），回傳折扣後金額，使用**箭頭函式**寫法

4. 在一個 **class** `ShoppingCart` 中加入方法 `getTotalPrice`，接收 `prices: number[]` 並用 **for...of 迴圈**加總後回傳

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⏱️ 建議時間：15 分鐘
</div>

<!--
四個函式考不同知識點：基本函式、可選參數、預設參數 + 箭頭函式、Class 內的方法 + for...of。
-->

---
layout: default
---

# Q4：解答

```typescript
// 1. BMI 計算
function calculateBMI(weight: number, height: number): number {
  return weight / (height * height);
}
console.log(calculateBMI(70, 1.75).toFixed(1));  // 22.9

// 2. 可選參數問候語
function formatGreeting(name: string, title?: string): string {
  if (title) return `您好，${name} ${title}！`;
  return `你好，${name}！`;
}
console.log(formatGreeting('小明'));           // 你好，小明！
console.log(formatGreeting('王大明', '先生')); // 您好，王大明 先生！

// 3. 箭頭函式 + 預設參數
const calcDiscount = (price: number, rate: number = 0.9): number => price * rate;
console.log(calcDiscount(1000));      // 900
console.log(calcDiscount(1000, 0.8)); // 800

// 4. Class 內的方法 + for...of
class ShoppingCart {
  getTotalPrice(prices: number[]): number {
    let total = 0;
    for (let p of prices) { total += p; }
    return total;
  }
}
const cart = new ShoppingCart();
console.log(cart.getTotalPrice([200, 350, 120]));  // 670
```

<!--
箭頭函式只有一個 return 可以省略大括號；Class 的方法內用 for...of 比傳統 for 更簡潔；toFixed(1) 可以四捨五入到小數一位。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q5 — 邏輯綜合
# if × 陣列 × 迴圈

<!--
第五題是 Ch17 的核心：把 if、陣列方法、迴圈、字串轉換全部整合在一個實戰情境。
-->

---
layout: default
---

# Q5：任務說明

有一組學生成績資料如下，**完成五個小任務**：

```typescript
let scores: number[] = [88, 42, 75, 91, 63, 55, 78, 100, 49, 82];
```

1. 用 `filter` 篩選出**及格**（≥ 60）的成績，印出篩選後陣列
2. 計算所有成績的**平均分數**（用 for...of 累加後除以總數）
3. 用展開運算子找出**最高分**與**最低分**
4. 用 `map` 將每個分數轉換為對應**等第字串**（A/B/C/D/F），規則：90↑A、80↑B、70↑C、60↑D、其餘F
5. 印出一句話：`'共 X 人及格，佔 Y%'`（Y 用 `Math.round` 四捨五入至整數）

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⏱️ 建議時間：20 分鐘
</div>

<!--
這題把 filter、for...of 累加、展開運算子、map + if 等第轉換、String 模板拼接全部整合在一起，是最接近真實開發情境的練習。
-->

---
layout: default
---

# Q5：解答（1–3）

```typescript
let scores: number[] = [88, 42, 75, 91, 63, 55, 78, 100, 49, 82];

// 1. 篩選及格
let passing = scores.filter(s => s >= 60);
console.log(passing);  // [88, 75, 91, 63, 78, 100, 82]

// 2. 計算平均
let sum = 0;
for (let s of scores) { sum += s; }
let avg = sum / scores.length;
console.log('平均：', avg.toFixed(1));  // 62.3

// 3. 最高 / 最低分
console.log('最高分：', Math.max(...scores));  // 100
console.log('最低分：', Math.min(...scores));  // 42
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>Math.max(...scores)</code> 用展開運算子把陣列拆成一個個數字傳入
</div>

---
layout: default
---

# Q5：解答（4–5）

```typescript
// 4. 成績等第轉換
let grades = scores.map(s => {
  if (s >= 90) return 'A';
  else if (s >= 80) return 'B';
  else if (s >= 70) return 'C';
  else if (s >= 60) return 'D';
  else return 'F';
});
console.log(grades);
// ['B', 'F', 'C', 'A', 'D', 'F', 'C', 'A', 'F', 'B']

// 5. 及格人數與百分比
let passingCount = scores.filter(s => s >= 60).length;
let percentage = Math.round((passingCount / scores.length) * 100);
console.log(`共 ${passingCount} 人及格，佔 ${percentage}%`);
// 共 7 人及格，佔 70%
```

<!--
map 裡面可以放完整的 if/else if/else 邏輯；Math.round 四捨五入到整數；模板字面量讓字串拼接更清晰。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Q6 — Angular 元件模擬
# Class + 屬性 + 方法 綜合

<!--
最後一題是最接近 Angular 實戰的場景，用 TypeScript Class 模擬一個購物車元件。
-->

---
layout: default
---

# Q6：任務說明

設計一個 TypeScript **Class `ProductList`** 模擬 Angular 購物車元件，需包含：

**屬性（全域變數）**
- `products`：物件陣列，每個物件含 `name: string`、`price: number`、`qty: number`（數量，初始為 1）
- 初始化 3 個商品：Angular課程/1200元、CSS手冊/350元、TypeScript入門/480元

**方法**
1. `addQty(name: string): void` — 找到對應商品，將其 `qty` 加 1
2. `removeQty(name: string): void` — 找到對應商品，若 `qty > 1` 才扣 1
3. `getTotal(): number` — 用 `for...of` 計算所有商品的 `price × qty` 加總
4. `printSummary(): void` — 用 `forEach` 印出每個商品：`'商品名 x 數量 = 小計元'`

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⏱️ 建議時間：20 分鐘
</div>

<!--
這題完整模擬 Angular Component 的設計模式：屬性儲存資料、方法處理邏輯、this. 存取自身屬性。
-->

---
layout: default
---

# Q6：解答（Class 定義）

```typescript
class ProductList {
  products: { name: string; price: number; qty: number }[] = [
    { name: 'Angular課程', price: 1200, qty: 1 },
    { name: 'CSS手冊',     price: 350,  qty: 1 },
    { name: 'TypeScript入門', price: 480, qty: 1 }
  ];

  addQty(name: string): void {
    for (let p of this.products) {
      if (p.name === name) { p.qty++; return; }
    }
  }

  removeQty(name: string): void {
    for (let p of this.products) {
      if (p.name === name && p.qty > 1) { p.qty--; return; }
    }
  }
```

---
layout: default
---

# Q6：解答（方法與測試）

```typescript
  getTotal(): number {
    let total = 0;
    for (let p of this.products) {
      total += p.price * p.qty;
    }
    return total;
  }

  printSummary(): void {
    this.products.forEach(p => {
      console.log(`${p.name} x${p.qty} = ${p.price * p.qty}元`);
    });
  }
}

// 測試
const store = new ProductList();
store.addQty('Angular課程');
store.addQty('Angular課程');   // qty → 3
store.removeQty('CSS手冊');    // qty 只有 1，不扣
store.printSummary();
// Angular課程 x3 = 3600元
// CSS手冊 x1 = 350元
// TypeScript入門 x1 = 480元
console.log('總計：', store.getTotal(), '元');  // 4430
```

<!--
方法內用 for...of 搭配 if 找目標商品；this. 讓方法存取同一個 Class 的屬性；return 用來提早跳出迴圈，避免繼續往下找。
-->

---
layout: end
---

# 綜合練習 Ch1–Ch17 完成！

### 你已掌握的能力清單：

- HTML 頁面結構（標題、表格、列表、表單）
- CSS Flexbox 排版 + Hover 動畫 + 盒子模型
- TypeScript 型別系統（基本型別、陣列、Tuple、Enum）
- 函式設計（參數、回傳值、可選、預設、箭頭函式）
- 邏輯綜合（filter / map / for...of / if / 字串模板）
- Angular Class 元件模式（屬性 + 方法 + this）

<!--
恭喜！這六題涵蓋了前端開發的第一道完整防線。
如果哪一題寫得卡住，回去對應章節複習，反覆練習是成為工程師的唯一捷徑。
-->
