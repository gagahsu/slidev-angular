import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // Signal 必須提供初始值
  loading = signal<boolean>(false);

  // 更新值用 .set()，取代 Observable 的 .next()
  show() {
    this.loading.set(true);
  }

  hide() {
    this.loading.set(false);
  }
}
