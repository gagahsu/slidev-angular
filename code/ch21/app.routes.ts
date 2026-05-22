/*
  === 第21章：路由（Routing）===

  Angular 路由讓你的應用變成「多頁面感」的 SPA（單頁應用程式）。
  「不換頁，只換畫面」——URL 改變，Angular 換掉 <router-outlet> 裡的元件。

  設定步驟：
  ① 建立各頁面的元件
  ② 在 app.routes.ts 定義 URL 路徑 → 元件的對應關係
  ③ 在 app.component.html 放 <router-outlet> 當作畫面的「切換插槽」
  ④ 用 routerLink 做導覽連結
*/

import { Routes } from '@angular/router';

// 引入各頁面元件
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// 路由設定（路徑 → 元件 的對應表）
export const routes: Routes = [
  // 首頁（根路徑）
  { path: '', component: HomeComponent },

  // 關於頁面
  { path: 'about', component: AboutComponent },

  // 動態路由（:id 是路由參數，可以傳遞不同的 id）
  // 例如：/courses/1、/courses/2、/courses/42
  { path: 'courses/:id', component: CourseDetailComponent },

  // 萬用路由（所有不存在的路徑都導向 404 頁面）
  // 注意：這行必須放在最後面！Angular 路由是「從上往下」匹配
  { path: '**', component: NotFoundComponent }
];
