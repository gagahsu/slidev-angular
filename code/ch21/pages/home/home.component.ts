/*
  === 第21章：首頁元件 ===

  這是路由到 "/" 時顯示的元件。
  Router 的用法：用程式碼觸發跳頁（而非點連結）
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: []   // 模板只用 @for（內建語法），不需要額外 import
})
export class HomeComponent {
  courses = [
    { id: 1, name: 'HTML 基礎' },
    { id: 2, name: 'CSS 進階' },
    { id: 3, name: 'Angular 入門' }
  ];

  // 注入 Router 服務，用來程式碼跳頁
  constructor(private router: Router) {}

  // 點擊課程卡片時，用程式碼跳轉到課程詳情頁
  goToCourse(id: number): void {
    // navigate 方法：和 routerLink 一樣，但在 TypeScript 裡呼叫
    this.router.navigate(['/courses', id]);
  }
}
