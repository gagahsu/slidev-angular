# 第04章：終端機指令速查表

終端機（黑視窗）是工程師最重要的工具之一。
不用怕它！如果你不打字，它就只是靜靜待著，什麼都不會發生。

---

## macOS / Linux 指令

```bash
# 查看目前所在的位置（印出完整路徑）
pwd
# 輸出範例：/Users/allen/projects

# 列出目前資料夾內的所有檔案
ls

# 列出所有檔案（包含隱藏檔，名稱以 . 開頭的檔案）
ls -a

# 進入某個資料夾（cd = change directory，切換目錄）
cd 資料夾名稱
# 範例：cd projects

# 回到上一層資料夾（兩個點點代表「上一層」）
cd ..

# 回到家目錄（最頂層）
cd ~

# 建立新資料夾
mkdir 資料夾名稱
# 範例：mkdir my-project

# 刪除檔案（⚠️ 沒有垃圾桶，刪了就沒了！）
rm 檔案名稱
# 範例：rm old-file.txt

# 刪除整個資料夾（-r 代表遞迴刪除裡面的所有東西）
rm -r 資料夾名稱
```

---

## Windows 指令（命令提示字元）

```bat
:: 查看目前所在的位置
chdir

:: 列出目前資料夾的所有檔案
dir

:: 進入某個資料夾
cd 資料夾名稱

:: 回到上一層
cd ..

:: 建立新資料夾
mkdir 資料夾名稱

:: 刪除檔案
del 檔案名稱

:: 切換到其他磁碟（不能用 cd！）
D:
E:
```

---

## cd 指令實戰練習

假設你的電腦上有以下資料夾結構：

```
C:/
└── Users/
    └── allen/
        └── projects/
            ├── project-A/
            └── project-B/
```

如果你現在在 `C:/Users/allen/` 裡，想進入 project-A：

```bash
cd projects        # 先進入 projects 資料夾
cd project-A       # 再進入 project-A

# 也可以一次寫完（用斜線 / 連接路徑）
cd projects/project-A
```

---

## 超實用小技巧：Tab 自動補完

輸入資料夾名稱的前幾個字母，再按下 **Tab 鍵**，
終端機會自動把後面補完！

```bash
cd pro  → 按 Tab → cd projects     （自動補完）
```

> 在終端機裡，大小寫有差！`Projects` 和 `projects` 是不同的資料夾。
