/*
  === 第29章：Interface — 元件使用示範 ===

  實際在元件中使用 interface 為資料加上型別，
  搭配 API 回傳結果讓 TypeScript 知道物件的結構。
*/

import { Component, OnInit } from '@angular/core';
import { User, Player, Props, Student } from './user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: []
})
export class AppComponent implements OnInit {

  // ==============================
  // 基本 Interface 使用
  // ==============================

  // 宣告變數時指定型別為 User
  // → TypeScript 會檢查物件是否符合 User 介面
  currentUser: User = {
    id: 1,
    name: 'Allen',
    email: 'allen@example.com',
    age: 25
  };

  // 使用者清單（User 陣列）
  userList: User[] = [
    { id: 1, name: 'Allen',  email: 'allen@example.com',  age: 25 },
    { id: 2, name: 'Bob',    email: 'bob@example.com',    age: 30 },
    { id: 3, name: 'Carol',  email: 'carol@example.com',  age: 22 }
  ];

  // ==============================
  // 巢狀 Interface 示範
  // ==============================

  players: Player[] = [
    {
      id: 1,
      userName: '勇者',
      level: 50,
      props: [
        { propsName: '聖劍', amount: 1 },
        { propsName: '回復藥水', amount: 10 }
      ]
    },
    {
      id: 2,
      userName: '法師',
      level: 48,
      props: [
        { propsName: '魔法書', amount: 3 },
        { propsName: '魔力藥水', amount: 5 }
      ]
    }
  ];

  // ==============================
  // Class implements Interface
  // ==============================

  students: Student[] = [
    new Student('小明', 3),
    new Student('小美', 2),
    new Student('小強', 1)
  ];

  greetResult: string = '';

  ngOnInit(): void {
    // Interface 讓 TypeScript 知道 currentUser 的結構
    console.log('使用者：', this.currentUser.name);
    console.log('信箱：', this.currentUser.email);
  }

  greetStudent(student: Student): void {
    // student.greet() 有型別保證，不會拼錯
    this.greetResult = student.greet();
  }
}
