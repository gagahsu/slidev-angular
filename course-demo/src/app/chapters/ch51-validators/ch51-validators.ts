import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ch51-validators',
  templateUrl: './ch51-validators.html',
  styleUrl: './ch51-validators.css',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule]
})
export class Ch51Validators {
  fb = inject(FormBuilder);

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:    ['', [Validators.required, Validators.email]],
    age:      [null as number | null, [Validators.required, Validators.min(18), Validators.max(99)]],
    phone:    ['', [Validators.pattern(/^09\d{8}$/)]],
    zipCode:  ['', [Validators.pattern(/^\d{3,5}$/)]],
    agree:    [false, Validators.requiredTrue]
  });

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

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
  }
}
