/*
  === 第14章：變數使用 ===

  本章重點：
  ① 全域變數 vs 區域變數（作用域）
  ② let / const / var 的差別
  ③ Angular 元件中宣告變數的方式
*/

// ============================================================
// ① 全域變數（Global Variable）
// ============================================================
// 宣告在 class 最上層，整個 class 都可以存取
// 在 method 內要用 this. 來呼叫

// 以下用「模擬 Angular 元件」的方式示範

class AppComponent {
  // === 全域變數（宣告在 class 最上層）===

  // 基本型別
  title: string = "我的 Angular 應用";
  count: number = 0;
  isVisible: boolean = true;

  // 有初始值（推薦做法）
  userName: string = "Allen";

  // 沒有初始值時，需要加「!」告訴 TypeScript 你保證之後會賦值
  // （非空斷言運算子，Non-null Assertion Operator）
  userEmail!: string;

  // 或者用 | undefined 讓它可以是 undefined
  userPhone: string | undefined;

  // ============================================================
  // ② 區域變數（Local Variable）
  // ============================================================
  // 宣告在 method 內部，只在這個 method 執行期間存在

  showTitle(): void {
    // 區域變數：出了這個函式就消失
    let localMessage: string = "這是區域變數，只能在這裡用";
    const fixedValue: number = 3.14;  // const：不能再被修改

    // 存取「全域變數」需要用 this.
    console.log(this.title);    // ✅ 正確：用 this. 存取全域變數
    console.log(localMessage);  // ✅ 正確：區域變數不需要 this
  }

  // showTitle 執行完後，localMessage 就被回收了
  // 其他 method 無法存取它

  increment(): void {
    // this.count 存取全域變數 count，每次呼叫就 +1
    this.count = this.count + 1;
    // 更簡潔的寫法
    // this.count++;
  }

  // ============================================================
  // ③ let / const / var 的差別
  // ============================================================

  demonstrateVariables(): void {
    // const：宣告後不能被重新賦值（常數）
    const PI: number = 3.14159;
    // PI = 3;  // ❌ 錯誤！const 不能重新賦值

    // let：可以被重新賦值（最常用的變數宣告方式）
    let score: number = 90;
    score = 95;  // ✅ 可以修改

    // var：舊式寫法，有 Hoisting（提升）問題，不建議使用
    // ❌ 以下 var 的奇怪行為（新手避開就好）：
    // console.log(myVar);  // undefined（先用再宣告居然不報錯！）
    // var myVar = "危險！";

    console.log(PI, score);
  }
}

// ============================================================
// let vs var 的 Hoisting（提升）問題說明
// ============================================================

// ❌ var 的危險（先使用再宣告，居然不報錯）
function varExample() {
  console.log(name);  // undefined（不報錯但值是 undefined）
  var name = "Allen";
  console.log(name);  // Allen
}

// ✅ let 的正確行為（先使用會報錯）
function letExample() {
  // console.log(name);  // ❌ 報錯：Cannot access 'name' before initialization
  let name = "Allen";
  console.log(name);  // Allen
}
