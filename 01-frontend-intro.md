---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 前端介紹
routeAlias: ch01
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
    Frontend Development Fundamentals
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    前端介紹
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「大眾媒介 - 網頁」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
哈囉大家！歡迎來到前端開發的第一堂課！我是你們今天的主講人。
相信很多人是第一次看到程式碼，內心可能在想：「天啊，我是不是誤入了外星人交流大會？」別慌！今天不講火星文。
你想想看，你每天滑手機、逛網頁、點 App，但你有沒有想過，這些五顏六色的畫面到底是怎麼飛到你眼前的？
學會前端，你就是那個掌控「數位世界門面」的人！今天我們不聊生硬的代碼，我們會用最接地氣的方式，讓你搞懂網頁是怎麼動起來的。
學完這堂課，你不但會知道 HTML、CSS 和 TypeScript 到底在幹嘛，還能開始你的學習之旅。保證聽完之後，連你阿嬤都想來寫網頁！
-->

---
layout: default
---

# Outline

- **大眾媒介 - 網頁：前後端與資料庫的關係**
- **何謂前端？**
- **前端三大技術：HTML、CSS/SCSS、TypeScript**
- **各技術介紹**
- **學習路線建議**

<!--
今天我們的餐點分為五個章節！
首先，我們會先退後一步，看看網頁在整個網路世界的「大圖導覽」。接著，我們會正式定義什麼叫「前端」。
再來，我們會介紹前端的「黃金三角」：也就是 HTML、CSS 和 TypeScript。最後，我會附上一張精心繪製的「求生指南」——學習路線圖，讓你知道第一步該往哪裡踩。
這些東西不僅是基礎，在公司裡也是新人進來必學的黑話。搞懂這些，以後你跟工程師溝通就不會像在做「跨物種交流」了！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 大眾媒介
# 網頁的世界

<!--
在我們擼起袖子寫扣之前，我們先把視野拉高。
我們要先來看看「網頁」這個東西是怎麼在現代社會裡變成像空氣和水一樣重要的存在。
了解它的定位，你才能明白為什麼前端工程師的肝在市場上這麼值錢！
-->

---

# 大眾媒介 - 網頁 (Web)

網頁能在各種不同裝置上顯示介面，其背後是由三大核心組成的資料流程。

<div class="grid grid-cols-3 gap-4 mt-8 text-sm">
  <div class="p-3 bg-blue-50 rounded shadow-sm">
    <b>前端 Frontend</b><br>
    • 服務回傳的資料呈現<br>
    • 最直接的顯示介面<br>
    • 使用者操作的裝置
  </div>
  <div class="p-3 bg-gray-50 rounded shadow-sm">
    <b>後端 Backend</b><br>
    • 提供網頁服務<br>
    • 接收資料並處理<br>
    • 連接各資料庫
  </div>
  <div class="p-3 bg-green-50 rounded shadow-sm">
    <b>資料庫 Database</b><br>
    • 儲存使用者資訊<br>
    • 增刪查改資料<br>
    • 紀錄資訊
  </div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>資料流：</b> 前端接收資料並傳遞 → 後端處理完資料並回傳 → 前端顯示給使用者
</div>

<!--
來，重點來了！網頁背後到底是怎麼運作的？
我們用「去餐廳吃飯」來做比喻。
你一進門，看到漂亮的裝潢、舒適的椅子，服務生遞給你一張精美的菜單，最後端上一盤熱騰騰的牛排。這一切你眼睛看得到、手摸得到、嘴巴吃得到的感官體驗，在程式的世界裡就叫**「前端」**。
那牛排是誰煎的？廚房裡的廚師們汗流浹背在那裡調醬汁對吧？這些你看不到、但沒他們就沒食物的後台運作，就是**「後端」**。
廚房的食材從哪裡拿？當然是冰櫃或儲藏室，這就是存放所有資料的**「資料庫」**。
至於那個幫你把點單送到廚房、再把牛排送回你桌上的服務生，就是我們常聽到的 **「API」**。
初學者常以為網頁就是全部，其實你看到的只是冰山一角，背後有一整個餐廳團隊在支持你點餐！
-->

---

# 前端與後端的互動

- **前端 (Frontend)**：
  - 顯示使用者選用任一服務時所呈現的資料
  - 使用者操作的裝置（Phone / PC / Pad / Watch 等）
- **後端 (Backend)**：
  - 接收前端的服務請求並傳回相對應的資料
  - 與資料庫連接，進行資料的增加、刪除、查詢與修改

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>重點：</b> 多種大小的裝置皆不同，但網頁能在各種不同介面提供服務。網頁服務分為前端、後端兩部分。
</div>

<!--
你想想看，你同一份牛排，可以用盤子裝，也可以用便當盒外帶，甚至可以用大碗公裝。
網頁也是一樣！同一個服務，使用者可能用 iPhone 打開，可能用桌機打開，甚至用 Apple Watch 打開。
後端大廚煎的牛排（資料）都是同一塊，但前端工程師的工作，就是確保不論用什麼大小的「餐具」（裝置），內容都能被裝配得漂亮又好用。
這在業界就叫「響應式設計（RWD）」，別讓手機用戶看電腦版網頁時要把畫面放大十倍，那是上個世紀的體驗了！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 何謂前端？
# What is Frontend?

<!--
好的，熱身完了，現在我們要來對「前端」這個角色進行靈魂拷問，看看它到底是做什麼的。
-->

---

# 何謂前端？

前端主要在提供的介面上顯示內容針對使用者。

| 面向 | 說明 |
| --- | --- |
| **多樣載體** | Phone / PC / Pad / Watch 等 |
| **開發語法** | Swift (iOS)、JAVA (Android)、Angular (跨平台) |
| **設計概念** | 每個顯示的頁面都經過 UI / UX 設計與對應功能連結 |
| **核心目標** | 讓使用者在啟用服務時能夠有良好的體驗 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>前端的目的：</b> 不必讓使用者面對死板板的程式碼，而是提供友善的操作介面。
</div>

<!--
前端的本質，就是「人機互動的橋樑」。
你想想看，如果你去 ATM 領錢，螢幕上沒有任何按鈕，只有一塊露出電路板的晶片，和一堆在閃爍的綠色代碼，你敢把卡插進去嗎？你一定以為這台提款機被劫持了。
提款機上的螢幕提示、語音導覽和綠色的大按鈕，就是「前端」。它讓我們這些普通人，不用去懂背後複雜的銀行會計系統（後端），也能輕鬆把錢領出來。
所以，前端不只是畫圖，更要考慮 UI（長相）和 UX（體驗）。要是使用者點了半天都找不到領錢的按鈕，那就是前端工程師失職啦！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 前端的建築師們
# HTML、CSS/SCSS、TypeScript

<!--
好，既然我們要自己動手蓋這個「人機橋樑」，我們需要三種神仙建材。
-->

---

# 前端三大技術概覽

| 技術 | 比喻 | 特點 |
| --- | --- | --- |
| **HTML** | 網頁的骨架 | 不算程式語言，屬樣板語言；需硬記語法，邏輯需求不高 |
| **SCSS / CSS** | 網頁的衣服 | 負責排版、顏色；HTML 結構相關知識；輸出全靠死背！ |
| **TS (TypeScript)** | 網頁的動作 | 考驗邏輯能力，比 JavaScript 嚴謹；好的邏輯架構如魚得水 |

<!--
這三大建材就是 HTML、CSS 和 TypeScript。
我們用一個名模來比喻：
HTML 就是她的**「骨架」**。決定她有幾隻手、幾隻腳，哪裡是頭，哪裡是腳。如果沒有骨架，那就是一灘肉泥。
CSS 就是她的**「衣服、化妝與髮型」**。穿上禮服、畫上眼影，讓她從骷髏人瞬間變成時尚名模。
TypeScript 則是她的**「大腦與肌肉」**。讓她可以走貓步、轉身、對鏡頭眨眼。
在業界，這三個缺一不可。我們以前只寫 JavaScript，但現在為了不讓工程師半夜因為 Bug 被叫醒，大家都會用更嚴謹的 TypeScript 來當網頁的大腦！
-->

---

# HTML - 網頁的骨架

負責內容結構，不算程式語言，屬於樣板語言。

- 透過 `<link>` 引入 `style.css`，透過 `<script>` 引入 `main.js`

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <button id="greet-btn">打招呼</button>
  <p id="message"></p>
  <script src="main.js"></script>
</body>
</html>
```

<!--
來，我們來看看第一位神仙：HTML。
看看這段程式碼，這就是網頁最原始的骨架。
你看，`<button>` 標籤就像是我們在毛胚屋的牆壁上打了一個孔，裝上一個按鈕；而 `<p>` 標籤則是預留了一個放文字的空間。
這時候你如果打開網頁，它看起來會超醜、超陽春，就像上個世紀的陽春網頁。
因為它還沒有刷油漆（CSS），也沒有接上電線（TypeScript）。
特別注意喔！標籤是成雙成對的，有開頭 `<p>` 就一定要有結尾 `</p>`，忘記寫的話，整棟房子可是會塌掉的！
-->

---

# CSS / SCSS - 網頁的衣服

負責排版、顏色、字型與響應式設計 (RWD)。

- 針對 HTML 中的 `#greet-btn` 套上顏色、間距與圓角

```css
/* style.css */
#greet-btn {
  background-color: #5eada0;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
```

<!--
接著是 CSS。我們來幫剛才那個沒穿衣服的骨架按鈕化妝！
你看這段 CSS 代碼。這個 `#greet-btn` 就像是拿著大聲公喊：「那個叫 greet-btn 的人過來，我要幫你穿衣服了！」
我們給它穿上蒂芬妮綠的背景色（background-color），把醜醜的邊框拿掉（border: none），再幫它剪個圓角（border-radius: 8px）。
看！它是不是瞬間從路人甲變成了科技公司的質感按鈕？
這就像是室內設計師進場刷油漆、鋪木地板，美感就是這樣來的！
-->

---

# TypeScript - 網頁的動作

負責互動與邏輯，讓頁面能回應使用者的操作。

- 監聽 `#greet-btn` 的點擊事件，點擊後更新 `#message` 的文字

```javascript
// main.js
const btn = document.getElementById('greet-btn');
const msg = document.getElementById('message');

btn.addEventListener('click', () => {
  msg.textContent = '你好！歡迎來到前端的世界！';
});
```

<!--
最後，我們要裝上大腦了。
現在有了好看的按鈕，但你點了它，它什麼反應都沒有，這不就跟當機一樣嗎？
我們用 JS 或 TS 寫一段程式碼。
首先，我們用 `document.getElementById` 在 HTML 的毛胚屋裡抓到那個按鈕和文字框。
接著，我們給按鈕裝上一個「監聽器」（addEventListener），這引導在按鈕旁邊安插一個全天候待命的保全。只要有人去點它（click），保全就會觸發機關，把文字框的內容更新成：「你好！歡迎來到前端的世界！」
點擊按鈕，文字就跑出來。這樣網頁就真的活過來了！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 學習路線建議
# Learning Path

<!--
好啦，聽完了這三個神仙的角色，你是不是迫不及待想把他們通通學起來？
別急！修煉也是有順序的，走錯路可是會走火入魔的。
-->

---

# 學習路線建議

正確的學習順序能讓你事半功倍：

<div class="flex flex-col items-center gap-4 mt-6">
  <div class="text-xl font-bold text-teal-700">
    HTML ➔ CSS ➔ JavaScript ➔ 框架（Angular / React / Vue）
  </div>
</div>

| 階段 | 技術 | 原因 |
| --- | --- | --- |
| **第一步** | HTML | 所有框架的基礎架構 |
| **第二步** | CSS / SCSS | 讓頁面有樣式 |
| **第三步** | JavaScript / TypeScript | 加入互動與邏輯 |
| **第四步** | 框架（Angular 等） | 基於前三者延伸 |

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
💡 <b>為什麼要先學 HTML？</b> 因為市面上所有的框架都是基於 HTML 的架構去做延伸，HTML 就是三大框架的基礎。
</div>

<!--
我們的「前端求生指南」路線圖是這樣的：
先學 HTML（認識食材），再學 CSS（學會調味與擺盤），接著學 JS / TS（磨練刀工與火候），最後才去挑戰 Angular 這個「連鎖米其林餐廳的自動化廚房系統」（框架）。
很多人因為看到 Angular 很紅就直接衝進去學。結果發現裡面一堆 HTML 標籤和 CSS 語法看不懂，挫折感超重。請務必先打好地基。
聽話，我們先腳踏實地，把 HTML/CSS 的基礎打好。
在業界，技術再怎麼變，基礎的 HTML/CSS/JS 是永遠不會被淘汰的！
-->

---
layout: end
---

# 介紹結束
### 準備好開始你的前端之旅了嗎？

<!--
好啦！我們前端的奇幻之旅第一站就到這裡。
聽完剛才的骷髏骨架、漂亮衣服跟大腦的比喻，大家應該對網頁怎麼做出來的有一點感覺了吧？
現在給你們十秒鐘消化一下，看看誰有問題？沒問題的話，下一堂課我們就要擼起袖子，開始打我們人生中的第一行 HTML 代碼囉！
-->
