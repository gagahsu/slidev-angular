import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ch26-switch',
  templateUrl: './ch26-switch.html',
  styleUrl: './ch26-switch.css',
  standalone: true,
  imports: [FormsModule]
})
export class Ch26Switch {

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
  }

  activeTab: string = 'home';

  setTab(tab: string): void {
    this.activeTab = tab;
  }

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
