---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: TypeScript 數據類型
routeAlias: ch13
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
    數據類型
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓變數的用途一目了然」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **數據類型概覽**
- **boolean（布林類型）**
- **number（數字類型）**
- **string（字符串類型）**
- **array（數組類型）**
- **tuple（元組類型）**
- **enum（枚舉類型）**
- **any（任意類型）**
- **null 和 undefined 類型**
- **Object（物件）**

---

# 數據類型概覽

TypeScript 為了讓編寫代碼更規範並且更方便維護，增加了類型的效驗。以下是 TypeScript 所擁有的類型：

| 類型 | 說明 |
| --- | --- |
| `boolean` | 布林類型，值只能是 `true` 或 `false` |
| `number` | 數字類型，包含整數與浮點數 |
| `string` | 字符串類型，文本資料 |
| `array` | 數組類型，同類型元素的集合 |
| `tuple` | 元組類型，固定長度與類型的數組（TypeScript 特有） |
| `enum` | 枚舉類型，一組具名常數（TypeScript 特有） |
| `any` | 任意類型，可存放任何類型的值 |
| `null / undefined` | 空值類型 |
| `Object` | 物件，以鍵值對形式存放資料 |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 基本類型
# Basic Types

---

# boolean（布林類型）

布林類型就是 `true` 跟 `false`，這個變數只能是 `true` 或 `false`，輸入其他的都會錯誤。

```typescript
booleanType: boolean = true;
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 布林類型常用於條件判斷，例如 <code>if (isLoggedIn)</code>、<code>isLoading: boolean = false</code>
</div>

---

# number（數字類型）

跟 JavaScript 一樣，所有的數字都是浮點數。

```typescript
numberType: number = 3;
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 TypeScript 的 <code>number</code> 不區分整數與小數，<code>3</code> 與 <code>3.14</code> 都是合法的 <code>number</code>
</div>

---

# string（字符串類型）

就是文本數據類型，需要在文字外層加上 `"` 或者 `'` 將其包裹，來讓系統知道這個是字符串。

```typescript
stringType: string = "字符串";
stringType2: string = '字符串';
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 雙引號與單引號效果相同；實務上也常使用模板字串（Template Literal）：<code>`Hello, ${name}!`</code>
</div>

---

# array（數組類型）

就是大家口中的陣列，有兩種定義方式。請注意：數組宣告的類型確定後，新增的資料必須是一樣的類型，否則會錯誤（宣告 string 類型，資料需要都為 string）。

```typescript
arrayType: string[] = ['a', 'b', 'c'];
arrayType2: Array<string> = ['a', 'b', 'c'];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 兩種寫法功能相同：<code>string[]</code> 是簡寫語法；<code>Array&lt;string&gt;</code> 是泛型語法
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# TypeScript 特有類型
# TypeScript-only Types

---

# tuple（元組類型）

元組類型就是當你確定數組中每個位置的資料型態（須按照順序），你就可以直接定義。數組資料中並不需要為一樣的類型（下圖為 string 跟 number）。

```typescript
tupleType: [string, number] = ['a', 1];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 tuple 與 array 的差異：array 所有元素類型相同；tuple 每個位置可有不同類型，且長度固定
</div>

---

# enum（枚舉類型）

枚舉類型又稱為列舉類型，當你需要設定一組固定的判斷值時可以使用它。  
例如：狀態有「成功」或「失敗」，成功為 1、失敗為 0。

```typescript
enum requestStatusCodes {
  error = 0,
  success = 1,
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 使用 enum 可以避免在程式中直接判斷 0 或 1 這種意義不明的數字，讓程式碼更易讀
</div>

---

# enum（枚舉類型）— 使用範例

宣告 enum 後，在程式中透過名稱來進行判斷：

```typescript
// 判斷成功
if (statusType == requestStatusCodes.success) {
  // 成功時的處理...
}

// 判斷失敗
else if (statusType == requestStatusCodes.error) {
  // 失敗時的處理...
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 特殊類型
# Special Types

---

# any（任意類型）

當你不確定欄位是什麼類型的時候，可以使用 `any` 類型。宣告為 `any` 之後，資料類型可以多次被改變。

```typescript
anyType: any = '12';
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b>雖然 <code>any</code> 很方便，但會失去 TypeScript 類型檢查的保護，實務上應盡量避免濫用
</div>

---

# null 和 undefined 類型

`null` 跟 `undefined` 就是所謂的空值。由於 Angular 新版本規定宣告的變數需要設定初始值，所以也沒辦法直接設定 `null` 或者 `undefined`。

現在你只能宣告這個變數的類型**包含** `null` 或是 `undefined`，表示這個變數可能是 number 或者 null 或者 undefined：

```typescript
nullType: number | null | undefined;
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 使用 <code>|</code> 符號可以宣告「聯合類型（Union Type）」，代表變數可接受多種類型
</div>

---

# Object（物件）

當你資料的最外框為 `{}` 時，我們就會稱它叫做物件。  
裡面通常會存放「鍵值對」，鍵（Key）建議是字串（需用 `"` 或 `'` 包起來），後面會放上對應的值。

```typescript
{
  "id": 101,
  "username": "Allen",
  "age": 18
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 在 TypeScript 中，物件的鍵（Key）在程式碼中通常不加引號；加引號的寫法常見於 JSON 格式
</div>

---
layout: end
---

# 數據類型完成
### 掌握類型，讓程式碼更安全！
