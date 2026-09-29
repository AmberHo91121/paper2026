# Olyanasab & Annabestani (2024) — 機器學習於個人化穿戴式生醫裝置之應用回顧

**原文標題**: Leveraging Machine Learning for Personalized Wearable Biomedical Devices: A Review
**作者**: Ali Olyanasab, Mohsen Annabestani
**出處**: *Journal of Personalized Medicine*, 14:203 (2024), MDPI,開放取用 (CC BY)
**檔案**: `Olyanasab_Annabestani_2024_ML_personalized_wearable_biomedical_devices.pdf`

> 以下為中文改寫整理,非逐句翻譯。

---

## 摘要重點

本文回顧「個人化穿戴式生醫裝置 × 機器學習」相關文獻,依感測原理將裝置分為三大類:生電類(bio-electrical,例如心電圖 ECG、肌電圖 EMG、腦電圖 EEG)、生阻抗與電化學類(bio-impedance / electrochemical,例如血糖、電解質監測)、機電類(electro-mechanical,例如動作與活動偵測)。作者透過 Scopus、Nature、IEEE Xplore 等資料庫,以「Personalized + Wearable + Machine Learning」為關鍵詞檢索,整理約 60 篇案例研究,說明機器學習如何提升這些裝置的個人化偵測能力。

## 主要發現

- 整理的案例涵蓋巴金森氏症、癲癇、壓力、恐慌發作、脫水、傷口癒合、睡眠呼吸中止、跌倒偵測等多種健康應用。
- 多數研究回報的準確率落在 75%–100% 之間,其中約 78.5% 的裝置被作者標記為具有「個人化(personalized)」特性,即以個別使用者的資料進行模型訓練或校正。

## 限制與批判性觀察

- 本文並未採用 PRISMA 流程或提供正式的排除文章數統計,檢索與篩選過程的透明度不足,較接近敘事式回顧而非嚴謹的系統性回顧。
- 「個人化(personalized)」一詞在文中並未有明確的操作型定義,認定標準似乎主要依作者主觀判斷;多數所謂的個人化系統,實質上僅是「以個別受試者資料訓練或校正模型」,並未涉及使用者主觀詮釋或情境差異的考量。
- 表格中所引用的部分案例研究樣本數極小(如 N=4、N=5、N=7),卻仍被列為驗證高準確率的成功案例,存在僅報告成功案例、未呈現失敗或陰性結果的偏誤疑慮。

## 與研究主題的關聯

本篇技術性內容豐富,適合作為「感測器 → 機器學習 → 健康推論」技術機制段落的案例庫來源,但因其「個人化」概念操作定義鬆散、方法學嚴謹度偏弱,不建議在定義層面或方法論層面直接依賴此文作為權威來源。
