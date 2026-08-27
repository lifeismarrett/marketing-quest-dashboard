# MARKETING QUEST V2 TEAM DATA — GPT HANDOFF

> 이 문서는 GPT가 GitHub 저장소에 직접 접근하지 못해도 MARKETING QUEST의 V1 기준, V2 신규 팀 자료 감사, 보류·제외 항목, 발표·Executive Brief·Q&A 변경 범위를 재검증할 수 있도록 작성한 단일 인수인계 문서입니다.
>
> **핵심 원칙:** 공개 확인 → 실제 성과와 분리 → 내부 검증 → 판단 범위.

## 1. PROJECT STATUS

| 항목 | 현재 상태 |
|---|---|
| Repository | https://github.com/lifeismarrett-droid/marketing-quest-dashboard |
| Live Dashboard | https://mktquestdash-kfhuh6sd.manus.space/ |
| V2 결과물 경로 | `presentation/_V2_TEAM_DATA/` |
| 기준 checkpoint | **최종 제출 기준 `88473b63`** — `b4293e70` 이후 GPT AUDIT 정정·PDF 재생성·공개 런타임 회귀 검증을 반영한 최신 checkpoint |
| 작업 완료 시각 | 2026-08-27 JST 세션 기준 |
| 현재 발표 기준 | FINAL REVISION 13분30초~14분 대본, 공개 대시보드 00~06, 2페이지 A4 Executive Brief, Q&A Defense Book |
| 비교 기준 유지 | **4 Games / 39 Weeks 유지**. V1 핵심 프레임을 변경하지 않음 |
| V2의 성격 | 대시보드 실행 코드·runtime data를 덮어쓰지 않는 별도 팀 자료 evidence layer |

**Version control:** `4668a552`는 V2 evidence layer·발표자료를 저장한 이전 checkpoint, `b4293e70`은 그 위에 GPT용 HANDOFF를 저장한 이전 checkpoint입니다. `88473b63`는 그 후 GPT AUDIT 정정, V2 PDF 재생성, 공개 런타임 회귀 기록까지 반영한 최신 checkpoint이며 최종 제출 기준입니다.

V1의 canonical 결과는 2025-11-17~2026-08-10, 39주, 4게임, MobileIndex 순위와 NAVER DataLab 공통 상대지수입니다. V2 자료는 기업 공시, Meta 소재 타임라인, YouTube 표본을 보강하지만 V1 수치를 재계산하거나 교체하지 않습니다.

### NC filing scope lock

NC 공시 수치의 정의는 **연결 기준**, **단위 백만원·%**, `게임 > PC게임 > 아이온2` 품목이며, **품목별 매출에는 로열티 매출이 포함**된다. 제30기 반기 `208,673백만원 / 16%`와 제29기 `77,361백만원 / 5%`는 공시 회계기간의 품목별 수치다. 사업보고서는 아이온2가 PC·모바일을 함께 지원한다고 서술하지만, 공시 매출표의 귀속 항목은 PC게임이다.

### V1 locked numeric set

| 잠금 수치 | 의미 | 출처 |
|---|---|---|
| `87 → 34위` | 메이플스토리M 게임(매출) 순위 변화 | V1 `docs/INPUT_AUDIT.md`; 공개 Dashboard Performance |
| `69 → 33위` | 메이플스토리M 이용자수 순위 변화 | V1 `docs/INPUT_AUDIT.md`; 공개 Dashboard Performance |
| `21위 / 2026-08-03` | 관측 내 최고 게임(매출) 순위 | V1 `docs/INPUT_AUDIT.md`; 공개 Dashboard Performance |
| `0.90 / 2026-07-27` | NAVER DataLab Search Peak 상대지수 | V1 `searchInterestData.ts`; 공개 Dashboard Performance |
| `0.23 → 0.49 / +117.2%` | 최근 4주 NAVER DataLab 상대지수 변화 | V1 `searchInterestData.ts`; 공개 Dashboard Performance |
| `34/39주` | 검은사막 모바일 이용자수 순위의 **측정 범위 밖 / 결측 주차**; 유효 관측은 `5/39주` | V1 `dashboardData.ts` 및 `docs/INPUT_AUDIT.md`; 보간하지 않음 |

V2에서 이 숫자들은 신규 공시·Meta·YouTube 자료로 덮어쓰지 않습니다. 특히 `+117.2%`는 절대 검색량 증가나 매출 효과가 아니며, `34/39주`는 **측정 범위 밖 / 결측 주차**입니다. 따라서 유효 관측은 `5/39주`이고, 검은사막 모바일 이용자수의 상대 평가는 제한하며 보간하지 않습니다.

## 2. V2 UPDATE SUMMARY

### V1 → V2 요약

V1은 메이플스토리M·검은사막 모바일·마비노기 모바일·아이온2의 39주 시장 반응, 경쟁 압력, 유저 반응, 공개 BM과 검증 우선순위를 다뤘습니다. V2는 팀원이 제공한 5개 공시와 2개 workbook을 새 evidence layer로 감사하여 **플랫폼·기업 귀속·광고 활동·YouTube 표본의 측정 경계**를 더 명확히 했습니다.

| 구분 | V2 상태 | 구체적 내용 |
|---|---|---|
| 추가됨 | V2 문서 세트 | `NEW_DATA_AUDIT`, `CONFLICT_REPORT`, `00-06_DASHBOARD_PATCH_PLAN_V2`, `TEAM_DATA_SOURCE_DICTIONARY`, 이 HANDOFF |
| 추가됨 | V2 발표자료 | 신규 자료 발화 규칙을 포함한 발표대본·Executive Brief·Q&A 버전 |
| 수정됨 | 해석 문구 | 공시 매출을 게임별 모바일 매출로 쓰지 않음. Meta 소재 수와 YouTube 조회수를 성과로 쓰지 않음 |
| 수정됨 | 범위 표기 | 아이온2는 공시 매출표에서 PC게임 항목이며 PC·모바일 지원 서술이 함께 존재하므로 `동일 모바일 매출 관측`이라고 부르지 않음 |
| 수정됨 | 문서 내비게이션 | 루트 README와 `presentation/README.md`에 V2 폴더·PDF·감사 문서 링크 추가 |
| 유지됨 | V1 핵심 수치 | `87→34`, `69→33`, `21위`, `0.90`, `0.23→0.49 / +117.2%`, `34/39주` |
| 유지됨 | V1 분석 규칙 | 39주 DataLab 단일 공통 요청, Retention 미보간, 공개 BM `[확인]·[관측]·[비공개]`, RE:BOOST 필터 로직 |
| Appendix 이동 | 신규 자료 | 공시 원문, Meta 소재 proxy, YouTube 표본 분포는 본문 성과 KPI가 아니라 appendix/evidence layer로 보관 |
| Reject | 사용하지 않음 | 기업 전체 매출을 개별 게임 매출로 배분, 공시 범주 매출을 MobileIndex와 직접 비교, Meta 소재 수를 ROAS로 해석, YouTube 표본으로 유저 획득·매출 효과 주장 |
| Needs Verification | 후속 과제 | 게임·플랫폼·지역별 직접 매출, 광고 spend/impressions/clicks/conversions, YouTube 공식성·공통 snapshot·Shorts/광고 포함 기준 |

## 3. NEW DATA SOURCES

기간이 공시의 회계기간인지, workbook의 관측 시작일인지, 파일 생성일인지 구분해야 합니다. 다음 표는 파일에 실제로 기록된 범위와 V2 사용 여부를 구분합니다.

| 파일명 | 출처 성격 | 기간 | 핵심 데이터 | 실제 사용 여부 | 사용한 Dashboard 섹션 | Evidence Status |
|---|---|---|---|---|---|---|
| `[NC]반기보고서(2026.08.14).docx` | NC 반기 공시 | 2026 반기, 비교표에 제29기 포함 | 아이온2 `게임 > PC게임` 행, `제30기 반기 208,673백만원 / 16%`, `제29기 77,361백만원 / 5%`, 2025.11 한국·대만 출시, PC·모바일 지원 서술 | 사용함 | 01 성과·04 BM의 scope appendix | 공식 공시; 기업/PC게임 범위 |
| `[NC]사업보고서(2026.03.18).docx` | NC 사업보고서 | 2025 사업연도, 제29기 | 아이온2 2025-11-19 출시, 제29기 `77,361백만원 / 5%`, 연결 매출 1조 5,069억원, PC게임 매출 4,309억원 | 사용함 | 00 개요·01 성과의 범위 주석 | 공식 공시; 게임 직접 모바일 매출 아님 |
| `[넥슨코리아]감사보고서(2026.04.10).docx` | 법인 감사보고서 | 2025 회계연도 기준 | 법인 재무·주석; 메이플스토리M 직접 행 미확인 | 제한 사용 | 04 BM/재무 경계 appendix | 공식 감사자료; 게임별 매출 근거 아님 |
| `[펄어비스]반기보고서(2026.08.14).docx` | 펄어비스 반기 공시 | 2026 반기 | 검은사막 IP의 PC·콘솔·모바일 구조와 사업/범주 매출 | 사용함 | 02 경쟁 압력·04 BM scope appendix | 공식 공시; 검은사막 모바일 단일 매출 아님 |
| `[펄어비스]사업보고서(2026.03.19)(1).docx` | 펄어비스 사업보고서 | 2025 사업연도 | 검은사막 IP와 플랫폼·사업 구조 | 제한 사용 | 02 경쟁 압력 scope appendix | 공식 공시; 게임별 직접 귀속 불가 |
| `메타광고_소재_타임라인(1).xlsx` | Meta 광고 소재 관측 workbook | 2026-08-26 캡처 기준; 행별 시작일 2026-07-11~2026-08-24 | 메이플M 8행, 검은사막 6행, 마비노기 3행, 아이온2 결과 행 1개; 시작일·재사용·플랫폼 수 proxy | 사용함 | 02 경쟁 압력·05 실행 전략 appendix | 관측 proxy; 광고 성과 아님 |
| `유튜브영상갯수,조회수.xlsx` | YouTube 표본 workbook | 게임별 관측기간 상이; 2025-11-19~2026-08-26 범위 | 4개 sheet의 영상 수·총/평균/중앙값/최대 조회수 | 사용함 | 02 경쟁 압력·05 실행 전략 appendix | 표본 dataset; 공통 비교 미확정 |

## 4. NEW DATA AUDIT 핵심 결과

### NC 공시

`[NC]반기보고서(2026.08.14).docx`의 table 27/29는 아이온2를 `게임 > PC게임` 그룹으로 보고합니다. `제30기 반기 208,673백만원 / 16%`, `제29기 77,361백만원 / 5%`는 공시표의 행과 기간에 속한 수치입니다. `[NC]사업보고서(2026.03.18).docx`는 아이온2의 2025-11-19 출시와 PC·모바일 지원 서술을 함께 기록하고, 2025 연결 매출 1조 5,069억원과 PC게임 매출 4,309억원도 제시합니다. 이 값들은 NC 기업 또는 PC게임 범주이며 메이플M·검은사막 모바일의 게임별 매출이 아닙니다. **따라서 아이온2 공시 수치를 기존 MobileIndex 모바일 순위와 직접 합산·비교하지 않습니다.** [S1] [S2]

### 넥슨코리아 감사보고서

`[넥슨코리아]감사보고서(2026.04.10).docx`에서 메이플스토리M 또는 메이플 게임의 직접 매출 행은 추출되지 않았습니다. 법인 재무와 주석은 회사 범위를 설명할 수 있지만, 메이플스토리M의 게임별 매출·구매자·전환율·LTV를 제공하지 않습니다. **넥슨코리아 기업 매출을 메이플M 매출로 사용하지 않았습니다.** [S3]

### 펄어비스 공시

`[펄어비스]반기보고서(2026.08.14).docx`와 `[펄어비스]사업보고서(2026.03.19)(1).docx`는 검은사막 온라인·모바일·콘솔 및 검은사막 IP의 사업 범위를 구분합니다. 추출된 행에서 검은사막 모바일 단일 매출은 확인되지 않았습니다. 따라서 펄어비스의 게임사업 또는 모바일게임 범주를 검은사막 모바일에 귀속하지 않았습니다. **공식 구조·범위의 근거로만 사용했습니다.** [S4] [S5]

### Meta 광고 소재

`메타광고_소재_타임라인(1).xlsx`의 `소재타임라인` sheet는 header를 제외한 18행을 포함하며, 2026-08-26 시점의 active-ad capture입니다. 원본 자체가 ad spend와 impressions는 공개되지 않으며, 소재 수·게재 시작일·재사용 수·플랫폼 수를 proxy로만 보라고 명시합니다. 이미 종료된 캠페인은 누락될 수 있고, 아이온2 검색 결과 없음은 해당 광고가 없었다는 뜻이 아닙니다. [S6]

원자료를 직접 재계산한 행 요약은 다음과 같습니다. 날짜는 workbook의 시작일 열이며, 플랫폼 수와 재사용 수가 비어 있는 행은 평균·합계에서 제외했습니다. [S6]

| 게임 label | 소재 행 | 시작일 범위 | 플랫폼 수 확인 행 | 확인 플랫폼 수 평균 | 재사용 수 확인 행 | 재사용 수 합계 | 결과 행 |
|---|---:|---|---:|---:|---:|---:|---:|
| 메이플M | 8 | 2026-08-20~2026-08-24 | 7 | 5.0 | 6 | NEEDS VERIFICATION (재사용 수 정의 문제로 수치 사용 보류) | 0 |
| 검은사막 | 6 | 2026-07-11~2026-08-04 | 4 | 3.0 | 2 | 4.0 | 0 |
| 마비노기 | 3 | 2026-08-05~2026-08-06 | 3 | 5.0 | 0 | n/a | 0 |
| 아이온2 | 1 | n/a | 0 | n/a | 0 | n/a | 1 |

주간 신규 소재 행은 2026-07-06 검은사막 3, 2026-07-20 검은사막 1, 2026-08-03 검은사막 2·마비노기 3, 2026-08-17 메이플M 7, 2026-08-24 메이플M 1입니다. 이 흐름은 활동 복기용이며 성과·인과 증거가 아닙니다. [S6]

> **광고 소재 수 ≠ 광고비. 광고 소재 수 ≠ 노출량. 광고 소재 수 ≠ 광고 효과. 검색 결과 없음 ≠ 광고 미집행.**

### YouTube 영상 수·조회수

`유튜브영상갯수,조회수.xlsx`는 게임별로 날짜 행과 조회수 행을 가진 4개 sheet이며, channel URL, 공식 채널 검증, 공통 수집종료 시각, Shorts·유료 광고 포함 규칙이 없습니다. 따라서 아래 값은 제공 표본의 기술통계이며 게임 간 전체 채널 성과 순위가 아닙니다. [S7]

| 게임 sheet | 영상 수 | 비교기간 | 총 조회수 | 평균 | 중앙값 | 최대값 | Top-1 share | Top-3 share |
|---|---:|---|---:|---:|---:|---:|---:|---:|
| 메이플스토리m | 22 | 2025-12-06~2026-07-30 | 56,240,297 | 2,556,377.14 | 2,135,494 | 9,046,009 | 16.08% | 42.97% |
| 검은사막 | 66 | 2025-11-19~2026-08-26 | 4,856,006 | 73,575.85 | 2,834.5 | 2,025,705 | 41.72% | 77.73% |
| 마비노기 | 43 | 2025-12-04~2026-08-21 | 38,270,598 | 890,013.91 | 13,978 | 17,926,886 | 46.84% | 72.57% |
| 아이온2 | 16 | 2025-11-19~2026-08-11 | 39,229,181 | 2,451,823.81 | 369,497 | 19,469,276 | 49.63% | 77.93% |

비교 기간·영상 수·조회수 집중도가 다르므로 총합·평균을 게임 간 순위로 직접 사용하지 않았습니다. 중앙값과 최대값의 차이도 분포 왜곡 가능성을 보여 줍니다. Shorts·광고 포함 여부와 공통 snapshot이 확인되기 전까지는 표본 appendix로만 유지합니다. [S7]

## 5. CONFLICT REPORT 핵심

| 기존 정의 | 신규 자료 | 충돌 내용 | 최종 처리 | 발표에서 사용할 안전한 표현 |
|---|---|---|---|---|
| MobileIndex 39주 게임 매출 순위 | NC/Pearl/Nexon 공시 | 순위는 상대적 시장 위치이고 공시는 기업·사업부문·플랫폼 회계 범위 | 기존 rank 유지, 공시는 별도 scope layer | “공시 매출은 MobileIndex 순위와 다른 측정 범위입니다.” |
| 4게임 모바일 비교 사례군 | NC 아이온2 공시 | 공시표 아이온2는 PC게임 행이며 PC·모바일 지원 서술이 함께 있음 | 사례군은 유지하되 동일 모바일 매출이라고 부르지 않음 | “아이온2는 플랫폼 범위를 주석으로 분리해 읽습니다.” |
| 검은사막 모바일 비교 | 펄어비스 범주 매출 | 모바일게임/게임사업 범주를 검은사막 모바일 단일 매출로 귀속할 수 없음 | 직접 매출 병합 Reject; 플랫폼 구조 appendix | “검은사막 모바일 직접 매출은 공개 확인하지 않았습니다.” |
| 메이플M 성과 보조 근거 | 넥슨코리아 감사보고서 | 법인 재무에 게임별 메이플M 행 없음 | 게임별 KPI 근거로 사용하지 않음 | “법인 공시는 게임별 매출 근거가 아닙니다.” |
| 공개 BM 구조 | 공시·공식 상점·공지 | 상품 구조 확인과 구매 성과는 다른 층위 | `[확인]·[관측]·[비공개]` 유지 | “구조는 확인됐지만 전환·재구매·LTV는 내부 검증입니다.” |
| 소재 활동 | Meta workbook | 소재 수는 비용·노출·전환을 포함하지 않음; 종료 캠페인 누락 가능 | 활동 proxy appendix | “소재 활동은 성과가 아니라 복기용 관측입니다.” |
| YouTube 화제성 사례 | YouTube workbook | 새 workbook은 기간·표본·채널·snapshot 기준이 다름 | 기존 `278.2만 vs 4.1만 / 약 69배`는 단일 사례로 유지; 새 표본과 혼합하지 않음 | “69배는 동일 주 공식 단일 영상의 사례 신호입니다.” |
| 39주 DataLab | 신규 파일들 | 신규 파일은 공통 39주 검색 상대지수를 제공하지 않음 | V1 DataLab canonical 유지 | “0.90과 +117.2%는 신규 자료가 아니라 V1 DataLab 정의입니다.” |

## 6. FINANCIAL DATA BOUNDARY

기업 전체 매출, 사업부문 매출, 품목별 게임 매출, MobileIndex 매출 순위는 서로 다른 측정 단위입니다. **4개 비교게임에 대해 동일 기간·동일 플랫폼·동일 범위로 비교 가능한 게임별 직접 매출은 확보되지 않았습니다.** 아이온2는 NC 공시에 품목별 매출이 존재하지만 연결 기준·`게임 > PC게임` 항목·단위 백만원·%·로열티 포함 범위이므로 MobileIndex 모바일 매출 순위와 직접 비교하지 않습니다.

| 범주 | 정의 | 이번 프로젝트 사용 여부 |
|---|---|---|
| 기업 전체 매출 | 회사 연결 또는 법인 전체의 회계기간 매출 | 기업 범위 설명에만 사용; 개별 게임에 배분하지 않음 |
| 사업부문 매출 | PC게임·모바일게임·게임사업 등 공시 분류의 합계/범주 | 플랫폼·사업 범위 설명에만 사용; 게임 단일 매출로 배분하지 않음 |
| 게임별 직접 매출 | 특정 게임·플랫폼·지역·기간의 직접 귀속 결제/매출 | **4개 비교게임에 대해 동일 기간·동일 플랫폼·동일 범위로 비교 가능한 게임별 직접 매출은 확보되지 않음.** 아이온2는 NC 공시에 연결 기준 품목별 매출이 존재하지만 `게임 > PC게임` 항목이며 단위 백만원·%, 로열티 매출이 포함됨 |
| MobileIndex 매출 순위 | 공개 모바일 시장에서의 상대 순위 관측 | V1 39주 KPI로 유지; 매출액이 아님 |

기업 전체 매출을 개별 게임 매출로 사용하지 않았습니다. NC의 2025 연결 매출 `1조 5,069억원`과 PC게임 매출 `4,309억원`은 회사·PC 범주이며 메이플M이나 아이온2의 모바일 매출이 아닙니다. NC 반기 공시의 아이온2 `제30기 반기 208,673백만원 / 16%`, `제29기 77,361백만원 / 5%`도 공시표의 `게임 > PC게임` 문맥입니다. 기간은 공시의 제30기 반기 및 제29기 비교 범위이며, MobileIndex의 2025-11-17~2026-08-10 주간 관측기간과 동일하지 않습니다. 플랫폼은 공시 매출표 기준 PC게임이고, 별도 사업 서술에 PC·모바일 지원이 있습니다. 그러므로 이 수치는 **아이온2의 모바일 순위 또는 4게임 모바일 매출과 직접 비교할 수 없습니다.** [S1] [S2]

## 7. PLATFORM SCOPE

| 게임 | 기존 V1 비교 프레임 | 신규 공시·자료에서 확인되는 플랫폼 | 최종 안전한 정의 |
|---|---|---|---|
| 메이플스토리M | MobileIndex 모바일 benchmark case | 본 V2 팀 공시에서 직접 게임별 매출 근거 없음 | “메이플M 사례군의 모바일 시장 순위·검색 관심을 관측” |
| 검은사막 모바일 | MobileIndex 모바일 benchmark case | 펄어비스 공시에서 PC·콘솔·모바일 IP/사업 범위가 분리됨 | “검은사막 모바일 비교 사례; 직접 게임별 매출은 미확인” |
| 마비노기 모바일 | MobileIndex benchmark case | 이번 팀 공시에서 직접 매출 근거 없음 | “마비노기 모바일 비교 사례; 공개 구조·관측 신호 중심” |
| 아이온2 | V1 표기상 4게임 benchmark case | NC 공시 매출표는 PC게임 행; 사업 서술에는 PC·모바일 지원 | “아이온2 비교 사례이며, 공시 매출은 PC게임/기업 범위로 별도 표시” |

따라서 기존의 편의적 표현인 “모바일 MMORPG 4게임”은 **동일 플랫폼·동일 회계범주의 매출 비교라는 뜻으로 사용하지 않습니다.** 최종 Dashboard와 발표에서는 `4 GAMES · 39 WEEKS`와 `비교 사례군`을 유지하되, 공시 근거에는 `기업/플랫폼 scope`, `MobileIndex rank와 직접 병합하지 않음`을 표시합니다. 실제 dashboard source의 39주 차트·RE:BOOST 로직은 수정하지 않았습니다.

## 8. META ADS AUDIT

### 직접 재계산 결과

| 게임 | 확인 소재 수 | 기간 | 신규 게재 흐름 | 플랫폼 | 활용 방식 |
|---|---:|---|---|---|---|
| 메이플M | 8행 | 2026-08-20~2026-08-24 시작일 | 2026-08-17 주 7행, 2026-08-24 주 1행 | 알려진 7행 평균 5.0 | 소재 활동 proxy; 05 실행 전략의 복기 후보 |
| 검은사막 | 6행 | 2026-07-11~2026-08-04 시작일 | 2026-07-06 주 3행, 07-20 주 1행, 08-03 주 2행 | 알려진 4행 평균 3.0 | 소재 활동 proxy; 경쟁 압력과 직접 인과 아님 |
| 마비노기 | 3행 | 2026-08-05~2026-08-06 시작일 | 2026-08-03 주 3행 | 3행 평균 5.0 | 소재 활동 proxy |
| 아이온2 | 결과 행 1개 | 시작일 n/a | 확인된 신규 시작일 없음 | 확인값 없음 | 검색 결과 없음은 광고 미집행이 아님 |

Meta 원본은 2026-08-26 active-ad capture이며 종료 캠페인이 누락될 수 있습니다. 따라서 `검색 결과 없음 ≠ 광고 미집행`입니다. 또한 소재 수·재사용 수·플랫폼 수는 광고비, 노출량, 클릭, 전환, ROAS, 매출을 제공하지 않습니다. V2 발표·Q&A에서는 이 표를 광고 활동 복기와 후속 export 요구의 근거로만 사용합니다.

## 9. YOUTUBE AUDIT

### 표본 통계

앞서 제시한 4개 sheet 통계가 원본 workbook의 paired rows를 직접 재계산한 결과입니다. **총 조회수·평균·중앙값·최대값·기간은 표본 기술통계**이며, 채널 전체 성과나 게임 간 공정한 순위가 아닙니다. 표본의 수집 기준은 각 sheet의 날짜 행과 조회수 행의 paired values입니다. 채널 URL, 공식 채널 여부, common snapshot, Shorts 포함 여부, 유료 광고 포함 여부가 명시되지 않았습니다.

### 69배 사례의 V2 판정

기존 `278.2만 vs 4.1만 / 약 69배`는 **삭제하지 않고 약화된 Appendix 사례로 유지**합니다. 의미는 동일 주 공식 YouTube 단일 영상 두 편에서 관측된 화제성 차이이며, 콜라보의 매출 효과·채널 전체 성과·유저 획득 효과를 뜻하지 않습니다. 새 workbook의 다중 영상 표본과 직접 혼합하지 않습니다. 새 표본이 69배를 확인하거나 반박하려면 동일 채널 기준·동일 snapshot·동일 영상 유형·광고/Shorts 규칙이 먼저 필요합니다.

## 10. 00–06 DASHBOARD PATCH SUMMARY

중요한 구분은 **V2 문서 패치와 실제 dashboard UI 패치는 다르다**는 것입니다. 이번 단계에서는 실행 소스·runtime data·chart logic을 수정하지 않았습니다.

| 화면 | V1 상태 | V2 추가/수정 | 실제 화면에 반영된 요소 | 삭제 또는 축소된 요소 | 근거 자료 | Evidence Status |
|---|---|---|---|---|---|---|
| 00 개요 | 4게임·39주·분석 질문 | V2 문서에서 source-grade와 4단계 evidence frame 추가 | V2 README·발표대본·Brief scope note | 신규 자료를 V1 KPI로 합치지 않음 | 7개 입력 audit | 문서 추가 |
| 01 성과 | MobileIndex rank·DataLab·RE:BOOST | 공시 기업/플랫폼 범위 주석을 appendix에 추가 | V2 Brief의 V2 DATA LAYER; dashboard chart는 V1 유지 | 공시 매출을 rank와 병합하지 않음 | NC filings; V1 INPUT AUDIT | 공개 공시 + 관측 분리 |
| 02 경쟁 압력 | 4사 통합·1:1 경쟁·이벤트 | 플랫폼 scope와 사례군 한계를 문서화 | Patch Plan·Conflict Report | 경쟁사 표본의 시장 전체 대표 주장 축소 | NC/Pearl filings | scope evidence |
| 03 유저 반응 | Hooking·Retention proxy·Store Reputation | YouTube는 본문 KPI에서 제외하고 appendix에만 보관 | V2 script/Q&A/hand-off | 조회수·표본을 유저·매출 성과로 사용하지 않음 | YouTube workbook | appendix sample proxy |
| 04 BM·매출 퍼널 | 공개 BM `[확인]·[관측]·[비공개]` | 공시 매출과 게임별 결제성과 경계 추가 | V2 Brief Evidence Boundary | 전환·재구매·ARPU·ARPPU·LTV 추정 없음 | BM evidence; filings | public structure only |
| 05 실행 전략 | 검증 우선순위 | Meta 소재 활동을 복기 proxy로 연결 | V2 script/Q&A | 소재 수를 ROAS·매출·광고 우위로 해석하지 않음 | Meta workbook | activity proxy |
| 06 결론 | 5 REVENUE FINDINGS | 신규 자료는 결론 확대가 아니라 검증 scope 보강 | V2 Brief·Q&A의 decision scope | 신규 자료로 확정된 매출 효과를 만들지 않음 | Conflict Report | decision boundary |

## 11. PRESENTATION SCRIPT CHANGES

V1은 `MARKETING_QUEST_14MIN_FINAL_REVISION_SCRIPT.md`입니다. V2는 기존 본문과 시간표를 유지하고, 문서 상단에 신규 팀 자료의 선택적 발화 규칙과 아래 표를 추가했습니다. 이 addendum은 발표 시간을 늘리는 별도 섹션이 아니라, 질문이 들어왔을 때 사용할 범위 고지입니다.

| 섹션 | V1 | V2 | 변경 이유 | 추가 발표 시간 |
|---|---|---|---|---:|
| 00 개요 | 4게임·39주·공개 구조·성과 분리 | 공시 기업/플랫폼, Meta proxy, YouTube 표본이 보조 evidence layer임을 추가 | 신규 자료를 V1 지표와 혼합하지 않기 위해 | 0초 기본; 질문 시 15~25초 |
| 01 성과 | rank·DataLab은 관측 신호 | NC 공시 숫자는 기업/PC게임 범위로만 말함 | rank와 회계 매출의 정의 충돌 방지 | 0초 기본; 질문 시 15초 |
| 03 유저 반응 | 69배는 동일 주 공식 단일 영상 사례 | 새 YouTube 표본은 기간·채널·snapshot이 달라 별도 appendix | 다중 표본과 단일 사례 혼합 방지 | 0초 기본; 질문 시 20초 |
| 05 실행 전략 | 이벤트·콜라보·복귀·반복 BM 검증 | Meta는 소재 활동 proxy이며 성과 데이터가 아님 | 소재 수의 과해석 방지 | 0초 기본; 질문 시 15초 |
| 06 결론 | 5 REVENUE FINDINGS와 검증 우선순위 | 신규 자료는 결론을 확대하지 않고 내부 검증 후보의 범위를 정교화 | decision scope 유지 | 0초 기본; 질문 시 20초 |

**전체 발표 예상 시간:** 기존 최종 목표 **13분45초**, 안전 범위 13분30초~14분. V2 addendum을 발표 본문에 전부 낭독하지 않는 한 14분을 초과하지 않습니다. 신규 자료를 설명해야 하는 경우에도 위의 한 문장만 선택적으로 말하고, 상세 audit은 문서로 넘깁니다.

## 12. EXECUTIVE BRIEF CHANGES

기존 `MARKETING_QUEST_EXECUTIVE_BRIEF.pdf`는 보존하고, V2 폴더에 별도 `02_마케팅퀘스트_Executive_Brief_V2_TEAM_DATA.pdf`와 Typst 원본을 생성했습니다.

| 구분 | V2 반영 |
|---|---|
| 새로 들어간 것 | Page 1 `V2 DATA LAYER · 공시 기업/플랫폼 범위 · Meta 소재 proxy · YouTube 표본`과 “기존 39주 지표와 직접 병합하지 않음” |
| 새로 들어간 것 | Page 2 Evidence Boundary에 `공시 매출 범위 ≠ 게임별 모바일 매출` 추가 |
| 유지 | 2페이지 A4 세로, 5 Key Market Signals, 5 REVENUE FINDINGS, 10단계 MMORPG funnel, Validation Priorities, Final Decision, QR |
| 빠진 것 | 없음. 기존 핵심 수치·Final Decision·퍼널 단계는 삭제하지 않음 |
| 표현 변경 | 공시·Meta·YouTube를 성과 근거가 아니라 보조 evidence layer로 명시 |
| 검증 | strict compile PASS, publication verifier PASS, PDF 정확히 2페이지 A4, 두 페이지 고해상도 시각 QA PASS |

## 13. Q&A DEFENSE CHANGES

기존 Q01~Q25, Critical Q&A TOP 5, Cheat Sheet TOP 5, 숫자 7개와 기존 References는 보존했습니다. V2 Q&A에는 신규 자료 때문에 Q26~Q33을 추가했습니다.

| 질문 | 추가 방어 주제 | 핵심 답변 |
|---|---|---|
| Q26 | 아이온2 공시가 PC게임인데 모바일 비교에 넣은 이유 | 공시 매출은 PC게임 행·기업 범위로 분리하고 MobileIndex rank와 병합하지 않음 |
| Q27 | 펄어비스 모바일게임 매출을 검은사막 모바일로 볼 수 있는가 | 직접 귀속 불가; 플랫폼·IP 구조 appendix로만 사용 |
| Q28 | Meta 소재 수가 광고 성과인가 | 소재 수는 활동 proxy; 광고비·노출·전환·매출 없음 |
| Q29 | 새 YouTube workbook이 69배를 확인/반박하는가 | 기간·채널·snapshot·Shorts/광고 기준이 달라 별도 appendix; 아직 확인·반박하지 않음 |
| Q30 | 신규 자료를 왜 추가했는가 | 기존 KPI 대체가 아니라 scope와 다음 내부 검증 항목을 좁히기 위해 추가 |

**유지한 안전 표현:** `광고 소재 수 ≠ 광고비`, `광고 소재 수 ≠ 노출량`, `광고 소재 수 ≠ 광고 효과`, `검색 결과 없음 ≠ 광고 미집행`, `69배는 동일 주 공식 단일 영상의 화제성 사례`.

## 14. FINAL EVIDENCE BOUNDARY

| 데이터/근거 | 최종 해석 | 가능한 사용 | 금지된 사용 |
|---|---|---|---|
| MobileIndex Rank | 상대적 시장 위치 관측 | 39주 순위 흐름·경쟁 압력 | 실제 매출액·증분 매출 |
| NAVER DataLab | 4개 공식명 단일 요청의 공통 상대 검색 관심 | peak·기간 내 방향·보조 신호 | 절대 검색량·DAU·매출 |
| Official Financial Filing | 기업·사업부문·플랫폼 회계·사업 범위의 공식 공시 | 아이온2·검은사막 IP의 scope note | 게임별 모바일 매출로 배분 |
| Meta Ads | 소재 활동 관측 proxy | 소재 복기·후속 광고 export 요구 | 광고비·노출·ROAS·매출 효과 |
| YouTube | 제공 표본의 공식성/수집기준이 미확정인 활동·화제성 proxy | 표본 분포·프로토콜 개선 | 채널 전체 성과·유저 획득·매출 |
| BM Store/Notice | 공개 상품 구조 | 첫 결제·반복·고가치 결제 가설 | 전환율·재구매율·실제 매출 기여 |
| Conversion / ARPU / ARPPU / LTV | 내부 비공개 성과 | 실험 후 효과 판단 | 공개자료로 추정 |

## 15. FINAL 5 REVENUE FINDINGS

V2에서도 다음 5개 Finding의 순서·핵심 의미를 유지합니다. 신규 자료는 각 Finding을 확정하는 매출 데이터가 아니라, 근거의 범위와 내부 검증 설계를 더 엄격하게 만드는 보조 근거입니다.

| Finding | V2 최종 내용 | 연결 근거 | 해석 경계 |
|---|---|---|---|
| 01 경쟁사 우위 매출 요소 | 멤버십·패스·월간/반복형 패키지와 누적·연속 혜택은 공개 BM에서 확인되는 반복 구매 후보 | V1 `PUBLIC_BM_EVIDENCE.md`; 공시의 플랫폼·사업 범위는 구조 scope 보조 | 실제 반복 구매율·매출 우위 아님 |
| 02 결제 유도 방식 | 입문 가격·기간 한정·성장 패키지는 유저 단계에 맞춘 공개 상품 구조 | V1 공개 상점/공지; 공시 범위는 기업·플랫폼 보조 | 실제 전환 효과·매출 lift 아님 |
| 03 신규·복귀 → 첫 결제 | 신규·복귀·초기 성장 상품은 첫 결제 구간의 검증 후보 | V1 Hooking/BM; NC·Meta·YouTube는 직접 전환 근거가 아님 | 전환율·구매자 수 공개 확인 불가 |
| 04 반복·고가치 결제 | 반복형 패키지와 프리미엄·성장·코스메틱 선택 구조는 내부 구매 데이터로 검증할 후보 | V1 BM; 공시·workbook은 매출 성과 대체 불가 | ARPU·ARPPU·LTV·고가치 유저 성과 불명 |
| 05 메이플M 검증 우선순위 | IP 콜라보·상시복귀지원 공백과 공개 BM 구조를 함께 검토하되 실제 효과는 내부 결제 데이터 후 판단 | V1 Strategy/Conclusion; Meta·YouTube는 활동/표본 appendix | 도입 확정·매출 증가·인과 주장 금지 |

## 16. OPEN ISSUES

| 문제 | 현재 처리 | 추가 검증 필요 여부 | 발표에서 안전하게 말할 문장 |
|---|---|---|---|
| 아이온2 공시 매출의 플랫폼 귀속 | PC게임 행과 PC·모바일 지원 서술을 분리 기록 | 필요: 플랫폼·지역·수익 인식 세부표 | “공시 매출 범위는 모바일 순위와 직접 비교하지 않습니다.” |
| 공시 기업/범주 매출을 게임에 배분할 위험 | 전부 직접 게임 매출 사용 Reject | 필요: 게임·플랫폼·지역별 직접 귀속 | “기업 매출을 개별 게임 매출로 사용하지 않았습니다.” |
| 검은사막 모바일 직접 매출 부재 | 펄어비스 범주 매출을 직접 귀속하지 않음 | 필요: 게임별 직접 매출 | “검은사막 모바일 직접 매출은 공개 확인하지 않았습니다.” |
| Meta active capture 편향 | 종료 캠페인 누락 가능성 기록 | 필요: 계정 export·기간 전체 log | “소재 수는 활동 proxy이며 성과가 아닙니다.” |
| Meta 아이온2 결과 없음 | 광고 미집행으로 해석하지 않음 | 필요: 검색어·계정·기간 확인 | “검색 결과 없음은 광고 미집행을 뜻하지 않습니다.” |
| YouTube 기간·채널·snapshot 불일치 | 다중 영상 총합/평균 순위 사용 보류 | 필요: 공통 수집 protocol | “현재는 표본 분포 appendix로만 봅니다.” |
| 69배 단일 사례 | 삭제하지 않고 사례 신호로 약화·Appendix 유지 | 필요: 동일 채널·공통 snapshot·광고/Shorts 통제 | “69배는 단일 영상 화제성 사례입니다.” |
| V1 dashboard UI와 V2 문서 layer 차이 | UI source는 수정하지 않고 V2 문서에 scope note 추가 | 필요: 별도 승인 시 UI 패치 | “이번 단계는 문서 evidence layer 업데이트입니다.” |
| 실제 결제 KPI | 공개자료에서 전환·재구매·ARPU·ARPPU·LTV 미확인 | 필수: 내부 코호트·결제 로그 | “실제 성과는 내부 데이터로 검증해야 합니다.” |
| 14분 발표 시간 | V2 addendum은 선택적 발화로 분리; 기본 13분45초 | 리허설 필요 | “상세 audit은 문서로, 발표는 한 문장으로 압축합니다.” |

## 17. FILE INDEX

| 파일 | 한 줄 설명 |
|---|---|
| `presentation/_V2_TEAM_DATA/MARKETING_QUEST_V2_HANDOFF.md` | GPT용 단일 인수인계 문서 |
| `presentation/_V2_TEAM_DATA/01_마케팅퀘스트_발표대본_V2_TEAM_DATA.md` | FINAL REVISION 보존 + 신규 자료 정의·발화 addendum |
| `presentation/_V2_TEAM_DATA/01_마케팅퀘스트_발표대본_V2_TEAM_DATA.pdf` | 위 발표대본 배포 PDF |
| `presentation/_V2_TEAM_DATA/02_마케팅퀘스트_Executive_Brief_V2_TEAM_DATA.typ` | V2 Executive Brief 편집 가능한 Typst 원본 |
| `presentation/_V2_TEAM_DATA/02_마케팅퀘스트_Executive_Brief_V2_TEAM_DATA.pdf` | V2 2페이지 A4 Executive Brief |
| `presentation/_V2_TEAM_DATA/03_마케팅퀘스트_QA_DEFENSE_BOOK_V2_TEAM_DATA.md` | Q01~Q25 보존 + Q26~Q33 신규 자료 방어 문답 |
| `presentation/_V2_TEAM_DATA/03_마케팅퀘스트_QA_DEFENSE_BOOK_V2_TEAM_DATA.pdf` | 위 Q&A 배포 PDF |
| `presentation/_V2_TEAM_DATA/README.md` | V2 폴더 산출물·근거·재현성 안내 |
| `presentation/_V2_TEAM_DATA/audit/NEW_DATA_AUDIT.md` | 7개 입력 추출·再계산·비교 가능성 감사 |
| `presentation/_V2_TEAM_DATA/audit/CONFLICT_REPORT.md` | V1 정의와 신규 자료의 충돌·처리표 |
| `presentation/_V2_TEAM_DATA/audit/00-06_DASHBOARD_PATCH_PLAN_V2.md` | 00~06 섹션별 안전한 패치 계획 |
| `presentation/_V2_TEAM_DATA/audit/TEAM_DATA_SOURCE_DICTIONARY.md` | 파일별 기간·단위·사용 판정 |
| `presentation/_V2_TEAM_DATA/audit/TEAM_INPUT_KEY_FACTS.md` | 공시·Meta·YouTube 핵심 원문·계산 메모 |
| `presentation/_V2_TEAM_DATA/audit/VISUAL_QA_NOTES.md` | V2 Executive Brief PDF 시각 QA 기록 |
| `presentation/_V2_TEAM_DATA/live-dashboard-qr.png` | 공개 대시보드 QR 재현 자산 |
| `presentation/_V2_TEAM_DATA/report-theme.typ` | Executive Brief Typst 테마 |
| `presentation/_V2_TEAM_DATA/README.md` | V2 팀 자료 폴더 설명과 Evidence rule |
| `presentation/README.md` | V1·V2 발표자료 내비게이션 |
| `README.md` | 저장소 전체 포트폴리오 내비게이션 |

### Preserved V1 materials

`presentation/01_마케팅퀘스트_발표대본_최종본.pdf`, `presentation/02_마케팅퀘스트_임원용_핵심요약_최종본.pdf`, `presentation/03_마케팅퀘스트_질의응답_대응자료_최종본.pdf`는 V2에서 덮어쓰지 않고 보존합니다. 기존 dashboard source, `client/src/data/`, `QuestCharts.tsx`, `Home.tsx`, `docs/INPUT_AUDIT.md`, `docs/PUBLIC_BM_EVIDENCE.md`도 canonical V1 자료입니다.

## 18. GPT REVIEW REQUEST

> **GPT 검토 요청:**
>
> 이 V2 결과물을 기존 MARKETING QUEST FINAL REVISION과 비교하여
> 1) 논리 충돌
> 2) 숫자·기간·플랫폼 오류
> 3) 근거보다 강한 주장
> 4) 발표 14분 초과 가능성
> 5) 교수 질의응답 취약점
> 6) 불필요하게 추가된 정보
> 7) 반드시 수정해야 할 사항
> 을 우선순위별로 검토해 주세요.

## REFERENCES / SOURCE REGISTER

| ID | Source |
|---|---|
| [S1] | `[NC]반기보고서(2026.08.14).docx` — 사용자 제공 원문; 아이온2 table 27/29와 플랫폼·출시 문맥 |
| [S2] | `[NC]사업보고서(2026.03.18).docx` — 사용자 제공 원문; 아이온2 출시·PC게임·연결/사업 범위 |
| [S3] | `[넥슨코리아]감사보고서(2026.04.10).docx` — 사용자 제공 원문; 법인 감사 범위 |
| [S4] | `[펄어비스]반기보고서(2026.08.14).docx` — 사용자 제공 원문; 검은사막 플랫폼·사업 범위 |
| [S5] | `[펄어비스]사업보고서(2026.03.19)(1).docx` — 사용자 제공 원문; 검은사막 IP 구조 |
| [S6] | `메타광고_소재_타임라인(1).xlsx` — 사용자 제공 원본; 2026-08-26 active capture와 소재 행 |
| [S7] | `유튜브영상갯수,조회수.xlsx` — 사용자 제공 원본; 4 sheet paired video/date rows |
| [S8] | `docs/INPUT_AUDIT.md` — V1 DataLab 39주·데이터 정의 |
| [S9] | `docs/PUBLIC_BM_EVIDENCE.md` — V1 공개 BM 근거·상태 구분 |
| [S10] | `MARKETING_QUEST_14MIN_FINAL_REVISION_SCRIPT.md` — V1 발표대본 |
| [S11] | `MARKETING_QUEST_FINAL_QA_DEFENSE_BOOK.md` — V1 Q&A Defense Book |
| [S12] | `MARKETING_QUEST_EXECUTIVE_BRIEF.pdf` 및 `main.typ` — V1 Executive Brief |
| [S13] | https://mktquestdash-kfhuh6sd.manus.space/ — 공개 MARKETING QUEST dashboard; V1 00~06 렌더와 핵심 KPI 확인 |

## FINAL HANDOFF RULE

이 문서와 V2 산출물은 **V1 결과를 폐기하거나 대시보드 코드를 자동 패치했다는 뜻이 아닙니다.** V2는 신규 자료의 정의·충돌·보류 영역을 공개적으로 설명하고, 내부 데이터로 무엇을 먼저 검증해야 하는지 좁힌 버전입니다.
