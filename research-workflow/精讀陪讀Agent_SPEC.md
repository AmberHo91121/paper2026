# 步驟 2　精讀陪讀（Close Reading Assistant）SPEC

> 共通原則見 [AI_agent化工作流程草案.md](AI_agent化工作流程草案.md)。
> 依唐玄輝老師 QDS 課程的 **Critical Form** 架構整理單篇論文（[講義](https://drhhtang-pixel.github.io/2026-QDS/week03/#5)）。與 `zotero_notetaking/`（考考男外掛）是兩條獨立的線。

## 輸出位置：主題資料夾的 `papers/` 文獻站

```
papers/
  papers.json              書目來源檔（APA 7、DOI、授權 licenseKind 等）
  導讀/<id>.md             逐段導讀
  critical-form/<id>/
    01_抽取草稿.md          Critical Form 草稿
    筆記.md                 使用者自由筆記（agent 只建空白檔）
  build_papers.py          合成 papers.js
  index.html / paper.html  清單頁／單篇頁（導讀、Critical Form・筆記分頁）
```

改任何 md 或 papers.json 後都要重跑 `python papers/build_papers.py`。

## Stages

### Stage 0　收錄與優先序（任何產出之前）

列出候選論文，每篇附「收錄與否／優先序（高・中・低）／一句理由」（推論）。使用者說「照這樣」才動手；只有收錄的論文寫進 `papers.json`，之後依優先序由高到低、每批回報。

### Stage A　抽取

1. **逐段導讀 `導讀/<id>.md`**：依原文章節順序，每節一兩句中文說明，重要小節條列補充。在 `papers.json` 以 `guideSource`（fulltext／abstract／toc）標明依據。**不做全文翻譯**；只有 `licenseKind` 為 cc-by／cc-by-nc 的論文可另做全文翻譯。專有名詞是否保留英文由使用者決定。
2. **Critical Form 草稿 `critical-form/<id>/01_抽取草稿.md`**：依下表 13 欄填寫；領域關鍵詞用 `[[關鍵詞]]` 標記（不用 `*...*`，避免與 APA 斜體衝突）。
3. **`筆記.md`**：只建空白起始檔。

| # | 欄位 | 規則（覆核重點） |
|---|---|---|
| 1 | Reference | APA 7；附 DOI／連結（作者 `&`、標點後空格、編者名字在前） |
| 2 | Scope | 只放名詞性領域詞，不放研究方法 |
| 3 | Background | 完整句子描述奠基的既有知識 |
| 4 | Problem | 句尾必須是問號 |
| 5 | Aim | 通常一句，不與 Objectives 混 |
| 6 | Objectives | 2–3 個以上，條列（最常被漏掉或併入 Aim） |
| 7 | Methodology | 方法名稱（名詞） |
| 8 | Steps | 怎麼做（人事時地物＋分析架構），不劇透結果 |
| 9 | Results | 只陳述不評論 |
| 10 | Discussion | 必須回扣 Problem |
| 11 | Conclusion | 轉化為新知識與未來方向，不重複 Results |
| 12 | Significance | 信度（邏輯自洽）＋重要性（對領域的關聯），僅草擬觀察（推論） |
| 13 | Questions | agent 最多草擬 1–2 個引子問題並標「推論」，其餘由使用者寫 |

### Stage B　使用者確認

Significance／Discussion／Conclusion 需要學術判斷，**不可省略**。使用者說「可以套版了」才進 Stage C。

### Stage C　上文獻站

在 `papers.json` 該篇加上 `criticalForm.path`，重跑 `build_papers.py`，由 `paper.html` 呈現。重新產出時保留使用者已寫的 Questions 與筆記。

## 視覺規格

Tailwind CDN＋FontAwesome；深色 header、搜尋列（整卡過濾）、關鍵詞高亮開關（`[[…]]` → `<span class="key-term">`，與 `<em>` 分開）。13 欄分成 7 張卡，配色：Reference blue／Scope・Background emerald／Problem・Aim・Objectives violet／Methodology・Steps amber／Results・Discussion・Conclusion rose／Significance cyan／Questions slate。範本：[精讀報告_template.html](精讀報告_template.html)。
