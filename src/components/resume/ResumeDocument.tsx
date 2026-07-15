"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { PROFILE, PROFILE_PLATFORM } from "@/data/profileDoc";

const VARIANTS = {
  backend: { label: "백엔드", data: PROFILE },
  platform: { label: "플랫폼", data: PROFILE_PLATFORM },
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
  .rallit-root { background:#fff; padding:0; }
  .rallit-toolbar { display:none !important; }
  .rallit-root .sheet { width:auto; margin:0; box-shadow:none; min-height:0 !important; }
  .rallit-root .sheet-inner { padding:12mm 12mm; }
  @page { size:A4; margin:11mm 0; }
  .rallit-root .proj-head, .rallit-root .proj-ach-row, .rallit-root .career-group, .rallit-root .cg-item, .rallit-root .act-item, .rallit-root .edu-item, .rallit-root .cert-item, .rallit-root .skills { break-inside:avoid; }
  .rallit-root .sec-h, .rallit-root .cg-top { break-after:avoid; }
  .rallit-root .pg-spacer, .rallit-root .pg-line { display:none; }
  .rallit-root * { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
}
.rallit-root .hd { display:flex; justify-content:space-between; align-items:flex-start; gap:28px; }
.rallit-root .hd-main { flex:1; min-width:0; }
.rallit-root .hd-name { font-size:34px; font-weight:800; letter-spacing:-0.04em; line-height:1.05; }
.rallit-root .hd-role { font-size:16.5px; font-weight:600; color:var(--ink-2); margin-top:10px; }
.rallit-root .hd-contact { display:flex; flex-wrap:wrap; gap:7px 20px; margin-top:16px; }
.rallit-root .hd-contact .row { display:flex; align-items:baseline; gap:8px; font-size:13px; color:var(--ink-2); }
.rallit-root .hd-contact .ck { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); letter-spacing:0.06em; }
.rallit-root .hd-contact .v { font-weight:600; }
.rallit-root .hd-photo { width:110px; height:110px; flex-shrink:0; border-radius:50%; overflow:hidden; box-shadow:0 2px 12px rgba(20,22,28,0.14); }
.rallit-root .hd-photo img { display:block; width:100%; height:100%; object-fit:cover; }
.rallit-root .hd-rule { height:2px; background:var(--ink); margin:13px 0 0; }
.rallit-root .summary { margin-top:15px; display:flex; flex-direction:column; gap:12px; }
.rallit-root .sm-head { font-size:14.5px; font-weight:800; color:var(--ink); line-height:1.5; letter-spacing:-0.025em; margin-bottom:6px; }
.rallit-root .sm-body { font-size:13px; color:var(--ink-2); line-height:1.75; }
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
.rallit-root .proj-badge { display:inline-block; font-size:9.5px; font-weight:700; color:var(--ink-2); background:var(--bg-soft); border:1px solid var(--line); border-radius:4px; padding:1px 7px; margin-left:8px; vertical-align:middle; letter-spacing:0.02em; }
.rallit-root .proj-achievements { margin-top:12px; padding:11px 0 2px 15px; border-top:1px dashed var(--line); display:flex; flex-direction:column; gap:0; }
.rallit-root .proj-ach-row { padding:11px 0 12px 0; border-top:1px solid var(--line-2); }
.rallit-root .proj-ach-row:first-child { border-top:none; padding-top:0; }
.rallit-root .proj-ach-label { display:flex; align-items:center; gap:7px; font-size:13.5px; font-weight:700; color:var(--ink); letter-spacing:-0.02em; margin-bottom:8px; }
.rallit-root .proj-ach-label::before { content:""; width:5px; height:5px; border-radius:50%; background:var(--accent); flex-shrink:0; }
.rallit-root .proj-ach-action { display:block; font-size:12.5px; color:var(--ink-2); line-height:1.6; margin-bottom:3px; }
.rallit-root .proj-ach-result { display:block; font-size:12.5px; color:var(--ink); font-weight:700; line-height:1.55; }
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
.rallit-root .act-note { font-size:12px; color:var(--ink-2); line-height:1.55; padding-left:12px; position:relative; }
.rallit-root .act-note::before { content:""; position:absolute; left:0; top:7px; width:4px; height:4px; border-radius:50%; background:var(--ink-3); }
.rallit-root .two-col { display:flex; flex-direction:column; gap:16px; }
.rallit-root .edu-item, .rallit-root .cert-item { padding:7px 0; border-bottom:1px solid var(--line-2); }
.rallit-root .edu-item:first-child, .rallit-root .cert-item:first-child { padding-top:0; }
.rallit-root .edu-item:last-child, .rallit-root .cert-item:last-child { border-bottom:none; padding-bottom:0; }
.rallit-root .edu-school { font-size:14px; font-weight:700; }
.rallit-root .edu-degree { font-size:12.5px; color:var(--ink-2); margin-top:2px; }
.rallit-root .edu-meta { font-family:var(--font-mono); font-size:10.5px; color:var(--ink-3); margin-top:4px; }
.rallit-root .cert-top { display:flex; justify-content:space-between; align-items:baseline; }
.rallit-root .cert-name { font-size:14px; font-weight:700; }
.rallit-root .cert-date { font-family:var(--font-mono); font-size:10.5px; color:var(--ink-3); }
.rallit-root .cert-issuer { font-size:12px; color:var(--ink-2); margin-top:2px; }
.rallit-root .skills { display:flex; flex-wrap:wrap; gap:7px; }
.rallit-root .skill { font-size:13.5px; font-weight:600; color:var(--ink); background:var(--bg-soft); border-radius:999px; padding:7px 15px; }
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

export function ResumeDocument() {
  const [variant, setVariant] = useState<Variant>("backend");
  const P = VARIANTS[variant].data;
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
    const KEEP = '.career-group, .cg-top, .cg-item, .act-item, .edu-item, .cert-item, .skills, .proj-head, .proj-ach-row, .sec-h';
    const PAGE_PAD = pxPerMm * 16;       // top inset kept at the start of every continued page
    const usable = pageH - PAGE_PAD * 2 - GAP; // a unit taller than this can't be kept whole

    // first real content block following a section header - kept on the same page
    // as the header so the title never lands alone at the bottom of a page. For
    // projects this is the first achievement row (the head alone isn't enough).
    const firstBlockOf = (header: HTMLElement): HTMLElement | null => {
      const scope = header.parentElement; // same column/section body as the header
      return scope ? (scope.querySelector('.proj-ach-row, .career-group, .act-item, .edu-item, .cert-item, .skills') as HTMLElement | null) : null;
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

    for (let iter = 0; iter < 60; iter++) {
      let fixed = false;
      const els = Array.from(sheet.querySelectorAll(KEEP)) as HTMLElement[];
      for (const el of els) {
        const h = el.offsetHeight;
        if (h > usable) continue; // too tall to keep whole - a finer unit handles it
        const top = topInSheet(el, sheet);
        const pageIdx = Math.floor(top / pageH);
        const prevBoundary = pageIdx * pageH;
        const boundary = prevBoundary + pageH;

        // a header is "cut" if it would be split from its first block (break-after:avoid).
        // Applies to section headers (sec-h) and career-group titles (cg-top) - both
        // must stay with their first following block so the title never lands alone
        // at the bottom of a page.
        let span = top + h;
        if (el.classList.contains('sec-h')) {
          const fb = firstBlockOf(el);
          if (fb && fb.offsetHeight <= usable) span = topInSheet(fb, sheet) + fb.offsetHeight;
        } else if (el.classList.contains('cg-top')) {
          const fb = el.parentElement?.querySelector('.cg-item') as HTMLElement | null;
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
  }, [applyBreaks, variant]);

  return (
    <div className="rallit-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="rallit-variant">
        {(Object.keys(VARIANTS) as Variant[]).map((key) => (
          <button
            key={key}
            className={`rallit-variant-btn${variant === key ? " active" : ""}`}
            onClick={() => setVariant(key)}
          >
            {VARIANTS[key].label}
          </button>
        ))}
      </div>
      <div className="rallit-toolbar">
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
              <div className="hd-name">{P.name}</div>
              <div className="hd-role">{P.role}</div>
              <div className="hd-contact">
                <div className="row"><span className="ck">EMAIL</span><span className="v">{P.email}</span></div>
                <div className="row"><span className="ck">GITHUB</span><span className="v">{P.github}</span></div>
                <div className="row"><span className="ck">BASE</span><span className="v">{P.location}</span></div>
              </div>
            </div>
          </div>
          <div className="hd-rule" />

          <div className="summary">
            {P.summary.map((s, i) => (
              <div key={i} className="sm-block">
                <p className="sm-head">{s.head}</p>
                <p className="sm-body">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="sec">
            <div className="sec-h"><span className="no">01</span><span className="t">경력</span></div>
            <div className="career-head">
              <div><div className="career-co">{P.career.company}</div><div className="career-pos">{P.career.position}</div></div>
              <div className="career-period">{P.career.period}</div>
            </div>
            <div className="career-groups">
              {P.career.groups.map((g, i) => (
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
              ))}
            </div>
          </div>

          <div className="sec">
            <div className="sec-h"><span className="no">02</span><span className="t">프로젝트</span></div>
            <div className="career-projs">
              {P.projects.filter(pr => !pr.badge).map((pr, i) => (
                <div key={i} className="proj">
                  <div className="proj-head">
                    <div className="proj-top">
                      <span className="proj-title">{pr.title}{pr.badge && <span className="proj-badge">{pr.badge}</span>}</span>
                      <span className="proj-period">{pr.period}</span>
                    </div>
                    <div className="proj-desc">{pr.desc}</div>
                  </div>
                  {pr.blocks.some(b => b.brief || b.oneliner) && (
                    <div className="proj-achievements">
                      {pr.blocks.filter(b => b.brief || b.oneliner).map((b, j) => (
                        <div key={j} className="proj-ach-row">
                          <span className="proj-ach-label">{b.label}</span>
                          {b.brief ? (
                            <div className="ach-brief">
                              <div className="ach-row"><span className="ach-k">원인</span><span className="ach-v">{b.brief[0]}</span></div>
                              <div className="ach-row"><span className="ach-k">해결</span><span className="ach-v">{b.brief[1]}</span></div>
                              {b.result && <div className="ach-row"><span className="ach-k">결과</span><span className="ach-v">{b.result}</span></div>}
                            </div>
                          ) : (
                            <span className="proj-ach-result">{b.oneliner}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="sec">
            <div className="sec-h"><span className="no">03</span><span className="t">기술 스택</span></div>
            <div className="skills">{P.skills.map((s) => <span key={s} className="skill">{s}</span>)}</div>
          </div>

          <div className="sec">
            <div className="sec-h"><span className="no">04</span><span className="t">대외활동</span></div>
            {P.activities.map((a, i) => (
              <div key={i} className="act-item">
                <div className="act-top"><span className="act-name">{a.title}</span><span className="act-meta">{a.org} · {a.year}</span></div>
                <div className="act-desc">{a.desc}</div>
              </div>
            ))}
          </div>

          <div className="sec">
            <div className="two-col">
              <div>
                <div className="sec-h" style={{ marginBottom: 12 }}><span className="no">05</span><span className="t">교육</span></div>
                {P.education.map((e, i) => (
                  <div key={i} className="edu-item">
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-meta">{e.period} · {e.status}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="sec-h" style={{ marginBottom: 12 }}><span className="no">06</span><span className="t">자격증</span></div>
                {P.certs.map((c, i) => (
                  <div key={i} className="cert-item">
                    <div className="cert-top"><span className="cert-name">{c.name}</span><span className="cert-date">{c.date}</span></div>
                    <div className="cert-issuer">{c.status} · {c.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
