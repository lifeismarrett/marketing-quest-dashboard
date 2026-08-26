"""Analyze saved NAVER DataLab validation responses; never emit credentials."""
from __future__ import annotations

import csv
import json
from pathlib import Path

ROOT = Path("/home/ubuntu/marketing-quest-dashboard")
BASE = ROOT / "docs" / "data"
VALIDATION = BASE / "naver_datalab_validation"
GAMES = ["메이플스토리M", "검은사막 모바일", "마비노기 모바일", "아이온2"]


def load_response(name: str) -> dict[str, object]:
    return json.loads((VALIDATION / f"{name}.json").read_text(encoding="utf-8"))


def as_rows(payload: dict[str, object]) -> list[dict[str, object]]:
    result_by_game = {item["title"]: item["data"] for item in payload["results"]}
    periods = [point["period"] for point in result_by_game[GAMES[0]]]
    return [{"date": period, **{game: next(point["ratio"] for point in result_by_game[game] if point["period"] == period) for game in GAMES}} for period in periods]


def write_csv(path: Path, rows: list[dict[str, object]], fieldnames: list[str]) -> None:
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def avg(values: list[float]) -> float:
    return sum(values) / len(values)


def main() -> None:
    official = as_rows(load_response("primary_official"))
    alias = as_rows(load_response("primary_alias"))
    long = as_rows(load_response("secondary_long_official"))
    if [row["date"] for row in official] != [row["date"] for row in alias]:
        raise ValueError("official and alias validation periods differ")
    write_csv(BASE / "SEARCH_INTEREST_4GAME_LONG.csv", long, ["date", *GAMES])

    qa = []
    for game in GAMES:
        official_values = [float(row[game]) for row in official]
        alias_values = [float(row[game]) for row in alias]
        official_avg = avg(official_values)
        alias_avg = avg(alias_values)
        qa.append(
            {
                "game": game,
                "officialNameAverage": round(official_avg, 5),
                "aliasInclusiveAverage": round(alias_avg, 5),
                "averageFrameDifferencePct": round((alias_avg / official_avg - 1) * 100, 2) if official_avg else None,
                "officialPeak": round(max(official_values), 5),
                "aliasInclusivePeak": round(max(alias_values), 5),
                "primaryChartDecision": "official name only",
                "qaNote": "Alias-inclusive request is a separate common-normalization frame and is retained for sensitivity QA only; it is not merged into the primary chart.",
            }
        )
    write_csv(
        BASE / "SEARCH_INTEREST_ALIAS_QA.csv",
        qa,
        ["game", "officialNameAverage", "aliasInclusiveAverage", "averageFrameDifferencePct", "officialPeak", "aliasInclusivePeak", "primaryChartDecision", "qaNote"],
    )

    supplied = json.loads((Path("/home/ubuntu/upload") / "naver_datalab_4games_raw.json").read_text(encoding="utf-8"))
    supplied_rows = as_rows(supplied)
    exact_match = supplied_rows == official
    manifest = {
        "primaryOfficialWeeklyRows": len(official),
        "aliasWeeklyRows": len(alias),
        "longWeeklyRows": len(long),
        "primaryOfficialMatchesSuppliedRaw": exact_match,
        "primaryOfficialStart": official[0]["date"],
        "primaryOfficialEnd": official[-1]["date"],
        "longStart": long[0]["date"],
        "longEnd": long[-1]["date"],
        "dataNote": "The long-range response is stored separately and never mixed with primary 39-week normalized values.",
    }
    (BASE / "SEARCH_INTEREST_VALIDATION_AUDIT.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(manifest, ensure_ascii=False))


if __name__ == "__main__":
    main()
