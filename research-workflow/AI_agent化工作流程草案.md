# 研究工作流程 AI Agent 化草案

> 根據 `2026_知識庫` 現有資料（考考男外掛 spec、StyTrix 訪談洞見整理、各 case 資料夾結構）推導。
> 每個 agent 附「待確認」欄位，請直接在該欄位下方寫評論/修改意見，下一輪我會依你的標註調整。

---

## 總覽：Agent 鏈

```
[Agent 1 文獻蒐集] → [Agent 2 精讀陪讀]
        ↓
   洞見假設 / 待驗證問題
        ↓
[Agent 3 研究架構]（覆核 Problem/Aim/Objectives、規劃 Framework）
        ↓
[Agent 4 研究設計]
        ↓
     訪談/表單執行(人工，逐字稿轉錄用你既有的 Notion 工具)
        ↓
[Agent 5 洞見萃取]
```

前四個 agent 是「輸入端」，中間執行段仍由你親自進行（訪談本身、填表單、逐字稿轉錄），第 5 個是「輸出端」。目前 Agent 1-5 全部已有定案的 SPEC（Agent 2 正在跑第一次真實測試）。原本規劃的排程協調、簡報/報告生成、知識庫策展三個 agent 都已確認不需要，整條鏈到 Agent 5（洞見萃取）為止——後續要不要整理成簡報/報告、要不要串接行事曆，都是你自己視需要手動處理，不做成 agent。

---

## 階段一：前期文獻蒐集與精讀

### Agent 1：文獻蒐集 Agent（Literature Scout）🟢 已定案

- **狀態**：已依你指定的三段式結構（背景知識／近三年研究／研究缺口）重新設計，獨立成 [文獻蒐集Agent_SPEC.md](文獻蒐集Agent_SPEC.md)
- **定位**：給定一個研究問題/主題，依 Stage A（背景知識）→ Stage B（近三年研究）→ Stage C（研究缺口）分階段產出文獻地圖，每階段結束都停下來等你確認才進下一步
- **資料來源**：ACM Digital Library ＞ Google Scholar ＞ Web of Science，以 HCI 大型研討會（CHI/CSCW/UIST/DIS/HCII/TEI）為主軸，心理學/資訊科學等其他領域作輔助
- **輸出**：純 Markdown 清單／缺口卡片，不生成 HTML
- **通用性**：不綁定固定輸出資料夾，每次執行時你明確指定要輸出到哪裡

### Agent 2：精讀陪讀 Agent（Close Reading Assistant）🟢 已定案（測試中）

- **狀態**：原本設計是延伸[考考男外掛](zotero_notetaking/SPEC.md)的固定題組，你後來改指定新方向——依唐玄輝老師 QDS 課程的 **Critical Form** 架構重新設計，獨立成 [精讀陪讀Agent_SPEC.md](精讀陪讀Agent_SPEC.md)。跟考考男外掛是兩條不同的線，不是延伸關係了
- **定位**：把單篇論文依 Critical Form 13 個欄位（Reference／Scope／Background／Problem／Aim／Objectives／Methodology／Steps／Results／Discussion／Conclusion／Significance／Questions）整理成結構化資訊，Stage 0（你確認收錄與優先序）→ Stage A（抽取＋逐段導讀）→ Stage B（你確認）→ Stage C（套視覺樣板產出 HTML）
- **視覺樣板**：Tailwind CSS＋FontAwesome，每個 Critical Form 分區專屬配色、搜尋列即時過濾、高亮關鍵字開關，範本見 [精讀報告_template.html](精讀報告_template.html)
- **人工 review 點**：Significance／Discussion／Conclusion 這幾個需要學術判斷的欄位，Stage B 必須你確認過才能進 Stage C；Questions 卡片 agent 只能草擬引子問題並標「推論」
- **通用性**：跟 Agent 1 一樣不綁定固定輸出資料夾
- **目前進度**：拿 [Chen (2026) 經期追蹤 App 論文](../2026_intimateData/Chen_2026_intimate_data_performativity_Taiwanese_women_menstrual_tracking.pdf)試跑 Stage A，草稿在 [01_抽取草稿_Chen2026.md](../2026_intimateData/01_抽取草稿_Chen2026.md)，等你 review 後說「可以套版了」才進 Stage C

---

## 階段二：研究規劃

### Agent 3：研究架構 Agent（Research Framework Architect）🟢 已定案

- **狀態**：已依你這次的要求設計，獨立成 [研究架構Agent_SPEC.md](研究架構Agent_SPEC.md)
- **定位**：在正式進入研究設計（訪談大綱/招募條件）之前，先核對「這個研究的地基穩不穩」——Problem/Aim/Objectives 彼此邏輯是否一致、是否真的回應 Agent 1 Stage C 找到的研究缺口，再據此規劃整個研究的框架（framework），避免後面訪談大綱設計建立在邏輯不通或文不對題的基礎上
- **輸入**：你的 Problem/Aim/Objectives 草稿 ＋ Agent 1 Stage C 的研究缺口卡片（可選：Agent 2 精讀報告的 Discussion/Significance 作為佐證）
- **處理**：Stage A（邏輯與缺口對齊評判，推論待確認）→ Stage B（你確認或修正 Problem/Aim/Objectives）→ Stage C（規劃研究框架＋流程圖）→ Stage D（框架修正協作，你發現落差時主動叫出來的診斷式討論）
- **輸出**：HTML，含框架構念卡片、流程圖（Mermaid.js）、版本紀錄（changelog）、研究筆記區
- **人工 review 點**：Stage A 的邏輯評判只是提案，你確認或修正後才進入框架規劃；研究筆記區由你自己持續補充，agent 重新產出時不會覆蓋
- **通用性**：跟 Agent 1、2 一樣不綁定固定輸出資料夾

### Agent 4：研究設計 Agent（Research Designer）🟢 已定案

- **狀態**：已依討論結果設計，獨立成 [研究設計Agent_SPEC.md](研究設計Agent_SPEC.md)——涵蓋更廣的設計研究方法（半結構訪談、日記研究法、情境訪查、共同設計工作坊、Research through Design 相關技法等），不限於可用性測試
- **定位**：Agent 3 已經定案「方法類別」，Agent 4 負責選對具體技法（符合情形）並操作化成經得起檢驗的執行工具（支持性＋縝密性），不是重選方法
- **輸入**：Agent 3 產出的 `03_研究架構/研究架構.html` ＋ 你提供的實務限制（時程/受訪者可及性/資源）
- **處理**：Stage A（技法提案，附原因/限制/影響）→ Stage B（對話式共創執行細節，可用性測試類直接交給 `usability-test-planner` skill）→ Stage C（雙向可回溯性檢查＋依技法典範套用對應嚴謹判準自我檢核）
- **輸出**：`04_研究方法/研究方法_設計說明.md`（技法選擇理由＋可回溯性對照＋嚴謹判準檢核）＋依技法產生的執行文件（訪談大綱／日記提示設計／工作坊流程等）＋招募條件
- **人工 review 點**：Stage A 技法選擇你確認才進 Stage B；Stage C 的嚴謹判準檢核是 agent 提案，你決定要不要調整設計；執行階段發現判準站不住腳時，沿用 Agent 3 的 Stage D 診斷式討論，不重複設計一套
- **表單系統**：不接外部表單 API，問卷題項用純 Markdown 表格呈現

---

## 階段三：資料整理與洞見萃取

### Agent 5：洞見萃取 Agent（Insight Extractor）🔵 優先開發中

- **狀態**：已依你指定的九層框架（Raw Data→Context→Behavior→Code→Theme→Pattern→Why→Insight→Implication）重新設計，獨立成 [洞見萃取Agent_SPEC.md](洞見萃取Agent_SPEC.md)，請到該檔案review（原編號 Agent 6，因移除排程協調/簡報生成兩個 agent 而整體前移）
- **與現有 `insight` skill 的關係**：現有產出只做到①②④層（Quote＋情境＋問題摘要=Code），新設計把⑤Theme～⑨Implication的收斂與詮釋補上，且明確切成「證據層（可自動）／詮釋層（需人工確認）」兩段，避免 agent 自己捏造因果
- **這是目前整條鏈的最後一站**：洞見萃取完成後，要不要整理成簡報/報告、要不要進一步比對其他 case，都由你自己視需要處理，不接下游 agent

---

## 給你的下一步

在上面每個「❓ 待確認」欄位下方寫你的意見/決定後，把這份檔案的路徑丟回來，我依標註調整 agent 設計，或直接開始實作優先度最高的那一個。
