import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { AppResponse, LoginResponse, UserInfo } from '../models/models';
import { API } from './api';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // 登入狀態用 signal：畫面會自動更新（zoneless 也一樣）
  readonly user = signal<UserInfo | null>(this.load('user'));
  readonly isLoggedIn = computed(() => this.user() !== null);
  readonly isAdmin = computed(() => this.user()?.role === 'ADMIN');

  get accessToken(): string | null { return localStorage.getItem('accessToken'); }
  get refreshToken(): string | null { return localStorage.getItem('refreshToken'); }

  login(email: string, password: string) {
    return this.http.post<AppResponse<LoginResponse>>(`${API}/auth/login`, { email, password })
      .pipe(map(res => { this.save(res.data); return res.data.user; }));
  }

  register(body: { name: string; email: string; password: string; phone: string }) {
    return this.http.post<AppResponse<UserInfo>>(`${API}/auth/register`, body);
  }

  /** Access Token 過期時，用 Refresh Token 換新的；成功回傳新的 Access Token */
  async refresh(): Promise<string | null> {
    const token = this.refreshToken;
    if (!token) return null;
    try {
      const res = await firstValueFrom(
        this.http.post<AppResponse<LoginResponse>>(`${API}/auth/refresh`, { refreshToken: token }));
      this.save(res.data);
      return res.data.accessToken;
    } catch {
      this.clear();
      return null;
    }
  }

  logout() {
    const token = this.refreshToken;
    if (token) this.http.post(`${API}/auth/logout`, { refreshToken: token }).subscribe({ error: () => {} });
    this.clear();
    this.router.navigate(['/login']);
  }

  private save(r: LoginResponse) {
    localStorage.setItem('accessToken', r.accessToken);
    localStorage.setItem('refreshToken', r.refreshToken);
    localStorage.setItem('user', JSON.stringify(r.user));
    this.user.set(r.user);
  }

  private clear() {
    ['accessToken', 'refreshToken', 'user'].forEach(k => localStorage.removeItem(k));
    this.user.set(null);
  }

  private load(key: string) {
    try { return JSON.parse(localStorage.getItem(key) ?? 'null'); } catch { return null; }
  }
}
