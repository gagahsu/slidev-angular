import { Component } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  constructor(private cartService: CartService) { }

  // 只呼叫 Service 的方法，不儲存、不關心目前數量
  addToCart(): void {
    this.cartService.addItem();
  }
}
