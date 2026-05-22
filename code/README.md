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
| [`ch07/`](./ch07/) | HTML 標籤 | HTML |
| [`ch08/`](./ch08/) | VS Code 安裝 | Markdown |
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

---

## 如何使用

### HTML/CSS 檔案（ch01、ch07、ch09、ch10、ch11）
直接用瀏覽器打開 `index.html` 即可看到效果。

### TypeScript 檔案（ch02）
需要安裝 Node.js 後，在終端機輸入：
```bash
npx ts-node 1-naming.ts
```
或直接在 VS Code 裡閱讀程式碼，理解邏輯即可。

### Markdown 檔案（ch03、ch04、ch05、ch06、ch08）
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
├── ch07/               ← 第07章：HTML
│   ├── index.html      （所有標籤總覽）
│   ├── practice1.html  （練習1：大標題）
│   ├── practice2.html  （練習2：各種輸入元件）
│   ├── practice3.html  （練習3：標題+文字+圖片）
│   ├── practice4.html  （練習4：表格）
│   └── practice5.html  （練習5：個人名片）
│
├── ch08/               ← 第08章：VS Code 安裝
│   └── vscode-extensions.md
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
└── ch22/               ← 第22章：資料傳遞
    ├── parent/parent.component.ts（父元件）
    ├── parent/parent.component.html
    ├── child/child.component.ts（@Input / @Output）
    └── child/child.component.html
```
