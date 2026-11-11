import { Component, inject } from '@angular/core';
// [formGroup]、formControlName 需要 ReactiveFormsModule
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ch51-reactive-forms',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch51-reactive-forms.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch51-reactive-forms.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                            // 獨立元件
  imports: [ReactiveFormsModule]
})
export class Ch51ReactiveForms {

  // 取得 FormBuilder，用來建立表單
  fb = inject(FormBuilder);

  // 動態問卷：[初始值, 驗證規則]
  form = this.fb.group({
    surveyTitle: ['', Validators.required], // 問卷標題
    questions: this.fb.array([])            // 題目空陣列
  });

  // 補充練習 1：投影片也叫 form；同一個 class 不能重複，所以這裡叫 productForm
  productForm = this.fb.group({
    productName: [''],
    ingredients: this.fb.array([])
  });

  // getter：把 form.get('questions') 轉型成 FormArray，方便使用
  get questionsArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  get ingredientsArray(): FormArray {
    return this.productForm.get('ingredients') as FormArray;
  }

  // 新增題目：建立一組 FormGroup，推入陣列
  addQuestion() {
    const questionGroup = this.fb.group({
      qTitle: ['', Validators.required], // 題目名稱
      qType: ['M'],                      // 題目類型
      need: [false]                      // 是否必填
    });

    this.questionsArray.push(questionGroup);
    console.log(this.form.value);
  }

  // 刪除題目：依位置移除
  removeQuestion(index: number) {
    this.questionsArray.removeAt(index);
  }

  // 補充練習 1：新增成分
  addIngredient() {
    this.ingredientsArray.push(this.fb.group({ name: [''], mg: [0] }));
  }

  // 補充練習 1：刪除成分
  removeIngredient(index: number) {
    this.ingredientsArray.removeAt(index);
  }
}
