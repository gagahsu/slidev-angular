/*
  === 第28章：串接 OpenAI API — Service ===

  OpenAI 的 Chat Completions API 讓你把 GPT 模型整合進 Angular 應用。

  API 端點：https://api.openai.com/v1/chat/completions
  認證方式：Authorization: Bearer YOUR_API_KEY

  messages 格式：
  [
    { role: 'system', content: '你是一個助手...' },   ← 設定 AI 角色
    { role: 'user',   content: '使用者的問題' },       ← 使用者訊息
    { role: 'assistant', content: 'AI 的回答' }        ← AI 回應（歷史對話用）
  ]

  ⚠️ 注意：API Key 絕對不能放在前端程式碼！
     正式環境要透過自己的後端中轉，避免 Key 外洩。
     此處僅作課程示範用途。
*/

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private http = inject(HttpClient);
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  // 呼叫 OpenAI Chat Completions API
  chat(messages: ChatMessage[], apiKey: string): Observable<OpenAIResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    });

    const body = {
      model: 'gpt-4o-mini',   // 便宜且夠用的模型
      messages: messages,
      max_tokens: 1000
    };

    return this.http.post<OpenAIResponse>(this.apiUrl, body, { headers });
  }
}
