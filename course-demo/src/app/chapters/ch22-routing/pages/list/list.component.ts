import { Component } from '@angular/core';
// ActivatedRoute 用來讀取目前網址上的值
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  // 網址可能沒有這個值，所以型別包含 null
  name: string | null = '';

  constructor(private route: ActivatedRoute) {
    // 取出路由設定中 /:name 的值
    this.name = this.route.snapshot.paramMap.get('name');
  }
}
