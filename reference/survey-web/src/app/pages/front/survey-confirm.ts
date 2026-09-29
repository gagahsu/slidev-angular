import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SurveyService } from '../../core/survey-service';
import { Dialogs } from '../../shared/dialogs';
import { Response, Survey } from '../../models/models';

@Component({
  selector: 'app-survey-confirm',
  imports: [MatButtonModule],
  template: `
    @if (survey() && draft()) {
      <h2>確認您的答案</h2>
      <div class="card">
        <p>姓名：{{ draft()!.name }}　手機：{{ draft()!.phone }}　Email：{{ draft()!.email }}
          @if (draft()!.age) { 　年齡：{{ draft()!.age }} }</p>
      </div>
      @for (q of survey()!.questions; track q.id; let i = $index) {
        <div class="card">
          <h3>{{ i + 1 }}. {{ q.title }}</h3>
          <!-- 唯讀：單選、多選只顯示被選取的項目 -->
          @for (v of valuesOf(q.id!); track v) { <div>✔ {{ v }}</div> } @empty { <span class="muted">（未作答）</span> }
        </div>
      }
      <div class="row">
        <button mat-button (click)="back()">修改</button>
        <button mat-flat-button (click)="submit()">確認送出</button>
      </div>
    }`,
})
export class SurveyConfirm {
  private api = inject(SurveyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialogs = inject(Dialogs);
  id = Number(this.route.snapshot.paramMap.get('id'));
  survey = signal<Survey | null>(null);
  draft = signal<Response | null>(null);

  constructor() {
    this.api.get(this.id).subscribe(s => this.survey.set(s));
    this.api.getDraft(this.id).subscribe({
      next: d => this.draft.set(d),
      error: async e => { await this.dialogs.alert(e.error?.message ?? '沒有暫存的資料'); this.router.navigate(['/surveys', this.id, 'fill']); },
    });
  }

  valuesOf(qid: number) { return this.draft()?.answers.find(a => a.questionId === qid)?.values ?? []; }

  async back() {
    if (await this.dialogs.confirm('確定要回到填寫頁修改嗎？')) this.router.navigate(['/surveys', this.id, 'fill']);
  }

  async submit() {
    if (!(await this.dialogs.confirm('確定要送出嗎？送出後無法修改'))) return;
    this.api.submit(this.id).subscribe({
      next: async () => { await this.dialogs.alert('已送出，謝謝您的填寫', '完成'); this.router.navigate(['/']); },
      error: e => this.dialogs.alert(e.error?.message ?? '送出失敗'),
    });
  }
}
