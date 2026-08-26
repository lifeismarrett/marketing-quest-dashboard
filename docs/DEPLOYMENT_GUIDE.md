# Deployment Guide

## Canonical source

실행 진입점은 Vite 기반 `client/`와 프로덕션 서버 `server/index.ts`입니다. 런타임 데이터는 `client/src/data/`에 보존하며, 이 경로를 `research/`로 이동하지 않습니다. `docs/data/`와 `research/datalab/`은 검증·재현 자료이고 앱 런타임 import 경로가 아닙니다.

## Local commands

`package.json`에 정의된 명령만 사용합니다.

```bash
pnpm install
pnpm run check
pnpm run build
pnpm start
```

`pnpm run check`는 TypeScript 검사이며, `pnpm run build`는 Vite 클라이언트와 `server/index.ts`를 함께 빌드합니다.

## Live Dashboard

[https://mktquestdash-kfhuh6sd.manus.space/](https://mktquestdash-kfhuh6sd.manus.space/)

Manus와 연결된 원본 프로젝트의 배포 흐름을 사용하며, 소스 정리만으로 공개 배포 파일을 직접 수정하지 않습니다.

## RE:BOOST 표시 규칙

RE:BOOST는 메이플스토리M 이벤트입니다. `ALL`·4사 통합·메이플M 단독 차트에서는 표시하고, 검은사막 모바일·마비노기 모바일·아이온2 단독 차트에서는 표시하지 않습니다. 이 규칙과 차트 데이터는 정리 작업에서 변경하지 않습니다.

## Post-organization QA

정리 전후에 `pnpm install`, `pnpm run check`, `pnpm run build`를 실행합니다. 이후 Overview, Performance, Battle Console, Retention, Monetization Funnel, Strategy Quest, Quest Clear를 공개 URL에서 확인합니다. Performance에서는 네 게임 공통 검색 관심 프레임과 RE:BOOST 필터 규칙을, Retention에서는 관측 범위 밖 값의 비보간을, Monetization Funnel에서는 공개 BM과 실제 성과의 분리를 확인합니다.
