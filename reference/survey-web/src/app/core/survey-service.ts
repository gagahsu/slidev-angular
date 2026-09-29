import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { AppResponse, PageResult, Response, Statistics, Survey } from '../models/models';
import { API } from './api';


export interface SearchParams { title?: string; startDate?: string; endDate?: string; page: number; size: number; }

@Injectable({ providedIn: 'root' })
export class SurveyService {
  private http = inject(HttpClient);

  // ---- 前台 ----
  list(p: SearchParams) {
    return this.http.get<AppResponse<PageResult<Survey>>>(`${API}/surveys`, { params: this.params(p) }).pipe(map(r => r.data));
  }
  get(id: number) { return this.http.get<AppResponse<Survey>>(`${API}/surveys/${id}`).pipe(map(r => r.data)); }
  statistics(id: number) { return this.http.get<AppResponse<Statistics>>(`${API}/surveys/${id}/statistics`).pipe(map(r => r.data)); }
  saveDraft(id: number, body: Response) { return this.http.post<AppResponse<null>>(`${API}/surveys/${id}/draft`, body); }
  getDraft(id: number) { return this.http.get<AppResponse<Response>>(`${API}/surveys/${id}/draft`).pipe(map(r => r.data)); }
  submit(id: number) { return this.http.post<AppResponse<{ responseId: number }>>(`${API}/surveys/${id}/submit`, {}); }
  myResponses() { return this.http.get<AppResponse<Response[]>>(`${API}/users/me/responses`).pipe(map(r => r.data)); }

  // ---- 後台 ----
  adminList(p: SearchParams) {
    return this.http.get<AppResponse<PageResult<Survey>>>(`${API}/admin/surveys`, { params: this.params(p) }).pipe(map(r => r.data));
  }
  adminGet(id: number) { return this.http.get<AppResponse<Survey>>(`${API}/admin/surveys/${id}`).pipe(map(r => r.data)); }
  deleteMany(ids: number[]) { return this.http.delete<AppResponse<null>>(`${API}/admin/surveys`, { body: ids }); }
  saveSurveyDraft(s: Survey) { return this.http.post<AppResponse<null>>(`${API}/admin/survey-draft`, s); }
  getSurveyDraft() { return this.http.get<AppResponse<Survey | null>>(`${API}/admin/survey-draft`).pipe(map(r => r.data)); }
  commit(publish: boolean) { return this.http.post<AppResponse<Survey>>(`${API}/admin/survey-draft/commit`, null, { params: { publish } }); }
  responses(id: number, page: number, size: number) {
    return this.http.get<AppResponse<PageResult<Response>>>(`${API}/admin/surveys/${id}/responses`, { params: { page, size } }).pipe(map(r => r.data));
  }
  responseDetail(id: number) { return this.http.get<AppResponse<Response>>(`${API}/admin/responses/${id}`).pipe(map(r => r.data)); }
  adminStatistics(id: number) { return this.http.get<AppResponse<Statistics>>(`${API}/admin/surveys/${id}/statistics`).pipe(map(r => r.data)); }

  private params(p: SearchParams) {
    let hp = new HttpParams().set('page', p.page).set('size', p.size);
    if (p.title) hp = hp.set('title', p.title);
    if (p.startDate) hp = hp.set('startDate', p.startDate);
    if (p.endDate) hp = hp.set('endDate', p.endDate);
    return hp;
  }
}
