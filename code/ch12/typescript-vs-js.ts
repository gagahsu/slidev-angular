/*
  === 第12章：TypeScript vs JavaScript ===

  TypeScript 是 JavaScript 的「超集合（Superset）」：
  → 所有 JS 都是合法的 TS
  → TS 額外加上了「型別系統」

  最大的差別：TypeScript 需要指定每個變數的「型別」
  → 寫程式時就能發現錯誤，不用等到程式跑起來才踩雷！
*/

// ============================================================
// TypeScript 的型別系統示範
// ============================================================

// ① 宣告變數時指定型別（在冒號 : 後面寫型別名稱）
let userName: string = "Allen";    // 字串型別
let age: number = 25;              // 數字型別
let isStudent: boolean = true;     // 布林型別

// 如果型別錯了，TypeScript 編譯時就會報錯！
// let userName: string = 123;    // ❌ 錯誤：123 不是字串

// ② 函式也可以標示「參數型別」和「回傳值型別」
function sayHello(name: string): string {
  return "你好！" + name;
}

// 如果傳錯型別，直接報錯
// sayHello(123);   // ❌ 錯誤：123 不是 string

// ③ TypeScript 解決 JS 的型別陷阱
let numStr: string = "123";

// 下面這行 TypeScript 會報錯（字串不能直接做數學運算）
// let result = numStr + 1;  // ❌ 已知是字串，不會發生意外

// 正確做法：先轉型再計算
let result: number = Number(numStr) + 1;  // ✅ 124

// ④ 箭頭函式（TypeScript 版，加上型別）
const greet = (name: string): string => {
  return `哈囉，${name}！`;
};

// ⑤ 類別（Class）— TypeScript 支援物件導向寫法
class Person {
  name: string;      // 屬性
  age: number;

  // constructor 是「建構子」，new 物件時自動執行
  constructor(name: string, age: number) {
    this.name = name;  // this.xxx 代表「這個物件的 xxx 屬性」
    this.age = age;
  }

  introduce(): string {
    return `我叫 ${this.name}，今年 ${this.age} 歲。`;
  }
}

const allen = new Person("Allen", 25);
console.log(allen.introduce());  // 我叫 Allen，今年 25 歲。

// ============================================================
// JS vs TS 對比總結
// ============================================================
//
//  JavaScript                  TypeScript
//  ----------------------------+---------------------------
//  let a = "hello"             let a: string = "hello"
//  function f(x) { }           function f(x: number): void { }
//  不強制型別，彈性高           強制型別，安全性高
//  瀏覽器直接執行               需要「編譯」成 JS 才能執行
//  適合小型快速開發             適合大型、團隊開發
