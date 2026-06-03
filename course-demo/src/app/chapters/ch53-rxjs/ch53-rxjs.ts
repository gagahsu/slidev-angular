import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Observable, Subject, Subscription,
  of, from, interval,
  map, filter, take
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ch53-rxjs',
  templateUrl: './ch53-rxjs.html',
  styleUrl: './ch53-rxjs.css',
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class Ch53Rxjs implements OnInit, OnDestroy {
  observableLog: string[] = [];
  operatorLog: string[] = [];
  subjectLog: string[] = [];
  intervalLog: string[] = [];

  private intervalSub?: Subscription;
  private subject$ = new Subject<string>();
  observerALog: string[] = [];
  observerBLog: string[] = [];

  ngOnInit(): void {
    this.demoObservable();
    this.demoOperators();
  }

  demoObservable(): void {
    this.observableLog = [];
    const obs$ = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    obs$.subscribe({
      next:     (x)   => this.observableLog.push(`next: ${x}`),
      error:    (err) => this.observableLog.push(`error: ${err}`),
      complete: ()    => this.observableLog.push('complete ✓')
    });

    of('A', 'B', 'C').subscribe(v => this.observableLog.push(`of: ${v}`));
    from([10, 20, 30]).subscribe(v => this.observableLog.push(`from: ${v}`));
  }

  demoOperators(): void {
    this.operatorLog = [];
    of(1, 2, 3, 4, 5, 6)
      .pipe(filter(x => x % 2 === 0), map(x => x * x))
      .subscribe(v => this.operatorLog.push(`偶數平方：${v}`));
    of(10, 20, 30, 40, 50)
      .pipe(take(3))
      .subscribe(v => this.operatorLog.push(`take(3)：${v}`));
  }

  startInterval(): void {
    this.intervalLog = [];
    this.stopInterval();
    this.intervalSub = interval(1000)
      .pipe(take(5))
      .subscribe({
        next:     (n) => this.intervalLog.push(`計時：${n}`),
        complete: ()  => this.intervalLog.push('完成！')
      });
  }

  stopInterval(): void {
    this.intervalSub?.unsubscribe();
  }

  setupSubject(): void {
    this.observerALog = [];
    this.observerBLog = [];
    this.subject$ = new Subject<string>();
    this.subject$.subscribe(v => this.observerALog.push(`A 收到：${v}`));
    this.subject$.subscribe(v => this.observerBLog.push(`B 收到：${v}`));
  }

  sendToSubject(value: string): void {
    this.subject$.next(value);
  }

  ngOnDestroy(): void {
    this.stopInterval();
    this.subject$.complete();
  }
}
