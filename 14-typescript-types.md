---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: TypeScript 數據類型
routeAlias: ch14
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

<!--
大家好！上堂課我們認識了 JavaScript，也知道了它的威力加強版叫 TypeScript。
這堂課，我們就要正式深入 TypeScript 的最核心武器——「數據類型（Data Types）」。
在程式的世界裡，變數就像是不同的「收納盒」。
有的盒子專門裝水果，有的盒子專門裝五金。
TypeScript 就是強迫你把每個盒子都貼上標籤，寫清楚它是裝什麼的。
這樣你寫扣的時候就不會把蘋果汁倒進裝螺絲釘的箱子裡，這能讓我們的程式碼變得無比安全！
-->

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

<!--
今天我們的學習清單一目了然：
我們除了會看最基本的布林、數字、字串三大天王之外，
還會解鎖更進階的陣列（Array），以及 TypeScript 獨有的元組（Tuple）與枚舉（Enum）。
最後，我們會聊聊讓人又愛又恨的 any、空值類型（null/undefined）以及最常用來封裝資料的 Object 物件。
東西有點多，但都很直覺，大家跟上喔！
-->

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

<!--
這張表格就是 TypeScript 常見的型別大軍。
相較於 JavaScript 那種放任不管的野路子，TypeScript 在宣告每個變數時，都需要在後面寫個冒號，加上指定的類型。
我們一個一個來看，看完你就知道怎麼使用它們了。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 基本類型
# Basic Types

<!--
首先，我們先從最簡單、每天都會用到的一般基本型別開始。
-->

---

# boolean（布林類型）

布林類型就是 `true` 跟 `false`，這個變數只能是 `true` 或 `false`，輸入其他的都會錯誤。

```typescript
booleanType: boolean = true;
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 布林類型常用於條件判斷，例如 <code>if (isLoggedIn)</code>、<code>isLoading: boolean = false</code>
</div>

<!--
第一個是 `boolean` 布林型別。
這傢伙是全世界最專一的變數，它這輩子只有兩種可能的值：不是 `true`（對/真）就是 `false`（錯/假）。
這就像是房間的電燈開關，不是開就是關，絕對沒有「有一點點亮」的中間值。
在專案中，我們超常用它來做條件判斷，像是 `isLoading: boolean = false`（代表現在有沒有在載入中？沒有）。
要是你想給布林變數塞一個數字 3 或是字串，TypeScript 就會立刻抓狂報錯！
-->

---

# number（數字類型）

跟 JavaScript 一樣，所有的數字都是浮點數。

```typescript
numberType: number = 3;
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 TypeScript 的 <code>number</code> 不區分整數與小數，<code>3</code> 與 <code>3.14</code> 都是合法的 <code>number</code>
</div>

<!--
第二個是 `number` 數字型別。
在 JS 和 TS 裡，數字是非常直覺的，不分什麼整數、浮點數。
不管是 `3` 還是帶小數點的 `3.14`，通通都塞進 `number` 這顆旋鈕。
寫代碼時就是簡單的 `numberType: number = 3;`。
-->

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

<!--
第三個是 `string` 字串型別。
任何中文字、英文字、標點符號，只要是文字數據，都要用這顆旋鈕。
寫的時候，記得文字外面一定要用雙引號 `"` 或是單引號 `'` 包起來。
這樣編譯器才知道這是你想顯示的「文字」，而不是某個變數名稱。
在實務上，我們也常用反單引號寫模板字串，可以在字串裡直接塞變數，非常好用。
-->

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

<!--
第四個是 `array` 陣列。
陣列就像是火車的車廂，裡面裝著一整列同型別的資料。
定義方式有兩種，最常見的是簡寫：型別後面加中括號，像是 `string[]`。
這代表「這個陣列車廂裡，裝的每一節車廂都是 string 字串」。
因為 TypeScript 檢查很嚴格，如果你定義了這是個字串陣列，半路卻想塞個數字 `1` 進去，它就會像偵測到違禁品一樣嗶嗶叫！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# TypeScript 特有類型
# TypeScript-only Types

<!--
接下來，我們要解鎖兩個 JavaScript 沒有、只有在 TypeScript 裡才能享用到的特有型別！
-->

---

# tuple（元組類型）

元組類型就是當你確定數組中每個位置的資料型態（須按照順序），你就可以直接定義。數組資料中並不需要為一樣的類型（下圖為 string 跟 number）。

```typescript
tupleType: [string, number] = ['a', 1];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 tuple 與 array 的差異：array 所有元素類型相同；tuple 每個位置可有不同類型，且長度固定
</div>

<!--
第一個特有型別叫 `tuple`，中文翻譯成「元組」。
它是個「嚴格限定長度和順序」的陣列。
剛剛學的 array，車廂長度是無限的，裝同型別就成。
但 tuple 就像是情侶座，只有兩個位子。
如果你定義 `[string, number] = ['a', 1];`。
這代表這個陣列長度「只能是二」，而且「第一個一定要是字串，第二個一定要是數字」。
順序不對、長度超標，通通都不行！這在處理特定配對資料時超級好用。
-->

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

<!--
第二個特有型別叫 `enum`（枚舉）。
這是我最推薦新手在寫商業邏輯時用到的武器！
想像一下，在資料庫裡，訂單狀態通常用數字表示：`0` 代表未付款、`1` 代表已付款、`2` 代表出貨中。
如果你在代碼裡直接寫 `if (status === 2)`，三個月後你再回來看，你一定會拍腦袋問自己：「這 `2` 到底是出貨中還是已付款啊？」
這就是所謂的「Magic Number（魔術數字）」，是不好的程式習慣。
而 `enum` 可以幫我們給這些冷冰冰的數字貼上人性化的標籤。
你看 code 裡定義了 `error = 0, success = 1`。
以後寫程式，你就可以直接用標籤來判斷！
-->

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

<!--
我們看這個使用範例。
在 if 判斷式裡，我們寫 `statusType == requestStatusCodes.success`。
這讀起來就跟英文一樣通順：「如果狀態等於請求成功的代碼，就進行處理」。
背後的編譯器會自動幫你翻譯成 `statusType == 1`。
這樣一來，既維持了代碼的高可讀性，又兼顧了效能，這就是工程師的體面！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 特殊類型
# Special Types

<!--
最後，我們要來聊聊幾個在寫程式時需要特別防範、或是具有魔性的特殊型別。
-->

---

# any（任意類型）

當你不確定欄位是什麼類型的時候，可以使用 `any` 類型。宣告為 `any` 之後，資料類型可以多次被改變。

```typescript
anyType: any = '12';
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b>雖然 <code>any</code> 很方便，但會失去 TypeScript 類型檢查的保護，實務上應盡量避免濫用
</div>

<!--
第一個是惡名昭彰的 `any`（任意型別）。
聽它的名字就知道，它就是「隨便你裝什麼都行」。
宣告成 `any` 之後，這個變數就失去了 TypeScript 的保護，你想塞字串、數字、物件，瀏覽器都不會管你。
這對剛從 JavaScript 轉過來的新手來說，簡稱「逃生艙」，遇到不會寫的型別就下一句 `any`，代碼就編譯通過了。
但在業界，**我們極度不推薦濫用 any**！
如果你把每個變數都寫 `any`，那你的 TypeScript 就形同虛設，跟寫 JavaScript 沒有兩樣。
這在工程師的術語裡，叫做寫出「AnyScript」，會被同事在心裡翻無數個白眼喔！
-->

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

<!--
第二個是 `null` 和 `undefined`，也就是所謂的空值，就像空置的空箱子。
在新版本的 Angular 專案設定中，基於嚴格模式，你宣告變數如果不給它初始值，編譯器就會立刻報錯，不讓你隨便留下一個 `undefined`。
那怎麼辦？
我們通常會使用 `|` 管道符號，這在程式裡代表「或（OR）」。
我們宣告 `number | null | undefined`。
這行指令代表：「我這個變數，可以是數字，也可以是 null，甚至可以是 undefined 喔！」
這在學術上叫「聯合型別（Union Type）」，是處理非必填資料或是 API 還沒回傳前的空值狀態時，非常標準的寫法。
-->

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

<!--
最後是 `Object` 物件。
當你的資料最外層用大括號 `{}` 包起來時，它就是個物件。
物件內部是以「Key-Value（鍵值對）」的形式來存放資料。
這就像是你的員工檔案，`"id": 101`、`"username": "Allen"`。
在真實的專案或是 API 資料傳遞時，百分之九十的資料都是包裝成物件格式。
搞懂了物件，你就能輕鬆掌控前後端串接的資料結構了！
-->

---
layout: end
---

# 數據類型完成
### 掌握類型，讓程式碼更安全！

<!--
恭喜大家！我們成功收服了 TypeScript 的數據類型大軍！
這些型別看起來像是一堆約束，但其實是你的安全防護網。
萬丈高樓平地起，有了這些型別作為裝備，
下一堂課，我們要開始學習在 TypeScript 裡怎麼用「變數（Variables）」來存放與宣告這些資料囉！大家下堂課見！
-->
