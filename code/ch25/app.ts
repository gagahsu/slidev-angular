/*
  === 第25章：@if 條件顯示 ===

  @if 讓你根據條件決定是否在畫面上顯示某個 HTML 區塊。
  條件為 false 時，Angular 會把那段 HTML 直接從 DOM 移除。

  語法：
  @if (條件) {
    <p>條件為 true 時顯示</p>
  } @else if (其他條件) {
    <p>第二個條件成立時顯示</p>
  } @else {
    <p>以上都不成立時顯示</p>
  }

  @if vs display:none 的差異：
  ① @if  → DOM 完全移除，使用者打開 DevTools 也看不到
  ② display:none → 元素還在 DOM，只是被隱藏，在 DevTools 可以看到
  → 有敏感資料（如 VIP 內容）請用 @if，不要用 display:none
*/

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class AppComponent {

  // ==============================
  // 基本 @if / @else 示範
  // ==============================

  isLoggedIn: boolean = false;

  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }

  // ==============================
  // @else if 示範（成績等級）
  // ==============================

  score: number = 75;

  get gradeLabel(): string {
    if (this.score >= 90) return '優秀';
    if (this.score >= 60) return '及格';
    return '不及格';
  }

  // ==============================
  // 實際應用：購物車空/非空狀態
  // ==============================

  cartItems: string[] = ['Angular 課程書', '機械鍵盤'];

  addItem(): void {
    this.cartItems.push('新商品 ' + (this.cartItems.length + 1));
  }

  clearCart(): void {
    this.cartItems = [];
  }

  // ==============================
  // 實際應用：載入中狀態
  // ==============================

  isLoading: boolean = false;
  loadedData: string = '';

  simulateLoad(): void {
    this.isLoading = true;
    this.loadedData = '';

    // 模擬 API 等待 2 秒
    setTimeout(() => {
      this.isLoading = false;
      this.loadedData = '資料載入成功！共 42 筆記錄。';
    }, 2000);
  }
}
