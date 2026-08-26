# NAVER DataLab 4게임 검색 관심 — Source Note

## Primary comparison frame

The dashboard’s primary search-interest chart uses four **official game-name** groups in one NAVER DataLab weekly response. The rendered observation dates are **2025-11-17 through 2026-08-10** (39 weeks). Device, gender, and age filters were omitted in the request, which applies NAVER’s all-device, all-gender, and all-age defaults. The result’s common maximum is 100, so the four series are comparable **within this one request only**.

| Game | Official-name query group | Color |
|---|---|---|
| 메이플스토리M | `메이플스토리M` | orange |
| 검은사막 모바일 | `검은사막 모바일` | purple |
| 마비노기 모바일 | `마비노기 모바일` | green |
| 아이온2 | `아이온2` | blue |

> The index is a normalized relative-interest signal. It is not absolute search volume, market share, DAU, revenue, or causal evidence of commercial performance.

## Summary and retention method

The dashboard computes each game’s 39-week average, peak and peak week, first and recent four-week average, first-to-recent change, cumulative-interest **proxy**, and post-peak search-interest retention. The proxy is the sum of relative indices, not a count of searches. Retention starts at each game’s peak week (`M0`) and uses the index four weeks later for each subsequent monthly point (`M1`–`M5`). When the observation window ends before a later month, the chart preserves a missing point rather than interpolating it. The end-of-window percentage is shown separately as the final observed week divided by that game’s peak; the elapsed weeks differ by game.

## Alias sensitivity QA

An alias-inclusive request used the same four-group, weekly, and demographic/device conditions, but it is a **different normalization frame**. It is retained only for sensitivity QA and is not merged into the primary chart. MapleStoryM’s alias-inclusive average is 88.72% higher than the official-name-only frame, while Black Desert Mobile is 16.58% higher; Mabinogi Mobile and AION2 change by 0.12% and 0.00%, respectively. This supports retaining official names as the primary comparable query rule.

## Long-range context

The long official-name response spans 2023-07-31 through 2026-08-24 (161 weekly rows). It is stored in `SEARCH_INTEREST_4GAME_LONG.csv` for context only and is never mixed into the 39-week chart or its normalized KPI values.
