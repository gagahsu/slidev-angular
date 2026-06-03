import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Ch44LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  get isLoading(): boolean {
    return this.loadingSubject.getValue();
  }

  show(): void { this.loadingSubject.next(true); }
  hide(): void { this.loadingSubject.next(false); }

  private dataUpdatedSubject = new Subject<void>();
  dataUpdated$ = this.dataUpdatedSubject.asObservable();

  notifyDataUpdated(): void { this.dataUpdatedSubject.next(); }
}
