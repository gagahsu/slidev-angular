/*
  === 第40章：Select（下拉選單）===

  兩種下拉選單：
  ① 原生 <select> + [(ngModel)] — 簡單快速
  ② Angular Material mat-select / matNativeControl — 風格統一

  用途：
  → 讓使用者從多個選項中選一個
  → 比 radio button 更省空間（選項很多時）

  ngModel 雙向綁定讓選到的值自動同步到 TypeScript 變數，
  不需要手動監聽 (change) 事件。
*/

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FormsModule,          // [(ngModel)] 雙向綁定
    MatFormFieldModule,   // <mat-form-field>
    MatSelectModule,      // <mat-select>
    MatInputModule        // matNativeControl
  ]
})
export class AppComponent {

  // ==============================
  // 原生 select 的資料
  // ==============================

  selectedCar: string = '';

  carOptions = [
    { value: 'volvo',    label: 'Volvo'    },
    { value: 'saab',     label: 'Saab'     },
    { value: 'mercedes', label: 'Mercedes' },
    { value: 'audi',     label: 'Audi'     }
  ];

  // ==============================
  // mat-select 的資料
  // ==============================

  selectedCourse: string = '';

  courseOptions = [
    { value: 'html',       label: 'HTML 基礎' },
    { value: 'css',        label: 'CSS 樣式'  },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'angular',    label: 'Angular'   }
  ];

  // ==============================
  // 實際應用：表單送出
  // ==============================

  selectedCountry: string = '';
  selectedGender: string = '';
  formSubmitted: boolean = false;
  formResult: string = '';

  countries = ['台灣', '日本', '韓國', '美國', '英國'];
  genders = [
    { value: 'male',   label: '男' },
    { value: 'female', label: '女' },
    { value: 'other',  label: '不公開' }
  ];

  submitForm(): void {
    if (!this.selectedCountry || !this.selectedGender) {
      alert('請填寫所有欄位！');
      return;
    }
    this.formSubmitted = true;
    this.formResult = `國籍：${this.selectedCountry}，性別：${this.selectedGender}`;
  }
}
