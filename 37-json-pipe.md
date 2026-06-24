---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: JsonPipe
routeAlias: ch37
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
    JsonPipe
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「將 JSON 物件直接呈現於 HTML 畫面上」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

---
layout: default
---

# Outline

- **JsonPipe 是什麼** — HTML 無法直接顯示 JSON 物件的原因
- **JsonPipe 使用步驟** — import、繫結語法、`| json` 管道
- **`<pre>` 標籤搭配** — 格式化顯示 JSON 輸出

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JsonPipe 是什麼
# What is JsonPipe

---

# JsonPipe 是什麼

在 TypeScript 中，可以用 `console.log()` 檢查 JSON 資料，輸出出現在瀏覽器的開發者工具 log。

若直接以內嵌繫結 `{{ user }}` 將物件顯示在 HTML，畫面只會出現：

<div class="flex justify-center">
  <img src="/images/36-json-pipe/object-object-display.png" class="rounded shadow-md max-h-80" />
</div>

原因是 HTML 無法直接序列化 JavaScript 物件，會呼叫物件的 `.toString()` 方法，結果固定為 `[object Object]`。

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JsonPipe 使用
# Using JsonPipe

---

# JsonPipe 使用步驟

若要將 JSON 資料顯示於 HTML，有兩種方式：

| 方式 | 說明 |
| --- | --- |
| `JSON.stringify()` | 在 TypeScript 中手動轉換為字串後繫結 |
| `JsonPipe`（`\| json`） | 直接在 HTML 樣板中使用管道語法轉換 |

使用 `JsonPipe` 的步驟如下：

1. 在該頁面的 `*.component.ts` 中 import `CommonModule`
2. 在 HTML 以內嵌繫結呈現目標變數
3. 在變數名稱後加上 `| json`

---

# JsonPipe 使用 — TypeScript 範例

在元件中宣告物件資料：

```typescript
user = {
  name: 'John',
  age: 30,
  roles: ['admin', 'user']
};
```

並在 `imports` 陣列中加入 `CommonModule`：

```typescript
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  user = { name: 'John', age: 30, roles: ['admin', 'user'] };
}
```

---

# JsonPipe 使用 — HTML 範例

在 HTML 樣板中以內嵌繫結加上 `| json` 管道：

```html
{{ user | json }}
```

畫面輸出結果（單行）：

<div class="flex justify-center">
  <img src="/images/36-json-pipe/json-pipe-inline-output.png" class="rounded shadow-md max-h-80" />
</div>

---

# 搭配 &lt;pre&gt; 標籤格式化顯示

直接使用 `| json` 輸出為單行，可讀性較低。建議搭配 <code>&lt;pre&gt;</code> 標籤，讓輸出保留縮排與換行：

```html
<pre>{{ user | json }}</pre>
```

<code>&lt;pre&gt;</code> 標籤會依照原始內容的空白與換行進行呈現，使 JSON 結構更易於閱讀。

<pre class="bg-gray-100 rounded p-4 text-sm text-left leading-relaxed font-mono mt-4" style="width: fit-content; margin: 1rem auto;">
{
  "name": "John",
  "age": 30,
  "roles": [
    "admin",
    "user"
  ]
}
</pre>

---
layout: end
---

# 課程結束
### 使用 JsonPipe 搭配 `<pre>` 標籤，可在 HTML 畫面上清晰呈現 JSON 物件結構
