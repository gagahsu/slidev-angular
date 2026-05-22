/*
  === 第13章：TypeScript 數據類型 ===

  TypeScript 的變數都必須有「型別」，就像每個盒子都要貼標籤。
  這樣你放東西進去時，放錯了系統馬上提醒你。

  主要型別：
  boolean, number, string, array, tuple, enum, any, null, undefined, object
*/

// ============================================================
// ① boolean（布林）— 只有 true 或 false 兩個值
// ============================================================
// 用來表示「是/否」、「開/關」、「對/錯」

let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

console.log("是否登入：", isLoggedIn);     // true
console.log("是否有權限：", hasPermission); // false

// ============================================================
// ② number（數字）— 整數和小數都是 number
// ============================================================

let age: number = 25;          // 整數
let price: number = 199.99;    // 小數
let temperature: number = -5;  // 負數

// 數字可以直接做數學運算
let total: number = price * 2;
console.log("總價：", total);  // 399.98

// ============================================================
// ③ string（字串）— 文字資料，用單引號或雙引號包起來
// ============================================================

let firstName: string = "Allen";
let greeting: string = '你好！';

// 樣板字面量（Template Literal）：用反引號 `` 包起來，
// 裡面用 ${} 嵌入變數，就不需要用 + 拼接字串了
let message: string = `我叫 ${firstName}，${greeting}`;
console.log(message);  // 我叫 Allen，你好！

// ============================================================
// ④ array（陣列）— 存放「一群同類型資料」的容器
// ============================================================

// 宣告方式一：型別加中括號 []
let fruits: string[] = ["蘋果", "香蕉", "橘子"];

// 宣告方式二：使用 Array<型別>（兩種寫法效果一樣）
let scores: Array<number> = [85, 90, 78, 92];

console.log(fruits[0]);      // 蘋果（索引從 0 開始）
console.log(fruits.length);  // 3（陣列長度）
console.log(scores);         // [85, 90, 78, 92]

// ============================================================
// ⑤ tuple（元組）— 固定長度、可以放「不同型別」的陣列
// ============================================================
// 和 array 的差別：tuple 的每個位置的型別是固定的

// 格式：[型別1, 型別2, ...]
let userInfo: [string, number, boolean] = ["Allen", 25, true];
//                 姓名     年齡    是否啟用

console.log(userInfo[0]);  // Allen（第0個是 string）
console.log(userInfo[1]);  // 25（第1個是 number）

// ============================================================
// ⑥ enum（枚舉）— 給一組相關的常數取有意義的名字
// ============================================================
// 好處：不用記數字 0、1、2...，直接用有意義的名稱

enum Direction {
  Up,     // 自動對應 0
  Down,   // 自動對應 1
  Left,   // 自動對應 2
  Right   // 自動對應 3
}

let move: Direction = Direction.Up;
console.log(move);            // 0（實際存的是數字）
console.log(Direction.Left);  // 2

// 也可以自訂對應的值
enum Status {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending"
}

let userStatus: Status = Status.Active;
console.log(userStatus);  // "active"

// ============================================================
// ⑦ any（任意型別）— 可以接受任何型別的值
// ============================================================
// ⚠️ 謹慎使用！用了 any 就失去 TypeScript 的型別保護

let data: any = "一開始是字串";
data = 123;        // 改成數字 → 不會報錯
data = true;       // 改成布林 → 不會報錯
data = [1, 2, 3];  // 改成陣列 → 不會報錯

// any 的正當使用時機：
// - 接收來自後端 API 的不確定格式資料（之後再轉型）
// - 舊版 JS 程式碼還沒加型別時的過渡期

// ============================================================
// ⑧ null 和 undefined
// ============================================================
// null      → 明確設定為「空值」（人為設定的沒有值）
// undefined → 變數已宣告但還沒有被賦予值

let emptyValue: null = null;
let notYetSet: undefined = undefined;

// 實際應用：函式找不到資料時回傳 null
function findUser(id: number): string | null {
  if (id === 1) return "Allen";
  return null;  // 找不到就回傳 null
}

// ============================================================
// ⑨ Object（物件）— 封裝多個相關屬性的資料結構
// ============================================================
// 物件就像是「一份資料表格」，每欄有名稱和對應的值

let person: {
  name: string;
  age: number;
  isActive: boolean;
} = {
  name: "Allen",
  age: 25,
  isActive: true
};

console.log(person.name);      // Allen（用點 . 取值）
console.log(person.age);       // 25
console.log(person.isActive);  // true

// 更常見的寫法：用 interface 定義物件的「型別模板」（ch29 會詳細介紹）
// interface User {
//   name: string;
//   age: number;
// }

// ============================================================
// 型別總覽表
// ============================================================
// boolean  → true / false
// number   → 123, 3.14, -5
// string   → "hello", '世界', `模板${變數}`
// string[] → ["A", "B", "C"]（字串陣列）
// [string, number] → ["Allen", 25]（元組）
// enum     → 給常數命名
// any      → 任意型別（謹慎使用）
// null     → 明確的空值
// undefined → 未賦值
// object   → { key: value }
