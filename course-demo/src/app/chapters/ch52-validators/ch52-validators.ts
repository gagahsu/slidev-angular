import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ch52-validators',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch52-validators.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch52-validators.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                        // 獨立元件
  imports: [ReactiveFormsModule]
})
export class Ch52Validators {

  fb = inject(FormBuilder);

  // 練習：陣列第二個元素是驗證規則，多個規則用陣列包起來
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    // 數字欄位用 null 代表尚未填寫
    age: [null as number | null, [Validators.required, Validators.min(18), Validators.max(99)]],
    // ^09 是 09 開頭，\d{8} 是 8 碼數字，$ 是結尾
    phone: ['', [Validators.required, Validators.pattern(/^09\d{8}$/)]],
    // checkbox 一定要是 true 才算通過
    agree: [false, Validators.requiredTrue],
  });

  // 補充練習 1：投影片也叫 form；同一個 class 不能重複，所以用不同名字
  surveyForm = this.fb.group({
    surveyTitle: ['', [Validators.required, Validators.maxLength(5)]],
  });

  // 補充練習 2：只能輸入 1 到 4 位數字
  dosageForm = this.fb.group({
    mgDosage: ['', Validators.pattern(/^\d{1,4}$/)],
  });

  // 按下送出時執行
  onSubmit(): void {
    if (this.form.invalid) {
      console.log('表單尚有欄位未通過驗證');
      return;
    }
    console.log('註冊成功', this.form.value);
  }
}
