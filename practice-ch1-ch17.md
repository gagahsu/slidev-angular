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
每一題你都需要從空白檔案開始，把 HTML 結構、CSS 樣式、動畫效果和 TypeScript 邏輯全部整合在一起。
-->

---
layout: default
---

# 四大實作專案總覽

| 題號 | 專案名稱 | 主要技術 | 預估時間 |
|---|---|---|---|
| **P1** | 個人履歷頁 | Flexbox 雙欄、技能條動畫、時間軸 | 1.5 hr |
| **P2** | 電商產品展示頁 | CSS Grid、購物車 badge、分類篩選 | 1.5 hr |
| **P3** | 學習進度儀表板 | Grid 統計卡片、進度條動畫、資料排序 | 1.5 hr |
| **P4** | 餐廳菜單點餐頁 | 固定 header、分類切換、即時計算 | 1.5 hr |

<div class="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 text-gray-700 text-sm text-left">
⚠️ 每一題請從<b>空白 .html 檔案</b>開始，不要直接複製解答。<br>
建議順序：看畫面需求 → 自己動手 → 卡住再看提示 → 完成後對照解答
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">📄</div>

# P1 — 個人履歷頁
### Personal Resume Page

**預估時間：1.5 小時**

---
layout: default
---

# P1：畫面需求

<div style="display: flex; gap: 0; border: 2px solid #5eada0; border-radius: 8px; overflow: hidden; font-size: 0.88em;">
  <div style="width: 160px; background: #1a5c5c; color: white; padding: 16px; flex-shrink: 0;">
    <div style="width:60px;height:60px;border-radius:50%;background:#5eada0;border:2px solid white;margin:0 auto 8px;display:flex;align-items:center;justify-content:center;">王</div>
    <div style="text-align:center;margin-bottom:12px;">王小明<br><span style="color:#a7d9d0;font-size:0.85em;">前端工程師</span></div>
    <div style="font-size:0.8em;color:#a7d9d0;">📧 聯絡資訊</div>
    <div style="margin-top:8px;font-size:0.78em;">HTML <span style="color:#5eada0;">████</span><br>CSS <span style="color:#5eada0;">███</span><br>TS <span style="color:#5eada0;">██</span></div>
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

- **左欄（固定 280px）**：深色背景、頭像、聯絡資訊、技能進度條
- **右欄（flex: 1）**：關於我、工作時間軸、學歷

---
layout: default
---

# P1：需要完成的 CSS 效果

**① 整體雙欄排版**
- `display: flex`，左欄 `width: 280px`，右欄 `flex: 1`
- 左欄 `background: #1a5c5c`，`min-height: 100vh`

**② 頭像**
- `border-radius: 50%`，寬高 120px，白色邊框

**③ 技能條動畫**（重點！）
- 灰色軌道 + 彩色填充，用 `@keyframes` 讓填充從 0% 長到目標寬度
- 用 CSS 變數 `--target` 傳入不同技能的目標百分比

**④ 工作時間軸**
- 左側一條垂直線（`position: relative` + `::before`）
- 每個項目左側圓點（`position: absolute`）
- 卡片 hover 時 `transform: translateX(4px)`

**⑤ 全部連結 hover 加 `transition: color 0.2s`**

---
layout: default
---

# P1：需要完成的 TypeScript 邏輯

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
}[] = [ ... ];
```

**③ 需實作的方法**
- `getDuration(start, end)` — end 為 null 回傳 `'~ 現在'`，否則回傳 `'X 年'`
- `getTopSkills()` — 用 `filter` 回傳 percent ≥ 70 的技能

---
layout: default
---

# P1：解答提示 — HTML 骨架結構

```html
<div class="resume">
  <aside class="sidebar">
    <div class="avatar">王</div>
    <h2 class="name">王小明</h2>
    <p class="job-title">前端工程師</p>
    <div class="contact"> ... </div>
    <div class="skills"> ... </div>
  </aside>
  <main class="content">
    <section class="about"> ... </section>
    <section class="experience">
      <div class="timeline">
        <div class="timeline-item"> ... </div>
      </div>
    </section>
  </main>
</div>
```

---
layout: default
---

# P1：解答提示 — 雙欄 + 頭像 CSS

```css
.resume {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 280px;
  background: #1a5c5c;
  color: white;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #5eada0;
  border: 4px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}
```

---
layout: default
---

# P1：解答提示 — 技能條 @keyframes

```css
.bar {
  height: 8px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  overflow: hidden;
}
.fill {
  height: 100%;
  background: #5eada0;
  width: 0;
  animation: growBar 1.2s ease forwards;
}
@keyframes growBar {
  to { width: var(--target); }
}
.fill-90 { --target: 90%; animation-delay: 0.2s; }
.fill-80 { --target: 80%; animation-delay: 0.4s; }
.fill-65 { --target: 65%; animation-delay: 0.6s; }
```

---
layout: default
---

# P1：解答提示 — 時間軸 CSS

```css
.timeline {
  position: relative;
  padding-left: 32px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 8px; top: 0; bottom: 0;
  width: 2px;
  background: #c8e6e3;
}
.timeline-dot {
  position: absolute;
  left: -28px; top: 6px;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: #5eada0;
}
.timeline-card:hover {
  transform: translateX(4px);
  transition: transform 0.2s;
}
```

---
layout: default
---

# P1：解答提示 — TypeScript 方法

```typescript
getDuration(start: number, end: number | null): string {
  if (end === null) return '~ 現在';
  return `${end - start} 年`;
}
```

```typescript
getTopSkills() {
  return this.skills.filter(s => s.percent >= 70);
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>end === null</code> 用三等號嚴格比對；<code>filter</code> 回傳符合條件的新陣列，不改動原始資料
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">🛍️</div>

# P2 — 電商產品展示頁
### Product Showcase Page

**預估時間：1.5 小時**

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
  <div style="background:linear-gradient(135deg,#1a5c5c,#5eada0);color:white;text-align:center;padding:16px;font-weight:600;">歡迎來到 My Shop — 精選好物一次搞定</div>
  <div style="padding:8px 14px;background:#f8fffe;display:flex;gap:6px;">
    <span style="background:#1a5c5c;color:white;padding:3px 10px;border-radius:4px;">全部</span>
    <span style="border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">前端</span>
    <span style="border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">後端</span>
    <span style="border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">工具書</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:10px 14px;background:#f8fffe;">
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;">📘<br>Angular<br><b style="color:#1a5c5c;">$880</b></div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;">📗<br>CSS精通<br><b style="color:#1a5c5c;">$650</b></div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;">📙<br>Node.js<br><b style="color:#1a5c5c;">$750</b></div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;">📕<br>Git<br><b style="color:#1a5c5c;">$420</b></div>
  </div>
</div>

- **Navbar**：`position: fixed`，左 Logo，右連結 + 購物車 badge
- **Hero**：漸層背景，垂直水平置中
- **商品 Grid**：`display: grid` 四欄，卡片 hover 浮起

---
layout: default
---

# P2：需要完成的 CSS 效果

**① 固定 Navbar + body 偏移**
- `position: fixed; top: 0; z-index: 100`
- `body { padding-top: 64px; }` 避免內容被蓋住

**② 購物車 badge**
- 父元素 `position: relative`
- badge 用 `position: absolute; top: -8px; right: -12px`
- 紅色圓形（`border-radius: 50%`），寬高 20px

**③ Hero 橫幅**
- `background: linear-gradient(135deg, #1a5c5c, #5eada0)`
- `display: flex; align-items: center; justify-content: center; height: 250px`

**④ 商品 Grid + 卡片 hover**
- `grid-template-columns: repeat(4, 1fr); gap: 20px`
- 卡片 hover：`transform: translateY(-6px)` + `box-shadow` 加深

**⑤ 篩選按鈕 `.active` 狀態**
- background 和 border-color 切換，`transition: all 0.2s`

---
layout: default
---

# P2：需要完成的 TypeScript 邏輯

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
}
interface CartItem {
  product: Product;
  qty: number;
}
```

**需實作的方法：**

1. `filterProducts(category)` — `'全部'` 回傳全部，否則 `filter` 篩選
2. `addToCart(product)` — 已存在就 `qty++`，否則 `push` 新項目
3. `getCartCount()` — for...of 加總所有 `qty`
4. `getCartTotal()` — 回傳 `price × qty` 總金額

---
layout: default
---

# P2：解答提示 — Navbar HTML

```html
<nav class="navbar">
  <div class="brand">🅰 My Shop</div>
  <ul class="nav-links">
    <li><a href="#">首頁</a></li>
    <li><a href="#">商品</a></li>
  </ul>
  <div class="cart-icon">
    🛒 購物車
    <span class="cart-badge">3</span>
  </div>
</nav>
```

---
layout: default
---

# P2：解答提示 — Navbar + Badge CSS

```css
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: 64px; background: #1a5c5c;
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 0 40px; z-index: 100;
}
body { padding-top: 64px; }
.cart-icon { position: relative; color: white; }
.cart-badge {
  position: absolute; top: -8px; right: -12px;
  background: #e53e3e; color: white;
  border-radius: 50%; width: 20px; height: 20px;
  font-size: 0.75rem;
  display: flex; align-items: center; justify-content: center;
}
```

---
layout: default
---

# P2：解答提示 — Grid + 卡片 CSS

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 32px 40px;
}
.product-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: white;
  transition: transform 0.25s, box-shadow 0.25s;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.15);
}
.product-img {
  height: 180px; background: #f0faf9;
  display: flex; align-items: center;
  justify-content: center; font-size: 4rem;
}
```

---
layout: default
---

# P2：解答提示 — TypeScript 方法

```typescript
addToCart(product: Product): void {
  const found = this.cart.find(c => c.product.id === product.id);
  if (found) {
    found.qty++;
  } else {
    this.cart.push({ product, qty: 1 });
  }
}
```

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
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">📊</div>

# P3 — 學習進度儀表板
### Learning Dashboard

**預估時間：1.5 小時**

---
layout: default
---

# P3：畫面需求

<div style="border:2px solid #5eada0;border-radius:8px;overflow:hidden;font-size:0.82em;">
  <div style="background:#1a5c5c;color:white;padding:9px 16px;display:flex;justify-content:space-between;">
    <span style="font-weight:700;">📚 學習進度儀表板</span>
    <span style="color:#a7d9d0;">2025/06/28</span>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:10px 14px;background:#f8fffe;">
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#1a5c5c;">12</div><div style="color:#666;">已完成</div>
    </div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#e07b39;">5</div><div style="color:#666;">學習中</div>
    </div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#1a5c5c;">48h</div><div style="color:#666;">總時數</div>
    </div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#5eada0;">70%</div><div style="color:#666;">完成率</div>
    </div>
  </div>
  <div style="padding:8px 14px;background:#f0faf9;border-top:1px solid #c8e6e3;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
      <span style="width:72px;color:#666;">HTML</span>
      <div style="flex:1;height:8px;background:#e2e8f0;border-radius:4px;"><div style="width:80%;height:100%;background:#e07b39;border-radius:4px;"></div></div>
      <span style="width:32px;text-align:right;color:#666;">80%</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
      <span style="width:72px;color:#666;">CSS</span>
      <div style="flex:1;height:8px;background:#e2e8f0;border-radius:4px;"><div style="width:70%;height:100%;background:#5eada0;border-radius:4px;"></div></div>
      <span style="width:32px;text-align:right;color:#666;">70%</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="width:72px;color:#666;">TypeScript</span>
      <div style="flex:1;height:8px;background:#e2e8f0;border-radius:4px;"><div style="width:40%;height:100%;background:#a7d9d0;border-radius:4px;"></div></div>
      <span style="width:32px;text-align:right;color:#666;">40%</span>
    </div>
  </div>
  <div style="padding:8px 14px;background:#f8fffe;border-top:1px solid #e2e8f0;font-size:0.9em;">
    <div style="color:#666;">● HTML 表單練習 &nbsp;<span style="background:#d4edda;color:#1a6e2e;border-radius:8px;padding:1px 7px;">已完成</span>&nbsp; 2025/06/27</div>
    <div style="color:#666;">● CSS Flexbox &nbsp;<span style="background:#d4edda;color:#1a6e2e;border-radius:8px;padding:1px 7px;">已完成</span>&nbsp; 2025/06/26</div>
    <div style="color:#666;">● TypeScript 基礎 &nbsp;<span style="background:#fff3cd;color:#856404;border-radius:8px;padding:1px 7px;">學習中</span>&nbsp; 2025/06/25</div>
  </div>
</div>

---
layout: default
---

# P3：需要完成的 CSS 效果

**① 統計卡片列**
- `grid-template-columns: repeat(4, 1fr); gap: 16px`
- 數字用 `font-size: 2.5rem`，顏色為主題色
- hover 時整張卡片背景變主題色、文字變白（`transition: background 0.25s, color 0.25s`）

**② 進度條動畫**（重點！）
- 灰色軌道 + 彩色填充
- 用 `@keyframes` 讓填充從 width: 0 動態延伸到 `var(--w)`
- 不同科目用 `animation-delay` 錯開，效果更漂亮

**③ 課程記錄列表**
- 每筆左側有彩色圓點（已完成綠、學習中橘）
- 狀態 badge：圓角膠囊，顏色依狀態切換
- hover 時該列背景微亮（`background: #f8fffe`）

---
layout: default
---

# P3：需要完成的 TypeScript 邏輯

```typescript
interface CourseRecord {
  name: string;
  status: 'completed' | 'in-progress';
  date: string;
}
subjects = [
  { name: 'HTML', progress: 80, color: '#e07b39' },
  { name: 'CSS',  progress: 70, color: '#5eada0' },
];
records: CourseRecord[] = [ ... ];
```

**需實作的方法：**
1. `getCompletedCount()` — `filter` 篩選 `completed` 後取 `length`
2. `getInProgressCount()` — 同上，篩選 `in-progress`
3. `getTotalHours()` — `records.length × 2.5`
4. `getCompletionRate()` — 用 `Math.round` 算百分比，回傳字串 `'70%'`
5. `getSortedByDate()` — `[...records].sort((a,b) => b.date.localeCompare(a.date))`

---
layout: default
---

# P3：解答提示 — 統計卡片 CSS

```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}
.stat-card {
  background: white; border-radius: 12px;
  padding: 24px; text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.25s, color 0.25s;
}
.stat-card:hover { background: #1a5c5c; color: white; }
.stat-value {
  font-size: 2.5rem; font-weight: 900; color: #1a5c5c;
}
.stat-card:hover .stat-value { color: white; }
```

---
layout: default
---

# P3：解答提示 — 進度條動畫 CSS

```css
.progress-track {
  flex: 1; height: 12px;
  background: #e2e8f0; border-radius: 6px;
  overflow: hidden;
}
.progress-fill {
  height: 100%; border-radius: 6px;
  width: 0;
  background: var(--bar-color);
  animation: fillBar 1.4s ease forwards;
}
@keyframes fillBar {
  to { width: var(--w); }
}
```

```html
<!-- HTML 用 CSS 變數傳入寬度與顏色 -->
<div class="progress-fill"
  style="--w: 80%; --bar-color: #e07b39; animation-delay: 0.2s">
</div>
```

---
layout: default
---

# P3：解答提示 — TypeScript 方法

```typescript
getCompletedCount() {
  const done = this.records
    .filter(r => r.status === 'completed');
  return done.length;
}
getCompletionRate() {
  const rate = this.getCompletedCount() / this.records.length;
  return Math.round(rate * 100) + '%';
}
```

```typescript
getSortedByDate() {
  return [...this.records].sort(
    (a, b) => b.date.localeCompare(a.date)
  );
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>[...this.records]</code> 先複製陣列再排序，避免直接修改原始資料
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">🍜</div>

# P4 — 餐廳菜單點餐頁
### Restaurant Menu & Order Page

**預估時間：1.5 小時**

---
layout: default
---

# P4：畫面需求

<div style="border:2px solid #1a5c5c;border-radius:8px;overflow:hidden;font-size:0.82em;">
  <div style="background:#1a5c5c;color:white;padding:9px 16px;display:flex;justify-content:space-between;align-items:center;">
    <span style="font-weight:700;">🍜 山水麵館</span>
    <span>📋 我的餐點 <span style="background:#e53e3e;border-radius:50%;padding:1px 5px;">2</span></span>
  </div>
  <div style="background:white;padding:7px 14px;border-bottom:2px solid #e2e8f0;display:flex;gap:8px;">
    <span style="background:#1a5c5c;color:white;padding:3px 10px;border-radius:4px;">麵食</span>
    <span style="border:1px solid #ccc;padding:3px 10px;border-radius:4px;color:#666;">湯品</span>
    <span style="border:1px solid #ccc;padding:3px 10px;border-radius:4px;color:#666;">小菜</span>
    <span style="border:1px solid #ccc;padding:3px 10px;border-radius:4px;color:#666;">飲料</span>
  </div>
  <div style="display:flex;gap:0;background:#f8fffe;">
    <div style="flex:1;padding:10px 14px;border-right:1px solid #e2e8f0;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <div style="border:1px solid #e2e8f0;border-radius:8px;padding:8px;background:white;text-align:center;">🍜<br>招牌牛肉麵<br><span style="color:#1a5c5c;font-weight:700;">NT$180</span></div>
        <div style="border:1px solid #e2e8f0;border-radius:8px;padding:8px;background:white;text-align:center;">🍲<br>酸辣湯<br><span style="color:#1a5c5c;font-weight:700;">NT$60</span></div>
      </div>
    </div>
    <div style="width:200px;flex-shrink:0;padding:10px 12px;background:white;">
      <div style="font-weight:700;color:#1a5c5c;margin-bottom:6px;">📋 訂單明細</div>
      <div style="font-size:0.9em;color:#666;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:6px;">
        <div>招牌牛肉麵 x1 &nbsp;NT$180</div>
        <div>酸辣湯 x2 &nbsp;&nbsp;&nbsp;&nbsp;NT$120</div>
      </div>
      <div style="font-weight:700;color:#1a5c5c;margin-bottom:6px;">總計：NT$300</div>
      <div style="background:#1a5c5c;color:white;text-align:center;padding:4px;border-radius:6px;">結帳</div>
    </div>
  </div>
</div>

- `position: fixed` header（64px）
- `position: sticky` 分類列（黏在 header 下方）
- 左側 2 欄菜單，右側固定訂單欄

---
layout: default
---

# P4：需要完成的 CSS 效果

**① 三層固定排版（最難！）**
- Header：`position: fixed; top: 0; z-index: 200; height: 64px`
- `body { padding-top: 64px; }` 避免內容被蓋住
- 分類列：`position: sticky; top: 64px; z-index: 100`

**② 左右分欄**
- `.main-layout { display: flex; gap: 24px; padding: 24px; }`
- 左側 `flex: 1`，右側訂單欄 `width: 300px; flex-shrink: 0`
- 右側訂單欄也用 `position: sticky; top: calc(64px + 分類列高度)`

**③ 菜單卡片**
- 2 欄 Grid：`grid-template-columns: repeat(2, 1fr)`
- hover 時邊框顏色改為主題色（`border: 2px solid transparent` → `border-color: #5eada0`）

**④ 結帳按鈕**
- 全寬，hover 時背景/文字顏色反轉（`outline` 風格效果）

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

**需實作的方法：**
1. `getMenu()` — 依 `activeCategory` 篩選（`'全部'` 不篩選）
2. `addItem(item)` — 已存在就 `qty++`，否則 push
3. `removeItem(id)` — qty--，若 qty 為 0 用 `filter` 移除
4. `getOrderCount()` — for...of 加總所有 qty
5. `getTotal()` — for...of 計算 price × qty 總金額

---
layout: default
---

# P4：解答提示 — 三層定位 CSS

```css
.header {
  position: fixed; top: 0; left: 0; right: 0;
  height: 64px; background: #1a5c5c;
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 0 32px; z-index: 200; color: white;
}
body { padding-top: 64px; }
.category-nav {
  position: sticky; top: 64px;
  background: white; padding: 12px 32px;
  border-bottom: 1px solid #e2e8f0;
  display: flex; gap: 8px; z-index: 100;
}
.cat-btn.active {
  color: #1a5c5c; font-weight: 700;
  border-bottom: 3px solid #1a5c5c;
}
```

---
layout: default
---

# P4：解答提示 — 右側訂單欄 CSS

```css
.main-layout {
  display: flex; gap: 24px; padding: 24px 32px;
  align-items: flex-start;
}
.menu-area { flex: 1; }
.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.order-panel {
  width: 300px; flex-shrink: 0;
  position: sticky; top: 130px;
  background: white; border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
```

---
layout: default
---

# P4：解答提示 — TypeScript 方法（加 / 移除）

```typescript
addItem(item: MenuItem): void {
  const found = this.order.find(o => o.item.id === item.id);
  if (found) {
    found.qty++;
  } else {
    this.order.push({ item, qty: 1 });
  }
}
```

```typescript
removeItem(id: number): void {
  const found = this.order.find(o => o.item.id === id);
  if (!found) return;
  found.qty--;
  if (found.qty === 0) {
    this.order = this.order.filter(o => o.item.id !== id);
  }
}
```

---
layout: default
---

# P4：解答提示 — TypeScript 方法（計算）

```typescript
getOrderCount(): number {
  let total = 0;
  for (let o of this.order) { total += o.qty; }
  return total;
}
```

```typescript
getTotal(): number {
  let total = 0;
  for (let o of this.order) {
    total += o.item.price * o.qty;
  }
  return total;
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 加總邏輯用 <code>for...of</code>，語法比傳統 for 迴圈更簡潔清晰
</div>

---
layout: end
---

# 四大實作專案完成！

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; text-align: left;">
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem;">
    <strong>📄 P1 個人履歷</strong><br>
    Flexbox 雙欄・技能條 @keyframes・時間軸定位
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem;">
    <strong>🛍️ P2 電商展示頁</strong><br>
    fixed Navbar・CSS Grid・badge 定位・分類篩選
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem;">
    <strong>📊 P3 學習儀表板</strong><br>
    Grid 統計卡・進度條動畫・資料排序
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem;">
    <strong>🍜 P4 餐廳點餐頁</strong><br>
    sticky 三層排版・分類切換・即時計算
  </div>
</div>
