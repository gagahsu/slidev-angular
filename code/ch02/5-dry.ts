/*
  === 第02章：Coding 習慣 ⑤ 避免重複程式碼（DRY 原則）===

  DRY = Don't Repeat Yourself（不要重複你自己）

  核心概念：
  「如果同樣的邏輯出現超過兩次，就應該把它抽成一個共用函式」

  好處：之後只需要改一個地方，所有呼叫的地方都會自動更新！
*/

// ============================================================
// 情境：計算每樣商品的含稅價格
// ============================================================

// ❌ 錯誤做法：把同樣的計算邏輯複製了三遍
// 問題：萬一稅率從 5% 改成 8%，要改三個地方，很容易漏掉！

function badCalculatePriceA(price: number) {
  const tax = price * 0.05;  // 重複
  return price + tax;
}

function badCalculatePriceB(price: number) {
  const tax = price * 0.05;  // 重複
  return price + tax;
}

function badCalculatePriceC(price: number) {
  const tax = price * 0.05;  // 重複
  return price + tax;
}

// ✅ 正確做法：把計算稅金的邏輯「抽出來」變成一個共用函式
// 之後稅率改變，只需要改這一個地方！

function calculateTax(price: number): number {
  return price * 0.05;  // 改稅率只需要改這裡
}

// A、B、C 三個函式都「呼叫」共用的 calculateTax
function calculatePriceA(price: number): number {
  return price + calculateTax(price);
}

function calculatePriceB(price: number): number {
  return price + calculateTax(price);
}

function calculatePriceC(price: number): number {
  return price + calculateTax(price);
}

// ============================================================
// 更進階的例子：HTML 模板也會有 DRY 問題
// ============================================================
// 例如，你有三個頁面都需要顯示同樣的「導覽列」
// ❌ 在三個 HTML 檔案裡複製貼上同樣的 <nav> 程式碼
// ✅ 在 Angular 裡，把它做成一個 HeaderComponent 元件
//    → 在三個頁面都引入 <app-header></app-header>
//    → 修改外觀只要改一個元件檔案！

// ============================================================
// 測試看看
// ============================================================

const shirtPrice = 500;
const pantsPrice = 800;
const shoesPrice = 1200;

console.log("上衣含稅：", calculatePriceA(shirtPrice));   // 525
console.log("褲子含稅：", calculatePriceB(pantsPrice));   // 840
console.log("鞋子含稅：", calculatePriceC(shoesPrice));   // 1260
