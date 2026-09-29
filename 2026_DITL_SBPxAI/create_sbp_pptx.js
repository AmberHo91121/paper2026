// AI × SBP 簡報生成腳本 — 15 slides
// Run: node create_sbp_pptx.js
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "AI 製作服務藍圖（SBP）學術文獻與商業案例比較分析";

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  dark:"0F172A", text:"1E293B", muted:"64748B", dim:"94A3B8",
  white:"FFFFFF", card:"F8FAFC", cardAlt:"F1F5F9", border:"CBD5E1", line:"E2E8F0",
  blue:"2563EB", blueD:"1D4ED8", blueL:"DBEAFE", blueB:"93C5FD",
  teal:"0D9488", tealL:"F0FDFA", tealB:"5EEAD4",
  purple:"7C3AED", purpleL:"F5F3FF", purpleB:"C4B5FD",
  amber:"D97706", amberL:"FFFBEB", amberB:"FCD34D",
  red:"DC2626", redL:"FFF1F2", redB:"FCA5A5",
  green:"059669", greenL:"ECFDF5", greenB:"6EE7B7",
};

const mkSh = () => ({ type:"outer", color:"000000", blur:4, offset:1, angle:135, opacity:0.08 });

// ─── Slide header (returns content start Y) ──────────────────────────────────
function hdr(s, title, sub, tag) {
  s.addShape(pres.shapes.RECTANGLE, { x:0,y:0,w:10,h:0.07, fill:{color:C.blue}, line:{color:C.blue} });
  let cy = 0.18;
  if (tag) {
    s.addShape(pres.shapes.RECTANGLE, { x:0.5,y:cy,w:tag.w||2.1,h:0.24, fill:{color:tag.bg||C.blueL}, line:{color:tag.bd||C.blueB,width:0.75} });
    s.addText(tag.t, { x:0.5,y:cy,w:tag.w||2.1,h:0.24, fontSize:8.5,bold:true,color:tag.tc||C.blueD, align:"center",valign:"middle",margin:0 });
    cy += 0.29;
  }
  s.addText(title, { x:0.5,y:cy,w:9,h:0.52, fontSize:22,fontFace:"Calibri",bold:true,color:C.text,margin:0 });
  cy += 0.54;
  if (sub) {
    s.addText(sub, { x:0.5,y:cy,w:9,h:0.28, fontSize:10,color:C.muted,margin:0 });
    cy += 0.31;
  }
  s.addShape(pres.shapes.LINE, { x:0.5,y:cy+0.04,w:9,h:0, line:{color:C.line,width:0.75} });
  return cy + 0.16;
}

// ─── Note box ────────────────────────────────────────────────────────────────
function note(s, text, y, opts={}) {
  const h = opts.h||0.36;
  s.addShape(pres.shapes.RECTANGLE, { x:0.5,y,w:9,h, fill:{color:opts.bg||C.blueL}, line:{color:opts.bd||C.blueB,width:0.75} });
  s.addText(text, { x:0.55,y,w:8.9,h, fontSize:9.5,color:opts.tc||C.blueD,valign:"middle",margin:3 });
}

// ─── Accent card ─────────────────────────────────────────────────────────────
function card(s, x, y, w, h, opts={}) {
  s.addShape(pres.shapes.RECTANGLE, { x,y,w,h, fill:{color:opts.bg||C.cardAlt}, line:{color:opts.bd||C.border,width:0.75}, shadow:mkSh() });
  if (opts.ac) s.addShape(pres.shapes.RECTANGLE, { x,y,w:0.11,h, fill:{color:opts.ac}, line:{color:opts.ac} });
}

// ─── Section divider slide ────────────────────────────────────────────────────
function sec(num, label, title, desc, ac) {
  const s = pres.addSlide();
  s.background = { color:C.dark };
  s.addText(num, { x:0,y:-0.2,w:5,h:4, fontSize:200,bold:true,color:"FFFFFF",transparency:93,margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.6,y:2.2,w:0.42,h:0.06, fill:{color:ac}, line:{color:ac} });
  s.addText(label, { x:0.6,y:2.3,w:6,h:0.28, fontSize:9,color:ac,bold:true,charSpacing:4,margin:0 });
  s.addText(title, { x:0.6,y:2.62,w:8.5,h:1.0, fontSize:36,fontFace:"Calibri",bold:true,color:C.white,margin:0 });
  s.addText(desc,  { x:0.6,y:3.72,w:7.5,h:0.5, fontSize:13,color:C.dim,margin:0 });
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 1 — 研究範圍與案例分類
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color:"FFFFFF" };
  const cy = hdr(s, "研究範圍與案例分類", "八個 SBP x AI 的來源，共四類");

  const cats = [
    { label:"SBP 定義/架構", ac:C.purple, bg:C.purpleL, bd:C.purpleB,
      lines:["Bitner et al. (2008)  ·  概念框架＋案例說明","Kurtmollaiev & Pedersen (2022)  ·  系統性文獻回顧"],
      badge:"奠基標準  ·  1,100+ 引用" },
    { label:"學術研究", ac:C.blue, bg:C.blueL, bd:C.blueB,
      lines:["Mortati & Freitas (2026)  ·  概念框架","Luo (2025)  ·  文獻回顧"],
      badge:"有完整方法論  ·  同儕審查" },
    { label:"商業產品", ac:C.teal, bg:C.tealL, bd:C.tealB,
      lines:["Miro  ·  AI Service Blueprint","Smaply  ·  服務藍圖管理系統"],
      badge:"產品部落格  ·  無公開實證" },
    { label:"實務經驗分享", ac:C.amber, bg:C.amberL, bd:C.amberB,
      lines:["Kendrick & Gibbons (2019)  ·  NNG","Jodi Forlizzi  ·  CMU HCI · Medium 2025"],
      badge:"非正式研究  ·  可信度因機構而異" },
  ];

  const cw=4.35, ch=1.72, gap=0.15;
  const xs=[0.35, 0.35+cw+gap];
  const ys=[cy, cy+ch+0.12];
  const pos=[[0,0],[1,0],[0,1],[1,1]];

  cats.forEach((c2,i)=>{
    const x=xs[pos[i][0]>0?1:0], y=ys[pos[i][1]];
    card(s,x,y,cw,ch,{bg:c2.bg,bd:c2.bd,ac:c2.ac});
    s.addText(c2.label, { x:x+0.2,y:y+0.1,w:cw-0.3,h:0.28, fontSize:11,bold:true,color:c2.ac,margin:0 });
    s.addText([
      {text:c2.lines[0],options:{breakLine:true}},
      {text:c2.lines[1]}
    ], { x:x+0.2,y:y+0.43,w:cw-0.3,h:0.78, fontSize:9.5,color:C.text,margin:0,lineSpacingMultiple:1.5 });
    s.addShape(pres.shapes.RECTANGLE, { x:x+0.2,y:y+1.35,w:cw-0.4,h:0.23, fill:{color:"FFFFFF"}, line:{color:c2.bd,width:0.75} });
    s.addText(c2.badge, { x:x+0.2,y:y+1.35,w:cw-0.4,h:0.23, fontSize:9,color:c2.ac,align:"center",valign:"middle",margin:0 });
  });

  note(s,"⚠  AI 賦能 SBP 現階段相關學術文獻較少，多為概念框架或探討 AI 介入 UX。學術研究與商業產品論證基礎不同，引用時不要互相當佐證。",5.12);
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 2 — Section: SBP 定義/架構
// ════════════════════════════════════════════════════════════════════════════
sec("00","PART 00  ·  SBP 定義/架構","SBP 定義與架構",
  "Bitner et al. (2008)  ·  Kurtmollaiev & Pedersen (2022)",C.purple);

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 3 — Bitner et al. (2008)
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color:"FFFFFF" };
  const cy = hdr(s,"Bitner, Ostrom & Morgan (2008)：SBP 業界標準格式",
    "California Management Review 50(3)  ·  1,100+ 引用  ·  若你只讀一篇，讀這篇",
    {t:"學術  |  SBP 定義/架構",bg:C.purpleL,bd:C.purpleB,tc:C.purple,w:2.6});

  // Left card — structure
  card(s,0.35,cy,4.4,3.55,{bg:C.purpleL,bd:C.purpleB,ac:C.purple});
  s.addText("標準格式：五元素＋三條分界線", { x:0.55,y:cy+0.12,w:4.1,h:0.28, fontSize:11,bold:true,color:C.purple,margin:0 });

  const layers=[
    {t:"① 實體證據（Physical Evidence）",    bg:"FEF3C7",tc:C.amber},
    {t:"② 顧客行動（Customer Actions）",      bg:"DBEAFE",tc:C.blueD},
    {t:"── 互動線（Line of Interaction）",     bg:"F1F5F9",tc:C.muted},
    {t:"③ 前台員工行動（Onstage）",           bg:"CCFBF1",tc:C.teal},
    {t:"── 可視線（Line of Visibility）",      bg:"F1F5F9",tc:C.muted},
    {t:"④ 後台員工行動（Backstage）",         bg:"EDE9FE",tc:C.purple},
    {t:"── 內部互動線（Internal Interaction）",bg:"F1F5F9",tc:C.muted},
    {t:"⑤ 支援流程（Support Processes）",     bg:"D1FAE5",tc:C.green},
  ];
  layers.forEach((l,i)=>{
    const ly = cy+0.47+i*0.36;
    const isLine = l.t.startsWith("──");
    s.addShape(pres.shapes.RECTANGLE,{ x:0.55,y:ly,w:4.1,h:0.3,
      fill:{color:l.bg}, line:{color:isLine?"D1D5DB":C.border,width:0.5} });
    s.addText(l.t, { x:0.58,y:ly,w:4.04,h:0.3,
      fontSize: isLine?8.5:9.5, italic:isLine, color:l.tc, valign:"middle",margin:3 });
  });

  // Right card — core points
  card(s,5.0,cy,4.6,3.55,{bg:C.cardAlt});
  s.addText("核心論點", { x:5.18,y:cy+0.12,w:4.2,h:0.28, fontSize:11,bold:true,color:C.text,margin:0 });
  const pts=[
    {t:"毫不妥協地以顧客為中心",c:C.text},
    {t:"五個跨產業質性個案佐證（非統計實驗）",c:C.text},
    {t:"建議依專案階段調整精細度：早期低→後期高",c:C.text},
    {t:"技術伏筆：預見「前台科技行動」列\n── AI 行動者爭論的最早雛形",c:C.blueD},
  ];
  pts.forEach((p,i)=>{
    s.addText([{text:p.t}], {
      x:5.18,y:cy+0.5+i*0.74,w:4.2,h:0.62,
      fontSize:10, color:p.c, bullet:true, margin:4,
      lineSpacingMultiple:1.35
    });
  });

  note(s,"SBP 從「效率導向管理工具」（Shostack, 1984）演進為「顧客體驗導向設計工具」（Bitner et al., 2008）",
    4.94,{bg:C.purpleL,bd:C.purpleB,tc:C.purple});
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 4 — Kurtmollaiev & Pedersen (2022)
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color:"FFFFFF" };
  const cy = hdr(s,"Kurtmollaiev & Pedersen (2022)：SBP 方法論 40 年回顧",
    "International Journal of Management Reviews  ·  系統性文獻回顧（非第一手資料蒐集）",
    {t:"學術  |  SBP 定義/架構",bg:C.purpleL,bd:C.purpleB,tc:C.purple,w:2.6});

  const rows=[
    ["研究性質","系統性文獻回顧（Systematic Literature Review），未開發工具或進行使用者測試"],
    ["研究範圍","回顧近 40 年 SBP 在服務設計、服務創新、服務管理領域的學術發展；整理推動與阻礙採用的關鍵因素"],
    ["核心發現","SBP 的跨部門對齊功能仍是核心價值；方法論本身穩定，但數位化服務帶來新挑戰"],
    ["主要限制","純文獻回顧，無第一手資料；對「AI 如何重塑 SBP」未做正式探討"],
  ];

  const tblData = rows.map(r=>[
    {text:r[0],options:{bold:true,fill:{color:C.purpleL},color:C.purple}},
    {text:r[1],options:{fill:{color:"FFFFFF"},color:C.text}}
  ]);

  s.addTable(tblData,{
    x:0.5,y:cy,w:9,
    colW:[2.0,7.0],
    border:{pt:0.75,color:C.border},
    rowH:0.7,
    fontSize:10,fontFace:"Calibri",
    valign:"middle",
  });

  // Right panel
  card(s,0.5,cy+3.0,9.0,1.3,{bg:C.cardAlt});
  s.addText("引用建議", {x:0.7,y:cy+3.1,w:8.6,h:0.28,fontSize:11,bold:true,color:C.text,margin:0});
  s.addText("Kurtmollaiev & Pedersen（2022）適合作為「SBP 方法論發展史的文獻背景」引用，可說明 SBP 在哪些情境下有效、在哪些情境下失效——引用時請標註「系統性文獻回顧」而非「實證研究」。",
    {x:0.7,y:cy+3.42,w:8.6,h:0.72,fontSize:10,color:C.muted,margin:0,lineSpacingMultiple:1.4});
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 5 — Section: 學術研究
// ════════════════════════════════════════════════════════════════════════════
sec("01","PART 01  ·  學術研究","學術研究",
  "Mortati & Freitas（2026）·  Luo（2025）",C.blue);

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 6 — Mortati & Freitas (2026)
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color:"FFFFFF" };
  const cy = hdr(s,"Mortati & Freitas (2026)：人機混合服務接觸框架",
    "Journal of Service Research (SAGE)  ·  Politecnico di Milano  ·  純理論綜合，無實證",
    {t:"學術  |  概念框架",bg:C.blueL,bd:C.blueB,tc:C.blueD,w:2.0});

  // 2×2 matrix
  const mx=0.35, my=cy, mw=5.45, mh=3.5;
  const hw=mw/2, hh=mh/2;

  const quads=[
    {label:"Human-to-Human",  bg:C.blueL,  bd:C.blueB,  tc:C.blueD,
     desc:"AI 隱身後台輔助人類決策\n（ex. 資料分析輔助醫師問診）\n爭議：AI 是否應向顧客揭露？"},
    {label:"Human-to-AI",     bg:C.tealL,  bd:C.tealB,  tc:C.teal,
     desc:"AI 代替人類行動\n（ex. Google Duplex 代打電話訂位）\n課責性懸而未解"},
    {label:"AI-to-Human",     bg:C.greenL, bd:C.greenB, tc:C.green,
     desc:"AI 是提供者、人是使用者\n（ex. Amazon/Netflix 推薦系統）\n目前研究最成熟"},
    {label:"AI-to-AI（interAI）",bg:C.purpleL,bd:C.purpleB,tc:C.purple,
     desc:"演算法之間互動、無人類介入\n（ex. 紅綠燈號控制系統）\n可課責性完全懸而未解"},
  ];

  const qpos=[[mx,my],[mx+hw,my],[mx,my+hh],[mx+hw,my+hh]];
  quads.forEach((q,i)=>{
    const [qx,qy]=qpos[i];
    s.addShape(pres.shapes.RECTANGLE,{x:qx,y:qy,w:hw,h:hh,fill:{color:q.bg},line:{color:q.bd,width:0.75}});
    s.addText(q.label,{x:qx+0.12,y:qy+0.1,w:hw-0.2,h:0.28,fontSize:10,bold:true,color:q.tc,margin:0});
    s.addText(q.desc,{x:qx+0.12,y:qy+0.42,w:hw-0.2,h:hh-0.55,fontSize:9,color:C.text,margin:0,lineSpacingMultiple:1.4});
  });

  // Axis labels
  s.addText("使用者：人類",{x:mx+0.1,y:my-0.28,w:hw,h:0.24,fontSize:9,color:C.muted,align:"center",margin:0});
  s.addText("使用者：AI",{x:mx+hw+0.1,y:my-0.28,w:hw,h:0.24,fontSize:9,color:C.muted,align:"center",margin:0});

  // Right side: design implications
  const rx=5.95, rw=3.7;
  card(s,rx,cy,rw,1.65,{ac:C.blue});
  s.addText("設計師角色的轉變",{x:rx+0.2,y:cy+0.1,w:rw-0.3,h:0.28,fontSize:11,bold:true,color:C.text,margin:0});
  s.addText([
    {text:"角色：",options:{bold:true}},{text:"從「創造者」→「協調者／編輯者／守門人」",options:{breakLine:true}},
    {text:"流程：",options:{bold:true}},{text:"從線性 → 反覆生命週期工作流；需 prompt engineering",options:{breakLine:true}},
    {text:"產出：",options:{bold:true}},{text:"從人類介面 → 機器可讀資料結構＋治理協議"},
  ],{x:rx+0.2,y:cy+0.45,w:rw-0.3,h:1.1,fontSize:9.5,color:C.text,margin:0,lineSpacingMultiple:1.45});

  card(s,rx,cy+1.78,rw,1.65,{bg:C.redL,bd:C.redB,ac:C.red});
  s.addText("⚠  引用注意",{x:rx+0.2,y:cy+1.88,w:rw-0.3,h:0.28,fontSize:11,bold:true,color:C.red,margin:0});
  s.addText("框架仍偏概念層次；四種互動類型如何轉譯成視覺符號，論文本身也承認是開放問題。\n框架可作為分析工具引用，不建議作為已驗證結論引用。",
    {x:rx+0.2,y:cy+2.2,w:rw-0.3,h:1.1,fontSize:9.5,color:C.text,margin:0,lineSpacingMultiple:1.4});
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 7 — Luo (2025)
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color:"FFFFFF" };
  const cy = hdr(s,"Luo (2025)：Designing With AI — 系統性文獻回顧",
    "Advances in Human-Computer Interaction  ·  系統性文獻回顧，非實證工具開發",
    {t:"學術  |  文獻回顧",bg:C.blueL,bd:C.blueB,tc:C.blueD,w:2.0});

  const rows=[
    ["研究性質","系統性文獻回顧（SLR），未開發工具或進行使用者測試，屬純文獻整合"],
    ["研究範圍","涵蓋 HCI、服務設計、UX 研究領域中「設計師如何與 AI 協作」的學術文獻"],
    ["核心發現","AI 作為設計工具仍處於早期整合階段；多數研究偏重生成式 AI 應用，對 AI 介入設計流程的長期影響研究不足"],
    ["與 SBP 的關聯","點出 AI 在設計流程中的輔助角色（而非主導角色），為 SBP 工具設計提供理論背景"],
    ["核心限制","純文獻回顧，無一手資料；所提框架尚待實證驗證"],
  ];

  const tblData=rows.map(r=>[
    {text:r[0],options:{bold:true,fill:{color:C.blueL},color:C.blueD}},
    {text:r[1],options:{fill:{color:"FFFFFF"},color:C.text}}
  ]);

  s.addTable(tblData,{
    x:0.5,y:cy,w:9,colW:[1.9,7.1],
    border:{pt:0.75,color:C.border},rowH:0.62,
    fontSize:10,fontFace:"Calibri",valign:"middle",
  });

  note(s,"引用建議：Luo（2025）適合作為「AI 介入設計流程的學術背景」引用；不宜引用為具體 SBP 工具效益的依據（因為並未針對 SBP 工具做實證測試）。",
    cy+3.3+0.02,{bg:C.blueL,bd:C.blueB,tc:C.blueD,h:0.42});
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 8 — Section: 商業產品
// ════════════════════════════════════════════════════════════════════════════
sec("02","PART 02  ·  商業產品","商業產品",
  "Miro  ·  Smaply  ·  以下所有來源全為內容行銷，無公開量化實證資料",C.teal);

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 9 — Miro & Smaply
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color:"FFFFFF" };
  const cy = hdr(s,"商業工具：Miro 與 Smaply",
    "兩大主流 AI 服務藍圖工具，皆無公開實證資料——引用時請標註「業界作法」",
    {t:"商業產品",bg:C.tealL,bd:C.tealB,tc:C.teal,w:1.6});

  // Miro card (left)
  card(s,0.35,cy,4.4,3.35,{bg:C.tealL,bd:C.tealB,ac:C.teal});
  s.addText("Miro — AI Service Blueprint", {x:0.55,y:cy+0.1,w:4.1,h:0.28,fontSize:11,bold:true,color:C.teal,margin:0});

  const miroItems=[
    {t:"策略：把藍圖定位成「研究資料的下游產物」",b:true},
    {t:"輸入端：OKR、CJM、Persona、既有流程文件、CRM 資料、系統日誌"},
    {t:"輸出端：Current/Future State SBP  ·  Pain Points & Opportunities  ·  Action Plan"},
    {t:"優勢：協作與工作坊場景最成熟；輸入端接受非結構化素材"},
    {t:"限制：行銷語言遠超實證；多人編輯後藍圖常失去三線結構"},
  ];
  miroItems.forEach((item,i)=>{
    s.addText(item.t,{ x:0.55,y:cy+0.45+i*0.55,w:4.1,h:0.48,
      fontSize:9.5, color:item.b?C.teal:C.text, bold:!!item.b,
      bullet:true, margin:3, lineSpacingMultiple:1.3 });
  });

  // Smaply card (right)
  card(s,5.0,cy,4.6,3.35,{bg:C.cardAlt});
  s.addText("Smaply", {x:5.18,y:cy+0.1,w:4.2,h:0.28,fontSize:11,bold:true,color:C.text,margin:0});

  const smaplyItems=[
    {t:"策略：把痛點、機會、解方變成可評分、可追蹤的實體"},
    {t:"明確支援 SBP 工作：在自動化前，幫助區分前台體驗與後台營運"},
    {t:"AI 研究綜整：可從原始證據追溯到決策（比 Miro 更結構化）"},
    {t:"優勢：比通用畫布更嚴謹地維持三線結構"},
    {t:"限制：導入成本高、學習曲線陡；小團隊通常撐不起"},
  ];
  smaplyItems.forEach((item,i)=>{
    s.addText(item.t,{ x:5.18,y:cy+0.45+i*0.55,w:4.2,h:0.48,
      fontSize:9.5, color:C.text, bullet:true, margin:3, lineSpacingMultiple:1.3 });
  });

  note(s,"💡 真正有價值的洞察：傳統藍圖在有人想起要更新之前都是靜態的——AI 藍圖應隨新的顧客資料、績效指標與營運變動持續演進，否則只是又一份沒人看的文件。",
    cy+3.52,{bg:C.tealL,bd:C.tealB,tc:C.teal});
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 10 — Section: 實務經驗分享
// ════════════════════════════════════════════════════════════════════════════
sec("03","PART 03  ·  實務經驗分享","實務經驗分享",
  "Kendrick & Gibbons (2019) NNG  ·  Jodi Forlizzi (Medium 2025)",C.amber);

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 11 — NNG & Forlizzi
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color:"FFFFFF" };
  const cy = hdr(s,"實務觀點：NNG 與 Jodi Forlizzi",
    "最具方法論可信度的實務來源  ·  NNG 的內容基礎是對實務者的調查研究，不是單一顧問的意見",
    {t:"實務經驗分享",bg:C.amberL,bd:C.amberB,tc:C.amber,w:2.0});

  // NNG card (left)
  card(s,0.35,cy,4.4,3.45,{bg:C.amberL,bd:C.amberB,ac:C.amber});
  s.addText("Kendrick & Gibbons (2019) — NNG", {x:0.55,y:cy+0.1,w:4.1,h:0.28,fontSize:11,bold:true,color:C.amber,margin:0});

  const nngItems=[
    "五步驟：找到支持 → 定義目標 → 蒐集研究 → 繪製藍圖（先低精細度）→ 精煉與散布",
    "三個 Scope：Small（≤2 接觸點）/ Medium（2–5）/ Large（5+）\n中小範圍對多數情境最適合",
    "精細度必須對應設計階段：越早期越低；早期重點是對齊認知，後期是溝通願景",
    "藍圖是敘事，不是清單：工作坊結束時一定會留下知識缺口，不會產出完整精緻的藍圖",
    "過程與產出物同等重要：製作過程本身促成跨職能溝通與共識",
  ];
  nngItems.forEach((t,i)=>{
    s.addText(t,{ x:0.55,y:cy+0.45+i*0.57,w:4.1,h:0.5,
      fontSize:9.5,color:C.text,bullet:true,margin:3,lineSpacingMultiple:1.3 });
  });

  // Forlizzi card (right)
  card(s,5.0,cy,4.6,3.45,{bg:C.cardAlt});
  s.addText("Jodi Forlizzi — CMU HCI (Medium 2025)", {x:5.18,y:cy+0.1,w:4.2,h:0.28,fontSize:11,bold:true,color:C.text,margin:0});

  const forlizziItems=[
    {t:"服務三代：Narrow AI → 生成式 AI（co-pilot）→ Agentic AI（自主執行）",b:true},
    {t:"核心問題（開放問題，非結論）：「服務藍圖在這裡要怎麼運作？當大部分流程可能是自主的，把它模型化還有用嗎？」"},
    {t:"她的立場：藍圖與概念模型仍然相關，但需要修改——並希望整個社群一起研究"},
    {t:"⚠ 重要澄清：坊間引申「AI agent 需要第三種泳道」是二次來源的說法，不是她的原話，引用時請注意"},
  ];
  forlizziItems.forEach((item,i)=>{
    s.addText(item.t,{ x:5.18,y:cy+0.45+i*0.7,w:4.2,h:0.6,
      fontSize:9.5,color:item.b?C.blueD:C.text,bold:!!item.b,bullet:true,margin:3,lineSpacingMultiple:1.3 });
  });

  note(s,"引用建議：NNG 為實務調查研究（較高可信度）；Forlizzi 為立場性學術隨筆（開放問題，非結論）——兩者引用時請分開標註。",
    cy+3.62,{bg:C.amberL,bd:C.amberB,tc:C.amber});
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 12 — Section: 跨類別比較
// ════════════════════════════════════════════════════════════════════════════
sec("04","PART 04  ·  跨類別比較","跨類別比較",
  "資料真實性  ·  實證嚴謹度落差  ·  Generative AI vs Agentic AI","D97706");

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 13 — 資料真實性光譜 + 落差
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color:"FFFFFF" };
  const cy = hdr(s,"學術與商業的落差，以及 AI 類型的分野",
    "資料真實性光譜  ·  實證嚴謹度落差  ·  Generative AI vs Agentic AI");

  // Spectrum bar
  const barY=cy+0.05;
  s.addShape(pres.shapes.RECTANGLE,{x:0.5,y:barY,w:9,h:0.2,fill:{color:C.green},line:{color:C.green}});
  s.addShape(pres.shapes.RECTANGLE,{x:0.5,y:barY,w:4.5,h:0.2,fill:{color:C.amber},line:{color:C.amber}});
  s.addShape(pres.shapes.RECTANGLE,{x:0.5,y:barY,w:2.0,h:0.2,fill:{color:C.red},line:{color:C.red}});

  s.addText("完整真實一手資料",{x:0.5,y:barY+0.22,w:2.5,h:0.22,fontSize:8.5,color:C.green,bold:true,margin:0});
  s.addText("整合既有企業資料",{x:3.5,y:barY+0.22,w:2.5,h:0.22,fontSize:8.5,color:C.amber,bold:true,align:"center",margin:0});
  s.addText("行銷宣稱／概念推論",{x:7.2,y:barY+0.22,w:2.4,h:0.22,fontSize:8.5,color:C.red,bold:true,align:"right",margin:0});

  // Spectrum items
  const specItems=[
    {x:0.5, label:"Kurtmollaiev &\nPedersen (2022)", color:C.green},
    {x:2.5, label:"NNG（調查研究）", color:C.green},
    {x:4.5, label:"Miro（CRM/日誌）\nLuo（文獻整合）", color:C.amber},
    {x:7.0, label:"Smaply\n（產品部落格）", color:C.amber},
    {x:8.5, label:"Mortati & Freitas\n（概念框架）", color:C.red},
  ];
  specItems.forEach(item=>{
    s.addShape(pres.shapes.LINE,{x:item.x+0.4,y:barY+0.44,w:0,h:0.3,line:{color:C.border,width:0.75}});
    s.addText(item.label,{x:item.x,y:barY+0.75,w:1.5,h:0.5,fontSize:8,color:item.color,align:"center",margin:0});
  });

  // Two columns below spectrum
  const colY = cy + 1.75;
  // Left: 實證嚴謹度落差
  card(s,0.35,colY,4.45,2.6,{ac:C.blue});
  s.addText("實證嚴謹度落差",{x:0.55,y:colY+0.1,w:4.1,h:0.28,fontSize:11,bold:true,color:C.text,margin:0});
  s.addText([
    {text:"目前無正式對照實驗",options:{bold:true,breakLine:true}},
    {text:"六案例中沒有一篇做了統計對照實驗——引用「AI 讓 SBP 更有效率」時，需說明來源的方法論層次。",options:{breakLine:true}},
    {text:"",options:{breakLine:true}},
    {text:"引用層次：",options:{bold:true,breakLine:true}},
    {text:"· Kurtmollaiev：系統性文獻回顧（背景）\n· Mortati & Freitas：概念框架（分析工具）\n· Miro / Smaply：業界觀察（產品描述）"}
  ],{x:0.55,y:colY+0.45,w:4.1,h:2.05,fontSize:9.5,color:C.text,margin:3,lineSpacingMultiple:1.4});

  // Right: Generative vs Agentic
  card(s,5.0,colY,4.6,2.6,{ac:C.amber});
  s.addText("Generative AI vs Agentic AI",{x:5.18,y:colY+0.1,w:4.2,h:0.28,fontSize:11,bold:true,color:C.text,margin:0});
  s.addText([
    {text:"目前全部 SBP 工具 → Generative AI",options:{bold:true,color:C.blue,breakLine:true}},
    {text:"被動回應使用者輸入，每步都需人工觸發\n（Miro、Smaply、Luo 文獻描述的 AI 皆屬此類）",options:{breakLine:true}},
    {text:"",options:{breakLine:true}},
    {text:"Agentic AI → SBP 領域尚無成熟實證案例",options:{bold:true,color:C.amber,breakLine:true}},
    {text:"Miro 提及「AI agent 自主優化服務流程」\n——明確歸類為「即將到來」的未來展望"}
  ],{x:5.18,y:colY+0.45,w:4.2,h:2.05,fontSize:9.5,color:C.text,margin:3,lineSpacingMultiple:1.4});

  note(s,"結論：目前尚未出現真正符合「agentic」定義且有實證資料佐證的自動化 SBP 工具——這正是未來研究方向的缺口。",
    colY+2.72,{bg:C.greenL,bd:C.greenB,tc:C.green});
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 14 — 結論與引用建議
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color:"FFFFFF" };
  const cy = hdr(s,"結論與引用建議",
    "八個來源的方法論嚴謹度差異極大——正式研究報告中請務必區分「已驗證實證資料」與「業界觀察」");

  const rows=[
    ["Bitner et al. (2008)",         "已驗證的標準格式（1,100+ 引用）","界定藍圖的五元素三線結構"],
    ["Kurtmollaiev & Pedersen (2022)","系統性文獻回顧",                "SBP 方法論發展史的文獻背景"],
    ["Mortati & Freitas (2026)",      "概念性框架（非實證）",           "分析人機混合四種互動類型；設計師角色轉型"],
    ["Luo (2025)",                    "系統性文獻回顧（背景引用）",      "設計與 AI 整合的學術背景"],
    ["NNG（Kendrick & Gibbons, 2019）","實務調查研究",                  "說明製作流程與工作坊設計；範圍選擇建議"],
    ["Forlizzi (2025)",               "立場性學術隨筆",                 "討論 agentic AI 未來方向（開放問題，非結論）"],
    ["Miro / Smaply",                 "業界作法／產品觀察",             "說明市場現有解決方案取向（不可當實證引用）"],
  ];

  const tagColors={
    "已驗證的標準格式（1,100+ 引用）":    {bg:C.greenL,tc:C.green},
    "系統性文獻回顧":                     {bg:C.blueL, tc:C.blueD},
    "概念性框架（非實證）":               {bg:C.amberL,tc:C.amber},
    "系統性文獻回顧（背景引用）":         {bg:C.blueL, tc:C.blueD},
    "實務調查研究":                       {bg:C.tealL, tc:C.teal},
    "立場性學術隨筆":                     {bg:C.amberL,tc:C.amber},
    "業界作法／產品觀察":                 {bg:C.redL,  tc:C.red},
  };

  const tblData = rows.map(r=>{
    const tag = tagColors[r[1]] || {bg:C.cardAlt,tc:C.text};
    return [
      {text:r[0],options:{bold:true,fill:{color:C.cardAlt},color:C.text}},
      {text:r[1],options:{bold:true,fill:{color:tag.bg},color:tag.tc,align:"center"}},
      {text:r[2],options:{fill:{color:"FFFFFF"},color:C.muted}},
    ];
  });

  s.addTable(tblData,{
    x:0.5,y:cy,w:9,colW:[2.4,2.1,4.5],
    border:{pt:0.75,color:C.border},rowH:0.52,
    fontSize:9.5,fontFace:"Calibri",valign:"middle",
  });

  note(s,"⚠  正式研究報告中請務必區分「已驗證的實證資料」與「業界觀察／個人心得」，避免把行銷說法誤當成研究結論引用。",
    cy+3.76,{bg:C.redL,bd:C.redB,tc:C.red});
}

// ════════════════════════════════════════════════════════════════════════════
// SLIDE 15 — 現行 UX 設計師 SBP 執行方式（新增）
// ════════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color:"FFFFFF" };
  const cy = hdr(s,"現行 UX 設計師 SBP 執行方式",
    "從對 SBP 的認知，到溝通願景——實務執行的五個階段（綜合 NNG, Bitner et al., thehuman2ai.com）");

  // 5-step flow
  const steps=[
    {num:"①",title:"認知與定位\nAwareness",
     desc:"理解 SBP 不是「把流程畫出來」，而是讓組織對顧客體驗建立共同認知的工具。釐清這張圖是給誰看：內部對齊？利害關係人說明？設計規格？",
     color:C.purple,light:C.purpleL,border:C.purpleB},
    {num:"②",title:"範圍界定\nScoping",
     desc:"選擇適當範圍：Small（≤2 接觸點）/ Medium（2–5）/ Large（5+）。新手最大失敗點：範圍太大、什麼都放，最後無法聚焦。",
     color:C.blue,light:C.blueL,border:C.blueB},
    {num:"③",title:"研究蒐集\nResearch",
     desc:"同時訪談顧客端（5–10 人）與員工端（5–10 人）。工作觀察比訪談更能捕捉「文件以外的實際流程」。AI 工具可整理逐字稿、比對落差。",
     color:C.teal,light:C.tealL,border:C.tealB},
    {num:"④",title:"製圖與迭代\nBlueprinting",
     desc:"先從低保真便利貼版本開始——工作坊結束時不會產出完整藍圖，留下知識缺口是正常的。找 2–3 位第一線員工驗證是否符合實際運作。",
     color:C.amber,light:C.amberL,border:C.amberB},
    {num:"⑤",title:"溝通願景\nCommunicating Vision",
     desc:"不只呈現現況（Current State），也要呈現未來目標（Future State）。以顧客旅程為主軸說故事。AI 在後台流程中標示可優化的斷點，但決策點建議維持人工判斷。",
     color:C.green,light:C.greenL,border:C.greenB},
  ];

  const cardW=1.72, cardH=3.3, startX=0.3, gap=0.04;
  steps.forEach((step,i)=>{
    const x=startX+i*(cardW+gap);
    s.addShape(pres.shapes.RECTANGLE,{x,y:cy,w:cardW,h:cardH,fill:{color:step.light},line:{color:step.border,width:0.75},shadow:mkSh()});
    s.addShape(pres.shapes.RECTANGLE,{x,y:cy,w:cardW,h:0.48,fill:{color:step.color},line:{color:step.color}});
    s.addText(step.num,{x,y:cy+0.02,w:cardW,h:0.44,fontSize:18,bold:true,color:"FFFFFF",align:"center",valign:"middle",margin:0});
    s.addText(step.title,{x:x+0.08,y:cy+0.55,w:cardW-0.16,h:0.55,fontSize:9.5,bold:true,color:step.color,align:"center",margin:0,lineSpacingMultiple:1.3});
    s.addText(step.desc,{x:x+0.1,y:cy+1.12,w:cardW-0.2,h:2.1,fontSize:8.5,color:C.text,align:"left",valign:"top",margin:2,lineSpacingMultiple:1.45});

    if(i<4){
      s.addShape(pres.shapes.RECTANGLE,{x:x+cardW,y:cy+cardH/2-0.05,w:gap,h:0.1,fill:{color:C.border},line:{color:C.border}});
    }
  });

  note(s,"🔑 設計師的核心價值在於判斷「這條能見線該畫在哪裡」——這是策略判斷，不是 AI 能代替的。AI 適合加速前後製；工作坊本身的核心仍在於讓真人講出跟文件不一致的真相。",
    cy+3.42,{bg:C.greenL,bd:C.greenB,tc:C.green,h:0.42});
}

// ════════════════════════════════════════════════════════════════════════════
// Write output
// ════════════════════════════════════════════════════════════════════════════
pres.writeFile({ fileName: "SBP_學術商業比較分析.pptx" })
  .then(() => console.log("✅  SBP_學術商業比較分析.pptx 已生成"))
  .catch(e => { console.error("❌ 生成失敗:", e); process.exit(1); });
