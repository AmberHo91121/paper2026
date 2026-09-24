"""Merge papers.json with translation / critical form / notes markdown into papers.js.

Run from anywhere:  python _tools/build_papers.py
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
LIT = ROOT / "intimate-data-queer" / "01_文獻探討"
NOTES_PLACEHOLDER = "（這裡是你自己讀後自由寫的地方"


def read(rel):
    if not rel:
        return None
    path = ROOT / rel
    return path.read_text(encoding="utf-8") if path.exists() else None


def translation_body(md):
    # Header (title, 作者, 出處, 檔案) is shown by the page itself; keep what follows the first rule.
    lines = md.splitlines()
    for i, line in enumerate(lines):
        if line.strip() == "---":
            return "\n".join(lines[i + 1:]).strip()
    return md.strip()


def translation_title(md):
    match = re.match(r"#\s*(.+)", md)
    if match and "—" in match.group(1):
        return match.group(1).split("—", 1)[1].strip()
    return None


def critical_form_body(md):
    # Drop the draft's own H1 and instruction blockquote; sections start at the first "## ".
    start = md.find("\n## ")
    return md[start + 1:].strip() if start != -1 else md.strip()


def notes_body(md):
    kept = [
        line for line in md.splitlines()
        if not line.startswith("# ") and not line.startswith(NOTES_PLACEHOLDER)
    ]
    return "\n".join(kept).strip()


def main():
    meta = json.loads((LIT / "papers.json").read_text(encoding="utf-8"))
    papers = []
    missing = []
    for paper in meta["papers"]:
        out = dict(paper)

        translation = read(paper.get("translation"))
        if paper.get("translation") and translation is None:
            missing.append(paper["translation"])
        out["translationMd"] = translation_body(translation) if translation else None
        if "titleZh" not in paper:
            out["titleZh"] = translation_title(translation) if translation else None

        cf = paper.get("criticalForm")
        cf_md = read(cf["path"]) if cf else None
        if cf and cf_md is None:
            missing.append(cf["path"])
        out["criticalFormMd"] = critical_form_body(cf_md) if cf_md else None

        guide = read(f"intimate-data-queer/01_文獻探討/導讀/{paper['id']}.md")
        out["guideMd"] = guide.strip() if guide else None

        notes_path = paper.get("notes") or f"intimate-data-queer/01_文獻探討/critical-form/{paper['id']}/筆記.md"
        notes = read(notes_path)
        out["notes"] = notes_path
        out["notesMd"] = notes_body(notes) if notes else ""

        papers.append(out)

    js = (
        "// 由 _tools/build_papers.py 產生，請勿手動修改；改 papers.json 或各 md 後重新執行。\n"
        "window.PAPERS = "
        + json.dumps(papers, ensure_ascii=False, indent=1)
        + ";\n"
    )
    (LIT / "papers.js").write_text(js, encoding="utf-8")

    print(f"papers.js: {len(papers)} papers, "
          f"{sum(1 for p in papers if p['guideMd'])} with section guide, "
          f"{sum(1 for p in papers if p['translationMd'])} with summary, "
          f"{sum(1 for p in papers if p['criticalFormMd'])} with critical form")
    for path in missing:
        print(f"  missing file: {path}")


if __name__ == "__main__":
    main()
