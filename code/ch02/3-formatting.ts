/*
  === 第02章：Coding 習慣 ③ 排版 ===

  好的排版讓程式碼「好讀、好改、好維護」。
  VS Code 可以安裝 Prettier 外掛，存檔時自動幫你排版！
*/

// ❌ 沒有排版：所有東西擠在一起，令人崩潰
function badFormat(a:number,b:number){const result=a+b;if(result>100){console.log('太大了');return result;}return result;}

// ✅ 良好排版：縮排清楚，邏輯一目了然
function goodFormat(a: number, b: number): number {
  // 先計算加總
  const result = a + b;

  // 判斷是否超過 100
  if (result > 100) {
    console.log('太大了');
    return result;
  }

  return result;
}

// ============================================================
// 排版的幾個基本規則
// ============================================================

// 規則①：縮排（程式碼層次）
//   → 每一層用「一個 Tab」或「兩個空格」來縮排
//   → VS Code 預設是兩個空格（也可以自己設定）

function calculatePrice() {
  const price = 100;          // 縮排一層

  if (price > 50) {
    console.log('高單價');    // 縮排兩層（因為在 if 裡面）
  }
}

// 規則②：空行（分段）
//   → 功能不同的程式碼之間，用空行隔開
//   → 就像文章要分段落，不要全部擠成一大塊

const user = "Allen";

const price = 200;

const taxRate = 0.05;

// 規則③：一行不要太長
//   → 建議每行不超過 80~100 個字元
//   → 太長的話要換行

// ❌ 太長了，要捲動才看得到
const message = "這是一段超級無敵長的訊息，它包含了非常多的資訊，長到你需要一直捲動才能看完它的完整內容";

// ✅ 適當換行（字串連接）
const betterMessage = "這是一段訊息，" +
  "它被分成兩行，" +
  "更容易閱讀。";
