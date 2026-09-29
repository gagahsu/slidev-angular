/*
  === 第22章：資料傳遞 ===

  Angular 元件之間傳遞資料的三種方式：
  ① @Input  → 父元件傳給子元件（單向，由上往下）
  ② @Output → 子元件通知父元件（用 EventEmitter 發送事件）
  ③ 路由參數 → 頁面之間傳遞（透過 URL）

  本章示範 @Input / @Output 的父子元件溝通。

  想像成：
  @Input  = 父母給孩子零用錢（由上往下傳）
  @Output = 孩子跟父母報告今天發生的事（由下往上傳）
*/

import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  standalone: true,
  imports: [
    ChildComponent    // 必須在這裡 import 子元件，HTML 才認得 <app-child>
  ]
})
export class ParentComponent {

  // 父元件的資料
  parentMessage: string = "我是父元件的訊息";
  selectedProduct: string = "";

  // 商品清單（要傳給子元件顯示）
  products: string[] = ["Angular 課程書", "機械鍵盤", "貼紙包"];

  // 當子元件透過 @Output 傳來選擇事件時，這個方法被呼叫
  onProductSelected(productName: string): void {
    this.selectedProduct = productName;
    console.log("父元件收到子元件的選擇：", productName);
  }
}
