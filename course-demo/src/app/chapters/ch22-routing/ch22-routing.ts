import { Component } from '@angular/core';
// 使用 HTML 導航需要這三個：顯示容器、導航連結、目前頁面的樣式
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ch22-routing',         // 這個元件在 HTML 中使用的標籤名稱
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './ch22-routing.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch22-routing.css',       // 這個元件使用的 CSS 檔案
})
export class Ch22Routing {}
