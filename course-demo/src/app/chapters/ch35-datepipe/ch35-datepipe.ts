// OnInit 是生命週期介面，實作後可以使用 ngOnInit()
import { Component, OnInit } from '@angular/core';
// DatePipe 包含在 CommonModule 裡，匯入後 HTML 才能使用 | date
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ch35-datepipe',          // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch35-datepipe.html',    // 這個元件使用的 HTML 檔案
  styleUrl: './ch35-datepipe.css',        // 這個元件使用的 CSS 檔案
  standalone: true,                       // 獨立元件：需要的模組直接寫在下面的 imports
  imports: [
    CommonModule
  ],
})
export class Ch35Datepipe implements OnInit {

  // 建立一個代表「現在時間」的 Date 物件
  today = new Date();

  // 元件初始化時執行：打開 F12 的 Console 可以看到這兩行輸出
  ngOnInit(): void {
    // 直接印出 Date 物件：原始格式，包含星期和時區
    console.log(this.today);
    // 印出手動轉換後的結果，例如 2026/02/12
    console.log(this.tidyDate(this.today));
  }

  // 接收一個 Date 值，回傳格式化後的 string
  tidyDate(date: Date): string {
    let newDate = '';

    // 加入年份與分隔符
    newDate = newDate + date.getFullYear() + '/';

    // 月份補零（月份從 0 起算，需 +1）
    if ((date.getMonth() + 1) < 10) {
      newDate = newDate + 0 + (date.getMonth() + 1) + '/';
    } else {
      newDate = newDate + (date.getMonth() + 1) + '/';
    }

    // 日期補零
    if (date.getDate() < 10) {
      newDate = newDate + 0 + date.getDate();
    } else {
      newDate = newDate + date.getDate();
    }

    // 回傳組合好的日期字串
    return newDate;
  }
}
