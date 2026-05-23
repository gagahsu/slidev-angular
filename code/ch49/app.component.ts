/*
  === 第49章：Mat-radio & Checkbox（單選與多選）===

  ① 原生 HTML
     <input type="radio" name="group">  — 同 name 為一組，只能選一個
     <input type="checkbox">            — 各自獨立，可多選

  ② Angular Material
     <mat-radio-group> + <mat-radio-button>  — 樣式一致的單選
     <mat-checkbox [(ngModel)]="變數">       — 樣式一致的多選

  mat-radio-group 重要屬性：
  → [(ngModel)]  — 雙向綁定，得到選中的 value
  → value        — 每個 radio-button 的值

  mat-checkbox 重要屬性：
  → [(ngModel)]  — 雙向綁定布林值（true = 勾選）
  → indeterminate — 不確定狀態（半勾）
*/

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FormsModule,         // [(ngModel)]
    MatRadioModule,      // mat-radio-group / mat-radio-button
    MatCheckboxModule,   // mat-checkbox
    MatButtonModule
  ]
})
export class AppComponent {

  // ==============================
  // Radio（單選）
  // ==============================

  // 原生 radio
  nativeRadio: string = '';

  // mat-radio-group
  selectedSeason: string = '';
  seasons = ['春', '夏', '秋', '冬'];

  // 性別選擇
  selectedGender: string = '';

  // ==============================
  // Checkbox（多選）
  // ==============================

  // 原生 checkbox
  nativeCheckA: boolean = false;
  nativeCheckB: boolean = false;

  // mat-checkbox（課程清單）
  courses = [
    { name: 'HTML', checked: false },
    { name: 'CSS',  checked: false },
    { name: 'TypeScript', checked: false },
    { name: 'Angular',    checked: false }
  ];

  // 取得勾選的課程清單
  get selectedCourses(): string[] {
    return this.courses.filter(c => c.checked).map(c => c.name);
  }

  // 「全選」控制
  get allChecked(): boolean {
    return this.courses.every(c => c.checked);
  }

  get someChecked(): boolean {
    return this.courses.some(c => c.checked) && !this.allChecked;
  }

  toggleAll(checked: boolean): void {
    this.courses.forEach(c => c.checked = checked);
  }

  // ==============================
  // 表單送出
  // ==============================

  submitResult: string = '';

  submit(): void {
    const courses = this.selectedCourses.join('、') || '（未選擇）';
    this.submitResult = `
      性別：${this.selectedGender || '（未選）'}
      喜歡的季節：${this.selectedSeason || '（未選）'}
      選修課程：${courses}
    `.trim();
  }
}
