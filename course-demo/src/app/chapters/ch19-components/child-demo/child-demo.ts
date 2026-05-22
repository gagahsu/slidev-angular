import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-demo',
  imports: [],
  templateUrl: './child-demo.html',
  styleUrl: './child-demo.css',
})
export class ChildDemo {
  @Input() cardTitle: string = '';
  @Input() description: string = '';
  @Output() clicked = new EventEmitter<string>();

  onCardClick(): void {
    this.clicked.emit(this.cardTitle);
  }
}
