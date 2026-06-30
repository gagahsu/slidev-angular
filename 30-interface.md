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

---
layout: default
---

# Outline

- **什麼是 Interface** — 介面的概念與生活比喻
- **基本語法** — 定義 interface 並套用到變數
- **可選屬性 `?`** — 讓屬性變成非必填
- **獨立 interface 檔案** — 將 interface 抽離為 `.ts` 檔並 import
- **Class implements Interface** — 讓 class 實作 interface
- **練習** — 建立巢狀資料的 interface

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Interface？
# What is an Interface?

---

# 什麼是 Interface？

interface（介面）定義了物件應具備的形狀（屬性與型別）。以臉部為例，臉部必須擁有眼睛、鼻子、嘴巴、耳朵。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>概念：</b> 建立物件時，TypeScript 會比對 interface 的定義，缺少任一必填屬性即視為不合法的物件。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Interface 基本語法
# Basic Syntax

---
layout: two-cols
---

# Interface 基本語法

定義 `Person` interface，包含 `name` 與 `age` 兩個必填屬性。將變數型別指定為 `Person` 後，物件必須包含所有定義的屬性，缺少任一屬性 TypeScript 會報錯。

```typescript
interface Person {
  name: string,
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
  name: string,
  age?: number
}

let personDate: Person = {
  name: '123',
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 在屬性名稱後加上 <code>?</code> 即代表該屬性為選填，物件可以不包含該屬性也不會報錯。
</div>

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

---
layout: end
---

# 課程結束
### 善用 Interface，讓你的 TypeScript 程式更安全、更易維護
