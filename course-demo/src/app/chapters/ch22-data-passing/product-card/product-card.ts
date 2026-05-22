import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() inStock: boolean = true;
  @Output() addToCart = new EventEmitter<string>();

  onAddToCart(): void {
    this.addToCart.emit(this.name);
  }
}
