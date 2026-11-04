import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // 頁面傳遞資料小節練習：登入後的 token
  token: string = '';
}
