/*
  === 第27章：串接 API — 步驟一：app.config.ts ===

  使用 Angular 的 HttpClient 之前，要先在 app.config.ts 註冊 provideHttpClient()。
  這個動作等同於「告訴 Angular：我要用 Http 功能，請幫我準備好」。

  沒有這行的話，在 Service 裡 inject(HttpClient) 會報錯。
*/

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // ← 必須加這行

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()   // ← 注入到整個應用，讓所有元件都能使用 HttpClient
  ]
};
