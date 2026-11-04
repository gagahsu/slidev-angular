import { Component } from '@angular/core';
// JsonPipe 包含在 CommonModule 裡，匯入後 HTML 才能使用 | json
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ch36-jsonpipe',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch36-jsonpipe.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch36-jsonpipe.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                      // 獨立元件
  imports: [CommonModule]
})
export class Ch36Jsonpipe {

  // 要顯示在畫面上的物件
  user = {
    name: 'John',
    age: 30,
    roles: ['admin', 'user']
  };

  // 另一種方式：在 TS 手動轉成字串
  userText = JSON.stringify(this.user);
}
