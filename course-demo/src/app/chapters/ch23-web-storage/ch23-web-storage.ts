import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ch23-web-storage',
  templateUrl: './ch23-web-storage.html',
  styleUrl: './ch23-web-storage.css',
  standalone: true,
  imports: [FormsModule]
})
export class Ch23WebStorage implements OnInit {

  localName: string = '';
  localReadResult: string = '';
  sessionScore: string = '';
  sessionReadResult: string = '';
  objectReadResult: string = '';

  ngOnInit(): void {
    this.readLocalStorage();
    this.readSessionStorage();
    this.readObject();
  }

  saveToLocalStorage(): void {
    if (!this.localName) return;
    localStorage.setItem('user_name', this.localName);
    alert(`已儲存「${this.localName}」到 localStorage，重新整理也不會消失！`);
  }

  readLocalStorage(): void {
    const name = localStorage.getItem('user_name');
    this.localReadResult = name ?? '（尚未儲存任何資料）';
  }

  clearLocalStorage(): void {
    localStorage.removeItem('user_name');
    this.localReadResult = '（已清除）';
    this.localName = '';
  }

  saveToSessionStorage(): void {
    if (!this.sessionScore) return;
    sessionStorage.setItem('game_score', this.sessionScore);
    alert(`已儲存分數「${this.sessionScore}」到 sessionStorage，關掉分頁就會消失！`);
  }

  readSessionStorage(): void {
    const score = sessionStorage.getItem('game_score');
    this.sessionReadResult = score ?? '（尚未儲存任何資料）';
  }

  clearSessionStorage(): void {
    sessionStorage.removeItem('game_score');
    this.sessionReadResult = '（已清除）';
    this.sessionScore = '';
  }

  saveObject(): void {
    const user = {
      name: '玩家一',
      level: 42,
      items: ['劍', '盾牌', '藥水']
    };
    localStorage.setItem('player_data', JSON.stringify(user));
    alert('物件已透過 JSON.stringify() 儲存！');
  }

  readObject(): void {
    const raw = localStorage.getItem('player_data');
    if (raw) {
      const user = JSON.parse(raw);
      this.objectReadResult = `姓名：${user.name}，等級：${user.level}，道具：${user.items.join('、')}`;
    } else {
      this.objectReadResult = '（尚未儲存物件）';
    }
  }
}
