import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// 定義 API 回傳資料的形狀
interface User {
  id: string;
  name: { first: string; last: string };
  email: string;
}

// 使用者陣列在 res.data.data，外層多包了一層 data
interface RandomUsersResponse {
  data: {
    data: User[];
  };
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
})
export class UserListComponent implements OnInit {
  private readonly http = inject(HttpClient);

  // 投影片沒有這一行：這個示範專案沒有安裝 zone.js，
  // API 回來之後要呼叫 markForCheck() 通知 Angular 更新畫面
  private cdr = inject(ChangeDetectorRef);

  // 三個變數分別代表：載入中、失敗、成功
  loading = false;
  errorMessage = '';
  users: User[] = [];

  ngOnInit(): void {
    // 發出請求之前，先設為載入中
    this.loading = true;

    this.http
      .get<RandomUsersResponse>('https://api.freeapi.app/api/v1/public/randomusers')
      .subscribe({
        // 成功時執行；subscribe 是非同步的，ngOnInit 不會等它
        next: (res) => {
          this.users = res.data.data;
          this.loading = false;
          this.cdr.markForCheck();
        },
        // 失敗時也要把 loading 設回 false，否則畫面會一直停在載入中
        error: (err) => {
          this.errorMessage = '會員資料載入失敗，請稍後再試';
          this.loading = false;
          this.cdr.markForCheck();
        },
      });
  }
}
