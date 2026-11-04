import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
// 投影片的子元件都叫 SecondComponent；這裡同一頁要放兩個，所以用不同名字
import { InputChildComponent } from './components/input-child/input-child.component';
import { OutputChildComponent } from './components/output-child/output-child.component';

@Component({
  selector: 'app-ch23-data-passing',         // 這個元件在 HTML 中使用的標籤名稱
  imports: [FormsModule, RouterOutlet, RouterLink, InputChildComponent, OutputChildComponent],
  templateUrl: './ch23-data-passing.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch23-data-passing.css',       // 這個元件使用的 CSS 檔案
})
export class Ch23DataPassing {

  // 練習 1：用 ngModel 綁定輸入框，再用 @Input 傳給子元件
  userName = '';
  userEmail = '';
  userAddress = '';

  // 練習 2：接收子元件傳回來的資料
  receivedData = { userName: '', userEmail: '', userAddress: '' };

  // $event 就是子元件 emit 出來的整包物件
  onReceive(event: { userName: string; userEmail: string; userAddress: string }) {
    this.receivedData = event;
  }
}
