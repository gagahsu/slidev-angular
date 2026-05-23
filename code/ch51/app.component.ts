/*
  === 第51章：Validators（表單驗證）===

  Validators 是 Angular 提供的內建驗證器，
  在 FormControl 或 FormGroup 建立時傳入，讓 Angular 自動驗證輸入值。

  常用 Validators：
  ┌───────────────────────┬──────────────────────────────────────────┐
  │ Validators.required   │ 必填（不能是空字串）                      │
  │ Validators.requiredTrue│ checkbox 必須打勾                        │
  │ Validators.email      │ 必須是合法 email 格式                     │
  │ Validators.minLength(n)│ 最少 n 個字元                           │
  │ Validators.maxLength(n)│ 最多 n 個字元                           │
  │ Validators.min(n)     │ 數字最小值                               │
  │ Validators.max(n)     │ 數字最大值                               │
  │ Validators.pattern(re)│ 必須符合正規表達式                        │
  └───────────────────────┴──────────────────────────────────────────┘

  驗證狀態屬性：
  .valid    → 全部通過
  .invalid  → 有任何一個不通過
  .touched  → 使用者曾經 focus 過（點進去後離開）
  .dirty    → 值有被修改過

  顯示錯誤訊息的時機：invalid && touched
  → 使用者碰過這個欄位後才顯示錯誤，不一進頁面就紅一片
*/

import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule
  ]
})
export class AppComponent {

  fb = inject(FormBuilder);

  // 多種驗證器示範
  form = this.fb.group({
    // 必填 + 最少3字 + 最多20字
    username: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]],

    // 必填 + email 格式
    email: ['', [
      Validators.required,
      Validators.email
    ]],

    // 數字範圍
    age: [null as number | null, [
      Validators.required,
      Validators.min(18),
      Validators.max(99)
    ]],

    // 台灣手機號碼格式：09xx-xxxxxx
    phone: ['', [
      Validators.pattern(/^09\d{8}$/)
    ]],

    // 五碼郵遞區號
    zipCode: ['', [
      Validators.pattern(/^\d{3,5}$/)
    ]],

    // checkbox 必須勾選
    agree: [false, Validators.requiredTrue]
  });

  // 快速取得欄位（減少模板裡的重複程式碼）
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // 取得特定欄位的錯誤訊息
  getError(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control?.errors || !control.touched) return '';

    const errors = control.errors;
    if (errors['required'])     return '此欄位為必填';
    if (errors['requiredTrue']) return '必須同意才能繼續';
    if (errors['email'])        return '請輸入正確的 Email 格式';
    if (errors['minlength'])    return `最少需要 ${errors['minlength'].requiredLength} 個字元`;
    if (errors['maxlength'])    return `最多 ${errors['maxlength'].requiredLength} 個字元`;
    if (errors['min'])          return `最小值為 ${errors['min'].min}`;
    if (errors['max'])          return `最大值為 ${errors['max'].max}`;
    if (errors['pattern'])      return '格式不正確';
    return '輸入有誤';
  }

  submitResult: string = '';

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitResult = '✅ 表單驗證通過！送出成功！';
    console.log('表單值：', this.form.value);
  }
}
