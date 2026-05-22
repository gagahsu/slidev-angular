/*
  === 第15章：Angular 元件中的方法 ===

  在 Angular 中，方法主要用來：
  ① 回應使用者點擊（按鈕事件）
  ② 處理資料計算
  ③ 在 ngOnInit 等生命週期鉤子中做初始化

  HTML 中用 (click)="方法名稱()" 來綁定點擊事件
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,   // Angular 17+ 獨立元件
  imports: []         // 只用事件綁定 (click)，不需要額外 import
})
export class AppComponent {

  // 屬性
  playerName: string = "勇者 Allen";
  hp: number = 100;
  mp: number = 50;
  gold: number = 0;
  message: string = "遊戲開始！";

  // ==========================================
  // 方法（對應 HTML 裡的按鈕）
  // ==========================================

  // 攻擊（扣 HP）
  takeDamage(damage: number): void {
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;
    this.message = `受到 ${damage} 點傷害！剩餘 HP：${this.hp}`;
  }

  // 使用魔法（扣 MP）
  useMagic(): void {
    const cost: number = 10;
    if (this.mp >= cost) {
      this.mp -= cost;
      this.message = `使用魔法！剩餘 MP：${this.mp}`;
    } else {
      this.message = "MP 不足，無法使用魔法！";
    }
  }

  // 休息（回復 HP 和 MP）
  rest(): void {
    this.hp = 100;
    this.mp = 50;
    this.message = "充分休息！HP 和 MP 全回復！";
  }

  // 拾取金幣
  pickUpGold(amount: number): void {
    this.gold += amount;
    this.message = `撿到 ${amount} 金幣！目前擁有 ${this.gold} 金幣。`;
  }

  // 計算屬性（getter）：根據 HP 決定狀態文字
  get statusText(): string {
    if (this.hp >= 80) return "💪 狀態良好";
    if (this.hp >= 40) return "😰 有點受傷";
    if (this.hp > 0)   return "🤕 奄奄一息";
    return "💀 已倒下";
  }
}
