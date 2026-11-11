import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount = 0;

  // 存放訂閱，離開頁面時才能取消
  private subscription!: Subscription;

  private cartService = inject(CartService);

  ngOnInit(): void {
    // 一有新的數量推送，這裡就會執行
    this.subscription = this.cartService._cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  // 投影片沒有這段：這個示範專案會在章節之間切換，離開時要取消訂閱
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
