import { Component, inject } from '@angular/core';
import { ExampleService } from '../../services/example.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-page-a',
  templateUrl: './page-a.component.html',
})
export class PageAComponent {
  // inject() 是新版寫法，效果和寫在 constructor 的括號內相同
  private exampleService = inject(ExampleService);
  private authService = inject(AuthService);

  // public 代表 HTML 也可以直接讀取 cartService
  public cartService = inject(CartService);

  // 把值塞進 Service，其他頁面就能讀到
  sendData() {
    this.exampleService.userName = 'Allen';
  }

  // 小節練習：登入成功後存入 token
  onLogin() {
    this.authService.token = 'abc123';
  }

  // 補充練習：加入購物車
  addToCart() {
    this.cartService.cartCount++;
  }
}
