/*
  === 第37章：即時搜尋（Live Search）===

  使用者邊打字，表格資料立即篩選，不需要按搜尋按鈕。

  實作核心：
  ① (keyup) 事件監聽鍵盤輸入
  ② [(ngModel)] 雙向綁定，把輸入值同步到 TypeScript 變數
  ③ 用 forEach + indexOf 篩選符合的資料
  ④ 把篩選結果指定給 dataSource.data，表格自動更新

  indexOf 的用法：
  'Hydrogen'.indexOf('ydr')  → 1（找到，回傳起始索引）
  'Hydrogen'.indexOf('xyz')  → -1（找不到，回傳 -1）
  → 所以 indexOf(...) !== -1 代表「有包含這個字串」
*/

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

// 原始完整資料（搜尋時從這裡篩選，不修改此陣列）
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1,  name: 'Hydrogen',  weight: 1.0079,  symbol: 'H'  },
  { position: 2,  name: 'Helium',    weight: 4.0026,  symbol: 'He' },
  { position: 3,  name: 'Lithium',   weight: 6.941,   symbol: 'Li' },
  { position: 4,  name: 'Beryllium', weight: 9.0122,  symbol: 'Be' },
  { position: 5,  name: 'Boron',     weight: 10.811,  symbol: 'B'  },
  { position: 6,  name: 'Carbon',    weight: 12.0107, symbol: 'C'  },
  { position: 7,  name: 'Nitrogen',  weight: 14.0067, symbol: 'N'  },
  { position: 8,  name: 'Oxygen',    weight: 15.9994, symbol: 'O'  },
  { position: 9,  name: 'Fluorine',  weight: 18.9984, symbol: 'F'  },
  { position: 10, name: 'Neon',      weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium',    weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305,  symbol: 'Mg' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class AppComponent implements AfterViewInit {

  // 搜尋輸入框的值（[(ngModel)] 雙向綁定）
  inputData: string = '';

  // 表格欄位
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  // 表格資料來源（初始顯示全部）
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // 每次鍵盤輸入時觸發
  changeData(event: Event): void {
    const keyword = (event.target as HTMLInputElement).value;

    const filtered: PeriodicElement[] = [];

    ELEMENT_DATA.forEach((element) => {
      // indexOf 找到子字串時回傳 >= 0，找不到回傳 -1
      if (element.name.indexOf(keyword) !== -1) {
        filtered.push(element);
      }
    });

    // 更新 dataSource.data，表格自動重新渲染
    this.dataSource.data = filtered;

    // 搜尋後回到第一頁
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  // 清除搜尋
  clearSearch(): void {
    this.inputData = '';
    this.dataSource.data = ELEMENT_DATA;
  }
}
