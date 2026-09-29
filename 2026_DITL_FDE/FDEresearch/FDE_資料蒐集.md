# FDE（Forward Deployed Engineer）研究筆記
---

## 一、角色定義與起源

**Forward Deployed Engineer（FDE）** 是一種深度客戶端技術職位，核心任務是直接進駐客戶現場，實作、客製化並優化複雜技術系統，並將第一線發現回饋給產品團隊。

**歷史起源：** FDE 由 Palantir 在 2000 年代推廣，核心理念是「讓工程師直接到用戶工作現場，而非在辦公室猜測需求」。2025–2026 年因生成式 AI 落地困難，此角色需求爆發式成長，成為 AI 時代最熱門技術職位之一。

> 相近職稱：Field Deployment Engineer、Forward Deployed Software Engineer、Applied AI Engineer、Solutions Engineer、FDE/Solutions Architect

> **核心使命：** *"Metabolize pain and excrete product."*（將客戶痛點完全消化，直接排出可用產品。）

---

## 二、主要職責與日常工作

### 職責範圍

| 面向 | 具體工作內容 |
|------|-------------|
| 現場執行 | 進駐客戶端進行軟體安裝、系統整合、除錯、修復 |
| 技術專案管理 | 管理部署時程、變更控制、利害關係人溝通 |
| 客製開發 | 設計客製整合方案、優化效能與可擴展性 |
| 用戶研究 | 觀察終端用戶工作流程、挖掘痛點、即時打原型 |
| 知識移轉 | 培訓客戶人員、撰寫技術文件與 Runbook |
| 跨部門協作 | 串連客戶 ↔ 內部工程/產品團隊 |

**時間分配（2026 市場平均）：**
- 60% 客戶面對面互動
- 30% 部署相關程式開發
- 10% 內部事務

### 典型 DITL（Day in the Life）

根據 Palantir 等公司的現場描述（每週 3–4 天在客戶現場）：

```
早上  ── 與客戶利害關係人開 kick-off，了解問題範圍與成功標準
上午  ── 深入業務流程、資料現況、現有系統探索（Discovery）
中午  ── 與終端用戶 Shadowing，觀察實際工作流程
下午  ── 即時撰寫程式、打原型解決觀察到的痛點
傍晚  ── 更新 ITSM ticket、撰寫 as-built 文件、整理知識庫
```

**FDE 的核心雙重角色：**
- 同時扮演 **研究者（Researcher）+ 開發者（Builder）**
- 軟體隨用戶需求同步演化（iterative, in-the-field development）
- 需要快速在「技術可行性」與「業務價值」之間做判斷
- 不只是「提建議」，而是確保 AI 從概念到 KPI 成效全程閉環

---

## 三、技能要求與職涯路徑

### 技能快照

| 類別 | 技能項目 | 職缺要求比例 |
|------|---------|------------|
| **程式語言** | Python（必備）、TypeScript、SQL | 95%+ |
| **雲端與基礎設施** | AWS、GCP、Azure、Docker、Kubernetes、CI/CD | 95%+ |
| **全端與整合** | REST/GraphQL API、OAuth/JWT | 80%+ |
| **AI 專項** | LLM 應用開發、RAG pipeline、Prompt Engineering、Agent Orchestration、向量資料庫、MLOps | 80%+（快速成長中） |
| **系統設計** | 問題分解、模糊需求處理、可擴展性設計 | 75%+ |
| **軟技能** | 客戶同理心、需求探索、利害關係人管理 | 70%+（成長最快） |

### 建議職涯路徑（7 步路線圖）

| 步驟 | 領域 | 重點內容 |
|------|------|---------|
| 1 | 核心程式設計 | Python 必備 + TypeScript/Java/Go |
| 2 | 資料基礎 | 進階 SQL、ETL/ELT |
| 3 | 雲端與基礎設施 | AWS/GCP/Azure、Docker、IaC |
| 4 | 全端與整合 | REST/GraphQL API、OAuth/JWT |
| 5 | AI/ML 專項 | LLM、RAG、向量資料庫、MLOps |
| 6 | 系統設計 | 分解問題、處理模糊需求 |
| 7 | 客戶領導力 | 溝通、利害關係人管理、文件撰寫 |

---

## 四、FDE 在 AI 時代的定位

### 為什麼 AI 需要 FDE？——落地失敗率統計

| 統計數據 | 說明 | 來源 |
|---------|------|------|
| **85%** 的企業 AI 專案無法達到 ROI 目標 | 資料品質不足、策略與執行脫鉤 | [Gartner, 2025](https://discoverinai.com/gartner-why-85-of-ai-projects-fail-roi/) |
| **73%** 的 AI 採用企業無法建立可量測的業務 KPI | AI 被使用，但未與業務成果連結 | [MIT Sloan Management Review, 2025](https://sloanreview.mit.edu/projects/scholars/the-future-of-strategic-measurement-enhancing-kpis-with-ai/) |
| **95%** 的企業生成式 AI 試點零 P&L 影響 | 分析 300 個部署案例、150+ 高管訪談 | [MIT NANDA《The GenAI Divide》, 2025](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf) |
| **80.3%** 的企業 AI 專案未達成預期業務價值 | 分析 2,400+ 個企業 AI 專案 | [RAND Corporation, 2025](https://mybusinessfuture.com/en/80-ai-failure-rate-2026-how-rand-and-gartner-expose-the-ai/) |
| **42%** 的企業在 2025 年放棄至少一項 AI 計劃 | 較 2024 年 17% 大幅增加 | [folio3.ai 綜合報告](https://www.folio3.ai/blog/ai-project-failure-rate-stats) |

> 📌 **73% 數據備註**：原始簡報引用「MIT Sloan, 2025」，對應 MIT Sloan 的 KPI 研究（企業普遍以「使用率」而非「業務影響力」衡量 AI），精確原文出處待確認。MIT 更大規模的 NANDA 報告則將失敗率更新為 95%。

FDE 正是用來彌補這個「落地缺口」（Deployment Gap）的角色。

---

### 傳統團隊 vs. AI FDE 新結構

**傳統模型**（各角色獨立，AI 由工程師另行處理）：
```
PM ── UX Researcher ── UI/UX ── FE ── BE
```

**AI FDE 整合模型**（FDE 承擔 AI 落地橋接，直接面客）：
```
PM ── UX Researcher ── UI/UX + FE ── BE
                                │
AI FDE（跨層整合）
```

---

### FDE × UX 研究的交集

**新興概念：Forward Deployed UX Researcher（FD-UXR）**
- 結合質性研究方法（田野觀察、訪談）與實作能力
- 從「提建議」進化為「建出可用的原型來示範建議」
- 歷史淵源：1980 年代 Lucy Suchman 在 Xerox PARC 的工業人類學研究

> 延伸閱讀：[Sendfull Substack - 為何不派 UX 研究員而派 FDE？](https://sendfull.substack.com/p/ep-93-companies-are-sending-forward)

---

### FDE 7 步運作框架

FDE 介入典型 AI 專案的標準流程（來源：《AI 實際使用案例分析》簡報 p.33）：

| 步驟 | 工作內容 |
|------|---------|
| 1 | 深入理解客戶業務痛點（Discovery） |
| 2 | 定義 AI 應用場景與成功標準 |
| 3 | 系統整合（API 串接、資料連結） |
| 4 | 客製化開發（RAG pipeline、模型調校） |
| 5 | 部署、採用率追蹤與使用者信任建立 |
| 6 | AI 效果量化評估（Eval framework） |
| 7 | 迭代優化 / 知識移轉（讓客戶具備自主能力） |

---

## 五、市場數據與主要雇主（2026）

### 市場規模與成長

| 指標 | 數字 |
|------|------|
| 職缺成長率（YoY） | **+1,000%+**（部分統計達 1,165%） |
| 目前追蹤職缺數 | 124+ 個 |
| 遠端友善比例 | 62% |
| AI-specific FDE 薪資溢價 | 高出標準 10–20% |

### 薪資範圍（美國，2026）

| 層級 | 底薪 | 總報酬（含股票） |
|------|------|-----------------|
| Mid-level | $160K–$220K | $300K–$450K |
| Senior | $220K–$280K | $450K–$550K |
| Staff/Principal（AI 實驗室） | — | $600K–$1.2M+ |
| 股票佔比 | — | 55–70%（2024 年僅 35–45%）|

### 主要雇主（底薪）

| 公司 | 底薪範圍 | 備註 |
|------|---------|------|
| OpenAI | $162K–$325K | 職缺量大，FDE 為策略核心 |
| Palantir | $135K–$238K | FDE 角色創始公司 |
| Salesforce | $150K–$248K | — |
| Databricks | $153K–$343K | — |
| Anthropic | — | 總報酬 $350K–$550K |
| Google | — | 19 個相關職缺 |

**成長最快（垂直 AI 新創）：** Harvey、Sierra、Decagon、Cresta、Hebbia

### 熱門城市

| 城市 | 職缺數 | 中位數薪資 |
|------|--------|----------|
| 紐約 | 31 個 | $180K |
| 舊金山 | 12 個 | $191K |
| 西雅圖 | 6 個 | $187K |

---

## 六、FDE 實際案例分析

> 資料來源：《AI 實際使用案例分析》簡報 p.34–41，並補充線上公開資料

---

### 案例一：OpenAI FDE × Morgan Stanley（財富管理 AI 助理）

**背景**

OpenAI 致力追求 AGI，2022 年獲 Microsoft 大規模投資後開放 ChatGPT API，並成立 FDE 團隊加速企業落地。

| FDE 團隊規模 | 時間點 |
|------------|--------|
| 2 人 | 2024 年初 |
| 35+ 人 | 2024 年中 |
| 52 人（目標） | 2024 年底 |

預估 2026 年 FDE 關聯業務將佔 OpenAI 企業營收 **40%**；每 $1 FDE 服務支出可帶動後續 **$5** 的 API 使用收入。

**問題**

Morgan Stanley Wealth Management 擁有超過 10 萬份研究文件，但：
- 財富顧問初期僅能存取約 **20%** 的文件
- 知識庫散亂，無法快速回答客戶問題

**解法**

- 導入 **GPT-4 + RAG** 系統——相較純 LLM，RAG 在此類知識檢索任務效能高出 **10x**
- **6–8 週**完成技術 pipeline（RAG 優化、guardrails、Eval 框架）
- 再歷經 **4 個月**試點與迭代——建立財富顧問對 AI 的信任

> 關鍵洞察：*技術準備完成 ≠ 採用成功*，使用者信任需要時間與現場迭代。

**成果**

| 指標 | 改善前 | 改善後 |
|------|--------|--------|
| 財富顧問採用率 | — | **98%**（企業軟體平均僅 70%） |
| 文件存取覆蓋率 | 20% | **80%** |
| 可回答問題範圍 | 約 7,000 題 | **10 萬份文件任意提問** |
| 淨新增資產（Q3 2024） | — | **$640 億美元（$64B）** |
| 新增客戶（Q3 2024） | — | **10 萬名** |

> 來源：[OpenAI × Morgan Stanley 官方案例](https://openai.com/index/morgan-stanley/) ／ [ZenML LLMOps Database](https://www.zenml.io/llmops-database/forward-deployed-engineering-bringing-enterprise-llm-applications-to-production) ／ [Morgan Stanley AI Debrief](https://reruption.com/en/knowledge/industry-cases/morgan-stanleys-ai-debrief-98-advisor-adoption-boost)

---

### 案例二：Anthropic FDE × FIS AI Agent（金融犯罪偵測）

**背景（2026 年 5 月 4 日公告）**

| 公司 | 說明 |
|------|------|
| **Anthropic** | AI 安全公司，Claude 開發商；旗下設有 Applied AI 與 FDE 團隊 |
| **FIS** | 全球最大金融科技公司，服務全球逾 20,000 家銀行客戶 |

**問題：$400 億美元的 AML 合規成本**

- AML（反洗錢）調查耗時**數天至數週**
- 大量假陽性（正常交易被誤報），調查員負擔極重
- SAR（可疑活動報告）撰寫品質不一
- 全球銀行業 AML 合規成本估計達 **$400 億美元/年**

**FDE 合作模式：共設計 + 知識移轉**

Anthropic Applied AI + FDE 團隊嵌入 FIS，強調「知識移轉」而非單純交付產品：
1. 與 FIS 產品／合規團隊**共同設計** Financial Crimes AI Agent
2. Anthropic FDE 同步 **transfer knowledge**，讓 FIS 具備自主建構更多 Agent 的能力
3. FIS 建立 **agent-first 受控環境**——客戶資料全程留在 FIS 基礎設施內，每個 Agent 決策可追溯、可稽核

> 此合作模式被業界分析師視為 FDE 瓶頸的典型案例：AI 能力已足夠，但 **FDE 人力**成為落地最大限制。
> 來源：[CIO - Anthropic's FDEs as new AI limiting factor](https://www.cio.com/article/4167981/anthropics-financial-agents-expose-forward-deployed-engineers-as-new-ai-limiting-factor.html)

**Agent 功能流程**

```
可疑交易警報觸發
    ↓ 自動跨核心系統彙整證據（帳戶、交易歷史、關聯方）
    ↓ 比對已知洗錢行為模式（typologies）
    ↓ 優先排序高風險案件 → 呈交調查員審查
    ↓ 自動生成高品質 SAR 敘述報告
```

**成果與部署計畫**

| 指標 | 改善前 | 改善後 |
|------|--------|--------|
| AML 調查時間 | 數天 | **數分鐘** |
| 假陽性率 | 高 | 顯著降低 |
| SAR 報告品質 | 不一致 | 系統性提升 |

- 首批試點：**BMO**（加拿大蒙特婁銀行）、**Amalgamated Bank**（美國聯合銀行）
- 廣泛推出：**2026 H2**
- 後續路線圖：信用決策 → 存款留存 → 客戶入職 → 詐騙防範

> 來源：[FIS 官方新聞稿（2026/05/04）](https://www.fisglobal.com/about-us/media-room/press-release/2026/fis-brings-agentic-ai-to-banking-with-anthropic-starting-with-financial-crimes) ／ [AML Intelligence](https://www.amlintelligence.com/2026/05/news-anthropic-and-fis-to-launch-financial-crimes-ai-agent/) ／ [Amalgamated Bank 聲明](https://www.amalgamatedbank.com/news/amalgamated-bank-announces-collaboration-fis-and-anthropic-advance-ai-financial-crimes) ／ [Forbes](https://www.forbes.com/sites/nicolecasperson/2026/05/06/fis-and-anthropic-signal-a-new-era-of-ai-infrastructure-in-banking/)

---

### 兩大案例對比

| 維度 | OpenAI × Morgan Stanley | Anthropic × FIS |
|------|------------------------|-----------------|
| **FDE 合作類型** | 直接嵌入客戶端解決落地問題 | 共設計 + 知識移轉給合作夥伴 |
| **核心技術** | GPT-4 + RAG + Eval framework | Claude + Multi-agent 架構 |
| **主要挑戰** | 使用者信任與採用率 | 監管合規、資料主權、可稽核性 |
| **時程** | 6–8 週技術 + 4 個月試點 | 2026 H2 廣泛部署（進行中） |
| **關鍵成果** | 98% 採用率、$640億淨新增資產 | AML 調查從數天縮短至數分鐘 |
| **可擴展性** | 單一企業深度落地 | FIS 平台化（服務 20,000+ 銀行） |

---

## 七、延伸閱讀資源

### 職位資訊與 JD 範本
- [FDE Pulse - 即時職缺追蹤](https://fdepulse.com/) — 追蹤 OpenAI、Palantir、Salesforce 等 50+ 公司
- [Forward Deployment Engineer JD 範本 (Adaface)](https://www.adaface.com/job-descriptions/forward-deployed-engineer-job-description/)
- [Velvet Jobs / HRBLADE / Himalayas - JD 範本](https://himalayas.app/job-descriptions/deployment-engineer)
- [Taggd - FDE 完整招募指南（2026）](https://taggd.in/blogs/forward-deployed-engineers/)

### 角色深度介紹
- [GeeksforGeeks - FDE 完整指南（角色/技能/薪資/路線圖）](https://www.geeksforgeeks.org/blogs/forward-deployed-engineer-role-skills-salary-roadmap/)
- [Salesforce Blog - Forward Deployed Engineer 的 5 大技能](https://www.salesforce.com/blog/forward-deployed-engineer/)
- [Paraform - 完整指南（2026 年 5 月）](https://www.paraform.com/blog/what-is-forward-deployed-software-engineer)
- [Hashnode - 2026 完整指南（角色/薪資/面試）](https://hashnode.com/blog/a-complete-2026-guide-to-the-forward-deployed-engineer)
- [OpenAI Forward Deployed Engineering 官方說明](https://openai.com/business/the-openai-deployment-company/)

### 薪資與市場趨勢
- [Perspective AI - 2026 FDE 薪酬報告（1,200 人樣本）](https://getperspective.ai/blog/2026-forward-deployed-engineering-compensation-report-1200-fdes)
- [Perspective AI - 2026 FDE 招募趨勢（1,000 職缺分析）](https://getperspective.ai/blog/2026-fde-hiring-trends-what-1000-job-posts-reveal)
- [Recruiting from Scratch - 2026 薪資（200K+ 職缺數據）](https://www.recruitingfromscratch.com/blog/forward-deployed-engineer-salary-in-2026-real-data-from-200k-job-postings)

### DITL / 現場研究
- [Palantir Blog - Forward Deployed SE 的一天](https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1)

### FDE × UX Research
- [Sendfull Substack - 為何不派 UX 研究員而派 FDE？](https://sendfull.substack.com/p/ep-93-companies-are-sending-forward)
- [Jakob Nielsen - UX Roundup：Forward Deployed Engineers](https://jakobnielsenphd.substack.com/p/ux-roundup-20250922)
- [User Interviews - UX Research Field Guide](https://www.userinterviews.com/ux-research-field-guide)

### AI 落地失敗率資料
- [folio3.ai - AI Project Failure Rate Stats（2026 綜合報告）](https://www.folio3.ai/blog/ai-project-failure-rate-stats)
- [MIT NANDA - The GenAI Divide: State of AI in Business 2025](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
