---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Dialog
routeAlias: ch43
style: |
  .slidev-layout p,
  .slidev-layout li,
  .slidev-layout td,
  .slidev-layout th,
  .slidev-layout div {
    font-size: max(16px, 1em);
  }
  table {
    width: 100%;
    margin: 1rem 0;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px !important;
    border: 1px solid #e2e8f0 !important;
  }
  .index-table td {
    text-align: center;
    font-family: monospace;
  }
---

<div class="flex flex-col justify-center items-center h-full" style="background: #ffffff;">
  <p style="color: #5eada0; font-size: 1rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.2rem;">
    Angular Essentials
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    Dialog
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「以對話框提示使用者執行特定操作或確認重要訊息」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **第一部分：Dialog 概念介紹**
- **第二部分：Dialog 元件 HTML 結構**
- **第三部分：Dialog 元件 TypeScript**
- **第四部分：開啟 Dialog（呼叫端）**
- **第五部分：設定 Dialog 尺寸**
- **實作練習**

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第一部分

## Dialog 概念介紹

---

# Dialog 是什麼？

Dialog（對話框）用來提醒使用者執行特定操作，或顯示重要的提示訊息。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**常見使用情境**

- 顯示確認訊息（如「確定刪除？」）
- 收集使用者輸入（如輸入框、選項）
- 展示警告或通知內容

</div>
<div>

**Angular Material 提供**

- `MatDialog` 服務：用於開啟對話框
- `MatDialogRef`：用於控制對話框（關閉、回傳資料）
- `MAT_DIALOG_DATA`：注入外部傳入的資料

</div>
</div>

<img src="/images/42-dialog/dialog-overview-example.png" class="rounded shadow-md max-h-80 mx-auto mt-2" />

---

# Dialog 的兩種用途

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**單純顯示提示內容**

Dialog 可僅顯示標題與訊息，搭配一個確認按鈕。

<img src="/images/42-dialog/dialog-simple-alert.png" class="rounded shadow-md max-h-52 mt-2" />

</div>
<div>

**包含輸入框或選項**

Dialog 內可放置輸入框（`mat-form-field`）或勾選框，供使用者填寫後回傳。

<img src="/images/42-dialog/dialog-with-input.png" class="rounded shadow-md max-h-52 mt-2" />

</div>
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第二部分

## Dialog 元件 HTML 結構

---

# Dialog HTML 結構

Dialog 的畫面由一個獨立的 Angular 元件（Component）提供，需使用 Angular Material 提供的三個指令來定義區塊。

| 指令 / 選擇器 | 用途 |
| --- | --- |
| `mat-dialog-title` | 標記對話框標題（屬性形式，加在 `h2` 上） |
| `<mat-dialog-content>` | 對話框的主要內容區域 |
| `<mat-dialog-actions>` | 對話框底部的操作按鈕區域 |

---

# Dialog HTML 結構 — 範例

```html
<!-- dialog 元件的 HTML 檔案 -->
<h2 mat-dialog-title>標題</h2>

<!-- dialog 內容 -->
<mat-dialog-content>
  <p>訊息</p>
</mat-dialog-content>

<!-- dialog 按鈕 -->
<mat-dialog-actions>
  <button>取消</button>
  <button>確定</button>
</mat-dialog-actions>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>注意：</b> <code>mat-dialog-title</code> 為 HTML 屬性（Attribute Directive），套用在現有標籤上；<code>mat-dialog-content</code> 與 <code>mat-dialog-actions</code> 為元素（Element Directive）。
</div>

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第三部分

## Dialog 元件 TypeScript

---

# Dialog 元件 TS — 匯入模組（一）

Dialog 元件需匯入所需的 Angular Material 模組與核心 API。

```typescript
import { FormsModule } from '@angular/forms';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
```

---

# Dialog 元件 TS — 匯入模組（二）

在 `@Component` 裝飾器的 `imports` 陣列中宣告所使用的模組。

```typescript
@Component({
  selector: 'dialog-example',
  templateUrl: './dialog.html',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
})
export class DialogExample {
  // 類別內容見下頁
}
```

---

# Dialog 元件 TS — 注入 DialogRef 與 Data

`MatDialogRef` 用於控制對話框本身（如關閉）；`MAT_DIALOG_DATA` 用於接收開啟時傳入的資料。

```typescript
export class DialogExample {
  readonly dialogRef = inject(MatDialogRef<DialogExample>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
}
```

| 注入項目 | 說明 |
| --- | --- |
| `MatDialogRef<T>` | 代表當前對話框的參考，可呼叫 `close()` 關閉並回傳資料 |
| `MAT_DIALOG_DATA` | 接收呼叫端透過 `open()` 傳入的 `data` 物件 |

---

# Dialog 元件 TS — 關閉對話框

呼叫 `dialogRef.close()` 關閉對話框，並可在括號內傳入回傳資料。

```typescript
onNoClick(): void {
  const returnData = ['ada', 'adadas'];
  this.dialogRef.close(returnData);
}
```

| 方法 | 說明 |
| --- | --- |
| `dialogRef.close()` | 關閉對話框，不回傳任何值 |
| `dialogRef.close(value)` | 關閉對話框並回傳指定資料給呼叫端 |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第四部分

## 開啟 Dialog（呼叫端）

---

# 開啟 Dialog — 注入 MatDialog

在需要開啟對話框的元件（呼叫端）注入 `MatDialog` 服務。

```typescript
import { MatDialog } from '@angular/material/dialog';
import { Component, inject } from '@angular/core';
import { DialogExample } from './dialog-example';

@Component({ ... })
export class AppComponent {
  readonly dialog = inject(MatDialog);
}
```

---

# 開啟 Dialog — 呼叫 open()（一）

使用 `dialog.open()` 開啟對話框，第一個參數為 Dialog 元件類別，第二個參數為設定物件。

```typescript
showDialog() {
  // 開啟 dialog，open() 第一個參數放 Dialog 元件類別
  // 第二個參數放設定物件，data 為傳入 Dialog 的資料
  const dialogRef = this.dialog.open(DialogExample, {
    data: { name: 'name', animal: 'title' },
  });
}
```

---

# 開啟 Dialog — 接收回傳值（二）

`afterClosed()` 回傳一個 Observable，訂閱後可取得 Dialog 關閉時回傳的資料。

```typescript
showDialog() {
  const dialogRef = this.dialog.open(DialogExample, {
    data: { name: 'name', animal: 'title' },
  });

  // 當 dialog 關閉後觸發，並取得回傳的內容
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}
```

| 方法 | 說明 |
| --- | --- |
| `dialog.open(Component, config)` | 開啟指定元件作為對話框 |
| `dialogRef.afterClosed()` | 回傳 Observable，dialog 關閉後發出回傳值 |

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 第五部分

## 設定 Dialog 尺寸

---

# 設定 Dialog 的寬度與高度

在 `open()` 的設定物件中，透過 `width` 與 `height` 屬性指定對話框的尺寸（字串格式）。

```typescript
const dialogRef = this.dialog.open(DialogComponent, {
  width: '500px',
  height: '300px',
});
```

| 設定屬性 | 型別 | 說明 |
| --- | --- | --- |
| `width` | `string` | 設定 Dialog 寬度，例如 `'500px'`、`'80vw'` |
| `height` | `string` | 設定 Dialog 高度，例如 `'300px'`、`'60vh'` |
| `data` | `any` | 傳入 Dialog 元件的資料，透過 `MAT_DIALOG_DATA` 接收 |

---
layout: default
---

# 練習：建立 Dialog 對話框
### 任務說明

建立一個包含輸入框的 Dialog，從主元件開啟後，使用者填入資料並按確認，主元件印出回傳值。

1. 建立 `dialog-form` 元件作為 Dialog 內容
2. Dialog HTML 使用 `mat-dialog-title`、`<mat-dialog-content>`、`<mat-dialog-actions>`
3. Dialog TS 注入 `MatDialogRef` 與 `MAT_DIALOG_DATA`
4. 主元件注入 `MatDialog`，呼叫 `dialog.open()` 傳入資料
5. 訂閱 `afterClosed()`，將回傳值印至 console

---
layout: default
---

# 練習：解題提示
### 提示說明

1. Dialog 元件的 `imports` 陣列需加入 `MatDialogTitle`、`MatDialogContent`、`MatDialogActions`
2. 使用 `inject(MAT_DIALOG_DATA)` 取得外部傳入資料，使用 `inject(MatDialogRef)` 取得對話框參考
3. 確認按鈕呼叫 `this.dialogRef.close(returnValue)` 回傳資料
4. 呼叫端以 `this.dialog.open(DialogFormComponent, { data: { ... } })` 開啟
5. `dialogRef.afterClosed().subscribe(result => { ... })` 接收回傳值

---
layout: end
---

# 本章重點回顧

- Dialog 由獨立元件提供畫面，透過 `MatDialog` 服務開啟
- HTML 使用 `mat-dialog-title` / `mat-dialog-content` / `mat-dialog-actions` 劃分區塊
- Dialog 元件注入 `MatDialogRef` 控制關閉與回傳，注入 `MAT_DIALOG_DATA` 接收資料
- 呼叫端使用 `dialog.open(Component, { data, width, height })` 開啟並傳入設定
- 透過 `dialogRef.afterClosed().subscribe()` 接收 Dialog 關閉後的回傳值
