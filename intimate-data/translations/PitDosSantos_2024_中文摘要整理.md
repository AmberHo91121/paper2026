# Pit dos Santos et al. (2024) — 機器學習於數位表型之系統性文獻回顧與分類法

**原文標題**: Machine learning applied to digital phenotyping: A systematic literature review and taxonomy
**作者**: Marília Pit dos Santos, Wesllei Felipe Heckler, Rodrigo Simon Bavaresco, Jorge Luis Victória Barbosa
**出處**: *Computers in Human Behavior*, 161:108422 (2024),ScienceDirect(付費牆,經取得全文)
**檔案**: `PitDosSantos_2024_ML_digital_phenotyping_systematic_review.pdf`

> 以下為中文改寫整理,非逐句翻譯。

---

## 摘要重點

本篇為嚴謹的系統性文獻回顧(systematic mapping study),依 Petersen et al. (2008) 的方法學,檢索 11 個涵蓋資訊工程與醫學領域的資料庫(含 IEEE Xplore、ACM DL、PubMed、Scopus、Web of Science 等),檢索至 2023 年 11 月,初始命中 2,860 篇文章,經去重、標題摘要篩選、三階段(three-pass)全文審查後,最終納入 124 篇文章,回答六個研究問題,涵蓋機器學習技術、資料類型、裝置、本體論(ontology)與研究挑戰。

## 方法重點

- 使用 Parsifal 工具管理篩選流程,並採用 Keshav (2007) 提出的「三階段閱讀法」(先讀標題/摘要/引言 → 再看圖表 → 最後精讀全文)作為納入判斷依據。
- 明確列出納入(IC1–IC3)與排除(EC1–EC4)標準,並說明檢索字串未涵蓋「digital biomarker」「passive sensing」等相關同義詞,可能排除部分相關文獻——這點被作者自己列為限制。

## 主要發現

- 納入研究的樣本數變異極大:平均樣本數約 7,910 人,但中位數僅 117 人,標準差高達約 39,628,顯示少數大型研究(如公開資料集)大幅拉高平均值,多數研究實際樣本量偏小。
- 最主要的研究挑戰依序為:資料品質與規模不足(21 篇明確提及需要更大樣本)、類別不平衡(imbalanced class)、遺失值處理、因果推論困難、自陳資料偏誤、裝置電力與技術限制等。
- 傳統機器學習方法(邏輯迴歸、SVM、隨機森林)仍是主流選擇,原因除了資料量限制外,也與臨床端對模型可解釋性的需求有關;而樣本量與資料不平衡問題,會進一步限制深度學習方法的可用性。
- 沒有任何一篇納入研究使用或提出本體論(ontology)架構來組織資料概念,作者認為這是未來可發展的方向。

## 限制與批判性觀察(作者自述)

- 檢索字串僅鎖定「digital phenotype」「digital phenotyping」兩個核心詞及其同義詞,未納入「digital biomarker」「mobile sensing」「passive sensing」等相關但不同的術語,作者承認這可能導致遺漏未直接使用「phenotype」一詞、但實質相關的重要文獻。
- 篩選與分類過程主要由單一研究者執行,檢索字串的組成本身也可能存在人為疏漏,屬於任何 mapping study 常見的限制。

## 與研究主題的關聯

這是本次蒐集文獻中方法學最嚴謹的一篇系統性回顧,其對「小樣本」「資料不平衡」「自陳偏誤」等挑戰的系統整理,適合直接支撐你論述中「AI 從數位資料推論健康狀態」這個技術環節目前實際面臨的限制與不確定性。
