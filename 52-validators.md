---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Validators
routeAlias: ch52
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
    Validators
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「透過內建驗證器，確保表單資料的正確性與完整性」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好，接續上一章的 Reactive Forms，這一章我們要來講 Validators，也就是驗證器。

我們前面已經知道怎麼把表單結構定義出來、怎麼繫結到畫面上，但如果使用者亂填資料，例如 Email 沒填 @、密碼留空、年齡填負數，這些都應該要被擋下來。這就像我們寄包裹之前，郵局會先檢查地址格式對不對、重量有沒有超標，不符合規定就不會讓包裹寄出去。Validators 做的就是這件事——在資料送出之前，先幫我們把關。

學完這一章，大家會知道怎麼套用 Angular 內建的各種驗證器、怎麼同時套用多個規則、怎麼用正規表達式做更精細的格式驗證，以及怎麼讀取驗證結果並顯示錯誤訊息給使用者看。
-->

---
layout: default
---

# Outline

- **Validators 概念** — 表單驗證器的定義與用途
- **Validators 的使用方式** — import 與基本語法
- **多個 Validators 的組合** — 陣列語法與注意事項
- **常用內建 Validators 一覽** — 8 種常用驗證器
- **Validators.pattern 與 Regex** — 正規表達式應用
- **驗證結果的讀取** — `.invalid` 的用法與範例

<!--
這張投影片先讓大家掌握這一章的路線圖。我們會先講 Validators 的概念，再看怎麼引入並使用它、怎麼組合多個驗證規則，接著整理 8 個最常用的內建驗證器，然後深入 pattern 搭配正規表達式的用法，最後學會怎麼讀取驗證狀態並顯示錯誤提示。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Validators 概念
## What Are Validators

<!--
先想一個情境：如果表單完全沒有驗證，使用者交上來的資料可能欄位是空的、格式亂七八糟，我們後端還要花力氣去清理這些髒資料。

Validators 要解決的就是這個問題——它是 Angular Forms 內建的驗證機制，在資料離開表單之前，先幫我們檢查是否符合預先設定的規則。
-->

---

# Validators 是什麼？

Validators（驗證器）是 Angular Forms 的輸入驗證機制，負責檢查使用者輸入的資料是否符合預設規則。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**驗證失敗時的行為**
- 將表單欄位標記為「無效（invalid）」
- 提供對應的錯誤代碼
- 可用於阻止表單送出

</div>
<div>

**適用表單類型**
- Reactive Forms（響應式表單）
- Template-driven Forms（範本驅動表單）
- 本課程以 Reactive Forms 為主

</div>
</div>

<div class="flex justify-center">
  <img src="/images/51-validators/angular-form-validation-concept.png" class="rounded shadow-md max-h-48" />
</div>

<!--
這邊幫大家把定義講清楚：Validators 就是負責檢查使用者輸入是否符合規則的機制。一旦驗證失敗，這個欄位就會被標記成 invalid，並且附上對應的錯誤代碼，我們可以用這個狀態去擋住表單送出。

Validators 在 Reactive Forms 跟 Template-driven Forms 都能用，但因為我們這門課是以 Reactive Forms 為主，接下來的範例也都會搭配 fb.group() 一起示範。業界實務上，驗證器幾乎是每個表單的標配，尤其是註冊、登入、訂單這類會直接影響資料正確性的表單。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Validators 的使用方式
## How to Use Validators

<!--
了解概念之後，我們實際來看怎麼在程式碼裡引入並套用 Validators。
-->

---

# 引入 Validators

使用 Validators 前，需先從 `@angular/forms` 匯入。

```typescript
import { Validators } from '@angular/forms';
```

在 `FormGroup` 的欄位定義中，陣列的第二個元素用於指定驗證器（非必填）：

```typescript
// 語法結構：[初始值, 驗證器]
form = this.fb.group({
  surveyTitle: ['', Validators.required],  // 必填驗證
  questions:   this.fb.array([])           // 無驗證
});
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> 陣列第一個元素為欄位初始值，第二個元素為驗證器，驗證器非必填，可省略。
</div>

<!--
使用 Validators 前，記得要先從 @angular/forms 引入，這跟我們引入其他 Angular 內建功能的方式一樣。

帶大家看一下這個陣列語法：fb.group() 裡每個欄位可以寫成一個陣列，第一個位置放初始值，第二個位置放驗證器。像範例裡 surveyTitle 給了 Validators.required，questions 因為不需要驗證，就只留初始值，第二個位置可以整個省略。

⚠️ 提醒大家，這個順序是固定的——初始值一定在前面，驗證器一定在後面，順序寫反的話 TypeScript 會直接報型別錯誤。
-->

---

# 使用多個 Validators

若需同時套用多個驗證器，將驗證器以陣列包覆，並以逗號分隔。

```typescript
form = this.fb.group({
  surveyTitle: ['', [Validators.required, Validators.maxLength(5)]],
});
```

**注意事項**
- 驗證器之間無數量上限
- 避免設定互相衝突的驗證規則（例如同時設定 `minLength(10)` 與 `maxLength(5)`）

<!--
如果一個欄位需要同時符合好幾條規則，例如標題不能空、長度又不能太長，這時候就把驗證器包成一個陣列，用逗號分隔，Angular 會把陣列裡的每個驗證器都跑一遍。

⚠️ 這邊有兩個常見的錯誤要提醒大家：第一，驗證器雖然數量沒有上限，但也不要無限疊加，維護起來會很累；第二，最容易忽略的是驗證規則互相衝突，像同時設定 minLength(10) 又設定 maxLength(5)，這樣欄位永遠不可能通過驗證，這種邏輯錯誤 Angular 不會幫我們檢查，要靠自己留意。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 常用內建 Validators
## Built-in Validators

<!--
接下來我們把 Angular 內建最常用的幾個驗證器整理給大家，之後寫表單時可以直接查表使用。
-->

---

# 常用 Validators 一覽

| 驗證器 | 說明 |
| --- | --- |
| `Validators.required` | 必填。欄位值不可為空字串、`null` 或 `undefined` |
| `Validators.requiredTrue` | 值必須為 `true`，常用於 Checkbox 勾選確認 |
| `Validators.email` | 驗證 Email 格式，需包含 `@` 與 `.` |
| `Validators.minLength(n)` | 字串長度不得少於 n 個字元 |
| `Validators.maxLength(n)` | 字串長度不得超過 n 個字元 |
| `Validators.min(n)` | 數值不得小於 n（用於數字欄位） |
| `Validators.max(n)` | 數值不得大於 n（用於數字欄位） |
| `Validators.pattern(/regex/)` | 值必須符合指定的正規表達式 |

<!--
這張表整理了 8 個最常用的內建驗證器，我們不逐行念過去，挑幾個重點提醒大家。

required 跟 requiredTrue 不一樣，required 是「不能是空的」，requiredTrue 是「值一定要是 true」，通常用在使用者條款打勾這種 checkbox 情境。email 只是檢查格式像不像 Email，並不會真的去驗證這個信箱存不存在。minLength、maxLength 是給字串用的，min、max 是給數字用的，這兩組很容易搞混，大家實作時要注意欄位型別對不對。pattern 則是最有彈性的，可以用正規表達式定義任何格式規則，等一下會有專門一節來講。
-->

---

# 常用 Validators — 範例

```typescript
form = this.fb.group({
  username: ['', [Validators.required, Validators.minLength(3)]],
  email:    ['', [Validators.required, Validators.email]],
  age:      [null, [Validators.min(18), Validators.max(99)]],
  agree:    [false, Validators.requiredTrue],
  zipCode:  ['', Validators.pattern(/^\d{5}$/)],
});
```

<!--
我們帶大家看這個綜合範例，把前面表格裡講的驗證器實際套用在一份表單上。username 同時要必填又要至少 3 個字元，所以用陣列包了兩個驗證器；email 也是必填加上格式驗證；age 用 min、max 限制在合理範圍；agree 用 requiredTrue，代表使用者一定要勾選同意條款；zipCode 則用 pattern 搭配正規表達式，限制輸入必須是 5 位數字。

執行後，只要任何一個欄位不符合對應的規則，那個欄位的狀態就會是 invalid，我們可以拿這個狀態去阻擋表單送出或顯示錯誤訊息，這個之後會示範。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# Validators.pattern 與 Regex
## Pattern Validator and Regular Expressions

<!--
剛剛看到 zipCode 用了 pattern 搭配正規表達式，這邊我們花多一點時間，把正規表達式的基本概念講清楚。
-->

---

# Validators.pattern 與正規表達式

`Validators.pattern()` 接受一個正規表達式（Regular Expression，簡稱 Regex），用於比對輸入值是否符合指定格式。

**正規表達式**是一種文字匹配規則，可定義字元類型、範圍與數量等條件。

<div class="flex justify-center">
  <img src="/images/51-validators/regex-syntax-diagram.png" class="rounded shadow-md max-h-80" />
</div>

<!--
Validators.pattern() 接受的參數是一個正規表達式，也就是 Regex。大家可以把正規表達式想成一份「格式範本」，就像身分證字號有固定的格式規則：第一碼是英文字母、後面九碼是數字，正規表達式就是用來描述這種「規則」的語言。

它不只能用在 Angular，任何需要檢查文字格式的地方都用得到，例如驗證信箱、電話號碼、密碼強度，這是很通用的技能，值得花時間熟悉。
-->

---

# Regex 常用語法

| 符號 | 說明 | 範例 |
| --- | --- | --- |
| `^` | 字串起始位置 | `^A` 表示以 A 開頭 |
| `$` | 字串結束位置 | `Z$` 表示以 Z 結尾 |
| `[A-Z]` | 大寫字母 A 到 Z 的任一字元 | `[A-Z]{3}` |
| `\d` | 任意數字（等同 `[0-9]`） | `\d{4}` |
| `{n}` | 恰好重複 n 次 | `\d{5}` |

**範例：驗證台灣郵遞區號（5 位數字）**

```typescript
Validators.pattern(/^\d{5}$/)
```

<!--
這張表列出幾個最常用的 Regex 符號，我們挑重點講。^ 代表字串開頭，$ 代表字串結尾，把兩個放在一起用，就能限制整個字串的長度跟格式，而不只是「包含某個片段」。[A-Z] 代表指定範圍內的任一字元，\d 專門用來比對數字，{n} 則規定要重複幾次。

我們拿郵遞區號當例子：/^\d{5}$/ 這個正規表達式，合起來看就是「字串從頭到尾，剛好是 5 個數字」。

⚠️ 提醒大家，如果忘記寫 ^ 或 $，正規表達式可能只會比對「字串裡有沒有出現」符合的片段，而不是整個字串都要符合，這是新手寫 Regex 最容易忽略的地方。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 驗證結果的讀取
## Reading Validation State

<!--
設定好驗證規則之後，我們還需要知道怎麼「讀取」驗證的結果，才能決定要不要擋下表單送出，或是顯示錯誤訊息給使用者看。
-->

---

# 讀取驗證狀態：.invalid

設定驗證器後，透過 `form.get('欄位名稱')?.invalid` 讀取該欄位是否驗證失敗。

| 回傳值 | 意義 |
| --- | --- |
| `false` | 欄位值符合所有驗證規則（有效） |
| `true` | 欄位值不符合至少一項驗證規則（無效） |

<!--
要讀取某個欄位目前的驗證狀態，就用 form.get('欄位名稱')?.invalid，這行程式碼會回傳布林值：true 表示不符合規則，false 表示都符合。

這個 ?. 是安全導航符號，因為 form.get() 有可能找不到對應的欄位而回傳 null，加上問號可以避免程式在那種情況下直接報錯。等一下我們會看兩個實際應用的例子：一個是在 TypeScript 送出表單前判斷，一個是在 HTML 畫面上動態顯示錯誤訊息。
-->

---

# 驗證狀態範例（一）

在 TypeScript 中，於送出前判斷欄位是否有效：

```typescript
// 送出表單
onSubmit() {
  if (this.form.get('surveyTitle')?.invalid) {
    console.log('標題的內容請符合限制');
    return;
  }
  // 繼續執行送出邏輯
}
```

<!--
這是很典型的送出前檢查寫法：在 onSubmit() 裡先判斷 surveyTitle 這個欄位是不是 invalid，如果是，就印出提示訊息並且 return，不讓後面的送出邏輯繼續執行。

大家可以把這個想成過海關前的檢查哨——資料不符合規定就攔下來，不會讓它繼續往後跑。實際專案裡通常不會只 console.log，而是會顯示一個提示訊息給使用者看，這個我們下一頁會示範怎麼在畫面上呈現。
-->

---

# 驗證狀態範例（二）

在 HTML 範本中，根據驗證狀態動態顯示錯誤提示：

```html
<input formControlName="surveyTitle" />
@if (form.get('surveyTitle')?.invalid &&
     form.get('surveyTitle')?.touched) {
  <p>標題為必填，且長度不得超過 5 個字元。</p>
}
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>建議：</b> 搭配 <code>touched</code> 屬性判斷，避免在使用者尚未輸入時即顯示錯誤訊息。
</div>

<!--
除了在 TypeScript 判斷，我們也常常需要在畫面上即時顯示錯誤訊息。這邊用 @if 搭配 invalid 屬性，只要欄位無效，就顯示提示文字。

⚠️ 但這裡有個很容易忽略的細節：如果只判斷 invalid，使用者連欄位都還沒點進去，畫面就會馬上顯示一堆紅字錯誤，這樣的體驗很不好。所以我們會再加上 touched 這個條件，只有「使用者曾經點過又離開」這個欄位、而且欄位無效時，才顯示錯誤訊息。這是業界常見的表單體驗做法，大家實作表單時記得帶入這個習慣。
-->

---

# 常用驗證狀態屬性

| 屬性 | 說明 |
| --- | --- |
| `.invalid` | 欄位值不符合驗證規則時為 `true` |
| `.valid` | 欄位值符合所有驗證規則時為 `true` |
| `.touched` | 使用者曾聚焦並離開該欄位時為 `true` |
| `.untouched` | 使用者尚未觸碰該欄位時為 `true` |
| `.dirty` | 使用者已變更欄位值時為 `true` |
| `.pristine` | 欄位值尚未被變更時為 `true` |
| `.errors` | 回傳所有驗證錯誤的物件（無錯誤時為 `null`） |

<!--
這張表把常用的驗證狀態屬性整理起來，我們平常最常用到的是 invalid、valid、touched 這三個組合。dirty 跟 pristine 是判斷「使用者有沒有改過值」，跟 touched／untouched 判斷「有沒有點過」是不同的概念，這兩組很容易搞混，大家可以特別留意。

errors 屬性比較特別，它會回傳一個物件，裡面列出這個欄位到底違反了哪幾條規則，例如同時違反 required 跟 minLength，物件裡就會有對應的兩個 key，這在需要顯示更精確的錯誤訊息時會用到，例如告訴使用者「你少打了 3 個字」而不是只說「格式錯誤」。
-->

---
layout: default
---

# 練習 1：作答者資料驗證
### 情境說明

問卷作答頁最上面有一組固定欄位：姓名、手機、Email、年齡。需求文件對它們的規定是：**姓名、手機、Email 必填，年齡選填**；格式不對時，按「送出」要用**提醒視窗**告知（第 43 章的 `Dialogs`）。這一題把 Validators 與驗證狀態串在一起練習。

<div class="grid grid-cols-2 gap-4 my-3">
<div>

**需求**
- 四個欄位各自套用對應的驗證規則
- 欄位未通過驗證且已經點過（`touched`）時，欄位下方顯示錯誤訊息
- 按「送出」時，若表單無效：把**所有**問題一次列在提醒視窗，不繼續往下

</div>
<div>

**規則**
- 姓名：必填
- 手機：必填 + `pattern`：`09` 開頭共 10 碼數字
- Email：必填 + Email 格式
- 年齡：**選填**，有填的話要介於 1～120
- 錯誤訊息用 `@if` 搭配 `invalid && touched`，不能只判斷 `invalid`

</div>
</div>

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這一題把 required、pattern、email、min/max 四種驗證器都用上。跟一般的註冊表單不一樣的地方有兩個：年齡是選填，所以不能加 required，但有填的時候還是要檢查範圍；還有錯誤的呈現方式，是需求文件指定的提醒視窗，而不是只在欄位旁邊顯示紅字。

兩者可以並存：欄位旁邊的紅字，是使用者離開欄位時給的即時回饋；按送出時的提醒視窗，則是最終的確認，把所有問題一次告訴使用者，不用一個一個試。

⚠️ 這一題延續第 51 章的 Reactive Forms，和第 43 章的 Dialogs，如果不熟可以回頭複習。
-->

---
layout: default
---

# 練習 1：解題提示

1. 年齡的初始值給 `null`，而且**不要**加 `Validators.required`；`Validators.min(1)`、`Validators.max(120)` 遇到空值會直接通過
2. 手機：`Validators.pattern(/^09\d{8}$/)`，代表 `09` 開頭，後面 8 碼數字，總長度剛好 10
3. 用 `fb.nonNullable.group(...)`，欄位的型別就不會是 `string | null`
4. 蒐集所有問題：逐一檢查 `controls.xxx.invalid`，把訊息放進陣列，再交給 `dialogs.alert(problems)`
5. 讓欄位都顯示紅字：`form.markAllAsTouched()`

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <code>Validators.min/max</code> 遇到「空值」會視為通過，所以「選填但有範圍」的欄位只要不加 <code>required</code>，就不需要另外處理。
</div>

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
提示 1 是這題的重點：選填的欄位，就是不要加 required。而 min 和 max 有一個貼心的設計：如果欄位是空的，它們不會報錯，所以「沒填就算了，填了就要合法」這個需求，只要不加 required 就自然成立。

提示 3 是 Angular 的一個型別技巧：fb.nonNullable.group 建立的表單，reset 之後會回到初始值，而不是 null，型別也是 string 而不是 string | null，之後取值時不用一直判斷 null。

提示 5 的 markAllAsTouched 很實用：按送出時，還沒點過的欄位不會顯示錯誤，呼叫它之後，所有欄位都變成「已經點過」，紅字就會一次全部出現。
-->

---
layout: default
---

# 練習 1：完整解答（TypeScript）

```typescript
// respondent-form.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialogs } from './dialogs';

@Component({
  selector: 'app-respondent-form',
  imports: [ReactiveFormsModule],
  templateUrl: './respondent-form.html',
})
export class RespondentForm {
  private fb = inject(FormBuilder);
  private dialogs = inject(Dialogs);

// ... 見下一頁
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
next 方法的流程是：先 markAllAsTouched 讓所有欄位顯示紅字；再逐一檢查，把每個問題的訊息放進 problems 陣列；最後如果有問題，用 alert 一次列出，並且 return，不往下走。
-->

---
layout: default
---

# 練習 1：完整解答（TypeScript）（續）

```typescript
  // ... 接上一頁

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^09\d{8}$/)]],
    email: ['', [Validators.required, Validators.email]],
    age: [null as number | null, [Validators.min(1), Validators.max(120)]],
  });

  // ... 見下一頁
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
沒問題的話，才會繼續：目前只是 console.log，第 59 章會把它送到後端暫存。
-->

---
layout: default
---

# 練習 1：完整解答（TypeScript）（續）

```typescript
// ... 接上一頁

  async submit() {
    this.form.markAllAsTouched();
    const c = this.form.controls;
    const problems: string[] = [];
    if (c.name.invalid) problems.push('請輸入姓名');
    if (c.phone.invalid) problems.push('手機格式錯誤（09 開頭，共 10 碼）');
    if (c.email.invalid) problems.push('Email 格式錯誤');
    if (c.age.invalid) problems.push('年齡需介於 1 到 120');
    if (problems.length) { await this.dialogs.alert(problems); return; }
    console.log('通過驗證：', this.form.getRawValue());
  }
}
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這裡的 alert 是 await，因為它回傳 Promise，等使用者按下「知道了」才繼續。
-->

---
layout: default
---

# 練習 1：完整解答（HTML）

```html
<!-- respondent-form.html -->
<form [formGroup]="form" (ngSubmit)="submit()">
  <label>姓名 <input formControlName="name" /></label>
  @if (form.controls.name.invalid && form.controls.name.touched) {
    <small class="error">請輸入姓名</small>
  }

  <label>手機 <input formControlName="phone" /></label>
  @if (form.controls.phone.invalid && form.controls.phone.touched) {
    <small class="error">手機格式錯誤（09 開頭，共 10 碼）</small>
  }
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
HTML 的模式很固定：每個欄位一個 input，下面一個 @if 判斷 invalid 而且 touched，才顯示錯誤訊息。

送出按鈕故意「不」加 disabled：需求文件要的是按下去之後，用提醒視窗告訴使用者所有問題，如果按鈕被停用，使用者反而不知道為什麼不能往下。這是把「防呆」與「友善」拿捏取捨的一個例子。
-->

---
layout: default
---

# 練習 1：完整解答（HTML）（續）

```html
  <label>Email <input formControlName="email" /></label>
  @if (form.controls.email.invalid && form.controls.email.touched) {
    <small class="error">Email 格式錯誤</small>
  }

  <label>年齡（選填） <input type="number" formControlName="age" /></label>
  @if (form.controls.age.invalid && form.controls.age.touched) {
    <small class="error">年齡需介於 1 到 120</small>
  }

  <button type="submit">送出</button>
</form>
```

<div class="mt-4 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>成功標準：</b> 全部空白按「送出」→ 提醒視窗列出 3 個問題（年齡不在其中）；手機輸入 <code>123</code>、Email 輸入 <code>abc</code> → 對應問題出現；年齡輸入 <code>200</code> → 多一個問題；四個欄位都合法 → 主控台印出表單值。
</div>

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
驗收時，特別確認年齡是空的時候不會報錯。
-->

---
layout: default
---

# 練習 2：自訂驗證器 — 日期區間
### 任務說明

後台「新增問卷」的基本資料，有跨欄位的規則，內建驗證器做不到，需要**自訂驗證器**：

1. 表單欄位：`title`（必填，最多 50 字）、`startDate`、`endDate`，預設 **今天 + 2**、**今天 + 7**
2. 自訂驗證器 `startAfterToday`（欄位層級）：開始日期必須**晚於今天**
3. 自訂驗證器 `endNotBeforeStart`（**表單層級**）：結束日期不能早於開始日期
4. 兩個驗證器的錯誤都要在畫面上顯示對應的訊息
5. 通過驗證後，把日期用 `yyyy-MM-dd` 字串印出（**不能**用 `toISOString()`）

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
第二個練習是自訂驗證器。需求文件對日期有兩條規則：開始日期必須晚於今天、結束日期不能早於開始日期。第一條只看一個欄位，可以寫成欄位層級的驗證器；第二條要同時比較兩個欄位，所以必須寫在整個表單（FormGroup）層級。

自訂驗證器的本質很簡單：它就是一個函式，接收一個控制項，回傳 null 代表通過，回傳一個物件代表失敗，物件的 key 就是錯誤名稱，畫面上用這個名稱判斷要顯示哪個訊息。

第 5 點是預告過的坑：toISOString 是 UTC 時間，台灣早上 8 點以前會差一天，所以要自己用年月日組字串。
-->

---
layout: default
---

# 練習 2：解題提示

1. 驗證器的型別：`ValidatorFn = (control: AbstractControl) => ValidationErrors | null`
2. 欄位層級：`control.value` 就是日期，通過回傳 `null`，失敗回傳 `{ startNotAfterToday: true }`
3. 表單層級：`control` 是整個 `FormGroup`，用 `control.get('startDate')?.value` 取得兩個欄位；錯誤放在**表單**上（`form.errors`）
4. 表單層級驗證器要放在 `fb.group(controls, { validators: [...] })` 的第二個參數
5. 日期比較先把時間歸零（`setHours(0,0,0,0)`），避免「今天」比今天早
6. `Date` 轉字串：`` `${y}-${pad(m)}-${pad(d)}` ``，月份 `getMonth()` 要 +1

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
欄位層級與表單層級的差別：欄位層級的驗證器掛在單一個 FormControl 上，錯誤也記錄在那個控制項；表單層級的驗證器掛在 FormGroup 上，可以看到所有子欄位，錯誤記錄在整個表單，所以畫面上要用 form.errors?.['endBeforeStart'] 來判斷。

日期比較有一個容易忽略的細節：Date 物件含有時間，今天早上 10 點建立的 new Date()，比今天凌晨 0 點的日期物件晚。所以比較之前，一律先把時間歸零。
-->

---
layout: default
---

# 練習 2：完整解答

```typescript
// survey-validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const startOfDay = (d: Date) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };

/** 欄位層級：開始日期必須晚於今天 */
export const startAfterToday: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  if (!c.value) return null;
  return startOfDay(c.value) > startOfDay(new Date()) ? null : { startNotAfterToday: true };
};

/** 表單層級：結束日期不能早於開始日期 */
export const endNotBeforeStart: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const s = form.get('startDate')?.value, e = form.get('endDate')?.value;
  if (!s || !e) return null;
  return startOfDay(e) >= startOfDay(s) ? null : { endBeforeStart: true };
};

/** Date → 'yyyy-MM-dd'（用本地時間，避免 toISOString 造成差一天） */
export function toDateString(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
兩個驗證器都是純函式，可以放在獨立的檔案，之後在前台與後台都能重複使用。

startAfterToday 只看自己的值；endNotBeforeStart 從整個表單裡用 get 取出兩個欄位來比較。注意如果任何一個日期沒有值，直接回傳 null（通過）：「沒填」是 required 驗證器的責任，自訂驗證器只管「有值時對不對」，職責要分清楚。
-->

---
layout: default
---

# 練習 2：完整解答（續）

```typescript
// survey-basic-form.ts（表單定義）
const addDays = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return d; };

form = this.fb.nonNullable.group({
  title: ['', [Validators.required, Validators.maxLength(50)]],
  startDate: [addDays(2), [Validators.required, startAfterToday]],
  endDate: [addDays(7), Validators.required],
}, { validators: [endNotBeforeStart] });

// 驗證通過後
console.log(toDateString(this.form.controls.startDate.value));
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
toDateString 用 getFullYear、getMonth、getDate 這些本地時間的方法組字串，就不會有 UTC 差一天的問題。padStart(2, '0') 把個位數月份、日期補成兩位。
-->

---
layout: default
---

# 練習 2：完整解答（HTML 與驗收）

```html
<!-- survey-basic-form.html（日期欄位用 mat-datepicker，值就是 Date 物件） -->
<form [formGroup]="form">
  <mat-form-field>
    <mat-label>問卷名稱</mat-label>
    <input matInput formControlName="title" />
  </mat-form-field>
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
畫面上，欄位層級的錯誤用 form.controls.startDate.errors，表單層級的錯誤用 form.errors。errors 的 key 就是驗證器回傳物件的 key，這是自訂驗證器和畫面之間的約定。
-->

---
layout: default
---

# 練習 2：完整解答（HTML 與驗收）（續）

```html
  <mat-form-field>
    <mat-label>開始日期</mat-label>
    <input matInput [matDatepicker]="sp" formControlName="startDate" />
    <mat-datepicker-toggle matIconSuffix [for]="sp" /><mat-datepicker #sp />
  </mat-form-field>
  @if (form.controls.startDate.errors?.['startNotAfterToday']) {
    <small class="error">開始日期必須晚於今天</small>
  }
```

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
（接續上一頁。）
-->

---
layout: default
---

# 練習 2：完整解答（HTML 與驗收）（續）

```html
  <mat-form-field>
    <mat-label>結束日期</mat-label>
    <input matInput [matDatepicker]="ep" formControlName="endDate" />
    <mat-datepicker-toggle matIconSuffix [for]="ep" /><mat-datepicker #ep />
  </mat-form-field>
  @if (form.errors?.['endBeforeStart']) {
    <small class="error">結束日期不能早於開始日期</small>
  }
</form>
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 元件的 <code>imports</code> 要有 <code>ReactiveFormsModule</code>、<code>MatFormFieldModule</code>、<code>MatInputModule</code>、<code>MatDatepickerModule</code>，<code>app.config.ts</code> 要有 <code>provideNativeDateAdapter()</code>（第 35 章）。
</div>

<div class="mt-2 p-3 bg-green-50 border-l-4 border-green-400 text-gray-700 text-sm text-left">
✅ <b>成功標準：</b> 預設值（今天 + 2、+ 7）沒有錯誤；開始日期改成今天 → 出現「必須晚於今天」；結束日期改成比開始日期早 → 出現「不能早於開始日期」；<code>toDateString</code> 印出的日期在早上 8 點以前也是正確的那一天。
</div>

<style>
.slidev-layout p, .slidev-layout li, .slidev-layout td, .slidev-layout th { font-size: 15px !important; line-height: 1.45 !important; }
.slidev-layout td, .slidev-layout th { padding: 4px 8px !important; }
.slidev-layout .text-sm { font-size: 14px !important; line-height: 1.4 !important; }
.slidev-layout .slidev-code-wrapper { max-width: none !important; }
.slidev-layout pre, .slidev-layout .shiki, .slidev-layout .slidev-code { padding: 0.7rem 1.2rem !important; width: calc(100% + 3rem) !important; margin-right: -3rem !important; }
.slidev-layout pre code, .slidev-layout .shiki code, .slidev-layout .line { font-size: 12.5px !important; line-height: 1.3 !important; }
</style>

<!--
這一章做的驗證，只是「前端的便利」，讓使用者盡早知道問題。後端一定還會再驗證一次，因為前端可以被繞過。這就是為什麼 Spring Boot 課也做了同樣的規則。
-->

---
layout: end
---

# 課程結束

### 透過 Validators 設定驗證規則、搭配 .invalid 讀取狀態，確保表單資料完整且正確後再送出

<!--
這一章我們學會了怎麼替 Reactive Forms 的欄位加上驗證規則，從單一驗證器到組合多個規則，也認識了 8 個最常用的內建 Validators，還深入了解 pattern 搭配正規表達式的用法。

最後我們學會怎麼讀取驗證狀態，搭配 invalid、touched 這些屬性，在畫面上適當的時機顯示錯誤訊息，讓使用者知道哪裡填錯了。到這裡，大家已經具備了做出一份「結構清楚、驗證完整」的表單所需要的全部工具，可以自己動手試著做一個包含多種驗證規則的表單練習看看。
-->
