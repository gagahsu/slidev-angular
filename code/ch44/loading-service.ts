/*
  === 第44章：訂閱（Subscription）— LoadingService ===

  當多個不相關的元件需要共享同一個「狀態」時，
  可以用 RxJS 的 Subject / BehaviorSubject 建立一個共享的資料流。

  Subject vs BehaviorSubject 的差異：
  ┌───────────────────┬─────────────────────┬──────────────────────────┐
  │                   │ Subject             │ BehaviorSubject          │
  ├───────────────────┼─────────────────────┼──────────────────────────┤
  │ 初始值            │ 無                  │ 必須給初始值              │
  │ 新訂閱者          │ 只收到訂閱後的值     │ 立刻收到「目前值」         │
  │ 適合              │ 事件通知（一次性）   │ 狀態管理（有當前值）       │
  └───────────────────┴─────────────────────┴──────────────────────────┘

  設計模式：
  ① 私有的 Subject（data source，只有 Service 自己能發值）
  ② 公開的 Observable（外部只能訂閱，不能直接發值）
  → 保護資料流，避免外部亂改狀態
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'   // 整個應用共用一個實例
})
export class LoadingService {

  // ==============================
  // BehaviorSubject：有初始值，適合管理「狀態」
  // ==============================

  // private：只有 Service 能用 .next() 發值，外部不能直接修改
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // public Observable：外部元件訂閱這個，接收狀態變化
  // asObservable() 把 Subject 包成純粹的 Observable（無法呼叫 .next()）
  loading$ = this.loadingSubject.asObservable();

  // 取得目前的值（不訂閱，直接讀取）
  get isLoading(): boolean {
    return this.loadingSubject.getValue();
  }

  // 對外提供的方法：統一控制 loading 狀態
  show(): void {
    this.loadingSubject.next(true);
    console.log('LoadingService: show()');
  }

  hide(): void {
    this.loadingSubject.next(false);
    console.log('LoadingService: hide()');
  }

  // ==============================
  // Subject：無初始值，適合「事件通知」
  // ==============================

  // 用來通知「資料已更新」的事件（不需要傳值，只是通知）
  private dataUpdatedSubject = new Subject<void>();
  dataUpdated$ = this.dataUpdatedSubject.asObservable();

  // 觸發「資料更新」事件
  notifyDataUpdated(): void {
    this.dataUpdatedSubject.next();
  }
}
