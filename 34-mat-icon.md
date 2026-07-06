---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Mat-icon
routeAlias: ch34
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

<!--
大家好，這一章我們來學 Angular Material 的圖示元件 mat-icon。

想像一下，介面上如果只有純文字按鈕，使用者要花更多時間理解每個按鈕的功能，加上一個清楚的圖示，像放大鏡代表搜尋、垃圾桶代表刪除，會讓操作直覺很多。mat-icon 就是 Angular Material 提供的元件，讓我們可以輕鬆在畫面上插入 Google 準備好的大量圖示。

學完這一章，大家會知道怎麼安裝跟使用 mat-icon，也知道去哪裡找想要的圖示、怎麼換成自己想要的樣式。
-->

---
layout: default
---

# Outline

- **什麼是 icon？** — 圖示的定義與在 Angular 中的角色
- **使用 Mat-icon** — 官方文件、安裝方式與基本用法
- **引入 MatIconModule** — 在 TypeScript 中正確 import
- **瀏覽 Google Fonts Icons** — 搜尋並選用你想要的 icon
- **切換 icon** — 修改 fontIcon 屬性更換圖示

<!--
這張投影片先給大家看一下整章的順序：先講什麼是 icon，接著實際使用 mat-icon，中間會處理模組匯入的問題，然後帶大家去 Google Fonts Icons 網站挑圖示，最後示範怎麼把 icon 換成我們想要的樣子。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 icon？
# What Is an Icon?

<!--
先問問大家，平常在用 App 或網站的時候，是不是很少直接讀文字，反而先看圖示就知道這個按鈕在做什麼？這就是 icon 的作用，接下來我們看看 Angular Material 怎麼幫我們處理這件事。
-->

---

# 什麼是 icon？

Icon（圖示）是用來指示操作的視覺符號。Angular Material 提供 `<mat-icon>` 元件，可在介面中快速插入 Google Material Icons。

<div class="flex justify-center">
  <img src="/images/33-mat-icon/icon-concept-preview.png" class="rounded shadow-md max-h-64" />
</div>

<!--
Icon（圖示）就是用一個簡單的符號去代表一個操作或概念，比如齒輪代表設定、信封代表訊息。Angular Material 提供 `<mat-icon>` 這個元件，讓我們可以直接用它插入 Google Material Icons 這個現成的圖示庫，不用自己去找圖片素材、切圖、調整大小。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 使用 Mat-icon
# Using Mat-icon

<!--
接下來我們就實際動手把 mat-icon 用起來，會從官方文件看範例開始，一步一步加到我們的專案裡。
-->

---

# 使用 Mat-icon — 官方文件

前往 Angular Material 官方文件查看 icon 的使用範例與程式碼：

**https://material.angular.io/components/icon/overview**

<div class="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
  <p class="text-sm text-gray-500 mb-2 font-semibold">Basic icons</p>
  <p class="text-2xl">🏠</p>
</div>

<!--
要用 mat-icon，第一步一樣是先去官方文件看範例，這是我們之後遇到不會用的元件時，很好的查資料習慣。

大家可以打開 material.angular.io/components/icon/overview 這個網址，上面會列出各種基本用法的程式碼範例，我們直接照著抄就好。
-->

---

# 使用 Mat-icon — 新增 HTML

依官方範例在 HTML 加入 `<mat-icon>` 標籤。此時編輯器會顯示紅色錯誤，因為 TS 尚未匯入 `MatIconModule`。

```html
<mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
```

<!--
照著官方範例，我們在 HTML 裡加上一段 `<mat-icon>` 標籤，這裡用 fontIcon="home" 代表要顯示的是「home」這個圖示。

⚠️ 貼上去之後編輯器會顯示紅色錯誤，先不要緊張，這是正常的，因為我們還沒有在 TypeScript 那邊匯入 MatIconModule，Angular 還不認識 mat-icon 這個標籤，下一步我們就來處理。
-->

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

<!--
解決剛剛紅字錯誤的方法很簡單，就是把 MatIconModule 從 @angular/material/icon 匯入進來，再加到 @Component 的 imports 陣列裡。

⚠️ 提醒大家，跟前面學過的元件一樣，只有 import 陳述式是不夠的，一定要記得也加進 imports 陣列，standalone component 這兩步缺一不可。加好之後，編輯器的錯誤就會消失，畫面上也會出現一個 home 圖示。
-->

---

# 瀏覽 Google Fonts Icons

設定完成後 icon 即可正常顯示。若要替換其他 icon，至以下網站搜尋並預覽所有可用的 Material Icon：

**https://fonts.google.com/icons**

<div class="flex justify-center">
  <img src="/images/33-mat-icon/icon-browser.png" class="rounded shadow-md max-h-96" />
</div>

<!--
現在 icon 已經可以正常顯示了，但如果我們想要的不是 home，而是別的圖示呢？

這時候可以到 fonts.google.com/icons 這個網站，上面有非常多現成的 Material Icon 可以搜尋跟預覽，大家可以打開這個網站，輸入關鍵字，像是 search、delete、menu，看看有哪些圖示可以用。
-->

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

<!--
找到喜歡的圖示之後，怎麼換到我們的畫面上呢？很簡單，只要把 `<mat-icon>` 的 fontIcon 屬性值改成那個圖示的名稱就好。

⚠️ 這裡要注意一個小細節：Google Fonts Icons 網站上顯示的名稱通常是「Menu」這種大寫開頭、單字之間有空格的形式，但實際要填進 fontIcon 的值，要全部改成小寫，空格則改成底線，例如 Arrow Back 要寫成 arrow_back。大家可以看範例裡 Menu 對應到 fontIcon="menu"。
-->

---

# Mat-icon 完整使用流程

| 步驟 | 說明 |
|------|------|
| 1 | 前往 [material.angular.io/components/icon/overview](https://material.angular.io/components/icon/overview) 查看官方文件 |
| 2 | 在 HTML 加入 `<mat-icon fontIcon="home"></mat-icon>` |
| 3 | 在 .ts 中 `import { MatIconModule } from '@angular/material/icon'` 並加入 `imports` |
| 4 | 前往 [fonts.google.com/icons](https://fonts.google.com/icons) 搜尋想要的 icon |
| 5 | 將 `fontIcon` 的值改為目標 icon 名稱（全小寫、空格改底線） |

<!--
這張投影片幫大家把整個流程整理成一張表，從查官方文件、寫 HTML、匯入模組、上網找圖示，到最後修改 fontIcon 換圖示，五個步驟一次看完。大家以後要用新的 icon，照這張表操作一次就可以了。
-->

---
layout: end
---

# 課程結束
### 善用 Mat-icon，讓你的 Angular 介面更直覺、更美觀

<!--
這一章我們學會了怎麼用 mat-icon 在 Angular 專案裡加上圖示，也知道去哪裡找更多圖示、怎麼替換。到這邊 Angular Material 系列的內容我們也告一段落，辛苦大家了！
-->
