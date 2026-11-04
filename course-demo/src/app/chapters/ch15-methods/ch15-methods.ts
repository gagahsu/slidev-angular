// 從 Angular 核心套件匯入 Component，用來宣告「這個 class 是一個元件」
import { Component } from '@angular/core';

@Component({
  selector: 'app-ch15-methods',        // 這個元件在 HTML 中使用的標籤名稱
  imports: [],                         // 這一章不需要額外的模組
  templateUrl: './ch15-methods.html',  // 這個元件使用的 HTML 檔案
  styleUrl: './ch15-methods.css',      // 這個元件使用的 CSS 檔案
})
export class Ch15Methods {

  // ② 方法中呼叫另一個方法，要用 this.方法名稱()
  firstMethod() {
    alert('我是第一個方法');
    this.secondMethod();
  }

  secondMethod() {
    alert('我是被呼叫的第二個方法');
  }

  // ③ 參數有預設值：age 不填時自動用 18
  // 有預設值的參數要放在最後面
  introduce(name: string, age: number = 18) {
    alert(name + ' 今年 ' + age + ' 歲');
  }

  // ④ 小括號後的 : number 代表這個方法會回傳數字
  addMoney(price1: number, price2: number): number {
    return price1 + price2;
  }

  showTotal() {
    const res = this.addMoney(10, 20);   // res 得到 30
    alert('總金額：' + res);
  }

  // ⑤ 練習：跳出訊息後，再呼叫 logDone()
  showMessage() {
    alert('訊息！');
    this.logDone();
  }

  // ⑤ 練習：呼叫時帶入名字
  greet(name: string) {
    alert('Hello, ' + name);
  }

  // ⑤ 練習：印在 F12 的 Console
  logDone() {
    console.log('完成！');
  }

  // ⑥ 補充練習：回傳正方形面積
  getArea(side: number): number {
    return side * side;
  }

  // ⑥ 補充練習：用區域常數接住 getArea() 的結果
  showArea() {
    const area = this.getArea(5);
    alert('正方形面積為：' + area);
  }
}
