import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SurveyService } from '../../core/survey-service';
import { Dialogs } from '../../shared/dialogs';
import { PageResult, Survey } from '../../models/models';
import { toDateString } from '../../shared/date-util';

@Component({
  selector: 'app-admin-list',
  imports: [ReactiveFormsModule, RouterLink, MatTableModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './admin-list.html',
})
export class AdminList {
  private api = inject(SurveyService);
  private fb = inject(FormBuilder);
  private dialogs = inject(Dialogs);
  private router = inject(Router);

  columns = ['select', 'id', 'title', 'statusLabel', 'startDate', 'endDate', 'result'];
  page = signal<PageResult<Survey>>({ content: [], page: 0, size: 10, totalElements: 0, totalPages: 0 });
  selected = signal<Set<number>>(new Set());
  hasSelection = computed(() => this.selected().size > 0);
  form = this.fb.group({ title: [''], startDate: [null as Date | null], endDate: [null as Date | null] });

  constructor() { this.load(0, 10); }

  load(page: number, size: number) {
    const v = this.form.getRawValue();
    this.api.adminList({ title: v.title ?? '', startDate: toDateString(v.startDate), endDate: toDateString(v.endDate), page, size })
      .subscribe(res => { this.page.set(res); this.selected.set(new Set()); });
  }
  search() { this.load(0, this.page().size); }
  reset() { this.form.reset(); this.load(0, this.page().size); }
  onPage(e: PageEvent) { this.load(e.pageIndex, e.pageSize); }

  /** 只有「未發佈」「尚未開始」才能修改、刪除 */
  editable(s: Survey) { return s.status === 'DRAFT' || s.status === 'NOT_STARTED'; }
  hasResult(s: Survey) { return s.status === 'ONGOING' || s.status === 'ENDED'; }

  toggle(id: number, checked: boolean) {
    const next = new Set(this.selected());
    checked ? next.add(id) : next.delete(id);
    this.selected.set(next);
  }

  async remove() {
    if (!(await this.dialogs.confirm(`確定要刪除選取的 ${this.selected().size} 份問卷嗎？`))) return;
    this.api.deleteMany([...this.selected()]).subscribe({
      next: () => this.load(this.page().page, this.page().size),
      error: e => this.dialogs.alert(e.error?.message ?? '刪除失敗'),
    });
  }

  add() { this.router.navigate(['/admin/edit']); }
}
