/*
  === 第19章：App 根元件（引用子元件）===

  在 Standalone Component 架構下，要使用子元件，
  必須在「父元件」的 imports 陣列中引入它。

  這就像是：「我保證我要用這個元件，我已經知道它在哪裡。」
  沒有加入 imports 的話，Angular 看到 <app-header> 標籤會不認識它。
*/

import { Component } from '@angular/core';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    Header   // 告訴 Angular：這個元件裡會用到 <app-header>
    // 如果還有 Footer，也要在這裡加入：
    // Footer
  ]
})
export class App { }
