import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-child',
  templateUrl: './input-child.component.html',
})
export class InputChildComponent {
  // @Input：接收父元件傳進來的值，父元件更新時這裡會同步更新
  @Input() userName: string = '';
  @Input() userEmail: string = '';
  @Input() userAddress: string = '';
}
