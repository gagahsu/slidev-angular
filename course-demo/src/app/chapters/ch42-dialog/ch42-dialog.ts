import { ChangeDetectorRef, Component, inject } from '@angular/core';
// MatDialog 用來開啟對話框
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogFormComponent } from './dialog/dialog-form';
import { ConfirmDialog } from './dialog/confirm-dialog';
import { StockDialog } from './dialog/stock-dialog';

@Component({
  selector: 'app-ch42-dialog',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch42-dialog.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch42-dialog.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                    // 獨立元件
  imports: [MatButtonModule]
})
export class Ch42Dialog {
  readonly dialog = inject(MatDialog);

  // 投影片沒有這一行：這個示範專案沒有安裝 zone.js，
  // 對話框關閉後要呼叫 markForCheck() 通知 Angular 更新畫面
  private cdr = inject(ChangeDetectorRef);

  // 補充練習 3：畫面上的庫存
  stock: number = 50;

  // 練習：open() 第一個參數是對話框元件，第二個是設定物件
  showDialog() {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '400px',
      data: { name: '姓名', animal: '請輸入資料' },
    });

    // 對話框關閉後觸發，result 是回傳的內容
    dialogRef.afterClosed().subscribe(result => {
      console.log('使用者輸入：', result);
    });
  }

  // 補充練習 1：依回傳值判斷使用者按了哪個按鈕
  openConfirm() {
    const dialogRef = this.dialog.open(ConfirmDialog, { width: '600px' });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        alert('資料已刪除');
      }
    });
  }

  // 補充練習 3：把目前庫存傳入對話框，關閉後更新畫面
  openStock() {
    const dialogRef = this.dialog.open(StockDialog, { data: { count: this.stock } });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.stock = result;
        this.cdr.markForCheck();
      }
    });
  }
}
