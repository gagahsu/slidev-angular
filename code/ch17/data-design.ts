/*
  === 第17章：資料轉換與呈現 ===

  核心思維：
  「從畫面設計反推資料結構」

  新手寫法：直接在 HTML 寫死文字
  → 畫面增加一筆資料，就要手動加一行 HTML，超麻煩！

  專業做法：
  ① 先設計「資料結構」（interface / array）
  ② 再用 Angular 的 @for 指令，讓資料「自動長出畫面」
  ③ 增減資料只要改 TypeScript，HTML 自動跟著變
*/

// ============================================================
// 情境：設計一個「課程清單」頁面
// ============================================================

// ① 先觀察畫面，每張卡片需要什麼資料？
// → 課程名稱、講師、時數、類別、是否完成

// ② 設計資料結構（Interface 定義欄位，ch29 會詳細介紹）
interface Course {
  id: number;
  name: string;      // 課程名稱
  instructor: string; // 講師
  hours: number;     // 時數
  category: string;  // 類別
  completed: boolean; // 是否完成
}

// ③ 建立資料陣列（模擬後端回傳的資料）
const courses: Course[] = [
  {
    id: 1,
    name: "HTML 基礎",
    instructor: "Allen",
    hours: 6,
    category: "前端",
    completed: true
  },
  {
    id: 2,
    name: "CSS 進階",
    instructor: "Allen",
    hours: 8,
    category: "前端",
    completed: true
  },
  {
    id: 3,
    name: "Angular 入門",
    instructor: "Allen",
    hours: 20,
    category: "框架",
    completed: false
  },
  {
    id: 4,
    name: "TypeScript 精通",
    instructor: "Grace",
    hours: 12,
    category: "程式語言",
    completed: false
  }
];

// ④ 資料操作（對應投影片的「資料轉換」）

// 計算總時數
const totalHours: number = courses.reduce((sum, c) => sum + c.hours, 0);
console.log("總學習時數：", totalHours);  // 46

// 只取出「已完成」的課程
const completedCourses = courses.filter(c => c.completed);
console.log("已完成課程：", completedCourses.length);  // 2

// 只取出「未完成」的課程
const pendingCourses = courses.filter(c => !c.completed);
console.log("待學習課程：", pendingCourses.map(c => c.name));

// 轉換資料格式（只取 name 和 hours 組成新陣列）
const summary = courses.map(c => ({
  課程: c.name,
  時數: `${c.hours} 小時`,
  狀態: c.completed ? "✅ 已完成" : "⏳ 學習中"
}));
console.log(summary);

// ============================================================
// TypeScript 練習二：日期物件
// ============================================================

// Date 物件：取得目前時間
const now: Date = new Date();
console.log("現在時間：", now);

// 取得各個部分
console.log("年：", now.getFullYear());  // 例：2024
console.log("月：", now.getMonth() + 1); // 注意：getMonth() 從 0 開始，所以要 +1
console.log("日：", now.getDate());
console.log("時：", now.getHours());
console.log("分：", now.getMinutes());

// 格式化日期（台灣常用格式）
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');  // 補零：1 → "01"
const day = String(now.getDate()).padStart(2, '0');

const formattedDate: string = `${year}/${month}/${day}`;
console.log("格式化日期：", formattedDate);  // 例：2024/01/15

// ============================================================
// 資料重組（後端格式 → 前端格式）
// ============================================================

// 後端回傳的格式（英文 key，巢狀物件）
const apiResponse = {
  user_name: "allen_wu",         // 底線命名
  birth_date: "1999-05-15",
  total_score: 1500,
  level_info: {
    level: 3,
    exp: 250
  }
};

// 前端需要的格式（camelCase，平坦化）
const frontendUser = {
  userName: apiResponse.user_name,               // 重命名
  birthDate: new Date(apiResponse.birth_date),   // 轉成 Date 物件
  totalScore: apiResponse.total_score,
  level: apiResponse.level_info.level,           // 展開巢狀物件
  exp: apiResponse.level_info.exp
};

console.log("轉換後的使用者：", frontendUser);
