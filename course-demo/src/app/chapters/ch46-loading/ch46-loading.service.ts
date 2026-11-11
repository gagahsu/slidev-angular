import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // 私有：外部無法直接修改；初始值 false 代表不顯示
  private _loading$ = new BehaviorSubject<boolean>(false);

  // 公開唯讀的 Observable，外部只能訂閱
  loading$ = this._loading$.asObservable();

  // 顯示 Loading
  show() {
    this._loading$.next(true);
  }

  // 隱藏 Loading
  hide() {
    this._loading$.next(false);
  }
}
