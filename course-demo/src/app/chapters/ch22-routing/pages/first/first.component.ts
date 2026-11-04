import { Component } from '@angular/core';
// Router 用來在 TS 中切換頁面
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-first',
  imports: [RouterOutlet, RouterLink],  // HTML 用到 routerLink 和 router-outlet，就要自己匯入
  templateUrl: './first.component.html',
})
export class FirstComponent {

  // 補充練習 2：記錄登入狀態
  isLogin: boolean = true;

  // 注入 Router 後，整個元件都能用 this.router 切換頁面
  constructor(private router: Router) {}

  // 按鈕切換登入狀態，方便觀察兩種結果
  toggleLogin() {
    this.isLogin = !this.isLogin;
  }

  // 補充練習 2：先判斷，再決定要不要換頁（routerLink 做不到）
  checkUser() {
    if (this.isLogin) {
      alert('登入成功！準備跳轉');
      this.router.navigateByUrl('/ch22/second');
    } else {
      alert('拒絕訪問');
    }
  }
}
