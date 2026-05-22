/*
  === 第14章：Angular 元件中宣告變數與資料綁定 ===

  這是一個真實的 Angular 元件範例。
  把這個檔案的程式碼，對應到你的 Angular 專案的 app.component.ts。

  資料綁定（Data Binding）：
  把 TypeScript 的變數「綁定」到 HTML 上顯示
  → 在 HTML 裡用 {{ 變數名稱 }} 來顯示變數的值
  → 這叫做「插值（Interpolation）」
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',   // 對應的 HTML 模板
  styleUrls: ['./app.component.css'],
  standalone: true,   // Angular 17+ 獨立元件，不需要 NgModule
  imports: []         // 這個元件只用插值 {{}}，不需要額外 import
})
export class AppComponent {

  // ==========================================
  // 全域變數（會顯示在 HTML 畫面上的資料）
  // ==========================================

  title: string = "我的 Angular 應用";

  // 個人資料
  userName: string = "Allen";
  age: number = 25;
  isActive: boolean = true;

  // 計數器
  count: number = 0;

  // 清單（陣列）
  hobbies: string[] = ["寫程式", "打籃球", "看電影"];

  // 計算屬性（根據其他變數動態計算的值）
  get welcomeMessage(): string {
    // getter：像使用變數一樣，但實際上是計算出來的結果
    return `歡迎，${this.userName}！`;
  }

  // ==========================================
  // 方法（Methods）
  // ==========================================

  // 點擊 +1 按鈕
  increment(): void {
    this.count++;  // this.count 加 1
  }

  // 點擊 -1 按鈕
  decrement(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  // 重置
  reset(): void {
    this.count = 0;
  }
}
