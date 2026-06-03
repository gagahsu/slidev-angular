import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ch33-mat-icon',
  templateUrl: './ch33-mat-icon.html',
  styleUrl: './ch33-mat-icon.css',
  standalone: true,
  imports: [MatIconModule, MatButtonModule]
})
export class Ch33MatIcon {

  iconList: { name: string; fontIcon: string }[] = [
    { name: '首頁',   fontIcon: 'home'          },
    { name: '搜尋',   fontIcon: 'search'        },
    { name: '設定',   fontIcon: 'settings'      },
    { name: '個人',   fontIcon: 'person'        },
    { name: '購物車', fontIcon: 'shopping_cart' },
    { name: '愛心',   fontIcon: 'favorite'      },
    { name: '星星',   fontIcon: 'star'          },
    { name: '刪除',   fontIcon: 'delete'        },
    { name: '編輯',   fontIcon: 'edit'          },
    { name: '新增',   fontIcon: 'add'           },
    { name: '返回',   fontIcon: 'arrow_back'    },
    { name: '選單',   fontIcon: 'menu'          }
  ];

  selectedIcon: string = 'home';

  selectIcon(fontIcon: string): void {
    this.selectedIcon = fontIcon;
  }
}
