var KaoKaoNan = (function () {
  const PLUGIN_ID = "kaokaonan@researchworkflow.local";
  const POLL_INTERVAL_MS = 5000;
  const THRESHOLDS_MS = {
    shallow: 20 * 60 * 1000,
    deep: 60 * 60 * 1000,
  };
  // 照 SPEC.md 4.1 / 4.2 的固定題組，MVP 先不接 LLM 出題。
  const QUESTION_SETS = {
    shallow: ["類型", "脈絡", "前提", "貢獻", "這篇論文值不值得我讀？"],
    deep: [
      "核心論點",
      "研究方法",
      "關鍵圖表",
      "任何看不懂的術語或文獻",
      "這篇論文對我來講可以參考什麼？",
      "跟我目前研究架構裡的哪一塊最相關？為什麼？",
      "帶給我的未來研究想法",
    ],
  };
  // 寫死在這台機器上這個專案的路徑，不是通用設定——MVP 先這樣，之後要做成
  // 外掛設定選項的話再改。
  const NOTES_DIR =
    "C:\\Users\\amber\\OneDrive\\桌面\\2026_知識庫\\2026_researchWorkflow\\notes";
  const SUMMARY_FILE = NOTES_DIR + "\\_總紀錄.md";
  const AVATAR_ELEMENT_ID = "kaokaonan-floating-avatar";
  const AVATAR_STYLE_ID = "kaokaonan-floating-avatar-style";
  const QUESTION_CARD_ID = "kaokaonan-question-card";
  const DEEP_OFFER_ID = "kaokaonan-deep-offer";
  const ANSWER_REVIEW_ID = "kaokaonan-answer-review";
  const EDIT_CARD_ID = "kaokaonan-edit-card";
  const OVERLAY_STYLE = `
    position: fixed; inset: 0; background: rgba(0,0,0,0.35);
    z-index: 2147483647; display: flex; align-items: center; justify-content: center;
    font-family: system-ui, sans-serif;
  `;
  const CARD_STYLE = `
    background: #fff; color: #1c1c28; border-radius: 12px; padding: 20px 24px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
  `;
  // reader.html 的內容安全性限制不准用 <img src="..."> 跨來源載入外掛檔案
  // （jar:file:...xpi!/...），所以頭像直接用內嵌 SVG 字串，不透過檔案路徑載入。
  const AVATAR_SVG_MARKUP = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
      <ellipse cx="32" cy="57" rx="14" ry="3.5" fill="#000000" opacity="0.15"/>
      <path d="M18 14 L21.5 5 L26 15 Z" fill="#7C5CFC"/>
      <path d="M46 14 L42.5 5 L38 15 Z" fill="#7C5CFC"/>
      <path d="M20 54 C13 54 9 47 9 37 C9 21 18 9 32 9 C46 9 55 21 55 37 C55 47 51 54 44 54 Z" fill="#7C5CFC"/>
      <circle cx="24" cy="30" r="5.5" fill="#FFFFFF"/>
      <circle cx="40" cy="30" r="5.5" fill="#FFFFFF"/>
      <circle cx="24" cy="31" r="2.6" fill="#1C1C28"/>
      <circle cx="40" cy="31" r="2.6" fill="#1C1C28"/>
      <path d="M23 42 Q32 49 41 42" stroke="#1C1C28" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    </svg>
  `;

  let rootURI = "";
  let pollTimer = null;
  let toolbarHandler = null;
  const sessions = new Map(); // itemID -> session
  const knownReaders = new Map(); // itemID -> reader instance
  const injectedAvatars = []; // { avatarEl, styleEl } per reader, for cleanup
  let lastFocusedItemID = null;

  function log(msg) {
    const line = "[KaoKaoNan] " + msg;
    try {
      Zotero.debug(line);
    } catch (e) {}
    try {
      Services.console.logStringMessage(line);
    } catch (e) {}
  }

  function trackReader(reader) {
    if (reader && reader.itemID != null) {
      knownReaders.set(reader.itemID, reader);
    }
  }

  // 可能同時開好幾篇論文（分頁或獨立視窗），用「哪個已知 reader 的 iframe
  // 目前有 focus」判斷你現在在讀哪一篇。找不到有 focus 的就退回上一次找到
  // 的那篇，避免點擊瞬間 iframe 失焦導致整個判斷失敗。
  function findActiveReader() {
    for (const reader of knownReaders.values()) {
      try {
        if (reader._iframeWindow && reader._iframeWindow.document.hasFocus()) {
          return reader;
        }
      } catch (e) {}
    }
    if (lastFocusedItemID != null && knownReaders.has(lastFocusedItemID)) {
      return knownReaders.get(lastFocusedItemID);
    }
    return null;
  }

  // reader.state / reader._iframeWindow 是未公開文件化的內部屬性，
  // 拿不到時要能安全降級，而不是讓整個外掛掛掉。
  function getReaderState(reader) {
    try {
      if (!reader || !reader.state) return null;
      let pagesCount = null;
      try {
        pagesCount =
          reader._iframeWindow.wrappedJSObject.PDFViewerApplication.pagesCount;
      } catch (e) {}
      return {
        reader,
        itemID: reader.itemID,
        pageIndex: reader.state.pageIndex,
        pagesCount,
      };
    } catch (e) {
      return null;
    }
  }

  function getActiveReaderState() {
    const reader = findActiveReader();
    if (!reader) return null;
    lastFocusedItemID = reader.itemID;
    return getReaderState(reader);
  }

  function isAtLastContentPage(pageIndex, pagesCount) {
    if (pageIndex == null || !pagesCount) return false;
    return pageIndex >= pagesCount - 1;
  }

  function ensureSession(itemID) {
    if (!sessions.has(itemID)) {
      sessions.set(itemID, {
        mode: null,
        elapsedMs: 0,
        lastTick: Date.now(),
        notified: false,
        quizDone: false,
        deepOffered: false,
        answers: {},
      });
    }
    return sessions.get(itemID);
  }

  function makeButton(doc, label, primary) {
    const btn = doc.createElement("button");
    btn.textContent = label;
    btn.style.cssText = `
      padding: 9px 12px; border-radius: 8px; border: none; cursor: pointer;
      font-size: 14px; ${
        primary ? "background:#7C5CFC; color:#fff;" : "background:#f0f0f3; color:#1c1c28;"
      }
    `;
    return btn;
  }

  function nextUnansweredIndex(session) {
    const questions = QUESTION_SETS[session.mode];
    for (let i = 0; i < questions.length; i++) {
      if (session.answers[questions[i]] == null) return i;
    }
    return null;
  }

  // 每一題都用同一張卡片：問題 + 文字框 + 「下一題」，淺讀模式下多一顆
  // 「跳過剩餘淺讀，直接精讀」。按「下一題」一定會前進（空白就算跳過這
  // 題），只有「先關閉」才會真的留著沒作答，下次再點頭像才會停在原地。
  function showQuestionCard(reader, session, itemID) {
    try {
      showQuestionCardUnsafe(reader, session, itemID);
    } catch (e) {
      log("顯示題目卡片失敗: " + e);
    }
  }

  function showQuestionCardUnsafe(reader, session, itemID) {
    const doc = reader._iframeWindow.document;
    const existing = doc.getElementById(QUESTION_CARD_ID);
    if (existing) existing.remove();

    const index = nextUnansweredIndex(session);
    if (index == null) {
      handleModeSetComplete(reader, session, itemID);
      return;
    }

    const questions = QUESTION_SETS[session.mode];
    const question = questions[index];
    const modeLabel = session.mode === "deep" ? "精讀" : "淺讀";

    const overlay = doc.createElement("div");
    overlay.id = QUESTION_CARD_ID;
    overlay.style.cssText = OVERLAY_STYLE;

    const card = doc.createElement("div");
    card.style.cssText = CARD_STYLE + "width: 320px;";

    const header = doc.createElement("div");
    header.textContent = `考考男・${modeLabel}　第 ${index + 1} / ${questions.length} 題`;
    header.style.cssText =
      "font-size: 12px; color:#7C5CFC; font-weight:600; margin-bottom:8px;";
    card.appendChild(header);

    const qEl = doc.createElement("div");
    qEl.textContent = question;
    qEl.style.cssText =
      "font-size: 15px; font-weight:600; margin-bottom:12px; line-height:1.4;";
    card.appendChild(qEl);

    const textarea = doc.createElement("textarea");
    textarea.rows = 4;
    textarea.style.cssText =
      "width:100%; box-sizing:border-box; padding:8px; border-radius:8px; " +
      "border:1px solid #ddd; font-size:14px; font-family:inherit; " +
      "resize:vertical; margin-bottom:12px;";
    card.appendChild(textarea);

    const btnRow = doc.createElement("div");
    btnRow.style.cssText = "display:flex; flex-direction:column; gap:8px;";

    const nextBtn = makeButton(
      doc,
      index + 1 >= questions.length ? "完成這一組" : "下一題",
      true
    );
    nextBtn.addEventListener("click", () => {
      const val = textarea.value.trim();
      session.answers[question] = val;
      log(val ? `作答記錄 [${question}]: ${val}` : `跳過 [${question}]`);
      overlay.remove();
      showQuestionCard(reader, session, itemID);
    });
    btnRow.appendChild(nextBtn);

    if (session.mode === "shallow") {
      const jumpBtn = makeButton(doc, "跳過剩餘淺讀，直接精讀", false);
      jumpBtn.addEventListener("click", () => {
        overlay.remove();
        session.mode = "deep";
        session.deepOffered = true;
        log("使用者從淺讀跳到精讀");
        showQuestionCard(reader, session, itemID);
      });
      btnRow.appendChild(jumpBtn);
    }

    if (Object.keys(session.answers).length > 0) {
      const reviewBtn = makeButton(doc, "查看/編輯已作答", false);
      reviewBtn.addEventListener("click", () => {
        overlay.remove();
        showAnswerReview(reader, session, itemID, () => {
          showQuestionCard(reader, session, itemID);
        });
      });
      btnRow.appendChild(reviewBtn);
    }

    const closeBtn = makeButton(doc, "先關閉，之後再繼續", false);
    closeBtn.addEventListener("click", () => overlay.remove());
    btnRow.appendChild(closeBtn);

    card.appendChild(btnRow);
    overlay.appendChild(card);
    doc.documentElement.appendChild(overlay);
  }

  // 淺讀整組答完後才問要不要繼續精讀；精讀整組答完（或本來就是精讀模式
  // 答完）就直接算測驗完成。
  function handleModeSetComplete(reader, session, itemID) {
    const win = Zotero.getMainWindow();
    if (session.mode === "shallow" && !session.deepOffered) {
      showDeepOfferCard(reader, session, itemID);
      return;
    }
    session.quizDone = true;
    writePaperNote(itemID, session);
    win.alert("考考男：這篇測驗完成了！做得好 🎉");
  }

  function showDeepOfferCard(reader, session, itemID) {
    try {
      showDeepOfferCardUnsafe(reader, session, itemID);
    } catch (e) {
      log("顯示精讀邀請卡片失敗: " + e);
    }
  }

  function showDeepOfferCardUnsafe(reader, session, itemID) {
    const doc = reader._iframeWindow.document;
    const existing = doc.getElementById(DEEP_OFFER_ID);
    if (existing) existing.remove();

    const overlay = doc.createElement("div");
    overlay.id = DEEP_OFFER_ID;
    overlay.style.cssText = OVERLAY_STYLE;

    const card = doc.createElement("div");
    card.style.cssText = CARD_STYLE + "width: 260px; text-align:center;";

    const message = doc.createElement("div");
    message.textContent = "考考男：淺讀完成了！要不要繼續精讀？";
    message.style.cssText = "font-size: 14px; margin-bottom: 16px; line-height: 1.5;";
    card.appendChild(message);

    const btnRow = doc.createElement("div");
    btnRow.style.cssText = "display:flex; flex-direction:column; gap:8px;";

    const yesBtn = makeButton(doc, "要，開始精讀", true);
    yesBtn.addEventListener("click", () => {
      overlay.remove();
      session.mode = "deep";
      session.deepOffered = true;
      showQuestionCard(reader, session, itemID);
    });

    const noBtn = makeButton(doc, "不用了，先這樣", false);
    noBtn.addEventListener("click", () => {
      overlay.remove();
      session.deepOffered = true;
      session.quizDone = true;
      writePaperNote(itemID, session);
      Zotero.getMainWindow().alert("考考男：這篇測驗完成了！做得好 🎉");
    });

    btnRow.appendChild(yesBtn);
    btnRow.appendChild(noBtn);
    card.appendChild(btnRow);
    overlay.appendChild(card);
    doc.documentElement.appendChild(overlay);
  }

  function notifyReady(win, session, itemID) {
    const item = Zotero.Items.get(itemID);
    const title = item ? item.getField("title") : "這篇論文";
    win.alert(
      `考考男：「${title}」看起來讀完了，準備好被考了嗎？點頭像開始測驗。`
    );
    session.notified = true;
  }

  function sanitizeFilename(name) {
    return name.replace(/[\\/:*?"<>|]/g, "_").slice(0, 120);
  }

  function ensureNotesDir() {
    try {
      Zotero.File.createDirectoryIfMissing(NOTES_DIR);
    } catch (e) {
      log("建立 notes 資料夾失敗: " + e);
    }
  }

  // 一篇論文的作答紀錄會橫跨淺讀跟精讀兩組題目（切到精讀之後 session.mode
  // 就不是 "shallow" 了），不管現在在哪個模式，顯示/寫檔都要把兩組都列出
  // 來，不能只看目前模式，不然切到精讀後淺讀的紀錄就會看起來像消失了。
  function formatQuestionSection(label, questions, answers) {
    let s = `## ${label}\n\n`;
    for (const q of questions) {
      s += `### ${q}\n\n`;
      const answered = answers[q] != null;
      s += (answered ? answers[q] || "_(已跳過)_" : "_(尚未回答)_") + "\n\n";
    }
    return s;
  }

  function countAnswered(questions, answers) {
    return questions.filter((q) => answers[q] != null).length;
  }

  async function writePaperNote(itemID, session) {
    try {
      ensureNotesDir();
      const item = Zotero.Items.get(itemID);
      const title = item ? item.getField("title") : `item-${itemID}`;
      const modeLabel = session.mode === "deep" ? "精讀" : "淺讀";

      const filePath =
        NOTES_DIR + "\\" + sanitizeFilename(title || `item-${itemID}`) + ".md";

      let body = `# ${title}\n\n`;
      body += `- 目前模式: ${modeLabel}${session.quizDone ? "（已完成）" : ""}\n`;
      body += `- 更新時間: ${new Date().toLocaleString("zh-TW")}\n\n`;
      body += formatQuestionSection("淺讀", QUESTION_SETS.shallow, session.answers);
      if (session.deepOffered) {
        body += formatQuestionSection("精讀", QUESTION_SETS.deep, session.answers);
      }

      await Zotero.File.putContentsAsync(filePath, body);
      log("已寫入筆記: " + filePath);
      await updateSummaryFile(itemID, title, session);
    } catch (e) {
      log("寫入論文筆記失敗: " + e);
    }
  }

  async function updateSummaryFile(itemID, title, session) {
    try {
      ensureNotesDir();
      let status = `淺讀 ${countAnswered(QUESTION_SETS.shallow, session.answers)}/${QUESTION_SETS.shallow.length}`;
      if (session.deepOffered) {
        status += ` ・ 精讀 ${countAnswered(QUESTION_SETS.deep, session.answers)}/${QUESTION_SETS.deep.length}`;
      }
      if (session.quizDone) status += "（完成）";
      const worthReading = session.answers["這篇論文值不值得我讀？"];
      const takeaway = session.answers["這篇論文對我來講可以參考什麼？"];

      let existing;
      try {
        existing = await Zotero.File.getContentsAsync(SUMMARY_FILE);
      } catch (e) {
        existing = "# 全部論文總紀錄\n";
      }

      const marker = `<!-- kaokaonan-item:${itemID} -->`;
      let entry = `${marker}\n- **${title}** — ${status}`;
      if (worthReading) entry += ` / 值得讀判定: ${worthReading}`;
      if (takeaway) entry += ` / 一句話: ${takeaway}`;
      entry += ` （更新於 ${new Date().toLocaleString("zh-TW")}）\n`;

      const escapedMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const blockRegex = new RegExp(escapedMarker + "\\n.*\\n");
      if (blockRegex.test(existing)) {
        existing = existing.replace(blockRegex, entry);
      } else {
        existing = existing.trimEnd() + "\n\n" + entry;
      }

      await Zotero.File.putContentsAsync(SUMMARY_FILE, existing);
      log("已更新總紀錄");
    } catch (e) {
      log("更新總紀錄失敗: " + e);
    }
  }

  function showAnswerReview(reader, session, itemID, onContinue) {
    try {
      showAnswerReviewUnsafe(reader, session, itemID, onContinue);
    } catch (e) {
      log("顯示作答紀錄失敗: " + e);
    }
  }

  // 讓已經答過的題目可以回頭改，改完存檔（同步更新 md 筆記）後回到回顧
  // 清單，不用把整個測驗重跑一次。
  function showEditCard(reader, session, itemID, question, onDone) {
    try {
      showEditCardUnsafe(reader, session, itemID, question, onDone);
    } catch (e) {
      log("顯示編輯卡片失敗: " + e);
    }
  }

  function showEditCardUnsafe(reader, session, itemID, question, onDone) {
    const doc = reader._iframeWindow.document;
    const existingOverlay = doc.getElementById(EDIT_CARD_ID);
    if (existingOverlay) existingOverlay.remove();

    const overlay = doc.createElement("div");
    overlay.id = EDIT_CARD_ID;
    overlay.style.cssText = OVERLAY_STYLE;

    const card = doc.createElement("div");
    card.style.cssText = CARD_STYLE + "width: 320px;";

    const header = doc.createElement("div");
    header.textContent = "考考男・編輯回答";
    header.style.cssText =
      "font-size: 12px; color:#7C5CFC; font-weight:600; margin-bottom:8px;";
    card.appendChild(header);

    const qEl = doc.createElement("div");
    qEl.textContent = question;
    qEl.style.cssText =
      "font-size: 15px; font-weight:600; margin-bottom:12px; line-height:1.4;";
    card.appendChild(qEl);

    const textarea = doc.createElement("textarea");
    textarea.rows = 4;
    textarea.value = session.answers[question] || "";
    textarea.style.cssText =
      "width:100%; box-sizing:border-box; padding:8px; border-radius:8px; " +
      "border:1px solid #ddd; font-size:14px; font-family:inherit; " +
      "resize:vertical; margin-bottom:12px;";
    card.appendChild(textarea);

    const btnRow = doc.createElement("div");
    btnRow.style.cssText = "display:flex; flex-direction:column; gap:8px;";

    const saveBtn = makeButton(doc, "儲存", true);
    saveBtn.addEventListener("click", () => {
      const val = textarea.value.trim();
      session.answers[question] = val;
      log(`編輯作答 [${question}]: ${val || "(清空，視為跳過)"}`);
      overlay.remove();
      writePaperNote(itemID, session);
      onDone();
    });
    btnRow.appendChild(saveBtn);

    const cancelBtn = makeButton(doc, "取消", false);
    cancelBtn.addEventListener("click", () => overlay.remove());
    btnRow.appendChild(cancelBtn);

    card.appendChild(btnRow);
    overlay.appendChild(card);
    doc.documentElement.appendChild(overlay);
  }

  function appendQuestionRows(doc, container, label, questions, session, reader, itemID, refresh) {
    const answers = session.answers;
    const sectionTitle = doc.createElement("div");
    sectionTitle.textContent = label;
    sectionTitle.style.cssText =
      "font-size: 12px; font-weight:700; color:#7C5CFC; margin: 12px 0 6px;";
    container.appendChild(sectionTitle);

    for (const q of questions) {
      const row = doc.createElement("div");
      row.style.cssText = "border-left: 3px solid #7C5CFC; padding-left: 10px; margin-bottom: 8px;";
      const qEl = doc.createElement("div");
      qEl.textContent = q;
      qEl.style.cssText = "font-size: 13px; font-weight: 600; margin-bottom: 3px;";
      const answered = answers[q] != null;
      const aEl = doc.createElement("div");
      aEl.textContent = answered ? answers[q] || "（已跳過）" : "（尚未回答）";
      aEl.style.cssText = `font-size: 13px; ${
        answered && answers[q] ? "color:#1c1c28;" : "color:#999; font-style: italic;"
      }`;
      row.appendChild(qEl);
      row.appendChild(aEl);

      {
        const editBtn = doc.createElement("button");
        editBtn.textContent = answered ? "編輯" : "填寫";
        editBtn.style.cssText =
          "margin-top:4px; padding:2px 8px; font-size:12px; border-radius:6px; " +
          "border:1px solid #ddd; background:#fff; color:#7C5CFC; cursor:pointer;";
        editBtn.addEventListener("click", () => {
          showEditCard(reader, session, itemID, q, refresh);
        });
        row.appendChild(editBtn);
      }

      container.appendChild(row);
    }
  }

  function showAnswerReviewUnsafe(reader, session, itemID, onContinue) {
    const doc = reader._iframeWindow.document;
    if (doc.getElementById(ANSWER_REVIEW_ID)) return;

    const item = Zotero.Items.get(itemID);
    const title = item ? item.getField("title") : "這篇論文";
    const shallowAnswered = countAnswered(QUESTION_SETS.shallow, session.answers);
    const shallowTotal = QUESTION_SETS.shallow.length;
    const deepAnswered = countAnswered(QUESTION_SETS.deep, session.answers);
    const deepTotal = QUESTION_SETS.deep.length;
    const stillHasUnanswered =
      shallowAnswered < shallowTotal || (session.deepOffered && deepAnswered < deepTotal);

    const overlay = doc.createElement("div");
    overlay.id = ANSWER_REVIEW_ID;
    overlay.style.cssText = OVERLAY_STYLE;

    const card = doc.createElement("div");
    card.style.cssText = CARD_STYLE + "width: 340px; max-height: 70vh; overflow-y: auto;";

    const heading = doc.createElement("div");
    heading.textContent = `「${title}」的作答紀錄`;
    heading.style.cssText = "font-size: 14px; font-weight: 600; margin-bottom: 4px;";
    card.appendChild(heading);

    const refresh = () => {
      overlay.remove();
      showAnswerReview(reader, session, itemID, onContinue);
    };

    const list = doc.createElement("div");
    list.style.cssText = "display: flex; flex-direction: column; margin-bottom: 12px;";
    appendQuestionRows(
      doc, list, `淺讀 (${shallowAnswered}/${shallowTotal})`,
      QUESTION_SETS.shallow, session, reader, itemID, refresh
    );
    if (session.deepOffered) {
      appendQuestionRows(
        doc, list, `精讀 (${deepAnswered}/${deepTotal})`,
        QUESTION_SETS.deep, session, reader, itemID, refresh
      );
    }
    card.appendChild(list);

    const btnRow = doc.createElement("div");
    btnRow.style.cssText = "display: flex; flex-direction: column; gap: 8px;";

    if (stillHasUnanswered) {
      const continueBtn = makeButton(doc, "繼續作答剩餘題目", true);
      continueBtn.addEventListener("click", () => {
        overlay.remove();
        onContinue();
      });
      btnRow.appendChild(continueBtn);
    }

    const closeBtn = makeButton(doc, "關閉", false);
    closeBtn.addEventListener("click", () => overlay.remove());
    btnRow.appendChild(closeBtn);

    card.appendChild(btnRow);
    overlay.appendChild(card);
    doc.documentElement.appendChild(overlay);
  }

  function tick() {
    const win = Zotero.getMainWindow();
    if (!win) return;

    const state = getActiveReaderState();
    if (!state) return;

    const session = ensureSession(state.itemID);
    const now = Date.now();
    if (win.document.hasFocus()) {
      session.elapsedMs += now - session.lastTick;
    }
    session.lastTick = now;

    if (session.mode == null || session.notified) return;

    const atEnd = isAtLastContentPage(state.pageIndex, state.pagesCount);
    const threshold = THRESHOLDS_MS[session.mode];
    if (atEnd && session.elapsedMs >= threshold) {
      notifyReady(win, session, state.itemID);
    }
  }

  // 第一次點擊直接進淺讀（不再另外問要選哪個模式）；淺讀題目卡片裡有
  // 「跳過剩餘淺讀，直接精讀」的按鈕；淺讀整組答完才會另外問要不要繼續
  // 精讀。已經完整跑完的（quizDone）再點會先看到過去填寫內容。
  function handleAvatarClick(reader) {
    lastFocusedItemID = reader.itemID;
    const session = ensureSession(reader.itemID);

    if (session.mode == null) {
      session.mode = "shallow";
      log("模式選定: shallow (預設直接進入)");
      showQuestionCard(reader, session, reader.itemID);
      return;
    }

    if (session.quizDone) {
      showAnswerReview(reader, session, reader.itemID, () => {
        showQuestionCard(reader, session, reader.itemID);
      });
      return;
    }

    showQuestionCard(reader, session, reader.itemID);
  }

  // 頭像掛在該篇論文 reader 自己的 iframe 裡（跟工具列按鈕同一個
  // renderToolbar 事件觸發時機），所以只有在這篇論文的閱讀畫面打開時才會
  // 出現，論文分頁/視窗一關就跟著消失，不用另外處理顯示/隱藏邏輯。
  function injectReaderAvatar(reader) {
    try {
      injectReaderAvatarUnsafe(reader);
    } catch (e) {
      log("掛載閱讀畫面頭像失敗: " + e);
    }
  }

  function injectReaderAvatarUnsafe(reader) {
    const iframeWin = reader._iframeWindow;
    if (!iframeWin || !iframeWin.document) return;
    const doc = iframeWin.document;
    if (doc.getElementById(AVATAR_ELEMENT_ID)) return;

    const style = doc.createElement("style");
    style.id = AVATAR_STYLE_ID;
    style.textContent = `
      #${AVATAR_ELEMENT_ID} {
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 56px;
        height: 56px;
        z-index: 2147483647;
        cursor: pointer;
        animation: kaokaonan-bob 2.4s ease-in-out infinite;
        filter: drop-shadow(0 2px 5px rgba(0,0,0,0.35));
      }
      #${AVATAR_ELEMENT_ID}:hover {
        animation-play-state: paused;
        transform: scale(1.08);
      }
      #${AVATAR_ELEMENT_ID} svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      @keyframes kaokaonan-bob {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
    `;
    doc.documentElement.appendChild(style);

    const avatar = doc.createElement("div");
    avatar.id = AVATAR_ELEMENT_ID;
    avatar.title = "考考男：點我開始測驗";
    avatar.innerHTML = AVATAR_SVG_MARKUP;
    avatar.addEventListener("click", () => handleAvatarClick(reader));
    doc.documentElement.appendChild(avatar);

    injectedAvatars.push({ avatarEl: avatar, styleEl: style });
    log("閱讀畫面頭像已掛載: itemID=" + reader.itemID);
  }

  function registerAvatarButton() {
    toolbarHandler = (event) => {
      log("renderToolbar 事件觸發");
      const { doc, reader, append } = event;
      trackReader(reader);
      injectReaderAvatar(reader);

      const btn = doc.createElement("button");
      btn.textContent = "🐲";
      btn.title = "考考男：點我開始測驗";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "16px";
      btn.style.background = "transparent";
      btn.style.border = "none";
      btn.style.padding = "0 6px";
      btn.addEventListener("click", () => handleAvatarClick(reader));
      append(btn);
    };
    Zotero.Reader.registerEventListener(
      "renderToolbar",
      toolbarHandler,
      PLUGIN_ID
    );
  }

  function removeInjectedAvatars() {
    for (const { avatarEl, styleEl } of injectedAvatars) {
      try {
        avatarEl.remove();
      } catch (e) {}
      try {
        styleEl.remove();
      } catch (e) {}
    }
    injectedAvatars.length = 0;
  }

  return {
    init({ rootURI: uri } = {}) {
      rootURI = uri || "";
      registerAvatarButton();
      pollTimer = setInterval(tick, POLL_INTERVAL_MS);
      log("已啟動");
    },
    shutdown() {
      if (pollTimer) clearInterval(pollTimer);
      if (toolbarHandler) {
        try {
          Zotero.Reader.unregisterEventListener("renderToolbar", toolbarHandler);
        } catch (e) {}
      }
      removeInjectedAvatars();
      sessions.clear();
      knownReaders.clear();
      log("已停止");
    },
  };
})();

if (typeof module !== "undefined") {
  module.KaoKaoNan = KaoKaoNan;
}
