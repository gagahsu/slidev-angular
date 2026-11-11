import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],           // 雙向綁定 [(ngModel)] 需要
  templateUrl: './login.component.html',
})
export class LoginComponent {
  password = '';   // 綁定輸入框
  error = false;   // 控制錯誤訊息顯示

  private router = inject(Router);  // 注入 Router

  // 先判斷，再決定要不要跳轉
  login() {
    if (this.password === '1234') {
      this.router.navigate(['/ch22/dashboard']);  // 驗證通過 → 跳轉
    } else {
      this.error = true;                          // 驗證失敗 → 顯示錯誤訊息
    }
  }
}
