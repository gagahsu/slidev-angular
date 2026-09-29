/*
  === 第20章：繫結（Data Binding）===

  Angular 有四種資料綁定方式，打通 TypeScript ↔ HTML 之間的橋樑：

  ① 插值（Interpolation）      {{ 變數 }}
     → 方向：TS → HTML（單向，顯示資料）

  ② 屬性綁定（Property Binding） [屬性]="變數"
     → 方向：TS → HTML（單向，設定 HTML 屬性）

  ③ 事件綁定（Event Binding）    (事件)="方法()"
     → 方向：HTML → TS（使用者動作觸發 TS 方法）

  ④ 雙向綁定（Two-way Binding）  [(ngModel)]="變數"
     → 方向：TS ↔ HTML（同步，輸入框常用）
*/

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // 使用 ngModel 必須引入

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,         // Angular 17+ 獨立元件
  imports: [FormsModule]    // [(ngModel)] 雙向綁定需要 FormsModule
})
export class AppComponent {

  // ① 插值 & ② 屬性綁定用的資料
  pageTitle: string = "Data Binding 示範";
  imageUrl: string = "https://angular.dev/assets/images/logos/angular/angular.svg";
  imageAlt: string = "Angular Logo";
  isButtonDisabled: boolean = false;
  buttonText: string = "點我！";
  cardClass: string = "card-primary";

  // ③ 事件綁定用的資料
  clickCount: number = 0;
  lastClickTime: string = "尚未點擊";
  mousePosition: string = "滑鼠位置：(0, 0)";

  // ④ 雙向綁定用的資料（ngModel）
  inputName: string = "";        // 姓名輸入框
  inputMessage: string = "";     // 留言輸入框
  fontSize: number = 16;         // 字體大小滑桿

  // ========================================
  // ③ 事件綁定方法
  // ========================================

  onButtonClick(): void {
    this.clickCount++;
    this.lastClickTime = new Date().toLocaleTimeString();
    this.buttonText = `已點擊 ${this.clickCount} 次`;
  }

  onMouseMove(event: MouseEvent): void {
    this.mousePosition = `滑鼠位置：(${event.clientX}, ${event.clientY})`;
  }

  toggleButton(): void {
    this.isButtonDisabled = !this.isButtonDisabled;
  }
}
