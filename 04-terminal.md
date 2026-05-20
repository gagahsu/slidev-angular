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
哈囉大家！今天要來介紹一個初學者看了都會瑟瑟發抖的東西：那個**「黑漆漆的魔法視窗」**！
很多人心裡會犯嘀咕：「我用滑鼠點兩下資料夾、按右鍵新增不是很好嗎？為什麼要像上個世紀一樣，在鍵盤上打字操作？」
因為在開發者的魔法世界裡，有些事情打指令比你用滑鼠滑來滑去快上百倍！
而且很多厲害的開發工具（包括 Angular 機器人）都長在沒有圖形介面的黑盒子裡。
今天這堂課結束後，你就不會再害怕它了。
你會學會怎麼像電影裡的超級駭客一樣，只用鍵盤，啪啪啪幾下就在各個資料夾之間跳躍穿梭！
-->

---
layout: default
---

# Outline

- **1. 什麼是終端機** — Mac/Linux 終端機 vs Windows 命令提示字元
- **2. 常用指令對照** — MacOS/Linux 與 Windows 指令比較
- **3. cd 指令詳解** — 目錄切換的各種用法

<!--
今天的魔法訓練有三個章節：
第一，認識你的作業系統配備的是哪一種對講機。
第二，學會幾個必備的「荒野生存指令」。
第三，深度修煉最核心的 `cd` 傳送門指令。
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 1. 什麼是終端機？
# Terminal / Command Prompt

<!--
首先，我們先來幫這個黑漆漆的視窗「正名」一下，順便認個親。
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
終端機到底是什麼？
我們用「去餐廳吃飯」來做比喻。
你平常點餐，是用漂亮的 App 介面按來按去，這就是**圖形介面 (GUI)**。
而終端機，量就像是**「你直接走進廚房，對著廚師大喊：三號桌要一盤大辣炒飯！」**。
雖然沒有精美的圖示，但廚師一聽就懂，速度飛快，指令還能非常精準。
Windows 用戶的叫「命令提示字元 (cmd)」，Mac 用戶的叫「終端機 (Terminal)」。
別害怕這個黑畫面，它其實只是個乖寶寶，如果你不打字，它就只會靜靜地發呆，絕對不會爆炸！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 2. 常用指令對照
# Common Commands

<!--
既然要直接跟廚房下命令，我們就得學會各個作業系統的「方言」。
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
不同作業系統的方言不太一樣。
比如列出檔案，Mac 叫 `ls`，Windows 叫 `dir`。
如果你在 Windows 視窗輸入 `ls`，它會冷冰冰地回你「找不到此指令」，這不是你的程式壞了，單純是你講錯了方言。
不過好消息是，大魔王 `cd`（切換資料夾）在所有系統都是通用的。
我們最常用的就是它！
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
我們來看看 Mac 用戶是怎麼操作的。
`cd projects` 就是「傳送到 projects 資料夾裡面」。
進去之後，如果迷路了，打個 `pwd`（Print Working Directory），它就會大聲告訴你目前的完整地址。
想看這個資料夾有什麼寶藏？打個 `ls` 就可以列表秀出來。
最後，`rm`（Remove）可以刪除檔案。
這裡我要提醒各位：**「在終端機裡刪東西是沒有後悔藥的！」**
它不會經過什麼垃圾桶，一按下去檔案就直接灰飛煙滅，所以打 `rm` 時要跟簽保證書一樣小心！
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
那 Windows 用戶呢？
動作完全一樣，只是換個方言。
`chdir` 就是 Windows 版的「我在哪裡」，`dir` 就是列出資料夾內容，而刪除檔案則是用 `del`（Delete）。
在業界，很多 Windows 工程師會改用 Git Bash 或是 WSL，讓自己在 Windows 也能講 Mac/Linux 的方言，因為以後雲端伺服器幾乎都是講 Linux 話喔！
-->

---
layout: section
class: flex flex-col justify-center items-center text-center
---

# 3. cd 指令詳解
# Directory Navigation

<!--
好的，接下來我們要深度修煉最核心、也最容易踩雷的傳送指令：`cd`。
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
`cd` (Change Directory) 就是你的**「傳送門」**。
`cd ..`（後面加兩顆點點，中間有空格喔！）就像是**「後退鍵」**，讓你退回上一層資料夾。
`cd ~`（後面一條蚯蚓線）則是**「回城傳送石」**，一鍵把你帶回最原始的家目錄。
Windows 用戶特別注意！如果你想從 C 槽切換到 D 槽，千萬不要打 `cd D:`，電腦會裝聾作啞不理你。
切換磁碟槽，只要帥氣地打 `D:` 然後按下 Enter 就行了，不用打 `cd`！
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
看看這幾個例子。
第三個例子 `cd C:/Users/...` 是一長串的路徑，這叫「絕對路徑」。就像你拿著完整的 Google 地圖地址，不管你人在哪，直接一鍵導航飛過去。
最後，教大家一個資深工程師都在用的神招：**「Tab 鍵自動補完」**！
當你想進入一個叫 `super-long-folder-name` 的資料夾，你不需要把每個字都打完。
你只要打 `su`，然後按一下鍵盤的 Tab 鍵，電腦就會自動把剩下的字補齊！
學會這招，你看起來就真的有十年的道行了！
-->

---
layout: end
---

# 課程結束
### 熟悉終端機指令，開始使用 Angular CLI！

<!--
好啦，終端機的生存訓練就到這裡。
剛開始你可能會覺得打字很手殘，但相信我，多練幾次，你一定會愛上這種用鍵盤掌控全世界的快感。
大家試著輸入 `cd ..` 退到最頂層看看，看能退到哪裡？
下一堂課，我們就要用這個魔法黑視窗，正式下載並安裝 Angular 囉！
-->
