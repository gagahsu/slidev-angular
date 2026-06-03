import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-ch47-sidenav',
  templateUrl: './ch47-sidenav.html',
  styleUrl: './ch47-sidenav.css',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatToolbarModule]
})
export class Ch47Sidenav {
  currentMode: 'over' | 'push' | 'side' = 'over';

  menuItems = [
    { icon: 'home',     label: '首頁'   },
    { icon: 'person',   label: '個人資料' },
    { icon: 'settings', label: '設定'   },
    { icon: 'help',     label: '說明'   }
  ];

  activePage: string = '首頁';

  selectPage(label: string): void {
    this.activePage = label;
  }
}
