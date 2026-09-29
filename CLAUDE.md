# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server at localhost:3030 (all chapters via index.md)
pnpm build            # Build to dist/
pnpm export           # Export slides to PDF
pnpm export:all       # Export each chapter deck (scripts/export-all.mjs)
```

Package manager is **pnpm** (not npm/yarn). Slides are Slidev decks (theme `penguin`), one per chapter: `NN-topic.md`
(`routeAlias: chNN`), all included from `index.md` via `src:`.

## 版本與命名（Angular 21 預設）

課程以 **Angular 21**（`@angular/cli@21`）為準，投影片與 `code/` 範例都採 2025 命名風格：

- 檔名沒有 `.component` 後綴：`app.ts`、`app.html`、類別 `App`；`ng g c home` → `home.ts` / `Home`
- Service、攔截器、守衛保留明確後綴：`survey-service.ts`（`SurveyService`）、`auth-interceptor.ts`、`auth-guard.ts`
- 元件預設 standalone（不寫 `standalone: true`）、**zoneless**（`provideBrowserGlobalErrorListeners()`）、測試用 Vitest
- zoneless 下，`subscribe` / `setTimeout` 回呼裡改一般屬性畫面**不會更新**：非同步進來的資料要放 `signal`
- `HttpClient` 在 v21 不用 `provideHttpClient()` 也能注入；要用攔截器時仍要 `provideHttpClient(withInterceptors([...]))`

## 貫穿專案：動態問卷系統

ch23 起的練習都是「動態問卷系統」（跨 MySQL / Spring Boot / Angular / Docker 共用）。**規格以 `SURVEY-SPEC.md` 為準**（各 repo 內容一致，修改時要同步）。

| 章節 | 這一塊 |
| --- | --- |
| ch23–24 | 導覽列與路由、後台子路由；`@Input` 預覽卡片、`@Output` 題目表單 |
| ch29 | 串接 Spring Boot 問卷 API（`SurveyService`、CORS、`withCredentials`） |
| ch33、35、38 | 前台列表（Mat-table + 後端分頁）、日期防呆、標題搜尋（debounce） |
| ch42、43 | 統計圓餅圖、`Dialogs` 提醒／確認對話框 |
| ch50–52 | 作答表單（單選、多選、文字）、題目 `FormArray`、驗證與自訂驗證器 |
| ch57、58 | 攔截器（Token、401 換發、錯誤處理）、路由守衛（登入、管理員、離開確認） |
| ch59 | 綜合練習：前台 + 後台整合 |

- **`reference/survey-web/`**：可執行的 Angular 21 參考答案（`npm install --legacy-peer-deps && npx ng serve`），搭配 `slidev-springboot/reference/dynamic-survey`（`localhost:8080`）。`e2e/e2e.mjs` 是 Playwright 端對端驗收
- **投影片裡的練習程式碼必須是編譯、執行過的**：改題目時先在 `reference/survey-web`（或暫時的 Angular 21 專案）跑過，再改投影片
- **投影片排版：** 畫布 980×552，一張約放 20 行程式碼；長程式碼拆成「（續）」頁並加「接上一頁／見下一頁」註解；投影片層級的 CSS 要寫在該張投影片的 `<style>` 區塊（frontmatter 的 `style:` 不是 CSS 規則區塊）
- 章節編號：ch06（降版）已刪除；ch57 攔截器、ch58 路由守衛、ch59 綜合練習、ch60 總複習
