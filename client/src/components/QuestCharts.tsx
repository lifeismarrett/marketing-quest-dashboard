/**
 * Quest Console Atelier style: clean, projector-readable charts live on calm ivory surfaces.
 * Ember gold marks MapleStory M; opponent colors remain restrained and semantic.
 */
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useRef, useState } from "react";
import { rankTimeline, sourceNotes } from "@/data/dashboardData";
import { SEARCH_INTEREST_4GAME_DATA, SEARCH_INTEREST_GAMES, SEARCH_INTEREST_SOURCE } from "@/data/searchInterestData";

export type RankMetric = "revenue" | "users";
export type GameName = "ALL" | "메이플스토리M" | "검은사막 모바일" | "마비노기 모바일" | "아이온2";

const GAME_COLORS: Record<string, string> = {
  "메이플스토리M": "#F39C27",
  "검은사막 모바일": "#7066C7",
  "마비노기 모바일": "#36A26D",
  "아이온2": "#4A97D1",
};

const GAME_LABELS: Record<string, string> = {
  "메이플스토리M": "메이플M",
  "검은사막 모바일": "검은사막M",
  "마비노기 모바일": "마비노기M",
  "아이온2": "아이온2",
};

function getRankAxis(metric: RankMetric): { domain: [number, number]; ticks: number[] } {
  const values = rankTimeline.flatMap((row) => Object.values(((row as any)[metric] ?? {}) as Record<string, unknown>))
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  const observedMax = values.length ? Math.max(...values) : 240;
  const upperBound = observedMax <= 240 ? 240 : Math.ceil((observedMax + 24) / 60) * 60;
  return { domain: [0, upperBound], ticks: Array.from({ length: upperBound / 60 + 1 }, (_, index) => index * 60) };
}

function formatShortDate(value: string) {
  const [, month, day] = value.split("-");
  return `${Number(month)}/${Number(day)}`;
}

function RankTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <b>{formatShortDate(label)} 주간</b>
      {payload.filter((entry: any) => entry.value !== null).map((entry: any) => (
        <span key={entry.name} style={{ color: entry.color }}>
          {GAME_LABELS[entry.name] ?? entry.name} <strong>{entry.value}위</strong>
        </span>
      ))}
      <em>순위는 낮을수록 우수</em>
    </div>
  );
}

type RankTrendChartProps = {
  metric: RankMetric;
  game?: GameName;
  games?: Array<Exclude<GameName, "ALL">>;
  compact?: boolean;
  showReboost?: boolean;
  chartHeight?: number;
};

export function RankTrendChart({ metric, game = "ALL", games, compact = false, showReboost, chartHeight }: RankTrendChartProps) {
  const key = metric;
  const axis = getRankAxis(metric);
  const fallbackGames: Array<Exclude<GameName, "ALL">> = game === "ALL"
    ? ["메이플스토리M", "검은사막 모바일", "마비노기 모바일", "아이온2"]
    : [game];
  const selectedGames = games ?? fallbackGames;
  const shouldShowReboost = showReboost ?? selectedGames.includes("메이플스토리M");
  const data = rankTimeline.map((row) => ({
    date: row.date,
    ...((row as any)[key]),
  }));
  const layoutSignature = `${metric}-${game}-${selectedGames.join("|")}-${compact}`;
  const chartHostRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const host = chartHostRef.current;
    if (!host) return;
    const updateWidth = () => setChartWidth(Math.max(0, Math.floor(host.getBoundingClientRect().width)));
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(host);
    return () => observer.disconnect();
  }, [layoutSignature]);
  const noData = metric === "users" && game === "검은사막 모바일";

  if (noData) {
    return (
      <div className="chart-empty">
        <b>이용자수 순위 비교 불가</b>
        <p>검은사막 모바일은 39주 중 34주가 측정 범위 밖으로 보고되어, 원본 PPT의 제한을 그대로 표시합니다.</p>
      </div>
    );
  }

  return (
    <div className="chart-frame">
      <div className="chart-heading">
        <div>
          <span className="eyebrow">{metric === "revenue" ? "GAME (REVENUE) RANK" : "USER RANK"}</span>
          {!compact && <h3>{metric === "revenue" ? "주간 게임(매출) 순위" : "주간 이용자수 순위"}</h3>}
        </div>
        <span className="rank-rule">↓ 낮을수록 상위</span>
      </div>
      <div ref={chartHostRef} className="rank-chart-host" style={{ height: chartHeight ?? (compact ? 222 : 300) }}>
        {chartWidth > 0 && <LineChart width={chartWidth} height={chartHeight ?? (compact ? 222 : 300)} data={data} margin={{ top: 14, right: 14, bottom: compact ? 22 : 3, left: 0 }}>
          <CartesianGrid stroke="#E6E0D4" vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatShortDate} minTickGap={28} axisLine={false} tickLine={false} tick={{ fill: "#7D7780", fontSize: 11 }} />
          <YAxis type="number" reversed domain={axis.domain} ticks={axis.ticks} allowDataOverflow axisLine={false} tickLine={false} width={42} tick={{ fill: "#7D7780", fontSize: 11 }} />
          <Tooltip content={<RankTooltip />} cursor={{ stroke: "#C9B77A", strokeWidth: 1, strokeDasharray: "3 3" }} />
          {shouldShowReboost && <ReferenceLine x="2026-07-13" stroke="#F3B542" strokeWidth={1.5} strokeDasharray="4 4" label={{ value: "메이플M RE:BOOST", position: "top", fill: "#AB7010", fontSize: 10 }} />}
          {selectedGames.map((item) => (
            <Line
              key={item}
              type="monotone"
              dataKey={item}
              name={item}
              stroke={GAME_COLORS[item]}
              strokeWidth={item === "메이플스토리M" ? 3.25 : 2}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 3 }}
              isAnimationActive={false}
              connectNulls={false}
            />
          ))}
          {!compact && <Legend formatter={(value) => GAME_LABELS[value] ?? value} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />}
        </LineChart>}
      </div>
      {compact && (
        <div className="compact-chart-legend" aria-label="그래프 범례">
          {selectedGames.map((item) => <span key={item} style={{ "--legend-color": GAME_COLORS[item] } as React.CSSProperties}>{GAME_LABELS[item]}</span>)}
          {metric === "users" && selectedGames.includes("검은사막 모바일") && <em>검은사막M 34/39주 결측</em>}
        </div>
      )}
      {!compact && <p className="chart-source">{sourceNotes.rank}</p>}
    </div>
  );
}

function SearchTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <b>{label}</b>
      {payload.map((entry: any) => <span key={entry.name} style={{ color: entry.color }}>{entry.name} <strong>{Number(entry.value).toFixed(2)}</strong></span>)}
      <em>상대·정규화 관심 지수</em>
    </div>
  );
}

export function SearchInterestChart({ game = "ALL" }: { game?: GameName }) {
  const selectedGames = game === "ALL"
    ? SEARCH_INTEREST_GAMES
    : SEARCH_INTEREST_GAMES.filter((item) => item.game === game);
  return (
    <div className="chart-frame search-chart">
      <div className="chart-heading">
        <div>
          <span className="eyebrow">SEARCH SIGNAL</span>
          <h3>NAVER DataLab 4사 검색 관심</h3>
        </div>
        <span className="rank-rule neutral">공통 100 기준 · 상대지수</span>
      </div>
      <ResponsiveContainer width="100%" height={264}>
        <LineChart data={SEARCH_INTEREST_4GAME_DATA as unknown as any[]} margin={{ top: 12, right: 10, bottom: 3, left: -4 }}>
          <CartesianGrid stroke="#E6E0D4" vertical={false} />
          <XAxis dataKey="date" tickFormatter={(value) => value.slice(2, 7)} minTickGap={26} axisLine={false} tickLine={false} tick={{ fill: "#7D7780", fontSize: 11 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#7D7780", fontSize: 11 }} />
          <Tooltip content={<SearchTooltip />} />
          {selectedGames.map((item) => <Line key={item.game} type="monotone" dataKey={item.game} name={item.short} stroke={item.color} strokeWidth={item.game === "메이플스토리M" ? 3.2 : 2.1} dot={false} activeDot={{ r: 4 }} isAnimationActive={false} connectNulls={false} />)}
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
        </LineChart>
      </ResponsiveContainer>
      <p className="chart-source">Source: {SEARCH_INTEREST_SOURCE.provider} · 주간 · {SEARCH_INTEREST_SOURCE.normalization}. 상대지수이며 절대 검색량·매출·DAU·점유율이 아닙니다.</p>
    </div>
  );
}
