# MARKETING QUEST — V2 TEAM DATA

이 폴더는 기존 MARKETING QUEST 발표자료를 덮어쓰지 않고, 팀원이 제공한 재무공시·Meta 광고·YouTube 자료를 별도 evidence layer로 대조한 V2 작업본이다. 기존 dashboard source, runtime data, 39주 DataLab 프레임, 공개 BM 상태, RE:BOOST 로직은 변경하지 않는다.

## Deliverables

| 파일 | 용도 |
|---|---|
| `01_마케팅퀘스트_발표대본_V2_TEAM_DATA.md` / `.pdf` | 기존 13분30초~14분 대본에 신규 자료의 정의·발화 규칙을 추가한 편집 원본과 배포 PDF |
| `02_마케팅퀘스트_Executive_Brief_V2_TEAM_DATA.pdf` | 기존 2페이지 A4 Executive Brief의 V2 scope note·evidence boundary 보강본 |
| `02_마케팅퀘스트_Executive_Brief_V2_TEAM_DATA.typ` | 위 PDF의 편집 가능한 canonical Typst 원본 |
| `03_마케팅퀘스트_QA_DEFENSE_BOOK_V2_TEAM_DATA.md` / `.pdf` | 기존 Q01~Q25·Critical TOP 5를 보존하고 Q26~Q33 신규 자료 방어 문답을 추가한 편집 원본과 배포 PDF |
| `MARKETING_QUEST_V2_HANDOFF.md` | GPT가 저장소 없이도 V1·V2 상태·근거·충돌·검증 범위를 재검토할 수 있는 단일 인수인계 문서 |
| `audit/NEW_DATA_AUDIT.md` | 7개 입력의 추출·재계산·비교 가능성 감사 |
| `audit/CONFLICT_REPORT.md` | 기존 결과와 신규 자료의 충돌·보강·제외 판정 |
| `audit/00-06_DASHBOARD_PATCH_PLAN_V2.md` | 대시보드 섹션별 안전한 V2 패치 계획 |
| `audit/TEAM_INPUT_KEY_FACTS.md` | 원문 근거와 계산 결과의 컴팩션 대비 메모 |
| `report-theme.typ`, `live-dashboard-qr.png` | Executive Brief 재현용 보조 자산 |

## Evidence rule

> **공개 확인 → 실제 성과와 분리 → 내부 검증 → 판단 범위**

공시의 기업·사업부문·플랫폼 매출, Meta 소재 행·시작일, YouTube 제공 표본은 기록된 범위만 사용한다. Meta는 `UA ACTIVITY SNAPSHOT` 소재 활동 관측 proxy로, YouTube는 Appendix 표본 기술통계로만 사용한다. 공시 숫자를 게임별 모바일 매출로 환산하지 않으며, 소재 수·조회수를 ROAS·매출·유저 획득 효과로 해석하지 않는다. Meta 재사용 수 `14.5`는 정의 문제로 NEEDS VERIFICATION 처리했다.

## Reproducibility

원본 입력은 이 저장소에 복사하지 않고 사용자 제공 workspace에서 관리한다. 재현 시 동일 파일명·해시·수집시점을 기록하고, 공시 원문은 회사·플랫폼·지역·사업부문 범위를 먼저 확정한다. YouTube는 채널 URL·공식성·동일 snapshot·Shorts/광고 포함 규칙을 고정한 뒤에만 비교표에 사용할 수 있다.
