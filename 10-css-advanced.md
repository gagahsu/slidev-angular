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
它不但需要會跟滑鼠互動、需要能彈性地自動排整齊（這就要請出我們的 Flexbox 彈性盒），甚至在很多工作實務上，我們會去借用別人的力量（比如安裝 Tailwind CSS 框架）來進行超光速開發。
今天這堂課搞懂之後，你的網頁就會從「學生手作毛胚屋」，直接升級成「專業商業級產品」！
我們今天將會一口氣收割 Flexbox 排版神器，並且學會幫你的 Angular 專案裝上 Tailwind CSS，讓你以後寫樣式再也不用在 HTML 跟 SCSS 之間跳來跳去！
-->

---
layout: default
---

# Outline

- **CSS 互動 — :hover 與 :active**
- **display: flex — 排列、方向與彈性佔比**
- **Flexbox 對齊 — justify-content、align-items 與 align-self**
- **安裝 Tailwind CSS**
- **練習**

<!--
今天的學習路線可以分為三大戰役：
第一，是讓網頁元件產生滑鼠互動的魔法；
第二，是 Flexbox 排版神功；
第三，是現在業界最紅的 CSS 框架——Tailwind CSS。
這感覺就像是：我們先給家具裝上感應器，接著讓它們學會自動排隊歸位，最後再去搬一整套標準規格的模組化零件回來，讓你以後想組什麼家具都能秒組，開發速度快到讓你懷疑人生！
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
# 排列、方向與彈性佔比

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
💡 參考文件：developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_flexible_box_layout
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

# flex-direction — 主軸方向

`flex-direction` 決定子元素的**排列方向**（主軸方向）：

| 值 | 主軸方向 | 說明 |
| --- | --- | --- |
| `row` | → 左到右 | **預設值**，子元素橫排 |
| `row-reverse` | ← 右到左 | 橫排但順序反轉 |
| `column` | ↓ 上到下 | 子元素直排 |
| `column-reverse` | ↑ 下到上 | 直排但順序反轉 |

<div style="display: flex; gap: 2rem; margin-top: 1rem;">
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">row（預設）</div>
    <div style="display: flex; flex-direction: row; border: 2px solid #888; padding: 6px; gap: 4px; height: 60px; align-items: center;">
      <div style="background: aqua; width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">1</div>
      <div style="background: #e8a090; width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">2</div>
      <div style="background: #90d090; width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">3</div>
    </div>
  </div>
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">column</div>
    <div style="display: flex; flex-direction: column; border: 2px solid #888; padding: 6px; gap: 4px; width: 60px;">
      <div style="background: aqua; height: 32px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">1</div>
      <div style="background: #e8a090; height: 32px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">2</div>
      <div style="background: #90d090; height: 32px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">3</div>
    </div>
  </div>
</div>

<!--
flex-direction 控制的是輸送帶的走向。
預設 row 是橫向輸送帶，子元素從左排到右。
改成 column 就把輸送帶立起來，子元素從上排到下。
-->

---

# flex-direction — row-reverse & column-reverse

<div style="display: flex; gap: 2rem; margin-top: 1rem;">
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">row-reverse</div>
    <div style="display: flex; flex-direction: row-reverse; border: 2px solid #888; padding: 6px; gap: 4px; height: 60px; align-items: center;">
      <div style="background: aqua; width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">1</div>
      <div style="background: #e8a090; width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">2</div>
      <div style="background: #90d090; width: 44px; height: 44px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">3</div>
    </div>
    <div style="font-size: 0.8rem; color: #555; margin-top: 0.3rem;">← 從右到左，順序反轉</div>
  </div>
  <div style="flex: 1;">
    <div style="font-weight: bold; margin-bottom: 0.4rem;">column-reverse</div>
    <div style="display: flex; flex-direction: column-reverse; border: 2px solid #888; padding: 6px; gap: 4px; width: 60px;">
      <div style="background: aqua; height: 32px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">1</div>
      <div style="background: #e8a090; height: 32px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">2</div>
      <div style="background: #90d090; height: 32px; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">3</div>
    </div>
    <div style="font-size: 0.8rem; color: #555; margin-top: 0.3rem;">↑ 從下到上，順序反轉</div>
  </div>
</div>

```css
.container {
  display: flex;
  flex-direction: column; /* row | row-reverse | column | column-reverse */
}
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>flex-direction: column</code> 常用於「讓多個 flex row 上下堆疊」的版型
</div>

<!--
row-reverse 跟 column-reverse 實務上比較少用，但在做「由下往上的訊息列表」（像聊天室）時非常方便。
記住：reverse 只是改變視覺排列順序，HTML 的 DOM 順序不會變。
-->

---

# flex: 1 — 彈性佔比

`flex` 是三個屬性的縮寫，控制子元素如何**分配剩餘空間**：

```css
flex: 1;
/* 等同於 */
flex-grow: 1;    /* 有多餘空間時，我要分 */
flex-shrink: 1;  /* 空間不夠時，我可以縮 */
flex-basis: 0%;  /* 起始大小從 0 開始計算 */
```

| 值 | 效果 |
| --- | --- |
| `flex: 1` | 等比分配剩餘空間（最常用） |
| `flex: 2` | 佔的空間是 `flex: 1` 的兩倍 |
| `flex: none` | 不伸不縮，維持內容原本大小 |

<!--
flex: 1 是 Flexbox 裡最常用的比例分配技巧。
想像三個朋友平分一塊蛋糕，每人 flex: 1，就各拿三分之一。
如果其中一個 flex: 2，他就拿走一半，其他兩人各拿四分之一。
-->

---

# flex: 1 — 視覺說明

容器寬 **300px**，子元素使用不同 `flex` 值：

<div style="display: flex; flex-direction: column; gap: 1.2rem; margin-top: 0.8rem;">
  <div>
    <div style="font-size: 0.85rem; margin-bottom: 0.3rem; color: #555;">全部 flex: 1（等分）</div>
    <div style="display: flex; width: 300px; height: 44px; border: 2px solid #888; gap: 2px;">
      <div style="flex: 1; background: #93c5fd; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">flex:1</div>
      <div style="flex: 1; background: #93c5fd; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">flex:1</div>
      <div style="flex: 1; background: #93c5fd; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">flex:1</div>
    </div>
  </div>
  <div>
    <div style="font-size: 0.85rem; margin-bottom: 0.3rem; color: #555;">中間 flex: 2（佔兩倍）</div>
    <div style="display: flex; width: 300px; height: 44px; border: 2px solid #888; gap: 2px;">
      <div style="flex: 1; background: #86efac; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">flex:1</div>
      <div style="flex: 2; background: #fca5a5; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">flex:2</div>
      <div style="flex: 1; background: #86efac; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">flex:1</div>
    </div>
  </div>
  <div>
    <div style="font-size: 0.85rem; margin-bottom: 0.3rem; color: #555;">左側 flex: none（固定內容寬），其餘等分</div>
    <div style="display: flex; width: 300px; height: 44px; border: 2px solid #888; gap: 2px;">
      <div style="flex: none; width: 80px; background: #fde68a; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">none</div>
      <div style="flex: 1; background: #93c5fd; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">flex:1</div>
      <div style="flex: 1; background: #93c5fd; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">flex:1</div>
    </div>
  </div>
</div>

<!--
三種情境一眼看懂。
第一排三等份，第二排中間胖一倍，第三排左側固定寬（側邊欄常用），右邊兩個等分剩餘空間。
flex: none + flex: 1 的組合在做「固定側邊欄 + 彈性內容區」的版型時超常用！
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

# Flexbox 對齊
# justify-content / align-items / align-self

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

| 常用值 | 效果 |
| --- | --- |
| `flex-start` | 靠主軸起點（**預設**，靠左） |
| `flex-end` | 靠主軸終點（靠右） |
| `center` | 主軸置中 |
| `space-between` | 兩端貼齊，中間平均留空 |
| `space-around` | 每個 item 左右等距留空 |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>最常用：</b> <code>center</code>（置中）與 <code>space-between</code>（導覽列左右分開）
</div>

<!--
center 把所有 item 聚在中間。
space-between 是做導覽列最常用的值——左邊 Logo、右邊按鈕，中間空間自動撐開，省去人工計算寬度。
-->

---

# justify-content — 視覺對比

<div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.8rem;">
  <div>
    <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">flex-start（預設）</div>
    <div style="display: flex; border: 2px solid #888; height: 48px; align-items: center; justify-content: flex-start; gap: 4px; padding: 0 4px;">
      <div style="background: #93c5fd; width: 60px; height: 34px;"></div>
      <div style="background: #fca5a5; width: 60px; height: 34px;"></div>
      <div style="background: #86efac; width: 60px; height: 34px;"></div>
    </div>
  </div>
  <div>
    <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">center</div>
    <div style="display: flex; border: 2px solid #888; height: 48px; align-items: center; justify-content: center; gap: 4px;">
      <div style="background: #93c5fd; width: 60px; height: 34px;"></div>
      <div style="background: #fca5a5; width: 60px; height: 34px;"></div>
      <div style="background: #86efac; width: 60px; height: 34px;"></div>
    </div>
  </div>
  <div>
    <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">space-between</div>
    <div style="display: flex; border: 2px solid #888; height: 48px; align-items: center; justify-content: space-between; padding: 0 4px;">
      <div style="background: #93c5fd; width: 60px; height: 34px;"></div>
      <div style="background: #fca5a5; width: 60px; height: 34px;"></div>
      <div style="background: #86efac; width: 60px; height: 34px;"></div>
    </div>
  </div>
  <div>
    <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">space-around</div>
    <div style="display: flex; border: 2px solid #888; height: 48px; align-items: center; justify-content: space-around;">
      <div style="background: #93c5fd; width: 60px; height: 34px;"></div>
      <div style="background: #fca5a5; width: 60px; height: 34px;"></div>
      <div style="background: #86efac; width: 60px; height: 34px;"></div>
    </div>
  </div>
</div>

<!--
四種值一次對比看清楚差異。
-->

---

# align-items — 次軸對齊

| 常用值 | 效果 |
| --- | --- |
| `stretch` | 延伸填滿容器高度（**預設**） |
| `flex-start` | 靠上 |
| `flex-end` | 靠下 |
| `center` | 垂直置中 |

<div style="display: flex; flex-direction: column; gap: 0.8rem; margin-top: 0.8rem;">
  <div style="display: flex; gap: 1.5rem;">
    <div style="flex: 1;">
      <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">flex-start（靠上）</div>
      <div style="display: flex; border: 2px solid #888; height: 90px; align-items: flex-start; gap: 4px; padding: 4px;">
        <div style="background: #93c5fd; width: 50px; height: 50px;"></div>
        <div style="background: #fca5a5; width: 50px; height: 30px;"></div>
        <div style="background: #86efac; width: 50px; height: 40px;"></div>
      </div>
    </div>
    <div style="flex: 1;">
      <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">center（垂直置中）</div>
      <div style="display: flex; border: 2px solid #888; height: 90px; align-items: center; gap: 4px; padding: 4px;">
        <div style="background: #93c5fd; width: 50px; height: 50px;"></div>
        <div style="background: #fca5a5; width: 50px; height: 30px;"></div>
        <div style="background: #86efac; width: 50px; height: 40px;"></div>
      </div>
    </div>
    <div style="flex: 1;">
      <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">flex-end（靠下）</div>
      <div style="display: flex; border: 2px solid #888; height: 90px; align-items: flex-end; gap: 4px; padding: 4px;">
        <div style="background: #93c5fd; width: 50px; height: 50px;"></div>
        <div style="background: #fca5a5; width: 50px; height: 30px;"></div>
        <div style="background: #86efac; width: 50px; height: 40px;"></div>
      </div>
    </div>
  </div>
</div>

<!--
align-items 控制次軸（垂直方向）所有子元素的對齊方式。
最常用的是 center——讓高度不同的元素垂直置中對齊，是做導覽列 icon 與文字並排的必備技巧。
stretch 是預設值，子元素沒有設高度時會自動延伸填滿容器。
-->

---

# align-self — 單一子元素次軸對齊

`align-self` 讓**個別子元素**覆蓋父容器的 `align-items` 設定：

| 屬性 | 套用對象 | 說明 |
| --- | --- | --- |
| `align-items` | 父容器 | 控制**所有**子元素的次軸對齊 |
| `align-self` | 子元素本身 | 覆蓋父容器設定，只影響**自己** |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>align-self</code> 優先權高於 <code>align-items</code>——父容器廣播全體，子元素可個別反悔
</div>

<!--
align-self 是 align-items 的個人版。
父容器下了 align-items 就是對全體廣播，但有時候你只想讓特定的子元素做出不同的垂直對齊。
-->

---

# align-self — 常用值

| 常用值 | 效果 |
| --- | --- |
| `stretch` | 延伸填滿容器高度（**預設**） |
| `flex-start` | 靠上 |
| `flex-end` | 靠下 |
| `center` | 垂直置中 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 常用值與 <code>align-items</code> 完全相同，差別只在套用對象：<br/>
<code>align-items</code> → 父容器下，影響所有子元素<br/>
<code>align-self</code> → 子元素下，只影響自己
</div>

<!--
常用值跟 align-items 完全一樣，只是套用對象從父容器改成子元素自己。
stretch 是預設值，不需要寫；其他三個看情況使用。
-->

---

# align-self — 視覺對比

<div style="display: flex; gap: 1.5rem; margin-top: 0.8rem;">
  <div style="flex: 1;">
    <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">flex-start（靠上）</div>
    <div style="display: flex; border: 2px solid #888; height: 110px; gap: 4px; padding: 4px;">
      <div style="background: #93c5fd; width: 50px; align-self: flex-start; height: 50px; font-size: 0.7rem; padding: 2px;">A</div>
      <div style="background: #fca5a5; width: 50px; height: 50px; font-size: 0.7rem; padding: 2px;">B</div>
      <div style="background: #86efac; width: 50px; height: 50px; font-size: 0.7rem; padding: 2px;">C</div>
    </div>
  </div>
  <div style="flex: 1;">
    <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">center（垂直置中）</div>
    <div style="display: flex; border: 2px solid #888; height: 110px; gap: 4px; padding: 4px;">
      <div style="background: #93c5fd; width: 50px; align-self: center; height: 50px; font-size: 0.7rem; padding: 2px;">A</div>
      <div style="background: #fca5a5; width: 50px; height: 50px; font-size: 0.7rem; padding: 2px;">B</div>
      <div style="background: #86efac; width: 50px; height: 50px; font-size: 0.7rem; padding: 2px;">C</div>
    </div>
  </div>
  <div style="flex: 1;">
    <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">flex-end（靠下）</div>
    <div style="display: flex; border: 2px solid #888; height: 110px; gap: 4px; padding: 4px;">
      <div style="background: #93c5fd; width: 50px; align-self: flex-end; height: 50px; font-size: 0.7rem; padding: 2px;">A</div>
      <div style="background: #fca5a5; width: 50px; height: 50px; font-size: 0.7rem; padding: 2px;">B</div>
      <div style="background: #86efac; width: 50px; height: 50px; font-size: 0.7rem; padding: 2px;">C</div>
    </div>
  </div>
  <div style="flex: 1;">
    <div style="font-size: 0.82rem; color: #555; margin-bottom: 0.2rem;">stretch（延伸，預設）</div>
    <div style="display: flex; border: 2px solid #888; height: 110px; gap: 4px; padding: 4px;">
      <div style="background: #93c5fd; width: 50px; align-self: stretch; font-size: 0.7rem; padding: 2px;">A</div>
      <div style="background: #fca5a5; width: 50px; height: 50px; font-size: 0.7rem; padding: 2px;">B</div>
      <div style="background: #86efac; width: 50px; height: 50px; font-size: 0.7rem; padding: 2px;">C</div>
    </div>
  </div>
</div>

<!--
四欄各展示一種 align-self 值，只有 A 方塊在每欄套用不同的 align-self，B/C 保持預設對比。
靠上、置中、靠下、延伸填滿——四種效果一眼看清。
記住：align-self 下在子元素身上，不是父容器！
-->

---

# 小節練習 — Flexbox 對齊

請做出以下工具列排版，容器 `400px × 120px`：

```html
<div class="toolbar">
  <div class="item item-a">A</div>
  <div class="item item-b">B</div>
  <div class="item item-c">C</div>
</div>
```

<div style="display: flex; justify-content: space-between; align-items: flex-start; width: 360px; height: 100px; background: #f1f5f9; border: 2px solid #ccc; padding: 4px; margin-top: 0.8rem;">
  <div style="width: 52px; height: 52px; background: #3498db; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">A</div>
  <div style="width: 52px; height: 52px; background: #e74c3c; align-self: center; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">B</div>
  <div style="width: 52px; height: 52px; background: #2ecc71; align-self: flex-end; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold;">C</div>
</div>

<!--
三個屬性全用上：justify-content 管左右，align-items 管預設上下，align-self 個別覆蓋！
-->

---

# 小節練習 — Flexbox 對齊（規格）

| 元素 | 要求 |
| --- | --- |
| `.toolbar` | `400px × 120px`，flex，三個 item **左中右均分**，整體靠上 |
| `.item` | `60px × 60px`，背景色自訂 |
| `.item-a` | 靠上（預設，不需額外設定） |
| `.item-b` | 垂直**置中** |
| `.item-c` | 靠下 |

<!--
目標排版如上：A 靠上、B 垂直置中、C 靠下，同時三個 item 左中右均分。
下一頁看答案。
-->

---

# 小節練習 — Flexbox 對齊 — 參考答案

```css
.toolbar {
  display: flex;
  justify-content: space-between; /* 三個 item 左中右均分 */
  align-items: flex-start;        /* 預設靠上 */
  width: 400px;
  height: 120px;
  background-color: #f1f5f9;
}

.item {
  width: 60px;
  height: 60px;
  background-color: #3498db;
  color: white;
}
```

<!--
justify-content: space-between 讓三個 item 平均散開佔滿整排。
align-items: flex-start 設定預設靠上，item-b 和 item-c 再各自用 align-self 覆蓋。
-->

---

# 小節練習 — Flexbox 對齊 — 參考答案（續）

```css
/* align-self 個別覆蓋父容器的 align-items */
.item-b { align-self: center; }   /* 垂直置中 */
.item-c { align-self: flex-end; } /* 靠下 */
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <code>justify-content: space-between</code> 主軸均分<br/>
✅ <code>align-items: flex-start</code> 設全體靠上預設<br/>
✅ <code>align-self</code> 讓個別子元素覆蓋 — 三個屬性各司其職
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 安裝 Tailwind CSS
# Tailwind CSS Integration

<!--
大功告成！學完了 Flex 神功，今天最後一戰，我們要去借用前端巨人的肩膀——來安裝 Tailwind CSS 框架！
先講一件有趣的事：各位現在看的這份投影片，本身就是用 Tailwind 寫的。
等一下你學會怎麼看 Tailwind 的 class 之後，回頭再看這些頁面，你就會知道每一個排版是怎麼來的。
-->

---

# 什麼是 Tailwind CSS？

Tailwind CSS 是目前最流行的 **Utility-First（原子式）CSS 框架**：

- 提供數千個**單一用途**的小 class，例如 `p-4`（padding）、`flex`（display: flex）
- 直接在 HTML 標籤上組合這些 class，就能拼出完整樣式
- **不需要**自己想 class 名稱、不需要在 `.scss` 檔和 HTML 之間來回跳

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>核心觀念：</b> Tailwind 不給你「做好的按鈕」，而是給你「一盒標準規格的樂高」，讓你自己拼出任何按鈕<br/>
💡 <b>官方網站：</b> <code>tailwindcss.com</code> — 所有 class 都可以在官網搜尋查到
</div>

<!--
Tailwind 跟你在網路上看過的其他 CSS 框架，思路完全不一樣。
別的框架是給你「調理包」——一包現成的番茄炒蛋，倒出來就能吃，但味道就是那個味道，你改不了。
Tailwind 給你的是「已經洗好切好、分裝成小盒的食材」——蔥花一盒、蒜末一盒、鹽一小包。
你還是要自己炒，但你不用洗菜切菜，而且你想炒成什麼口味都可以。
這就是「Utility-First（原子式）」的意思：每一個 class 只做一件事，小到不能再小，所以叫「原子」。
`p-4` 就只負責 padding，`flex` 就只負責 display: flex，`bg-blue-500` 就只負責背景色。
你把這些原子組合起來，就能拼出任何你想要的樣式。
-->

---

# 為什麼要用 Tailwind？

從零手寫 vs. 使用 Tailwind 的差距：

<div style="display: flex; gap: 2rem; margin-top: 0.8rem;">
  <div style="flex: 1; padding: 1rem; background: #fef3f2; border-radius: 8px; border: 1px solid #fca5a5;">
    <div style="font-weight: bold; margin-bottom: 0.6rem; color: #dc2626;">❌ 從零手寫按鈕</div>
    <pre style="font-size: 0.7rem; margin: 0; line-height: 1.5; color: #374151;">&lt;!-- HTML --&gt;
&lt;button class="my-btn"&gt;送出&lt;/button&gt;
/* 還要跳到 .scss 檔寫 */
.my-btn {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  &amp;:hover { background-color: #2563eb; }
}</pre>
  </div>
  <div style="flex: 1; padding: 1rem; background: #f0fdf4; border-radius: 8px; border: 1px solid #86efac;">
    <div style="font-weight: bold; margin-bottom: 0.6rem; color: #16a34a;">✅ 用 Tailwind</div>
    <pre style="font-size: 0.78rem; margin: 0; line-height: 1.5; color: #374151;">&lt;button class="bg-blue-500 text-white
  px-4 py-2 rounded-md
  hover:bg-blue-600"&gt;
  送出
&lt;/button&gt;</pre>
    <div style="margin-top: 0.8rem; font-size: 0.85rem; color: #374151;">結果完全相同，而且不用開第二個檔案</div>
  </div>
</div>

<!--
大家看這個對比，重點不是「右邊字比較少」，而是**右邊你只需要看一個檔案**。
左邊那種寫法，你寫 HTML 的時候要想一個 class 名字，然後跳到 SCSS 檔去寫樣式，改一次樣式就要在兩個檔案之間跳來跳去。
更痛苦的是：三個月後你回來看這個專案，看到 `.my-btn` 這個 class，你完全不知道它長什麼樣，一定要去翻 SCSS 檔才知道。
而 Tailwind 的寫法，你看 HTML 就知道它是藍底、白字、圓角、滑鼠移上去會變深藍。所見即所得。
還有一個隱形好處：你再也不用替 class 取名字了。
不要笑，「幫 class 取名字」是前端工程師公認最花時間的事情之一，`.card`、`.card-inner`、`.card-inner-wrapper`⋯⋯取到最後自己都亂掉。
-->

---

# 兩種 CSS 框架流派

市面上的 CSS 框架分成兩大流派，思路完全不同：

| | 元件式（Component-First） | 原子式（Utility-First） |
| --- | --- | --- |
| 代表 | Bootstrap、Angular Material | **Tailwind CSS** |
| 給你什麼 | 做好的元件 | 標準規格的小工具 |
| 寫法 | `class="btn btn-primary"` | `class="bg-blue-500 px-4 py-2 rounded"` |
| 優點 | 上手最快，一行就有完整按鈕 | 完全自由，做得出任何設計 |
| 缺點 | 想客製化就要跟框架打架 | class 較長，要記一些命名規則 |

<div class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>兩者可以並存：</b>本課程後半段會使用 <b>Angular Material</b>（元件式）處理表格、對話框等複雜元件，同時用 Tailwind 處理排版與間距——這也是業界常見的組合
</div>

<!--
這兩個流派沒有誰對誰錯，它們解決的是不同的問題。
元件式框架適合「我要的東西跟大家都一樣」——後台管理系統的按鈕、表格，長什麼樣其實不重要，能用就好，這時候元件式框架快得驚人。
原子式框架適合「我要的東西有自己的樣子」——公司有品牌識別、設計師給了設計稿，你必須做得跟設計稿一模一樣，這時候元件式框架反而變成阻礙，你會花大量時間在「覆蓋」框架原本的樣式。
業界現在最常見的組合，其實是兩個一起用：
複雜的元件（日曆、表格、對話框）用 Angular Material，因為自己刻要刻到天荒地老；
版面排版、間距、顏色用 Tailwind，因為這些本來就該跟著設計稿走。
我們這門課後面就會這樣做，各位到時候會親身體會。
-->

---

# Tailwind class 命名規則

Tailwind 的 class 命名非常有規律，記住規則就不用一個一個背：

| 類別 | 格式 | 範例 |
| --- | --- | --- |
| 間距 | `{屬性}-{數字}` | `p-4`（padding: 1rem）、`mt-2`（margin-top: 0.5rem） |
| 顏色 | `{屬性}-{色名}-{深淺}` | `bg-blue-500`、`text-red-600`、`border-gray-300` |
| 尺寸 | `w-` / `h-` | `w-full`（100%）、`h-screen`（100vh）、`w-64` |
| 字級 | `text-{尺寸}` | `text-sm`、`text-lg`、`text-3xl` |
| 圓角 / 陰影 | `rounded-` / `shadow-` | `rounded-md`、`shadow-lg` |
| 互動狀態 | `{狀態}:{class}` | `hover:bg-blue-600`、`active:scale-95` |

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>間距數字換算：</b>數字 × <code>0.25rem</code>（= 4px）。所以 <code>p-4</code> 是 16px、<code>p-2</code> 是 8px
</div>

<!--
很多人第一次看到 Tailwind 會嚇到：「這麼多 class 我要怎麼記？」
放心，你不用記，因為它極度有規律。
間距最好懂：數字乘以 4 就是 px。`p-4` 是 16px，`p-2` 是 8px，`mt-1` 是 4px。為什麼是 4 的倍數？因為業界的設計稿幾乎都用 4 或 8 的倍數在排間距，這樣視覺才會整齊。
顏色是「屬性-色名-深淺」，深淺從 50（最淺）到 950（最深），500 是標準色。所以 `bg-blue-500` 就是標準藍底，`bg-blue-50` 是很淡的藍。
最漂亮的是互動狀態：還記得我們今天前半段學的 `:hover` 嗎？在 Tailwind 裡就是把 `hover:` 貼在任何 class 前面。
`hover:bg-blue-600` 就等於「滑鼠移上去時背景變深藍」。你不用再另外寫一段 SCSS。
真的記不起來也沒關係，官網搜尋框打你想要的 CSS 屬性，它就會告訴你對應的 class。
-->

---

# Tailwind 的 Flexbox class

今天前半段學的 Flexbox，在 Tailwind 裡全部都有對應的 class：

| CSS 寫法 | Tailwind class |
| --- | --- |
| `display: flex` | `flex` |
| `flex-direction: column` | `flex-col` |
| `justify-content: center` | `justify-center` |
| `justify-content: space-between` | `justify-between` |
| `align-items: center` | `items-center` |
| `flex: 1` | `flex-1` |
| `gap: 8px` | `gap-2` |

```html
<!-- 水平置中 + 垂直置中 + 間距 8px -->
<div class="flex justify-center items-center gap-2">
  <div class="flex-1">左</div>
  <div class="flex-1">右</div>
</div>
```

<!--
看到這張表，大家應該就懂為什麼我把 Tailwind 排在 Flexbox 後面教了。
Tailwind 的 class 幾乎就是 CSS 屬性的縮寫。你今天學會的每一個 Flexbox 屬性，在這裡都有一個對應的短名字。
`justify-content: center` 變成 `justify-center`，`align-items: center` 變成 `items-center`。
所以請大家一定要記住一件事：**Tailwind 不是一套新的東西，它只是 CSS 的縮寫**。
如果你 CSS 底子不好，Tailwind 對你來說就是一堆看不懂的咒語；
但你今天把 Flexbox 學紮實了，Tailwind 對你來說就只是「換個寫法」，五分鐘就上手。
這也是為什麼我堅持先教三堂課的原生 CSS，才讓你們碰框架。
-->

---

# Angular 專案安裝 Tailwind — 步驟

| 步驟 | 操作 |
| --- | --- |
| ① | 在終端機（專案根目錄）執行 `npm i tailwindcss @tailwindcss/postcss postcss` |
| ② | 在專案根目錄新增 `.postcssrc.json` 檔 |
| ③ | 在 `src/styles.scss` 最上方加入一行 `@use "tailwindcss";` |
| ④ | 重啟專案 |

```json
// .postcssrc.json（與 package.json 同一層）
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

```scss
// src/styles.scss — 加在檔案最上方
@use "tailwindcss";
```

<!--
只有四個步驟，我們一個一個看。
第一步，`npm i` 一次裝三個套件：Tailwind 本體、它的 PostCSS 外掛、還有 PostCSS 本身。
第二步，在專案根目錄——注意是跟 `package.json` 同一層，不是在 src 裡面——新增一個叫 `.postcssrc.json` 的檔案。
這個檔名前面有一個點，不要漏掉。它的作用是告訴 Angular 的建置系統：「你在打包 CSS 的時候，記得先讓 Tailwind 處理一遍。」
第三步，打開 `src/styles.scss`，在最上面加一行 `@use "tailwindcss";`。這行的意思是「把 Tailwind 的所有樣式引進來」。
第四步，**一定要重新啟動開發伺服器**！設定檔只在專案啟動時讀取一次，不重啟就看不到效果。
裝好之後，你在任何 HTML 標籤上寫 `class="text-3xl font-bold"`，字就會立刻變大變粗。
-->

---

# 安裝時的三個常見錯誤

<div style="display: flex; flex-direction: column; gap: 0.7rem; margin-top: 0.6rem;">
  <div style="padding: 0.8rem; background: #fef3f2; border-radius: 8px; border: 1px solid #fca5a5;">
    <div style="font-weight: bold; color: #dc2626; margin-bottom: 0.3rem;">❌ 在 <code>.scss</code> 檔裡寫 <code>@import "tailwindcss";</code></div>
    <div style="font-size: 0.86rem; color: #374151;">官方文件寫的是 <code>@import</code>，但那是給 <code>.css</code> 檔用的。我們的專案是 SCSS，要用 <code>@use</code>，否則會出現 <code>Sass @import rules are deprecated</code> 警告</div>
  </div>
  <div style="padding: 0.8rem; background: #fef3f2; border-radius: 8px; border: 1px solid #fca5a5;">
    <div style="font-weight: bold; color: #dc2626; margin-bottom: 0.3rem;">❌ 執行 <code>npx tailwindcss init</code> 產生 <code>tailwind.config.js</code></div>
    <div style="font-size: 0.86rem; color: #374151;">那是 <b>Tailwind v3</b> 的做法。網路上大部分教學還停在 v3。<b>v4 不需要設定檔</b>，做了反而多餘</div>
  </div>
  <div style="padding: 0.8rem; background: #fef3f2; border-radius: 8px; border: 1px solid #fca5a5;">
    <div style="font-weight: bold; color: #dc2626; margin-bottom: 0.3rem;">❌ 跑去改 <code>angular.json</code> 的 <code>styles</code> 陣列</div>
    <div style="font-size: 0.86rem; color: #374151;">Tailwind 是透過 PostCSS 掛進建置流程，不是當成一個 CSS 檔載入，<code>angular.json</code> 完全不用動</div>
  </div>
</div>

<!--
這三個坑，我保證各位至少會踩到一個，所以先講在前面。
第一個坑最容易中：你去 Tailwind 官網照抄，官網寫 `@import "tailwindcss";`，但官網的範例專案用的是純 CSS。
我們的 Angular 專案在建立時選了 SCSS，所以檔案是 `styles.scss`。在 SCSS 裡面，`@import` 是一個即將被淘汰的舊語法，要改用 `@use`。
第二個坑更常見：你 Google「Tailwind Angular 安裝」，跳出來的文章有九成還是 v3 的教學，會叫你跑 `npx tailwindcss init` 產生一個設定檔。
v4 版本已經把設定搬進 CSS 裡了，不需要那個檔案。如果你照做，會發現指令根本跑不起來，然後開始懷疑人生。
第三個坑是我們自己造成的心理慣性：因為安裝其他 CSS 套件時，我們習慣去 `angular.json` 的 styles 陣列登記路徑。
Tailwind 走的是完全不同的機制——它是掛在 PostCSS 這個「CSS 加工廠」上面，在打包過程中自動處理，所以 `angular.json` 一個字都不用改。
-->

---

# 小節練習 — Tailwind class

安裝好 Tailwind 後，請只用 Tailwind class 做出以下元件（不需寫任何 CSS）：

1. 一個**藍色主要按鈕**：藍底、白字、左右 padding 16px、上下 8px、圓角，滑鼠移上去變深藍
2. 一個**紅色危險按鈕**：同上，但底色是紅的
3. 一個**成功提示框**：淺綠底、深綠字、內距 16px、圓角，內容為「操作成功！」

```html
<!-- 試著只用 class 完成，不需要自己寫任何 CSS -->
<div class="flex gap-2">
  <button class="???">主要按鈕</button>
  <button class="???">危險按鈕</button>
</div>
<div class="???">操作成功！</div>
```

<!--
提示：回去看前面那張「命名規則」的表。
間距記得除以 4：16px 就是 4，8px 就是 2。
顏色的標準深度是 500，淺色用 100，深色用 700。
下一頁揭曉。
-->

---

# 小節練習 — Tailwind class — 參考答案

```html
<div class="flex gap-2">
  <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    主要按鈕
  </button>
  <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
    危險按鈕
  </button>
</div>

<div class="bg-green-100 text-green-800 p-4 rounded mt-2">操作成功！</div>
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <code>px-4</code> = 左右 padding 16px、<code>py-2</code> = 上下 padding 8px（4 × 4 = 16、2 × 4 = 8）<br/>
✅ <code>hover:</code> 前綴取代了整段 SCSS 的 <code>&amp;:hover { }</code><br/>
✅ 顏色深淺：<code>100</code> 很淺（適合背景）、<code>500</code> 標準、<code>800</code> 很深（適合文字）
</div>

<!--
大家有沒有發現一件事：這三個元件從頭到尾，我們**一行 CSS 都沒有寫**，也**沒有取任何一個 class 名字**。
特別注意 `hover:bg-blue-600` 這個寫法。
今天課程一開始，我們寫 hover 要先取一個 class 名、跳到 SCSS 檔、寫 `&:hover { background-color: ... }`——總共三個動作。
現在只要在 HTML 上加一個前綴，一個動作解決。
最後提醒：`bg-green-100` 配 `text-green-800` 這種「淺底深字」的搭配，是做提示框的萬用公式，同一個色系、一淺一深，對比度剛好，看起來也很專業。
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
另外，今天裝好的 Tailwind 不是裝好看的——從下一章開始的每一個練習，我都會請大家直接用 Tailwind 的 class 來排版，用個幾次你就順了。
下一堂課，我們要依依不捨地告別美麗的視覺化妝秀，準備踏入更燒腦、但也更好玩的「網頁大腦邏輯世界」——JavaScript！大家回去記得把腦力補充好，下堂課我們見！
-->
