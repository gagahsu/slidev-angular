---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: "@switch 條件切換"
routeAlias: ch26
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
    @switch 條件切換
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用 case 取代 else if，讓多條件判斷更清晰」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是 switch case** — 條件判斷的另一種寫法，以 case 取代 else if
- **switch 語法結構** — switch、case、default、break 的組成
- **switch vs if 比較** — 兩種寫法的對照範例
- **case 與 break 說明** — case() 比對值、break 結束執行
- **switch 中使用運算式** — 在 switch() 內撰寫運算邏輯

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 switch case
# What is Switch Case

---

# 什麼是 switch case？

switch case 其實跟 if 一樣都是所謂的條件判斷，只是寫法跟 if 不太相同，如果在 if 中有多個條件我們通常會使用 `&&` 跟 `||` 或者 else if 還有 else 去做額外的判斷，switch 中就會使用 case 去做額外的判斷。

```typescript
switch (變數名稱或運算式) {
  case 符合數字或字元:
    陳述句一;
    break;
  case 符合數字或字元:
    陳述句二;
    break;
  default:
    陳述句三;
    break;
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>default</code> 相當於 if 中的 <code>else</code>，當所有 case 都不符合時執行。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# switch vs if 比較
# Switch vs If Comparison

---
layout: two-cols
---

# switch vs if 比較

假設我現在有個值，我需要判斷他的內容為 1 時要去打印出 1，為 2 時打應出 2，都不是就打印出 other。

**if 的寫法（左）vs switch 的寫法（右）**

兩邊的最終結果是一樣的，只是寫法不同。

::right::

```typescript
// if 寫法
if (this.testNum == 1) {
  console.log(1);
} else if (this.testNum == 2) {
  console.log(2);
} else {
  console.log('other');
}
```

```typescript
// switch 寫法
switch (this.testNum) {
  case(1):
    console.log(1);
    break;
  case(2):
    console.log(1);
    break;
  default:
    console.log('other');
    break;
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# case 與 break 說明
# Case and Break

---
layout: two-cols
---

# switch 的 case 與 break

這邊的 switch 是將 `this.testNum` 作為判斷的變數，當他的內容為 1 或者為 2 又或者其他的時候分別去執行 case 中的內容。

注意 `case()` 的 `()` 中寫的是當這個判斷的變數的值為你寫的內容時就會執行裡面的程式，並且在每個 case 程式結束之後要給他 `break` 告訴系統這段程式已經結束了。

::right::

```typescript
switch (this.testNum) {
  case(1):
    console.log(1);
    break;
  case(2):
    console.log(1);
    break;
  default:
    console.log('other');
    break;
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 每個 case 結尾必須加上 <code>break</code>，否則程式會繼續往下執行下一個 case（fall-through）。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# switch 中使用運算式
# Expression in Switch

---
layout: two-cols
---

# switch 中使用運算式

switch 中也可以寫運算去做判斷，不過主要因為他的寫法跟 if 差異蠻大的，所以各位在寫 switch 時要多注意「符號」跟「寫法」的差異。

::right::

```typescript
switch (this.testNum * 3) {
  case(1):
    console.log(1);
    break;
  case(2):
    console.log(1);
    break;
  default:
    console.log('other');
    break;
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>switch()</code> 括號內可以放入運算式，例如 <code>this.testNum * 3</code>，系統會先計算結果再與各 case 值比對。
</div>

---
layout: end
---

# 課程結束
### 熟悉 switch case，讓多條件判斷更整潔易讀
