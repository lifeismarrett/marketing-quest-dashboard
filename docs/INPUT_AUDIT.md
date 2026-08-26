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
| Search data | `05_naver_datalab_search_interest.csv`, `06_google_trends_weekly.csv` | Search-interest trend; relative/normalised signal only |
| Channel data | `07_youtube_MSM.csv`, `08_youtube_BDM.csv` | Official channel upload and view-count data for summary cards and supporting comparisons |
| UI references | `BDM_series_master_design_guide.png`, `transparent_png_assets.zip`, dashboard reference images | Palette, frames, ornaments, badges and visual-system reference only |
| Project controls | `SOURCE_MANIFEST.md`, `DASHBOARD_CONTENT_MAP.md`, collection checklist | Source priority, 5-section compression and data-status cautions |

## Data Map

| Dashboard area | Primary data source | Treatment |
|---|---|---|
| Home KPI overview | Final PPT | Use final headline values; do not recompute from incomplete workbook fields |
| Search-interest view | NAVER DataLab CSV; final PPT | Plot available raw trend with clear relative-index labelling; use PPT for the RE:BOOST callout definition |
| Revenue/user rank view | Final PPT and included presentation-derived series where available | Treat rank as reverse metric. No interpolation or synthetic points; visibly mark any unavailable raw weekly series |
| Channel performance | YouTube CSVs plus final PPT | Calculate only directly supported upload/view aggregates; retain PPT’s cross-channel interpretation and period notes |
| Battle console | Official LiveOps workbook, calendar and collision analysis | Render verified event markers and collision cases; label outcomes as timing alignment or associated movement, not causation |
| Retention matrix | Final PPT + official event tags | Use final deck for ownership/impact conclusion; event-tag source supports examples but does not invent missing retained-user values |
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

## Retention and Store Reputation Values Verified from Final PPT

| Game | Search-interest retention at M8 | Google Play rating / reviews | App Store rating / reviews |
|---|---:|---:|---:|
| MapleStory M | 4.3% | 4.6 / 18.8만 | 4.4 / 13.0만 |
| Black Desert Mobile | 4.5% | 4.4 / 21.6만 | 4.2 / 6.0만 |
| Mabinogi Mobile | 34.3% | 2.8 / 3.6만 | 3.3 / 0.83만 |
| AION2 | 18.6% | 2.9 / 0.7만 | 3.1 / 0.19만 |

These values remain final-PPT reference values. The retention chart must label M0/M1/M3/M6/M8 correctly and describe search interest as a relative proxy rather than a direct retention measurement.

## Visual Verification Notes

The 1366×768 projector view was checked across all six presentation sections. The 39-week rank series extracted from the final PPT renders interactively with reversed rank logic, event marker, tooltip and legend. The tactical quest rail, presenter controls, outcome-led section headlines and final QUEST CLEAR screen remain visually distinct from the analytical content area. The retention panel is intentionally compact; its legend is kept inside the chart card to avoid collision with the Store Reputation table.
