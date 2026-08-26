# Repository Organization Audit

## Scope

이번 정리는 실행 소스와 runtime data를 보존한 상태에서 발표·조사·검증 자료의 탐색성을 높이는 포트폴리오 정리입니다. `client/src/data/`의 import 경로와 `client/`, `server/`, `shared/`, `patches/`, 빌드·타입 설정은 변경하지 않았습니다.

## BEFORE TREE

```text
client/  server/  shared/  patches/  scripts/
docs/  README.md  ideas.md  todo.md
package.json  pnpm-lock.yaml  components.json  template.json
tsconfig.json  tsconfig.node.json  vite.config.ts
```

## AFTER TREE

```text
client/  server/  shared/  patches/  scripts/
docs/
├── README.md
├── PROJECT_OVERVIEW.md
├── DATA_DICTIONARY.md
├── EVIDENCE_BOUNDARY.md
├── DEPLOYMENT_GUIDE.md
├── REPOSITORY_ORGANIZATION_AUDIT.md
├── INPUT_AUDIT.md
├── archive/todo-history.md
└── data/                         # runtime과 분리된 기존 canonical 산출물
presentation/
├── README.md
└── 02_마케팅퀘스트_임원용_핵심요약_최종본.pdf
research/
├── README.md
├── datalab/
├── competitor-benchmark/
├── bm-research/
└── source-notes/
preview/
├── README.md
└── 01_overview.png … 06_quest_clear.png
```

## CREATED

`presentation/`, `research/`, `preview/`와 하위 README를 생성했습니다. `docs/PROJECT_OVERVIEW.md`, `docs/DATA_DICTIONARY.md`, `docs/EVIDENCE_BOUNDARY.md`, `docs/DEPLOYMENT_GUIDE.md`, `docs/README.md` 및 이 감사 문서를 생성했습니다. 공개 대시보드에서 동일 desktop presentation viewport로 대표 PNG 6장을 캡처해 `preview/`에 배치했습니다.

## MOVED / COPIED

실제 존재한 Executive Brief PDF만 `presentation/02_마케팅퀘스트_임원용_핵심요약_최종본.pdf`로 복사했습니다. DataLab은 최종 4게임 long/wide/summary, 별칭 QA, retention, 감사 JSON, raw JSON, source note와 discrepancy만 `research/datalab/`에 선별 복사했습니다. 공개 BM 근거 문서만 `research/bm-research/`에 선별 복사했습니다. 완료된 `todo.md`는 삭제하지 않고 `docs/archive/todo-history.md`로 이동했습니다.

발표 대본 PDF와 Q&A PDF는 workspace에 없었으므로 생성하지 않았고 `presentation/README.md`에 MISSING FILE로 기록했습니다. 중복 ZIP, 브라우저 cache/cookie, 배포 bundle/html/log와 세션 체크리스트는 GitHub에 추가하지 않았습니다.

## KEPT

`client/`, `server/`, `shared/`, `patches/`, `package.json`, `pnpm-lock.yaml`, `components.json`, `template.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `scripts/`, `client/src/data/`, `ideas.md`와 기존 `docs/` 검증 문서는 실행 안정성과 근거 추적성을 위해 보존했습니다. `client/public/__manus__/debug-collector.js`도 삭제하지 않았습니다. production runtime·Manus deployment 연계 가능성을 확인 없이 제거하지 않는 원칙을 적용했습니다.

## ARCHIVE / REMOVE CANDIDATES

`docs/archive/todo-history.md`는 완료된 작업 기록의 보관 위치입니다. Downloads에 남아 있는 전달용 ZIP, 중간 검증 bundle/html/log, 세션 전용 `todo-0zpndffl.md`는 저장소에 포함하지 않는 REMOVE CANDIDATE/EXCLUDE입니다. 자동 삭제하지 않았습니다.

## SECURITY AUDIT

**PASS.** 현재 tree와 Git history에서 credential-like path, `.env`, private key, ZIP/log/database/credential 파일을 확인하지 못했습니다. credential 값은 출력하거나 문서에 기록하지 않았습니다. `collect_search_interest_validation.py`의 저장소 밖 credential 입력 의존성은 유지하되, credential 자체는 저장소에 없습니다.

`.gitignore`에는 `**/node_modules`, build output, `.env.*`, `.env.example` 예외, Python cache, virtualenv, 로그, `todo-*.md`를 포함했습니다.

## BUILD

| 단계 | 결과 |
|---|---|
| `pnpm install --frozen-lockfile` | PASS |
| `pnpm run check` | PASS |
| `pnpm run build` | PASS |

pnpm 10.4.1은 `package.json`의 legacy `pnpm` field가 무시된다는 경고를 출력했지만 lockfile에는 wouter patch reference가 존재했고, install·typecheck·build는 통과했습니다. 이 경고를 해결하기 위한 별도 설정 리팩터링은 실행 구조 보존 원칙에 따라 이번 정리에서 수행하지 않았습니다.

## LIVE DASHBOARD

**NO REGRESSION OBSERVED.** 공개 URL에서 Overview, Performance, Battle Console, Retention, Monetization Funnel, Strategy Quest, Quest Clear를 실제 브라우저로 확인했습니다. 공개 배포 파일은 이번 저장소 정리로 수정하지 않았습니다.

Live URL: https://mktquestdash-kfhuh6sd.manus.space/

## GITHUB

정리된 working tree를 마지막으로 확인한 후 `Organize final MARKETING QUEST portfolio materials` 메시지로 commit/push합니다. push 이후 최종 repository URL과 commit hash를 이 문서의 후속 기록 또는 최종 보고에 반영합니다.
