import { Component, OnInit, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ch43-async',
  templateUrl: './ch43-async.html',
  styleUrl: './ch43-async.css',
  standalone: true,
  imports: [JsonPipe]
})
export class Ch43Async implements OnInit {
  private http = inject(HttpClient);

  syncLog: string[] = [];
  asyncLog: string[] = [];
  apiData: any = null;
  isLoading: boolean = false;
  errorMsg: string = '';

  ngOnInit(): void {
    this.demoSync();
    this.demoAsync();
  }

  demoSync(): void {
    this.syncLog = [];
    this.syncLog.push('步驟 A 執行完成');
    this.syncLog.push('步驟 B 執行完成');
    this.syncLog.push('步驟 C 執行完成');
  }

  demoAsync(): void {
    this.asyncLog = [];
    this.asyncLog.push('① 開始');
    setTimeout(() => {
      this.asyncLog.push('③ setTimeout 執行（2秒後）');
    }, 2000);
    this.asyncLog.push('② 結束（setTimeout 還沒到）');
  }

  fetchData(): void {
    this.isLoading = true;
    this.apiData = null;
    this.errorMsg = '';

    this.http.get('https://jsonplaceholder.typicode.com/users/1')
      .subscribe({
        next: (data) => {
          this.apiData = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMsg = '載入失敗：' + err.message;
          this.isLoading = false;
        }
      });
  }
}
