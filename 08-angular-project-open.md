---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 開啟 Angular 專案
routeAlias: ch08
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
    Angular Full-Stack Masterclass
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.8rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    開啟 Angular 專案
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「打開專案，從第一個元件開始！」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
大家好！在前幾章我們完成了環境安裝：Node.js、Angular CLI、VS Code 都就位了。
今天這一章，我們要把這些工具串起來，實際打開剛建好的 Angular 專案，認識三個核心動作——
用 VS Code 開專案、用指令建立元件、以及快速設定路由。
這三步做完，一個最基本的多頁面 Angular 應用就成形了！
更深入的細節，我們會在後面的章節一一拆解。
-->

---
layout: default
---

# Outline

- **用 VS Code 開啟 Angular 專案**
- **使用 `ng g c` 建立 Angular 元件**
- **常見錯誤排除：PowerShell 指令碼執行原則**
- **快速設定 Route**
- **使用 `ng s` 啟動開發伺服器**

<!--
今天的主題，每個都只點到為止，讓你知道「怎麼做」。
中間還會穿插一個 Windows 上很常遇到的錯誤排除——PowerShell 不讓 ng 執行。
背後的原理和更多用法，後面章節會深入說明。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 用 VS Code 開啟 Angular 專案
# Open Project in VS Code

<!--
第一步：把你的 Angular 專案在 VS Code 裡打開來。
-->

---

# 方法一：使用終端機指令

在終端機 / 命令提示字元中，先 `cd` 到你的專案資料夾，再執行：

```bash
code .
```

<div class="mt-6 p-4 bg-teal-50 border-l-4 border-teal-500 text-gray-700 text-sm text-left">
💡 <b>code .</b> 指令會直接用 VS Code 開啟「目前資料夾」，是最快速的方式
</div>

| 步驟 | 指令 | 說明 |
| --- | --- | --- |
| 1 | `cd 專案資料夾路徑` | 切換到 Angular 專案目錄 |
| 2 | `code .` | 用 VS Code 開啟此資料夾 |

<!--
這是最常用的方式。
只要在終端機裡先 cd 進去你的專案，再打 code 一個點，VS Code 就會自動彈出來，而且左側的檔案總管已經幫你定位到這個專案了。
-->

---

# 方法二：從 VS Code 內開啟

直接在 VS Code 介面操作，不用打指令：

<div class="mt-4 grid grid-cols-2 gap-6">
  <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div class="font-bold text-teal-700 mb-2">選單開啟</div>
    <ol class="text-sm space-y-1 text-gray-700 list-decimal list-inside">
      <li>點選上方選單 <b>File</b></li>
      <li>選擇 <b>Open Folder...</b></li>
      <li>選取 Angular 專案資料夾</li>
      <li>點擊「選擇資料夾」</li>
    </ol>
  </div>
  <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div class="font-bold text-teal-700 mb-2">快速鍵</div>
    <div class="text-sm text-gray-700 space-y-2">
      <div><b>Windows：</b> <code>Ctrl + K, Ctrl + O</code></div>
      <div><b>macOS：</b> <code>⌘K, ⌘O</code></div>
    </div>
  </div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 開啟後，左側「檔案總管」會顯示 Angular 專案的完整結構（<code>src/</code>、<code>package.json</code> 等）
</div>

<!--
如果你還不習慣用指令，直接從選單開啟也完全沒問題。
兩種方式效果完全一樣，選你喜歡的就好。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 使用 `ng g c` 建立 Angular 元件
# Generate Component

<!--
開好專案，第二步就是建立元件。
Angular 的精髓就是把 UI 切成一個一個可重複使用的元件。
-->

---

# `ng g c` — 快速建立元件

在 VS Code 的**內建終端機**中輸入：

```bash
ng generate component 元件名稱
# 縮寫
ng g c 元件名稱
```

**範例：建立一個首頁元件**

```bash
ng g c home
```

執行後，Angular CLI 會自動在 `src/app/` 下建立四個檔案：

```
src/app/home/
  ├── home.component.ts       ← 邏輯（TypeScript）
  ├── home.component.html     ← 畫面（HTML 模板）
  ├── home.component.css      ← 樣式（CSS）
  └── home.component.spec.ts  ← 測試檔
```

<div class="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 元件的詳細結構與使用方式，將在後續章節深入說明
</div>

<!--
ng g c 是 Angular CLI 最常用的指令之一。
它幫你一次建好四個檔案，而且會自動幫你設定好基本的 decorator 和 class，省去手動建檔的麻煩。
以後建立每一個新頁面或可重複使用的 UI 區塊，都是用這個指令。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 常見錯誤排除
# Fix PowerShell Execution Policy

<!--
在 Windows 上執行 ng 指令，很多人第一次就會撞到這個錯誤。
這一段我們專門來解決它。
-->

---

# 錯誤：無法載入 `ng.ps1`（指令碼執行被停用）

在 Windows PowerShell 執行 `ng g c home` 時，可能出現：

```text {all}
ng : 因為這個系統上已停用指令碼執行，所以無法載入
C:\nvm4w\nodejs\ng.ps1 檔案。
如需詳細資訊，請參閱 about_Execution_Policies，
網址為 https://go.microsoft.com/fwlink/?LinkID=135170。
位於 線路:1 字元:1
+ ng g c home
+ ~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

<div class="mt-4 p-3 bg-amber-50 border-l-4 border-amber-500 text-gray-700 text-sm text-left">
⚠️ 這 <b>不是</b> Angular 壞掉，而是 <b>Windows PowerShell 的安全機制</b>：預設的「執行原則（Execution Policy）」會封鎖 <code>.ps1</code> 指令碼，連帶讓 <code>ng</code> 無法執行
</div>

<!--
先讓大家安心：這個錯誤跟 Angular 本身一點關係都沒有。
ng 在 Windows 上其實是一個 ng.ps1 的 PowerShell 指令碼。
PowerShell 預設的執行原則是 Restricted，會擋掉所有 .ps1，所以 ng 就被連帶擋下來了。
下一頁我們看怎麼解。
-->

---

# 解法一（推薦）：放寬目前使用者的執行原則

開啟 **PowerShell**，執行以下指令（**不需要**系統管理員權限）：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

出現確認提示時，輸入 `Y` 後按 <kbd>Enter</kbd>。完成後重新執行 `ng` 即可。

```powershell
# 確認目前設定（可選）
Get-ExecutionPolicy -List
```

| 執行原則 | 說明 |
| --- | --- |
| `Restricted` | 預設值，**完全禁止**執行指令碼（就是它擋住 ng） |
| `RemoteSigned` | 允許本機指令碼；網路下載的需有簽章（**推薦**） |
| `-Scope CurrentUser` | 只影響「目前使用者」，較安全、不需管理員 |

<div class="mt-3 p-3 bg-teal-50 border-l-4 border-teal-500 text-gray-700 text-sm text-left">
💡 <code>RemoteSigned</code> 在「方便」與「安全」之間取得平衡，是官方建議給開發者的設定
</div>

<div class="mt-2 p-3 bg-gray-50 border-l-4 border-gray-400 text-gray-700 text-sm text-left">
🔸 也可以直接用 <code>Set-ExecutionPolicy RemoteSigned</code>（不加 <code>-Scope</code>）。但它預設套用到 <b>LocalMachine（整台機器）</b>，必須<b>以系統管理員身分執行 PowerShell</b>，否則會出現「存取被拒」
</div>

<!--
最推薦的做法就是這一行。
重點是 -Scope CurrentUser，它只改你自己這個帳號，不用開系統管理員、也不會影響整台電腦，相對安全。
RemoteSigned 的意思是：自己本機寫的指令碼可以跑，從網路下載的則要有數位簽章，這是官方建議給開發者的等級。
跑完輸入 Y 確認，ng 就活過來了。
-->

---

# 其他解法：用 CMD，或臨時放行

<div class="grid grid-cols-2 gap-6 mt-2">
  <div class="p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
    <div class="font-bold text-teal-700 mb-2">解法二：改用「命令提示字元 cmd」</div>
    <div class="text-sm text-gray-700 mb-2">cmd 不受 PowerShell 執行原則限制，直接執行即可：</div>

```bat
ng g c home
```

  <div class="text-xs text-gray-500 mt-2">在 VS Code 終端機可點右側下拉切換成 <b>Command Prompt</b></div>
  </div>
  <div class="p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
    <div class="font-bold text-teal-700 mb-2">解法三：只在這個視窗臨時放行</div>
    <div class="text-sm text-gray-700 mb-2">不改全域設定，只對「目前這個 PowerShell 程序」生效：</div>

```powershell
Set-ExecutionPolicy `
  -ExecutionPolicy RemoteSigned `
  -Scope Process
```

  <div class="text-xs text-gray-500 mt-2">關閉視窗後即失效，最不影響系統</div>
  </div>
</div>

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 三種方法擇一即可。長期開發建議用<b>解法一</b>一勞永逸；只想趕快跑一次就用<b>解法二或三</b>
</div>

<!--
如果你不想動 PowerShell 的設定，這裡有兩個替代方案。
解法二最直覺：在 VS Code 終端機右上角的下拉選單，把 PowerShell 換成 Command Prompt，cmd 不吃這套執行原則，直接就能跑。
解法三是只對目前這個視窗臨時放行，用 -Scope Process，視窗一關就恢復，對系統影響最小。
三選一就好，看你的需求。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 快速設定 Route
# Quick Routing Setup

<!--
有了元件，第三步就是讓這個元件能被「路由」到——也就是設定網址對應哪個畫面。
-->

---

# 快速設定 Route

Angular 的路由設定在 `src/app/app.routes.ts`：

```ts {all}
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
];
```

接著在 `app.component.html` 中加入路由出口：

```html
<router-outlet />
```

<div class="mt-4 p-3 bg-teal-50 border-l-4 border-teal-500 text-gray-700 text-sm text-left">
💡 <b>path</b> 對應瀏覽器的網址路徑，<b>component</b> 指定要顯示的元件<br>
更完整的路由設定（巢狀路由、參數、Guard 等）將在後續路由章節詳細說明
</div>

<!--
這是最基本的路由設定。
你只需要把元件 import 進來，然後在 routes 陣列裡加一個物件：path 是網址、component 是要顯示的元件。
app.component.html 裡的 router-outlet 就是「頁面切換的舞台」，Angular 會把對應的元件渲染在這裡。
更進階的路由功能——懶加載、路由守衛、巢狀路由——我們後面會有專門的章節來說明。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 使用 `ng s` 啟動開發伺服器
# Start the Dev Server

<!--
元件、路由都好了，最後一步——把開發伺服器跑起來，在瀏覽器看到成果。
-->

---

# `ng serve` — 啟動本機開發伺服器

在 VS Code 的**內建終端機**、並 `cd` 到專案資料夾後，執行：

```bash
ng serve
# 縮寫
ng s
```

啟動成功後，終端機會顯示類似訊息：

```text
Watch mode enabled. Watching for file changes...
➜  Local:   http://localhost:4200/
```

接著在瀏覽器開啟 **`http://localhost:4200`** 就能看到你的頁面！

<div class="mt-3 grid grid-cols-2 gap-4">
  <div class="p-3 bg-teal-50 border-l-4 border-teal-500 text-gray-700 text-sm text-left">
    🔥 <b>熱重載 (HMR)</b>：改完程式碼存檔，瀏覽器會自動更新，不必手動重整
  </div>
  <div class="p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
    ⛔ 要停止伺服器：在終端機按 <kbd>Ctrl</kbd> + <kbd>C</kbd>
  </div>
</div>

<!--
ng serve 會編譯你的專案，並在本機啟動一個開發伺服器，預設網址是 localhost 冒號 4200。
最棒的是它有熱重載：你一邊改程式碼一邊存檔，瀏覽器就自動更新，開發體驗非常順。
記得，如果這一步也跳出 ng.ps1 的執行原則錯誤，回到前面那幾頁的解法處理就好。
要關掉伺服器，在終端機按 Ctrl + C。
-->

---

# `ng serve` 常用參數

| 指令 | 作用 |
| --- | --- |
| `ng serve` | 以預設設定啟動（`localhost:4200`） |
| `ng s -o` | 啟動後**自動開啟瀏覽器**（`--open`） |
| `ng s --port 4300` | 指定其他**埠號**（預設 4200 被占用時很實用） |
| `ng s --host 0.0.0.0` | 讓**區網其他裝置**也能連線測試 |

<div class="mt-4 p-3 bg-amber-50 border-l-4 border-amber-500 text-gray-700 text-sm text-left">
⚠️ 若出現 <code>Port 4200 is already in use</code>，代表埠號被占用，改用 <code>--port</code> 換一個即可
</div>

<div class="mt-3 p-3 bg-teal-50 border-l-4 border-teal-500 text-gray-700 text-sm text-left">
💡 最常用的組合就是 <code>ng s -o</code>，一行指令幫你啟動 + 開瀏覽器
</div>

<!--
這裡列幾個最常用的參數。
最實用的是 ng s -o，啟動完直接幫你把瀏覽器打開，省一個動作。
如果 4200 被別的程式占用，用 --port 換一個埠號就好。
--host 0.0.0.0 則是讓你手機或同網段的其他電腦也能連進來測試，做 RWD 的時候很方便。
-->

---

# 本章流程回顧

<div class="mt-4 grid grid-cols-4 gap-3">
  <div class="p-3 bg-teal-50 border-2 border-teal-300 rounded-xl text-center">
    <div class="text-3xl font-black text-teal-600 mb-2">①</div>
    <div class="font-bold text-teal-800 mb-1">開啟專案</div>
    <div class="text-sm text-gray-600"><code>code .</code><br>或 File → Open Folder</div>
  </div>
  <div class="p-3 bg-blue-50 border-2 border-blue-300 rounded-xl text-center">
    <div class="text-3xl font-black text-blue-600 mb-2">②</div>
    <div class="font-bold text-blue-800 mb-1">建立元件</div>
    <div class="text-sm text-gray-600"><code>ng g c 元件名稱</code><br>自動產生四個檔案</div>
  </div>
  <div class="p-3 bg-purple-50 border-2 border-purple-300 rounded-xl text-center">
    <div class="text-3xl font-black text-purple-600 mb-2">③</div>
    <div class="font-bold text-purple-800 mb-1">設定路由</div>
    <div class="text-sm text-gray-600"><code>app.routes.ts</code><br>加上 router-outlet</div>
  </div>
  <div class="p-3 bg-orange-50 border-2 border-orange-300 rounded-xl text-center">
    <div class="text-3xl font-black text-orange-600 mb-2">④</div>
    <div class="font-bold text-orange-800 mb-1">啟動伺服器</div>
    <div class="text-sm text-gray-600"><code>ng s</code><br>瀏覽 localhost:4200</div>
  </div>
</div>

<div class="mt-5 p-3 bg-amber-50 border-l-4 border-amber-500 text-gray-700 text-sm text-left">
🛠️ 若 <code>ng</code> 在 Windows PowerShell 跳出「指令碼執行被停用」錯誤，先執行 <code>Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code>
</div>

<div class="mt-3 p-3 bg-green-50 border-l-4 border-green-500 text-gray-700 text-sm text-left">
✅ 這幾個步驟完成後，就能在瀏覽器看到你建立的頁面了！更深入的功能將在後續章節一一介紹。
</div>

<!--
好，我們今天的步驟就是這樣：開專案、建元件、設路由，最後用 ng s 啟動伺服器。
中間如果在 Windows 上撞到 PowerShell 的執行原則錯誤，記得那一行 Set-ExecutionPolicy 就能解決。
每一步做完，你的 Angular 應用就能在瀏覽器跑起來看到畫面了。
後面我們還有很多章節要一起玩，今天先記住這幾個基本動作！
-->

---
layout: end
---

# 開始動手吧！
### 打開你的 Angular 專案，建立第一個元件！

<!--
恭喜大家學完了這一章的三個核心動作！
現在去試試看，打開你的 Angular 專案，執行 ng g c，看看 CLI 幫你生出了什麼。
下一章我們進入 HTML 基礎，讓你的元件畫面能有內容可以呈現！
-->
