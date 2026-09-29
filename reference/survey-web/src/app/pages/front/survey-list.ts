import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { SurveyService } from '../../core/survey-service';
import { PageResult, Survey } from '../../models/models';
import { toDateString } from '../../shared/date-util';

@Component({
  selector: 'app-survey-list',
  imports: [ReactiveFormsModule, RouterLink, MatTableModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './survey-list.html',
})
export class SurveyList {
  private api = inject(SurveyService);
  private fb = inject(FormBuilder);

  columns = ['id', 'title', 'statusLabel', 'startDate', 'endDate', 'stats'];
  page = signal<PageResult<Survey>>({ content: [], page: 0, size: 10, totalElements: 0, totalPages: 0 });

  form = this.fb.group({ title: [''], startDate: [null as Date | null], endDate: [null as Date | null] });

  constructor() { this.load(0, 10); }

  load(page: number, size: number) {
    const v = this.form.getRawValue();
    this.api.list({ title: v.title ?? '', startDate: toDateString(v.startDate), endDate: toDateString(v.endDate), page, size })
      .subscribe(res => this.page.set(res));
  }

  search() { this.load(0, this.page().size); }

  reset() { this.form.reset(); this.load(0, this.page().size); }

  onPage(e: PageEvent) { this.load(e.pageIndex, e.pageSize); }
}
