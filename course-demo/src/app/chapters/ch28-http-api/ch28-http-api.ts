import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HttpClientService } from './http-client.service';

@Component({
  selector: 'app-ch28-http-api',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch28-http-api.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch28-http-api.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                      // 獨立元件
  imports: []                            // 這一章不需要額外的模組
})
export class Ch28HttpApi implements OnInit {

  // 投影片沒有這一行：這個示範專案沒有安裝 zone.js，
  // API 回來之後要呼叫 markForCheck() 通知 Angular 更新畫面
  private cdr = inject(ChangeDetectorRef);

  // 練習：氣象資料
  locations: any[] = [];
  weatherError = '';

  // 透過 inject() 注入我們寫好的 Service
  private http = inject(HttpClientService);

  ngOnInit(): void {
    // 小節練習：一定要 subscribe，請求才會真的送出
    this.http.getApi('https://api.freeapi.app/api/v1/public/randomusers')
      .subscribe((res) => console.log(res));

    // 練習：中央氣象署開放資料
    this.loadWeather();
  }

  // 練習：把氣象資料存進變數，畫面用 @for 顯示
  loadWeather() {
    const url = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-065'
      + '?Authorization=CWA-69B5A9F7-1D8D-495E-A1F2-C160E39B4D44&limit=10&format=JSON';

    this.http.getApi(url).subscribe({
      next: (res: any) => {
        console.log(res);
        this.locations = res.records.Locations[0].Location;
        this.cdr.markForCheck();
      },
      error: () => {
        this.weatherError = '氣象資料載入失敗，請檢查網路或授權碼';
        this.cdr.markForCheck();
      }
    });
  }

  // POST：先把要傳遞的資料打包，再當作第二個參數
  callPost() {
    let postData = {
      userName: 'Allen',
      userAge: 18
    };

    this.http
      .postApi('https://api.freeapi.app/api/v1/kitchen-sink/http-methods/post', postData)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  // 補充練習 1：物件形式可以同時處理成功和失敗
  callErrorApi() {
    this.http.getApi('https://api.freeapi.app/api/error-url').subscribe({
      next: (res) => {
        console.log(res);                     // 成功時走這裡
      },
      error: (err) => {
        console.log(err);
        alert('伺服器故障，請稍後再試！');    // 失敗時走這裡
      }
    });
  }
}
