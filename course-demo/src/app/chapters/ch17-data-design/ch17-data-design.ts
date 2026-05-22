import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-ch17-data-design',
  imports: [],
  templateUrl: './ch17-data-design.html',
  styleUrl: './ch17-data-design.css',
})
export class Ch17DataDesign {
  title = '第17章 - 資料設計';

  products: Product[] = [
    { id: 1, name: 'Angular 課程書', price: 599, category: '書籍', inStock: true },
    { id: 2, name: '機械鍵盤', price: 3500, category: '配件', inStock: true },
    { id: 3, name: '程式貼紙', price: 150, category: '周邊', inStock: false },
    { id: 4, name: 'TypeScript 速查表', price: 299, category: '書籍', inStock: true },
    { id: 5, name: '27吋螢幕', price: 8900, category: '配件', inStock: false },
  ];

  get totalProducts(): number { return this.products.length; }
  get inStockCount(): number { return this.products.filter(p => p.inStock).length; }
  get totalValue(): number {
    return this.products.filter(p => p.inStock).reduce((s, p) => s + p.price, 0);
  }
}
