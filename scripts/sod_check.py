#!/usr/bin/env python3
"""Detector offline de segregação de funções com dados fictícios."""
import csv
import json
import sys
from pathlib import Path

CONFLICTS=[("criar_pagamento","aprovar_pagamento"),("criar_fornecedor","aprovar_fornecedor")]
def check(rows):
    grouped={}
    for row in rows:
        identity=(row.get("identity") or "").strip()
        access=(row.get("entitlement") or "").strip()
        if not identity or not access: raise ValueError("identity e entitlement obrigatórios")
        grouped.setdefault(identity,set()).add(access)
    return [{"identity":uid,"conflict":[a,b]} for uid,rights in sorted(grouped.items()) for a,b in CONFLICTS if a in rights and b in rights]
def main(path):
    with Path(path).open(encoding="utf-8-sig",newline="") as f:
        conflicts=check(csv.DictReader(f))
    print(json.dumps({"conflicts":conflicts,"count":len(conflicts)},ensure_ascii=False,indent=2))
    return 1 if conflicts else 0
if __name__=="__main__":
    if len(sys.argv)!=2: sys.exit("uso: python scripts/sod_check.py scripts/sod-exemplo.csv")
    sys.exit(main(sys.argv[1]))
