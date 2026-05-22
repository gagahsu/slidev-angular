#!/bin/bash
# === 第04章：終端機練習題 ===
#
# 請跟著以下步驟，在你的電腦上實際操作！
# 把每一行指令複製到終端機執行，並觀察輸出結果。

echo "=== 練習開始 ==="

# 練習 1：查看目前位置
echo "練習 1：我現在在哪裡？"
pwd

# 練習 2：列出當前目錄的所有檔案
echo ""
echo "練習 2：這個資料夾有什麼？"
ls

# 練習 3：建立一個新資料夾
echo ""
echo "練習 3：建立一個叫 my-practice 的資料夾"
mkdir my-practice

# 練習 4：進入新資料夾
echo ""
echo "練習 4：進入 my-practice 資料夾"
cd my-practice
pwd   # 確認已經進入了

# 練習 5：回到上一層
echo ""
echo "練習 5：回到上一層"
cd ..
pwd   # 確認已經回去了

echo ""
echo "=== 練習結束！你已經會使用基本的終端機指令了！🎉 ==="
