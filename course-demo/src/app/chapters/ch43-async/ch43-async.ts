import { Component } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-ch43-async',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch43-async.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch43-async.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                   // 獨立元件
  imports: [UserListComponent]
})
export class Ch43Async {

  // 同步：一定依照 A → B → C 的順序執行
  syncDemo() {
    function stepA(): void {
      console.log('執行 A');
    }
    function stepB(): void {
      console.log('執行 B');
    }
    function stepC(): void {
      console.log('執行 C');
    }

    stepA();
    stepB();
    stepC();
  }

  // 非同步：setTimeout 不會擋住後面的程式
  // 順序是：開始 → 結束 → setTimeout 執行（1 秒後）
  setTimeoutDemo() {
    console.log('開始');
    setTimeout(() => {
      console.log('setTimeout 執行');
    }, 1000);
    console.log('結束');
  }

  // 補充練習 1
  practice1() {
    console.log('A');
    console.log('B');
    console.log('C');
  }

  // 補充練習 2：即使延遲 0 毫秒，順序仍然是 開始 → 結束 → 內層
  practice2() {
    console.log('開始');
    setTimeout(() => { console.log('內層'); }, 0);
    console.log('結束');
  }
}
