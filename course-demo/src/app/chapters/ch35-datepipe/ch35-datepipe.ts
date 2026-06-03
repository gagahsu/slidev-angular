import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ch35-datepipe',
  templateUrl: './ch35-datepipe.html',
  styleUrl: './ch35-datepipe.css',
  standalone: true,
  imports: [CommonModule]
})
export class Ch35Datepipe {
  today: Date = new Date();
  sampleDate: Date = new Date('2024/11/08');

  tidyDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const mm = month < 10 ? '0' + month : String(month);
    const dd = day < 10 ? '0' + day : String(day);
    return `${year}/${mm}/${dd}`;
  }

  tidyDateTime(date: Date): string {
    const base = this.tidyDate(date);
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${base} ${hh}:${min}:${ss}`;
  }
}
