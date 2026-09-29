import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../core/survey-service';
import { Dialogs } from '../../shared/dialogs';
import { Statistics } from '../../models/models';
import { PieChart } from '../../shared/pie-chart';

/** 前台與後台共用：後台路由用 data: { admin: true } 區分 */
@Component({
  selector: 'app-survey-stats',
  imports: [PieChart],
  template: `
    @if (stats(); as s) {
      <h2>{{ s.title }}：統計</h2>
      <p class="muted">共 {{ s.totalResponses }} 份作答</p>
      @for (q of charts(); track q.questionId; let i = $index) {
        <div class="card">
          <h3>{{ i + 1 }}. {{ q.title }}</h3>
          @if (q.type === 'TEXT') {
            @for (t of q.texts; track $index) { <div>• {{ t }}</div> } @empty { <span class="muted">沒有回答</span> }
          } @else {
            <app-pie-chart [labels]="q.labels" [values]="q.values" />
            @for (o of q.options; track o.label) { <div>{{ o.label }}：{{ o.count }} 票（{{ o.percent }}%）</div> }
          }
        </div>
      }
    }`,
})
export class SurveyStats {
  private api = inject(SurveyService);
  private route = inject(ActivatedRoute);
  private dialogs = inject(Dialogs);
  stats = signal<Statistics | null>(null);
  // computed：stats 變了才重算，圓餅圖的 input 參照才不會每次變更偵測都換新
  charts = computed(() => (this.stats()?.questions ?? []).map(q => ({
    ...q, labels: q.options.map(o => o.label), values: q.options.map(o => o.count),
  })));

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const admin = !!this.route.snapshot.data['admin'];
    (admin ? this.api.adminStatistics(id) : this.api.statistics(id)).subscribe({
      next: s => this.stats.set(s),
      error: e => this.dialogs.alert(e.error?.message ?? '無法取得統計'),
    });
  }

}
