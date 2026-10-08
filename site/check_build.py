#!/usr/bin/env python3
"""Structural smoke checks for the generated static IAM Academy."""
import json
from pathlib import Path
from html.parser import HTMLParser

root = Path(__file__).resolve().parents[1]
out = root / "dist"
items = json.loads((out / "assets/content.json").read_text(encoding="utf-8"))
kinds = {kind: [x for x in items if x["kind"] == kind] for kind in ("aula", "laboratorio", "projeto")}
assert len(kinds["aula"]) == 25, "Expected 25 lessons"
assert len({x["stage"] for x in kinds["aula"]}) == 6, "Expected six learning phases"
assert all(x["stage"].startswith("Fase ") for x in kinds["aula"]), "Missing phase labels"
assert len(kinds["laboratorio"]) == 10, "Expected at least 7 labs"
assert len(kinds["projeto"]) == 6, "Expected 6 capstones"
assert len({x["id"] for x in items}) == len(items), "Duplicate route IDs"
assert len({x["source"] for x in items}) == len(items), "Duplicate source paths"
assert all(x["html"].strip() and x["title"].strip() for x in items)
assert all(x["html"].count("O que é?") >= 2 for x in kinds["aula"]), "Cada módulo precisa ensinar vários conceitos"
assert all(x["html"].count("Pontos positivos:") >= 2 and x["html"].count("Pontos negativos / riscos:") >= 2 for x in kinds["aula"]), "Teoria + pros/cons por conceito"
assert all(x["html"].count("Prática — faça agora:") >= 2 for x in kinds["aula"]), "Práticas insuficientes"
assert all(len(x.get("quiz",{}).get("options",[])) == 3 for x in kinds["aula"]), "All lessons must have 3 quiz answers"
assert all(len(x.get("quiz",{}).get("options",[])) == 3 and 0 <= x["quiz"]["correct"] < 3 for x in kinds["aula"]), "Every lesson needs a valid quiz"
assert not any("<script" in x["html"].lower() or "javascript:" in x["html"].lower() for x in items), "Unsafe HTML in generated content"
assert all(x["id"] == x["source"].removesuffix(".md").replace("/", "--") for x in items)
assert all((out / name).exists() for name in ("index.html","assets/app.js","assets/styles.css","assets/black-theme.css",".nojekyll"))
source = (out / "index.html").read_text(encoding="utf-8")
assert 'id="main"' in source and "assets/app.js" in source and "assets/styles.css" in source
assert "assets/black-theme.css" in source and 'content="#050505"' in source
assert "--bg: #050505" in (out / "assets/black-theme.css").read_text(encoding="utf-8")
class Validator(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
    def handle_starttag(self, tag, attrs):
        for name,value in attrs:
            if name == "id":
                assert value not in self.ids, "Duplicate element ID: " + value
                self.ids.add(value)
v = Validator()
v.feed(source)
assert {"main","sidebar","global-search","toast","sidebar-bar"}.issubset(v.ids)
assert "theme-toggle" not in v.ids, "Dark mode must be fixed"
assert "lpraxedess/Projetos" not in source
print(f"PASS: {len(items)} pages, 25 aulas, {len(kinds['laboratorio'])} labs, 6 projetos, HTML shell OK")
