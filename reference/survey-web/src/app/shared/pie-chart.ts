import { Component, effect, ElementRef, input, OnDestroy, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';

/** 圓餅圖：labels / values 是 input signal，資料變了 effect 會重畫 */
@Component({
  selector: 'app-pie-chart',
  template: `<div style="max-width:320px"><canvas #canvas></canvas></div>`,
})
export class PieChart implements OnDestroy {
  labels = input.required<string[]>();
  values = input.required<number[]>();
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private chart?: Chart;

  constructor() {
    effect(() => {
      const labels = this.labels(), values = this.values();
      this.chart?.destroy();
      this.chart = new Chart(this.canvas().nativeElement, {
        type: 'pie',
        data: { labels, datasets: [{ data: values }] },
        options: { plugins: { legend: { position: 'bottom' } } },
      });
    });
  }

  ngOnDestroy() { this.chart?.destroy(); }
}
