/*
  === 第29章：Interface — 介面定義檔 ===

  Interface 是 TypeScript 的「資料形狀說明書」。
  告訴 TypeScript 這個物件應該有哪些欄位、是什麼型別。

  優點：
  ① 型別檢查：欄位拼錯、型別錯誤，TypeScript 立刻警告
  ② 自動補全：輸入物件屬性時，IDE 會自動提示有哪些欄位
  ③ 維護性：資料結構集中管理，改一個地方所有地方都更新

  檔案命名慣例：xxx.interface.ts（方便辨識）
*/

// ==============================
// 基本 Interface 語法
// ==============================

// 使用者介面（必填欄位）
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// 使用者介面（含選填欄位）
// age? 代表 age 可以不填，型別為 number | undefined
export interface UserOptional {
  id: number;
  name: string;
  email: string;
  age?: number;      // ? 代表選填
  phone?: string;   // 選填
}

// ==============================
// 巢狀 Interface（對應 API 的複雜結構）
// ==============================

// 道具介面
export interface Props {
  propsName: string;
  amount: number;
}

// 玩家介面（包含道具陣列）
export interface Player {
  id: number;
  userName: string;
  level: number;
  props: Props[];    // Props 陣列
}

// ==============================
// Class implements Interface
// ==============================

// 先定義介面，規範類別必須實作哪些屬性/方法
export interface Greetable {
  name: string;
  greet(): string;
}

// 類別用 implements 宣告要實作這個介面
// 若缺少 name 或 greet()，TypeScript 會報錯
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
