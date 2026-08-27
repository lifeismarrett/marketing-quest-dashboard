# TEAM DATA SOURCE DICTIONARY

## Scope

이 사전은 2026-08-26에 제공된 7개 파일을 기준으로 한다. 파일 원문을 저장소에 복사하지 않고, 제공 workspace의 원본을 감사 입력으로 사용했다. 파일명은 사용자가 제공한 이름을 그대로 기록하며, 실제 사용 시 파일 SHA-256과 수집시점을 함께 보관해야 한다.

| Source file | Type | Observable coverage | Unit / grain | V2 use | Status |
|---|---|---|---|---|---|
| `[NC]반기보고서(2026.08.14).docx` | 기업 반기보고서 | NC 사업·플랫폼·아이온2 문맥 | 공시 표의 기업/사업부문 범위 | 아이온2의 공시 귀속·플랫폼 scope | ADD as evidence layer |
| `[NC]사업보고서(2026.03.18).docx` | 기업 사업보고서 | 아이온2 출시·PC게임·플랫폼 문맥 | 공시 표·서술 범위 | 출시·수익 인식 범위 보조 | ADD as evidence layer |
| `[넥슨코리아]감사보고서(2026.04.10).docx` | 법인 감사보고서 | 넥슨코리아 법인 재무·주석 | 법인 회계 범위 | 법인 범위와 게임 KPI의 분리 | APPENDIX only |
| `[펄어비스]반기보고서(2026.08.14).docx` | 기업 반기보고서 | 검은사막 IP·PC/콘솔/모바일 범위 | 사업·플랫폼·지역 범주 | 검은사막 모바일 단일 귀속 불가 근거 | ADD as scope evidence |
| `[펄어비스]사업보고서(2026.03.19)(1).docx` | 기업 사업보고서 | 검은사막 IP·사업 구조 | 사업·플랫폼 범주 | IP/플랫폼 구조 보조 | APPENDIX only |
| `메타광고_소재_타임라인(1).xlsx` | 광고 소재 workbook | 메이플M 8행, 검은사막 6행, 마비노기 3행, 아이온2 결과 없음 1행 | 행·시작일·플랫폼 수 proxy | 소재 활동 복기 | ADD as proxy only |
| `유튜브영상갯수,조회수.xlsx` | YouTube workbook | 4개 시트·게임별 영상 수/조회수 표본 | 영상·조회수 표본; 수집기간 상이 | 표본 분포·수집 프로토콜 gap | APPENDIX / NEEDS VERIFICATION |

## Required source metadata before stronger use

공시를 게임별 모바일 매출로 사용하려면 게임·플랫폼·지역·회계기간의 직접 귀속표가 필요하다. Meta를 성과로 사용하려면 spend, impressions, clicks, conversions, ROAS와 캠페인 종료 이력이 필요하다. YouTube를 게임 간 비교로 사용하려면 channel URL, official status, common snapshot, upload window, Shorts/ads inclusion rule, subscriber context가 필요하다.

## Existing source precedence

기존 39주 MobileIndex rank, NAVER DataLab 4-game common normalized frame, 공개 BM evidence, RE:BOOST logic은 canonical source다. 신규 파일은 이 값을 교체하거나 재계산하는 입력이 아니다.
