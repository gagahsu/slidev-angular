---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 綜合實作補充教材
routeAlias: practice-supplement
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
    綜合實作補充教材
  </h1>
  <div style="height: 4px; width: 380px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.1rem; font-style: italic; margin-bottom: 0.5rem;">
    「四大實作專案（Ch1–17 綜合練習）用到的技術補充」
  </p>
  <p style="color: #9dc4c4; font-size: 0.95rem;">CSS 8 個技術點・TypeScript 4 個技術點</p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 1.5rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
本份補充教材原本內嵌在「綜合實作練習 Ch1–17」投影片中，現已獨立成冊，方便同學單獨查閱或複習。內容涵蓋四大實作專案（P1 個人履歷頁、P2 電商展示頁、P3 學習儀表板、P4 餐廳點餐頁）會用到、但 CH9–CH17 尚未教過的 CSS 與 TypeScript 技術，包含 CSS 變數、@keyframes、Grid、transition、transform、::before、calc()、linear-gradient()，以及 TypeScript 的 find、sort、Math.round、spread。建議在開始實作前先過一遍本教材，卡關時也可以隨時回來查閱。
-->

---
layout: default
---

# Outline

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1rem; text-align: left;">
  <div>

**CSS 技術前導**
1. CSS 變數（Custom Properties）
2. @keyframes 動畫
3. CSS Grid
4. transition 過渡效果
5. transform 位移與縮放
6. ::before 偽元素
7. calc() 混合單位計算
8. linear-gradient() 漸層背景

  </div>
  <div>

**TypeScript 技術前導**
1. Array.find()
2. Array.sort()（含 localeCompare()）
3. Math.round()
4. spread 複製陣列

  </div>
</div>

<!--
補充教材依 CSS → TypeScript 的順序排列，和「綜合實作練習 Ch1–17」原本的順序一致。每個技術點都會標註是哪個實作專案（P1–P4）會用到，方便同學對照練習內容查找。
-->

---
layout: default
---

# CSS 變數（Custom Properties）

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

# @keyframes 動畫

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

```html
<!-- 用 style 傳入不同 animation-delay，讓多條進度條錯開起跑時間 -->
<div class="fill" style="--target: 90%; animation-delay: 0.2s"></div>
<div class="fill" style="--target: 65%; animation-delay: 0.4s"></div>
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

# CSS Grid

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

# transition 過渡效果

`transition` 讓 CSS 屬性值改變時不要瞬間跳，而是平滑過渡到新的值，常搭配 `:hover` 做互動效果：

```css
.card {
  transition: transform 0.3s ease;
  /*          屬性名    時間  速度曲線 */
}
.card:hover {
  transform: translateY(-6px);
}

/* 同時過渡多個屬性，用逗號分隔 */
.filter-btn {
  transition: background 0.2s, color 0.2s;
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>transition</code> 寫在<b>預設狀態</b>（不是 <code>:hover</code> 裡），瀏覽器進入和離開 hover 時才會雙向套用過渡效果
</div>

<!--
transition 是「屬性值改變時怎麼變」的規則，本身不會觸發變化，要搭配 :hover、[class.active] 等會改變屬性值的情境才看得出效果。語法是 transition: 屬性名 時間 速度曲線，屬性名只監控指定屬性（也可以寫 all 監控全部，但效能較差）。最容易犯的錯是把 transition 寫在 :hover 裡面——這樣只有「進入」hover 時有過渡，滑鼠移開會瞬間跳回去，一定要寫在預設狀態才會雙向生效。速度曲線最常用 ease（先快後慢），也可以用 linear（等速）。
-->

---
layout: default
---

# transform 位移與縮放

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

# ::before 偽元素

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

# calc() 混合單位計算

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

# linear-gradient() 漸層背景

`linear-gradient()` 建立線性漸層，可替代純色背景，做出質感更豐富的橫幅或按鈕：

```css
/* 角度 → 色票列表 */
.hero-banner {
  background: linear-gradient(135deg, #1a5c5c 0%, #5eada0 100%);
}
/* 多色漸層 */
.gradient-bar {
  background: linear-gradient(90deg, #5eada0 0%, #a7d9d0 50%, #ffffff 100%);
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

# Array.find()

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

# Array.sort()（1/2）

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

# Array.sort() + localeCompare()（2/2）

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

# Math.round()

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

# spread 複製陣列（1/2）

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

# spread 複製陣列（2/2）

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
layout: end
---

# 補充教材結束

回到「綜合實作練習 Ch1–17」開始動手實作四大專案，卡關時隨時可以回來查閱本教材。

<Link to="practice-ch17" style="color: #9dc4c4; font-size: 0.95rem; margin-top: 1rem; text-decoration: none; letter-spacing: 0.05em;">→ 前往綜合實作練習</Link>
