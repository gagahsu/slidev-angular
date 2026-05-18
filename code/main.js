const btn = document.getElementById('greet-btn');
const msg = document.getElementById('message');

btn.addEventListener('click', () => {
  msg.textContent = '你好！歡迎來到前端的世界！';
});