import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ch39-tabs',
  templateUrl: './ch39-tabs.html',
  styleUrl: './ch39-tabs.css',
  standalone: true,
  imports: [MatTabsModule, RouterOutlet, RouterLink]
})
export class Ch39Tabs {
  staticTabs = [
    { label: '首頁',   content: '歡迎來到首頁！這裡是首頁的內容。',     icon: '🏠' },
    { label: '課程',   content: '共有 55 堂課程，從 HTML 到 Angular 全覆蓋。', icon: '📚' },
    { label: '練習題', content: '每個章節都附有練習題，讓你動手實作。',  icon: '✏️' },
    { label: '關於',   content: '本課程由 Angular 講師設計，適合初學者。', icon: '📌' }
  ];

  links = [
    { path: '/home',    name: '首頁'   },
    { path: '/courses', name: '課程'   },
    { path: '/about',   name: '關於'   }
  ];

  activeLink = this.links[0].name;
}
