/*
  === 第43章：同步與非同步（Async）===

  程式執行有兩種模式：

  ① 同步（Synchronous）
     → 一行執行完，才執行下一行
     → 像排隊結帳：前面的人沒結完，後面的人不能動

  ② 非同步（Asynchronous）
     → 不等前一個完成就繼續執行
     → 像叫號系統：拿到號碼牌先去做別的事，叫到號再回來

  JavaScript 的非同步機制：
  - setTimeout()    → 等待一段時間後執行（計時器）
  - HTTP 請求       → 等待伺服器回應後執行（API）
  - Observable      → RxJS 的觀察者模式，可以持續接收資料

  Observable + subscribe() 的流程：
  ① http.get(url) 回傳 Observable（像是訂閱一個頻道）
  ② .subscribe() 監聽這個 Observable
  ③ 資料回來時，next callback 被呼叫
  ④ 發生錯誤時，error callback 被呼叫
  ⑤ 所有資料都傳完時，complete callback 被呼叫
*/

import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: []
})
export class AppComponent implements OnInit {

  private http = inject(HttpClient);

  // 同步示範的輸出
  syncLog: string[] = [];

  // 非同步示範的輸出
  asyncLog: string[] = [];

  // API 資料
  apiData: any = null;
  isLoading: boolean = false;
  errorMsg: string = '';

  ngOnInit(): void {
    this.demoSync();
    this.demoAsync();
  }

  // ==============================
  // ① 同步執行示範
  // ==============================
  demoSync(): void {
    this.syncLog = [];

    // 同步：一行執行完才執行下一行
    const stepA = '步驟 A 執行完成';
    this.syncLog.push(stepA);

    const stepB = '步驟 B 執行完成';
    this.syncLog.push(stepB);

    const stepC = '步驟 C 執行完成';
    this.syncLog.push(stepC);

    // 輸出順序：A → B → C（按照程式碼順序）
    console.log('同步執行順序：', this.syncLog);
  }

  // ==============================
  // ② 非同步執行示範（setTimeout）
  // ==============================
  demoAsync(): void {
    this.asyncLog = [];

    this.asyncLog.push('① 開始');

    // setTimeout 是非同步的：不等它完成，繼續往下執行
    setTimeout(() => {
      // 2 秒後才執行
      this.asyncLog.push('③ setTimeout 執行（2秒後）');
    }, 2000);

    // 這行不等 setTimeout，立刻執行
    this.asyncLog.push('② 結束（setTimeout 還沒到）');

    // 實際輸出順序：① 開始 → ② 結束 → ③ setTimeout 執行（2秒後）
  }

  // ==============================
  // ③ Observable + subscribe 示範
  // ==============================
  fetchData(): void {
    this.isLoading = true;
    this.apiData = null;
    this.errorMsg = '';

    // http.get() 回傳 Observable，不會立刻執行
    // .subscribe() 才是真正「訂閱」並開始等待資料
    this.http.get('https://jsonplaceholder.typicode.com/users/1')
      .subscribe({
        next: (data) => {
          // 資料回來時（非同步）才執行這裡
          this.apiData = data;
          this.isLoading = false;
          console.log('資料回來了：', data);
        },
        error: (err) => {
          // 發生錯誤時執行這裡
          this.errorMsg = '載入失敗：' + err.message;
          this.isLoading = false;
        },
        complete: () => {
          // 所有資料都傳完時執行（通常 http 請求完成後自動 complete）
          console.log('Observable 完成');
        }
      });

    // 注意：這行在 subscribe 之後立刻執行，不等 API 回應
    console.log('subscribe 後立刻執行，isLoading =', this.isLoading);
  }
}
