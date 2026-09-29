/*
  === 第34章：日期選擇器（Date Picker）===

  兩種日期選擇方式：
  ① 原生 HTML  <input type="date">  → 瀏覽器內建 UI，簡單快速
  ② Angular Material mat-datepicker → 美觀一致，可設定 min/max，支援 Date 物件

  原生 input type 變體：
  ┌─────────────────┬──────────────────────────┐
  │ type="date"     │ 年 / 月 / 日            │
  │ type="month"    │ 年 / 月                 │
  │ type="time"     │ 時 / 分                 │
  │ type="datetime-local" │ 日期 + 時間       │
  │ type="week"     │ 年 / 週                 │
  └─────────────────┴──────────────────────────┘

  mat-datepicker 額外需要：
  ① imports 加入 MatDatepickerModule / MatFormFieldModule / MatInputModule
  ② providers 加入 provideNativeDateAdapter()（讓 Angular 知道如何處理原生 Date）
*/

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  providers: [
    provideNativeDateAdapter()   // 讓 mat-datepicker 能處理原生 JS Date 物件
  ],
  imports: [
    FormsModule,           // [(ngModel)] 雙向綁定
    MatFormFieldModule,    // <mat-form-field> 外框
    MatInputModule,        // matInput 指令
    MatDatepickerModule    // mat-datepicker + mat-datepicker-toggle
  ]
})
export class AppComponent {

  // ==============================
  // 原生 input type="date" 的資料
  // ==============================

  // 字串格式：'YYYY-MM-DD'
  nativeDate: string = '2024-11-05';

  // 限制可選範圍
  minNative: string = '2024-01-01';
  maxNative: string = '2025-12-31';

  // ==============================
  // mat-datepicker 的資料
  // ==============================

  // Date 物件（mat-datepicker 直接支援）
  selectedDate: Date = new Date('2024/11/08');
  minDate: Date = new Date('2024/11/01');
  maxDate: Date = new Date('2024/12/31');

  // 顯示用：把 Date 格式化成易讀字串
  get formattedDate(): string {
    if (!this.selectedDate) return '（尚未選擇）';
    const y = this.selectedDate.getFullYear();
    const m = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
    const d = String(this.selectedDate.getDate()).padStart(2, '0');
    return `${y}/${m}/${d}`;
  }
}
