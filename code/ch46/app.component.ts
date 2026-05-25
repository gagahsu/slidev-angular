/*
  === 第46章：Signals — 元件 ===

  使用 Signal 的好處：
  ① 同步讀取：直接呼叫 signal() 就得到目前值，不需要訂閱
  ② 模板自動追蹤：Angular 偵測到 signal() 被讀取，自動在值改變時重新渲染
  ③ 不需要 async pipe：HTML 直接用 {{ signal() }} 讀取值
  ④ 不需要 unsubscribe：Signal 沒有訂閱，不會記憶體洩漏

  effect()：
  → 監聽 Signal 的變化，每次 Signal 更新就自動執行
  → 類似 Observable 的 subscribe，但只能用在注入上下文（constructor / inject() 中）
*/

import { Component, OnInit, Signal, effect, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class AppComponent implements OnInit {

  private loadingService = inject(LoadingService);

  // Signal<boolean> 型別
  loading!: Signal<boolean>;

  // 計數器：示範 signal 的 set / update
  counter = inject(LoadingService).loading;  // 同一份 signal 引用

  constructor() {
    // effect() 必須在注入上下文（constructor 或 inject() 中）使用
    // 每次 loading signal 改變，這個 effect 就會重新執行
    effect(() => {
      console.log('loading Signal 變化：', this.loadingService.loading());
    });
  }

  ngOnInit(): void {
    // Signal 不需要 subscribe，直接把引用存起來
    this.loading = this.loadingService.loading;
  }

  simulateApiCall(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }

  showLoading(): void { this.loadingService.show(); }
  hideLoading(): void { this.loadingService.hide(); }
}
