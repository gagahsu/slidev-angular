import { AfterViewInit, Component } from '@angular/core';
// chart.js/auto 會自動載入所有圖表模組
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-ch41-chart',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch41-chart.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch41-chart.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                   // 獨立元件
  imports: []                         // 這一章不需要額外的模組
})
export class Ch41Chart implements AfterViewInit {

  // 補充練習 2：三個月份的支出
  chartList = [
    { title: '一月', data: [2000, 3000, 9000] },
    { title: '二月', data: [2500, 2800, 9000] },
    { title: '三月', data: [1800, 3200, 9000] },
  ];

  // canvas 要等畫面產生後才抓得到，所以要寫在 ngAfterViewInit
  ngAfterViewInit() {
    // 練習：取得 HTML 裡 id 是 chart 的 canvas
    const ctx = document.getElementById('chart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie',   // 圓餅圖
      data: {
        // 各區塊的名稱
        labels: ['餐費', '交通費', '租金'],
        datasets: [
          {
            label: '月支出',
            // 各標籤對應的數值，Chart.js 會自動換算比例
            data: [2000, 3000, 9000],
            // 各區塊的顏色，順序對應 labels
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            // 滑鼠移上去時，區塊往外偏移的距離
            hoverOffset: 4,
          },
        ],
      },
    });

    // 補充練習 1：把 type 改成 doughnut 就是環狀圖
    const doughnutCtx = document.getElementById('chart-doughnut') as HTMLCanvasElement;

    new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: ['餐費', '交通費', '租金'],
        datasets: [{ label: '月支出', data: [2000, 3000, 9000] }],
      },
    });

    // 補充練習 2：依序取得每個 canvas，並建立圖表
    this.chartList.forEach((item, index) => {
      const listCtx = document.getElementById('chart-' + index) as HTMLCanvasElement;
      new Chart(listCtx, {
        type: 'pie',
        data: { labels: ['餐費', '交通費', '租金'], datasets: [{ data: item.data }] },
      });
    });
  }
}
