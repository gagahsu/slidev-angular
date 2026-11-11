import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, from, interval, map, of } from 'rxjs';

@Component({
  selector: 'app-ch44-rxjs',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch44-rxjs.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch44-rxjs.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                  // 獨立元件
  imports: []                        // 這一章不需要額外的模組
})
export class Ch44Rxjs implements OnDestroy {

  // 記錄 interval 的訂閱，停止時才能取消
  private intervalSubscription?: Subscription;

  // Observable：1、2、3 同步推送，4 在 1 秒後推送
  // 順序：before → 1 → 2 → 3 → after → 4 → done
  observableDemo() {
    const observable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    console.log('just before subscribe');
    observable.subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
    console.log('just after subscribe');
  }

  // Observer：一組回呼函式，負責接收 Observable 推送的通知
  observerDemo() {
    const observer = {
      next: (x: number) => console.log('Observer got a next value: ' + x),
      error: (err: unknown) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };

    of(1, 2, 3).subscribe(observer);
  }

  // pipe 串接運算子；map 把每個值轉換成新的值
  pipeDemo() {
    of(1, 2, 3)
      .pipe(map((x) => x * x))
      .subscribe((v) => console.log(`value: ${v}`));
  }

  // interval：每隔 1000 毫秒發出 0, 1, 2, 3...
  startInterval() {
    this.stopInterval();
    this.intervalSubscription = interval(1000).subscribe((x) => console.log(x));
  }

  // unsubscribe：取消訂閱並釋放資源
  stopInterval() {
    this.intervalSubscription?.unsubscribe();
  }

  // add：把子訂閱加入父訂閱，只要取消一次，全部都會取消
  multipleSubscriptions() {
    const observable1 = interval(400);
    const observable2 = interval(300);

    const subscription = observable1.subscribe((x) => console.log('first: ' + x));
    const childSubscription = observable2.subscribe((x) => console.log('second: ' + x));

    subscription.add(childSubscription);

    setTimeout(() => {
      subscription.unsubscribe();
    }, 1000);
  }

  // Subject：多播，所有訂閱者同時收到相同的值
  subjectDemo() {
    const subject = new Subject<number>();

    subject.subscribe({ next: (v) => console.log(`observerA: ${v}`) });
    subject.subscribe({ next: (v) => console.log(`observerB: ${v}`) });

    subject.next(1);
    subject.next(2);
  }

  // Subject 當作 Observer 傳入，讓多個訂閱者共享同一個資料流
  bridgeDemo() {
    const subject = new Subject<number>();

    subject.subscribe({ next: (v) => console.log(`observerA: ${v}`) });
    subject.subscribe({ next: (v) => console.log(`observerB: ${v}`) });

    const observable = from([1, 2, 3]);
    observable.subscribe(subject);
  }

  // BehaviorSubject：持有目前的值，新訂閱者立刻收到最新值
  behaviorDemo() {
    const subject = new BehaviorSubject(0);  // 初始值為 0

    subject.subscribe((v) => console.log('A: ' + v));  // A: 0
    subject.next(1);                                   // A: 1
    subject.subscribe((v) => console.log('B: ' + v));  // B: 1
    subject.next(2);                                   // A: 2, B: 2
  }

  // 離開頁面時，停止計時
  ngOnDestroy() {
    this.stopInterval();
  }
}
