// Injectable：讓這個 Service 可以被注入到其他地方
import { Injectable } from '@angular/core';
// HttpClient：Angular 用來呼叫 API 的工具
import { HttpClient } from '@angular/common/http';

// providedIn: 'root' 代表整個專案共用同一個實例，不需要自己 new
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  // 透過 constructor 注入 HttpClient，之後用 this.http 呼叫
  constructor(private http: HttpClient) {}

  // 讀取
  getApi(url: string) {
    return this.http.get(url);
  }

  // 新增：第二個參數是要傳給後端的資料
  postApi(url: string, postData: any) {
    return this.http.post(url, postData);
  }

  // 更新
  putApi(url: string, putData: any) {
    return this.http.put(url, putData);
  }

  // 刪除
  delApi(url: string) {
    return this.http.delete(url);
  }
}
