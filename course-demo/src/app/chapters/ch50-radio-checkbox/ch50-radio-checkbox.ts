import { Component } from '@angular/core';
// [(ngModel)] 雙向綁定需要 FormsModule
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-ch50-radio-checkbox',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch50-radio-checkbox.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch50-radio-checkbox.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                            // 獨立元件
  imports: [FormsModule, MatRadioModule, MatCheckboxModule]
})
export class Ch50RadioCheckbox {

  // checkbox 的狀態是布林值：勾選是 true，取消是 false
  checkBoxData1: boolean = false;
  checkBoxData2: boolean = false;

  // 練習：甜度選項
  sweetnessOptions = [
    { value: 'less', label: '少糖' },
    { value: 'normal', label: '正常糖' },
    { value: 'no-sugar', label: '無糖' },
  ];
  selectedSweetness = 'normal';

  // 練習：加料選項，每一筆記錄自己有沒有被勾選
  toppings = [
    { label: '珍珠', checked: false },
    { label: '椰果', checked: false },
    { label: '布丁', checked: false },
  ];

  // getter：像變數一樣使用，但內容是即時算出來的
  // filter 篩出已勾選的，map 取出名稱，join 用頓號串接
  get selectedToppingsText(): string {
    const picked = this.toppings.filter(t => t.checked).map(t => t.label);
    return picked.length ? picked.join('、') : '無';
  }
}
