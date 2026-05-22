import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  // 章節清單（新增章節只要在這裡加一筆即可）
  chapters = [
    { path: 'ch14', label: 'Ch14', title: '變數使用' },
    { path: 'ch15', label: 'Ch15', title: '方法' },
    { path: 'ch17', label: 'Ch17', title: '資料設計' },
    { path: 'ch18', label: 'Ch18', title: '生命週期' },
    { path: 'ch19', label: 'Ch19', title: '新增組件' },
    { path: 'ch20', label: 'Ch20', title: '繫結' },
    { path: 'ch21', label: 'Ch21', title: '路由示範' },
    { path: 'ch22', label: 'Ch22', title: '資料傳遞' },
  ];
}
