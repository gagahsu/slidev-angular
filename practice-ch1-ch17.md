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
每一題你都需要從空白檔案開始，把 HTML 結構、CSS 樣式、動畫效果和 TypeScript 邏輯全部整合在一起，做出一個可以在瀏覽器裡看到完整畫面的網頁。
-->

---
layout: default
---

# 四大實作專案總覽

| 題號 | 專案名稱 | 主要技術 | 預估時間 |
|---|---|---|---|
| **P1** | 個人履歷頁 | Flexbox 雙欄、技能條動畫、時間軸 | 1.5 hr |
| **P2** | 電商產品展示頁 | CSS Grid、購物車 badge、分類篩選 | 1.5 hr |
| **P3** | 學習進度儀表板 | Grid 統計卡片、進度條、資料排序 | 1.5 hr |
| **P4** | 餐廳菜單點餐頁 | 固定 header、分類切換、即時計算 | 1.5 hr |

<div class="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 text-gray-700 text-sm text-left">
⚠️ 每一題都請從<b>空白 .html 檔案</b>開始，不要複製貼上，練習才有效果！<br>
建議先看「畫面需求」→ 自己動手做 → 完成後再對照參考解答。
</div>

<!--
這四題的難度是遞增的，但每一題都在 ch1 到 ch17 的知識範圍內，不會出現你沒學過的東西。
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
第一個專案是個人履歷頁。
這是前端工程師求職時最常需要做的頁面之一，也是展示你 HTML + CSS 能力的最佳作品。
-->

---
layout: default
---

# P1：畫面需求

```
┌─────────────────────────────────────────────────────────┐
│                    個人履歷                              │
│   ┌──────────┐  ┌─────────────────────────────────────┐ │
│   │          │  │  王小明                              │ │
│   │  頭像圓圈 │  │  前端工程師                         │ │
│   │  120×120 │  │  ───────────────────────────────    │ │
│   │          │  │  關於我                              │ │
│   ├──────────┤  │  一段自我介紹文字...                 │ │
│   │ 聯絡資訊  │  │                                     │ │
│   │ 技能清單  │  │  工作經歷  (時間軸樣式)              │ │
│   │ HTML ████│  │  ● 2023 ~ 現在  XX公司              │ │
│   │ CSS  ███ │  │  ● 2021 ~ 2023  YY公司              │ │
│   │ TS   ██  │  │                                     │ │
│   └──────────┘  │  學歷                               │ │
│                 └─────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**左欄（側邊欄）**：頭像、姓名、聯絡資訊、技能進度條
**右欄（主內容）**：關於我、工作經歷時間軸、學歷

---
layout: default
---

# P1：CSS 技術清單

完成以下每一個 CSS 效果：

**① 整體排版**
- 整個頁面用 `display: flex` 分成**左欄（280px 固定）+ 右欄（flex: 1 撐滿）**
- 左欄有深色背景（`#1a5c5c`），右欄白色
- 最小高度 `min-height: 100vh`

**② 左欄元件**
- 頭像：圓形（`border-radius: 50%`），寬高 120px，白色邊框，水平置中
- 技能條：灰色背景軌道 + 彩色填充，**用 CSS animation 讓它從 0% 長到目標寬度**（`@keyframes`）

**③ 右欄元件**
- 時間軸：左側有一條垂直線，每個項目左側有圓點，用 `position: relative / absolute` 實作
- 每個時間軸卡片 hover 時向右位移 `4px`（`transform: translateX(4px)`）

**④ 其他**
- 所有連結 hover 時顏色改變 + `transition: 0.2s`
- 頁面有漸層背景色（右欄上方用 `background: linear-gradient`）

---
layout: default
---

# P1：TypeScript 邏輯清單

在 Angular 元件的 `.ts` 檔（或模擬用的純 TS 物件）中完成：

**① 資料宣告**

```typescript
// 技能資料：名稱 + 百分比
skills: { name: string; percent: number }[] = [
  { name: 'HTML', percent: 90 },
  { name: 'CSS',  percent: 80 },
  { name: 'TypeScript', percent: 65 },
  { name: 'Angular', percent: 55 },
];

// 工作經歷：公司、職稱、開始/結束年份、描述
experiences: { company: string; title: string; start: number; end: number | null; desc: string }[] = [...];
```

**② 方法**
- `getDuration(start, end)` — 回傳字串，若 end 為 null 則顯示「~現在」，否則顯示年數差：`'2 年'`
- `getTopSkills()` — 回傳 percent ≥ 70 的技能陣列（用 `filter`）

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 純 HTML 練習時，技能資料可以先寫死在 HTML 裡；Angular 版本才用 TS 資料驅動
</div>

---
layout: default
---

# P1：解答參考 — HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>個人履歷 - 王小明</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="resume">

    <!-- 左欄：側邊欄 -->
    <aside class="sidebar">
      <div class="avatar">王</div>
      <h2 class="name">王小明</h2>
      <p class="job-title">前端工程師</p>
      <div class="contact">
        <p>📧 ming@example.com</p>
        <p>📱 0912-345-678</p>
        <p>🔗 github.com/mingwang</p>
      </div>
      <div class="skills">
        <h3>技能</h3>
        <div class="skill"><span>HTML</span><div class="bar"><div class="fill fill-90"></div></div></div>
        <div class="skill"><span>CSS</span><div class="bar"><div class="fill fill-80"></div></div></div>
        <div class="skill"><span>TypeScript</span><div class="bar"><div class="fill fill-65"></div></div></div>
        <div class="skill"><span>Angular</span><div class="bar"><div class="fill fill-55"></div></div></div>
      </div>
    </aside>

    <!-- 右欄：主內容 -->
    <main class="content">
      <section class="about">
        <h2>關於我</h2>
        <p>熱愛前端開發，喜歡把設計稿變成真實的網頁。擅長 Angular 框架開發，追求乾淨且有架構的程式碼。</p>
      </section>
      <section class="experience">
        <h2>工作經歷</h2>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <h4>資深前端工程師 — 科技股份有限公司</h4>
              <p class="period">2023 ~ 現在（2 年）</p>
              <p>負責 Angular 前端架構設計，帶領三人小組完成電商平台重構。</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <h4>前端工程師 — 網路新創公司</h4>
              <p class="period">2021 ~ 2023（2 年）</p>
              <p>開發公司官網與後台管理系統，導入 TypeScript 與 CSS 模組化架構。</p>
            </div>
          </div>
        </div>
      </section>
      <section class="education">
        <h2>學歷</h2>
        <p><strong>國立台灣大學</strong> — 資訊工程學系學士（2017–2021）</p>
      </section>
    </main>

  </div>
</body>
</html>
```

---
layout: default
---

# P1：解答參考 — CSS（一）

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Noto Sans TC', sans-serif; color: #333; }

/* 整體雙欄 */
.resume {
  display: flex;
  min-height: 100vh;
}

/* 左欄側邊欄 */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  background: #1a5c5c;
  color: white;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  width: 120px; height: 120px;
  border-radius: 50%;
  background: #5eada0;
  border: 4px solid white;
  display: flex; align-items: center; justify-content: center;
  font-size: 2.5rem; font-weight: 900;
  margin-bottom: 16px;
}
.name { font-size: 1.5rem; font-weight: 700; margin-bottom: 4px; }
.job-title { color: #a7d9d0; font-size: 0.95rem; margin-bottom: 24px; }

.contact { width: 100%; font-size: 0.9rem; margin-bottom: 28px; }
.contact p { margin-bottom: 8px; }
.contact a { color: #a7d9d0; text-decoration: none; transition: color 0.2s; }
.contact a:hover { color: white; }
```

---
layout: default
---

# P1：解答參考 — CSS（二）技能條動畫

```css
/* 技能條 */
.skills { width: 100%; }
.skills h3 { margin-bottom: 12px; font-size: 1rem; letter-spacing: 0.1em; }
.skill { margin-bottom: 12px; }
.skill span { font-size: 0.85rem; display: block; margin-bottom: 4px; }
.bar {
  height: 8px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  overflow: hidden;
}
.fill {
  height: 100%;
  background: #5eada0;
  border-radius: 4px;
  width: 0;                /* 起始為 0 */
  animation: growBar 1.2s ease forwards;
}

/* 關鍵影格：從 0 長到目標寬度 */
@keyframes growBar { to { width: var(--target); } }

.fill-90 { --target: 90%; animation-delay: 0.2s; }
.fill-80 { --target: 80%; animation-delay: 0.4s; }
.fill-65 { --target: 65%; animation-delay: 0.6s; }
.fill-55 { --target: 55%; animation-delay: 0.8s; }
```

---
layout: default
---

# P1：解答參考 — CSS（三）時間軸

```css
/* 右欄主內容 */
.content {
  flex: 1;
  padding: 48px 40px;
  background: #f8fffe;
}
.content h2 {
  font-size: 1.4rem;
  color: #1a5c5c;
  border-bottom: 3px solid #5eada0;
  padding-bottom: 8px;
  margin: 32px 0 20px;
}

/* 時間軸 */
.timeline { position: relative; padding-left: 32px; }
.timeline::before {            /* 垂直線 */
  content: '';
  position: absolute;
  left: 8px; top: 0; bottom: 0;
  width: 2px;
  background: #c8e6e3;
}
.timeline-item { position: relative; margin-bottom: 28px; }
.timeline-dot {                /* 圓點 */
  position: absolute;
  left: -28px; top: 6px;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: #5eada0;
  border: 2px solid white;
  box-shadow: 0 0 0 3px #5eada0;
}
.timeline-card {
  background: white;
  border-radius: 10px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}
.timeline-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
.period { color: #5eada0; font-size: 0.85rem; margin: 4px 0 8px; }
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">🛍️</div>

# P2 — 電商產品展示頁
### Product Showcase Page

**預估時間：1.5 小時**

<!--
第二個專案是電商產品展示頁，這是業界最常見的頁面類型之一，幾乎每個前端工程師都一定做過。
-->

---
layout: default
---

# P2：畫面需求

```
┌───────────────────────────────────────────────────────────┐
│  🅰 My Shop          首頁  商品  關於      🛒 購物車 (3)  │  ← 固定導覽列
├───────────────────────────────────────────────────────────┤
│        歡迎來到 My Shop — 精選好物一次搞定                │  ← Hero banner
├───────────────────────────────────────────────────────────┤
│  [全部]  [前端]  [後端]  [工具書]          ← 分類篩選按鈕  │
│                                                           │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐         │
│  │ 圖片區  │  │ 圖片區  │  │ 圖片區  │  │ 圖片區  │        │
│  │ Angular │  │ CSS精通│  │Node.js │  │ Git教學│        │
│  │ NT$880  │  │ NT$650 │  │ NT$750 │  │ NT$420 │        │
│  │[加入購物]│  │[加入購]│  │[加入購]│  │[加入購]│        │  ← hover 翻轉效果
│  └────────┘  └────────┘  └────────┘  └────────┘         │
└───────────────────────────────────────────────────────────┘
```

**Navbar**：左邊 Logo、右邊連結 + 購物車 icon 加數量 badge
**Hero**：全寬大標題橫幅，漸層背景
**篩選列**：點擊按鈕切換分類（active 樣式改變）
**商品 Grid**：`display: grid` 四欄，卡片 hover 時翻轉 or 浮起

---
layout: default
---

# P2：CSS 技術清單

**① Navbar（固定導覽列）**
- `position: fixed; top: 0; width: 100%;` — 固定在頂部
- Flexbox：左右分開（`justify-content: space-between`）
- 購物車數量 badge：`position: absolute` 釘在 icon 右上角，紅色圓形

**② Hero Banner**
- `background: linear-gradient(135deg, #1a5c5c, #5eada0)` 漸層
- 文字垂直水平置中（Flexbox `justify-content: center; align-items: center`）
- 高度 `250px`

**③ 分類篩選按鈕**
- 有 `.active` class 時背景變深色，`border` 加粗
- hover 時背景微變深 + `transition: 0.2s`

**④ 商品 Grid + 卡片效果**
- `display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;`
- 卡片 hover 時：`transform: translateY(-6px)` + `box-shadow` 加深
- 圖片區域：固定高度 180px，背景用淺色（`#f0faf9`），有 icon 佔位

---
layout: default
---

# P2：TypeScript 邏輯清單

```typescript
// 商品資料結構
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;   // '前端' | '後端' | '工具書'
  emoji: string;      // 圖片用 emoji 代替
}

// 購物車項目
interface CartItem {
  product: Product;
  qty: number;
}
```

**需要實作的方法：**

1. `filterProducts(category: string): Product[]`
   — 若 category 為 `'全部'` 回傳全部，否則用 `filter` 篩選

2. `addToCart(product: Product): void`
   — 若商品已在購物車，`qty++`；否則 `push` 新項目進去

3. `getCartCount(): number`
   — 回傳購物車所有商品的 `qty` 加總（for...of 累加）

4. `getCartTotal(): number`
   — 回傳 `price × qty` 的總金額

---
layout: default
---

# P2：解答參考 — HTML 結構

```html
<body>
  <!-- 固定 Navbar -->
  <nav class="navbar">
    <div class="brand">🅰 My Shop</div>
    <ul class="nav-links">
      <li><a href="#">首頁</a></li>
      <li><a href="#">商品</a></li>
      <li><a href="#">關於</a></li>
    </ul>
    <div class="cart-icon">
      🛒 購物車
      <span class="cart-badge">3</span>
    </div>
  </nav>

  <!-- Hero Banner -->
  <section class="hero">
    <h1>歡迎來到 My Shop</h1>
    <p>精選好物，一次搞定</p>
  </section>

  <!-- 篩選按鈕列 -->
  <div class="filter-bar">
    <button class="filter-btn active">全部</button>
    <button class="filter-btn">前端</button>
    <button class="filter-btn">後端</button>
    <button class="filter-btn">工具書</button>
  </div>

  <!-- 商品 Grid -->
  <div class="product-grid">
    <div class="product-card">
      <div class="product-img">📘</div>
      <div class="product-info">
        <h3>Angular 實戰課程</h3>
        <p class="category-tag">前端</p>
        <p class="price">NT$ 880</p>
        <button class="add-btn">加入購物車</button>
      </div>
    </div>
    <!-- 重複 3 ~ 8 張卡片 -->
  </div>
</body>
```

---
layout: default
---

# P2：解答參考 — CSS 重點

```css
/* 固定 Navbar */
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: 64px;
  background: #1a5c5c;
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 100;
}
body { padding-top: 64px; }   /* 避免被 Navbar 蓋到 */

/* 購物車 badge */
.cart-icon { position: relative; color: white; cursor: pointer; }
.cart-badge {
  position: absolute;
  top: -8px; right: -12px;
  background: #e53e3e;
  color: white;
  border-radius: 50%;
  width: 20px; height: 20px;
  font-size: 0.75rem;
  display: flex; align-items: center; justify-content: center;
}

/* 商品 Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 32px 40px;
  max-width: 1200px;
  margin: 0 auto;
}
.product-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: white;
  transition: transform 0.25s, box-shadow 0.25s;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.15);
}
.product-img {
  height: 180px;
  background: #f0faf9;
  display: flex; align-items: center; justify-content: center;
  font-size: 4rem;
}

/* 篩選按鈕 active 狀態 */
.filter-btn { /* ... 基本樣式 ... */ transition: all 0.2s; }
.filter-btn.active {
  background: #1a5c5c;
  color: white;
  border-color: #1a5c5c;
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

<!--
第三個專案是學習進度儀表板，這種頁面在企業的後台系統裡極為常見，考驗你對 Grid 排版和動態資料呈現的掌握。
-->

---
layout: default
---

# P3：畫面需求

```
┌────────────────────────────────────────────────────────────┐
│  📚 學習進度儀表板                          2025/06/28     │
├────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ 已完成   │  │ 學習中   │  │ 總時數   │  │ 完成率   │  │
│  │  12 堂   │  │   5 堂   │  │ 48 小時  │  │  70 %    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
├────────────────────────────────────────────────────────────┤
│  各科目進度                                                 │
│  HTML      ████████████████░░░░  80%                       │
│  CSS       ██████████████░░░░░░  70%                       │
│  TypeScript████████░░░░░░░░░░░░  40%                       │
│  Angular   ██████░░░░░░░░░░░░░░  30%                       │
├────────────────────────────────────────────────────────────┤
│  最近課程記錄                                               │
│  ● HTML 表單練習    已完成  2025/06/27                     │
│  ● CSS Flexbox      已完成  2025/06/26                     │
│  ● TypeScript 基礎  學習中  2025/06/25                     │
└────────────────────────────────────────────────────────────┘
```

---
layout: default
---

# P3：CSS 技術清單

**① 整體 Layout**
- 頁面最大寬度 `1100px`，水平置中（`margin: 0 auto`）
- 深色 header 列（Flexbox 左右分開 — 標題 + 日期）

**② 統計卡片列**
- `display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;`
- 每張卡片：白色背景、圓角、陰影
- 數字用大字（`font-size: 2.5rem`，深色主題色）
- hover 時背景改為主題色，文字變白（顏色 `transition`）

**③ 進度條**
- 灰色軌道 + 彩色填充（不同科目用不同顏色）
- **用 CSS animation `@keyframes` 讓進度條從 0 延展到目標寬度**（同 P1 技能條，用 CSS 變數 `--w` 傳入目標值）
- 進度條右側顯示百分比數字

**④ 課程記錄列表**
- 每筆記錄左側有**彩色圓點**（已完成綠色、學習中橘色）
- hover 時該行背景微微變色
- 狀態標籤（badge）：圓角小膠囊，顏色依狀態不同

---
layout: default
---

# P3：TypeScript 邏輯清單

```typescript
// 科目進度資料
subjects: { name: string; progress: number; color: string }[] = [
  { name: 'HTML',        progress: 80, color: '#e07b39' },
  { name: 'CSS',         progress: 70, color: '#5eada0' },
  { name: 'TypeScript',  progress: 40, color: '#6b66c4' },
  { name: 'Angular',     progress: 30, color: '#dd0031' },
];

// 課程紀錄
interface CourseRecord {
  name: string;
  status: 'completed' | 'in-progress';
  date: string;   // 'YYYY-MM-DD' 格式
}
records: CourseRecord[] = [ ... ];
```

**需要實作的方法：**

1. `getCompletedCount()` — 回傳 status 為 `'completed'` 的數量（`filter + length`）
2. `getInProgressCount()` — 回傳 status 為 `'in-progress'` 的數量
3. `getTotalHours()` — 假設每堂課 2.5 小時，回傳 `總筆數 × 2.5`
4. `getCompletionRate()` — 回傳完成率百分比（`Math.round`），格式：`'70%'`
5. `getSortedByDate()` — 用 `sort` 將 records 依日期**由新到舊**排序後回傳

---
layout: default
---

# P3：解答參考 — 統計卡片 HTML + CSS

```html
<!-- 統計卡片區 -->
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-icon">✅</div>
    <div class="stat-value">12</div>
    <div class="stat-label">已完成課程</div>
  </div>
  <div class="stat-card">
    <div class="stat-icon">📖</div>
    <div class="stat-value">5</div>
    <div class="stat-label">學習中</div>
  </div>
  <!-- ... -->
</div>
```

```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.25s, color 0.25s;
  cursor: default;
}
.stat-card:hover { background: #1a5c5c; color: white; }
.stat-value { font-size: 2.5rem; font-weight: 900; color: #1a5c5c; }
.stat-card:hover .stat-value { color: white; }
```

---
layout: default
---

# P3：解答參考 — 進度條動畫 CSS

```css
/* 進度條容器 */
.progress-bar-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.progress-label { width: 100px; font-size: 0.9rem; font-weight: 600; }
.progress-track {
  flex: 1;
  height: 12px;
  background: #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 6px;
  width: 0;
  animation: fillBar 1.4s ease forwards;
  background: var(--bar-color);
}
@keyframes fillBar { to { width: var(--w); } }

.progress-pct { width: 40px; text-align: right; font-size: 0.85rem; color: #666; }
```

```html
<!-- 用法：CSS 變數傳入寬度與顏色 -->
<div class="progress-fill"
     style="--w: 80%; --bar-color: #e07b39; animation-delay: 0.2s">
</div>
```

---
layout: default
---

# P3：解答參考 — TypeScript 方法

```typescript
subjects = [
  { name: 'HTML',       progress: 80, color: '#e07b39' },
  { name: 'CSS',        progress: 70, color: '#5eada0' },
  { name: 'TypeScript', progress: 40, color: '#6b66c4' },
  { name: 'Angular',    progress: 30, color: '#dd0031' },
];

records: CourseRecord[] = [
  { name: 'HTML 表單練習',  status: 'completed',   date: '2025-06-27' },
  { name: 'CSS Flexbox',   status: 'completed',   date: '2025-06-26' },
  { name: 'TypeScript基礎',status: 'in-progress', date: '2025-06-25' },
  // ... 更多資料
];

getCompletedCount()  { return this.records.filter(r => r.status === 'completed').length; }
getInProgressCount() { return this.records.filter(r => r.status === 'in-progress').length; }
getTotalHours()      { return this.records.length * 2.5; }
getCompletionRate()  {
  return Math.round((this.getCompletedCount() / this.records.length) * 100) + '%';
}
getSortedByDate() {
  return [...this.records].sort((a, b) => b.date.localeCompare(a.date));
}
```

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">🍜</div>

# P4 — 餐廳菜單點餐頁
### Restaurant Menu & Order Page

**預估時間：1.5 小時**

<!--
最後一題是餐廳菜單點餐頁，這是整合所有技術的壓軸題，你需要同時處理固定排版、分類切換和即時計算。
-->

---
layout: default
---

# P4：畫面需求

```
┌──────────────────────────────────────────────────────────────┐
│  🍜 山水麵館                           📋 我的餐點 (2 項)   │ ← fixed header
├──────────────────────────────────────────────────────────────┤
│  [麵食] [湯品] [小菜] [飲料]                                 │ ← sticky 分類列
├───────────────────────────────┬──────────────────────────────┤
│                               │  📋 訂單明細                 │
│  ┌──────────┐  ┌──────────┐  │  ─────────────────           │
│  │ 🍜       │  │ 🍲       │  │  招牌牛肉麵  x1   NT$180     │
│  │ 招牌牛肉麵│  │ 酸辣湯   │  │  酸辣湯     x2   NT$120     │
│  │ NT$180   │  │ NT$60    │  │  ─────────────────           │
│  │ [＋] 加點 │  │ [＋] 加點│  │  總計：NT$300               │
│  └──────────┘  └──────────┘  │  [結帳]                      │
│                               │                              │
│  （左側：2 欄菜單 Grid）       │  （右側：固定訂單欄）        │
└──────────────────────────────────────────────────────────────┘
```

**Fixed Header**：餐廳名稱 + 訂單計數 badge
**Sticky 分類列**：`position: sticky; top: 64px;` 滾動時跟著黏著
**左側菜單**：2 欄 Grid，依分類篩選
**右側訂單欄**：固定高度可捲動，即時顯示品項、數量、小計、總計

---
layout: default
---

# P4：CSS 技術清單

**① 整體三段式結構**
- `position: fixed` 的 header（高度 64px）
- `position: sticky` 的分類列（黏在 header 下方 `top: 64px`）
- 主內容：Flexbox 左右分欄（左側 `flex: 1`，右側固定寬 320px）

**② 菜單卡片**
- `display: grid; grid-template-columns: repeat(2, 1fr);`
- 每張卡片：圓角、陰影，emoji 佔位區高度 140px
- hover 時：卡片邊框顏色變為主題色，`border: 2px solid transparent` → `border-color: #5eada0`
- 加點按鈕 hover 時背景填滿（outline 風格 → 實心）

**③ 右側訂單欄**
- `position: sticky; top: 64px;` — 跟著頁面滾動但固定在可視範圍
- 訂單列表 `overflow-y: auto; max-height: calc(100vh - 200px);`
- 總計區塊用 `border-top` 分隔，字體加大加粗
- 結帳按鈕：全寬、hover 時顏色反轉

**④ 分類按鈕 active 狀態**
- 有 `.active` 的按鈕底部有 `3px solid` 底線，顏色醒目
- 分類切換無動畫，但按鈕本身 `transition: color 0.2s`

---
layout: default
---

# P4：TypeScript 邏輯清單

```typescript
interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: '麵食' | '湯品' | '小菜' | '飲料';
  emoji: string;
}
interface OrderItem { item: MenuItem; qty: number; }

menu: MenuItem[] = [
  { id: 1, name: '招牌牛肉麵', price: 180, category: '麵食', emoji: '🍜' },
  { id: 2, name: '乾拌麵',    price: 120, category: '麵食', emoji: '🍝' },
  { id: 3, name: '酸辣湯',   price: 60,  category: '湯品', emoji: '🍲' },
  // 至少 8 種商品，涵蓋 4 個分類
];
order: OrderItem[] = [];
activeCategory: string = '全部';
```

**需要實作的方法：**

1. `getMenu()` — 依 `activeCategory` 篩選菜單（`'全部'` 不篩選）
2. `addItem(item: MenuItem)` — 若已存在就 `qty++`，否則 push 進 `order`
3. `removeItem(id: number)` — 找到對應項目 qty--，若 qty 為 0 從 order 中移除（用 `filter`）
4. `getOrderCount()` — 回傳訂單中所有 qty 加總
5. `getTotal()` — 回傳 `price × qty` 總金額（for...of 累加）

---
layout: default
---

# P4：解答參考 — HTML 結構

```html
<body>
  <!-- Fixed Header -->
  <header class="header">
    <div class="brand">🍜 山水麵館</div>
    <div class="order-badge">
      📋 我的餐點
      <span class="badge">2</span>
    </div>
  </header>

  <!-- Sticky 分類列 -->
  <nav class="category-nav">
    <button class="cat-btn active">全部</button>
    <button class="cat-btn">麵食</button>
    <button class="cat-btn">湯品</button>
    <button class="cat-btn">小菜</button>
    <button class="cat-btn">飲料</button>
  </nav>

  <!-- 主內容：左菜單 + 右訂單欄 -->
  <div class="main-layout">
    <!-- 左：菜單 Grid -->
    <div class="menu-area">
      <div class="menu-grid">
        <div class="menu-card">
          <div class="menu-img">🍜</div>
          <div class="menu-info">
            <h3>招牌牛肉麵</h3>
            <p class="cat-tag">麵食</p>
            <div class="price-row">
              <span class="price">NT$ 180</span>
              <button class="add-btn">＋ 加點</button>
            </div>
          </div>
        </div>
        <!-- 重複其他菜品 -->
      </div>
    </div>

    <!-- 右：訂單欄 -->
    <aside class="order-panel">
      <h3>📋 訂單明細</h3>
      <div class="order-list">
        <div class="order-item">
          <span class="item-name">招牌牛肉麵</span>
          <span class="item-qty">x1</span>
          <span class="item-subtotal">NT$ 180</span>
        </div>
      </div>
      <div class="order-total">
        <span>總計</span>
        <span class="total-price">NT$ 300</span>
      </div>
      <button class="checkout-btn">結帳</button>
    </aside>
  </div>
</body>
```

---
layout: default
---

# P4：解答參考 — CSS 重點

```css
/* Fixed Header */
.header {
  position: fixed; top: 0; left: 0; right: 0; height: 64px;
  background: #1a5c5c; color: white;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px; z-index: 200;
}
body { padding-top: 64px; }

/* Sticky 分類列 */
.category-nav {
  position: sticky; top: 64px;
  background: white;
  padding: 12px 32px;
  display: flex; gap: 8px;
  border-bottom: 1px solid #e2e8f0;
  z-index: 100;
}
.cat-btn { /* 基本樣式 */ }
.cat-btn.active {
  color: #1a5c5c;
  border-bottom: 3px solid #1a5c5c;
  font-weight: 700;
}

/* 主內容左右分欄 */
.main-layout { display: flex; align-items: flex-start; gap: 24px; padding: 24px 32px; }
.menu-area { flex: 1; }
.menu-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }

/* 右側訂單欄：sticky */
.order-panel {
  width: 300px; flex-shrink: 0;
  position: sticky; top: calc(64px + 57px);  /* header + 分類列高度 */
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
.checkout-btn {
  width: 100%; padding: 12px;
  background: #1a5c5c; color: white;
  border: 2px solid #1a5c5c; border-radius: 8px;
  cursor: pointer; transition: all 0.2s;
}
.checkout-btn:hover { background: transparent; color: #1a5c5c; }
```

---
layout: default
---

# P4：解答參考 — TypeScript 方法

```typescript
menu: MenuItem[] = [
  { id: 1, name: '招牌牛肉麵', price: 180, category: '麵食', emoji: '🍜' },
  { id: 2, name: '乾拌麵',    price: 120, category: '麵食', emoji: '🍝' },
  { id: 3, name: '酸辣湯',    price: 60,  category: '湯品', emoji: '🍲' },
  { id: 4, name: '味噌湯',    price: 50,  category: '湯品', emoji: '🥣' },
  { id: 5, name: '滷蛋',      price: 20,  category: '小菜', emoji: '🥚' },
  { id: 6, name: '海帶',      price: 25,  category: '小菜', emoji: '🌿' },
  { id: 7, name: '珍珠奶茶',  price: 65,  category: '飲料', emoji: '🧋' },
  { id: 8, name: '紅茶',      price: 35,  category: '飲料', emoji: '🍵' },
];
order: OrderItem[] = [];
activeCategory = '全部';

getMenu() {
  if (this.activeCategory === '全部') return this.menu;
  return this.menu.filter(m => m.category === this.activeCategory);
}
addItem(item: MenuItem) {
  const found = this.order.find(o => o.item.id === item.id);
  if (found) { found.qty++; }
  else { this.order.push({ item, qty: 1 }); }
}
removeItem(id: number) {
  const found = this.order.find(o => o.item.id === id);
  if (!found) return;
  found.qty--;
  if (found.qty === 0) {
    this.order = this.order.filter(o => o.item.id !== id);
  }
}
getOrderCount() {
  let total = 0;
  for (let o of this.order) { total += o.qty; }
  return total;
}
getTotal() {
  let total = 0;
  for (let o of this.order) { total += o.item.price * o.qty; }
  return total;
}
```

---
layout: end
---

# 四大實作專案完成！

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; text-align: left;">
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem;">
    <strong>📄 P1 個人履歷</strong><br>
    Flexbox 雙欄・技能條 animation・時間軸定位
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem;">
    <strong>🛍️ P2 電商展示頁</strong><br>
    fixed Navbar・Grid 卡片・badge 定位・分類篩選
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem;">
    <strong>📊 P3 學習儀表板</strong><br>
    Grid 統計卡・進度條 animation・資料排序
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem;">
    <strong>🍜 P4 餐廳點餐頁</strong><br>
    sticky 排版・分類切換・即時計算・訂單管理
  </div>
</div>

<!--
完成這四題，你已經把 HTML / CSS / TypeScript 的基礎融合成真正能看、能用的完整頁面。
這就是前端工程師每天在做的事。
-->
