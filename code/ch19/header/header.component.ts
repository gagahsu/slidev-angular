/*
  === 第19章：新增組件 — Header 元件 ===

  這是一個「可重複使用」的頁首元件範例。
  我們把 Header 獨立成一個元件，任何頁面需要頁首，
  只要在 HTML 裡加一行 <app-header></app-header> 就好！

  元件的三大要素：
  ① selector  → 這個元件在 HTML 裡用什麼「標籤名稱」引用
  ② template  → 元件的 HTML 畫面（可以是外部檔案或直接寫在這裡）
  ③ styles    → 元件專屬的 CSS 樣式
*/

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  // 這個元件在 HTML 裡的使用方式：<app-header></app-header>
  selector: 'app-header',

  // 外部 HTML 模板（對應 header.component.html）
  templateUrl: './header.component.html',

  // 外部 CSS（只對這個元件內的元素生效，不影響外部）
  styleUrls: ['./header.component.css'],
  standalone: true,   // Angular 17+ 獨立元件
  imports: [
    RouterLink,        // 讓 [routerLink] 屬性可以使用
    RouterLinkActive   // 讓 routerLinkActive 屬性可以使用
  ]
})
export class HeaderComponent {
  // 導覽列的連結清單（資料）
  navLinks = [
    { label: '首頁', path: '/' },
    { label: '課程', path: '/courses' },
    { label: '關於', path: '/about' },
    { label: '聯絡', path: '/contact' }
  ];

  // 網站名稱
  siteName: string = "Angular 學習平台";

  // 使用者資訊（模擬登入狀態）
  isLoggedIn: boolean = false;
  userName: string = "";

  // 切換登入狀態（示範用）
  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
    this.userName = this.isLoggedIn ? "Allen" : "";
  }
}
