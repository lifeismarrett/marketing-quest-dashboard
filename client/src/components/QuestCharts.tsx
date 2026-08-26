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
import { naverInterest, rankTimeline, sourceNotes } from "@/data/dashboardData";

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

const RANK_AXIS: Record<RankMetric, { domain: [number, number]; ticks: number[] }> = {
  revenue: { domain: [0, 240], ticks: [0, 60, 120, 180, 240] },
  users: { domain: [0, 240], ticks: [0, 60, 120, 180, 240] },
};

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
  const axis = RANK_AXIS[metric];
  const fallbackGames: Array<Exclude<GameName, "ALL">> = game === "ALL"
    ? ["메이플스토리M", "검은사막 모바일", "마비노기 모바일", "아이온2"]
    : [game];
  const selectedGames = games ?? fallbackGames;
  const shouldShowReboost = showReboost ?? selectedGames.includes("메이플스토리M");
  const data = rankTimeline.map((row) => ({
    date: row.date,
    ...((row as any)[key]),
  }));
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
      <ResponsiveContainer width="100%" height={chartHeight ?? (compact ? 222 : 300)}>
        <LineChart data={data} margin={{ top: 14, right: 14, bottom: 3, left: 0 }}>
          <CartesianGrid stroke="#E6E0D4" vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatShortDate} minTickGap={28} axisLine={false} tickLine={false} tick={{ fill: "#7D7780", fontSize: 11 }} />
          <YAxis type="number" reversed domain={axis.domain} ticks={axis.ticks} allowDataOverflow axisLine={false} tickLine={false} width={42} tick={{ fill: "#7D7780", fontSize: 11 }} />
          <Tooltip content={<RankTooltip />} />
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
              activeDot={{ r: 4, strokeWidth: 2 }}
              connectNulls={false}
            />
          ))}
          {!compact && <Legend formatter={(value) => GAME_LABELS[value] ?? value} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />}
        </LineChart>
      </ResponsiveContainer>
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

export function SearchInterestChart() {
  return (
    <div className="chart-frame search-chart">
      <div className="chart-heading">
        <div>
          <span className="eyebrow">SEARCH SIGNAL</span>
          <h3>NAVER DataLab 검색 관심</h3>
        </div>
        <span className="rank-rule neutral">상대지수</span>
      </div>
      <ResponsiveContainer width="100%" height={264}>
        <LineChart data={naverInterest as unknown as any[]} margin={{ top: 12, right: 10, bottom: 3, left: -18 }}>
          <CartesianGrid stroke="#E6E0D4" vertical={false} />
          <XAxis dataKey="date" tickFormatter={(value) => value.slice(2, 7)} minTickGap={26} axisLine={false} tickLine={false} tick={{ fill: "#7D7780", fontSize: 11 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#7D7780", fontSize: 11 }} />
          <Tooltip content={<SearchTooltip />} />
          <Line type="monotone" dataKey="메이플스토리M" stroke="#F39C27" strokeWidth={3.2} dot={false} activeDot={{ r: 4 }} />
          <Line type="monotone" dataKey="아이온2" stroke="#4A97D1" strokeWidth={2.1} dot={false} activeDot={{ r: 4 }} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
        </LineChart>
      </ResponsiveContainer>
      <p className="chart-source">{sourceNotes.search}</p>
    </div>
  );
}
