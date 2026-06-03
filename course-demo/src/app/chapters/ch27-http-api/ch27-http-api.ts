import { Component, OnInit, inject } from '@angular/core';
import { HttpClientService } from './http-client.service';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-ch27-http-api',
  templateUrl: './ch27-http-api.html',
  styleUrl: './ch27-http-api.css',
  standalone: true,
  imports: []
})
export class Ch27HttpApi implements OnInit {

  private httpService = inject(HttpClientService);

  users: User[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  postResult: any = null;

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.httpService.getApi('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (res: any) => {
          this.users = res;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'API 呼叫失敗：' + err.message;
          this.isLoading = false;
        }
      });
  }

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
        },
        error: (err) => {
          console.error('POST 錯誤：', err);
        }
      });
  }
}
