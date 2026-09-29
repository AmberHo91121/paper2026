# AI 製作 Service Blueprint（SBP）— 整合知識庫

> 架構對應：學術研究・商業產品・實務經驗・跨類別比較・結論與引用建議  
> 整合來源：SBP_context_0727.txt、SBP_personalNotes_0727.md、service_blueprint_文獻回顧時間軸.md、AI製作SBP流程與影響分析（學術商業分開版）.docx

---

## 研究範圍與案例分類

```
來源類型           代表案例                                        方法論嚴謹度
────────────────────────────────────────────────────────────────────────────
學術研究           Shostack / Bitner / Patrício / Wirtz /          有完整方法論、同儕審查
                   Magyari & Secomandi / Mortati & Freitas
────────────────────────────────────────────────────────────────────────────
商業產品           Miro / Creately / UXPressia / Smaply /          產品部落格，無公開實證
                   TheyDo / thehuman2ai.com
────────────────────────────────────────────────────────────────────────────
實務經驗           NN/g / Forlizzi / Exintaris / SI Labs           非正式研究，可信度因機構而異
```

**重要判讀原則**：學術研究與商業產品在此題目上幾乎沒有對話關係——學術文獻談「藍圖該長什麼樣、為什麼有效」，商業產品談「怎麼更快畫出來」，兩者論證基礎不同，引用時不要互相當佐證。

---

## 背景｜SBP 方法論學術脈絡（先認識 SBP 本身，不涉及 AI）

### 經典結構

SBP 最經典的五層架構與三條分界線，依 Shostack（1982）、Kingman-Brundage（1988）、Bitner et al.（2008）綜合整理：

**五層架構（由上至下）**
1. 實體證據（Physical Evidence）
2. 顧客行動（Customer Actions）
3. 前台員工行動（Onstage Contact Employee Actions）
4. 後台員工行動（Backstage Contact Employee Actions）
5. 支援流程（Support Processes）

**三條分界線**
- 互動線（Line of Interaction）：顧客 ↔ 前台
- 能見線／可視線（Line of Visibility）：前台 ↔ 後台
- 內部互動線（Line of Internal Interaction）：前台員工 ↔ 支援部門

**三種風險標記（點狀，非橫貫全圖的線）**
- 等待點（W，橘色圓點）：顧客實際排隊等待的那一刻
- 失敗點（F，紅色圓點）：資訊傳遞最容易出錯的環節
- 決策點（D，紫色菱形）：員工需要臨場判斷的環節

> 這三種標記可出現在藍圖的任何一格，數量不限，通常是團隊在工作坊裡逐格討論後才標上去。

---

### 文獻發展四階段

#### 奠基文獻（1977–1988）

| 文獻 | 核心貢獻 |
|---|---|
| Shostack (1977), *Journal of Marketing* 41(2) | 最早提出「服務需要用體驗性框架描述，而非工程術語」，是整個服務藍圖概念的起點 |
| Shostack (1982), *European Journal of Marketing* 16(1) | 正式提出「service blueprint」一詞，以「修鞋攤」為例畫出第一張藍圖，約 1,800 次引用 |
| Shostack (1984), *Harvard Business Review* | 四步驟：界定流程、找出失敗點、訂出時間框架、分析獲利性 |
| Kingman-Brundage (1988/1989), AMA | 把藍圖結構化成「互動線、能見線、內部互動線、實施線」四層分界，約 400 次引用，是後來所有藍圖版本的結構原型 |

#### 擴充與修正（2002–2009）

| 文獻 | 核心貢獻 |
|---|---|
| Berry, Carbone & Haeckel (2002), *MIT Sloan Management Review* | 主張藍圖該納入顧客「感受到的一切」，不只是流程步驟 |
| Morelli (2002), *Design Issues* | 主張藍圖該加入實體／虛擬空間資訊 |
| Patrício, Fisk & Cunha (2008), *Journal of Service Research* | 因應多通路服務，提出「服務體驗藍圖（SEB）」變體 |
| Shimomura, Hara & Arai (2009), *CIRP Annals* | 批評傳統藍圖的流程圖符號太模糊、不一致 |
| **Bitner, Ostrom & Morgan (2008)**, *CMR* 50(3) | **把藍圖變成可操作的工作坊方法論，目前業界最常引用的版本，1,100+ 引用** |

#### 文獻回顧與後設分析

| 文獻 | 核心貢獻 |
|---|---|
| Haugen (2013), NTNU 碩士論文 | 用文獻回顧加上 2 位資深服務設計師訪談，系統性整理 1977 年至今的藍圖演進史，也點出藍圖的通病：資訊密度太高、跟顧客溝通時反而失焦。目前對「SBP 發展史」整理最完整的一篇 |
| Service Blueprint Technique Literature Review (2021) | 回顧近 40 年 SBP 在不同產業（鞋店、證券、飯店、銀行、花店）的應用案例，整理推動與阻礙採用的關鍵因素 |

#### 現代延伸應用

| 文獻 | 核心貢獻 |
|---|---|
| Ryu, Lim & Kim (2020), *Journal of Retailing and Consumer Services* | 提出「O2O 服務藍圖」，處理線上線下整合的服務流程 |
| Jang, Ryu & Guidi (2025), *PLOS ONE* | 提出「區塊鏈服務藍圖」，用專家訪談驗證有效性，是 SBP 方法論目前最新的延伸之一 |

**理解這條發展脈絡後可以看出**：SBP 從「效率導向的管理工具」（Shostack）逐步演進成「顧客體驗導向的設計工具」（Bitner et al.），並持續因應新的服務型態（多通路、O2O、區塊鏈）延伸出變體版本。

---

## 導言｜SBP 各斷點的 AI 介入觀點

服務藍圖由四條分界線（互動線、能見線、內部互動線、實施線）加上三種風險標記（等待點、失敗點、決策點）構成完整的斷點地圖。這七個斷點對 AI 介入的適合程度並不一樣：

### 互動線（顧客 ↔ 前台）
目前 AI 介入最多、也最成熟的斷點。聊天機器人、語音客服、App 內建智能搜尋或推薦，可以直接取代或輔助重複性高、規則明確的前台請求（查詢進度、簡單問答、預約變更），對應 Mortati & Freitas 框架中的 AI-to-Human 象限。

### 能見線（前台 ↔ 後台）
AI 可以把原本只有後台知道的處理進度即時同步給顧客（物流追蹤、審核狀態自動推播），等於用 AI 把部分後台流程主動透明化，直接降低顧客焦慮與詢問量。Magyari & Secomandi 案例中「AI 預填欄位、醫師保有否決權」的介面設計，也是把能見線上的 AI 角色明確化的具體做法。

### 內部互動線（前台員工 ↔ 後台系統／支援流程）
AI 投資報酬率最高的區塊：自動工單分派、跨部門資料核對、審核流程的初步篩選都能明顯縮短流程時間。AI 能分析支援工單與事故紀錄，自動抓出反覆出現的失敗模式並標出對應的流程節點，是人工分析要花數天才能完成的工作。

### 等待點
AI 排隊預測與資源動態調度是這個斷點的強項——用 AI 預測等待時間並主動告知顧客，或依即時資料動態調整客服人力，縮短實際等待或至少降低等待的不確定感。

### 失敗點
AI 適合做異常偵測與預警，在問題真正影響顧客之前就先介入（例如設備故障預測、自動觸發維修排程）。

### 決策點（AI 介入最需謹慎的斷點）
規則清楚的決策（額度試算、資格初篩）AI 可以代勞，但涉及例外判斷、顧客申訴、跨部門責任歸屬的決策，建議維持人工判斷，AI 最多做輔助建議。Mortati & Freitas 框架中反覆強調的「可課責性」與「可解釋性」問題，正是集中在這個斷點上。

### AI 目前做不到的部分
幾個來源都指向同一個結論：
- AI 只能根據「寫下來的流程」或「訪談裡講出來的內容」畫藍圖
- 員工實際的變通做法、非正式的跨部門協調是 AI 觀察不到的
- 「這條線該不該對顧客可見」這種策略判斷不該由 AI 決定

> AI 生成的藍圖如果沒有組織內部的人加入驗證，畫出來的是「文件上寫的流程」而不是「實際在跑的流程」——而兩者之間的落差，正是服務藍圖存在的意義。

---

## 第一部分｜學術研究

### 文獻整體時間軸

| 年代 | 作者／文獻 | 核心貢獻 | 主要限制 |
|---|---|---|---|
| 1977–1982 | Shostack | 提出服務需要獨立於產品行銷的設計語言 | 尚無具體工具 |
| 1984 | Shostack, HBR | 發明「藍圖」與「失敗點」概念；確立可視線 | 僅單一可視線，難處理複雜多角色服務 |
| 1989 | Kingman-Brundage | 三條結構線（互動線／可視線／內部互動線） | 仍是靜態快照，無參與方法論 |
| 2008 | Bitner, Ostrom, Morgan | 五元件模型成為業界標準；首提「前台科技列」 | 科技被畫成整條泳道而非個別行動者 |
| 2008–2011 | Patrício, Fisk, Cunha, Constantine | 多通路 SEB 與三層次 MSD 方法 | 複雜度高、採用門檻高 |
| 2018 | Wirtz et al. | 系統性研究服務機器人＋AI 的前線角色 | 偏重實體機器人，未提出圖示法 |
| 2024 | 數位共競框架論文 | 新增「網絡前台泳道」處理平台生態系 | 聚焦企業間關係，非單一 AI 行動者決策 |
| 2025 | Magyari & Secomandi | 藍圖作為 UX 與 ML 團隊溝通的邊界物件 | 單一個案，AI 仍屬輔助型 |
| 2026 | Mortati & Freitas | 人機混合互動四類型框架 | 概念先行，符號系統未定 |
| 2025–2026 | Forlizzi | 提出「三方共構服務」（人＋顧客＋AI） | 立場性隨筆，無具體新方法 |

---

### 1｜Shostack, G. L.（1977 / 1984）— 方法的原點

| 項目 | 內容 |
|---|---|
| **類型** | 概念性／規範性論文。1977〈Breaking Free from Product Marketing〉；1984〈Designing Services That Deliver〉，HBR |
| **脈絡** | 服務行銷剛從產品行銷分化出來的時期。作者是 Bankers Trust 資深副總裁，問題意識來自銀行業 |
| **核心論點** | 服務失敗常被歸咎於「人的疏失」，但真正病因是缺乏系統性的設計與控制方法。解方是在既有流程圖上加入顧客旅程那一側，形成規劃整體服務體驗的視覺工具 |
| **方法** | 四步驟：辨識流程、隔離失效點、建立時間框架、分析獲利性 |
| **貢獻** | 確立「可視線」這個延續至今的結構；把服務交付轉變為可被記錄、衡量、控制、改善的對象 |
| **可讀性** | HBR 版極高，約 8 頁、有圖、無統計。**建議直接讀 HBR 版** |

---

### 2｜Bitner, Ostrom & Morgan（2008）— 現行學術標準版

| 項目 | 內容 |
|---|---|
| **類型** | 回顧型論文＋多重個案。*California Management Review* 50(3)，引用次數超過 1,100 次 |
| **核心論點** | 藍圖可能是衡量服務成效最好的方法；此技術獨特之處在於「毫不妥協地以顧客為中心與基礎」 |
| **標準格式** | 五元素：(1) 實體證據、(2) 顧客行動、(3) 前台行動、(4) 後台行動、(5) 支援流程；三條線：互動線、可視線、內部互動線 |
| **技術伏筆** | 已預見純數位服務畫法問題——建議把「前台接觸員工行動」列改為「前台科技行動」列，這是後來「AI 行動者」爭論的最早雛形 |
| **可讀性** | 高。**若你只讀一篇，讀這篇** |

> **研究問題**：
> - 以上架構涉及的 AI 架構方法與限制可能是什麼？（ex. 前後台服務區分不易）
> - 服務藍圖是以顧客體驗為中心的（HCD），我們的 SBP 要避免變成以營運流程為主導的藍圖 — 如何界定是以人為中心的 SBP？有哪些判斷標準？

---

### 3｜Patrício, Fisk, Cunha & Constantine（2008 / 2011）— 多通路與多層次

| 項目 | 內容 |
|---|---|
| **2008 SEB** | Service Experience Blueprint：首次系統性處理「多通路服務」——顧客混用網路、電話、實體門市等不同介面，單一線性藍圖畫不出切換過程 |
| **2011 MSD** | Multilevel Service Design：三層次架構——顧客價值星群（Customer Value Constellation）→ 服務系統架構 → 服務體驗藍圖。藍圖第一次跳脫「單一流程圖」，變成分層系統性方法論 |
| **限制** | MSD 大幅提高學習門檻，實務採用率遠不如 Bitner et al.（2008）；三層架構仍假設行動者是人類或固定規則系統 |

---

### 4｜Wirtz et al.（2018）— 服務機器人前哨期

| 項目 | 內容 |
|---|---|
| **類型** | 概念性研究，*Journal of Service Management* 29(5)，該年度最佳服務文章獎入圍 |
| **核心貢獻** | 系統性檢視機器人服務的關鍵維度；明確討論何種任務由機器人主導、人類主導、人機協作；提出個人、市場、社會三個層次倫理議題 |
| **意義** | 第一篇系統性處理「機器人交付前線服務」的概念型論文；指出服務業正處於類似十八世紀製造業工業革命的轉折點 |
| **限制** | 以「機器人」（有實體形態）為主要討論對象，對純軟體型 AI 著墨較少；屬概念性論述，未提出如何把「AI 行動者」實際畫進藍圖的具體圖示法 |

---

### 5｜數位共競框架（2024）— 網絡協作重構

| 項目 | 內容 |
|---|---|
| **來源** | *Journal of Infrastructure, Policy and Development* 8(9), article 7072 |
| **核心論點** | Kingman-Brundage 的基本原則仍適用，但有迫切需要演化——藍圖必須納入數位科技與競合網絡（coopetition networks）帶來的複雜性 |
| **核心貢獻** | 提出「網絡前台泳道」（cyber frontstage lane），視覺化混合人類與科技資源的前台互動 |
| **限制** | 聚焦於企業間 B2B、平台生態系的競合關係；新增泳道本質上仍是延伸既有符號系統 |

---

### 6｜Magyari & Secomandi（2023）— 目前最相關的 AI × SBP 同儕審查文獻

**出處**：*International Journal of Design* 17(3), 63–77. DOI: 10.57698/v17i3.04（開放取用，CC BY 4.0，TU Delft）  
**方法論**：探索性案例研究（design research／case study），在荷蘭兩間學術醫院與一間醫療科技新創進行，並非對照實驗。

**研究脈絡**：Digital scribe 是結合語音辨識（ASR）與自然語言處理（NLP）的 AI 系統，用來記錄並整理骨科門診對話成結構化病歷。背景數據：荷蘭臨床醫師平均約 35% 工作時間花在行政作業上，每 1 小時看診約需再花 2 小時做紀錄。

**團隊組成**：新創公司開發團隊 8 人（3 位 ASR 工程師、2 位 NLP 工程師、1 位後端工程師、1 位產品經理、1 位醫療顧問），另聘 1 位 UX 設計研究員（本文第一作者）負責介面設計。

**四階段流程：**

| 階段 | 內容 |
|---|---|
| **使用者研究** | 訪談 6 位骨科醫師＋2 位其他科醫師（每次 30–45 分鐘，ATLAS.ti 做主題編碼），對 2 位骨科醫師進行全班次工作觀察（job shadowing） |
| **統整** | 產出兩種人物誌——「多工型（Multitasker）」（看診中同步完成紀錄，病例較簡單）與「平衡型（Balancer）」（延後紀錄，病例較複雜），繪製旅程地圖，用 MoSCoW 法排定需求優先順序 |
| **概念設計** | 先由技術負責人提供「黑盒子」式的軟體架構圖，UX 設計師再逐步加入技術細節、資料格式、子流程、使用者故事板，透過定期會議反覆修正成完整服務藍圖。藍圖以「能見線」分隔前台（服務介面：開始/暫停/停止錄音、選擇模板、接受/修改/拒絕 AI 建議、複製文字到轉診信、儲存筆記）與後台（服務基礎設施：ASR 與 NLP 的處理流程）；最終採「混合主導（mixed-initiative）」人機協作模型，AI 預填病史模板欄位、醫師保有最終編輯與否決權 |
| **使用者測試** | 4 位骨科醫師測試互動式雛型，並事後訪談 2 位機器學習工程師，了解服務藍圖對協作的實際幫助 |

**評估方式**：質化為主，沒有統計檢定。唯一的量化工具是 12 題 TAM 量表（6 點量表，n=4），作者明確指出「不具統計顯著性」，僅供參考。

**核心論點**：藍圖的價值不在產出圖，而在**它是 UX 設計師與 ML 工程師之間的翻譯介面**。UX 設計師把軟體架構圖轉譯成服務藍圖，等於「為 ML 工程師拆解使用者」；把 AI 放在「服務基礎設施」這一層，等於把 AI 框定為組織資源之一，而非產品本身。

**三項質化協作效益（可直接引用）**：
1. **共同理解設計挑戰**：藍圖讓 UX 設計師得以向 ML 工程師「解讀使用者」，雙方能把使用者行動對應到 AI 流程的輸入輸出
2. **用使用者洞察豐富資料驅動的 AI 創新**：使用者研究發現醫師希望 AI 建議能「隨時間學習進步」，這個需求透過藍圖被明確追溯到對應的 NLP 流程調整
3. **把 AI 視為組織的共創資源**：把 ASR/NLP 框定成後台基礎設施，促使團隊進一步思考其他利害關係人與資源需求

**限制（作者自陳）**：探索性研究、單一情境（荷蘭醫療體系中一家新創與一位研究生的合作），推論須謹慎；呼籲後續研究做更嚴謹的開發、實施與評估。

> **研究問題**：
> - 服務藍圖需要的 input 資料架構——延伸思考我們可以 input 哪些資料？
> - 整合出的服務藍圖目標用途是什麼？有人視為溝通工具，有人視為系統性洞察來源
> - 可參考 Mortati & Freitas (2026) 2×2 AI in Service Design 架構

---

### 7｜Mortati & Freitas（2026）— 人機混合互動框架

**出處**：*Journal of Service Research*（SAGE），pp. 1–16. DOI: 10.1177/10946705251344387（Politecnico di Milano 設計系，線上優先刊出）  
**方法**：作者明確自陳「透過理論綜合與文獻分析」建構此框架，並未進行任何實證研究——沒有訪談、沒有案例研究、沒有統計分析。

**核心貢獻——「混合服務接觸」2×2 框架：**

以「提供者是人／AI」與「使用者是人／AI」交叉出四個象限：

| 象限 | 說明 | 關鍵爭議 |
|---|---|---|
| **Human-to-Human** | AI 隱身後台輔助人類決策（ex. 資料分析輔助醫師問診），前台仍是真人對真人互動 | AI 該不該對顧客揭露、信任問題 |
| **Human-to-AI（「AI 作為使用者」）** | AI 代替人類行動或做使用決策（ex. Google Duplex 代打電話訂位），後台反而是人類要把決策邏輯轉譯成 AI 看得懂的格式 | 課責性問題 |
| **AI-to-Human（「AI 作為服務提供者」）** | AI 是提供者、人是使用者，目前研究最成熟的象限（Amazon、Netflix 推薦系統），後台 AI 持續依資料動態調整顧客旅程 | 演算法解釋性 |
| **AI-to-AI（「interAI」）** | 演算法之間互動、無人類介入的「資訊密集型服務」（ex. 紅綠燈號控制系統、自駕車間通訊） | 可課責性與可追溯性（懸而未解） |

**對設計角色、流程、產出的影響（概念性主張，尚待實證）：**
- **設計師角色**：從「創造者」轉為「協調者／編輯者／守門人」
- **流程**：從線性走向反覆的生命週期式工作流，需要新技能如提示工程（prompt engineering）、資料架構設計
- **產出**：從單純的人類介面擴及機器可讀的資料結構、治理協議，並衍生 AI 參與產出時的著作權歸屬新問題

**與服務藍圖的關聯**：傳統藍圖假設服務是「預先寫好腳本、循序發生的」，但 AI 帶來「適應性、資料驅動、自我學習」的特性，靜態藍圖已無法完整捕捉人對人、人對 AI、AI 對 AI 交錯發生的複雜互動。

**限制（作者自陳）**：框架仍偏概念與類型學層次；「四種互動類型如何具體轉譯成圖面上的視覺符號」，論文本身也承認是開放問題；作者明言「未來研究應對此框架進行實證檢驗」。

---

### 8｜Forlizzi（2025）— Agentic AI 的服務設計前哨

[Medium 隨筆](https://medium.com/@forlizzi/service-design-tools-can-inform-the-design-of-agentic-ai-services-fa4d118fb74a)（非同儕審查）

她把服務區分為三代：
1. **Narrow AI**：用交付資料找模式做預測
2. **生成式 AI**：LLM 經聊天介面，即 co-pilot
3. **Agentic AI**：接收一組任務並自主操作執行

**核心問題（開放問題，非結論）**：「服務藍圖在這裡要怎麼運作？當大部分流程可能是自主的，把它模型化還有用嗎？」

**重要澄清**：坊間有文章把這詮釋成「AI agent 需要第三種泳道」，那是二次來源的引申，不是她的原話，引用時請注意。

---

### 9｜其他值得知道的學術脈絡

| 作者 | 貢獻 |
|---|---|
| Kingman-Brundage, George & Bowen (1995) | 提出「service logic」，是「執行線 line of implementation」概念的來源 |
| Sampson (2012), *JSR* 15(2) | 把服務藍圖廣義定義為「以使用者或服務的其他最終受益者為中心的流程圖技術」，是引用起來最簡潔的學術定義 |
| Lee & Forlizzi (2009) | 最早把藍圖法用於 HCI（社交機器人互動）的研究之一 |
| Yildirim et al. (2022), CHI | 在跨職能 AI 團隊中用藍圖法促進不同專業間對「資料」的溝通，是 AI × 藍圖最接近的前作 |

---

### 學術文章流程比較表

| 案例／類型 | 主要流程 | 資料輸入來源 | AI／研究產出內容 | 人力涉入 | 量化實證 |
|---|---|---|---|---|---|
| **Magyari & Secomandi（案例研究）** | 使用者研究→統整（人物誌＋旅程圖＋需求排序）→概念設計（服務藍圖＋使用者流程）→雛型測試 | 6 位骨科醫師＋2 位其他科醫師訪談、2 位醫師全班次觀察、4 位醫師雛型測試、2 位 ML 工程師訪談 | 服務藍圖、人物誌、使用者流程、互動式雛型、混合主導介面設計 | 高（設計師與工程團隊全程共創，AI 是被設計的對象而非設計工具） | 質化為主；唯一量表（TAM, n=4）明確標註不具統計顯著性 |
| **Mortati & Freitas（文獻回顧＋框架）** | 文獻回顧→比較既有 AI 定義→提出 2×2 混合服務接觸框架→以示範案例說明各象限→推導設計角色／流程／產出的變化 | 既有學術文獻、產業示範案例（非第一手資料） | 概念性框架（4 象限）、Service AI 定義、未來研究問題清單 | 未涉及實際操作（純理論建構） | 無；作者自陳「未來研究應實證檢驗」 |

---

## 第二部分｜商業產品

> **共同提醒**：以下所有商業工具的說明文件全為內容行銷，無公開量化實證資料。AI 生成的是**假設**，不是**發現**。

### UXPressia

同時提供顧客旅程地圖與服務藍圖工具，是本文來源中**唯一在「服務藍圖」產品頁面明確描述 AI 用途的商業工具**。

| 項目 | 內容 |
|---|---|
| **流程** | 使用者輸入顧客旅程、前台／後台流程 → AI 進行「洞察挖掘（insight mining）」找出顧客行動與前後台流程間的落差與依賴關係 → 產出優先排序的行動方案並連結任務追蹤功能 |
| **底層技術（官方公開）** | 透過 OpenAI／Anthropic／Google 等 LLM 供應商 API 做內容生成；用 Pinecone 做向量嵌入與 RAG 支援「工作區洞察」功能；提供逐格 AI 編輯（翻譯、擴寫、簡化、抓錯字、調整語氣）與整張地圖層級 AI 助理（新增階段、找痛點、給改善建議、產出摘要） |
| **資料真實性** | 使用者可自行選擇輸入真實質化資料（訪談、顧客回饋）或用簡短描述生成草稿，資料基礎彈性較大 |
| **人力涉入** | 中；官方文件明文提醒「使用者需自行驗證 AI 產出內容後才能發布或依賴」 |
| **優勢** | 唯一明確描述「分析既有藍圖找問題」而非只從零生成藍圖的工具；技術棧透明（公開說明用哪些 LLM/RAG 技術） |
| **缺點** | 無公開實證研究；AI 產出品質仍需人工驗證 |

---

### Miro（AI Service Blueprint / Flows）

| 項目 | 內容 |
|---|---|
| **策略** | 把藍圖定位成「研究資料的下游產物」而非獨立圖表。把研究筆記、逐字稿、工作坊產出丟進去，由 Flows 整合成單一視圖，並同步產生旅程、觸點與泳道 |
| **流程** | 把顧客研究資料、既有流程文件、CRM 資料、系統日誌等餵給 Miro AI → AI 產出包含顧客行動、前台互動、後台流程、支援系統的初版服務藍圖 → 團隊在協作畫布上共同編輯，AI 持續提供情境建議 |
| **輸入端** | OKR、CJM、Persona、既有流程文件、CRM 資料、系統日誌 |
| **輸出端** | Insight-to-journey Synthesis、Current State SBP、Pain Points & Opportunities、Future State SBP、Service Improvement Action Plan |
| **特色主張** | 「AI 能發現人工難以察覺的隱藏模式」（ex. 後台 12 秒延遲如何在三個接觸點後才反映成顧客不滿）；並展望「AI agent 能自主優化服務流程」——但明確歸類為「即將到來（what's coming next）」，即目前尚未成熟 |
| **優勢** | 協作與工作坊場景最成熟；輸入端接受非結構化素材，符合真實研究流程 |
| **缺點** | 行銷語言遠超實證；畫布自由度高＝一致性差，多人編輯後藍圖常失去三線結構；無具體客戶案例佐證 |

> **洞察（真正有價值的觀點）**：傳統藍圖在有人想起要更新之前都是靜態的，AI 藍圖應隨新的顧客資料、績效指標與營運變動持續演進——否則只是又一份初期興奮過後就沒人看的文件。

> **研究問題**：
> - 可參考輸入內容的結構，甚至進一步有沒有機會串接過去的 Persona AI tool？以系統的、結構化的方式生成內容
> - 避免 AI 產出扁平化，要如何讓人參與當中？

---

### Creately

| 項目 | 內容 |
|---|---|
| **策略** | 文字轉圖，強調結構正確性與資料主權。以自然語言描述服務流程，自動生成含泳道、觸點與角色的結構化藍圖；宣稱不使用第三方 AI 工具，資料留在平台內 |
| **官方描述** | 僅止於「AI 分析資料以找出瓶頸、低效與改善機會，並支援即時更新讓藍圖保持與流程同步」，沒有進一步拆解實際操作步驟 |
| **優勢** | 產出直接帶有顧客行動、前台、後台、支援流程的泳道結構，且可編輯；可匯出 SVG／PDF／PNG／JPEG；上手快 |
| **缺點** | 資訊揭露最少——四個商業案例中資訊量最薄，純粹是行銷用語，無流程細節、無案例佐證、無公開實證資料；AI 能「找出斷點、冗餘與優化機會」的宣稱是語言模型的常識推測，非基於你的營運資料 |

---

### thehuman2ai.com（方法論指南）

與實務經驗分享中 NN/g 的角色類似，這是一篇由研究方法論網站發布、聚焦「怎麼做」的完整操作指南，是本文商業／實務來源中**方法論最完整的一篇**。

**完整十步驟流程：**

1. 界定範圍與情境
2. 組成跨部門團隊並取得高層支持
3. 同時蒐集顧客與員工兩端的研究資料（建議各 5–10 人）
4. 由左到右畫出顧客行動列
5. 加入前台員工行動（以互動線分隔）
6. 加入後台員工行動（以能見線分隔）
7. 畫出支援流程與系統（以內部互動線分隔）
8. 加入實體證據、失敗點（F）、等待點（W）
9. 找 2–3 位沒參與工作坊的第一線員工驗證藍圖是否符合實際運作
10. 排定優先順序並訂出行動計畫

**AI 角色明確評級：「部分（partial）」**

| AI 能做 | AI 做不到 |
|---|---|
| 彙整員工訪談逐字稿成結構化清單 | 揭露「實際流程」而非「文件寫的流程」 |
| 比對顧客旅程資料與員工流程資料找出對應關係 | 跨部門的責任歸屬協商 |
| 解析既有 SOP 文件產出初版流程 | 決定「能見線該畫在哪裡」這種策略判斷 |
| 從客服工單／事故紀錄中偵測反覆出現的失敗模式 | 排序改善優先順序的策略對話 |
| 產出藍圖各欄位的初版文字內容 | — |

**效率主張**：導入 AI 後，工作坊前的準備時間可從傳統 1–2 週壓縮到 2–3 天出草稿；但工作坊本身「AI 角色有限」，價值在於讓真人講出跟文件不一致的真相。

---

### 專業 CX 平台（Smaply / Custellence / TheyDo / UXPressia）

| 項目 | 內容 |
|---|---|
| **策略** | 不做通用畫布，做「旅程管理系統」 |
| **Smaply** | 把痛點、機會、解方變成可評分、可追蹤的實體，提供優先排序視圖；另有可從原始證據追溯到決策的 AI 研究綜整；**明確支援服務藍圖工作**，在自動化顧客或員工流程之前，幫助區分前台體驗與後台營運工作 |
| **Custellence** | 專注製圖層，優先排序仰賴外部工具 |
| **缺點** | 導入成本高、學習曲線陡；企業對 SSO、角色權限、加密、資料隱私的期待也在提高，小團隊通常撐不起 |

---

### 輕量 AI 製圖工具（chatdiagram、DFIRST 等）

| 項目 | 內容 |
|---|---|
| **策略** | 零註冊、單次任務。輸入想法或上傳描述流程的檔案，AI 分析後產生圖表 |
| **優勢** | 起手成本近乎零，適合個人備課、寫提案時的示意圖 |
| **缺點** | 沒有協作、版本、證據連結。**藍圖的價值有一半在「一群人一起做」這個過程**，這類工具結構性地放棄了它 |

---

### 商業案例流程比較表

| 案例 | 主要流程 | 資料輸入來源 | AI 生成內容 | 人力涉入 | 量化實證 |
|---|---|---|---|---|---|
| **UXPressia** | 輸入顧客旅程／前後台流程→AI 洞察挖掘找落差→產出優先排序行動方案 | 真實質化資料（可選）或簡短描述 | 洞察報告、行動方案、逐格／整張地圖 AI 編輯建議 | 中（AI 產出需人工驗證後才能使用） | 無，僅產品說明文件 |
| **Miro** | 餵入顧客研究／流程文件／CRM／系統日誌→AI 產出初版藍圖→團隊協作修正 | 既有流程文件、CRM 資料、系統日誌 | 初版服務藍圖（顧客行動／前台／後台／支援系統）、情境建議 | 中（AI 起草、團隊在畫布協作） | 無，行銷文章無案例實測數據 |
| **Creately** | AI 分析資料找瓶頸與改善機會（官方描述極簡） | 未說明 | 未說明（僅提供可編輯範本） | 未說明 | 無，僅範本頁說明文字 |
| **thehuman2ai.com** | 十步驟完整流程 | 顧客訪談（5–10 人）＋員工訪談（5–10 人）＋既有 SOP 文件 | 結構化流程清單、初版藍圖草稿、失敗模式偵測、藍圖各欄位文字 | 高（明確定位 AI 僅加速前後製，工作坊核心仍是人力） | 無，但明確自評「AI 相容性：部分」並列出具體限制 |

---

## 第三部分｜實務經驗

### Nielsen Norman Group（最具方法論可信度）

NN/g 的內容基礎是他們對實務者的調查研究，不是單一顧問的意見。

| 文章 | 核心論點 |
|---|---|
| [5 Steps to Service Blueprinting](https://www.nngroup.com/articles/5-steps-service-blueprinting/) | 成功的藍圖驅動的是組織對齊與行動。五步驟：找到支持→定義目標→蒐集研究→繪製藍圖（先低精細度）→精煉與散布。強調迭代：先用人物誌、同理心地圖、旅程地圖做第一版 |
| [Service Blueprints: How to Choose What Experience to Visualize](https://www.nngroup.com/articles/service-blueprints-choose-what-experience/) | **範圍是新手最大的失敗點**。三個 scope：Small（≤2 個接觸點）、Medium（2–5）、Large（5+）。中小範圍對多數情境最適合。接觸點選擇可參考：問題點、可控性、商業模式規劃、節省研究、量化潛力 |
| [Service Blueprinting FAQ](https://www.nngroup.com/articles/service-blueprinting-faq/) | **精細度必須對應設計階段**。越早期精細度越低；早期重點是對齊認知，後期是溝通願景與設定目標；建議從便利貼開始。適用時機：全通路、多觸點、或需跨部門協調的體驗 |
| [Service Blueprinting in Practice: Who, When, What](https://www.nngroup.com/articles/service-blueprinting-practice/) | **過程與產出物同等重要**。製作過程本身促成跨職能溝通、建立共識；作為產出物，藍圖用來辨識服務弱點與冗餘、成為單一事實來源、影響組織 roadmap |
| [A Guide to Service-Blueprinting Workshops](https://www.nngroup.com/articles/service-blueprinting-workshops/) | **藍圖是敘事，不是清單**。工作坊不會畫進每一個互動，只畫最重要的——結束時一定會留下知識缺口與未解問題，不會產出完整或精緻的藍圖 |

> **研究問題**：
> - NN/g 可以作為輔助生成五元素三線的內容架構、input 來源
> - SBP 需要不斷迭代、不斷限縮範圍
> - 服務藍圖是動態變更的歷程
> - 當 AI 一開始就產出高精度的內容，會不會進一步誘導人產生錯誤共識？

---

### Sophia Exintaris（實務顧問，2025）

[連結](https://eurydice13.com/2025/06/i-can-tell-you-where-to-stick-your-ai-service-blueprints-a-reverse-treasure-map-to-operational-improvements/)

**核心論點**：藍圖是尋找 AI 導入點的探勘工具，而非 AI 的產物。當泳道裡放的是「行動者」時，把一組營運加速器（含 agentic AI、自助化、啟發式改善等）與每個步驟的每個角色做矩陣交叉，逐格思考該方法或技術能帶來什麼。目前把藍圖與 AI 導入決策接起來最務實的一篇。

---

### SI Labs（2026 長文）

[連結](https://www.si-labs.com/en/articles/service-blueprint/)

**核心論點**：服務失敗的成因通常不在它被經歷的那一層。多數服務失敗不源自顧客感受到的地方，而是往下一到三層、在顧客旅程地圖捕捉不到的後台。附 90 分鐘工作坊流程、B2B 保險業填寫範例、七個常見錯誤。

**可信度提醒**：低於 NN/g（顧問公司內容行銷），但**是目前唯一把學術脈絡與實務流程接在一起的單篇文章**，適合當導覽圖，引用時再回頭找原始文獻。

---

## 第四部分｜跨類別比較

### 資料真實性光譜

```
完整真實資料 ←──────────────────────────────────────────→ AI 合成生成

Magyari & Secomandi    NN/g（調查研究）    UXPressia    Miro（CRM/日誌）    Creately／Mortati
（真實訪談＋工作觀察）   thehuman2ai.com    Exintaris    Smaply              & Freitas（概念推論）
```

一端是完全基於真實一手資料運作（Magyari & Secomandi 的訪談與工作觀察、UXPressia 可上傳真實質化資料、thehuman2ai.com 明確要求訪談 5–10 位顧客與 5–10 位員工），中間是可整合既有企業資料但顆粒度較粗（Miro 整合 CRM/系統日誌），另一端則是純粹的行銷範本或概念性框架（Creately 的範本頁、Mortati & Freitas 以示範案例說明框架）。

---

### 三大核心落差

| 落差 | 學術／NN/g 立場 | 商業工具立場 |
|---|---|---|
| **方向性** | 藍圖「毫不妥協地以顧客為中心」，從顧客行動推導後台 | AI 生成邏輯是從流程描述反推顧客行動——方向相反，容易產出「營運流程圖穿上藍圖的衣服」 |
| **過程 vs 速度** | 共創過程本身就是產出，促成跨職能溝通與共識 | AI 工具的價值主張是「省下這個過程」——直接衝突，不是互補 |
| **精細度節奏** | 低精細度起步、逐步提高 | 預設輸出高精細度成品，讓團隊在證據不足時就對漂亮的圖產生錯誤共識 |

---

### 實證嚴謹度落差

六個來源中：
- **Magyari & Secomandi**：唯一有真實的產業案例研究（有實際受訪者、工作觀察、雛型測試）——若要引用「AI 對服務藍圖製作有實質幫助」的具體證據，這幾乎是目前**唯一能提供質化實證觀察的來源**（但仍需注意樣本量小、單一案例的限制）
- **Mortati & Freitas**：框架本身可作為分析工具引用，但不建議引用為已驗證結論
- **商業工具（Miro/Creately/UXPressia）、thehuman2ai.com**：應以「業界觀察」「方法論主張」的方式引用

---

### Generative AI 與 Agentic AI 的分野

套用 Mortati & Freitas 論文的分類架構：

**目前所有服務藍圖相關工具 → 本質上都是 Generative AI**
- Magyari & Secomandi 案例中的 ASR/NLP 系統
- UXPressia、Miro、Creately
- 被動回應使用者輸入或上傳資料，每一步驟都需要人工觸發與確認

**Agentic AI（目前 SBP 領域無成熟實證案例）**
- Miro 官方文章提及「AI agent 能自主優化服務流程」，但明確歸類為「即將到來」的未來展望
- thehuman2ai.com 直接點名 AI 在「揭露實際流程」「跨部門責任協商」「決定能見線位置」等策略性任務上仍完全仰賴人力

> **結論一致**：目前檢視到的服務藍圖相關案例中，尚未出現真正符合「agentic」定義且有實證資料佐證的自動化服務藍圖工具。

---

### 文獻史透露的三個趨勢

1. **從「畫流程」到「畫決策」**：早期（1984–2008）藍圖畫的是「誰在什麼時候做什麼」；晚近（2018 之後）的挑戰是如何畫「AI 為什麼這樣決策」——舊符號系統（泳道＋時間軸）對「機率性、會學習」的行為表達力先天不足。
2. **理論走在方法之前**：2018 年後的文獻多半停留在「我們需要新方法」的呼籲階段，真正被廣泛驗證的「AI 時代新版藍圖符號系統」目前尚未出現——這也是目前這個領域**最大的研究缺口**。
3. **實務界（工具廠商）跑在學界前面**：Miro、Creately 等已在賣「AI 生成藍圖」，但這解決的是「畫圖效率」問題，跟學界真正在辯論的「AI 如何被表徵為服務系統中的行動者」是兩個不同層次的問題，目前幾乎沒有交集。

---

## 第五部分｜結論與引用建議

### 引用建議

| 來源 | 建議引用方式 | 適合的引用情境 |
|---|---|---|
| **Bitner et al. (2008)** | 已驗證的標準格式（1,100+ 引用） | 界定藍圖的五元素三線結構 |
| **Magyari & Secomandi (2023)** | 同儕審查個案研究（質化實證） | 論證「AI 可作為 UX 與 ML 團隊溝通邊界物件」；AI 預填欄位的混合主導設計 |
| **Mortati & Freitas (2026)** | 同儕審查概念框架（非實證） | 分析人機混合四種互動類型；設計師角色轉型的概念討論 |
| **NN/g 系列文章** | 實務調查研究 | 說明製作流程與工作坊設計；範圍選擇建議 |
| **thehuman2ai.com** | 第三方方法論指南 | 說明 AI 能做／不能做的具體邊界；十步驟操作流程 |
| **Forlizzi (2025)** | 立場性學術隨筆 | 討論 agentic AI 的未來方向（注意：開放問題非結論） |
| **Wirtz et al. (2018)** | 概念性前瞻文獻 | 鋪陳服務機器人／AI 前線角色 |
| **Miro / Creately / UXPressia** | 業界作法／產品觀察 | 說明市場上現有解決方案的取向（不可當實證引用） |
| **SI Labs, Exintaris** | 實務顧問觀察 | 輔助說明實務作法（低於 NN/g 可信度） |

### 務實結論

**AI 適合處理**：轉錄整理與草稿生成（把訪談逐字稿整理成候選步驟、產出初版泳道文字）

**不適合決定**：可視線位置、失效點判定、範圍取捨——而後三者正是所有文獻公認決定藍圖好壞的地方。

---

## 待討論（TBD）

### 方法論層次
- [ ] SBP 方法論 → 消化後建立大框架
- [ ] AI 時代的結構層、互動線，是否要把 AI 納入新的一層？會不會是 AI 上的商業服務 → 限縮範圍、數位化程度高
- [ ] NN/g 主張低保真起步，AI 的預設是高保真一次到位——我們站哪邊？

### 工具設計層次
- [ ] 競品座標圖（輸入端豐富度 × 輸出端可驗證性）—— 目前還沒完全 ideal 的工具
- [ ] 定義 SBP Tool KPI / Goal ⭐
- [ ] 盤點 input 類型，定義最低輸入門檻
- [ ] Persona 的導入
- [ ] 避免扁平化的 HITL 機制
- [ ] Agents 架構
- [ ] 迭代架構
- [ ] 有沒有現成工具可以串接？ex. Persona, HMW...

### Dr. Tang Discussion
- [ ] SBP 是串接很多工具的內容，有沒有現成資料是我們可以拿來測試的？
- [ ] 能不能跟++索取資料

---

## 參考來源（供查核）

### 學術性文章

- **[學術]** Magyari, R., & Secomandi, F. (2023). Service Blueprinting for Better Collaboration in Human-Centric AI — *International Journal of Design*  
  https://www.ijdesign.org/index.php/IJDesign/article/view/4911/1048

- **[學術]** Mortati, M., & Viana Mundstock Freitas, G. (2026). AI in Service Design: A New Framework for Hybrid Human–AI Service Encounters — *Journal of Service Research*  
  https://journals.sagepub.com/doi/10.1177/10946705251344387

### SBP 方法論本身（非 AI）基礎文獻

- Shostack, G.L. (1977). Breaking Free from Product Marketing. *Journal of Marketing*, 41(2), 73–80.
- Shostack, G.L. (1982). How to Design a Service. *European Journal of Marketing*, 16(1), 49–63.（首次提出「service blueprint」一詞）
- Shostack, G.L. (1984). Designing Services That Deliver. *Harvard Business Review*, Jan–Feb, 132–139.
- Kingman-Brundage, J. (1988/1989). The ABC's of Service System Blueprinting. In *Designing a Winning Service Strategy*, AMA.（四線分界結構的原型）
- Berry, L.L., Carbone, L.P., & Haeckel, S.H. (2002). Managing the Total Customer Experience. *MIT Sloan Management Review*, 43(3).
- Patrício, L., Fisk, R.P., & Cunha, J.F. (2008). Designing Multi-Interface Service Experiences: The Service Experience Blueprint. *Journal of Service Research*, 10(4), 318–334.
- Bitner, M.J., Ostrom, A.L., & Morgan, F.N. (2008). Service Blueprinting: A Practical Technique for Service Innovation. *California Management Review*, 50(3), 66–94.
- Haugen, M. (2013). Service blueprints – Persistent qualities and future potential. NTNU.（SBP 發展史的文獻回顧＋實務訪談）  
  https://www.ntnu.no/documents/10401/1264433962/MargretheHArtikkel.pdf
- Service Blueprint Technique for Designing and Improving Service: A Literature Review (2021).  
  https://www.researchgate.net/publication/351919332
- Ryu, D.-H., Lim, C., & Kim, K.-J. (2020). Development of a service blueprint for the online-to-offline integration in service. *Journal of Retailing and Consumer Services.*  
  https://www.sciencedirect.com/science/article/abs/pii/S0969698919303881
- Jang, H., Ryu, D.-H., & Guidi, B. (2025). Development of a service blueprint for blockchain services. *PLOS ONE.*  
  https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0317449

### 商業案例與實務指南

- **[商業]** UXPressia — Service Blueprinting for Teams：https://uxpressia.com/service-blueprint
- **[商業]** UXPressia — How UXPressia uses AI（技術棧說明）：https://help.uxpressia.com/en/articles/9970673-how-uxpressia-uses-ai
- **[商業]** Miro — AI Service Blueprint：https://miro.com/ai/ai-service-blueprint/
- **[商業]** Creately — AI Service Blueprint Template：https://creately.com/diagram/example/yTJPQPbqL7B/ai-service-blueprint
- **[實務]** thehuman2ai.com — How to create a service blueprint: a practical guide with AI prompts：https://thehuman2ai.com/research/guides/service-blueprint
- **[實務]** NN/g — 5 Steps to Service Blueprinting：https://www.nngroup.com/articles/5-steps-service-blueprinting/
- **[實務]** NN/g — Service Blueprinting FAQ：https://www.nngroup.com/articles/service-blueprinting-faq/
- **[實務]** Sophia Exintaris (2025)：https://eurydice13.com/2025/06/i-can-tell-you-where-to-stick-your-ai-service-blueprints-a-reverse-treasure-map-to-operational-improvements/
- **[實務]** SI Labs (2026)：https://www.si-labs.com/en/articles/service-blueprint/
- **[實務]** Forlizzi, J. (2025). Service Design Tools Can Inform the Design of Agentic AI Services：https://medium.com/@forlizzi/service-design-tools-can-inform-the-design-of-agentic-ai-services-fa4d118fb74a

### 延伸閱讀（服務前台 AI 相關補充學術文獻）

- George, A. (2025). Artificial Intelligence in Frontline Service Encounters: A Systematic Review and Research Agenda. *International Journal of Consumer Studies.*  
  https://onlinelibrary.wiley.com/doi/10.1111/ijcs.70048
- Artificial intelligence and work design: implications for frontline service employees and future research. *Journal of Service Management* (2025).  
  https://www.emerald.com/josm/article/doi/10.1108/JOSM-12-2024-0535
- McLeay, F. et al. (2021). Replaced by a Robot: Service Implications in the Age of the Machine. *Journal of Service Research.*  
  https://journals.sagepub.com/doi/full/10.1177/1094670520933354
- Zhang et al. (2024). Humanlike service robots: A systematic literature review and research agenda. *Psychology & Marketing.*  
  https://onlinelibrary.wiley.com/doi/full/10.1002/mar.22099

---

*整合自：SBP_context_0727.txt · SBP_personalNotes_0727.md · service_blueprint_文獻回顧時間軸.md · AI製作SBP流程與影響分析（學術商業分開版）.docx*  
*對應架構：AI 製作 CJM 與 SBP 方式（Google Slides 1sGqlA6ueSy-2R0sxE4HxylGUsHtRgNMevDzY2oZk5IE）*
