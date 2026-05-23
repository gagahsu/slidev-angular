/*
  === 第44章：訂閱（Subscription）— 元件 ===

  在元件裡訂閱 Service 的 Observable，
  當 Service 的狀態改變時，元件自動收到通知並更新畫面。

  重要：記得在元件銷毀時取消訂閱（unsubscribe），
  避免記憶體洩漏（memory leak）。

  取消訂閱的兩種方式：
  ① 手動：在 ngOnDestroy 呼叫 subscription.unsubscribe()
  ② 自動：使用 takeUntilDestroyed()（Angular 16+）
*/

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: []
})
export class AppComponent implements OnInit, OnDestroy {

  private loadingService = inject(LoadingService);

  // 目前的 loading 狀態（從 Service 訂閱而來）
  isLoading: boolean = false;

  // 操作日誌（顯示狀態變化歷程）
  eventLog: string[] = [];

  // 儲存訂閱實例，ngOnDestroy 時取消訂閱
  private loadingSubscription!: Subscription;
  private dataUpdateSubscription!: Subscription;

  ngOnInit(): void {

    // ① 訂閱 loading$ Observable
    // 每次 loadingSubject.next() 被呼叫，這裡就會收到新值
    this.loadingSubscription = this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
      const time = new Date().toLocaleTimeString();
      this.eventLog.unshift(`[${time}] loading 狀態變為：${isLoading}`);
      console.log('收到 loading 狀態：', isLoading);
    });

    // ② 訂閱「資料更新」事件
    this.dataUpdateSubscription = this.loadingService.dataUpdated$.subscribe(() => {
      const time = new Date().toLocaleTimeString();
      this.eventLog.unshift(`[${time}] 收到「資料更新」通知`);
    });
  }

  // ==============================
  // 模擬操作
  // ==============================

  // 模擬 API 請求（顯示 loading → 等待 → 隱藏）
  simulateApiCall(): void {
    this.loadingService.show();    // 開始 loading

    setTimeout(() => {
      this.loadingService.hide();              // 結束 loading
      this.loadingService.notifyDataUpdated(); // 通知資料已更新
    }, 2000);
  }

  // 手動控制
  showLoading(): void  { this.loadingService.show(); }
  hideLoading(): void  { this.loadingService.hide(); }

  clearLog(): void { this.eventLog = []; }

  // ==============================
  // 元件銷毀時取消訂閱
  // ==============================
  ngOnDestroy(): void {
    // 必須取消訂閱，否則元件銷毀後 Observable 還在跑 → 記憶體洩漏
    this.loadingSubscription.unsubscribe();
    this.dataUpdateSubscription.unsubscribe();
    console.log('已取消訂閱');
  }
}
