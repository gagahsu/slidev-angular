# 課程 Sample Code 目錄

每個章節的示範程式碼，附有詳細的繁體中文註解，適合初學者對照投影片學習。

## 章節列表

| 資料夾 | 章節主題 | 內容類型 |
|--------|---------|---------|
| [`ch01/`](./ch01/) | 前端介紹 | HTML / CSS / JS |
| [`ch02/`](./ch02/) | Coding 習慣 | TypeScript |
| [`ch03/`](./ch03/) | Angular 介紹 | Markdown / Shell |
| [`ch04/`](./ch04/) | 終端機指令 | Markdown / Shell |
| [`ch05/`](./ch05/) | Angular 安裝與專案建立 | Markdown |
| [`ch06/`](./ch06/) | Angular 降版 | Markdown |
| [`ch07/`](./ch07/) | VS Code 安裝 | Markdown |
| [`ch08/`](./ch08/) | HTML 標籤 | HTML |
| [`ch09/`](./ch09/) | CSS 基礎語法 | HTML / CSS |
| [`ch10/`](./ch10/) | CSS 進階樣式（Flexbox / hover） | HTML / CSS |
| [`ch11/`](./ch11/) | CSS 進階工具（position / z-index） | HTML / CSS |
| [`ch12/`](./ch12/) | JavaScript / TypeScript 介紹 | JS / TS |
| [`ch13/`](./ch13/) | TypeScript 數據類型 | TypeScript |
| [`ch14/`](./ch14/) | 變數使用（全域 / 區域 / 資料綁定） | TS + Angular |
| [`ch15/`](./ch15/) | 方法（Functions / Methods） | TS + Angular |
| [`ch16/`](./ch16/) | TypeScript 練習一（if / 迴圈 / 陣列） | TypeScript |
| [`ch17/`](./ch17/) | 資料設計與呈現（@for / 資料結構） | TS + Angular |
| [`ch18/`](./ch18/) | 生命週期（ngOnInit / ngOnDestroy） | Angular |
| [`ch19/`](./ch19/) | 新增組件（ng generate / 元件拆解） | Angular |
| [`ch20/`](./ch20/) | 繫結（插值 / 屬性 / 事件 / 雙向） | Angular |
| [`ch21/`](./ch21/) | 路由（routerLink / 動態路由） | Angular |
| [`ch22/`](./ch22/) | 資料傳遞（@Input / @Output） | Angular |
| [`ch23/`](./ch23/) | 網頁儲存（Cookie / localStorage / sessionStorage） | TS + Angular |
| [`ch24/`](./ch24/) | 陣列顯示（@for / 巢狀陣列） | TS + Angular |
| [`ch25/`](./ch25/) | @if 條件顯示（@else / @else if） | TS + Angular |
| [`ch26/`](./ch26/) | @switch 條件切換（switch / @switch） | TS + Angular |
| [`ch27/`](./ch27/) | 串接 API（HttpClient / GET / POST） | TS + Angular |
| [`ch28/`](./ch28/) | 串接 OpenAI（Chat Completions API） | TS + Angular |
| [`ch29/`](./ch29/) | Interface（型別定義 / 巢狀 / implements） | TypeScript |
| [`ch30/`](./ch30/) | 資料排序（sort / 比較函式） | TS + Angular |
| [`ch31/`](./ch31/) | 安裝 Angular Material | Markdown |
| [`ch32/`](./ch32/) | Mat-table + 分頁（MatTableDataSource / Paginator） | Angular |
| [`ch33/`](./ch33/) | Mat-icon（Material Icons 圖示） | Angular |
| [`ch34/`](./ch34/) | 日期選擇器（input type="date" / mat-datepicker） | TS + Angular |
| [`ch35/`](./ch35/) | DatePipe（日期格式化） | TS + Angular |
| [`ch36/`](./ch36/) | JsonPipe（物件格式化顯示） | TS + Angular |
| [`ch37/`](./ch37/) | 即時搜尋（keyup / indexOf / dataSource 篩選） | TS + Angular |
| [`ch38/`](./ch38/) | ngClass（動態 CSS 類別） | TS + Angular |
| [`ch39/`](./ch39/) | Tabs（mat-tab-group / mat-tab-nav-bar） | Angular |
| [`ch40/`](./ch40/) | Select（原生 select / mat-select） | TS + Angular |
| [`ch41/`](./ch41/) | 圓餅圖（Chart.js pie / bar） | TS + Angular |
| [`ch42/`](./ch42/) | Dialog（MatDialog / MAT_DIALOG_DATA） | Angular |
| [`ch43/`](./ch43/) | 同步與非同步（setTimeout / Observable / subscribe） | TS + Angular |
| [`ch44/`](./ch44/) | 訂閱（BehaviorSubject / Subject / unsubscribe） | TS + Angular |
| [`ch45/`](./ch45/) | Loading（mat-spinner / LoadingService / async pipe） | TS + Angular |
| [`ch46/`](./ch46/) | Signals（signal() / effect() / asReadonly） | TS + Angular |
| [`ch47/`](./ch47/) | Sidenav（mat-drawer-container / over / push / side） | Angular |
| [`ch48/`](./ch48/) | Toolbar（mat-toolbar / spacer / matBadge） | Angular |
| [`ch49/`](./ch49/) | Mat-radio & Checkbox（單選 / 多選 / 全選） | TS + Angular |
| [`ch50/`](./ch50/) | Reactive Forms（FormBuilder / FormGroup / FormArray） | TS + Angular |
| [`ch51/`](./ch51/) | Validators（required / email / pattern / min / max） | TS + Angular |
| [`ch52/`](./ch52/) | RWD（@media query / 響應式單位 / BreakpointObserver） | TS + Angular |
| [`ch53/`](./ch53/) | RxJS（Observable / Operators / Subject / interval） | TS + Angular |
| [`ch54/`](./ch54/) | Angular Build（ng build / dist 結構 / http-server） | Markdown |
| [`ch55/`](./ch55/) | Angular Deploy（Firebase Hosting 部署指南） | Markdown |

---

## 如何使用

### HTML/CSS 檔案（ch01、ch08、ch09、ch10、ch11）
直接用瀏覽器打開 `index.html` 即可看到效果。

### TypeScript 檔案（ch02）
需要安裝 Node.js 後，在終端機輸入：
```bash
npx ts-node 1-naming.ts
```
或直接在 VS Code 裡閱讀程式碼，理解邏輯即可。

### Markdown 檔案（ch03、ch04、ch05、ch06、ch07）
用 VS Code 開啟後，按 `Ctrl + Shift + V` 預覽渲染後的效果。

---

## 檔案結構

```
code/
├── README.md           ← 你現在看的這個檔案
│
├── ch01/               ← 第01章：前端介紹
│   ├── index.html      （主頁面）
│   ├── style.css       （CSS 樣式）
│   └── main.js         （JavaScript 動作）
│
├── ch02/               ← 第02章：Coding 習慣
│   ├── 1-naming.ts     （命名方式）
│   ├── 2-file-structure.md （檔案放置）
│   ├── 3-formatting.ts （排版）
│   ├── 4-comments.ts   （註解）
│   └── 5-dry.ts        （DRY 原則）
│
├── ch03/               ← 第03章：Angular 介紹
│   ├── angular-concepts.md
│   └── npm-commands.sh
│
├── ch04/               ← 第04章：終端機
│   ├── commands-reference.md
│   └── practice.sh
│
├── ch05/               ← 第05章：Angular 安裝
│   ├── setup-guide.md
│   └── project-structure.md
│
├── ch06/               ← 第06章：Angular 降版
│   └── downgrade-guide.md
│
├── ch07/               ← 第07章：VS Code 安裝
│   └── vscode-extensions.md
│
├── ch08/               ← 第08章：HTML
│   ├── index.html      （所有標籤總覽）
│   ├── practice1.html  （練習1：大標題）
│   ├── practice2.html  （練習2：各種輸入元件）
│   ├── practice3.html  （練習3：標題+文字+圖片）
│   ├── practice4.html  （練習4：表格）
│   └── practice5.html  （練習5：個人名片）
│
├── ch09/               ← 第09章：CSS 基礎語法
│   ├── index.html
│   └── style.css
│
├── ch10/               ← 第10章：CSS 進階樣式
│   ├── index.html      （Flexbox + hover 示範）
│   └── style.css
│
├── ch11/               ← 第11章：CSS 進階工具
│   ├── index.html      （position / z-index / background）
│   └── style.css
│
├── ch12/               ← 第12章：JS / TS 介紹
│   ├── javascript-intro.js
│   └── typescript-vs-js.ts
│
├── ch13/               ← 第13章：TypeScript 數據類型
│   └── data-types.ts
│
├── ch14/               ← 第14章：變數使用
│   ├── variables.ts    （全域/區域變數、let/const/var）
│   ├── app.component.ts（Angular 元件變數）
│   └── app.component.html（插值 {{ }} 顯示資料）
│
├── ch15/               ← 第15章：方法
│   ├── methods.ts      （函式語法完整說明）
│   ├── app.component.ts（RPG 遊戲示範）
│   └── app.component.html
│
├── ch16/               ← 第16章：TypeScript 練習一
│   └── practice.ts     （if / 型別轉換 / JSON / 迴圈 / 陣列）
│
├── ch17/               ← 第17章：資料設計與呈現
│   ├── data-design.ts  （資料結構設計、日期、重組）
│   ├── app.component.ts（商品清單示範）
│   └── app.component.html（@for / @if 指令）
│
├── ch18/               ← 第18章：生命週期
│   ├── app.component.ts（ngOnInit / ngOnDestroy 示範）
│   └── app.component.html
│
├── ch19/               ← 第19章：新增組件
│   ├── generate-commands.sh（ng generate 指令）
│   ├── header/header.component.ts
│   ├── header/header.component.html
│   └── app.component.html（引用子元件）
│
├── ch20/               ← 第20章：繫結
│   ├── app.component.ts（四種綁定示範）
│   └── app.component.html（插值/屬性/事件/雙向）
│
├── ch21/               ← 第21章：路由
│   ├── app.routes.ts   （路由設定）
│   ├── app.component.html（router-outlet / routerLink）
│   ├── pages/home/home.component.ts
│   └── pages/course-detail/course-detail.component.ts（動態路由參數）
│
├── ch22/               ← 第22章：資料傳遞
│   ├── parent/parent.component.ts（父元件）
│   ├── parent/parent.component.html
│   ├── child/child.component.ts（@Input / @Output）
│   └── child/child.component.html
│
├── ch23/               ← 第23章：網頁儲存
│   ├── app.component.ts（localStorage / sessionStorage / 物件儲存）
│   └── app.component.html
│
├── ch24/               ← 第24章：陣列顯示
│   ├── app.component.ts（數字陣列 / 物件陣列 / 巢狀陣列）
│   └── app.component.html（@for 單層 + 巢狀）
│
├── ch25/               ← 第25章：@if 條件顯示
│   ├── app.component.ts（登入狀態 / 成績等級 / 購物車）
│   └── app.component.html（@if / @else / @else if）
│
├── ch26/               ← 第26章：@switch 條件切換
│   ├── app.component.ts（switch 示範 / 角色職業）
│   └── app.component.html（@switch / @case / @default）
│
├── ch27/               ← 第27章：串接 API
│   ├── app.config.ts         （provideHttpClient）
│   ├── http-client.service.ts（get / post / put / delete）
│   ├── app.component.ts      （inject Service + subscribe）
│   └── app.component.html
│
├── ch28/               ← 第28章：串接 OpenAI
│   ├── openai.service.ts     （Chat Completions API）
│   ├── app.component.ts      （對話歷史 / 送出訊息）
│   └── app.component.html    （聊天介面）
│
├── ch29/               ← 第29章：Interface
│   ├── user.interface.ts     （介面定義 / 選填欄位 / 巢狀）
│   ├── app.component.ts      （使用 interface 的元件）
│   └── app.component.html
│
├── ch30/               ← 第30章：資料排序
│   ├── app.component.ts      （sort() / 多欄位排序）
│   └── app.component.html    （按鈕切換排序方式）
│
├── ch31/               ← 第31章：安裝 Angular Material
│   └── setup-guide.md        （安裝步驟 / 常用 Module 對照表）
│
├── ch32/               ← 第32章：Mat-table + 分頁
│   ├── app.component.ts      （MatTableDataSource / @ViewChild Paginator）
│   └── app.component.html    （mat-table 欄位定義 / mat-paginator）
│
├── ch33/               ← 第33章：Mat-icon
│   ├── app.component.ts      （MatIconModule / 圖示清單）
│   └── app.component.html    （基本用法 / 搭配按鈕 / 動態切換）
│
├── ch34/               ← 第34章：日期選擇器
│   ├── app.component.ts      （原生 Date 字串 / mat-datepicker + Date 物件）
│   └── app.component.html    （input type="date" / mat-datepicker 完整結構）
│
├── ch35/               ← 第35章：DatePipe
│   ├── app.component.ts      （手動格式化方法 / tidyDate）
│   └── app.component.html    （DatePipe 各種格式代碼對照表）
│
├── ch36/               ← 第36章：JsonPipe
│   ├── app.component.ts      （user / order 物件資料）
│   └── app.component.html    （ json Pipe + pre 格式化顯示）
│
├── ch37/               ← 第37章：即時搜尋
│   ├── app.component.ts      （(keyup) 篩選 / indexOf / dataSource.data 更新）
│   └── app.component.html    （mat-table + mat-paginator + 搜尋框）
│
├── ch38/               ← 第38章：ngClass
│   ├── app.component.ts      （isActive / getStatusClass 方法）
│   ├── app.component.css     （active / highlighted / in-stock 等 class 定義）
│   └── app.component.html    （字串 / 物件條件 / 方法回傳三種用法）
│
├── ch39/               ← 第39章：Tabs
│   ├── app.component.ts      （staticTabs / links / activeLink）
│   └── app.component.html    （mat-tab-group / @for 動態頁籤 / mat-tab-nav-bar）
│
├── ch40/               ← 第40章：Select
│   ├── app.component.ts      （selectedCar / courseOptions / 表單送出）
│   └── app.component.html    （原生 select / matNativeControl / mat-select）
│
├── ch41/               ← 第41章：圓餅圖
│   ├── app.component.ts      （Chart.js pie + bar / ngAfterViewInit）
│   └── app.component.html    （canvas 元素 / 圖表類型說明表）
│
├── ch42/               ← 第42章：Dialog
│   ├── app.component.ts      （inject MatDialog / open / afterClosed）
│   ├── app.component.html    （打開按鈕 / 顯示回傳結果）
│   └── dialog/
│       ├── dialog.component.ts   （MAT_DIALOG_DATA / dialogRef.close）
│       └── dialog.component.html （mat-dialog-title/content/actions）
│
├── ch43/               ← 第43章：同步與非同步
│   ├── app.component.ts      （同步順序 / setTimeout / Observable subscribe）
│   └── app.component.html    （執行順序視覺化 / subscribe 三個 callback）
│
└── ch44/               ← 第44章：訂閱
    ├── loading.service.ts    （BehaviorSubject / Subject / asObservable）
    ├── app.component.ts      （subscribe / unsubscribe / ngOnDestroy）
    └── app.component.html    （狀態顯示 / 事件日誌 / 比較表）
│
├── ch45/               ← 第45章：Loading
│   ├── loading.service.ts    （BehaviorSubject / show / hide）
│   ├── app.component.ts      （loading$ Observable + async pipe）
│   ├── app.component.css     （overlay 遮罩 / mat-spinner 置中）
│   └── app.component.html    （@if (loading$ | async)）
│
├── ch46/               ← 第46章：Signals
│   ├── loading.service.ts    （signal() / asReadonly / set）
│   ├── app.component.ts      （Signal<boolean> / effect()）
│   ├── app.component.css     （overlay / spinner）
│   └── app.component.html    （loading() 直接讀取，無需 async pipe）
│
├── ch47/               ← 第47章：Sidenav
│   ├── app.component.ts      （MatSidenavModule / MatListModule）
│   ├── app.component.css     （sidenav 寬度 / container 高度）
│   └── app.component.html    （mat-drawer-container / drawer.toggle / mode 切換）
│
├── ch48/               ← 第48章：Toolbar
│   ├── app.component.ts      （MatToolbarModule / MatBadgeModule）
│   ├── app.component.css     （.spacer flex: 1 1 auto）
│   └── app.component.html    （mat-toolbar / spacer / matBadge 角標）
│
├── ch49/               ← 第49章：Mat-radio & Checkbox
│   ├── app.component.ts      （seasons / courses / 全選邏輯）
│   └── app.component.html    （mat-radio-group / mat-checkbox / indeterminate）
│
├── ch50/               ← 第50章：Reactive Forms
│   ├── app.component.ts      （FormBuilder / FormGroup / FormArray）
│   └── app.component.html    （formGroup / formArrayName / formGroupName）
│
├── ch51/               ← 第51章：Validators
│   ├── app.component.ts      （required / email / pattern / min / max）
│   └── app.component.html    （invalid && touched 顯示錯誤）
│
├── ch52/               ← 第52章：RWD
│   ├── app.component.ts      （BreakpointObserver / Breakpoints）
│   ├── app.component.css     （@media query / grid 響應式欄數）
│   └── app.component.html    （響應式格線 / 裝置偵測顯示）
│
├── ch53/               ← 第53章：RxJS
│   ├── app.component.ts      （Observable / of / from / interval / Subject）
│   └── app.component.html    （四個互動示範區塊）
│
├── ch54/               ← 第54章：Angular Build
│   └── build-guide.md        （ng build / dist 結構 / http-server / 最佳化）
│
└── ch55/               ← 第55章：Angular Deploy
    └── deploy-guide.md       （Firebase Hosting 完整部署步驟）
```
