import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-ch41-chart',
  templateUrl: './ch41-chart.html',
  styleUrl: './ch41-chart.css',
  standalone: true,
  imports: []
})
export class Ch41Chart implements AfterViewInit {
  private pieChart: Chart | null = null;
  private barChart: Chart | null = null;

  ngAfterViewInit(): void {
    this.createPieChart();
    this.createBarChart();
  }

  createPieChart(): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    this.pieChart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['餐費', '交通費', '房租', '娛樂', '其他'],
        datasets: [{
          label: '月支出',
          data: [8000, 3000, 15000, 2000, 1500],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'
          ],
          hoverOffset: 8
        }]
      }
    });
  }

  createBarChart(): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    this.barChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
        datasets: [{
          label: '收入（元）',
          data: [45000, 48000, 42000, 50000, 55000, 52000],
          backgroundColor: 'rgba(94, 173, 160, 0.8)',
          borderColor: 'rgb(94, 173, 160)',
          borderWidth: 2
        }]
      },
      options: { scales: { y: { beginAtZero: true } } }
    });
  }
}
