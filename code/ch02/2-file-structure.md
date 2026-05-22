# 第02章：Coding 習慣 ② 檔案放置位置

## 核心觀念

**同類型的檔案放在同一個資料夾**，就像衣服放衣櫃、碗盤放廚房。

---

## Angular 專案的標準資料夾結構

```
my-angular-project/
│
├── src/                        ← 所有程式碼都放這裡
│   ├── app/                    ← Angular 主程式
│   │   ├── components/         ← 「元件」統一放這個資料夾
│   │   │   ├── header/         ← 每個元件有自己的子資料夾
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.css
│   │   │   └── footer/
│   │   ├── services/           ← 「服務」（處理 API、商業邏輯）
│   │   │   └── user.service.ts
│   │   ├── models/             ← 「資料型別」定義（interface）
│   │   │   └── user.model.ts
│   │   └── app.component.ts    ← 根元件
│   │
│   ├── assets/                 ← 靜態資源（圖片、字型、圖示）
│   │   └── images/
│   │       └── logo.png
│   │
│   └── styles.css              ← 全域 CSS（對整個網站生效）
│
├── package.json                ← 專案設定（記錄安裝了哪些套件）
└── angular.json                ← Angular 設定檔
```

---

## 為什麼要統一放置？

| 情境 | 亂放的後果 | 統一放置的好處 |
|------|-----------|--------------|
| 找圖片 | 不知道在哪，找半天 | assets/images/ → 秒找到 |
| 找 API 相關程式 | 分散各處，容易漏改 | services/ → 一目了然 |
| 新人交接 | 需要解釋半天 | 按照結構自己就能理解 |
| 修改功能 | 可能漏改某個地方 | 同類型集中，不容易遺漏 |

---

## 小結

> 檔案結構就像是你的工作桌
> 桌子整齊的人，工作效率通常比較高
> 桌子一堆東西堆在一起的人，光找東西就花掉一半時間了！
