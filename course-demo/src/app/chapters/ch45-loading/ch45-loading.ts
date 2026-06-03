import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Ch45LoadingService } from './ch45-loading.service';

@Component({
  selector: 'app-ch45-loading',
  templateUrl: './ch45-loading.html',
  styleUrl: './ch45-loading.css',
  standalone: true,
  imports: [AsyncPipe, MatProgressSpinnerModule, MatButtonModule]
})
export class Ch45Loading implements OnInit {
  private loadingService = inject(Ch45LoadingService);

  loading$!: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
  }

  simulateApiCall(): void {
    this.loadingService.show();
    setTimeout(() => { this.loadingService.hide(); }, 2000);
  }

  showLoading(): void { this.loadingService.show(); }
  hideLoading(): void { this.loadingService.hide(); }
}
