import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ch44LoadingService } from './ch44-loading.service';

@Component({
  selector: 'app-ch44-subscription',
  templateUrl: './ch44-subscription.html',
  styleUrl: './ch44-subscription.css',
  standalone: true,
  imports: []
})
export class Ch44Subscription implements OnInit, OnDestroy {
  private loadingService = inject(Ch44LoadingService);

  isLoading: boolean = false;
  eventLog: string[] = [];

  private loadingSubscription!: Subscription;
  private dataUpdateSubscription!: Subscription;

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
      const time = new Date().toLocaleTimeString();
      this.eventLog.unshift(`[${time}] loading 狀態變為：${isLoading}`);
    });

    this.dataUpdateSubscription = this.loadingService.dataUpdated$.subscribe(() => {
      const time = new Date().toLocaleTimeString();
      this.eventLog.unshift(`[${time}] 收到「資料更新」通知`);
    });
  }

  simulateApiCall(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
      this.loadingService.notifyDataUpdated();
    }, 2000);
  }

  showLoading(): void  { this.loadingService.show(); }
  hideLoading(): void  { this.loadingService.hide(); }
  clearLog(): void     { this.eventLog = []; }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    this.dataUpdateSubscription.unsubscribe();
  }
}
