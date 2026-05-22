#!/bin/bash
# === 第19章：新增組件 — Angular CLI 指令 ===
#
# Angular 元件（Component）是 Angular 的基本積木。
# 每個元件由三個檔案組成：
#   .ts   → 邏輯（TypeScript）
#   .html → 畫面（HTML 模板）
#   .css  → 樣式（CSS）
#
# 用 Angular CLI 快速生成元件，不用手動建立這三個檔案！

# ============================================================
# 生成元件（ng generate component）
# ============================================================

# 完整寫法
ng generate component header

# 簡短縮寫（g = generate, c = component）
ng g c header

# 生成元件到指定資料夾（推薦！維持清晰的目錄結構）
ng g c components/header
ng g c components/footer
ng g c components/user-card
ng g c pages/home
ng g c pages/about

# 生成元件後，CLI 會自動建立以下四個檔案：
# src/app/components/header/
#   ├── header.component.ts
#   ├── header.component.html
#   ├── header.component.css
#   └── header.component.spec.ts   ← 測試檔（可先忽略）
