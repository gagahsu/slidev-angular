// OnInit 是生命週期介面，實作後可以使用 ngOnInit()
import { Component, OnInit } from '@angular/core';
// [(ngModel)] 雙向綁定需要 FormsModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ch24-web-storage',         // 這個元件在 HTML 中使用的標籤名稱
  templateUrl: './ch24-web-storage.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch24-web-storage.css',       // 這個元件使用的 CSS 檔案
  standalone: true,                         // 獨立元件：需要的模組直接寫在下面的 imports
  imports: [FormsModule]
})
export class Ch24WebStorage implements OnInit {

  // 補充練習 1：綁定輸入框
  userName: string = '';
  // 補充練習 1：畫面上的歡迎詞
  displayTitle: string = '';

  ngOnInit(): void {
    // 找不到資料時 getItem 會回傳 null，這時用 || 給預設值
    this.displayTitle = localStorage.getItem('cached_user') || '訪客';
  }

  // localStorage 和 sessionStorage 是瀏覽器內建的，不需要 import
  // setItem(key, value)：儲存；同一個 key 再存一次會覆蓋
  saveName() {
    localStorage.setItem('name', 'Allen');
    sessionStorage.setItem('name', 'Allen');
  }

  // getItem(key)：讀取
  showName() {
    console.log(localStorage.getItem('name'));
    console.log(sessionStorage.getItem('name'));
  }

  // 小節練習：localStorage 只能存字串，物件要先轉成字串
  saveUser() {
    const user = { name: 'Allen', level: 5 };
    localStorage.setItem('user', JSON.stringify(user));

    const raw = localStorage.getItem('user');
    // 驚嘆號代表保證不是 null；JSON.parse 把字串還原成物件
    const parsed = JSON.parse(raw!);
    console.log(parsed.name, parsed.level);  // Allen 5
  }

  // 補充練習 1：儲存名字，重新整理後仍然記得
  save() {
    localStorage.setItem('cached_user', this.userName);
    this.displayTitle = this.userName;
  }

  // 補充練習 2：關閉分頁後，local_key 還在，session_key 會消失
  saveBoth() {
    localStorage.setItem('local_key', '我還在');
    sessionStorage.setItem('session_key', '要消失了');
  }
}
