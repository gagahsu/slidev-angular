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

<!--
大家好，這一章我們要來學 JsonPipe。

前面我們都是用內嵌繫結把單一的字串或數字顯示在畫面上，但如果今天要顯示的是一整包物件資料，例如一個使用者的完整資料，直接繫結會發生什麼事？畫面不會乖乖顯示內容，而是出現一串看不懂的文字。JsonPipe 要解決的就是這個問題——它能把 JSON 物件直接轉成可讀的字串顯示在畫面上。

學完這一章，大家會知道為什麼物件不能直接顯示、怎麼用 `| json` 管道把物件印出來，以及搭配 `<pre>` 標籤讓輸出保留完整格式。
-->

---
layout: default
---

# Outline

- **JsonPipe 是什麼** — HTML 無法直接顯示 JSON 物件的原因
- **JsonPipe 使用步驟** — import、繫結語法、`| json` 管道
- **`<pre>` 標籤搭配** — 格式化顯示 JSON 輸出

<!--
這張投影片先讓大家看一下今天的路線圖：我們會先搞清楚為什麼物件不能直接顯示在畫面上，接著學怎麼用 JsonPipe 把物件轉成可讀文字，最後再教大家搭配 `<pre>` 標籤讓輸出保留縮排、更好閱讀。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JsonPipe 是什麼
# What is JsonPipe

<!--
先問大家一個問題：如果我們把一個物件直接用 `{{ }}` 繫結到畫面上，會看到什麼？答案不是我們想像的那種漂亮 JSON 格式，而是一串很奇怪的文字。接下來這幾張投影片就是要解釋這個現象是怎麼發生的，以及 JsonPipe 怎麼幫我們解決。
-->

---

# JsonPipe 是什麼

在 TypeScript 中，可以用 `console.log()` 檢查 JSON 資料，輸出出現在瀏覽器的開發者工具 log。

若直接以內嵌繫結 `{{ user }}` 將物件顯示在 HTML，畫面只會出現：

<div class="flex justify-center">
  <img src="/images/36-json-pipe/object-object-display.png" class="rounded shadow-md max-h-80" />
</div>

原因是 HTML 無法直接序列化 JavaScript 物件，會呼叫物件的 `.toString()` 方法，結果固定為 `[object Object]`。

<!--
大家平常在 TypeScript 裡想檢查資料對不對，通常會用 `console.log()`，這樣可以在開發者工具裡清楚看到物件的內容。但如果我們直接把物件寫進畫面的內嵌繫結 `{{ user }}`，畫面上就會出現一串 `[object Object]`，完全看不出裡面裝了什麼。

這是因為 HTML 本身不知道怎麼把一個 JavaScript 物件轉成文字，它只會呼叫物件內建的 `.toString()` 方法，而這個方法對一般物件來說，回傳的固定就是 `[object Object]` 這個字串，跟物件裡實際的資料完全無關。

⚠️ 這裡同學很容易誤會成「Angular 壞掉了」或「繫結語法寫錯」，其實語法完全正確，只是物件本身沒辦法被 HTML 直接讀懂，我們需要額外的工具把它轉成可讀的文字，這就是接下來要介紹的 JsonPipe。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# JsonPipe 使用
# Using JsonPipe

<!--
知道問題出在哪之後，接下來就是解法了。這一段我們會介紹兩種把物件轉成文字的方式，重點會放在 Angular 提供的 JsonPipe，也就是大家常聽到的 `| json` 管道語法。
-->

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

<!--
把物件轉成可讀文字，其實有兩條路：一種是在 TypeScript 裡自己動手用 `JSON.stringify()` 轉好再繫結，另一種就是讓 Angular 幫我們做，也就是 `JsonPipe`。實務上大家幾乎都選第二種，因為語法更簡潔，也不用在元件裡多寫轉換邏輯。

要用 JsonPipe，步驟很單純：先在 `*.component.ts` 裡 import `CommonModule`，這樣樣板才認得 `json` 這個管道；接著在 HTML 用內嵌繫結顯示變數；最後在變數後面加上 `| json` 就完成了。

業界實務上，JsonPipe 很常用在開發階段的除錯，快速把 API 回傳的資料印在畫面上檢查欄位對不對，比開發者工具方便很多。
-->

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

<!--
這段範例的目的是準備好等一下要顯示的資料，並且讓元件認得 `json` 這個管道。我們先宣告一個 `user` 物件，裡面有姓名、年齡、還有一個角色陣列，這樣等一下才能看出 JsonPipe 連巢狀的陣列都能處理。

關鍵的地方在 `imports` 陣列裡加上 `CommonModule`，這一步千萬不能省略。

⚠️ 同學最常忘記的就是這個 import，如果沒加，HTML 裡寫 `| json` 的時候 Angular 會直接跳出錯誤，說找不到叫做 `json` 的管道，所以看到這種錯誤訊息，第一件事就是檢查 `CommonModule` 有沒有匯入。
-->

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

<!--
準備好資料跟模組之後，實際用法非常簡單，就是在原本的內嵌繫結後面加上 `| json`，跟我們之前學過的其他管道語法用法一模一樣。

大家可以看到，執行之後畫面不再是 `[object Object]`，而是完整的 JSON 內容都印出來了，連陣列裡的 `admin`、`user` 也都看得到。不過大家注意一下，這時候的輸出是擠在同一行的，可讀性其實不太好，等一下我們會教怎麼讓它排版更漂亮。
-->

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

<!--
剛剛看到 `| json` 輸出雖然正確，但擠成一行不好讀，這裡我們要解決的就是排版的問題。做法很簡單，只要把原本的內嵌繫結包在 `<pre>` 標籤裡面就好。

`<pre>` 是 HTML 原生的標籤，意思是「保留原樣（preformatted）」，一般的 HTML 標籤預設會把多餘的空白跟換行都吃掉，但 `<pre>` 標籤不會，它會照著內容原本的縮排和換行呈現，所以搭配 JsonPipe 輸出的字串，就會變成大家看到的這種一層一層縮排的漂亮格式。

大家可以對照一下，這跟我們平常在開發者工具裡看到 JSON 資料的排版方式很像，這也是業界在做除錯畫面或簡易資料檢視工具時常用的小技巧。
-->

---
layout: end
---

# 課程結束
### 使用 JsonPipe 搭配 `<pre>` 標籤，可在 HTML 畫面上清晰呈現 JSON 物件結構

<!--
今天這一章我們解決了一個很實際的問題：物件沒辦法直接顯示在畫面上。大家現在應該都知道原因是 HTML 只會呼叫 `.toString()`，而 JsonPipe 就是幫我們把物件轉成可讀 JSON 字串的工具，再搭配 `<pre>` 標籤就能保留完整的排版。

這個技巧雖然簡單，但在平常開發時非常實用，尤其是要快速確認 API 回傳資料長什麼樣子的時候，大家可以多多練習使用。
-->

