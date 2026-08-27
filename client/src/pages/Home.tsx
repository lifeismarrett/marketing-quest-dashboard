/**
 * Quest Console Atelier style: a presentation-first strategy board, not a generic admin dashboard.
 * It keeps analytical surfaces light, uses navy for command states, and reserves ember gold for progress and insight.
 */
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, ArrowUpRight, CalendarDays, Check, CircleDot, Compass, ExternalLink, Flag, Gamepad2, Layers3, Play, ShieldCheck, Sparkles, Swords, Target, TrendingUp, Users, X } from "lucide-react";
import { QuestChrome, type QuestSection } from "@/components/QuestChrome";
import { RankTrendChart, SearchInterestChart, type GameName, type RankMetric } from "@/components/QuestCharts";
import { battleCases, verifiedEvents } from "@/data/dashboardData";
import { evidenceMeta, funnelStages, monetizationRows, type EvidenceStatus } from "@/data/monetizationData";
import { SEARCH_INTEREST_GAMES, SEARCH_INTEREST_RETENTION, SEARCH_INTEREST_SUMMARY } from "@/data/searchInterestData";

const sections: QuestSection[] = ["home", "performance", "battle", "retention", "monetization", "strategy", "clear"];
const games: GameName[] = ["ALL", "메이플스토리M", "검은사막 모바일", "마비노기 모바일", "아이온2"];

const battleComparisons: Array<{
  id: string;
  title: string;
  games: Array<Exclude<GameName, "ALL">>;
  opponent?: Exclude<GameName, "ALL" | "메이플스토리M">;
  showReboost: boolean;
}> = [
  { id: "all", title: "01 · 4사 통합", games: ["메이플스토리M", "검은사막 모바일", "마비노기 모바일", "아이온2"], showReboost: true },
  { id: "bdm", title: "02 · 메이플M vs 검은사막M", games: ["메이플스토리M", "검은사막 모바일"], opponent: "검은사막 모바일", showReboost: false },
  { id: "aion", title: "03 · 메이플M vs 아이온2", games: ["메이플스토리M", "아이온2"], opponent: "아이온2", showReboost: false },
  { id: "mab", title: "04 · 메이플M vs 마비노기M", games: ["메이플스토리M", "마비노기 모바일"], opponent: "마비노기 모바일", showReboost: false },
];

const notes: Record<QuestSection, string[]> = {
  home: ["발표의 질문을 먼저 고정합니다: 경쟁 압력 속에서 무엇을 실행할 것인가.", "최종 PPT의 수치와 해석을 기준으로, 원시 데이터는 탐색 근거로만 사용합니다."],
  performance: ["순위 축은 역방향입니다. 선이 위로 갈수록 더 좋은 순위입니다.", "RE:BOOST 구간의 동시 반등은 타이밍 정렬이며, 직접 인과로 표현하지 않습니다."],
  battle: ["상대 탭을 바꾸면 검증된 이벤트 타이밍과 순위 움직임을 같이 볼 수 있습니다.", "동반·상극은 사건의 결과가 아니라 관측된 연관 움직임입니다."],
  retention: ["성장지원과 콘텐츠추가는 메이플M의 강점, IP 콜라보와 상시복귀지원은 공백으로 연결됩니다.", "잔존율은 검색 관심의 상대적 프록시이며 이용자 리텐션 자체가 아닙니다."],
  monetization: ["공개 상점·공지에서 확인되는 상품 구조만 결제 구간별로 읽습니다.", "전환·반복 구매·고가치 결제 성과는 비공개이므로 내부 결제 데이터로 최종 검증이 필요합니다."],
  strategy: ["네 개 퀘스트는 동시에 밀어붙이지 않고 리소스 제약 아래 단계화합니다.", "각 퀘스트의 KPI는 인과가 아닌 관리·검증 지표임을 강조합니다."],
  clear: ["마지막 메시지는 단일 이벤트의 성공이 아니라, 정례 업데이트와 공백 최소화 체계입니다.", "성장지원형 자산과 높은 평점 신뢰도를 다음 실행의 기반으로 사용합니다."],
};

const retentionRows = [
  ["성장지원형", "하이퍼버닝", "—", "레벨 85 → 100", "—"],
  ["콘텐츠추가형", "렌 등", "세라핌 등", "기사 등", "권성 등"],
  ["IP 콜라보형", "—", "붉은사막 (자사)", "산리오", "프로미스나인"],
  ["상시복귀지원형", "—", "—", "—", "새싹뱃지 (28일 미접속 보상)"],
];

type SearchGame = Exclude<GameName, "ALL">;
const searchInterestGames = SEARCH_INTEREST_GAMES as unknown as Array<{ game: SearchGame; short: string; color: string }>;
const retentionCurve = SEARCH_INTEREST_RETENTION as unknown as Array<{ stage: string } & Partial<Record<SearchGame, number | null>>>;
const searchInterestSummary = SEARCH_INTEREST_SUMMARY as unknown as Array<{
  game: SearchGame;
  peak: number;
  peakWeek: string;
  first4: number;
  recent4: number;
  firstToRecentChange: number;
  postPeakRetention: number;
  weeksFromPeakToObservedEnd: number;
}>;
const mapleSearchSummary = searchInterestSummary.find((item) => item.game === "메이플스토리M")!;

function retentionLegend(game: SearchGame) {
  const summary = searchInterestSummary.find((item) => item.game === game)!;
  return `종료 +${summary.weeksFromPeakToObservedEnd}주 ${summary.postPeakRetention.toFixed(1)}%`;
}

const revenueFindings = [
  { index: "01", title: "경쟁사 우위 매출 요소", copy: "멤버십·패스·월간/반복형 패키지와 누적·연속 혜택은 공개 BM 구조에서 확인되는 반복 구매 후보입니다.", status: "confirmed" as EvidenceStatus },
  { index: "02", title: "결제 유도 방식", copy: "입문 가격·기간 한정·성장 패키지 등은 유저 단계에 맞춘 공개 상품 구조입니다. 시장 반응은 보조 관측 신호로만 해석합니다.", status: "observed" as EvidenceStatus },
  { index: "03", title: "신규·복귀 → 첫 결제 전환", copy: "신규·복귀 및 초기 성장 상품 구조는 첫 결제 구간의 벤치마킹 후보입니다. 실제 전환율과 구매자 수는 공개 확인 불가입니다.", status: "private" as EvidenceStatus },
  { index: "04", title: "반복·고가치 결제 확대", copy: "멤버십·패스·월간 패키지와 프리미엄·성장·코스메틱 선택 구조를 구분해 내부 구매 데이터를 통해 검증할 필요가 있습니다.", status: "private" as EvidenceStatus },
  { index: "05", title: "메이플M 벤치마킹 우선순위", copy: "IP 콜라보와 상시복귀지원 공백, 공개 BM 구조를 함께 검토하되 실제 매출 효과는 내부 결제 데이터 확인 후 최종 판단합니다.", status: "confirmed" as EvidenceStatus },
] as const;

const strategyQuests = [
  { id: "q1", index: "QUEST 01", title: "IP · 브랜드 콜라보 확대", why: "동일 시기 콜라보 대비 화제성 격차가 확인된 공백을 보완합니다.", how: ["잠재 IP 롱리스트 작성", "파트너십 리드타임 산정", "티저·쇼케이스 확장 시점에 런칭"], risk: "디자인 보호·협상 리드타임·현장 운영 이슈", kpi: ["콜라보 주간 YouTube 조회수", "검색 관심 점유율 변화", "커뮤니티 ‘복귀’ 언급량"], color: "purple", horizon: "중기 · 1분기" },
  { id: "q2", index: "QUEST 02", title: "상시 복귀지원 시스템 신설", why: "이벤트 타이밍과 무관한 안정적 복귀 채널을 확보합니다.", how: ["미접속 기준일(N일) 설계", "성장지원과 중복·시너지 검토", "소규모 테스트 후 확대"], risk: "보상 수준이 높으면 신규 유입 대비 왜곡", kpi: ["미접속 유저 재접속 전환율", "재접속 유저 D+7 잔존율", "‘복귀’ 언급량 변화"], color: "green", horizon: "장기 · 반기" },
  { id: "q3", index: "QUEST 03", title: "시스템 리마스터 검토", why: "장수 서비스의 구조적 화제성을 정례 업데이트 체계로 전환합니다.", how: ["개발 리드타임 검토", "완료 기념 쇼케이스 설계", "단계적 개편 로드맵 공개"], risk: "개발 리드타임과 소규모 콘텐츠 공백", kpi: ["장기 서비스 안정성", "스토어 평점 4.6 유지 여부"], color: "blue", horizon: "중장기 · 1년+" },
  { id: "q4", index: "QUEST 04", title: "이벤트 타이밍 관리 체계", why: "경쟁사 대형 이벤트와 충돌하는 구간의 경쟁 압력을 선제 관리합니다.", how: ["4사 캘린더 상시 갱신", "자사 일정과 자동 대조", "Low/Mid/High 압력 등급", "날짜 조정·화제성 보강·모니터링 선택"], risk: "경쟁사 일정의 변동성과 데이터 갱신 지연", kpi: ["캘린더 갱신 주기 준수율", "압력 단계 대응 건수"], color: "gold", horizon: "단기 · 1개월" },
];

function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return <div className="section-eyebrow"><span>{index}</span>{label}</div>;
}

function MetricPill({ label, value, detail, tone = "gold" }: { label: string; value: string; detail: string; tone?: string }) {
  return (
    <div className={`metric-pill ${tone}`}>
      <span>{label}</span>
      <b>{value}</b>
      <small>{detail}</small>
    </div>
  );
}

function MiniLine({ label, children, tone = "gold" }: { label: string; children: React.ReactNode; tone?: string }) {
  return <div className={`mini-line ${tone}`}><span>{label}</span><strong>{children}</strong></div>;
}

function EvidenceBadge({ status }: { status: EvidenceStatus }) {
  return <span className={`evidence-badge ${status}`}>[{evidenceMeta[status].label}]</span>;
}

function sectionFromQuery(): QuestSection {
  const requested = new URLSearchParams(window.location.search).get("section") as QuestSection | null;
  return requested && sections.includes(requested) ? requested : "home";
}

export default function Home() {
  const [active, setActive] = useState<QuestSection>(sectionFromQuery);
  const [presenterMode, setPresenterMode] = useState(false);
  const [performanceMetric, setPerformanceMetric] = useState<"revenue" | "users" | "search">("revenue");
  const [performanceGame, setPerformanceGame] = useState<GameName>("ALL");
  const [battleMetric, setBattleMetric] = useState<RankMetric>("revenue");
  const [eventOnly, setEventOnly] = useState(false);
  const [activeCase, setActiveCase] = useState("case-aion-reboost");
  const [activeQuest, setActiveQuest] = useState("q1");

  const currentQuest = strategyQuests.find((item) => item.id === activeQuest) ?? strategyQuests[0];
  const selectedCase = battleCases.find((item) => item.id === activeCase) ?? battleCases[0];
  const nearbyEvents = useMemo(() => verifiedEvents.filter((event) => event.major).slice(-8), []);
  const primaryEvidence = performanceMetric === "revenue"
    ? { label: "RE:BOOST IMPACT", before: "87", after: "34", suffix: "위", detail: "게임(매출) 순위 53단계 개선", foot: "2026.07.16–07.31 · 사전등록~출시" }
    : performanceMetric === "users"
      ? { label: "USER RANK IMPACT", before: "69", after: "33", suffix: "위", detail: "이용자수 순위 36단계 개선", foot: "2026.07.16–07.31 · 사전등록~출시" }
      : { label: "SEARCH INTEREST PEAK", before: mapleSearchSummary.peak.toFixed(2), after: "", suffix: "", detail: "상대지수 · 4게임 공통 최대 100 기준", foot: `NAVER DATALAB · ${mapleSearchSummary.peakWeek} · 최근 4주 상대지수 ${mapleSearchSummary.firstToRecentChange >= 0 ? "+" : ""}${mapleSearchSummary.firstToRecentChange.toFixed(1)}%` };

  const changeSection = (next: QuestSection) => setActive(next);
  const moveSection = (direction: number) => {
    const index = sections.indexOf(active);
    const nextIndex = (index + direction + sections.length) % sections.length;
    setActive(sections[nextIndex]);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") moveSection(-1);
      if (event.key === "ArrowRight") moveSection(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    const resetToSectionStart = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.querySelector<HTMLElement>(".presentation-stage")?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
    requestAnimationFrame(resetToSectionStart);
  }, [active]);

  return (
    <QuestChrome
      activeSection={active}
      onSectionChange={changeSection}
      onPrevious={() => moveSection(-1)}
      onNext={() => moveSection(1)}
      presenterMode={presenterMode}
      onPresenterModeChange={setPresenterMode}
      note={notes[active]}
    >
      {active === "home" && (
        <section className="stage-section mission-section">
          <img className="mission-bg" src="/manus-storage/marketing-quest-hero_afbd5ac2.png" alt="" aria-hidden="true" />
          <img className="mission-ring" src="/manus-storage/magic_circle_gold_55178ddb.png" alt="" aria-hidden="true" />
          <div className="mission-main">
            <SectionEyebrow index="00" label="MISSION BRIEFING" />
            <div className="mission-kicker">MARKETING QUEST</div>
            <h1>메이플스토리M<br /><em>경쟁 벤치마킹</em> 대시보드</h1>
            <p className="mission-copy">경쟁 MMORPG 3종의 이벤트, 마켓 순위, 채널 반응과 리텐션 후킹을 연결해 <b>다음 마케팅 퀘스트</b>를 도출합니다.</p>
            <Button className="start-quest" onClick={() => setActive("performance")}><Play size={15} fill="currentColor" /> START QUEST</Button>
          </div>
          <div className="mission-side">
            <div className="roster-card">
              <div className="roster-head"><span>PARTY ROSTER</span><ShieldCheck size={17} /></div>
              {["메이플스토리M · TARGET", "검은사막 모바일 · COMPETITOR", "마비노기 모바일 · COMPETITOR", "아이온2 · COMPETITOR"].map((item, index) => (
                <div className={`roster-row roster-${index}`} key={item}><i>{String(index + 1).padStart(2, "0")}</i><b>{item}</b></div>
              ))}
            </div>
            <div className="trust-card">
              <div><CircleDot size={15} /><b>DATA TRUST</b></div>
              <p>이벤트·케이스는 자체 리서치 이중검증, 마켓 순위는 39주 실측 기준. 해석은 상관과 인과를 구분합니다.</p>
            </div>
          </div>
          <div className="mission-stats">
            <MetricPill label="COMPARISON" value="4 GAMES" detail="메이플M + 경쟁작 3종" />
            <MetricPill label="OBSERVATION" value="39 WEEKS" detail="매출·이용자수 순위" tone="navy" />
            <MetricPill label="MAJOR EVENTS" value="32 CASES" detail="분석 대상 대형 이벤트" tone="green" />
            <MetricPill label="COMPETITIVE CASES" value="3 CASES" detail="핵심 경쟁 압력 사례" tone="purple" />
          </div>
        </section>
      )}

      {active === "performance" && (
        <section className="stage-section performance-section">
          <div className="section-title-row">
            <div>
              <SectionEyebrow index="01" label="PERFORMANCE" />
              <h2>{performanceMetric === "search" ? "4사 검색 관심을 동일 기준으로 비교합니다" : "RE:BOOST 이후 매출 순위 반등이 확인됨"}</h2>
              <p>{performanceMetric === "search" ? "동일 주간·단일 공통 정규화 프레임에서 시장 반응 신호를 교차 확인합니다." : "검색 관심과 순위 변화를 함께 읽어, 39주 관측 중 가장 큰 개선 구간을 확인합니다."}</p>
            </div>
            <div className="section-flag"><TrendingUp size={17} /><span>{performanceMetric === "search" ? "SEARCH SIGNAL" : "RE:BOOST SIGNAL"}</span></div>
          </div>
          <div className="control-row">
            <Tabs value={performanceMetric} onValueChange={(value) => { const nextMetric = value as typeof performanceMetric; setPerformanceMetric(nextMetric); if (nextMetric === "search") setPerformanceGame("ALL"); }}>
              <TabsList className="quest-tabs">
                <TabsTrigger value="revenue">매출 순위</TabsTrigger>
                <TabsTrigger value="users">이용자수 순위</TabsTrigger>
                <TabsTrigger value="search">검색 관심</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="game-filter" aria-label="게임 필터">
              {games.map((game) => <button key={game} className={performanceGame === game ? "selected" : ""} onClick={() => setPerformanceGame(game)}>{game === "ALL" ? "ALL" : game.replace(" 모바일", "M").replace("메이플스토리M", "메이플M")}</button>)}
              {performanceMetric === "search" && <span className="filter-context">검색 관심 상대지수: 4게임 · 주간 · 공통 최대 100</span>}
            </div>
          </div>
          <div className={`performance-grid ${performanceMetric === "search" ? "is-search-mode" : ""}`}>
            <div className={`main-chart-card ${performanceMetric === "search" ? "search-chart-card" : ""}`}>
              {performanceMetric === "search" ? <SearchInterestChart game={performanceGame} chartHeight={218} /> : <RankTrendChart metric={performanceMetric} game={performanceGame} />}
            </div>
            <aside className="performance-insights">
              <div className="impact-card">
                <span className="eyebrow">{primaryEvidence.label}</span>
                {performanceMetric === "search" && <span className="impact-context">상대지수 · 공통 최대 100</span>}
                {performanceMetric !== "search" && performanceGame !== "ALL" && performanceGame !== "메이플스토리M" && <span className="impact-context">MAPLE M BASELINE</span>}
                <div className={`impact-number ${performanceMetric === "search" ? "search-signal" : ""}`}><b>{primaryEvidence.before}</b>{primaryEvidence.after && <><ArrowUpRight size={25} /><b>{primaryEvidence.after}</b><small>{primaryEvidence.suffix}</small></>}</div>
                <p>{primaryEvidence.detail}</p>
                <div className="impact-foot">{primaryEvidence.foot}</div>
              </div>
              <MiniLine label="SEARCH PEAK" tone="gold">{mapleSearchSummary.peak.toFixed(2)} <small>{mapleSearchSummary.peakWeek}</small></MiniLine>
              <MiniLine label="USER RANK" tone="blue">69 → 33위 <small>36단계 개선</small></MiniLine>
              <MiniLine label="BEST REVENUE RANK" tone="green">21위 <small>2026.08.03</small></MiniLine>
              <div className="caution-box"><AlertTriangle size={15} /><span>검색·콘텐츠·뉴스의 동시 반등은 <b>시기적 동행</b>이며 직접 인과로 단정하지 않습니다.</span></div>
            </aside>
          </div>
          <div className="channel-strip">
            <span className="strip-label">CHANNEL CROSS-CHECK</span>
            <MiniLine label="NAVER DATALAB" tone="gold">{mapleSearchSummary.first4.toFixed(2)} → {mapleSearchSummary.recent4.toFixed(2)} <small>상대지수 · 최근 4주 {mapleSearchSummary.firstToRecentChange >= 0 ? "+" : ""}{mapleSearchSummary.firstToRecentChange.toFixed(1)}%</small></MiniLine>
            <MiniLine label="OFFICIAL YOUTUBE" tone="blue">128편 <small>중앙값 32,148회</small></MiniLine>
            <MiniLine label="BIGKinds NEWS" tone="purple">85건 <small>원자료 396건 중 21.5%</small></MiniLine>
            <MiniLine label="MARKET RESPONSE" tone="green">TOP 30 <small>2026.08.10 · 29위</small></MiniLine>
          </div>
        </section>
      )}

      {active === "battle" && (
        <section className="stage-section battle-section">
          <img className="battle-wreath" src="/manus-storage/graph_vs_wreath_6ef46ce4.png" alt="" aria-hidden="true" />
          <div className="section-title-row">
            <div><SectionEyebrow index="02" label="COMPETITOR BATTLE" /><h2>동시 이벤트 구간은 선제 관리 대상</h2><p>동일 구간의 이벤트와 순위 움직임을 대조합니다. 직접 인과가 아닌 연관 움직임으로 해석합니다.</p></div>
            <div className="battle-stamp"><Swords size={18} /> VS</div>
          </div>
          <div className="battle-controls">
            <div className="battle-board-caption"><span>FOUR-CHART COMPARISON</span><b>공통 기간 · 공통 순위 축</b><small>경쟁 압력 → 사례 → 대응 가설</small></div>
            <div className="battle-toggle-group">
              <button className={battleMetric === "revenue" ? "selected" : ""} onClick={() => setBattleMetric("revenue")}>게임 순위</button>
              <button className={battleMetric === "users" ? "selected" : ""} onClick={() => setBattleMetric("users")}>이용자수</button>
              <button className={eventOnly ? "selected" : ""} onClick={() => setEventOnly(!eventOnly)}><CalendarDays size={13} /> 이벤트 사례만</button>
            </div>
          </div>
          <div className="battle-board" aria-label="메이플스토리M 경쟁사 4개 비교 차트">
            {battleComparisons.map((comparison) => {
              const comparisonCase = comparison.opponent ? battleCases.find((item) => item.opponent === comparison.opponent) : battleCases.find((item) => item.id === "case-aion-reboost");
              const isActive = comparisonCase?.id === selectedCase.id;
              return (
                <article
                  className={`battle-chart-card comparison-card ${isActive ? "is-active" : ""}`}
                  key={comparison.id}
                  tabIndex={0}
                  onClick={() => comparisonCase && setActiveCase(comparisonCase.id)}
                  onFocus={() => comparisonCase && setActiveCase(comparisonCase.id)}
                >
                  <header className="comparison-card-head"><span>{comparison.title}</span><small>{comparison.id === "all" ? "4 GAMES" : "1:1 MATCH"}</small></header>
                  <RankTrendChart metric={battleMetric} games={comparison.games} compact showReboost={comparison.showReboost} chartHeight={188} />
                </article>
              );
            })}
          </div>
          <section className={`case-brief ${eventOnly ? "event-only" : ""}`} aria-label="이벤트 사례 브리프">
            <div className="case-brief-head"><span>EVENT CASE BRIEF</span><b>{eventOnly ? "이벤트 사례 집중" : "동반 / 상극"}</b></div>
            <div className="case-brief-list">
              {battleCases.map((item) => <button key={item.id} onClick={() => setActiveCase(item.id)} className={selectedCase.id === item.id ? "is-selected" : ""}><span>{item.date}</span><b>{item.outcome}</b><small><i>메이플M</i>{item.mapleEvent}</small></button>)}
            </div>
            <div className="case-brief-detail"><span className={`outcome-badge ${selectedCase.outcome}`}>{selectedCase.outcome}</span><b>{selectedCase.mapleEvent}</b><i>MAPLE M ↔ {selectedCase.opponentEvent}</i><p>{selectedCase.detail}</p></div>
            {eventOnly && <div className="case-event-strip">{nearbyEvents.slice(-5).map((event) => <span key={event.id}><b>{event.date?.slice(5, 10)}</b>{event.name}</span>)}</div>}
          </section>
          <div className="collision-callout"><Compass size={17} /><b>4사 캘린더 대조</b><span>이벤트 일정을 정기 갱신하고, 같은 기간 경쟁사 이벤트의 수·규모로 Low / Mid / High 경쟁 압력을 판단합니다.</span><button onClick={() => setActive("strategy")}>대응 퀘스트 보기 <ArrowUpRight size={14} /></button></div>
        </section>
      )}

      {active === "retention" && (
        <section className="stage-section retention-section">
          <div className="section-title-row">
            <div><SectionEyebrow index="03" label="RETENTION" /><h2>성장지원은 강점, 복귀·콜라보는 공백</h2><p>후킹 유형의 보유 격차와 화제성·평판·검색 관심 프록시를 한 화면에서 비교합니다.</p></div>
            <div className="section-flag"><Layers3 size={17} /><span>SKILL BOOK · 4 TYPES</span></div>
          </div>
          <div className="retention-grid">
            <div className="hooking-card">
              <div className="card-header"><span className="eyebrow">HOOKING MATRIX</span><h3>후킹 유형 보유 현황</h3></div>
              <div className="hooking-matrix">
                <div className="matrix-cell header">후킹유형</div><div className="matrix-cell header maple">메이플스토리M</div><div className="matrix-cell header">검은사막 모바일</div><div className="matrix-cell header">마비노기 모바일</div><div className="matrix-cell header">아이온2</div>
                {retentionRows.flatMap((row) => row.map((value, index) => <div key={`${row[0]}-${index}`} className={`matrix-cell ${index === 1 ? "maple" : ""} ${value === "—" ? "empty" : ""}`}>{value}</div>))}
              </div>
              <div className="ownership-row"><span>보유 개수 (4개 유형 중)</span><b className="maple">메이플M 2</b><b className="bdm">검은사막M 2</b><b className="mab">마비노기M 3</b><b className="aion">아이온2 3</b></div>
            </div>
            <div className="retention-side">
              <div className="collab-gap-card"><span className="eyebrow">SINGLE VIDEO CASE</span><h3>화제성 격차의 핵심</h3><div><b>69×</b><span>동일 시기 YouTube 조회수 격차<br />마비노기 모바일 산리오 사례 대비</span></div><p>동일 주 공식 YouTube 단일 영상 비교 사례입니다.<br />채널 전체 성과 또는 매출 효과를 의미하지 않습니다.</p></div>
              <div className="return-card"><span className="eyebrow">ALWAYS-ON RETURN</span><h3>아이온2의 새싹뱃지</h3><p>28일 미접속 후 자동 보상. 이벤트 타이밍과 무관하게 복귀 채널을 유지합니다.</p></div>
            </div>
          </div>
            <div className="retention-chart-card wide-retention-chart">
            <div className="card-header"><span className="eyebrow">SEARCH INTEREST PROXY</span><h3>Peak 이후 검색 관심 잔존 프록시</h3><span className="proxy-note">실제 사용자 리텐션 아님 · 자체 peak 대비 · 4주 간격</span></div>
            <div className="retention-svg-wrap">
              <svg className="retention-svg" viewBox="0 0 570 194" role="img" aria-label="게임별 peak 이후 검색 관심 잔존율 추이">
                {[0, 20, 40, 60, 80, 100].map((tick) => <g key={tick}><line x1="44" x2="556" y1={171 - tick * 1.34} y2={171 - tick * 1.34} stroke="#E5DED3" /><text x="28" y={175 - tick * 1.34} fill="#86808A" fontSize="10">{tick}</text></g>)}
                {searchInterestGames.map(({ game, color }) => {
                  let contiguous = false;
                  const path = retentionCurve.map((point, index) => {
                    const value = point[game];
                    if (typeof value !== "number") { contiguous = false; return ""; }
                    const command = contiguous ? "L" : "M";
                    contiguous = true;
                    return `${command}${58 + index * 92},${171 - value * 1.34}`;
                  }).join(" ");
                  return <g key={game}><path d={path} fill="none" stroke={color} strokeWidth={game === "메이플스토리M" ? 3 : 2.2} />{retentionCurve.map((point, index) => typeof point[game] === "number" ? <circle key={`${game}-${point.stage}`} cx={58 + index * 92} cy={171 - Number(point[game]) * 1.34} r="2.8" fill={color} /> : null)}</g>;
                })}
                {retentionCurve.map((point, index) => <text key={point.stage} x={58 + index * 92} y="191" textAnchor="middle" fill="#86808A" fontSize="11">{point.stage}</text>)}
              </svg>
            </div>
            <div className="retention-legend">{searchInterestGames.map(({ game, short, color }) => <span key={game} style={{ "--retention-color": color } as React.CSSProperties}>{short} {retentionLegend(game)}</span>)}</div>
            <p className="retention-scope-note">검색 관심 프록시 · 실제 사용자 리텐션 아님 · M0=peak · M1~M5=각 +4주 · 종료%=마지막 관측치(보간 없음)</p>
          </div>
          <div className="store-card">
            <div className="store-summary"><span className="eyebrow">STORE REPUTATION</span><h3>평점 · 리뷰 규모 · 만족도 기반 잔존 신호</h3></div>
            <div className="store-table"><span>게임</span><span>GP 평점</span><span>GP 리뷰 수</span><span>앱스토어 평점</span><span>앱스토어 리뷰 수</span><b className="maple">메이플스토리M</b><b className="maple">4.6</b><b className="maple">18.8만</b><b className="maple">4.4</b><b className="maple">13.0만</b><b>검은사막 모바일</b><b>4.4</b><b>21.6만</b><b>4.2</b><b>6.0만</b><b>마비노기 모바일</b><b>2.8</b><b>3.6만</b><b>3.3</b><b>0.83만</b><b>아이온2</b><b>2.9</b><b>0.7만</b><b>3.1</b><b>0.19만</b></div>
          </div>
        </section>
      )}

      {active === "monetization" && (
        <section className="stage-section monetization-section">
          <div className="section-title-row">
            <div><SectionEyebrow index="04" label="MONETIZATION FUNNEL" /><h2>공개 BM 구조로 벤치마킹 후보를 정리합니다</h2><p>공식 상점·공지만으로 확인 가능한 상품 구조를 비교합니다. 시장 반응은 관측 신호이며 결제 성과의 직접 증거가 아닙니다.</p></div>
            <div className="section-flag"><CircleDot size={17} /><span>PUBLIC EVIDENCE FRAME</span></div>
          </div>
          <div className="evidence-legend" aria-label="BM 증거 상태 기준">
            {(Object.keys(evidenceMeta) as EvidenceStatus[]).map((status) => <span key={status}><EvidenceBadge status={status} /> {evidenceMeta[status].detail}</span>)}
          </div>
          <div className="monetization-layout">
            <section className="funnel-card" aria-label="MMORPG 매출 퍼널 분석 프레임">
              <div className="funnel-card-head"><div><span className="eyebrow">MMORPG REVENUE FUNNEL</span><h3>공개 구조 기반 결제 여정 가설</h3></div><EvidenceBadge status="confirmed" /></div>
              <div className="user-funnel-context" aria-label="MMORPG 유저 퍼널과 공개 관측 결제 구간">
                <p>공개 근거에서 확인 가능한 상품 구조를 결제 여정 가설로 배열합니다.</p>
                <div className="user-funnel" role="list">
                  {["유입", "설치", "캐릭터 생성", "첫 접속", "초반 성장", "콘텐츠 경험", "재방문", "첫 결제", "반복 결제", "고가치 결제"].map((step, index) => (
                    <span key={step} className={index >= 7 ? `monetization-step step-${index - 7}` : "journey-step"} role="listitem">{step}</span>
                  ))}
                </div>
                <div className="funnel-private-note"><EvidenceBadge status="private" /><span>실제 전환율·구매자 수·ARPU·ARPPU는 내부 검증 필요</span></div>
              </div>
              <div className="funnel-flow">
                {funnelStages.map((stage) => <article className={`funnel-stage ${stage.id}`} key={stage.id}><span>{stage.index}</span><h4>{stage.title}</h4><p>{stage.detail}</p><ul>{stage.mechanisms.map((mechanism) => <li key={mechanism}>{mechanism}</li>)}</ul></article>)}
              </div>
              <div className="funnel-research-line"><b>해석 원칙</b><span>상품 존재와 시장 반응의 동시 관측은 직접 매출 효과나 인과를 의미하지 않습니다.</span></div>
            </section>
            <aside className="monetization-side">
              <section className="bm-map-card" aria-label="BM 및 수익화 맵 분석 프레임">
                <span className="eyebrow">MARKET RESPONSE SIGNALS</span><h3>보조 신호로만 해석</h3>
                <p>순위·검색 관심·평점·이벤트는 <EvidenceBadge status="observed" /> 신호입니다. 상품 구조의 성과나 인과를 단정하지 않습니다.</p>
              </section>
              <section className="aion-research-card" aria-label="아이온2 수익화 조사 프레임">
                <span className="eyebrow">AION2 PRIORITY RESEARCH</span><h3>공개 구조와 비공개 성과를 분리</h3>
                <p>멤버십·데바 패스의 판매 구조는 <EvidenceBadge status="confirmed" />이며, 결제 전환·반복 구매율·고가치 결제 비중은 <EvidenceBadge status="private" />입니다.</p>
                <div><span>멤버십·구독</span><span>첫 결제 구조</span><span>반복 구매 구조</span></div>
              </section>
            </aside>
          </div>
          <section className="monetization-map" aria-label="4개 게임 BM 및 수익화 비교 맵">
            <div className="monetization-map-head"><div><span className="eyebrow">BM / MONETIZATION MAP</span><h3>4개 게임 공개 구조 비교</h3></div><span>공개 가격·구매 제한은 해당 공식 페이지·공지 시점 기준</span></div>
            <div className="monetization-table-wrap"><table className="monetization-table concise"><thead><tr><th>게임</th><th>핵심 BM</th><th>공개 가격</th><th>퍼널 역할</th><th>근거 상태</th></tr></thead><tbody>{monetizationRows.map((row) => <tr key={row.game}><th scope="row">{row.game}</th><td><b>{row.type}</b><details className="bm-detail-toggle"><summary>공개 구조 상세</summary><p><strong>상품/제도</strong>{row.product}</p><p><strong>구매 제한</strong>{row.limit}</p><p><strong>타깃 유저</strong>{row.target}</p></details></td><td>{row.price}</td><td>{row.role}</td><td><a href={row.sourceUrl} target="_blank" rel="noreferrer">{row.sourceLabel} <ExternalLink size={10} /></a><EvidenceBadge status={row.status} /></td></tr>)}</tbody></table></div>
          </section>
          <div className="monetization-note"><AlertTriangle size={16} /><div><b><EvidenceBadge status="private" /> 직접 성과 지표</b><span>정확 매출, 구매자 수, 전환·반복 구매율, 고가치 결제 비중, ARPU·ARPPU·LTV 및 상품별 매출 기여도는 공개 확인 불가입니다.</span></div></div>
        </section>
      )}

      {active === "strategy" && (
        <section className="stage-section strategy-section">
          <div className="section-title-row">
            <div><SectionEyebrow index="05" label="STRATEGY QUEST" /><h2>4개 퀘스트로 공백기 리스크를 분산한다</h2><p>우선순위와 리소스 제약을 함께 고려해 네 개의 실행 축을 단계적으로 추진합니다.</p></div>
            <div className="section-flag"><Target size={17} /><span>ACTION SYSTEM</span></div>
          </div>
          <div className="strategy-layout">
            <div className="quest-card-list">
              {strategyQuests.map((quest) => <button key={quest.id} onClick={() => setActiveQuest(quest.id)} className={`quest-card ${quest.color} ${currentQuest.id === quest.id ? "selected" : ""}`}><span>{quest.index}</span><b>{quest.title}</b><small>{quest.horizon}</small><ArrowUpRight size={15} /></button>)}
            </div>
            <div className={`quest-detail ${currentQuest.color}`}>
              <div className="quest-detail-top"><span>{currentQuest.index}</span><b>{currentQuest.horizon}</b></div>
              <h3>{currentQuest.title}</h3>
              <p className="quest-why"><strong>WHY</strong>{currentQuest.why}</p>
              <div className="quest-detail-columns"><div><span>HOW</span><ol>{currentQuest.how.map((item) => <li key={item}>{item}</li>)}</ol></div><div><span>RISK</span><p>{currentQuest.risk}</p></div><div><span>KPI</span>{currentQuest.kpi.map((item) => <b className="kpi-tag" key={item}>{item}</b>)}</div></div>
            </div>
          </div>
          <div className="roadmap-card">
            <div className="roadmap-head"><span className="eyebrow">EXECUTION ROADMAP</span><h3>단기부터 중장기까지, 실행 리스크를 분산합니다.</h3></div>
            <div className="roadmap-line"><div className="roadmap-step blue"><i>1</i><b>단기 · 1개월</b><span>커뮤니티 모니터링 · 이벤트 캘린더 트래킹</span></div><div className="roadmap-step gold"><i>2</i><b>중기 · 1분기</b><span>타이밍 관리 체계 · 콜라보 후보 롱리스트</span></div><div className="roadmap-step purple"><i>3</i><b>장기 · 반기</b><span>상시복귀지원 · IP 콜라보 1건 이상</span></div><div className="roadmap-step green"><i>4</i><b>중장기 · 1년+</b><span>시스템 리마스터 로드맵 착수</span></div></div>
          </div>
          <div className="risk-bar"><AlertTriangle size={16} /><b>RISK MANAGEMENT</b><span>4개 전략 동시 착수 시 리소스가 분산될 수 있습니다. 제안 KPI는 다수가 상관관계 지표이므로 매출·DAU 등 직접 지표는 별도 검증이 필요합니다.</span></div>
        </section>
      )}

      {active === "clear" && (
        <section className="stage-section clear-section">
          <img className="clear-bg" src="/manus-storage/marketing-quest-clear_bba3a96d.png" alt="" aria-hidden="true" />
          <img className="clear-star" src="/manus-storage/fantasy_ornament_star_ffc3f9b9.png" alt="" aria-hidden="true" />
          <div className="clear-top"><span className="clear-badge"><Check size={15} /> QUEST CLEAR</span><SectionEyebrow index="06" label="FINAL DIRECTION" /><h2>결론 및 전략 방향</h2><p>공개 BM 구조 기준 벤치마킹 후보와 시장 반응의 동시 관측 신호, 리텐션 후킹 비교를 구분한 실행 우선순위입니다.</p></div>
          <section className="revenue-findings" aria-label="5개 매출 발견">
            <div className="clear-block-head">
              <span className="eyebrow-light">EVIDENCE → REVENUE FINDINGS → BENCHMARKING CANDIDATES</span>
              <h3>5 REVENUE FINDINGS</h3>
              <p>공개 BM 구조와 보조 관측 신호를 분리해, 메이플M이 검토할 벤치마킹 후보를 정리합니다.</p>
            </div>
            <div className="revenue-findings-grid">
              {revenueFindings.map((finding) => <article className={`revenue-finding ${finding.status}`} key={finding.index}><span>{finding.index}</span><div><h4>{finding.title}</h4><p>{finding.copy}</p></div><EvidenceBadge status={finding.status} /></article>)}
            </div>
          </section>
          <section className="action-priorities" aria-label="실행 우선순위">
            <div className="action-priorities-head"><span className="eyebrow-light">BENCHMARKING CANDIDATES → ACTION PRIORITIES</span><h3>ACTION PRIORITIES</h3></div>
            <div className="clear-grid">
              {["시즌 단위 정례 업데이트 체계 도입", "이벤트 공백기 최소화", "경쟁사 이벤트 캘린더 선제 모니터링", "IP 콜라보형 채널 신설 검토", "상시복귀지원 도입 검토", "강점 자산(성장지원형 · 평점 신뢰도) 강화"].map((item, index) => <div className="clear-item" key={item}><span>{index + 1}</span><b>{item}</b></div>)}
              <div className="clear-item final"><span>7</span><b>검색 관심 · 복귀 니즈 반등 신호를 지속 모니터링</b></div>
            </div>
          </section>
          <div className="clear-footer"><div><b>THE NEXT QUEST</b><span>공개 BM 구조와 시장 반응의 <em>동시 관측 신호</em>를 벤치마킹 후보로 삼되, 내부 결제 데이터 확인 후 최종 검증한다.</span></div><button onClick={() => setActive("home")}>QUEST COMPLETE <ArrowUpRight size={15} /></button></div>
        </section>
      )}
    </QuestChrome>
  );
}
