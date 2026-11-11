import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
})
export class SecondComponent {

  // 注入 Router
  private router = inject(Router);

  // 補充練習 1：直接傳入字串路徑
  goBack() {
    this.router.navigateByUrl('/ch22/first');
  }

  // Route Params：把值放在路徑裡，網址是 /ch22/list/Allen
  goToList() {
    this.router.navigate(['/ch22/list', 'Allen']);
  }

  // Query Params 小節練習：網址是 /ch22/result?keyword=Angular
  search() {
    this.router.navigate(['/ch22/result'], { queryParams: { keyword: 'Angular' } });
  }
}
