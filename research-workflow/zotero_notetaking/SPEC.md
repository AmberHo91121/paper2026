# 考考男 — Zotero 主動式閱讀陪讀外掛 Spec

## 1. 動機與學習理論基礎

依據 desirable difficulty（Bjork）與 testing effect / retrieval practice：知識需要經過「回想的困難」才能真正內化，被動閱讀無法達到這個效果。考考男的角色是在你閱讀論文時，於恰當時機主動要求你「回想並輸出」剛讀過的內容，藉此強化記憶與理解，而不是單純幫你畫重點或摘要。

## 2. 核心使用情境

1. 使用者在 Zotero 中打開一篇論文的 PDF，考考男以小怪獸頭像陪伴在閱讀介面旁
2. 使用者可隨時主動點擊頭像，立刻開始考試
3. 系統在特定條件下會主動跳出提問（見第 3 節）
4. 依照淺讀 / 精讀模式，出題範圍與深度不同（見第 4 節）
5. 問答紀錄落地為本地 Markdown 筆記（見第 6 節）

## 3. 觸發機制

**條件（AND，兩者皆滿足才觸發）：**
- 該論文已被捲動至內文最後一頁（不含 references / appendix）
- 該論文累積閱讀時長 ≥ 門檻
  - 淺讀模式門檻：20 分鐘
  - 精讀模式門檻：60 分鐘

**模式判定：** 使用者開始閱讀該篇論文時，由考考男主動詢問一次「這篇要淺讀還是精讀？」，決定後續門檻與出題深度，儲存在該論文的閱讀狀態中，非每次觸發都問。

**技術注意：**
- 內文最後一頁 ≠ PDF 最後一頁，需要排除 references/appendix，作法可能是搜尋文字中的 "References"/"Bibliography" 等標題所在頁碼，當作內容終點的估計值（非 100% 準確，需容錯）
- 閱讀時長採「該分頁在前景且視窗有焦點」的累積時間，参考 zotero-reading-tracker 等既有外掛的計時邏輯

## 4. 問答流程與題型結構

### 4.1 淺讀模式題組（5 小題，狀態逐題記錄完成與否）
1. 類型
2. 脈絡
3. 前提
4. 貢獻
5. 額外追問：這篇論文值不值得我讀？

### 4.2 精讀模式題組
1. 核心論點
2. 研究方法
3. 關鍵圖表
4. 任何看不懂的術語或文獻
5. 這篇論文對我來講可以參考什麼？
6. 篇跟我目前研究架構裡的哪一塊最相關？為什麼？
7. 帶給我的未來研究想法

不需要系統理解使用者的研究脈絡、不需要對照正解。這兩題的目的單純是讓使用者當下即時記錄自己浮現的想法（值不值得讀的直覺判斷、能參考什麼的第一反應），寫下來這個動作本身就是目的，不是給系統評估或給答案用的。

### 4.3 觸發時的題目優先順序
- 若淺讀題組尚未全部完成 → 優先補問未完成的淺讀題目
- 使用者可選擇「跳過淺讀，直接進精讀」→ 僅跳過淺讀題組本身，不影響整體考試機制／不影響後續精讀題組的觸發

### 4.4 出題資料來源（混合）
- LLM 讀取論文全文，生成結構性題目（intro/purpose 等淺讀題組一定考得到的部分）
- 使用者在 Zotero 中的劃線 / annotation，作為追問素材（「你有沒有注意到你自己畫線的這一段在談什麼」）

### 4.5 作答方式
- 文字輸入

### 4.6 評分機制
- **不評分、不判定對錯**。retrieval practice 的效果來自「回想」這個動作本身，不需要外部評價介入
- 使用者答完後（不論答什麼），考考男提供論文原文中對應段落的「簡短參照重點」，供使用者自行比對，純參考用途，非正確答案公布

## 5. 節流 / 靜音機制

- 手動靜音開關：使用者可隨時將考考男整體靜音
- 被動靜音：連續 3 次 dismiss（不管是哪一篇論文觸發的提問）→ 全域靜音 3 小時，範圍是所有論文，不分篇
- 靜音期間，只要使用者主動點擊頭像開考，dismiss 計數器歸零、靜音狀態立即解除

## 6. 筆記紀錄

**儲存方式：獨立本地資料夾**（不寫入 Zotero 內部筆記系統），路徑規劃：

```
notes/
  _總紀錄.md          — 所有已讀論文的彙總索引
  <papername>.md      — 單篇論文的完整問答紀錄
```

**`_總紀錄.md` 每筆記錄包含：**
- 論文標題
- 閱讀日期
- 淺讀 / 精讀狀態
- 「值不值得讀」判定結果
- 一句話 takeaway

**`<papername>.md` 內容：**
- 該篇論文所有題目與使用者作答的完整紀錄
- 系統提供的簡短參照重點
- 精讀模式的「對我來講可以參考什麼」追問紀錄

## 7. 技術架構與已驗證的可行性

**外掛型態：** Zotero 7 bootstrap extension（overlay 模式已被官方棄用，不採用）

**關鍵 API（皆已於社群外掛中驗證可用，但多數為非官方/內部屬性）：**

| 需求 | API / 作法 | 來源驗證 |
|---|---|---|
| 取得目前頁碼、總頁數 | `Zotero.Reader.getByTabID(tabID).state.pageIndex` | 多個社群外掛範例、[Zotero 中文社區文件](https://zotero-chinese.com/plugin-dev-guide/reference/more) |
| 追蹤閱讀累積時長 | 分頁前景 + 視窗焦點時間累計 | [Reading Flow](https://github.com/Moonweave-Research/zotero-reading-flow)、[zotero-reading-tracker](https://github.com/reginalluna/zotero-reading-tracker)、[zotero-read-tracker](https://github.com/marysethomas/zotero-read-tracker) 皆已實作同類功能，可參考其邏輯 |
| 注入工具列 / 選單 UI | `Zotero.Reader.registerEventListener('renderToolbar' \| 'renderTextSelectionPopup' \| ..., handler, pluginID)` | [Zotero 7 for Developers 官方文件](https://www.zotero.org/support/dev/zotero_7_for_developers) |
| 浮動頭像等自由疊加 UI | 直接操作 reader 的 `_iframeWindow`（非官方） | 社群外掛常見手法，官方尚無正式支援（見 [zotero/zotero#3373](https://github.com/zotero/zotero/issues/3373) 討論串） |
| 取得論文全文文字（供 LLM 出題） | 透過 `_iframeWindow.wrappedJSObject.PDFViewerApplication` 存取 pdf.js 文字層 | 社群外掛範例 |
| 取得使用者劃線 / annotation | Zotero 官方 Item/Annotation API（已文件化，穩定） | [Zotero JavaScript API](https://www.zotero.org/support/dev/client_coding/javascript_api) |

**LLM 出題：** 需要外部呼叫（Claude API），輸入為論文全文文字 + annotation 清單，輸出結構化題目

## 8. 已知風險與待驗證事項

- **非官方 API 的脆弱性**：`_internalReader`、`_iframeWindow` 等底線開頭屬性可能隨 Zotero 版本更新而改變，需要對外掛做版本相容性測試與監控
- **「內文最後一頁」判定的準確度**：依賴文字搜尋 references 標題的方式非 100% 可靠，不同論文排版差異大，需要容錯機制（例如允許使用者手動修正）
- **LLM 出題的成本與延遲**：每次觸發若都重新處理全文，需評估是否要快取已生成的題目、或分段處理長論文

## 9. 下一步建議

1. 先做一個最小可行原型（MVP），只驗證「偵測到達最後一頁 + 時長門檻 → 跳出提問」這條技術地基是否在實際 Zotero 7 環境中穩定運作
2. 確認 LLM 出題的 prompt 設計與全文擷取的品質
