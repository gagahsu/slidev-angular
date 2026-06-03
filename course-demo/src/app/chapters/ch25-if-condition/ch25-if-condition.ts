import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ch25-if-condition',
  templateUrl: './ch25-if-condition.html',
  styleUrl: './ch25-if-condition.css',
  standalone: true,
  imports: [FormsModule]
})
export class Ch25IfCondition {

  isLoggedIn: boolean = false;

  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }

  score: number = 75;

  get gradeLabel(): string {
    if (this.score >= 90) return '優秀';
    if (this.score >= 60) return '及格';
    return '不及格';
  }

  cartItems: string[] = ['Angular 課程書', '機械鍵盤'];

  addItem(): void {
    this.cartItems.push('新商品 ' + (this.cartItems.length + 1));
  }

  clearCart(): void {
    this.cartItems = [];
  }

  isLoading: boolean = false;
  loadedData: string = '';

  simulateLoad(): void {
    this.isLoading = true;
    this.loadedData = '';
    setTimeout(() => {
      this.isLoading = false;
      this.loadedData = '資料載入成功！共 42 筆記錄。';
    }, 2000);
  }
}
