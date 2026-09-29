/*
  === 第28章：串接 OpenAI API — 元件 ===

  建立一個簡單的聊天介面：
  ① 使用者輸入 API Key（不存到伺服器，只存在元件裡）
  ② 輸入問題並送出
  ③ 呼叫 OpenAI API 取得回答
  ④ 把對話歷史記錄下來，讓 AI 有「記憶」

  對話歷史（messages 陣列）的重要性：
  每次請求都要把完整的對話歷史傳過去，AI 才能理解上下文。
  → 新對話只帶 system + 最新的 user message
  → 有歷史對話則帶 system + [user, assistant, user, assistant, ...] + 最新 user
*/

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenaiService, ChatMessage } from './openai.service';

interface DisplayMessage {
  role: 'user' | 'assistant';
  content: string;
  isLoading?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class AppComponent {

  constructor(private openaiService: OpenaiService) {}

  // API Key（實際使用請從安全的地方取得，不要寫死在程式碼裡）
  apiKey: string = '';

  // 使用者輸入的訊息
  userInput: string = '';

  // 顯示在畫面上的對話記錄
  displayMessages: DisplayMessage[] = [];

  // 傳給 OpenAI 的完整對話歷史（含 system）
  private chatHistory: ChatMessage[] = [
    {
      role: 'system',
      content: '你是一個友善的 Angular 課程助教，專門回答 TypeScript 和 Angular 相關的問題。回答時請使用繁體中文，並盡量舉例說明。'
    }
  ];

  isLoading: boolean = false;

  // 送出訊息
  sendMessage(): void {
    if (!this.userInput.trim() || !this.apiKey.trim() || this.isLoading) return;

    const userText = this.userInput.trim();
    this.userInput = '';

    // 加入使用者訊息到畫面
    this.displayMessages.push({ role: 'user', content: userText });

    // 加入使用者訊息到對話歷史
    this.chatHistory.push({ role: 'user', content: userText });

    // 顯示載入中
    this.isLoading = true;
    this.displayMessages.push({ role: 'assistant', content: '...', isLoading: true });

    // 呼叫 OpenAI API
    this.openaiService.chat(this.chatHistory, this.apiKey).subscribe({
      next: (res) => {
        const reply = res.choices[0].message.content;

        // 移除載入中泡泡，換成真實回答
        this.displayMessages.pop();
        this.displayMessages.push({ role: 'assistant', content: reply });

        // 把 AI 回答加入對話歷史（下次請求會帶上）
        this.chatHistory.push({ role: 'assistant', content: reply });

        this.isLoading = false;
        console.log('Token 使用量：', res.usage);
      },
      error: (err) => {
        this.displayMessages.pop();
        this.displayMessages.push({
          role: 'assistant',
          content: `❌ 發生錯誤：${err.error?.error?.message ?? '請確認 API Key 是否正確'}`
        });
        this.isLoading = false;
      }
    });
  }

  // 清除對話
  clearChat(): void {
    this.displayMessages = [];
    // 保留 system message，清除其他對話歷史
    this.chatHistory = [this.chatHistory[0]];
  }

  // 按 Enter 送出
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
