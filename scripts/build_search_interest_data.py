"""Build audited four-game NAVER DataLab dashboard data from user-supplied CSV/JSON.

This script does not call any external service and never reads the uploaded collector
script or its embedded credentials. It validates the supplied response artifacts only.
"""
from __future__ import annotations

import csv
import json
from datetime import date, timedelta
from pathlib import Path

ROOT = Path("/home/ubuntu/marketing-quest-dashboard")
UPLOAD = Path("/home/ubuntu/upload")
WIDE_PATH = UPLOAD / "naver_datalab_4games_wide.csv"
RAW_PATH = UPLOAD / "naver_datalab_4games_raw.json"
DATA_DIR = ROOT / "client" / "src" / "data"
DOCS_DIR = ROOT / "docs" / "data"

GAMES = ["메이플스토리M", "검은사막 모바일", "마비노기 모바일", "아이온2"]
META = {
    "메이플스토리M": {"short": "메이플M", "color": "#F39C27"},
    "검은사막 모바일": {"short": "검은사막M", "color": "#7066C7"},
    "마비노기 모바일": {"short": "마비노기M", "color": "#36A26D"},
    "아이온2": {"short": "아이온2", "color": "#4A97D1"},
}
EXPECTED_START = date(2025, 11, 17)
EXPECTED_END = date(2026, 8, 10)
EXPECTED_WEEKS = 39


def load_wide() -> list[dict[str, object]]:
    with WIDE_PATH.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None or set(["Week", *GAMES]) - set(reader.fieldnames):
            raise ValueError("wide CSV missing the required Week/four-game columns")
        rows = []
        for row in reader:
            parsed = {"date": row["Week"]}
            for game in GAMES:
                parsed[game] = float(row[game])
            rows.append(parsed)
    return rows


def validate_raw(rows: list[dict[str, object]]) -> dict[str, object]:
    raw = json.loads(RAW_PATH.read_text(encoding="utf-8"))
    expected_dates = [EXPECTED_START + timedelta(days=7 * index) for index in range(EXPECTED_WEEKS)]
    actual_dates = [date.fromisoformat(str(row["date"])) for row in rows]
    if len(rows) != EXPECTED_WEEKS or actual_dates != expected_dates:
        raise ValueError("weekly rows must be complete from 2025-11-17 to 2026-08-10")
    if raw.get("timeUnit") != "week" or [item.get("title") for item in raw.get("results", [])] != GAMES:
        raise ValueError("raw response must contain the four official-name groups in one weekly response")
    for row in rows:
        for game in GAMES:
            value = row[game]
            if not isinstance(value, float) or value < 0 or value > 100:
                raise ValueError(f"invalid normalized value for {game}")
    return raw


def average(values: list[float]) -> float:
    return sum(values) / len(values)


def r(value: float | None, places: int = 5) -> float | None:
    return None if value is None else round(value, places)


def metrics(rows: list[dict[str, object]]) -> list[dict[str, object]]:
    result = []
    for game in GAMES:
        values = [float(row[game]) for row in rows]
        peak_index = max(range(len(values)), key=values.__getitem__)
        peak = values[peak_index]
        first4 = average(values[:4])
        recent4 = average(values[-4:])
        retention_points = []
        for month in range(6):
            index = peak_index + month * 4
            retention_points.append(r(values[index] / peak * 100, 2) if index < len(values) else None)
        result.append(
            {
                "game": game,
                "average": r(average(values)),
                "peak": r(peak),
                "peakWeek": rows[peak_index]["date"],
                "first4": r(first4),
                "recent4": r(recent4),
                "firstToRecentChange": r((recent4 / first4 - 1) * 100, 2) if first4 else None,
                "cumulativeProxy": r(sum(values)),
                "postPeakRetention": r(values[-1] / peak * 100, 2),
                "weeksFromPeakToObservedEnd": len(values) - 1 - peak_index,
                "retention": retention_points,
            }
        )
    return result


def write_csv(path: Path, rows: list[dict[str, object]], columns: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=columns)
        writer.writeheader()
        writer.writerows(rows)


def ts_literal(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


def build_typescript(rows: list[dict[str, object]], summary: list[dict[str, object]]) -> str:
    retention_rows = []
    for month in range(6):
        row: dict[str, object] = {"stage": f"M{month}"}
        for item in summary:
            row[item["game"]] = item["retention"][month]
        retention_rows.append(row)
    meta = [{"game": game, **META[game]} for game in GAMES]
    source = {
        "provider": "NAVER DataLab",
        "collectionDate": "2026-08-26",
        "requestedPeriod": "2025-11-17 ~ 2026-08-10",
        "returnedPeriod": "2025-11-17 ~ 2026-08-16 (weekly rows: 2025-11-17 ~ 2026-08-10)",
        "timeUnit": "week",
        "device": "all",
        "gender": "all",
        "age": "all",
        "country": "KR / NAVER domestic search",
        "normalization": "four official-name query groups in one response; common maximum = 100",
        "queryGroups": {game: [game] for game in GAMES},
    }
    discrepancy = [
        {
            "metric": "메이플스토리M 검색 peak",
            "old": "1.92 · 2026-07-27 (legacy 2-game display)",
            "new": f"{summary[0]['peak']} · {summary[0]['peakWeek']} (new 4-game weekly frame)",
            "why": "공통 정규화 대상이 2개에서 4개로 바뀌고, 기존 표시의 기간·시간 단위와 신규 주간 요청이 달라 직접 값 비교가 불가합니다.",
        },
        {
            "metric": "메이플스토리M 최근 4주 평균",
            "old": "약 1.02 (legacy 2-game display)",
            "new": f"{summary[0]['recent4']} (2026-07-20~2026-08-10)",
            "why": "동일하게 4게임 공통 최대값 프레임·주간 관측으로 재수집되어 기존 2게임 표시값과 정규화 기준이 다릅니다.",
        },
    ]
    return f'''/**
 * Search-interest data contract: four official-name NAVER DataLab groups
 * collected under one weekly normalization frame. Relative index only;
 * never interpret as absolute searches, DAU, revenue, or market share.
 */
export const SEARCH_INTEREST_GAMES = {ts_literal(meta)} as const;

export const SEARCH_INTEREST_4GAME_DATA = {ts_literal(rows)} as const;

export const SEARCH_INTEREST_SUMMARY = {ts_literal([{k: v for k, v in item.items() if k != "retention"} for item in summary])} as const;

export const SEARCH_INTEREST_RETENTION = {ts_literal(retention_rows)} as const;

export const SEARCH_INTEREST_SOURCE = {ts_literal(source)} as const;

export const SEARCH_INTEREST_DISCREPANCY = {ts_literal(discrepancy)} as const;
'''


def main() -> None:
    rows = load_wide()
    raw = validate_raw(rows)
    summary = metrics(rows)
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    DOCS_DIR.mkdir(parents=True, exist_ok=True)

    (DATA_DIR / "searchInterestData.ts").write_text(build_typescript(rows, summary), encoding="utf-8")
    write_csv(DOCS_DIR / "SEARCH_INTEREST_4GAME_DATA.csv", rows, ["date", *GAMES])
    summary_rows = [{key: value for key, value in item.items() if key != "retention"} for item in summary]
    write_csv(
        DOCS_DIR / "SEARCH_INTEREST_4GAME_SUMMARY.csv",
        summary_rows,
        ["game", "average", "peak", "peakWeek", "first4", "recent4", "firstToRecentChange", "cumulativeProxy", "postPeakRetention", "weeksFromPeakToObservedEnd"],
    )
    retention_export = []
    for month in range(6):
        row = {"stage": f"M{month}"}
        for item in summary:
            row[item["game"]] = item["retention"][month]
        retention_export.append(row)
    write_csv(DOCS_DIR / "SEARCH_INTEREST_RETENTION.csv", retention_export, ["stage", *GAMES])

    audit = {
        "rawStartDate": raw.get("startDate"),
        "rawEndDate": raw.get("endDate"),
        "timeUnit": raw.get("timeUnit"),
        "weeklyRowCount": len(rows),
        "observedStart": rows[0]["date"],
        "observedEnd": rows[-1]["date"],
        "games": GAMES,
        "allValuesFiniteAndInRange": True,
    }
    (DOCS_DIR / "SEARCH_INTEREST_4GAME_AUDIT.json").write_text(json.dumps(audit, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(audit, ensure_ascii=False))


if __name__ == "__main__":
    main()
