import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// MatDialogRef 控制對話框；MAT_DIALOG_DATA 接收開啟時傳入的資料
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
})
export class DialogFormComponent {
  readonly dialogRef = inject(MatDialogRef<DialogFormComponent>);
  // 接收主元件透過 open() 傳入的 data
  readonly data = inject<{ name: string; animal: string }>(MAT_DIALOG_DATA);
  inputValue = '';

  // 關閉對話框，不回傳資料
  onNoClick(): void {
    this.dialogRef.close();
  }

  // 關閉對話框，並把輸入的內容回傳給主元件
  onSubmit(): void {
    this.dialogRef.close(this.inputValue);
  }
}
