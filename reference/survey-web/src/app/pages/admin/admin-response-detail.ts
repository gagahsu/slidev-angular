import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location as Loc } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SurveyService } from '../../core/survey-service';
import { Response } from '../../models/models';

@Component({
  selector: 'app-admin-response-detail',
  imports: [MatButtonModule],
  template: `
    @if (r(); as d) {
      <h2>填寫細節 #{{ d.id }}</h2>
      <div class="card">姓名：{{ d.name }}　手機：{{ d.phone }}　Email：{{ d.email }}@if (d.age) { 　年齡：{{ d.age }} }</div>
      @for (a of d.answers; track a.questionId) {
        <div class="card"><b>{{ a.questionTitle }}</b>@for (v of a.values; track v) { <div>✔ {{ v }}</div> }</div>
      }
      <button mat-button (click)="back()">返回</button>
    }`,
})
export class AdminResponseDetail {
  private loc = inject(Loc);
  r = signal<Response | null>(null);
  constructor() {
    const id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));
    inject(SurveyService).responseDetail(id).subscribe(x => this.r.set(x));
  }
  back() { this.loc.back(); }
}
