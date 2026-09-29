import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth-service';

const withToken = (req: HttpRequest<unknown>, token: string | null) =>
  req.clone({
    withCredentials: true,                                   // 帶上 Session Cookie（作答暫存需要）
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const isAuthApi = req.url.includes('/api/auth/');

  return next(withToken(req, isAuthApi ? null : auth.accessToken)).pipe(
    catchError((err: HttpErrorResponse) => {
      // Access Token 過期 → 用 Refresh Token 換新的，再重送一次原本的請求
      if (err.status === 401 && !isAuthApi && auth.refreshToken) {
        return from(auth.refresh()).pipe(
          switchMap(token => token ? next(withToken(req, token)) : throwError(() => err)));
      }
      return throwError(() => err);
    }));
};
