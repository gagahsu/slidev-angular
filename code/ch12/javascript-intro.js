/*
  === 第12章：JavaScript 介紹 ===

  JavaScript（簡稱 JS）是讓網頁「活起來」的語言。
  TypeScript（簡稱 TS）是 JavaScript 的「超集合」，
  也就是「JS 的加強進化版」，加上了嚴格的型別系統。

  這個檔案用 JavaScript 示範基本語法，
  下一個檔案用 TypeScript 展示型別的力量。
*/

// ============================================================
// JavaScript 基本示範
// ============================================================

// ① 宣告變數（JS 裡不需要指定型別）
let userName = "Allen";
let age = 25;
let isStudent = true;

console.log(userName);   // Allen
console.log(age);        // 25
console.log(isStudent);  // true

// ② 函式（Function）
function sayHello(name) {
  return "你好！" + name;
}

console.log(sayHello("Allen"));  // 你好！Allen

// ③ JavaScript 的陷阱：型別不明確
// JS 不管型別，容易出現意外結果
let num = "123";        // 這是字串！
let result = num + 1;   // 結果是 "1231"，不是 124！
console.log(result);    // "1231" ← 字串拼接，不是數學加法

// ④ 箭頭函式（Arrow Function）— 更簡潔的函式寫法
const greet = (name) => {
  return `哈囉，${name}！`;
};
console.log(greet("Grace"));  // 哈囉，Grace！

// 超簡短的單行箭頭函式
const double = (n) => n * 2;
console.log(double(5));  // 10

// ⑤ DOM 操作（讓網頁互動）
// 在瀏覽器環境中才能用，Node.js 環境不支援
// document.getElementById("btn").addEventListener("click", () => {
//   alert("你點了按鈕！");
// });
