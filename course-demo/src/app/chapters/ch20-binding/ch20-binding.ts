import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ch20-binding',
  imports: [FormsModule],
  templateUrl: './ch20-binding.html',
  styleUrl: './ch20-binding.css',
})
export class Ch20Binding {
  title = '第20章 - 繫結';
  pageTitle = 'Angular 課程示範';
  isDisabled = false;
  clickCount = 0;
  inputName = '';
  fontSize = 16;
  logoUrl = 'https://angular.dev/assets/images/logos/angular/angular.svg';

  onButtonClick(): void { this.clickCount++; }
  toggleDisabled(): void { this.isDisabled = !this.isDisabled; }
}
