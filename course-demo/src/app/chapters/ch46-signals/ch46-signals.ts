import { Component, OnInit, Signal, effect, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Ch46LoadingService } from './ch46-loading.service';

@Component({
  selector: 'app-ch46-signals',
  templateUrl: './ch46-signals.html',
  styleUrl: './ch46-signals.css',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatButtonModule]
})
export class Ch46Signals implements OnInit {
  private loadingService = inject(Ch46LoadingService);
  loading!: Signal<boolean>;

  constructor() {
    effect(() => {
      console.log('loading Signal 變化：', this.loadingService.loading());
    });
  }

  ngOnInit(): void {
    this.loading = this.loadingService.loading;
  }

  simulateApiCall(): void {
    this.loadingService.show();
    setTimeout(() => { this.loadingService.hide(); }, 2000);
  }

  showLoading(): void { this.loadingService.show(); }
  hideLoading(): void { this.loadingService.hide(); }
}
