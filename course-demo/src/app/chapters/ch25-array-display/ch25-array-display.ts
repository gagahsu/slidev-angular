import { Component } from '@angular/core';

@Component({
  selector: 'app-ch25-array-display',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch25-array-display.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch25-array-display.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                           // 獨立元件
  imports: []                                 // 這一章不需要額外的模組
})
export class Ch25ArrayDisplay {

  // 單一值陣列
  arrayData = [4, 5, 6];

  // 物件陣列
  arrayData2 = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' }
  ];

  // 巢狀陣列：物件裡面又有陣列
  arrayData3 = [
    { id: 1, name: 'a', userData: [{ userId: '1' }] },
    { id: 2, name: 'b', userData: [{ userId: '2' }] },
    { id: 3, name: 'c', userData: [{ userId: '3' }] }
  ];

  // @for 小節練習
  cities = ['台北', '台中', '高雄', '台南', '桃園'];

  // 練習 2：玩家與道具
  userArray = [
    {
      userName: '玩家A', lev: 10,
      props: [
        { propsName: '蘑菇', amount: 5 },
        { propsName: '金幣', amount: 15 }
      ]
    },
    {
      userName: '玩家B', lev: 15,
      props: [
        { propsName: '龜殼', amount: 1 },
        { propsName: '砲彈', amount: 15 }
      ]
    }
  ];

  // 傳統 for 迴圈：i 依序是 0、1、2
  forLoop() {
    let arrayData = [2, 3, 5];
    for (let i = 0; i < arrayData.length; i++) {
      console.log(arrayData[i]);
    }
  }

  // for...of：直接取得每一個元素，不需要索引
  forOfLoop() {
    let arrayData = [2, 3, 5];
    for (let data of arrayData) {
      console.log(data);
    }
  }

  // 巢狀迴圈：外層跑外層陣列，內層跑內層陣列
  nestedLoop() {
    for (let data of this.arrayData3) {
      for (let user of data.userData) {
        console.log(user.userId);
      }
    }
  }

  // 練習 1：找出 9 的位置，預期印出 5
  findNine() {
    let myArray = [10, 20, 3, 5, 8, 9, 23, 657, 123, 67];
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i] === 9) {
        console.log(i);
      }
    }
  }

  // 補充練習：% 是取餘數，除以 2 餘數不是 0 就是奇數
  filterOdd() {
    let prices = [11, 24, 35, 48, 57];
    for (let item of prices) {
      if (item % 2 !== 0) {
        console.log(item);   // 11、35、57
      }
    }
  }
}
