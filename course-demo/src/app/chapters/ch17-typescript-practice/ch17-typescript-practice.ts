// 從 Angular 核心套件匯入 Component，用來宣告「這個 class 是一個元件」
import { Component } from '@angular/core';

@Component({
  selector: 'app-ch17-typescript-practice',        // 這個元件在 HTML 中使用的標籤名稱
  imports: [],                                     // 這一章不需要額外的模組
  templateUrl: './ch17-typescript-practice.html',  // 這個元件使用的 HTML 檔案
  styleUrl: './ch17-typescript-practice.css',      // 這個元件使用的 CSS 檔案
})
export class Ch17TypescriptPractice {

  // 這一章的題目都用 console.log 看結果，所以點按鈕後要打開 F12 → Console

  // Date 小節練習：getMonth() 從 0 開始，要 +1 才是正確月份
  dateSection() {
    let date = new Date('1997-07-01 12:30:00');
    console.log(date.getFullYear());   // 1997
    console.log(date.getMonth() + 1);  // 7
    console.log(date.getDate());       // 1
    console.log(date.getDay());        // 2（週二）
    console.log(date.getHours());      // 12
  }

  // 日期比較：兩個 Date 要先用 getTime() 轉成毫秒數再比較
  compareDate() {
    let sDate = new Date('2024/11/27');
    let eDate = new Date('2024/11/28');
    console.log(sDate.getTime() > eDate.getTime()); // false
  }

  // 重組資料（物件）：把欄位名稱改成前端需要的名稱
  restructureObject() {
    let apiData = { account: 'allen123', score: 95, passed: true };
    let formData = {
      loginId: apiData.account,
      examScore: apiData.score,
      isPass: apiData.passed
    };
    console.log(formData);
  }

  // 重組資料（陣列）：用 map 對每一筆資料做同樣的重組
  restructureArray() {
    let jsonArray = [
      { name: 'Allen', age: 12, sex: 'M' },
      { name: 'Bob', age: 25, sex: 'M' }
    ];
    let newArray = jsonArray.map(item => ({
      userName: item.name,
      userAge: item.age,
      userSex: item.sex
    }));
    console.log(newArray);
  }

  // 宣告方法複習：** 2 是平方，toFixed(2) 取到小數點後兩位
  circleArea(radius: number) {
    let area = 3.14159 * radius ** 2;
    console.log('面積：' + area.toFixed(2));
  }

  // 練習 1：買一個漢堡、三個薯條後，還剩多少錢
  practice1() {
    let money = 200;
    let spent = 50 + 40 * 3;    // 170
    console.log(money - spent); // 30
  }

  // 練習 2：打九折就是乘以 0.9
  practice2() {
    let money = 5000;
    let cost = (10 * 50 + 10 * 40) * 0.9;  // 810
    console.log(money - cost);             // 4190
  }

  // 練習 3：用 forEach 檢查每一筆資料是否達到 VIP 資格
  practice3() {
    let arrayData = [
      { userName: 'Allen', payMoney: 500 },
      { userName: 'Ben', payMoney: 20 },
      { userName: 'Eric', payMoney: 120 }
    ];

    arrayData.forEach(item => {
      if (item.payMoney >= 200) {
        console.log(item.userName + ' 達成 VIP！');
      }
    });
  }

  // 練習 4：身高單位是 cm，計算時要除以 100 轉成 m
  calculateBMI(height: number, weight: number) {
    let bmi = weight / (height / 100) ** 2;

    if (bmi < 18.5) {
      console.log(`BMI ${bmi.toFixed(1)}：過輕`);
    } else if (bmi < 25) {
      console.log(`BMI ${bmi.toFixed(1)}：正常`);
    } else if (bmi < 30) {
      console.log(`BMI ${bmi.toFixed(1)}：過重`);
    } else {
      console.log(`BMI ${bmi.toFixed(1)}：肥胖`);
    }
  }

  // 補充練習 1：&& 代表兩邊都要成立
  checkEntry() {
    let age = 20;
    let hasTicket = true;

    if (age >= 18 && hasTicket) {
      console.log('允許入場');
    } else {
      console.log('拒絕入場');
    }
  }

  // 補充練習 2：比較現在時間和截止日
  checkDeadline() {
    let deadline = new Date('2026/12/31');
    let now = new Date();

    if (now.getTime() > deadline.getTime()) {
      alert('警告：活動已過期！');
    } else {
      console.log('活動進行中');
    }
  }

  // 補充練習 3：用 map 把後端欄位改成前端專用的欄位
  mapProducts() {
    let backendProducts = [
      { prod_id: 101, title: '滑鼠' },
      { prod_id: 102, title: '鍵盤' }
    ];

    let frontendProducts = backendProducts.map((item) => {
      return {
        id: item.prod_id,
        name: item.title
      };
    });

    console.log(frontendProducts);
  }
}
