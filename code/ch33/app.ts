/*
  === 第33章：Mat-icon（Material 圖示）===

  mat-icon 讓你在 Angular 應用裡使用 Google Material Icons，
  只需要一行 HTML 就能顯示數千種圖示，不需要另外下載圖片。

  使用步驟：
  ① 確認 index.html 已有 Google Material Icons CDN（ng add @angular/material 會自動加入）
  ② 在 TypeScript 的 imports 加入 MatIconModule
  ③ HTML 用 <mat-icon fontIcon="圖示名稱"></mat-icon> 即可顯示

  圖示名稱查詢：
  → fonts.google.com/icons
  → 圖示名稱全部小寫，空格換成底線
  → 例如：「Arrow Back」→ "arrow_back"
           「Shopping Cart」→ "shopping_cart"
*/

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatIconModule,    // 使用 <mat-icon> 必須引入
    MatButtonModule   // 示範圖示搭配按鈕
  ]
})
export class AppComponent {

  // 常用圖示清單（從 fonts.google.com/icons 查詢）
  iconList: { name: string; fontIcon: string }[] = [
    { name: '首頁',     fontIcon: 'home' },
    { name: '搜尋',     fontIcon: 'search' },
    { name: '設定',     fontIcon: 'settings' },
    { name: '個人',     fontIcon: 'person' },
    { name: '購物車',   fontIcon: 'shopping_cart' },
    { name: '愛心',     fontIcon: 'favorite' },
    { name: '星星',     fontIcon: 'star' },
    { name: '刪除',     fontIcon: 'delete' },
    { name: '編輯',     fontIcon: 'edit' },
    { name: '新增',     fontIcon: 'add' },
    { name: '返回',     fontIcon: 'arrow_back' },
    { name: '選單',     fontIcon: 'menu' }
  ];

  // 選取的圖示名稱（示範動態切換）
  selectedIcon: string = 'home';

  selectIcon(fontIcon: string): void {
    this.selectedIcon = fontIcon;
    console.log('選擇圖示：', fontIcon);
  }
}
