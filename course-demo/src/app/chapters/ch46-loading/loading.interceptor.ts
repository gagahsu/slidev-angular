import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from './ch46-loading.service';

// 每一次 HTTP 請求都會自動經過這裡
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // 排到下一個 macrotask 再執行，避免 NG0100
  setTimeout(() => loadingService.show());

  return next(req).pipe(
    // finalize：不論成功或失敗都會執行，確保一定會隱藏
    finalize(() => loadingService.hide())
  );
};
