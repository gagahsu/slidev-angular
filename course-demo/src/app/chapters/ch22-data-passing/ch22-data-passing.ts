import { Component } from '@angular/core';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-ch22-data-passing',
  imports: [ProductCard],
  templateUrl: './ch22-data-passing.html',
  styleUrl: './ch22-data-passing.css',
})
export class Ch22DataPassing {
  title = '第22章 - 資料傳遞（@Input / @Output）';
  cartItems: string[] = [];

  products = [
    { name: 'Angular 課程書', price: 599, inStock: true },
    { name: '機械鍵盤', price: 3500, inStock: true },
    { name: '程式貼紙', price: 150, inStock: false },
  ];

  onAddToCart(productName: string): void {
    this.cartItems.push(productName);
  }
}
