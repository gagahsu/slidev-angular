import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

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
  selector: 'app-ch37-live-search',
  templateUrl: './ch37-live-search.html',
  styleUrl: './ch37-live-search.css',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule]
})
export class Ch37LiveSearch implements AfterViewInit {
  inputData: string = '';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  changeData(event: Event): void {
    const keyword = (event.target as HTMLInputElement).value;
    const filtered: PeriodicElement[] = [];
    ELEMENT_DATA.forEach((element) => {
      if (element.name.indexOf(keyword) !== -1) {
        filtered.push(element);
      }
    });
    this.dataSource.data = filtered;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  clearSearch(): void {
    this.inputData = '';
    this.dataSource.data = ELEMENT_DATA;
  }
}
