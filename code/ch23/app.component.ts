/*
  === 第23章：網頁儲存（Web Storage）===

  瀏覽器提供三種「本地儲存」機制，讓資料在重新整理後還能保留：

  ① Cookie        → 容量小（~4KB），可設定過期時間，常用於身分驗證
  ② localStorage  → 容量大（~5-10MB），永久保存，關掉瀏覽器也不消失
  ③ sessionStorage → 容量大（~5-10MB），分頁關掉就清除

  想像成：
  Cookie        = 門禁卡（有效期限，進出都會被檢查）
  localStorage  = 家裡的抽屜（放著不會不見）
  sessionStorage = 便利貼（黏在螢幕上，關掉就撕掉）

  注意：三種儲存都只能存「字串」
       → 存物件時要用 JSON.stringify()，取出時用 JSON.parse()
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: []
})
export class AppComponent implements OnInit {

  // ==============================
  // 顯示用的資料
  // ==============================

  // localStorage 相關
  localName: string = '';
  localReadResult: string = '';

  // sessionStorage 相關
  sessionScore: string = '';
  sessionReadResult: string = '';

  // 物件儲存示範
  objectReadResult: string = '';

  ngOnInit(): void {
    // 頁面載入時，嘗試讀取上次儲存的資料
    this.readLocalStorage();
    this.readSessionStorage();
    this.readObject();
  }

  // ==============================
  // localStorage 操作
  // ==============================

  // 儲存資料到 localStorage
  saveToLocalStorage(): void {
    if (!this.localName) return;
    localStorage.setItem('user_name', this.localName);
    console.log('已儲存到 localStorage：', this.localName);
    alert(`已儲存「${this.localName}」到 localStorage，重新整理也不會消失！`);
  }

  // 從 localStorage 讀取資料
  readLocalStorage(): void {
    const name = localStorage.getItem('user_name');
    this.localReadResult = name ?? '（尚未儲存任何資料）';
  }

  // 清除 localStorage 資料
  clearLocalStorage(): void {
    localStorage.removeItem('user_name');
    this.localReadResult = '（已清除）';
    this.localName = '';
  }

  // ==============================
  // sessionStorage 操作
  // ==============================

  // 儲存資料到 sessionStorage
  saveToSessionStorage(): void {
    if (!this.sessionScore) return;
    sessionStorage.setItem('game_score', this.sessionScore);
    console.log('已儲存到 sessionStorage：', this.sessionScore);
    alert(`已儲存分數「${this.sessionScore}」到 sessionStorage，關掉分頁就會消失！`);
  }

  // 從 sessionStorage 讀取資料
  readSessionStorage(): void {
    const score = sessionStorage.getItem('game_score');
    this.sessionReadResult = score ?? '（尚未儲存任何資料）';
  }

  // 清除 sessionStorage 資料
  clearSessionStorage(): void {
    sessionStorage.removeItem('game_score');
    this.sessionReadResult = '（已清除）';
    this.sessionScore = '';
  }

  // ==============================
  // 儲存物件（JSON.stringify / JSON.parse）
  // ==============================

  // 儲存物件到 localStorage
  saveObject(): void {
    const user = {
      name: '玩家一',
      level: 42,
      items: ['劍', '盾牌', '藥水']
    };
    // 物件不能直接存，要先轉成 JSON 字串
    localStorage.setItem('player_data', JSON.stringify(user));
    console.log('已儲存物件：', user);
    alert('物件已透過 JSON.stringify() 儲存！');
  }

  // 從 localStorage 讀取物件
  readObject(): void {
    const raw = localStorage.getItem('player_data');
    if (raw) {
      // 取出的是字串，要用 JSON.parse() 還原成物件
      const user = JSON.parse(raw);
      this.objectReadResult = `姓名：${user.name}，等級：${user.level}，道具：${user.items.join('、')}`;
    } else {
      this.objectReadResult = '（尚未儲存物件）';
    }
  }
}
