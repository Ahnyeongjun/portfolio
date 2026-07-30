"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PROFILE, PROFILE_PLATFORM, type DocProject, type CareerGroup, type CareerItem } from "@/data/profileDoc";

/** 인프라/풀스택 두 버전. /resume 과 동일한 탭 구조 (기본 = 인프라). */
const VARIANTS = {
  platform: { label: "인프라", roleEn: "Infrastructure Engineer", data: PROFILE_PLATFORM },
  backend: { label: "풀스택", roleEn: "Full-Stack Engineer", data: PROFILE },
} as const;
type Variant = keyof typeof VARIANTS;

const TAB_PARAM: Record<Variant, string> = { backend: "fullstack", platform: "infra" };

function variantFromTab(tab: string | null | undefined): Variant {
  if (tab === "fullstack") return "backend";
  if (tab === "infra") return "platform";
  return "platform"; // 파라미터 없음/미인식 값 - 기본 탭(인프라) 유지
}

type DocActivity = { title: string; org: string; year: string; desc: string; notes: string[] };
type DocCareer = { company: string; position: string; period: string; overview: string; groups: CareerGroup[] };

/* Wanted-style portfolio document. CSS ported verbatim from wanted-doc.css. */
const CSS = `
.wanted-root { --ink:#1a1a1e; --ink-2:#4a4f57; --ink-3:#8b9099; --line:#e9ebee; --line-2:#f2f3f5; --bg-soft:#f6f7f9; --accent:#3366ff; --accent-soft:#eaf0ff; --tobe:#3366ff; --tobe-soft:#eaf0ff; --asis:#9298a2; --asis-soft:#f1f3f5; --font-sans:"Pretendard",-apple-system,BlinkMacSystemFont,system-ui,"Apple SD Gothic Neo",sans-serif; --font-mono:"JetBrains Mono",ui-monospace,"SFMono-Regular",monospace; }
.wanted-root { background:#dde1e6; color:var(--ink); font-family:var(--font-sans); line-height:1.56; letter-spacing:-0.012em; word-break:keep-all; -webkit-font-smoothing:antialiased; min-height:100vh; padding:1px 0; }
.wanted-root * { box-sizing:border-box; margin:0; padding:0; }
.wanted-root a { color:inherit; text-decoration:none; }
.wanted-root mark { background:#eef1f6; color:var(--ink); font-weight:700; padding:1px 5px; border-radius:4px; box-shadow:inset 0 -2px 0 rgba(51,102,255,0.35); }
.wanted-root .sheet { width:210mm; min-height:297mm; background:#fff; margin:22px auto; position:relative; box-shadow:0 1px 2px rgba(20,22,28,0.05),0 18px 50px rgba(20,22,28,0.12); }
.wanted-root .sheet-inner { padding:22mm 20mm 24mm; }
.wanted-root .pg-spacer { background:#fff; }
.wanted-root .pg-line { position:absolute; left:0; right:0; height:28px; background:#dde1e6; z-index:10; display:flex; align-items:center; justify-content:center; pointer-events:none; }
.wanted-root .pg-line-label { font-family:var(--font-mono); font-size:9px; color:var(--ink-3); letter-spacing:0.06em; }
.wanted-toolbar { position:fixed; top:16px; right:16px; z-index:100; display:flex; gap:8px; align-items:center; }
.wanted-variant { position:fixed; top:16px; left:16px; z-index:100; display:flex; gap:2px; padding:4px; background:rgba(255,255,255,0.88); -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); border:1px solid var(--line); border-radius:999px; box-shadow:0 4px 16px rgba(20,22,28,0.1); }
.wanted-variant-btn { border:none; background:transparent; font-family:var(--font-sans); font-size:12.5px; font-weight:700; color:var(--ink-2); padding:8px 16px; border-radius:999px; cursor:pointer; transition:background .15s, color .15s; }
.wanted-variant-btn.active { background:var(--ink); color:#fff; }
.wanted-variant-btn:not(.active):hover { background:var(--bg-soft); color:var(--ink); }
@media print { .wanted-variant { display:none !important; } }
@media (max-width:760px) { .wanted-variant { left:8px; top:8px; } }
.wanted-iconbtn { display:inline-flex; align-items:center; justify-content:center; width:42px; height:42px; background:rgba(255,255,255,0.88); -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); color:var(--ink-2); border:1px solid var(--line); border-radius:50%; box-shadow:0 4px 16px rgba(20,22,28,0.1); cursor:pointer; transition:transform .15s, box-shadow .2s, color .15s, background .15s; }
.wanted-iconbtn:hover { box-shadow:0 8px 22px rgba(20,22,28,0.16); background:#fff; color:var(--ink); }
.wanted-iconbtn svg { transition:transform .15s; }
.wanted-back:hover svg { transform:translateX(-2px); }
.wanted-print:hover svg { transform:translateY(1px); }
@media print {
  .wanted-root { background:#fff; padding:0; }
  .wanted-toolbar { display:none !important; }
  .wanted-root .sheet { width:auto; margin:0; box-shadow:none; min-height:0 !important; }
  .wanted-root .sheet-inner { padding:15mm 15mm; }
  @page { size:A4; margin:11mm 0; }
  .wanted-root .w-proj-intro, .wanted-root .contrib, .wanted-root .other-item, .wanted-root .w-cover, .wanted-root .w-two, .wanted-root .w-shots, .wanted-root .w-cg-items, .wanted-root .w-proj-head, .wanted-root .w-skills-block, .wanted-root .w-core-h, .wanted-root .w-extra-duties { break-inside:avoid; }
  .wanted-root .w-sec-title, .wanted-root .w-core-h { break-after:avoid; }
  /* every project after the first starts on its own printed page - the on-screen
     preview simulates this with JS spacers, but actual PDF/print pagination is
     decided entirely by the browser from these break-* rules, independently of
     that preview math, so the rule has to be declared here too. */
  .wanted-root .w-proj + .w-proj { break-before:page; }
  .wanted-root .pg-spacer, .wanted-root .pg-line { display:none; }
  .wanted-root * { -webkit-print-color-adjust:exact; print-color-adjust:exact; letter-spacing:normal !important; }
}
.wanted-root .w-cover { position:relative; overflow:hidden; }
.wanted-root .w-cover-deco { position:absolute; bottom:20px; border-radius:50%; pointer-events:none; }
.wanted-root .w-cover-deco.ring-a { width:220px; height:220px; right:-40px; border:1.5px solid var(--line); }
.wanted-root .w-cover-deco.ring-b { width:140px; height:140px; right:0px; border:1.5px solid var(--accent-soft); }
.wanted-root .w-cover-deco.ring-c { width:60px; height:60px; right:30px; border:2px solid var(--accent); }
.wanted-root .w-brand { font-family:var(--font-mono); font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--accent); }
.wanted-root .w-contact { position:absolute; left:0; bottom:20px; font-size:12.5px; color:var(--ink-2); }
.wanted-root .w-contact b { display:block; font-weight:800; color:var(--ink); font-size:14px; margin-bottom:4px; }
.wanted-root .w-name { font-size:19px; font-weight:800; color:var(--ink); letter-spacing:-0.01em; margin-top:18px; }
.wanted-root .w-role { font-size:44px; font-weight:800; letter-spacing:-0.045em; line-height:1.04; margin-top:8px; }
.wanted-root .w-role .dot { color:var(--accent); }
.wanted-root .w-sub { font-size:16px; color:var(--ink-2); font-weight:600; margin-top:14px; max-width:150mm; line-height:1.5; }
.wanted-root .w-hero-stats { display:flex; flex-wrap:wrap; gap:8px 24px; margin-top:20px; }
.wanted-root .w-hero-stat { font-size:12px; color:var(--ink-2); }
.wanted-root .w-hero-stat b { font-family:var(--font-mono); font-weight:800; color:var(--accent); margin-right:6px; }
.wanted-root .w-about-row { display:flex; gap:10px; font-size:12px; padding:4px 0; }
.wanted-root .w-about-row .k { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); min-width:54px; padding-top:1px; }
.wanted-root .w-about-row .v { color:var(--ink); font-weight:600; }
.wanted-root .w-skill-line { font-size:12px; color:var(--ink); line-height:1.72; }
.wanted-root .w-skill-line b { font-weight:700; }
.wanted-root .w-proj { margin-top:0; }
.wanted-root .w-proj-head { padding-bottom:14px; border-bottom:2px solid var(--ink); }
.wanted-root .w-proj-top { display:flex; align-items:baseline; justify-content:space-between; gap:16px; }
.wanted-root .w-proj-name { font-size:22px; font-weight:800; letter-spacing:-0.03em; }
.wanted-root .w-proj-period { font-family:var(--font-mono); font-size:11.5px; color:var(--accent); font-weight:600; margin-top:7px; }
/* 아키텍처는 세부 라벨이 읽혀야 하므로 항상 가로 전체 폭 한 장으로 크게 싣는다.
   실사용 화면은 그 위에 밴드로 얹어 세로로 쌓는다(2단 배치는 도면이 작아져 못 읽힘). */
.wanted-root .w-shots { display:grid; grid-template-columns:1fr; gap:10px; margin-top:14px; }
.wanted-root .w-shot { display:grid; place-items:center; width:100%; height:168px; border:1px solid var(--line); border-radius:12px; overflow:hidden; background:var(--bg-soft); font-family:var(--font-mono); font-size:11px; color:var(--ink-3); letter-spacing:0.06em; }
.wanted-root .w-shot img { width:100%; height:100%; object-fit:cover; }
.wanted-root .w-shot.arch { height:auto; min-height:150px; }
.wanted-root .w-shot.arch img { height:auto; max-height:600px; object-fit:contain; background:#fff; padding:10px; }
.wanted-root .w-proj-titlewrap { display:flex; align-items:center; gap:10px; }
.wanted-root .w-proj-logo { width:30px; height:30px; border-radius:7px; object-fit:contain; background:#fff; border:1px solid var(--line); padding:3px; flex-shrink:0; }
.wanted-root .w-sub-h { display:flex; align-items:center; gap:8px; font-size:15px; font-weight:800; letter-spacing:-0.01em; color:var(--ink); margin:22px 0 11px; padding-bottom:8px; border-bottom:1px solid var(--line); }
.wanted-root .w-sub-h::before { content:""; width:8px; height:8px; border-radius:2px; background:var(--accent); flex-shrink:0; }
.wanted-root .w-overview { font-size:12.5px; color:var(--ink-2); line-height:1.62; }
.wanted-root .w-role-list { display:flex; flex-direction:column; gap:5px; }
.wanted-root .w-be-list { margin-top:11px; gap:6px; }
/* 경력 - 이력서(career.groups)와 동일한 항목을 포폴에도 싣는다 */
.wanted-root .w-career-meta { font-size:12px; color:var(--ink-2); margin-top:-4px; }
.wanted-root .w-career-overview { font-size:12.5px; color:var(--ink-2); line-height:1.62; margin-top:8px; }
.wanted-root .w-cg { margin-top:17px; }
.wanted-root .w-cg-top { display:flex; align-items:baseline; justify-content:space-between; gap:12px; padding-bottom:7px; border-bottom:1px solid var(--line); }
.wanted-root .w-cg-title { font-size:13.5px; font-weight:800; letter-spacing:-0.02em; }
.wanted-root .w-cg-period { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); flex-shrink:0; }
.wanted-root .w-cg-items { display:flex; flex-direction:column; gap:6px; margin-top:9px; }
.wanted-root .w-cg-item { font-size:12px; color:var(--ink); line-height:1.55; padding-left:13px; position:relative; }
.wanted-root .w-cg-item::before { content:""; position:absolute; left:0; top:7px; width:4px; height:4px; border-radius:50%; background:var(--accent); }
.wanted-root .w-cg-sub { display:flex; flex-direction:column; gap:3px; margin-top:4px; }
.wanted-root .w-cg-subitem { font-size:11px; color:var(--ink-2); line-height:1.5; padding-left:11px; position:relative; }
.wanted-root .w-cg-subitem::before { content:"-"; position:absolute; left:0; color:var(--ink-3); }
.wanted-root .w-role-item { font-size:12.5px; color:var(--ink); line-height:1.55; padding-left:14px; position:relative; }
.wanted-root .w-role-item::before { content:""; position:absolute; left:0; top:8px; width:5px; height:5px; border-radius:50%; background:var(--accent); }
.wanted-root .w-extra-duties { display:flex; flex-direction:column; gap:4px; margin-top:12px; }
.wanted-root .w-extra-duty-item { padding-left:13px; position:relative; font-size:11.5px; color:var(--ink-3); line-height:1.5; }
.wanted-root .w-extra-duty-item::before { content:""; position:absolute; left:0; top:6px; width:4px; height:4px; border-radius:50%; background:var(--ink-3); }
.wanted-root .w-stack { display:flex; flex-wrap:wrap; gap:6px; }
.wanted-root .tag { font-family:var(--font-mono); font-size:10px; color:var(--ink-2); background:var(--bg-soft); border:1px solid var(--line); border-radius:6px; padding:4px 9px; }
.wanted-root .w-core-h { margin-top:20px; }
.wanted-root .contrib { margin-top:22px; }
.wanted-root .contrib-h { font-size:12.5px; font-weight:600; color:var(--ink-2); letter-spacing:-0.01em; margin-bottom:10px; }
.wanted-root .ab { display:flex; flex-direction:column; gap:6px; }
.wanted-root .ab + .ab { margin-top:14px; }
.wanted-root .ab-k { display:inline-block; font-family:var(--font-mono); font-size:10px; font-weight:800; letter-spacing:0.04em; }
.wanted-root .ab.asis .ab-k { color:var(--asis); }
.wanted-root .ab.tobe .ab-k { color:var(--tobe); }
.wanted-root .ab-v { font-size:12px; line-height:1.66; color:var(--ink); }
.wanted-root .ab-v.muted { color:var(--ink-2); }
.wanted-root .ab-list { display:flex; flex-direction:column; gap:5px; }
.wanted-root .ab-list .li { font-size:12px; color:var(--ink); line-height:1.55; padding-left:13px; position:relative; }
.wanted-root .ab-list .li::before { content:""; position:absolute; left:0; top:7px; width:4px; height:4px; border-radius:50%; background:var(--tobe); }
.wanted-root .ab-result { margin-top:9px; padding:8px 12px; background:var(--tobe-soft); border-radius:8px; font-size:12px; font-weight:700; color:var(--ink); display:flex; align-items:baseline; gap:6px; }
.wanted-root .ab-result-arrow { color:var(--tobe); font-weight:800; flex-shrink:0; }
.wanted-root .w-flow { display:flex; flex-wrap:wrap; align-items:center; gap:5px; margin-top:12px; padding-top:12px; border-top:1px dashed var(--line); list-style:none; }
.wanted-root .w-flow-step { display:flex; align-items:center; gap:5px; }
.wanted-root .w-flow-badge { display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px; border:1px solid var(--line); background:var(--bg-soft); font-size:10.5px; }
.wanted-root .w-flow-num { display:inline-flex; align-items:center; justify-content:center; width:14px; height:14px; border-radius:50%; background:var(--accent); color:#fff; font-size:9px; font-weight:800; flex-shrink:0; }
.wanted-root .w-flow-name { font-weight:700; color:var(--ink); }
.wanted-root .w-flow-desc { color:var(--ink-2); }
.wanted-root .w-flow-arrow { color:var(--ink-3); font-size:10px; }
.wanted-root .other-item { padding:13px 0; border-bottom:1px solid var(--line); }
.wanted-root .other-item:last-child { border-bottom:none; padding-bottom:0; }
.wanted-root .other-top { display:flex; align-items:baseline; justify-content:space-between; gap:14px; }
.wanted-root .other-name { font-size:14px; font-weight:800; }
.wanted-root .other-meta { font-family:var(--font-mono); font-size:10.5px; color:var(--ink-3); white-space:nowrap; }
.wanted-root .other-desc { font-size:12px; color:var(--ink-2); margin-top:4px; line-height:1.6; }
.wanted-root .other-contrib { font-size:11.5px; color:var(--ink); margin-top:6px; }
.wanted-root .w-two { display:grid; grid-template-columns:1fr 1fr; gap:30px; }
.wanted-root .edu-item, .wanted-root .cert-item { padding:10px 0; border-bottom:1px solid var(--line-2); }
.wanted-root .edu-item:first-child, .wanted-root .cert-item:first-child { padding-top:0; }
.wanted-root .edu-item:last-child, .wanted-root .cert-item:last-child { border-bottom:none; padding-bottom:0; }
.wanted-root .edu-school { font-size:13px; font-weight:700; }
.wanted-root .edu-degree { font-size:11.5px; color:var(--ink-2); margin-top:2px; }
.wanted-root .edu-meta { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); margin-top:4px; }
.wanted-root .cert-top { display:flex; justify-content:space-between; align-items:baseline; }
.wanted-root .cert-name { font-size:13px; font-weight:700; }
.wanted-root .cert-date { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); }
.wanted-root .cert-issuer { font-size:11px; color:var(--ink-2); margin-top:2px; }
.wanted-root .w-sec-title { font-size:19px; font-weight:800; letter-spacing:-0.03em; margin:28px 0 13px; padding-bottom:9px; border-bottom:2px solid var(--ink); }
.wanted-root .foot { margin-top:26px; padding-top:12px; border-top:1px solid var(--line); display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:9.5px; color:var(--ink-3); letter-spacing:0.03em; }
/* Sheet stays fixed A4 width at every viewport - small screens scroll horizontally,
   content never reflows (deterministic pagination). */
`;

const MARK_RE = new RegExp(
  [
    "\\d[\\d.]*\\s*(?:건|분|초|배|파드|장|개|명|%)\\s*(?:→|->)\\s*\\d[\\d.]*\\s*(?:건|분|초|배|파드|장|개|명)?",
    "O\\(N?\\)\\s*(?:→|->)\\s*O\\(1\\)",
    "\\d+\\s*%\\s*(?:향상|개선|단축|절감)",
    "GPU\\s*\\d+장\\s*(?:→|->)\\s*\\d+파드",
    "수정 0건|유실 0건|호출 0회|(?<![\\d.,])0건|(?<![\\d.,])0회",
  ].map((s) => `(?:${s})`).join("|"),
  "g"
);

/** Wrap measurable metrics in <mark>, mirroring wanted-doc hl(). */
function hl(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  MARK_RE.lastIndex = 0;
  while ((m = MARK_RE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<mark key={`${m.index}-${m[0]}`}>{m[0]}</mark>);
    last = m.index + m[0].length;
    if (m.index === MARK_RE.lastIndex) MARK_RE.lastIndex++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const GAP = 28; // px - height of the gray page-gap bar

function topInSheet(el: HTMLElement, sheet: HTMLElement): number {
  const er = el.getBoundingClientRect();
  const sr = sheet.getBoundingClientRect();
  return er.top - sr.top;
}

export function PortfolioDocument({ initialTab }: { initialTab?: string | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [variant, setVariant] = useState<Variant>(() => variantFromTab(initialTab));
  const { data: P, roleEn } = VARIANTS[variant];
  const projects = P.projects as DocProject[];
  const activities = P.activities as DocActivity[];
  // 인프라 문서에만 있는 백엔드/프론트엔드 개발 경험 - 별도 섹션이 아니라 관련 프로젝트의
  // 핵심 업무 밑에 한 줄씩 붙인다 (풀스택 문서는 프로젝트 본문에 이미 포함이라 없음).
  const devNotes = "devNotes" in P ? (P.devNotes as CareerItem[]) : [];
  const devNotesOf = (key?: string) => (key ? devNotes.filter((it) => it.proj === key) : []);
  const career = P.career as DocCareer;
  // 포폴은 경력 칸을 따로 두지 않는다. 경력 항목을 proj 키로 프로젝트별로 나눠 각 프로젝트
  // 안에 '담당 업무'로 싣고, 프로젝트에 안 붙는 항목(사내 자동화 등)만 뒤에 따로 모은다.
  // '프로젝트 개요' 그룹은 프로젝트 제목·기간·역할과 중복이라 제외.
  const careerItems = career.groups
    .filter((g) => g.title !== "프로젝트 개요")
    .flatMap((g) => g.items as CareerItem[]);
  // blocks[]에서 이미 스토리로 다루는 항목(coveredByBlock)은 중복이니 제외 - 핵심 업무와
  // 안 겹치는 나머지만 간략히 보여준다.
  const dutiesOf = (key?: string) =>
    key ? careerItems.filter((it) => it.proj === key && !it.coveredByBlock) : [];
  // 프로젝트 밑에 넣으면 꼬리표 "(NIPA)"는 중복이므로 렌더 시 떼어낸다.
  const stripTag = (t: string) => t.replace(/\s*\((?:국가보안기관|KARI|NIPA|드론)\)$/, "");
  const commonItems = careerItems.filter((it) => !it.proj);

  const handleVariantChange = useCallback((key: Variant) => {
    setVariant(key);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", TAB_PARAM[key]);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router]);
  const sheetRef = useRef<HTMLDivElement>(null);

  const applyBreaks = useCallback(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    // clean up previous injections (reset min-height first so the re-measure is honest)
    sheet.style.minHeight = '';
    sheet.querySelectorAll('.pg-spacer, .pg-line').forEach(el => el.remove());

    // Page size is fixed to the CSS rendering of A4 (1mm = 96/25.4px at every
    // resolution), so breaks are deterministic and never shift between reloads
    // or screens. This matches the 210mm sheet's own rendered width.
    const pxPerMm = 96 / 25.4;
    const pageH = 297 * pxPerMm;

    // Rule: flow continuously, but never cut a unit across a page boundary. The
    // portfolio is flat (no section wrappers), so each unit is kept whole and
    // sections simply flow. Units too tall to fit a page (a whole project) are
    // skipped, and their inner blocks (contrib, shots) handle the crossing.
    // .w-shots: 아키텍처 도면이 커진 뒤로 intro 전체가 한 페이지에 안 들어갈 수 있어,
    // 그 경우 이미지 블록만이라도 통째로 다음 페이지로 넘긴다(도면이 잘리는 것 방지).
    // .w-cg-items(담당 업무 목록): 도면이 커진 뒤 .w-proj-intro 가 한 페이지를 넘길 수 있어,
    // 그 경우 intro 는 통째 유지를 포기하고 도면(.w-shots)·담당 업무 단위로 넘긴다.
    const KEEP = '.w-proj, .w-cover, .contrib, .other-item, .w-two, .w-shots, .w-cg-items, .w-proj-head, .w-skills-block, .w-proj-intro, .w-sec-title, .w-core-h, .w-extra-duties';
    const PAGE_PAD = pxPerMm * 16;       // top inset kept at the start of every continued page
    const usable = pageH - PAGE_PAD * 2 - GAP; // a unit taller than this can't be kept whole

    // Cover fills the rest of page 1 (deterministic, set once - not part of the
    // push/spacer logic below, so it can't interact with or destabilize it).
    // Gives the corner decoration a fixed box to anchor to via plain CSS.
    const cover = sheet.querySelector('.w-cover') as HTMLElement | null;
    if (cover) {
      cover.style.minHeight = '';
      const coverTop = topInSheet(cover, sheet);
      cover.style.minHeight = `${Math.max(0, pageH - coverTop - GAP - PAGE_PAD)}px`;
    }

    // first real content block following a section title - kept on the same page
    // as the title so it never lands alone at the bottom. The layout is flat, so
    // find the first block that follows the title in document order.
    const firstBlockOf = (header: HTMLElement): HTMLElement | null => {
      const blocks = Array.from(
        sheet.querySelectorAll('.w-proj-intro, .contrib, .other-item, .w-two')
      ) as HTMLElement[];
      for (const b of blocks) {
        if (header.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) return b;
      }
      return null;
    };

    // push an element to the top of the next page so that its visible content
    // lands at exactly GAP + PAGE_PAD below the boundary - regardless of which
    // element type starts the page. `top` is the border-box top, and the element
    // only moves down by the spacer's height (its margin-top still applies on top
    // of the spacer, so margin must NOT be subtracted). Only the border-box-inner
    // spacing (border + padding) offsets the visible content, so subtract that.
    const pushBefore = (el: HTMLElement, top: number, boundary: number) => {
      const cs = getComputedStyle(el);
      const ownInset =
        (parseFloat(cs.borderTopWidth) || 0) +
        (parseFloat(cs.paddingTop) || 0);
      const spacer = document.createElement('div');
      spacer.className = 'pg-spacer';
      spacer.style.height = `${Math.max(0, boundary - top + GAP + PAGE_PAD - ownInset)}px`;
      el.parentNode?.insertBefore(spacer, el);
    };

    // Cover page: Projects always starts on page 2, even if it would fit on
    // page 1 - the header reads as a dedicated cover. Runs before the single
    // pass below so everything after Projects re-flows against the shift.
    const projTitle = sheet.querySelector('.w-sec-title') as HTMLElement | null;
    if (projTitle) {
      const top = topInSheet(projTitle, sheet);
      if (top < pageH) pushBefore(projTitle, top, pageH);
    }

    // Single top-to-bottom pass. A push only ever moves elements that come
    // AFTER it in the DOM (never before), so once an element earlier in
    // document order is resolved it never needs revisiting - each element is
    // measured and, if needed, fixed exactly once. (An earlier version
    // restarted the whole scan from the top after every fix, which could
    // reprocess the same element many times and, if a fix ever failed to
    // fully clear a later check, kept stacking spacers - the runaway
    // "63-page" bug.)
    //
    // The "every project after the first starts on a fresh page" rule used to
    // run as its own pre-pass, before this loop. That measured every
    // project's position before any of THIS loop's fixes had reflowed the
    // page - so a project's forced-break spacer was sized for a position
    // that later shifted once an earlier project's own overflow (its
    // "핵심 업무" heading, an oversized contrib block, etc.) got pushed down
    // by this loop. The two pushes stacked instead of replacing each other,
    // producing a spacer taller than a full page - i.e. a fully blank page.
    // Folding the project-break rule into this same pass (below, on '.w-proj'
    // itself) fixes that: because it now runs in strict document order
    // together with everything else, a later project is only ever measured
    // after every earlier project's own internal breaks are already applied.
    const firstProj = sheet.querySelector('.w-proj') as HTMLElement | null;
    const els = Array.from(sheet.querySelectorAll(KEEP)) as HTMLElement[];
    for (const el of els) {
      const top = topInSheet(el, sheet);
      const pageIdx = Math.floor(top / pageH);
      const prevBoundary = pageIdx * pageH;
      const boundary = prevBoundary + pageH;

      if (el.classList.contains('w-proj')) {
        // "already at the top of its page" means sitting at the exact spot a
        // push would have landed it (boundary + GAP + PAGE_PAD), not merely
        // top > prevBoundary - virtually everything satisfies that trivial
        // check, which pushed already-correctly-placed projects one page
        // further every time.
        if (el !== firstProj) {
          const canonicalTop = prevBoundary + GAP + PAGE_PAD;
          if (Math.abs(top - canonicalTop) > 4) pushBefore(el, top, boundary);
        }
        continue; // a whole project is usually taller than one page - the fit-check below is for finer units
      }

      const h = el.offsetHeight;
      if (h > usable) continue; // too tall to keep whole - a finer unit handles it

      // a title is "cut" if it would be split from its first block (break-after:avoid)
      let span = top + h;
      if (el.classList.contains('w-sec-title') || el.classList.contains('w-core-h')) {
        const fb = firstBlockOf(el);
        if (fb && fb.offsetHeight <= usable) span = topInSheet(fb, sheet) + fb.offsetHeight;
      }

      // (1) element (or title + first block) crosses the next boundary → next page
      if (boundary > top && boundary < span) {
        pushBefore(el, top, boundary);
        continue;
      }
      // (2) element sits underneath a page-gap bar (covered) → nudge below the bar
      if (prevBoundary >= pageH && top - prevBoundary < GAP) {
        pushBefore(el, top, prevBoundary);
      }
    }

    // pad the sheet up to a whole number of pages, so the last page is a full
    // fixed-size A4 too (the white sheet fills the last page instead of ending
    // at the content).
    const contentH = sheet.scrollHeight;
    const pages = Math.max(1, Math.ceil((contentH - 1) / pageH));
    sheet.style.minHeight = `${pages * pageH}px`;

    // overlay page-gap bars at each boundary
    for (let p = 1; p < pages; p++) {
      const line = document.createElement('div');
      line.className = 'pg-line';
      line.style.top = `${p * pageH}px`;
      line.innerHTML = `<span class="pg-line-label">PAGE ${p + 1}</span>`;
      sheet.appendChild(line);
    }
  }, []);

  useEffect(() => {
    applyBreaks();
    // Web fonts load after first paint; the initial measure uses fallback-font
    // metrics and misplaces breaks. Recompute once fonts are ready, and again on
    // the next frame to settle any reflow.
    let raf = 0;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        applyBreaks();
        raf = requestAnimationFrame(applyBreaks);
      });
    }
    // 아키텍처 도면(.w-shot.arch)은 height:auto 라 로드가 끝나기 전에는 min-height(150px)
    // 로만 측정된다. 로드 후 실제 높이(최대 420px)로 늘어나므로, 그때 다시 계산하지 않으면
    // 늘어난 만큼 뒤 내용이 페이지 경계에서 밀린다. ResizeObserver는 WIDTH만 보기 때문에
    // (높이는 applyBreaks 자신이 바꾸므로 관찰 시 무한 루프) 이미지 로드를 직접 기다린다.
    let imgRaf = 0;
    const scheduleFromImage = () => {
      if (imgRaf) cancelAnimationFrame(imgRaf);
      imgRaf = requestAnimationFrame(applyBreaks);
    };
    const imgCleanups: Array<() => void> = [];
    sheetRef.current?.querySelectorAll("img").forEach((im) => {
      if (im.complete && im.naturalHeight > 0) return;
      im.addEventListener("load", scheduleFromImage);
      im.addEventListener("error", scheduleFromImage);
      imgCleanups.push(() => {
        im.removeEventListener("load", scheduleFromImage);
        im.removeEventListener("error", scheduleFromImage);
      });
    });

    // Only recompute when the sheet's WIDTH changes (window resize / zoom).
    // applyBreaks mutates the sheet's HEIGHT (spacers + min-height); observing
    // that would feed back into an endless resize loop.
    let lastW = sheetRef.current?.clientWidth ?? 0;
    const ro = new ResizeObserver(() => {
      const w = sheetRef.current?.clientWidth ?? 0;
      if (w === lastW) return;
      lastW = w;
      applyBreaks();
    });
    if (sheetRef.current) ro.observe(sheetRef.current);
    return () => {
      ro.disconnect();
      imgCleanups.forEach((fn) => fn());
      if (raf) cancelAnimationFrame(raf);
      if (imgRaf) cancelAnimationFrame(imgRaf);
    };
  }, [applyBreaks, variant]);

  return (
    <div className="wanted-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="wanted-variant">
        {(Object.keys(VARIANTS) as Variant[]).map((key) => (
          <button
            key={key}
            className={`wanted-variant-btn${variant === key ? " active" : ""}`}
            onClick={() => handleVariantChange(key)}
          >
            {VARIANTS[key].label}
          </button>
        ))}
      </div>
      <div className="wanted-toolbar">
        <Link href="/" className="wanted-iconbtn wanted-back" aria-label="포트폴리오로 돌아가기" title="포트폴리오로 돌아가기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
        </Link>
        <button className="wanted-iconbtn wanted-print" onClick={() => window.print()} aria-label="PDF로 저장 / 인쇄" title="PDF로 저장 / 인쇄">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
        </button>
      </div>

      <div className="sheet" ref={sheetRef}><div className="sheet-inner">
        <div className="w-cover">
          <div className="w-cover-deco ring-a" aria-hidden="true" />
          <div className="w-cover-deco ring-b" aria-hidden="true" />
          <div className="w-cover-deco ring-c" aria-hidden="true" />
          <div className="w-brand">Portfolio</div>
          <div className="w-hero">
            <div className="w-name">{P.name}</div>
            <div className="w-role">{roleEn}<span className="dot">.</span></div>
            <div className="w-sub">{P.tagline}</div>
            <div className="w-hero-stats">
              {(P.highlights as { v: string; l: string }[]).slice(0, 4).map((h, i) => (
                <span key={i} className="w-hero-stat"><b>{h.v}</b>{h.l}</span>
              ))}
            </div>
            <div className="w-contact"><b>{P.name}</b>{P.email}</div>
          </div>
        </div>

        <div className="w-sec-title">Projects</div>
        {projects.map((pr, idx) => (
          <div key={idx} className="w-proj">
            <div className="w-proj-intro">
              <div className="w-proj-head">
                <div className="w-proj-top">
                  <span className="w-proj-titlewrap">
                    {pr.logo && <img src={pr.logo} alt="" className="w-proj-logo" />}
                    <span className="w-proj-name">{pr.title}</span>
                  </span>
                </div>
                <div className="w-proj-period">{pr.company} · {pr.period}</div>
              </div>
              {(pr.screenshot || pr.archImage) && (
                <div className="w-shots">
                  {pr.screenshot && (
                    <div className="w-shot"><img src={pr.screenshot} alt="실사용 화면" /></div>
                  )}
                  {pr.archImage && (
                    <div className="w-shot arch"><img src={pr.archImage} alt="아키텍처" /></div>
                  )}
                </div>
              )}
              <div className="w-sub-h">개요</div>
              <div className="w-overview">{pr.desc}</div>
              <div className="w-skills-block">
                <div className="w-sub-h">Skills</div>
                <div className="w-stack">{pr.stack.map((s) => <span key={s} className="tag">{s}</span>)}</div>
              </div>
            </div>

            {pr.blocks.length > 0 && <div className="w-sub-h w-core-h">핵심 업무</div>}
            {pr.blocks.map((b, j) => (
              <div key={j} className="contrib">
                <div className="contrib-h">{b.label}</div>
                <div className="ab asis">
                  <span className="ab-k">AS-IS</span>
                  <div className="ab-v muted">{b.situation} <span style={{ opacity: 0.85 }}>{b.cause}</span></div>
                </div>
                <div className="ab tobe">
                  <span className="ab-k">TO-BE</span>
                  <div className="ab-v">
                    <div className="ab-list">{b.actions.map((a, k) => <div key={k} className="li">{hl(a)}</div>)}</div>
                    <div className="ab-result"><span className="ab-result-arrow">→</span>{hl(b.result)}</div>
                  </div>
                </div>
                {b.flow && b.flow.length > 0 && (
                  <ol className="w-flow">
                    {b.flow.map((f, k) => (
                      <li key={k} className="w-flow-step">
                        <span className="w-flow-badge">
                          <span className="w-flow-num">{k + 1}</span>
                          <span className="w-flow-name">{f.step}</span>
                          <span className="w-flow-desc">{f.desc}</span>
                        </span>
                        {k < b.flow!.length - 1 && <span className="w-flow-arrow">→</span>}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
            {/* 담당 업무·백엔드/프론트엔드 개발 경험은 별도 섹션으로 다 나열하지 않는다 -
                blocks[]와 겹치는 항목이 대부분이라 중복이었다. 안 겹치는 나머지만 핵심 업무
                밑에 간략히 한 줄씩 덧붙인다. */}
            {(dutiesOf(pr.pkey).length > 0 || devNotesOf(pr.pkey).length > 0) && (
              <div className="w-extra-duties">
                {[
                  ...dutiesOf(pr.pkey).map((it) => stripTag(it.text.split(" - ")[0])),
                  ...devNotesOf(pr.pkey).map((it) => it.text),
                ].map((t, i) => <div key={i} className="w-extra-duty-item">{t}</div>)}
              </div>
            )}
          </div>
        ))}

        {commonItems.length > 0 && (
          <>
            <div className="w-sec-title">사내 공통 · 업무 자동화</div>
            <div className="other-item">
              <div className="w-cg-items">
                {commonItems.map((it, j) => (
                  <div key={j} className="w-cg-item">
                    {hl(it.text)}
                    {it.sub && it.sub.length > 0 && (
                      <div className="w-cg-sub">
                        {it.sub.map((s, k) => <div key={k} className="w-cg-subitem">{hl(s)}</div>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="w-sec-title">대외활동 · 학습</div>
        {activities.map((a, i) => (
          <div key={i} className="other-item">
            <div className="other-top"><span className="other-name">{a.title}</span><span className="other-meta">{a.org} · {a.year}</span></div>
            <div className="other-desc">{a.desc}</div>
            {a.notes.map((n, j) => <div key={j} className="other-contrib">{hl(n)}</div>)}
          </div>
        ))}

        <div className="w-sec-title">Skills · About</div>
        <div className="w-two">
          <div>
            {P.skills.map((g) => (
              <div key={g.category} className="w-skill-line"><b>{g.category}</b> · {g.items.join(", ")}</div>
            ))}
          </div>
          <div>
            <div className="w-about-row"><span className="k">EMAIL</span><span className="v">{P.email}</span></div>
            <div className="w-about-row"><span className="k">GITHUB</span><span className="v">{P.github}</span></div>
            <div className="w-about-row"><span className="k">PORTFOLIO</span><a className="v" href={P.portfolioUrl} target="_blank" rel="noopener noreferrer">{P.portfolio}</a></div>
            <div className="w-about-row"><span className="k">BASE</span><span className="v">{P.location}</span></div>
            <div className="w-about-row"><span className="k">CAREER</span><span className="v">{P.career.company} · 5년</span></div>
          </div>
        </div>

        <div className="w-sec-title">Education · Certifications</div>
        <div className="w-two">
          <div>
            {P.education.map((e, i) => (
              <div key={i} className="edu-item">
                <div className="edu-school">{e.school}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-meta">{e.period} · {e.status}</div>
              </div>
            ))}
          </div>
          <div>
            {P.certs.map((c, i) => (
              <div key={i} className="cert-item">
                <div className="cert-top"><span className="cert-name">{c.name}</span><span className="cert-date">{c.date}</span></div>
                <div className="cert-issuer">{c.status} · {c.issuer}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="foot"><span>{P.name} · {roleEn}</span><span>{P.email}</span></div>
      </div></div>
    </div>
  );
}
