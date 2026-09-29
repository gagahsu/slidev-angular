import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SurveyService } from '../../core/survey-service';
import { Response } from '../../models/models';

@Component({
  selector: 'app-my-records',
  imports: [DatePipe, RouterLink],
  template: `
    <h2>我的填寫紀錄</h2>
    @for (r of records(); track r.id) {
      <div class="card row">
        <span>問卷編號 {{ r.surveyId }}</span>
        <span class="muted">{{ r.submittedAt | date: 'yyyy/MM/dd HH:mm' }}</span>
        <a [routerLink]="['/surveys', r.surveyId, 'stats']">看統計</a>
      </div>
    } @empty { <p class="muted">還沒有填寫紀錄</p> }`,
})
export class MyRecords {
  private api = inject(SurveyService);
  records = signal<Response[]>([]);
  constructor() { this.api.myResponses().subscribe(list => this.records.set(list)); }
}
