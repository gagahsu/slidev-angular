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

---
layout: default
---

# P1：解答提示 — Angular 初始設定

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
    <div class="skills">
      <div *ngFor="let skill of skills" class="skill-item">
        <span class="skill-name">{{ skill.name }}</span>
        <span class="skill-tag">{{ getSkillLevel(skill.percent) }}</span>
      </div>
    </div>
  </aside>
  <main class="content">
    <section class="about"> ... </section>
    <section class="experience">
      <div class="timeline">
        <div class="timeline-line"></div>
        <div *ngFor="let exp of experiences" class="timeline-item"> ... </div>
      </div>
    </section>
  </main>
</div>
```

---
layout: default
---

# P1：解答提示 — 雙欄 CSS（1/2）

```css
.resume {
  display: flex;
  min-height: 100vh;
}
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
.content {
  flex: 1;
  background: #f8fffe;
  padding: 40px;
}
```

---
layout: default
---

# P1：解答提示 — 雙欄 CSS（2/2）

```css
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
.job-title { color: #a7d9d0; font-size: 0.9rem; }
```

---
layout: default
---

# P1：解答提示 — 技能等級標籤 CSS

```css
.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.skill-name { color: white; font-size: 0.9rem; }
.skill-tag {
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 0.78rem;
  font-weight: 600;
  background: rgba(255,255,255,0.2);
  color: white;
}
```

```html
<!-- HTML 用 {{ }} 呼叫 getSkillLevel()，顯示等級文字 -->
<div *ngFor="let skill of skills" class="skill-item">
  <span class="skill-name">{{ skill.name }}</span>
  <span class="skill-tag">{{ getSkillLevel(skill.percent) }}</span>
</div>
```

<div class="mt-3 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ 用 <code>{{ }}</code> 插值呼叫 TypeScript 方法，回傳文字標籤，不需要屬性綁定或 CSS 動畫
</div>

---
layout: default
---

# P1：解答提示 — 時間軸 CSS（1/2）

```css
.timeline {
  position: relative;
  padding-left: 32px;
}
.timeline-line {
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #c8e6e3;
}
.timeline-item {
  position: relative;
  margin-bottom: 20px;
}
```

---
layout: default
---

# P1：解答提示 — 時間軸 CSS（2/2）

```css
.timeline-dot {
  position: absolute;
  left: -28px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #5eada0;
}
.timeline-card {
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  transition: background 0.2s;
}
.timeline-card:hover { background: #f0faf9; }
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
getSkillLevel(percent: number): string {
  if (percent >= 80) return '熟練';
  if (percent >= 60) return '進階';
  return '初學';
}
```

```typescript
getTopSkills() {
  return this.skills.filter(s => s.percent >= 70);
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>end === null</code> 用三等號嚴格比對；<code>getSkillLevel</code> 用 if/else 判斷回傳等級文字，在 <code>{{ }}</code> 中直接顯示；<code>filter</code> 回傳符合條件的新陣列
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

---
layout: default
---

# P2：解答提示 — Angular 初始設定

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
    <span class="cart-badge">{{ getCartCount() }}</span>
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

# P2：解答提示 — 商品格 CSS（Flexbox）

```css
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 32px 40px;
}
.product-card {
  flex: 0 0 calc(25% - 15px);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  background: white;
  transition: box-shadow 0.25s;
}
.product-card:hover {
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
setCategory(cat: string): void {
  this.activeCategory = cat;
}
filterProducts(): Product[] {
  if (this.activeCategory === '全部') return this.products;
  return this.products.filter(p => p.category === this.activeCategory);
}
```

```typescript
addToCart(product: Product): void {
  const existing = this.cart.filter(c => c.product.id === product.id);
  if (existing.length > 0) {
    existing[0].qty++;
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

---
layout: default
---

# P3：解答提示 — Angular 初始設定

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

---
layout: default
---

# P3：解答提示 — Header CSS

```css
.dashboard-header {
  background: #1a5c5c;
  color: white;
  padding: 12px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dashboard-header .title { font-weight: 700; }
.dashboard-header .date  { color: #a7d9d0; }
```

---
layout: default
---

# P3：解答提示 — 統計卡片 CSS

```css
.stats-row {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}
.stat-card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.25s, color 0.25s;
}
.stat-card:hover { background: #1a5c5c; color: white; }
.stat-value {
  font-size: 2.5rem;
  font-weight: 900;
  color: #1a5c5c;
}
.stat-card:hover .stat-value { color: white; }
```

---
layout: default
---

# P3：解答提示 — 進度數字 CSS

```css
.progress-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background 0.2s;
}
.progress-row:hover { background: #f8fffe; }
.subject-name { width: 80px; color: #555; }
.progress-num {
  font-size: 1.6rem;
  font-weight: 900;
  color: #1a5c5c;
  min-width: 60px;
}
.progress-unit { font-size: 0.85rem; color: #888; }
```

```html
<!-- HTML 用 {{ }} 直接顯示進度數字 -->
<div *ngFor="let subject of subjects" class="progress-row">
  <span class="subject-name">{{ subject.name }}</span>
  <span class="progress-num">{{ subject.progress }}</span>
  <span class="progress-unit">%</span>
</div>
```

---
layout: default
---

# P3：解答提示 — TypeScript 方法

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
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>Math.round</code> 四捨五入；<code>getCompletionRate</code> 算出比率後乘 100 再四捨五入，加上 <code>'%'</code> 字串回傳；這些方法都在 <code>{{ }}</code> 中呼叫，不需要 <code>(click)</code>
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

---
layout: default
---

# P4：解答提示 — Angular 初始設定

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

---
layout: default
---

# P4：解答提示 — Header + 分類列 CSS（1/2）

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
  background: white;
  padding: 12px 32px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  gap: 8px;
}
```

---
layout: default
---

# P4：解答提示 — Header + 分類列 CSS（2/2）

```css
.cat-btn {
  padding: 6px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
  transition: background 0.2s, color 0.2s;
}
.cat-btn.active {
  background: #1a5c5c;
  color: white;
  border-color: #1a5c5c;
}
```

---
layout: default
---

# P4：解答提示 — 主要佈局 CSS（1/2）

```css
.main-layout {
  display: flex;
  gap: 24px;
  padding: 24px 32px;
  align-items: flex-start;
}
.menu-area { flex: 1; }
.menu-grid { display: flex; flex-wrap: wrap; gap: 16px; }
.menu-card {
  flex: 0 0 calc(50% - 8px);
  border: 2px solid transparent;
  border-radius: 12px;
  background: white;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: border-color 0.2s;
}
```

---
layout: default
---

# P4：解答提示 — 主要佈局 CSS（2/2）

```css
.menu-card:hover { border-color: #5eada0; }
.order-panel {
  width: 280px; flex-shrink: 0;
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
setCategory(cat: string): void {
  this.activeCategory = cat;
}
```

```typescript
addItem(item: MenuItem): void {
  const existing = this.order.filter(o => o.item.id === item.id);
  if (existing.length > 0) {
    existing[0].qty++;
  } else {
    this.order.push({ item, qty: 1 });
  }
}
```

```typescript
removeItem(id: number): void {
  this.order.forEach(o => {
    if (o.item.id === id) { o.qty--; }
  });
  this.order = this.order.filter(o => o.qty > 0);
}
```

---
layout: default
---

# P4：解答提示 — TypeScript 方法（計算）

```typescript
getMenu(): MenuItem[] {
  if (this.activeCategory === '全部') return this.menu;
  return this.menu.filter(m => m.category === this.activeCategory);
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
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>removeItem</code> 先用 <code>forEach</code> 讓 qty--，再用 <code>filter</code> 清掉 qty 為 0 的項目，避免直接操作索引
</div>

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
