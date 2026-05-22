# 第05章：Angular 專案結構說明

用 `ng new` 建立專案後，Angular 會自動生成以下的資料夾結構。
初學者只需要關注 `src/app/` 這個資料夾！

```
my-first-app/
│
├── src/                          ← 你平常開發的程式碼都在這裡
│   │
│   ├── app/                      ← Angular 應用程式的核心
│   │   ├── app.component.ts      ← 根元件的邏輯（TypeScript）
│   │   ├── app.component.html    ← 根元件的畫面（HTML）
│   │   ├── app.component.css     ← 根元件的樣式（CSS）
│   │   ├── app.component.spec.ts ← 根元件的測試檔案（先不用管）
│   │   └── app.config.ts         ← 應用程式設定
│   │
│   ├── assets/                   ← 放圖片、字型等靜態資源
│   │   └── .gitkeep
│   │
│   ├── index.html                ← 網頁入口點（整個 Angular 應用的外殼）
│   ├── main.ts                   ← 應用程式啟動點（不需要修改）
│   └── styles.css                ← 全域 CSS（對整個應用生效）
│
├── angular.json                  ← Angular 設定檔（不需要手動修改）
├── package.json                  ← 記錄專案用到哪些套件
├── tsconfig.json                 ← TypeScript 設定
└── node_modules/                 ← 所有安裝的套件（自動產生，不要動）
```

---

## 最重要的三個檔案

### 1. `app.component.ts`（邏輯）

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',          // HTML 裡使用這個元件的標籤名稱
  templateUrl: './app.component.html',  // 對應的 HTML 模板
  styleUrls: ['./app.component.css']    // 對應的 CSS 樣式
})
export class AppComponent {
  title = 'my-first-app';        // 元件的資料（變數）
}
```

### 2. `app.component.html`（畫面）

```html
<!-- Angular 用 {{ }} 雙花括號來顯示元件裡的變數 -->
<h1>{{ title }}</h1>
<p>歡迎來到我的 Angular 應用！</p>
```

### 3. `app.component.css`（樣式）

```css
h1 {
  color: #1a5c5c;
  text-align: center;
}
```

---

## 開啟瀏覽器確認

執行 `ng serve` 後，打開 `http://localhost:4200`

你應該會看到「Hello, my-first-app」的頁面，代表安裝成功！
