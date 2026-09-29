/*
  === 第41章：圓餅圖（Chart.js）===

  Chart.js 是最流行的 JavaScript 圖表庫，
  整合進 Angular 只需要幾個步驟。

  安裝：
  npm install chart.js

  使用流程：
  ① HTML 準備一個 <canvas id="myChart">
  ② TypeScript import Chart from 'chart.js/auto'
  ③ 在 ngAfterViewInit 裡（等 DOM 渲染完後）建立圖表
  ④ 用 document.getElementById 取得 canvas 元素
  ⑤ new Chart(canvas, { type, data, options }) 建立圖表

  為什麼用 ngAfterViewInit？
  → DOM 要先渲染出來，才能用 document.getElementById 找到 <canvas>
  → ngOnInit 時 DOM 還沒準備好，要用 ngAfterViewInit

  type 可以是：
  'pie'       → 圓餅圖
  'doughnut'  → 甜甜圈圖
  'bar'       → 長條圖
  'line'      → 折線圖
*/

import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: []
})
export class AppComponent implements AfterViewInit {

  // 圖表實例（存起來方便之後更新）
  private pieChart: Chart | null = null;
  private barChart: Chart | null = null;

  ngAfterViewInit(): void {
    this.createPieChart();
    this.createBarChart();
  }

  // ==============================
  // 圓餅圖（月支出分配）
  // ==============================
  createPieChart(): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;

    const data = {
      labels: ['餐費', '交通費', '房租', '娛樂', '其他'],
      datasets: [
        {
          label: '月支出',
          data: [8000, 3000, 15000, 2000, 1500],
          backgroundColor: [
            'rgb(255, 99, 132)',    // 紅
            'rgb(54, 162, 235)',    // 藍
            'rgb(255, 205, 86)',    // 黃
            'rgb(75, 192, 192)',    // 綠
            'rgb(153, 102, 255)'   // 紫
          ],
          hoverOffset: 8   // 滑鼠懸停時的偏移距離
        }
      ]
    };

    this.pieChart = new Chart(canvas, {
      type: 'pie',
      data: data
    });
  }

  // ==============================
  // 長條圖（每月收入）
  // ==============================
  createBarChart(): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;

    const data = {
      labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
      datasets: [
        {
          label: '收入（元）',
          data: [45000, 48000, 42000, 50000, 55000, 52000],
          backgroundColor: 'rgba(94, 173, 160, 0.8)',
          borderColor: 'rgb(94, 173, 160)',
          borderWidth: 2
        }
      ]
    };

    this.barChart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
