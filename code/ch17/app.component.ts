/*
  === 第17章：Angular 資料設計示範 ===

  展示如何從「資料陣列」驅動畫面。
  對應 HTML 使用 @for 指令來渲染清單。
*/

import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,   // Angular 17+ 獨立元件
  imports: []
  // @for 和 @if 是 Angular 17+ 內建的控制流語法，不需要 import CommonModule
})
export class AppComponent {

  // 頁面標題
  pageTitle: string = "🛒 商品清單";

  // 商品資料（模擬後端 API 回傳的資料）
  products: Product[] = [
    { id: 1, name: "Angular 課程書", price: 599, category: "書籍", inStock: true },
    { id: 2, name: "機械鍵盤",       price: 3500, category: "配件", inStock: true },
    { id: 3, name: "程式設計貼紙",   price: 150, category: "周邊", inStock: false },
    { id: 4, name: "TypeScript 速查表", price: 299, category: "書籍", inStock: true },
    { id: 5, name: "27吋螢幕",       price: 8900, category: "配件", inStock: false }
  ];

  // 計算屬性
  get totalProducts(): number {
    return this.products.length;
  }

  get inStockProducts(): number {
    return this.products.filter(p => p.inStock).length;
  }

  get totalValue(): number {
    return this.products
      .filter(p => p.inStock)
      .reduce((sum, p) => sum + p.price, 0);
  }
}
