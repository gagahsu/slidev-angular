import { Component } from '@angular/core';

@Component({
  selector: 'app-ch26-if-condition',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch26-if-condition.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch26-if-condition.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                          // 獨立元件
  imports: []                                // @if 是內建語法，不需要匯入模組
})
export class Ch26IfCondition {

  // @if 小節練習
  isLoggedIn = true;

  // @else if 小節練習
  score = 75;

  // 補充練習：記錄側邊欄是否展開
  showSidebar: boolean = true;

  // ! 會把布林值反轉，true 變 false、false 變 true
  toggleMenu() {
    this.showSidebar = !this.showSidebar;
  }
}
