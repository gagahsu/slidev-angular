import { Component } from '@angular/core';
import { ChildDemo } from './child-demo/child-demo';

@Component({
  selector: 'app-ch19-components',
  imports: [ChildDemo],
  templateUrl: './ch19-components.html',
  styleUrl: './ch19-components.css',
})
export class Ch19Components {
  title = '第19章 - 新增組件';
  lastClicked = '';

  cards = [
    { title: '元件A', description: '我是獨立的 ChildDemo 元件，可以重複使用！' },
    { title: '元件B', description: '每個元件有自己的 HTML、CSS、TypeScript。' },
    { title: '元件C', description: '點我看 @Output 事件如何把資料傳給父元件。' },
  ];

  onCardClicked(title: string): void {
    this.lastClicked = title;
  }
}
