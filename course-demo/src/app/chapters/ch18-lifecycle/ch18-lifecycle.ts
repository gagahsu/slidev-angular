import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-ch18-lifecycle',
  imports: [],
  templateUrl: './ch18-lifecycle.html',
  styleUrl: './ch18-lifecycle.css',
})
export class Ch18Lifecycle implements OnInit, OnDestroy {
  title = '第18章 - 生命週期';
  currentTime = '';
  userData: string[] = [];
  lifecycleLog: string[] = [];
  private timer: any;

  constructor() {
    this.log('① constructor — 元件物件建立');
  }

  ngOnInit(): void {
    this.log('② ngOnInit — 初始化完成，適合呼叫 API');
    this.timer = setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString('zh-TW');
    }, 1000);
    setTimeout(() => {
      this.userData = ['Allen', 'Grace', '小明', '小華'];
      this.log('資料載入完成！');
    }, 1500);
  }

  ngOnDestroy(): void {
    this.log('④ ngOnDestroy — 清理計時器');
    clearInterval(this.timer);
  }

  private log(msg: string): void {
    this.lifecycleLog.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
  }
}
