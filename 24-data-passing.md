---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 資料傳遞
routeAlias: ch24
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
    資料傳遞
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「讓頁面與元件之間溝通無阻」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎回來！
上一章我們學會了用「路由」把網頁分成好幾個房間，讓使用者能在不同的網址之間跑來跑去。
但是，這時候遇到了一個非常尷尬的狀況：
「大叔，我在首頁讓使用者填好了他的名字，結果他一走到下一頁，剛剛填的名字直接人間蒸發！這是失憶症嗎？」
沒錯！因為在單頁應用裡，切換頁面時，原來的元件會被直接銷毀（Destroy）。
所以，今天我們要來學習如何打通各頁面與各積木之間的「通訊管道」，讓資料可以跨頁面、跨父子積木自由飛翔！
-->

---
layout: default
---

# Outline

- **路由資料傳遞** — 使用 Service 在頁面間共享資料
- **建立 Service** — 指令、預設內容、宣告共用變數
- **頁面傳遞資料** — 跨頁面存取 Service 中的值
- **組件傳遞資料** — 為什麼需要 @Input / @Output
- **@Input** — 父元件傳值給子元件
- **@Output** — 子元件觸發父元件方法
- **實作練習**

<!--
今天我們的通訊建置作戰計畫如下：
首先，了解為什麼需要 `Service` 服務，並動手建立它。
接著，看怎麼用 Service 當作中央轉運站，把資料從 A 頁送往 B 頁。
然後，我們會轉向組件內部的通訊：學習把資料傳進子元件的 `@Input` 絕招，以及子元件向外發送通知的 `@Output` 絕招。
最後，透過兩道組件傳值的實作題，讓我們完全掌握父子通訊的奧義！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 路由資料傳遞
# Route Data Sharing

<!--
第一站，我們先來解決「跨路由頁面（沒有父子關係）」的通訊痛點。
-->

---

# 為什麼需要 Service？

切換路由時，若需要將 A 頁面的資料傳給 B 頁面，但 B 頁面無法直接呼叫 A 頁面的資料。

| 問題 | 說明 |
| --- | --- |
| 路由切換 | A 頁面的元件實例已被銷毀，B 頁面無法存取 |
| 解決方式 | 建立 **Service** 作為中介儲存空間 |
| Service 特性 | 每個頁面都可以注入並讀取其中的資料 |

**Service 不只能放變數，也能放多個頁面共用的方法。**

<!--
你想想看，今天我們點擊路由從第一頁切換到第二頁。
因為第一頁的元件已經被卸載、銷毀了，所以第二頁根本抓不到第一頁大腦裡的變數。
這時候，我們就需要一個「中央轉運倉庫」——也就是 `Service`（服務）！
這個服務是個「Singleton 單例」，也就是在整個網頁運行期間，不管你怎麼換頁，這個倉庫永遠只有一間，而且永遠不會倒塌。
第一頁把貨物（資料）寄存在倉庫，第二頁進來直接去倉庫提貨。
這樣，跨頁面傳值就輕輕鬆鬆搞定了！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 建立 Service
# Create a Service

<!--
既然知道倉庫的好處，我們馬上用 CLI 指令，在專案裡蓋一間轉運倉庫吧！
-->

---

# 建立 Service — 指令

建議在 `src` 目錄下新增 `@services` 資料夾統一管理所有 Service 檔案（一個專案可能有多個）。

```bash
# 指令格式
ng g s 檔案路徑/檔案名稱

# 範例：在 @services 資料夾中建立 example service
ng g s @services/example
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 檔案名稱<b>不需要</b>加 <code>.service.ts</code>，Angular CLI 會自動加上後綴，產生 <code>example.service.ts</code>。
</div>

<!--
怎麼建 Service 呢？
我們打開終端機，輸入 `ng generate service @services/example`，或者是縮寫 `ng g s @services/example`。
大叔這裡習慣把所有的服務檔案，通通丟進一個叫 `@services` 的資料夾裡統一管理。
注意喔！你打指令的時候，後面「不需要寫 .service.ts」，Angular 會自動幫你把後綴補齊。
-->

---

# Service 預設內容

建立後，`example.service.ts` 的預設內容如下：

```typescript
// @services/example.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

}
```

`providedIn: 'root'` 表示這個 Service 在整個應用程式中只有一個實例（Singleton），所有頁面共用同一份資料。

<!--
產生好檔案後，我們打開它。
你會看到最上面有一個用小老鼠開頭的 `@Injectable` 裝飾器。
裡面寫著 `providedIn: 'root'`。
這行意思就是：「全專案的人，都可以隨時進來使用我這個倉庫！」
有了這個設定，我們就不需要手動在各個地方實例化它，Angular 會自動在背景幫我們管理這個唯一的倉庫實例。
-->

---

# Service 中宣告共用變數

在 Service 中宣告需要傳遞的變數，建議命名與原頁面變數相同以方便識別。

```typescript
// @services/example.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExampleService {
  userName: string = '';
}
```

以此例：A 頁面（`first.component.ts`）要將 `userName` 傳給 B 頁面（`second.component.ts`），就在 Service 中同樣宣告 `userName`。

<!--
既然倉庫蓋好了，我們要怎麼用呢？
很簡單，我們在 Service 的 class 肚子裡宣告變數，比如 `userName: string = ''`。
這就是我們要在 A 頁和 B 頁之間傳遞的貨物。
只要把這個變數準備好，轉運站就正式開始營業囉！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 頁面傳遞資料
# Pass Data Between Pages

<!--
現在，我們就來演練一下「A 頁寄貨、B 頁收貨」的完整物流流程。
-->

---

# 傳遞資料 — 塞值到 Service

在 **A 頁面（發送方）** 注入 Service，並將資料塞入 Service 的變數。

```typescript
// first.component.ts
import { ExampleService } from '../@services/example.service';

export class FirstComponent {
  constructor(private exampleService: ExampleService) {}

  sendData() {
    this.exampleService.userName = 'Allen';
  }
}
```

此時 Service 中的 `userName` 就等於 `'Allen'`。

<!--
首先是 A 頁（寄貨方）。
我們在 `first.component.ts` 的 constructor 括號裡，寫上 `private exampleService: ExampleService`。
這代表我們把倉庫的鑰匙（注入服務）拿到手了。
接著在送出方法裡，直接寫 `this.exampleService.userName = 'Allen'`。
看！我們直接把貨物塞進了倉庫的置物櫃裡。
A 頁的任務到此圓滿完成！
-->

---

# 取出資料 — 從 Service 讀值

在 **B 頁面（接收方）** 同樣注入 Service，直接讀取其中的變數值。

```typescript
// second.component.ts
import { ExampleService } from '../@services/example.service';

export class SecondComponent {
  userName: string = '';

  constructor(private exampleService: ExampleService) {
    this.userName = this.exampleService.userName;
  }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 需確認 A 頁面已將資料塞入 Service 後，B 頁面才能讀到正確值（時序問題）。
</div>

<!--
再來是 B 頁（收貨方）。
同樣地，在 `second.component.ts` 的 constructor 注入同一個服務。
接著，我們在大腦初始化時，直接寫 `this.userName = this.exampleService.userName`。
這就是在從置物櫃裡把貨物拿出來，灌給自己的變數！
這樣，使用者就能在第二頁看到剛剛在第一頁填的 'Allen' 了。
大叔特別提醒：這招非常適合在「登入後存取 Token」或是「多步驟結帳表單」使用喔！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 組件傳遞資料
# Component Data Passing

<!--
「大叔，那如果我的子積木就嵌套在父網頁裡面，我也要大費周章去建一個 Service 倉庫嗎？」
問得好！如果元件有親近的「父子血緣關係」，我們有更直接、更即時的通訊絕招。
那就是 `@Input` 和 `@Output`！
-->

---

# 為什麼需要 @Input / @Output？

在頁面中使用子元件時，Service 無法即時反映資料更新：

| 傳遞方式 | 即時更新 | 適用情境 |
| --- | --- | --- |
| Service | ❌ 只讀一次，不即時更新 | 路由頁面之間傳遞 |
| @Input | ✅ 父元件變數更新時即時同步 | 父元件 → 子元件（傳入資料） |
| @Output | ✅ 子元件觸發時即時回傳 | 子元件 → 父元件（回傳事件） |

<!--
為什麼有父子關係的積木不用 Service？
因為 Service 雖然能存值，但它沒辦法「即時廣播」。
如果父網頁的輸入框字變了，用 Service 傳遞，子積木是不知道要重新讀取的。
而 `@Input` 和 `@Output` 就像是接在父子積木之間的一根「傳聲筒」。
父網頁的資料一變，子元件的接收端（@Input）會在一毫秒內同步更新！
子元件發生點擊，也能立刻用事件（@Output）震動傳回給父網頁。
這兩招是元件化開發的最核心必修課！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# @Input
# Pass Data Into Component

<!--
首先，我們先來學習「父傳子」的專屬標記：`@Input`！
-->

---

# @Input — 子元件宣告

在**子元件**中宣告接收用變數，並加上 `@Input` 裝飾器與匯入。

```typescript
// second.component.ts（子元件）
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-second',
  standalone: true,
  templateUrl: './second.component.html',
})
export class SecondComponent {
  @Input() value: string = '';
}
```

```html
<!-- second.component.html -->
<p>接收到的值：{{ value }}</p>
```

<!--
要讓子元件能夠收錢、收資料，它必須自己先安裝一個「接收天線」。
我們在子元件（SecondComponent）的 TS 檔案中，
匯入 `Input`，並在變數前方加上 `@Input()` 裝飾器。
例如 `@Input() value: string = ''`。
這樣就是在對外宣告：「大家聽好，我身上多了一個叫 value 的插孔，歡迎大家把資料插進來！」
子元件的 HTML 就可以直接用雙大括號 `{{ value }}` 來顯示這個隨時會變的值了。
-->

---

# @Input — 父元件使用

在**父元件**的 HTML 中，使用子元件標籤並加上 `[變數名稱]="父元件變數"` 綁定。

```typescript
// first.component.ts（父元件）
export class FirstComponent {
  parentName = 'Allen';
}
```

```html
<!-- first.component.html -->
<app-second [value]="parentName"></app-second>
```

當 `parentName` 更新時，子元件的 `value` 也會即時同步更新。

<!--
那父元件要怎麼把資料塞進去呢？
在父元件的 HTML 裡面，我們呼叫子元件標籤 `<app-second>`。
並且在中括號裡，寫上子元件的插孔名字：`[value]="parentName"`。
這行意思就是：「把父元件 TS 裡的 `parentName` 變數值，源源不斷地灌進子元件的 `value` 插孔！」
只要父元件的 `parentName` 一變，子元件的畫面就立刻同步，不需要寫任何額外的 JS 監聽，非常方便！
-->

---
layout: two-cols
---

# 練習 1：@Input 練習
### 任務說明

1. 建立父頁面（A）與子元件（B）
2. 父頁面有三個輸入欄位
3. 子元件即時顯示父頁面輸入的內容
4. 三個欄位同步更新

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/22-data-passing/practice-1.png" class="rounded shadow-md max-h-80" />
</div>

<!--
我們馬上來做第一個練習：
請在父頁面放三個輸入框（姓名、年齡、職稱）。
然後在父元件裡放上子元件的積木標籤。
子元件要用三個天線 `@Input` 接收這三個值，並且在畫面上把這三個值即時排版印出來。
這題主要是訓練大家對於多個 Input 傳參綁定的手感！
-->

---
layout: default
---

# 練習 1：解題提示
### 提示說明

1. 子元件宣告三個 `@Input` 變數（對應三個欄位）
2. 父元件宣告三個變數，各用 `[(ngModel)]` 與輸入框雙向繫結
3. 父元件 HTML 中的子元件標籤：
   ```html
   <app-second [name]="name" [age]="age" [title]="title">
   </app-second>
   ```
4. 子元件 HTML 中用 `{{ name }}`、`{{ age }}`、`{{ title }}` 顯示

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 父元件需匯入 <code>FormsModule</code>（雙向繫結用）與 <code>SecondComponent</code>（子元件用）。
</div>

<!--
大叔給大家點出核心思路：
子元件的 TS 要寫三個帶有 `@Input()` 裝飾器的變數。
父元件在 HTML 呼叫子元件時，要連寫三個中括號綁定，像是 `[name]="name" [age]="age" [title]="title"`。
還有，別忘了在父元件的 TS 匯入子元件的 class，並且在 HTML 輸入框加上 `[(ngModel)]` 雙向綁定。
小括號、中括號要分清楚喔。
只要這幾條線連上了，你在父網頁打字，子元件的卡片就會即時亮起來！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# @Output
# Pass Data Out of Component

<!--
「大叔，那如果我想在子元件裡放個按鈕，點了之後通知父元件，該怎麼辦？」
這就是反向傳遞的絕招——`@Output`！
-->

---

# @Output — 子元件宣告

在**子元件**中宣告 `output<T>()` 變數，當需要回傳資料或觸發父元件動作時使用。

```typescript
// second.component.ts（子元件）
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-second',
  standalone: true,
  templateUrl: './second.component.html',
})
export class SecondComponent {
  changeUserName = output<string>();
}
```

<!--
如果說 `@Input` 是接收天線，那麼 `@Output` 就是「發射電台（Emitter）」。
在新版的 Angular 中，我們宣告一個輸出變數，寫成：
`changeUserName = output<string>()`。
這個 `output<string>()` 是一個泛型，括號裡的 string 代表這個發射台等一下要發射出去的資料型態是字串。
準備好這個發射台之後，子元件就可以在需要的時候發送信號了。
-->

---

# @Output — 子元件觸發

在子元件的方法中，使用 `.emit()` 回傳值給父元件。

```typescript
// second.component.ts（子元件）
export class SecondComponent {
  changeUserName = output<string>();
  inputName = '';

  emitName() {
    this.changeUserName.emit(this.inputName);
  }
}
```

```html
<!-- second.component.html -->
<input [(ngModel)]="inputName">
<button (click)="emitName()">送出</button>
```

<!--
怎麼發射呢？
在子元件的 TS 方法裡，我們呼叫：
`this.changeUserName.emit(this.inputName)`。
那個 `.emit()` 就是「發送訊號」的意思。
我們把子元件輸入框裡的 `inputName` 當作砲彈，用這個發射台轟炸出去。
這時候子元件的任務就完成了，它只管發射，不管誰來接收。
-->

---

# @Output — 父元件接收

在父元件的子元件標籤上，用 `(output變數名稱)="父元件方法($event)"` 監聽並接收回傳值。

```html
<!-- first.component.html -->
<app-second (changeUserName)="onNameChanged($event)"></app-second>
<p>收到的名稱：{{ receivedName }}</p>
```

```typescript
// first.component.ts（父元件）
export class FirstComponent {
  receivedName = '';

  onNameChanged(name: string) {
    this.receivedName = name;
  }
}
```

<!--
那父元件要怎麼攔截這枚砲彈呢？
在父元件的 HTML 呼叫子元件標籤時，
我們在小括號裡監聽這個發射台：`(changeUserName)="onNameChanged($event)"`。
**特別注意！那個 `$event` 是 Angular 的保留字**，代表子元件剛剛用 `.emit()` 射出來的那顆砲彈（資料）！
當訊號一進來，父元件就會執行 `onNameChanged` 方法，並把 `$event` 裡帶過來的字串塞給自己的變數。
這樣就完成了精準的「子傳父」通訊！
-->

---
layout: two-cols
---

# 練習 2：@Output 練習
### 任務說明

1. 子元件（B）有一個輸入框與一個按鈕
2. 按下按鈕後，將值輸出給父頁面（A）
3. 父頁面（A）接收到值後顯示

::right::

<div class="flex items-center justify-center h-full ml-10">
  <img src="/images/22-data-passing/practice-2.png" class="rounded shadow-md max-h-80" />
</div>

<!--
好，馬上進行 Output 的實戰：
請在子元件裡放一個輸入框跟送出按鈕。
點按鈕時，用 `output` 把字串射出去。
父頁面監聽這個事件，並在收到資料後，把收到的字印在根畫面上。
這題考驗的是你對事件監聽與 `$event` 保留字取值的能力！
-->

---
layout: default
---

# 練習 2：解題提示
### 提示說明

1. 子元件宣告 `output<string>()` 變數與 `inputValue` 變數
2. 子元件按鈕 `(click)` 呼叫方法，方法中執行 `.emit(this.inputValue)`
3. 父元件 HTML 監聽子元件的 output：
   ```html
   <app-second (myOutput)="onReceive($event)"></app-second>
   ```
4. 父元件宣告接收變數，在 `onReceive()` 方法中賦值

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>記得</b> 子元件需匯入 <code>FormsModule</code>（雙向繫結用），父元件需匯入子元件。
</div>

<!--
大叔揭曉這題的實作重點：
子元件宣告 `myOutput = output<string>()`，並在按鈕 click 時調用 `this.myOutput.emit(this.inputValue)`。
父元件在 HTML 寫上 `(myOutput)="onReceive($event)"`。
在 TS 大腦裡寫 `onReceive(event: string) { this.receivedValue = event; }`。
只要多寫幾次，這種「子元件 emit，父元件 event 接收」的黃金公式就會變成你的反射動作了！
-->

---
layout: end
---

# 課程結束
### 掌握 Service、@Input、@Output，讓元件之間資料自由流通

<!--
恭喜大家！成功克服了元件通訊這座前端大山！
到了這一步，你的網頁積木之間再也不是孤島了，不論是隔壁房間的 Service，還是樓上樓下的 Input/Output，全部都通訊自如。
回去把這幾種傳值方式反覆敲打練習。
下一堂課，我們要跨入一個非常實用的主題——「網頁儲存（Web Storage）」，去看看如何把資料存在瀏覽器裡，就算使用者重新整理甚至關掉瀏覽器，資料依然不會消失！大家休息一下，我們等一下見！
-->
