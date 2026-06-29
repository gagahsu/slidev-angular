---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 生命週期
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
    生命週期
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「從建立到銷毀，掌握元件的每個階段」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
各位學員，歡迎回來！
我們之前學會了怎麼寫畫面、宣告變數、還有寫方法來處理點擊事件。
但是，在 Angular 專案裡，有一個非常關鍵的問答題：
「你的元件是什麼時候被生出來的？它在畫面上消失的時候，記憶體裡的資料清乾淨了嗎？你在呼叫 API 撈取資料時，畫面真的已經準備好了嗎？」
為了解答這些問題，今天我們就要來學習 Angular 元件的「出生與死亡歷程」——也就是「生命週期（Lifecycle）」。
掌握生命週期，你才能讓你的程式碼，在「對的時間點，做對的事情」！
-->

---
layout: default
---

# Outline

- **生命週期介紹** — 什麼是 Lifecycle、八個 Hooks 執行順序
- **Constructor 建構式** — 最先執行的階段
- **常用生命週期** — `ngOnInit` 與 `ngAfterViewInit`
- **其餘六個 Hooks** — ngOnChanges、ngDoCheck、AfterContent 系列、AfterViewChecked、OnDestroy
- **引用多個生命週期** — 同時使用多個 Hooks

<!--
今天我們的作戰計畫如下：
我們會先快速瀏覽 Angular 所有的生命週期關卡與執行順序。
接著，我們會分析最早觸發的 `constructor` 建構式。
再來是實務開發中，90% 的時間都會用到的兩大黃金 Hooks：`ngOnInit` 與 `ngAfterViewInit`。
隨後，我們會把其餘六個稍微進階的 Hooks 一起掃描一遍。
最後，我們會看看要在 TS 裡同時引用多個生命週期的正確寫法。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 認識生命週期
# Lifecycle Overview

<!--
第一站，我們先來拉高視野，看看元件的一生會經歷哪些關卡。
-->

---

# 生命週期執行順序

<div class="flex justify-center mt-2">
  <img src="/images/18-lifecycle/lifecycle-hooks.png" class="max-h-80 rounded shadow" />
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>constructor</code>（藍色）是 TypeScript class 特性，<b>不屬於 Angular Hook</b>；粉紅色為核心 Hooks；黃綠色為 Content / View 相關 Hooks。
</div>

<!--
這張圖是 Angular 生命週期的「官方巡邏路線圖」。
你可以把元件想像成一個「剛蓋好、啟用、最後拆除的大樓」。
最頂端的 `constructor` 藍色區塊是第一關。
接著是粉紅色的核心初始化關卡。
再來是黃綠色的子元件與視圖渲染關卡。
最後是元件準備拆除時的 OnDestroy 銷毀關卡。
這個順序是定死的，誰也不能插隊，我們必須牢記這個執行脈絡。
-->

---

# 生命週期介紹（一）

Angular 提供 **8 個 Lifecycle Hooks**，加上 `constructor` 共 **9 個執行階段**。`constructor` 是 TypeScript class 特性，不屬於 Angular 管理的 Hook。

| 階段 | 觸發時機 | 執行次數 | Angular Hook？ |
| --- | --- | --- | --- |
| `constructor` | 類別建立時（最先） | 一次 | ❌ |
| `ngOnChanges` | `@Input` 值變化時 | 多次 | ✅ |
| `ngOnInit` | 元件初始化時 | 一次 | ✅ |
| `ngDoCheck` | 每次變更檢測時 | 多次 | ✅ |
| `ngAfterContentInit` | `ng-content` 初始化後 | 一次 | ✅ |

<!--
在 Angular 的世界裡，總共提供了「8 個 Hooks」加上 1 個「constructor 建構式」，總共 9 個執行階段。
我們這頁先列出前五個。
`constructor` 最先執行，但大叔再次強調，它其實是 TypeScript 類別的本能特性，不屬於 Angular 的官方 Hook 喔。
其餘的像是 `ngOnChanges`、`ngOnInit`，都是由 Angular 框架自動在特定時機幫你觸發的。
這其中，有些 Hooks 會執行「多次」，比如 Input 屬性只要一有變化，`ngOnChanges` 就會一直觸發，像是在做保全巡邏一樣。
-->

---

# 生命週期介紹（二）

| 階段 | 觸發時機 | 執行次數 | Angular Hook？ |
| --- | --- | --- | --- |
| `ngAfterContentChecked` | `ng-content` 變更檢測後 | 多次 | ✅ |
| `ngAfterViewInit` | 視圖組裝完成後 | 一次 | ✅ |
| `ngAfterViewChecked` | 視圖更新後 | 多次 | ✅ |
| `ngOnDestroy` | 元件銷毀前 | 一次 | ✅ |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 執行次數「多次」的 Hooks（ngOnChanges、ngDoCheck、AfterContentChecked、AfterViewChecked）在每次資料變更或檢測時都會觸發，效能敏感的邏輯請避免放在其中。
</div>

<!--
這頁是後面的四個 Hooks。
其中最重要的就是 `ngAfterViewInit` 視圖組裝完成，和 `ngOnDestroy` 元件銷毀。
大叔特別提醒一下：
那些會執行「多次」的 Hooks，因為只要畫面稍微動一下、資料變一下，它們就會瘋狂地被重複呼叫。
所以，千萬不要把耗費效能的計算，或是呼叫 API 的動作塞在裡面！
否則你的網頁會直接卡成 PPT，肝的代價可就大了！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Constructor 建構式
# Before Everything Starts

<!--
好，我們接著來看生命週期的起點——Constructor 建構式。
-->

---

# Constructor 建構式

`constructor()` 是 Angular 生命週期中最早執行的階段，但它其實是 TypeScript 類別的特性，Angular 本身無法控制它。

| 特性 | 說明 |
| --- | --- |
| 執行時機 | 類別（class）建立時最先執行 |
| 執行次數 | 一次 |
| 元件狀態 | 尚未初始化，無法存取 DOM |
| 主要用途 | 相依注入（Dependency Injection） |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> 因為 constructor 執行時元件尚未初始化，幾乎不會在這個階段撰寫業務邏輯，主要用於注入服務（Service）、函式或值。
</div>

<!--
`constructor` 是大樓奠基的第一塊磚。
它的特色是執行次數只有「一次」。
但是在這個階段，元件其實「還沒真正出生完畢」，也就是 HTML 畫面 DOM 根本還沒被瀏覽器畫出來。
所以，你絕對不能在這個時候跑去存取畫面上的按鈕、或是去做 API 撈取！
否則編譯器當場就會賞你一個 undefined 報錯。
那麼 `constructor` 在 Angular 裡到底能幹嘛呢？
它唯一的、也是最重要的任務，就是進行「相依注入（Dependency Injection）」，把我們要用的服務、工具先宣告並拉進來！
-->

---

# Constructor — 相依注入範例

```typescript
import { Component } from '@angular/core';
import { MyService } from './my.service';

@Component({
  selector: 'app-demo',
  standalone: true,
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  constructor(private myService: MyService) {
    // ✅ 適合：注入服務
    // ❌ 不適合：存取 DOM、呼叫 API
  }
}
```

<!--
你看這個程式碼範例。
我們在 `constructor` 的小括號裡寫了 `private myService: MyService`。
這就是在做相依注入，告訴 Angular：「等一下元件跑起來時，把 `MyService` 這個服務灌給我用！」
但大括號裡面我們留空，不寫任何呼叫 API 的邏輯。
這才是最正規體面的 Angular 寫法！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 常用生命週期
# Most Used Hooks

<!--
接下來，我們要介紹實務開發中，出鏡率高達 90% 的兩個黃金 Hooks！
-->

---

# 常用生命週期：ngOnInit

`ngOnInit` 是最常使用的生命週期，適合放置初始化的業務邏輯。

| 特性 | 說明 |
| --- | --- |
| 觸發時機 | 元件初始化完成時 |
| 執行次數 | 只執行一次 |
| 適合用途 | 呼叫 API、設定初始資料、訂閱 Observable |

<!--
第一個是 `ngOnInit`。
這可以說是 Angular 開發者的「起跑點」。
當元件的所有屬性、相依注入都準備妥當，元件「正式誕生」的那一刻，Angular 就會自動呼叫 `ngOnInit`。
它也只執行「一次」。
所以，**這裡就是你發送 API 請求、設定變數初始資料、或是做資料初始化最完美、最安全的黃金位置**！
幾乎每個 Angular 元件都會寫到它。
-->

---

# 常用生命週期：ngOnInit — 範例

```typescript
import { Component, OnInit } from '@angular/core';

@Component({ selector: 'app-demo', standalone: true })
export class DemoComponent implements OnInit {
  data: string[] = [];

  ngOnInit() {
    // ✅ 適合在這裡呼叫 API 取得資料
    this.data = ['item1', 'item2', 'item3'];
  }
}
```

<!--
我們看範例。
要使用 `ngOnInit`，我們要在 class 後面寫 `implements OnInit`，這代表我們承諾會實作這個介面。
然後在 class 內部寫 `ngOnInit() { ... }`。
在裡面我們可以直接給 `data` 陣列塞初始資料，或是發送 API。
代碼看起來乾淨俐落！
-->

---

# 常用生命週期：ngAfterViewInit

`ngAfterViewInit` 適合在一開始需要存取畫面元素屬性時使用。

| 特性 | 說明 |
| --- | --- |
| 觸發時機 | 元件的視圖（含子元件）組裝完成後 |
| 執行次數 | 只執行一次 |
| 適合用途 | 操作 DOM 元素、存取 `@ViewChild` |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>提示：</b> 如果在 ngOnInit 就嘗試存取 DOM，畫面可能還沒載入，會拿到 undefined。
</div>

<!--
第二個黃金 Hook 叫 `ngAfterViewInit`。
這個階段，元件的 HTML 畫面已經被瀏覽器「完全畫出來了」，連裡面的子元件也全都排好了。
這代表什麼？
這代表你終於可以動手去操作 DOM 元素了！
如果你在專案裡需要用 `@ViewChild` 抓取某個 input 輸入框，並且在載入時自動聚焦（focus）。
你就必須把這個聚焦的指令寫在 `ngAfterViewInit` 裡。
如果寫在前面的 `ngOnInit`，因為當時畫面根本還沒畫好，你的程式就會直接爆掉喔！
-->

---

# 常用生命週期：ngAfterViewInit — 範例

```typescript
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({ selector: 'app-demo', standalone: true })
export class DemoComponent implements AfterViewInit {
  @ViewChild('myInput') inputRef!: ElementRef;

  ngAfterViewInit() {
    // ✅ 畫面載入完成後才能存取 DOM 元素
    this.inputRef.nativeElement.focus();
  }
}
```

<!--
看程式碼。
我們用 `@ViewChild('myInput')` 宣告了一個對 HTML 裡面 myInput 元素折射的變數。
然後在 `ngAfterViewInit()` 裡面，
寫了 `this.inputRef.nativeElement.focus()`。
這樣當網頁一打開，游標就會自動閃爍在輸入框內。
記住，操作 DOM 一律寫在 AfterViewInit，這是前端開發的安防準則！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 其餘六個 Hooks
# The Other Six Hooks

<!--
接下來，我們把剩下的六個進階 Hooks 也做個走馬看花，不用死記，但腦袋裡一定要有概念。
-->

---

# 其餘六個 Hooks — 說明

`ngOnInit` 與 `ngAfterViewInit` 已於前頁介紹，本章節補充其餘 6 個 Hooks。

| Hook | 執行次數 |
| --- | --- |
| `ngOnChanges` | 多次 |
| `ngDoCheck` | 多次 |
| `ngAfterContentInit` | 一次 |
| `ngAfterContentChecked` | 多次 |
| `ngAfterViewChecked` | 多次 |
| `ngOnDestroy` | 一次 |

<!--
這六個 Hook 包含多次執行的 `ngOnChanges`、`ngDoCheck`，
Content 系列（也就是透過 ng-content 投影進來的內容）的初始化與檢查，
視圖更新後的 `ngAfterViewChecked`，以及元件要銷毀前的 `ngOnDestroy`。
我們來一一看他們的應用場景。
-->

---

# ngOnChanges

```typescript
import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({ selector: 'app-child', standalone: true })
export class ChildComponent implements OnChanges {
  @Input() message: string = '';

  ngOnChanges(changes: SimpleChanges) {
    console.log('Input 改變：', changes);
  }
}
```

| 特性 | 說明 |
| --- | --- |
| 觸發時機 | `@Input` / `@Output` 綁定值發生變化時 |
| 執行順序 | 在 `ngOnInit` **之前**執行 |
| 執行次數 | 多次（每次 Input 變化都會觸發） |

<!--
首先是 `ngOnChanges`。
當父元件傳遞資料（也就是我們宣告的 `@Input` 屬性）給子元件時，只要父元件的值一改變，子元件的 `ngOnChanges` 就會立刻觸發，並且會貼心地把「舊的值」跟「新的值」包在 `changes` 變數裡給你。
它的順序甚至比 `ngOnInit` 還要早！
所以，如果你想在子元件收到新參數時，立刻做一些資料轉換，寫在 `ngOnChanges` 裡就對了。
-->

---

# ngDoCheck

| 特性 | 說明 |
| --- | --- |
| 觸發時機 | 緊接在首次 `ngOnInit` 後，之後每次 `ngOnChanges` 後 |
| 執行次數 | 多次 |
| 與 ngOnChanges 差異 | `@Input` 傳入物件時，若參考位置不變，`ngOnChanges` 不觸發，但 `ngDoCheck` 仍會觸發 |

```typescript
import { Component, DoCheck } from '@angular/core';

@Component({ selector: 'app-demo', standalone: true })
export class DemoComponent implements DoCheck {
  ngDoCheck() {
    // 手動偵測 Angular 檢測不到的變更
    console.log('DoCheck 執行');
  }
}
```

<!--
第二個是 `ngDoCheck`。
這是一個「手動偵測器」。
有時候，父元件傳過來的是一個「物件（Object）」。
如果父元件只改了物件內部的某個屬性，但物件本身的記憶體參考位置（Reference）沒有變。
這時候，`ngOnChanges` 是偵測不到的。
但 `ngDoCheck` 不管三七二十一，只要 Angular 開始做髒檢查，它就會被呼叫。
你可以在這裡手動比對資料的變化，不過因為它觸發頻率極高，寫起來要非常小心效能問題！
-->

---

# ngAfterContentInit 與 ngAfterContentChecked

| Hook | 觸發時機 | 執行次數 |
| --- | --- | --- |
| `ngAfterContentInit` | `ng-content` 投影內容初始化後（首次 DoCheck 之後） | 一次 |
| `ngAfterContentChecked` | 每次 `ngDoCheck` 後完成 `ng-content` 的變更檢測後 | 多次 |

<!--
接下來是 Content 系列。
這是跟 Angular 的「內容投影（ng-content）」技術相關的。
當你用投影把一段外部 HTML 塞進元件內部時，
投影內容初始化完畢會觸發 `ngAfterContentInit`，
每次檢測完投影內容會觸發 `ngAfterContentChecked`。
這在我們自己封裝高級 UI 元件（如 Tabs、Modal）時才會用到，先知道有這兩個東西就行了。
-->

---

# ngAfterContentInit 與 ngAfterContentChecked — 範例

```typescript
import { Component, AfterContentInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-demo',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class DemoComponent implements AfterContentInit, AfterContentChecked {
  ngAfterContentInit() {
    console.log('ng-content 初始化完成');
  }
  ngAfterContentChecked() {
    console.log('ng-content 變更檢測完成');
  }
}
```

<!--
這是 Content 系列的範例。
通常只有在你的組件 template 裡面有寫 `<ng-content></ng-content>` 時，這兩個 Hooks 才會有發揮的舞台喔。
-->

---

# ngAfterViewChecked 與 ngOnDestroy

| Hook | 觸發時機 | 執行次數 |
| --- | --- | --- |
| `ngAfterViewChecked` | 元件視圖更新後 | 多次 |
| `ngOnDestroy` | 元件從 DOM 銷毀前 | 一次 |

<!--
再來是 `ngAfterViewChecked` 和 `ngOnDestroy`。
其中，`ngOnDestroy` 是大樓拆除的最後一步！
當使用者切換頁面，原來的元件要從網頁上消失（被銷毀）時，`ngOnDestroy` 就會被觸發。
這就像是你在走人之前要打掃戰場。
**你必須在這裡做「資源回收」**，比如取消訂閱 Observable、清空 timer 計時器。
如果你不清理，這些訂閱會一直掛在記憶體裡，時間久了，網頁就會越來越卡，這就叫「記憶體洩漏（Memory Leak）」！
所以，`ngOnDestroy` 扮演的是非常重要的「清道夫」角色！
-->

---

# ngAfterViewChecked 與 ngOnDestroy — 範例

```typescript
import { Component, AfterViewChecked, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({ selector: 'app-demo', standalone: true })
export class DemoComponent implements AfterViewChecked, OnDestroy {
  private sub!: Subscription;

  ngAfterViewChecked() {
    console.log('視圖更新後觸發');
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); // ✅ 清理訂閱，避免記憶體洩漏
  }
}
```

<!--
看程式碼。
在 `ngOnDestroy()` 裡面，我們呼叫了 `this.sub.unsubscribe()`。
這就是典型的清道夫工作，把 RxJS 的訂閱親手掐斷，防止記憶體洩漏。
這是一個專業 Angular 工程師必須具備的高尚品德！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 引用多個生命週期
# Using Multiple Hooks

<!--
最後，我們來看看在 TypeScript 的 class 裡，如果我想同時使用多個 Hooks，要怎麼寫才符合規範。
-->

---

# 同時實作多個 Lifecycle Hooks

一個元件可以同時實作多個生命週期介面，只需在 `implements` 後列出所有介面。

```typescript
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  standalone: true,
  templateUrl: './demo.component.html',
})
export class DemoComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnInit() {
    console.log('元件初始化');
  }

  ngAfterViewInit() {
    console.log('視圖載入完成');
  }

  ngOnDestroy() {
    console.log('元件即將銷毀，清理資源');
  }
}
```

<!--
寫法其實很直覺。
在 `export class` 後面的 `implements` 關鍵字後面，用「逗號」把你想用的介面通通列出來！
比如 `implements OnInit, AfterViewInit, OnDestroy`。
然後，在 class 內部，乖乖把這三個對應的方法寫出來。
這樣一來，Angular 就會在這三個不同人生階段，自動進來執行你寫的邏輯。
-->

---

# 多個 Hooks — 執行順序確認

```typescript
import { Component, OnChanges, OnInit, DoCheck,
         AfterContentInit, AfterContentChecked,
         AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

@Component({ selector: 'app-all-hooks', standalone: true })
export class AllHooksComponent implements OnChanges, OnInit, DoCheck,
    AfterContentInit, AfterContentChecked,
    AfterViewInit, AfterViewChecked, OnDestroy {
  ngOnChanges()           { console.log('1. ngOnChanges'); }
  ngOnInit()              { console.log('2. ngOnInit'); }
  ngDoCheck()             { console.log('3. ngDoCheck'); }
  ngAfterContentInit()    { console.log('4. ngAfterContentInit'); }
  ngAfterContentChecked() { console.log('5. ngAfterContentChecked'); }
  ngAfterViewInit()       { console.log('6. ngAfterViewInit'); }
  ngAfterViewChecked()    { console.log('7. ngAfterViewChecked'); }
  ngOnDestroy()           { console.log('8. ngOnDestroy'); }
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>最佳實踐：</b> 只實作需要用到的 Hooks，不要全部加入，避免不必要的效能負擔。
</div>

<!--
這是把 8 個 Hook 全都實作出來的終極測試範例。
大家如果有空，可以在專案裡複製這段 code 跑跑看，打開瀏覽器 Console。
你會親眼看到這 8 個 Hook 是怎麼像機器人排隊一樣，一步步在 Console 裡印出 `1. ngOnChanges`、`2. ngOnInit` 到 `8. ngOnDestroy` 的。
不過在實際專案裡，**沒用到的 Hook 千萬不要硬塞進去**，免得造成編譯器多餘的效能開銷喔！
-->

---
layout: default
---

# 練習：任務說明
### 觀察生命週期與 ngOnInit 初始化資料

在 Angular 專案中完成以下任務，並觀察執行結果：

1. 宣告一個全域變數 `welcomeMessage!: string`（使用 `!` 非空斷言，**不給初始值**）
2. 在 `constructor()` 中加入 `console.log('1. constructor 執行')`
3. 在 `ngOnInit()` 中加入 `console.log('2. ngOnInit 執行')`，並設定 `this.welcomeMessage = '歡迎來到 Angular！'`
4. 在 `ngAfterViewInit()` 中加入 `console.log('3. ngAfterViewInit 執行')`
5. 在 `app.component.html` 中用 `{{ welcomeMessage }}` 顯示訊息

**打開 F12 → Console，確認三個 log 依序出現；確認變數雖無初始值，畫面仍正確顯示訊息。**

<!--
這道練習有兩個核心目標：
第一，親眼確認 constructor → ngOnInit → ngAfterViewInit 的觸發順序。
第二，體驗把變數初始化邏輯放在 ngOnInit 中的「Angular 標準做法」——日後呼叫 API、把回傳資料塞進變數，都是這樣寫的！
-->

---
layout: default
---

# 練習：解題提示
### 完成步驟

1. 在 `app.component.ts` 引入並 `implements OnInit, AfterViewInit`：

```typescript
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({ selector: 'app-root', standalone: true, templateUrl: './app.component.html' })
export class AppComponent implements OnInit, AfterViewInit {
  welcomeMessage!: string;

  constructor() {
    console.log('1. constructor 執行');
  }

  ngOnInit() {
    console.log('2. ngOnInit 執行');
    this.welcomeMessage = '歡迎來到 Angular！';
  }

  ngAfterViewInit() {
    console.log('3. ngAfterViewInit 執行');
  }
}
```

2. 在 `app.component.html` 加入 `<p>{{ welcomeMessage }}</p>`

3. 儲存後開啟 F12 → Console，確認順序：`1. constructor 執行` → `2. ngOnInit 執行` → `3. ngAfterViewInit 執行`

<!--
最重要的驗收點有兩個：
一、Console 裡三個 log 依照固定順序出現，不會亂掉。
二、雖然 welcomeMessage 宣告時沒有給值，但 ngOnInit 在元件渲染時就設好了，所以畫面不會出現空白。
這就是日後呼叫 API 的標準樣板：在 ngOnInit 裡呼叫 API，把回傳資料賦值給全域變數！
-->

---
layout: end
---

# 課程結束
### 掌握生命週期，讓元件在對的時機做對的事

<!--
恭喜大家！完成了 Angular 生命週期的全面巡禮！
現在的你，不僅知道怎麼寫方法、宣告變數，還知道怎麼精準控制這些程式碼在元件「誕生、成長、老化到死亡」的各個節點上執行了。
回去把 ngOnInit、ngAfterViewInit 和 ngOnDestroy 這三個最常用的 Hooks 多練幾遍。
下一堂課，我們要迎來元件化開發的終極奧義——「元件拆解與通訊（Components）」，也就是把大網頁拆成一個個小零件的拼圖遊戲！大家大腦充飽電，我們等一下見！
-->
