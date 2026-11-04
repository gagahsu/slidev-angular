import { AfterViewInit, Component, ViewChild } from '@angular/core';
// MatTableModule 提供表格，MatTableDataSource 用來包裝資料
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// MatPaginatorModule 提供分頁器
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

// 補充練習 3：多加一個 status 欄位
export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 'Gas' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 'Gas' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 'Solid' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 'Solid' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 'Solid' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status: 'Solid' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', status: 'Gas' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', status: 'Gas' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', status: 'Gas' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', status: 'Gas' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', status: 'Solid' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', status: 'Solid' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', status: 'Solid' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', status: 'Solid' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', status: 'Solid' },
];

@Component({
  selector: 'app-ch32-mat-table',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch32-mat-table.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch32-mat-table.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                       // 獨立元件
  imports: [MatTableModule, MatPaginatorModule]
})
export class Ch32MatTable implements AfterViewInit {

  // 決定表格顯示哪些欄位，以及欄位順序
  // 每個名稱都要在 HTML 找到相同的 matColumnDef
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];

  // 表格的資料來源
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // 取得 HTML 裡的 mat-paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // 畫面組裝完成後才取得到分頁器，所以要寫在這裡
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
