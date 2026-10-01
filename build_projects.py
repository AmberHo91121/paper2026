"""Merge projects.json with each project's markdown into projects.js for project.html.

Run from anywhere:  python build_projects.py
"""
import hashlib
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent


def read_docs(proj_dir, docs, missing):
    out = []
    for d in docs:
        path = ROOT / proj_dir / d["md"]
        if not path.exists():
            missing.append(str(path))
            continue
        out.append({"title": d["title"], "src": f"{proj_dir}/{d['md']}", "md": path.read_text(encoding="utf-8").strip()})
    return out


def main():
    cfg = json.loads((ROOT / "projects.json").read_text(encoding="utf-8"))
    steps = cfg.pop("_steps")
    missing = []
    projects = {}
    for pid, p in cfg.items():
        q = dict(p)
        q["lit"] = read_docs(p["dir"], p.get("lit", []), missing)
        gap = dict(p.get("gap", {}))
        gap["docs"] = read_docs(p["dir"], gap.get("docs", []), missing)
        q["gap"] = gap
        rq = dict(p.get("rq", {}))
        rq["docs"] = read_docs(p["dir"], rq.get("docs", []), missing)
        q["rq"] = rq
        projects[pid] = q
    js = (
        "// 由 build_projects.py 產生，請勿手動修改；改 projects.json 或各專案 md 後重新執行。\n"
        "window.STEPS = " + json.dumps(steps, ensure_ascii=False) + ";\n"
        "window.PROJECTS = " + json.dumps(projects, ensure_ascii=False) + ";\n"
    )
    (ROOT / "projects.js").write_text(js, encoding="utf-8")
    # 在引用處加版本參數，避免瀏覽器／GitHub Pages 快取舊的 projects.js
    ver = hashlib.md5(js.encode("utf-8")).hexdigest()[:8]
    for name in ("project.html", "index.html"):
        page = ROOT / name
        if page.exists():
            text = page.read_text(encoding="utf-8")
            new = re.sub(r'src="projects\.js(\?v=\w+)?"', f'src="projects.js?v={ver}"', text)
            if new != text:
                page.write_text(new, encoding="utf-8", newline="")
    for pid, q in projects.items():
        print(f"{pid}: lit {len(q['lit'])} docs, gap {len(q['gap']['docs'])} docs")
    for m in missing:
        print("  missing:", m)


if __name__ == "__main__":
    main()
