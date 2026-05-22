# 第03章：Angular 介紹

## Angular 是什麼？

Angular 是 Google 開發的一套前端「開發平台」，不只是框架，它整合了開發網頁所需的全部工具。

---

## 三大框架比較

| 框架 | 比喻 | 適合情境 |
|------|------|---------|
| Vue | 騎腳踏車 | 小型專案、新手入門 |
| React | 騎重機 | 中型專案、靈活性需求高 |
| **Angular** | 開飛機 | 大型企業專案、嚴格規範需求 |

Angular 學起來比較難，但學會了在大型公司很吃香！

---

## 環境確認指令

打開終端機（命令提示字元），依序輸入以下指令確認版本：

```bash
# 確認 Node.js 版本（應該是 v18 以上）
node -v

# 確認 npm 版本（通常會跟 Node.js 一起安裝）
npm -v

# 確認 Angular CLI 是否已安裝
ng version
```

---

## Node.js vs npm 的關係

```
Node.js  → 讓 JavaScript 可以在電腦上執行的「引擎」
   └── npm → 隨 Node.js 附贈的「套件商店」（App Store 概念）
              可以用來下載、管理第三方套件
```
