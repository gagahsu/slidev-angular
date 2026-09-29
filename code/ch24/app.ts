/*
  === 第24章：陣列顯示（Array Display）===

  陣列（Array）是一組有順序的資料集合，用 [] 包起來。
  Angular 的 @for 指令讓你把陣列的每一筆資料「渲染」成 HTML 元素。

  關鍵語法：
  @for (變數 of 陣列; track 唯一識別) {
    <p>{{ 變數 }}</p>
  }

  track 的用途：
  告訴 Angular 用哪個欄位辨識每筆資料，避免重複重繪。
  → 有 id 用 track data.id
  → 沒有 id 用 track data（整筆資料當 key）
*/

import { Component } from '@angular/core';

// 介面定義資料結構
interface Props {
  propsName: string;
  amount: number;
}

interface Player {
  userName: string;
  lev: number;
  props: Props[];
}

interface Department {
  deptName: string;
  members: { userId: number; name: string }[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: []
})
export class AppComponent {

  // ==============================
  // 基本陣列示範
  // ==============================

  // 數字陣列
  scores: number[] = [88, 92, 75, 63, 100];

  // 字串陣列
  fruits: string[] = ['蘋果', '香蕉', '芒果', '草莓'];

  // ==============================
  // 物件陣列示範
  // ==============================

  players: Player[] = [
    {
      userName: '玩家A',
      lev: 10,
      props: [
        { propsName: '蘑菇', amount: 5 },
        { propsName: '金幣', amount: 15 }
      ]
    },
    {
      userName: '玩家B',
      lev: 15,
      props: [
        { propsName: '龜殼', amount: 1 },
        { propsName: '砲彈', amount: 15 }
      ]
    },
    {
      userName: '玩家C',
      lev: 8,
      props: [
        { propsName: '星星', amount: 3 }
      ]
    }
  ];

  // ==============================
  // 巢狀陣列示範（部門 → 成員）
  // ==============================

  departments: Department[] = [
    {
      deptName: '工程部',
      members: [
        { userId: 1, name: 'Allen' },
        { userId: 2, name: 'Bob' }
      ]
    },
    {
      deptName: '設計部',
      members: [
        { userId: 3, name: 'Carol' },
        { userId: 4, name: 'Diana' },
        { userId: 5, name: 'Eve' }
      ]
    }
  ];

  // ==============================
  // 常用陣列操作（TypeScript）
  // ==============================

  demoArrayMethods(): void {
    const arr = [10, 20, 30, 40, 50];

    // 讀取特定索引
    console.log('索引 1 的值：', arr[1]);           // 20

    // length — 取得長度
    console.log('長度：', arr.length);               // 5

    // push — 在最後新增
    arr.push(60);
    console.log('push 後：', arr);                   // [..., 60]

    // pop — 移除最後一個
    arr.pop();
    console.log('pop 後：', arr);                    // 回到原本

    // for 迴圈遍歷
    for (let i = 0; i < arr.length; i++) {
      console.log(`arr[${i}] =`, arr[i]);
    }

    // for...of 迴圈（更簡潔）
    for (let num of arr) {
      console.log('數字：', num);
    }
  }
}
