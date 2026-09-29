/*
  === 第42章：Dialog（對話框）— 父元件 ===

  Angular Material 的 MatDialog 讓你彈出一個獨立的對話框視窗。

  使用流程：
  ① 建立 dialog 元件（dialog.component.ts + html）
  ② 在父元件 inject MatDialog
  ③ 呼叫 this.dialog.open(DialogComponent, options) 打開
  ④ 透過 afterClosed().subscribe() 接收關閉時的回傳值

  options 說明：
  data   → 傳進 dialog 的資料（在 dialog 裡用 inject(MAT_DIALOG_DATA) 取得）
  width  → dialog 的寬度
  height → dialog 的高度

  MatDialog 需要 Angular Material 已安裝（ng add @angular/material）。
*/

import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    DialogComponent   // 必須 import dialog 元件
  ]
})
export class AppComponent {

  // inject MatDialog，用來打開 dialog
  readonly dialog = inject(MatDialog);

  // 接收 dialog 回傳的結果
  dialogResult: any = null;
  confirmResult: string = '';

  // ==============================
  // 基本 dialog：傳入資料，接收結果
  // ==============================
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '確認操作',
        message: '你確定要刪除這筆資料嗎？',
        userName: '王小明'
      },
      width: '450px'
    });

    // afterClosed()：dialog 關閉後觸發
    // result 是 dialog 元件 close() 時傳出的值
    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
      console.log('dialog 回傳：', result);
    });
  }

  // ==============================
  // 確認/取消 dialog
  // ==============================
  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: '送出表單',
        message: '確定要送出這份表單嗎？送出後無法修改。',
        confirmLabel: '確定送出',
        cancelLabel: '再想想'
      },
      width: '400px',
      disableClose: true   // 點擊背景不關閉
    });

    dialogRef.afterClosed().subscribe(result => {
      this.confirmResult = result === true ? '✅ 已確認送出！' : '❌ 已取消';
    });
  }
}
