import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Dialogs } from '../shared/dialogs';

/** 元件只要有這個方法，就能被 unsavedGuard 保護 */
export interface HasUnsavedChanges { hasUnsavedChanges(): boolean; }

export const unsavedGuard: CanDeactivateFn<HasUnsavedChanges> = (component) =>
  component.hasUnsavedChanges()
    ? inject(Dialogs).confirm('有尚未儲存的內容，確定要離開嗎？')
    : true;
