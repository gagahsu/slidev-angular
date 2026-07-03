---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Angular 教材庫
routeAlias: home
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

<style>
.chapter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 960px;
  margin-top: 1.2rem;
}
.chapter-card {
  display: block;
  background: #f0faf9;
  border: 2px solid #5eada0;
  border-radius: 12px;
  padding: 1.2rem 0.8rem;
  text-decoration: none !important;
  color: #1a5c5c !important;
  transition: all 0.2s ease;
}
.chapter-card:hover {
  background: #5eada0;
  color: white !important;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(94, 173, 160, 0.35);
}
.chapter-card:hover .chapter-subtitle {
  color: rgba(255,255,255,0.85) !important;
}
.chapter-num {
  font-size: 1.6rem;
  font-weight: 900;
  margin-bottom: 0.3rem;
}
.chapter-subtitle {
  font-size: max(13px, 0.88rem);
  color: #4a7c7c;
  margin-top: 0.3rem;
}
</style>

<div class="flex flex-col items-center h-full" style="background: #ffffff; overflow-y: auto; padding: 1.5rem 0;">
  <p style="color: #5eada0; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1rem;">Angular Full-Stack Masterclass</p>
  <h1 style="color: #1a5c5c; font-size: 2.8rem; font-weight: 900; line-height: 1.2; margin-bottom: 0.5rem;">課程目錄</h1>
  <div style="height: 4px; width: 240px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 0.5rem;"></div>
  <p style="color: #9dc4c4; font-size: 0.9rem; margin-bottom: 0;">點擊章節卡片開始學習</p>
  <div class="chapter-grid">
    <Link to="ch01" class="chapter-card">
      <div class="chapter-num">Ch 1</div>
      <div>前端開發介紹</div>
      <div class="chapter-subtitle">Frontend Intro</div>
    </Link>
    <Link to="ch02" class="chapter-card">
      <div class="chapter-num">Ch 2</div>
      <div>Coding 習慣</div>
      <div class="chapter-subtitle">Best Practices</div>
    </Link>
    <Link to="ch03" class="chapter-card">
      <div class="chapter-num">Ch 3</div>
      <div>Angular 介紹</div>
      <div class="chapter-subtitle">Angular Essentials</div>
    </Link>
    <Link to="ch04" class="chapter-card">
      <div class="chapter-num">Ch 4</div>
      <div>終端機指令</div>
      <div class="chapter-subtitle">Terminal / CMD</div>
    </Link>
    <Link to="ch05" class="chapter-card">
      <div class="chapter-num">Ch 5</div>
      <div>安裝 Angular</div>
      <div class="chapter-subtitle">Setup & New Project</div>
    </Link>
    <Link to="ch06" class="chapter-card">
      <div class="chapter-num">Ch 6</div>
      <div>Angular 降版</div>
      <div class="chapter-subtitle">Version Downgrade</div>
    </Link>
    <Link to="ch07" class="chapter-card">
      <div class="chapter-num">Ch 7</div>
      <div>安裝 VS Code</div>
      <div class="chapter-subtitle">Install VS Code</div>
    </Link>
    <Link to="ch08" class="chapter-card">
      <div class="chapter-num">Ch 8</div>
      <div>開啟 Angular 專案</div>
      <div class="chapter-subtitle">Open Project & Components</div>
    </Link>
    <Link to="ch09" class="chapter-card">
      <div class="chapter-num">Ch 9</div>
      <div>HTML 基礎語法</div>
      <div class="chapter-subtitle">HTML Essentials</div>
    </Link>
    <Link to="ch10" class="chapter-card">
      <div class="chapter-num">Ch 10</div>
      <div>CSS 基礎語法</div>
      <div class="chapter-subtitle">CSS Essentials</div>
    </Link>
    <Link to="ch11" class="chapter-card">
      <div class="chapter-num">Ch 11</div>
      <div>CSS 樣式編輯</div>
      <div class="chapter-subtitle">Flex & Bootstrap</div>
    </Link>
    <Link to="ch12" class="chapter-card">
      <div class="chapter-num">Ch 12</div>
      <div>CSS 進階工具</div>
      <div class="chapter-subtitle">Background & Position</div>
    </Link>
    <Link to="ch13" class="chapter-card">
      <div class="chapter-num">Ch 13</div>
      <div>JavaScript 與 TypeScript 介紹</div>
      <div class="chapter-subtitle">JS & TypeScript</div>
    </Link>
    <Link to="ch14" class="chapter-card">
      <div class="chapter-num">Ch 14</div>
      <div>數據類型</div>
      <div class="chapter-subtitle">TypeScript Types</div>
    </Link>
    <Link to="ch15" class="chapter-card">
      <div class="chapter-num">Ch 15</div>
      <div>變數使用</div>
      <div class="chapter-subtitle">Variables & Binding</div>
    </Link>
    <Link to="ch16" class="chapter-card">
      <div class="chapter-num">Ch 16</div>
      <div>方法</div>
      <div class="chapter-subtitle">Methods & Functions</div>
    </Link>
    <Link to="ch17" class="chapter-card">
      <div class="chapter-num">Ch 17</div>
      <div>TypeScript 練習（一）</div>
      <div class="chapter-subtitle">Practice — Control & Arrays</div>
    </Link>
    <Link to="practice-supplement" class="chapter-card" style="border-color: #e07b39; background: #fff7f2;">
      <div class="chapter-num" style="color: #e07b39;">補充</div>
      <div>綜合實作補充教材</div>
    </Link>
    <Link to="ch18" class="chapter-card">
      <div class="chapter-num">Ch 18</div>
      <div>TypeScript 練習（二）</div>
      <div class="chapter-subtitle">Date, Restructure & Methods</div>
    </Link>
    <Link to="ch19" class="chapter-card">
      <div class="chapter-num">Ch 19</div>
      <div>資料轉換與呈現</div>
      <div class="chapter-subtitle">Data Design & Presentation</div>
    </Link>
    <Link to="ch20" class="chapter-card">
      <div class="chapter-num">Ch 20</div>
      <div>生命週期</div>
      <div class="chapter-subtitle">Component Lifecycle</div>
    </Link>
    <Link to="ch21" class="chapter-card">
      <div class="chapter-num">Ch 21</div>
      <div>新增組件</div>
      <div class="chapter-subtitle">Components</div>
    </Link>
    <Link to="ch22" class="chapter-card">
      <div class="chapter-num">Ch 22</div>
      <div>繫結</div>
      <div class="chapter-subtitle">Data Binding</div>
    </Link>
    <Link to="ch23" class="chapter-card">
      <div class="chapter-num">Ch 23</div>
      <div>路由</div>
      <div class="chapter-subtitle">Angular Routing</div>
    </Link>
    <Link to="ch24" class="chapter-card">
      <div class="chapter-num">Ch 24</div>
      <div>資料傳遞</div>
      <div class="chapter-subtitle">Data Passing</div>
    </Link>
    <Link to="ch25" class="chapter-card">
      <div class="chapter-num">Ch 25</div>
      <div>網頁儲存</div>
      <div class="chapter-subtitle">Web Storage</div>
    </Link>
    <Link to="ch26" class="chapter-card">
      <div class="chapter-num">Ch 26</div>
      <div>陣列顯示</div>
      <div class="chapter-subtitle">Array Display</div>
    </Link>
    <Link to="ch27" class="chapter-card">
      <div class="chapter-num">Ch 27</div>
      <div>@if 條件顯示</div>
      <div class="chapter-subtitle">Conditional Rendering</div>
    </Link>
    <Link to="ch28" class="chapter-card">
      <div class="chapter-num">Ch 28</div>
      <div>@switch 條件切換</div>
      <div class="chapter-subtitle">Switch Case</div>
    </Link>
    <Link to="ch29" class="chapter-card">
      <div class="chapter-num">Ch 29</div>
      <div>串接 API</div>
      <div class="chapter-subtitle">HTTP & API</div>
    </Link>
    <Link to="ch30" class="chapter-card">
      <div class="chapter-num">Ch 30</div>
      <div>Interface</div>
      <div class="chapter-subtitle">TypeScript Interface</div>
    </Link>
    <Link to="ch31" class="chapter-card">
      <div class="chapter-num">Ch 31</div>
      <div>資料排序</div>
      <div class="chapter-subtitle">Data Sorting</div>
    </Link>
    <Link to="practice-ch31" class="chapter-card" style="border-color: #e07b39; background: #fff7f2;">
      <div class="chapter-num" style="color: #e07b39;">綜合</div>
      <div>綜合練習 Ch1–31</div>
      <div class="chapter-subtitle" style="color: #b05a20;">四張業界規格書實作</div>
    </Link>
    <Link to="ch32" class="chapter-card">
      <div class="chapter-num">Ch 32</div>
      <div>安裝 Angular Material</div>
      <div class="chapter-subtitle">Angular Material Setup</div>
    </Link>
    <Link to="ch33" class="chapter-card">
      <div class="chapter-num">Ch 33</div>
      <div>Mat-table</div>
      <div class="chapter-subtitle">Material Table</div>
    </Link>
    <Link to="ch34" class="chapter-card">
      <div class="chapter-num">Ch 34</div>
      <div>Mat-icon</div>
      <div class="chapter-subtitle">Material Icons</div>
    </Link>
    <Link to="ch35" class="chapter-card">
      <div class="chapter-num">Ch 35</div>
      <div>日期選擇器</div>
      <div class="chapter-subtitle">Date Picker</div>
    </Link>
    <Link to="ch36" class="chapter-card">
      <div class="chapter-num">Ch 36</div>
      <div>DatePipe</div>
      <div class="chapter-subtitle">Date Formatting</div>
    </Link>
    <Link to="ch37" class="chapter-card">
      <div class="chapter-num">Ch 37</div>
      <div>JsonPipe</div>
      <div class="chapter-subtitle">JSON Display in HTML</div>
    </Link>
    <Link to="ch38" class="chapter-card">
      <div class="chapter-num">Ch 38</div>
      <div>即時搜尋</div>
      <div class="chapter-subtitle">Live Search</div>
    </Link>
    <Link to="ch39" class="chapter-card">
      <div class="chapter-num">Ch 39</div>
      <div>ngClass</div>
      <div class="chapter-subtitle">Dynamic CSS Binding</div>
    </Link>
    <Link to="ch40" class="chapter-card">
      <div class="chapter-num">Ch 40</div>
      <div>Tabs</div>
      <div class="chapter-subtitle">Angular Material Tabs</div>
    </Link>
    <Link to="ch41" class="chapter-card">
      <div class="chapter-num">Ch 41</div>
      <div>Select</div>
      <div class="chapter-subtitle">Mat-select</div>
    </Link>
    <Link to="ch42" class="chapter-card">
      <div class="chapter-num">Ch 42</div>
      <div>圓餅圖</div>
      <div class="chapter-subtitle">Pie Chart / Chart.js</div>
    </Link>
    <Link to="ch43" class="chapter-card">
      <div class="chapter-num">Ch 43</div>
      <div>Dialog</div>
      <div class="chapter-subtitle">MatDialog</div>
    </Link>
    <Link to="ch44" class="chapter-card">
      <div class="chapter-num">Ch 44</div>
      <div>同步與非同步</div>
      <div class="chapter-subtitle">Sync &amp; Async</div>
    </Link>
    <Link to="ch45" class="chapter-card">
      <div class="chapter-num">Ch 45</div>
      <div>訂閱</div>
      <div class="chapter-subtitle">RxJS Subscription</div>
    </Link>
    <Link to="ch46" class="chapter-card">
      <div class="chapter-num">Ch 46</div>
      <div>Loading</div>
      <div class="chapter-subtitle">Loading Spinner</div>
    </Link>
    <Link to="ch47" class="chapter-card">
      <div class="chapter-num">Ch 47</div>
      <div>Signals</div>
      <div class="chapter-subtitle">Angular Signals</div>
    </Link>
    <Link to="ch48" class="chapter-card">
      <div class="chapter-num">Ch 48</div>
      <div>Sidenav</div>
      <div class="chapter-subtitle">Mat-sidenav</div>
    </Link>
    <Link to="ch49" class="chapter-card">
      <div class="chapter-num">Ch 49</div>
      <div>Toolbar</div>
      <div class="chapter-subtitle">Mat-toolbar</div>
    </Link>
    <Link to="ch50" class="chapter-card">
      <div class="chapter-num">Ch 50</div>
      <div>Radio &amp; Checkbox</div>
      <div class="chapter-subtitle">Mat-radio / Checkbox</div>
    </Link>
    <Link to="ch51" class="chapter-card">
      <div class="chapter-num">Ch 51</div>
      <div>Reactive Forms</div>
      <div class="chapter-subtitle">Dynamic Form Control</div>
    </Link>
    <Link to="ch52" class="chapter-card">
      <div class="chapter-num">Ch 52</div>
      <div>Validators</div>
      <div class="chapter-subtitle">Form Validation</div>
    </Link>
    <Link to="ch53" class="chapter-card">
      <div class="chapter-num">Ch 53</div>
      <div>RWD</div>
      <div class="chapter-subtitle">Responsive Web Design</div>
    </Link>
    <Link to="ch54" class="chapter-card">
      <div class="chapter-num">Ch 54</div>
      <div>RXJS</div>
      <div class="chapter-subtitle">Reactive Extensions</div>
    </Link>
    <Link to="ch55" class="chapter-card">
      <div class="chapter-num">Ch 55</div>
      <div>Angular 包板</div>
      <div class="chapter-subtitle">ng build</div>
    </Link>
    <Link to="ch56" class="chapter-card">
      <div class="chapter-num">Ch 56</div>
      <div>Angular 部署</div>
      <div class="chapter-subtitle">Firebase Hosting</div>
    </Link>
    <!-- 更多章節將在此處新增 -->
  </div>
</div>

---
src: ./01-frontend-intro.md
---

---
src: ./02-coding-habits.md
---

---
src: ./03-angular-intro.md
---

---
src: ./04-terminal.md
---

---
src: ./05-angular-setup.md
---

---
src: ./06-angular-downgrade.md
---

---
src: ./07-vscode-install.md
---

---
src: ./08-angular-project-open.md
---

---
src: ./09-html.md
---

---
src: ./10-css-basics.md
---

---
src: ./11-css-advanced.md
---

---
src: ./12-css-tools.md
---

---
src: ./13-javascript-intro.md
---

---
src: ./14-typescript-types.md
---

---
src: ./15-variables.md
---

---
src: ./16-methods.md
---

---
src: ./17-typescript-practice-1.md
---

---
src: ./practice-ch1-ch17-supplement.md
---

---
src: ./18-typescript-practice-2.md
---

---
src: ./19-pipes.md
---

---
src: ./20-lifecycle.md
---

---
src: ./21-components.md
---

---
src: ./22-binding.md
---

---
src: ./23-routing.md
---

---
src: ./24-data-passing.md
---

---
src: ./25-web-storage.md
---

---
src: ./26-array-display.md
---

---
src: ./27-if.md
---

---
src: ./28-switch-case.md
---

---
src: ./29-api.md
---

---
src: ./30-interface.md
---

---
src: ./31-sorting.md
---

---
src: ./practice-ch1-ch17.md
---

---
src: ./32-angular-material.md
---

---
src: ./33-mat-table.md
---

---
src: ./34-mat-icon.md
---

---
src: ./35-date-picker.md
---

---
src: ./36-date-pipe.md
---

---
src: ./37-json-pipe.md
---

---
src: ./38-live-search.md
---

---
src: ./39-ng-class.md
---

---
src: ./40-tabs.md
---

---
src: ./41-select.md
---

---
src: ./42-pie-chart.md
---

---
src: ./43-dialog.md
---

---
src: ./44-async.md
---

---
src: ./45-subscription.md
---

---
src: ./46-loading.md
---

---
src: ./47-signals.md
---

---
src: ./48-sidenav.md
---

---
src: ./49-toolbar.md
---

---
src: ./50-mat-radio-checkbox.md
---

---
src: ./51-reactive-forms.md
---

---
src: ./52-validators.md
---

---
src: ./53-rwd.md
---

---
src: ./54-rxjs.md
---

---
src: ./55-angular-build.md
---

---
src: ./56-angular-deploy.md
---
