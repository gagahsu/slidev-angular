---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 綜合實作練習 Ch1–Ch17
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
  .index-table td {
    text-align: center;
    font-family: monospace;
  }
---

<div class="flex flex-col justify-center items-center h-full" style="background: #ffffff;">
  <p style="color: #5eada0; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.2rem;">
    Angular Full-Stack Masterclass
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.2rem; font-weight: 900; line-height: 1.2; margin-bottom: 1.5rem;">
    綜合實作練習<br>Ch1 – Ch17
  </h1>
  <div style="height: 4px; width: 380px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.1rem; font-style: italic; margin-bottom: 0.5rem;">
    「四個完整頁面，從骨架到靈魂一次打造」
  </p>
  <p style="color: #9dc4c4; font-size: 0.95rem;">預估時間：4 – 6 小時</p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 1.5rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
這四個專案題是真正的整頁實作，不是填空練習。
每一題你都需要從空白檔案開始，把 HTML 結構、CSS 樣式和 TypeScript 邏輯全部整合在一起。
本次練習只使用 CH9–CH17 已教過的技術：HTML 標籤、CSS 基礎、Flexbox、Position、TypeScript 型別、變數、方法、if 判斷、陣列函數、for 迴圈。
-->

---
layout: default
---

# 四大實作專案總覽

| 題號 | 專案名稱 | 主要技術 | 預估時間 |
|---|---|---|---|
| **P1** | 個人履歷頁 | Flexbox 雙欄、技能等級判斷（if/else）、工作時間軸 | 1.5 hr |
| **P2** | 電商產品展示頁 | Flexbox flex-wrap 商品格、Navbar badge 定位、分類篩選 | 1.5 hr |
| **P3** | 學習進度儀表板 | Flexbox 統計卡片、資料統計計算、課程記錄顯示 | 1.5 hr |
| **P4** | 餐廳菜單點餐頁 | 固定 header、左右 Flexbox 分欄、分類切換、即時計算 | 1.5 hr |

<div class="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 text-gray-700 text-sm text-left">
⚠️ 每一題請用 <code>ng g c &lt;名稱&gt;</code> 建立新 component，不要直接複製解答。<br>
建議順序：<code>ng g c</code> 建立 → 在 <code>app.routes.ts</code> 加 route → 看畫面需求 → 自己動手 → 卡住再看提示 → 完成後對照解答
</div>

<!--
本次練習的 CSS 只使用 CH9–CH12 教過的技術：
- Flexbox（display: flex, flex-wrap, justify-content, align-items, gap, flex: 1）
- Position（position: fixed / relative / absolute, z-index）
- 基礎屬性（border-radius, box-shadow, transition, :hover, :active）
不使用：CSS 變數（--var）、@keyframes 動畫、display: grid、position: sticky、transform
-->

---
layout: default
---

# CSS 技術前導 — CSS 變數（Custom Properties）

CSS 變數用 `--名稱` 宣告，用 `var(--名稱)` 取用，可在 HTML 透過 `style` 動態傳入不同值：

```css
/* 宣告與使用 */
.fill {
  width: var(--target);   /* 從外部傳入目標寬度 */
  background: var(--bar-color, #5eada0);  /* 第二個參數為預設值 */
}
```

```html
<!-- 在 HTML 元素的 style 直接傳入不同值 -->
<div class="fill" style="--target: 90%; animation-delay: 0.2s"></div>
<div class="fill" style="--target: 65%; animation-delay: 0.4s"></div>
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 CSS 變數的作用域是該元素及其子元素；寫在 <code>:root</code> 則全域可用
</div>

<!--
CSS 變數是 P1 技能進度條的核心技術。`--target` 讓我們在 HTML 就能決定進度條的寬度，不需要在 TypeScript 動態計算再用 style binding 傳入。特別提醒同學，`var(--bar-color, #5eada0)` 的第二個參數是預設值——外部沒有傳入 `--bar-color` 時才生效，這種「有值用傳入的、沒值用預設的」邏輯在實際工作中非常實用。
-->

---
layout: default
---

# CSS 技術前導 — @keyframes 動畫

`@keyframes` 定義動畫的「起點 → 終點」，搭配 `animation` 屬性套用：

```css
/* 定義動畫：從 width: 0 長到 var(--target) */
@keyframes growBar {
  from { width: 0; }
  to   { width: var(--target); }
}

.fill {
  width: 0;
  animation: growBar 1.2s ease forwards;
  /*         名稱    時間  速度  結束後保持最終狀態 */
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>forwards</code> 讓動畫結束後停在最後一格；<code>animation-delay</code> 可錯開多個元素的起始時間
</div>

<!--
`@keyframes` 定義的是「動畫的劇本」，告訴瀏覽器從什麼狀態變到什麼狀態。`animation: growBar 1.2s ease forwards` 這五個值要一起記：動畫名稱、持續時間、速度曲線、結束後的行為。`forwards` 非常關鍵——沒有它，動畫結束後元素會跳回初始狀態，進度條會瞬間縮回去。可以讓同學把 `forwards` 拿掉，觀察動畫結束後的差異。
-->

---
layout: default
---

# CSS 技術前導 — CSS Grid

`display: grid` + `grid-template-columns` 定義欄數，`gap` 控制間距：

```css
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.menu-grid    { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
```

<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.8rem;">
  <div>
    <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.3rem;"><code>repeat(4, 1fr)</code>：均分 4 欄（P2 商品格）</div>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; border: 2px solid #888; padding: 6px;">
      <div style="background:#93c5fd;height:36px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;">商品 1</div>
      <div style="background:#fca5a5;height:36px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;">商品 2</div>
      <div style="background:#86efac;height:36px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;">商品 3</div>
      <div style="background:#fde68a;height:36px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;">商品 4</div>
    </div>
  </div>
  <div>
    <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.3rem;"><code>repeat(2, 1fr)</code>：均分 2 欄（P4 菜單格）</div>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; border: 2px solid #888; padding: 6px;">
      <div style="background:#93c5fd;height:36px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;">菜單 A</div>
      <div style="background:#fca5a5;height:36px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;">菜單 B</div>
      <div style="background:#86efac;height:36px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;">菜單 C</div>
      <div style="background:#fde68a;height:36px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;">菜單 D</div>
    </div>
  </div>
</div>

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>1fr</code> 代表「1 份剩餘空間」；<code>repeat(N, 1fr)</code> 等同於平均分成 N 欄；<code>gap</code> 同時控制欄距與列距
</div>

<!--
Grid 是今天首次登場的排版系統，和 Flexbox 的核心差異是：Flexbox 排一個方向（橫或直），Grid 同時定義欄和列。`repeat(4, 1fr)` 是「把空間平均分成 4 份」，不需要自己算百分比。可以指著圖示問同學「如果想變成 3 欄，要怎麼改？」——答案只要把數字改成 3 就好，這就是 Grid 的直覺性。P2 和 P4 都會用到，現在先建立「Grid = 格子」的直覺。
-->

---
layout: default
---

# CSS 技術前導 — transform 位移與縮放

`transform` 讓元素在不影響排版的情況下移動、旋轉或縮放，常搭配 `:hover` + `transition` 做互動效果：

```css
/* translateX / translateY：X 軸 / Y 軸位移 */
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-6px);   /* 向上浮起 6px */
}

/* 組合多個效果 */
.timeline-dot:hover {
  transform: translateX(4px) scale(1.05);
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>transform</code> 不會擠壓周圍元素；<code>translateY(-6px)</code> 負值 = 往上，正值 = 往下
</div>

<!--
transform 是做 hover 浮起動畫的標準技法。用 translateY(-6px) 讓卡片向上浮起，搭配 transition: transform 0.3s 讓它慢慢移動而不是瞬間跳。和 top/left 不同，transform 不影響其他元素的位置，也不會觸發重排，效能更好。
-->

---
layout: default
---

# CSS 技術前導 — ::before 偽元素

`::before` 在元素「前面」插入一個虛擬子元素，常用來做裝飾線、圖標或遮罩，不需要多寫 HTML 標籤：

```css
/* 時間軸垂直線：在 .timeline 前插入一條線 */
.timeline {
  position: relative;
}
.timeline::before {
  content: '';           /* 必填，空字串也要寫 */
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #5eada0;
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>content: ''</code> 是必填屬性，沒有它 <code>::before</code> 不會出現；父元素需設 <code>position: relative</code>
</div>

<!--
::before 是 CSS 裡的隱形子元素。你不用在 HTML 多寫一個 div，CSS 就能幫你插入一條垂直線。重點有三個：第一，content 一定要寫，哪怕是空字串；第二，要讓它可以自由定位，它自己要設 position: absolute，父元素要設 position: relative；第三，用 top: 0; bottom: 0 讓它撐滿父元素的高度。
-->

---
layout: default
---

# CSS 技術前導 — calc() 混合單位計算

`calc()` 允許在 CSS 屬性值中做數學運算，最大用途是**混合不同單位**（如 px + %）：

```css
/* 固定 header 64px + 分類列 48px，內容區從這高度開始 */
.category-bar {
  position: sticky;
  top: calc(64px + 0px);   /* Navbar 高度 */
}

.content-area {
  top: calc(64px + 48px);  /* Navbar + 分類列 */
}

/* 兩欄間距 20px，左欄寬度 = 整體寬 30% 再減間距 */
.sidebar {
  width: calc(30% - 10px);  /* % - px 混合單位 */
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 運算子（<code>+</code> <code>-</code> <code>*</code> <code>/</code>）<b>前後必須有空格</b>，否則部分瀏覽器無法解析
</div>

<!--
calc 最常見的用途就是混合 px 和 %。純 CSS 沒辦法說「我要整個寬度的 30% 然後再扣掉 10px 的間距」，但 calc 可以。在 P4 的三層定位中，分類列吸附在 Navbar 下方，所以 top 值 = Navbar 高度 + 分類列高度，這種情況就要用 calc(64px + 48px)。
-->

---
layout: default
---

# CSS 技術前導 — linear-gradient() 漸層背景

`linear-gradient()` 建立線性漸層，可替代純色背景，做出質感更豐富的橫幅或按鈕：

```css
/* 角度 → 色票列表 */
.hero-banner {
  background: linear-gradient(
    135deg,
    #1a5c5c 0%,
    #5eada0 100%
  );
}

/* 多色漸層 */
.gradient-bar {
  background: linear-gradient(
    90deg,
    #5eada0 0%,
    #a7d9d0 50%,
    #ffffff 100%
  );
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 角度 <code>0deg</code> = 由下往上，<code>90deg</code> = 由左往右，<code>135deg</code> = 左上到右下
</div>

<!--
linear-gradient 是 CSS 的漸層函數，不需要圖片就能做出漂亮的背景。第一個參數是角度，決定漸層方向。後面接色票列表，每個色票格式是「顏色 + 百分比位置」。在 P2 的 Hero 橫幅，我們用 135deg 從深色到淺色做出立體感。
-->

---
layout: default
---

# TypeScript 技術前導 — interface 介面

`interface` 定義物件的「形狀」（有哪些欄位、各是什麼型別），讓 TypeScript 在編譯時驗證資料結構：

```typescript
// 定義商品的資料結構
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// 定義購物車項目（在 Product 基礎上加 quantity）
interface CartItem {
  product: Product;
  quantity: number;
}

// 使用 interface 宣告陣列型別
products: Product[] = [];
cart: CartItem[] = [];
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>interface</code> 只存在於編譯階段，不會編譯進 JavaScript；欄位後加 <code>?</code> 代表可選
</div>

<!--
interface 是 TypeScript 最重要的功能之一。它就像是一份「資料合約書」，規定這個物件一定要有哪些欄位。當你宣告 products: Product[]，TypeScript 就知道這個陣列裡每一個物件都必須有 id、name、price、image 四個欄位，少一個就報錯。在 P2 到 P4，每一個 project 都需要先定義 interface，再宣告陣列變數。
-->

---
layout: default
---

# TypeScript 技術前導 — Array.find()

`Array.find()` 回傳陣列中**第一個符合條件的元素**，找不到時回傳 `undefined`：

```typescript
// 找到購物車中 id 相符的項目
const existing = this.cart.find(
  item => item.product.id === product.id
);

if (existing) {
  existing.quantity += 1;       // 找到了：數量加一
} else {
  this.cart.push({ product, quantity: 1 }); // 沒找到：新增
}
```

**畫面互動：** 點擊「加入購物車」按鈕 → `addToCart()` 呼叫此方法，判斷商品是否已在購物車中

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>find()</code> 找到就回傳元素本身（可直接修改）；<code>filter()</code> 回傳所有符合的新陣列
</div>

<!--
find 和 filter 的差別在於：filter 把所有符合條件的項目抓出來，組成新陣列；find 只找第一個符合的，直接回傳那個元素本身。在購物車邏輯中，我們用 find 找到已存在的項目，然後直接 existing.quantity += 1 修改它，不需要另外 splice 再 push。
-->

---
layout: default
---

# TypeScript 技術前導 — Array.sort()（1/2）

`Array.sort()` 就地排序陣列，需傳入**比較函數**決定排序方向：

```typescript
// 比較函數規則：
// 回傳負數 → a 排前面
// 回傳正數 → b 排前面
// 回傳 0   → 相等，不移動

// 數字排序（小 → 大）
const nums = [3, 1, 2];
nums.sort((a, b) => a - b);   // → [1, 2, 3]

// 數字排序（大 → 小）
nums.sort((a, b) => b - a);   // → [3, 2, 1]

// 字串不能直接相減，要用 localeCompare()
// b.localeCompare(a) → b 排前面（新日期優先）
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>sort()</code> 直接修改原陣列；若要保留原始資料，先用 <code>[...arr]</code> 複製再排序
</div>

<!--
sort 的回呼函數接收兩個比較元素 a 和 b。回傳負數代表 a 排前面，正數代表 b 排前面，0 代表相等。數字可以直接 a - b，但字串不能相減，需要用 localeCompare。sort 會直接修改原陣列，如果你不想動到原始資料，一定要先複製一份。
-->

---
layout: default
---

# TypeScript 技術前導 — Array.sort() + localeCompare()（2/2）

字串排序用 `localeCompare()`；複製陣列用 spread `[...]` 避免修改原始資料：

```typescript
// 日期字串排序（新 → 舊），不改動原始 records
getSortedByDate(): CourseRecord[] {
  return [...this.records].sort((a, b) =>
    b.date.localeCompare(a.date)
    // b 在前 → 較大（較新）的日期排前面
  );
}

// localeCompare 回傳值：
// 'b' > 'a' → 正數（b 排前）
// 'a' > 'b' → 負數（a 排前）
// 相等       → 0
```

**畫面互動：** P3 儀表板點擊「依日期排序」→ 呼叫 `getSortedByDate()`，課程列表重新排列

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 日期格式 <code>'2024-03-15'</code> 可直接用 <code>localeCompare</code> 比較，字典序即為時間順序
</div>

<!--
localeCompare 回傳正數、負數或 0，跟 sort 的比較函數邏輯完美契合。日期字串只要格式統一（YYYY-MM-DD），字典序就等於時間順序，所以可以直接用 localeCompare 排序。b.date.localeCompare(a.date) 代表「b 排在 a 前面」，也就是較新的日期在前。
-->

---
layout: default
---

# TypeScript 技術前導 — Math.round()（1/3）

`Math.round()` 將小數四捨五入為整數，常用於計算百分比：

```typescript
// 基本用法
Math.round(4.4)   // → 4
Math.round(4.5)   // → 5
Math.round(4.6)   // → 5

// P3：計算課程完成率
getCompletionRate(): number {
  const completed = this.records
    .filter(r => r.status === 'completed').length;
  return Math.round(
    (completed / this.records.length) * 100
  );
  // completed=7, total=10 → 7/10*100 = 70.0 → 70
  // completed=2, total=3  → 2/3*100  = 66.6… → 67
}
```

**畫面互動：** HTML 用 `{{ getCompletionRate() }}%` 即時顯示完成百分比

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>Math.floor()</code> 無條件捨去；<code>Math.ceil()</code> 無條件進位；<code>Math.round()</code> 四捨五入
</div>

<!--
Math.round 把計算結果從小數變成整數，讓百分比看起來更清楚。completed / total * 100 可能算出 66.666...，用 Math.round 變成 67。在 P3 的儀表板頁面，這個方法直接透過 {{ getCompletionRate() }}% 綁定到 HTML，每次資料更新 Angular 就會重新計算。
-->

---
layout: default
---

# TypeScript 技術前導 — spread 複製陣列（2/3）

`[...arr]` 把陣列「展開」成新陣列，和原陣列完全獨立：

```typescript
const nums = [3, 1, 2];

// ❌ sort() 會直接修改原陣列
nums.sort((a, b) => a - b);
console.log(nums);   // [1, 2, 3]  ← nums 本身被改掉了！

// ✅ spread 先複製，再對副本排序
const sorted = [...nums].sort((a, b) => a - b);
console.log(nums);   // [3, 1, 2]  ← 原陣列不變
console.log(sorted); // [1, 2, 3]  ← 副本已排序
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>[...arr]</code> 是「淺複製」：陣列本身是全新的，但陣列裡的物件仍指向同一份參考
</div>

<!--
spread 複製陣列的原理是把陣列裡每個元素展開，放進新的 [] 中，所以 sorted 和 nums 是完全獨立的兩個陣列。sort 是就地修改，所以沒有 spread 的版本會直接改掉原始陣列，這在 Angular 的資料管理中很危險——畫面可能因為資料被改掉而出現預期外的排序行為。
-->

---
layout: default
---

# TypeScript 技術前導 — spread 複製陣列（3/3）

在 P3 中，`getSortedByDate()` 用 spread 保護原始資料，排序後回傳新陣列：

```typescript
// ❌ 錯誤：直接 sort records，原始資料被破壞
getSortedByDate(): CourseRecord[] {
  return this.records.sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

// ✅ 正確：先複製再排序，原始 records 不變
getSortedByDate(): CourseRecord[] {
  return [...this.records].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}
```

**畫面互動：** P3 點擊「依日期排序」按鈕 → 呼叫 `getSortedByDate()`，將回傳的新陣列賦值給顯示用變數

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 spread 其他常見用途：<code>const copy = [...arr]</code> 複製、<code>[...a, ...b]</code> 合併兩個陣列
</div>

<!--
這頁把前一頁的概念直接套到 P3 的實際程式碼上。getSortedByDate 如果直接 sort this.records，原始的 records 陣列就被改掉了，之後想算「未排序的完成率」或是恢復原始順序都會出問題。用 spread 複製一份，就能讓原始資料和排序結果各自獨立存在。
-->

---
layout: default
---

# TypeScript 技術前導 — *ngFor 迴圈渲染

`*ngFor` 把陣列每個元素渲染成一個 HTML 區塊，取代手動複製多份標籤：

```html
<!-- skills 有幾筆，就自動產生幾個 <div> -->
<div *ngFor="let skill of skills" class="skill-item">
  <span>{{ skill.name }}</span>
  <span>{{ getSkillLevel(skill.percent) }}</span>
</div>

<!-- 搭配 [class] 與 (click) 傳入當前元素 -->
<button *ngFor="let cat of categories"
  [class.active]="cat === activeCategory"
  (click)="setCategory(cat)">
  {{ cat }}
</button>
```

**畫面互動：** 陣列有幾筆資料，畫面就自動產生幾個區塊；陣列更新後畫面即時同步

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>let skill of skills</code>：<code>skill</code> 是每次迭代的當前元素，名稱可自訂；<code>skills</code> 是 TypeScript 中宣告的陣列屬性
</div>

<!--
*ngFor 是 Angular 的結構型指令，用來動態產生重複的 HTML 區塊。最常見的場景是：有一個 TypeScript 陣列，把它的每個元素渲染成一張卡片或一個列表項。語法是 *ngFor="let 元素名 of 陣列名"，接著在內部用 {{ 元素名.屬性 }} 取值。搭配 (click)="method(元素名)" 就能把當前元素傳給 TypeScript 方法處理。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">📄</div>

# P1 — 個人履歷頁
### Personal Resume Page

**預估時間：1.5 小時**

<!--
P1 是四題中最適合暖身的一題，因為只有 CSS 雙欄排版和 TypeScript 純邏輯計算，沒有複雜的互動事件。可以先讓同學看一下下一頁的畫面需求，想想「如果是我，我會從哪裡開始？」再帶入架構說明。這題的核心概念是「固定寬度側欄 + 自適應主欄」，這個雙欄排版在實際工作中非常常見。
-->

---
layout: default
---

# P1：畫面需求

<div style="display: flex; gap: 0; border: 2px solid #5eada0; border-radius: 8px; overflow: hidden; font-size: 0.88em;">
  <div style="width: 160px; background: #1a5c5c; color: white; padding: 16px; flex-shrink: 0;">
    <div style="width:60px;height:60px;border-radius:50%;background:#5eada0;border:2px solid white;margin:0 auto 8px;display:flex;align-items:center;justify-content:center;">王</div>
    <div style="text-align:center;margin-bottom:12px;">王小明<br><span style="color:#a7d9d0;font-size:0.85em;">前端工程師</span></div>
    <div style="font-size:0.8em;color:#a7d9d0;">📧 聯絡資訊</div>
    <div style="margin-top:8px;font-size:0.78em;">
      <div>HTML</div>
      <div style="background:rgba(255,255,255,0.15);border-radius:3px;height:6px;margin:2px 0 6px;overflow:hidden;"><div style="background:#5eada0;width:90%;height:100%;"></div></div>
      <div>CSS</div>
      <div style="background:rgba(255,255,255,0.15);border-radius:3px;height:6px;margin:2px 0 6px;overflow:hidden;"><div style="background:#5eada0;width:80%;height:100%;"></div></div>
      <div>TypeScript</div>
      <div style="background:rgba(255,255,255,0.15);border-radius:3px;height:6px;margin:2px 0;overflow:hidden;"><div style="background:#5eada0;width:65%;height:100%;"></div></div>
    </div>
  </div>
  <div style="flex:1; padding: 16px; background: #f8fffe;">
    <div style="font-weight:700;color:#1a5c5c;border-bottom:2px solid #5eada0;margin-bottom:8px;">關於我</div>
    <div style="font-size:0.85em;color:#666;margin-bottom:12px;">熱愛前端開發，喜歡把設計稿變成網頁...</div>
    <div style="font-weight:700;color:#1a5c5c;border-bottom:2px solid #5eada0;margin-bottom:8px;">工作經歷</div>
    <div style="font-size:0.82em;padding-left:16px;border-left:2px solid #c8e6e3;">
      <div style="margin-bottom:6px;">● 2023 ~ 現在｜科技股份有限公司</div>
      <div>● 2021 ~ 2023｜網路新創公司</div>
    </div>
  </div>
</div>

- **左欄（固定 280px）**：深色背景、頭像圓形、聯絡資訊、技能等級標籤
- **右欄（flex: 1）**：關於我、工作時間軸（左側有圓點）、學歷

<!--
帶同學看線框圖的左欄（深色背景 + 技能等級 tag）和右欄（時間軸）兩個區域的結構差異。左欄 `width: 280px; flex-shrink: 0` 固定寬度不讓它縮小，右欄 `flex: 1` 自動填滿剩餘空間——這個「固定欄 + 自適應欄」的組合在實際工作的側邊欄布局中非常常見。技能 tag 的顏色不是寫死的，是靠 TypeScript 的 getSkillLevel() 決定的。
-->

---
layout: default
---

# P1：需要完成的 CSS 效果（1/2）

**① 整體雙欄排版**
- `.resume`：`display: flex`，`min-height: 100vh`
- 左欄 `.sidebar`：`width: 280px`，`background: #1a5c5c`，`flex-shrink: 0`
- 右欄 `.content`：`flex: 1`，`background: #f8fffe`

**② 頭像**
- `border-radius: 50%`，寬高 `120px`，白色邊框 `border: 4px solid white`
- `display: flex; align-items: center; justify-content: center`（讓文字置中）

**③ 技能等級標籤**
- `.skill-item`：`display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px`
- `.skill-tag`：`border-radius: 4px; padding: 2px 8px; font-size: 0.8em; font-weight: 600`
- 熟練（percent ≥ 80）：`background: #5eada0; color: white`
- 進階（percent ≥ 60）：`background: #a7d9d0; color: #1a5c5c`
- 初學（其他）：`background: rgba(255,255,255,0.2); color: white`

<!--
建議同學先把 .resume 的 display: flex 寫好確認雙欄成立，再依序完成頭像和 skill-tag。技能 tag 的三個顏色狀態不是在 CSS 裡做 if 判斷——CSS 不能判斷百分比數值。判斷邏輯在 TypeScript 的 getSkillLevel() 方法裡，依據 percent 決定要加哪個 CSS class，CSS 只負責定義各 class 對應的樣式。
-->

---
layout: default
---

# P1：需要完成的 CSS 效果（2/2）

**④ 工作時間軸**
- 容器 `.timeline`：`position: relative; padding-left: 32px`
- 垂直線 `.timeline-line`：`position: absolute; left: 8px; top: 0; bottom: 0; width: 2px; background: #c8e6e3`
- 每項 `.timeline-item`：`position: relative; margin-bottom: 16px`
- 圓點 `.timeline-dot`：`position: absolute; left: -28px; top: 6px; width: 14px; height: 14px; border-radius: 50%; background: #5eada0`

**⑤ hover 效果**
- `.timeline-card:hover`：`background: #f0faf9; transition: background 0.2s`
- 技能條 hover 可以加深底色：`transition: background 0.2s`

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 時間軸垂直線用實際的 <code>&lt;div class="timeline-line"&gt;&lt;/div&gt;</code> 元素製作，不使用 <code>::before</code> 偽元素
</div>

<!--
時間軸的製作有兩個關鍵：.timeline 用 padding-left 留出圓點和垂直線的空間，.timeline-line 再用 position: absolute 貼在左側。要特別提醒同學，圓點 .timeline-dot 的 left: -28px 是負值，代表「往容器左邊延伸」，讓圓點能落在 padding 區域裡、蓋在垂直線上方。可以讓同學試著把 padding-left 拿掉，觀察圓點和線條消失或跑版的情況。
-->

---
layout: default
---

# P1：需要完成的 TypeScript 邏輯（1/2）

**① 技能資料陣列**

```typescript
skills: { name: string; percent: number }[] = [
  { name: 'HTML', percent: 90 },
  { name: 'CSS',  percent: 80 },
  { name: 'TypeScript', percent: 65 },
  { name: 'Angular', percent: 55 },
];
```

**② 工作經歷陣列**（end 為 null 代表目前在職）

```typescript
experiences: {
  company: string; title: string;
  start: number; end: number | null;
}[] = [
  { company: '科技股份有限公司', title: '前端工程師', start: 2023, end: null },
  { company: '網路新創公司',     title: '工程師',     start: 2021, end: 2023 },
];
```

<!--
P1 的 TypeScript 只有資料和三個方法，沒有任何 click 事件。注意兩個陣列的型別設計：skills 用匿名型別 `{ name: string; percent: number }[]`，experiences 的 `end: number | null` 是聯合型別，表示「結束年份可以是數字或 null」。用 null 代表「目前在職」比用空字串 '' 更嚴謹——TypeScript 會在比較時強制你處理 null 的情況。
-->

---
layout: default
---

# P1：需要完成的 TypeScript 邏輯（2/2）

**③ 需實作的方法（與 HTML 呼叫方式）**

| 方法 | HTML 怎麼呼叫 | 說明 |
|---|---|---|
| `getDuration(start, end)` | `{{ getDuration(exp.start, exp.end) }}` 在時間軸 `*ngFor` 裡 | `end` 為 null → 回傳 `'~ 現在'`，否則回傳 `'X 年'` |
| `getSkillLevel(percent)` | `{{ getSkillLevel(skill.percent) }}` 在技能 `*ngFor` 裡 | ≥ 80 → `'熟練'`，≥ 60 → `'進階'`，否則 → `'初學'` |
| `getTopSkills()` | `*ngFor="let skill of getTopSkills()"` 在技能列表 | 用 `filter` 回傳 percent ≥ 70 的技能 |

💡 P1 是純展示頁，沒有 `(click)` 事件，方法全部在 `{{ }}` 或 `*ngFor` 中被呼叫

<!--
三個方法各自對應一個畫面邏輯。getDuration 處理在職期間的文字顯示，getSkillLevel 做 if/else 判斷等級，getTopSkills 用 filter 篩選高技能。這三個方法的共同點是都「回傳值」而不修改資料，這種「輸入固定、輸出固定、不改外部狀態」的函數在程式設計中叫做「純函數」，最容易測試也最容易除錯。
-->

---
layout: default
---

# P1：完整解答 — 路由設定

```bash
ng g c resume
```

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';

export const routes: Routes = [
  { path: 'resume', component: ResumeComponent },
];
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 確認 <code>app.component.html</code> 有 <code>&lt;router-outlet /&gt;</code>，瀏覽 <code>/resume</code> 即可看到畫面
</div>

<!--
每一題的第一步都是建立 component 然後加 route。`ng g c resume` 產生四個檔案（.ts、.html、.css、.spec.ts），我們只會動到前三個。app.routes.ts 的 path 決定瀏覽器 URL——`{ path: 'resume', component: ResumeComponent }` 表示訪問 /resume 就顯示這個 component。確認 router-outlet 存在是最常被同學忘記的步驟。
-->

---
layout: default
---

# P1：完整解答 — TypeScript（1/2）

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-resume',
  imports: [CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  skills = [
    { name: 'HTML', percent: 90 },
    { name: 'CSS', percent: 80 },
    { name: 'TypeScript', percent: 65 },
    { name: 'Angular', percent: 55 },
  ];
  experiences: { company: string; title: string; start: number; end: number | null }[] = [
    { company: '科技股份有限公司', title: '前端工程師', start: 2023, end: null },
    { company: '網路新創公司', title: '工程師', start: 2021, end: 2023 },
  ];
```

<!--
這頁展示 Component class 的結構。`end: number | null` 是聯合型別（Union Type），代表這個欄位可以是數字也可以是 null。可以問同學：「為什麼不用空字串 '' 代表在職？」——因為 null 能讓 TypeScript 在比較時強制我們處理這個「沒有結束年份」的情況，比空字串更安全也更語意清晰。
-->

---
layout: default
---

# P1：完整解答 — TypeScript（2/2）

```typescript
  getDuration(start: number, end: number | null): string {
    if (end === null) return '~ 現在';
    return (end - start) + ' 年';
  }
  getSkillLevel(percent: number): string {
    if (percent >= 80) return '熟練';
    if (percent >= 60) return '進階';
    return '初學';
  }
  getTopSkills() {
    return this.skills.filter(s => s.percent >= 70);
  }
}
```

<!--
三個方法程式碼很短，但邏輯值得細看。getDuration 的 `if (end === null)` 用三個等號嚴格比對 null，不會把 0 誤判為 null。getSkillLevel 的 if/else if/else 是從最嚴格的條件開始往下判斷，這是條件判斷的標準寫法。getTopSkills 的 filter 回傳新陣列，原始 skills 陣列完全不受影響。
-->

---
layout: default
---

# P1：完整解答 — HTML（1/2）

```html
<div class="resume">
  <aside class="sidebar">
    <div class="avatar">王</div>
    <h2 class="name">王小明</h2>
    <p class="job-title">前端工程師</p>
    <div class="contact">
      <p>📧 email@example.com</p>
    </div>
    <div class="skills">
      <h3>技能</h3>
      <div *ngFor="let skill of skills" class="skill-item">
        <span class="skill-name">{{ skill.name }}</span>
        <span class="skill-tag">{{ getSkillLevel(skill.percent) }}</span>
      </div>
    </div>
  </aside>
```

<!--
HTML 的結構和 CSS 的 class 命名要一一對應。.sidebar 對應左欄，.content 對應右欄。注意 `*ngFor="let skill of skills"` 直接用 skills 陣列顯示所有技能，而 `{{ getSkillLevel(skill.percent) }}` 在每次迭代時呼叫方法，把 percent 數字轉換成「熟練／進階／初學」的文字標籤。
-->

---
layout: default
---

# P1：完整解答 — HTML（2/2）

```html
  <main class="content">
    <section class="about">
      <h2>關於我</h2>
      <p>熱愛前端開發，喜歡把設計稿變成網頁...</p>
    </section>
    <section class="experience">
      <h2>工作經歷</h2>
      <div class="timeline">
        <div class="timeline-line"></div>
        <div *ngFor="let exp of experiences" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <h3>{{ exp.company }}</h3>
            <p>{{ exp.title }}</p>
            <p>{{ exp.start }} {{ getDuration(exp.start, exp.end) }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>
```

<!--
時間軸的 HTML 是三層巢狀：.timeline > .timeline-item > .timeline-dot + .timeline-card。.timeline-line 是真實的 div 元素而不是 ::before 偽元素——初學階段用真實元素更好理解定位邏輯，之後熟悉了再改用 ::before 也不遲。`getDuration(exp.start, exp.end)` 把兩個參數傳給方法計算期間文字，這是「把邏輯放在 TypeScript、HTML 只負責顯示」的最佳實踐。
-->

---
layout: default
---

# P1：完整解答 — CSS（1/2）

```css
.resume { display: flex; min-height: 100vh; }
.sidebar {
  width: 280px; flex-shrink: 0; background: #1a5c5c;
  color: white; padding: 40px 24px;
  display: flex; flex-direction: column; align-items: center;
}
.content { flex: 1; background: #f8fffe; padding: 40px; }
.avatar {
  width: 120px; height: 120px; border-radius: 50%;
  background: #5eada0; border: 4px solid white;
  display: flex; align-items: center;
  justify-content: center; font-size: 2.5rem;
}
.job-title { color: #a7d9d0; font-size: 0.9rem; }
.skill-item {
  display: flex; justify-content: space-between;
  align-items: center; margin-bottom: 10px;
}
.skill-name { color: white; font-size: 0.9rem; }
.skill-tag {
  border-radius: 4px; padding: 2px 8px;
  font-size: 0.78rem; background: rgba(255,255,255,0.2); color: white;
}
```

<!--
.resume 是整頁最外層容器，display: flex 讓兩個子元素（aside.sidebar 和 main.content）自動橫排。.sidebar 的 flex-shrink: 0 非常關鍵——沒有它，螢幕較小時側欄會被壓縮，讓 280px 的固定寬失去意義。.skill-item 用 justify-content: space-between 把技能名稱和等級 tag 推到兩端，這是 Flexbox 最常見的「兩端對齊」用法。
-->

---
layout: default
---

# P1：完整解答 — CSS（2/2）

```css
.timeline { position: relative; padding-left: 32px; }
.timeline-line {
  position: absolute; left: 8px; top: 0; bottom: 0;
  width: 2px; background: #c8e6e3;
}
.timeline-item { position: relative; margin-bottom: 20px; }
.timeline-dot {
  position: absolute; left: -28px; top: 6px;
  width: 14px; height: 14px;
  border-radius: 50%; background: #5eada0;
}
.timeline-card {
  padding: 12px; border: 1px solid #e2e8f0;
  border-radius: 8px; background: white;
  transition: background 0.2s;
}
.timeline-card:hover { background: #f0faf9; }
```

<!--
時間軸定位是這題 CSS 最難的部分。.timeline 的 padding-left: 32px 製造空白讓圓點能放進來；.timeline-line 的 top: 0; bottom: 0 讓垂直線撐滿容器高度，不需要寫 height；.timeline-dot 的 left: -28px 讓圓點精確落在垂直線上方。可以讓同學試著先不加 padding-left 或不加 position: relative，觀察破版的情況——除錯的過程比看答案更有學習效果。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">🛍️</div>

# P2 — 電商產品展示頁
### Product Showcase Page

**預估時間：1.5 小時**

<!--
P2 是四題中互動性最強的一題，加入了「分類篩選」和「購物車」兩個功能。先讓同學看 Navbar 的購物車 badge——那個紅色數字徽章是 position: absolute 相對定位在購物車圖示上的，這是實際工作中最常見的 badge 實作方式。這題最值得學的邏輯是 addToCart：「找到就修改、找不到就新增」的購物車模式。
-->

---
layout: default
---

# P2：畫面需求

<div style="border: 2px solid #1a5c5c; border-radius: 8px; overflow: hidden; font-size: 0.82em;">
  <div style="background:#1a5c5c;color:white;padding:9px 16px;display:flex;justify-content:space-between;align-items:center;">
    <span style="font-weight:700;">🅰 My Shop</span>
    <span style="display:flex;gap:14px;align-items:center;">
      首頁 商品 關於
      <span style="position:relative;">🛒 購物車
        <span style="position:absolute;top:-6px;right:-10px;background:#e53e3e;color:white;border-radius:50%;width:15px;height:15px;font-size:0.68em;display:flex;align-items:center;justify-content:center;">3</span>
      </span>
    </span>
  </div>
  <div style="background:#5eada0;color:white;text-align:center;padding:16px;font-weight:600;">歡迎來到 My Shop — 精選好物一次搞定</div>
  <div style="padding:8px 14px;background:#f8fffe;display:flex;gap:6px;">
    <span style="background:#1a5c5c;color:white;padding:3px 10px;border-radius:4px;">全部</span>
    <span style="border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">前端</span>
    <span style="border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">後端</span>
    <span style="border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">工具書</span>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:8px;padding:10px 14px;background:#f8fffe;">
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;width:calc(25% - 8px);">📘<br>Angular<br><b style="color:#1a5c5c;">$880</b></div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;width:calc(25% - 8px);">📗<br>CSS精通<br><b style="color:#1a5c5c;">$650</b></div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;width:calc(25% - 8px);">📙<br>Node.js<br><b style="color:#1a5c5c;">$750</b></div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;width:calc(25% - 8px);">📕<br>Git<br><b style="color:#1a5c5c;">$420</b></div>
  </div>
</div>

- **Navbar**：`position: fixed`，左 Logo，右連結 + 購物車 badge
- **Hero 橫幅**：深色背景，文字水平垂直置中
- **商品格**：`display: flex; flex-wrap: wrap` 四欄，卡片 hover 加深陰影

<!--
P2 的畫面分四層：固定 Navbar、Hero 橫幅、分類篩選列、商品格。重點是 Navbar 要加 position: fixed，然後 body 要補 padding-top: 64px，否則 Navbar 會蓋住下方內容——這是一個非常常被初學者忘記的步驟。建議同學按這四層由上往下寫 HTML + CSS，確認每一層正確後再繼續往下。
-->

---
layout: default
---

# P2：需要完成的 CSS 效果（1/2）

**① 固定 Navbar + body 偏移**
- `.navbar`：`position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 64px`
- `body`（或最外層容器）：`padding-top: 64px` 避免內容被蓋住

**② 購物車 badge**
- `.cart-icon`：`position: relative`（建立定位基準）
- `.cart-badge`：`position: absolute; top: -8px; right: -12px`
- 紅色圓形：`border-radius: 50%; width: 20px; height: 20px`

**③ Hero 橫幅**
- `background: #1a5c5c`（純色，不需漸層）
- `display: flex; align-items: center; justify-content: center; height: 250px`

<!--
position: fixed 讓 Navbar 脫離文件流，所以下方元素要靠 body 的 padding-top: 64px 補回被佔掉的空間——這是個「脫離文件流後補空間」的固定搭配，要特別記起來。購物車 badge 的關鍵是 .cart-icon 設 position: relative 建立定位基準，.cart-badge 再用 position: absolute + top: -8px; right: -12px 讓數字浮到右上角。
-->

---
layout: default
---

# P2：需要完成的 CSS 效果（2/2）

**④ 商品格（Flexbox flex-wrap）**
- `.product-grid`：`display: flex; flex-wrap: wrap; gap: 20px; padding: 32px 40px`
- `.product-card`：`flex: 0 0 calc(25% - 15px)`（四欄佈局）
- 卡片 hover：`box-shadow: 0 12px 28px rgba(0,0,0,0.15); transition: box-shadow 0.25s`

**⑤ 篩選按鈕 `.active` 狀態**
- 預設：`border: 1px solid #1a5c5c; color: #1a5c5c`
- `.active`：`background: #1a5c5c; color: white`
- 加 `transition: background 0.2s, color 0.2s` 讓切換平滑

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>flex: 0 0 calc(25% - 15px)</code>：四欄間有 3 個 gap（20px×3=60px），每欄扣掉 60÷4=15px
</div>

<!--
商品格四欄佈局的 `calc(25% - 15px)` 可以帶同學推算：四個卡片之間有三個 gap（20px × 3 = 60px），平均每張卡片要扣掉 60 ÷ 4 = 15px，所以是 `calc(25% - 15px)`。篩選按鈕的 .active class 由 Angular 的 `[class.active]="cat === activeCategory"` 動態切換，而不是在 CSS 裡做判斷——CSS 只定義 .active 的樣式，Angular 決定要不要套用這個 class。
-->

---
layout: default
---

# P2：需要完成的 TypeScript 邏輯

```typescript
interface Product { id: number; name: string; price: number; category: string; emoji: string; }
interface CartItem { product: Product; qty: number; }
```

**需要的變數：**
- `products: Product[]` — 完整商品列表（自行填入資料）
- `cart: CartItem[] = []` — 購物車
- `activeCategory: string = '全部'` — 追蹤目前選中的分類

**需實作的方法（與觸發事件）：**

| 方法 | 怎麼觸發 | 說明 |
|---|---|---|
| `setCategory(cat)` | 分類按鈕 `(click)="setCategory('前端')"` | 更新 `activeCategory`，切換分類 |
| `filterProducts()` | `*ngFor="let p of filterProducts()"` 在商品格 | 依 `activeCategory` 篩選商品 |
| `addToCart(product)` | 商品卡片「加入購物車」按鈕 `(click)="addToCart(product)"` | 加入購物車或 qty++ |
| `getCartCount()` | `{{ getCartCount() }}` 在購物車 badge | 加總所有 qty |
| `getCartTotal()` | `{{ getCartTotal() }}` 在結帳區 | price × qty 加總 |

<!--
P2 比 P1 多了兩個 interface：Product 定義商品結構，CartItem 把 Product 和數量 qty 打包在一起。注意 addToCart 的邏輯——先用 find 或 filter 確認商品是否已在購物車，已存在就 qty++，不存在才 push 新項目。這個「找到就修改、找不到就新增」的模式在購物車、收藏清單等功能中非常常見，值得讓同學熟記。
-->

---
layout: default
---

# P2：完整解答 — 路由設定

```bash
ng g c shop
```

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';

export const routes: Routes = [
  { path: 'shop', component: ShopComponent },
];
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 確認 <code>app.component.html</code> 有 <code>&lt;router-outlet /&gt;</code>，瀏覽 <code>/shop</code> 即可看到畫面
</div>

<!--
建立 ShopComponent 並設定 /shop 路由。注意 import 路徑：Angular CLI 產生的 component 放在 src/app/shop/ 目錄下，import 時用相對路徑 ./shop/shop.component。流程和 P1 完全一樣：ng g c → 加 import → 加 route → 確認 router-outlet → 瀏覽器輸入路徑確認畫面出現。
-->

---
layout: default
---

# P2：完整解答 — TypeScript（1/3）

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Product { id: number; name: string; price: number; category: string; emoji: string; }
interface CartItem { product: Product; qty: number; }
@Component({
  selector: 'app-shop',
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  categories = ['全部', '前端', '後端', '設計'];
  products: Product[] = [
    { id: 1, name: 'HTML 入門', price: 299, category: '前端', emoji: '🌐' },
    { id: 2, name: 'CSS 精通', price: 399, category: '前端', emoji: '🎨' },
    { id: 3, name: 'Node.js', price: 499, category: '後端', emoji: '🟢' },
    { id: 4, name: 'Figma 設計', price: 349, category: '設計', emoji: '🖌️' },
  ];
  cart: CartItem[] = [];
  activeCategory: string = '全部';
```

<!--
ShopComponent 把兩個 interface 宣告在 class 頂端，這是 TypeScript 在 Angular component 裡最常見的寫法——把型別定義和使用它的 class 放在同一個檔案中。products 陣列的每個物件都需要同時有 id、name、price、category、emoji 五個欄位，少任何一個 TypeScript 就會在編譯時報錯，這就是 interface 的核心價值。
-->

---
layout: default
---

# P2：完整解答 — TypeScript（2/3）

```typescript
  setCategory(cat: string): void {
    this.activeCategory = cat;
  }
  filterProducts(): Product[] {
    if (this.activeCategory === '全部') return this.products;
    return this.products.filter(p => p.category === this.activeCategory);
  }
  addToCart(product: Product): void {
    const existing = this.cart.filter(c => c.product.id === product.id);
    if (existing.length > 0) {
      existing[0].qty++;
    } else {
      this.cart.push({ product, qty: 1 });
    }
  }
```

<!--
setCategory 只做一件事：更新 activeCategory 的值，Angular 的資料綁定就會自動讓畫面更新。filterProducts 先判斷「全部」的特殊情況再做 filter，避免在 filter 裡寫複雜邏輯。addToCart 用 filter 取回陣列再判斷 length > 0——這和技術前導頁的 find 寫法效果相同，兩種方式都可以，find 更精簡但 filter 更直覺。
-->

---
layout: default
---

# P2：完整解答 — TypeScript（3/3）

```typescript
  getCartCount(): number {
    let total = 0;
    for (let item of this.cart) { total += item.qty; }
    return total;
  }
  getCartTotal(): number {
    let total = 0;
    for (let item of this.cart) {
      total += item.product.price * item.qty;
    }
    return total;
  }
}
```

<!--
getCartCount 和 getCartTotal 都用 for...of 迴圈做累加，可以問同學：「這兩個方法有沒有更簡潔的寫法？」答案是用 reduce，但 for...of 對初學者可讀性更高，先求正確再求精簡。這兩個方法都綁定在 HTML 的 `{{ }}` 中，每次 cart 陣列的內容改變，Angular 就會自動重新執行並更新畫面。
-->

---
layout: default
---

# P2：完整解答 — HTML（1/2）

```html
<nav class="navbar">
  <div class="brand">🅰 My Shop</div>
  <ul class="nav-links">
    <li><a href="#">首頁</a></li>
    <li><a href="#">商品</a></li>
  </ul>
  <div class="cart-icon">
    🛒 購物車
    <span class="cart-badge">{{ getCartCount() }}</span>
  </div>
</nav>
<div class="filter-bar">
  <button *ngFor="let cat of categories"
    class="filter-btn"
    [class.active]="cat === activeCategory"
    (click)="setCategory(cat)">{{ cat }}</button>
</div>
```

<!--
Navbar 的結構是「外層 nav.navbar > 左側 div.brand + 右側 div.cart-icon」。.cart-icon 內的 .cart-badge 靠 `{{ getCartCount() }}` 即時更新數字。分類按鈕用 *ngFor 動態產生，`[class.active]="cat === activeCategory"` 做樣式切換，`(click)="setCategory(cat)"` 呼叫方法——三個 Angular 語法在同一個元素上同時使用，這是非常典型的寫法。
-->

---
layout: default
---

# P2：完整解答 — HTML（2/2）

```html
<div class="product-grid">
  <div *ngFor="let product of filterProducts()"
    class="product-card">
    <div class="product-img">{{ product.emoji }}</div>
    <div class="product-info">
      <div class="product-name">{{ product.name }}</div>
      <div class="product-price">NT${{ product.price }}</div>
      <button class="add-btn"
        (click)="addToCart(product)">加入購物車</button>
    </div>
  </div>
</div>
```

<!--
商品格的 *ngFor 迭代 filterProducts() 的回傳值——每次 activeCategory 改變，filterProducts() 就重新執行，*ngFor 得到新陣列重新渲染。`(click)="addToCart(product)"` 把當前迭代的 product 物件傳給方法，這是在 *ngFor 裡傳遞當前元素給 click 事件的標準寫法，值得讓同學記清楚。
-->

---
layout: default
---

# P2：完整解答 — CSS（1/3）

```css
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: 64px; background: #1a5c5c;
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 0 40px; z-index: 100; color: white;
}
body { padding-top: 64px; }
.cart-icon { position: relative; }
.cart-badge {
  position: absolute; top: -8px; right: -12px;
  background: #e53e3e; color: white;
  border-radius: 50%; width: 20px; height: 20px;
  font-size: 0.75rem;
  display: flex; align-items: center; justify-content: center;
}
```

<!--
.navbar 和 P1 的 .resume 有個共同點：都是 display: flex + justify-content: space-between 把子元素推到兩端。不同的是 Navbar 加了 position: fixed，讓它浮在頁面頂部。.cart-badge 的 display: flex + align-items/justify-content: center 是讓小圓點內的數字完美置中的標準方法，也可以用 line-height，但 Flexbox 置中更直覺。
-->

---
layout: default
---

# P2：完整解答 — CSS（2/3）

```css
.filter-bar {
  padding: 16px 40px; display: flex; gap: 8px;
  background: white; border-bottom: 1px solid #e2e8f0;
}
.filter-btn {
  padding: 6px 16px; border: 1px solid #ccc;
  border-radius: 4px; cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.filter-btn.active { background: #1a5c5c; color: white; border-color: #1a5c5c; }
.product-grid {
  display: flex; flex-wrap: wrap; gap: 20px; padding: 32px 40px;
}
.product-card {
  flex: 0 0 calc(25% - 15px); border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: white; transition: box-shadow 0.25s;
}
.product-card:hover { box-shadow: 0 12px 28px rgba(0,0,0,0.15); }
```

<!--
.filter-btn 的 transition: background 0.2s, color 0.2s 讓分類切換有平滑動畫，而不是瞬間跳變。.product-grid 的 flex-wrap: wrap 讓超出一行的卡片自動換行，不需要手動計算行數。.product-card:hover 的 box-shadow 值比預設狀態大很多（0 2px → 0 12px），製造出卡片「浮起來」的立體視覺效果。
-->

---
layout: default
---

# P2：完整解答 — CSS（3/3）

```css
.product-img {
  height: 180px; background: #f0faf9;
  display: flex; align-items: center;
  justify-content: center; font-size: 4rem;
  border-radius: 12px 12px 0 0;
}
.product-info { padding: 16px; }
.product-name { font-weight: 600; margin-bottom: 8px; }
.product-price {
  color: #1a5c5c; font-size: 1.25rem;
  font-weight: 700; margin-bottom: 12px;
}
.add-btn {
  width: 100%; padding: 8px;
  background: #1a5c5c; color: white;
  border: none; border-radius: 8px;
  cursor: pointer; font-size: 0.9rem;
  transition: background 0.2s;
}
.add-btn:hover { background: #5eada0; }
```

<!--
.product-img 的 height: 180px + display: flex + align-items/justify-content: center 讓 emoji 完美居中顯示。.add-btn 的 width: 100% 讓按鈕撐滿卡片寬度，border: none 移除瀏覽器預設按鈕邊框——這兩個是自訂按鈕樣式必備的重置設定。hover 狀態從深綠改成淺綠，製造輕微的互動回饋，讓使用者知道按鈕可以點。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">📊</div>

# P3 — 學習進度儀表板
### Learning Dashboard

**預估時間：1.5 小時**

<!--
P3 是純展示頁，沒有任何 click 互動，全部靠 TypeScript 方法在 `{{ }}` 中計算並顯示數據。這一題的重點在於「把多個計算方法組合起來」——getCompletionRate 裡面呼叫了 getCompletedCount，這種方法互相引用的寫法在實際開發中很常見。可以讓同學先看畫面猜猜「這四個數字是怎麼算出來的」，再帶入程式碼說明。
-->

---
layout: default
---

# P3：畫面需求

<div style="border:2px solid #5eada0;border-radius:8px;overflow:hidden;font-size:0.82em;">
  <div style="background:#1a5c5c;color:white;padding:9px 16px;display:flex;justify-content:space-between;">
    <span style="font-weight:700;">📚 學習進度儀表板</span>
    <span style="color:#a7d9d0;">2025/06/28</span>
  </div>
  <div style="display:flex;gap:8px;padding:10px 14px;background:#f8fffe;">
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#1a5c5c;">12</div><div style="color:#666;">已完成</div>
    </div>
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#e07b39;">5</div><div style="color:#666;">學習中</div>
    </div>
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#1a5c5c;">48h</div><div style="color:#666;">總時數</div>
    </div>
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#5eada0;">70%</div><div style="color:#666;">完成率</div>
    </div>
  </div>
  <div style="padding:8px 14px;background:#f0faf9;border-top:1px solid #c8e6e3;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
      <span style="width:72px;color:#666;">HTML</span>
      <div style="flex:1;height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;"><div style="width:80%;height:100%;background:#e07b39;border-radius:4px;"></div></div>
      <span style="width:32px;text-align:right;color:#666;">80%</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="width:72px;color:#666;">CSS</span>
      <div style="flex:1;height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;"><div style="width:70%;height:100%;background:#5eada0;border-radius:4px;"></div></div>
      <span style="width:32px;text-align:right;color:#666;">70%</span>
    </div>
  </div>
  <div style="padding:8px 14px;background:#f8fffe;border-top:1px solid #e2e8f0;font-size:0.9em;">
    <div style="color:#666;">● HTML 表單練習 &nbsp;<span style="background:#d4edda;color:#1a6e2e;border-radius:8px;padding:1px 7px;">已完成</span></div>
    <div style="color:#666;">● TypeScript 基礎 &nbsp;<span style="background:#fff3cd;color:#856404;border-radius:8px;padding:1px 7px;">學習中</span></div>
  </div>
</div>

<!--
P3 的畫面分三個區域：頂部 header、四個統計卡片橫排、下方進度數字列表和課程記錄。四個數字都來自 TypeScript 方法計算，不是寫死的靜態數字——如果資料增加，數字會自動更新。可以讓同學先看線框圖猜猜「每個數字是怎麼算出來的」，再對照 TypeScript 方法確認，有助於建立「資料驅動畫面」的思維。
-->

---
layout: default
---

# P3：需要完成的 CSS 效果

**① 統計卡片列（Flexbox）**
- `.stats-row`：`display: flex; gap: 16px; margin-bottom: 32px`
- 每張 `.stat-card`：`flex: 1`，`border-radius: 12px`，`text-align: center; padding: 24px`
- 數字 `.stat-value`：`font-size: 2.5rem; font-weight: 900; color: #1a5c5c`
- hover：`background: #1a5c5c; color: white; transition: background 0.25s, color 0.25s`

**② 進度數字區**
- 每列 `.progress-row`：`display: flex; align-items: center; gap: 16px; margin-bottom: 12px; padding: 8px; border-radius: 8px`
- 科目名稱 `.subject-name`：`width: 80px; color: #555`
- 進度數字 `.progress-num`：`font-size: 1.6rem; font-weight: 900; color: #1a5c5c; min-width: 60px`
- 單位 `.progress-unit`：`font-size: 0.85rem; color: #888`
- hover：`background: #f8fffe; transition: background 0.2s`

**③ 課程記錄**
- 已完成 badge：`background: #d4edda; color: #1a6e2e; border-radius: 999px; padding: 2px 10px`
- 學習中 badge：`background: #fff3cd; color: #856404`
- 每列 hover：`background: #f8fffe; transition: background 0.2s`

<!--
統計卡片 flex: 1 讓四張卡片平均分配空間。hover 狀態把背景改成深綠並讓數字也變白——注意 .stat-card:hover .stat-value 要用子代選擇器才能改到 .stat-value 的顏色，只寫 .stat-card:hover 不夠。badge 的 border-radius: 999px 讓數字標籤變成「膠囊形」（橢圓形）而不是正圓形，是比 50% 更通用的圓角技巧。
-->

---
layout: default
---

# P3：需要完成的 TypeScript 邏輯

```typescript
interface CourseRecord { name: string; status: 'completed' | 'in-progress'; date: string; }
subjects = [
  { name: 'HTML', progress: 80 },
  { name: 'CSS',  progress: 70 },
  { name: 'TypeScript', progress: 40 },
];
records: CourseRecord[] = [ ... ];
```

**需實作的方法（與 HTML 呼叫方式）：**

| 方法 | HTML 怎麼呼叫 | 說明 |
|---|---|---|
| `getCompletedCount()` | `{{ getCompletedCount() }}` 在「已完成」統計卡 | `filter` 篩選 `'completed'` 後取 `.length` |
| `getInProgressCount()` | `{{ getInProgressCount() }}` 在「學習中」統計卡 | 同上，篩選 `'in-progress'` |
| `getTotalHours()` | `{{ getTotalHours() }}` 在「總時數」統計卡 | `records.length × 2.5` |
| `getCompletionRate()` | `{{ getCompletionRate() }}` 在「完成率」統計卡 | 回傳字串如 `'70%'` |

💡 P3 是純展示頁，所有方法都在 `{{ }}` 中被呼叫，沒有 `(click)` 事件

<!--
P3 的 interface 很簡單：CourseRecord 只有三個欄位，status 用 `'completed' | 'in-progress'` 聯合型別限制只能填這兩個字串，打錯字 TypeScript 就會報錯。四個統計方法都在 `{{ }}` 裡被呼叫，P3 沒有任何 (click) 事件，所有互動都是「讀資料 → 計算 → 顯示」的單向流，和 P1 一樣是最純粹的展示型 component。
-->

---
layout: default
---

# P3：完整解答 — 路由設定

```bash
ng g c dashboard
```

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
];
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 確認 <code>app.component.html</code> 有 <code>&lt;router-outlet /&gt;</code>，瀏覽 <code>/dashboard</code> 即可看到畫面
</div>

<!--
建立 DashboardComponent 並設定 /dashboard 路由。這是第三個 component，設定方式和 P1、P2 完全一樣，只是 component 名稱和 path 不同。養成「每個頁面 = 一個 component = 一個 route」的習慣，是 Angular 單頁應用架構的核心概念——四題做完後，routes 陣列會有四個路由物件，每個都對應一個獨立頁面。
-->

---
layout: default
---

# P3：完整解答 — TypeScript（1/2）

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface CourseRecord { name: string; status: 'completed' | 'in-progress'; date: string; }
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  subjects = [
    { name: 'HTML', progress: 80 },
    { name: 'CSS', progress: 70 },
    { name: 'TypeScript', progress: 40 },
  ];
  records: CourseRecord[] = [
    { name: 'HTML 表單練習', status: 'completed', date: '2025/06/01' },
    { name: 'CSS Flexbox', status: 'completed', date: '2025/06/10' },
    { name: 'TypeScript 基礎', status: 'in-progress', date: '2025/06/20' },
  ];
```

<!--
DashboardComponent 的資料來自硬編碼陣列，實際專案中這些資料通常從 API 取得。subjects 陣列代表各科目的學習進度（0-100），records 陣列代表已記錄的課程。status 欄位的型別是 `'completed' | 'in-progress'`，這樣 TypeScript 會在你把 status 打成 'done' 或 'complete' 時立刻報錯，大幅降低拼字錯誤的 bug。
-->

---
layout: default
---

# P3：完整解答 — TypeScript（2/2）

```typescript
  getCompletedCount(): number {
    return this.records.filter(r => r.status === 'completed').length;
  }
  getInProgressCount(): number {
    return this.records.filter(r => r.status === 'in-progress').length;
  }
  getTotalHours(): number {
    return this.records.length * 2.5;
  }
  getCompletionRate(): string {
    const rate = this.getCompletedCount() / this.records.length;
    return Math.round(rate * 100) + '%';
  }
  getStatusText(status: string): string {
    return status === 'completed' ? '已完成' : '學習中';
  }
}
```

<!--
注意 getCompletionRate 裡面「呼叫 getCompletedCount()」的寫法：在同一個 class 裡，方法可以直接用 `this.方法名()` 呼叫其他方法，避免重複寫 filter 邏輯。getStatusText 做 status → 中文顯示文字的轉換，讓 HTML 保持乾淨，不需要在 template 裡寫三元運算子——把顯示邏輯放在 TypeScript、HTML 只呼叫方法，是 Angular 的最佳實踐。
-->

---
layout: default
---

# P3：完整解答 — HTML（1/2）

```html
<div class="dashboard-header">
  <span class="title">📚 學習進度儀表板</span>
  <span class="date">2025/06/28</span>
</div>
<div class="content">
  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-value">{{ getCompletedCount() }}</div>
      <div>已完成</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#e07b39">{{ getInProgressCount() }}</div>
      <div>學習中</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ getTotalHours() }}h</div>
      <div>總時數</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#5eada0">{{ getCompletionRate() }}</div>
      <div>完成率</div>
    </div>
  </div>
```

<!--
四個統計卡片的 HTML 結構完全相同，只是 `{{ }}` 裡呼叫的方法不同。注意「學習中」和「完成率」的 stat-value 加了 inline style 改顏色——這是最簡單的條件樣式做法，不需要額外 class。這種「只有少數幾個元素需要不同顏色」的情況，用 inline style 比另外寫 CSS class 更快速直覺。
-->

---
layout: default
---

# P3：完整解答 — HTML（2/2）

```html
  <div *ngFor="let s of subjects" class="progress-row">
    <span class="subject-name">{{ s.name }}</span>
    <span class="progress-num">{{ s.progress }}</span>
    <span class="progress-unit">%</span>
  </div>
  <div class="records">
    <div *ngFor="let r of records" class="record-item">
      <span>● {{ r.name }}</span>
      <span [class.badge-done]="r.status === 'completed'"
        [class.badge-wip]="r.status === 'in-progress'">
        {{ getStatusText(r.status) }}
      </span>
    </div>
  </div>
</div>
```

<!--
`[class.badge-done]` 和 `[class.badge-wip]` 是 Angular 的條件 class 綁定，根據 r.status 的值決定加哪個 class，和 P2 的 `[class.active]` 是完全相同的語法。getStatusText(r.status) 把英文 status 轉成中文顯示文字，讓 HTML 顯示「已完成」而不是 'completed'——把顯示邏輯封裝在方法裡，之後要改中文翻譯只需改一個地方。
-->

---
layout: default
---

# P3：完整解答 — CSS（1/2）

```css
.dashboard-header {
  background: #1a5c5c; color: white; padding: 12px 32px;
  display: flex; justify-content: space-between; align-items: center;
}
.dashboard-header .date { color: #a7d9d0; }
.content { padding: 24px 32px; }
.stats-row { display: flex; gap: 16px; margin-bottom: 32px; }
.stat-card {
  flex: 1; background: white; border-radius: 12px;
  padding: 24px; text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.25s, color 0.25s;
}
.stat-card:hover { background: #1a5c5c; color: white; }
.stat-value { font-size: 2.5rem; font-weight: 900; color: #1a5c5c; }
.stat-card:hover .stat-value { color: white; }
```

<!--
.stat-card:hover 和 .stat-card:hover .stat-value 這兩個選擇器要一起寫。transition 只需要在 :default 狀態寫，瀏覽器在進入和離開 hover 時都會自動使用這個過渡動畫。.stat-value 預設是深綠色 #1a5c5c，hover 時要被覆蓋為 white——所以必須另寫 .stat-card:hover .stat-value { color: white }，只靠 .stat-card:hover { color: white } 無法蓋過子元素的獨立 color 設定。
-->

---
layout: default
---

# P3：完整解答 — CSS（2/2）

```css
.progress-row {
  display: flex; align-items: center; gap: 16px;
  padding: 8px; border-radius: 8px;
  margin-bottom: 8px; transition: background 0.2s;
}
.progress-row:hover { background: #f8fffe; }
.subject-name { width: 80px; color: #555; }
.progress-num { font-size: 1.6rem; font-weight: 900; color: #1a5c5c; min-width: 60px; }
.progress-unit { font-size: 0.85rem; color: #888; }
.record-item {
  display: flex; justify-content: space-between;
  padding: 8px 4px; color: #555;
  border-bottom: 1px solid #f0faf9;
}
.badge-done { background: #d4edda; color: #1a6e2e; border-radius: 999px; padding: 2px 10px; }
.badge-wip  { background: #fff3cd; color: #856404; border-radius: 999px; padding: 2px 10px; }
```

<!--
.progress-row 用 display: flex + align-items: center 讓科目名稱、數字、單位三個元素在同一行垂直置中對齊。badge-done 和 badge-wip 共用 border-radius: 999px 的膠囊形樣式，只有背景色和文字色不同——可以鼓勵同學把共用樣式提取成 .badge-base class，再用 badge-done、badge-wip 覆蓋顏色，這就是 CSS 的「複用」思維。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">🍜</div>

# P4 — 餐廳菜單點餐頁
### Restaurant Menu & Order Page

**預估時間：1.5 小時**

<!--
P4 是四題中最完整的實作，結合了固定 header、分類切換、左右分欄和即時計算。和 P2 的購物車相比，P4 的訂單面板多了「移除項目」功能——removeItem 做「qty-- 後再 filter 掉 qty=0 的項目」，這個兩段式刪除邏輯值得特別說明。做完 P4，同學應該能獨立搭建任何有固定 header + 分類篩選 + 清單的頁面。
-->

---
layout: default
---

# P4：畫面需求

<div style="border:2px solid #1a5c5c;border-radius:8px;overflow:hidden;font-size:0.82em;">
  <div style="background:#1a5c5c;color:white;padding:9px 16px;display:flex;justify-content:space-between;align-items:center;">
    <span style="font-weight:700;">🍜 山水麵館</span>
    <span>📋 餐點 <span style="background:#e53e3e;border-radius:50%;padding:1px 5px;">2</span></span>
  </div>
  <div style="background:white;padding:7px 14px;border-bottom:2px solid #e2e8f0;display:flex;gap:8px;">
    <span style="background:#1a5c5c;color:white;padding:3px 10px;border-radius:4px;">麵食</span>
    <span style="border:1px solid #ccc;padding:3px 10px;border-radius:4px;color:#666;">湯品</span>
    <span style="border:1px solid #ccc;padding:3px 10px;border-radius:4px;color:#666;">小菜</span>
    <span style="border:1px solid #ccc;padding:3px 10px;border-radius:4px;color:#666;">飲料</span>
  </div>
  <div style="display:flex;gap:0;background:#f8fffe;">
    <div style="flex:1;padding:10px 14px;border-right:1px solid #e2e8f0;">
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <div style="border:1px solid #e2e8f0;border-radius:8px;padding:8px;background:white;text-align:center;width:calc(50% - 4px);">🍜<br>招牌牛肉麵<br><span style="color:#1a5c5c;font-weight:700;">NT$180</span></div>
        <div style="border:1px solid #e2e8f0;border-radius:8px;padding:8px;background:white;text-align:center;width:calc(50% - 4px);">🍲<br>酸辣湯<br><span style="color:#1a5c5c;font-weight:700;">NT$60</span></div>
      </div>
    </div>
    <div style="width:180px;flex-shrink:0;padding:10px 12px;background:white;">
      <div style="font-weight:700;color:#1a5c5c;margin-bottom:6px;">📋 訂單明細</div>
      <div style="font-size:0.85em;color:#666;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:6px;">
        <div>招牌牛肉麵 x1 NT$180</div>
      </div>
      <div style="font-weight:700;color:#1a5c5c;margin-bottom:6px;">總計：NT$180</div>
      <div style="background:#1a5c5c;color:white;text-align:center;padding:4px;border-radius:6px;">結帳</div>
    </div>
  </div>
</div>

- `position: fixed` header（64px）、body `padding-top: 64px`
- 分類切換列（正常文件流，不需 sticky）
- 左側 Flexbox flex-wrap 菜單，右側固定訂單欄

<!--
P4 的三層結構：固定 header、分類導覽列、左右分欄主體。左邊 menu-area 用 flex: 1 撐滿，右邊 order-panel 固定 280px。特別注意：分類導覽列是「正常文件流」，不需要 sticky——它緊跟在 header 的 padding-top: 64px 下方，自然就排在正確位置。這和 P2 的結構最主要的差異是有右側固定訂單欄。
-->

---
layout: default
---

# P4：需要完成的 CSS 效果（1/2）

**① 固定 Header**
- `.header`：`position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 64px`
- `body`：`padding-top: 64px`

**② 分類切換列（正常文件流）**
- `.category-nav`：`background: white; padding: 12px 32px; border-bottom: 1px solid #e2e8f0; display: flex; gap: 8px`
- `.cat-btn.active`：`background: #1a5c5c; color: white; border-radius: 4px`

**③ 左右分欄**
- `.main-layout`：`display: flex; gap: 24px; padding: 24px 32px; align-items: flex-start`
- `.menu-area`：`flex: 1`
- `.order-panel`：`width: 280px; flex-shrink: 0`

<!--
P4 的 header 和 P2 的 navbar 結構幾乎一樣，都是 position: fixed + z-index + body padding-top。分類按鈕 .cat-btn.active 和 P2 的 .filter-btn.active 邏輯相同，都是「預設是空白邊框，active 狀態換成填滿背景色」。可以問同學：「P2 和 P4 的 active 按鈕 CSS 有什麼差異？」引導他們觀察細節的不同。
-->

---
layout: default
---

# P4：需要完成的 CSS 效果（2/2）

**④ 菜單格（Flexbox flex-wrap）**
- `.menu-grid`：`display: flex; flex-wrap: wrap; gap: 16px`
- `.menu-card`：`flex: 0 0 calc(50% - 8px)`（兩欄佈局）
- hover：`border: 2px solid #5eada0; transition: border-color 0.2s`
- 預設：`border: 2px solid transparent`

**⑤ 訂單欄 & 結帳按鈕**
- `.order-panel`：`background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.1)`
- 結帳按鈕 hover：`background: white; color: #1a5c5c; border: 2px solid #1a5c5c; transition: background 0.2s, color 0.2s`

<!--
.menu-grid 的兩欄佈局 `flex: 0 0 calc(50% - 8px)` 比 P2 的四欄簡單：gap: 16px，一個 gap，每張卡片扣 8px。.menu-card 的 `border: 2px solid transparent` 是「佔位邊框」技巧——預設就有 2px 邊框只是透明，hover 時只改顏色不改尺寸，避免邊框出現時卡片大小改變導致畫面跳動。這個技巧值得特別強調。
-->

---
layout: default
---

# P4：需要完成的 TypeScript 邏輯

```typescript
interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: '麵食' | '湯品' | '小菜' | '飲料';
  emoji: string;
}
interface OrderItem { item: MenuItem; qty: number; }
```

**需要的變數：**
- `menu: MenuItem[]` — 完整菜單（自行填入資料）
- `order: OrderItem[] = []` — 目前訂單
- `activeCategory: string = '麵食'` — 目前選中的分類

**需實作的方法（與觸發事件）：**

| 方法 | 怎麼觸發 | 說明 |
|---|---|---|
| `setCategory(cat)` | 分類按鈕 `(click)="setCategory('湯品')"` | 更新 `activeCategory`，切換菜單分類 |
| `getMenu()` | `*ngFor="let item of getMenu()"` 在菜單格 | 依 `activeCategory` 篩選菜單 |
| `addItem(item)` | 菜單卡片「加入」按鈕 `(click)="addItem(item)"` | 加入訂單或 qty++ |
| `removeItem(id)` | 訂單列「移除」按鈕 `(click)="removeItem(o.item.id)"` | qty--，再移除 qty=0 的項目 |
| `getOrderCount()` | `{{ getOrderCount() }}` 在 header badge | 加總所有 qty |
| `getTotal()` | `{{ getTotal() }}` 在訂單面板 | price × qty 加總 |

<!--
P4 的 interface 設計：MenuItem 的 category 欄位用聯合型別限制只能是四個分類字串，防止打錯分類名稱。removeItem 是最複雜的方法：第一步用 forEach 找到對應 id 的訂單項目並把 qty--，第二步用 filter 過濾掉 qty 已經變成 0 的項目——兩步驟完成「減少數量或移除項目」，值得讓同學手動追蹤邏輯流程。
-->

---
layout: default
---

# P4：完整解答 — 路由設定

```bash
ng g c menu
```

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
  { path: 'menu', component: MenuComponent },
];
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 確認 <code>app.component.html</code> 有 <code>&lt;router-outlet /&gt;</code>，瀏覽 <code>/menu</code> 即可看到畫面
</div>

<!--
建立 MenuComponent 並設定 /menu 路由。這是最後一個 component，確認同學已熟悉完整流程：ng g c 建立 → app.routes.ts 加 import 和 path → 瀏覽器訪問對應 URL 確認畫面出現。四個 project 做完後，routes 陣列會有四個路由物件——可以讓同學回頭看整個 routes 陣列，感受「四個頁面的 SPA 架構」。
-->

---
layout: default
---

# P4：完整解答 — TypeScript（1/3）

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface MenuItem { id: number; name: string; price: number; category: string; emoji: string; }
interface OrderItem { item: MenuItem; qty: number; }
@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  categories = ['麵食', '湯品', '小菜', '飲料'];
  menu: MenuItem[] = [
    { id: 1, name: '招牌牛肉麵', price: 180, category: '麵食', emoji: '🍜' },
    { id: 2, name: '雞肉米線',   price: 150, category: '麵食', emoji: '🍝' },
    { id: 3, name: '酸辣湯',     price: 60,  category: '湯品', emoji: '🍲' },
    { id: 4, name: '紅燒蹄膀',   price: 120, category: '小菜', emoji: '🍖' },
    { id: 5, name: '珍珠奶茶',   price: 55,  category: '飲料', emoji: '🧋' },
  ];
  order: OrderItem[] = [];
  activeCategory: string = '麵食';
```

<!--
MenuComponent 的初始資料有五個菜單項目，每個都有完整五個欄位。activeCategory 初始值設為 '麵食'，所以畫面一打開就顯示麵食分類的菜單——這就是為什麼要在宣告時給預設值，而不是空字串。order 陣列初始為空，每次 addItem 才加入新項目，getTotal 和 getOrderCount 在 order 為空時會回傳 0，不需要特別處理空陣列的情況。
-->

---
layout: default
---

# P4：完整解答 — TypeScript（2/3）

```typescript
  setCategory(cat: string): void {
    this.activeCategory = cat;
  }
  getMenu(): MenuItem[] {
    return this.menu.filter(m => m.category === this.activeCategory);
  }
  addItem(item: MenuItem): void {
    const existing = this.order.filter(o => o.item.id === item.id);
    if (existing.length > 0) {
      existing[0].qty++;
    } else {
      this.order.push({ item, qty: 1 });
    }
  }
```

<!--
getMenu 的邏輯比 P2 的 filterProducts 簡單——沒有「全部」的特殊情況，直接 filter category 相符的項目。addItem 和 P2 的 addToCart 邏輯一樣：filter 找現有項目 → 已存在就 qty++ → 不存在就 push。可以讓同學比較 P2 的 addToCart 和 P4 的 addItem，觀察兩者的共同點，建立「購物車邏輯」的通用模式。
-->

---
layout: default
---

# P4：完整解答 — TypeScript（3/3）

```typescript
  removeItem(id: number): void {
    this.order.forEach(o => {
      if (o.item.id === id) { o.qty--; }
    });
    this.order = this.order.filter(o => o.qty > 0);
  }
  getOrderCount(): number {
    let total = 0;
    for (let o of this.order) { total += o.qty; }
    return total;
  }
  getTotal(): number {
    let total = 0;
    for (let o of this.order) {
      total += o.item.price * o.qty;
    }
    return total;
  }
}
```

<!--
removeItem 是 P4 最獨特的邏輯。第一步用 forEach 找到對應 id 的訂單項目並把 qty--，第二步用 filter 去掉 qty 為 0 的項目，並把結果重新賦值給 this.order。注意 `this.order = this.order.filter(...)` 這個重新賦值——因為 filter 回傳新陣列不修改原陣列，所以必須明確把新陣列存回 this.order，Angular 才會偵測到變更並更新畫面。
-->

---
layout: default
---

# P4：完整解答 — HTML（1/2）

```html
<div class="header">
  <span class="brand">🍜 山水麵館</span>
  <span class="cart-info">📋 餐點
    <span class="badge-num">{{ getOrderCount() }}</span>
  </span>
</div>
<div class="category-nav">
  <button *ngFor="let cat of categories"
    class="cat-btn"
    [class.active]="cat === activeCategory"
    (click)="setCategory(cat)">{{ cat }}</button>
</div>
<div class="main-layout">
  <div class="menu-area">
    <div class="menu-grid">
      <div *ngFor="let item of getMenu()" class="menu-card">
        <div class="item-emoji">{{ item.emoji }}</div>
        <div class="item-name">{{ item.name }}</div>
        <div class="item-price">NT${{ item.price }}</div>
        <button class="add-btn" (click)="addItem(item)">加入</button>
      </div>
    </div>
  </div>
```

<!--
header 的 HTML 比 P2 的 navbar 簡單：只有左側 .brand 和右側 .cart-info（含 badge）。分類按鈕和 P2 完全相同寫法：*ngFor 產生、[class.active] 切換樣式、(click) 呼叫方法。菜單格的 *ngFor 迭代 getMenu() 的回傳值，每次 activeCategory 改變就重新篩選並渲染——這和 P2 的 filterProducts() 是完全相同的機制。
-->

---
layout: default
---

# P4：完整解答 — HTML（2/2）

```html
  <div class="order-panel">
    <div class="order-title">📋 訂單明細</div>
    <div *ngFor="let o of order" class="order-item">
      <span>{{ o.item.name }} x{{ o.qty }}</span>
      <span>NT${{ o.item.price * o.qty }}</span>
      <button (click)="removeItem(o.item.id)">－</button>
    </div>
    <div class="order-total">總計：NT${{ getTotal() }}</div>
    <button class="checkout-btn">結帳</button>
  </div>
</div>
```

<!--
訂單面板的 *ngFor 直接迭代 order 陣列（不是方法），因為 order 本身就是要顯示的資料。`o.item.price * o.qty` 直接在 template 計算小計，不需要另外寫方法。移除按鈕的 `(click)="removeItem(o.item.id)"` 傳入 item.id 而不是整個 item，因為 removeItem 只需要 id 就能找到對應訂單項目——傳最少必要的資料是良好的方法設計習慣。
-->

---
layout: default
---

# P4：完整解答 — CSS（1/3）

```css
.header {
  position: fixed; top: 0; left: 0; right: 0;
  height: 64px; background: #1a5c5c;
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 0 32px; z-index: 200; color: white;
}
body { padding-top: 64px; }
.badge-num {
  background: #e53e3e; color: white; border-radius: 50%;
  padding: 1px 6px; font-size: 0.8rem; margin-left: 4px;
}
.category-nav {
  background: white; padding: 12px 32px;
  border-bottom: 1px solid #e2e8f0; display: flex; gap: 8px;
}
.cat-btn {
  padding: 6px 16px; border: 1px solid #ccc;
  border-radius: 4px; cursor: pointer; color: #666;
  transition: background 0.2s, color 0.2s;
}
.cat-btn.active { background: #1a5c5c; color: white; border-color: #1a5c5c; }
```

<!--
.header 和 .badge-num 的結構和 P2 完全相同，只是 class 名稱不同（navbar → header、cart-badge → badge-num）。.category-nav 用 display: flex + gap: 8px 讓按鈕橫排，和 P2 的 .filter-bar 一樣的概念。可以讓同學對比 P2 和 P4 的 CSS，觀察哪些部分可以複用、哪些有差異，建立「辨識共通 pattern」的能力。
-->

---
layout: default
---

# P4：完整解答 — CSS（2/3）

```css
.main-layout {
  display: flex; gap: 24px;
  padding: 24px 32px; align-items: flex-start;
}
.menu-area { flex: 1; }
.menu-grid { display: flex; flex-wrap: wrap; gap: 16px; }
.menu-card {
  flex: 0 0 calc(50% - 8px);
  border: 2px solid transparent; border-radius: 12px;
  background: white; padding: 16px; text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: border-color 0.2s;
}
.menu-card:hover { border-color: #5eada0; }
.item-emoji { font-size: 2.5rem; margin-bottom: 8px; }
.item-name { font-weight: 600; margin-bottom: 4px; }
.item-price { color: #1a5c5c; font-weight: 700; margin-bottom: 12px; }
```

<!--
.main-layout 用 display: flex + align-items: flex-start 確保右側 order-panel 不被拉伸到和左側等高。如果不加 align-items: flex-start，Flexbox 預設的 stretch 會讓 order-panel 撐滿整頁高度，訂單欄看起來會很奇怪。.menu-card 的 border: 2px solid transparent 佔位邊框技巧讓 hover 時卡片不會因為邊框出現而抖動——這是很多中高級前端工程師才知道的細節。
-->

---
layout: default
---

# P4：完整解答 — CSS（3/3）

```css
.add-btn {
  width: 100%; padding: 6px; background: #1a5c5c;
  color: white; border: none; border-radius: 8px;
  cursor: pointer; transition: background 0.2s;
}
.add-btn:hover { background: #5eada0; }
.order-panel {
  width: 280px; flex-shrink: 0; background: white;
  border-radius: 12px; padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
.order-title { font-weight: 700; color: #1a5c5c; margin-bottom: 12px; }
.order-item {
  display: flex; justify-content: space-between;
  padding: 6px 0; color: #555;
}
.order-total { font-weight: 700; color: #1a5c5c; padding: 8px 0; border-top: 1px solid #e2e8f0; }
.checkout-btn {
  width: 100%; padding: 10px; background: #1a5c5c;
  color: white; border: none; border-radius: 8px;
  cursor: pointer; transition: background 0.2s, color 0.2s;
}
.checkout-btn:hover { background: white; color: #1a5c5c; border: 2px solid #1a5c5c; }
```

<!--
.add-btn 和 P2 的 .add-btn 幾乎一樣，關鍵都是 width: 100%（填滿卡片寬度）和 border: none（移除預設邊框）。.order-panel 的 box-shadow 讓訂單面板有「卡片浮起來」的立體感，和右側的平面背景形成對比。.checkout-btn:hover 做了顏色反轉：背景從深綠變白、文字從白變深綠——這是業界常見的「ghost button」互動設計，讓按鈕看起來更有質感。
-->

---
layout: end
---

# 四大實作專案完成！

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; text-align: left;">
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem; color: #1a5c5c;">
    <strong>📄 P1 個人履歷</strong><br>
    Flexbox 雙欄・技能等級判斷（if/else）・時間軸定位
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem; color: #1a5c5c;">
    <strong>🛍️ P2 電商展示頁</strong><br>
    fixed Navbar・flex-wrap 商品格・badge 定位・分類篩選
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem; color: #1a5c5c;">
    <strong>📊 P3 學習儀表板</strong><br>
    Flexbox 統計卡・資料統計計算・課程記錄顯示
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem; color: #1a5c5c;">
    <strong>🍜 P4 餐廳點餐頁</strong><br>
    fixed header・flex-wrap 菜單格・分類切換・即時計算
  </div>
</div>

<!--
恭喜同學完成四大實作！每一題都涵蓋了真實工作場景中會遇到的 HTML 結構、CSS 排版和 TypeScript 邏輯。建議同學完成後，試著在任何一題加入額外功能：P1 增加「學歷」區塊、P2 加「清空購物車」按鈕、P3 讓進度條用 CSS 寬度動態顯示、P4 讓已點的菜單卡片顯示數量 badge——這樣才能真正把今天學到的技術內化成自己的能力。
-->
