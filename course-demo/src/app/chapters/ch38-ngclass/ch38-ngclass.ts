import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ch38-ngclass',
  templateUrl: './ch38-ngclass.html',
  styleUrl: './ch38-ngclass.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Ch38Ngclass {
  isActive: boolean = false;
  isHighlighted: boolean = false;
  isDanger: boolean = false;

  activeTab: string = 'home';

  items = [
    { name: '商品 A', stock: 15, selected: false },
    { name: '商品 B', stock: 0,  selected: false },
    { name: '商品 C', stock: 3,  selected: false },
    { name: '商品 D', stock: 0,  selected: false },
    { name: '商品 E', stock: 8,  selected: false }
  ];

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleSelect(item: { selected: boolean }): void {
    item.selected = !item.selected;
  }

  getStatusClass(stock: number): string {
    if (stock === 0) return 'out-of-stock';
    if (stock < 5)  return 'low-stock';
    return 'in-stock';
  }
}
