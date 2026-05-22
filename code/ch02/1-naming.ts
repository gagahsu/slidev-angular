/*
  === 第02章：Coding 習慣 ① 命名方式 ===

  好的命名讓程式碼「自己會說話」，不需要解釋別人就看得懂。
  命名規則：camelCase（小駝峰）
    → 第一個字小寫，後面每個單字字首大寫
    → 例如：userName、calculateTotal、isLoggedIn
*/

// ❌ 不好的命名：縮寫太多，完全看不懂在幹嘛
let un = "Allen";
let pw = "123456";
let a = 100;
let b = 5;
function calc(a: number, b: number) {
  return a + b;
}

// ✅ 好的命名：清楚表達用途，一眼就懂
let userName = "Allen";           // 使用者名稱
let password = "123456";          // 密碼
let price = 100;                  // 商品價格
let taxRate = 5;                  // 稅率（%）

// 函式名稱用「動詞 + 名詞」的格式，表達「這個函式在做什麼」
function calculateTotal(price: number, tax: number): number {
  return price + tax;
}

// ============================================================
// 命名慣例整理
// ============================================================

// ① 變數、函式：camelCase（小駝峰）
let firstName = "Grace";
let isLoggedIn = true;          // 布林值建議用 is / has / can 開頭
function getUserList() { }

// ② 類別（Class）：PascalCase（大駝峰）
class UserService { }
class ProductCard { }

// ③ 常數（不會改變的值）：UPPER_SNAKE_CASE（全大寫加底線）
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = "https://api.example.com";

// ④ 私有屬性（慣例加底線前綴，告訴其他人「這是內部使用的」）
// 注意：這只是一種命名習慣，實際上要用 private 關鍵字來保護
class UserComponent {
  private _userId: number = 0;  // 私有變數
  userName: string = "";         // 公開變數
}
