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
assert len(kinds["laboratorio"]) >= 7, "Expected at least 7 labs"
assert len(kinds["projeto"]) == 6, "Expected 6 capstones"
assert len({x["id"] for x in items}) == len(items), "Duplicate route IDs"
assert len({x["source"] for x in items}) == len(items), "Duplicate source paths"
assert all(x["html"].strip() and x["title"].strip() for x in items)
assert all((out / name).exists() for name in ("index.html","assets/app.js","assets/styles.css",".nojekyll"))
source = (out / "index.html").read_text(encoding="utf-8")
assert 'id="main"' in source and "assets/app.js" in source and "assets/styles.css" in source
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
print(f"PASS: {len(items)} pages, 25 aulas, {len(kinds['laboratorio'])} labs, 6 projetos, HTML shell OK")
