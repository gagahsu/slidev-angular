import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

/** 要登入才能進入 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? true
    : inject(Router).createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};

/** 要是管理員才能進入後台 */
export const adminGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  if (!auth.isLoggedIn()) {
    return inject(Router).createUrlTree(['/login'], { queryParams: { redirect: state.url } });
  }
  return auth.isAdmin() ? true : inject(Router).createUrlTree(['/surveys']);
};
