/*
  === 第16章：TypeScript 練習（一）===

  本章重點：
  ① if 判斷式
  ② 型別轉換（Number / String）
  ③ JSON（前後端資料格式）
  ④ 運算符（算術 / 比較 / 邏輯）
  ⑤ 字串常用函數
  ⑥ 陣列常用函數
  ⑦ for 迴圈
*/

// ============================================================
// ① if 判斷式
// ============================================================

let score: number = 75;

// 基本 if / else if / else
if (score >= 90) {
  console.log("優等 A");
} else if (score >= 80) {
  console.log("甲等 B");
} else if (score >= 70) {
  console.log("乙等 C");
} else if (score >= 60) {
  console.log("丙等 D");
} else {
  console.log("不及格 F");
}
// 輸出：乙等 C

// 多重條件：&& (而且)、|| (或者)
let age: number = 20;
let hasID: boolean = true;

if (age >= 18 && hasID) {
  console.log("可以入場");   // 年齡 >= 18 而且 有身分證，才能入場
}

let isVIP: boolean = false;
let isMember: boolean = true;

if (isVIP || isMember) {
  console.log("享有折扣");  // 是 VIP 或者 是會員，任一成立即可
}

// ============================================================
// ② 型別轉換
// ============================================================

// 字串 → 數字
let strNum: string = "123";
let realNum: number = Number(strNum);  // Number() 轉換
console.log(realNum + 1);   // 124（數學加法）
console.log(strNum + 1);    // "1231"（字串拼接，危險！）

// parseInt：轉成「整數」
let floatStr: string = "3.14";
console.log(parseInt(floatStr));    // 3（去掉小數點）
console.log(parseFloat(floatStr));  // 3.14（保留小數點）

// 數字 → 字串
let num: number = 456;
let str1: string = String(num);    // 方法一
let str2: string = `${num}`;       // 方法二（樣板字面量）
let str3: string = num + "";       // 方法三（拼接空字串）
console.log(typeof str1);  // string

// ============================================================
// ③ JSON（JavaScript Object Notation）
// ============================================================
// JSON 是一種「資料交換格式」，前後端溝通用的通用語言
// 長得很像 JS 物件，但所有 key 必須用雙引號包起來

// 物件 → JSON 字串（物件轉成可以傳送的文字格式）
const user = { name: "Allen", age: 25 };
const jsonString: string = JSON.stringify(user);
console.log(jsonString);         // {"name":"Allen","age":25}
console.log(typeof jsonString);  // string（現在是純文字）

// JSON 字串 → 物件（收到後端資料後，轉回可以操作的物件）
const jsonData: string = '{"name":"Grace","age":22}';
const parsedUser = JSON.parse(jsonData);
console.log(parsedUser.name);  // Grace
console.log(parsedUser.age);   // 22

// ============================================================
// ④ 運算符
// ============================================================

// 算術運算符
console.log(10 + 3);  // 13（加）
console.log(10 - 3);  // 7（減）
console.log(10 * 3);  // 30（乘）
console.log(10 / 3);  // 3.333...（除）
console.log(10 % 3);  // 1（取餘數 / 模除）← 判斷奇偶數很常用
console.log(2 ** 3);  // 8（次方，2的3次方）

// 比較運算符（回傳 true 或 false）
console.log(5 > 3);    // true
console.log(5 < 3);    // false
console.log(5 >= 5);   // true
console.log(5 <= 4);   // false
console.log(5 === 5);  // true（嚴格相等，同時比較值和型別）
console.log(5 !== 3);  // true（不相等）

// ⚠️ 注意：用 === 不用 ==
// == 會自動轉型，容易出錯
// === 同時比較「值」和「型別」，更安全
console.log("5" == 5);   // true（危險！JS 自動轉型）
console.log("5" === 5);  // false（字串 != 數字，正確！）

// ============================================================
// ⑤ 字串常用函數
// ============================================================

let text: string = "Hello Angular World";

// 取得長度
console.log(text.length);  // 19

// 找字串（indexOf 找到回傳索引，找不到回傳 -1）
console.log(text.indexOf("Angular"));  // 6

// 擷取子字串
console.log(text.slice(6, 13));  // Angular（第6到12個字元）

// 轉大小寫
console.log(text.toUpperCase());  // HELLO ANGULAR WORLD
console.log(text.toLowerCase());  // hello angular world

// 取代
console.log(text.replace("Angular", "React"));  // Hello React World

// 分割（回傳陣列）
let csvData: string = "蘋果,香蕉,橘子";
let fruits: string[] = csvData.split(",");
console.log(fruits);  // ["蘋果", "香蕉", "橘子"]

// 去除前後空白
let messyStr: string = "  有空格  ";
console.log(messyStr.trim());  // "有空格"（去掉兩側空白）

// 包含判斷（回傳 boolean）
console.log(text.includes("Angular"));  // true

// ============================================================
// ⑥ 陣列常用函數
// ============================================================

let numbers: number[] = [3, 1, 4, 1, 5, 9, 2, 6];

// 排序（sort 預設是字典排序，數字需要傳比較函式）
let sorted = [...numbers].sort((a, b) => a - b);  // 由小到大
console.log(sorted);  // [1, 1, 2, 3, 4, 5, 6, 9]

// 過濾（filter）：留下符合條件的元素
let bigNumbers = numbers.filter(n => n > 4);
console.log(bigNumbers);  // [5, 9, 6]

// 轉換（map）：對每個元素做操作，回傳新陣列
let doubled = numbers.map(n => n * 2);
console.log(doubled);  // [6, 2, 8, 2, 10, 18, 4, 12]

// 加入元素
numbers.push(100);    // 加到最後
numbers.unshift(0);   // 加到最前面

// 移除元素
numbers.pop();        // 移除最後一個
numbers.shift();      // 移除第一個

// 找元素（find）：回傳第一個符合條件的元素
let found = numbers.find(n => n > 5);
console.log(found);  // 9

// 判斷是否包含（includes）
console.log(numbers.includes(5));  // true

// 合併兩個陣列
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let merged = [...arr1, ...arr2];  // 展開運算子（Spread Operator）
console.log(merged);  // [1, 2, 3, 4, 5, 6]

// ============================================================
// ⑦ for 迴圈
// ============================================================

let students: string[] = ["小明", "小華", "小美", "大雄"];

// 方法一：傳統 for 迴圈（用索引）
for (let i = 0; i < students.length; i++) {
  console.log(`第 ${i + 1} 位：${students[i]}`);
}

// 方法二：for...of（直接取每個元素，更簡潔）
for (let student of students) {
  console.log(`學生：${student}`);
}

// 方法三：forEach（陣列方法，帶箭頭函式）
students.forEach((student, index) => {
  console.log(`${index + 1}. ${student}`);
});

// 實用範例：計算陣列總和
let prices: number[] = [100, 200, 150, 300];
let total: number = 0;

for (let price of prices) {
  total += price;  // total = total + price
}
console.log("總計：", total);  // 750
