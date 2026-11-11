import { Routes } from '@angular/router';
import { Ch48Sidenav } from './ch48-sidenav';
import { MenuCartComponent, MenuDashboardComponent, MenuHomeComponent } from './pages/menu-pages';

// 練習用的頁面路由，放在 /ch48 底下
export const routes: Routes = [
  {
    path: '',
    component: Ch48Sidenav,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MenuHomeComponent },
      { path: 'dashboard', component: MenuDashboardComponent },
      { path: 'cart', component: MenuCartComponent },
    ]
  }
];
