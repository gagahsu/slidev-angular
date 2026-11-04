// 從 Angular 核心套件匯入 Component，用來宣告「這個 class 是一個元件」
import { Component } from '@angular/core';

@Component({
  selector: 'app-ch14-variables',         // 這個元件在 HTML 中使用的標籤名稱
  imports: [],                            // 這一章不需要額外的模組
  templateUrl: './ch14-variables.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch14-variables.css',       // 這個元件使用的 CSS 檔案
})
export class Ch14Variables {

  // 全域變數：宣告在 class 最上層，整個 TS 都可以使用
  // 型別推斷：有初始值時可以省略型別，TypeScript 會自動判斷 title 是 string
  title = 'demo2';

  // 顯式標註：明確寫出型別，效果和上面一樣
  testTitle: string = '我是標題';
  // 驚嘆號是非空斷言：沒有初始值時，保證之後一定會給值
  testContent!: string;

  // 屬性綁定示範用的變數
  buttonText = '我是按鈕';
  demoImage = 'images/product.svg';

  // 練習：畫面上的文字和圖片網址，全部由變數提供
  titleText: string = '我是標題';
  contentText: string = '內容是我';
  imageSrc: string = 'images/product.svg';

  // 補充練習 1：個人檔案
  userName: string = 'Allen';
  userAge: number = 30;

  // 補充練習 2：超連結網址
  targetUrl: string = 'https://www.google.com';

  // 使用全域變數：在方法中要加上 this.
  showTitle() {
    alert(this.title);
  }

  // 使用區域變數：只在這個方法內有效，方法結束就消失
  showLocalTitle() {
    let title = 'demo2（區域變數）';
    alert(title);
  }
}
