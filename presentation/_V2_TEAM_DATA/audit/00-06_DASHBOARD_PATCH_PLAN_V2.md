# MARKETING QUEST — 00~06 DASHBOARD PATCH PLAN V2

## Patch boundary

이번 V2는 신규 자료를 기존 핵심 지표에 덧붙여 단순히 숫자를 늘리는 작업이 아니다. 실행 소스, `searchInterestData.ts`, `dashboardData.ts`, `monetizationData.ts`, RE:BOOST 표시 규칙은 변경하지 않는다. 공시·Meta·YouTube는 별도의 evidence layer로 추가하고, 모든 표와 문구에 측정대상·기간·단위를 표시한다.

## Section plan

| Section | V2 patch | New data | Must not claim |
|---|---|---|---|
| `00 개요` | `PUBLIC EVIDENCE → PERFORMANCE SEPARATION → INTERNAL VALIDATION → DECISION SCOPE`를 짧은 method strip으로 추가. | 7개 입력의 역할과 source-grade. | 신규 자료가 기존 성과를 증명한다고 말하지 않음. |
| `01 성과` | 기존 39주 순위·DataLab KPI 유지. 공시 숫자는 `기업/사업부문 공개 매출` 보조 라벨과 함께 별도 카드 또는 appendix 링크로 배치. | NC 아이온2 공시 매출·플랫폼 scope. | 공시 매출을 MobileIndex rank 또는 네 게임 모바일 매출로 병합하지 않음. |
| `02 경쟁 압력` | 기존 이벤트/순위 console 유지. `platform scope` 및 `comparison case set` 주석만 추가. | NC·펄어비스 플랫폼 구조. | 네 게임이 MMORPG 전체 또는 동일 플랫폼·동일 회계범주를 대표한다고 말하지 않음. |
| `03 유저 반응` | 기존 Retention proxy·Store Reputation 유지. YouTube workbook은 본문 KPI가 아닌 `표본 기술통계 appendix`로만 연결. | YouTube 4시트 기술통계. | 조회수 총합/평균을 유저수·매출·리텐션 또는 69배 효과로 해석하지 않음. |
| `04 BM·매출 퍼널` | 기존 공개 BM `[확인]·[관측]·[비공개]` 유지. 공시는 상품 성과가 아니라 회사/플랫폼 사업범위 근거로만 표시. | NC/Pearl filings의 공개 플랫폼·수익 인식 범위. | 전환율·반복 결제율·ARPU·ARPPU·LTV를 공개자료로 채우지 않음. |
| `05 실행 전략` | 기존 전략을 `검증 우선순위`로 유지. Meta는 `UA ACTIVITY SNAPSHOT` 소재 활동 proxy로 02 경쟁 압력 또는 05 실행 전략 appendix에만 연결하고, YouTube는 channel validation 후보 appendix로만 연결. | Meta 18행 및 YouTube sample. | 소재 수가 ROAS·매출 효과·광고 우위라는 결론을 만들지 않음. |
| `06 결론` | 기존 5 REVENUE FINDINGS의 순서·의미 유지. 신규 자료는 `V2 validation appendix`와 scope warning으로만 요약. | 공시·광고·YouTube의 보강/한계. | 공개 데이터로 모든 매출 효과를 증명했다고 말하지 않음. |

## V2 narrative patch

> 공개 데이터로 모든 매출 효과를 증명하는 것이 아니라, 공개 근거를 통해 메이플M이 내부 데이터로 무엇을 먼저 검증해야 하는지 좁힌다.

V2 발표대본과 Q&A에는 다음 순서를 고정한다. 첫째, 공개적으로 확인된 자료의 단위와 범위를 말한다. 둘째, 그 자료가 실제 성과를 의미하지 않는 이유를 분리한다. 셋째, 내부에서 필요한 코호트·결제·광고·채널 KPI를 제안한다. 넷째, 현재 결론은 도입 확정이 아니라 검증 후보라는 범위로 닫는다.

## Required verification labels

- `PUBLIC EVIDENCE`: 공시의 기업·사업부문·플랫폼 범위, 공식 BM 구조, Meta/YouTube 원본에 실제 기록된 값.
- `PERFORMANCE SEPARATION`: MobileIndex 상대 순위, NAVER DataLab 상대지수, 공시 매출, 소재 수, YouTube 조회수의 직접 병합 금지.
- `INTERNAL VALIDATION`: 신규/복귀 결제전환, 첫 결제, 반복 결제, 고가치 결제, ARPU·ARPPU·LTV, ROAS.
- `DECISION SCOPE`: 전략은 검증 우선순위이며, 실험 전 기준선·대조군·비용 한도·중단 기준을 사전 정의.

## Out of scope

이번 패치에서는 기존 데이터 파일 재작성, 대시보드 차트 로직 변경, RE:BOOST 규칙 변경, 69배 숫자의 자동 대체, 외부 경쟁사 신규 검색, 공시 수치의 게임별 배분, 광고 효과 추정, 고객 결제 성과 추정을 수행하지 않는다.
