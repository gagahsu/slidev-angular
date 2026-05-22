/*
  === 第02章：Coding 習慣 ④ 註解 ===

  註解的目的：說明「為什麼這樣寫」，而不是「這在做什麼」
  （程式碼本身應該要能說明它在做什麼，靠好的命名）

  TypeScript 的註解有兩種：
  //   → 單行註解
  /* */ /* → 多行註解
*/

// ============================================================
// ① 廢話型註解（❌ 不要這樣寫）
// ============================================================

let age = 18; // 宣告 age 變數等於 18  ← 這是廢話，程式碼本身就說明了

// ============================================================
// ② 有價值的註解（✅ 這樣寫才有意義）
// ============================================================

// ② - a. 說明「為什麼」要這樣寫
// 因為後端 API 回傳的時間戳記是「毫秒」，需要除以 1000 轉成「秒」
const timestampInSeconds = Date.now() / 1000;

// ② - b. 標記待辦事項（TODO）
//    VS Code 裡 TODO 會被標黃，很容易找到
// TODO: 待串接後端 API，目前先回傳假資料 (Allen, 2024-01-15)
function getUserList() {
  const mockUsers = [
    { id: 1, name: "小明" },
    { id: 2, name: "小華" }
  ];
  return mockUsers;
}

// ② - c. 記錄參考來源
// 參考：MDN Web Docs - Array.prototype.filter
// https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
function filterActiveUsers(users: Array<{ name: string; isActive: boolean }>) {
  return users.filter(user => user.isActive);
}

// ② - d. 解釋複雜的商業邏輯
// 折扣規則（來自產品需求文件 v2.3）：
//   - 消費滿 1000 → 打 9 折
//   - 消費滿 3000 → 打 8 折
//   - 消費滿 5000 → 打 7 折
function calculateDiscount(amount: number): number {
  if (amount >= 5000) return amount * 0.7;
  if (amount >= 3000) return amount * 0.8;
  if (amount >= 1000) return amount * 0.9;
  return amount;
}

// ============================================================
// ③ 多行註解（通常用來說明函式的用途）
// ============================================================

/**
 * 計算含稅的商品總價
 * @param price    商品原價（元）
 * @param taxRate  稅率（0.05 代表 5%）
 * @returns        含稅後的總價
 */
function calculateTotalWithTax(price: number, taxRate: number): number {
  return price * (1 + taxRate);
}
