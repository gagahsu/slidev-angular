/*
  === 第39章：Tabs（頁籤）===

  Angular Material 提供兩種頁籤元件：

  ① mat-tab-group（靜態內容頁籤）
     → 直接把內容寫在 <mat-tab> 裡
     → 切換頁籤不改 URL，適合單一頁面的區塊切換

  ② mat-tab-nav-bar（路由頁籤）
     → 搭配 routerLink，切換頁籤會改 URL
     → 每個頁籤對應一個路由頁面，適合主導覽列

  兩種都需要 import MatTabsModule。

  mat-tab-nav-bar 額外需要：
  - RouterOutlet：路由出口（顯示對應頁面）
  - RouterLink：讓 <a> 標籤可以用路由連結
*/

import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatTabsModule,   // mat-tab-group / mat-tab-nav-bar 都需要
    RouterOutlet,    // <router-outlet>
    RouterLink       // [routerLink]
  ]
})
export class AppComponent {

  // ==============================
  // mat-tab-group：靜態頁籤內容
  // ==============================

  // 動態產生頁籤（也可以直接在 HTML 寫死）
  staticTabs = [
    { label: '首頁',   content: '歡迎來到首頁！這裡是首頁的內容。',     icon: '🏠' },
    { label: '課程',   content: '共有 55 堂課程，從 HTML 到 Angular 全覆蓋。', icon: '📚' },
    { label: '練習題', content: '每個章節都附有練習題，讓你動手實作。',  icon: '✏️' },
    { label: '關於',   content: '本課程由 Angular 講師設計，適合初學者。', icon: '📌' }
  ];

  // ==============================
  // mat-tab-nav-bar：路由頁籤
  // ==============================

  // 路由連結（配合 app.routes.ts）
  links = [
    { path: '/home',    name: '首頁'   },
    { path: '/courses', name: '課程'   },
    { path: '/about',   name: '關於'   }
  ];

  // 追蹤目前選中的連結
  activeLink = this.links[0].name;
}
