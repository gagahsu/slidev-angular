---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: TypeScript 練習（二）
routeAlias: ch17p2
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
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    TypeScript 練習（二）
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「日期、資料重組、方法綜合應用」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **Date 日期物件**
- **日期比較**
- **重組資料**
- **宣告方法複習**
- **實作練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Date 日期物件
# Working with Dates

---

# Date 物件 — 建立日期

使用 `new Date()` 建立日期物件，共有三種常用寫法：

```typescript
// 抓取當下時間
let date = new Date();
console.log(date); // Sun Oct 27 2024 14:56:19 GMT+0800

// 建立指定日期（時間預設 00:00:00）
date = new Date('2019-10-27');
console.log(date); // Sun Oct 27 2019 08:00:00 GMT+0800

// 建立指定日期與時間（精確到秒）
date = new Date('2019-10-27 02:20:02');
console.log(date); // Sun Oct 27 2019 02:20:02 GMT+0800
```

---

# Date 常用方法

| 方法 | 說明 | 回傳值（以 `2019-10-27 02:20:02` 為例） |
| --- | --- | --- |
| `.getFullYear()` | 取得年份（4位數） | `2019` |
| `.getMonth()` | 取得月份（**0–11**，需 +1） | `9`（10月） |
| `.getDate()` | 取得日期（1–31） | `27` |
| `.getDay()` | 取得星期幾（0=週日，6=週六） | `0`（週日） |
| `.getHours()` | 取得小時（0–23） | `2` |
| `.getMinutes()` | 取得分鐘（0–59） | `20` |
| `.getSeconds()` | 取得秒數（0–59） | `2` |
| `.getTime()` | 取得毫秒時間戳（從 1970/1/1 起算） | 大數字 |

---

# Date 常用方法 — 範例

```typescript
let date = new Date('2019-10-27 02:20:02');

console.log(date.getFullYear()); // 2019
console.log(date.getMonth());    // 9（月份從 0 開始，10月 = 9）
console.log(date.getDate());     // 27
console.log(date.getHours());    // 2
console.log(date.getMinutes());  // 20
console.log(date.getSeconds());  // 2
console.log(date.getDay());      // 0（0 = 週日）
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>getMonth()</code> 從 0 開始（0 = 1月），使用時記得加 1 才是正確月份
</div>

---

# 日期比較 — getTime()

兩個 `Date` 物件**不能直接用 `>` / `<` 比較**，需先用 `.getTime()` 轉為毫秒數再比較。

```typescript
let sDate = new Date('2024/11/27');
let eDate = new Date('2024/11/28');

console.log(sDate.getTime() > eDate.getTime()); // false
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 毫秒數越大代表日期越晚；<code>getTime()</code> 讓兩個日期可以像數字一樣直接比較大小
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 重組資料
# Data Restructuring

---

# 重組資料 — 為什麼需要？

收到後端資料時，欄位名稱不一定符合前端需求。例如後端給的是 `name / age / sex`，但前端需要每個欄位加上 `user` 前綴：

```typescript
// 後端傳來的原始資料
let jsonData = {
  name: 'Allen',
  age: 12,
  sex: 'M'
};
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 除非前後端一開始就統一格式，否則資料重組是無法避免的過程
</div>

---

# 重組資料 — 範例

將原始資料每個欄位加上 `user` 前綴，放進新物件：

```typescript
let newJsonData = {
  userName: jsonData.name,
  userAge:  jsonData.age,
  userSex:  jsonData.sex
};

console.log(newJsonData);
// { userName: 'Allen', userAge: 12, userSex: 'M' }
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 若資料是陣列，可用 <code>map</code> 對每筆資料做同樣的重組，回傳新陣列
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 宣告方法複習
# Declaring Methods

---

# 宣告方法 — 複習

無論是從 HTML 觸發，還是在 TS 中呼叫，都需要自己宣告方法。方法可以帶入參數：

```typescript
// TS 端：宣告帶入一個值 msg 的方法
showAlert(msg: string) {
  alert(msg);
}

// TS 中呼叫
this.showAlert('HI');
```

```html
<!-- HTML 觸發 -->
<button (click)="showAlert('HI')">按鈕</button>
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 方法名稱可自由命名，但不能與系統保留字相同
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

---
layout: default
---

# 練習 1–2：任務說明
### 運算練習

**練習 1：**  
Allen 錢包裡有 200 元，買了一個漢堡（50 元）、三個薯條（40 元/個），  
請問他還剩下多少錢？

**練習 2：**  
Allen 身上有 5000 元，想買 10 份漢堡（50 元）、10 份薯條（40 元），  
因為有會員卡可以打 **九折**，請問他還剩下多少錢？

---
layout: default
---

# 練習 1–2：解題提示

**練習 1：**

```typescript
let money = 200;
let spent = 50 + 40 * 3;   // 170
console.log(money - spent); // 30
```

**練習 2：**

```typescript
let money = 5000;
let cost = (10 * 50 + 10 * 40) * 0.9;  // 810
console.log(money - cost);               // 4190
```

---
layout: default
---

# 練習 3：任務說明
### VIP 資格判斷

建立下列資料，並用程式判斷哪些人有達成 **VIP 資格（累積花費 200 元以上）**：

```typescript
let arrayData = [
  { userName: 'Allen', payMoney: 500 },
  { userName: 'Ben',   payMoney: 20  },
  { userName: 'Eric',  payMoney: 120 }
];
```

---
layout: default
---

# 練習 3：解題提示

```typescript
let arrayData = [
  { userName: 'Allen', payMoney: 500 },
  { userName: 'Ben',   payMoney: 20  },
  { userName: 'Eric',  payMoney: 120 }
];

arrayData.forEach(item => {
  if (item.payMoney >= 200) {
    console.log(item.userName + ' 達成 VIP！');
  }
});
// Allen 達成 VIP！
```

---
layout: default
---

# 練習 4：任務說明
### BMI 計算方法

寫一個可以帶入 **身高（cm）** 與 **體重（kg）** 的方法，計算 BMI 並判斷所在區間。

| BMI 值 | 區間 |
| --- | --- |
| < 18.5 | 過輕 |
| 18.5 – 24.9 | 正常 |
| 25 – 29.9 | 過重 |
| ≥ 30 | 肥胖 |

BMI 公式：`體重(kg) ÷ 身高(m)²`

---
layout: default
---

# 練習 4：解題提示

```typescript
calculateBMI(height: number, weight: number) {
  let bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    console.log(`BMI ${bmi.toFixed(1)}：過輕`);
  } else if (bmi < 25) {
    console.log(`BMI ${bmi.toFixed(1)}：正常`);
  } else if (bmi < 30) {
    console.log(`BMI ${bmi.toFixed(1)}：過重`);
  } else {
    console.log(`BMI ${bmi.toFixed(1)}：肥胖`);
  }
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 身高單位是 cm，計算時需除以 100 轉為 m；<code>** 2</code> 是 TypeScript 的次方運算符
</div>

---
layout: end
---

# TypeScript 練習（二）完成
### 日期、資料重組、方法綜合應用全部掌握！
