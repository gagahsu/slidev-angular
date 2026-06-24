---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: CSS 樣式編輯
routeAlias: ch10
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
    CSS 樣式編輯
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「互動、排版、套件整合」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好啊！上堂課學完基礎的 Box Model 盒子模型後，今天我們要來學點「真正的高級貨」！
現在的現代網頁，可不能只是死氣沉沉的靜態文字跟粗糙色塊。
它不但需要會跟滑鼠互動、需要能彈性地自動排整齊（這就要請出我們的 Flexbox 彈性盒），甚至在很多工作實務上，我們會去借用別人的力量（比如安裝 Bootstrap 框架）來進行超光速開發。
今天這堂課搞懂之後，你的網頁就會從「學生手作毛胚屋」，直接升級成「專業商業級產品」！
我們今天將會一口氣收割 Flexbox 排版神器，並且學會幫你的 Angular 專案穿上 Bootstrap 這套業界萬用的名牌西裝！
-->

---
layout: default
---

# Outline

- **CSS 互動 — :hover 與 :active**
- **display: flex — 主軸與次軸**
- **對齊 — justify-content 與 align-items**
- **安裝 Bootstrap**
- **練習**

<!--
今天的學習路線可以分為三大戰役：
第一，是讓網頁元件產生滑鼠互動的魔法；
第二，是 Flexbox 排版神功；
第三，是我們業界最愛用的懶人包套件——Bootstrap 框架。
這感覺就像是：我們先給家具裝上感應器，接著讓它們學會自動排隊歸位，最後直接去 IKEA 買一整套設計好的北歐風家具懶人包回來直接裝，你的開發速度保證快到讓你懷疑人生！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# CSS 互動
# :hover 與 :active

<!--
首先，第一站：我們要來學點互動感。一個好的網頁，一定要給使用者最即時的「視覺回饋」！
-->

---

# CSS 互動 — 概念

前端標籤樣式可以設定成**互動式樣式**，根據使用者操作產生不同的視覺回饋：

| 偽類 | 觸發條件 | 說明 |
| --- | --- | --- |
| `.class:hover` | 滑鼠移至標籤 | 滑鼠懸停時的樣式回饋 |
| `.class:active` | 滑鼠點擊時 | 按下滑鼠時的樣式回饋 |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>SCSS 寫法：</b> <code>.class { &amp;:hover { } } }</code>，注意 <code>&amp;:hover</code> 在 SCSS 中算是子層<br/>
💡 搭配 <code>transition</code> 屬性調整互動時間，能大幅提升使用質感
</div>

<!--
這在 CSS 的學術名詞裡，被叫做「偽類（Pseudo-classes）」。
我們用生活例子來比喻：
這就像是「觸控感應小夜燈」。
原本夜燈是暗的。當你的手輕輕「摸」過去懸停在它身上（`:hover`），燈就亮了；當你用力「按下去」時（`:active`），燈的顏色又會變深。
在我們專案用的 SCSS 語法裡，我們特別愛用一個神祕的 `&` 符號。
這個 `&` 代表的就是「我自己（老爸元素）」。
所以 `&:hover` 意思就是「當滑鼠摸到我自己的屁股時，請執行裡面的樣式」。
這裏有個極其高雅的設計技巧：
大家一定要順手寫上 `transition`（過渡動畫時間）這個屬性！
如果沒有 transition，你的 hover 顏色就會像是被關了總開關一樣，生硬地「秒變」過去，看起來很廉價；
如果加了 `transition: 0.8s`，顏色就會在 0.8 秒內優雅地漸層轉變，整個操作質感瞬間高檔了起來！
-->

---

# :hover — 滑鼠移至標籤

```scss
.topText {
  width: 100px;
  height: 100px;
  transition: 0.8s;
  background-color: aqua;
  &:hover {
    background-color: #888;
  }
}
```

<div style="display: flex; gap: 4rem; margin-top: 0.8rem; align-items: flex-start;">
  <div>
    <div style="margin-bottom: 0.3rem; color: #555;">原本的顏色</div>
    <div style="width: 80px; height: 70px; background: aqua;"></div>
  </div>
  <div>
    <div style="margin-bottom: 0.3rem; color: #555;">滑鼠移至目標標籤時</div>
    <div style="width: 80px; height: 70px; background: #888;"></div>
  </div>
</div>

<!--
來，我們看這段 SCSS 程式碼。
我們定義了一個 `.topText` 盒子，原本底色是水藍色（aqua），但我們在肚子裡寫了 `&:hover { background-color: #888; }`，並且設定了 `transition: 0.8s`。
現在，只要使用者的滑鼠滑到這個盒子上，它的顏色就不會死板板地秒變灰色，而是會像清晨起霧一樣，在 0.8 秒內溫柔地從水藍色慢慢溶化、轉變成優雅的灰色。
在業界開發的黃金法則裡，**任何可以被點擊的按鈕或連結，都「必須」要寫 `:hover` 效果**！
否則使用者游標滑過去沒有任何視覺反應，他們會以為網頁當機了，這會是個非常糟糕的使用體驗。
-->

---

# :active — 滑鼠點擊標籤

```scss
.topText {
  width: 100px;
  height: 100px;
  transition: 0.8s;
  background-color: aqua;
  &:active {
    background-color: #333;
  }
}
```

<div style="display: flex; gap: 4rem; margin-top: 0.8rem; align-items: flex-start;">
  <div>
    <div style="margin-bottom: 0.3rem; color: #555;">原本的顏色</div>
    <div style="width: 80px; height: 70px; background: aqua;"></div>
  </div>
  <div>
    <div style="margin-bottom: 0.3rem; color: #555;">滑鼠點擊目標標籤時</div>
    <div style="width: 80px; height: 70px; background: #333;"></div>
  </div>
</div>

<!--
另外一個常用的是 `:active`。它代表的時機點是：「滑鼠左鍵『按下去、但還沒放開』的生死瞬間」。
這通常用來模擬按鈕實體被按凹下去的物理回饋。
所以通常我們設定 `:active`時，顏色要調得比 `:hover` 更深、更暗一點，這樣按下去才有真實的壓迫回饋感。
不過這裡有個新手常犯的小毛病：
不要把 `:active` 的 transition 時間設得太長！
如果按下去的反應要花個兩秒鐘，使用者手都放開了，按鈕才慢慢變色，會讓人覺得這個網頁的反應非常遲鈍、甚至懷疑是不是主機效能太爛。
-->

---

# 小節練習 — CSS 互動

請為以下按鈕寫 SCSS，達成：
- 預設：背景 `#3498db`、白色文字
- `:hover`：背景變 `#2980b9`（深一點），過渡時間 `0.3s`
- `:active`：背景變 `#1a5276`（更深）

```html
<button class="my-btn">點我</button>
```

<!--
試試看！記得要在哪裡設定 transition？
-->

---

# 小節練習 — CSS 互動 — 參考答案

```scss
.my-btn {
  background-color: #3498db;
  color: white;
  padding: 8px 20px;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    background-color: #1a5276;
  }
}
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>重點：</b> <code>transition</code> 要寫在<b>原始狀態</b>（不是寫在 :hover 裡），這樣進出都有動畫效果<br/>
✅ <code>cursor: pointer</code> 不要忘記！告訴使用者「這是可點擊的按鈕」
</div>

<!--
很多人把 transition 寫進 :hover 裡，結果 hover 進去有動畫但離開瞬間消失——因為離開時 :hover 消失了，transition 也跟著沒了！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# display: flex
# 主軸與次軸

<!--
結束了互動小把戲，現在我們要進入今天真正的重頭戲、也是現代網頁排版的終極神器——「Flexbox（彈性盒模型）」！
-->

---

# display: flex — 介紹

`display: flex` 讓容器擁有**主軸**與**次軸**，並改變子元素的排列方式：

- 標籤元素都變成**區塊元素（Block）**
- 主軸（Main Axis）：預設由左往右 →
- 次軸（Cross Axis）：與主軸垂直，由上往下 ↓

<div style="display: flex; justify-content: center; gap: 3rem; align-items: center; margin-top: 1.2rem;">
  <div style="position: relative; width: 220px; height: 130px; background: #4472C4; overflow: visible; flex-shrink: 0;">
    <div style="position: absolute; top: 50%; left: 0; right: -22px; height: 3px; background: red; transform: translateY(-1.5px);">
      <div style="position: absolute; right: -10px; top: -5px; border-left: 12px solid red; border-top: 6px solid transparent; border-bottom: 6px solid transparent;"></div>
    </div>
    <div style="position: absolute; left: 50%; top: 0; bottom: -22px; width: 3px; background: #22c55e; transform: translateX(-1.5px);">
      <div style="position: absolute; bottom: -10px; left: -5px; border-top: 12px solid #22c55e; border-left: 6px solid transparent; border-right: 6px solid transparent;"></div>
    </div>
  </div>
  <div>
    <div style="color: red; font-weight: bold; margin-bottom: 0.8rem;">→ 主軸（Main Axis）</div>
    <div style="color: #16a34a; font-weight: bold;">↓ 次軸（Cross Axis）</div>
  </div>
</div>

<!--
什麼是 Flex 呢？
我們用生活例子來比喻：
想像你的網頁容器是一個「超市的收銀傳送帶」。
當你在這個老爸容器身上，大喊一聲 `display: flex`，這個老爸就會瞬間轉化成一條有魔力的輸送帶。
這條輸送帶預設前進的方向（從左到右），就是它的「主軸（Main Axis）」。
而跟它垂直相交的方向（從上到下），就是它的「次軸（Cross Axis）」。
所有被丟進這個老爸肚子裡的小孩元件，一落地就會乖乖地躺在輸送帶上，自動排成精緻的一橫列。
在還沒有 Flexbox 之前，前端工程師要把兩個 `div` 並排在同一個水平線上，要寫非常囉嗦的 `float` 或是計算寬度百分比，還常常會破版。
現在，只要在老爸身上寫一行 `display: flex`，裡面的小孩就會自動並排，超級省力！
大家千萬別記錯對象：**`display: flex` 一定是下在「外層爸爸容器」身上，而不是下在子元素小孩身上喔**！
-->

---

# display: flex — 主次軸比較

<div style="display: flex; gap: 3rem; margin-top: 1rem; justify-content: center;">
  <div>
    <div style="font-weight: bold; margin-bottom: 0.4rem;">無 display: flex</div>
    <div style="color: #16a34a; font-size: 0.9rem; margin-bottom: 0.4rem;">主軸 ↓ 由上往下（無次軸）</div>
    <div style="width: 130px; border: 2px solid #ccc;">
      <div style="background: aqua; height: 70px;"></div>
      <div style="background: #e8a090; height: 55px;"></div>
    </div>
  </div>
  <div>
    <div style="font-weight: bold; margin-bottom: 0.4rem;">有 display: flex</div>
    <div style="color: red; font-size: 0.9rem; margin-bottom: 0.4rem;">主軸 → 由左往右｜次軸 ↓</div>
    <div style="display: flex; border: 2px solid #ccc; width: 230px; height: 70px;">
      <div style="background: aqua; flex: 1;"></div>
      <div style="background: #e8a090; flex: 1;"></div>
    </div>
  </div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 參考文件：bootstrap5.hexschool.com/docs/5.1/utilities/flex/
</div>

<!--
我們直接來看這兩個盒子的對比圖。
左邊那個，在沒有加 flex 之前，兩個霸道的 Block 元素堅持一人佔一整行，垂直往下排隊，看起來毫無秩序，高度還不一樣。
右邊那個，我們只在外面的灰色框框加上了 `display: flex`，兩個小孩瞬間收斂脾氣，乖乖地肩並肩手拉手排成橫列，而且主動填滿了高度！
這就像是教官一聲令下，大家從原本的「直排直隊」一秒轉身成「橫排橫隊」。
在現代的前端實務開發中，百分之九十九點九的排版都在使用 Flexbox。
如果你說你懂前端，但你不會 Flexbox，那面試官大約只會叫你回去寫記事本。這招是必修課！
-->

---

# 小節練習 — display: flex

請讓以下三個色塊並排在同一行（不使用 `width`），父容器高度 `80px`：

```html
<div class="container">
  <div class="box red"></div>
  <div class="box blue"></div>
  <div class="box green"></div>
</div>
```

| 元素 | 樣式 |
| --- | --- |
| `.container` | 啟用 flex，高度 `80px`，`gap: 8px` |
| `.box` | 寬 `60px`、高 `60px` |
| `.red` / `.blue` / `.green` | 各自背景色 |

<!--
老爸加 flex，小孩自動並排！試試看，下一頁有答案。
-->

---

# 小節練習 — display: flex — 參考答案

```css
.container {
  display: flex;
  height: 80px;
  gap: 8px;
}

.box {
  width: 60px;
  height: 60px;
}

.red   { background-color: #e74c3c; }
.blue  { background-color: #3498db; }
.green { background-color: #2ecc71; }
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>重點：</b> <code>display: flex</code> 下在<b>父容器</b>，不是子元素；<code>gap</code> 是 flex 子元素之間的間距，比用 margin 更簡潔
</div>

<!--
gap 是比較新的屬性，但現代瀏覽器全數支援，推薦用它取代在子元素上加 margin！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 對齊
# justify-content & align-items

<!--
把小孩並排只是第一步。接下來，我們要學習怎麼控制它們在輸送帶上的對齊方式。
-->

---

# 對齊 — 概念

`display: flex` 啟用後，可以搭配以下兩個屬性控制對齊方式：

| 屬性 | 軸向 | 說明 |
| --- | --- | --- |
| `justify-content` | **主軸** | 控制子元素在主軸方向上的對齊方式 |
| `align-items` | **次軸** | 控制子元素在次軸方向上的對齊方式 |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>vertical-align</b>：只適用於行內元素，以基準線方式對齊；用於 <code>img</code> 標籤可取消預設底部留白
</div>

<!--
這兩個控制對齊的屬性，就像是磁鐵一樣。
一個負責主軸（左右方向）的吸力，叫 `justify-content`；
另一個負責次軸（上下方向）的吸力，叫 `align-items`。
因為這兩個英文單字又臭又長，很多初學者寫了三個月還是常常搞混誰是橫的、誰是直的。
我教大家一個我的私人黃金背誦口訣：
**「J 橫 A 直」**！
J 字母的尾巴是個橫向勾過來的弧線，所以 `justify-content` 管的是「橫向主軸」的對齊；
A 字母像是一座頂天立地的「直立高塔」，所以 `align-items` 管的是「直向次軸」的對齊！
只要記住「J橫A直」，這輩子你寫 Flexbox 就不會再打架了！
-->

---

# justify-content — 主軸對齊

<div style="display: flex; gap: 2rem; margin-top: 1rem;">
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">無 justify-content</div>
    <div style="display: flex; border: 2px solid #888; height: 110px; align-items: flex-start;">
      <div style="background: aqua; width: 80px; height: 80px;"></div>
      <div style="background: #e8a090; width: 80px; height: 80px;"></div>
    </div>
  </div>
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">justify-content: center</div>
    <div style="display: flex; border: 2px solid #888; height: 110px; align-items: flex-start; justify-content: center;">
      <div style="background: aqua; width: 80px; height: 80px;"></div>
      <div style="background: #e8a090; width: 80px; height: 80px;"></div>
    </div>
  </div>
</div>

```css
display: flex;
justify-content: center;
```

<!--
我們先來看 J 橫，也就是主軸對齊。
大家看這段程式碼：
當我們下 `justify-content: center;` 時，裡面的兩個小盒子就不再靠左貼齊，而是會自動以中線為基準，緊緊擁抱在正中央。
在很久以前，要讓多個元素水平置中是前端工程師的一大痛點。
現在，只要在老爸身上寫這兩行，一切都完美搞定。
除了 `center` 置中之外，主軸還有個超常用的設定值叫 `space-between`（左右貼邊，中間平均留空）。
如果你要做一個頂部導覽列，左邊放商標 Logo、右邊放登入按鈕，直接給它 `space-between` 吹口哨就排好了，省去你人工計算寬度的功夫！
-->

---

# align-items — 次軸對齊

<div style="display: flex; gap: 2rem; margin-top: 1rem;">
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">無 align-items</div>
    <div style="display: flex; border: 2px solid #888; height: 130px; align-items: flex-start;">
      <div style="background: aqua; width: 80px; height: 80px;"></div>
      <div style="background: #e8a090; width: 80px; height: 80px;"></div>
    </div>
  </div>
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">align-items: center</div>
    <div style="display: flex; border: 2px solid #888; height: 130px; align-items: center;">
      <div style="background: aqua; width: 80px; height: 80px;"></div>
      <div style="background: #e8a090; width: 80px; height: 80px;"></div>
    </div>
  </div>
</div>

```css
display: flex;
align-items: center;
```

<!--
看完了橫向的 J，我們來看看直向的 A——也就是次軸的 `align-items`。
大家看右邊這張圖：
原本兩個不同高度的小方塊，上緣是死板板地靠上貼齊，看起來凹凸不平。
但只要我們加上 `align-items: center;`，這兩顆小盒子就會立刻對齊它們的「中腹線（垂直置中）」，在直向的空間裡上下平均對稱！
有了這兩位大將的結合：
當你想在網頁上做出一個「不管視窗怎麼拉、永遠都在畫面最中心點」的登入框時，
主動在老爸身上寫上 `display: flex; justify-content: center; align-items: center;`，你的登入框就永遠會被死死地鎖在正中心，這就是現代排版的必殺組合技！
-->

---

# 小節練習 — justify-content & align-items

請讓 `.card` 在 `.wrapper` 容器中**水平+垂直置中**，wrapper 固定 `400px × 300px`：

```html
<div class="wrapper">
  <div class="card">我在正中間</div>
</div>
```

| 元素 | 要求 |
| --- | --- |
| `.wrapper` | `400px × 300px`，啟用 flex，讓 card 水平+垂直置中 |
| `.card` | `120px × 60px`，背景 `#3498db`，白色文字，置中 |

<!--
必殺組合技！下一頁看答案。
-->

---

# 小節練習 — justify-content & align-items — 參考答案

```css
.wrapper {
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf0f1;
}

.card {
  width: 120px;
  height: 60px;
  background-color: #3498db;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>J 橫 A 直</b>：<code>justify-content: center</code>（主軸水平置中）+ <code>align-items: center</code>（次軸垂直置中）= 完美正中央
</div>

<!--
這三行組合技——display flex + justify-content center + align-items center——是你整個前端生涯中最常打的三行字！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝 Bootstrap
# Bootstrap Integration

<!--
大功告成！學完了 Flex 神功，今天最後一戰，我們要去借用前端巨人的肩膀——來安裝 Bootstrap 框架！
-->

---

# 什麼是 Bootstrap？

Bootstrap 是全球最多人使用的**開源 CSS 框架**，由 Twitter 工程師於 2011 年開發並開源：

- 內建幾萬行已寫好的 CSS，涵蓋按鈕、卡片、表單、導覽列、格線系統等常用元件
- 只需在 HTML 標籤上加 class，就能直接套用專業樣式
- 內建**響應式設計（RWD）**：自動依螢幕寬度調整排版

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>核心觀念：</b> Bootstrap = 一組別人幫你寫好的 CSS class，你只要「貼 class」就能套用樣式，不需要每次從零手刻
</div>

<!--
Bootstrap 就像是一套「前端廚師的調理包」。你知道廚師自己從頭炒一盤番茄炒蛋，跟直接開一包半成品調理包比起來，哪個速度比較快？
當然是調理包！Bootstrap 就是前端開發的調理包，裡面幫你備好了按鈕、卡片、表格、排版格線...所有你可能需要的元件。
你只要在 HTML 標籤上寫幾個 class 名稱，Bootstrap 就會自動幫你呈現出精緻的樣式，大幅降低你的開發時間。
-->

---

# 為什麼要用 Bootstrap？

從零手寫 vs. 使用 Bootstrap 的差距：

<div style="display: flex; gap: 2rem; margin-top: 0.8rem;">
  <div style="flex: 1; padding: 1rem; background: #fef3f2; border-radius: 8px; border: 1px solid #fca5a5;">
    <div style="font-weight: bold; margin-bottom: 0.6rem; color: #dc2626;">❌ 從零手寫按鈕</div>
    <pre style="font-size: 0.72rem; margin: 0; line-height: 1.5; color: #374151;">background-color: #0d6efd;
color: white;
padding: 6px 12px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 1rem;
transition: 0.15s;
/* + hover 狀態... */</pre>
  </div>
  <div style="flex: 1; padding: 1rem; background: #f0fdf4; border-radius: 8px; border: 1px solid #86efac;">
    <div style="font-weight: bold; margin-bottom: 0.6rem; color: #16a34a;">✅ 用 Bootstrap</div>
    <pre style="font-size: 0.8rem; margin: 0; line-height: 1.5; color: #374151;">&lt;button class="btn btn-primary"&gt;
  送出
&lt;/button&gt;
</pre>
    <div style="margin-top: 0.8rem; font-size: 0.85rem; color: #374151;">結果完全相同，hover 效果也內建</div>
  </div>
</div>

<!--
大家看這個比較，左邊你要寫一大堆 CSS 才能做出一顆像樣的按鈕，右邊你只要在 HTML 標籤上寫 `class="btn btn-primary"` 三個字，Bootstrap 就幫你搞定一切！
在業界，特別是在 sprint（衝刺開發週期）裡，我們的時間非常緊迫，不可能每次都從零手刻每個按鈕和表單。
這時候 Bootstrap 就是你的最強後盾，讓你可以在一小時內做出一個視覺完整、RWD 也沒問題的網頁原型！
-->

---

# Bootstrap vs. 自己寫 CSS — 什麼時候用？

| 場景 | 建議 |
| --- | --- |
| 快速做原型、內部工具、Demo | ✅ 直接用 Bootstrap |
| 需要高度客製化設計（品牌風格） | ⚠️ 自己寫 + 局部借用 Bootstrap |
| 練習 CSS 基礎能力 | ✅ 先自己寫，再學框架 |
| 正式產品開發 | ✅ Bootstrap / PrimeNG / TailwindCSS 擇一 |

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>業界現狀：</b> Angular 生態圈更常用 <b>PrimeNG</b> 或 <b>Angular Material</b>；Bootstrap 是最普遍的入門框架，學會後學其他框架會更快上手
</div>

<!--
Bootstrap 不是萬靈丹，也不是每個專案都適合。
有些有強烈品牌識別的網站，他們的按鈕就是不能長成 Bootstrap 那個樣子，這時候你就需要自己動手。
但業界的現實是：大多數 B2B 後台系統、內部工具、快速原型，用 Bootstrap 或類似框架搭建起來完全沒問題，而且效率極高！
把今天學到的 Bootstrap 基礎打好，以後換到 PrimeNG 或 Angular Material，觸類旁通，學習曲線會平很多。
-->

---

# 安裝 Bootstrap — 步驟

| 步驟 | 操作 |
| --- | --- |
| ① | 在終端機（專案根目錄）執行 `npm i bootstrap` |
| ② | 安裝完成後開啟 `angular.json` |
| ③ | 找到 `"styles": [...]`，在第一個位置加入 Bootstrap CSS 路徑 |
| ④ | 重啟專案 |

```json
"styles": [
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
],
```

<!--
Bootstrap 是全世界最著名、市佔率最高的 CSS 框架。
它裡面已經幫你預先寫好了幾萬行精美的按鈕、卡片、導覽列和響應式網頁排版。
你在專案裡要安裝任何第三方套件，都有一個非常標準的 SOP 三部曲：
第一步，我們要在專案根目錄下指令 `npm i bootstrap`。這就等於是在購物網站上下單，把 Bootstrap 套件下載到你電腦裡的 `node_modules` 倉庫。
第二步，開啟你的 `angular.json` 設定檔，在裡面的 `styles` 陣列中把剛買回來的 Bootstrap CSS 路徑填寫進去。這是在向 Angular 登記：「喂，我買了這套名牌衣服，請幫我跟專案連結在一起！」
第三步，**一定要重新啟動你的開發伺服器（重新跑一次專案）**！
因為 `angular.json` 是大總管，它只在專案一開始啟動時讀取一次設定，如果你沒重啟，它是不會發現你剛剛登記的新衣服喔！
-->

---

# 安裝 Bootstrap — 原理

`npm i bootstrap` 的用途是將 Bootstrap 套件**安裝進專案**，就像 HTML 的 `<link>` import 一樣（差別在於 `npm i` 是安裝套件進專案中）。

在 `angular.json` 的 `styles` 加入套件路徑，等同於告訴專案「我要匯入這個 CSS，並告訴它 CSS 的位置」。

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 安裝後的套件都存放在 <code>node_modules/</code> 資料夾，路徑以 <code>./node_modules/</code> 開頭
</div>

<!--
我們來理順一下這個搬運跟安裝的邏輯。
這就像是你去 IKEA 買了一個大型組合櫃。
`npm i bootstrap` 就是貨運司機把箱子搬進你家地下室倉庫（`node_modules` 資料夾）。
此時箱子還封著，你在客廳是看不到櫃子的。
而我們去 `angular.json` 裡面寫路徑，就是把說明書拿出來，在客廳把它們拼裝擺好。
一旦擺好之後，Bootstrap 裡成千上萬的現成樣式你就可以隨便調用。
原本你想做一個深藍色按鈕，要寫寬度、高度、邊框、文字顏色、背景色...。
現在，你只要在 HTML 的 button 標籤上貼個 `class="btn btn-primary"`。
Bootstrap 就會一秒幫你變出一個圓角、無邊框、自帶 hover 漸變動畫的精品深藍按鈕！
在業界的快速迭代開發中，我們很少會像藝術家一樣從零去捏每一個按鈕，幾乎都是借助像 Bootstrap 或是 PrimeNG 這樣的框架，來高速搭建出漂亮的介面！
-->

---

# 小節練習 — Bootstrap 安裝與使用

安裝好 Bootstrap 後，請用 Bootstrap class 做出以下元件（不需自己寫 CSS）：

1. 一個**藍色主要按鈕**（`btn btn-primary`）
2. 一個**紅色危險按鈕**（`btn btn-danger`）
3. 一個**成功提示框**（`alert alert-success`），內容為「操作成功！」

```html
<!-- 試著只用 HTML class 完成，不需要自己寫任何 CSS -->
<div>
  <button class="???">主要按鈕</button>
  <button class="???">危險按鈕</button>
  <div class="??? mt-2">操作成功！</div>
</div>
```

<!--
Bootstrap 的 class 名稱有固定格式，試著猜猜看！下一頁揭曉。
-->

---

# 小節練習 — Bootstrap 安裝與使用 — 參考答案

```html
<div>
  <button class="btn btn-primary">主要按鈕</button>
  <button class="btn btn-danger">危險按鈕</button>
  <div class="alert alert-success mt-2">操作成功！</div>
</div>
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ Bootstrap 常用 class 格式：<code>btn btn-{顏色}</code> / <code>alert alert-{類型}</code> / <code>mt-{1~5}</code>（margin-top）<br/>
✅ 顏色關鍵字：<code>primary</code>（藍）、<code>success</code>（綠）、<code>danger</code>（紅）、<code>warning</code>（黃）、<code>secondary</code>（灰）
</div>

<!--
Bootstrap 的 class 命名系統非常有規律，記住幾個關鍵字就能推導出大部分的 class 名稱！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 練習
# CSS Practice

<!--
好！現在到了我們的實戰大閱兵時間，來測驗看看各位到底有沒有領悟 Flexbox 的奧義！
-->

---

# 練習 — Flex 排版
### 任務說明

試著做出下圖的排版：
- 中間間隔為 **10px**
- Flex item 3 左右各間隔 **10px**
- Flex item 1 跟 5 高度為 **80px**

<img src="/images/10-css/practice-flex-layout.png" alt="練習目標排版" style="max-height: 260px; margin-top: 0.8rem;" />

<!--
這個練習需要你同時打出 Box Model 與 Flexbox 的組合連技。
請大家觀察投影片底下的排版效果：
總共有 5 個有高有低的彩色小方塊，它們完美的肩並肩排成一橫列。
請動動大腦：
第一，要怎麼讓這五個死活不肯並排的小方塊一秒排成一列？（提示：對老爸容器動手腳）
第二，小方塊之間的 10px 空隙，要用 Margin 還是 Padding 來推開？
第三，怎麼讓 item 3 小方塊左右特別多空出一些安全距離？
大家別擔心顏色對不對，重點是把這 5 個盒子的「位置和尺寸」排得跟畫面上分毫不差，這題成功做出來，你就可以正式宣告自己是 Flexbox 的排版小達人了！
-->

---
layout: end
---

# CSS 樣式編輯完成
### 互動、排版、套件，全部就位！

<!--
好啦！恭喜大家，我們終於完成了整個 CSS 樣式世界的進階修行！
大家在做練習的過程中，是不是發現 Flexbox 的「輸送帶」思維，比我們在那邊算 Margin 算半天要直覺、省力太多了？
如果你現在覺得那些 `justify-content`、`align-items` 的英文單字還是有點繞口，完全不用慌！
在未來的工程師生涯裡，你還會寫它個一萬遍，寫到最後你光憑肌肉記憶閉著眼睛都能打出來。
下一堂課，我們要依依不捨地告別美麗的視覺化妝秀，準備踏入更燒腦、但也更好玩的「網頁大腦邏輯世界」——JavaScript！大家回去記得把腦力補充好，下堂課我們見！
-->
