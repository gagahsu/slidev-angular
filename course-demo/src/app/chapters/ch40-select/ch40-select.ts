import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ch40-select',
  templateUrl: './ch40-select.html',
  styleUrl: './ch40-select.css',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule]
})
export class Ch40Select {
  selectedCar: string = '';
  carOptions = [
    { value: 'volvo',    label: 'Volvo'    },
    { value: 'saab',     label: 'Saab'     },
    { value: 'mercedes', label: 'Mercedes' },
    { value: 'audi',     label: 'Audi'     }
  ];

  selectedCourse: string = '';
  courseOptions = [
    { value: 'html',       label: 'HTML 基礎' },
    { value: 'css',        label: 'CSS 樣式'  },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'angular',    label: 'Angular'   }
  ];

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
