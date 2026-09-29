# 考考男 MVP — 測試說明

這個 MVP 只驗證一件事：**在 Zotero 7 實際環境中，「捲到最後一頁 + 累積閱讀時長達門檻」能不能穩定觸發提問**。還沒有出題／LLM／筆記寫檔功能。

## 目前功能

- 開啟一篇 PDF 時，reader 工具列會多一顆 🐲 按鈕，閱讀畫面右下角也會出現一個會輕輕晃動的浮動頭像——兩個都只在這篇論文的閱讀畫面打開時才存在，分頁/視窗一關就跟著消失
- 第一次點擊（工具列按鈕或浮動頭像皆可）直接進淺讀，不會再另外跳出來問要選哪個模式
- 背景每 5 秒輪詢一次目前頁碼與累積聚焦閱讀時間，滿足「在最後一頁」+「時長達標」時會跳出「準備好被考了嗎」的提醒（只是提醒，不會自動開始測驗）
- 每一題是一張卡片：問題 + 文字框 + 「下一題」，淺讀模式的卡片上多一顆「跳過剩餘淺讀，直接精讀」；點「先關閉，之後再繼續」可以留著沒答完，下次點頭像會接著問
- 淺讀整組答完後，會另外跳出「要不要繼續精讀」的選擇；精讀整組答完（或本來就是精讀模式答完）就算這篇測驗完成
- 題目內容是 SPEC.md 4.1/4.2 定好的固定題目（**MVP 階段先用固定題目，還沒接 LLM 動態出題**）
- 不評分，只負責記錄你的回答；每次作答完（不管全部答完還是只答了幾題）都會即時寫進 `notes/<論文標題>.md`，同時更新 `notes/_總紀錄.md` 這個彙總索引
- 測驗全部完成後再點頭像，會先跳出「過去填寫內容」的回顧清單；測驗中途也可以在題目卡片上點「查看/編輯已作答」隨時回顧，不用等全部答完
- 回顧清單裡每一題已回答的旁邊有「編輯」按鈕，可以回頭修改，改完會同步更新 `notes/` 裡的 md 檔案

**注意**：`notes/` 資料夾路徑目前是寫死在程式碼裡的（`kaokaonan.js` 最上面的 `NOTES_DIR`），對應這台機器上這個專案的絕對路徑，不是可攜式設定，之後要做成外掛設定選項再改。

## 如何在你的 Zotero 裡載入測試

**方法一：直接安裝（最簡單，但改程式碼要重新打包）**

`.xpi` 本質上就是 `.zip`，但 PowerShell 的 `Compress-Archive` 在 Windows 上打包資料夾時，內部路徑會用反斜線 `src\xxx`，不符合 zip 規格的正斜線 `src/xxx`，Firefox/Zotero 的 zip 解析器對此很嚴格，可能直接判定外掛不相容。所以改用 `build.ps1`（用 .NET ZipArchive 手動控制路徑分隔符號）：

```powershell
.\build.ps1
```

打包後，在 Zotero 裡：工具 → 外掛程式 → 齒輪圖示 → 「Install Add-on From File」→ 選 `kaokaonan.xpi`。

**方法二：開發模式（改完程式碼不用重新打包，改完直接在 Zotero 按 R 重新載入）**

1. 在 Zotero 設定裡打開 `Advanced` → 勾選開發者相關選項（或設定 `extensions.experiments.enabled = true`）
2. 在 Zotero profile 資料夾的 `extensions/` 目錄下，新增一個檔名為 `kaokaonan@researchworkflow.local` 的純文字檔（沒有副檔名），內容是這個 `plugin` 資料夾的**絕對路徑**
3. 重啟 Zotero，外掛就會以這個資料夾為來源載入

## 安裝踩過的坑

- `applications.zotero.update_url` 在 Zotero 10.0.1 上是**必填欄位**，留空字串或整個省略都會安裝失敗，且外面看到的錯誤訊息只會是籠統的「incompatible」，看不出真正原因。要看到明確錯誤，得在安裝當下開 Browser Console（`Ctrl+Shift+J`）才有 `applications.zotero.update_url not provided` 這種具體訊息。
- Windows PowerShell 的 `Compress-Archive` 打包資料夾時，zip 內部路徑會用反斜線，不符合 zip 規格，Firefox/Zotero 的 zip 解析器可能因此拒裝，所以改用 `build.ps1`。

## 已知不確定的地方（需要你實測回報）

以下屬性都是參考社群外掛範例、非 Zotero 官方文件記載，**不保證跟你的 Zotero 版本完全一致**：

- `reader.state.pageIndex`（目前頁碼）
- `reader._iframeWindow.wrappedJSObject.PDFViewerApplication.pagesCount`（總頁數）
- `reader.itemID`（對應的文獻 item）

如果載入後完全沒反應，開 Zotero 的 `說明 → 除錯輸出記錄` 或按 `Ctrl+Shift+J` 開 Browser Console，把 `[KaoKaoNan]` 開頭的訊息或任何紅字錯誤貼給我，我再針對實際版本調整屬性名稱。

## 下一步（不在這次 MVP 範圍內）

- 接 LLM 動態出題（讀全文 + annotation），取代目前寫死的固定題目
- 節流/靜音機制（連續 dismiss 3 次自動靜音 3 小時）
- `notes/` 路徑改成可設定，不要寫死在程式碼裡
