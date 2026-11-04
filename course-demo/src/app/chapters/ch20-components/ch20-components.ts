import { Component } from '@angular/core';
// 使用子元件的兩個步驟：① 用 import 匯入 ② 加進下面的 imports 陣列，缺一不可
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RolesComponent } from './components/roles/roles.component';

@Component({
  selector: 'app-ch20-components',         // 這個元件在 HTML 中使用的標籤名稱
  imports: [HeaderComponent, FooterComponent, RolesComponent],
  templateUrl: './ch20-components.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch20-components.css',       // 這個元件使用的 CSS 檔案
})
export class Ch20Components {}
