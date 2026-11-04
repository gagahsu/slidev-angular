import { Component, inject } from '@angular/core';
import { ExampleService } from '../../services/example.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-page-b',
  templateUrl: './page-b.component.html',
})
export class PageBComponent {
  userName = '';
  token = '';

  private exampleService = inject(ExampleService);

  // public 代表 HTML 可以直接讀取 cartService.cartCount
  constructor(private authService: AuthService, public cartService: CartService) {
    // 進入頁面時，從 Service 讀出 A 頁面存入的值
    this.userName = this.exampleService.userName;
    this.token = this.authService.token;
  }
}
