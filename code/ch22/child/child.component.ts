/*
  === 第22章：子元件（使用 @Input / @Output）===

  @Input  → 接收父元件傳來的值
  @Output → 向父元件發送事件（用 EventEmitter）

  使用步驟：
  ① 引入 Input, Output, EventEmitter
  ② 在屬性前加 @Input() 裝飾器 → 就能接收父元件的值
  ③ 建立 @Output() EventEmitter → 就能發送事件給父元件
  ④ 呼叫 this.xxx.emit(值) → 觸發事件並傳值
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  standalone: true,
  imports: []   // @for 是內建語法，不需要額外 import
})
export class ChildComponent {

  // ==============================
  // @Input：接收父元件傳來的資料
  // ==============================

  // [message] 屬性：接收父元件的訊息文字
  @Input() message: string = "";

  // [items] 屬性：接收父元件傳來的清單（字串陣列）
  @Input() items: string[] = [];

  // ==============================
  // @Output：向父元件發送事件
  // ==============================

  // (selected) 事件：子元件選擇後，通知父元件
  // EventEmitter<string> → 傳的是 string 型別的值
  @Output() selected = new EventEmitter<string>();

  // ==============================
  // 方法
  // ==============================

  // 使用者點選清單項目時呼叫
  onItemClick(item: string): void {
    // emit 方法：觸發 @Output 事件，並把選到的 item 傳給父元件
    this.selected.emit(item);
    console.log("子元件發送事件：", item);
  }
}
