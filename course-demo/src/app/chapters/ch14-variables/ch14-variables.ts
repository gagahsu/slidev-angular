import { Component } from '@angular/core';

@Component({
  selector: 'app-ch14-variables',
  imports: [],
  templateUrl: './ch14-variables.html',
  styleUrl: './ch14-variables.css',
})
export class Ch14Variables {
  // ==============================
  // 全域變數（宣告在 class 最上層）
  // 整個元件的任何方法都可以用 this.xxx 存取
  // ==============================
  title: string = '第14章 - 變數使用';
  userName: string = 'Allen';
  age: number = 25;
  isActive: boolean = true;
  count: number = 0;
  hobbies: string[] = ['寫程式', '打籃球', '看電影'];

  // 沒有初始值 → 加 ! 告訴 TypeScript 你保證之後會賦值
  lazyValue!: string;

  // 計算屬性（getter）：像變數一樣使用，但實際上是計算出來的
  get welcomeMessage(): string {
    return `歡迎，${this.userName}！`;
  }

  get statusLabel(): string {
    return this.isActive ? '✅ 啟用中' : '❌ 已停用';
  }

  // 方法：修改全域變數時用 this.xxx
  increment(): void { this.count++; }
  decrement(): void { if (this.count > 0) this.count--; }
  reset(): void { this.count = 0; }
  toggleStatus(): void { this.isActive = !this.isActive; }
}
