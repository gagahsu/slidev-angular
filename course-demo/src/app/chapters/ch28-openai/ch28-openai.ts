import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenaiService, ChatMessage } from './openai.service';

interface DisplayMessage {
  role: 'user' | 'assistant';
  content: string;
  isLoading?: boolean;
}

@Component({
  selector: 'app-ch28-openai',
  templateUrl: './ch28-openai.html',
  styleUrl: './ch28-openai.css',
  standalone: true,
  imports: [FormsModule]
})
export class Ch28Openai {

  constructor(private openaiService: OpenaiService) {}

  apiKey: string = '';
  userInput: string = '';
  displayMessages: DisplayMessage[] = [];
  isLoading: boolean = false;

  private chatHistory: ChatMessage[] = [
    {
      role: 'system',
      content: '你是一個友善的 Angular 課程助教，專門回答 TypeScript 和 Angular 相關的問題。回答時請使用繁體中文。'
    }
  ];

  sendMessage(): void {
    if (!this.userInput.trim() || !this.apiKey.trim() || this.isLoading) return;

    const userText = this.userInput.trim();
    this.userInput = '';
    this.displayMessages.push({ role: 'user', content: userText });
    this.chatHistory.push({ role: 'user', content: userText });
    this.isLoading = true;
    this.displayMessages.push({ role: 'assistant', content: '...', isLoading: true });

    this.openaiService.chat(this.chatHistory, this.apiKey).subscribe({
      next: (res) => {
        const reply = res.choices[0].message.content;
        this.displayMessages.pop();
        this.displayMessages.push({ role: 'assistant', content: reply });
        this.chatHistory.push({ role: 'assistant', content: reply });
        this.isLoading = false;
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

  clearChat(): void {
    this.displayMessages = [];
    this.chatHistory = [this.chatHistory[0]];
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
