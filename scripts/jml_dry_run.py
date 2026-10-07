#!/usr/bin/env python3
"""Simulação segura de Joiner-Mover-Leaver. Nunca modifica AD/Entra."""
import argparse
import csv
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

VALID_ACTIONS = {"joiner", "mover", "leaver"}
REQUIRED = {"employeeId", "department", "action"}

def plan(rows):
    seen = set()
    result = []
    for line, row in enumerate(rows, start=2):
        missing = REQUIRED - set(row)
        if missing:
            raise ValueError(f"Linha {line}: colunas ausentes: {sorted(missing)}")
        emp = (row.get("employeeId") or "").strip()
        dept = (row.get("department") or "").strip()
        action = (row.get("action") or "").strip().lower()
        if not emp or not dept or action not in VALID_ACTIONS:
            raise ValueError(f"Linha {line}: campos invalidos ou acao invalida")
        if emp in seen:
            raise ValueError(f"Linha {line}: employeeId duplicado")
        seen.add(emp)
        if action == "leaver" and dept.lower() in {"privileged", "breakglass"}:
            raise ValueError(f"Linha {line}: conta privilegiada requer revisao manual")
        result.append({
            "employeeId": emp,
            "department": dept,
            "action": action,
            "operation": {
                "joiner": "PROPOSE_CREATE",
                "mover": "PROPOSE_REVIEW_AND_UPDATE",
                "leaver": "PROPOSE_DISABLE_AND_REVOKE",
            }[action],
            "status": "DRY_RUN_ONLY",
        })
    return result

def main():
    parser = argparse.ArgumentParser(description="Simular JML offline")
    parser.add_argument("csv_file", type=Path)
    args = parser.parse_args()
    try:
        with args.csv_file.open(newline="", encoding="utf-8-sig") as f:
            result = plan(list(csv.DictReader(f)))
        print(json.dumps({"generated_at": datetime.now(timezone.utc).isoformat(),
                          "operations": result}, indent=2, ensure_ascii=False))
    except (OSError, ValueError) as exc:
        print(f"ERRO: {exc}", file=sys.stderr)
        return 1
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
