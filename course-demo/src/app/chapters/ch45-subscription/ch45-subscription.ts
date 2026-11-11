import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './service/loading.service';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-ch45-subscription',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch45-subscription.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch45-subscription.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                          // 獨立元件
  imports: [HeaderComponent, ProductListComponent]
})
export class Ch45Subscription implements OnInit, OnDestroy {

  // 用同一個 Subscription 管理多個訂閱
  private subscription = new Subscription();

  // 注入 Service；public 代表 HTML 也可以呼叫它的方法
  public loadingService = inject(LoadingService);

  ngOnInit(): void {
    // 補充練習 2：BehaviorSubject 訂閱時立刻收到目前的值
    this.subscription.add(
      this.loadingService._loading$.subscribe((val) => {
        console.log('A 收到', val);
      })
    );

    // 補充練習 2：Subject 訂閱時沒有輸出，要等到有人呼叫 next()
    this.subscription.add(
      this.loadingService._loading2$.subscribe((val) => {
        console.log('B 收到', val);
      })
    );
  }

  // 投影片沒有這段：這個示範專案會在章節之間切換，離開時要取消訂閱
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
