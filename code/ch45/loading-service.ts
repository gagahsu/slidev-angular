/*
  === 第45章：Loading — LoadingService ===

  LoadingService 讓任何元件都能控制全域 loading 狀態，
  其他元件只要訂閱 loading$ 就能即時反映最新狀態。

  設計重點：
  ① private _loading$ — 只有 Service 能發值
  ② public loading$ — 外部元件訂閱
  ③ show() / hide() — 對外唯一的控制介面

  async pipe 的優勢：
  → HTML 直接用 (loading$ | async)，不需要在 TypeScript 手動 subscribe
  → Angular 會自動在元件銷毀時取消訂閱，不用擔心記憶體洩漏
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // 私有 BehaviorSubject（初始值 false = 不顯示 loading）
  private _loading$ = new BehaviorSubject<boolean>(false);

  // 公開 Observable，外部只能訂閱不能直接發值
  loading$ = this._loading$.asObservable();

  show(): void {
    this._loading$.next(true);
  }

  hide(): void {
    this._loading$.next(false);
  }
}
