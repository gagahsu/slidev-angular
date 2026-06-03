import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ch36-jsonpipe',
  templateUrl: './ch36-jsonpipe.html',
  styleUrl: './ch36-jsonpipe.css',
  standalone: true,
  imports: [CommonModule]
})
export class Ch36Jsonpipe {
  user = {
    name: 'Allen',
    age: 25,
    email: 'allen@example.com',
    roles: ['admin', 'editor']
  };

  order = {
    id: 'ORD-2024-001',
    status: 'processing',
    customer: { name: '王小明', address: '台北市信義區' },
    items: [
      { product: 'Angular 課程書', qty: 1, price: 599 },
      { product: '機械鍵盤', qty: 1, price: 3500 }
    ],
    total: 4099,
    createdAt: new Date()
  };

  scores = [88, 92, 75, 100, 63];
}
