/*
  === 第32章：Mat-table + 分頁（Paginator）===

  mat-table 是 Angular Material 提供的資料表格元件，
  自帶排序、篩選、分頁功能，適合顯示大量結構化資料。

  三個必須同步的部分：
  ① HTML 的 matColumnDef 欄位名稱
  ② TypeScript 的 displayedColumns 陣列（控制顯示順序）
  ③ TypeScript 的資料物件屬性名稱

  這三個名稱要一致，Angular 才能正確對應資料和欄位。

  Paginator 步驟：
  ① imports 加入 MatPaginatorModule
  ② HTML 加入 <mat-paginator>
  ③ TypeScript 用 @ViewChild 取得 paginator 實例
  ④ ngAfterViewInit 裡把 paginator 綁進 dataSource
*/

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

// 定義元素週期表的資料結構
export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

// 原始資料（模擬 API 回傳）
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1,  name: 'Hydrogen',  weight: 1.0079,   symbol: 'H'  },
  { position: 2,  name: 'Helium',    weight: 4.0026,   symbol: 'He' },
  { position: 3,  name: 'Lithium',   weight: 6.941,    symbol: 'Li' },
  { position: 4,  name: 'Beryllium', weight: 9.0122,   symbol: 'Be' },
  { position: 5,  name: 'Boron',     weight: 10.811,   symbol: 'B'  },
  { position: 6,  name: 'Carbon',    weight: 12.0107,  symbol: 'C'  },
  { position: 7,  name: 'Nitrogen',  weight: 14.0067,  symbol: 'N'  },
  { position: 8,  name: 'Oxygen',    weight: 15.9994,  symbol: 'O'  },
  { position: 9,  name: 'Fluorine',  weight: 18.9984,  symbol: 'F'  },
  { position: 10, name: 'Neon',      weight: 20.1797,  symbol: 'Ne' },
  { position: 11, name: 'Sodium',    weight: 22.9897,  symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305,   symbol: 'Mg' },
  { position: 13, name: 'Aluminum',  weight: 26.9815,  symbol: 'Al' },
  { position: 14, name: 'Silicon',   weight: 28.0855,  symbol: 'Si' },
  { position: 15, name: 'Phosphorus',weight: 30.9738,  symbol: 'P'  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    MatTableModule,      // mat-table 需要
    MatPaginatorModule   // mat-paginator 需要
  ]
})
export class AppComponent implements AfterViewInit {

  // ① 控制表格顯示哪些欄位，以及順序
  //    要和 HTML 的 matColumnDef 名稱一致
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  // ② MatTableDataSource 包裝資料，支援分頁、篩選、排序
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // ③ 用 @ViewChild 取得畫面上的 MatPaginator 實例
  //    ! 是 non-null assertion，告訴 TypeScript 這個值一定存在
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ④ AfterViewInit：等 HTML 渲染完後，把 paginator 綁進 dataSource
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
