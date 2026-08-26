# NAVER DataLab Validation

이 폴더는 대시보드의 기본 검색 관심 차트를 재현·감사하는 큐레이션 자료입니다.

| 자료군 | 역할 |
|---|---|
| `SEARCH_INTEREST_4GAME_LONG.csv` | 4게임 장기 공식명 요청 결과 |
| `SEARCH_INTEREST_4GAME_WIDE.csv` | 기본 39주 4게임 wide 데이터 |
| `SEARCH_INTEREST_4GAME_SUMMARY.csv` | 게임별 KPI 요약 |
| `SEARCH_INTEREST_ALIAS_QA.csv` | 별칭 포함 별도 검증 결과 |
| `SEARCH_INTEREST_RETENTION.csv` | peak 이후 검색 관심 잔존 프록시 |
| `primary_official.json` | 기본 공식명 4게임 raw 응답 |
| `primary_alias.json` | 별칭 포함 별도 raw 응답 |
| `secondary_long_official.json` | 장기 공식명 raw 응답 |
| `*AUDIT.json`, `manifest.json`, source note, discrepancy | 검증 조건·범위·차이 기록 |

기본 차트의 canonical runtime data는 `client/src/data/searchInterestData.ts`에 있으며, 이 폴더의 자료는 연구·검증용 복사본입니다. API credential은 포함하지 않습니다.
