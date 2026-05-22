/*
  === 第21章：App 根元件（路由設定）===

  在使用路由的根元件中，必須 import：
  - RouterOutlet  → 讓 <router-outlet> 標籤可以使用（畫面切換插槽）
  - RouterLink    → 讓 routerLink 屬性可以使用（替代 href）
  - RouterLinkActive → 讓 routerLinkActive 屬性可以使用（active 樣式）
*/

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,      // 提供 <router-outlet> 元件
    RouterLink,        // 提供 routerLink 指令
    RouterLinkActive   // 提供 routerLinkActive 指令
  ]
})
export class AppComponent { }
