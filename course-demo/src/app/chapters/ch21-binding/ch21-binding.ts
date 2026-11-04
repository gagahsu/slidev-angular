import { Component } from '@angular/core';
// [ngClass] 需要 NgClass
import { NgClass } from '@angular/common';
// [(ngModel)] 雙向繫結需要 FormsModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ch21-binding',         // 這個元件在 HTML 中使用的標籤名稱
  imports: [FormsModule, NgClass],      // 這個元件用到的模組
  templateUrl: './ch21-binding.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch21-binding.css',       // 這個元件使用的 CSS 檔案
})
export class Ch21Binding {

  // 內嵌繫結範例
  title = '我的 Angular 應用';
  name = 'Allen';

  // 內嵌繫結小節練習
  product = '筆記型電腦';
  price = 25000;
  qty = 3;

  // 屬性繫結範例
  hintText = '請輸入姓名';
  imgUrl = 'images/product.svg';
  isSelected = false;
  isActive = true;
  hasError = false;

  // 屬性繫結小節練習
  isVip = true;
  inputHint = '請輸入會員編號';

  // 事件繫結：$event 範例
  keyword = '';

  // 事件繫結小節練習
  count = 0;

  // 雙向繫結小節練習
  nickname = '';

  // 練習 1～2：等級計算機
  level = 1;
  attack = 3;
  defense = 2;
  inputLevel = 1;

  // 條件為 true 時，按鈕會被禁用
  isMinLevel() { return this.level <= 1; }
  isMaxLevel() { return this.level >= 99; }

  // 每次點擊都反轉 isSelected，畫面的 class 會跟著改變
  select() { this.isSelected = !this.isSelected; }

  // $event 是原生事件物件，要轉型成 HTMLInputElement 才能讀取 .value
  onSearch(event: Event) {
    this.keyword = (event.target as HTMLInputElement).value;
  }

  // 計數器：+1
  addCount() { this.count++; }
  // 計數器：歸零
  resetCount() { this.count = 0; }

  // 升級：等級 +1，再重新計算攻擊力與防禦力
  levelUp() {
    this.level++;
    this.attack = this.level * 3;
    this.defense = this.level * 2;
  }

  // 降級：等級不可小於 1
  levelDown() {
    if (this.level > 1) {
      this.level--;
      this.attack = this.level * 3;
      this.defense = this.level * 2;
    }
  }

  // 依輸入框的等級重新計算
  modifyLevel() {
    if (this.inputLevel >= 1) {
      this.level = this.inputLevel;
      this.attack = this.level * 3;
      this.defense = this.level * 2;
    }
  }

  // 全部恢復成 1 等
  reset() {
    this.level = 1;
    this.attack = 3;
    this.defense = 2;
    this.inputLevel = 1;
  }
}
