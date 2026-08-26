# INPUT AUDIT — MARKETING QUEST Dashboard

## Source Priority

The final MapleStory M benchmarking PPT is the presentation source of truth for claims, headline values, interpretation rules, section sequence and strategy wording. Raw files support interactive controls, tooltips, valid event markers and comparison views only. Where these sources differ, the dashboard retains the final-PPT definition and records the apparent scope difference instead of silently replacing a headline.

## File Inventory

| Source group | Confirmed files | Intended dashboard use |
|---|---|---|
| Final presentation | `메이플스토리M_벤치마킹보고서_MARKETING_QUEST.pptx` supplied separately | Final claims, headline KPI values, story sequence, strategy copy and interpretation caveats |
| Integrated workbook | `01_master_workbook_FINAL.xlsx` | Core KPI schema, qualitative records, source logs and historical raw-data schema |
| Official LiveOps | `02_liveops_4games_OFFICIAL_VERIFIED.xlsx` | 50 verified events, 36 confirmed-major records, 21 major-collision records, source-grade notes |
| Official calendar | `03_event_calendar_OFFICIAL_VERIFIED.xlsx` | Official date, event type, strict-major status and discrepancy annotations |
| Collision analysis | `04_event_collision_analysis.xlsx` | Three priority collision cases and strategy action structure |
| Search data | User-supplied `naver_datalab_4games_raw.json`, wide/long CSV and validation responses | 4게임 공식명 단일 주간 프레임의 상대지수. 별칭·장기 프레임은 QA 전용으로 별도 보관 |
| Channel data | `07_youtube_MSM.csv`, `08_youtube_BDM.csv` | Official channel upload and view-count data for summary cards and supporting comparisons |
| UI references | `BDM_series_master_design_guide.png`, `transparent_png_assets.zip`, dashboard reference images | Palette, frames, ornaments, badges and visual-system reference only |
| Project controls | `SOURCE_MANIFEST.md`, `DASHBOARD_CONTENT_MAP.md`, collection checklist | Source priority, 5-section compression and data-status cautions |

## Data Map

| Dashboard area | Primary data source | Treatment |
|---|---|---|
| Home KPI overview | Final PPT | Use final headline values; do not recompute from incomplete workbook fields |
| Search-interest view | NAVER DataLab 4게임 공식명 39주 단일 응답; final PPT | 2025-11-17~2026-08-10 주간, 전체 기기·성별·연령, 공통 최대값 100 상대지수. PPT는 RE:BOOST 정의에만 사용 |
| Revenue/user rank view | Final PPT and included presentation-derived series where available | Treat rank as reverse metric. No interpolation or synthetic points; visibly mark any unavailable raw weekly series |
| Channel performance | YouTube CSVs plus final PPT | Calculate only directly supported upload/view aggregates; retain PPT’s cross-channel interpretation and period notes |
| Battle console | Official LiveOps workbook, calendar and collision analysis | Render verified event markers and collision cases; label outcomes as timing alignment or associated movement, not causation |
| Retention matrix | Final PPT + official event tags | Use final deck for ownership/impact conclusion; event-tag source supports examples but does not invent missing retained-user values |
| Search-interest retention | Official-name 39-week DataLab frame | 각 게임 peak를 M0으로 두고 4주 간격 M1~M5를 산출. 범위 밖 값은 결측 유지; 종료 시점 비율은 별도 표기 |
| Strategy quest | Final PPT + collision strategy sheet | Preserve WHY/HOW/RISK/KPI wording and represent roadmap as presentation components |

## Risks and Guardrails

The packaged files do not include the described `01_FINAL_PPT` folder or `03_FINAL_VISUALS` character series. The separately supplied final PPT therefore fills the former role, while the provided PPT asset archive and generated abstract visuals supply the visual layer; no character likeness will be redrawn or fabricated. The source workbook includes many blank or formula-dependent KPI cells, so automated recomputation will not be used to overwrite approved PPT numbers.

Black Desert Mobile user-rank coverage is known to be incomplete in the final presentation and will be presented as an explicit comparability limitation. Search indices remain relative signals, community ratios must show denominators where data exists, and all rank charts must make `lower rank = better` visible in both the axis treatment and explanatory copy.

## Retention Matrix Verified from Final PPT

| Hooking type | MapleStory M | Black Desert Mobile | Mabinogi Mobile | AION2 |
|---|---|---|---|---|
| 성장지원형 | 하이퍼버닝 | — | 레벨 85 → 100 | — |
| 콘텐츠추가형 | 렌 등 | 세라핌 등 | 기사 등 | 권성 등 |
| IP 콜라보형 | — | 붉은사막(자사) | 산리오 | 프로미스나인 |
| 상시복귀지원형 | — | — | — | 새싹뱃지(28일 미접속 보상) |

The display must retain the final-PPT distinction between an empty slot and a verified type. The count summary is MapleStory M 2/4, Black Desert Mobile 2/4, Mabinogi Mobile 3/4 and AION2 3/4.

## Legacy PPT Retention and Store Reputation Reference

| Game | Search-interest retention at M8 | Google Play rating / reviews | App Store rating / reviews |
|---|---:|---:|---:|
| MapleStory M | 4.3% | 4.6 / 18.8만 | 4.4 / 13.0만 |
| Black Desert Mobile | 4.5% | 4.4 / 21.6만 | 4.2 / 6.0만 |
| Mabinogi Mobile | 34.3% | 2.8 / 3.6만 | 3.3 / 0.83만 |
| AION2 | 18.6% | 2.9 / 0.7만 | 3.1 / 0.19만 |

이 표의 M8 값은 이전 최종 PPT 참조값으로만 보존합니다. 현재 대시보드의 검색 관심 잔존율 차트는 공식명 4게임 39주 공통 DataLab 프레임을 사용하며, M0~M5를 각각 peak 이후 4주 간격으로 표시합니다. 직접 이용자 리텐션으로 해석하지 않습니다.

## NAVER DataLab 4게임 감사 결과

| 항목 | 결과 |
|---|---|
| 기본 차트 데이터 | 공식명 4그룹 `메이플스토리M`, `검은사막 모바일`, `마비노기 모바일`, `아이온2`를 하나의 요청으로 수집 |
| 요청/관측 기간 | 2025-11-17~2026-08-10, 주간 39행. 응답의 종료일 2026-08-16은 마지막 주간 구간의 끝 날짜 |
| 공통 필터 | 국내 NAVER 통합검색, 기기·성별·연령 미지정(전체) |
| 정규화 | 동일 응답의 최대 `ratio=100`; 요청 간 지수값은 직접 비교·병합하지 않음 |
| 별칭 검증 | 동일 조건의 별칭 포함 프레임을 별도 생성. 메이플M 평균 +88.72%, 검은사막M +16.58%, 마비노기M +0.12%, 아이온2 0.00%; 기본 차트는 공식명만 유지 |
| 장기 검증 | 2023-08-01~2026-08-26 요청을 별도 보관. 반환된 주간 관측일은 2023-07-31~2026-08-24, 161행이며 기본 39주 KPI와 혼합하지 않음 |

NAVER는 결과의 `ratio`를 구간별 최대값 100을 기준으로 한 상대 비율이라고 정의합니다. 따라서 이 감사 기록의 지수는 절대 검색량, DAU, 매출, 시장 점유율 또는 인과 증거가 아닙니다.[1]

## 참고문헌

[1] [NAVER 개발자 센터 — 통합 검색어 트렌드 API](https://developers.naver.com/docs/serviceapi/datalab/search/search.md)

## Visual Verification Notes

The 1366×768 projector view was checked across all six presentation sections. The 39-week rank series extracted from the final PPT renders interactively with reversed rank logic, event marker, tooltip and legend. The tactical quest rail, presenter controls, outcome-led section headlines and final QUEST CLEAR screen remain visually distinct from the analytical content area. The retention panel is intentionally compact; its legend is kept inside the chart card to avoid collision with the Store Reputation table.
