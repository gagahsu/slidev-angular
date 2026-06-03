export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export interface Props {
  propsName: string;
  amount: number;
}

export interface Player {
  id: number;
  userName: string;
  level: number;
  props: Props[];
}

export interface Greetable {
  name: string;
  greet(): string;
}

export class Student implements Greetable {
  name: string;
  grade: number;

  constructor(name: string, grade: number) {
    this.name = name;
    this.grade = grade;
  }

  greet(): string {
    return `嗨！我是 ${this.name}，${this.grade} 年級。`;
  }
}
