// 要使用哪個生命週期，就從核心套件匯入對應的介面
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ch19-lifecycle',         // 這個元件在 HTML 中使用的標籤名稱
  imports: [],                            // 這一章不需要額外的模組
  templateUrl: './ch19-lifecycle.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch19-lifecycle.css',       // 這個元件使用的 CSS 檔案
})
// implements 代表這個元件會實作這些生命週期方法
export class Ch19Lifecycle implements OnInit, AfterViewInit, OnDestroy {

  // 練習：驚嘆號代表「沒有初始值，但保證之後會給值」
  welcomeMessage!: string;

  // ngOnInit 範例：一開始是空陣列，初始化時才放入資料
  data: string[] = [];

  // ngOnInit 小節練習
  announcement = '';
  viewCount = 0;

  // ngAfterViewInit 小節練習：取得 HTML 裡 #searchBox 的輸入框
  @ViewChild('searchBox') searchRef!: ElementRef;

  // ngOnDestroy 小節練習：存放計時器的 ID，離開頁面時才能清除
  private timer: any;

  // 最先執行：這時畫面還沒有準備好，主要用來注入服務
  constructor() {
    console.log('1. constructor 執行');
  }

  // 元件初始化時執行一次：適合設定初始資料、呼叫 API
  ngOnInit() {
    console.log('2. ngOnInit 執行');
    this.welcomeMessage = '歡迎來到 Angular！';
    this.data = ['item1', 'item2', 'item3'];
    this.announcement = '歡迎來到 Angular 學習平台！';
    this.viewCount = 1024;

    // 每秒印出一次，切換到其他章節時會被 ngOnDestroy 清除
    this.timer = setInterval(() => {
      console.log('計時中...');
    }, 1000);
  }

  // 畫面組裝完成後執行一次：這時才能操作畫面上的元素
  ngAfterViewInit() {
    console.log('3. ngAfterViewInit 執行');
    this.searchRef.nativeElement.focus();  // 頁面載入後自動聚焦
  }

  // 元件銷毀前執行一次：清除計時器，防止記憶體洩漏
  ngOnDestroy() {
    clearInterval(this.timer);
    console.log('ngOnDestroy 執行：計時器已清除');
  }
}
