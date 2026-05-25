/*
  === 第47章：Sidenav（側邊導覽列）===

  mat-drawer-container 是 Angular Material 的側邊欄元件。
  結構：
  ① mat-drawer-container — 外層容器
  ② mat-drawer           — 側邊欄本體
  ③ 主要內容區            — 放在 container 裡的其他元素

  三種顯示模式（mode）：
  ┌──────────┬──────────────────────────────────────────┐
  │ over     │ 浮在主內容上方（預設），不影響主內容位置  │
  │ push     │ 把主內容往旁邊推                          │
  │ side     │ 和主內容並排，固定佔位                    │
  └──────────┴──────────────────────────────────────────┘

  控制開關：
  → 在 HTML 用 #drawer 範本引用（template reference variable）
  → 呼叫 drawer.toggle() / drawer.open() / drawer.close()
  → 在 TypeScript 可用 @ViewChild(MatDrawer) drawer

  autosize：當側邊欄打開/關閉時，主內容區自動調整大小。
*/

import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatSidenavModule,   // mat-drawer-container / mat-drawer
    MatListModule,      // mat-list / mat-list-item
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class AppComponent {

  // 目前選中的模式
  currentMode: 'over' | 'push' | 'side' = 'over';

  // 選單項目
  menuItems = [
    { icon: 'home',     label: '首頁'   },
    { icon: 'person',   label: '個人資料' },
    { icon: 'settings', label: '設定'   },
    { icon: 'help',     label: '說明'   }
  ];

  // 目前選中的頁面
  activePage: string = '首頁';

  selectPage(label: string): void {
    this.activePage = label;
  }
}
