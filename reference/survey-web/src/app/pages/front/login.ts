import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth-service';
import { Dialogs } from '../../shared/dialogs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="card" style="max-width:420px;margin:auto">
      <h2>登入</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email" />
          @if (form.controls.email.touched && form.controls.email.invalid) { <mat-error>請輸入正確的 Email</mat-error> }
        </mat-form-field>
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>密碼（8 到 12 個字元）</mat-label>
          <input matInput formControlName="password" [type]="show() ? 'text' : 'password'" />
          <button mat-icon-button matSuffix type="button" (click)="show.set(!show())">{{ show() ? '🙈' : '👁' }}</button>
          @if (form.controls.password.touched && form.controls.password.invalid) { <mat-error>密碼需 8 到 12 個字元</mat-error> }
        </mat-form-field>
        <button mat-flat-button type="submit" [disabled]="loading()">登入</button>
      </form>
      <p class="muted">還沒有帳號？<a routerLink="/register">註冊</a></p>
    </div>`,
  styles: `.w-full { width: 100%; }`,
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogs = inject(Dialogs);

  show = signal(false);
  loading = signal(false);
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
  });

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).subscribe({
      next: user => {
        const redirect = this.route.snapshot.queryParamMap.get('redirect');
        this.router.navigateByUrl(redirect ?? (user.role === 'ADMIN' ? '/admin' : '/'));
      },
      error: e => { this.loading.set(false); this.dialogs.alert(e.error?.message ?? '登入失敗'); },
    });
  }
}
