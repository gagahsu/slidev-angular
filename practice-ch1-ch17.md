---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 綜合實作練習 Ch1–Ch31
routeAlias: practice-ch31
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
    綜合實作練習<br>Ch1 – Ch31
  </h1>
  <div style="height: 4px; width: 380px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.1rem; font-style: italic; margin-bottom: 0.5rem;">
    「四張需求規格書，照業界 Spec 從零打造完整頁面」
  </p>
  <p style="color: #9dc4c4; font-size: 0.95rem;">預估時間：6 – 8 小時</p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 1.5rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
這四個專案題是真正的整頁實作，不是填空練習。
每一題都用「業界需求規格書」的形式給題：畫面規格（UI Spec）描述外觀，功能規格（FR）描述行為與驗收條件，同學要自己從規格推導出 HTML 結構、CSS 樣式和 TypeScript 邏輯。
技術範圍涵蓋 CH9–CH31：HTML、CSS、Flexbox、Position、TypeScript、@if/@for/@switch、元件與 @Input/@Output、Service、路由導航、Web Storage、HttpClient API、Interface、sort() 排序。
-->

---
layout: default
---

# 四大實作專案總覽

| 題號 | 專案名稱 | 主要技術 |
|---|---|---|
| **P1** | 個人履歷頁 | 雙欄排版、@switch 技能標籤、時間軸 @if、技能排序 |
| **P2** | 電商產品展示頁 | 商品卡子元件、價格排序、localStorage 購物車 |
| **P3** | 學習進度儀表板 | HttpClient 載入資料、@switch 狀態、日期排序 |
| **P4** | 餐廳菜單點餐頁 | 訂單子元件、Service 跨頁傳遞、結帳路由、sessionStorage |

<div class="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 text-gray-700 text-sm text-left">
⚠️ 每一題請用 <code>ng g c &lt;名稱&gt;</code> 建立新 component，不要直接複製解答。<br>
建議順序：讀規格 → <code>ng g c</code> 建立 → 在 <code>app.routes.ts</code> 加 route → 依 UI Spec 刻畫面 → 依 FR 寫功能 → 對照驗收條件自我檢查 → 最後看解答<br>
技術範圍為 CH9–CH31（不含 CH19）；部分延伸 CSS 技術見 <Link to="practice-supplement" style="color: #1a5c5c; text-decoration: underline;">綜合實作補充教材</Link>
</div>

<!--
本版練習已從 Ch17 擴充到 Ch31：每一題在原本的 HTML / CSS / TypeScript 基礎上，疊加 Angular 的模板語法（@if/@for/@switch）、元件通訊（@Input/@Output）、Service、路由導航、Web Storage、HttpClient 與 sort() 排序。
題目採用業界規格書格式：UI Spec 編號 UI-x，功能規格編號 FR-x，每題附驗收條件（Acceptance Criteria）。帶題時可以先讓同學讀完整份規格再動手，模擬實際接需求單的流程。
CSS 範圍仍維持 Flexbox、Position、基礎屬性；不使用 CSS 變數、@keyframes、grid、sticky、transform。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">📄</div>

# P1 — 個人履歷頁
### Personal Resume Page

**預估時間：2 小時**

<!--
P1 是四題中最適合暖身的一題，沒有複雜的互動事件，但這一版加入了 Angular 模板語法：技能標籤用 @switch 分級、時間軸用 @if 判斷在職狀態、專案清單用巢狀 @for、技能依熟練度 sort() 排序、年資用 Date 動態計算。可以先讓同學讀完整份規格（UI Spec + FR），想想「如果是我，我會從哪裡開始？」再帶入架構說明。核心概念是「固定寬度側欄 + 自適應主欄」的雙欄排版，加上「資料驅動畫面」的模板判斷。
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
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><span>HTML</span><span style="background:#5eada0;color:white;border-radius:4px;padding:2px 8px;font-size:0.85em;font-weight:600;">熟練</span></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><span>CSS</span><span style="background:#5eada0;color:white;border-radius:4px;padding:2px 8px;font-size:0.85em;font-weight:600;">熟練</span></div>
      <div style="display:flex;justify-content:space-between;align-items:center;"><span>TypeScript</span><span style="background:#a7d9d0;color:#1a5c5c;border-radius:4px;padding:2px 8px;font-size:0.85em;font-weight:600;">進階</span></div>
    </div>
  </div>
  <div style="flex:1; padding: 16px; background: #f8fffe;">
    <div style="font-weight:700;color:#1a5c5c;border-bottom:2px solid #5eada0;margin-bottom:8px;">關於我</div>
    <div style="font-size:0.85em;color:#666;margin-bottom:12px;">熱愛前端開發，喜歡把設計稿變成網頁...</div>
    <div style="font-weight:700;color:#1a5c5c;border-bottom:2px solid #5eada0;margin-bottom:8px;">工作經歷</div>
    <div style="font-size:0.82em;padding-left:16px;border-left:2px solid #c8e6e3;">
      <div style="margin-bottom:6px;">● 科技股份有限公司 <span style="background:#5eada0;color:white;border-radius:999px;padding:1px 7px;font-size:0.8em;">在職中</span><br><span style="color:#999;font-size:0.85em;">▸ 官網改版　▸ 會員系統</span></div>
      <div>● 2021 ~ 2023｜網路新創公司<br><span style="color:#999;font-size:0.85em;">▸ 活動網站　▸ 後台報表</span></div>
    </div>
  </div>
</div>

- **左欄（固定 280px）**：深色背景、頭像圓形、聯絡資訊、技能標籤（依熟練度高→低排列）
- **右欄（flex: 1）**：關於我、工作時間軸——在職顯示「在職中」膠囊、每筆經歷附專案清單

<!--
帶同學看線框圖的左欄（深色背景 + 技能等級 tag）和右欄（時間軸）兩個區域的結構差異。左欄 `width: 280px; flex-shrink: 0` 固定寬度不讓它縮小，右欄 `flex: 1` 自動填滿剩餘空間——這個「固定欄 + 自適應欄」的組合在實際工作的側邊欄布局中非常常見。
和舊版的差異：技能列表現在要先排序再顯示、tag 顏色改用 @switch 決定、時間軸第一筆有「在職中」膠囊（@if 判斷）、每筆經歷下面多了專案清單（巢狀 @for）。
-->

---
layout: default
---

# P1：畫面規格 UI Spec（1/4）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-1 | 整體版面 | `.resume` 雙欄 Flexbox（`display: flex`），滿版高度 `min-height: 100vh` |
| UI-2 | 左側欄 | `.sidebar` 固定 `280px` 不可被壓縮（`flex-shrink: 0`），底色 `#1a5c5c` |
| UI-3 | 右主欄 | `.content` 填滿剩餘寬度（`flex: 1`），底色 `#f8fffe` |
| UI-4 | 頭像 | 正圓形 `120px`，白色 `4px` 邊框，內部文字水平垂直置中 |

<!--
規格書讀法：UI-x 是畫面驗收的依據，每一條都要能在完成品上指出對應位置。建議同學先把 UI-1 的 display: flex 寫好確認雙欄成立，再依序完成頭像。「固定欄 + 自適應欄」搭配 flex-shrink: 0，是側邊欄排版的標準寫法。
-->

---
layout: default
---

# P1：畫面規格 UI Spec（2/4）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-5 | 技能列 | `.skill-item` 名稱與標籤兩端對齊（`justify-content: space-between`），列距 `10px` |
| UI-6 | 技能標籤（預設／初學） | `.skill-tag`：圓角 `4px`、`padding: 2px 8px`，半透明白底 `rgba(255,255,255,0.2)`、白字 |
| UI-7 | 技能標籤（熟練） | `.skill-tag--high`：`background: #5eada0; color: white` |
| UI-8 | 技能標籤（進階） | `.skill-tag--mid`：`background: #a7d9d0; color: #1a5c5c` |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 三種標籤要顯示哪一種由 <b>FR-2 的 @switch</b> 決定，CSS 只定義三種樣式
</div>

<!--
技能 tag 的三個顏色狀態不是在 CSS 裡做 if 判斷——CSS 不能判斷百分比數值。這一版改用 @switch 模板語法：getSkillLevel() 回傳「熟練／進階／初學」文字，@switch 依回傳值渲染對應 class 的 span。CSS 只負責定義三種 class 的樣式，判斷邏輯全部在 template 和 TypeScript。
-->

---
layout: default
---

# P1：畫面規格 UI Spec（3/4）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-9 | 時間軸容器 | `.timeline`：`position: relative; padding-left: 32px` |
| UI-10 | 垂直線 | `.timeline::before`：`position: absolute; left: 8px; top: 0; bottom: 0; width: 2px; background: #c8e6e3` |
| UI-11 | 圓點 | `.timeline-dot`：`position: absolute; left: -28px; top: 6px`，`14px` 正圓、`background: #5eada0` |
| UI-12 | 經歷卡片 | `.timeline-card` hover 時底色 `#f0faf9`，`transition: background 0.2s` |

<!--
時間軸的製作有兩個關鍵：.timeline 用 padding-left 留出圓點和垂直線的空間，::before 偽元素再用 position: absolute 貼在左側充當垂直線。要特別提醒同學，圓點 .timeline-dot 的 left: -28px 是負值，代表「往容器左邊延伸」，讓圓點能落在 padding 區域裡、蓋在垂直線上方。
-->

---
layout: default
---

# P1：畫面規格 UI Spec（4/4）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-13 | 在職中膠囊 | `.badge-current`：`background: #5eada0; color: white; border-radius: 999px; padding: 2px 10px; font-size: 0.75rem` |
| UI-14 | 專案清單 | `.project-list`：`padding-left: 16px; font-size: 0.85rem; color: #666`，每筆專案一個 `<li>` |

<!--
UI-13 的 border-radius: 999px 是膠囊形圓角技巧；UI-14 的專案清單是新增區塊，之後 FR-5 會用巢狀 @for 渲染。
-->

---
layout: default
---

# P1：功能規格 FR（1/4）— 資料模型

**DM-1**：以 interface 定義資料形狀；`end` 為 `null` 代表在職，`projects` 為該段經歷的專案清單

```typescript
interface Skill {
  name: string;
  percent: number;
}

interface Experience {
  company: string;
  title: string;
  start: number;
  end: number | null;
  projects: string[];
}
```

<!--
規格書的資料模型（Data Model）區塊：實際開發時通常由前後端一起定義。兩個陣列的形狀用 Skill、Experience 具名 interface 定義（Ch30），比匿名型別更好讀、也方便之後在其他方法的參數型別複用。experiences 的 `end: number | null` 是聯合型別，表示「結束年份可以是數字或 null」。新增的 `projects: string[]` 之後用巢狀 @for 顯示（Ch26）。
-->

---
layout: default
---

# P1：功能規格 FR（2/4）— 初始資料

**DM-2**：頁面使用以下靜態資料（實際專案來自 API）

```typescript
skills: Skill[] = [
  { name: 'HTML', percent: 90 },
  { name: 'CSS',  percent: 80 },
  { name: 'TypeScript', percent: 65 },
  { name: 'Angular', percent: 55 },
];
experiences: Experience[] = [
  { company: '科技股份有限公司', title: '前端工程師', start: 2023, end: null,
    projects: ['官網改版', '會員系統'] },
  { company: '網路新創公司', title: '工程師', start: 2021, end: 2023,
    projects: ['活動網站', '後台報表'] },
];
```

<!--
P1 的 TypeScript 只有資料和方法，沒有任何 click 事件。用 null 代表「目前在職」比用空字串 '' 更嚴謹——TypeScript 會在比較時強制你處理 null 的情況。projects 是字串陣列，每段經歷各自有一份專案清單，這就是「陣列裡包陣列」的巢狀資料結構（Ch26）。
-->

---
layout: default
---

# P1：功能規格 FR（3/4）— 操作功能

| 編號 | 功能 | 觸發時機 | 預期行為 |
|---|---|---|---|
| FR-1 | 技能排序 | 頁面載入 | 技能列表以 `sort()` 依 `percent` 由高至低排列 |
| FR-2 | 技能等級標籤 | 每筆技能渲染時 | `getSkillLevel()` 回傳等級文字，`@switch` 依等級渲染對應顏色標籤（≥80 熟練／≥60 進階／其餘 初學） |
| FR-3 | 年資計算 | 每筆經歷渲染時 | `end` 為 null → 以 `new Date().getFullYear()` 計算「X 年（在職中）」；否則「(end−start) 年」 |

<!--
FR（Functional Requirement）表是業界規格書的核心：每一條有觸發時機和預期行為，做完可以逐條驗收。P1 是純展示頁，沒有 (click) 事件，方法全部在 {{ }} 或 @for / @switch 中被呼叫。
FR-1 練 Ch31 的 sort() 比較函式；FR-2 練 Ch28 的 @switch；FR-3 練 Ch18 的 Date，注意「年資隨年份自動增加」是關鍵，寫死 '~ 現在' 過不了驗收，必須用 new Date() 動態計算。
-->

---
layout: default
---

# P1：功能規格 FR（4/4）— 操作功能

| 編號 | 功能 | 觸發時機 | 預期行為 |
|---|---|---|---|
| FR-4 | 在職狀態顯示 | 每筆經歷渲染時 | `@if (end === null)` 顯示「在職中」膠囊，`@else` 顯示「start ~ end」 |
| FR-5 | 專案清單 | 每筆經歷渲染時 | 巢狀 `@for` 列出該經歷所有 `projects` |
| FR-6 | 精選技能 | 技能區渲染時 | `getTopSkills()` 用 `filter` 回傳 `percent ≥ 70` 的技能 |

**驗收條件**：技能第一筆為 percent 最高者｜TypeScript 顯示「進階」淺綠標籤｜第一筆經歷顯示「在職中」且年資隨年份自動增加｜每筆經歷列出 2 個專案

<!--
FR-4 練 Ch27 的 @if/@else；FR-5 練 Ch26 的巢狀 @for；FR-6 的 filter 篩選跟 P1 之前的 filter 用法一致。驗收條件涵蓋 FR-1 到 FR-6，做完可以逐條對照畫面檢查。
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

# P1：完整解答 — TypeScript（1/3）

```typescript
import { Component } from '@angular/core';

interface Skill {
  name: string;
  percent: number;
}

interface Experience {
  company: string;
  title: string;
  start: number;
  end: number | null;
  projects: string[];
}
```

<!--
這頁展示兩個 interface 拉到 class 外面宣告，跟 P2 之後會看到的 Product、Menu 同一招。`end: number | null` 是聯合型別（Union Type），代表這個欄位可以是數字也可以是 null。可以問同學：「為什麼不用空字串 '' 代表在職？」——因為 null 能讓 TypeScript 在比較時強制我們處理這個「沒有結束年份」的情況，比空字串更安全也更語意清晰。projects 是字串陣列型別 string[]，對應 FR-5 的專案清單。
-->

---
layout: default
---

# P1：完整解答 — TypeScript（2/3）

```typescript
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {
  currentYear = new Date().getFullYear();

  skills: Skill[] = [
    { name: 'HTML', percent: 90 },
    { name: 'CSS', percent: 80 },
    { name: 'TypeScript', percent: 65 },
    { name: 'Angular', percent: 55 },
  ];
  experiences: Experience[] = [
    { company: '科技股份有限公司', title: '前端工程師', start: 2023, end: null,
      projects: ['官網改版', '會員系統'] },
    { company: '網路新創公司', title: '工程師', start: 2021, end: 2023,
      projects: ['活動網站', '後台報表'] },
  ];
```

<!--
skills、experiences 兩個屬性分別套用前一頁定義的 Skill、Experience interface。
新增的 currentYear 在 class 屬性宣告時就用 new Date().getFullYear() 取得今年年份（Ch18），之後 getDuration 計算在職年資會用到——這樣明年打開這頁，年資會自動加一，不用改程式。
-->

---
layout: default
---

# P1：完整解答 — TypeScript（3/3）

```typescript
  getSortedSkills(): Skill[] {
    return this.skills.sort(function (a, b) {
      if (a.percent > b.percent) return -1;
      if (a.percent < b.percent) return 1;
      return 0;
    });
  }
  getDuration(start: number, end: number | null): string {
    if (end === null) return (this.currentYear - start) + ' 年（在職中）';
    return (end - start) + ' 年';
  }
  getSkillLevel(percent: number): string {
    if (percent >= 80) return '熟練';
    if (percent >= 60) return '進階';
    return '初學';
  }
  getTopSkills(): Skill[] {
    return this.skills.filter(s => s.percent >= 70);
  }
}
```

<!--
getSortedSkills 對應 FR-1：比較函式回傳 -1 / 1 / 0（Ch31），注意這裡是「大的排前面」所以 a.percent > b.percent 時回傳 -1，跟 Ch31 範例的升冪剛好相反——可以讓同學想想為什麼。sort() 會直接修改原陣列，這裡直接排 this.skills 沒問題，因為畫面本來就要照排序後的順序顯示。
getDuration 對應 FR-3：end 為 null 時用 currentYear 減 start 動態算年資；`if (end === null)` 用三個等號嚴格比對。getSkillLevel 從最嚴格的條件開始往下判斷。getTopSkills 的 filter 回傳新陣列，原始 skills 不受影響——可以對比 sort 跟 filter 一個改原陣列、一個不改。
-->

---
layout: default
---

# P1：完整解答 — HTML（1/4）

```html
<div class="resume">
  <aside class="sidebar">
    <div class="avatar">王</div>
    <h2 class="name">王小明</h2>
    <p class="job-title">前端工程師</p>
    <div class="contact">
      <p>📧 email&#64;example.com</p>
    </div>
```

<!--
HTML 的結構和 CSS 的 class 命名要一一對應。.sidebar 對應左欄，.content 對應右欄。
提醒：template 裡的 email 用 `&#64;` 取代 `@` 符號，因為 Angular 17+ 把 `@` 保留給 control flow 語法，直接打 `@` 在 build 時會噴 parse error。
-->

---
layout: default
---

# P1：完整解答 — HTML（2/4）

```html
    <div class="skills">
      <h3>技能</h3>
      @for (skill of getSortedSkills(); track skill.name) {
        <div class="skill-item">
          <span class="skill-name">{{ skill.name }}</span>
          @switch (getSkillLevel(skill.percent)) {
            @case ('熟練') { <span class="skill-tag skill-tag--high">熟練</span> }
            @case ('進階') { <span class="skill-tag skill-tag--mid">進階</span> }
            @default { <span class="skill-tag">初學</span> }
          }
        </div>
      }
    </div>
  </aside>
```

<!--
`@for` 這次迭代的是 getSortedSkills() 的回傳值（FR-1），所以畫面上第一筆一定是 percent 最高的技能；`track skill.name` 用能唯一識別每筆資料的值，Angular 才能有效率地更新畫面。
技能標籤改用 `@switch`（Ch28、FR-2）：getSkillLevel() 回傳「熟練／進階／初學」，@case 逐一比對、@default 接住其餘情況，每個 case 渲染不同 class 的 span——比舊版兩個 [class.xxx] 綁定更好讀，三種狀態一目了然。
-->

---
layout: default
---

# P1：完整解答 — HTML（3/4）

```html
  <main class="content">
    <section class="about">
      <h2>關於我</h2>
      <p>熱愛前端開發，喜歡把設計稿變成網頁...</p>
    </section>
    <section class="experience">
      <h2>工作經歷</h2>
      <div class="timeline">
        @for (exp of experiences; track exp.company) {
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <h3>{{ exp.company }}</h3>
              <p>{{ exp.title }}</p>
```

<!--
時間軸的 HTML 是三層巢狀：.timeline > .timeline-item > .timeline-dot + .timeline-card。垂直線不再是額外的 div，改由 .timeline 的 ::before 偽元素產生，HTML 結構更乾淨。
-->

---
layout: default
---

# P1：完整解答 — HTML（4/4）

```html
              @if (exp.end === null) {
                <span class="badge-current">在職中</span>
              } @else {
                <span class="period">{{ exp.start }} ~ {{ exp.end }}</span>
              }
              <p>{{ getDuration(exp.start, exp.end) }}</p>
              <ul class="project-list">
                @for (proj of exp.projects; track proj) {
                  <li>{{ proj }}</li>
                }
              </ul>
            </div>
          </div>
        }
      </div>
    </section>
  </main>
</div>
```

<!--
`@if (exp.end === null)` 對應 FR-4（Ch27）：在職顯示膠囊、離職顯示起訖年份，@if/@else 的兩個分支只會渲染其中一個到 DOM。
內層的 `@for (proj of exp.projects)` 是巢狀 @for（Ch26、FR-5）：外層迭代 experiences、內層迭代當前 exp 的 projects——注意內層能直接使用外層的迭代變數 exp。`getDuration(exp.start, exp.end)` 把邏輯放在 TypeScript、HTML 只負責顯示，是最佳實踐。
-->

---
layout: default
---

# P1：完整解答 — CSS（1/4）

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
```

<!--
.resume 是整頁最外層容器，display: flex 讓兩個子元素（aside.sidebar 和 main.content）自動橫排。.sidebar 的 flex-shrink: 0 非常關鍵——沒有它，螢幕較小時側欄會被壓縮，讓 280px 的固定寬失去意義。
-->

---
layout: default
---

# P1：完整解答 — CSS（2/4）

```css
.skill-item {
  display: flex; justify-content: space-between;
  align-items: center; margin-bottom: 10px;
}
.skill-name { color: white; font-size: 0.9rem; }
.skill-tag {
  border-radius: 4px; padding: 2px 8px;
  font-size: 0.78rem; background: rgba(255,255,255,0.2); color: white;
}
.skill-tag--high { background: #5eada0; color: white; }
.skill-tag--mid { background: #a7d9d0; color: #1a5c5c; }
```

<!--
.skill-item 用 justify-content: space-between 把技能名稱和等級 tag 推到兩端，這是 Flexbox 最常見的「兩端對齊」用法。.skill-tag 是預設（初學）樣式，.skill-tag--high 和 .skill-tag--mid 這兩個修飾 class 由 HTML 的 class binding 依 percent 動態決定要不要加上去，蓋過預設的灰底色。
-->

---
layout: default
---

# P1：完整解答 — CSS（3/4）

```css
.timeline { position: relative; padding-left: 32px; }
.timeline::before {
  content: '';
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
時間軸定位（接續上一頁）是這題 CSS 最難的部分。.timeline 的 padding-left: 32px 製造空白讓圓點能放進來；.timeline::before 的 top: 0; bottom: 0 讓垂直線撐滿容器高度，記得偽元素一定要寫 content: '' 才會顯示；.timeline-dot 的 left: -28px 讓圓點精確落在垂直線上方。
-->

---
layout: default
---

# P1：完整解答 — CSS（4/4）

```css
.badge-current {
  background: #5eada0; color: white;
  border-radius: 999px; padding: 2px 10px; font-size: 0.75rem;
}
.period { color: #888; font-size: 0.85rem; }
.project-list {
  padding-left: 16px; margin: 6px 0 0;
  font-size: 0.85rem; color: #666;
}
.project-list li { margin-bottom: 2px; }
```

<!--
新增三組樣式對應 UI-13、UI-14：.badge-current 的 border-radius: 999px 做出膠囊形；.project-list 保留 ul 預設的圓點符號、縮小字級當次要資訊；.period 是離職經歷的起訖年份文字。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">🛍️</div>

# P2 — 電商產品展示頁
### Product Showcase Page

**預估時間：2 小時**

<!--
P2 是四題中互動性最強的一題，這一版在「分類篩選」和「購物車」之外，加入四個新需求：商品卡抽成子元件（@Input/@Output）、價格排序按鈕（sort()）、購物車存 localStorage（重新整理不消失）、清空購物車按鈕（[disabled] 繫結）。
最值得學的兩個模式：addToCart 的「找到就修改、找不到就新增」，以及「資料變更後同步寫入 storage、ngOnInit 時讀回」的持久化模式。
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
      <span style="border:1px solid white;border-radius:4px;padding:2px 8px;font-size:0.85em;">清空購物車</span>
    </span>
  </div>
  <div style="background:#5eada0;color:white;text-align:center;padding:16px;font-weight:600;">歡迎來到 My Shop — 精選好物一次搞定</div>
  <div style="padding:8px 14px;background:#f8fffe;display:flex;gap:6px;">
    <span style="background:#1a5c5c;color:white;padding:3px 10px;border-radius:4px;">全部</span>
    <span style="border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">前端</span>
    <span style="border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">後端</span>
    <span style="border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">工具書</span>
    <span style="margin-left:auto;border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">價格低→高</span>
    <span style="border:1px solid #1a5c5c;color:#1a5c5c;padding:3px 10px;border-radius:4px;">價格高→低</span>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:8px;padding:10px 14px;background:#f8fffe;">
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;width:calc(25% - 8px);">📘<br>Angular<br><b style="color:#1a5c5c;">$880</b></div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;width:calc(25% - 8px);">📗<br>CSS精通<br><b style="color:#1a5c5c;">$650</b></div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;width:calc(25% - 8px);">📙<br>Node.js<br><b style="color:#1a5c5c;">$750</b></div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:8px;background:white;width:calc(25% - 8px);">📕<br>Git<br><b style="color:#1a5c5c;">$420</b></div>
  </div>
</div>

- **Navbar**：`position: fixed`，左 Logo，右連結 + 購物車 badge + 清空購物車按鈕
- **Hero 橫幅**：深色背景，文字水平垂直置中
- **篩選列**：左側分類按鈕、右側兩顆價格排序按鈕
- **商品格**：flex-wrap 四欄，每張商品卡是獨立子元件 `<app-product-card>`

<!--
P2 的畫面分四層：固定 Navbar、Hero 橫幅、分類＋排序列、商品格。重點是 Navbar 要加 position: fixed，然後 body 要補 padding-top: 64px，否則 Navbar 會蓋住下方內容——這是一個非常常被初學者忘記的步驟。建議同學按這四層由上往下寫 HTML + CSS，確認每一層正確後再繼續往下。
和舊版的差異：篩選列右側多了兩顆排序按鈕、Navbar 多了清空購物車按鈕，商品卡要抽成子元件。
-->

---
layout: default
---

# P2：畫面規格 UI Spec（1/2）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-1 | 固定 Navbar | `.navbar`：`position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 64px`；`body` 補 `padding-top: 64px` |
| UI-2 | 購物車 badge | `.cart-icon` 為定位基準（`position: relative`）；`.cart-badge`：`absolute; top: -8px; right: -12px`，紅色正圓 `20px` |
| UI-3 | 清空購物車按鈕 | `.clear-btn`：白色 `1px` 邊框、透明底、白字；`:disabled` 時 `opacity: 0.4; cursor: not-allowed` |
| UI-4 | Hero 橫幅 | `background: #5eada0`，文字水平垂直置中，高 `250px` |

<!--
position: fixed 讓 Navbar 脫離文件流，所以下方元素要靠 body 的 padding-top: 64px 補回被佔掉的空間——這是個「脫離文件流後補空間」的固定搭配。購物車 badge 的關鍵是 .cart-icon 設 position: relative 建立定位基準，.cart-badge 再用 position: absolute 讓數字浮到右上角。
UI-3 是新需求：按鈕的 disabled 外觀用 CSS 的 :disabled 偽類定義，「什麼時候 disabled」則由 FR-5 的 [disabled] 繫結決定——樣式和邏輯分工。
-->

---
layout: default
---

# P2：畫面規格 UI Spec（2/2）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-5 | 商品格 | `.product-grid`：`flex-wrap: wrap; gap: 20px`；每張卡片佔 `calc(25% - 15px)` 四欄 |
| UI-6 | 商品卡片 | 白底、圓角 `12px`；hover 時陰影加深 `0 12px 28px`（`transition: box-shadow 0.25s`） |
| UI-7 | 篩選／排序按鈕 | 預設 `1px` 邊框深綠字；`.active` 反轉為深綠底白字，`transition` 平滑切換 |
| UI-8 | 排序按鈕位置 | 兩顆排序按鈕靠篩選列右側（`margin-left: auto` 推到最右） |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>flex: 0 0 calc(25% - 15px)</code>：四欄間有 3 個 gap（20px×3=60px），每欄扣掉 60÷4=15px。商品卡抽成子元件後，這條 flex 規則要下在 <code>app-product-card</code> 標籤上
</div>

<!--
商品格四欄佈局的 `calc(25% - 15px)` 可以帶同學推算：四個卡片之間有三個 gap（20px × 3 = 60px），平均每張卡片要扣掉 60 ÷ 4 = 15px。
UI-8 的 margin-left: auto 是 Flexbox 的實用技巧：在 flex 容器裡，某個子元素設 margin-left: auto 會把它（和後面的元素）推到最右邊，不需要再包一層容器。
注意 UI-5 的提示：卡片抽成子元件後，flex 尺寸規則要下在 app-product-card 這個自訂標籤上，因為它才是 .product-grid 的直接子元素。
-->

---
layout: default
---

# P2：功能規格 FR（1/4）— 資料模型

**DM-1**：`Product` 需獨立成 interface 檔（`ng g i shop/product`），因為 ShopComponent 和 ProductCardComponent 兩個元件都要用

```typescript
// src/app/shop/product.ts（ng g i shop/product 產生）
export interface Product {
  id: number; name: string; price: number;
  category: string; emoji: string;
}
```

```typescript
// shop.component.ts 內
interface CartItem {
  product: Product;
  qty: number;
}
```

<!--
P2 的資料形狀比 P1 複雜：cart 裡每一筆要包住整個 product 物件。這一版 Product 要用 ng g i 抽成獨立檔案並 export（Ch30）——因為子元件 ProductCardComponent 的 @Input 也需要這個型別，interface 放在單一元件檔裡就沒辦法共用了。CartItem 只有 ShopComponent 用到，留在元件檔內即可，「誰共用誰抽出去」是實務上的判斷準則。
-->

---
layout: default
---

# P2：功能規格 FR（2/4）— 狀態變數

**需要的狀態變數：**
- `products: Product[]` — 完整商品列表
- `cart: CartItem[] = []` — 購物車
- `activeCategory: string = '全部'` — 目前分類
- `sortOrder: string = 'none'` — 目前排序方向

<!--
四個狀態變數各自對應一組功能：products/cart 是資料本體，activeCategory 驅動 FR-1 的分類篩選，sortOrder 驅動 FR-2 的排序——記錄目前排序方向（'none'/'asc'/'desc'），用來讓排序按鈕顯示 active 狀態。
-->

---
layout: default
---

# P2：功能規格 FR（3/4）— 操作功能

| 編號 | 功能 | 觸發時機 | 預期行為 |
|---|---|---|---|
| FR-1 | 分類篩選 | 點分類按鈕 | 更新 `activeCategory`，商品格只顯示該分類（全部＝不過濾） |
| FR-2 | 價格排序 | 點「價格低→高／高→低」 | `sort()` 依 `price` 重排商品，被點的按鈕呈 `.active`，與分類篩選並存 |
| FR-3 | 加入購物車 | 商品卡按鈕（子元件 `@Output` 通知） | 已存在 qty++、否則 push；badge 數字即時更新 |

<!--
FR-2 要提醒排序與篩選並存：直接 sort() this.products 原陣列，filterProducts() 篩出來的結果自然維持排序後的順序。
FR-3 的加入購物車由子元件的 @Output 通知父元件，父元件才真正修改購物車狀態（Ch21、Ch24）。
-->

---
layout: default
---

# P2：功能規格 FR（4/4）— 操作功能

| 編號 | 功能 | 觸發時機 | 預期行為 |
|---|---|---|---|
| FR-4 | 購物車保存 | 購物車內容變更時 | 寫入 `localStorage`；`ngOnInit` 讀回 → **重新整理頁面購物車不消失** |
| FR-5 | 清空購物車 | 點「清空購物車」 | 清空陣列並移除 localStorage；購物車為空時按鈕 `[disabled]` |
| FR-6 | 商品卡子元件 | — | `<app-product-card>` 以 `@Input` 接收商品、`@Output` 回報加入事件 |

**驗收條件**：選「前端」+「價格低→高」同時生效｜加 3 件商品後按 F5，badge 仍為 3｜購物車空時清空鈕不可點

<!--
FR-4 是這題最貼近實務的需求：「重新整理不消失」就是業界 spec 會寫的驗收語言，實作對應到 localStorage（Ch25）+ ngOnInit（Ch20）。
FR-6 的元件拆分在實際專案裡幾乎是必然：商品卡會在列表頁、推薦區、搜尋結果等多處出現，抽成元件才能複用（Ch21、Ch24）。
-->

---
layout: default
---

# P2：完整解答 — 建立檔案與路由

```bash
ng g c shop            # 主頁面元件
ng g c product-card    # 商品卡子元件
ng g i shop/product    # Product interface 獨立檔
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
💡 確認 <code>app.component.html</code> 有 <code>&lt;router-outlet /&gt;</code>，瀏覽 <code>/shop</code> 即可看到畫面。子元件 product-card 不需要 route，它由 ShopComponent 引用
</div>

<!--
這一版要建三個檔案：主頁面、商品卡子元件、Product interface。ng g i 是 Ch30 教的指令，產生的檔案只有一個空的 export interface，等一下自己填欄位。
注意子元件不用加路由——route 只給「整頁」用，卡片這種頁面裡的零件是靠父元件在 template 引用的，這是「頁面元件 vs 展示元件」的區別。
-->

---
layout: default
---

# P2：完整解答 — Product interface 與子元件

```typescript
// src/app/shop/product.ts
export interface Product {
  id: number; name: string; price: number;
  category: string; emoji: string;
}
```

```typescript
// src/app/product-card/product-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../shop/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addCart = new EventEmitter<Product>();
}
```

<!--
Product 抽成獨立檔案並加 export，兩個元件都能 import（Ch30）。
子元件只有兩個成員：@Input() product 接收父元件傳進來的商品（Ch24），@Output() addCart 是 EventEmitter，讓子元件能把「使用者按了加入購物車」這件事連同商品一起發射回父元件。
`product!: Product` 的驚嘆號是「非空斷言」：告訴 TypeScript「這個欄位父元件一定會傳，不用擔心沒有初始值」——@Input 物件型別沒有合理預設值時的慣用寫法。
-->

---
layout: default
---

# P2：完整解答 — ShopComponent（1/5）

```typescript
import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductCardComponent } from '../product-card/product-card.component';

interface CartItem {
  product: Product;
  qty: number;
}

const products: Product[] = [
  { id: 1, name: 'HTML 入門', price: 299, category: '前端', emoji: '🌐' },
  { id: 2, name: 'CSS 精通', price: 399, category: '前端', emoji: '🎨' },
  { id: 3, name: 'Node.js', price: 499, category: '後端', emoji: '🟢' },
  { id: 4, name: 'Figma 設計', price: 349, category: '設計', emoji: '🖌️' },
];
```

<!--
Product 從獨立檔 import，CartItem 留在本檔——誰共用誰抽出去（Ch30）。products 常數放在 class 外面，作為模組層級的靜態資料。
-->

---
layout: default
---

# P2：完整解答 — ShopComponent（2/5）

```typescript
@Component({
  selector: 'app-shop',
  imports: [ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  categories = ['全部', '前端', '後端', '設計'];
  products = products;
  cart: CartItem[] = [];
  activeCategory: string = '全部';
  sortOrder: string = 'none';

  ngOnInit(): void {
    const saved = localStorage.getItem('cart');
    if (saved !== null) {
      this.cart = JSON.parse(saved);
    }
  }
```

<!--
兩個新重點：
1. @Component 的 imports 加入 ProductCardComponent——Standalone 元件要在 HTML 用 <app-product-card>，必須自己 import，跟 Ch23 的 RouterLink 同一個規則。
2. implements OnInit + ngOnInit（Ch20）：元件初始化時檢查 localStorage 有沒有上次的購物車，有就用 JSON.parse 把字串還原成陣列（Ch25）。這就是 FR-4「重新整理不消失」的另一半。
-->

---
layout: default
---

# P2：完整解答 — ShopComponent（3/5）

```typescript
  setCategory(cat: string): void {
    this.activeCategory = cat;
  }
  sortByPrice(order: string): void {
    this.sortOrder = order;
    this.products.sort(function (a, b) {
      if (order === 'asc') {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
      } else {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
      }
      return 0;
    });
  }
```

<!--
sortByPrice 對應 FR-2（Ch31）：比較函式依 order 參數決定升冪或降冪，回傳 -1/1/0。sort() 直接改 this.products 原陣列，所以之後 filterProducts() 篩出來的結果自然維持排序——這就是「排序與篩選並存」的實作方式，不用寫兩套邏輯。
-->

---
layout: default
---

# P2：完整解答 — ShopComponent（4/5）

```typescript
  filterProducts() {
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
    this.saveCart();
  }
```

<!--
addToCart 維持「找到就修改、找不到就新增」模式，唯一差異是最後多呼叫 this.saveCart()——任何改動購物車的方法收尾都要存檔，下一頁會看到 saveCart 的內容。
-->

---
layout: default
---

# P2：完整解答 — ShopComponent（5/5）

```typescript
  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
  }
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
saveCart 用 JSON.stringify 把陣列轉成字串再 setItem（Ch25）——localStorage 只能存字串，物件陣列一定要先序列化，讀回來時再 JSON.parse 還原，這一對轉換是 Web Storage 的固定搭配。
clearCart 對應 FR-5：清空陣列並 removeItem 把儲存的資料一併刪掉——只清陣列不清 storage 的話，重新整理後購物車又會復活，這是很好的除錯考題。
getCartCount 和 getCartTotal 維持 for...of 累加，可以問同學有沒有更簡潔的寫法（reduce），先求正確再求精簡。
-->

---
layout: default
---

# P2：完整解答 — HTML（1/3）

```html
<nav class="navbar">
  <div class="brand">🅰 My Shop</div>
  <ul class="nav-links">
    <li><a href="#">首頁</a></li>
    <li><a href="#">商品</a></li>
    <li><a href="#">關於</a></li>
  </ul>
  <div class="cart-area">
    <div class="cart-icon">
      🛒 購物車
      <span class="cart-badge">{{ getCartCount() }}</span>
    </div>
    <button class="clear-btn"
      [disabled]="cart.length === 0"
      (click)="clearCart()">清空購物車</button>
  </div>
</nav>
<div class="hero">歡迎來到 My Shop — 精選好物一次搞定</div>
```

<!--
Navbar 右側多包了一層 .cart-area，讓購物車圖示和清空按鈕橫排。清空按鈕的 `[disabled]="cart.length === 0"` 是屬性繫結（Ch22、FR-5）：條件成立時瀏覽器原生的 disabled 屬性會被加上，按鈕不可點、CSS 的 :disabled 樣式同時生效——比自己用 class 模擬 disabled 更正確，因為鍵盤操作也會一併擋掉。`.nav-links` 是 `<ul><li><a>`，記得 CSS 要重置 list-style 和 a 的顏色／底線。
-->

---
layout: default
---

# P2：完整解答 — HTML（2/3）

```html
<div class="filter-bar">
  @for (cat of categories; track cat) {
    <button class="filter-btn"
      [class.active]="cat === activeCategory"
      (click)="setCategory(cat)">{{ cat }}</button>
  }
  <div class="sort-btns">
    <button class="filter-btn"
      [class.active]="sortOrder === 'asc'"
      (click)="sortByPrice('asc')">價格低→高</button>
    <button class="filter-btn"
      [class.active]="sortOrder === 'desc'"
      (click)="sortByPrice('desc')">價格高→低</button>
  </div>
</div>
```

<!--
排序按鈕跟分類按鈕共用 .filter-btn 樣式，用 sortOrder 判斷哪顆 active，跟分類按鈕的 [class.active] 是同一套語法。
-->

---
layout: default
---

# P2：完整解答 — HTML（3/3）父子元件

```html
<!-- shop.component.html：商品格 -->
<div class="product-grid">
  @for (product of filterProducts(); track product.id) {
    <app-product-card
      [product]="product"
      (addCart)="addToCart($event)" />
  }
</div>
```

```html
<!-- product-card.component.html -->
<div class="product-card">
  <div class="product-img">{{ product.emoji }}</div>
  <div class="product-info">
    <div class="product-name">{{ product.name }}</div>
    <div class="product-price">NT${{ product.price }}</div>
    <button class="add-btn"
      (click)="addCart.emit(product)">加入購物車</button>
  </div>
</div>
```

<!--
父元件的 @for 現在渲染的是 <app-product-card> 標籤：`[product]="product"` 把當前迭代的商品用 @Input 傳進子元件（Ch24），`(addCart)="addToCart($event)"` 監聽子元件發射的事件，$event 就是 emit 出來的那個 Product 物件。
子元件按鈕的 `(click)="addCart.emit(product)"`：子元件不自己處理購物車邏輯，只負責「通知父元件使用者按了哪個商品」——狀態（cart）集中在父元件管理，子元件保持笨笨的純展示，這是元件設計的重要原則（smart / dumb component）。
-->

---
layout: default
---

# P2：完整解答 — CSS（1/5）

```css
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: 64px; background: #1a5c5c;
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 0 40px; z-index: 100; color: white;
}
body { padding-top: 64px; }
.nav-links {
  list-style: none; display: flex; gap: 20px;
  margin: 0; padding: 0;
}
.nav-links a { color: white; text-decoration: none; }
.cart-area { display: flex; align-items: center; gap: 16px; }
.clear-btn {
  padding: 6px 14px; border: 1px solid white;
  border-radius: 4px; background: transparent;
  color: white; cursor: pointer;
}
.clear-btn:disabled { opacity: 0.4; cursor: not-allowed; }
```

<!--
.navbar 和 P1 的 .resume 有個共同點：都是 display: flex + justify-content: space-between 把子元素推到兩端。`.nav-links` 用 `list-style: none` 拿掉項目符號、`a { text-decoration: none; color: white }` 拿掉底線和藍色。
.clear-btn:disabled 是 CSS 的偽類（UI-3）：當 HTML 的 [disabled] 繫結成立、按鈕真的被 disabled 時，這組樣式自動生效——opacity 調淡 + cursor: not-allowed，讓使用者一眼看出「現在不能按」。
-->

---
layout: default
---

# P2：完整解答 — CSS（2/5）

```css
.hero {
  background: #5eada0; color: white; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  height: 250px;
}
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
.hero 用 #5eada0 跟 Navbar 的 #1a5c5c 做出深淺兩層對比。.cart-badge 的 display: flex + align-items/justify-content: center 是讓小圓點內的數字完美置中的標準方法，也可以用 line-height，但 Flexbox 置中更直覺。
-->

---
layout: default
---

# P2：完整解答 — CSS（3/5）

```css
/* shop.component.css */
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
.sort-btns { margin-left: auto; display: flex; gap: 8px; }
.product-grid {
  display: flex; flex-wrap: wrap; gap: 20px; padding: 32px 40px;
}
.product-grid app-product-card {
  flex: 0 0 calc(25% - 15px);
}
```

<!--
.sort-btns 的 margin-left: auto 把排序按鈕組推到篩選列最右邊（UI-8）。
最關鍵的變化：四欄的 flex 尺寸現在下在 `app-product-card` 標籤上，不是 .product-card——因為卡片抽成子元件後，.product-grid 的直接子元素是 <app-product-card> 這個自訂標籤，flex 項目的尺寸規則必須下在直接子元素上。這是元件化後最常見的版面踩坑點，值得特別停下來講。
-->

---
layout: default
---

# P2：完整解答 — CSS（4/5）子元件樣式

```css
/* product-card.component.css */
.product-card {
  border-radius: 12px; background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: box-shadow 0.25s;
}
.product-card:hover { box-shadow: 0 12px 28px rgba(0,0,0,0.15); }
.product-img {
  height: 180px; background: #f0faf9;
  display: flex; align-items: center;
  justify-content: center; font-size: 4rem;
  border-radius: 12px 12px 0 0;
}
```

<!--
卡片內部的樣式全部搬到 product-card.component.css——Angular 元件的 CSS 是封裝的（View Encapsulation），子元件的樣式不會污染父頁面，父頁面的 .product-card 也管不到子元件內部，所以「卡片長相」的樣式理所當然跟著子元件走。
分工結果：父元件 CSS 管「格子怎麼排」（flex 尺寸、gap），子元件 CSS 管「卡片長怎樣」（陰影、圓角、按鈕）——這是元件化 CSS 的標準切法。
-->

---
layout: default
---

# P2：完整解答 — CSS（5/5）子元件樣式

```css
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
.add-btn 和 Navbar/清空鈕一樣的重置手法：width: 100% 撐滿卡片寬度、border: none 移除瀏覽器預設外框，hover 換色給互動回饋。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">📊</div>

# P3 — 學習進度儀表板
### Learning Dashboard

**預估時間：2 小時**

<!--
P3 沒有 click 互動，但這一版的資料不再寫死在元件裡——課程記錄改成用 HttpClient 從 API（public/records.json）載入，這是四題中唯一完整走過「ngOnInit → 呼叫 Service → subscribe → 塞資料 → 排序 → 渲染」流程的題目，也是最貼近實際工作的資料流。
其他新需求：記錄依日期新到舊排序（Date + sort）、狀態 badge 改用 @switch 三分支（多了「未開始」狀態）、header 日期用 new Date() 動態產生。可以讓同學先看畫面猜猜「這四個統計數字是怎麼算出來的」，再帶入程式碼說明。
-->

---
layout: default
---

# P3：畫面需求

<div style="border:2px solid #5eada0;border-radius:8px;overflow:hidden;font-size:0.82em;">
  <div style="background:#1a5c5c;color:white;padding:9px 16px;display:flex;justify-content:space-between;">
    <span style="font-weight:700;">📚 學習進度儀表板</span>
    <span style="color:#a7d9d0;">2026/7/3（今日日期，動態產生）</span>
  </div>
  <div style="display:flex;gap:8px;padding:10px 14px;background:#f8fffe;">
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#1a5c5c;">2</div><div style="color:#666;">已完成</div>
    </div>
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#e07b39;">1</div><div style="color:#666;">學習中</div>
    </div>
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#1a5c5c;">10h</div><div style="color:#666;">總時數</div>
    </div>
    <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;text-align:center;padding:10px;background:white;">
      <div style="font-size:1.5em;font-weight:900;color:#5eada0;">50%</div><div style="color:#666;">完成率</div>
    </div>
  </div>
  <div style="padding:8px 14px;background:#f0faf9;border-top:1px solid #c8e6e3;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
      <span style="width:72px;color:#666;">HTML</span>
      <span style="color:#1a5c5c;font-weight:700;">80</span>&nbsp;<span style="color:#888;font-size:0.85em;">%</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
      <span style="width:72px;color:#666;">CSS</span>
      <span style="color:#1a5c5c;font-weight:700;">70</span>&nbsp;<span style="color:#888;font-size:0.85em;">%</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="width:72px;color:#666;">TypeScript</span>
      <span style="color:#1a5c5c;font-weight:700;">40</span>&nbsp;<span style="color:#888;font-size:0.85em;">%</span>
    </div>
  </div>
  <div style="padding:8px 14px;background:#f8fffe;border-top:1px solid #e2e8f0;font-size:0.9em;">
    <div style="color:#666;">● Angular Router（2026/06/25）&nbsp;<span style="background:#e2e8f0;color:#555;border-radius:999px;padding:1px 7px;">未開始</span></div>
    <div style="color:#666;">● TypeScript 基礎（2026/06/20）&nbsp;<span style="background:#fff3cd;color:#856404;border-radius:999px;padding:1px 7px;">學習中</span></div>
    <div style="color:#666;">● CSS Flexbox（2026/06/10）&nbsp;<span style="background:#d4edda;color:#1a6e2e;border-radius:999px;padding:1px 7px;">已完成</span></div>
    <div style="color:#666;">● HTML 表單練習（2026/06/01）&nbsp;<span style="background:#d4edda;color:#1a6e2e;border-radius:999px;padding:1px 7px;">已完成</span></div>
  </div>
</div>

<!--
P3 的畫面分三個區域：頂部 header（日期動態產生）、四個統計卡片橫排、下方進度數字列表和課程記錄。
課程記錄來自 API（4 筆），並且依日期「新到舊」排序——所以最新的 Angular Router 排最上面。統計數字全部由方法計算：已完成 2、學習中 1、總時數 10h（4 筆 × 2.5）、完成率 50%（2/4）。狀態 badge 有三種：已完成（綠）、學習中（黃）、未開始（灰）。
可以讓同學先看線框圖猜猜「每個數字是怎麼算出來的」「記錄為什麼是這個順序」，再對照程式碼確認。
-->

---
layout: default
---

# P3：畫面規格 UI Spec（1/3）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-1 | Header | 深綠底白字，兩端對齊；標題 `.title` 粗體，右側顯示**今日日期**（動態） |
| UI-2 | 整體背景 | `.content`：`background: #f8fffe`（跟卡片白色做出對比） |
| UI-3 | 統計卡片列 | `.stats-row`：`flex; gap: 16px`；每張 `.stat-card` `flex: 1` 均分寬度、圓角 `12px`、置中 |
| UI-4 | 統計卡片內容 | 數字 `.stat-value`：`2.5rem` 特粗深綠；標籤 `.stat-label`：`#666` |
| UI-5 | 卡片 hover | 整卡反轉為深綠底白字（`transition: background 0.25s, color 0.25s`） |

<!--
統計卡片 flex: 1 讓四張卡片平均分配空間。UI-5 的 hover 狀態把背景改成深綠並讓數字也變白——注意 .stat-card:hover .stat-value 要用子代選擇器才能改到 .stat-value 的顏色，只寫 .stat-card:hover 不夠。
UI-1 的「今日日期」是新需求：不能寫死字串，要由 FR-5 的 getToday() 動態產生。
-->

---
layout: default
---

# P3：畫面規格 UI Spec（2/3）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-6 | 進度數字區 | `.progress-section`：`margin: 0 -32px; padding: 16px 32px; background: #f0faf9`（打破 `.content` padding 做滿版分區） |
| UI-7 | 進度列 | `.progress-row`：`flex; align-items: center; gap: 16px`；hover 底色 `#f8fffe` |
| UI-8 | 進度列內容 | 科目 `.subject-name` 寬 `80px`；數字 `.progress-num` `1.6rem` 特粗；單位 `.progress-unit` 小字灰色 |

<!--
UI-6 的 margin: 0 -32px 打破外層 .content 的左右 padding，做出滿版分區背景，跟畫面需求裡進度數字區有自己底色的效果對上——「容器有 padding，但子區塊想滿版」的常見技巧。
-->

---
layout: default
---

# P3：畫面規格 UI Spec（3/3）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-9 | 課程記錄區 | `.records`：`margin: 0 -32px; padding: 16px 32px; background: #f8fffe; border-top: 1px solid #e2e8f0` |
| UI-10 | 已完成 badge | `.badge-done`：`background: #d4edda; color: #1a6e2e; border-radius: 999px; padding: 2px 10px` |
| UI-11 | 學習中 badge | `.badge-wip`：`background: #fff3cd; color: #856404`（同膠囊形） |
| UI-12 | 未開始 badge | `.badge-todo`：`background: #e2e8f0; color: #555`（同膠囊形） |

<!--
badge 的 border-radius: 999px 讓標籤變成「膠囊形」，是比 50% 更通用的圓角技巧。
UI-12 是新需求：狀態多了第三種「未開始」（灰色），對應 FR-4 的 @switch 三分支——兩種狀態用 @if/@else 還行，三種以上就是 @switch 的主場。
-->

---
layout: default
---

# P3：功能規格 FR（1/3）— 資料模型與 API

**DM-1**：`subjects` 為元件內靜態資料；`records` **改由 API 取得**，初始為空陣列

```typescript
interface Subject {
  name: string;
  progress: number;
}
interface CourseRecord {
  name: string;
  status: 'completed' | 'in-progress' | 'not-started';
  date: string;
}

subjects: Subject[] = [
  { name: 'HTML', progress: 80 },
  { name: 'CSS',  progress: 70 },
  { name: 'TypeScript', progress: 40 },
];
records: CourseRecord[] = [];   // 由 API 載入
```

**API-1**：資料放在 `public/records.json`（4 筆記錄），以 Ch29 的 `HttpClientService.getApi()` 取得

<!--
Subject、CourseRecord 用 interface 定義。取名 CourseRecord 而不是 Record，避免跟 TypeScript 內建的 `Record<K, V>` 工具型別撞名。status 聯合型別這一版多了 'not-started'，三種字串以外的值 TypeScript 直接報錯。
DM-1 的重點是 records 初始為空陣列——資料改走 API 後，元件建立當下是沒有資料的，畫面會先渲染一次空清單，等 subscribe 收到回應才更新。這個「先空後有」的過程就是實際專案的常態。
API-1 用 public/ 資料夾模擬後端：Angular dev server 會直接把 public/ 下的檔案當靜態資源供應，getApi('records.json') 就取得到，不需要真的架後端。
-->

---
layout: default
---

# P3：功能規格 FR（2/3）— 操作功能

| 編號 | 功能 | 觸發時機 | 預期行為 |
|---|---|---|---|
| FR-1 | 資料載入 | `ngOnInit` | 呼叫 `HttpClientService.getApi('records.json')` 並 `subscribe`，回應塞入 `records` |
| FR-2 | 日期排序 | 資料載入完成後 | `records` 依 `date` **新到舊**排列（`new Date().getTime()` 比較） |
| FR-3 | 統計卡計算 | 渲染時 | 已完成數／學習中數（`filter`＋`.length`）、總時數（筆數 × 2.5）、完成率（`'50%'` 格式） |

<!--
FR-1 是這題核心（Ch29）：注入 HttpClientService → ngOnInit 呼叫 getApi → subscribe 接資料。沒有 subscribe 請求根本不會發出，這是最常見的錯誤。
FR-2 練 Ch18+Ch31 組合技：日期字串不能直接比大小，要 new Date(字串).getTime() 轉毫秒數再進 sort 比較函式。
-->

---
layout: default
---

# P3：功能規格 FR（3/3）— 操作功能（續）

| 編號 | 功能 | 觸發時機 | 預期行為 |
|---|---|---|---|
| FR-4 | 狀態 badge | 每筆記錄渲染時 | `@switch (r.status)` 三分支：completed 綠／in-progress 黃／`@default` 灰「未開始」 |
| FR-5 | 今日日期 | Header 渲染時 | `getToday()` 以 `new Date()` 組出 `YYYY/M/D`（注意 `getMonth()` 要 +1） |

**驗收條件**：畫面開啟即顯示 4 筆記錄且最新在最上｜統計卡顯示 2／1／10h／50%｜三種 badge 顏色正確｜header 日期＝系統今天

<!--
FR-5 的 getMonth() 回傳 0–11，忘記 +1 會顯示錯誤月份——Ch18 的經典地雷，正好用驗收條件「header 日期＝系統今天」抓出來。
P3 依然沒有 (click) 事件，所有互動都是「載入 → 計算 → 顯示」的單向資料流。
-->

---
layout: default
---

# P3：完整解答 — 路由與 API 前置設定

```bash
ng g c dashboard
```

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
];
```

```typescript
// app.config.ts — HttpClient 依賴注入（Ch29 第一步）
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>HttpClientService</code>（含 <code>getApi</code> 四方法）沿用 Ch29 建立的 <code>http-service/http-client.service.ts</code>，本題不用重寫
</div>

<!--
P3 比前兩題多一個前置步驟：app.config.ts 加 provideHttpClient()，否則注入 HttpClient 時直接報錯（Ch29）。
HttpClientService 直接沿用 Ch29 練習建好的那一個——Service 是全域單例，一次封裝、全專案共用，這正是當初把 HTTP 方法包進 Service 的價值。
-->

---
layout: default
---

# P3：完整解答 — 假後端資料

**檔案位置：`public/records.json`**

```json
[
  { "name": "HTML 表單練習",   "status": "completed",   "date": "2026/06/01" },
  { "name": "CSS Flexbox",     "status": "completed",   "date": "2026/06/10" },
  { "name": "TypeScript 基礎", "status": "in-progress", "date": "2026/06/20" },
  { "name": "Angular Router",  "status": "not-started", "date": "2026/06/25" }
]
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>public/</code> 下的檔案會被 dev server 以根路徑供應：<code>getApi('records.json')</code> 實際請求 <code>http://localhost:4200/records.json</code>。
   重啟Angular(Ctrl+c > ng s)後, 可在瀏覽器直接開這個網址確認 JSON 讀得到
</div>

<!--
把 records.json 放進專案的 public/ 資料夾，就是最簡單的「假後端」。注意 JSON 格式跟 TypeScript 物件的差異：key 一定要雙引號、不能有註解、最後一筆不能有逗號——很多同學第一次手寫 JSON 都會踩到。
資料故意不照日期排——第 4 筆最新的排最後，這樣 FR-2 的排序才有意義，畫面上能看出排序有沒有生效。
-->

---
layout: default
---

# P3：完整解答 — TypeScript（1/4）

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-service/http-client.service';

interface Subject {
  name: string;
  progress: number;
}
interface CourseRecord {
  name: string;
  status: 'completed' | 'in-progress' | 'not-started';
  date: string;
}
```

<!--
status 聯合型別多了 'not-started'，跟 records.json 裡的第 4 筆對應。CourseRecord 不取名 Record 是為了避開 TypeScript 內建的 Record<K, V> 工具型別。
-->

---
layout: default
---

# P3：完整解答 — TypeScript（2/4）

```typescript
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  subjects: Subject[] = [
    { name: 'HTML', progress: 80 },
    { name: 'CSS', progress: 70 },
    { name: 'TypeScript', progress: 40 },
  ];
  records: CourseRecord[] = [];
  today = new Date();

  constructor(private http: HttpClientService) {}
```

<!--
三個關鍵：records 初始為空陣列，等 API 回來才有資料；today 屬性在元件建立時就抓一次 new Date()（Ch18）；constructor 注入 HttpClientService（Ch29 的寫法），拿到 this.http 之後就能呼叫 getApi。
-->

---
layout: default
---

# P3：完整解答 — TypeScript（3/4）載入與排序

```typescript
  ngOnInit(): void {
    this.http.getApi('records.json').subscribe((res) => {
      this.records = res as CourseRecord[];
      this.sortRecords();
    });
  }
  sortRecords(): void {
    this.records.sort(function (a, b) {
      if (new Date(a.date).getTime() > new Date(b.date).getTime()) return -1;
      if (new Date(a.date).getTime() < new Date(b.date).getTime()) return 1;
      return 0;
    });
  }
  getToday(): string {
    return this.today.getFullYear() + '/' +
      (this.today.getMonth() + 1) + '/' + this.today.getDate();
  }
```

<!--
ngOnInit 對應 FR-1（Ch20+Ch29）：getApi 回傳 Observable，一定要 subscribe 請求才會發出。`res as CourseRecord[]` 是型別斷言——HttpClient 回傳的型別是 Object，我們告訴 TypeScript「這份資料的形狀就是 CourseRecord 陣列」，之後 filter、sort 才有型別提示。
sortRecords 對應 FR-2（Ch18+Ch31）：日期字串不能直接比大小（'2026/06/10' > '2026/06/02' 碰巧對，但跨格式就錯），標準做法是 new Date(字串).getTime() 轉毫秒數再比。新的排前面，所以 getTime 大的回傳 -1。
getToday 對應 FR-5：getMonth() 回傳 0–11 要 +1，忘記的話 7 月會顯示成 6 月——Ch18 的經典地雷。
-->

---
layout: default
---

# P3：完整解答 — TypeScript（4/4）統計方法

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
    if (this.records.length === 0) return '0%';
    const rate = this.getCompletedCount() / this.records.length;
    return Math.round(rate * 100) + '%';
  }
}
```

<!--
統計方法跟舊版邏輯相同，但 getCompletionRate 多了一行防呆：records 現在初始是空陣列，API 還沒回來時 length 是 0，除以 0 會得到 NaN 顯示在畫面上——資料改走非同步載入後，「資料還沒到」的狀態都要處理，這是接 API 跟寫死資料最大的思維差異。
getCompletionRate 裡呼叫 this.getCompletedCount() 複用邏輯；getStatusText 這一版拿掉了，因為狀態文字改由 template 的 @switch 直接渲染（下一頁）。
-->

---
layout: default
---

# P3：完整解答 — HTML（1/3）

```html
<div class="dashboard-header">
  <span class="title">📚 學習進度儀表板</span>
  <span class="date">{{ getToday() }}</span>
</div>
<div class="content">
```

<!--
外層 dashboard-header 顯示標題和日期，content 是下方所有區塊的容器，先把外殼搭好再往下填內容。title 要記得補上 .title 樣式，否則標題會跟其他文字一樣細，跟畫面需求的粗體標題對不上。
-->

---
layout: default
---

# P3：完整解答 — HTML（2/3）

```html
  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-value">{{ getCompletedCount() }}</div>
      <div class="stat-label">已完成</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#e07b39">{{ getInProgressCount() }}</div>
      <div class="stat-label">學習中</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ getTotalHours() }}h</div>
      <div class="stat-label">總時數</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#5eada0">{{ getCompletionRate() }}</div>
      <div class="stat-label">完成率</div>
    </div>
  </div>
```

<!--
四個統計卡片的 HTML 結構完全相同，只是 `{{ }}` 裡呼叫的方法不同。注意「學習中」和「完成率」的 stat-value 加了 inline style 改顏色——這是最簡單的條件樣式做法，不需要額外 class。這種「只有少數幾個元素需要不同顏色」的情況，用 inline style 比另外寫 CSS class 更快速直覺。
-->

---
layout: default
---

# P3：完整解答 — HTML（3/3）

```html
  <div class="progress-section">
    @for (s of subjects; track s.name) {
      <div class="progress-row">
        <span class="subject-name">{{ s.name }}</span>
        <span class="progress-num">{{ s.progress }}</span>
        <span class="progress-unit">%</span>
      </div>
    }
  </div>
  <div class="records">
    @for (r of records; track r.name) {
      <div class="record-item">
        <span>● {{ r.name }}（{{ r.date }}）</span>
        @switch (r.status) {
          @case ('completed') { <span class="badge-done">已完成</span> }
          @case ('in-progress') { <span class="badge-wip">學習中</span> }
          @default { <span class="badge-todo">未開始</span> }
        }
      </div>
    }
  </div>
</div>
```

<!--
`.progress-section` 包住整排科目進度，`.records` 包住課程記錄，兩層都用 `margin: 0 -32px` 打破 `.content` 的左右 padding 做出滿版分區背景。
狀態 badge 改用 `@switch`（Ch28、FR-4）：@case 逐一比對 r.status 的三種值，@default 接住其餘情況。跟舊版兩個 [class.xxx] 綁定比，@switch 把「狀態 → 樣式 + 文字」整組綁在一起，新增第四種狀態時只要多一個 @case，不會漏改。
記錄多顯示了日期（{{ r.date }}），驗收時才看得出 FR-2 排序有沒有生效——最新的要在最上面。
-->

---
layout: default
---

# P3：完整解答 — CSS（1/3）

```css
.dashboard-header {
  background: #1a5c5c; color: white; padding: 12px 32px;
  display: flex; justify-content: space-between; align-items: center;
}
.dashboard-header .title { font-weight: 700; }
.dashboard-header .date { color: #a7d9d0; }
.content { padding: 24px 32px; background: #f8fffe; }
.stats-row { display: flex; gap: 16px; margin-bottom: 32px; }
.stat-card {
  flex: 1; background: white; border-radius: 12px;
  padding: 24px; text-align: center;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.25s, color 0.25s;
}
.stat-card:hover { background: #1a5c5c; color: white; }
.stat-value { font-size: 2.5rem; font-weight: 900; color: #1a5c5c; }
.stat-label { color: #666; }
.stat-card:hover .stat-value,
.stat-card:hover .stat-label { color: white; }
```

<!--
.stat-card:hover 和 .stat-card:hover .stat-value/.stat-label 這幾個選擇器要一起寫。transition 只需要在 :default 狀態寫，瀏覽器在進入和離開 hover 時都會自動使用這個過渡動畫。.stat-value 和 .stat-label 各自有獨立 color，hover 時要被覆蓋為 white——所以必須另寫 .stat-card:hover .stat-value、.stat-card:hover .stat-label，只靠 .stat-card:hover { color: white } 無法蓋過子元素的獨立 color 設定。另外別忘了補 .title { font-weight: 700 }，不然標題會跟畫面需求的粗體樣式對不上。
-->

---
layout: default
---

# P3：完整解答 — CSS（2/3）

```css
.progress-section {
  margin: 0 -32px; padding: 16px 32px;
  background: #f0faf9; border-top: 1px solid #c8e6e3;
}
.progress-row {
  display: flex; align-items: center; gap: 16px;
  padding: 8px; border-radius: 8px;
  margin-bottom: 8px; transition: background 0.2s;
}
.progress-row:hover { background: #f8fffe; }
.subject-name { width: 80px; color: #555; }
.progress-num { font-size: 1.6rem; font-weight: 900; color: #1a5c5c; min-width: 60px; }
.progress-unit { font-size: 0.85rem; color: #888; }
```

<!--
.progress-section 用 margin: 0 -32px 打破外層 .content 的左右 padding，做出滿版分區背景，對應畫面需求裡進度數字區有自己底色的效果。
-->

---
layout: default
---

# P3：完整解答 — CSS（3/3）

```css
.records {
  margin: 0 -32px; padding: 16px 32px;
  background: #f8fffe; border-top: 1px solid #e2e8f0;
}
.record-item {
  display: flex; justify-content: space-between;
  padding: 8px 4px; color: #555;
  border-bottom: 1px solid #f0faf9;
}
.badge-done { background: #d4edda; color: #1a6e2e; border-radius: 999px; padding: 2px 10px; }
.badge-wip  { background: #fff3cd; color: #856404; border-radius: 999px; padding: 2px 10px; }
.badge-todo { background: #e2e8f0; color: #555;    border-radius: 999px; padding: 2px 10px; }
```

<!--
.progress-section 和 .records 都用 margin: 0 -32px 打破外層 .content 的左右 padding，做出滿版分區背景，對應畫面需求裡「三塊區域各有底色」的效果——這是常見的「容器有 padding，但子區塊想滿版」的 CSS 技巧。.progress-row 用 display: flex + align-items: center 讓科目名稱、數字、單位三個元素在同一行垂直置中對齊。badge-done 和 badge-wip 共用 border-radius: 999px 的膠囊形樣式，只有背景色和文字色不同——可以鼓勵同學把共用樣式提取成 .badge-base class，再用 badge-done、badge-wip 覆蓋顏色，這就是 CSS 的「複用」思維。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

<div style="font-size: 4rem;">🍜</div>

# P4 — 餐廳菜單點餐頁
### Restaurant Menu & Order Page

**預估時間：2 小時**

<!--
P4 是四題中最完整的實作，這一版是一個「兩頁的小型應用」：菜單頁點餐、結帳頁確認訂單。新需求：訂單面板抽成子元件（@Input/@Output）、空訂單顯示提示（@if）、結帳鈕 [disabled]、訂單存 sessionStorage、按結帳把訂單放進 OrderService 再用 Router 導航到 /checkout、interface 用 ng g i 抽成獨立檔給四個檔案共用。
removeItem 的「qty-- 後再 filter 掉 qty=0」兩段式刪除邏輯仍然是重點。做完 P4，同學等於完整走過一次「元件拆分 + Service 跨頁傳資料 + 路由導航」的實務流程。
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

- `position: fixed` header（64px）、body `padding-top: 64px`；分類切換列（正常文件流）
- 左側 flex-wrap 菜單格；右側訂單欄為**子元件** `<app-order-panel>`，空訂單顯示「尚未點餐」、結帳鈕反灰
- 按「結帳」導航到 `/checkout` 結帳頁，顯示訂單明細與總計

<!--
P4 的三層結構：固定 header、分類導覽列、左右分欄主體。左邊 menu-area 用 flex: 1 撐滿，右邊 order-panel 固定 280px。特別注意：分類導覽列是「正常文件流」，不需要 sticky——它緊跟在 header 的 padding-top: 64px 下方，自然就排在正確位置。這和 P2 的結構最主要的差異是有右側固定訂單欄。
-->

---
layout: default
---

# P4：畫面規格 UI Spec（1/4）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-1 | 固定 Header | `.header`：`position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 64px`；`body` 補 `padding-top: 64px` |
| UI-2 | 餐點 badge | `.badge-num`：紅底白字小圓形，跟在「📋 餐點」右側 |

<!--
P4 的 header 和 P2 的 navbar 結構幾乎一樣，都是 position: fixed + z-index + body padding-top。
-->

---
layout: default
---

# P4：畫面規格 UI Spec（2/4）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-3 | 分類切換列 | `.category-nav`：白底、`border-bottom`、按鈕橫排 `gap: 8px`（正常文件流，不需 sticky） |
| UI-4 | 分類按鈕 | `.cat-btn` 預設 `1px` 灰框灰字；`.active` 深綠底白字；`transition` 平滑切換 |

<!--
分類按鈕 .cat-btn.active 和 P2 的 .filter-btn.active 邏輯相同，都是「預設是空白邊框，active 狀態換成填滿背景色」。可以問同學：「P2 和 P4 的 active 按鈕 CSS 有什麼差異？」引導他們觀察細節的不同。
-->

---
layout: default
---

# P4：畫面規格 UI Spec（3/4）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-5 | 左右分欄 | `.main-layout`：`flex; gap: 24px; align-items: flex-start; background: #f8fffe` |
| UI-6 | 左菜單欄 | `.menu-area`：`flex: 1` |
| UI-7 | 右訂單欄 | `<app-order-panel>` 標籤本身 `width: 280px; flex-shrink: 0`（訂單欄是子元件，尺寸由父元件 CSS 控制） |

<!--
.main-layout 的 background: #f8fffe 讓左右兩欄的白色卡片跟頁面背景有對比。align-items: flex-start 避免右欄被 Flexbox 預設的 stretch 拉到滿頁高。
UI-7 跟 P2 的商品卡同一個坑：訂單欄抽成子元件後，.main-layout 的直接子元素是 <app-order-panel> 標籤，寬度規則要下在標籤上；面板內部的白底圓角陰影則寫在子元件自己的 CSS。
-->

---
layout: default
---

# P4：畫面規格 UI Spec（4/4）

| 編號 | 區塊 | 規格 |
|---|---|---|
| UI-8 | 菜單格 | `.menu-grid`：`flex-wrap: wrap; gap: 16px`；卡片 `flex: 0 0 calc(50% - 8px)` 兩欄 |
| UI-9 | 菜單卡片 | 預設 `border: 2px solid transparent`（佔位邊框）；hover 只改 `border-color: #5eada0` |
| UI-10 | 訂單面板 | `.order-panel`：白底、圓角 `12px`、`box-shadow: 0 2px 12px rgba(0,0,0,0.1)` |
| UI-11 | 空訂單提示 | `.empty-hint`：灰字置中，訂單為空時取代明細顯示「尚未點餐」 |
| UI-12 | 結帳按鈕 | hover 反轉為白底深綠字（ghost button）；`:disabled` 時 `opacity: 0.4; cursor: not-allowed` |

<!--
.menu-card 的 `border: 2px solid transparent` 是「佔位邊框」技巧——預設就有 2px 邊框只是透明，hover 時只改顏色不改尺寸，避免畫面跳動，值得特別強調。
UI-11、UI-12 是新需求：空訂單狀態由 FR-4 的 @if 控制顯示哪一塊；結帳鈕的 disabled 時機由 [disabled] 繫結決定，CSS 只負責反灰外觀。
-->

---
layout: default
---

# P4：功能規格 FR（1/5）— 資料模型

**DM-1**：interface 以 `ng g i order` 建立**獨立檔案**並 `export`——MenuComponent、OrderPanelComponent、CheckoutComponent、OrderService 四個檔案都要用

```typescript
// src/app/order.ts
export interface MenuItem {
  id: number; name: string; price: number;
  category: '麵食' | '湯品' | '小菜' | '飲料';
  emoji: string;
}
export interface OrderItem {
  item: MenuItem;
  qty: number;
}
```

<!--
MenuItem 的 category 欄位用聯合型別限制只能是四個分類字串，防止打錯分類名稱。OrderItem 直接把 item 標注成 MenuItem。
這一版 interface 一定要抽獨立檔（Ch30 的 ng g i）：訂單資料要流經「菜單頁 → 子元件 → Service → 結帳頁」四個檔案，型別放在任何一個元件檔裡都會造成循環依賴或到處複製貼上——這正是獨立 interface 檔存在的理由。
-->

---
layout: default
---

# P4：功能規格 FR（2/5）— 架構

**需要建立的檔案：**

| 檔案 | 指令 | 職責 |
|---|---|---|
| `MenuComponent` | `ng g c menu` | 菜單頁：分類切換、加點、持有 `order` 狀態 |
| `OrderPanelComponent` | `ng g c order-panel` | 訂單面板子元件：`@Input` 收訂單、`@Output` 發移除／結帳事件 |
| `CheckoutComponent` | `ng g c checkout` | 結帳頁：從 Service 讀訂單顯示明細 |
| `OrderService` | `ng g s order` | 跨頁共享訂單資料（`providedIn: 'root'` 單例） |
| `order.ts` | `ng g i order` | `MenuItem`、`OrderItem` 共用 interface |

<!--
這張架構表是業界 spec 常見的「交付物清單」。P4 的重點從「一頁的功能」升級成「多檔案怎麼分工」：狀態集中在 MenuComponent，子元件純展示，Service 只負責跨頁搬運資料，結帳頁只讀不寫。
帶題時可以先畫這五個檔案的依賴關係圖：menu → order-panel（@Input/@Output）、menu → order.service → checkout（Service 傳遞）、四者 → order.ts（型別）。
-->

---
layout: default
---

# P4：功能規格 FR（3/5）— MenuComponent 狀態

**MenuComponent 狀態**：
- `menu: MenuItem[]`（模組層級常數）
- `order: OrderItem[] = []`
- `activeCategory = '麵食'`

<!--
menu 是模組層級常數而非 class 屬性——菜單資料不會變，跟 P2 的 products 常數同一個做法。order、activeCategory 才是真正需要響應畫面變化的狀態，宣告在 class 內。
-->

---
layout: default
---

# P4：功能規格 FR（4/5）— 操作功能

| 編號 | 功能 | 觸發時機 | 預期行為 |
|---|---|---|---|
| FR-1 | 分類切換 | 點分類按鈕 | 更新 `activeCategory`，菜單格只顯示該分類 |
| FR-2 | 加入餐點 | 菜單卡「加入」 | 已存在 qty++、否則 push；header badge 即時更新 |
| FR-3 | 移除餐點 | 訂單列「－」（子元件 `@Output` 通知） | qty--，qty 歸 0 的項目從訂單移除 |
| FR-4 | 空訂單狀態 | 訂單為空時 | `@if` 顯示「尚未點餐」提示；結帳鈕 `[disabled]` 不可點 |

---
layout: default
---

# P4：功能規格 FR（5/5）— 操作功能（續）

| 編號 | 功能 | 觸發時機 | 預期行為 |
|---|---|---|---|
| FR-5 | 訂單保存 | 訂單內容變更時 | 寫入 `sessionStorage`；`ngOnInit` 讀回 → 重新整理保留、**關閉分頁即消失** |
| FR-6 | 結帳導航 | 點「結帳」（子元件 `@Output` 通知） | 訂單與總計存入 `OrderService`，`Router.navigate` 到 `/checkout` |
| FR-7 | 結帳頁顯示 | 進入 `/checkout` | 從 Service 讀出訂單，逐筆列出品項×數量×小計與總計；無資料顯示提示；附「返回菜單」連結 |

**驗收條件**：點 2 碗牛肉麵按 F5 訂單還在、關分頁重開消失｜訂單空時結帳鈕反灰不可點｜按結帳跳轉 `/checkout` 且明細與總計正確｜從結帳頁能返回菜單繼續點餐

<!--
FR-5 跟 P2 的 localStorage 對照：sessionStorage 同樣的 setItem/getItem API，但生命週期只到分頁關閉（Ch25）——點餐這種「一次性流程」用 sessionStorage 比 localStorage 合理，不會留下上週的舊訂單。驗收條件把兩種行為都寫進去了，正好讓同學實際體驗兩者差異。
FR-6 是 Ch23+Ch24 組合技：資料放 Service（全域單例，導航後不會消失）、Router.navigate 用程式切頁。可以問同學：為什麼不能用 @Input 把訂單傳給結帳頁？——因為兩頁不是父子關係，路由切換的頁面之間只能靠 Service（或網址參數）傳資料。
removeItem 的兩段式刪除（forEach qty-- → filter 掉 qty=0）值得讓同學手動追蹤流程。
-->

---
layout: default
---

# P4：完整解答 — 建立檔案與路由

```bash
ng g c menu           # 菜單頁
ng g c order-panel    # 訂單面板子元件
ng g c checkout       # 結帳頁
ng g s order          # 訂單 Service
ng g i order          # 共用 interface 檔
```

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'checkout', component: CheckoutComponent },
];
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>menu</code> 和 <code>checkout</code> 是「頁面」要加 route；<code>order-panel</code> 是頁面裡的「零件」，由 MenuComponent 引用，不加 route
</div>

<!--
P4 一次用到 Angular CLI 的三種產生指令：ng g c（元件）、ng g s（Service）、ng g i（interface），正好複習 Ch21、Ch24、Ch30。
routes 有兩條：/menu 和 /checkout——這是課程第一次出現「一題兩頁」，可以讓同學感受 SPA 多頁面的架構：每個頁面一個 component 一條 route，頁面之間靠 Router 導航、靠 Service 傳資料。
-->

---
layout: default
---

# P4：完整解答 — interface 檔（order.ts）

```typescript
// src/app/order.ts（ng g i order 產生後填入）
export interface MenuItem {
  id: number; name: string; price: number;
  category: '麵食' | '湯品' | '小菜' | '飲料';
  emoji: string;
}
export interface OrderItem {
  item: MenuItem;
  qty: number;
}
```

<!--
order.ts 用 export 讓四個檔案都能 import 這兩個型別（Ch30）。
-->

---
layout: default
---

# P4：完整解答 — OrderService

```typescript
// src/app/order.service.ts（ng g s order 產生）
import { Injectable } from '@angular/core';
import { OrderItem } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order: OrderItem[] = [];
  total: number = 0;
}
```

<!--
OrderService 只有兩個屬性、零方法——它的唯一職責是「跨頁面搬運資料」（Ch24）：providedIn: 'root' 讓全專案共用同一個實例，菜單頁結帳時把訂單塞進來，路由切到結帳頁後從同一個實例讀出去。Service 不需要方法時就不要硬寫方法，保持簡單。
-->

---
layout: default
---

# P4：完整解答 — MenuComponent（1/5）

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, OrderItem } from '../order';
import { OrderService } from '../order.service';
import { OrderPanelComponent } from '../order-panel/order-panel.component';

const menu: MenuItem[] = [
  { id: 1, name: '招牌牛肉麵', price: 180, category: '麵食', emoji: '🍜' },
  { id: 2, name: '雞肉米線',   price: 150, category: '麵食', emoji: '🍝' },
  { id: 3, name: '酸辣湯',     price: 60,  category: '湯品', emoji: '🍲' },
  { id: 4, name: '紅燒蹄膀',   price: 120, category: '小菜', emoji: '🍖' },
  { id: 5, name: '珍珠奶茶',   price: 55,  category: '飲料', emoji: '🧋' },
];
```

<!--
menu 常數放在 class 外面，跟 P2 的 products 同一個模式——菜單資料不變，不需要當成 class 狀態。
-->

---
layout: default
---

# P4：完整解答 — MenuComponent（2/5）

```typescript
@Component({
  selector: 'app-menu',
  imports: [OrderPanelComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  private orderService = inject(OrderService);
  private router = inject(Router);

  categories = ['麵食', '湯品', '小菜', '飲料'];
  menu = menu;
  order: OrderItem[] = [];
  activeCategory: string = '麵食';

  ngOnInit(): void {
    const saved = sessionStorage.getItem('order');
    if (saved !== null) {
      this.order = JSON.parse(saved);
    }
  }
```

<!--
這一版的 MenuComponent 開頭資訊量大，逐一對照：imports 陣列引入子元件（HTML 才能用 <app-order-panel>）；OrderService 和 Router 用 inject() 注入（Ch24 說的現代寫法，跟 P3 的 constructor 注入對照，兩種都要看得懂）；ngOnInit 從 sessionStorage 讀回上次的訂單（FR-5、Ch25），跟 P2 的 localStorage 一模一樣的 API，只差在儲存空間的生命週期。
-->

---
layout: default
---

# P4：完整解答 — MenuComponent（3/5）

```typescript
  setCategory(cat: string): void {
    this.activeCategory = cat;
  }
  getMenu() {
    return this.menu.filter(m => m.category === this.activeCategory);
  }
  addItem(item: MenuItem): void {
    const existing = this.order.filter(o => o.item.id === item.id);
    if (existing.length > 0) {
      existing[0].qty++;
    } else {
      this.order.push({ item, qty: 1 });
    }
    this.saveOrder();
  }
```

<!--
addItem 維持「找到就修改、找不到就新增」，最後多呼叫 this.saveOrder() 同步存檔。
-->

---
layout: default
---

# P4：完整解答 — MenuComponent（4/5）

```typescript
  removeItem(id: number): void {
    this.order.forEach(o => {
      if (o.item.id === id) { o.qty--; }
    });
    this.order = this.order.filter(o => o.qty > 0);
    this.saveOrder();
  }
  saveOrder(): void {
    sessionStorage.setItem('order', JSON.stringify(this.order));
  }
```

<!--
removeItem 維持兩段式刪除：forEach 把目標 qty--，再 filter 掉 qty 為 0 的項目並重新賦值回 this.order——filter 回傳新陣列，必須存回去 Angular 才偵測得到變更。
兩個方法收尾都呼叫 saveOrder()，跟 P2 的 saveCart 同一個模式：「任何改動狀態的方法，最後一步同步存檔」。sessionStorage 的 setItem/JSON.stringify 用法跟 localStorage 完全相同（Ch25）。
-->

---
layout: default
---

# P4：完整解答 — MenuComponent（5/5）

```typescript
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
  goCheckout(): void {
    this.orderService.order = this.order;
    this.orderService.total = this.getTotal();
    this.router.navigate(['/checkout']);
  }
}
```

<!--
goCheckout 對應 FR-6，是 Ch23+Ch24 的組合：先把訂單和總計塞進 OrderService 的屬性（Service 是全域單例，路由切換後資料還在），再用 this.router.navigate(['/checkout']) 程式導航——注意參數是陣列。
可以問同學：如果不經過 Service、直接導航，結帳頁要怎麼拿到訂單？答案是拿不到——路由頁面之間沒有父子關係，@Input 派不上用場，這就是 Service 存在的理由。
-->

---
layout: default
---

# P4：完整解答 — HTML（1/2）menu.component

```html
<div class="header">
  <span class="brand">🍜 山水麵館</span>
  <span class="cart-info">📋 餐點
    <span class="badge-num">{{ getOrderCount() }}</span>
  </span>
</div>
<div class="category-nav">
  @for (cat of categories; track cat) {
    <button class="cat-btn"
      [class.active]="cat === activeCategory"
      (click)="setCategory(cat)">{{ cat }}</button>
  }
</div>
```

<!--
header 的 HTML 比 P2 的 navbar 簡單：只有左側 .brand 和右側 .cart-info（含 badge）。分類按鈕和 P2 完全相同寫法：`@for` 產生、[class.active] 切換樣式、(click) 呼叫方法。
-->

---
layout: default
---

# P4：完整解答 — HTML（2/2）menu.component

```html
<div class="main-layout">
  <div class="menu-area">
    <div class="menu-grid">
      @for (item of getMenu(); track item.id) {
        <div class="menu-card">
          <div class="item-emoji">{{ item.emoji }}</div>
          <div class="item-name">{{ item.name }}</div>
          <div class="item-price">NT${{ item.price }}</div>
          <button class="add-btn" (click)="addItem(item)">加入</button>
        </div>
      }
    </div>
  </div>
  <app-order-panel
    [order]="order"
    (remove)="removeItem($event)"
    (checkout)="goCheckout()" />
</div>
```

<!--
菜單格的 `@for` 迭代 getMenu() 的回傳值，每次 activeCategory 改變就重新篩選並渲染——和 P2 的 filterProducts() 相同機制。
右欄整個換成 <app-order-panel>：`[order]="order"` 把訂單陣列用 @Input 傳進去；`(remove)="removeItem($event)"` 的 $event 是子元件 emit 出來的餐點 id；`(checkout)="goCheckout()"` 收到結帳事件就走導航流程。父元件持有狀態和邏輯，子元件負責顯示和發事件——跟 P2 的 product-card 同一套模式，這次事件有兩個。
-->

---
layout: default
---

# P4：完整解答 — OrderPanelComponent

```typescript
// order-panel.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderItem } from '../order';

@Component({
  selector: 'app-order-panel',
  templateUrl: './order-panel.component.html',
  styleUrl: './order-panel.component.css'
})
export class OrderPanelComponent {
  @Input() order: OrderItem[] = [];
  @Output() remove = new EventEmitter<number>();
  @Output() checkout = new EventEmitter<void>();

  getTotal(): number {
    let total = 0;
    for (let o of this.order) { total += o.item.price * o.qty; }
    return total;
  }
}
```

<!--
子元件的三根天線：@Input order 收訂單陣列（給預設空陣列，父元件還沒傳時不會壞）；@Output remove 是 EventEmitter<number>，emit 出要移除的餐點 id；@Output checkout 是 EventEmitter<void>——不用帶資料的事件就用 void，「使用者按了結帳」這個訊號本身就是全部資訊。
getTotal 在子元件也有一份：面板要自己顯示總計，用自己收到的 order 算，不依賴父元件——子元件對外只依賴 @Input/@Output 這組介面。
-->

---
layout: default
---

# P4：完整解答 — OrderPanel HTML

```html
<!-- order-panel.component.html -->
<div class="order-panel">
  <div class="order-title">📋 訂單明細</div>
  @if (order.length === 0) {
    <p class="empty-hint">尚未點餐，快選幾道菜吧！</p>
  } @else {
    @for (o of order; track o.item.id) {
      <div class="order-item">
        <span>{{ o.item.name }} x{{ o.qty }}</span>
        <span>NT${{ o.item.price * o.qty }}</span>
        <button (click)="remove.emit(o.item.id)">－</button>
      </div>
    }
    <div class="order-total">總計：NT${{ getTotal() }}</div>
  }
  <button class="checkout-btn"
    [disabled]="order.length === 0"
    (click)="checkout.emit()">結帳</button>
</div>
```

<!--
`@if (order.length === 0)` 對應 FR-4（Ch27）：空訂單顯示提示文字，有訂單才渲染明細和總計，兩個分支只會有一個出現在 DOM。
移除按鈕的 `(click)="remove.emit(o.item.id)"` 只 emit id——傳最少必要的資料。結帳按鈕的 `[disabled]="order.length === 0"`（Ch22）跟 @if 用同一個條件：空訂單時按鈕反灰不可點，CSS 的 :disabled 樣式同時生效。
可以問同學：為什麼結帳按鈕放在 @if 外面？——因為不管有沒有訂單按鈕都要顯示（只是能不能按的差別），而明細是「有才顯示」，兩種需求用不同工具。
-->

---
layout: default
---

# P4：完整解答 — CheckoutComponent TS

```typescript
// checkout.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  orderService = inject(OrderService);
}
```

<!--
結帳頁是「只讀」頁面：inject OrderService 後直接在 template 讀 orderService.order 和 orderService.total——菜單頁塞進去的資料，因為 Service 是全域單例，導航過來還在（Ch24）。
注意 orderService 這次不加 private——template 要直接存取它，private 成員在 template 用會報錯。imports 要加 RouterLink，因為 HTML 用到 routerLink 導航。
-->

---
layout: default
---

# P4：完整解答 — CheckoutComponent HTML

```html
<!-- checkout.component.html -->
<div class="checkout-page">
  <h2>📋 訂單確認</h2>
  @if (orderService.order.length === 0) {
    <p>沒有訂單資料，請先回菜單點餐。</p>
  } @else {
    @for (o of orderService.order; track o.item.id) {
      <div class="checkout-item">
        <span>{{ o.item.emoji }} {{ o.item.name }} x{{ o.qty }}</span>
        <span>NT${{ o.item.price * o.qty }}</span>
      </div>
    }
    <div class="checkout-total">總計：NT${{ orderService.total }}</div>
  }
  <a routerLink="/menu" class="back-link">← 返回菜單</a>
</div>
```

<!--
`@if` 處理「直接輸入網址進來、沒有訂單」的情況，這是實務必做的防呆。返回用 routerLink（HTML 導航，Ch23），跟 goCheckout 的 router.navigate（TS 導航）對照：不需要邏輯的連結用 routerLink 就好。
-->

---
layout: default
---

# P4：完整解答 — CSS（1/4）

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

# P4：完整解答 — CSS（2/4）

```css
.main-layout {
  display: flex; gap: 24px;
  padding: 24px 32px; align-items: flex-start;
  background: #f8fffe;
}
.menu-area { flex: 1; }
.main-layout app-order-panel { width: 280px; flex-shrink: 0; }
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
.main-layout 用 display: flex + align-items: flex-start 確保右側訂單欄不被拉伸到和左側等高。
寬度規則 `app-order-panel { width: 280px; flex-shrink: 0 }` 下在子元件標籤上（UI-7）——訂單欄抽成子元件後，.main-layout 的直接子元素是這個標籤，跟 P2 的 app-product-card 同一個道理。
.menu-card 的 border: 2px solid transparent 佔位邊框技巧讓 hover 時卡片不會因為邊框出現而抖動——這是很多中高級前端工程師才知道的細節。
-->

---
layout: default
---

# P4：完整解答 — CSS（3/4）子元件樣式

```css
/* menu.component.css（續） */
.add-btn {
  width: 100%; padding: 6px; background: #1a5c5c;
  color: white; border: none; border-radius: 8px;
  cursor: pointer; transition: background 0.2s;
}
.add-btn:hover { background: #5eada0; }
```

```css
/* order-panel.component.css */
.order-panel {
  background: white; border-radius: 12px; padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
.order-title { font-weight: 700; color: #1a5c5c; margin-bottom: 12px; }
.order-item {
  display: flex; justify-content: space-between;
  padding: 6px 0; color: #555;
}
.order-total { font-weight: 700; color: #1a5c5c; padding: 8px 0; border-top: 1px solid #e2e8f0; }
.empty-hint { color: #999; text-align: center; padding: 16px 0; }
```

<!--
面板內部的樣式（白底、圓角、陰影、明細列）全部搬進 order-panel.component.css——跟 P2 的分工一致：父元件管「欄位怎麼排」，子元件管「面板長怎樣」。原本寫在 .order-panel 上的 width: 280px 和 flex-shrink: 0 移到父元件的 app-order-panel 選擇器上了。
.empty-hint 對應 UI-11，是 @if 空狀態的提示文字樣式。
-->

---
layout: default
---

# P4：完整解答 — CSS（4/4）結帳鈕與結帳頁

```css
/* order-panel.component.css（續） */
.checkout-btn {
  width: 100%; padding: 10px; background: #1a5c5c;
  color: white; border: none; border-radius: 8px;
  cursor: pointer; transition: background 0.2s, color 0.2s;
}
.checkout-btn:hover { background: white; color: #1a5c5c; border: 2px solid #1a5c5c; }
.checkout-btn:disabled { opacity: 0.4; cursor: not-allowed; }
```

```css
/* checkout.component.css */
.checkout-page { max-width: 480px; margin: 40px auto; padding: 24px;
  background: white; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
.checkout-item { display: flex; justify-content: space-between; padding: 8px 0; color: #555; }
.checkout-total { font-weight: 700; color: #1a5c5c; padding: 12px 0; border-top: 2px solid #1a5c5c; }
.back-link { color: #5eada0; text-decoration: none; display: inline-block; margin-top: 16px; }
```

<!--
.checkout-btn:hover 做顏色反轉是業界常見的「ghost button」設計；:disabled 對應 UI-12——注意 disabled 狀態下瀏覽器不會觸發 hover 樣式的視覺誤導問題不大，但嚴謹一點可以寫 .checkout-btn:hover:not(:disabled) 只在可點時反轉。
結帳頁用 max-width + margin: auto 置中成一張收據卡片，總計上方用 2px 深綠粗線跟明細分隔，模擬收據的視覺語言。
-->

---
layout: end
---

# 四張規格書全數交付！

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; text-align: left;">
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem; color: #1a5c5c;">
    <strong>📄 P1 個人履歷</strong><br>
    雙欄排版・@switch 技能標籤・@if 在職狀態・巢狀 @for・sort() 排序
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem; color: #1a5c5c;">
    <strong>🛍️ P2 電商展示頁</strong><br>
    商品卡子元件 @Input/@Output・價格排序・localStorage・[disabled]
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem; color: #1a5c5c;">
    <strong>📊 P3 學習儀表板</strong><br>
    HttpClient API・ngOnInit・日期排序・@switch 狀態 badge
  </div>
  <div style="background: #f0faf9; border-radius: 12px; padding: 1rem; color: #1a5c5c;">
    <strong>🍜 P4 餐廳點餐頁</strong><br>
    訂單子元件・Service 跨頁傳遞・Router 導航・sessionStorage
  </div>
</div>

<!--
恭喜同學完成四大實作！這一輪做完，Ch18 到 Ch31 的技術（Date、生命週期、元件通訊、Service、路由、Web Storage、@if/@for/@switch、HttpClient、Interface、排序）全部實際操作過至少一次。
建議同學完成後試著加碼：P1 增加「學歷」區塊、P2 把排序狀態也存進 localStorage、P3 幫統計卡加上「未開始」第五張卡、P4 在結帳頁加「確認送出」把訂單 POST 到 API（銜接之後的課程）——把規格書再往下寫一節，才能真正把技術內化成自己的能力。
-->
