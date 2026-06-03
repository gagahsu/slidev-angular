import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private http = inject(HttpClient);

  getApi(url: string): Observable<any> {
    return this.http.get(url);
  }

  postApi(url: string, postData: any): Observable<any> {
    return this.http.post(url, postData);
  }

  putApi(url: string, putData: any): Observable<any> {
    return this.http.put(url, putData);
  }

  delApi(url: string): Observable<any> {
    return this.http.delete(url);
  }
}
