import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SurveyService } from '../../core/survey-service';
import { AuthService } from '../../core/auth-service';
import { Dialogs } from '../../shared/dialogs';
import { Response, Survey } from '../../models/models';

@Component({
  selector: 'app-survey-fill',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './survey-fill.html',
})
export class SurveyFill {
  private api = inject(SurveyService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialogs = inject(Dialogs);
  private auth = inject(AuthService);

  id = Number(this.route.snapshot.paramMap.get('id'));
  survey = signal<Survey | null>(null);

  // 固定欄位
  info = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^09\d{8}$/)]],
    email: ['', [Validators.required, Validators.email]],
    age: [null as number | null],
  });
  // 動態題目：每一題一個 FormControl（單選、文字是字串；多選是字串陣列）
  answers = new FormArray<FormControl<string | string[]>>([]);

  constructor() {
    this.api.get(this.id).subscribe(s => {
      s.questions.forEach(q => this.answers.push(new FormControl<string | string[]>(q.type === 'MULTI' ? [] : '', { nonNullable: true })));
      this.survey.set(s);
      this.restoreDraft(s);
      const u = this.auth.user();
      if (u && !this.info.controls.name.value) this.info.patchValue({ name: u.name, email: u.email, phone: u.phone });
    });
  }

  /** 從確認頁按「修改」回來時，把 Session 暫存的內容帶回表單 */
  private restoreDraft(s: Survey) {
    this.api.getDraft(this.id).subscribe({
      next: d => {
        if (!d) return;
        this.info.patchValue({ name: d.name, phone: d.phone, email: d.email, age: d.age ?? null });
        s.questions.forEach((q, i) => {
          const a = d.answers.find(x => x.questionId === q.id);
          if (a) this.answers.at(i).setValue(q.type === 'MULTI' ? a.values : (a.values[0] ?? ''));
        });
      },
      error: () => {},       // 沒有暫存（409）就什麼都不做
    });
  }

  isChecked(i: number, label: string) { return (this.answers.at(i).value as string[]).includes(label); }

  toggle(i: number, label: string, checked: boolean) {
    const cur = this.answers.at(i).value as string[];
    this.answers.at(i).setValue(checked ? [...cur, label] : cur.filter(x => x !== label));
  }

  async next() {
    const s = this.survey()!;
    const problems: string[] = [];
    const c = this.info.controls;
    if (c.name.invalid) problems.push('請輸入姓名');
    if (c.phone.invalid) problems.push('手機格式錯誤（09 開頭，共 10 碼）');
    if (c.email.invalid) problems.push('Email 格式錯誤');
    s.questions.forEach((q, i) => {
      const v = this.answers.at(i).value;
      if (q.required && (Array.isArray(v) ? v.length === 0 : !String(v).trim())) problems.push(`「${q.title}」為必填`);
    });
    if (problems.length) { await this.dialogs.alert(problems); return; }

    const v = this.info.getRawValue();
    const body: Response = {
      name: v.name, phone: v.phone, email: v.email, age: v.age,
      answers: s.questions.map((q, i) => {
        const a = this.answers.at(i).value;
        return { questionId: q.id!, values: (Array.isArray(a) ? a : [a]).filter(x => x !== '') };
      }),
    };
    // 送出不寫資料庫：先暫存到後端 Session，再跳到確認頁
    this.api.saveDraft(this.id, body).subscribe({
      next: () => this.router.navigate(['/surveys', this.id, 'confirm']),
      error: e => this.dialogs.alert(e.error?.message ?? '暫存失敗'),
    });
  }

  async cancel() {
    if (await this.dialogs.confirm('確定要離開嗎？已填寫的內容不會儲存')) this.router.navigate(['/']);
  }
}
