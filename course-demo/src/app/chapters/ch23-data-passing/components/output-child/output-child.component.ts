import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-output-child',
  imports: [FormsModule],
  templateUrl: './output-child.component.html',
})
export class OutputChildComponent {
  // 用一個物件包住三個欄位，一次就能傳給父元件
  userData = { userName: '', userEmail: '', userAddress: '' };

  // output：宣告要傳給父元件的事件，角括號內是資料的型別
  myOutput = output<{ userName: string; userEmail: string; userAddress: string }>();

  // emit：把整個物件送出去
  sendData() {
    this.myOutput.emit(this.userData);
  }
}
