import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface MessageData { title: string; lines: string[]; confirm?: boolean; }

/** 提醒視窗（alert）與確認視窗（confirm）共用 */
@Component({
  selector: 'app-message-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      @for (l of data.lines; track $index) { <p>{{ l }}</p> }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      @if (data.confirm) { <button mat-button [mat-dialog-close]="false">取消</button> }
      <button mat-flat-button [mat-dialog-close]="true">{{ data.confirm ? '確定' : '知道了' }}</button>
    </mat-dialog-actions>`,
})
export class MessageDialog {
  data = inject<MessageData>(MAT_DIALOG_DATA);
}
