import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SurveyService } from '../../core/survey-service';
import { PageResult, Response } from '../../models/models';

@Component({
  selector: 'app-admin-responses',
  imports: [DatePipe, RouterLink, MatTableModule, MatPaginatorModule],
  template: `
    <h2>問卷回饋（問卷 {{ id }}）</h2>
    <p><a [routerLink]="['/admin', id, 'stats']">看統計</a> ・ <a routerLink="/admin">回列表</a></p>
    <table mat-table [dataSource]="page().content">
      <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef>填寫編號</th><td mat-cell *matCellDef="let r">{{ r.id }}</td></ng-container>
      <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>姓名</th><td mat-cell *matCellDef="let r">{{ r.name }}</td></ng-container>
      <ng-container matColumnDef="time"><th mat-header-cell *matHeaderCellDef>填寫時間</th><td mat-cell *matCellDef="let r">{{ r.submittedAt | date: 'yyyy/MM/dd HH:mm' }}</td></ng-container>
      <ng-container matColumnDef="go"><th mat-header-cell *matHeaderCellDef>細節</th><td mat-cell *matCellDef="let r"><a [routerLink]="['/admin/responses', r.id]">前往</a></td></ng-container>
      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns"></tr>
    </table>
    @if (page().totalElements === 0) { <p class="muted">還沒有人填寫</p> }
    <mat-paginator [length]="page().totalElements" [pageSize]="page().size" [pageIndex]="page().page"
      [pageSizeOptions]="[5, 10, 20]" (page)="onPage($event)" />`,
})
export class AdminResponses {
  private api = inject(SurveyService);
  id = Number(inject(ActivatedRoute).snapshot.paramMap.get('id'));
  columns = ['id', 'name', 'time', 'go'];
  page = signal<PageResult<Response>>({ content: [], page: 0, size: 10, totalElements: 0, totalPages: 0 });

  constructor() { this.load(0, 10); }
  load(p: number, s: number) { this.api.responses(this.id, p, s).subscribe(r => this.page.set(r)); }
  onPage(e: PageEvent) { this.load(e.pageIndex, e.pageSize); }
}
