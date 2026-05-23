# 第31章：安裝 Angular Material

Angular Material 是 Google 官方的 UI 元件庫，提供按鈕、表格、對話框等現成元件，
讓你不用從頭刻 CSS，就能做出符合 Material Design 規範的精美介面。

---

## 安裝指令

在 Angular 專案根目錄執行：

```bash
ng add @angular/material
```

---

## 安裝過程會問三個問題

### 1. 選擇主題（Theme）

```
? Choose a prebuilt theme name, or "custom" for a custom theme:
  ❯ Azure/Blue        # 藍色系（預設）
    Rose/Red          # 紅色系
    Magenta/Violet    # 紫色系
    Cyan/Orange       # 青色+橘色系
    Purple/Green      # 紫+綠色系
    Custom            # 自訂主題
```

選擇後，主題樣式會自動加入 `angular.json` 的 styles 陣列。

### 2. 全域排版（Global Typography）

```
? Set up global Angular Material typography styles? (y/N) N
```

通常選 **N**，避免覆蓋掉你自己的 CSS 樣式。

### 3. 動畫（Animations）

```
? Include the Angular animations module? (Y/n) Y
```

選 **Y**，讓 Material 元件有動態效果（展開、滑入等）。

---

## 安裝後自動修改的檔案

| 檔案 | 修改內容 |
|------|---------|
| `package.json` | 新增 `@angular/material`、`@angular/cdk` 依賴 |
| `src/app/app.config.ts` | 新增 `provideAnimationsAsync()` |
| `angular.json` | 新增主題 CSS 到 styles 陣列 |
| `src/index.html` | 新增 Google Fonts（Roboto）和 Material Icons CDN |
| `src/styles.scss` | 可能新增全域樣式（若選了 typography） |

---

## 使用元件的方式（以 MatButton 為例）

安裝完後，每個元件都需要在 `imports` 陣列裡引入對應的 Module：

```typescript
// app.component.ts
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule],   // ← 加在這裡
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

```html
<!-- app.component.html -->
<button mat-raised-button color="primary">Primary 按鈕</button>
<button mat-raised-button color="accent">Accent 按鈕</button>
<button mat-stroked-button>外框按鈕</button>
<button mat-flat-button color="warn">警告按鈕</button>
```

---

## 常用元件對應的 Module

| 元件 | Module |
|------|--------|
| 按鈕 | `MatButtonModule` |
| 表格 | `MatTableModule` |
| 分頁 | `MatPaginatorModule` |
| 圖示 | `MatIconModule` |
| 日期選擇 | `MatDatepickerModule` |
| 對話框 | `MatDialogModule` |
| 下拉選單 | `MatSelectModule` |
| 頁籤 | `MatTabsModule` |
| 側邊欄 | `MatSidenavModule` |

> 💡 官方文件：[material.angular.io](https://material.angular.io)
