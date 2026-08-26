"""Collect NAVER DataLab comparison responses without executing user-supplied code.

The user-provided collector is parsed only to retrieve the API key pair. This script
requests the same four games in a single query frame for three separate contexts:
primary official-name, primary alias-inclusive, and secondary long-range official-name.
No credential is written to project output files.
"""
from __future__ import annotations

import ast
import json
from pathlib import Path

import requests

ROOT = Path("/home/ubuntu/marketing-quest-dashboard")
UPLOADED_COLLECTOR = Path("/home/ubuntu/upload/collect_naver_trend.py")
OUTPUT = ROOT / "docs" / "data" / "naver_datalab_validation"
API_URL = "https://naverapihub.apigw.ntruss.com/search-trend/v1/search"


def credentials_from_source(path: Path) -> tuple[str, str]:
    tree = ast.parse(path.read_text(encoding="utf-8"), filename=str(path))
    values: dict[str, str] = {}
    for node in tree.body:
        if isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
            if node.targets[0].id in {"CLIENT_ID", "CLIENT_SECRET"} and isinstance(node.value, ast.Constant) and isinstance(node.value.value, str):
                values[node.targets[0].id] = node.value.value
    if set(values) != {"CLIENT_ID", "CLIENT_SECRET"}:
        raise ValueError("uploaded collector must define CLIENT_ID and CLIENT_SECRET string literals")
    return values["CLIENT_ID"], values["CLIENT_SECRET"]


def request_frame(client_id: str, secret: str, *, start: str, end: str, groups: list[dict[str, object]]) -> dict[str, object]:
    response = requests.post(
        API_URL,
        headers={"X-NCP-APIGW-API-KEY-ID": client_id, "X-NCP-APIGW-API-KEY": secret, "Content-Type": "application/json"},
        json={"startDate": start, "endDate": end, "timeUnit": "week", "keywordGroups": groups},
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    titles = [item.get("title") for item in payload.get("results", [])]
    if len(titles) != 4 or len(set(titles)) != 4:
        raise ValueError("each validation request must return exactly four unique query groups")
    return payload


def main() -> None:
    client_id, secret = credentials_from_source(UPLOADED_COLLECTOR)
    official = [
        {"groupName": "메이플스토리M", "keywords": ["메이플스토리M"]},
        {"groupName": "검은사막 모바일", "keywords": ["검은사막 모바일"]},
        {"groupName": "마비노기 모바일", "keywords": ["마비노기 모바일"]},
        {"groupName": "아이온2", "keywords": ["아이온2"]},
    ]
    aliases = [
        {"groupName": "메이플스토리M", "keywords": ["메이플스토리M", "메이플M"]},
        {"groupName": "검은사막 모바일", "keywords": ["검은사막 모바일", "검사모"]},
        {"groupName": "마비노기 모바일", "keywords": ["마비노기 모바일", "마비노기M"]},
        {"groupName": "아이온2", "keywords": ["아이온2"]},
    ]
    jobs = {
        "primary_official": {"start": "2025-11-17", "end": "2026-08-10", "groups": official},
        "primary_alias": {"start": "2025-11-17", "end": "2026-08-10", "groups": aliases},
        "secondary_long_official": {"start": "2023-08-01", "end": "2026-08-26", "groups": official},
    }
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = {"source": "NAVER DataLab", "timeUnit": "week", "device": "all", "gender": "all", "age": "all", "requests": {}}
    for name, job in jobs.items():
        payload = request_frame(client_id, secret, start=str(job["start"]), end=str(job["end"]), groups=job["groups"])
        output_path = OUTPUT / f"{name}.json"
        output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        manifest["requests"][name] = {"start": job["start"], "end": job["end"], "groups": job["groups"], "file": output_path.name, "returnedEnd": payload.get("endDate")}
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"requests": list(jobs), "output": str(OUTPUT)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
