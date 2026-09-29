/*
  === 第52章：RWD（響應式網頁設計）===

  RWD（Responsive Web Design）讓同一份 HTML / CSS
  在桌機、平板、手機上都能有良好的顯示效果。

  核心工具：@media query
  → 根據畫面寬度套用不同的 CSS 樣式
  → 語法：@media (條件) { .class { 樣式 } }

  常用斷點（Breakpoints）：
  ┌─────────────────┬──────────────┬──────────────────────┐
  │ 裝置            │ 寬度範圍     │ @media 條件          │
  ├─────────────────┼──────────────┼──────────────────────┤
  │ 桌機（Desktop） │ > 1024px    │ min-width: 1025px    │
  │ 平板（Tablet）  │ 601-1024px  │ max-width: 1024px    │
  │ 手機（Mobile）  │ ≤ 600px     │ max-width: 600px     │
  └─────────────────┴──────────────┴──────────────────────┘

  響應式單位：
  %   → 相對於父元素（寬度常用）
  vw  → viewport width（1vw = 視窗寬度的 1%）
  vh  → viewport height（1vh = 視窗高度的 1%）
  px  → 固定像素（不會自動縮放）
  rem → 相對於根元素 font-size（通常 1rem = 16px）

  在 Angular 裡：
  → 元件 CSS 用 @media query
  → 可搭配 Angular CDK BreakpointObserver 在 TypeScript 裡偵測視窗大小
*/

import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {

  // BreakpointObserver：在 TypeScript 裡偵測視窗大小
  private breakpointObserver = inject(BreakpointObserver);

  currentDevice: string = 'Desktop';
  windowWidth: number = window.innerWidth;

  ngOnInit(): void {
    // 監聽視窗大小變化
    this.breakpointObserver.observe([
      Breakpoints.Handset,   // 手機
      Breakpoints.Tablet,    // 平板
      Breakpoints.Web        // 桌機
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.Handset]) {
        this.currentDevice = '📱 手機（Mobile）';
      } else if (result.breakpoints[Breakpoints.Tablet]) {
        this.currentDevice = '📟 平板（Tablet）';
      } else {
        this.currentDevice = '🖥️ 桌機（Desktop）';
      }
    });

    // 監聽 resize 事件更新寬度顯示
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }
}
