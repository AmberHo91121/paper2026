# 研究主題資料夾慣例

repo `AmberHo91121/paper2026` 以 `2026_researchWorkflow/` 為根目錄，一個研究主題一個資料夾，透過 GitHub Pages 發布（https://amberho91121.github.io/paper2026/ ）。論文 PDF、`keepPrivate/` 不進 git（見根目錄 `.gitignore`）。新增主題時在根目錄 `index.html` 補一張卡片。

## 主題資料夾結構

資料夾順序對應論文章節，也對應流程步驟。

```
<主題資料夾>/
├── 00_編輯歷程.md               里程碑摘要（細節交給 git log）
├── 01_文獻探討/                 步驟 1：背景知識.md／近三年研究.md／研究缺口.md
├── papers/                      步驟 2：文獻站（papers.json、導讀/、critical-form/<id>/，見精讀陪讀 SPEC）
├── 02_研究問題/                 步驟 3 Stage A/B：Problem_Aim_Objectives.md
├── 03_研究架構/                 步驟 3 Stage C：研究架構.html
├── 04_研究方法/                 步驟 4：設計說明、執行文件、招募條件、研究倫理與同意書
├── 05_原始資料/                 逐字稿／日記（Notion 轉錄後匯出），檔名 <受訪者代稱>_逐字稿.md
├── 06_結果/                     步驟 5：編碼總表、Theme 彙整、Pattern 卡片、對應研究框架
└── 07_討論/                     使用者手動撰寫
```

資料夾在用到時才建立，不預先開空資料夾。含真人訪談的 `05_原始資料/` 若屬機密，先加進 `.gitignore` 再開始放資料。

## 共用檔案（`research-workflow/`）

- 各步驟 SPEC 與 [AI_agent化工作流程草案.md](AI_agent化工作流程草案.md) 總覽
- 樣板：[精讀報告_template.html](精讀報告_template.html)、[研究架構_template.html](研究架構_template.html)
- 跨主題 Code 詞彙表：repo 根目錄 `_code-vocabulary.md`（見洞見萃取 SPEC）
