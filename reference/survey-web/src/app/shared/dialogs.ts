import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { MessageDialog } from './message-dialog';

@Injectable({ providedIn: 'root' })
export class Dialogs {
  private dialog = inject(MatDialog);

  alert(lines: string | string[], title = '提醒') {
    return firstValueFrom(this.dialog.open(MessageDialog, { data: { title, lines: [lines].flat() } }).afterClosed());
  }

  /** 使用者按「確定」回傳 true */
  async confirm(message: string, title = '請確認'): Promise<boolean> {
    return !!(await firstValueFrom(this.dialog.open(MessageDialog, { data: { title, lines: [message], confirm: true } }).afterClosed()));
  }
}
