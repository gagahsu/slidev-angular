/*
  === 第45章：Loading — 元件 ===

  使用 async pipe 搭配 LoadingService，
  不需要手動 subscribe / unsubscribe，Angular 全程自動管理。

  async pipe 語法：(loading$ | async)
  → loading$ 是 Observable<boolean>
  → async pipe 會訂閱它，值變化時自動更新畫面
  → 元件銷毀時自動取消訂閱
*/

import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    AsyncPipe,                   // 讓 HTML 能使用 | async
    MatProgressSpinnerModule,    // <mat-spinner>
    MatButtonModule
  ]
})
export class AppComponent implements OnInit {

  private loadingService = inject(LoadingService);

  // 把 Observable 存起來，在 HTML 裡用 async pipe 訂閱
  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
  }

  // 模擬 API 請求：顯示 loading → 等 2 秒 → 隱藏
  simulateApiCall(): void {
    this.loadingService.show();

    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }

  showLoading(): void  { this.loadingService.show(); }
  hideLoading(): void  { this.loadingService.hide(); }
}
