import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  // 補充練習：購物車件數
  cartCount: number = 0;
}
