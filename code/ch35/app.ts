/*
  === 第35章：DatePipe（日期格式化）===

  Date 物件直接用 {{ today }} 顯示，會得到像這樣的結果：
  "Fri Nov 08 2024 00:00:00 GMT+0800"  ← 難以閱讀！

  有兩種解法：
  ① 手動用 getFullYear() / getMonth() / getDate() 組字串（繁瑣）
  ② 用 Angular 內建的 DatePipe，一行搞定：{{ today | date: 'yyyy/MM/dd' }}

  DatePipe 常用格式代碼：
  ┌──────────┬────────────────────────────────┐
  │ 代碼     │ 說明                           │
  ├──────────┼────────────────────────────────┤
  │ yyyy     │ 四位數年份（2024）              │
  │ MM       │ 兩位數月份（01-12）             │
  │ dd       │ 兩位數日期（01-31）             │
  │ HH       │ 24小時制（00-23）              │
  │ mm       │ 分鐘（00-59）                  │
  │ ss       │ 秒鐘（00-59）                  │
  │ 'fullDate'│ Thursday, February 12, 2026   │
  │ 'shortDate'│ 2/12/26                     │
  └──────────┴────────────────────────────────┘

  使用 DatePipe 需要在 imports 加入 CommonModule（或 DatePipe）。
*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule]   // DatePipe 包含在 CommonModule 裡
})
export class AppComponent {

  today: Date = new Date();

  // 固定的過去日期，方便對照格式
  sampleDate: Date = new Date('2024/11/08');

  // ==============================
  // 手動格式化（不用 Pipe，了解背後原理）
  // ==============================

  tidyDate(date: Date): string {
    const year = date.getFullYear();

    // getMonth() 回傳 0-11，所以要 +1
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 補零：月份和日期不足兩位時前面加 0
    const mm = month < 10 ? '0' + month : String(month);
    const dd = day   < 10 ? '0' + day   : String(day);

    return `${year}/${mm}/${dd}`;
  }

  tidyDateTime(date: Date): string {
    const base = this.tidyDate(date);
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${base} ${hh}:${min}:${ss}`;
  }
}
