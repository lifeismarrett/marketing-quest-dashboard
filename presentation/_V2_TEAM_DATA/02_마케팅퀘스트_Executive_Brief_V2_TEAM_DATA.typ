#import "report-theme.typ": report-theme

#show: report-theme.with(
  title: "MARKETING QUEST",
  author: "Manus AI",
  rhythm: "report",
  running-header: false,
)

#let navy = rgb("14264A")
#let navy-two = rgb("213A62")
#let ivory = rgb("FAF7EF")
#let cream = rgb("F1EBDD")
#let gold = rgb("C99B42")
#let gold-soft = rgb("F3E6C8")
#let ink = rgb("202B3E")
#let muted = rgb("667085")
#let line-color = rgb("D6DCE6")
#let green = rgb("3F8066")
#let blue = rgb("4C78A8")

#set page(
  width: 210mm,
  height: 297mm,
  margin: (top: 12mm, bottom: 11mm, left: 14mm, right: 14mm),
  fill: ivory,
)
#set text(font: ("Noto Sans CJK KR", "Noto Sans"), size: 8.25pt, fill: ink, lang: "ko")
#set par(leading: 1.14em, spacing: 0.35em)
#set heading(numbering: none)

#let overline(body) = text(size: 6.35pt, weight: "bold", fill: gold, tracking: 0.8pt)[#body]
#let meta(body) = text(size: 6.45pt, fill: muted)[#body]
#let label(body) = text(size: 6.15pt, weight: "bold", fill: navy, tracking: 0.55pt)[#body]
#let thin-rule() = line(length: 100%, stroke: 0.45pt + line-color)

#let header(page-no, section) = [
  #grid(columns: (1fr, auto), align: (left, right),[
    #overline[MARKETING QUEST · EXECUTIVE BRIEF]
  ],[
    #meta[4 GAMES · 39 WEEKS · #page-no / 2]
  ])
  #v(2.1mm)
  #thin-rule()
  #v(3.2mm)
  #text(size: 6.45pt, weight: "bold", fill: navy)[#section]
]

#let callout(title, body, fill: cream, stroke: none) = box(
  width: 100%,
  inset: (x: 4.1mm, y: 3.15mm),
  radius: 2.4mm,
  fill: fill,
  stroke: stroke,
)[
  #label[#title]
  #v(1.25mm)
  #body
]

#let scope(title, body) = [
  #label[#title]
  #v(1mm)
  #text(size: 7.75pt, weight: "bold", fill: navy)[#body]
]

#let signal(no, value, title, note, accent) = box(
  width: 100%,
  inset: (x: 3.15mm, y: 2.9mm),
  radius: 1.8mm,
  fill: rgb("FFFFFF"),
  stroke: 0.45pt + line-color,
)[
  #text(size: 6pt, weight: "bold", fill: accent)[#no]
  #v(1.15mm)
  #text(size: 13.5pt, weight: "bold", fill: navy)[#value]
  #v(0.7mm)
  #text(size: 6.55pt, weight: "bold", fill: ink)[#title]
  #v(0.65mm)
  #text(size: 5.65pt, fill: muted)[#note]
]

#let finding(no, title, body, status) = box(
  width: 100%,
  inset: (x: 3.1mm, y: 2.95mm),
  radius: 1.8mm,
  fill: rgb("FFFFFF"),
  stroke: 0.4pt + line-color,
)[
  #grid(columns: (auto, 1fr), column-gutter: 2.1mm, align: (left, top),[
    #text(size: 7.5pt, weight: "bold", fill: gold)[#no]
  ],[
    #text(size: 7.25pt, weight: "bold", fill: navy)[#title]
    #v(0.7mm)
    #text(size: 6.55pt, fill: ink)[#body]
    #v(0.8mm)
    #text(size: 5.55pt, weight: "bold", fill: green)[#status]
  ])
]

#let funnel(content, highlighted: false) = box(
  width: 100%,
  height: 13.5mm,
  inset: (x: 1mm, y: 1mm),
  radius: 1.25mm,
  fill: if highlighted {gold-soft} else {rgb("FFFFFF")},
  stroke: if highlighted {0.7pt + gold} else {0.35pt + line-color},
)[
  #align(center)[
    #text(size: 5.25pt, weight: if highlighted {"bold"} else {"regular"}, fill: if highlighted {navy} else {muted})[#content]
  ]
]

#let priority-row(candidate, reason, kpi, fill, header: false) = box(
  width: 100%,
  inset: (x: 2.25mm, y: 2.15mm),
  fill: fill,
  stroke: 0.35pt + line-color,
)[
  #grid(columns: (29mm, 47mm, 1fr), column-gutter: 2.6mm, align: (left, top),[
    #text(size: 6.6pt, weight: "bold", fill: if header {rgb("FFFFFF")} else {navy})[#candidate]
  ],[
    #text(size: 6.25pt, fill: if header {rgb("FFFFFF")} else {ink})[#reason]
  ],[
    #text(size: 6.15pt, fill: if header {rgb("FFFFFF")} else {ink})[#kpi]
  ])
]

#header("01", "EXECUTIVE SUMMARY")
#v(3mm)

#grid(columns: (1fr, 49mm), column-gutter: 7mm, align: (left, top),[
  #overline[EXECUTIVE SUMMARY]
  #v(1.4mm)
  #text(size: 23.5pt, weight: "bold", fill: navy)[MARKETING QUEST]
  #v(1mm)
  #text(size: 13.1pt, weight: "bold", fill: ink)[메이플스토리M 경쟁 벤치마킹 및 매출 성장 기회 발굴]
  #v(3.1mm)
  #text(size: 7.15pt, fill: muted)[공개 시장·상품 구조를 비교해, 메이플M이 내부 데이터로 먼저 검증할 매출 성장 후보를 좁힌 벤치마킹 분석입니다.]
],[
  #callout("ONE-LINE BUSINESS QUESTION", [
    #text(size: 9.15pt, weight: "bold", fill: navy)[경쟁사는 어떤 유저를, 퍼널의 어느 단계에서 잡고, 어떤 BM 구조로 결제를 유도하며, 메이플M은 무엇을 먼저 검증해야 하는가?]
  ], fill: gold-soft)
])

#v(4mm)
#grid(columns: (1fr, 1fr, 1fr, 1fr), column-gutter: 3.6mm,[
  #scope("TARGET", [메이플스토리M])
],[
  #scope("BENCHMARK", [검은사막 모바일 · 마비노기 모바일 #linebreak() 아이온2])
],[
  #scope("PERIOD", [2025-11-17 → 2026-08-10])
],[
  #scope("OBSERVATION", [39 WEEKS · 4 GAMES])
])

#v(2.8mm)
#thin-rule()
#v(3.1mm)

#overline[KEY MARKET SIGNALS]
#v(1.7mm)
#grid(columns: (1fr, 1fr, 1fr, 1fr, 1fr), column-gutter: 2.35mm,[
  #signal("01", [87 → 34위], [게임(매출) 순위], [53단계 개선 · 매출액 아님], gold)
],[
  #signal("02", [69 → 33위], [이용자수 순위], [36단계 개선], blue)
],[
  #signal("03", [21위], [관측 내 최고 순위], [2026-08-03 · 39주 기준], green)
],[
  #signal("04", [0.90], [Search Peak], [2026-07-27 · 공통 상대지수], gold)
],[
  #signal("05", [0.23 → 0.49], [최근 4주 변화], [+117.2% · 절대 검색량 아님], blue)
])

#v(3.9mm)
#overline[5 REVENUE FINDINGS]
#v(1.7mm)
#grid(columns: (1fr, 1fr), column-gutter: 3mm, row-gutter: 2.15mm,[
  #finding("01", [경쟁사 우위 매출 요소], [멤버십·패스·월간/반복형 패키지와 누적·연속 혜택은 공개 BM 구조에서 확인되는 반복 구매 후보입니다.], [[확인]])
],[
  #finding("02", [결제 유도 방식], [입문 가격·기간 한정·성장 패키지는 유저 단계에 맞춘 공개 상품 구조입니다. 시장 반응은 보조 신호로만 해석합니다.], [[관측]])
],[
  #finding("03", [신규·복귀 → 첫 결제], [신규·복귀 및 초기 성장 상품 구조는 첫 결제 구간의 후보입니다. 실제 전환율과 구매자 수는 공개 확인 불가입니다.], [[비공개]])
],[
  #finding("04", [반복·고가치 결제], [반복형 패키지와 프리미엄·성장·코스메틱 선택 구조는 내부 구매 데이터로 검증할 필요가 있습니다.], [[비공개]])
])
#v(2.15mm)
#finding("05", [메이플M 검증 우선순위], [IP 콜라보·상시복귀지원 공백과 공개 BM 구조를 함께 검토하되, 실제 매출 효과는 내부 결제 데이터 확인 후 판단합니다.], [[확인]])

#v(13mm)
#callout("ANALYSIS SCOPE", [
  #text(size: 6.65pt, fill: muted)[게임(매출)·이용자수 순위 · NAVER DataLab · 공식 이벤트·업데이트 · 공식 YouTube · 스토어 평점·리뷰 · 공개 BM/상품 구조]
  #v(1mm)
  #text(size: 6.05pt, weight: "bold", fill: navy-two)[V2 DATA LAYER · 공시 기업/플랫폼 범위 · Meta 소재 proxy · YouTube 표본]
  #v(0.55mm)
  #text(size: 5.6pt, fill: muted)[보조 근거로만 사용 · 기존 39주 지표와 직접 병합하지 않음]
], fill: cream)

#v(6mm)
#text(size: 5.45pt, fill: muted)[Sources [1] MobileIndex · [2] NAVER DataLab · [3] Official Game Channels · [4] Official Stores / Notices · [5] App Stores]

#pagebreak()

#header("02", "DECISION & VALIDATION BRIEF")
#v(3.1mm)

#overline[DECISION & VALIDATION BRIEF]
#v(1.1mm)
#text(size: 17.8pt, weight: "bold", fill: navy)[공개 근거를 검증 우선순위로 전환]
#v(1.4mm)
#text(size: 7.2pt, fill: muted)[공개 상품 구조를 퍼널 단계에 배치한 분석 가설입니다. 실제 고객 행동·결제 성과는 내부 데이터로 별도 검증해야 합니다.]

#v(3mm)
#overline[MMORPG REVENUE FUNNEL]
#v(1.45mm)
#grid(columns: (1fr, 1fr, 1fr, 1fr, 1fr, 1fr, 1fr, 1fr, 1fr, 1fr), column-gutter: 1.2mm,[
  #funnel([유입])
],[
  #funnel([설치])
],[
  #funnel([캐릭터 생성])
],[
  #funnel([첫 접속])
],[
  #funnel([초반 성장])
],[
  #funnel([콘텐츠 경험])
],[
  #funnel([재방문])
],[
  #funnel([첫 결제], highlighted: true)
],[
  #funnel([반복 결제], highlighted: true)
],[
  #funnel([고가치 결제], highlighted: true)
])
#v(1.5mm)
#grid(columns: (1fr, 1fr, 1fr), column-gutter: 2.8mm,[
  #callout("01 FIRST PAYMENT", [#text(size: 6.45pt)[입문 상품 · 성장 지원 · 신규/복귀 혜택]], fill: rgb("FFFFFF"), stroke: 0.4pt + line-color)
],[
  #callout("02 REPEAT PAYMENT", [#text(size: 6.45pt)[멤버십 · 패스 · 기간형 상품]], fill: rgb("FFFFFF"), stroke: 0.4pt + line-color)
],[
  #callout("03 HIGH-VALUE PAYMENT CANDIDATE", [#text(size: 6.45pt)[고가치 결제 후보 구조 · 프리미엄 · 성장 · 코스메틱 · 상위 가격대]], fill: rgb("FFFFFF"), stroke: 0.4pt + line-color)
])

#v(5mm)
#overline[VALIDATION PRIORITIES]
#v(1.4mm)
#priority-row([검증 후보], [왜 보는가], [내부 검증 KPI], navy, header: true)
#priority-row([상시 복귀지원], [이벤트 공백기에도 재방문 이유를 만드는 공개 구조], [복귀율 · 재방문 · D1/D7/D30 · 복귀 후 첫 결제 진입], rgb("FFFFFF"))
#priority-row([첫 결제 구조], [신규·복귀 유저의 초기 구매 장벽 확인], [첫 구매율 · 첫 구매 시간 · 상품 · 가격대], rgb("F7F4EC"))
#priority-row([반복 결제 BM], [일회성 구매 이후 재구매 이유 검증], [재구매율 · 갱신율 · 해지율 · 구매 빈도 · 구매자 잔존], rgb("FFFFFF"))
#priority-row([IP / 브랜드 콜라보], [화제성·신규/복귀 유입의 검증 후보], [도달 · 참여 · 신규/복귀 유입 · 구매율 · 증분 효과 · 비용], rgb("F7F4EC"))
#priority-row([경쟁 이벤트 모니터링], [압력 주의 일정·메시지·보상 대응], [대응 리드타임 · 실행률 · 캠페인 성과], rgb("FFFFFF"))

#v(9mm)
#grid(columns: (1fr, 44mm), column-gutter: 4mm, align: (left, top),[
  #callout("EVIDENCE BOUNDARY", [
    #grid(columns: (1fr, 1fr), column-gutter: 3.2mm, row-gutter: 1.35mm,[
      #text(size: 6.25pt)[매출 순위 #text(fill: gold)[≠] 실제 매출액]
    ],[
      #text(size: 6.25pt)[Search Interest #text(fill: gold)[≠] 절대 검색량·DAU]
    ],[
      #text(size: 6.25pt)[동시 움직임 #text(fill: gold)[≠] 직접 인과관계]
    ],[
      #text(size: 6.25pt)[공개 BM 구조 #text(fill: gold)[≠] 실제 결제 성과]
    ],[
      #text(size: 6.25pt)[공시 매출 범위 #text(fill: gold)[≠] 게임별 모바일 매출]
    ])
    #v(2.1mm)
    #text(size: 6.05pt, weight: "bold", fill: navy-two)[전환율 · 재구매율 · ARPU · ARPPU · LTV → 내부 데이터 검증 필요]
  ], fill: cream)
  #v(2.3mm)
  #callout("FINAL DECISION", [
    #text(size: 8.7pt, weight: "bold", fill: navy)[공개 데이터로 모든 답을 얻은 것이 아니라, 무엇을 먼저 검증해야 하는지 좁혔습니다.]
    #v(1.4mm)
    #text(size: 6.05pt, weight: "bold", fill: navy-two)[공개 확인 → 실제 성과와 분리 → 내부 검증 → 판단 범위]
    #v(0.65mm)
    #text(size: 5.55pt, weight: "bold", fill: gold)[PUBLIC EVIDENCE → PERFORMANCE SEPARATION → INTERNAL VALIDATION → DECISION SCOPE]
  ], fill: gold-soft)
],[
  #align(center)[
    #box(inset: 2mm, fill: rgb("FFFFFF"), radius: 2mm, stroke: 0.4pt + line-color)[
      #image("live-dashboard-qr.png", width: 25mm)
    ]
    #v(1.3mm)
    #text(size: 6.25pt, weight: "bold", fill: navy)[LIVE DASHBOARD]
    #v(0.35mm)
    #text(size: 5.55pt, fill: muted)[MARKETING QUEST · Interactive Dashboard · 4 GAMES · 39 WEEKS]
  ]
])

#v(7mm)
#text(size: 5.45pt, fill: muted)[Sources [1] MobileIndex · [2] NAVER DataLab · [3] Official Game Channels · [4] Official Stores / Notices · [5] App Stores · Detailed evidence: MARKETING QUEST Interactive Dashboard]
