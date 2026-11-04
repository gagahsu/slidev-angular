import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

// 補充練習 3：彈窗修改庫存數量
@Component({
  selector: 'stock-dialog',
  templateUrl: './stock-dialog.html',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions],
})
export class StockDialog {
  readonly dialogRef = inject(MatDialogRef<StockDialog>);
  // 接收主元件傳入的庫存
  readonly data = inject<{ count: number }>(MAT_DIALOG_DATA);

  // 把修改後的數字回傳給主元件
  confirm() {
    this.dialogRef.close(this.data.count);
  }
}
