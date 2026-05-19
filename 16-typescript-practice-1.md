---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: TypeScript 練習（一）
routeAlias: ch16
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
    TypeScript 練習（一）
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「判斷、轉換、運算、迴圈，一次搞定」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **if 判斷式**
- **類型轉換**
- **JSON**
- **運算符**
- **字串常用函數**
- **陣列常用函數**
- **For 迴圈**
- **實作練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# if 判斷式
# Conditional Statements

---

# if 判斷式 — 基本語法

當需要比較兩個或多個值時，使用 **if 判斷式**。條件成立執行 `if` 區塊，否則執行 `else` 區塊。

```typescript
let a = 12;
let b = 10;

if (a > b) {
  console.log(a);  // 條件成立，印出 12
} else {
  console.log(b);
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 條件為 <code>true</code> 時進入 <code>if</code> 區塊，<code>false</code> 時進入 <code>else</code> 區塊
</div>

---

# if 判斷式 — 多個條件

使用 `&&`（AND）可以在一個 if 中加入多個條件，**所有條件都成立**時才會執行。

```typescript
let a = 12;
let b = 10;

if (a > b && a > 0) {
  console.log(a);  // a > b 且 a > 0，兩個都成立才印出
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>&&</code> 表示「且」；<code>||</code> 表示「或」，任一條件成立即可
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 類型轉換
# Type Conversion

---

# 文字轉數字 — Number()

當變數是 `string` 格式但需要進行數學計算時，使用 **`Number()`** 將文字轉為數字。

```typescript
let str: string = '123';
let num: number = Number(str);

console.log(num + 1);   // 124（可以計算了）
console.log(str + 1);   // '1231'（字串拼接，不是加法）
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 若字串內容無法轉換為數字（如 <code>'abc'</code>），結果會是 <code>NaN</code>（Not a Number）
</div>

---

# 數字轉文字 — String() 與字串拼接

將數字轉為文字有兩種方式，都可以使用。

```typescript
let n: number = 123;

// 方式一：使用 String()
let s1: string = String(n);

// 方式二：數字前後拼接空字串
let s2: string = '' + n;

console.log(typeof s1);  // string
console.log(typeof s2);  // string
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 兩種方式結果相同，<code>String()</code> 語意更清楚，字串拼接較簡便
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JSON
# JavaScript Object Notation

---

# 什麼是 JSON？

**JSON（JavaScript Object Notation）** 是一種文字格式，用來儲存和交換資料，人類可讀且機器可解析。

| JSON 支援的資料型別 | 範例 |
| --- | --- |
| 物件 | `{"name": "Allen"}` |
| 陣列 | `[1, 2, 3]` |
| 字串 | `"Hello"` |
| 數字 | `123` |
| 空值 | `null` |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 前端向後端傳送或接收資料時，通常都使用 JSON 格式
</div>

---

# 物件轉 JSON — JSON.stringify()

要將 TypeScript 物件傳送給後端時，需先用 **`JSON.stringify()`** 轉換為 JSON 字串。

```typescript
let obj = { name: 'Allen', age: 25 };

let json = JSON.stringify(obj);
console.log(json);         // {"name":"Allen","age":25}
console.log(typeof json);  // string
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>JSON.stringify()</code> 輸出的是字串，Console 中不可展開的那個就是 JSON 格式
</div>

---

# JSON 轉物件 — JSON.parse()

收到後端的 JSON 資料後，用 **`JSON.parse()`** 轉回物件才能在程式中使用。

```typescript
let jsonStr = '{"name":"Allen","age":25}';

let parsed = JSON.parse(jsonStr);
console.log(parsed.name);  // Allen
console.log(parsed.age);   // 25
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 使用 Angular 的 HttpClient 呼叫 API 時，通常會自動將 JSON 轉為物件，不需手動 parse
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 運算符
# Operators

---

# 算術運算符（一）— 四則運算

| 運算符 | 說明 | 範例 | 結果 |
| --- | --- | --- | --- |
| `+` | 加法 | `10 + 3` | `13` |
| `-` | 減法 | `10 - 3` | `7` |
| `*` | 乘法 | `10 * 3` | `30` |
| `/` | 除法 | `10 / 3` | `3.33...` |
| `%` | 餘數 | `10 % 3` | `1` |

---

# 算術運算符（一）— 範例

```typescript
console.log(10 + 3);  // 13
console.log(10 - 3);  // 7
console.log(10 * 3);  // 30
console.log(10 / 3);  // 3.3333...
console.log(10 % 3);  // 1（10 除以 3 餘 1）
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>%</code> 餘數運算常用於判斷奇偶數：<code class="no-liga-code">n % 2 === 0</code> 代表 n 是偶數
</div>

---

# 算術運算符（二）— 遞增 / 遞減 / 負號

| 運算符 | 說明 | 範例 | 結果 |
| --- | --- | --- | --- |
| <code>++</code> | 遞增（加 1） | `i++` | `i = i + 1` |
| <code>--</code> | 遞減（減 1） | `i--` | `i = i - 1` |
| <code>-</code>（負號） | 將數值取負 | `-n` | 負值 |

```typescript
let i = 5;
i++;              // i → 6
i--;              // i → 5
let n = 3;
console.log(-n);  // -3（負號）
```

---

# 指派運算符

指派運算符是一種**簡寫**，將計算與賦值合併：

| 運算符 | 等同於 | 說明 |
| --- | --- | --- |
| <code>i += 9</code> | <code>i = i + 9</code> | 加後賦值 |
| <code>i -= 9</code> | <code>i = i - 9</code> | 減後賦值 |
| <code>i *= 9</code> | <code>i = i * 9</code> | 乘後賦值 |
| <code>i /= 9</code> | <code>i = i / 9</code> | 除後賦值 |
| <code>i %= 9</code> | <code>i = i % 9</code> | 取餘後賦值 |

---

# 指派運算符 — 範例

```typescript
let i = 10;

i += 5;   // i = 10 + 5 → 15
i -= 3;   // i = 15 - 3 → 12
i *= 2;   // i = 12 * 2 → 24
i /= 4;   // i = 24 / 4 → 6
i %= 4;   // i = 6 % 4  → 2

console.log(i);  // 2
```

---

# 比較運算符

用來比較兩個值，通常用在 if 判斷中，結果為 `true` 或 `false`：

| 運算符 | 說明 | 範例 | 結果 |
| --- | --- | --- | --- |
| <span class="op-code">==</span> | **寬鬆**相等（2個等號）— 只比較值，不管型別 | <code class="no-liga-code">5 == '5'</code> | `true` |
| <span class="op-code">===</span> | **嚴格**相等（3個等號）— 值和型別都要相同 | <code class="no-liga-code">5 === '5'</code> | `false` |
| <span class="op-code">!=</span> | 值不相等 | <code class="no-liga-code">5 != 3</code> | `true` |
| <span class="op-code">&gt;</span> / <span class="op-code">&lt;</span> | 大於 / 小於 | <code class="no-liga-code">5 &gt; 3</code> | `true` |
| <span class="op-code">&gt;=</span> / <span class="op-code">&lt;=</span> | 大於等於 / 小於等於 | <code class="no-liga-code">5 &gt;= 5</code> | `true` |

---

# 比較運算符 — 範例

```typescript
console.log(5 == '5');   // true（值相同，型別不管）
console.log(5 === '5');  // false（型別不同）
console.log(5 != 3);     // true
console.log(5 > 3);      // true
console.log(5 <= 3);     // false
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 TypeScript 中建議使用 <code class="no-liga-code">===</code>（嚴格相等）避免型別轉換造成的判斷錯誤
</div>

---

# 邏輯運算符

用來組合多個比較條件，常搭配 if 使用：

| 運算符 | 說明 | 範例 | 結果 |
| --- | --- | --- | --- |
| <code>&&</code> | AND（且）：所有條件都為 true | `true && false` | `false` |
| <code>&#124;&#124;</code> | OR（或）：至少一個條件為 true | `true \|\| false` | `true` |
| <code>!</code> | NOT（非）：取反 | `!true` | `false` |

---

# 邏輯運算符 — 範例

```typescript
let x = true;
let y = false;

console.log(x && y);  // false（兩個都要 true）
console.log(x || y);  // true（有一個 true 即可）
console.log(!x);      // false（true 取反）

if (x && !y) {
  console.log('x 為真且 y 為假');
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 字串常用函數
# String Methods

---

# 字串常用函數

| 函數 | 說明 |
| --- | --- |
| `.length` | 回傳字串的字元數量 |
| `.slice(起始, 終止)` | 擷取從起始到終止（不含終止）位置的子字串 |
| `.indexOf(搜尋值)` | 搜尋指定內容，回傳第一個符合的位置（找不到回傳 -1） |

---

# 字串常用函數 — 範例

```typescript
let str = 'Hello World';

console.log(str.length);         // 11
console.log(str.slice(0, 5));    // Hello
console.log(str.slice(6));       // World
console.log(str.indexOf('W'));   // 6
console.log(str.indexOf('xyz')); // -1（找不到）
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 字串的索引從 <code>0</code> 開始；<code>slice</code> 的終止位置不包含在結果中
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 陣列常用函數
# Array Methods

---

# 陣列常用函數（一）

| 函數 | 說明 |
| --- | --- |
| `.length` | 回傳陣列中的資料筆數 |
| `.splice(起始, 長度)` | 從起始位置刪除指定數量的元素（會修改原陣列） |
| `.filter(條件函數)` | 依條件篩選，回傳符合條件的元素組成新陣列 |

---

# 陣列常用函數（一）— 範例

```typescript
let arr = [1, 2, 3, 4, 5];

console.log(arr.length);   // 5

arr.splice(1, 2);          // 從 index 1 刪除 2 筆
console.log(arr);          // [1, 4, 5]

let arr2 = [1, 2, 3, 4, 5];
let evens = arr2.filter(n => n % 2 === 0);
console.log(evens);        // [2, 4]
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>filter</code> 的條件函數需回傳 <code>true</code> 或 <code>false</code>；<code>splice</code> 會直接修改原陣列
</div>

---

# 陣列常用函數（二）

| 函數 | 說明 |
| --- | --- |
| `.push(值)` | 在陣列末尾增加一筆資料 |
| `.pop()` | 刪除並回傳陣列最後一筆資料 |
| `.forEach(函數)` | 逐一執行每個元素，無法中斷，不產生新陣列 |
| `.map(函數)` | 逐一處理每個元素，回傳一個新陣列 |

---

# 陣列常用函數（二）— 範例

```typescript
let arr = [1, 2, 3];

arr.push(4);
console.log(arr);  // [1, 2, 3, 4]

arr.pop();
console.log(arr);  // [1, 2, 3]

arr.forEach(n => console.log(n));  // 依序印出 1, 2, 3

let doubled = arr.map(n => n * 2);
console.log(doubled);  // [2, 4, 6]
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>forEach</code> 不回傳值；<code>map</code> 產生新陣列，原陣列不變
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# For 迴圈
# For Loops

---

# For 迴圈 — 傳統寫法

當你要重複執行某段程式碼，或逐一取出陣列資料時，使用 **for 迴圈**。

傳統寫法需要三個部分：

| 部分 | 說明 | 範例 |
| --- | --- | --- |
| 初始值 | 設定計數器起始值 | `let i = 0` |
| 判斷式 | 決定迴圈是否繼續 | `i < 20` |
| 遞增 | 每次執行後更新計數器 | `i++` |

---

# For 迴圈 — 傳統寫法範例

```typescript
for (let i = 0; i < 20; i++) {
  console.log(i);  // 印出 0 到 19
}
```

```typescript
// 搭配陣列
let arr = [10, 20, 30];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);  // 可取得 index
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 當 <code>i</code> 遞增到不滿足判斷式時，迴圈結束；需要知道陣列位置時用此寫法
</div>

---

# For 迴圈 — TypeScript 寫法（for...of）

TypeScript 提供更簡潔的 **`for...of`** 寫法，不需要初始值與條件，直接取出陣列中的值。

```typescript
let arr = [10, 20, 30];

for (let data of arr) {
  console.log(data);  // 依序印出 10, 20, 30
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>for...of</code> 無法取得 index；需要 index 時改用傳統 for 迴圈。此語法為 TypeScript/ES6+ 專屬，後端（純 JS）也支援
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

# 練習 1–3：任務說明
### for 迴圈練習

1. 用 for 迴圈將 **1 到 50** 全部打印出來

2. 承接第 1 題，**去除偶數**，只打印奇數

3. 用 for 迴圈將 **1 到 50 中，除以 3 餘數為 2** 的值打印出來

---
layout: default
---

# 練習 1–3：解題提示

**練習 1：**
```typescript
for (let i = 1; i <= 50; i++) { console.log(i); }
```

**練習 2：** 在迴圈內加 if 判斷，<code class="no-liga-code">i % 2 !== 0</code> 才 console.log

**練習 3：** 在迴圈內加 if 判斷，<code class="no-liga-code">i % 3 === 2</code> 才 console.log

---
layout: default
---

# 練習 4–7：任務說明
### 陣列與字串練習

4. 建立下列物件陣列，並使用 `forEach` **將小王的 age 改為 18**：
   ```typescript
   let people = [
     { name: '小明', age: 20 },
     { name: '小王', age: 25 },
     { name: '小李', age: 30 }
   ];
   ```

5. 找出陣列 `[4, 6, 1, 2, 7, 9, 12, 15, 13]` 中的**最小值**

6. 將字串 `'你好我是Allen'` **倒著印出**

7. 從字串 `'我是Allen，你好'` 中**將名稱 Allen 打印出來**

---
layout: default
---

# 練習 4–7：解題提示

**練習 4：** forEach 可修改物件屬性（注意：不能重新賦值整個元素）
```typescript
people.forEach(p => { if (p.name === '小王') p.age = 18; });
```

**練習 5：** 用 `Math.min(...arr)` 或在迴圈中比較取最小值
```typescript
console.log(Math.min(...[4, 6, 1, 2, 7, 9, 12, 15, 13]));  // 1
```

**練習 6：** 用 `.split('')` 切成字元陣列，再 `.reverse().join('')`
```typescript
console.log('你好我是Allen'.split('').reverse().join(''));
```

**練習 7：** 用 `indexOf` 找到 'A' 的位置，再用 `slice` 截取
```typescript
let s = '我是Allen，你好';
let start = s.indexOf('A');
console.log(s.slice(start, start + 5));  // Allen
```

---
layout: end
---

# TypeScript 練習（一）完成
### 判斷、轉換、運算、迴圈全部掌握！
