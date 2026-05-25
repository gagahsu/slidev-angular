/*
  === 第42章：Dialog 元件 ===

  這是被打開的 dialog 元件本身。

  關鍵 import：
  - MatDialogRef  → 控制這個 dialog（關閉、傳回資料）
  - MAT_DIALOG_DATA → 接收父元件傳進來的 data
  - inject(MAT_DIALOG_DATA) → 取得父元件傳入的資料

  關閉 dialog：
  this.dialogRef.close(回傳值)
  → 回傳值可以是任何型別（字串、物件、布林值）
  → 父元件的 afterClosed().subscribe(result => ...) 會收到這個值
*/

import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,    // mat-dialog-title 指令
    MatDialogContent,  // mat-dialog-content 指令
    MatDialogActions,  // mat-dialog-actions 指令
    MatButtonModule
  ]
})
export class DialogComponent {

  // 取得這個 dialog 的控制器（用來關閉）
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  // 取得父元件透過 data 傳進來的資料
  readonly data = inject<any>(MAT_DIALOG_DATA);

  // 按下取消 / 關閉 → close() 不傳值（或傳 false）
  onCancel(): void {
    this.dialogRef.close(false);
  }

  // 按下確認 → close(true) 傳回 true 給父元件
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
