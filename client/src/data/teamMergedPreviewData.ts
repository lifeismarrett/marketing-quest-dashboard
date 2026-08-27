export type TeamMergeClassification = "ADD" | "UPDATE" | "REPLACE CANDIDATE" | "APPENDIX ONLY" | "HOLD";

export const teamMergeEvidenceRule = [
  "PUBLIC EVIDENCE",
  "PERFORMANCE SEPARATION",
  "INTERNAL VALIDATION",
  "DECISION SCOPE",
] as const;

export const teamDataRegister: Array<{
  id: string;
  source: string;
  classification: TeamMergeClassification;
  placement: string;
  scope: string;
}> = [
  {
    id: "nc-half",
    source: "NC 반기보고서 (2026.08.14)",
    classification: "ADD",
    placement: "01 성과 · 04 BM",
    scope: "아이온2 공시의 기업·PC게임 귀속과 로열티 포함 범위를 별도 근거층으로 추가",
  },
  {
    id: "nc-annual",
    source: "NC 사업보고서 (2026.03.18)",
    classification: "UPDATE",
    placement: "00 개요 · 01 성과",
    scope: "아이온2의 PC·모바일 지원 서술과 공시 기간 범위를 비교 조건으로 보완",
  },
  {
    id: "nexon-audit",
    source: "넥슨코리아 감사보고서 (2026.04.10)",
    classification: "APPENDIX ONLY",
    placement: "04 보조 근거",
    scope: "법인 재무 자료이며 메이플스토리M 직접 매출 행은 미확인",
  },
  {
    id: "pearl-half",
    source: "펄어비스 반기보고서 (2026.08.14)",
    classification: "UPDATE",
    placement: "02 경쟁 압력 · 04 BM",
    scope: "검은사막 IP의 PC·콘솔·모바일 범위를 분리하는 scope evidence",
  },
  {
    id: "pearl-annual",
    source: "펄어비스 사업보고서 (2026.03.19)",
    classification: "APPENDIX ONLY",
    placement: "02 보조 근거",
    scope: "검은사막 IP 사업 구조의 보조 원문; 모바일 단일 매출 귀속에는 사용하지 않음",
  },
  {
    id: "meta-workbook",
    source: "Meta 광고 소재 타임라인 workbook",
    classification: "ADD",
    placement: "02 경쟁 압력 · 05 실행 전략",
    scope: "2026-08-26 active-ad capture의 소재 활동 proxy; 광고 성과가 아님",
  },
  {
    id: "youtube-workbook",
    source: "YouTube 영상·조회수 workbook",
    classification: "HOLD",
    placement: "03 부록",
    scope: "채널·공식성·공통 snapshot·Shorts/광고 규칙이 미확정인 표본 dataset",
  },
];

export const platformScopeRows = [
  {
    subject: "아이온2 공시",
    teamData: "연결 기준 · 게임 > PC게임 항목 · PC·모바일 지원 서술",
    mergedReading: "MobileIndex 순위와 직접 병합하지 않는 플랫폼·회계 범위 주석",
    status: "UPDATE" as TeamMergeClassification,
  },
  {
    subject: "검은사막 IP 공시",
    teamData: "PC·콘솔·모바일 사업·플랫폼 범주가 분리됨",
    mergedReading: "검은사막 모바일 직접 매출로 귀속하지 않는 범위 근거",
    status: "UPDATE" as TeamMergeClassification,
  },
  {
    subject: "넥슨코리아 감사",
    teamData: "메이플스토리M 직접 매출 행 미확인",
    mergedReading: "법인 재무 원문은 보조 근거로만 보관",
    status: "APPENDIX ONLY" as TeamMergeClassification,
  },
] as const;

export const teamMergeCards = {
  overview: {
    title: "TEAM MERGE · EVIDENCE REGISTER",
    copy: "7개 팀 입력은 기존 4게임·39주 KPI를 교체하지 않고, 출처·플랫폼·측정 범위를 분리하는 보조 근거층으로 통합했습니다.",
  },
  performance: {
    title: "PLATFORM & ACCOUNTING SCOPE",
    copy: "공시 매출, MobileIndex 상대 순위, 검색 관심은 측정대상·기간·플랫폼이 달라 직접 병합하지 않습니다.",
  },
  battle: {
    title: "UA ACTIVITY SNAPSHOT",
    copy: "Meta 소재 활동은 2026-08-26 active-ad capture의 복기용 proxy입니다. 소재 수는 광고비·노출·전환·성과가 아닙니다.",
  },
  retention: {
    title: "YOUTUBE SAMPLE · HOLD",
    copy: "4개 sheet의 영상·조회수 표본은 채널·공식성·공통 snapshot·Shorts/광고 규칙이 확인되기 전까지 본문 KPI에 사용하지 않습니다.",
  },
  monetization: {
    title: "FILING SCOPE SEPARATION",
    copy: "공시의 기업·사업부문·플랫폼 범위는 공개 상품 구조의 성과나 게임별 모바일 매출을 증명하지 않습니다.",
  },
  strategy: {
    title: "VALIDATION INPUT · NOT A PERFORMANCE KPI",
    copy: "Meta 소재 관측은 활동 복기와 후속 export 요구를 위한 입력입니다. ROAS·광고 우위·매출 효과로 해석하지 않습니다.",
  },
  clear: {
    title: "TEAM MERGE RESULT",
    copy: "신규 자료는 기존 결론을 성과 사실로 바꾸지 않았습니다. 플랫폼·회계·표본 범위를 명확히 해 내부 검증 질문을 더 좁힙니다.",
  },
} as const;

export const metaActivitySnapshot = [
  { game: "메이플M", rows: "8행", timing: "2026-08-20~24 시작", platforms: "확인 7행 평균 5.0" },
  { game: "검은사막", rows: "6행", timing: "2026-07-11~08-04 시작", platforms: "확인 4행 평균 3.0" },
  { game: "마비노기", rows: "3행", timing: "2026-08-05~06 시작", platforms: "확인 3행 평균 5.0" },
  { game: "아이온2", rows: "결과 행 1", timing: "시작일 미확인", platforms: "확인값 없음" },
] as const;

export const teamMergeHoldItems = [
  "공시를 4게임 동일 범위의 모바일 직접 매출로 사용",
  "Meta 소재 수·플랫폼 수를 광고 성과·ROAS·매출 효과로 해석",
  "YouTube 표본의 총합·평균을 게임 간 채널 성과 순위로 사용",
  "YouTube 표본으로 기존 69× 단일 영상 사례를 확인·반박",
] as const;
