---
theme: penguin
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: 終端機 / 命令提示字元
routeAlias: ch04
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
    Developer Tools
  </p>
  <h1 style="color: #1a5c5c; font-size: 3.2rem; font-weight: 900; line-height: 1.15; margin-bottom: 1.5rem;">
    終端機 / 命令提示字元
  </h1>
  <div style="height: 4px; width: 320px; background: linear-gradient(90deg, #5eada0, #a7d9d0); border-radius: 2px; margin-bottom: 1.5rem;"></div>
  <p style="color: #4a7c7c; font-size: 1.15rem; font-style: italic;">
    「前端開發必備工具，用指令控制你的電腦」
  </p>
  <Link to="home" style="color: #9dc4c4; font-size: 0.85rem; margin-top: 2rem; text-decoration: none; letter-spacing: 0.05em;">← 返回目錄</Link>
</div>

<!--
【開場白】
大家好！今天要來介紹一個新手看了都會怕的東西：那個「黑漆漆的視窗」。

【為什麼要學這個？】
很多人會問：我用滑鼠點一點不是很直覺嗎？為什麼要打字？
其實在開發者的世界裡，有些事情打字比用滑鼠快一百倍，而且很多強大的開發工具（像是 Angular）都沒有圖形介面，只能用指令來溝通。

【今天學完你會能做什麼】
今天結束後，你就不會再害怕這個視窗了。你會學會怎麼像電影裡的駭客一樣，用幾行指令就在資料夾之間跳來跳去、新增刪除檔案。
-->

---
layout: default
---

# Outline

- **1. 什麼是終端機** — Mac/Linux 終端機 vs Windows 命令提示字元
- **2. 常用指令對照** — MacOS/Linux 與 Windows 指令比較
- **3. cd 指令詳解** — 目錄切換的各種用法

<!--
【核心說明】
這堂課我們分三個部分。首先是認識你的作業系統配備的是哪一種視窗，接著學會最常用的「生存指令」，最後我們會花點時間練習最核心的 `cd` 切換指令。

【程式世界怎麼用】
這就像是學會如何在電腦的「地下通道」行走，一旦掌握了，你就不再需要依賴桌面上的圖示，可以更直接、更有效率地控制電腦。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 1. 什麼是終端機？
# Terminal / Command Prompt

<!--
【開場白】
我們先來幫這個視窗正名一下。
-->

---

# 什麼是終端機？

開發前端時一定會使用到的工具，用來透過**文字指令**操作電腦。

| 作業系統 | 工具名稱 | 底層系統 |
| --- | --- | --- |
| macOS | 終端機（Terminal） | Linux 系統 |
| Windows | 命令提示字元（cmd） | Windows |

<div class="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-gray-700 text-sm text-left">
💡 <b>為什麼要學：</b> Angular CLI、npm 指令等開發工具都需要透過終端機執行，是前端開發的必備技能。
</div>

<!--
【核心說明】
終端機本質上就是「直接跟作業系統說話」的對講機。

【生活化比喻】
滑鼠和視窗介面就像是「餐廳的點餐 App」，幫你包裝得漂漂亮亮的。而終端機就像是「直接走進廚房跟廚師下令」。雖然沒那麼漂亮，但你的指令可以非常精確、而且廚師會立刻執行。

⚠️ 學生常見誤解：
看到黑畫面不用緊張，它只是在等你說話而已。如果你什麼都沒打，它就什麼都不會做。

💼 業界實務：
現在很多開發者在 Windows 上會改用一個叫「PowerShell」或「Git Bash」的東西，但不管名稱叫什麼，核心的觀念都是一樣的。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 2. 常用指令對照
# Common Commands

<!--
【開場白】
既然要跟電腦溝通，我們就得學會它的語言。
-->

---

# 常用指令對照表

| 說明 | macOS / Linux | Windows |
| --- | --- | --- |
| 切換目錄 | `cd` | `cd` |
| 取得目前所在位置 | `pwd` | `chdir` |
| 列出目前的檔案列表 | `ls` | `dir` |
| 刪除檔案 | `rm` | `del` |

<!--
【核心說明】
不同作業系統的「方言」有點不一樣，這張表就是你的翻譯機。

【生活化比喻】
就像在台灣我們叫「土豆」是指花生，但在大陸「土豆」是指馬鈴薯。意思是一樣的，但字不一樣。

【程式世界怎麼用】
雖然字不一樣，但好消息是 `cd`（切換目錄）在所有系統都通用。我們最常用的也是這一個。

⚠️ 學生常見誤解：
如果你在 Windows 下輸入 `ls`（Mac 的指令），電腦會回你「找不到此指令」。別灰心，只是方言講錯了，換成 `dir` 就好。
-->

---

# 常用指令 — 範例（macOS / Linux）

```bash
# 切換到 projects 目錄
cd projects

# 查看目前位置
pwd

# 列出所有檔案
ls

# 刪除檔案
rm old-file.txt
```

<!--
【帶讀程式碼前的鋪陳】
我們來看看 Mac 或 Linux 使用者的一天。

【逐步解說】
首先 `cd projects` 是跳進專案資料夾。
如果你不知道現在人在哪，打個 `pwd`（Print Working Directory），電腦就會告訴你精確的地址。
`ls` 則是讓電腦把這裡的所有東西都排出來給你看。
最後 `rm`（Remove）就是要把那個 `old-file.txt` 丟進回收桶。

⚠️ 學生常見誤解：
注意！在終端機刪除檔案通常是「直接消失」，不會經過資源回收筒，所以下指令前要深呼吸。
-->

---

# 常用指令 — 範例（Windows）

```bash
# 切換到 projects 目錄
cd projects

# 查看目前位置
chdir

# 列出所有檔案
dir

# 刪除檔案
del old-file.txt
```

<!--
【帶讀程式碼前的鋪陳】
如果你是 Windows 用戶，雖然動作一樣，但指令長得稍微不同。

【逐步解說】
`chdir` 是 Change Directory 的縮寫，功能跟剛才的 `pwd` 一樣。
而大家最耳熟能詳的應該就是 `dir` 了，它會把資料夾裡的東西列表顯示。
刪除檔案則是 `del`（Delete）。

💼 業界實務：
如果你是 Windows 使用者，我也非常推薦學習 Mac/Linux 的指令（也就是 Unix-like 指令），因為以後如果你操作雲端伺服器，幾乎都是用那些指令喔！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 3. cd 指令詳解
# Directory Navigation

<!--
【開場白】
接下來，我們要專注練習最重要、也是最常出錯的指令：`cd`。
-->

---

# cd 指令用法

`cd`（change directory）是最常用的指令，用來切換目錄位置。

| 指令 | 說明 |
| --- | --- |
| `cd ..` | 返回上一層目錄 |
| `cd ~` | 返回家目錄（最上層，macOS/Linux） |
| `cd 路徑` | 移動到指定的路徑 |
| `D:` | 切換到 D 槽（Windows 切換硬碟專用） |

<div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-gray-700 text-sm text-left">
⚠️ <b>Windows 注意：</b> 要切換到其他硬碟時，不能用 <code>cd</code>，需直接輸入硬碟名稱，例如：<code>D:</code>
</div>

<!--
【核心說明】
`cd` 就像是電腦裡的「傳送門」。

【生活化比喻】
`cd ..`（兩顆點點）就像是「回頭路」，讓你從這個房間退回到客廳。
`cd ~`（蚯蚓號）就像是「回老家」，直接一鍵傳送回你最原始的個人資料夾。

⚠️ 學生常見誤解：
Windows 學生最常犯的錯就是想 `cd D:`，結果發現完全沒動靜。記得，切換磁碟機（槽）只要輸入 `D:` 加 Enter 就可以，不用寫 `cd`。

【練習引導】
大家可以試著輸入 `cd ..` 然後看看你的路徑變成了什麼，感覺一下往後退的感覺。
-->

---

# cd 指令 — 範例

```bash
# 返回上一層
cd ..

# 返回家目錄（macOS/Linux）
cd ~

# 移動到指定路徑
cd C:/Users/allen/projects/my-app

# Windows：切換到 D 槽
D:
```

<!--
【帶讀程式碼前的鋪陳】
這裡我們看幾個實際操作的例子。

【逐步解說】
第三個例子是「絕對路徑」，就像是給電腦一張完整的地址，不管你現在人在哪，都可以直接飛過去。
最後一個 `D:`，再次提醒 Windows 同學，這是切換硬碟的特權指令。

💼 業界實務：
在終端機輸入路徑時，有個神招：**「按 Tab 鍵」**。你只要打前面兩三個字再按 Tab，電腦就會自動幫你補完剩下的字，又快又準！
-->

---
layout: end
---

# 課程結束
### 熟悉終端機指令，開始使用 Angular CLI！

<!--
【結語】
好啦，終端機的基本功就到這裡。雖然剛開始會覺得手很忙，但相信我，久了之後你一定會愛上打指令的快感。

【互動引導】
有沒有同學已經偷偷試過 `cd ..` 了？如果你連退好幾次，退到不能再退了，會發生什麼事呢？

下一堂課，我們就要利用這些黑視窗裡的指令，來安裝我們的 Angular 環境囉！
-->
