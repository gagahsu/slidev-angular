// 從 Angular 核心套件匯入 Component，用來宣告「這個 class 是一個元件」
import { Component } from '@angular/core';
// FormsModule 提供 [(ngModel)] 雙向綁定
import { FormsModule } from '@angular/forms';
// 以下三個模組分別對應 HTML 裡的 mat-datepicker、mat-form-field、matInput，缺一不可
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// 讓 Material 使用瀏覽器原生的 Date 物件來處理日期
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ch34-datepicker',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch34-datepicker.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch34-datepicker.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                        // 獨立元件：需要的模組直接寫在下面的 imports
  providers: [provideNativeDateAdapter()], // 少了這一行，打開日曆時會報錯（補充練習 2）
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule
  ],
})
export class Ch34Datepicker {

  // ② 原生 input date：綁定的值是 yyyy-MM-dd 格式的「字串」
  today = '2024-11-05';

  // ④ mat-datepicker：綁定的值必須是 Date「物件」，不能直接給字串
  sDate = new Date('2024/11/8');   // 初始選取的日期
  minDate = new Date('2024/11/3'); // 最早可選的日期
  maxDate = new Date('2024/11/20'); // 最晚可選的日期

  // ⑤ 動態範圍：以今天為基準計算
  // 投影片的變數叫 today、minDate、maxDate，但這個檔案上面已經用過這些名字，
  // 同一個 class 不能有重複的名字，所以這裡換成不同的名稱
  // setDate() 會直接修改物件本身，所以三個變數一定要各自 new Date()
  currentDate: Date = new Date();
  dynamicMinDate: Date = new Date();
  dynamicMaxDate: Date = new Date();

  // 補充練習 1：出貨日期，一開始還沒選，所以是空字串
  orderDate: string = '';

  // 補充練習 3：可預約的日期範圍（投影片叫 minDate、maxDate，改名原因同上）
  reserveMinDate: Date;
  reserveMaxDate: Date;

  // constructor：元件建立時會先執行這裡
  constructor() {
    // ⑤ getDate() 取得今天是幾號，再用 setDate() 往前 7 天、往後 90 天
    this.dynamicMinDate.setDate(this.currentDate.getDate() - 7);
    this.dynamicMaxDate.setDate(this.currentDate.getDate() + 90);

    // 補充練習 3：用年、月、日重新建立日期，日 +1 是明天，日 +7 是一週後
    // 遇到月底時，Date 會自動進位到下個月
    const today = new Date();
    this.reserveMinDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    this.reserveMaxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  }
}
