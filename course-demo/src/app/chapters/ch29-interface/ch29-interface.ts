import { Component, OnInit } from '@angular/core';
import { User, Player, Props, Student } from './user.interface';

@Component({
  selector: 'app-ch29-interface',
  templateUrl: './ch29-interface.html',
  styleUrl: './ch29-interface.css',
  standalone: true,
  imports: []
})
export class Ch29Interface implements OnInit {

  currentUser: User = {
    id: 1,
    name: 'Allen',
    email: 'allen@example.com',
    age: 25
  };

  userList: User[] = [
    { id: 1, name: 'Allen',  email: 'allen@example.com',  age: 25 },
    { id: 2, name: 'Bob',    email: 'bob@example.com',    age: 30 },
    { id: 3, name: 'Carol',  email: 'carol@example.com',  age: 22 }
  ];

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

  students: Student[] = [
    new Student('小明', 3),
    new Student('小美', 2),
    new Student('小強', 1)
  ];

  greetResult: string = '';

  ngOnInit(): void {
    console.log('使用者：', this.currentUser.name);
  }

  greetStudent(student: Student): void {
    this.greetResult = student.greet();
  }
}
