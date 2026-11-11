import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // private：只有這個 Service 內部可以修改
  // BehaviorSubject 需要初始值；Subject 不需要
  private loading$ = new BehaviorSubject<boolean>(false);
  private loading2$ = new Subject<boolean>();

  // asObservable()：對外公開，外部只能訂閱，不能修改
  _loading$ = this.loading$.asObservable();
  _loading2$ = this.loading2$.asObservable();

  // 外部透過這兩個方法修改內容
  show() {
    this.loading$.next(true);
  }

  hide() {
    this.loading$.next(false);
  }

  // 補充練習 2：推送資料給 Subject 的訂閱者
  sendSubject() {
    this.loading2$.next(true);
  }
}
