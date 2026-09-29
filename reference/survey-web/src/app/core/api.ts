import { isDevMode } from '@angular/core';

/**
 * 後端 API 的網址前綴。
 * - 開發（ng serve）：直接呼叫 Spring Boot（localhost:8080），後端要設定 CORS
 * - 正式 build（Docker）：用同源的 /api，由 nginx 反向代理到後端容器，不需要 CORS
 */
export const API = isDevMode() ? 'http://localhost:8080/api' : '/api';
