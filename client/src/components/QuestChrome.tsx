/**
 * Quest Console Atelier style: an ivory analysis board with a compact navy quest rail
 * and a restrained ember-gold progress system. This chrome carries the live-presentation flow.
 */
import { ChevronLeft, ChevronRight, Keyboard, Mic2, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export type QuestSection = "home" | "performance" | "battle" | "retention" | "strategy" | "clear";

type QuestChromeProps = {
  activeSection: QuestSection;
  onSectionChange: (section: QuestSection) => void;
  onPrevious: () => void;
  onNext: () => void;
  presenterMode: boolean;
  onPresenterModeChange: (next: boolean) => void;
  children: ReactNode;
  note: string[];
};

const questNav: Array<{ id: QuestSection; label: string; short: string; index: string }> = [
  { id: "home", label: "MISSION BRIEFING", short: "개요", index: "00" },
  { id: "performance", label: "PERFORMANCE", short: "성과", index: "01" },
  { id: "battle", label: "BATTLE CONSOLE", short: "경쟁 압력", index: "02" },
  { id: "retention", label: "RETENTION", short: "유저 반응", index: "03" },
  { id: "strategy", label: "STRATEGY QUEST", short: "실행 전략", index: "04" },
  { id: "clear", label: "QUEST CLEAR", short: "결론", index: "05" },
];

export function QuestChrome({
  activeSection,
  onSectionChange,
  onPrevious,
  onNext,
  presenterMode,
  onPresenterModeChange,
  children,
  note,
}: QuestChromeProps) {
  const activeIndex = questNav.findIndex((item) => item.id === activeSection);

  return (
    <div className={`quest-shell ${presenterMode ? "with-presenter" : ""}`}>
      <aside className="quest-rail" aria-label="퀘스트 내비게이션">
        <div className="quest-brand">
          <img
            className="quest-logo"
            src="/manus-storage/marketing-quest-logo_905746ed.png"
            alt="MARKETING QUEST 심볼"
          />
          <div>
            <span className="eyebrow-light">MARKETING</span>
            <strong>QUEST</strong>
          </div>
        </div>

        <div className="rail-caption">
          <span>QUEST LOG</span>
          <b>{String(activeIndex + 1).padStart(2, "0")} / 06</b>
        </div>

        <nav className="quest-nav">
          {questNav.map((item, index) => (
            <button
              className={`quest-nav-item ${item.id === activeSection ? "is-active" : ""}`}
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              aria-current={item.id === activeSection ? "page" : undefined}
            >
              <span className="quest-index">{item.index}</span>
              <span className="quest-copy">
                <b>{item.short}</b>
                <small>{item.label}</small>
              </span>
              {index < questNav.length - 1 && <span className="quest-line" aria-hidden="true" />}
            </button>
          ))}
        </nav>

        <div className="rail-footer">
          <Sparkles size={14} />
          <span>39 WEEKS · 4 GAMES</span>
        </div>
      </aside>

      <div className="presentation-frame">
        <header className="presentation-topbar">
          <div className="topbar-title">
            <span className="topbar-section">{questNav[activeIndex]?.label}</span>
            <span className="topbar-divider">/</span>
            <span className="topbar-status">LIVE PRESENTATION</span>
          </div>
          <div className="topbar-actions">
            <button
              className={`presenter-toggle ${presenterMode ? "is-on" : ""}`}
              onClick={() => onPresenterModeChange(!presenterMode)}
              aria-pressed={presenterMode}
            >
              <Mic2 size={14} />
              PRESENTER MODE
            </button>
            <span className="key-hint"><Keyboard size={13} /> ← →</span>
            <div className="pager-controls" aria-label="섹션 이동">
              <button onClick={onPrevious} aria-label="이전 섹션"><ChevronLeft size={17} /></button>
              <button onClick={onNext} aria-label="다음 섹션"><ChevronRight size={17} /></button>
            </div>
          </div>
        </header>

        <main className="presentation-stage">{children}</main>
      </div>

      {presenterMode && (
        <aside className="presenter-rail" aria-label="발표자 노트">
          <div className="presenter-head"><Mic2 size={15} /> PRESENTER NOTES</div>
          <ol>
            {note.map((line) => <li key={line}>{line}</li>)}
          </ol>
          <p>이 패널은 발표자용이며 데이터 차트를 가리지 않습니다.</p>
        </aside>
      )}
    </div>
  );
}
