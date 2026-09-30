# AI 生成互動物件「持續使用率低」問題研究筆記

> 撰寫目的:作為 CHI/HCI 論文(主題與「AI生成物留存率」相關)Related Work / Motivation 段落之背景研究。
> 撰寫日期:2026-09-24
> 撰寫方式:逐項以 WebSearch 查詢、並以 WebFetch 讀取原始頁面核實內容後彙整而成。所有數字皆標明出處連結;查無可靠一級來源者明確標註「未找到可靠來源」,不做推測性填補。

---

## 1. 研究範圍與方法說明

### 1.1 範圍界定
本筆記聚焦於「AI 生成的互動物件(interactive artifacts)」被建立後,使用者是否持續使用、多快棄用、以及背後原因。所稱「互動物件」包含:
- 對話式 AI 產生的可互動網頁/元件(Anthropic Claude Artifacts、OpenAI ChatGPT Canvas)
- AI app builder / "vibe coding" 工具產生的完整應用程式(Vercel v0、Replit Agent、Bolt.new、Lovable)
- 廣義的生成式 AI 內容持續使用疲乏現象(圖像、文字生成的相關研究),作為對照脈絡

不包含:傳統(非 AI)手工開發的軟體留存率研究(僅作為對照組數據引用)、DPTrek 論文本身的實驗發現(僅取其方法論參考,見下方說明)。

### 1.2 方法
1. 以 WebSearch 對「現象數據」「產業報告」「學術文獻」三大類分別下多組關鍵字查詢(中英文皆有,以英文為主因為此議題英文文獻/報告較完整)。
2. 對於搜尋結果中出現的具體數字,**逐一以 WebFetch 讀取原始頁面全文**,核實該數字是否真的出現在該頁面、是否有更上游的一級來源(例如 Sequoia、a16z 官方文章、OpenAI/Vercel 官方發布),而不僅採信 WebSearch 自動摘要的二次轉述。
3. 過程中發現至少兩處「AI 摘要 vs. 原始頁面」不一致的案例(詳見 3.5 節「資料品質警示」),已排除或明確標註為不可信。
4. 學術文獻部分優先採用 arXiv / ACM DL / ScienceDirect / Frontiers 等可追溯至摘要或全文的連結。

### 1.3 方法論參考說明
專案資料夾中的 CHI'25 論文《From Awareness to Action: The Effects of Experiential Learning on Educating Users about Dark Patterns》(DPTrek, 3706598.3713493)與本主題內容無直接關係,本次研究**未重讀**該檔案,僅在後續論文設計問卷/構念(如 Enjoyment、Confidence、Reward 的 pre/post Likert 測量方式)時可參考其方法論,不作為本主題的實證來源。

---

## 2. 現象概述

過去兩年(2024–2026)出現一群以 LLM 為核心的「一句話生成互動物件」工具:Anthropic Claude Artifacts、OpenAI ChatGPT Canvas、Vercel v0、Replit Agent、Bolt.new、Lovable 等。這些工具的共同敘事是「大幅降低生成互動介面/應用程式的門檔」,並帶來爆炸性的初期採用數字(數百萬使用者、每日數十萬個新專案)。

然而,產業分析(尤其是風險投資機構針對生成式 AI 消費性應用的研究)反覆指出:**生成式 AI 應用的「初次嘗試」規模遠大於「持續使用」規模**,呈現典型的「先爬升、後急墜」曲線,和傳統消費性軟體(社群、娛樂、遊戲類 App)相比,回訪率與黏著度都明顯偏低。這與本研究關注的「AI生成物留存率」問題高度相關:使用者生成物件之後,並未將其整合進長期的工作/生活流程,而是在新奇感消退後迅速棄置。

值得注意的是,目前**沒有任何工具官方公開發布過专門針對「AI 生成互動物件」的留存率/棄用率數據**(例如 Claude Artifacts 建立後 7 天/30 天是否還被開啟、Lovable/v0 專案建立一年後是否還在使用)。現有的公開數字幾乎都是「取得量」「建立量」指標(累積使用者數、每日新建專案數),而非「留存」指標,這本身就是一個值得在論文中指出的資料缺口(見第 6 節)。

---

## 3. 實證數據(附來源)

### 3.1 生成式 AI 應用整體留存率(相對可靠,來自 VC 產業報告)

| 指標 | 數值 | 對照組 | 來源 |
|---|---|---|---|
| 生成式 AI App 一個月留存率(中位數) | 42% | 消費性娛樂/社群/遊戲/教育 App 中位數 63% | Sequoia Capital, "Generative AI's Act Two"（[sequoiacap.com](https://sequoiacap.com/article/generative-ai-act-two)),經 WebFetch 核實原文出現「below chart compares the month 1 mobile app retention of AI-first applications to existing companies」;惟原文未標明其底層數據供應商(如 data.ai/Sensor Tower) |
| DAU/MAU 比例(生成式 AI 服務中位數) | 14% | 「一些最佳消費性公司」60–65%;WhatsApp 85% | 同上,Sequoia 原文:"Some of the best consumer companies have 60-65% DAU/MAU; WhatsApp's is 85%" |
| ChatGPT 一個月留存率 | 56%(二次轉述,經 Voicebot.ai 摘要) | YouTube 85%(最高)、Candy Crush 48%(消費 App 最低) | [Voicebot.ai 對 Sequoia 報告的圖表摘要](https://voicebot.ai/2023/10/03/generative-ai-apps-struggle-with-retention-and-engagement-charts/)(二級來源,建議引用時同時標註 Sequoia 為原始出處並註明此為 2023 年較早的數據點,可能已過時) |
| Character AI DAU/MAU | 41%(AI 原生應用中表現最佳者) | ChatGPT 僅 14% | 同上 |

**解讀**:此為目前查得**最具權威性且可追溯**的量化證據,直接支持「生成式 AI 產品(包含但不限於互動物件生成工具)存在系統性的留存/黏著度落差」。Sequoia 原文結論:「Generative AI's biggest problem is not finding use cases or demand or distribution, it is proving value.」

### 3.2 a16z 針對 AI 原生產品留存/留存曲線的分析

- a16z 文章《Retention Is All You Need》([a16z.com/ai-retention-benchmarks](https://a16z.com/ai-retention-benchmarks/))提出以「M12/M3 留存比」取代傳統「M0 起算留存」作為 AI 產品的留存品質指標,理由是 AI 產品初期有大量「AI 觀光客(AI tourists)」在前 3 個月內流失,M3 之後的留存群才是真實使用者基礎。
- 經 WebFetch 核實:此文章**未提供**具體的百分比留存/流失率數字給個別產品,樣本為「a16z 觀察到的數十家 ARR 超過 100 萬美元的 AI 公司」的內部資料,方法論細節有限,建議論文引用時明確標註為「業界觀察性論述,非公開可重現的量化研究」。
- a16z 另一篇《What "Working" Means in the Era of AI Apps》([a16z.com/revenue-benchmarks-ai-apps](https://a16z.com/revenue-benchmarks-ai-apps/))指出:訂價低於 50 美元/月的「AI 原生消費性產品」的 GRR(毛留存率)僅 23%、NRR(淨留存率)僅 32%,比 B2B 或 B2C SaaS 平均低 20 個百分點。此數字在搜尋摘要中出現,但**未能以 WebFetch 逐字核實其原文脈絡與統計方法**,建議引用前再次確認或視為待驗證數據。

### 3.3 個別工具的留存/棄用數據

| 工具 | 聲稱數字 | 來源可信度評估 |
|---|---|---|
| Vercel v0 | 「30 天留存率 75%、CSAT 95%、推薦率 92%、NPS 82」 | **不可信,不建議引用。** 經 WebFetch 直接讀取來源頁面(getpanto.ai)全文,確認**這些具體數字並未出現在該頁面**,顯示 WebSearch 自動摘要出現了幻覆/嫁接其他頁面數字的情況。多次交叉搜尋(shipper.now、worldmetrics.org 等)皆為同類「AI 生成統計懶人包」網站,彼此互相轉載但查無任一方標明原始一級來源(如 Vercel 官方部落格或 Series F 揭露文件)。Vercel 官方部落格([vercel.com/blog](https://vercel.com/blog/introducing-the-new-v0))僅揭露「累積 400 萬使用者(2026年2月)」「Teams & Enterprise 貢獻超過 50% 營收」等取得量/營收指標,**未揭露任何留存率數字**。 |
| Replit Agent | 「30 天留存率 68%、NPS 78、免費用戶轉付費率 85%」 | **同樣不可信,不建議引用。** 數字來源 wifitalents.com / getpanto.ai 等同類型統計懶人包網站,句式與 v0 的數字高度模板化(「X% 留存 after 30 days」「NPS」「CSAT」套用於不同產品),強烈暗示為 AI 自動生成的內容農場數據而非真實揭露。Replit 官方或 Sacra 等可信研究機構([sacra.com](https://sacra.com/research/product-engineering-leader-replit-churn-retention-vibe-coding/))確認「Replit 內部承認留存與棄用是已知挑戰」,但未提供具體百分比。 |
| Lovable / Bolt.new | 「Lovable 每日新建 10 萬個專案、累積 5000 萬個專案;Bolt.new 達到 100 萬 DAU」 | 取得量/使用量指標可信(多來源交叉確認,如 [techtimes.com](https://www.techtimes.com/articles/318072/20260609/lovable-says-it-hit-500-million-run-rate-vibe-codings-maintenance-test-still-looms.htm)),但**兩家公司均未公開任何留存率或棄用率數據**。techtimes.com 文章原文明確指出:「Lovable reports 50 million projects built and one million new ones a week, but not how many remain in use after a year or two」——即產業媒體本身也承認這是資訊黑箱。 |
| ChatGPT Canvas | 2026 年 6 月被 OpenAI 從 GPT-5.5 Instant/Thinking 模型中移除,寫作與程式碼功能改為直接整合進聊天訊息 | **可信、但不能直接等同於「因留存率低而下架」。** 經確認 OpenAI 官方 Help Center 的《Model Release Notes》([help.openai.com](https://help.openai.com/en/articles/9624314-model-release-notes))確有此變更,多家科技媒體([aiweekly.co](https://aiweekly.co/alerts/openai-silently-drops-canvas-from-gpt-55-update)、[krasa.ai](https://www.krasa.ai/news/openai-gpt-5-5-instant-writing-coding-blocks-canvas-removed-may-2026))指出此舉未經正式部落格公告,「悄悄下架」。可作為「生成式互動物件功能未能建立足夠持續使用而被產品方降低投資優先度」的間接佐證,但 OpenAI 未公開說明下架理由,不應過度推論為留存率低的直接證據,只能作為「業界觀察到的訊號」引用。 |
| "vibe coding" 使用者「63% 於第三個月棄用專案」 | 廣泛在部分部落格文章中被引用 | **未找到可靠來源,判定為誤植/錯誤嫁接,不應引用。** 追蹤此數字源頭發現:该數字实际源自 Solveo 对 r/vibecoding 社群 1000 則留言的分析,原始結論是「63% 的活躍社群成員是非開發者(non-developer)」,是一個**使用者背景組成**的統計,與「專案棄用率」完全無關。多個二級部落格網站(如 codingwithvibe.com)似乎將此數字誤植為棄用率並廣泛轉載,經 WebFetch 直接核實引用該數字的 techtimes.com 文章全文後,**確認該文章中根本沒有出現「63%」或任何棄用率數字**,只提出「棄用率是產業尚未揭露的關鍵未知數」这一论点。這是本次研究中最值得警示的一個「以訛傳訛」案例。 |

### 3.4 產品分析平台(Amplitude / Mixpanel)的一般性留存基準(非 AI 生成物專屬,作對照)

- Amplitude《2025 Product Benchmark Report》(經 WebSearch,原始 PDF 見 [info.amplitude.com](https://info.amplitude.com/rs/138-CDN-550/images/the-product-benchmark-report.pdf)):中位數產品的新使用者「96% 在第三個月結束前流失」;前 10% 頂尖產品的第一個月留存率為 26%+、第三個月留存率為 18.5%。此為**一般數位產品**的留存基準,而非 AI 生成物專屬,可用於對照「即使非 AI 產品留存也普遍偏低」,但生成式 AI 應用的留存落差(見 3.1)仍顯著低於「頂尖產品」水準,更接近或低於中位數產品。
- Mixpanel《2026 State of Digital Analytics / AI benchmarks》([mixpanel.com/blog/ai-benchmarks-2026](https://mixpanel.com/blog/ai-benchmarks-2026/)):報告指出 AI 產品的留存與黏著度因地區/使用情境差異很大(如 EMEA 週留存近 74%、LATAM 黏著率 37%),強調「AI 產品衡量的重點應從單純的使用量轉向『價值實現』」,但**未針對「AI 生成互動物件」這一子類別提供分拆數據**,無法直接引用其精確數字支持本研究主題,僅可引用其論述方向。

### 3.5 資料品質警示(給論文寫作者的重要提醒)

本次搜尋清楚顯示:網路上大量流通的「AI 產品留存率/NPS/CSAT」具體百分比,很大比例來自**內容農場型 SEO 部落格**(getpanto.ai、shipper.now、worldmetrics.org、wifitalents.com 等),這些網站以高度模板化的句式(「X% retention after 30 days」「NPS 82」)套用在不同 AI 工具身上,且經逐一 WebFetch 核實後,多數具體數字**在其自稱的來源頁面中根本查無此文字**,顯示這些數字極可能是網站自身用 AI 生成、無事實根據的「幻覆內容」。撰寫論文時務必避免引用此類網站的具體百分比,即便它們在 Google 搜尋排序靠前。真正可信的量化來源仍集中在:Sequoia Capital、a16z 的公開研究文章,以及公司官方部落格/揭露文件(但後者幾乎只揭露取得量而非留存)。

---

## 4. 可能原因(依文獻分類)

### 4.1 對 AI 生成內容的信任問題(Trust in AI-generated content)
- Zhou & Lu(2024/2025)以 S-O-R(刺激-有機體-反應)框架研究「信任」如何影響使用者對 AIGC(AI-generated content)的採用,發現「感知智能」「感知透明度」「知識幻覺(knowledge hallucination)」影響認知信任,「感知同理心」影響情感信任,兩者共同決定對 AIGC 的整體信任。([Semantic Scholar](https://www.semanticscholar.org/paper/The-effect-of-trust-on-user-adoption-of-content-Zhou-Lu/f9828d6995fcb6a7951be2c954feef28f56c7fa5);[ResearchGate 全文](https://www.researchgate.net/publication/386983520_The_effect_of_trust_on_user_adoption_of_AI-generated_content))
- 另一篇研究(2026, *Behavioral Sciences*, PMC 全文可讀)發現:AI 生成內容標示「透明揭露」**不會自動提升信任**,反而先觸發使用者對內容真實性/可靠性的「謹慎評估」與懷疑。([PMC13295875](https://pmc.ncbi.nlm.nih.gov/articles/PMC13295875/))
- CHI 2024 論文《The Effects of Perceived AI Use On Content Perceptions》發現:當使用者知道內容由 AI 生成,會用更嚴格、更批判的標準審視內容。([ACM DL](https://dl.acm.org/doi/10.1145/3613904.3642076))
- **與本主題的連結**:若使用者對「自己生成的互動物件」本身抱持一定程度的不信任或懷疑(這是「我真的做出來的東西」還是「AI 隨便生成的東西」),可能降低其長期投入維護與使用的意願,構成「介面斷裂」的心理基礎之一。

### 4.2 一次性生成 vs. 使用者需求持續演變(One-shot generation vs. evolving needs)
- HCI 文獻普遍指出「一次性提示(one-shot prompting)」是生成式 AI 應用的重大瓶頸,新手使用者難以透過純文字一次表達完整意圖,對模型推理過程的可見性也有限。
- 「迭代精煉(iterative refinement)」被視為比純檢索式或一次性提示更有效的個人化方向,因其將檢索與對齊(alignment)解耦,讓回饋能重塑最終輸出。([arXiv:2510.24469](https://arxiv.org/pdf/2510.24469))
- 使用者的意圖會隨著看到生成結果而演變、修正,這正是系統需要支援「持續個人化」而非一次性產出的理論依據。([arXiv 2310.07127 HCI 綜述](https://arxiv.org/html/2310.07127v2))
- **與本主題的連結**:AI 生成的互動物件多數是「一次生成、定格輸出」,若使用者的需求在物件生成後持續演變,而物件本身缺乏隨需求同步演化的機制,便會在需求與物件之間出現落差,使用者選擇棄用而非修改。

### 4.3 缺乏持續迭代/維護機制(Lack of ongoing maintenance mechanisms)
- 傳統end-user programming(以試算表巨集為代表性案例)的文獻長期指出:終端使用者建立的工具通常「不含單元測試、驗證測試、錯誤處理」等軟體工程保護機制,一旦原作者離開或忘記邏輯,便進入「不要動它(don't touch it policy)」的停滯狀態,形同事實上的棄用。(Ko et al., 2011, *ACM Computing Surveys*, [DOI](https://doi.org/10.1145/1922649.1922658))
- End-user computing 的營運風險包括「缺乏版本與變更控制」「缺乏文件」「過度依賴原開發者」「缺乏維護流程」,這些正是 AI 生成互動物件目前普遍欠缺的能力(多數工具生成後即完成任務,沒有內建的長期維護輔助)。
- **與本主題的連結**:這條文獻脈絡直接支持「AI 生成物件的『事後維護斷層』是造成持續使用率低的結構性原因」——不是使用者不想用,而是缺乏低成本、低門檔的方式讓物件跟著使用者需求一起演化。

### 4.4 新奇效應(Novelty effect)消退——但證據較複雜,並非全面適用
- Novelty effect 的經典定義:使用新技術的意願初期偏高,隨著熟悉度提升而遞減,除非任務本身變得對使用者有內在意義。([Wikipedia 綜述](https://en.wikipedia.org/wiki/Novelty_effect);Wells 2010, *Decision Sciences*,[Wiley](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1540-5915.2010.00292.x))
- 值得注意的**反例**:2024 一篇縱貫研究《Not Just Novelty: A Longitudinal Study on Utility and Customization of an AI Workflow》(Long, Gero, & Chilton, DIS 2024;預印本 arXiv:2402.09894)追蹤 12 名 CS 博士生連續 3 週、10 次使用 GPT-4 驅動的科普寫作輔助工具,發現:熟悉後感知有用性**反而提升 12.1%**,任務表現提升 14.9%,時間效率提升 7.1%;使用者經過平均 4.27 次的「熟悉期」後進入更深度的客製化使用(尤其是可編輯提示詞,有用性再提升 11.4%)。作者結論:AI 工具的持續價值來自於「暴露可編輯的底層提示詞、支援高認知負荷任務(構思、翻譯、意義建構)」,而非單純的新奇感消退。([ACM DL](https://doi.org/10.1145/3643834.3661587);[arXiv 全文](https://arxiv.org/html/2402.09894v2))
- **與本主題的連結**:此文獻提供了重要的「反證/邊界條件」——並非所有 AI 工具都必然因新奇效應消退而被棄用;關鍵變因是該工具是否支援「可客製化的持續互動」。這對論文而言是一個很有力的對照:AI 生成互動物件之所以留存率低,可能正是因為它們(相對於此研究中的可編輯提示詞工作流)缺乏事後客製化/編輯的介面支援,而非單純「新奇感必然消退」。

### 4.5 IKEA 效應的反面應用——「生成物件」缺乏勞動投入,難以產生擁有感
- IKEA 效應(Norton, Mochon, & Ariely, 2012, *Journal of Consumer Psychology*)證實:使用者對「自己投入勞力完成」的物品評價顯著高於「他人製作」的同等物品,且此效應**僅在任務被成功完成時成立**——若任務被中斷或失敗,IKEA 效應會消失。([Wiley 原始論文](https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002);[Harvard DASH 全文 PDF](https://dash.harvard.edu/bitstreams/7312037d-2473-6bd4-e053-0100007fdf3b/download))
- 機制解釋:效果來自「努力辯護(effort justification)」與「稟賦效應(endowment effect)」的疊加——付出勞力會強化擁有感,進而推高主觀評價。
- **與本主題的連結(此為本研究的推論綜合,非既有文獻直接結論)**:AI 生成互動物件的核心特徵正是「使用者幾乎不投入勞力」——一句提示詞即可生成完整介面。若 IKEA 效應的邏輯反向適用,可以合理推論:**AI 生成物件因缺乏使用者的勞力投入,難以觸發同等的擁有感與主觀評價提升,因而更容易被輕易棄置**。這是一個值得後續研究以實驗方式驗證的假說,而非已有文獻直接證明的因果關係。

### 4.6 生成式 AI 使用疲乏(AI fatigue)
- 一篇涵蓋 4 項研究、717 位受試者的論文指出 AI fatigue 包含「認知超載、情緒耗損、生理疲勞、行為退出」四個維度;14% 的 AI 使用者回報有疲乏症狀,包括腦霧、注意力難集中、決策變慢甚至頭痛。([ResearchGate PDF](https://www.researchgate.net/publication/394527631_TOO_MUCH_TOO_FAST_UNDERSTANDING_AI_FATIGUE_IN_THE_DIGITAL_ACCELERATION_ERA))
- 另一篇 2026《AI fatigue in human–AI interaction: Conceptual framework, scale development and validation, and associations with AI engagement》開發並驗證了 15 題「AI 疲乏量表」,涵蓋四個維度,跨 4 項研究、720 位受試者。([ScienceDirect](https://sciencedirect.com/science/article/pii/S2451958826002605);[ResearchGate 全文](https://www.researchgate.net/publication/399592872_AI_Fatigue_in_Human-AI_Interaction_Conceptual_Framework_Scale_Development_and_Validation_and_Associations_with_AI_Engagement))
- 「提示疲乏(prompt fatigue)」被定義為:當提示詞撰寫任務持續超出使用者工作記憶容量時所產生的認知負荷過載狀態。(AISeL/ICIS 2025 TREOS,[全文 PDF](https://aisel.aisnet.org/cgi/viewcontent.cgi?article=1091&context=treos_icis2025))
- **與本主題的連結**:重複生成、反覆修改提示詞以「調校」互動物件的過程本身可能造成疲乏,使使用者傾向放棄迭代、直接棄用現有生成結果,轉而重新開一個對話從頭生成——這本身即是一種「介面斷裂」的行為模式(物件被拋棄而非被延續使用)。

---

## 5. 與「interface disconnection(介面斷裂)」概念的關聯性分析

> **重要聲明:本節內容為研究者根據上述文獻的推論與綜合,並非既有文獻中已直接使用「interface disconnection」一詞並得出的結論。** 經多輪搜尋(包含關鍵字 "interface disconnection"、"sense of disconnection" + AI generated artifact 等),**未找到任何已發表文獻直接使用與本論文完全相同的「介面斷裂」措辭與定義**。這代表本論文的概念命名與框架化本身具有一定的原創性空間,但也意味著論文需要更謹慎地在 Related Work 中定位自己與相鄰概念的異同。

以下是搜尋中發現、與「介面斷裂」概念**相鄰但不完全相同**的既有措辭,建議在論文中明確區分:

1. **Relational Dissonance(關係失調)**——CHI 2026 論文《Relational Dissonance in Human-AI Interactions: The Case of Knowledge Work》([ACM DL, doi:10.1145/3772318.3791180](https://dl.acm.org/doi/10.1145/3772318.3791180))提出:知識工作中人機互動的張力根源「不在個人心理層面,而在人機互動介面的結構本身」,涉及對主體性喪失的恐懼、過度依賴的擔憂、以及工作成果歸屬感的問題。**這是目前查到與「介面斷裂」精神最接近的既有概念**,但其聚焦於「人與 AI 協作關係中的失調感」,而非本論文更具體聚焦的「使用者與其生成物之間逐漸疏離、生成物被棄用」的現象與時間軸(從建立到棄用的過程)。論文可將此文獻列為最相近的既有概念,並說明「介面斷裂」的差異化貢獻在於:聚焦「生成後」的時間軸與「物件本身」(而非泛指人機協作關係),並嘗試連結留存率/棄用行為等可觀察指標。

2. **Novelty effect 消退**(見 4.4)——描述的是「新鮮感隨時間遞減」的心理機制,是介面斷裂可能的**成因之一**,但novelty effect 本身不涉及「使用者與生成物之間關係性質的變化」,只是描述使用行為隨時間下降的曲線,較缺乏「疏離感」這一情感/關係維度。介面斷裂概念可視為比 novelty effect 更豐富——不僅是「不再新奇」,而是「不再感覺這是『我的』東西」。

3. **IKEA 效應的反面(缺乏勞力投入→缺乏擁有感)**(見 4.5)——為介面斷裂提供了一個具體的心理機制假說:因為使用者在生成物件的過程中投入的勞力/認知努力遠低於傳統手作或手寫程式碼,所產生的「這是我做的」的擁有感天然較弱,一旦新奇感退去,缺乏擁有感的物件更容易被放棄而不會被視為「值得維護的資產」。

4. **End-user development 的「事後維護斷層」**(見 4.3)——提供了介面斷裂的**結構性/工具論**解釋:即便使用者主觀上想繼續使用,若工具沒有提供低成本的持續編輯/維護管道(對照《Not Just Novelty》論文中「可編輯提示詞」這一關鍵設計要素),生成物與使用者需求的落差會隨時間擴大,形成客觀上的「斷裂」,不�ing僅是主觀疏離感。

**綜合本研究對「介面斷裂」的定位建議**:介面斷裂可被界定為「Relational Dissonance(關係失調)與 Novelty Effect(新奇效應消退)兩個既有概念在『生成式 AI 互動物件』這一特定物件類型上的交集現象,並疑加入 IKEA 效應反向機制(擁有感缺失)與 end-user development 缺乏維護管道(結構性斷層)作為其成因假說」。這一定位方式讓論文能清楚說明自己與既有文獻的重疊與差異,同時具備可被實證檢驗的具體構念(如:擁有感量表、維護行為觀察、留存率追蹤)。

---

## 6. 研究缺口與可能的論文貢獻方向

根據以上文獻與資料蒐集過程本身呈現出的落差,建議以下 2–4 個具體的論文貢獻方向:

1. **填補「AI 生成互動物件專屬留存率」的資料真空**:目前無論是產業(v0、Replit、Lovable、Bolt.new)或既有學術文獻,都只有「生成式 AI 應用」整體的留存數據(如 Sequoia 的 42% vs 63%),**沒有任何研究專門測量「AI 生成的互動物件」這一子類別(相對於整個 App/對話介面)的留存/回訪/維護行為**。論文可以透過使用者研究(如日誌研究 diary study、或分析真實 Claude Artifacts/v0 專案的回訪模式)首次提供這一細分層級的量化證據,這本身即是明確的資料缺口與貢獻機會。

2. **驗證「擁有感缺失」假說(IKEA 效應反向應用)是否為介面斷裂的因果機制**:目前 IKEA 效應與生成式 AI 的連結僅是本研究的推論,尚無實證文獻直接檢測「生成互動物件時的擁有感高低」是否預測後續的持續使用/棄用行為。可設計實驗操弄使用者在生成過程中的「投入程度」(例如:一次性提示 vs. 多輪對話式共創),測量擁有感(可借用 DPTrek 論文中 Likert 量表式 pre/post 測量方法作為方法論參考)與後續留存的關聯性。

3. **提出並驗證「可編輯性/持續維護管道」作為緩解介面斷裂的設計介入**:呼應《Not Just Novelty》論文的發現(暴露可編輯提示詞可支撐長期使用),可設計對照實驗:比較「僅能重新生成整個物件」vs.「可針對物件局部持續編輯、疊代」兩種介面設計,測量兩組在一段時間後(如 2–4 週)的物件留存率與使用者對物件的情感連結(可設計「介面斷裂量表」作為本論文的方法論貢獻之一)。

4. **建立「介面斷裂」的正式量表與階段模型**:目前查無任何已發表的「介面斷裂」測量工具。論文可借鏡 AI fatigue scale(15 題四維度,見 4.6)與 DPTrek 論文中的 Enjoyment/Confidence/Reward 構念設計方式,發展一套「使用者與其 AI 生成物件關係疏離程度」的量表,並提出「生成 → 新奇使用 → (擁有感缺失/維護斷層) → 疏離 → 棄用」的階段性理論模型,作為本領域後續研究的共同語言與測量基礎。

---

## 7. 完整參考文獻列表

### 產業報告 / 數據來源
- Sequoia Capital. "Generative AI's Act Two." https://sequoiacap.com/article/generative-ai-act-two
- Voicebot.ai (2023). "Generative AI Apps Struggle With Retention and Engagement [Charts]." https://voicebot.ai/2023/10/03/generative-ai-apps-struggle-with-retention-and-engagement-charts/ (二級來源,轉述 Sequoia 報告圖表)
- Andreessen Horowitz (a16z). "Retention Is All You Need." https://a16z.com/ai-retention-benchmarks/
- Andreessen Horowitz (a16z). "What 'Working' Means in the Era of AI Apps." https://a16z.com/revenue-benchmarks-ai-apps/
- Amplitude. "The Product Benchmark Report." https://amplitude.com/resources/product-benchmark-report ; PDF: https://info.amplitude.com/rs/138-CDN-550/images/the-product-benchmark-report.pdf
- Mixpanel (2026). "2026 AI benchmarks: What usage data reveals about the next phase of adoption." https://mixpanel.com/blog/ai-benchmarks-2026/
- Mixpanel (2026). "2026 State of Digital Analytics." https://mixpanel.com/content/benchmarks-2026
- Vercel Blog. "Introducing the new v0." https://vercel.com/blog/introducing-the-new-v0
- Vercel Blog. "Announcing v0: Generative UI." https://vercel.com/blog/announcing-v0-generative-ui
- Sacra Research. "Product & Engineering leader at Replit on churn & retention in vibe coding." https://sacra.com/research/product-engineering-leader-replit-churn-retention-vibe-coding/
- Tech Times (2026). "Lovable Says It Hit $500 Million Run Rate: Vibe Coding's Maintenance Test Still Looms." https://www.techtimes.com/articles/318072/20260609/lovable-says-it-hit-500-million-run-rate-vibe-codings-maintenance-test-still-looms.htm
- OpenAI Help Center. "Model Release Notes" (ChatGPT Canvas removal from GPT-5.5). https://help.openai.com/en/articles/9624314-model-release-notes
- AI Weekly. "OpenAI Silently Drops Canvas From GPT-5.5 Update." https://aiweekly.co/alerts/openai-silently-drops-canvas-from-gpt-55-update

### 學術文獻
- Zhou & Lu (2024/2025). "The effect of trust on user adoption of AI-generated content." https://www.semanticscholar.org/paper/The-effect-of-trust-on-user-adoption-of-content-Zhou-Lu/f9828d6995fcb6a7951be2c954feef28f56c7fa5 ; ResearchGate: https://www.researchgate.net/publication/386983520_The_effect_of_trust_on_user_adoption_of_AI-generated_content
- "How AI-Generated Content Shapes User Trust: The Roles of Cognitive Processing, Perceived Risk, and Transparency Labels." *Behavioral Sciences*, 2026. https://doi.org/10.3390/bs16060957 ; PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC13295875/
- "The Effects of Perceived AI Use On Content Perceptions." *Proceedings of CHI 2024*. https://dl.acm.org/doi/10.1145/3613904.3642076
- "Iterative Critique-Refine Framework for Enhancing LLM Personalization." arXiv:2510.24469. https://arxiv.org/pdf/2510.24469
- "An HCI-Centric Survey and Taxonomy of Human-Generative-AI Interactions." arXiv:2310.07127. https://arxiv.org/html/2310.07127v2
- Long, T., Gero, K. I., & Chilton, L. B. (2024). "Not Just Novelty: A Longitudinal Study on Utility and Customization of an AI Workflow." *Proceedings of DIS 2024*. https://doi.org/10.1145/3643834.3661587 ;預印本 arXiv:2402.09894:https://arxiv.org/html/2402.09894v2
- Wells, J.D. et al. (2010). "The Effect of Perceived Novelty on the Adoption of Information Technology Innovations: A Risk/Reward Perspective." *Decision Sciences*. https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1540-5915.2010.00292.x
- Wikipedia. "Novelty effect." https://en.wikipedia.org/wiki/Novelty_effect
- Norton, M. I., Mochon, D., & Ariely, D. (2012). "The IKEA effect: When labor leads to love." *Journal of Consumer Psychology*. https://myscp.onlinelibrary.wiley.com/doi/abs/10.1016/j.jcps.2011.08.002 ; 全文 PDF (Harvard DASH): https://dash.harvard.edu/bitstreams/7312037d-2473-6bd4-e053-0100007fdf3b/download
- Wikipedia. "IKEA effect." https://en.wikipedia.org/wiki/IKEA_effect
- "Relational Dissonance in Human-AI Interactions: The Case of Knowledge Work." *Proceedings of CHI 2026*. https://dl.acm.org/doi/10.1145/3772318.3791180 (摘要頁面存取受限,經多次搜尋摘要交叉確認核心論點)
- "Characterizing and modeling harms from interactions with design patterns in AI interfaces." arXiv:2404.11370. https://arxiv.org/html/2404.11370v3
- "TOO MUCH, TOO FAST: Understanding AI Fatigue In The Digital Acceleration Era." ResearchGate. https://www.researchgate.net/publication/394527631_TOO_MUCH_TOO_FAST_UNDERSTANDING_AI_FATIGUE_IN_THE_DIGITAL_ACCELERATION_ERA
- "AI fatigue in human–AI interaction: Conceptual framework, scale development and validation, and associations with AI engagement." *ScienceDirect*, 2026. https://sciencedirect.com/science/article/pii/S2451958826002605
- "Prompt Fatigue in Generative AI: A Cognitive and Information [Processing Perspective]." AISeL/ICIS 2025 TREOS. https://aisel.aisnet.org/cgi/viewcontent.cgi?article=1091&context=treos_icis2025
- Ko, A. J., et al. (2011). "The state of the art in end-user software engineering." *ACM Computing Surveys, 43*(3), Article 21. https://doi.org/10.1145/1922649.1922658

### 本專案既有參考論文(方法論參考,非本主題實證來源)
- （論文集內既有 PDF)"From Awareness to Action: The Effects of Experiential Learning on Educating Users about Dark Patterns." *Proceedings of CHI 2025* (DPTrek). DOI: 10.1145/3706598.3713493。本地檔案:`3706598.3713493.pdf`(本次未重讀,僅承接既有摘要作方法論參考)。

---

## 附錄:本次搜尋中發現但判定為不可信/誤植、刻意不採用的數字(供論文寫作者避雷)

- 「Vercel v0:30 天留存率 75%、CSAT 95%、推薦率 92%、NPS 82」——來源頁面經 WebFetch 核實**查無此數字**,判定為 AI 內容農場幻覆,**不建議引用**。
- 「Replit Agent:30 天留存率 68%、NPS 78、免費轉付費率 85%」——同類型不可信來源,**不建議引用**。
- 「vibe coding 使用者 63% 於第三個月棄用專案」——經追蹤發現原始統計其實是「r/vibecoding 社群 63% 為非開發者」,與棄用率無關,是明確的網路訛傳,**絕對不應引用**。
