---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: RWD
routeAlias: ch53
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
    RWD
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓網頁自動適應各種螢幕尺寸，提供一致的使用體驗」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，這一章我們要來聊 RWD，也就是響應式網頁設計。

想想我們平常用手機瀏覽網頁的經驗，如果一個網站是為桌機設計的，直接拿到手機上看，字會很小、按鈕很難點、還要左右滑動才能看完整頁面，這種體驗其實很差。RWD 要解決的就是這個問題：讓同一份網頁，在手機、平板、桌機上都能自動調整版面，呈現最適合的樣子。

學完這一章，大家會知道響應式單位怎麼用、斷點怎麼設計、還有怎麼用 Media Query 讓 Angular 元件的樣式隨螢幕寬度自動切換。
-->

---
layout: default
---

# Outline

- **什麼是 RWD？** — 響應式網頁設計的定義與目標
- **響應式單位** — `%`、`vw`、`vh` 與固定 `px` 的差異
- **斷點設計** — 桌機、平板、手機的常見寬度分界
- **Media Query 語法** — `@media` 的結構與條件關鍵字
- **Angular 實作範例** — 在元件 SCSS 中撰寫 Media Query
- **實際效果示範** — 縮放視窗觀察背景顏色切換

<!--
這張投影片先讓大家看一下今天的路線圖。我們會從 RWD 的定義開始，接著介紹幾個響應式單位，然後講斷點怎麼抓、Media Query 語法怎麼寫，最後在 Angular 元件裡實際做一個範例，讓大家親眼看到縮放視窗時背景顏色跟著切換。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 什麼是 RWD？

Responsive Web Design

<!--
先問大家一個問題：如果沒有 RWD，同一個網頁要給手機、平板、桌機看，是不是得各自做一份？這樣維護起來很累人。

接下來我們就來看看 RWD 到底是什麼、怎麼用一份程式碼就搞定所有裝置。
-->

---

# 什麼是 RWD？

**RWD（Responsive Web Design，響應式網頁設計）** 指網頁能自動適應不同裝置的螢幕尺寸，無論手機、平板或桌機瀏覽，畫面皆能正確呈現。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**固定單位（`px`）**
- 每個螢幕上顯示大小固定不變
- 在小螢幕可能出現水平捲軸
- 不具備自適應能力

</div>
<div>

**相對單位（`%`、`vw`、`vh`）**
- 依視窗或父元素大小動態計算
- 畫面縮放時元素隨之調整
- 是實現 RWD 的基礎手段

</div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> CSS 中使用 <code>%</code>、<code>vw</code>（Viewport Width）、<code>vh</code>（Viewport Height）等相對單位，即是 RWD 最基本的實作方式。
</div>

<!--
我們可以把「固定單位」和「相對單位」想成穿衣服：固定單位像是量身訂做的西裝，只適合一個尺寸，換個人穿就不合身；相對單位則像彈性布料，不管誰穿都能自動貼合身形。

這也是為什麼響應式設計幾乎都會用 `%`、`vw`、`vh` 這類相對單位，而不是死板的 `px`——因為畫面會依螢幕大小自動縮放，不會出現跑版或捲軸的問題。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 響應式單位

Responsive CSS Units

<!--
剛剛提到相對單位是 RWD 的基礎，那接下來我們就把常見的幾個單位攤開來比一比，看看它們各自的基準是什麼、什麼時候該用哪一個。
-->

---

# 響應式單位比較

| 單位 | 基準 | 特性 |
| --- | --- | --- |
| `px` | 固定像素 | 不隨視窗變化，非響應式 |
| `%` | 父容器寬度 | 寬度隨父容器等比縮放 |
| `vw` | 視窗寬度（Viewport Width） | `1vw` = 視窗寬度的 1% |
| `vh` | 視窗高度（Viewport Height） | `1vh` = 視窗高度的 1% |

<!--
這張表大家可以先記住兩個重點：`%` 是相對於「父容器」，`vw`、`vh` 則是相對於「整個瀏覽器視窗」，兩者的基準不一樣，用的時候要看情境選。

實務上，如果元素要跟著父容器的排版走，用 `%` 比較直覺；如果想讓元素永遠佔滿螢幕某個比例（例如全螢幕的 Banner），用 `vw`、`vh` 會更方便。
-->

---

# 響應式單位 — 範例

```css
/* 固定寬度：所有螢幕永遠顯示 300px */
.box-fixed {
  width: 300px;
}

/* 相對寬度：佔父容器的 80% */
.box-percent {
  width: 80%;
}

/* 視窗相對：佔視窗寬度 50%、高度 30% */
.box-viewport {
  width: 50vw;
  height: 30vh;
}
```

<!--
這段範例的目的是讓大家用眼睛比較三種單位的行為差異，等一下我們可以實際把視窗拉大拉小看看效果。

大家看第一段 `.box-fixed`，寬度永遠是 300px，不管視窗多大多小都不會變；`.box-percent` 會跟著父容器的寬度等比例縮放；`.box-viewport` 則是直接吃視窗的寬高比例。

⚠️ 提醒大家，`%` 的計算基準是「父容器」，不是視窗，如果父容器本身沒有明確寬度，`%` 可能會算不出預期的效果，這是很多同學一開始會卡住的地方。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 斷點設計

Breakpoints

<!--
光有相對單位還不夠，我們常常需要在「不同寬度範圍」套用完全不同的版面配置，這時候就要靠斷點設計，來決定什麼寬度該切換成什麼樣子。
-->

---

# 常見裝置斷點

**斷點（Breakpoint）** 是 Media Query 中定義版面切換的寬度臨界值。

| 裝置類型 | 寬度範圍 | 版面說明 |
| --- | --- | --- |
| 桌機（Desktop） | `> 1024px` | 多欄寬版面 |
| 平板（Tablet） | `601px ~ 768px` | 二欄或單欄 |
| 手機（Mobile） | `≤ 600px` | 單欄垂直排列 |

<!--
斷點大家可以想成衣服的尺碼區間，S、M、L 各自對應一個身形範圍，超過或低於某個數值就換一個尺碼穿。網頁也是一樣，我們設定幾個寬度的「臨界值」，一旦視窗寬度跨過這條線，版面就切換成對應的樣子。

表格上列的數字是業界常見的參考值，實務上大家可以依產品需求微調，但核心概念都一樣：桌機多欄、平板二欄、手機單欄。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Media Query

@media 語法結構

<!--
知道了斷點在哪裡之後，接下來就要學怎麼「真的」在 CSS 裡套用這些斷點，這時候就要靠 Media Query 這個語法工具了。
-->

---

# @media 語法結構

`@media` 規則讓開發者針對特定視窗條件套用獨立的 CSS 樣式，是實作 RWD 最核心的工具。

```css
@media (條件) {
  選擇器 {
    屬性: 值;
  }
}
```

<!--
`@media` 大家可以想成是一個「條件判斷式」，就像程式裡的 if：如果視窗寬度符合括號裡的條件，就套用大括號內的樣式，不符合就跳過不套用。

這段語法結構本身很單純，重點在括號裡的「條件」怎麼寫，我們接下來就看看常用的幾個關鍵字。
-->

---

# @media 常用條件關鍵字

| 關鍵字 | 說明 | 範例 |
| --- | --- | --- |
| `max-width` | 視窗寬度不超過指定值時套用 | `(max-width: 600px)` |
| `min-width` | 視窗寬度不小於指定值時套用 | `(min-width: 1024px)` |
| `and` | 同時滿足多個條件 | `(min-width: 601px) and (max-width: 768px)` |

<!--
這三個關鍵字幾乎涵蓋了大部分的響應式需求。`max-width` 用來設定「小於等於某個寬度時」套用，通常用在手機版；`min-width` 則相反，設定「大於等於某個寬度」，常用在桌機版。

如果要框住一個中間範圍，例如平板，就要靠 `and` 把兩個條件串起來，變成「同時符合最小寬度又不超過最大寬度」。這個組合用法等一下我們馬上會在 Angular 範例裡看到。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Angular 實作範例

Media Query in Angular Component

<!--
語法都學會了，接下來我們就把它套進 Angular 專案裡，實際做一個會依螢幕寬度變色的元件，讓大家看到 RWD 是怎麼落地到真實專案的。
-->

---

# 在 Angular 中套用 Media Query

Media Query 寫在 Angular 元件對應的 `.scss` 檔案內，與一般 CSS 寫法完全相同。

**HTML 範本**

```html
<!-- practise1.component.html -->
<div class="box"></div>
```

**SCSS — 預設（桌機）樣式**

```css
/* practise1.component.scss */
.box {
  width: 100%;
  background: lightblue;
}
```

<!--
這段範例的目的是先建立一個「預設樣式」，也就是沒有套用任何 Media Query 時的畫面，等一下我們會在同一個 SCSS 檔案裡陸續加上手機版跟平板版的樣式。

大家注意一下，Media Query 的寫法跟我們平常寫 CSS 完全一樣，並不需要在 Angular 裡學新的語法，只是剛好寫在元件對應的 `.scss` 檔案裡而已。這邊先設定的 `lightblue` 就是桌機版看到的顏色，等等縮小視窗後顏色就會改變。
-->

---

# Media Query 實作範例（一）

```css
/* 手機版：視窗寬度 ≤ 600px */
@media (max-width: 600px) {
  .box {
    width: 100%;
    background: lightcoral;
  }
}
```

<!--
這段範例要加上手機版的樣式，目的是讓大家看到 `max-width` 怎麼實際套用在元件上。

重點就是這個 `@media (max-width: 600px)`，意思是「當視窗寬度小於等於 600px 時」，`.box` 的背景色就會變成 `lightcoral`。等一下我們把瀏覽器視窗縮小到手機大小，就會看到顏色從藍色變成珊瑚色，這就是預期的結果。
-->

---

# Media Query 實作範例（二）

```css
/* 平板版：601px ≤ 視窗寬度 ≤ 768px */
@media (max-width: 768px) and (min-width: 601px) {
  .box {
    width: 100%;
    background: lightgreen;
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> CSS 樣式具有覆蓋特性，應確保各 <code>@media</code> 條件的寬度範圍不重疊，以避免非預期的樣式覆蓋。
</div>

<!--
這裡我們加上平板版的樣式，用 `and` 把 `max-width: 768px` 跟 `min-width: 601px` 兩個條件組合起來，框出一個中間範圍，套用 `lightgreen` 這個顏色。

⚠️ 這邊要特別提醒大家一個常見的錯誤：如果各個 `@media` 的寬度範圍有重疊，因為 CSS 是由上往下覆蓋的，後面寫的規則會蓋掉前面的，可能會讓畫面出現「怎麼顏色跟預期不一樣」的狀況。所以設計斷點的時候，範圍一定要切乾淨，不要重疊。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實際效果示範

Visual Result

<!--
程式碼都寫好了，接下來我們就實際打開瀏覽器，縮放視窗看看剛剛寫的三段樣式是不是真的會照我們預期的方式切換。
-->

---

# 瀏覽器縮放效果

儲存後在瀏覽器中縮放視窗，`.box` 的背景色依斷點自動切換：

| 視窗寬度 | 套用規則 | 背景顏色 |
| --- | --- | --- |
| `> 768px`（桌機） | 預設樣式 | 淺藍色（`lightblue`） |
| `601px ~ 768px`（平板） | 平板 Media Query | 淺綠色（`lightgreen`） |
| `≤ 600px`（手機） | 手機 Media Query | 淺粉紅（`lightcoral`） |

<!--
這張表整理一下我們剛剛寫的三段樣式對應的結果，帶大家把整個邏輯串起來：視窗越大套用預設樣式，縮到平板寬度會變綠色，再縮到手機寬度會變粉紅色。

大家實際操作的時候，可以打開瀏覽器慢慢把視窗邊界往內拉，就能親眼看到顏色在跨過斷點的那一刻切換，這樣印象會比單看程式碼更深刻。
-->

---

# 實際畫面示意

三種裝置寬度下的背景顏色切換（由上至下：桌機 → 平板 → 手機）：

<div class="flex justify-center"><img src="/images/52-rwd/browser-responsive-demo.png" class="rounded shadow-md max-h-80" /></div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>驗證方式：</b> 按 <code>F12</code> 開啟 DevTools，拖曳視窗邊緣或使用裝置模擬器（Toggle Device Toolbar），即可即時觀察樣式切換效果。
</div>

<!--
這張截圖就是實際在瀏覽器上跑出來的結果，由上到下分別是桌機、平板、手機三種寬度下的背景顏色，大家可以對照一下是不是跟前面表格說的一致。

如果手邊沒有真的手機可以測試，可以按 F12 打開開發者工具，切換成裝置模擬模式（Toggle Device Toolbar），就能在電腦上模擬各種裝置尺寸，這是前端開發時最常用的除錯技巧之一。
-->

---
layout: end
---

# 課程結束

### 透過相對單位（`%`、`vw`、`vh`）與 `@media` 斷點語法，在同一份程式碼中實現跨裝置的響應式自適應版面

<!--
這一章我們一起學了 RWD 的核心概念：用相對單位取代固定像素，讓元素跟著螢幕縮放；再用 Media Query 搭配斷點，在不同寬度區間套用不同樣式。

希望大家往後在做任何 Angular 專案時，都能養成「先想手機、再想桌機」的習慣，這樣做出來的網站才能真正適應各種裝置。這一章就到這裡，謝謝大家。
-->
