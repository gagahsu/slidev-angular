import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  choices: {
    message: { role: string; content: string };
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

  chat(messages: ChatMessage[], apiKey: string): Observable<OpenAIResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    });
    const body = {
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 1000
    };
    return this.http.post<OpenAIResponse>(this.apiUrl, body, { headers });
  }
}
