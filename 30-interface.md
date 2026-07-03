---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Interface
routeAlias: ch30
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
    Interface
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用介面定義物件的形狀，讓型別更安全」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，今天我們要來聊 TypeScript 裡一個很重要的角色：Interface（介面）。

我們寫程式的時候，常常會遇到一個問題：物件裡到底該有哪些屬性？少寫一個會不會出錯？這種「型別安全」的疑慮，正是 Interface 要解決的痛點。

學完這一章，我們會知道怎麼用 interface 定義物件的形狀，讓 TypeScript 幫我們把關，減少執行時才發現的低級錯誤。
-->

---
layout: default
---

# Outline

- **什麼是 Interface** — 介面的概念與生活比喻
- **基本語法** — 定義 interface 並套用到變數
- **可選屬性 `?`** — 讓屬性變成非必填
- **獨立 interface 檔案** — 將 interface 抽離為 `.ts` 檔並 import
- **Class implements Interface** — 讓 class 實作 interface
- **用 Angular CLI 產生 Interface** — `ng g i` 指令自動建檔
- **練習** — 建立巢狀資料的 interface

<!--
今天的大綱大概分成六個部分：先從概念講起，接著學基本語法、可選屬性，再來看怎麼把 interface 抽成獨立檔案管理，然後介紹 class 怎麼實作 interface，最後用一個練習把這些觀念串起來。

我們會按照這個順序一步步來，前面的觀念會是後面的基礎，所以大家跟緊一點。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Interface？
# What is an Interface?

<!--
先問大家一個問題：如果我們寫了一個函式，接收一個「使用者」物件，我們怎麼確定呼叫的人一定會傳對格式？少傳一個欄位、傳錯型別，這些問題很容易在專案變大之後爆出來。

這就是 Interface 要解決的問題，我們接下來就來看看它到底是什麼。
-->

---

# 什麼是 Interface？

interface（介面）定義了物件應具備的形狀（屬性與型別）。以臉部為例，臉部必須擁有眼睛、鼻子、嘴巴、耳朵。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>概念：</b> 建立物件時，TypeScript 會比對 interface 的定義，缺少任一必填屬性即視為不合法的物件。
</div>

<!--
我們可以把 interface 想成一張「規格表」，就像蓋房子前建築師畫的藍圖一樣，藍圖上寫明了這間房子一定要有幾個房間、幾扇窗戶，蓋出來的房子如果少了規定的房間，就不算合格。

interface 也是同樣道理：它定義物件應該長成什麼樣子，屬性有哪些、型別是什麼。這裡用臉部當例子，一張臉一定要有眼睛、鼻子、嘴巴、耳朵，缺一個就不是一張完整的臉。

實際在 TypeScript 裡，建立物件的時候，編譯器會拿這張「規格表」去比對，只要少了任何一個必填屬性，就會直接報錯，讓我們在寫程式的當下就發現問題，而不是等程式跑起來才出包。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Interface 基本語法
# Basic Syntax

<!--
了解 interface 的概念之後，我們來看看實際上怎麼用程式碼寫出一個 interface，以及怎麼把它套用到變數上。
-->

---
layout: two-cols
---

# Interface 基本語法

定義 `Person` interface，包含 `name` 與 `age` 兩個必填屬性。將變數型別指定為 `Person` 後，物件必須包含所有定義的屬性，缺少任一屬性 TypeScript 會報錯。

```typescript
interface Person {
  name: string;
  age: number
}

let personDate: Person = {
  name: '123',
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>錯誤說明：</b> 上方程式碼因為缺少 <code>age</code> 屬性，TypeScript 會報錯：「類型 '&#123; name: string; &#125;' 缺少屬性 'age'，但類型 'Person' 必須有該屬性。」
</div>

::right::

<div class="flex items-center justify-center h-full ml-6">
  <img src="/images/29-interface/ts-error.png" class="rounded shadow-md max-w-full" />
</div>

<!--
我們來看實際的寫法。左邊定義了一個 Person interface，規定物件一定要有 name（字串）跟 age（數字）兩個屬性。

接著我們宣告一個變數 personDate，型別標注為 Person，但物件裡只給了 name，沒有給 age。這時候 TypeScript 馬上就會報錯，右邊這張截圖就是編輯器實際跳出的錯誤訊息：「類型缺少屬性 age」。

⚠️ 這裡要提醒大家，interface 裡列出來的屬性，預設全部都是必填的，少寫一個都不行。這正是我們前面說的「規格表」概念在實際程式碼裡的體現，編輯器幫我們把關，不用等到執行時才發現漏東西。
-->

---
layout: default
---

# Interface 基本語法 — 小節練習

定義 `Product` interface，包含三個必填屬性，並建立一個符合此 interface 的物件：

- `id`：`number`
- `name`：`string`
- `price`：`number`

```typescript
interface Product {
  // 補完三個必填屬性
}

let laptop: Product = {
  id: 1,
  name: '筆記型電腦',
  price: 25000
};
```

<!--
考察 interface 屬性定義語法（屬性名: 型別）以及用 interface 標注變數型別的寫法。
-->

---
layout: default
---

# Interface 基本語法 — 小節練習解答

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

let laptop: Product = {
  id: 1,
  name: '筆記型電腦',
  price: 25000
};
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 物件若缺少任何必填屬性，TypeScript 在編輯器中立即報錯，不需等到執行時才發現問題——這就是 interface 的核心價值
</div>

<!--
試著把 price 從 laptop 物件中刪掉，看看 TypeScript 會出現什麼錯誤訊息。
-->

---

# 可選屬性 `?`

若某屬性不一定存在，可在屬性名稱後加上 `?` 標記為選填，TypeScript 不會要求物件必須包含此屬性。

```typescript
interface Person {
  name: string;
  age?: number
}

let personDate: Person = {
  name: '123',
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 在屬性名稱後加上 <code>?</code> 即代表該屬性為選填，物件可以不包含該屬性也不會報錯。
</div>

<!--
剛剛我們學到 interface 裡的屬性預設都是必填的，但實務上不一定每個屬性都用得到。舉例來說，填寫個人資料的時候，姓名一定要填，但年齡有些人不想公開，這種情況全部設成必填反而不合理。

這時候就可以用可選屬性，寫法很簡單，只要在屬性名稱後面加一個問號 `?`。像這裡的 age?，代表這個欄位可填可不填，物件裡沒有 age 也不會被 TypeScript 擋下來。

⚠️ 提醒大家一個容易搞混的地方：可選屬性不等於「型別可以是 undefined」，它的意思是這個屬性可以整個不存在。之後如果同學在物件裡真的塞了 age，還是要符合宣告的型別（這裡是 number），不能隨便塞字串進去。
-->

---

# 獨立 Interface 檔案

建議將 interface 抽離至獨立的 `.interface.ts` 檔案統一管理，需要使用時直接 import 即可。

```typescript
// src/api-result/api-result.interface.ts
export interface Person {
  name: string;
  age?: number;
  sex: string;
}
```

在其他檔案中使用：

```typescript
import { Person } from '../api-result/api-result.interface';
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>建議：</b> 將 interface 統一放在獨立的 <code>.interface.ts</code> 檔案中，方便管理與重用。
</div>

<!--
目前我們都把 interface 直接寫在同一個檔案裡，但實務上，同一個 interface 常常會被好幾個元件、好幾個服務拿去用。如果每個檔案都各自宣告一次，改一個屬性就要改十個地方，非常容易漏改。

業界的作法是把 interface 統一放到獨立的 .interface.ts 檔案裡管理，就像共用的規格書一樣，放在固定的地方，誰要用就直接 import 進來，維護起來輕鬆很多。

這裡示範把 Person interface 抽到 api-result.interface.ts，用 export 匯出，其他檔案就用 import { Person } from '路徑' 引入使用。同學之後在專案裡看到 .interface.ts 結尾的檔案，就知道那是專門放型別定義的地方。
-->

---

# Class implements Interface

使用 `implements` 關鍵字讓 class 實作 interface，class 必須宣告 interface 中定義的所有屬性與方法。

```typescript
interface testInterface {
  name: string;
  getName(): string;
}

export class AppComponent implements testInterface {
  name: string = '';

  getName(): string {
    return this.name;
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 使用 <code>implements</code> 關鍵字讓 class 實作 interface，class 必須包含 interface 中定義的所有屬性與方法。
</div>

<!--
前面我們用 interface 來規範「物件」的形狀，其實 interface 也可以拿來規範「class」。這就像簽一份合約，class 簽了這份合約（也就是 implements 這個 interface），就有義務把合約裡列的項目全部兌現。

寫法是在 class 名稱後面加上 implements 加 interface 名稱，這裡 AppComponent implements testInterface，testInterface 裡定義了 name 屬性跟 getName() 方法，所以 AppComponent 裡兩個都要真的寫出來，一個都不能少。

⚠️ 提醒大家，implements 檢查的是「必須要有」，不是「只能有」，class 裡面可以有 interface 沒規定的其他屬性或方法，但 interface 裡要求的項目一項都不能漏掉，不然編輯器馬上會報錯。
-->

---
layout: default
---

# Class implements Interface — 小節練習

定義 `Describable` interface（含 `name: string` 與 `describe(): string`），補完 `Book` class 讓它實作此 interface：

```typescript
interface Describable {
  name: string;
  describe(): string;
}

export class Book ___ Describable {
  name: string = '';

  describe(): string {
    // 回傳 '書名：' + this.name
  }
}
```

<!--
考察 implements 關鍵字的寫法，以及 class 必須實作 interface 所有屬性與方法的強制約束。
-->

---
layout: default
---

# Class implements Interface — 小節練習解答

```typescript
interface Describable {
  name: string;
  describe(): string;
}

export class Book implements Describable {
  name: string = '';

  describe(): string {
    return '書名：' + this.name;
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>implements</code> 讓 TypeScript 強制檢查：class 若缺少 interface 中任何屬性或方法，編輯器立即報錯，確保合約被完整履行
</div>

<!--
試著把 describe() 方法從 Book class 刪掉，TypeScript 會提示「屬性 describe 在類型 Book 中缺少，但在類型 Describable 中是必要的」。
-->

---

# 用 Angular CLI 產生 Interface

不用手動建檔，可以用 `ng generate interface`（簡寫 `ng g i`）自動產生：

```bash
ng g i api-result/api-result --type=interface
```

會產生 `src/app/api-result/api-result.interface.ts`：

```typescript
export interface ApiResult {
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 若省略 <code>--type=interface</code>，CLI 預設只會產生 <code>api-result.ts</code>（沒有 <code>.interface</code> 字樣），要維持命名慣例記得加上這個參數。
</div>

<!--
前面我們都是手動建立 .interface.ts 檔案，其實 Angular CLI 有提供指令幫我們自動產生，不用自己打檔名、打副檔名。

指令是 ng generate interface，簡寫 ng g i，後面接路徑跟檔名。這裡我們打 ng g i api-result/api-result，CLI 就會在 src/app/api-result 資料夾下建立一個檔案，裡面自動幫我們寫好 export interface 的骨架，內容是空的，交給我們自己填屬性。

⚠️ 這裡有個容易忽略的地方：CLI 預設產生的檔名是 api-result.ts，並不會自動加上 .interface 這個中綴。如果我們想維持「一看檔名就知道是 interface」的命名慣例，要加上 --type=interface 這個參數，CLI 才會產生 api-result.interface.ts。同學之後在專案裡想快速建立 interface，就可以用這個指令，比手動建檔案再自己打 export interface 快很多。
-->

---

# 練習：建立巢狀資料的 Interface
### 根據以下資料，建立對應的 interface。

```typescript
userArray = {
  userName: '玩家A',
  lev: 18,
  props: [
    {
      propsName: '蘑菇',
      amount: 5,
    },
    {
      propsName: '金幣',
      amount: 15,
    }
  ]
};
```

<!--
我們把前面學到的東西整合起來，做個綜合練習。這次的資料比較複雜，是一個「巢狀」結構：外層是使用者資料，裡面又包了一個道具陣列，陣列裡每個道具自己又是一個物件。

大家可以先想想看：這種「物件裡面包陣列，陣列裡面又是物件」的結構，是不是只需要一個 interface 就能搞定？還是需要拆成好幾個？想清楚這點，再動手寫寫看。
-->

---

# 練習：參考解答

```typescript
interface Props {
  propsName: string;
  amount: number;
}

interface UserArray {
  userName: string;
  lev: number;
  props: Props[];
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> <code>props</code> 是陣列，元素類型為另一個 interface <code>Props</code>，寫法為 <code>Props[]</code>。
</div>

<!--
解答的關鍵，是把巢狀結構拆成兩個 interface：一個 Props 描述陣列裡「單一道具」長什麼樣子，一個 UserArray 描述外層的使用者資料。

這就像我們前面說的規格表，一份大規格表裡如果包含另一份小規格表，直接把小規格表獨立出來、再拿去引用會更清楚。這裡 UserArray 裡的 props 屬性型別寫成 Props[]，代表「一個裝著 Props 型別物件的陣列」。

同學可以記住這個原則：物件裡如果包了陣列，且陣列裡的元素又是物件，就把陣列元素的形狀獨立成一個 interface，再用 陣列[] 的寫法引用它，結構會乾淨很多。
-->

---
layout: end
---

# 課程結束
### 善用 Interface，讓你的 TypeScript 程式更安全、更易維護

<!--
今天我們一起學了 interface：它怎麼定義物件的形狀、怎麼用可選屬性放寬限制、怎麼獨立成檔案方便管理，還有 class 怎麼用 implements 來實作它。

回頭看看，interface 其實就是幫我們的程式先立好規矩，寫程式的當下就能抓到型別不合的問題，不用等到上線才出包。

大家練習的時候，多留意巢狀結構怎麼拆 interface，這是實務上最常用到的技巧，也是今天的重點收穫。辛苦大家了，我們下一章見！
-->
