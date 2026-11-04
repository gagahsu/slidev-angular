import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
// [routerLink] 要匯入 RouterLink；<router-outlet> 要匯入 RouterOutlet
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ch39-tabs',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch39-tabs.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch39-tabs.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                  // 獨立元件
  imports: [MatTabsModule, RouterOutlet, RouterLink]
})
export class Ch39Tabs {

  // 補充練習 3：是否為管理員
  isAdmin: boolean = false;

  // 每個頁籤的路徑與名稱；HTML 用 @for 產生，新增項目就會多一個頁籤
  links = [
    { path: '/ch39/test1', name: 'TEST' },
    { path: '/ch39/test2', name: 'TEST2' },
    { path: '/ch39/test3', name: 'TEST3' },
    { path: '/ch39/profile', name: '個人帳戶設定' },         // 補充練習 1
    { path: '/ch39/admin', name: '後台管理', adminOnly: true },  // 補充練習 3
  ];

  // 目前作用中的頁籤，初始值是第一個頁籤的名稱
  activeLink = this.links[0].name;

  // 切換管理員身分，方便觀察頁籤停用的效果
  toggleAdmin() {
    this.isAdmin = !this.isAdmin;
  }
}
