/*
  === 第01章：JavaScript 大腦 ===

  JavaScript 讓網頁可以「動起來」，回應使用者的操作。

  步驟說明：
  ① 先找到 HTML 裡的元素（用 document.getElementById）
  ② 監聽使用者的動作（用 addEventListener）
  ③ 動作發生時，執行我們想要的程式碼
*/

// ① 找到 id="greet-btn" 的按鈕，並存到變數 btn 裡
//    這就像是幫按鈕取一個「代號」，方便我們之後呼叫它
const btn = document.getElementById('greet-btn');

// ② 找到 id="message" 的訊息區塊，存到變數 msg 裡
const msg = document.getElementById('message');

// ③ 幫按鈕安裝一個「監聽器」
//    當使用者「點擊 (click)」按鈕時，執行 { } 裡面的程式碼
btn.addEventListener('click', () => {
  // 把 msg 的文字內容改成以下這段話
  msg.textContent = '🎉 你好！歡迎來到前端的世界！你已經成功呼叫了 JavaScript！';
});

// ============================================================
// 延伸思考：
// 如果你想要「點第二次就清空訊息」，可以這樣寫：
// ============================================================
// btn.addEventListener('click', () => {
//   if (msg.textContent === '') {
//     msg.textContent = '🎉 你好！歡迎來到前端的世界！';
//   } else {
//     msg.textContent = ''; // 清空文字
//   }
// });
