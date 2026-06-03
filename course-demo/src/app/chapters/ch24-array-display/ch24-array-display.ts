import { Component } from '@angular/core';

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
  selector: 'app-ch24-array-display',
  templateUrl: './ch24-array-display.html',
  styleUrl: './ch24-array-display.css',
  standalone: true,
  imports: []
})
export class Ch24ArrayDisplay {

  scores: number[] = [88, 92, 75, 63, 100];
  fruits: string[] = ['蘋果', '香蕉', '芒果', '草莓'];

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
}
