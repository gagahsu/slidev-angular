// 從 Angular 核心套件匯入 Component，用來宣告「這個 class 是一個元件」
import { Component } from '@angular/core';
// 匯入 Material 的圖示模組，HTML 才認得 <mat-icon> 標籤
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ch33-mat-icon',          // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch33-mat-icon.html',    // 這個元件使用的 HTML 檔案
  styleUrl: './ch33-mat-icon.css',        // 這個元件使用的 CSS 檔案
  standalone: true,                       // 獨立元件：需要的模組直接寫在下面的 imports
  imports: [MatIconModule]                // 只寫上面的 import 還不夠，一定要加進這個陣列
})
export class Ch33MatIcon {

  // 目前要顯示的圖示名稱，一開始是空心愛心
  myCurrentIcon: string = 'favorite_border';

  // 點擊愛心時執行：把圖示名稱換成實心愛心
  // 變數的值一改變，畫面上的圖示就會跟著改變
  changeMyIcon() {
    this.myCurrentIcon = 'favorite';
  }
}
