import { Injectable } from '@angular/core';

// providedIn: 'root' 代表整個專案共用同一個實例，所有頁面看到的是同一份資料
@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  // 要在頁面之間傳遞的資料
  userName: string = '';
}
