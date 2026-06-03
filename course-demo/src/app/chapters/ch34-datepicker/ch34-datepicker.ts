import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-ch34-datepicker',
  templateUrl: './ch34-datepicker.html',
  styleUrl: './ch34-datepicker.css',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule]
})
export class Ch34Datepicker {
  nativeDate: string = '2024-11-05';
  minNative: string = '2024-01-01';
  maxNative: string = '2025-12-31';

  selectedDate: Date = new Date('2024/11/08');
  minDate: Date = new Date('2024/11/01');
  maxDate: Date = new Date('2024/12/31');

  get formattedDate(): string {
    if (!this.selectedDate) return '（尚未選擇）';
    const y = this.selectedDate.getFullYear();
    const m = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
    const d = String(this.selectedDate.getDate()).padStart(2, '0');
    return `${y}/${m}/${d}`;
  }
}
