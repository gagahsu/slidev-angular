import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ch49-radio-checkbox',
  templateUrl: './ch49-radio-checkbox.html',
  styleUrl: './ch49-radio-checkbox.css',
  standalone: true,
  imports: [FormsModule, MatRadioModule, MatCheckboxModule, MatButtonModule]
})
export class Ch49RadioCheckbox {
  nativeRadio: string = '';
  selectedSeason: string = '';
  seasons = ['春', '夏', '秋', '冬'];
  selectedGender: string = '';

  nativeCheckA: boolean = false;
  nativeCheckB: boolean = false;

  courses = [
    { name: 'HTML',       checked: false },
    { name: 'CSS',        checked: false },
    { name: 'TypeScript', checked: false },
    { name: 'Angular',    checked: false }
  ];

  get selectedCourses(): string[] {
    return this.courses.filter(c => c.checked).map(c => c.name);
  }

  get allChecked(): boolean {
    return this.courses.every(c => c.checked);
  }

  get someChecked(): boolean {
    return this.courses.some(c => c.checked) && !this.allChecked;
  }

  toggleAll(checked: boolean): void {
    this.courses.forEach(c => c.checked = checked);
  }

  submitResult: string = '';

  submit(): void {
    const courses = this.selectedCourses.join('、') || '（未選擇）';
    this.submitResult = `性別：${this.selectedGender || '（未選）'}\n喜歡的季節：${this.selectedSeason || '（未選）'}\n選修課程：${courses}`;
  }
}
