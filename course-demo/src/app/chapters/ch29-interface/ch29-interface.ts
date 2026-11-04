import { Component } from '@angular/core';
// 從獨立檔案匯入 interface
import { Person } from './api-result.interface';

// interface 定義物件應該有哪些屬性，以及每個屬性的型別
// 小節練習：三個都是必填
interface Product {
  id: number;
  name: string;
  price: number;
}

// Class implements Interface 小節練習
interface Describable {
  name: string;
  describe(): string;
}

// implements：這個 class 必須包含 interface 定義的所有屬性和方法
export class Book implements Describable {
  name: string = '';

  describe(): string {
    return '書名：' + this.name;
  }
}

// 練習：props 是陣列，元素型別是另一個 interface
interface Props {
  propsName: string;
  amount: number;
}

interface UserArray {
  userName: string;
  lev: number;
  props: Props[];
}

// 補充練習 1：phone 加上問號，代表可以不填
interface Member {
  email: string;
  phone?: string;
}

// 補充練習 2：天氣 API 的巢狀資料
interface WeatherTime {
  startTime: string;
  endTime: string;
  parameter: {
    parameterName: string;
    parameterValue?: string;
  };
}

interface WeatherElement {
  elementName: string;   // Wx、PoP、MinT…
  time: WeatherTime[];
}

export interface WeatherLocation {
  locationName: string;
  weatherElement: WeatherElement[];
}

@Component({
  selector: 'app-ch29-interface',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch29-interface.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch29-interface.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                       // 獨立元件
  imports: []                             // 這一章不需要額外的模組
})
export class Ch29Interface {

  // age 是選填，所以這裡可以不寫
  personDate: Person = {
    name: 'Allen',
    sex: 'M',
  };

  laptop: Product = {
    id: 1,
    name: '筆記型電腦',
    price: 25000
  };

  book = new Book();

  userArray: UserArray = {
    userName: '玩家A',
    lev: 18,
    props: [
      { propsName: '蘑菇', amount: 5 },
      { propsName: '金幣', amount: 15 }
    ]
  };

  member1: Member = { email: 'allen@test.com' };
  member2: Member = { email: 'ben@test.com', phone: '0912345678' };

  // 用 interface 取代 any
  weatherList: WeatherTime[] = [];

  // constructor：元件建立時先執行
  constructor() {
    this.book.name = 'Angular 入門';
  }
}
