import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // 購物車一開始沒有商品，所以初始值是 0
  private cartCount$ = new BehaviorSubject<number>(0);

  // 取得 cartCount$ 的可觀察物件（供外部訂閱使用）
  _cartCount$ = this.cartCount$.asObservable();

  // .value 可以讀取目前的值，+1 後用 next() 推送
  addItem(): void {
    this.cartCount$.next(this.cartCount$.value + 1);
  }

  // 清空購物車
  clear(): void {
    this.cartCount$.next(0);
  }
}
