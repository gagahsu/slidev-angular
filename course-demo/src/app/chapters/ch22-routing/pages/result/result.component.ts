import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
})
export class ResultComponent {
  keyword: string | null = '';

  private route = inject(ActivatedRoute);

  constructor() {
    // 取出網址 ?keyword= 後面的值
    this.keyword = this.route.snapshot.queryParamMap.get('keyword');
    console.log(this.keyword);  // Angular
  }
}
