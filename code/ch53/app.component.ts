/*
  === 第53章：RxJS（Reactive Extensions for JavaScript）===

  RxJS 是 Angular 內建使用的響應式程式庫，提供：
  ① Observable  — 資料流，可以是同步或非同步的一連串值
  ② Observer    — 訂閱者，定義 next / error / complete callback
  ③ Subscription — 訂閱的引用，用來取消訂閱
  ④ Operators   — 轉換 / 篩選 / 組合 Observable 的工具函式
  ⑤ Subject     — 既是 Observable 也是 Observer（可以主動發值）

  Observable 和 Array 的類比：
  Array：[1, 2, 3]  已經在記憶體裡
  Observable：1 → 2 → 3（隨時間到來的資料流）

  常用 Operators：
  map()      → 轉換每個值（類似 Array.map）
  filter()   → 篩選值（類似 Array.filter）
  take(n)    → 只取前 n 個值，然後完成
  interval() → 每隔 n 毫秒發一個數字（0, 1, 2, ...）
  of(...)    → 把一組值包成 Observable
  from(arr)  → 把陣列每個元素依序發出
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Observable,
  Subject,
  BehaviorSubject,
  Subscription,
  of,
  from,
  interval,
  map,
  filter,
  take
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class AppComponent implements OnInit, OnDestroy {

  // 各區塊的輸出日誌
  observableLog: string[] = [];
  operatorLog: string[] = [];
  subjectLog: string[] = [];
  intervalLog: string[] = [];

  private intervalSub?: Subscription;

  ngOnInit(): void {
    this.demoObservable();
    this.demoOperators();
  }

  // ==============================
  // ① Observable 基本建立與訂閱
  // ==============================
  demoObservable(): void {
    this.observableLog = [];

    // new Observable：自己控制什麼時候發值和完成
    const obs$ = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);   // 1 秒後非同步發值
        subscriber.complete(); // 告知完成
      }, 1000);
    });

    // subscribe：訂閱並接收值
    obs$.subscribe({
      next:     (x)   => this.observableLog.push(`next: ${x}`),
      error:    (err) => this.observableLog.push(`error: ${err}`),
      complete: ()    => this.observableLog.push('complete ✓')
    });

    // of：快速建立 Observable（同步發出所有值）
    of('A', 'B', 'C').subscribe(v => this.observableLog.push(`of: ${v}`));

    // from：把陣列轉成 Observable
    from([10, 20, 30]).subscribe(v => this.observableLog.push(`from: ${v}`));
  }

  // ==============================
  // ② Operators（pipe 串接）
  // ==============================
  demoOperators(): void {
    this.operatorLog = [];

    // map + filter 串接（pipe）
    of(1, 2, 3, 4, 5, 6)
      .pipe(
        filter(x => x % 2 === 0),   // 只保留偶數：2, 4, 6
        map(x => x * x)             // 每個值平方：4, 16, 36
      )
      .subscribe(v => this.operatorLog.push(`偶數平方：${v}`));

    // take：只取前 3 個值
    of(10, 20, 30, 40, 50)
      .pipe(take(3))
      .subscribe(v => this.operatorLog.push(`take(3)：${v}`));
  }

  // ==============================
  // ③ interval：計時器 Observable
  // ==============================
  startInterval(): void {
    this.intervalLog = [];
    this.stopInterval();

    // interval(1000) 每 1 秒發一個數字（0, 1, 2, ...）
    this.intervalSub = interval(1000)
      .pipe(take(5))   // 只取 5 個，然後自動完成
      .subscribe({
        next:     (n) => this.intervalLog.push(`計時：${n}`),
        complete: ()  => this.intervalLog.push('完成！')
      });
  }

  stopInterval(): void {
    this.intervalSub?.unsubscribe();
  }

  // ==============================
  // ④ Subject（可多播的 Observable）
  // ==============================
  private subject$ = new Subject<string>();
  subjectValues: string[] = [];
  observerALog: string[] = [];
  observerBLog: string[] = [];

  setupSubject(): void {
    this.observerALog = [];
    this.observerBLog = [];
    this.subjectValues = [];

    // Observer A 先訂閱
    this.subject$.subscribe(v => this.observerALog.push(`A 收到：${v}`));

    // Observer B 後訂閱
    this.subject$.subscribe(v => this.observerBLog.push(`B 收到：${v}`));
  }

  sendToSubject(value: string): void {
    this.subject$.next(value);
    this.subjectValues.push(value);
  }

  ngOnDestroy(): void {
    this.stopInterval();
    this.subject$.complete();
  }
}
