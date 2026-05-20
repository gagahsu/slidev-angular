---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: Angular 降版
routeAlias: ch06
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
    Angular 降版
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「切換到 Angular 19，讓專案與套件版本相互對應」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
哈囉大家！今天我們要來聊一個聽起來很像在「走回頭路」，但實際上在業界超常用、超救命的技能——那就是「降版」！
寫程式不是打遊戲，不是永遠追求最新、最炫就是贏家。
有時候最新版的 Angular 太前衛了，很多好用、穩定的第三方套件還跟不上它的腳步。
為了不讓系統崩潰，我們必須學會如何精準地搭乘「時光機」，退回到最合適的穩定舊版本。
今天學完這堂課，以後你看到「版本不相容」的紅色報錯時，就不會再嚇得手忙腳亂，而是能優雅地切換環境！
-->

---
layout: default
---

# Outline

- **1. 為什麼需要降版** — 常見情境與需求
- **2. 版本管理概念** — CLI、Core、RxJS、TypeScript 的對應關係
- **3. 降版流程** — 三步驟：確認版本、移除 CLI、重新安裝
- **4. 降版注意事項** — 套件相容性問題與處理方式

<!--
今天我們的時光旅行有三個停靠站：
第一，搞懂為什麼大家都在往前衝，我們卻要往回走？
第二，理解 Angular 複雜的版本「朋友圈關係」。
第三，手把手帶大家操作一次「降版三部曲」。
這是一堂教你當你發現最新版（未來）太危險時，如何安全地退回穩定版（過去）的求生課程！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 1. 為什麼需要降版？
# Why Downgrade?

<!--
首先，第一站：為什麼要降版？為什麼最新版不香了？
-->

---

# 為什麼需要降版？

| 情境 | 說明 |
| --- | --- |
| 套件不相容 | 專案使用了與新版 Angular 不相容的套件 |
| 團隊架構考量 | 既有架構與 Angular 19 相容性較高 |
| CI/CD 環境限制 | 建置環境尚未支援新版 Angular |
| 避免升級成本 | 想避免不必要的重大版本升級風險 |
| 新版功能變更 | 特定功能在新版遭移除/變更，希望保留 Angular 19 行為 |

<!--
降版在業界，通常是為了「活下去」。
我們用一個日常生活的痛點來比喻。
就像你的手機系統突然更新了最新作業系統，結果你最愛的寶可夢遊戲或是 LINE 卻天天閃退。這時候你肯定會想：「天啊，如果能降回去上一版就好了！」
在寫程式時也一樣，最常見的兇手就是「第三方套件不支援」。
有些大廠出的地圖工具、圖表工具可能半年或一年才更新一次。如果你的 Angular 引擎衝得比高鐵還快，套件根本跟不上，兩邊就會在電腦裡吵架。
在業界，**「穩定性」絕對大於「新奇感」**。
寧可系統乖乖地跑，也絕對不要因為用了最新版而天天半夜被叫起來維修！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 2. Angular 版本管理概念
# Version Management

<!--
在動手拆機器之前，我們得先來釐清 Angular 龐大的「家族關係圖」。
-->

---

# Angular 版本管理概念

| 概念 | 說明 |
| --- | --- |
| 套件相互對應 | Angular CLI、Angular Core、RxJS、TypeScript 版本需彼此對應 |
| 全域 CLI 影響指令 | 全域安裝的 `@angular/cli` 決定 `ng` 指令的行為 |
| 專案版本以 package.json 為準 | 實際執行版本由專案的 `package.json` 決定 |
| 降版 = 三步調整 | 調整 CLI + 調整專案套件版本 + 重新安裝依賴 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>關鍵：</b> 全域 CLI 與專案版本是獨立的，兩者都需要調整才能正確降版。
</div>

<!--
Angular 的版本管理，不是只有改一個數字那麼簡單，它其實是一整組「聯名套裝」。
這就像是拼樂高積木，你得搭配對應規格的卡榫。
比如 Angular 19 必須配對特定版本的 TypeScript 和 RxJS。如果你的核心用 19，卻裝了最新版 21 的 TypeScript，這兩個零件根本合不起來，電腦就會崩潰。
新手最容易犯的錯是：以為只要在命令提示字元把「全域的 ng 指令」降版，專案就會自動降版。
大錯特錯！全域的工具只是「蓋房子的工人」，專案裡的 `package.json` 才是「房子的合約書」。
我們真正要改的是合約書（`package.json`）裡的規定，這才是真正的降版！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 3. 降版流程
# Downgrade Steps

<!--
好，學完了觀念，現在我們啟動時光機，開始降版實作！
-->

---

# 步驟 1：確認目前版本

降版前先確認目前安裝的 Angular 版本：

```bash
ng version
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>用途：</b> 確認全域 CLI 版本、Angular Core 版本、Node.js 版本等，作為降版前的基準記錄。
</div>

<!--
步驟一：出發前，先給自己拍張照，確認你現在在哪個時空。
我們在黑視窗輸入 `ng version`。
這時候它會噴出一大堆資料，包括你的作業系統、Node.js 版本，以及最重要的全域 Angular CLI 版本。
我強烈建議各位把這個畫面截圖下來。
這就像是在時光旅行前記錄坐標，萬一等一下你玩壞了，我們才知道原本的坐標在哪裡，才好救回來。
-->

---

# 步驟 2：移除全域 Angular CLI

移除目前安裝的全域 Angular CLI：

```bash
npm uninstall -g @angular/cli
```

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>注意：</b> 移除後 <code>ng</code> 指令暫時無法使用，需完成步驟 3 後才會恢復。
</div>

<!--
步驟二：把舊的（或太新的）工人請走。
我們輸入 `npm uninstall -g @angular/cli`。
這行指令是把電腦裡原有的、全域的 Angular CLI 助手給「解除安裝」。
千萬要記得加 `-g` 喔！不然它會刪錯地方。
刪完之後，你如果輸入 `ng`，電腦會一臉懵懂地回答你「找不到此指令」。
別慌！這很正常。
有些同學會哭著來找我說：「老師！我的專案被我刪掉了嗎？」
沒有！這只是把你電腦的「起子/扳手」收走，你的房子（專案檔案）依然好好地在那裡，一根毛都沒少！
-->

---

# 步驟 3：安裝 Angular 19 並建立專案

使用 `npx` 直接以指定版本建立新專案，無需重新全域安裝：

```bash
npx @angular/cli@19 new my-app-19
```

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>說明：</b> <code>npx</code> 會臨時下載並執行指定版本的 Angular CLI，專案建立後即可在 <code>package.json</code> 中確認版本是否正確。
</div>

<!--
步驟三：臨時徵調工人，來蓋特定版本的房子！
這招是現代前端的「高級外掛」——使用 **npx**。
我們輸入 `npx @angular/cli@19 new my-app-19`。
這個 `npx` 的意思就是：「電腦啊！請你幫我臨時召喚 19 版的 Angular 機器人過來，幫我蓋一棟叫 `my-app-19` 的房子，蓋好之後就讓它消失，不用安裝在我的全域電腦裡佔空間。」
這招超好用！
你的電腦就不會塞滿各種舊版新版的工具，需要用的時候「隨調隨用」，超級乾淨優雅！
-->

---

# package.json 版本確認 — dependencies

安裝完成後，確認 `package.json` 中的 `dependencies` 版本：

```json
"dependencies": {
  "@angular/cdk": "^19.2.19",
  "@angular/common": "^19.2.0",
  "@angular/compiler": "^19.2.0",
  "@angular/core": "^19.2.0",
  "@angular/forms": "^19.2.0",
  "@angular/material": "^19.2.19",
  "@angular/platform-browser": "^19.2.0",
  "@angular/router": "^19.2.0"
```

<!--
別墅蓋好了！我們現在開門進去拿著清單驗收。
在 VS Code 打開 `package.json` 檔案，拉到 `dependencies`（專案相依性）這一區。
看看 `@angular/core`、`@angular/common` 的冒號後面，是不是寫著 `^19.x.x`？
如果是，那就代表你已經成功登陸了 19 版的星球！
如果上面寫的是 20 或 21，別懷疑，你剛剛一定是打錯字了，我們重來一次。
-->

---

# package.json 版本確認 — dependencies（續）& devDependencies

```json
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.15.0"
```

```json
"devDependencies": {
  "@angular-devkit/build-angular": "^19.2.19",
  "@angular/cli": "^19.2.19",
  "@angular/compiler-cli": "^19.2.0",
  "typescript": "~5.7.2"
}
```

<!--
順便檢查一下配角們，尤其是 RxJS 和 TypeScript。
如果你的 Angular 是 19 版，你的 TypeScript 版本通常要落在 5.7 左右。
這些配角就像是跟著 19 版一起來的「隨行隨從」。
如果隨從的版本不對，專案跑起來還是會像缺了顆螺絲一樣一直卡住，所以要習慣性瞄一眼它們的版本！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 4. 降版注意事項
# Known Issues

<!--
時光旅行雖然很酷，但往往伴隨著一些「副作用」，我們來看看降版有哪些雷點要注意。
-->

---

# 降版注意事項

| 問題類型 | 說明 |
| --- | --- |
| 套件相容性（最常見） | 第三方套件與降版後的 Angular 不相容 |
| TypeScript / RxJS 版本 | 套件編譯時依賴特定 TS / RxJS 版本 |
| Build pipeline 版本 | `builder` / `angular.json` 設定與版本不符 |
| Material / UI libs | 部分 UI 套件不支援舊版 Angular |
| 新功能反向不支援 | 使用到新版語法，降版後需調整 code |

<!--
降版之後最容易遇到的就是**「版本不合（Peer Dependencies 錯誤）」**。
這我們用生活例子來比喻：
就像你硬要把手機系統降版回 iPhone 4，然後你嘗試去 App Store 下載 2026 年最新版的 LINE，App Store 絕對會跳警告說：「此系統不支援此軟體」。
在程式裡也是！如果你把 Angular 降回 19，那你之前裝的一些最新版套件，也必須通通跟著降回支援 Angular 19 的「舊版本」。
如果不降，你一跑 `npm install`，電腦就會用一整片紅色的警告字體閃瞎你的雙眼！
-->

---

# 套件相容性問題

| 項目 | 說明 |
| --- | --- |
| 情境 | 降版後，第三方套件（charts、auth、firebase、UI libs 等）直接報錯或 build 失敗 |
| 原因 | 套件是為新版 Angular / TypeScript 編譯的，使用到 Angular 19 不支援的語法或 API |

常見錯誤訊息：

```bash
This version of XXX requires Angular >=20
NG0901: Unable to instantiate class...
```

<!--
當你看到這行報錯：`This version of XXX requires Angular >= 20`。
這就是套件在用哭腔對你喊：「大哥！我需要 20 版以上的 Angular 啊！你給我 19 版我不知道怎麼跑！」
這就跟拿著 PS5 的專屬光碟，硬要塞進 PS4 的光碟機裡一樣。
長度形狀看起來很像，但光碟機就是會直接把它吐出來，打死都不會動！
-->

---

# 套件相容性問題 — 處理方式

| 處理方式 | 說明 |
| --- | --- |
| 降版該套件 | 將第三方套件降版到與 Angular 19 相容的版本 |
| 查詢 release notes | 找到官方說明的「Angular 19 支援區間」 |
| 替換 library | 若無相容版本，需改用其他替代套件 |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>建議流程：</b> 先查套件官方文件確認支援版本 → 嘗試降版 → 若無解，評估替換方案。
</div>

<!--
那遇到這個問題，我們要怎麼破解？很簡單，有三招：
第一招：**「逼套件一起降級」**。去查該套件的文件，找它以前支援 Angular 19 的那個舊版本號，把它裝上去。
第二招：**「看履歷」**。去 GitHub 或 npm 的 Releases 頁面查，看它在哪一天寫說「Support Angular 19」，那個版本就是答案。
第三招：**「揮淚斬馬謖，換掉它」**。如果這個套件已好幾年沒更新，死活不支援，那就別熱臉貼冷屁股了，上網找其他功能類似但有在維護的代替品。
資深工程師在選套件時一定會看它的更新頻率，不常更新的套件就像定時炸彈，版本一動就會炸！
-->

---
layout: end
---

# 課程結束
### 掌握降版技巧，讓專案在正確的版本環境中穩定運行！

<!--
好啦，關於 Angular 降版這堂「時光旅行課」就上到這裡。
雖然聽起來像是在退步，但學會了這招，你才算真正擁有了掌控電腦開發環境的鑰匙！
大家下課可以想想看，如果一間公司要寫跑十年的大專案，你覺得他們會選剛出爐但套件都不能用的最新版，還是選生態系完整穩定的 19 版？
下一堂課，我們要回歸基本功，來認識網頁的骨架靈魂：HTML 囉！
-->
