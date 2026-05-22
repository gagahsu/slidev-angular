/*
  === 第21章：課程詳情頁元件（動態路由參數）===

  動態路由 /courses/:id 的「:id」部分，
  可以用 ActivatedRoute 服務來「讀取」。

  這讓同一個元件可以顯示不同的課程資料，
  只要 URL 的 id 不同就好！
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  standalone: true,
  imports: [RouterLink]  // 模板裡有 routerLink，需要 import
})
export class CourseDetailComponent implements OnInit {

  courseId: string = "";   // 從 URL 取得的 id
  courseData: any = null;  // 模擬的課程資料

  // 所有課程資料（實際專案從 API 取得）
  allCourses: any[] = [
    { id: 1, name: 'HTML 基礎', instructor: 'Allen', hours: 6 },
    { id: 2, name: 'CSS 進階', instructor: 'Allen', hours: 8 },
    { id: 3, name: 'Angular 入門', instructor: 'Allen', hours: 20 }
  ];

  // 注入 ActivatedRoute（用來讀取目前的路由資訊）
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 取得路由參數 :id 的值
    // snapshot.paramMap.get('id') 取得當前路由的 id 參數
    this.courseId = this.route.snapshot.paramMap.get('id') ?? '';

    // 用 id 找到對應的課程資料
    const id = Number(this.courseId);
    this.courseData = this.allCourses.find(c => c.id === id);
  }
}
