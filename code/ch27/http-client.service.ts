/*
  === 第27章：串接 API — 步驟二：HttpClientService ===

  建立一個 Service 統一管理所有 API 呼叫。
  好處：
  ① URL 集中管理，改一個地方就好
  ② 所有元件共用同一個 HttpClient，不重複建立
  ③ 日後加入 token、loading 狀態，只需改這裡

  HTTP 四種方法對應 CRUD 操作：
  GET    → 讀取（Read）
  POST   → 新增（Create）
  PUT    → 修改（Update）
  DELETE → 刪除（Delete）
*/

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'   // 整個應用程式共用同一個實例
})
export class HttpClientService {

  // 用 inject() 取得 HttpClient 實例
  private http = inject(HttpClient);

  // ==============================
  // GET — 取得資料
  // ==============================
  getApi(url: string): Observable<any> {
    return this.http.get(url);
  }

  // ==============================
  // POST — 新增資料
  // ==============================
  postApi(url: string, postData: any): Observable<any> {
    return this.http.post(url, postData);
  }

  // ==============================
  // PUT — 修改資料（整筆替換）
  // ==============================
  putApi(url: string, putData: any): Observable<any> {
    return this.http.put(url, putData);
  }

  // ==============================
  // DELETE — 刪除資料
  // ==============================
  delApi(url: string): Observable<any> {
    return this.http.delete(url);
  }
}
