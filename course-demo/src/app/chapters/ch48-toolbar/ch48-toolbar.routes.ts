import { Routes } from '@angular/router';
import { Ch48Toolbar } from './ch48-toolbar';
// 這一題延續 ch47，所以直接使用 ch47 的頁面
import { MenuCartComponent, MenuDashboardComponent, MenuHomeComponent } from '../ch47-sidenav/pages/menu-pages';

export const routes: Routes = [
  {
    path: '',
    component: Ch48Toolbar,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MenuHomeComponent },
      { path: 'dashboard', component: MenuDashboardComponent },
      { path: 'cart', component: MenuCartComponent },
    ]
  }
];
