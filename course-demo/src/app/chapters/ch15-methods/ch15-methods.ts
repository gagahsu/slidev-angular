import { Component } from '@angular/core';

@Component({
  selector: 'app-ch15-methods',
  imports: [],
  templateUrl: './ch15-methods.html',
  styleUrl: './ch15-methods.css',
})
export class Ch15Methods {
  title = '第15章 - 方法';
  playerName = '勇者 Allen';
  hp = 100;
  mp = 50;
  gold = 0;
  message = '遊戲開始！選擇一個動作吧。';
  log: string[] = [];

  takeDamage(damage: number): void {
    this.hp = Math.max(0, this.hp - damage);
    this.addLog(`受到 ${damage} 傷害！HP：${this.hp}`);
  }

  useMagic(): void {
    const cost = 10;
    if (this.mp >= cost) {
      this.mp -= cost;
      this.addLog(`施放魔法！MP：${this.mp}`);
    } else {
      this.addLog('MP 不足！');
    }
  }

  rest(): void {
    this.hp = 100;
    this.mp = 50;
    this.addLog('充分休息，HP 和 MP 全回復！');
  }

  pickGold(amount: number): void {
    this.gold += amount;
    this.addLog(`撿到 ${amount} 金幣！共 ${this.gold} 元`);
  }

  private addLog(msg: string): void {
    this.message = msg;
    this.log.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`);
    if (this.log.length > 5) this.log.pop();
  }

  get statusText(): string {
    if (this.hp >= 80) return '💪 良好';
    if (this.hp >= 40) return '😰 受傷';
    if (this.hp > 0)   return '🤕 危險';
    return '💀 倒下';
  }
}
