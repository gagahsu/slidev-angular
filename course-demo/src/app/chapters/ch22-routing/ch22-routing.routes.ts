import { Routes } from '@angular/router';
import { Ch22Routing } from './ch22-routing';
import { FirstComponent } from './pages/first/first.component';
import { ChildAComponent } from './pages/first/child-a/child-a.component';
import { SecondComponent } from './pages/second/second.component';
import { ListComponent } from './pages/list/list.component';
import { ResultComponent } from './pages/result/result.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// 投影片把路線寫在 app.routes.ts。這個示範專案有很多章節，
// 所以這一章的路線都放在 ch22 底下，網址前面會多一段 /ch22
export const routes: Routes = [
  {
    path: '',
    component: Ch22Routing,
    children: [
      // 根路徑自動導向 first；pathMatch: 'full' 代表網址要完全一致
      { path: '', redirectTo: 'first', pathMatch: 'full' },
      {
        path: 'first',
        component: FirstComponent,
        // 子路由：path 只寫最後一段，不加斜線
        children: [
          { path: 'child-a', component: ChildAComponent }
        ]
      },
      { path: 'second', component: SecondComponent },
      // /:name 代表網址這一段是可以變動的值
      { path: 'list/:name', component: ListComponent },
      { path: 'result', component: ResultComponent },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      // ** 代表其他所有網址，必須放在最後面
      { path: '**', component: NotFoundComponent },
    ]
  }
];
