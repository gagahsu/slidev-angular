import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SurveyService } from '../../core/survey-service';
import { Dialogs } from '../../shared/dialogs';
import { Question, QuestionType, Survey } from '../../models/models';
import { addDays, parseDate, toDateString } from '../../shared/date-util';
import { HasUnsavedChanges } from '../../core/unsaved-guard';

const TYPE_LABEL: Record<QuestionType, string> = { SINGLE: '單選', MULTI: '多選', TEXT: '文字' };

@Component({
  selector: 'app-admin-editor',
  imports: [ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './admin-editor.html',
})
export class AdminEditor implements HasUnsavedChanges {
  private api = inject(SurveyService);
  private fb = inject(FormBuilder);
  private dialogs = inject(Dialogs);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  /** /admin/view/:id 是唯讀模式 */
  readonly readonly = this.route.snapshot.url[0]?.path === 'view';
  id = Number(this.route.snapshot.paramMap.get('id')) || undefined;

  typeLabel = TYPE_LABEL;
  today = new Date();

  // 第 1 步：基本資料（預設 今天 +2 ～ +7）
  basic = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    startDate: [addDays(2) as Date | null, Validators.required],
    endDate: [addDays(7) as Date | null, Validators.required],
  });

  // 第 2 步：題目（選項是陣列）
  questions = signal<Question[]>([]);
  editing = signal<number | null>(null);          // 正在編輯第幾題；-1 = 新增
  q = this.fb.group({
    title: ['', Validators.required],
    type: ['SINGLE' as QuestionType],
    required: [false],
    optionsText: [''],                            // 一行一個選項
  });
  needOptions = computed(() => this.q.controls.type.value !== 'TEXT');

  constructor() {
    if (this.id) {
      this.api.adminGet(this.id).subscribe(s => this.fill(s));
    } else {
      // 重新整理頁面時，從 Session 還原暫存
      this.api.getSurveyDraft().subscribe(d => { if (d) this.fill(d); });
    }
    if (this.readonly) { this.basic.disable(); }
  }

  private fill(s: Survey) {
    this.id = s.id ?? this.id;
    this.basic.patchValue({
      title: s.title, description: s.description,
      startDate: parseDate(s.startDate), endDate: parseDate(s.endDate),
    });
    this.questions.set(s.questions ?? []);
  }

  // 離開前確認（unsavedGuard 會呼叫）：基本資料改過，或題目有增刪改
  private changed = false;
  hasUnsavedChanges() { return !this.readonly && (this.basic.dirty || this.changed); }

  // ---- 題目 CRUD ----
  newQuestion() { this.q.reset({ title: '', type: 'SINGLE', required: false, optionsText: '' }); this.editing.set(-1); }
  editQuestion(i: number) {
    const x = this.questions()[i];
    this.q.reset({ title: x.title, type: x.type, required: x.required, optionsText: x.options.map(o => o.label).join('\n') });
    this.editing.set(i);
  }
  cancelQuestion() { this.editing.set(null); }
  async saveQuestion() {
    const v = this.q.getRawValue();
    const options = v.type === 'TEXT' ? [] : (v.optionsText ?? '').split('\n').map(s => s.trim()).filter(Boolean).map(label => ({ label }));
    if (!v.title?.trim()) { await this.dialogs.alert('請輸入題目名稱'); return; }
    if (v.type !== 'TEXT' && options.length < 2) { await this.dialogs.alert('單選 / 多選題至少要有 2 個選項'); return; }
    const item: Question = { title: v.title.trim(), type: v.type!, required: !!v.required, options };
    const i = this.editing()!;
    this.changed = true;
    this.questions.update(list => i < 0 ? [...list, item] : list.map((x, k) => k === i ? { ...item, id: x.id } : x));
    this.editing.set(null);
  }
  removeQuestion(i: number) { this.changed = true; this.questions.update(list => list.filter((_, k) => k !== i)); }

  // ---- 步驟切換時，先暫存到 Session ----
  private toSurvey(): Survey {
    const v = this.basic.getRawValue();
    return {
      id: this.id, title: v.title ?? '', description: v.description ?? '',
      startDate: toDateString(v.startDate)!, endDate: toDateString(v.endDate)!,
      published: false, questions: this.questions(),
    };
  }

  /** 第 1 步 → 第 2 步：驗證日期與標題 */
  async validateBasic(): Promise<boolean> {
    this.basic.markAllAsTouched();
    const v = this.basic.getRawValue();
    const errors: string[] = [];
    if (this.basic.controls.title.invalid) errors.push('問卷名稱必填，最多 50 字');
    if (this.basic.controls.description.invalid) errors.push('問卷說明必填，最多 200 字');
    if (!v.startDate || !v.endDate) errors.push('請選擇開始與結束日期');
    else {
      if (v.startDate <= this.today && !this.id) errors.push('開始日期必須晚於今天');
      if (v.endDate < v.startDate) errors.push('結束日期不可早於開始日期');
    }
    if (errors.length) { await this.dialogs.alert(errors); return false; }
    return true;
  }

  async toQuestions(stepper: { next(): void }) {
    if (this.readonly || await this.validateBasic()) stepper.next();
  }

  async toConfirm(stepper: { next(): void }) {
    if (this.readonly) { stepper.next(); return; }
    if (this.questions().length === 0) { await this.dialogs.alert('至少要有一題'); return; }
    this.api.saveSurveyDraft(this.toSurvey()).subscribe({
      next: () => stepper.next(),
      error: e => this.dialogs.alert(e.error?.message ?? '暫存失敗'),
    });
  }

  // ---- 第 3 步：儲存 ----
  commit(publish: boolean) {
    this.api.commit(publish).subscribe({
      next: () => {
        this.basic.markAsPristine(); this.changed = false;          // 已儲存：離開時不必再確認
        this.dialogs.alert(publish ? '已儲存並發佈' : '已儲存').then(() => this.router.navigate(['/admin']));
      },
      error: e => this.dialogs.alert(e.error?.message ?? '儲存失敗'),
    });
  }
  back() { this.router.navigate(['/admin']); }
}
