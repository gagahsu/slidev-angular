import { Component } from '@angular/core';
// [(ngModel)] 雙向綁定需要 FormsModule
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

// 定義 foods 陣列每一筆的形狀
interface Food {
  value: string;      // 實際值
  viewValue: string;  // 顯示文字
}

@Component({
  selector: 'app-ch40-select',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch40-select.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch40-select.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                    // 獨立元件
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule]
})
export class Ch40Select {

  // 選單目前選中的值
  selectData = '';

  // mat-select 的選項
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  // 補充練習 1
  petChoice: string = '';

  // 補充練習 3：選項來自陣列，不寫死在 HTML
  catBreeds = [
    { code: 'minuet', name: '曼赤肯貓' },
    { code: 'bsh', name: '英國短毛貓' },
    { code: 'persian', name: '波斯貓' }
  ];
  selectedBreed: string = '';
}
