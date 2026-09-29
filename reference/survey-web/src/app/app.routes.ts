import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './core/auth-guard';
import { SurveyList } from './pages/front/survey-list';
import { SurveyFill } from './pages/front/survey-fill';
import { SurveyConfirm } from './pages/front/survey-confirm';
import { SurveyStats } from './pages/front/survey-stats';
import { Login } from './pages/front/login';
import { Register } from './pages/front/register';
import { Profile } from './pages/front/profile';
import { MyRecords } from './pages/front/my-records';
import { AdminList } from './pages/admin/admin-list';
import { AdminEditor } from './pages/admin/admin-editor';
import { AdminResponses } from './pages/admin/admin-responses';
import { AdminResponseDetail } from './pages/admin/admin-response-detail';

export const routes: Routes = [
  // 前台
  { path: '', component: SurveyList },
  { path: 'surveys/:id/fill', component: SurveyFill },
  { path: 'surveys/:id/confirm', component: SurveyConfirm },
  { path: 'surveys/:id/stats', component: SurveyStats },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'my-records', component: MyRecords, canActivate: [authGuard] },
  // 後台：整個 admin 底下的路由都要管理員
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', component: AdminList },
      { path: 'edit', component: AdminEditor },               // 新增
      { path: 'edit/:id', component: AdminEditor },           // 編輯
      { path: 'view/:id', component: AdminEditor },           // 唯讀
      { path: ':id/responses', component: AdminResponses },
      { path: 'responses/:id', component: AdminResponseDetail },
      { path: ':id/stats', component: SurveyStats, data: { admin: true } },
    ],
  },
  { path: '**', redirectTo: '' },
];
