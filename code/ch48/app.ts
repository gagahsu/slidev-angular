/*
  === 第48章：Toolbar（工具列）===

  mat-toolbar 是 Angular Material 的頂部工具列元件，
  常用於 App 最頂端，放置 Logo、標題、導覽按鈕、圖示按鈕等。

  Spacer 技巧（最重要！）：
  → <span class="spacer"></span> 搭配 CSS flex: 1 1 auto
  → 讓 spacer 自動填滿剩餘空間，把右側元素推到最右邊
  → 這是 Material Toolbar 排版的標準做法

  color 屬性：
  → primary  — 主題色（通常是藍色）
  → accent   — 強調色
  → warn     — 警告色（紅色）
  → 不設定   — 白色 / 預設背景
*/

import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule,   // mat-toolbar
    MatIconModule,      // mat-icon
    MatButtonModule,    // mat-icon-button
    MatBadgeModule      // [matBadge] — 顯示數字角標
  ]
})
export class AppComponent {

  cartCount: number = 3;
  notificationCount: number = 5;

  addToCart(): void {
    this.cartCount++;
  }

  clearCart(): void {
    this.cartCount = 0;
  }

  readNotifications(): void {
    this.notificationCount = 0;
  }
}
