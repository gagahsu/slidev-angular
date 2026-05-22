/*
  === 第15章：方法（Methods / Functions）===

  方法就像「SOP 工作手冊」：
  → 把一段需要重複執行的程式碼「包起來」
  → 需要的時候「呼叫（call）」它，它就去執行

  TypeScript 函式的完整格式：
  function 函式名稱(參數名稱: 型別): 回傳型別 {
    // 要執行的程式碼
    return 回傳值;
  }
*/

// ============================================================
// ① 基本函式（Function）
// ============================================================

// 沒有參數、沒有回傳值的函式
function sayHello(): void {
  // void 表示「沒有回傳值」
  console.log("你好！");
}

sayHello();  // 呼叫函式 → 輸出：你好！

// ============================================================
// ② 有參數的函式
// ============================================================

// 參數格式：(參數名稱: 型別)
function greet(name: string): void {
  console.log(`你好，${name}！`);
}

greet("Allen");  // 你好，Allen！
greet("Grace");  // 你好，Grace！

// ============================================================
// ③ 有回傳值的函式
// ============================================================

// 回傳型別寫在括號後面的冒號後面
function add(a: number, b: number): number {
  return a + b;  // 把結果「回傳」給呼叫者
}

let sum: number = add(3, 5);  // 接收回傳值
console.log(sum);  // 8

// ============================================================
// ④ 可選參數（Optional Parameter）
// ============================================================
// 在參數名稱後面加 ? 表示「這個參數可以不傳」

function buildGreeting(name: string, title?: string): string {
  if (title) {
    return `你好，${title} ${name}！`;
  }
  return `你好，${name}！`;
}

console.log(buildGreeting("Allen"));          // 你好，Allen！
console.log(buildGreeting("Allen", "工程師")); // 你好，工程師 Allen！

// ============================================================
// ⑤ 預設參數（Default Parameter）
// ============================================================
// 給參數一個預設值，呼叫時不傳就用預設值

function calculateTax(price: number, taxRate: number = 0.05): number {
  return price * (1 + taxRate);
}

console.log(calculateTax(100));        // 105（用預設稅率 5%）
console.log(calculateTax(100, 0.1));   // 110（自訂稅率 10%）

// ============================================================
// ⑥ 箭頭函式（Arrow Function）— 更簡潔的寫法
// ============================================================

// 傳統寫法
function multiply(a: number, b: number): number {
  return a * b;
}

// 箭頭函式寫法（效果完全一樣）
const multiplyArrow = (a: number, b: number): number => {
  return a * b;
};

// 超簡短：只有一行 return 時可以省略 {} 和 return
const multiplyShort = (a: number, b: number): number => a * b;

console.log(multiply(3, 4));       // 12
console.log(multiplyArrow(3, 4));  // 12
console.log(multiplyShort(3, 4));  // 12

// ============================================================
// ⑦ 在 Angular Class 中的方法（Angular 實際用法）
// ============================================================

class ProductComponent {
  // 屬性（全域變數）
  productName: string = "Angular 課程";
  price: number = 999;
  quantity: number = 1;

  // 方法（處理點擊、計算等邏輯）
  addToCart(): void {
    this.quantity++;
    console.log(`加入購物車！目前數量：${this.quantity}`);
  }

  removeFromCart(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  calculateTotal(): number {
    return this.price * this.quantity;  // 使用 this. 存取全域屬性
  }

  // 帶參數的方法
  applyDiscount(discountRate: number): number {
    return this.price * (1 - discountRate);
  }
}

// 建立物件並測試
const product = new ProductComponent();
product.addToCart();            // 加入購物車！目前數量：2
product.addToCart();            // 加入購物車！目前數量：3
console.log(product.calculateTotal());  // 2997
console.log(product.applyDiscount(0.1));  // 899.1（9折）
