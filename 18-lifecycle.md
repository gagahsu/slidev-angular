---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 生命週期
routeAlias: ch18
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

---
layout: default
---

# Outline

- **生命週期介紹** — 什麼是 Lifecycle、八個 Hooks 執行順序
- **Constructor 建構式** — 最先執行的階段
- **常用生命週期** — `ngOnInit` 與 `ngAfterViewInit`
- **其餘六個 Hooks** — ngOnChanges、ngDoCheck、AfterContent 系列、AfterViewChecked、OnDestroy
- **引用多個生命週期** — 同時使用多個 Hooks

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 認識生命週期
# Lifecycle Overview

---

# 生命週期執行順序

<div class="flex justify-center mt-2">
  <img src="/images/18-lifecycle/lifecycle-hooks.png" class="max-h-80 rounded shadow" />
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>constructor</code>（藍色）是 TypeScript class 特性，<b>不屬於 Angular Hook</b>；粉紅色為核心 Hooks；黃綠色為 Content / View 相關 Hooks。
</div>

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Constructor 建構式
# Before Everything Starts

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 常用生命週期
# Most Used Hooks

---

# 常用生命週期：ngOnInit

`ngOnInit` 是最常使用的生命週期，適合放置初始化的業務邏輯。

| 特性 | 說明 |
| --- | --- |
| 觸發時機 | 元件初始化完成時 |
| 執行次數 | 只執行一次 |
| 適合用途 | 呼叫 API、設定初始資料、訂閱 Observable |

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 其餘六個 Hooks
# The Other Six Hooks

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

---

# ngAfterContentInit 與 ngAfterContentChecked

| Hook | 觸發時機 | 執行次數 |
| --- | --- | --- |
| `ngAfterContentInit` | `ng-content` 投影內容初始化後（首次 DoCheck 之後） | 一次 |
| `ngAfterContentChecked` | 每次 `ngDoCheck` 後完成 `ng-content` 的變更檢測後 | 多次 |

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

---

# ngAfterViewChecked 與 ngOnDestroy

| Hook | 觸發時機 | 執行次數 |
| --- | --- | --- |
| `ngAfterViewChecked` | 元件視圖更新後 | 多次 |
| `ngOnDestroy` | 元件從 DOM 銷毀前 | 一次 |

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

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 引用多個生命週期
# Using Multiple Hooks

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

---
layout: end
---

# 課程結束
### 掌握生命週期，讓元件在對的時機做對的事
