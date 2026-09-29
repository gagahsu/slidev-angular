/*
  === 第38章：ngClass（動態 CSS 類別）===

  [ngClass] 讓你根據條件，動態地加上或移除 CSS class。
  比直接用 [style.xxx] 好管理，因為樣式集中在 CSS 檔案裡。

  三種使用方式：
  ① 字串：永遠套用這個 class（靜態，不如直接寫 class="xxx"）
     [ngClass]="'active'"

  ② 物件：條件為 true 時套用 class
     [ngClass]="{ 'active': isActive, 'disabled': isDisabled }"

  ③ 方法：由 TypeScript 方法回傳 class 名稱（字串或物件）
     [ngClass]="getClass()"

  使用 ngClass 需要在 imports 加入 CommonModule。
*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppComponent {

  // ==============================
  // 控制 class 的布林值
  // ==============================

  isActive: boolean = false;
  isHighlighted: boolean = false;
  isDanger: boolean = false;

  // ==============================
  // 實際應用：頁籤選中狀態
  // ==============================

  activeTab: string = 'home';

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  // ==============================
  // 實際應用：表格列狀態
  // ==============================

  items = [
    { name: '商品 A', stock: 15, selected: false },
    { name: '商品 B', stock: 0,  selected: false },
    { name: '商品 C', stock: 3,  selected: false },
    { name: '商品 D', stock: 0,  selected: false },
    { name: '商品 E', stock: 8,  selected: false }
  ];

  toggleSelect(item: { selected: boolean }): void {
    item.selected = !item.selected;
  }

  // ==============================
  // 方法回傳 class 名稱
  // ==============================

  getStatusClass(stock: number): string {
    if (stock === 0) return 'out-of-stock';
    if (stock < 5)  return 'low-stock';
    return 'in-stock';
  }
}
