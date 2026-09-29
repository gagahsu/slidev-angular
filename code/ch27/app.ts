/*
  === 第27章：串接 API — 步驟三：在元件呼叫 API ===

  使用流程：
  ① app.config.ts 加上 provideHttpClient()
  ② 建立 HttpClientService（已在 http-client.service.ts 完成）
  ③ 在元件 inject Service，呼叫 getApi() 等方法
  ④ 用 .subscribe() 接收結果

  subscribe() 的概念：
  → Observable 就像「訂閱」一個頻道
  → 資料回來的瞬間，subscribe 的 callback 會被呼叫
  → 把 API 回傳的 res（response）賦值給元件的變數，畫面就會更新
*/

import { Component, OnInit, inject } from '@angular/core';
import { HttpClientService } from './http-client.service';

// 定義使用者資料的介面（對應 API 回傳的格式）
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: []
})
export class AppComponent implements OnInit {

  // 注入 HttpClientService
  private httpService = inject(HttpClientService);

  // 儲存 API 回傳的資料
  users: User[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  // POST 示範用
  postResult: any = null;

  ngOnInit(): void {
    this.fetchUsers();
  }

  // ==============================
  // GET 示範：取得使用者清單
  // ==============================
  fetchUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // JSONPlaceholder 是一個免費的假 API，適合練習用
    this.httpService.getApi('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (res: any) => {
          this.users = res;
          this.isLoading = false;
          console.log('API 回傳資料：', res);
        },
        error: (err) => {
          this.errorMessage = 'API 呼叫失敗：' + err.message;
          this.isLoading = false;
          console.error('錯誤：', err);
        }
      });
  }

  // ==============================
  // POST 示範：新增一筆資料
  // ==============================
  createPost(): void {
    const postData = {
      title: '我的第一篇文章',
      body: '這是 Angular 課程的 POST 示範',
      userId: 1
    };

    this.httpService.postApi('https://jsonplaceholder.typicode.com/posts', postData)
      .subscribe({
        next: (res: any) => {
          this.postResult = res;
          console.log('POST 結果：', res);
        },
        error: (err) => {
          console.error('POST 錯誤：', err);
        }
      });
  }
}
