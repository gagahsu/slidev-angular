import { Routes } from '@angular/router';
import { Ch23DataPassing } from './ch23-data-passing';
import { PageAComponent } from './pages/page-a/page-a.component';
import { PageBComponent } from './pages/page-b/page-b.component';

// A、B 是不同的路由頁面，用來示範 Service 可以跨頁面傳遞資料
export const routes: Routes = [
  {
    path: '',
    component: Ch23DataPassing,
    children: [
      { path: '', redirectTo: 'page-a', pathMatch: 'full' },
      { path: 'page-a', component: PageAComponent },
      { path: 'page-b', component: PageBComponent },
    ]
  }
];
