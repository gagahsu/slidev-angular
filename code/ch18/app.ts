/*
  === 第18章：生命週期（Lifecycle Hooks）===

  Angular 元件從「誕生」到「消滅」會經歷幾個固定的階段，
  每個階段都有對應的「勾子函式（Hook）」讓你介入處理邏輯。

  最常用的生命週期（依執行順序）：
  ① ngOnChanges  → 當 @Input 屬性改變時觸發
  ② ngOnInit     → 元件「初始化」後執行一次（最常用！）
  ③ ngAfterViewInit → 畫面渲染完成後執行
  ④ ngOnDestroy  → 元件「被銷毀」前執行（清理資源）

  使用前需要 implements 對應的 Interface
*/

import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,   // Angular 17+ 獨立元件
  imports: []         // @for / @if 是內建語法，不需要額外 import
})
// implements 表示「承諾實作這些介面的方法」
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  pageTitle: string = "生命週期示範";
  currentTime: string = "";
  userData: string[] = [];
  lifecycleLog: string[] = [];  // 記錄生命週期執行順序

  private timer: any;  // 計時器（銷毀時需要清除）

  // ========================================
  // ① constructor（建構子）
  // ========================================
  // 最早執行，用來「注入服務（Service）」
  // 注意：這時候 HTML 畫面還沒有渲染，不要在這裡操作 DOM

  constructor() {
    this.log("constructor 執行 — 元件物件被建立");
    // ✅ 適合：初始化基本屬性、注入 Service
    // ❌ 不適合：呼叫 API（畫面還沒準備好）
  }

  // ========================================
  // ② ngOnInit（最常用！）
  // ========================================
  // 元件初始化完成後執行一次
  // 適合在這裡呼叫 API、取得初始資料

  ngOnInit(): void {
    this.log("ngOnInit 執行 — 適合在這裡呼叫 API！");

    // 模擬 API 呼叫（實際會用 HttpClient，這裡先用假資料）
    this.loadData();

    // 模擬一個每秒更新的計時器
    this.timer = setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString('zh-TW');
    }, 1000);
  }

  // ========================================
  // ③ ngAfterViewInit
  // ========================================
  // HTML 畫面渲染完成後執行一次
  // 適合：需要操作 DOM 元素時（例如設定 Chart.js 圖表）

  ngAfterViewInit(): void {
    this.log("ngAfterViewInit 執行 — 畫面已渲染完成");
    // ✅ 適合：操作 DOM、初始化第三方圖表庫
  }

  // ========================================
  // ④ ngOnDestroy（清理資源！）
  // ========================================
  // 元件被銷毀（頁面切換走）前執行
  // 必須在這裡清除計時器、取消訂閱，避免記憶體洩漏

  ngOnDestroy(): void {
    this.log("ngOnDestroy 執行 — 元件即將銷毀，清理資源");
    clearInterval(this.timer);  // 清除計時器（非常重要！）
    // 實際專案還需要取消 Observable 訂閱
  }

  // ========================================
  // 輔助方法
  // ========================================

  private loadData(): void {
    // 模擬 API 延遲回傳資料
    setTimeout(() => {
      this.userData = ["Allen", "Grace", "小明", "小華"];
      this.log("資料載入完成！");
    }, 1000);
  }

  private log(message: string): void {
    const time = new Date().toLocaleTimeString();
    this.lifecycleLog.push(`[${time}] ${message}`);
    console.log(`[生命週期] ${message}`);
  }
}
