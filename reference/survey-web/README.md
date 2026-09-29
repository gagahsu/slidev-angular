# survey-web：動態問卷系統前端（Angular 21 參考答案）

搭配 `slidev-springboot/reference/dynamic-survey`（後端，`http://localhost:8080`）。
規格見 `SURVEY-SPEC.md`；本專案採 Angular 21 預設風格（`app.ts`、zoneless、signals、Vitest）。

```bash
npm install --legacy-peer-deps
npx ng serve        # http://localhost:4200
```

測試帳號（seed）：`admin@example.com` / `ming@example.com`，密碼 `Passw0rd12`。

## API 網址與 Docker

`src/app/core/api.ts`：開發（`ng serve`）直接呼叫 `http://localhost:8080/api`（後端要設定 CORS）；正式 build 用同源的 `/api`，
由 nginx 反向代理到後端容器（見 `slidev-docker/reference/survey`），不需要 CORS。

## 端對端測試

```bash
npm i -D playwright
node e2e/e2e.mjs                             # 預設打 http://localhost:4200
BASE=http://localhost:8080 node e2e/e2e.mjs  # 打 Docker 版
```
