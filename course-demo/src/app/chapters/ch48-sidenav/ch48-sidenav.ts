import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ch48-sidenav',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch48-sidenav.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch48-sidenav.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                     // 獨立元件
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class Ch48Sidenav {

  // 路徑清單存成陣列，HTML 用 @for 產生選單
  pages = [
    { path: '/ch48/home', label: 'Home 首頁' },
    { path: '/ch48/dashboard', label: 'Dashboard' },
    { path: '/ch48/cart', label: 'Cart 購物車' },
  ];

  // 補充練習 1：目前的顯示模式
  mode: 'side' | 'over' | 'push' = 'side';
}
