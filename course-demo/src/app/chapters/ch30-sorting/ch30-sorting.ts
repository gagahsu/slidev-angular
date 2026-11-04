import { Component } from '@angular/core';

// 定義每一筆資料的形狀
export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-ch30-sorting',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch30-sorting.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch30-sorting.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                     // 獨立元件
  imports: []                           // 這一章不需要額外的模組
})
export class Ch30Sorting {

  // 未排序的資料：第一筆是 position 10 的 Neon
  ELEMENT_DATA: PeriodicElement[] = [
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  ];

  // sort() 會直接修改原本的陣列
  // 回傳 -1：a 排在 b 前面；回傳 1：b 排在 a 前面；回傳 0：順序不變
  sortByPosition() {
    this.ELEMENT_DATA.sort(function (a, b) {
      if (a.position < b.position) {
        return -1;
      }
      if (a.position > b.position) {
        return 1;
      }
      return 0;
    });
  }

  // 只要替換比較的欄位，就能切換排序依據
  sortByName() {
    this.ELEMENT_DATA.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  // 練習：依重量排序並印出，第一筆應該是 Hydrogen
  sortByWeight() {
    this.ELEMENT_DATA.sort(function (a, b) {
      if (a.weight < b.weight) {
        return -1;
      }
      if (a.weight > b.weight) {
        return 1;
      }
      return 0;
    });
    console.log(this.ELEMENT_DATA);
  }

  // 補充練習 1：數字不能只寫 sort()，否則會被當成字串比較
  sortNumbers() {
    let numbers = [50, 10, 5, 100, 32];
    numbers.sort((a, b) => a - b);
    console.log(numbers);   // [5, 10, 32, 50, 100]
  }

  // 補充練習 2：降序就是把 -1 和 1 反過來
  sortBySymbolDesc() {
    this.ELEMENT_DATA.sort((a, b) => {
      if (a.symbol < b.symbol) return 1;
      if (a.symbol > b.symbol) return -1;
      return 0;
    });
    console.log(this.ELEMENT_DATA);
  }
}
