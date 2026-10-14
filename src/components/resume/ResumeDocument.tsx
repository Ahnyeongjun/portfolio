"use client";

import Link from "next/link";
import { Fragment, useRef, useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SHOW_VARIANT_TABS } from "@/lib/docVariants";
import { PROFILE, PROFILE_PLATFORM } from "@/data/profileDoc";
import type { ResumeOverride } from "@/data/resumeOverrides";

const VARIANTS = {
  backend: { label: "풀스택", data: PROFILE },
  platform: { label: "인프라", data: PROFILE_PLATFORM },
} as const;
type Variant = keyof typeof VARIANTS;

const CSS = `
.rallit-root { --ink:#17181c; --ink-2:#484c54; --ink-3:#9298a2; --line:#e8eaed; --line-2:#f1f3f5; --bg-soft:#f7f8fa; --accent:#16c47f; --accent-soft:#e7f8f0; --font-sans:"Pretendard",-apple-system,BlinkMacSystemFont,system-ui,"Apple SD Gothic Neo",sans-serif; --font-mono:"JetBrains Mono",ui-monospace,"SFMono-Regular",monospace; }
.rallit-root { background:#dde1e6; color:var(--ink); font-family:var(--font-sans); line-height:1.62; letter-spacing:-0.012em; word-break:keep-all; -webkit-font-smoothing:antialiased; min-height:100vh; padding:1px 0; }
.rallit-root * { box-sizing:border-box; margin:0; padding:0; }
.rallit-root a { color:inherit; text-decoration:none; }
.rallit-root .sheet { width:210mm; min-height:297mm; background:#fff; margin:22px auto; position:relative; box-shadow:0 1px 2px rgba(20,22,28,0.05),0 18px 50px rgba(20,22,28,0.12); }
.rallit-root .sheet-inner { padding:15mm 16mm 16mm; }
.rallit-root .pg-spacer { background:#fff; }
.rallit-root .pg-line { position:absolute; left:0; right:0; height:28px; background:#dde1e6; z-index:10; display:flex; align-items:center; justify-content:center; pointer-events:none; }
.rallit-root .pg-line-label { font-family:var(--font-mono); font-size:9px; color:var(--ink-3); letter-spacing:0.06em; }
.rallit-toolbar { position:fixed; top:16px; right:16px; z-index:100; display:flex; gap:8px; align-items:center; }
.rallit-variant { position:fixed; top:16px; left:16px; z-index:100; display:flex; gap:2px; padding:4px; background:rgba(255,255,255,0.88); -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); border:1px solid var(--line); border-radius:999px; box-shadow:0 4px 16px rgba(20,22,28,0.1); }
.rallit-variant-btn { border:none; background:transparent; font-family:var(--font-sans); font-size:12.5px; font-weight:700; color:var(--ink-2); padding:8px 16px; border-radius:999px; cursor:pointer; transition:background .15s, color .15s; }
.rallit-variant-btn.active { background:var(--ink); color:#fff; }
.rallit-variant-btn:not(.active):hover { background:var(--bg-soft); color:var(--ink); }
@media print { .rallit-variant { display:none !important; } }
@media (max-width:760px) { .rallit-variant { left:8px; top:8px; } }
.rallit-iconbtn { display:inline-flex; align-items:center; justify-content:center; width:42px; height:42px; background:rgba(255,255,255,0.88); -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); color:var(--ink-2); border:1px solid var(--line); border-radius:50%; box-shadow:0 4px 16px rgba(20,22,28,0.1); cursor:pointer; transition:transform .15s, box-shadow .2s, color .15s, background .15s; }
.rallit-iconbtn:hover { box-shadow:0 8px 22px rgba(20,22,28,0.16); background:#fff; color:var(--ink); }
.rallit-iconbtn svg { transition:transform .15s; }
.rallit-back:hover svg { transform:translateX(-2px); }
.rallit-print:hover svg { transform:translateY(1px); }
@media print {
  /* Reuse the exact same on-screen pixel layout applyBreaks() already computed
     (spacers, min-height) instead of letting the browser's native paginator
     recompute breaks from scratch - that second, independent pass is what
     used to make printed pages disagree with the preview (e.g. 경력 snapping
     back up once its force-break spacer was hidden). @page margin is 0
     because .sheet-inner's own padding + PAGE_PAD already reserve every
     page's margin - an added @page margin would double it and drift pages
     apart again. */
  .rallit-root { background:#fff; padding:0; }
  .rallit-toolbar { display:none !important; }
  .rallit-root .sheet { width:auto; margin:0; box-shadow:none; }
  @page { size:A4; margin:0; }
  .rallit-root .pg-line { display:none; }
  .rallit-root * { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
}
.rallit-root .hd { display:flex; justify-content:space-between; align-items:flex-start; gap:28px; }
.rallit-root .hd-main { flex:1; min-width:0; }
.rallit-root .hd-photo { flex-shrink:0; width:88px; height:110px; border-radius:8px; overflow:hidden; background:var(--bg-soft); }
.rallit-root .hd-photo img { width:100%; height:100%; object-fit:cover; }
.rallit-root .hd-name-row { display:flex; align-items:baseline; flex-wrap:wrap; gap:12px; }
.rallit-root .hd-name { font-size:34px; font-weight:800; letter-spacing:-0.04em; line-height:1.05; }
.rallit-root .hd-role { font-size:16.5px; font-weight:600; color:var(--ink-2); }
.rallit-root .hd-contact { display:flex; flex-wrap:wrap; gap:7px 20px; margin-top:16px; }
.rallit-root .hd-contact .row { display:flex; align-items:baseline; gap:8px; font-size:13px; color:var(--ink-2); }
.rallit-root .hd-contact .ck { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); letter-spacing:0.06em; }
.rallit-root .hd-contact .v { font-weight:600; }
.rallit-root .hd-photo { width:110px; height:110px; flex-shrink:0; border-radius:50%; overflow:hidden; box-shadow:0 2px 12px rgba(20,22,28,0.14); }
.rallit-root .hd-photo img { display:block; width:100%; height:100%; object-fit:cover; }
.rallit-root .hd-rule { height:2px; background:var(--ink); margin:13px 0 0; }
.rallit-root .motivation-block { margin-top:15px; padding-bottom:14px; border-bottom:1px solid var(--line); }
.rallit-root .blog-weapon { display:flex; align-items:baseline; gap:9px; margin-top:14px; padding:10px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); text-decoration:none; }
.rallit-root .blog-weapon-ar { color:var(--accent); font-weight:800; font-size:13px; }
.rallit-root .blog-weapon-tx { font-size:13px; font-weight:700; color:var(--ink); letter-spacing:-0.01em; line-height:1.5; }
.rallit-root .blog-weapon-url { display:block; font-size:11.5px; font-weight:500; color:#2563eb; margin-top:2px; }
.rallit-root .tagline { margin-top:14px; font-size:14.5px; font-weight:700; color:var(--ink); line-height:1.6; letter-spacing:-0.02em; }
.rallit-root .summary { margin-top:15px; display:flex; flex-direction:column; gap:12px; }
.rallit-root .sm-head { font-size:14.5px; font-weight:800; color:var(--ink); line-height:1.5; letter-spacing:-0.025em; margin-bottom:6px; }
.rallit-root .sm-body { font-size:13px; color:var(--ink-2); line-height:1.75; white-space:pre-line; }
.rallit-root .sm-close { font-size:13px; color:var(--ink-2); line-height:1.75; padding-top:14px; border-top:1px solid var(--line); }
.rallit-root .highlights { display:flex; margin-top:22px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.rallit-root .hl { flex:1; padding:15px 18px; border-left:1px solid var(--line); }
.rallit-root .hl:first-child { border-left:none; padding-left:0; }
.rallit-root .hl .v { font-family:var(--font-mono); font-size:16px; font-weight:800; color:var(--ink); letter-spacing:-0.02em; }
.rallit-root .hl .l { font-size:12px; color:var(--ink-2); font-weight:600; margin-top:6px; }
.rallit-root .sec { margin-top:26px; }
.rallit-root .sec-h { display:flex; align-items:baseline; gap:11px; padding-bottom:8px; border-bottom:1.5px solid var(--ink); margin-bottom:13px; }
.rallit-root .sec-h .no { font-family:var(--font-mono); font-size:11.5px; font-weight:700; color:var(--ink-3); }
.rallit-root .sec-h .t { font-size:19px; font-weight:800; letter-spacing:-0.03em; }
.rallit-root .career-head { display:flex; justify-content:space-between; align-items:baseline; gap:16px; }
.rallit-root .career-co { font-size:18px; font-weight:800; }
.rallit-root .career-pos { font-size:12.5px; color:var(--ink-3); margin-top:3px; }
.rallit-root .career-period { font-family:var(--font-mono); font-size:11.5px; color:var(--ink-3); white-space:nowrap; }
.rallit-root .proj { margin-bottom:16px; border-top:1px solid var(--line-2); padding-top:13px; }
.rallit-root .proj:first-child { border-top:none; padding-top:0; }
.rallit-root .proj:last-child { margin-bottom:0; }
.rallit-root .career-groups { margin-top:12px; padding-left:14px; display:flex; flex-direction:column; gap:10px; }
.rallit-root .career-group {}
.rallit-root .cg-top { display:flex; justify-content:space-between; align-items:baseline; gap:12px; margin-bottom:5px; }
.rallit-root .cg-title { font-size:13px; font-weight:700; color:var(--ink); }
.rallit-root .cg-period { font-family:var(--font-mono); font-size:10.5px; color:var(--ink-3); white-space:nowrap; }
.rallit-root .cg-items { list-style:none; display:flex; flex-direction:column; gap:3px; }
.rallit-root .cg-item { font-size:12.5px; color:var(--ink-2); line-height:1.6; padding-left:12px; position:relative; }
.rallit-root .cg-item::before { content:""; position:absolute; left:0; top:8px; width:3px; height:3px; border-radius:50%; background:var(--ink-3); }
.rallit-root .cg-sub-items { list-style:none; display:flex; flex-direction:column; gap:2px; margin-top:3px; }
.rallit-root .cg-sub-item { font-size:11px; color:var(--ink-3); line-height:1.5; padding-left:12px; position:relative; }
.rallit-root .cg-sub-item::before { content:"−"; position:absolute; left:0; top:0; font-size:10.5px; color:var(--ink-3); }
.rallit-root .career-projs { margin-top:0; display:flex; flex-direction:column; }
.rallit-root .proj-head { margin-bottom:10px; }
.rallit-root .proj-top { display:flex; justify-content:space-between; align-items:baseline; gap:14px; }
.rallit-root .proj-title { font-size:16.5px; font-weight:800; letter-spacing:-0.025em; color:var(--ink); }
.rallit-root .proj-period { font-family:var(--font-mono); font-size:11px; color:var(--ink-3); white-space:nowrap; }
.rallit-root .proj-desc { font-size:12.5px; color:var(--ink-2); line-height:1.62; margin-top:4px; }
.rallit-root .proj-stack { font-family:var(--font-mono); font-size:10.5px; color:var(--ink-3); line-height:1.5; margin-top:5px; }
.rallit-root .proj-badge { display:inline-block; font-size:9.5px; font-weight:700; color:var(--ink-2); background:var(--bg-soft); border:1px solid var(--line); border-radius:4px; padding:1px 7px; margin-left:8px; vertical-align:middle; letter-spacing:0.02em; }
.rallit-root .proj-achievements { margin-top:12px; padding:11px 0 2px 15px; border-top:1px dashed var(--line); display:flex; flex-direction:column; gap:0; }
.rallit-root .proj-ach-row { padding:11px 0 12px 0; border-top:1px solid var(--line-2); }
.rallit-root .proj-ach-row:first-child { border-top:none; padding-top:0; }
.rallit-root .proj-ach-label { display:flex; align-items:center; gap:7px; font-size:13.5px; font-weight:700; color:var(--ink); letter-spacing:-0.02em; margin-bottom:8px; }
.rallit-root .proj-ach-label::before { content:""; width:5px; height:5px; border-radius:50%; background:var(--accent); flex-shrink:0; }
/* 핵심역량 (2+ items) - same dot-labeled rows as proj-ach-row but without the
   border-top divider between items, which reads as too many separator lines
   stacked right under the intro sections. */
.rallit-root .comp-list { margin-top:8px; display:flex; flex-direction:column; gap:12px; }
.rallit-root .comp-row { padding:0; }
.rallit-root .comp-body { display:block; font-size:13px; color:var(--ink-2); font-weight:400; line-height:1.75; white-space:pre-line; }
.rallit-root .proj-ach-action { display:block; font-size:12.5px; color:var(--ink-2); line-height:1.6; margin-bottom:3px; }
.rallit-root .proj-ach-result { display:block; font-size:12.5px; color:var(--ink); font-weight:400; line-height:1.55; white-space:pre-line; }
.rallit-root .ach-brief { display:flex; flex-direction:column; gap:8px; }
.rallit-root .ach-row { display:grid; grid-template-columns:28px 1fr; column-gap:12px; align-items:baseline; border-left:2.5px solid var(--line); padding-left:11px; }
.rallit-root .ach-k { font-size:10.5px; font-weight:700; color:var(--ink-3); letter-spacing:0.02em; white-space:nowrap; }
.rallit-root .ach-v { font-size:12.5px; color:var(--ink-2); line-height:1.62; }
.rallit-root .act-item { padding:9px 0; border-bottom:1px solid var(--line); }
.rallit-root .act-item:last-child { border-bottom:none; padding-bottom:0; }
.rallit-root .act-item:first-child { padding-top:0; }
.rallit-root .act-top { display:flex; justify-content:space-between; align-items:baseline; gap:14px; }
.rallit-root .act-name { font-size:14.5px; font-weight:800; }
.rallit-root .act-meta { font-family:var(--font-mono); font-size:11px; color:var(--ink-3); white-space:nowrap; }
.rallit-root .act-desc { font-size:12.5px; color:var(--ink-2); line-height:1.55; margin-top:4px; }
.rallit-root .act-notes { margin-top:8px; display:flex; flex-direction:column; gap:5px; }
.rallit-root .act-section-note { font-size:12px; color:var(--ink-3); line-height:1.6; margin-bottom:10px; font-style:italic; }
.rallit-root .act-note { font-size:12px; color:var(--ink-2); line-height:1.55; padding-left:12px; position:relative; }
.rallit-root .act-note::before { content:""; position:absolute; left:0; top:7px; width:4px; height:4px; border-radius:50%; background:var(--ink-3); }
.rallit-root .two-col { display:flex; flex-direction:column; gap:16px; }
.rallit-root .edu-item, .rallit-root .cert-item { padding:7px 0; border-bottom:1px solid var(--line-2); }
.rallit-root .edu-item:first-child, .rallit-root .cert-item:first-child { padding-top:0; }
.rallit-root .edu-item:last-child, .rallit-root .cert-item:last-child { border-bottom:none; padding-bottom:0; }
.rallit-root .cert-grid { display:grid; grid-template-columns:1fr 1fr; column-gap:16px; }
.rallit-root .cert-grid .cert-item { border-bottom:none; padding:5px 0; }
.rallit-root .edu-school { font-size:14px; font-weight:700; }
.rallit-root .edu-degree { font-size:12.5px; color:var(--ink-2); margin-top:2px; }
.rallit-root .edu-meta { font-family:var(--font-mono); font-size:10.5px; color:var(--ink-3); margin-top:4px; }
.rallit-root .edu-footnote { font-size:11px; color:var(--ink-3); margin-top:8px; }
.rallit-root .cert-top { display:flex; justify-content:space-between; align-items:baseline; }
.rallit-root .cert-name { font-size:14px; font-weight:700; }
.rallit-root .cert-date { font-family:var(--font-mono); font-size:10.5px; color:var(--ink-3); }
.rallit-root .cert-issuer { font-size:12px; color:var(--ink-2); margin-top:2px; }
.rallit-root .skill-row { padding:7px 0; border-bottom:1px solid var(--line-2); display:flex; align-items:baseline; gap:10px; }
.rallit-root .skill-row:first-child { padding-top:0; }
.rallit-root .skill-row:last-child { border-bottom:none; padding-bottom:0; }
.rallit-root .skill-cat { font-family:var(--font-mono); font-size:10px; font-weight:700; color:var(--ink-3); letter-spacing:0.03em; flex-shrink:0; white-space:nowrap; width:80px; }
.rallit-root .skills { display:flex; flex-wrap:wrap; gap:5px; }
.rallit-root .skill { font-size:12px; font-weight:600; color:var(--ink); background:var(--bg-soft); border-radius:999px; padding:4px 10px; }
.rallit-root .foot { margin-top:18px; padding-top:10px; border-top:1px solid var(--line); display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:10px; color:var(--ink-3); letter-spacing:0.03em; }
/* Sheet stays fixed A4 width at every viewport - small screens scroll horizontally,
   content never reflows (deterministic pagination). */
`;

const GAP = 28; // px - height of the gray page-gap bar

function topInSheet(el: HTMLElement, sheet: HTMLElement): number {
  const er = el.getBoundingClientRect();
  const sr = sheet.getBoundingClientRect();
  return er.top - sr.top;
}

// Reorders `items` per `order` (a list of keys, front-to-back priority);
// anything not listed keeps its original relative order, appended after.
function reorderBy<T>(items: T[], order: string[] | undefined, keyOf: (item: T) => string): T[] {
  if (!order || order.length === 0) return items;
  const rank = new Map(order.map((k, i) => [k, i]));
  return items
    .map((item, i) => ({ item, i, r: rank.has(keyOf(item)) ? rank.get(keyOf(item))! : Infinity }))
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .map((x) => x.item);
}

const TAB_PARAM: Record<Variant, string> = { backend: "fullstack", platform: "infra" };

function variantFromTab(tab: string | null | undefined): Variant {
  if (!SHOW_VARIANT_TABS) return "platform"; // 공개본은 인프라 한 가지
  if (tab === "fullstack") return "backend";
  if (tab === "infra") return "platform";
  return "platform"; // 파라미터 없음/미인식 값 - 기본 탭(인프라) 유지
}

export function ResumeDocument({
  initialTab,
  override,
}: {
  initialTab?: string | null;
  override?: ResumeOverride;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [variant, setVariant] = useState<Variant>(() => variantFromTab(initialTab));
  const P = VARIANTS[variant].data;

  // Per-item text overrides for whichever variant is currently showing - see
  // the positional-key contract documented on VariantOverride in
  // src/data/resumeOverrides.ts. Text-only substitution, so the fixed-height
  // pagination in applyBreaks below is unaffected.
  const activeOverride = override?.[variant];
  // Blank-line-separated paragraphs for the optional "핵심역량" block - each
  // paragraph's first line is the bold-dot item title (rendered like a
  // "02. 프로젝트" achievement row), the rest is its plain-weight description.
  const competencyBlocks = activeOverride?.competencies
    ?.split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [head, ...rest] = block.split("\n");
      return { head, body: rest.join("\n").trim() };
    });
  // Blank-line-separated blocks - when set, replaces the whole grouped 경력
  // body below. A block starting with "## " starts a new heading group
  // (cg-title, dropped from the bullet itself); other blocks render like a
  // "02. 프로젝트"/핵심역량 achievement row - each block's first line is the
  // bold-dot item label, the rest (if any) is its plain-weight description -
  // so a single-line block (old-style "one bullet per line" overrides, incl.
  // the dashboard's "기본 문구 불러오기" flatten helper) still renders fine as
  // a label-only row. Blocks before the first "## " (or the whole list, if no
  // "## " block is used) form a single headingless group.
  const careerOverrideGroups = activeOverride?.careerOverride
    ?.split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .reduce<{ heading: string | null; items: { label: string; body: string }[] }[]>((groups, block) => {
      if (block.startsWith("## ")) {
        groups.push({ heading: block.slice(3).trim(), items: [] });
      } else {
        if (groups.length === 0) groups.push({ heading: null, items: [] });
        const [label, ...rest] = block.split("\n");
        groups[groups.length - 1].items.push({ label, body: rest.join("\n").trim() });
      }
      return groups;
    }, []);

  // Section numbers are computed, not hardcoded, so hiding "경력" (career) for a
  // company that only worked at one employer - where it's pure restatement of
  // "02. 프로젝트" - doesn't leave a numbering gap behind it.
  const hideCareerSection = activeOverride?.hideCareerSection;
  // Common rule: once a company uses the 자기소개/지원 동기/핵심역량 intro format
  // (i.e. taglineOverride is set), page 1 defaults to reserved-for-intro-only -
  // 01 (경력, or 프로젝트 if hideCareerSection) starts fresh on page 2. That
  // default only makes sense when the intro is long enough to fill most of
  // page 1 (e.g. a full 핵심역량 rundown); a company with a short intro and no
  // 핵심역량 would otherwise leave page 1 mostly blank for no reason - such a
  // company can set `pageBreakBeforeCareer: false` to explicitly opt out and
  // let 01 flow right after the intro instead. Explicit `pageBreakBeforeCareer`
  // (either value) always wins over the taglineOverride-based default.
  const forcePageBreak = activeOverride?.pageBreakBeforeCareer ?? !!activeOverride?.taglineOverride;
  let __secNo = 1;
  const secNo = () => String(__secNo++).padStart(2, "0");
  const noCareer = hideCareerSection ? null : secNo();
  const noProjects = secNo();
  const noSkills = secNo();
  const noActivities = secNo();
  const noEducation = secNo();
  const noCerts = secNo();

  // Pure re-ordering (no text changes) for "02. 프로젝트" and "03. 기술 스택".
  const hideProjects = activeOverride?.hideProjects;
  const projectsVisible = P.projects.filter((pr) => !hideProjects?.includes(pr.pkey ?? pr.title));
  const projectsOrdered = reorderBy(projectsVisible, activeOverride?.projectOrder, (pr) => pr.pkey ?? pr.title);
  const extraProjectsBlock = activeOverride?.extraProjects?.map((pr, i) => (
    <div key={`extra-${i}`} className="proj">
      <div className="proj-head">
        <div className="proj-top">
          <span className="proj-title">{pr.title}{pr.badge && <> <span className="proj-badge">{pr.badge}</span></>}</span>
          <span className="proj-period">{pr.period}</span>
        </div>
        {pr.stack && pr.stack.length > 0 && <div className="proj-stack">{pr.stack.join(" · ")}</div>}
        {pr.desc && <div className="proj-desc">{pr.desc}</div>}
      </div>
      {pr.achievements.length > 0 && (
        <div className="proj-achievements">
          {pr.achievements.map((a, idx) => (
            <div key={idx} className="proj-ach-row">
              <span className="proj-ach-label">{a.label}</span>
              {a.brief ? (
                <div className="ach-brief">
                  <div className="ach-row"><span className="ach-k">원인</span><span className="ach-v">{a.brief[0]}</span></div>
                  <div className="ach-row"><span className="ach-k">해결</span><span className="ach-v">{a.brief[1]}</span></div>
                  {a.result && <div className="ach-row"><span className="ach-k">결과</span><span className="ach-v">{a.result}</span></div>}
                </div>
              ) : (
                <span className="proj-ach-result">{a.oneliner}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  ));
  // extraSkillItems appends to a matching category (or adds a new one), hideSkillItems
  // drops named items from a category (for shared base items this company never actually
  // used) - both apply before skillOrder reorders the result, so a newly-added category
  // can be promoted too.
  const extraSkillItems = activeOverride?.extraSkillItems;
  const hideSkillItems = activeOverride?.hideSkillItems;
  const skillsMerged = extraSkillItems || hideSkillItems
    ? [
        ...P.skills.map((g) => ({
          category: g.category,
          items: (extraSkillItems?.[g.category] ? [...g.items, ...extraSkillItems[g.category]] : g.items)
            .filter((item) => !hideSkillItems?.[g.category]?.includes(item)),
        })),
        ...Object.entries(extraSkillItems ?? {})
          .filter(([category]) => !P.skills.some((g) => g.category === category))
          .map(([category, items]) => ({ category, items })),
      ]
    : P.skills;
  const skillsOrdered = reorderBy(skillsMerged, activeOverride?.skillOrder, (g) => g.category)
    .map((g) => ({
      ...g,
      items: reorderBy(g.items, activeOverride?.skillItemOrder?.[g.category], (item) => item),
    }));


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

    // Rule: flow continuously, but never cut a unit across a page boundary.
    // Sections themselves are allowed to span pages (otherwise one tall section,
    // e.g. 경력/프로젝트, drags everything after it onto a fresh page and leaves a
    // large blank gap). Only the finer units below a section are kept whole - a
    // whole project/item first, falling back to inner blocks for anything too
    // tall to fit (e.g. a single oversized project). A whole `.proj` is kept
    // together so it never spans a page boundary; only a project too tall for
    // one page falls back to its inner blocks (.proj-head/.proj-ach-row), which
    // are still never cut.
    // .career-group is intentionally NOT kept whole: a group (국가보안기관 등) can be
    // taller than the space left after 자기소개, and forcing it whole pushed the
    // whole 경력 section (title included) to the next page, leaving a gap. Instead we
    // keep each .cg-item whole and let a group flow across the page boundary; the
    // group title (.cg-top) stays with its first item (handled below).
    const KEEP = '.cg-top, .cg-item, .act-item, .act-note, .edu-item, .cert-item, .skill-row, .proj-head, .proj-ach-row, .sec-h, .comp-head, .comp-row';
    const PAGE_PAD = pxPerMm * 20;       // top inset kept at the start of every continued page
    const usable = pageH - PAGE_PAD * 2 - GAP; // a unit taller than this can't be kept whole

    // first real content block following a section header - kept on the same page
    // as the header so the title never lands alone at the bottom of a page. For
    // projects this is the first achievement row (the head alone isn't enough).
    const firstBlockOf = (header: HTMLElement): HTMLElement | null => {
      const scope = header.parentElement; // same column/section body as the header
      return scope ? (scope.querySelector('.proj-ach-row, .cg-top, .act-item, .edu-item, .cert-item, .skill-row') as HTMLElement | null) : null;
    };

    // push an element to the top of the next page so that its visible content
    // lands at exactly GAP + PAGE_PAD below the boundary - regardless of which
    // element type starts the page. `top` is the border-box top, and the element
    // only moves down by the spacer's height (its margin-top still applies on top
    // of the spacer, so margin must NOT be subtracted). Only the border-box-inner
    // spacing (border + padding) offsets the visible content, so subtract that.
    // Note: content is positioned at boundary + PAGE_PAD only (no added GAP) -
    // the .pg-line bar (28px, position:absolute at the boundary) is purely a
    // screen-preview overlay that sits INSIDE this reserved top margin, not
    // extra space alongside it. Baking GAP into the content offset here used
    // to leave real, unexplained blank space at the top of every continuation
    // page in print/PDF output (where .pg-line is display:none, so nothing
    // ever justified that reserved height) - continuation pages ended up with
    // a visibly larger top margin than page 1's own (15mm, from .sheet-inner's
    // padding) for no reason a reader could see.
    const pushBefore = (el: HTMLElement, top: number, boundary: number) => {
      const cs = getComputedStyle(el);
      const ownInset =
        (parseFloat(cs.borderTopWidth) || 0) +
        (parseFloat(cs.paddingTop) || 0);
      const spacer = document.createElement('div');
      spacer.className = 'pg-spacer';
      spacer.style.height = `${Math.max(0, boundary - top + PAGE_PAD - ownInset)}px`;
      el.parentNode?.insertBefore(spacer, el);
    };

    for (let iter = 0; iter < 60; iter++) {
      let fixed = false;

      // manual override (e.g. a local per-company resume variant forcing 프로젝트
      // to start on a fresh page) - re-checked every iteration (not just once up
      // front) so that a spacer inserted earlier in this same pass for unrelated
      // overflow (e.g. a 핵심역량 paragraph that didn't fit page 1) reflows this
      // element too. Checking it only once before the loop used the pre-overflow
      // position - later KEEP-loop spacers inserted above it then pushed it a
      // second time on top of that stale spacer, landing it stranded mid-page
      // instead of at the top of a clean page.
      //
      // Always remeasure from the NATURAL (unforced) position by removing our
      // own previously-inserted spacer first, rather than reading `top` with
      // that stale spacer's height still baked in. Reading the shifted `top`
      // directly double-counts: an upstream KEEP-loop spacer inserted earlier
      // in the same pass (for unrelated overflow, e.g. a 핵심역량 item that no
      // longer fits its page) shifts this element down by some partial
      // amount, which then fails the "already at a page top" check even
      // though the element is still meant for the SAME target page - and
      // gets pushed a whole EXTRA page forward, leaving a fully blank page
      // behind. Recomputing from scratch every time avoids that compounding.
      // Only mark the iteration "fixed" (forcing another full outer-loop
      // pass) the first time this element is ever pushed - resizing an
      // existing spacer back onto the same already-committed target page is
      // just steady-state upkeep, not a new fix, and shouldn't cost an
      // iteration the KEEP loop below might still need.
      for (const el of Array.from(sheet.querySelectorAll('.force-break')) as HTMLElement[]) {
        const prevSpacer = el.previousElementSibling as HTMLElement | null;
        const hadSpacer = !!prevSpacer && prevSpacer.classList.contains('pg-spacer');
        if (hadSpacer) prevSpacer!.remove();
        const top = topInSheet(el, sheet);
        const pageIdx = Math.floor(top / pageH);
        const prevBoundary = pageIdx * pageH;
        if (top - prevBoundary > PAGE_PAD + 1) { // already at a page top - nothing to do
          pushBefore(el, top, prevBoundary + pageH);
          if (!hadSpacer) {
            fixed = true;
            break;
          }
        }
      }
      if (fixed) continue;

      const els = Array.from(sheet.querySelectorAll(KEEP)) as HTMLElement[];
      for (const el of els) {
        const h = el.offsetHeight;
        if (h > usable) continue; // too tall to keep whole - a finer unit handles it
        const top = topInSheet(el, sheet);
        const pageIdx = Math.floor(top / pageH);
        const prevBoundary = pageIdx * pageH;
        const boundary = prevBoundary + pageH;

        // a header is "cut" if it would be split from its first block (break-after:avoid).
        // Applies to section headers (sec-h), career-group titles (cg-top), and
        // project headers (proj-head) - all three must stay with their first
        // following block so the title never lands alone at the bottom of a page.
        let span = top + h;
        if (el.classList.contains('sec-h')) {
          const fb = firstBlockOf(el);
          if (fb && fb.offsetHeight <= usable) span = topInSheet(fb, sheet) + fb.offsetHeight;
        } else if (el.classList.contains('cg-top')) {
          const fb = el.parentElement?.querySelector('.cg-item') as HTMLElement | null;
          if (fb && fb.offsetHeight <= usable) span = topInSheet(fb, sheet) + fb.offsetHeight;
        } else if (el.classList.contains('proj-head')) {
          const fb = el.parentElement?.querySelector('.proj-ach-row') as HTMLElement | null;
          if (fb && fb.offsetHeight <= usable) span = topInSheet(fb, sheet) + fb.offsetHeight;
        } else if (el.classList.contains('comp-head')) {
          const fb = el.nextElementSibling?.querySelector('.comp-row') as HTMLElement | null;
          if (fb && fb.offsetHeight <= usable) span = topInSheet(fb, sheet) + fb.offsetHeight;
        }

        // (1) element (or header + first block) reaches into the bottom page
        // padding or crosses the boundary → push to the next page. The threshold
        // is the content-area bottom (boundary − PAGE_PAD), not the raw boundary,
        // so a reserved bottom margin is kept and content never touches the page
        // edge / gap bar. No `top` guard: a unit that *starts* inside the bottom
        // padding band must move too (e.g. a group title landing there).
        const contentBottom = boundary - PAGE_PAD;
        if (span > contentBottom) {
          pushBefore(el, top, boundary);
          fixed = true;
          break;
        }
        // (2) element sits underneath a page-gap bar (covered) → nudge below the bar
        if (prevBoundary >= pageH && top - prevBoundary < GAP) {
          pushBefore(el, top, prevBoundary);
          fixed = true;
          break;
        }
      }
      if (!fixed) break;
    }

    // pad the sheet up to a whole number of pages, so the last page is a full
    // fixed-size A4 too (the white sheet fills the last page instead of ending
    // at the content). sheet.scrollHeight includes .sheet-inner's own bottom
    // padding (16mm) as trailing "content" - left uncorrected, that padding
    // alone can tip a near-full last page over the boundary and manifest as
    // an orphaned last item stranded alone on a near-blank extra page.
    const sheetInnerPadBottom = 16 * pxPerMm;
    const contentH = sheet.scrollHeight - sheetInnerPadBottom;
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
    // metrics and misplaces breaks (sections look cut on reload). Recompute once
    // fonts are ready, and again on the next frame to settle any reflow.
    let raf = 0;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        applyBreaks();
        raf = requestAnimationFrame(applyBreaks);
      });
    }
    // Only recompute when the sheet's WIDTH changes (window resize / zoom).
    // applyBreaks mutates the sheet's HEIGHT (spacers + min-height); observing
    // that would feed back into an endless resize loop (the sheet "shrinking").
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
      if (raf) cancelAnimationFrame(raf);
    };
  }, [applyBreaks, variant, override]);

  return (
    <div className="rallit-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {SHOW_VARIANT_TABS && (
        <div className="rallit-variant">
          {(Object.keys(VARIANTS) as Variant[]).map((key) => (
            <button
              key={key}
              className={`rallit-variant-btn${variant === key ? " active" : ""}`}
              onClick={() => handleVariantChange(key)}
            >
              {VARIANTS[key].label}
            </button>
          ))}
        </div>
      )}
      <div className="rallit-toolbar">
        {process.env.NODE_ENV !== "production" && (
          <Link href="/resume/dashboard" className="rallit-iconbtn rallit-dashboard" aria-label="이력서 대시보드" title="이력서 대시보드 (회사별 오버라이드 관리)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>
          </Link>
        )}
        <Link href="/" className="rallit-iconbtn rallit-back" aria-label="포트폴리오로 돌아가기" title="포트폴리오로 돌아가기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
        </Link>
        <button className="rallit-iconbtn rallit-print" onClick={() => window.print()} aria-label="PDF로 저장 / 인쇄" title="PDF로 저장 / 인쇄">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
        </button>
      </div>

      <div className="sheet" ref={sheetRef}>
        <div className="sheet-inner">
          <div className="hd">
            <div className="hd-main">
              <div className="hd-name-row">
                <span className="hd-name">{P.name}</span>
                <span className="hd-role">· {activeOverride?.roleOverride ?? P.role} · 5년 차</span>
              </div>
              <div className="hd-contact">
                {hideCareerSection && (
                  <div className="row"><span className="ck">CAREER</span><span className="v">{P.career.company} · {P.career.period}</span></div>
                )}
                <div className="row"><span className="ck">EMAIL</span><span className="v">{P.email}</span></div>
                <div className="row"><span className="ck">GITHUB</span><a className="v" href={P.githubUrl} target="_blank" rel="noopener noreferrer">{P.github}</a></div>
                <div className="row"><span className="ck">PORTFOLIO</span><a className="v" href={P.portfolioUrl} target="_blank" rel="noopener noreferrer">{P.portfolio}</a></div>
                {activeOverride?.personalInfoOverride?.map((p, i) => (
                  <div key={i} className="row"><span className="ck">{p.label}</span><span className="v">{p.value}</span></div>
                ))}
              </div>
            </div>
            {(activeOverride?.photoOverride ?? P.photo) && (
              <div className="hd-photo"><img src={activeOverride?.photoOverride ?? P.photo} alt="" /></div>
            )}
          </div>
          <div className="hd-rule" />
          {activeOverride?.taglineOverride ? (
            <>
              <p className="sm-head" style={{ marginTop: 14 }}>자기소개</p>
              <p className="sm-body" style={{ marginTop: 8 }}>{activeOverride.taglineOverride}</p>
            </>
          ) : (
            <div className="tagline">{P.tagline}</div>
          )}

          {activeOverride?.blogLinkOverride && (
            <a
              className="blog-weapon"
              href={activeOverride.blogLinkOverride.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="blog-weapon-ar">▶</span>
              <span className="blog-weapon-tx">{activeOverride.blogLinkOverride.text}</span>
            </a>
          )}

          {activeOverride?.motivation && (
            <div className="sm-block motivation-block">
              <p className="sm-head">지원 동기</p>
              <p className="sm-body">{activeOverride.motivation}</p>
            </div>
          )}

          {competencyBlocks && competencyBlocks.length === 1 ? (
            <>
              <p className="sm-head" style={{ marginTop: 15 }}>핵심역량</p>
              <p className="sm-body" style={{ marginTop: 8 }}>
                {competencyBlocks[0].body ? `${competencyBlocks[0].head} ${competencyBlocks[0].body}` : competencyBlocks[0].head}
              </p>
            </>
          ) : competencyBlocks && (
            <>
              <p className="sm-head comp-head" style={{ marginTop: 15 }}>핵심역량</p>
              <div className="comp-list">
                {competencyBlocks.map((c, i) => (
                  <div key={i} className="comp-row">
                    <span className="proj-ach-label">{c.head}</span>
                    {c.body && <span className="comp-body">{c.body}</span>}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Base (no company override) still shows the punchy one-liner tagline
              above plus this 3-block 핵심역량 rundown - once a company sets
              taglineOverride, that single continuous "자기소개" replaces this
              whole block instead (common format - see the branch above). */}
          {!activeOverride?.taglineOverride && (
            <div className="summary">
              {P.summary.map((s, i) => (
                <div key={i} className="sm-block">
                  <p className="sm-head">{s.head}</p>
                  <p className="sm-body">{s.body}</p>
                </div>
              ))}
            </div>
          )}

          {noCareer && (
            <div className="sec">
              <div className={forcePageBreak ? "sec-h force-break" : "sec-h"}><span className="no">{noCareer}</span><span className="t">경력</span></div>
              <div className="career-head">
                <div><div className="career-co">{P.career.company}</div><div className="career-pos">{P.career.position}</div></div>
                <div className="career-period">{P.career.period}</div>
              </div>
              <div className="career-groups" style={careerOverrideGroups ? { paddingLeft: 0 } : undefined}>
                {careerOverrideGroups ? (
                  careerOverrideGroups.map((g, i) => (
                    <div key={i} className="career-group">
                      {g.heading && (
                        <div className="cg-top"><span className="cg-title">{g.heading}</span></div>
                      )}
                      <div className="proj-achievements">
                        {g.items.map((item, k) => (
                          <div key={k} className="proj-ach-row">
                            <span className="proj-ach-label">{item.label}</span>
                            {item.body && <span className="proj-ach-result">{item.body}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  P.career.groups.map((g, i) => (
                    <div key={i} className="career-group">
                      <div className="cg-top">
                        <span className="cg-title">{g.title}</span>
                        {g.period && <span className="cg-period">{g.period}</span>}
                      </div>
                      <ul className="cg-items">
                        {g.items.map((item, j) => (
                          <li key={j} className="cg-item">
                            {item.text}
                            {item.sub && item.sub.length > 0 && (
                              <ul className="cg-sub-items">
                                {item.sub.map((s, k) => <li key={k} className="cg-sub-item">{s}</li>)}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="sec">
            <div className={hideCareerSection && forcePageBreak ? "sec-h force-break" : "sec-h"}><span className="no">{noProjects}</span><span className="t">{activeOverride?.projectsSectionTitle || "프로젝트"}</span></div>
            {activeOverride?.projectsSectionNote && (
              <div className="act-section-note" style={{ marginTop: -4, marginBottom: 12 }}>{activeOverride.projectsSectionNote}</div>
            )}
            <div className="career-projs">
              {!activeOverride?.extraProjectsAfterKey && activeOverride?.extraProjectsPosition === "before" && extraProjectsBlock}
              {projectsOrdered.map((pr, i) => (
                <Fragment key={i}>
                <div className="proj">
                  <div className="proj-head">
                    <div className="proj-top">
                      <span className="proj-title">{pr.title}{(() => {
                        const badge = activeOverride?.badgeOverride?.[pr.pkey ?? pr.title] ?? pr.badge;
                        return badge && <> <span className="proj-badge">{badge}</span></>;
                      })()}</span>
                      <span className="proj-period">{pr.period}</span>
                    </div>
                    {activeOverride?.showProjectStack && pr.stack?.length > 0 && (
                      <div className="proj-stack">{(activeOverride?.stackOverride?.[pr.pkey ?? pr.title] ?? pr.stack).join(" · ")}</div>
                    )}
                    <div className="proj-desc">{activeOverride?.projectDescOverride?.[pr.pkey ?? pr.title] ?? pr.desc}</div>
                  </div>
                  {(() => {
                    const hiddenAch = activeOverride?.hideAchievements?.[pr.pkey ?? pr.title];
                    const visible = (b: typeof pr.blocks[number], idx: number) => {
                      const ov = activeOverride?.projectAchievements?.[`${pr.pkey ?? pr.title}:${idx}`];
                      return (b.brief || b.oneliner || ov?.oneliner || ov?.brief) && !b.resumeHide && !hiddenAch?.includes(idx);
                    };
                    return pr.blocks.some((b, idx) => visible(b, idx)) && (
                    <div className="proj-achievements">
                      {reorderBy(
                        pr.blocks
                          .map((b, idx) => ({ b, idx }))
                          .filter(({ b, idx }) => visible(b, idx)),
                        activeOverride?.achievementOrder?.[pr.pkey ?? pr.title]?.map(String),
                        ({ idx }) => String(idx)
                      )
                        .map(({ b, idx }) => {
                          const key = `${pr.pkey ?? pr.title}:${idx}`;
                          const ov = activeOverride?.projectAchievements?.[key];
                          const label = ov?.label ?? b.label;
                          return (
                            <div key={idx} className="proj-ach-row">
                              <span className="proj-ach-label">{label}</span>
                              {ov?.oneliner ? (
                                <span className="proj-ach-result">{ov.oneliner}</span>
                              ) : b.brief ? (
                                <div className="ach-brief">
                                  <div className="ach-row"><span className="ach-k">원인</span><span className="ach-v">{ov?.brief?.[0] ?? b.brief[0]}</span></div>
                                  <div className="ach-row"><span className="ach-k">해결</span><span className="ach-v">{ov?.brief?.[1] ?? b.brief[1]}</span></div>
                                  {(ov?.result ?? b.result) && <div className="ach-row"><span className="ach-k">결과</span><span className="ach-v">{ov?.result ?? b.result}</span></div>}
                                </div>
                              ) : (
                                <span className="proj-ach-result">{b.oneliner}</span>
                              )}
                            </div>
                          );
                        })}
                    </div>
                    );
                  })()}
                  {(activeOverride?.extraDuties?.[pr.pkey ?? pr.title]?.length ?? 0) > 0 && (
                    <ul className="cg-items" style={{ marginTop: 8, paddingLeft: 15 }}>
                      {activeOverride!.extraDuties![pr.pkey ?? pr.title].map((t, i) => (
                        <li key={i} className="cg-item">{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
                {activeOverride?.extraProjectsAfterKey === (pr.pkey ?? pr.title) && extraProjectsBlock}
                </Fragment>
              ))}
              {!activeOverride?.extraProjectsAfterKey && activeOverride?.extraProjectsPosition !== "before" && extraProjectsBlock}
            </div>
          </div>

          <div className="sec">
            <div className="sec-h"><span className="no">{noSkills}</span><span className="t">기술환경</span></div>
            <div>
              {skillsOrdered.map((g) => (
                <div key={g.category} className="skill-row">
                  <span className="skill-cat">{g.category}</span>
                  <div className="skills">{g.items.map((s) => <span key={s} className="skill">{s}</span>)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sec">
            <div className="sec-h"><span className="no">{noActivities}</span><span className="t">대외활동</span></div>
            {activeOverride?.activitiesNote && <p className="act-section-note">{activeOverride.activitiesNote}</p>}
            {P.activities.filter((a) => !activeOverride?.hideActivities?.includes(a.title)).map((a, i) => {
              const hiddenNotes = activeOverride?.hideActivityNotes?.[a.title];
              const notes = hiddenNotes ? a.notes?.filter((_, j) => !hiddenNotes.includes(j)) : a.notes;
              return (
              <div key={i} className="act-item">
                <div className="act-top"><span className="act-name">{a.title}</span><span className="act-meta">{a.org} · {a.year}</span></div>
                <div className="act-desc">{a.desc}</div>
                {notes && notes.length > 0 && (
                  <div className="act-notes">
                    {notes.map((n, j) => <div key={j} className="act-note">{n}</div>)}
                  </div>
                )}
              </div>
              );
            })}
            {activeOverride?.extraActivities?.map((a, i) => (
              <div key={"extra" + i} className="act-item">
                <div className="act-top">
                  <span className="act-name">
                    {a.url ? <a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a> : a.title}
                  </span>
                  <span className="act-meta">{a.org} · {a.year}</span>
                </div>
                <div className="act-desc">{a.desc}</div>
                {a.notes && a.notes.length > 0 && (
                  <div className="act-notes">
                    {a.notes.map((n, j) => <div key={j} className="act-note">{n}</div>)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="sec">
            <div className="two-col">
              <div>
                <div className="sec-h" style={{ marginBottom: 12 }}><span className="no">{noEducation}</span><span className="t">교육</span></div>
                {P.education.map((e, i) => (
                  <div key={i} className="edu-item">
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-meta">{e.period} · {e.status}</div>
                  </div>
                ))}
                <div className="edu-footnote">마이스터고 조기취업 전형으로 고교 재학 중이던 2021.07 입사, 대학은 입사 이후 진학</div>
              </div>
              <div>
                <div className="sec-h" style={{ marginBottom: 12 }}><span className="no">{noCerts}</span><span className="t">자격증</span></div>
                <div className={activeOverride?.certsTwoColumn ? "cert-grid" : undefined}>
                  {P.certs.filter((c) => !activeOverride?.hideCerts?.includes(c.name)).map((c, i) => {
                    const isHighSchoolEra = c.name === "정보기기운용기능사" || c.name === "프로그래밍기능사";
                    return (
                      <div key={i} className="cert-item">
                        <div className="cert-top"><span className="cert-name">{c.name}</span><span className="cert-date">{c.date}</span></div>
                        <div className="cert-issuer">{c.status} · {c.issuer}{isHighSchoolEra ? " · 고교 재학 중 취득" : ""}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
