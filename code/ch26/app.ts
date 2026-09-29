/*
  === 第26章：@switch 條件切換 ===

  switch 是 if...else if...else 的替代寫法，
  適合用在「同一個變數對應多個固定值」的情況，程式碼更整齊。

  TypeScript switch 語法：
  switch (變數) {
    case 值1:
      // 做某事
      break;      ← 必須加！沒有 break 會繼續往下執行（fall-through）
    case 值2:
      // 做某事
      break;
    default:
      // 以上都不符合時執行
      break;
  }

  Angular HTML @switch 語法：
  @switch (變數) {
    @case (值1) { <p>...</p> }
    @case (值2) { <p>...</p> }
    @default    { <p>...</p> }
  }
*/

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class AppComponent {

  // ==============================
  // 基本 switch 示範（TypeScript）
  // ==============================

  testNum: number = 1;
  switchResult: string = '';

  runSwitch(): void {
    switch (this.testNum) {
      case 1:
        this.switchResult = '你選了 1 號：蘋果 🍎';
        break;
      case 2:
        this.switchResult = '你選了 2 號：香蕉 🍌';
        break;
      case 3:
        this.switchResult = '你選了 3 號：芒果 🥭';
        break;
      default:
        this.switchResult = '沒有這個選項，請選 1、2 或 3';
        break;
    }
    console.log('switch 結果：', this.switchResult);
  }

  // ==============================
  // 實際應用：頁籤切換
  // ==============================

  activeTab: string = 'home';

  setTab(tab: string): void {
    this.activeTab = tab;
    console.log('切換到頁籤：', tab);
  }

  // ==============================
  // 實際應用：角色職業描述
  // ==============================

  role: string = 'warrior';
  roleDescription: string = '';

  describeRole(): void {
    switch (this.role) {
      case 'warrior':
        this.roleDescription = '戰士：高攻擊力，擅長近戰！';
        break;
      case 'mage':
        this.roleDescription = '法師：強力魔法攻擊，但血量較低！';
        break;
      case 'archer':
        this.roleDescription = '弓手：遠距離攻擊，機動力強！';
        break;
      case 'healer':
        this.roleDescription = '牧師：治療隊友，不可或缺的輔助！';
        break;
      default:
        this.roleDescription = '未知職業';
        break;
    }
  }
}
