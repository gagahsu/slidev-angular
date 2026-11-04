import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
})
export class ResultComponent {
  keyword: string | null = '';

  constructor(private route: ActivatedRoute) {
    // 取出網址 ?keyword= 後面的值
    this.keyword = this.route.snapshot.queryParamMap.get('keyword');
    console.log(this.keyword);  // Angular
  }
}
