import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Ch42DialogInner } from './dialog/ch42-dialog-inner';

@Component({
  selector: 'app-ch42-dialog',
  templateUrl: './ch42-dialog.html',
  styleUrl: './ch42-dialog.css',
  standalone: true,
  imports: [MatButtonModule, Ch42DialogInner, JsonPipe]
})
export class Ch42Dialog {
  readonly dialog = inject(MatDialog);

  dialogResult: any = null;
  confirmResult: string = '';

  openDialog(): void {
    const dialogRef = this.dialog.open(Ch42DialogInner, {
      data: {
        title: '確認操作',
        message: '你確定要刪除這筆資料嗎？',
        userName: '王小明'
      },
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(Ch42DialogInner, {
      data: {
        title: '送出表單',
        message: '確定要送出這份表單嗎？送出後無法修改。',
        confirmLabel: '確定送出',
        cancelLabel: '再想想'
      },
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.confirmResult = result === true ? '✅ 已確認送出！' : '❌ 已取消';
    });
  }
}
