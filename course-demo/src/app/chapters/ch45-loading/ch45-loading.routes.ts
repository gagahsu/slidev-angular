import { Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Ch45Loading } from './ch45-loading';
import { loadingInterceptor } from './loading.interceptor';

// 投影片把 withInterceptors 寫在 app.config.ts，所有請求都會經過攔截器
// 這個示範專案有很多章節，所以只讓這一章啟用
export const routes: Routes = [
  {
    path: '',
    component: Ch45Loading,
    providers: [provideHttpClient(withInterceptors([loadingInterceptor]))],
  }
];
