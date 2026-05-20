---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Mat-icon
routeAlias: ch33
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
    Angular Essentials
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    Mat-icon
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「在 Angular 中使用 Material Icon 美化你的介面」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **什麼是 icon？** — 圖示的定義與在 Angular 中的角色
- **使用 Mat-icon** — 官方文件、安裝方式與基本用法
- **引入 MatIconModule** — 在 TypeScript 中正確 import
- **瀏覽 Google Fonts Icons** — 搜尋並選用你想要的 icon
- **切換 icon** — 修改 fontIcon 屬性更換圖示

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 icon？
# What Is an Icon?

---

# 什麼是 icon？

Icon（圖示）是用來指示操作的視覺符號。Angular Material 提供 `<mat-icon>` 元件，可在介面中快速插入 Google Material Icons。

<div class="flex justify-center">
  <img src="/images/33-mat-icon/icon-concept-preview.png" class="rounded shadow-md max-h-64" />
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 使用 Mat-icon
# Using Mat-icon

---

# 使用 Mat-icon — 官方文件

前往 Angular Material 官方文件查看 icon 的使用範例與程式碼：

**https://material.angular.io/components/icon/overview**

<div class="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
  <p class="text-sm text-gray-500 mb-2 font-semibold">Basic icons</p>
  <p class="text-2xl">🏠</p>
</div>

---

# 使用 Mat-icon — 新增 HTML

依官方範例在 HTML 加入 `<mat-icon>` 標籤。此時編輯器會顯示紅色錯誤，因為 TS 尚未匯入 `MatIconModule`。

```html
<mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
```

---

# 使用 Mat-icon — 引入 MatIconModule

TS 中只需 import `MatIconModule`，加入 `imports` 陣列後錯誤即消失：

```typescript
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
```

---

# 瀏覽 Google Fonts Icons

設定完成後 icon 即可正常顯示。若要替換其他 icon，至以下網站搜尋並預覽所有可用的 Material Icon：

**https://fonts.google.com/icons**

<div class="flex justify-center">
  <img src="/images/33-mat-icon/icon-browser.png" class="rounded shadow-md max-h-96" />
</div>

---
layout: two-cols
---

# 切換 icon — 修改 fontIcon

找到目標 icon 後，將 `<mat-icon>` 的 `fontIcon` 屬性值改為 icon 名稱（全小寫，空格改底線，例如 `Arrow Back` → `arrow_back`）。

例如在 Google Fonts Icons 找到 **Menu** 後：

```html
<mat-icon aria-hidden="false" fontIcon="menu"></mat-icon>
```

- 網站顯示：`Menu`
- 放入 `fontIcon`：`menu`（全小寫）

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/33-mat-icon/menu-icon-example.png" class="rounded shadow-md max-h-80" />
</div>

---

# Mat-icon 完整使用流程

| 步驟 | 說明 |
|------|------|
| 1 | 前往 [material.angular.io/components/icon/overview](https://material.angular.io/components/icon/overview) 查看官方文件 |
| 2 | 在 HTML 加入 `<mat-icon fontIcon="home"></mat-icon>` |
| 3 | 在 .ts 中 `import { MatIconModule } from '@angular/material/icon'` 並加入 `imports` |
| 4 | 前往 [fonts.google.com/icons](https://fonts.google.com/icons) 搜尋想要的 icon |
| 5 | 將 `fontIcon` 的值改為目標 icon 名稱（全小寫、空格改底線） |

---
layout: end
---

# 課程結束
### 善用 Mat-icon，讓你的 Angular 介面更直覺、更美觀
