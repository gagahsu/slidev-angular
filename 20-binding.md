---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 繫結
routeAlias: ch20
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
    繫結
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「連結 TypeScript 與 HTML 的橋樑」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎來到本章的終極核心課——「資料繫結（Data Binding）」！
之前我們把組件拆成了好多個零件。
但是，要把 TS 裡的變數、方法，跟 HTML 裡的按鈕、輸入框完美同步在一起，
我們就必須藉助 Angular 最強大的魔法——「繫結（Data Binding）」。
這就像是打通了 TS 與 HTML 之間的「神經網路」。
讓資料只要在 TS 裡一改變，網頁畫面就瞬間跟著變；
或者是使用者在網頁上輸入個字，TS 裡的大腦資料就立刻收到！
這堂課我們就把這四條通訊管道，一次搞懂！
-->

---
layout: default
---

# Outline

- **繫結介紹** — 什麼是繫結、四種類型
- **單向 vs 雙向綁定** — 差異比較
- **內嵌繫結** `{{ }}`
- **屬性繫結** `[attr]`
- **事件繫結** `(event)`
- **雙向繫結** `[(ngModel)]`
- **實作練習**

<!--
今天我們的通訊密碼拆解如下：
我們會先認識繫結的基本概念與方向性。
接著，區分什麼是單向綁定，什麼是雙向綁定。
隨後，我們逐一擊破四種綁定法：
雙大括號內嵌繫結、中括號屬性繫結、小括號事件繫結，以及「中括號包小括號」的雙向繫結。
最後，我們會做一個經典的「等級計算機」實作大挑戰！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 認識繫結
# Binding Overview

<!--
第一站，我們先來了解「繫結」的宏觀地圖。
-->

---

# 繫結介紹

繫結（Data Binding）是 Angular 協調 **Component（TypeScript）** 與 **Template（HTML）** 互相傳遞資料的機制。

| 繫結類型 | 語法 | 方向 |
| --- | --- | --- |
| 內嵌繫結 | `{{ 變數 }}` | 單向 TS → HTML |
| 屬性繫結 | `[屬性]="變數"` | 單向 TS → HTML |
| 事件繫結 | `(事件)="方法()"` | 單向 HTML → TS |
| 雙向繫結 | `[(ngModel)]="變數"` | 雙向 TS ↔ HTML |

<!--
什麼是繫結？
簡單來說，這就是一種「管道」。
Angular 一共提供了四種繫結：
第一是「內嵌繫結 `{{ }}`」：把 TS 資料丟給 HTML 顯示文字。
第二是「屬性繫結 `[屬性]`」：把 TS 變數設定到 HTML 的標籤屬性上。
第三是「事件繫結 `(事件)`」：當 HTML 發生動作，通知 TS 去跑方法。
第四是「雙向繫結 `[(ngModel)]`」：兩邊同步同步，誰變了另一邊就跟著變！
大家看一下這個表格，中括號、小括號、或者是兩者混用，這可不是隨便發明的，它代表了資料流動的方向喔！
-->

---

# 單向綁定 vs 雙向綁定

| | 單向綁定 (One-Way Binding) | 雙向綁定 (Two-Way Binding) |
| --- | --- | --- |
| 方向 | TS → HTML（或 HTML → TS） | TS ↔ HTML |
| 包含類型 | 內嵌、屬性、事件繫結 | 雙向繫結 |
| 適用情境 | 純顯示（`<title>`）或純觸發 | 使用者輸入（`<input>`） |
| 特性 | HTML 更新不影響 TS | 任一方改變，另一方同步更新 |

<!--
我們把綁定分成「單向（One-Way）」與「雙向（Two-Way）」。
單向就像是「電視廣播」，或者是「投信箱」。
TS 發廣播，HTML 負責看（內嵌、屬性）；或者是 HTML 按鈕投信，TS 收信（事件）。
而雙向就像是「即時電話聊天」。
你講一句，我聽一句；我回一句，你改一句。
這最常用在 `<input>` 輸入框。
使用者在打字時，大腦變數同步在變，這叫 Two-Way Data Binding，是 Angular 的招牌大絕招！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 四種繫結方式
# Four Binding Types

<!--
好，既然地圖看完了，我們馬上走進細部，逐一看看這四個通訊管道怎麼寫。
-->

---

# 內嵌繫結 Interpolation

在 HTML 中直接顯示 TypeScript 變數值，使用雙大括弧語法。

| 特性 | 說明 |
| --- | --- |
| 語法 | `{{ 變數名稱 }}` |
| 方向 | 單向：TS → HTML |
| 用途 | 顯示文字、數值、表達式 |

```html
<h1>{{ title }}</h1>
<p>等級：{{ level }}</p>
<p>計算結果：{{ 1 + 2 }}</p>
```

<!--
第一種，最常用也最簡單的「內嵌繫結（Interpolation）」。
就是「雙大括號 `{{ 變數名稱 }}`」。
它只能放在 HTML 標籤的中間，用來顯示文字。
甚至你可以在裡面做點簡單的數學運算，比如寫 `{{ 1 + 2 }}`，網頁上就會直接顯示出 3！
-->

---

# 內嵌繫結 — 範例

```typescript
// app.component.ts
export class AppComponent {
  title = '我的 Angular 應用';
  level = 1;
  name = 'Allen';
}
```

```html
<!-- app.component.html -->
<h1>{{ title }}</h1>
<p>玩家：{{ name }}，等級：{{ level }}</p>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 內嵌繫結只能用在標籤的<b>內容</b>（標籤之間），無法直接用在 HTML 屬性值中（例如 <code>src</code>、<code>placeholder</code>）。
</div>

<!--
看程式碼。
我們在 TS 裡宣告了 `title`、`level`、`name`。
在 HTML 裡寫了 `<h1>{{ title }}</h1>`。
當網頁跑起來，瀏覽器就會把這兩個變數的值，活生生地嵌在字裡行間。
大叔特別叮嚀：
**雙大括號只適合放在「標籤內容」位置**！
你絕對不能寫成像 `<img src="{{ imgUrl }}">` 這種屬性設定，這在新版 Angular 裡是不推薦的，屬性我們有專門的中括號寫法！
-->

---

# 屬性繫結 Property Binding

將 TypeScript 變數與 HTML 標籤的**屬性**繫結，屬性名稱需加中括弧。

| 特性 | 說明 |
| --- | --- |
| 語法 | `[屬性名稱]="變數名稱"` |
| 方向 | 單向：TS → HTML |
| 用途 | 動態設定 `src`、`placeholder`、`disabled` 等屬性 |

```html
<!-- 屬性繫結寫法：中括弧，值只能放變數 -->
<input [placeholder]="hintText">

<!-- 傳統寫法：可混用文字與變數（用雙層大括弧包變數） -->
<img src="{{ imgUrl }}">
```

<!--
這就是我們剛剛說的「屬性繫結（Property Binding）」。
只要你想控制 HTML 標籤內部的屬性，比如圖片的 `src`、按鈕的 `disabled`。
語法是：**在中括號 `[]` 裡面填寫屬性名稱，等號後面的引號內，直接寫 TS 的變數名稱**！
例如 `<input [placeholder]="hintText">`。
中括號是在向 Angular 眨眨眼說：「喂！後面引號裡寫的不是一般的純文字，請去 TS 找一個叫 `hintText` 的變數，把它的值灌進來！」
非常重要，千萬不要再用雙大括號去塞屬性值了喔！
-->

---

# 屬性繫結 — 兩種寫法比較

兩種寫法皆可運行，建議依情況選擇最清晰的方式。

| 寫法 | 語法 | 值的來源 | 建議時機 |
| --- | --- | --- | --- |
| 屬性繫結 | `[placeholder]="變數"` | 只能放變數 | ✅ 確定值是變數時 |
| 內嵌屬性 | `src="{{ 變數 }}"` | 可混合文字與變數 | 需要拼接字串時 |

```typescript
// app.component.ts
export class AppComponent {
  hintText = '請輸入姓名';
  imgUrl = 'assets/photo.png';
}
```

<!--
我們把這兩種寫法做個對比。
雖然寫 `src="{{ 變數 }}"` 在某些情況下還行，
但大叔強力建議大家，只要是設定純變數，一律使用標準的 `[src]="變數"`！
代碼看起來乾淨，編譯器解析效率也高。
只有在你要拼接字串的時候，比如 `'assets/' + 變數`，才用雙大括號拼接。
-->

---

# 事件繫結 Event Binding

HTML 事件觸發時，呼叫 TypeScript 中對應的方法。

| 特性 | 說明 |
| --- | --- |
| 語法 | `(事件名稱)="方法名稱()"` |
| 方向 | 單向：HTML → TS |
| 常用事件 | `click`、`input`、`change`、`submit` |

```html
<button (click)="levelUp()">升級</button>
<input (input)="onInput($event)">
```

<!--
第三種，從 HTML 流向 TS 的「事件繫結（Event Binding）」。
語法是：**在小括號 `()` 裡面寫事件名稱，等號後面寫你要執行的方法**。
例如 `(click)="levelUp()"`。
這就是我們上一章學過的按鈕點擊。
小括號代表「抓取事件」，一旦使用者觸發了這個事件，就會把信號射回 TS 大腦，執行對應的方法。
-->

---

# 事件繫結 — 範例

```typescript
// app.component.ts
export class AppComponent {
  level = 1;

  levelUp() {
    this.level++;
  }
}
```

```html
<!-- app.component.html -->
<p>目前等級：{{ level }}</p>
<button (click)="levelUp()">升級</button>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>提示：</b> 事件繫結的方法後面要加 <code>()</code>，表示「呼叫」該方法，而非傳入方法參考。
</div>

<!--
看範例程式碼。
我們在 HTML 寫了 `<button (click)="levelUp()">升級</button>`。
點擊按鈕，呼叫 `levelUp()`。
TS 裡執行 `this.level++`，等級加 1。
因為 `level` 變數跟上面的 `{{ level }}` 內嵌繫結綁定在一起，
所以當 `level` 一加，畫面上的「目前等級：2」就會瞬間同步變高！
這就是單向繫結互相搭配的經典化學反應！
-->

---

# 雙向繫結 Two-Way Binding

TS 變數與 HTML 輸入元素同步更新，不管哪邊改變另一邊都會跟著更新。

| 特性 | 說明 |
| --- | --- |
| 語法 | `[(ngModel)]="變數名稱"` |
| 方向 | 雙向：TS ↔ HTML |
| 適用元素 | `<input>`、`<select>`、`<textarea>` |
| 前置條件 | 需匯入 `FormsModule` |

```html
<input [(ngModel)]="username">
<p>您輸入：{{ username }}</p>
```

<!--
最後是壓軸的「雙向繫結（Two-Way Binding）」。
大叔教大家一個超好記的口訣，這叫做「香蕉在盒子裡（Banana in a Box）」！
你看那個括號：`[ ( ) ]`。
是不是很像一根彎彎的香蕉 `()`，被裝在一個正方形的盒子 `[]` 裡面？
這個香蕉盒子就是 `[(ngModel)]`！
當你在 input 標籤寫了 `[(ngModel)]="username"`。
只要你在輸入框打一個 A，TS 裡的 `username` 變數就瞬間變成 A。
只要你在 TS 裡把 `username` 改成 B，輸入框裡面的字就自動擦掉變成 B！
這在填寫表單時，簡真是救命神器！
-->

---

# 雙向繫結 — 匯入 FormsModule

使用 `ngModel` 前，必須將 `FormsModule` 加入元件的 `imports` 陣列，否則 HTML 會報錯「無法識別 ngModel 屬性」。

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  username = '';
}
```

<!--
但是，在 Angular 裡使用香蕉盒子有一個非常傲嬌的前提：
**你必須先在你的 TS 檔案裡，把 `FormsModule` 匯進去**！
因為 `ngModel` 不是 HTML 原生的，它是 Angular 表單模組提供的高級功能。
如果你不加 `imports: [FormsModule]`，你的專案在編譯時就會直接噴紅字，大罵說他不認識 `ngModel` 喔！
初學者最常在這裡卡住，記得一定要檢查 imports 列表！
-->

---

# 雙向繫結 — 完整範例

```typescript
// app.component.ts
import { FormsModule } from '@angular/forms';

@Component({ standalone: true, imports: [FormsModule] })
export class AppComponent {
  inputLevel = 1;

  updateStats() {
    // 依 inputLevel 重新計算攻擊力與防禦力
  }
}
```

```html
<input [(ngModel)]="inputLevel" type="number">
<button (click)="updateStats()">修改等級</button>
<p>等級：{{ inputLevel }}</p>
```

<!--
這是個完整的雙向繫結與事件繫結組合範例。
我們用 `[(ngModel)]="inputLevel"` 綁定輸入框。
當使用者在輸入框裡改了數字，按下「修改等級」按鈕，
按鈕觸發 `updateStats()`。
TS 就能直接調用已經同步好的 `this.inputLevel` 進行數值運算。
整個流程非常絲滑！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 實作練習
# Practice

<!--
好，四大繫結神功全部傳授完畢！我們馬上來實作一個好玩的「等級計算機」！
-->

---
layout: two-cols
---

# 練習 1：等級計算機
### 任務說明

1. 顯示目前**等級**、**攻擊力**、**防禦力**
2. **升級按鈕**：等級 +1，攻擊力 = 等級 × 3，防禦力 = 等級 × 2
3. **輸入框**：可直接輸入目標等級（使用雙向繫結）
4. **修改等級按鈕**：依輸入框的等級重新計算攻擊力與防禦力
5. **重置按鈕**：等級、攻擊力、防禦力恢復至 1 等（攻擊 3、防禦 2）

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/20-binding/practice-1.png" class="rounded shadow-md max-h-80" />
</div>

<!--
今天的任務是做出一個「等級計算機」：
畫面要顯示目前的等級、攻擊力、防禦力。
有三個按鈕：
第一是「升級」：點擊後等級 +1，攻擊力與防禦力按比例增加。
第二是「修改等級」：使用者在輸入框輸入指定數字，點擊按鈕，等級立刻跳到該數字。
第三是「重置」：全部回歸 1 等。
輸入框要用雙向繫結，按鈕要用事件繫結。
這個練習把我們今天學到的所有繫結全部融會貫通了，大家加油！
-->

---
layout: default
---

# 練習 1：解題提示
### 提示說明

1. 宣告四個變數：`level = 1`、`attack = 3`、`defense = 2`、`inputLevel = 1`
2. **升級方法**：`level++`，然後 `attack = level * 3; defense = level * 2`
3. **修改等級方法**：`level = this.inputLevel`，再重新計算攻擊與防禦
4. **重置方法**：`level = 1; attack = 3; defense = 2`
5. 輸入框使用 `[(ngModel)]="inputLevel"` 進行雙向繫結
6. 三個按鈕各用 `(click)` 事件繫結對應方法

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>記得</b> 在 <code>imports</code> 加入 <code>FormsModule</code> 才能使用 <code>[(ngModel)]</code>
</div>

<!--
大叔來給大家做個溫馨提示：
第一步，先在 TS 裡宣告變數 `level = 1`、`attack = 3`、`defense = 2` 和用來綁定輸入框的 `inputLevel = 1`。
第二步，把 `FormsModule` 匯入 `imports: [FormsModule]`。
第三步，在 HTML 輸入框用 `[(ngModel)]="inputLevel"` 綁定。
第四步，三個按鈕分別綁定 `(click)` 事件去呼叫你的計算方法。
只要邏輯通了，寫起來非常順手！
-->

---
layout: two-cols
---

# 練習 2：等級計算機加強版
### 任務說明

1. **UI 美化**：排版成較美觀的版面（可使用 Bootstrap 或自訂 CSS）
2. **新增降級功能**：點擊降級按鈕，等級 -1
3. **等級下限判斷**：等級不可小於 1（降級時需判斷）

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/20-binding/practice-2.png" class="rounded shadow-md max-h-80" />
</div>

<!--
如果練習一做完了，我們來做個「加強版挑戰」：
第一，新增一個「降級」按鈕，點擊後等級 -1，並重新計算攻防。
第二，防呆機制！等級不能小於 1。
如果你降級降到 1，就不能再降了，你可以利用屬性繫結控制降級按鈕的 `[disabled]` 狀態！
第三，用 Table 和簡單的樣式，把整個介面排得體面好看一點。
這題能直接考驗你利用屬性繫結做防呆的功力，試試看！
-->

---
layout: default
---

# 練習 2：解題提示
### 提示說明

1. 在練習 1 基礎上新增 `levelDown()` 方法
2. 降級前判斷：`if (this.level > 1) { this.level--; ... }`
3. 攻擊與防禦計算邏輯不變
4. UI 美化建議：
   - 使用 Bootstrap `card` 包覆整體內容
   - 用 `btn-success` / `btn-danger` 區分升降按鈕顏色
   - 數值統計用 `<table>` 呈現

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>降級防呆：</b> 可在降級按鈕加 <code>[disabled]="level &lt;= 1"</code> 來禁用按鈕
</div>

<!--
大叔來指引降級防呆的寫法：
在 TS 中定義 `levelDown()`，在裡面寫 `if (this.level > 1) { this.level--; ... }`。
更高級的玩法是在 HTML 的降級按鈕上，
寫 `[disabled]="level <= 1"`！
這樣一來，只要等級降到 1，按鈕就會自動變成灰色、無法點擊。
使用者連點都點不下去，這才是最優雅、最不容易出錯的 UI 交互體驗！
大家都寫出來了嗎？
-->

---
layout: end
---

# 課程結束
### 掌握四種繫結，讓 Angular 資料流動起來

<!--
恭喜大家！成功征服了 Angular 資料流動的核心——「四類繫結」！
現在的你，已經有能力寫出一個前後端完全對接、交互靈活的實用網頁了。
回去把這四種綁定方式，特別是香蕉盒子與小老鼠匯入，再複習幾次。
我們的技術基礎篇到這裡就全部告一段落了！
回去好好休息，下一堂課開始，我們要正式跨入更精彩的專案實戰階段！大家辛苦了，我們下堂課見！
-->
