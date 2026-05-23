/*
  === 第46章：Signals — LoadingService（Signal 版本）===

  Signal 是 Angular 17 引入的同步響應式原語（Reactive Primitive）。
  相較於 Observable（非同步），Signal 的值永遠是同步可讀的。

  Signal vs Observable 核心差異：
  ┌──────────────┬────────────────────────┬──────────────────────────┐
  │              │ Signal                 │ Observable               │
  ├──────────────┼────────────────────────┼──────────────────────────┤
  │ 讀取方式     │ signal()               │ .subscribe()             │
  │ 更新方式     │ .set() / .update()     │ subject.next()           │
  │ 執行方式     │ 同步                   │ 可同步或非同步            │
  │ HTML 讀取    │ {{ signal() }}         │ {{ obs$ | async }}       │
  │ 初始值       │ 必須給                 │ 不一定                   │
  └──────────────┴────────────────────────┴──────────────────────────┘

  signal() 的三個方法：
  .set(value)          → 設定新值
  .update(fn)          → 根據目前值計算新值（純函式）
  .asReadonly()        → 回傳只能讀不能寫的版本
*/

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // signal<型別>(初始值)
  // private：只有 Service 能修改
  private _loading = signal<boolean>(false);

  // 對外暴露唯讀版本（外部只能讀，不能 .set()）
  loading = this._loading.asReadonly();

  show(): void {
    this._loading.set(true);
  }

  hide(): void {
    this._loading.set(false);
  }
}
