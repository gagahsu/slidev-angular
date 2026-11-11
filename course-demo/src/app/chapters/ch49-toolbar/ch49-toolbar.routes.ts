import { Routes } from '@angular/router';
import { Ch49Toolbar } from './ch49-toolbar';
// 這一題延續 ch48，所以直接使用 ch48 的頁面
import { MenuCartComponent, MenuDashboardComponent, MenuHomeComponent } from '../ch48-sidenav/pages/menu-pages';

export const routes: Routes = [
  {
    path: '',
    component: Ch49Toolbar,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MenuHomeComponent },
      { path: 'dashboard', component: MenuDashboardComponent },
      { path: 'cart', component: MenuCartComponent },
    ]
  }
];
