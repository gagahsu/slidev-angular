---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: CSS 進階工具
routeAlias: ch11
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
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    CSS 進階工具
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「背景、定位、堆疊，掌控版面細節」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎來到 CSS 的進階修煉場！
上堂課我們把基本的身材外觀（Box Model）還有輸送帶排版（Flexbox）搞定了。
今天我們要來學點能掌控網頁「靈魂細節」的進階工具。
包括怎麼幫你的網頁換上漂亮的背景圖、怎麼像圖釘一樣把元件「釘」在畫面的特定角落，還有怎麼處理當物件疊在一起時，誰在上面、誰在底下的「宮鬥劇」（堆疊順序）。
這堂課上完，你對版面的掌控力會達到像素級的精準！
-->

---
layout: default
---

# Outline

- **背景設定 — background-image / repeat / position / size**
- **Position — fixed / relative & absolute**
- **z-index — 堆疊順序**
- **後蓋前觀念 — CSS 優先權**
- **練習**

<!--
今天我們的作戰大綱很精實：
首先是背景圖的四大金剛屬性。
接著是極度重要的 Position 定位三兄弟。
再來是解決重疊紛爭的 z-index。
最後我們會聊聊 CSS 的後蓋前與優先權潛規則。
照慣例，最後有非常精彩的定位實作練習，大家加油！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 背景設定
# Background Properties

<!--
第一站，我們先來聊聊怎麼幫網頁裝修壁紙——也就是背景屬性。
-->

---

# 背景設定 — 屬性總覽

`background-*` 系列屬性可精細控制元素的背景圖片顯示方式：

| 屬性 | 說明 |
| --- | --- |
| `background-image` | 設定背景圖片，使用 `url(...)` 指定路徑 |
| `background-repeat` | 控制背景是否重複平鋪，常用 `no-repeat` |
| `background-position` | 設定背景位置，格式為 `X Y`（水平 垂直） |
| `background-size` | 指定背景圖片大小（px、%、`cover`、`contain`） |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>background-position</b> 前方數值代表水平位置（X），後方代表垂直位置（Y）
</div>

<!--
大家看這個屬性表格。
背景屬性叫 `background-*` 系列，有四大常用旋鈕：
第一是 `background-image` 設定背景圖片路徑。
第二是 `background-repeat` 控制要不要像阿嬤家的地板磁磚一樣重複平鋪。
第三是 `background-position` 定位圖片要在盒子的哪個方位。
第四是 `background-size` 調整圖片要縮放成多大。
這四顆旋鈕組合起來，就能調出任何你想要的背景效果！
-->

---

# background-image — 本地端圖片

`url()` 可以放入**本地端（電腦）圖片的路徑**：

```css
background-image: url("./IMG_8536(1).jpg");
```

<div style="display: flex; gap: 2rem; align-items: center; margin-top: 0.8rem;">
  <img src="/images/11-css/bg-local.png" alt="本地端背景圖片效果示意" style="max-height: 220px; border-radius: 6px; border: 1px solid #e2e8f0; flex-shrink: 0;" />
  <div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm">
    💡 路徑以 <code>./</code> 開頭代表相對路徑，與 CSS 檔案位於同一層目錄<br/><br/>
    ⚠️ 圖片名稱含括號、空格等特殊字元時，記得確認路徑格式正確
  </div>
</div>

<!--
第一顆旋鈕叫 `background-image`。我們可以使用 `url()` 把本地端的圖片加進來。
你看代碼寫 `url("./IMG_8536(1).jpg")`。
這裡的 `./` 代表「我目前所在的位置」。
路徑非常重要！要是你圖片檔案在同一個資料夾，卻忘了寫 `./`，瀏覽器可能就會找不到圖，賞你一片空白。
另外，要是圖片檔名有括號、空白之類的特殊字元，記得路徑格式一定要寫正確，最好是用半形引號包起來，才不會出錯喔。
-->

---

# background-image — 網路圖片：取得網址

`url()` 也可以放入**網路圖片的網址**，三步驟取得圖片網址：

<img src="/images/11-css/bg-network-steps.png" alt="Google 搜尋圖片後複製圖片網址的步驟截圖" style="max-height: 300px; margin-top: 0.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />

<div class="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ 使用網路圖片前請注意版權，此處僅作練習用途
</div>

<!--
如果不想下載圖片，我們也可以直接拉「網路圖片」的網址來當壁紙！
怎麼做呢？很簡單，三步驟：
在 Google 搜尋到你喜歡的圖，點右鍵，然後選擇「複製圖片位址」（注意，是圖片位址，不是網頁網址喔！）。
複製完直接貼進 `url("...")` 的括號裡就行了。
不過這邊大叔要溫馨提醒：用網路圖片練習很方便，但如果以後做正式專案，一定要注意版權問題，或者是遇到對方伺服器關機，你的圖片就會跟著消失喔！
-->

---

# background-image — 網路圖片：範例

```css
background-image: url("https://pic.pimg.tw/twfish0999/1361897489-2554509122_n.jpg");
```

<div style="display: flex; gap: 2rem; align-items: center; margin-top: 0.8rem;">
  <img src="/images/11-css/bg-network.png" alt="網路圖片設為背景的效果示意" style="max-height: 230px; border-radius: 6px; border: 1px solid #e2e8f0; flex-shrink: 0;" />
  <div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm">
    💡 直接貼上圖片的完整 URL，效果與本地端相同<br/><br/>
    預設情況下背景圖片會<b>重複平鋪</b>填滿整個元素
  </div>
</div>

<!--
這就是直接貼上網路圖片 URL 的範例。
你會發現，如果你的容器很大，而圖片很小，瀏覽器預設會非常貼心地「重複平鋪」這張圖片，就像磁磚一樣把它鋪滿整個螢幕。
如果你不想要這種魔性重複的效果，我們就要靠下一顆旋鈕來拯救了。
-->

---

# background-repeat — 背景是否重複

預設背景圖片會重複平鋪，加上 `no-repeat` 可取消重複：

```css
background-repeat: no-repeat;
```

<div style="display: flex; gap: 2.5rem; align-items: flex-start; margin-top: 0.8rem;">
  <div>
    <div style="font-weight: bold; margin-bottom: 0.4rem;">預設（重複平鋪）</div>
    <div style="border: 2px solid #ccc; width: 180px; height: 160px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.8rem; text-align: center;">圖片重複排列<br/>填滿容器</div>
  </div>
  <div>
    <div style="font-weight: bold; margin-bottom: 0.4rem;">no-repeat（不重複）</div>
    <img src="/images/11-css/bg-no-repeat.png" alt="background-repeat: no-repeat 效果示意" style="max-height: 160px; border: 2px solid #ccc; border-radius: 4px;" />
  </div>
</div>

<!--
這顆旋鈕就是 `background-repeat`。
如果你覺得重複鋪滿太雜亂，只要下一行 `background-repeat: no-repeat;`。
這行指令翻譯過來就是：「背景圖片給我乖乖只顯示一張，不准重複！」
你看右邊的示意圖，加上之後它就只會孤零零地出現在左上角，乾乾淨淨。
-->

---

# background-position — 設定背景位置

格式 `X Y`：前方數值為水平位置，後方為垂直位置：

```css
background-repeat: no-repeat;
background-position: 50% 50%;
```

<div style="display: flex; gap: 2rem; align-items: center; margin-top: 0.8rem;">
  <img src="/images/11-css/bg-position.png" alt="background-position: 50% 50% 效果示意（圖片置中）" style="max-height: 220px; border-radius: 6px; border: 1px solid #e2e8f0; flex-shrink: 0;" />
  <div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm">
    💡 <b>X / Y 數值對照：</b><br/>
    X：<code>0%</code> = 靠左，<code>50%</code> = 置中，<code>100%</code> = 靠右<br/>
    Y：<code>0%</code> = 頂端，<code>50%</code> = 置中，<code>100%</code> = 底端<br/><br/>
    <code>50% 50%</code> 表示圖片顯示在正中央
  </div>
</div>

<!--
當你用了 `no-repeat` 之後，圖片預設會貼在左上角。
如果你想讓它移動，就要調整 `background-position`（背景位置）。
它的格式是 `X Y`，前面代表水平（左右），後面代表垂直（上下）。
我們可以用百分比來設定。
例如 `50% 50%`，就代表水平置中（50%）加上垂直置中（50%），圖片就會乖乖躺在盒子的正中央。
你也可以直接用英文單字，像是 `center center` 或是 `right bottom`（右下角），非常直覺！
-->

---

# background-size — 設定背景圖片大小

| 值 | 說明 |
| --- | --- |
| `px` / `%` | 直接指定圖片寬高 |
| `cover` | 等比放大至填滿容器，可能裁切；解析度低時易失真 |
| `contain` | 等比縮放至可完整放入容器，不裁切 |

```css
background-repeat: no-repeat;
background-size: contain;
```

<img src="/images/11-css/bg-size-contain.png" alt="background-size: contain 效果示意" style="max-height: 145px; margin-top: 0.4rem; border-radius: 4px; border: 1px solid #ccc;" />

<!--
最後一顆旋鈕是 `background-size` 控制大小。
除了寫死 `px` 之外，最常用的是 `cover` 和 `contain` 這兩個關鍵字。
`cover` 就像是「把圖硬塞滿整個盒子」，就算會被裁切一部分也在所不惜，總之就是要塞滿！
`contain` 則是「等比例縮放」，保證整張圖片完整呈現，絕對不裁切，但也因為這樣，如果盒子比例不對，旁邊就會留下空白。
這在做網頁大 Banner 或是頭像時非常實用，大家實作時可以切換看看感覺。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Position（位置）
# fixed / relative / absolute

<!--
好，熱身完畢！接下來我們要進入整堂課最核心、也最考驗空間邏輯的屬性——「Position（定位）」！
-->

---

# position: fixed — 定錨

`position: fixed` 將標籤**固定在視窗的絕對位置**，不隨滾輪移動：

- 定位方式以**視窗**的上下左右為基準
- 不論如何縮放網頁或滾動滾輪，位置始終不變
- 搭配 `top`、`right`、`bottom`、`left` 指定距視窗邊緣的距離

```css
.topContent {
  position: fixed;
  top: 20px;
  right: 50px;
}
```

<div class="mt-3 p-2 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 常用於固定導覽列、懸浮按鈕、回頂端按鈕等不隨頁面捲動的元件
</div>

<!--
第一種定位叫 `position: fixed`，我稱它為「死心塌地釘子戶」。
一旦你對元素設定了 `position: fixed`，它就會脫離網頁的常規排隊邏輯，直接以「瀏覽器視窗」為基準進行定位。
不管使用者滾輪怎麼滾、網頁怎麼拉，它都會像一顆頑固的圖釘一樣，死死地釘在你指定的視窗位置上（比如 `top: 20px; right: 50px`）。
這招最常用在什麼地方？
就是我們常常看到網頁右下角的「回頂端（Top）」小按鈕，或是上方不管怎麼滾都在的固定導覽列，都是靠它做出來的！
-->

---

# position: fixed — 示意圖

滾輪滾動後，`fixed` 元素位置相對視窗**保持不變**：

<div style="display: flex; gap: 3rem; justify-content: center; align-items: flex-start; margin-top: 1.2rem;">
  <div>
    <div style="font-weight: bold; margin-bottom: 0.5rem; text-align: center; color: #444;">滾輪滾動前</div>
    <div style="position: relative; width: 160px; height: 210px; border: 2px solid #888; background: #fff; overflow: hidden;">
      <div style="position: absolute; top: 12px; right: 12px; width: 48px; height: 48px; background: #ee9b9b; border: 2px solid #c04040; z-index: 2;"></div>
      <div style="height: 90px; background: #e8f4e8; border-bottom: 1px dashed #bbb; display: flex; align-items: center; justify-content: center; color: #888; font-size: 0.75rem;">頁面內容</div>
    </div>
  </div>
  <div style="display: flex; align-items: center; font-size: 1.8rem; color: #666; padding-top: 90px;">→</div>
  <div>
    <div style="font-weight: bold; margin-bottom: 0.5rem; text-align: center; color: #444;">滾輪滾動後（其位置仍不變）</div>
    <div style="position: relative; width: 160px; height: 210px; border: 2px solid #888; background: #fff; overflow: hidden;">
      <div style="position: absolute; top: 12px; right: 12px; width: 48px; height: 48px; background: #ee9b9b; border: 2px solid #c04040; z-index: 2;"></div>
      <div style="height: 170px; background: #e8f4e8; border-bottom: 1px dashed #bbb; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 8px; color: #888; font-size: 0.75rem;">（內容已往上捲）</div>
    </div>
  </div>
</div>

<!--
大家看這張滾輪滾動的對比圖。
左邊是滾動前，粉紅色的 fixed 盒子在右上角。
右邊是滾動後，底下的綠色網頁內容已經往上滑了一大截，但是那個粉紅色的 fixed 盒子依然在視窗的同一個位置一動也不動。
這就是 `fixed` 的威力，它只看視窗，不看網頁長度！
-->

---

# position: relative & absolute — 父子關係定錨

`relative` 與 `absolute` **搭配使用**，讓子標籤在父標籤範圍內進行定位：

| 角色 | CSS 設定 | 說明 |
| --- | --- | --- |
| 父標籤 | `position: relative` | 建立定位基準，本身位置不移動 |
| 子標籤 | `position: absolute` | 在父標籤區域內進行定錨 |

```html
<div class="top">
  <div class="topContent"></div>
</div>
```

<div class="mt-2 p-2 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 標籤 <code>topContent</code> 被 <code>top</code> 包住，即形成父子關係：父 → <code>top</code>，子 → <code>topContent</code>
</div>

<!--
接下來這對組合是 Position 家族的「最佳拍檔」：`relative`（相對定位）與 `absolute`（絕對定位）。
很多初學者會單獨使用 `absolute`，結果發現它飛到天邊去，根本不受控制。
那是因為你沒有幫它指定「基準點」！
我們業界的標準配對玩法是：
在父標籤（老爸）身上寫 `position: relative`，這是在老爸身上宣告「我要當定位基準點喔，但我位置不動」。
在子標籤（小孩）身上寫 `position: absolute`，這是在小孩身上宣告「我要在老爸的範圍內進行絕對定錨」。
一旦老爸身上裝了 relative，小孩的 absolute 就會乖乖在老爸的身體範圍裡活動，絕對不會飛到外面去！
-->

---

# position: relative & absolute — CSS 範例

```css
.top {
  width: 100vw;
  height: 110vh;
  position: relative;
}
```

```css
.topContent {
  width: 100px;
  height: 100px;
  background-color: #ee9b9b;
  position: absolute;
  top: 5%;
  right: 1%;
}
```

<div class="mt-2 p-2 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 滾動頁面時，<code>absolute</code> 元素的位置會跟著父標籤移動（非固定在視窗）
</div>

<!--
我們來看範例程式碼。
老爸 `.top` 設定了 `position: relative`。
小孩 `.topContent` 設定了 `position: absolute; top: 5%; right: 1%;`。
這行指令的意思就是：「小孩要在老爸的肚子裡，距離老爸頂端 5% 的高度、距離老爸右邊 1% 的寬度，把自己釘在那裡。」
這樣一來，不管網頁怎麼滾動，只要老爸移動，小孩就會跟著老爸一起動，不會像 `fixed` 一樣傻傻地停在螢幕畫面上。這叫父唱子隨！
-->

---

# position: relative & absolute — 示意圖

`absolute` 元素釘在父標籤的某一位置，滾動時**跟著父標籤移動**：

<div style="display: flex; gap: 3rem; justify-content: center; align-items: flex-start; margin-top: 1.2rem;">
  <div>
    <div style="font-weight: bold; margin-bottom: 0.5rem; text-align: center; color: #444;">滾輪滾動前</div>
    <div style="position: relative; width: 160px; height: 210px; border: 2px solid #888; background: #fff; overflow: hidden;">
      <div style="position: absolute; top: 12px; right: 12px; width: 48px; height: 48px; background: #ee9b9b;"></div>
      <div style="height: 90px; background: #e8f4e8; display: flex; align-items: center; justify-content: center; color: #888; font-size: 0.75rem;">父標籤範圍</div>
    </div>
  </div>
  <div style="display: flex; align-items: center; font-size: 1.8rem; color: #666; padding-top: 90px;">→</div>
  <div>
    <div style="font-weight: bold; margin-bottom: 0.5rem; text-align: center; color: #444;">滾輪滾動後（跟著父層移動）</div>
    <div style="position: relative; width: 160px; height: 210px; border: 2px solid #888; background: #fff; overflow: hidden;">
      <div style="position: absolute; top: -40px; right: 12px; width: 48px; height: 48px; background: #ee9b9b;"></div>
      <div style="height: 210px; background: #e8f4e8; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 8px; color: #888; font-size: 0.75rem;">（父標籤已往上捲動）</div>
    </div>
  </div>
</div>

<!--
看這張示意圖就很清楚了。
粉紅色的 `absolute` 小孩，是緊緊地釘在綠色的「父標籤範圍」右上角。
當你往下滾動網頁時，因為父標籤整個往上挪動了，所以粉紅色的 absolute 小孩也跟著父標籤一起往上挪移。
這就是 absolute 與 fixed 最本質的差別：
`fixed` 認「瀏覽器視窗」當老大；
`absolute` 則是認「最近的有設 relative 的祖先（通常是老爸）」當老大！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# z-index
# 堆疊順序

<!--
當大家學會了定位，元件開始在畫面上飛來飛去的時候，一定會遇到一個靈異事件：
「我的按鈕怎麼被圖片壓在底下了？」
這時候我們就需要請出 `z-index` 來處理這場宮鬥劇了！
-->

---

# z-index — 堆疊順序

`z-index` 設定元素的**前後堆疊順序**，數值越高越前面：

- 可設為負數（元素會疊在其他元素後方）
- **只對有設定 `position` 的元素有效**
- 注意：`position: relative` 的父層本身無法移動

<div style="display: flex; justify-content: center; margin-top: 1rem;">
  <div style="position: relative; width: 240px; height: 170px;">
    <div style="position: absolute; top: 0; left: 0; width: 110px; height: 110px; background: #4472C4; z-index: 1; display: flex; align-items: flex-start; padding: 6px; color: white; font-weight: bold; font-size: 0.9rem;">z-index:1</div>
    <div style="position: absolute; top: 25px; left: 50px; width: 110px; height: 110px; background: #ED7D31; z-index: 2; display: flex; align-items: flex-start; padding: 6px; color: white; font-weight: bold; font-size: 0.9rem;">z-index:2</div>
    <div style="position: absolute; top: 50px; left: 100px; width: 110px; height: 110px; background: #7030A0; z-index: 3; display: flex; align-items: flex-start; padding: 6px; color: white; font-weight: bold; font-size: 0.9rem;">z-index:3</div>
  </div>
</div>

<!--
`z-index` 就是控制「3D 空間裡的深度（Z 軸）」。
數值越大的人，代表它站得越前面、越霸道，會壓在數值小的人身上。
比如圖中 `z-index: 3` 的紫色方塊，就把 `z-index: 2` 的橘色和 `1` 的藍色死死地壓在底下。
這裡有兩個新手一定要背下來的超級鐵律：
第一，`z-index` **只對有設定定位（position）的元素有效**！如果你給一個普通老百姓 `div` 下 `z-index: 9999`，瀏覽器會直接當作沒看到，完全不會生效。
第二，父層的 `relative` 優先權非常霸道。如果老爸的 `z-index` 輸了，小孩再高也沒用。這就像是拼爹的社會一樣，老爸輸了，小孩在外面也翻不了身！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 後蓋前觀念
# CSS 優先權

<!--
最後，我們要來聊聊 CSS 的核心底層邏輯——「後蓋前」與「優先權（Specificity）」。
-->

---

# 後蓋前觀念

在 CSS 中，針對**相同標籤**的樣式設定，**後方的規則會覆蓋前方的規則**：

```css
h1 { color: red; }
h1 { color: blue; }
```

<div style="display: flex; align-items: center; gap: 1.5rem; margin-top: 0.8rem;">
  <div style="padding: 6px 16px; background: #f5f5f5; border-radius: 4px; font-size: 0.85rem; font-family: monospace;">
    color: red → color: blue（後方覆蓋）
  </div>
  <div style="font-size: 1.5rem; color: #666;">→</div>
  <div style="font-size: 2rem; font-weight: bold; color: blue;">XXX</div>
</div>

以這個 `h1` 標籤為例：

```html
<h1 class="x1">XXX</h1>
```

當兩條規則都以**標籤名稱（`h1`）**為選擇器時，後方規則生效。

<!--
我們之前提過，CSS 預設是「後蓋前」。
你看這段程式碼，我們對 `h1` 同時下了 `color: red` 和 `color: blue`。
這兩個指令完全打架了。因為它們都是用同一個「標籤選擇器（h1）」，所以瀏覽器會聽最後面的話，把顏色渲染成藍色（blue）。
這是最基礎的後蓋前，看誰在底下誰就贏。
-->

---

# 後蓋前觀念 — class 選擇器

若指定 `.class` 名稱，**不會受後方標籤設定的樣式影響**：

```css
.x1 { color: red; }
h1  { color: blue; }
```

<div style="display: flex; align-items: center; gap: 1.5rem; margin-top: 0.8rem;">
  <div style="padding: 6px 16px; background: #f5f5f5; border-radius: 4px; font-size: 0.85rem; font-family: monospace;">
    .x1 → class 選擇器優先權高於標籤選擇器
  </div>
  <div style="font-size: 1.5rem; color: #666;">→</div>
  <div style="font-size: 2rem; font-weight: bold; color: red;">XXX</div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 CSS 選擇器優先權（Specificity）由高至低：<br/>
<code>id (#id)</code> &gt; <code>class (.class)</code> &gt; <code>標籤 (h1, div)</code><br/>
class 選擇器優先權高，不會被後方的標籤選擇器覆蓋
</div>

<!--
但是！如果我們用的是不同的選擇器呢？
比如我們給 `h1` 貼了個 `.x1` 的 class 貼紙。
CSS 裡寫了 `.x1 { color: red; }` 在上面，底下又寫了 `h1 { color: blue; }`。
照理說 blue 在下面應該要贏啊？但結果畫面上居然顯示紅色（red）！
為什麼？因為 CSS 有一套「優先權計分制（Specificity）」。
Class 選擇器的權重（分數是10分）遠遠高於普通的標籤選擇器（分數只有1分）！
所以不管標籤選擇器寫在多下面，都幹不掉分數比它高的 class 選擇器。
計分規則很簡單：ID（100分） > Class（10分） > 標籤名稱（1分）。
所以，權重分數高的人說了算，這就是為什麼你的樣式有時候會「不合邏輯」地被覆蓋的原因！
-->

---

# 後蓋前小注意（一）

- **ID**
  - 一般標籤除了設定 `class` 名稱，也會設定 `id` 名稱
  - `id` 普遍用途在於方便 JavaScript 開發時取得指定值
  - `id` 的特性在於**不重複**，偏向功能性開發用途，而非樣式設定

- **樣式鎖定（較不常用）**
  - 在樣式設定中加上 `!important`，即使後方有同標籤的規則，該樣式也**不會被覆蓋**
  - 無必要情況時不添加

```css
h1 { color: red !important; }
h1 { color: blue; }
```

<div style="display: flex; align-items: center; gap: 1.2rem; margin-top: 0.4rem;">
  <div style="font-size: 0.85rem; color: #555;">加了 <code>!important</code> 的 red 不會被 blue 覆蓋 →</div>
  <div style="font-size: 1.8rem; font-weight: bold; color: red;">XXX</div>
</div>

<!--
我們來補充兩個冷知識。
第一，`id` 選擇器權重高達 100 分。不過在業界，我們極少用 `id` 來寫 CSS 樣式，`id` 通常是給 JavaScript 用來抓元素的。如果用 `id` 寫樣式，會因為分數太高導致以後很難被覆蓋，代碼會變得很髒。
第二，CSS 裡有一個作弊大絕招，叫做 `!important`。
只要在屬性值後面加上 `!important`，它的分數值就會瞬間暴增到無限大！
你看代碼，雖然 `color: blue` 寫在下面，但因為上面加了 `!important`，所以紅色取得了絕對勝利。
不過，這個大絕招在業界是「禁忌之術」，沒事千萬別亂用！
因為一旦你用了，別人就要用更多的 `!important` 來蓋你，最後整個專案會打滿 `!important`，變成一場 CSS 災難！
-->

---

# 後蓋前小注意（二）

- **語法建議**
  - 接收他人編輯過的網頁時，建議以後蓋前的觀念建立**新的 `.css` 檔案**覆蓋舊檔
  - 避免前人設計的樣式被更動後無法挽回

- **檔案管理**
  - CSS、TS 個別放，共用的放在一起

<!--
在檔案管理和協作上，我們有兩個好習慣建議：
第一，當你接手別人寫好的網頁樣式，需要修改時，**不要直接去改原本的舊 CSS 檔**。
萬一你改爛了，根本還原不回去。
建議你新建一個 `custom.css`，用後蓋前或是更高權重的 class 選擇器，在你的新檔案裡覆蓋舊樣式。這樣原檔安全，你的修改也一目了然。
第二，專案大了之後，要保持「CSS 與 TS 分開存放」的原則，共用的東西抽出來，代碼才不會變成一坨拉撒麵。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習
# CSS Practice

<!--
好，學完了 Position 的 relative 和 absolute 父子定錨法，我們馬上來進行一場頭腦體操！
-->

---

# 練習 — Position 定位排版
### 任務說明

使用 `position` 屬性，試著做出下方的三層色塊排版：

<div style="display: flex; gap: 3rem; align-items: center; margin-top: 0.8rem;">
  <div style="flex: 1; font-size: 0.9rem;">
    <div style="margin-bottom: 0.5rem; font-weight: bold;">圖形規格：</div>
    <div style="margin-bottom: 0.3rem;">■ <span style="color: #474a4d; font-weight: bold;">深灰色</span>　300px × 300px　<code>#474a4d</code></div>
    <div style="margin-bottom: 0.3rem;">■ <span style="color: #c08020; font-weight: bold;">橘色</span>　　200px × 200px　<code>#f7b977</code></div>
    <div style="margin-bottom: 0.5rem;">■ <span style="color: #028760; font-weight: bold;">綠色</span>　　100px × 100px　<code>#028760</code></div>
    <div class="p-2 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm">
      💡 更改顏色：<code>background-color: 色碼;</code>
    </div>
  </div>
  <div style="flex-shrink: 0;">
    <div style="position: relative; width: 200px; height: 200px; background: #474a4d;">
      <div style="position: absolute; top: 0; right: 0; width: 133px; height: 133px; background: #f7b977;">
        <div style="position: absolute; bottom: 0; left: 0; width: 67px; height: 67px; background: #028760;"></div>
      </div>
    </div>
  </div>
</div>

<!--
今天的練習是「三層俄羅斯套娃色塊排版」！
請大家用 CSS 的定位，做出右邊這個圖形：
最底層是深灰色盒子（300x300），中間是橘色盒子（200x200），最上層是綠色盒子（100x100）。
注意它們重疊和靠齊的位置：
橘色要死死貼在深灰色的右上角；
綠色則要貼在橘色的左下角。
這題非常考驗你的 relative 與 absolute 巢狀關係，大家先建好 HTML，然後想想看 CSS 要怎麼下！
-->

---

# 練習 — Position 定位排版
### 解題提示

1. 深灰色為**最外層父標籤**，設定 `position: relative`
2. 橘色為深灰色的子標籤，設定 `position: absolute`，靠右上角（`top: 0; right: 0`）
3. 綠色為橘色的子標籤，設定 `position: absolute`，靠左下角（`bottom: 0; left: 0`）

```css
.black { position: relative; width: 300px; height: 300px; }
.orange { position: absolute; top: 0; right: 0; width: 200px; height: 200px; }
.green  { position: absolute; bottom: 0; left: 0; width: 100px; height: 100px; }
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 記得在 HTML 中建立正確的巢狀結構：<code>black &gt; orange &gt; green</code>
</div>

<!--
大家寫得怎麼樣？如果卡住了，請看投影片上的黃金提示：
首先，在 HTML 裡要建立「套娃結構」，也就是 `black` 包著 `orange`，`orange` 再包著 `green`。
在 CSS 裡：
最外層的 `.black` 設 `position: relative` 作為地基。
中層的 `.orange` 設 `position: absolute; top: 0; right: 0;`。因為它的爸爸是 black，所以它會飛到 black 的右上角。
最內層的 `.green` 設 `position: absolute; bottom: 0; left: 0;`。因為它的爸爸是 orange，所以它會以 orange 的身體為基準，飛到 orange 的左下角！
看看你的程式碼是不是像這樣一層包一層？這就是 Position 的精髓啦！
-->

---
layout: end
---

# CSS 進階工具完成
### 背景、定位、堆疊，全部就位！

<!--
恭喜大家！成功收服了背景、定位、堆疊與優先權這四隻大魔王！
現在你已經具備了控制網頁任何角落、任何層次的能力。
回去把這幾招多練幾遍，特別是 `relative` 加上 `absolute` 的組合技。
下堂課，我們要正式跨入一個全新的維度——「JavaScript 程式邏輯世界」，我們要開始讓網頁學會計算、思考 and 回應！大家回去把大腦充飽電，下堂課見！
-->
