import { AfterViewInit, Component, ViewChild } from '@angular/core';
// [(ngModel)] 雙向繫結需要 FormsModule
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// 定義每一筆資料的形狀
export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

// 原始完整資料，不會被修改，重置時才拿得回來
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' }
];

@Component({
  selector: 'app-ch37-live-search',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch37-live-search.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch37-live-search.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                         // 獨立元件
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class Ch37LiveSearch implements AfterViewInit {

  // 綁定搜尋框
  inputData: string = '';

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // 補充練習 2 的版本：兩邊都轉成小寫再比較，輸入 h 也找得到 Hydrogen
  changeData(event: Event) {
    const keyword = (event.target as HTMLInputElement).value;
    // 暫存符合搜尋條件的資料
    let tidyData: PeriodicElement[] = [];
    ELEMENT_DATA.forEach((res) => {
      // indexOf 找不到時回傳 -1，所以 != -1 代表有包含關鍵字
      if (res.name.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
        tidyData.push(res);
      }
    });
    // 把結果寫回表格
    this.dataSource.data = tidyData;
  }

  // 補充練習 1：每次按鍵放開，就印出輸入值
  myTest(event: Event) {
    console.log((event.target as HTMLInputElement).value);
  }

  // 補充練習 3：清空搜尋框，並還原完整資料
  reset() {
    this.inputData = '';
    this.dataSource.data = ELEMENT_DATA;
  }
}
