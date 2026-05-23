/*
  === 第30章：資料排序（Data Sorting）===

  JavaScript 的 Array.sort() 方法讓陣列依指定規則重新排列。

  sort() 接受一個「比較函式」，函式回傳：
  ① 負數（-1） → a 排在 b 前面（a 較小）
  ② 正數（1）  → b 排在 a 前面（b 較小）
  ③ 0         → 順序不變

  排序邏輯口訣：
  「回傳 -1 = a 贏，回傳 1 = b 贏」

  注意：sort() 會直接修改原陣列（in-place）！
       如果不想改動原始資料，先用 [...arr] 複製再排序。
*/

import { Component } from '@angular/core';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const SOURCE_DATA: PeriodicElement[] = [
  { position: 10, name: 'Neon',      weight: 20.1797, symbol: 'Ne' },
  { position: 1,  name: 'Hydrogen',  weight: 1.0079,  symbol: 'H'  },
  { position: 6,  name: 'Carbon',    weight: 12.0107, symbol: 'C'  },
  { position: 3,  name: 'Lithium',   weight: 6.941,   symbol: 'Li' },
  { position: 8,  name: 'Oxygen',    weight: 15.9994, symbol: 'O'  },
  { position: 2,  name: 'Helium',    weight: 4.0026,  symbol: 'He' },
  { position: 7,  name: 'Nitrogen',  weight: 14.0067, symbol: 'N'  },
  { position: 5,  name: 'Boron',     weight: 10.811,  symbol: 'B'  },
  { position: 4,  name: 'Beryllium', weight: 9.0122,  symbol: 'Be' },
  { position: 9,  name: 'Fluorine',  weight: 18.9984, symbol: 'F'  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: []
})
export class AppComponent {

  // 排序用的資料（複製原始資料，不污染 SOURCE_DATA）
  tableData: PeriodicElement[] = [...SOURCE_DATA];

  // 記錄目前按哪個欄位排序
  currentSort: string = '（尚未排序）';

  // ==============================
  // 依 position 排序（數字）
  // ==============================
  sortByPosition(): void {
    this.tableData.sort((a, b) => {
      if (a.position < b.position) return -1;  // a 的 position 小 → a 在前
      if (a.position > b.position) return 1;   // b 的 position 小 → b 在前
      return 0;
    });
    this.currentSort = 'position（升冪）';
  }

  // ==============================
  // 依 name 排序（字母）
  // ==============================
  sortByName(): void {
    this.tableData.sort((a, b) => {
      if (a.name < b.name) return -1;  // 字母比較：A < B → a 在前
      if (a.name > b.name) return 1;
      return 0;
    });
    this.currentSort = 'name（A → Z）';
  }

  // ==============================
  // 依 weight 排序（小數）
  // ==============================
  sortByWeight(): void {
    this.tableData.sort((a, b) => {
      if (a.weight < b.weight) return -1;
      if (a.weight > b.weight) return 1;
      return 0;
    });
    this.currentSort = 'weight（升冪）';
  }

  // ==============================
  // 依 weight 降冪排序（大 → 小）
  // ==============================
  sortByWeightDesc(): void {
    this.tableData.sort((a, b) => {
      if (a.weight > b.weight) return -1;  // a 的 weight 大 → a 在前（降冪）
      if (a.weight < b.weight) return 1;
      return 0;
    });
    this.currentSort = 'weight（降冪）';
  }

  // ==============================
  // 還原原始順序
  // ==============================
  resetSort(): void {
    this.tableData = [...SOURCE_DATA];
    this.currentSort = '（原始順序）';
  }
}
