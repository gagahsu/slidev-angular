import { Component } from '@angular/core';
// 使用 [ngClass] 前要匯入 CommonModule
import { CommonModule } from '@angular/common';

// status 用聯合型別：只能是這四個字串，打錯字 TypeScript 會標紅
export interface Order {
  id: number;
  customer: string;
  status: 'pending' | 'shipped' | 'completed' | 'cancelled';
  isOverdue: boolean;
}

@Component({
  selector: 'app-ch38-ngclass',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch38-ngclass.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch38-ngclass.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                     // 獨立元件
  imports: [CommonModule]
})
export class Ch38Ngclass {

  // 動態條件綁定：true 時套用 class，false 時移除
  ngclassBoolean: boolean = true;

  // 練習：訂單清單
  orders: Order[] = [
    { id: 1, customer: '王小明', status: 'pending', isOverdue: false },
    { id: 2, customer: '陳美玲', status: 'shipped', isOverdue: true },
    { id: 3, customer: '林大偉', status: 'completed', isOverdue: false },
    { id: 4, customer: '張雅婷', status: 'cancelled', isOverdue: false },
    { id: 5, customer: '李志豪', status: 'pending', isOverdue: true },
  ];

  // 補充練習 1：高亮開關
  isActive: boolean = false;

  // 補充練習 3：分數
  myScore: number = 55;

  // 方法回傳：邏輯比較複雜時，把判斷寫在 TS
  getClassCss(): string {
    return 'test';
  }

  // 點擊時反轉 ngclassBoolean
  toggleBoolean() {
    this.ngclassBoolean = !this.ngclassBoolean;
  }

  // 練習：已取消的訂單，整列套用 row-cancelled
  getRowClass(order: Order): string {
    return order.status === 'cancelled' ? 'row-cancelled' : '';
  }

  // 補充練習 1：點擊時反轉 isActive
  toggle() {
    this.isActive = !this.isActive;
  }

  // 補充練習 3：60 分以上回傳 pass，否則回傳 fail
  getScoreClass(): string {
    if (this.myScore >= 60) {
      return 'pass';
    }
    return 'fail';
  }
}
