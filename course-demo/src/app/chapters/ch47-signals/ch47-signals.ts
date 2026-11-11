import { Component, OnInit, Signal, computed, effect, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './ch47-loading.service';

@Component({
  selector: 'app-ch47-signals',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch47-signals.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch47-signals.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                     // 獨立元件
  imports: [MatProgressSpinnerModule]
})
export class Ch47Signals implements OnInit {

  // Signal 是函式型別，讀取值要呼叫 this.loading()
  loading!: Signal<boolean>;

  // computed 範例：level 改變時，attack、defense 自動重新計算
  level = signal(1);
  attack = computed(() => this.level() * 3);
  defense = computed(() => this.level() * 2);

  // 練習：數量用 Signal 管理，單價是固定值，不需要 Signal
  quantity = signal<number>(1);
  price = 100;
  // 小計由 computed 自動算出，不能手動指派
  subtotal = computed(() => this.quantity() * this.price);

  private loadingService = inject(LoadingService);

  // effect 必須寫在 constructor 內
  constructor() {
    // 函式內讀取的 Signal 改變時，就會重新執行
    effect(() => console.log('loading：', this.loadingService.loading()));

    // 練習：小計超過 500 時，在 Console 顯示提醒
    effect(() => {
      if (this.subtotal() > 500) {
        console.warn(`小計 ${this.subtotal()} 元，已符合優惠門檻！`);
      }
    });
  }

  ngOnInit(): void {
    this.loading = this.loadingService.loading;
  }

  // 顯示 Loading，2 秒後隱藏
  showLoading() {
    this.loadingService.show();
    setTimeout(() => this.loadingService.hide(), 2000);
  }

  // .update() 根據目前的值計算新的值；computed 會自動跟著更新
  levelUp() {
    this.level.update(v => v + 1);
  }

  // 練習：數量 +1
  increase(): void {
    this.quantity.update(v => v + 1);
  }

  // 練習：數量 -1，但最少是 1
  decrease(): void {
    this.quantity.update(v => (v > 1 ? v - 1 : v));
  }
}
