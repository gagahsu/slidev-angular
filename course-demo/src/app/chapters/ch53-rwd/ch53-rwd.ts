import { Component } from '@angular/core';

@Component({
  selector: 'app-ch53-rwd',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch53-rwd.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch53-rwd.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                 // 獨立元件
  imports: []                       // RWD 都寫在 CSS，這裡不需要程式
})
export class Ch53Rwd {}
