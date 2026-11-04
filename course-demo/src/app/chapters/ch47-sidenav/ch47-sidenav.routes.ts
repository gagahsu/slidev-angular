import { Routes } from '@angular/router';
import { Ch47Sidenav } from './ch47-sidenav';
import { MenuCartComponent, MenuDashboardComponent, MenuHomeComponent } from './pages/menu-pages';

// 練習用的頁面路由，放在 /ch47 底下
export const routes: Routes = [
  {
    path: '',
    component: Ch47Sidenav,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MenuHomeComponent },
      { path: 'dashboard', component: MenuDashboardComponent },
      { path: 'cart', component: MenuCartComponent },
    ]
  }
];
