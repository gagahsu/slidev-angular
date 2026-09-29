import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth-service';
import { Dialogs } from '../../shared/dialogs';
import { AppResponse, UserInfo } from '../../models/models';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="card" style="max-width:420px;margin:auto">
      <h2>會員資料</h2>
      <p class="muted">Email：{{ auth.user()?.email }}（不可修改）</p>
      <form [formGroup]="form" (ngSubmit)="save()">
        <mat-form-field appearance="outline"><mat-label>姓名</mat-label><input matInput formControlName="name" /></mat-form-field>
        <mat-form-field appearance="outline"><mat-label>手機</mat-label><input matInput formControlName="phone" />
          <mat-error>手機格式錯誤</mat-error></mat-form-field>
        <button mat-flat-button type="submit">儲存</button>
      </form>
    </div>`,
})
export class Profile {
  auth = inject(AuthService);
  private http = inject(HttpClient);
  private dialogs = inject(Dialogs);
  private fb = inject(FormBuilder);
  busy = signal(false);
  form = this.fb.nonNullable.group({
    name: [this.auth.user()?.name ?? '', Validators.required],
    phone: [this.auth.user()?.phone ?? '', [Validators.required, Validators.pattern(/^09\d{8}$/)]],
  });

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.http.put<AppResponse<UserInfo>>('http://localhost:8080/api/users/me', this.form.getRawValue()).subscribe({
      next: res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        this.auth.user.set(res.data);
        this.dialogs.alert('已更新', '完成');
      },
      error: e => this.dialogs.alert(e.error?.message ?? '更新失敗'),
    });
  }
}
