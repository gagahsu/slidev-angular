import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// async pipe 包含在 CommonModule 裡
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './ch46-loading.service';

@Component({
  selector: 'app-ch46-loading',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch46-loading.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch46-loading.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                     // 獨立元件
  imports: [CommonModule, MatProgressSpinnerModule]
})
export class Ch46Loading implements OnInit {

  // 驚嘆號：沒有初始值，但保證 ngOnInit 會給值
  loading$!: Observable<boolean>;

  private loadingService: LoadingService = inject(LoadingService);
  private http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
  }

  // 手動控制：show() 之後，2 秒後才 hide()
  manualLoading() {
    this.loadingService.show();
    setTimeout(() => this.loadingService.hide(), 2000);
  }

  // Interceptor：這裡不需要呼叫 show()、hide()，攔截器會自動處理
  callApi() {
    this.http.get('https://api.freeapi.app/api/v1/public/randomusers')
      .subscribe((res) => console.log(res));
  }
}
