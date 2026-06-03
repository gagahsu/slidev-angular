import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Ch46LoadingService {
  private _loading = signal<boolean>(false);
  loading = this._loading.asReadonly();

  show(): void { this._loading.set(true); }
  hide(): void { this._loading.set(false); }
}
