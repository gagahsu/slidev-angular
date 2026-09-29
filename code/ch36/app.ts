/*
  === 第36章：JsonPipe（物件格式化顯示）===

  問題：在 HTML 裡直接用插值顯示物件，會看到 "[object Object]"
       這是因為 JavaScript 把物件轉字串時的預設輸出。

  解法：使用 Angular 的 JsonPipe，把物件序列化成格式化的 JSON 字串。
  語法：{{ 物件 | json }}

  搭配 <pre> 標籤效果更好：
  → <pre> 保留空白和換行，讓 JSON 結構清晰顯示
  → 常用在除錯（debug）時快速查看物件內容

  使用 JsonPipe 需要在 imports 加入 CommonModule。
*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule]   // JsonPipe / DatePipe 都包含在 CommonModule
})
export class AppComponent {

  // 基本物件
  user = {
    name: 'Allen',
    age: 25,
    email: 'allen@example.com',
    roles: ['admin', 'editor']
  };

  // 巢狀物件（更複雜的結構）
  order = {
    id: 'ORD-2024-001',
    status: 'processing',
    customer: {
      name: '王小明',
      address: '台北市信義區'
    },
    items: [
      { product: 'Angular 課程書', qty: 1, price: 599 },
      { product: '機械鍵盤',       qty: 1, price: 3500 }
    ],
    total: 4099,
    createdAt: new Date()
  };

  // 陣列
  scores = [88, 92, 75, 100, 63];
}
