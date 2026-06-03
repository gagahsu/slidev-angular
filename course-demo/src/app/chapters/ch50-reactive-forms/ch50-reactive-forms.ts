import { Component, inject } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ch50-reactive-forms',
  templateUrl: './ch50-reactive-forms.html',
  styleUrl: './ch50-reactive-forms.css',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule, JsonPipe]
})
export class Ch50ReactiveForms {
  fb = inject(FormBuilder);

  form = this.fb.group({
    surveyTitle: ['', Validators.required],
    authorName:  ['', Validators.required],
    questions:   this.fb.array([])
  });

  get questionsArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  addQuestion(): void {
    const questionGroup: FormGroup = this.fb.group({
      qTitle: ['', Validators.required],
      qType:  ['radio'],
      need:   [false]
    });
    this.questionsArray.push(questionGroup);
  }

  removeQuestion(index: number): void {
    this.questionsArray.removeAt(index);
  }

  getQuestionGroup(index: number): FormGroup {
    return this.questionsArray.at(index) as FormGroup;
  }

  formResult: any = null;

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.formResult = this.form.value;
  }

  resetForm(): void {
    this.form.reset({ surveyTitle: '', authorName: '' });
    this.questionsArray.clear();
    this.formResult = null;
  }
}
