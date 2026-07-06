---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 安裝 Angular Material
routeAlias: ch32
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
    安裝 Angular Material
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「用 ng add 一鍵安裝功能豐富的 Material UI 元件庫」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，今天我們要來安裝 Angular Material。

前面我們已經用過 mat-icon 這種現成的圖示元件，那時候可能會好奇：這些元件是從哪裡來的？其實它們都來自 Angular Material 這個 UI 元件庫。想像一下，如果每個按鈕、每個卡片、每個表單元件都要自己刻樣式、自己處理無障礙互動，那開發速度會很慢。Angular Material 就像是官方幫我們準備好的一整套「現成家具」，直接搬進專案使用就好。

學完這一章，大家會知道怎麼用一行指令安裝 Angular Material，並且理解安裝過程中每個設定選項在問什麼、該怎麼選。
-->

---
layout: default
---

# Outline

- **什麼是 Angular Material** — 內建模組與樣式的 UI 元件庫
- **執行安裝指令** — 使用 `ng add @angular/material`
- **選擇主題（配色）** — Azure/Blue、Rose/Red、Magenta/Violet、Cyan/Orange、Custom
- **設定排版樣式** — 是否套用全域 Angular Material typography
- **選擇動畫模組** — Include and enable / disable / Do not include
- **安裝完成** — 自動更新的專案檔案一覽

<!--
這張投影片先給大家一個全貌，等一下的內容會照這個順序走：先講什麼是 Angular Material，再實際執行安裝指令，中間 CLI 會問我們三個問題——主題配色、排版樣式、動畫模組，最後看安裝完成後專案會有哪些改變。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 Angular Material？
# What is Angular Material?

<!--
先問大家一個問題：如果沒有 Angular Material，我們要做一個漂亮的按鈕或表單，是不是得自己寫一堆 CSS、還要處理鍵盤操作、無障礙屬性？這些其實都是重複工，而且很容易漏掉細節。

Angular Material 要解決的就是這個痛點——它是 Google 官方維護的 UI 元件庫，把按鈕、卡片、表單、對話框等常見元件都做好了，我們只要引入模組就能直接用，樣式和互動邏輯都已經處理好。
-->

---

# 安裝 @angular/material

Angular Material 是 Google 官方提供的 UI 元件庫，內建豐富的元件與樣式，**mat-icon** 即為其中之一。

安裝前請先停止開發伺服器，並在專案根目錄下執行：

```bash
ng add @angular/material
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 執行指令前請先關閉開發伺服器（Ctrl+C），並確認終端機的工作目錄在專案根目錄下。
</div>

<!--
安裝的方式跟我們之前裝其他套件不太一樣，這裡我們用 ng add，而不是單純的 npm install。

原因是 ng add 不只會下載套件，還會自動幫我們修改專案設定檔，像是 angular.json、styles.scss 這些，等一下安裝完我們會看到具體改了哪些檔案。

⚠️ 提醒大家，執行前一定要先按 Ctrl+C 關掉開發伺服器，不然安裝過程中修改檔案可能會跟開發伺服器的即時編譯互相干擾。也要確認終端機目前的路徑是在專案根目錄，不是子資料夾。
-->

---

# 安裝 @angular/material
### 執行安裝指令

執行後 Angular CLI 會下載套件，並依序詢問幾個設定選項。

```bash
ng add @angular/material
```

<!--
指令下下去之後，Angular CLI 會先下載套件，接著會跳出幾個互動式問題讓我們選擇，像是選主題配色、要不要套用全域排版樣式、要不要引入動畫模組。

這幾個問題大家不用緊張，等一下我們會一個一個拆開來看，每個問題在問什麼、為什麼要這樣選。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 選擇主題（配色）
# Choose a Theme

<!--
第一個問題是選主題配色。大家可以把主題想像成一整套搭配好的顏色組合，包含主色、強調色、警示色，選了之後所有 Material 元件（按鈕、進度條、開關）都會套用同一組色系，不用我們自己一個一個調。
-->

---

# 安裝 @angular/material
### 步驟一：選擇主題

CLI 詢問要使用哪種內建主題，若不使用預設主題可選 **Custom**。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

- **Azure/Blue** — 藍色系
- **Rose/Red** — 紅色系
- **Magenta/Violet** — 紫色系

</div>
<div>

- **Cyan/Orange** — 青橙色系
- **Custom** — 自訂主題

</div>
</div>

<div class="flex justify-center">
  <img src="/images/31-angular-material/theme-selector.png" class="rounded shadow-md max-h-52" />
</div>

<!--
這四個是內建主題，名字是「配色一/配色二」的組合，像 Azure/Blue 就是藍色系。如果我們專案已經有自己的品牌色，或是想要客製化，就選 Custom，之後再自己去調整顏色變數。

沒有特別要求的話，選一個順眼的內建主題就好，之後隨時可以再修改 styles.scss 裡的主題設定。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 設定全域排版樣式
# Global Typography Styles

<!--
第二個問題是問我們要不要套用全域的 Typography 樣式。這邊要小心一點，因為它會影響整個專案的文字排版，不是只有 Material 元件而已。
-->

---

# 安裝 @angular/material
### 步驟二：設定全域排版樣式

CLI 詢問是否套用全域 Angular Material 排版樣式，建議選 **N**，避免覆蓋專案現有的 CSS 設定。

```bash
? Set up global Angular Material typography styles? (y/N) N
```

<!--
如果選 Yes，Angular Material 會把它自己的一套字體大小、行高規則套用到整個 HTML，包括我們原本寫好的標題、段落樣式都可能被蓋掉。

⚠️ 大部分專案已經有自己的 CSS 規範，所以這裡建議選 N（也是預設值），避免我們自己寫的樣式被 Material 的全域樣式覆蓋掉，之後只針對用到 Material 元件的地方套用樣式就好。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 選擇動畫模組
# Angular Animations Module

<!--
最後一個問題是問我們要不要引入動畫模組。像是對話框展開、選單滑出這些過場效果，背後都是靠 Angular 的動畫模組在跑，所以這一步關係到元件互動起來順不順。
-->

---

# 安裝 @angular/material
### 步驟三：選擇動畫模組

CLI 詢問是否引入 Angular 動畫模組，依開發需求選擇後即開始安裝。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

- **Include and enable animations** — 引入並啟用動畫（預設）
- **Include, but disable animations** — 引入但停用動畫

</div>
<div>

- **Do not include** — 不引入動畫模組

</div>
</div>

<div class="flex justify-center">
  <img src="/images/31-angular-material/animations-prompt.png" class="rounded shadow-md max-h-52" />
</div>

<!--
如果選 Include and enable animations（預設），就是完整引入並開啟動畫，元件的過場效果會很流暢，這是大部分專案的選擇。

如果專案對效能特別敏感，或是刻意想要更「乾淨俐落」沒有動畫的介面，可以選 Include, but disable，動畫模組還在但關閉。Do not include 則是完全不引入，這樣某些依賴動畫模組的元件行為可能會受限，一般不建議新手選這個。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝完成
# Installation Complete

<!--
三個問題答完，CLI 就會開始真正安裝套件，也會自動幫我們改好幾個專案檔案。接下來我們看一下實際上改了什麼地方。
-->

---
layout: two-cols
---

# 安裝 @angular/material
### 安裝完成 — 自動更新的檔案

安裝完成後，Angular CLI 會自動更新以下專案檔案：

- `package.json` — 新增 @angular/material 相依套件
- `src/app/app.config.ts` — 加入 Material 設定
- `angular.json` — 加入主題 CSS 樣式路徑
- `src/index.html` — 加入 Google Fonts 字型連結
- `src/styles.scss` — 加入主題樣式匯入

::right::

```bash
UPDATE package.json (1105 bytes)
✔ Packages installed successfully.
UPDATE src/app/app.config.ts (421 bytes)
UPDATE angular.json (2892 bytes)
UPDATE src/index.html (491 bytes)
UPDATE src/styles.scss (181 bytes)
```

<!--
大家可以看到，ng add 一次幫我們改了五個地方：package.json 加了套件相依、app.config.ts 補上 Material 需要的設定、angular.json 加了主題 CSS 的路徑、index.html 補上 Google Fonts 的字型連結，styles.scss 也匯入了主題樣式。

⚠️ 提醒大家安裝完後最好重新啟動開發伺服器，因為 angular.json 的設定改變，有些變更需要重啟才會生效。之後我們就可以直接在 template 裡使用 <mat-xxx> 這些元件了。
-->

---
layout: end
---

# 課程結束
### Angular Material 安裝完成，即可開始使用豐富的 UI 元件

<!--
這一章我們把 Angular Material 裝好了，也搞懂安裝過程中每個選項在問什麼。下一章我們就可以正式開始用這些現成元件，把介面做得更完整。辛苦大家了！
-->
