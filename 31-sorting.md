---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 資料排序
routeAlias: ch31
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
    資料排序
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用 sort() 讓資料依你的規則整齊排列」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **資料排序概念** — 為什麼需要在前端排序資料
- **未排序的問題** — 資料順序不符預期的情況
- **sort() 基本用法** — 使用陣列 sort() 方法排序
- **排序邏輯說明** — return -1 / 1 / 0 的意義
- **排序結果** — 排序後的資料呈現
- **切換排序欄位** — 依不同欄位（name、weight 等）排序
- **練習** — 將資料依重量排序並打印

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 資料排序概念
# Data Sorting

---

# 資料排序

後端回傳的資料順序不一定符合畫面需求，需在前端渲染前先行排序。

排序通常會需要一個值，可能是數字（id）或者文字：

- **數字**：由小到大或者由大到小
- **文字**：判斷第一個文字由 A > Z 或者 Z > A
- **中文**：無法直接排序，除非自己寫額外的方法去做排序跟判斷

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 中文排序需要自行實作額外的比對方法，JavaScript 預設的 sort() 無法正確處理中文字串順序。
</div>

---

# 未排序的問題

以下資料未排序，直接用 `@for` 渲染時，第一筆會是 position 10 的 Neon。

```typescript
let ELEMENT_DATA: PeriodicElement[] = [
  {position: 10, name: 'Neon',      weight: 20.1797, symbol: 'Ne'},
  {position: 1,  name: 'Hydrogen',  weight: 1.0079,  symbol: 'H'},
  {position: 2,  name: 'Helium',    weight: 4.0026,  symbol: 'He'},
  {position: 3,  name: 'Lithium',   weight: 6.941,   symbol: 'Li'},
  {position: 4,  name: 'Beryllium', weight: 9.0122,  symbol: 'Be'},
  {position: 5,  name: 'Boron',     weight: 10.811,  symbol: 'B'},
  {position: 6,  name: 'Carbon',    weight: 12.0107, symbol: 'C'},
  {position: 7,  name: 'Nitrogen',  weight: 14.0067, symbol: 'N'},
  {position: 8,  name: 'Oxygen',    weight: 15.9994, symbol: 'O'},
  {position: 9,  name: 'Fluorine',  weight: 18.9984, symbol: 'F'},
];
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 後端資料的順序不一定符合畫面需求，需要在前端進行排序處理。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# sort() 排序方法
# Array sort()

---

# sort() 基本用法

`sort()` 是陣列的原生方法，接受一個比較函式，依序比較相鄰兩個元素直到排序完成。以下範例以 `position` 為排序依據。

```typescript
this.dataSource.data.sort(function (a, b) {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
});
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> sort() 是陣列的原生方法，會直接修改原始陣列並回傳排序後的結果。
</div>

---

# 排序邏輯說明

比較函式接收 `a`、`b` 兩個元素：回傳負數時 a 排在 b 前，回傳正數時 b 排在 a 前，回傳 0 時順序不變。

```typescript
this.dataSource.data.sort(function (a, b) {
  if (a.position < b.position) {
    return -1;  // a 排在 b 前面
  }
  if (a.position > b.position) {
    return 1;   // b 排在 a 前面
  }
  return 0;     // 順序不變
});
```

| 回傳值 | 意義 |
|--------|------|
| `-1`（負數） | a 排在 b 前面（升冪） |
| `1`（正數） | b 排在 a 前面 |
| `0` | 兩者相等，順序不變 |

---

# 排序結果

排序後結果如下：

```typescript
// 排序後的陣列（依 position 升冪）
[
  // 0: {position: 1,  name: 'Hydrogen',  weight: 1.0079,  symbol: 'H'}
  // 1: {position: 2,  name: 'Helium',    weight: 4.0026,  symbol: 'He'}
  // 2: {position: 3,  name: 'Lithium',   weight: 6.941,   symbol: 'Li'}
  // 3: {position: 4,  name: 'Beryllium', weight: 9.0122,  symbol: 'Be'}
  // 4: {position: 5,  name: 'Boron',     weight: 10.811,  symbol: 'B'}
  // 5: {position: 6,  name: 'Carbon',    weight: 12.0107, symbol: 'C'}
  // 6: {position: 7,  name: 'Nitrogen',  weight: 14.0067, symbol: 'N'}
  // 7: {position: 8,  name: 'Oxygen',    weight: 15.9994, symbol: 'O'}
  // 8: {position: 9,  name: 'Fluorine',  weight: 18.9984, symbol: 'F'}
  // 9: {position: 10, name: 'Neon',      weight: 20.1797, symbol: 'Ne'}
]
```

Neon（position: 10）移到最後，資料已依 position 升冪排列。

---

# 切換排序欄位

將比較函式中的欄位名稱替換即可切換排序依據，以下改為依 `name` 排序：

```typescript
this.dataSource.data.sort(function (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 文字比較時，JavaScript 會依字母的 Unicode 碼點順序排列，英文字母排序（A → Z）可正常運作。
</div>

---

# 練習：資料排序
### 將下方的資料用重量排序並且打印出來

1. 宣告 `ELEMENT_DATA` 陣列（資料如下）
2. 使用 `sort()` 方法，以 `weight` 欄位作為排序依據
3. 排序完成後將結果 `console.log` 打印出來
4. 確認第一筆為重量最小的元素（Hydrogen，weight: 1.0079）

```typescript
ELEMENT_DATA = [
  {position: 10, name: 'Neon',      weight: 20.1797, symbol: 'Ne'},
  {position: 1,  name: 'Hydrogen',  weight: 1.0079,  symbol: 'H'},
  {position: 2,  name: 'Helium',    weight: 4.0026,  symbol: 'He'},
  {position: 3,  name: 'Lithium',   weight: 6.941,   symbol: 'Li'},
  {position: 4,  name: 'Beryllium', weight: 9.0122,  symbol: 'Be'},
  {position: 5,  name: 'Boron',     weight: 10.811,  symbol: 'B'},
  {position: 6,  name: 'Carbon',    weight: 12.0107, symbol: 'C'},
  {position: 7,  name: 'Nitrogen',  weight: 14.0067, symbol: 'N'},
  {position: 8,  name: 'Oxygen',    weight: 15.9994, symbol: 'O'},
  {position: 9,  name: 'Fluorine',  weight: 18.9984, symbol: 'F'},
]
```

---
layout: end
---

# 課程結束
### 善用 sort()，讓資料順序完全掌握在你手中
