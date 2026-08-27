# TEAM INPUT AUDIT — KEY FACTS

## Inputs

All seven user-provided files were extracted: five DOCX filings, `메타광고_소재_타임라인(1).xlsx`, and `유튜브영상갯수,조회수.xlsx`. Structured extracts are in `/home/ubuntu/team_input_extracts/` and direct focus files are `/home/ubuntu/aion2_filing_focus.txt`, `/home/ubuntu/specific_filing_rows.txt`, and `/home/ubuntu/team_input_analysis.json`.

## NC filings

`[NC]반기보고서(2026.08.14).docx` table 27/29 identifies `아이온2` under the `게임 > PC게임` grouping. Its values are `제30기 반기 208,673 / 16%`, `제29기 77,361 / 5%`, and no prior-year comparable value. The report also records the 2025.11 Korean/Taiwan launch and an item-specific licensing/royalty revenue recognition description. The same report calls the principal PC games including 아이온2 separately from mobile games such as 리니지M, 리니지2M, 리니지W.

`[NC]사업보고서(2026.03.18).docx` records 아이온2 launch on 2025.11.19, states 아이온2 supported PC and mobile platforms in its business narrative, and separately labels it a “신규 PC IP” in the 2025 business review. Table 27/28 reports 아이온2 77,361 and 5% for 제29기, with no prior-year value. It also reports consolidated 2025 revenue 1조 5,069억원 and PC-game revenue 4,309억원, but these are company/PC-category figures, not MapleStory M or Black Desert Mobile revenue.

## Pearl Abyss filings

The Pearl Abyss filings identify `검은사막`, `검은사막 모바일`, and `검은사막 콘솔` as separate platform/game rows, and state that principal revenue sources are the Black Desert IP across PC, console, and mobile globally. They report company/business/category-level values such as game-business revenue and mobile-game category revenue; no directly attributable `검은사막 모바일` revenue figure was identified in the extracted rows. These figures must not be converted into game-specific revenue.

## Nexon Korea audit report

The Nexon Korea audit report contains no extracted direct `메이플스토리M` or `메이플` game-specific row. It contains company-level financial/reporting content and cannot support a game-specific MapleStory M revenue comparison by itself.

## Platform scope conflict

NC’s filings create a material scope note: 아이온2 is represented as a PC-game item in NC’s revenue table and described as supporting both PC and mobile platforms. The current dashboard’s four-game comparison is based on MobileIndex/mobile benchmark framing. Do not silently call all four items identical mobile-game revenue observations. Preserve the comparison case but add a PLATFORM SCOPE NOTE and distinguish official corporate disclosure from MobileIndex relative rank.

## Meta workbook direct recalculation

Source sheet `소재타임라인` has 18 data rows plus header, based on captures of active ads at 2026-08-26. It explicitly says ad spend/impressions are not public and that creative count, start date, reuse count, and platform count are proxy indicators only. It says already-ended campaigns may be missing and that AION2 search results were not confirmed for the tested terms; this does not prove AION2 did not advertise.

Recomputed raw-row summaries:

| Game label in workbook | Rows | Start date range | Platform-known rows | Mean known platform count | Reuse-known rows | Numeric reuse sum | Result rows |
|---|---:|---|---:|---:|---:|---:|---:|
| 메이플M | 8 | 2026-08-20~2026-08-24 | 7 | 5.0 | 6 | 14.5 | 0 |
| 검은사막 | 6 | 2026-07-11~2026-08-04 | 4 | 3.0 | 2 | 4.0 | 0 |
| 마비노기 | 3 | 2026-08-05~2026-08-06 | 3 | 5.0 | 0 | n/a | 0 |
| 아이온2 | 1 | n/a | 0 | n/a | 0 | n/a | 1 |

Recomputed weekly new-creative counts from raw start dates: 2026-07-06 검은사막 3; 2026-07-20 검은사막 1; 2026-08-03 검은사막 2 and 마비노기 3; 2026-08-17 메이플M 7; 2026-08-24 메이플M 1. The workbook’s weekly formulas should not be treated as causal performance evidence.

## YouTube workbook direct recalculation

The workbook has one row of dates and one row of views per game, without channel URLs, explicit collection start/end protocol, official-channel verification, Shorts/ad inclusion rules, or common snapshot timestamp. Treat it as `YouTube sample dataset` until those criteria are verified. Current sheet-level calculations from the supplied rows:

| Game sheet | Paired videos | Date range | Total views | Mean | Median | Max | Top-1 share | Top-3 share |
|---|---:|---|---:|---:|---:|---:|---:|---:|
| 메이플스토리m | 22 | 2025-12-06~2026-07-30 | 56,240,297 | 2,556,377.14 | 2,135,494 | 9,046,009 | 16.08% | 42.97% |
| 검은사막 | 66 | 2025-11-19~2026-08-26 | 4,856,006 | 73,575.85 | 2,834.5 | 2,025,705 | 41.72% | 77.73% |
| 마비노기 | 43 | 2025-12-04~2026-08-21 | 38,270,598 | 890,013.91 | 13,978 | 17,926,886 | 46.84% | 72.57% |
| 아이온2 | 16 | 2025-11-19~2026-08-11 | 39,229,181 | 2,451,823.81 | 369,497 | 19,469,276 | 49.63% | 77.93% |

Because observation windows, video counts, and concentration differ, do not rank total or mean views directly across games without a common observation protocol. The existing “278.2만 vs 4.1만, 약 69배” single-video example is not replaced by these calculations yet; first classify the sample and test whether the new multi-video data supports the same direction. If not, weaken or move the single-case claim to appendix.

## Existing project guardrails

Current `docs/INPUT_AUDIT.md` says final presentation is source of truth for approved claims, DataLab is a common 39-week relative frame, MobileIndex rank is not revenue amount, and public BM structure is not purchase performance. Current `docs/PUBLIC_BM_EVIDENCE.md` keeps `[확인]`, `[관측]`, and `[비공개]` distinctions and lists official public BM pages for the four games. Existing dashboard source, runtime data, and RE:BOOST logic must not be overwritten; all new deliverables must be `_V2_TEAM_DATA` versions.
