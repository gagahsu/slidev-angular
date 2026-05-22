# 第06章：Angular 降版指南

## 為什麼要降版？

最新版不一定最好用！當你遇到以下情況時，就需要降版：
- 某個好用的套件還不支援最新的 Angular 版本
- 公司專案有版本規範
- 升級後出現不明錯誤，想回到穩定版

---

## Angular 版本對應關係

Angular 的版本像「聯名套裝」，各個套件必須搭配對應版本：

| Angular 版本 | 對應 TypeScript | 對應 RxJS |
|-------------|----------------|-----------|
| Angular 19  | 5.5 ~ 5.7      | 6.x / 7.x |
| Angular 18  | 5.4 ~ 5.6      | 6.x / 7.x |
| Angular 17  | 5.2 ~ 5.4      | 6.x / 7.x |

> 版本不對應 → 套件吵架 → 程式爆炸 😱

---

## 降版三步驟

### 步驟一：確認目前版本

```bash
# 查看目前安裝的 Angular CLI 版本及相關環境
ng version
```

輸出範例：
```
Angular CLI: 19.x.x
Node: 20.x.x
Angular: 19.x.x
```

---

### 步驟二：移除全域 Angular CLI

```bash
# -g 代表全域（global），移除整個電腦上的 Angular CLI
npm uninstall -g @angular/cli
```

⚠️ 移除後，`ng` 指令暫時無法使用，這是正常的！

---

### 步驟三：安裝指定版本並建立新專案

**方法 A：用 npx 直接指定版本建立（推薦，不需要重新安裝全域 CLI）**

```bash
# @19 代表使用 Angular 19 版本
npx @angular/cli@19 new my-project
```

**方法 B：重新全域安裝指定版本的 CLI**

```bash
# 安裝 Angular 19 的 CLI
npm install -g @angular/cli@19

# 確認版本
ng version

# 建立新專案
ng new my-project
```

---

## 常見錯誤處理

| 錯誤訊息 | 原因 | 解決方法 |
|---------|------|---------|
| `ng: command not found` | CLI 已移除但還沒重裝 | 完成步驟三安裝 |
| `peer dependency conflict` | 套件版本不相容 | 加上 `--legacy-peer-deps` 旗標 |

```bash
# 遇到套件版本衝突時，加上這個旗標忽略衝突警告
npm install --legacy-peer-deps
```
