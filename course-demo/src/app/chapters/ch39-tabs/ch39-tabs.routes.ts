import { Routes } from '@angular/router';
import { Ch39Tabs } from './ch39-tabs';
import { AdminComponent, ProfileComponent, Test1Component, Test2Component, Test3Component } from './pages/test-pages';

// 投影片的路徑是 /test/test1；這個示範專案放在 /ch39 底下
// 各頁籤要設成同一層的 children，切換時導覽列才會保留
export const routes: Routes = [
  {
    path: '',
    component: Ch39Tabs,
    children: [
      { path: '', redirectTo: 'test1', pathMatch: 'full' },  // 預設導向第一個頁籤
      { path: 'test1', component: Test1Component },
      { path: 'test2', component: Test2Component },
      { path: 'test3', component: Test3Component },
      { path: 'profile', component: ProfileComponent },
      { path: 'admin', component: AdminComponent },
    ]
  }
];
