---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: TypeScript 練習（一）
routeAlias: ch17
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

<!--
各位學員，歡迎來到我們的「第一階段程式大總結」！
之前我們學了變數、型別和方法。
今天，我們要來把這些東西揉捏在一起，加上程式邏輯的四大護法——「條件判斷（if）」、「類型轉換」、「運算子」以及「迴圈（Loops）」。
這堂課的實戰意味非常濃！
學完之後，你會發現自己終於可以開始寫出具有複雜邏輯的程式碼，不再只是做做表面功夫了。
準備好大腦，我們馬上開始！
-->

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

<!--
今天我們的作戰地圖如下：
我們會先學怎麼讓程式做選擇（if 判斷式）。
接著，學習怎麼把字串跟數字互相轉軌（型別轉換）。
然後，了解現代資料交換的通用語——JSON。
再來是算術跟比較運算子、以及字串與陣列的常用內建函數。
最後，我們會認識 For 迴圈，並且迎接整整七題的實作挑戰！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# if 判斷式
# Conditional Statements

<!--
第一站，我們先來學習怎麼讓程式學會「思考與選擇」，也就是 if 判斷式。
-->

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

<!--
什麼是 `if` 判斷式？
這就像是你出門時看天空：
「如果（if）下雨，就帶傘；否則（else），就不帶。」
在程式裡，我們寫 `if (a > b) { ... }`。
只要小括號裡面的條件結果是 `true`，大腦就會執行第一個大括號裡面的指令；如果是 `false`，就會跑去執行 `else` 後面大括號裡的指令。
非常簡單直覺對吧！
-->

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

<!--
那如果我們想設定「同時滿足多個條件」才執行呢？
比如「天空在下雨，而且（AND）我沒開車，我才需要帶傘」。
在程式裡，我們用兩個並列的 & 符號 `&&` 來代表「而且」。
`if (a > b && a > 0)` 意思就是兩邊都要滿足，才算過關。
如果要表達「或者（OR）」，我們就用兩個直槓 `||`。
這在以後做欄位檢查時，天天都會寫到，大家一定要記熟！
-->

---

# if 判斷式 — else if

當有**超過兩種情況**時，在 `if` 與 `else` 之間加入 `else if` 分支：

```typescript
let score = 75;

if (score >= 90) {
  console.log('優秀');
} else if (score >= 70) {
  console.log('良好');  // 75 >= 70，印出此行
} else if (score >= 60) {
  console.log('及格');
} else {
  console.log('不及格');
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 條件由上往下依序比對，<b>第一個成立的分支</b>執行後即跳出，不再往下判斷
</div>

<!--
如果條件不只兩個，那「if/else」就不夠用了。
我們可以在中間加入一個或多個 else if，讓程式在多個情境下各自走不同的路線。
例如成績判斷：90 分以上優秀；70 到 89 良好；60 到 69 及格；其餘不及格。
條件是從上往下一個一個比對，只要遇到第一個成立的，就執行那個區塊，後面的 else if 全部略過。
-->

---
layout: default
---

# if 判斷式 — 小節練習

宣告變數 `score = 85`，用 if / else if / else 判斷成績等級後印出對應字母：
- 90 以上：`'A'`
- 80 以上：`'B'`
- 70 以上：`'C'`
- 其他：`'不及格'`

<!--
考 else if 的層疊判斷，條件由高到低依序比對，第一個符合就停止。
-->

---
layout: default
---

# if 判斷式 — 小節練習解答

```typescript
let score = 85;
if (score >= 90) {
  console.log('A');
} else if (score >= 80) {
  console.log('B');  // 印出 B
} else if (score >= 70) {
  console.log('C');
} else {
  console.log('不及格');
}
```

<!--
score = 85，不滿足 90，但滿足 80，因此印出 B，後面的分支全部跳過。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 類型轉換
# Type Conversion

<!--
第二站，我們來看看在 TypeScript 裡，怎麼在文字與數字之間轉軌。
-->

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

<!--
這是個新手極度容易踩坑的「世紀大Bug」。
當你從網頁輸入框拿到使用者填寫的年齡時，拿到的往往是字串型別的 `'123'`。
如果你直接給它做加法，寫 `str + 1`。
因為它是字串，瀏覽器會自作聰明地幫你做「文字拼接」，最後算出來居然是 `'1231'`！
這在算帳的時候會直接出人命啊！
SO，我們必須用 `Number(str)` 來做強力轉型，把文字變回貨真價實的數字。
這樣一來，`num + 1` 就會順利算出數學上的 `124` 了。
請大家記住：凡是牽涉到加減乘除，記得一定要先確認它的型別是不是 number！
-->

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

<!--
相反地，如果我們要將數字轉成文字，有兩種合法打法：
第一種是使用 `String(n)`，非常正規體面。
第二種是「工程師偷懶法」：寫一個空字串 `''` 加上數字 `n`。
因為 JavaScript 看到加號一邊是字串，就會自動把另一邊的數字也強行轉成字串來做拼接。
兩種方法結果完全一樣，大叔個人偏好第一種，因為程式碼的可讀性比較高。
-->

---
layout: default
---

# 類型轉換 — 小節練習

有兩個字串 `a = '150'` 和 `b = '80'`，先將它們轉換為數字後，計算並印出兩數之**和**與**積**。

<!--
直接用 + 做加法會得到字串拼接結果 '15080'，一定要先 Number() 轉型。
-->

---
layout: default
---

# 類型轉換 — 小節練習解答

```typescript
let a = '150';
let b = '80';
let numA = Number(a);
let numB = Number(b);
console.log(numA + numB);  // 230
console.log(numA * numB);  // 12000
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 未轉型直接 <code>'150' + '80'</code> 會得到 <code>'15080'</code>，而非 <code>230</code>！
</div>

<!--
最常踩的坑：忘記轉型，直接做加法，得到字串拼接結果。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JSON
# JavaScript Object Notation

<!--
接下來，我們要介紹在整個網頁開發領域中，最著名的溝通格式——JSON。
-->

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

<!--
什麼是 JSON？
全名是 JavaScript Object Notation。
你可以把它想像成「程式界的國際通用英文」。
因為前端不管是 Angular 還是 React，後端不管是 Java、Python 還是 Node.js。
大家彼此交換資料時，都只認這種「用引號包起來的字串格式」。
它長得跟我們剛剛學的 TS 物件非常像，支持物件、陣列、字串、數字與空值，是我們前後端溝通的唯一橋樑。
-->

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

<!--
當我們前端寫好了資料，想要透過網路發送給後端時。
我們不能直接把 TS 物件丟過去。
我們必須用 `JSON.stringify()`，把這個物件「打包脫水」成一串純文字的 JSON 字串。
你看 code 裡面的 `JSON.stringify(obj)`，輸出後就是一串緊湊的字串。
這個過程在學術上叫作「序列化（Serialization）」。
-->

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

<!--
反過來，當我們從後端接收到一串純文字的 JSON 字串時。
我們也沒辦法直接讀取裡面的屬性。
我們必須用 `JSON.parse()` 把這個字串「加水還原」成 TS 裡的實體物件，這樣才能寫 `parsed.name` 讀取資料。
這個過程叫做「反序列化（Deserialization）」。
雖然在 Angular 的 HttpClient 模組裡，框架會貼心地幫我們自動 parse 掉，但基本原理大家一定要懂喔！
-->

---
layout: default
---

# JSON — 小節練習

建立物件 `user = { name: '小明', age: 22, city: '台北' }`，用 `JSON.stringify` 轉為 JSON 字串並印出，再驗證其型別為 `string`。

<!--
stringify 把 TS 物件打包成純文字字串，這是前後端溝通前必做的動作。
-->

---
layout: default
---

# JSON — 小節練習解答

```typescript
let user = { name: '小明', age: 22, city: '台北' };
let json = JSON.stringify(user);
console.log(json);         // {"name":"小明","age":22,"city":"台北"}
console.log(typeof json);  // string
```

<!--
輸出是純文字字串，不是物件，所以 typeof 會得到 'string'，這點要注意。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 運算符
# Operators

<!--
接下來是程式世界裡的數學符號——運算子。
-->

---

# 算術運算符（一）— 四則運算

| 運算符 | 說明 | 範例 | 結果 |
| --- | --- | --- | --- |
| `+` | 加法 | `10 + 3` | `13` |
| `-` | 減法 | `10 - 3` | `7` |
| `*` | 乘法 | `10 * 3` | `30` |
| `/` | 除法 | `10 / 3` | `3.33...` |
| `%` | 餘數 | `10 % 3` | `1` |

<!--
這頁是國小數學的加減乘除。
只有一個比較特別的符號是百分比 `%`。
在程式裡，這個符號不代表百分率，而是「取餘數（Modulus）」。
比如 `10 % 3`，就是 10 除以 3 餘 1，所以結果是 1。
這在我們想判斷一個數字是奇數還是偶數時，超級常用！
只要寫 `n % 2 === 0`，能整除就是偶數，不能就是奇數。
-->

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

<!--
這是算術運算子的程式碼範例。
大家看一下，除法 `/` 在 JS/TS 中會算出浮點數，不像某些程式語言整數相除會直接無條件捨去。
餘數運算子真的很好用，大家一定要把它刻在腦子裡。
-->

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

<!--
接下來是遞增與遞減運算子：`++` 與 `--`。
`i++` 就是把 `i` 目前的值加 1；`i--` 就是減 1。
這就像是在計算人數，來一個就加一個。
我們通常在寫迴圈記數的時候，會天天跟它們打交道。
-->

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

<!--
當我們想要「拿自己的值做計算，然後再存回自己身上」時。
普通的寫法是 `i = i + 9`。
但我們工程師是出了名的懶惰，所以我們發明了簡寫法：`i += 9`！
這兩句完全等價。
同理，減、乘、除、餘數，通通都可以用這種方式簡寫，代碼看起來會乾淨非常多。
-->

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

<!--
你看這個範例。
`i = 10`。
加 5 變成 15，減 3 變成 12，乘 2 變 24，除 4 變 6，最後除以 4 取餘數，餘 2。
一步一步把運算結果又存回 `i` 身上，最後 console 出來的結果就是 2！
這在做累加計算時，非常實用。
-->

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

<!--
再來是比較運算子。
這邊大叔要大聲疾呼一個「終極鐵律」！
JS/TS 裡面有兩種等於：
第一種是「雙等於 `==`」，叫寬鬆相等。它會自作聰明地幫你轉型，比如把字串 `'5'` 當成數字 `5`，回傳 true。
第二種是「三等於 `===`」，叫嚴格相等。它不僅比對值，還比對「型別」！
如果型別不同，直接宣判出局。
為了避免你的程式跑出各種靈異事件，**在 Angular 開發中，請一律使用三等於 `===` 和 `!==`**！
這能讓你少加班半個小時喔！
-->

---

# 比較運算符 — 範例

```typescript
console.log((5 as any) == '5');  // true（JS 底層行為，TS 需轉 any 才能執行）
console.log(5 === '5');          // false（型別不同）
console.log(5 != 3);             // true
console.log(5 > 3);              // true
console.log(5 <= 3);             // false
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 TypeScript 直接寫 <code class="no-liga-code">5 == '5'</code> 會報 TS2367 型別錯誤，這正是 TS 的保護機制。實務上一律用 <code class="no-liga-code">===</code>，讓型別系統替你擋住這類問題
</div>

<!--
這就是範例。
你看 `5 == '5'` 是 true；但 `5 === '5'` 就是 false。
這也是為什麼大叔強烈要求大家一律用三等於的原因。
型別不對就該報錯，這才是成熟程式碼該有的防禦力！
-->

---

# 邏輯運算符

用來組合多個比較條件，常搭配 if 使用：

| 運算符 | 說明 | 範例 | 結果 |
| --- | --- | --- | --- |
| <code>&&</code> | AND（且）：所有條件都為 true | `true && false` | `false` |
| <code>&#124;&#124;</code> | OR（或）：至少一個條件為 true | `true \|\| false` | `true` |
| <code>!</code> | NOT（非）：取反 | `!true` | `false` |

<!--
邏輯運算子就是 `&&`、`||` 和驚嘆號 `!`。
`&&` 代表 AND，必須兩邊都滿足才行。
`||` 代表 OR，只要有一邊滿足就行。
驚嘆號 `!` 代表 NOT（反轉），把 `true` 變 `false`，`false` 變 `true`。
-->

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

<!--
看程式碼。
`!x` 就是把原本是 `true` 的 `x` 反轉成 `false`。
這在我們開發「開關功能」時非常好用。
比如點擊按鈕，要把選單展開或收合，我們只要寫一行 `this.isOpen = !this.isOpen`。
它就會自動在開與關之間來回切換，非常優雅！
-->

---
layout: default
---

# 運算符 — 小節練習

宣告 `price = 2000`，套用指派運算符計算最終售價後印出：
- 打九折（`*= 0.9`）
- 再扣除折扣券 100 元（`-= 100`）

<!--
考指派運算符的鏈式使用，讓學員感受累計計算的便利性。
-->

---
layout: default
---

# 運算符 — 小節練習解答

```typescript
let price = 2000;
price *= 0.9;  // price = 1800
price -= 100;  // price = 1700
console.log(price);  // 1700
```

<!--
乘完是 1800，再扣 100 得 1700。每步都把結果存回 price 本身。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 字串常用函數
# String Methods

<!--
接下來，我們來看看處理文字時，有哪些好用的內建小工具。
-->

---

# 字串常用函數

| 函數 | 說明 |
| --- | --- |
| `.length` | 回傳字串的字元數量 |
| `.slice(起始, 終止)` | 擷取從起始到終止（不含終止）位置的子字串 |
| `.indexOf(搜尋值)` | 搜尋指定內容，回傳第一個符合的位置（找不到回傳 -1） |
| `.split(分隔符號)` | 依分隔符號切割字串，回傳陣列；傳入 `''` 可逐字拆分 |

<!--
這四個是處理字串時最常召喚的函數：
`.length` 告訴你這串字有幾個字元。
`.slice(起始, 終止)` 幫你把字串「切一塊下來」。
`.indexOf(搜尋值)` 幫你搜尋特定關鍵字在第幾個位置（注意：如果找不到，會回傳 -1）。
`.split()` 是字串轉陣列的標準做法，傳入空字串時逐字拆分；配合 reverse() 和 join('') 三步可反轉字串。
-->

---

# 字串常用函數 — 範例

```typescript
let str = 'Hello World';

console.log(str.length);           // 11
console.log(str.slice(0, 5));      // Hello
console.log(str.slice(6));         // World
console.log(str.indexOf('W'));     // 6
console.log(str.indexOf('xyz'));   // -1（找不到）
console.log('Hello'.split(''));    // ['H', 'e', 'l', 'l', 'o']
console.log('a,b,c'.split(','));   // ['a', 'b', 'c']
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>split('') → reverse() → join('')</code> 三步可反轉字串：<code>'Hello'.split('').reverse().join('')</code> → <code>'olleH'</code>
</div>

<!--
字串索引從 0 開始；slice 終止位置不含在結果中；indexOf 找不到回傳 -1。
split 傳入空字串逐字拆分，傳入分隔符號則按符號切割。
split → reverse → join 三步組合技可做字串反轉，在後面的實作題會用到！
-->


---
layout: default
---

# 字串常用函數 — 小節練習

有字串 `email = 'student@school.edu.tw'`：
- 印出此字串的長度
- 用 `indexOf` 找出 `'@'` 符號的位置
- 用 `slice` 擷取 `'@'` 前面的使用者名稱部分

<!--
indexOf + slice 的組合拳，是字串處理最常見的實戰技巧。
-->

---
layout: default
---

# 字串常用函數 — 小節練習解答

```typescript
let email = 'student@school.edu.tw';
console.log(email.length);           // 21
let atIdx = email.indexOf('@');
console.log(atIdx);                  // 7
console.log(email.slice(0, atIdx));  // student
```

<!--
'student' 共 7 個字元，所以 '@' 在 index 7；slice(0, 7) 就截出使用者名稱部分。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 陣列常用函數
# Array Methods

<!--
既然有字串小工具，那天天都要處理的陣列，當然也有更強大的內建函數！我們來看看。
-->

---

# 陣列常用函數（一）

| 函數 | 說明 |
| --- | --- |
| `.length` | 回傳陣列中的資料筆數 |
| `.splice(起始, 長度)` | 從起始位置刪除指定數量的元素（會修改原陣列） |
| `.filter(條件函數)` | 依條件篩選，回傳符合條件的元素組成新陣列 |

<!--
陣列的第一組常用工具：
`.length` 回傳陣列有幾筆資料。
`.splice(起始, 長度)` 就像是去割盲腸一樣，直接把陣列中指定位置的資料挖出來丟掉。這會直接修改原陣列喔！
`.filter(條件函數)` 則是篩選器，它會把陣列裡的每筆資料丟進篩選器，符合條件的才拿出來拼成一個新的陣列。
-->

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

<!--
你看範例。
`arr.splice(1, 2)`，就是從 index 1（也就是數字 2）開始，砍掉 2 個元素。所以 2 跟 3 都被砍了，陣列只剩下 `[1, 4, 5]`。
而底下的 `filter` 範例，我們用箭頭函式 `n => n % 2 === 0` 來篩選偶數。
最後就篩出了一個全新的陣列 `[2, 4]`，原本的陣列完全不受影響。
這在我們做搜尋過濾功能時，是極度核心的招式！
-->

---

# 陣列常用函數（二）

| 函數 | 說明 |
| --- | --- |
| `.push(值)` | 在陣列末尾增加一筆資料 |
| `.pop()` | 刪除並回傳陣列最後一筆資料 |
| `.forEach(函數)` | 逐一執行每個元素，無法中斷，不產生新陣列 |
| `.map(函數)` | 逐一處理每個元素，回傳一個新陣列 |
| `.reverse()` | 將陣列元素反轉順序（**直接修改**原陣列） |
| `.join(連接符號)` | 將所有元素合併成一個字串 |

<!--
第二組常用陣列工具：
`.push()` 往陣列尾巴塞新資料；
`.pop()` 把陣列最後一個東西拔出來丟掉。
`.forEach()` 就像是閱兵儀式，讓陣列裡的每個兵排隊站出來，讓你對他們做點事，但沒有回傳值。
`.map()` 則是「影分身魔改術」，它把陣列裡的每個元素拿出來加工，然後回傳一個魔改後的全新陣列！
`.reverse()` 就地反轉陣列順序，原陣列本身會被改掉，要注意！
`.join()` 把陣列元素用指定符號黏合成字串，傳入空字串就是直接連在一起。
-->

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

let chars = ['H', 'e', 'l', 'l', 'o'];
chars.reverse();
console.log(chars.join(''));   // olleh
console.log(chars.join('-'));  // o-l-l-e-H
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>forEach</code> 不回傳值；<code>map</code> 產生新陣列，原陣列不變；<code>reverse</code> 直接修改原陣列
</div>

<!--
push/pop 直接修改原陣列；forEach 逐一執行但不回傳；map 回傳新陣列，原陣列不變。
reverse 就地反轉，join 把元素黏合成字串。
split → reverse → join 三步組合技可做字串反轉，在後面的實作題會用到！
-->


---
layout: default
---

# 陣列常用函數 — 小節練習

有成績陣列 `scores = [72, 45, 88, 91, 63, 78, 55]`：
- 用 `filter` 篩選出 **70 分以上**的成績
- 用 `map` 將原陣列每個分數乘以 `1.05`（加分），結果用 `Math.floor` 取整數

<!--
filter 和 map 是前端工程師最常用的兩把武器，注意兩者都不修改原陣列。
-->

---
layout: default
---

# 陣列常用函數 — 小節練習解答

```typescript
let scores = [72, 45, 88, 91, 63, 78, 55];
let passing = scores.filter(s => s >= 70);
console.log(passing);  // [72, 88, 91, 78]
let boosted = scores.map(s => Math.floor(s * 1.05));
console.log(boosted);  // [75, 47, 92, 95, 66, 81, 57]
```

<!--
filter 篩選出符合條件的新陣列；map 把每個元素加工後產生新陣列，兩者都不動原陣列。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# For 迴圈
# For Loops

<!--
現在，我們要來解鎖程式世界裡最擅長做髒活累活、不怕累的重複執行大師——「迴圈（Loops）」。
-->

---

# For 迴圈 — 傳統寫法

當你要重複執行某段程式碼，或逐一取出陣列資料時，使用 **for 迴圈**。

傳統寫法需要三個部分：

| 部分 | 說明 | 範例 |
| --- | --- | --- |
| 初始值 | 設定計數器起始值 | `let i = 0` |
| 判斷式 | 決定迴圈是否繼續 | `i < 20` |
| 遞增 | 每次執行後更新計數器 | `i++` |

<!--
什麼是 `for` 迴圈？
這像教練對你說：「給我去跑操場跑 20 圈，沒跑完不准回家！」
傳統的 For 迴圈需要三個配件：
第一個是「初始值」：`let i = 0`，代表我現在站在操場起跑點，跑了 0 圈。
第二個是「判斷式」：`i < 20`，如果小於 20 圈，就繼續跑。
第三個是「遞增」：`i++`，每跑完一圈，計數器就加 1。
這三個配件組合在一起，就能精準控制程式重複執行的次數。
-->

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

<!--
我們來看範例程式碼。
第一個迴圈會從 0 印到 19，因為當 `i` 累加到 20 時，就不符合 `i < 20` 的條件，迴圈就結束了。
第二個範例是用來巡邏陣列。
我們用 `i < arr.length` 作為判斷式。
這樣一來，我們就能用 `arr[i]` 依序拿到 index 0、1、2 的資料了。
這是非常經典的陣列遍歷寫法。
-->

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

<!--
但在 TypeScript 裡，如果我們「不需要知道現在是第幾個 index，只想單純拿到裡面的值」。
大叔強烈建議大家用更優雅的 `for (let data of arr)` 語法！
這行翻成白話就是：「幫我把 `arr` 陣列裡的每個資料，依序拿出來裝進 `data` 變數裡，直到拿完為止。」
不用寫計數器，也不用寫 length 判斷，代碼少寫一半，Bug 自然少一半，爽度爆表！
-->

---

# 展開運算子 — Spread Operator

`...` 可以將陣列「展開」成個別元素，常與 `Math.min()` / `Math.max()` 搭配使用：

```typescript
let arr = [4, 6, 1, 2, 7];

// ❌ 直接傳陣列：Math.min 不接受陣列格式
console.log(Math.min(arr));    // NaN

// ✅ 用 ... 展開陣列
console.log(Math.min(...arr)); // 1（最小值）
console.log(Math.max(...arr)); // 7（最大值）
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>Math.min()</code> 與 <code>Math.max()</code> 只接受「一個個分開的數字」；<code>...</code> 負責把陣列拆開再傳入，等同於 <code>Math.min(4, 6, 1, 2, 7)</code>
</div>

<!--
Math.min 和 Math.max 只認識一個個分開傳入的數字，直接傳陣列會拿到 NaN，非常困惑。
這時候展開運算子 ... 就是救星！
在陣列前面加三個點，它就會幫你把陣列裡的所有元素，一個一個展開再傳給函數。
這招在練習 5 裡找最小值時會直接用到！
-->

---
layout: default
---

# For 迴圈 — 小節練習

用傳統 for 迴圈計算 **1 到 100 的總和**，印出結果。

<!--
累加是 for 迴圈最經典的使用場景，考驗學員對初始值、判斷式、遞增三元素的掌握。
-->

---
layout: default
---

# For 迴圈 — 小節練習解答

```typescript
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum);  // 5050
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 數學小知識：1 + 2 + ... + 100 = 5050，可用公式 <code>n × (n+1) / 2</code> 驗證
</div>

<!--
宣告 sum = 0 作為累加器，每次迭代把 i 加進去，跑完 100 圈後印出 5050。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

<!--
好，武功秘笈全部傳授完畢！接下來，是騾子是馬，拉出來溜溜就知道。
我們準備了七道非常有意思的實作挑戰，大家準備接招！
-->

---
layout: default
---

# 練習 1–3：任務說明
### for 迴圈練習

1. 用 for 迴圈將 **1 到 50** 全部打印出來

2. 承接第 1 題，**去除偶數**，只打印奇數

3. 用 for 迴圈將 **1 到 50 中，除以 3 餘數為 2** 的值打印出來

<!--
前三題是 For 迴圈與 if 的結合訓練。
第一題：用 for 迴圈印出 1 到 50。
第二題：承接第一題，加上 if 判斷式篩選，只印出奇數。
第三題：承接第一題，只印出除以 3 會餘 2 的數字。
大家先在自己的電腦上開個 scratch 檔案，動手寫寫看，不要偷看答案喔！
-->

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

<!--
寫完了嗎？大叔來公佈簡潔的提示。
第一題就是最標準的傳統 for 迴圈，從 `i = 1`開始跑，一路判斷到 `i <= 50`。
第二題我們利用了取餘數運算子，如果 `i % 2 !== 0`，代表除以 2 餘數不為 0，這就是奇數的鐵證！
第三題也差不多，如果 `i % 3 === 2`，就代表符合餘 2 的條件，就把值 console 印出來。
是不是很簡單？迴圈加上判斷式，就能幫我們做很多自動化的篩選工作了！
-->

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

<!--
後四題稍微有點難度囉，是字串與陣列的高級玩法！
第四題：要把物件陣列裡小王的年齡，用 `forEach` 改為 18 歲。
第五題：要從一堆數字陣列中，找出「最小值」（提示：想想像拿撲克牌比大小的邏輯）。
第六題：將字串 `'你好我是Allen'` 倒著印出來。
第七題：從字串 `'我是Allen，你好'` 裡精準切出 `'Allen'` 這個名字。
這四題非常考驗各位對內建函數與邏輯思維的結合，大家加油！
-->

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

<!--
好，大叔來逐一拆解這幾題的黃金提示：
第四題，我們在 `people.forEach` 內部，用 if 判斷 `p.name === '小王'`，如果中了，就直接修改 `p.age = 18`。這會直接改動原物件。
第五題，最快的方式是利用 JavaScript 內建的 `Math.min(...arr)`，那個三個點 `...` 叫做「展開運算子」，它可以把陣列拆開成一個個數字丟給 Math.min 比大小，非常高階！
第六題，我們要先用 `.split('')` 把字串切成一個個字元的陣列，然後叫用陣列的 `.reverse()` 把順序倒過來，最後用 `.join('')` 把它們重新黏回字串，這叫「三神合體技」！
第七題，我們用 `indexOf('A')` 找到 Allen 開頭的 index 位置，然後用 `slice` 往後截取 5 個字元（因為 Allen 有 5 個字母），就能精準把 Allen 切出來了！
大家都做對了嗎？
-->

---
layout: end
---

# TypeScript 練習（一）完成
### 判斷、轉換、運算、迴圈全部掌握！

<!--
恭喜大家！完成了這場硬核的 TypeScript 綜合演練！
你今天學到的判斷、轉換、運算、迴圈與陣列函數，是所有前端開發的「真功夫」。
如果有些題目寫得有點吃力，非常正常，多練習幾次，手感是累積出來的。
下堂課，我們要來學習如何使用「管道（Pipes）」，來幫我們呈現在網頁上的資料做魔術變身！大家大腦充飽電，我們下堂課見！
-->
