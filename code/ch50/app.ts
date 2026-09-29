/*
  === 第50章：Reactive Forms（響應式表單）===

  Reactive Forms vs Template-driven Forms：
  ┌──────────────────┬───────────────────────┬──────────────────────────┐
  │                  │ Reactive Forms        │ Template-driven (ngModel) │
  ├──────────────────┼───────────────────────┼──────────────────────────┤
  │ 定義位置         │ TypeScript            │ HTML 模板                │
  │ 驗證邏輯         │ TypeScript（集中管理）│ HTML 屬性                │
  │ 動態欄位         │ 容易（FormArray）     │ 困難                     │
  │ 測試             │ 容易（純 TS）         │ 需要 DOM                 │
  └──────────────────┴───────────────────────┴──────────────────────────┘

  核心 API：
  FormControl  → 單一欄位
  FormGroup    → 一組欄位（物件）
  FormArray    → 動態數量的欄位（陣列）
  FormBuilder  → 快速建立上述三種的工廠

  本章示範：動態問卷系統（可新增/刪除題目的 FormArray）
*/

import { Component, inject } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,   // formGroup / formControlName / formArrayName
    MatButtonModule,
    MatIconModule
  ]
})
export class AppComponent {

  fb = inject(FormBuilder);

  // 整個問卷的 FormGroup
  form = this.fb.group({
    surveyTitle: ['', Validators.required],      // 問卷標題
    authorName:  ['', Validators.required],      // 作者名稱
    questions:   this.fb.array([])               // 動態題目（FormArray）
  });

  // 取得 questions FormArray（方便在 HTML 存取）
  get questionsArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  // 新增一題
  addQuestion(): void {
    const questionGroup: FormGroup = this.fb.group({
      qTitle: ['', Validators.required],   // 題目文字
      qType:  ['radio'],                   // 題目類型（radio / text / checkbox）
      need:   [false]                      // 是否必填
    });
    this.questionsArray.push(questionGroup);
    console.log('新增題目後的表單值：', this.form.value);
  }

  // 刪除某一題
  removeQuestion(index: number): void {
    this.questionsArray.removeAt(index);
  }

  // 取得特定 question 的 FormGroup
  getQuestionGroup(index: number): FormGroup {
    return this.questionsArray.at(index) as FormGroup;
  }

  // 送出表單
  formResult: any = null;

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();   // 顯示所有欄位的驗證錯誤
      return;
    }
    this.formResult = this.form.value;
    console.log('送出的表單值：', this.formResult);
  }

  resetForm(): void {
    this.form.reset({ surveyTitle: '', authorName: '' });
    this.questionsArray.clear();
    this.formResult = null;
  }
}
