#!/usr/bin/env python3
"""Build a standalone, zero-backend IAM Academy for GitHub Pages."""
from __future__ import annotations

import html
import json
import re
import shutil
from pathlib import Path
import markdown

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
OUT = ROOT / "dist"
KINDS = [
    ("modulos", "aula", "Aulas"),
    ("labs", "laboratorio", "Laboratórios"),
    ("projetos", "projeto", "Projetos"),
]
EXTRA = [
    ("guia-do-aluno.md", "guia", "Guia do aluno"),
    ("curriculo.md", "curriculo", "Currículo completo"),
    ("matriz-de-competencias.md", "matriz", "Matriz de competências"),
    ("laboratorios-e-custos.md", "custos", "Laboratórios e custos"),
    ("progresso.md", "progresso", "Modelo de progresso"),
    ("portfolio.md", "portfolio", "Portfólio"),
    ("publicacao.md", "publicacao", "Publicação"),
]
STAGES = [
    ("Fundamentos e identidade", 1, 5),
    ("Federação e protocolos", 6, 9),
    ("IAM Engineering", 10, 12),
    ("Governança e privilégios", 13, 17),
    ("Cloud e Identity Security", 18, 22),
    ("Arquitetura e auditoria", 23, 25),
]
md = markdown.Markdown(extensions=["extra", "admonition", "codehilite", "toc", "tables", "fenced_code"])

def first_title(source: str, fallback: str) -> str:
    match = re.search(r"^#\s+(.+)$", source, re.MULTILINE)
    return match.group(1).strip() if match else fallback

def description(source: str) -> str:
    lines = [s.strip() for s in source.splitlines()]
    for idx, line in enumerate(lines):
        if line.startswith("## Por que aprender") or line.startswith("## Cenário e missão"):
            for item in lines[idx + 1:]:
                if item and not item.startswith("#") and not item.startswith("**"):
                    return re.sub(r"[*`]", "", item)[:230]
    for line in lines:
        if len(line) > 75 and not line.startswith(("#", "|", "!", "-", "`")):
            return re.sub(r"[*`]", "", line)[:230]
    return "Explore os conceitos, pratique e registre evidências técnicas."

def make_entry(path: Path, kind: str, order: int) -> dict:
    raw = path.read_text(encoding="utf-8")
    md.reset()
    rendered = bleach.clean(md.convert(raw), tags=set(bleach.sanitizer.ALLOWED_TAGS) | {"h1","h2","h3","h4","h5","h6","p","pre","code","div","span","table","thead","tbody","tr","th","td","hr","br","input","label","section","sup","sub"}, attributes={"a":["href","title","id","class"],"*":["id","class"],"input":["type","checked","disabled"]}, protocols=["http","https","mailto"], strip=True)
    rel = path.relative_to(DOCS).as_posix()
    title = first_title(raw, path.stem.replace("-", " ").title())
    stage = next((label for label, start, end in STAGES if start <= order <= end), "") if kind == "aula" else ""
    return {
        "id": rel.removesuffix(".md").replace("/", "--"),
        "source": rel,
        "kind": kind,
        "title": title,
        "description": description(raw),
        "stage": stage,
        "order": order,
        "html": rendered,
    }

def main() -> None:
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "assets").mkdir(parents=True)
    items = []
    for folder, kind, _ in KINDS:
        for i, path in enumerate(sorted((DOCS / folder).glob("*.md")), 1):
            items.append(make_entry(path, kind, i))
    for i, (source, key, _) in enumerate(EXTRA, 1):
        items.append(make_entry(DOCS / source, "referencia", i))
    assert len([x for x in items if x["kind"] == "aula"]) == 25
    assert len([x for x in items if x["kind"] == "laboratorio"]) >= 7
    assert len([x for x in items if x["kind"] == "projeto"]) == 6
    (OUT / "assets" / "content.json").write_text(json.dumps(items, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    for name in ("app.js", "styles.css"):
        shutil.copyfile(ROOT / "site" / name, OUT / "assets" / name)
    shutil.copyfile(ROOT / "site" / "index.html", OUT / "index.html")
    (OUT / ".nojekyll").write_text("", encoding="utf-8")
    print(f"Site gerado: {len(items)} páginas, saída em dist/")

if __name__ == "__main__":
    main()
