import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth-service';
import { Dialogs } from '../../shared/dialogs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="card" style="max-width:420px;margin:auto">
      <h2>註冊</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline"><mat-label>姓名</mat-label><input matInput formControlName="name" />
          <mat-error>請輸入姓名</mat-error></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Email</mat-label><input matInput formControlName="email" type="email" />
          <mat-error>請輸入正確的 Email</mat-error></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>密碼（8 到 12 個字元）</mat-label><input matInput formControlName="password" type="password" />
          <mat-error>密碼需 8 到 12 個字元</mat-error></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>手機（09 開頭共 10 碼）</mat-label><input matInput formControlName="phone" />
          <mat-error>手機格式錯誤</mat-error></mat-form-field>
        <button mat-flat-button type="submit" [disabled]="loading()">註冊</button>
      </form>
      <p class="muted">已經有帳號？<a routerLink="/login">登入</a></p>
    </div>`,
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private dialogs = inject(Dialogs);
  loading = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    phone: ['', [Validators.required, Validators.pattern(/^09\d{8}$/)]],
  });

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.auth.register(this.form.getRawValue()).subscribe({
      next: async () => { await this.dialogs.alert('註冊成功，請登入', '完成'); this.router.navigate(['/login']); },
      error: e => { this.loading.set(false); this.dialogs.alert(e.error?.message ?? '註冊失敗'); },
    });
  }
}
