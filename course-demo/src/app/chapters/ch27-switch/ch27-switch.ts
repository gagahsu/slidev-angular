import { Component } from '@angular/core';
// [(ngModel)] 雙向綁定需要 FormsModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ch27-switch',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch27-switch.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch27-switch.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                    // 獨立元件
  imports: [FormsModule]
})
export class Ch27Switch {

  // switch vs if 共用的變數
  testNum: number = 1;

  // @switch 小節練習（下拉選單可以切換）
  role: string = 'admin';

  // if 寫法
  useIf() {
    if (this.testNum == 1) {
      console.log(1);
    } else if (this.testNum == 2) {
      console.log(2);
    } else {
      console.log('other');
    }
  }

  // switch 寫法：結果和 if 相同
  // 每個 case 結尾要加 break，否則會繼續執行下一個 case
  useSwitch() {
    switch (this.testNum) {
      case (1):
        console.log(1);
        break;
      case (2):
        console.log(2);
        break;
      default:
        console.log('other');
        break;
    }
  }

  // switch 括號內可以放運算式：先算出結果，再和 case 比對
  useExpression() {
    switch (this.testNum * 3) {
      case (1):
        console.log(1);
        break;
      case (2):
        console.log(2);
        break;
      default:
        console.log('other');
        break;
    }
  }

  // 練習：Math.floor 無條件捨去，404 / 100 得到 4
  checkStatus() {
    let statusCode = 404;
    switch (Math.floor(statusCode / 100)) {
      case 2:
        console.log('請求成功');
        break;
      case 4:
        console.log('客戶端錯誤');
        break;
      case 5:
        console.log('伺服器錯誤');
        break;
      default:
        console.log('未知狀態');
        break;
    }
  }

  // 補充練習 1：數字比對
  checkDay() {
    let day: number = 3;
    switch (day) {
      case 1:
        console.log('星期一：認真上課');
        break;
      case 3:
        console.log('星期三：期中進度追蹤');
        break;
      default:
        console.log('其他日子：持續寫程式');
    }
  }

  // 補充練習 2：字串比對
  checkDiscount() {
    let role: string = 'VIP';
    switch (role) {
      case 'VIP':
        alert('尊榮貴賓：享全面 8 折！');
        break;
      case 'Member':
        alert('一般會員：享全面 9 折！');
        break;
      default:
        alert('訪客：維持原價。');
    }
  }

  // 補充練習 3：case 1 故意不寫 break，分支 2 也會被印出來
  fallThrough() {
    let code: number = 1;
    switch (code) {
      // 專案的 TypeScript 設定會直接擋下漏寫 break，這行註解讓它先通過編譯，才看得到結果
      // @ts-expect-error
      case 1:
        console.log('執行分支 1');
        // 忘記寫 break！
      case 2:
        console.log('執行分支 2');
        break;
    }
  }
}
