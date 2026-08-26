/**
 * Public-observable monetization structures only. Performance, conversion, payer mix,
 * ARPU/ARPPU/LTV and product-level revenue are deliberately excluded as non-public.
 */

export type EvidenceStatus = "confirmed" | "observed" | "private";

export const evidenceMeta: Record<EvidenceStatus, { label: string; detail: string }> = {
  confirmed: { label: "확인", detail: "공식 상점·공지에서 확인" },
  observed: { label: "관측", detail: "시장 반응 보조 신호" },
  private: { label: "비공개", detail: "직접 성과 지표 미공개" },
};

export const funnelStages = [
  {
    id: "first",
    index: "01",
    title: "첫 결제",
    detail: "공개된 입문 상품과 초기 가치 제안",
    mechanisms: ["스타터·신규/복귀 패키지", "초기 성장 상품", "입문 가격·기간 한정 오퍼"],
  },
  {
    id: "repeat",
    index: "02",
    title: "반복 결제",
    detail: "공개된 반복 구매·기간형 구조",
    mechanisms: ["멤버십·구독", "주간·월간 패키지", "패스·구매 제한"],
  },
  {
    id: "high",
    index: "03",
    title: "고가치 결제",
    detail: "공개된 상위 가격대와 선택 구조",
    mechanisms: ["프리미엄 패키지", "성장·장비·코스메틱", "확률형·스텝업 구조"],
  },
] as const;

export const monetizationRows = [
  {
    game: "메이플스토리M",
    type: "성장·월간·크리스탈·스타일",
    product: "성장 패키지·월간 패키지·크리스탈·로얄스타일",
    price: "3,000–100,000원\n(공개 상점 기준)",
    limit: "공개 확인 불가",
    target: "성장·반복·치장\n(구조 기준)",
    role: "첫 결제 · 반복 · 고가치",
    sourceLabel: "넥슨쇼핑",
    sourceUrl: "https://shopping.nexon.com/kr/maplestorym/main",
    status: "confirmed" as EvidenceStatus,
  },
  {
    game: "검은사막 모바일",
    type: "펄·패키지·연속 혜택",
    product: "펄 상점 패키지·의상·연속 혜택",
    price: "1,100–110,000원 등\n(해당 공지 기준)",
    limit: "가문당 주간 2–4회 등",
    target: "성장·입장권·재화\n(공개 구성 기준)",
    role: "반복 · 고가치",
    sourceLabel: "공식 펄 상점 공지",
    sourceUrl: "https://forum.blackdesertm.com/Board/Detail?boardNo=7&contentNo=661247",
    status: "confirmed" as EvidenceStatus,
  },
  {
    game: "마비노기 모바일",
    type: "토탈 패키지·포인트 상점",
    product: "토탈 패키지·패키지 포인트·누적 구매 혜택",
    price: "3,980 M캐시\n(해당 공지 기준)",
    limit: "기간형·누적 구매 혜택",
    target: "패션·탈것·포인트\n(공개 구성 기준)",
    role: "반복 · 고가치",
    sourceLabel: "공식 패키지 공지",
    sourceUrl: "https://mabinogimobile.nexon.com/News/Notice/3407265",
    status: "confirmed" as EvidenceStatus,
  },
  {
    game: "아이온2",
    type: "멤버십·데바 패스",
    product: "28일 멤버십·프리미엄 데바 패스",
    price: "19,700–45,000원\n(멤버십 공지 기준)",
    limit: "서버별 월 최대 3회\n패스 캐릭터별 1회",
    target: "접근성·보상·패스\n(공개 구성 기준)",
    role: "반복 · 고가치",
    sourceLabel: "공식 구독 공지",
    sourceUrl: "https://aion2.plaync.com/ko-kr/board/notice/view?articleId=691c89f034e7dd2024fd503b",
    status: "confirmed" as EvidenceStatus,
  },
] as const;
