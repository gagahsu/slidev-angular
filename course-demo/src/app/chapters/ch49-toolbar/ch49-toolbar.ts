import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
// 下拉選單與角標
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-ch49-toolbar',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch49-toolbar.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch49-toolbar.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                     // 獨立元件
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
  ],
})
export class Ch49Toolbar {

  // 沿用 ch48 練習的選單
  pages = [
    { path: '/ch49/home', label: 'Home 首頁' },
    { path: '/ch49/dashboard', label: 'Dashboard' },
    { path: '/ch49/cart', label: 'Cart 購物車' },
  ];

  // 點選「登出」時執行
  logout(): void {
    console.log('使用者已登出');
  }
}
