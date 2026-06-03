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
  selector: 'app-ch30-sorting',
  templateUrl: './ch30-sorting.html',
  styleUrl: './ch30-sorting.css',
  standalone: true,
  imports: []
})
export class Ch30Sorting {

  tableData: PeriodicElement[] = [...SOURCE_DATA];
  currentSort: string = '（尚未排序）';

  sortByPosition(): void {
    this.tableData.sort((a, b) => a.position < b.position ? -1 : a.position > b.position ? 1 : 0);
    this.currentSort = 'position（升冪）';
  }

  sortByName(): void {
    this.tableData.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    this.currentSort = 'name（A → Z）';
  }

  sortByWeight(): void {
    this.tableData.sort((a, b) => a.weight < b.weight ? -1 : a.weight > b.weight ? 1 : 0);
    this.currentSort = 'weight（升冪）';
  }

  sortByWeightDesc(): void {
    this.tableData.sort((a, b) => a.weight > b.weight ? -1 : a.weight < b.weight ? 1 : 0);
    this.currentSort = 'weight（降冪）';
  }

  resetSort(): void {
    this.tableData = [...SOURCE_DATA];
    this.currentSort = '（原始順序）';
  }
}
