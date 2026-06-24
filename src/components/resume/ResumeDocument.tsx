"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { PROFILE } from "@/data/profileDoc";

const CSS = `
.rallit-root { --ink:#17181c; --ink-2:#565a63; --ink-3:#9298a2; --line:#e8eaed; --line-2:#f1f3f5; --bg-soft:#f7f8fa; --accent:#16c47f; --accent-soft:#e7f8f0; --font-sans:"Pretendard",-apple-system,BlinkMacSystemFont,system-ui,"Apple SD Gothic Neo",sans-serif; --font-mono:"JetBrains Mono",ui-monospace,"SFMono-Regular",monospace; }
.rallit-root { background:#dde1e6; color:var(--ink); font-family:var(--font-sans); line-height:1.62; letter-spacing:-0.012em; word-break:keep-all; -webkit-font-smoothing:antialiased; min-height:100vh; padding:1px 0; }
.rallit-root * { box-sizing:border-box; margin:0; padding:0; }
.rallit-root a { color:inherit; text-decoration:none; }
.rallit-root .sheet { width:210mm; min-height:297mm; background:#fff; margin:22px auto; position:relative; box-shadow:0 1px 2px rgba(20,22,28,0.05),0 18px 50px rgba(20,22,28,0.12); }
.rallit-root .sheet-inner { padding:22mm 21mm 24mm; }
.rallit-root .pg-spacer { background:#fff; }
.rallit-root .pg-line { position:absolute; left:0; right:0; height:28px; background:#dde1e6; z-index:10; display:flex; align-items:center; justify-content:center; pointer-events:none; }
.rallit-root .pg-line-label { font-family:var(--font-mono); font-size:9px; color:var(--ink-3); letter-spacing:0.06em; }
.rallit-toolbar { position:fixed; top:16px; right:16px; z-index:100; display:flex; gap:8px; align-items:center; }
.rallit-iconbtn { display:inline-flex; align-items:center; justify-content:center; width:42px; height:42px; background:rgba(255,255,255,0.88); -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); color:var(--ink-2); border:1px solid var(--line); border-radius:50%; box-shadow:0 4px 16px rgba(20,22,28,0.1); cursor:pointer; transition:transform .15s, box-shadow .2s, color .15s, background .15s; }
.rallit-iconbtn:hover { box-shadow:0 8px 22px rgba(20,22,28,0.16); background:#fff; color:var(--ink); }
.rallit-iconbtn svg { transition:transform .15s; }
.rallit-back:hover svg { transform:translateX(-2px); }
.rallit-print:hover svg { transform:translateY(1px); }
@media print {
  .rallit-root { background:#fff; padding:0; }
  .rallit-toolbar { display:none !important; }
  .rallit-root .sheet { width:auto; margin:0; box-shadow:none; min-height:0; }
  .rallit-root .sheet-inner { padding:14mm 14mm; }
  @page { size:A4; margin:11mm 0; }
  .rallit-root .proj, .rallit-root .act-item, .rallit-root .edu-item, .rallit-root .cert-item { break-inside:avoid; }
  .rallit-root .pg-spacer, .rallit-root .pg-line { display:none; }
  .rallit-root * { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
}
.rallit-root .hd { display:flex; justify-content:space-between; align-items:flex-start; gap:28px; }
.rallit-root .hd-main { flex:1; min-width:0; }
.rallit-root .hd-name { font-size:34px; font-weight:800; letter-spacing:-0.04em; line-height:1.05; }
.rallit-root .hd-role { font-size:15.5px; font-weight:600; color:var(--ink-2); margin-top:10px; }
.rallit-root .hd-contact { display:flex; flex-wrap:wrap; gap:7px 20px; margin-top:16px; }
.rallit-root .hd-contact .row { display:flex; align-items:baseline; gap:8px; font-size:12px; color:var(--ink-2); }
.rallit-root .hd-contact .ck { font-family:var(--font-mono); font-size:9.5px; color:var(--ink-3); letter-spacing:0.06em; }
.rallit-root .hd-contact .v { font-weight:600; }
.rallit-root .hd-photo { width:110px; height:110px; flex-shrink:0; border-radius:50%; overflow:hidden; box-shadow:0 2px 12px rgba(20,22,28,0.14); }
.rallit-root .hd-photo img { display:block; width:100%; height:100%; object-fit:cover; }
.rallit-root .hd-rule { height:2px; background:var(--ink); margin:18px 0 0; }
.rallit-root .summary { margin-top:20px; }
.rallit-root .summary p { font-size:13px; color:var(--ink-2); line-height:1.85; margin-bottom:11px; }
.rallit-root .summary p:first-child { font-size:14px; color:var(--ink); font-weight:600; line-height:1.7; }
.rallit-root .summary p:last-child { margin-bottom:0; }
.rallit-root .highlights { display:flex; margin-top:22px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.rallit-root .hl { flex:1; padding:15px 18px; border-left:1px solid var(--line); }
.rallit-root .hl:first-child { border-left:none; padding-left:0; }
.rallit-root .hl .v { font-family:var(--font-mono); font-size:15px; font-weight:800; color:var(--ink); letter-spacing:-0.02em; }
.rallit-root .hl .l { font-size:11px; color:var(--ink-2); font-weight:600; margin-top:6px; }
.rallit-root .sec { margin-top:36px; }
.rallit-root .sec-h { display:flex; align-items:baseline; gap:11px; padding-bottom:10px; border-bottom:1.5px solid var(--ink); margin-bottom:18px; }
.rallit-root .sec-h .no { font-family:var(--font-mono); font-size:11px; font-weight:700; color:var(--ink-3); }
.rallit-root .sec-h .t { font-size:18px; font-weight:800; letter-spacing:-0.03em; }
.rallit-root .career-head { display:flex; justify-content:space-between; align-items:baseline; gap:16px; }
.rallit-root .career-co { font-size:16.5px; font-weight:800; }
.rallit-root .career-pos { font-size:12.5px; color:var(--ink-2); margin-top:4px; }
.rallit-root .career-period { font-family:var(--font-mono); font-size:11px; color:var(--ink-3); white-space:nowrap; }
.rallit-root .career-overview { font-size:12.5px; color:var(--ink-2); line-height:1.75; margin-top:14px; }
.rallit-root .proj { margin-bottom:26px; }
.rallit-root .proj:last-child { margin-bottom:0; }
.rallit-root .career-projs { margin-top:20px; display:flex; flex-direction:column; }
.rallit-root .proj-head { margin-bottom:10px; }
.rallit-root .proj-top { display:flex; justify-content:space-between; align-items:baseline; gap:14px; }
.rallit-root .proj-title { font-size:14.5px; font-weight:800; letter-spacing:-0.02em; }
.rallit-root .proj-period { font-family:var(--font-mono); font-size:11px; color:var(--ink-3); white-space:nowrap; }
.rallit-root .proj-desc { font-size:11.5px; color:var(--ink-2); line-height:1.62; margin-top:5px; }
.rallit-root .proj-achievements { margin-top:10px; display:flex; flex-direction:column; gap:10px; }
.rallit-root .proj-badge { display:inline-block; font-size:9.5px; font-weight:700; color:var(--ink-2); background:var(--bg-soft); border:1px solid var(--line); border-radius:4px; padding:1px 7px; margin-left:8px; vertical-align:middle; letter-spacing:0.02em; }
.rallit-root .proj-ach-wrap { display:flex; flex-direction:column; gap:2px; }
.rallit-root .proj-ach-label { font-size:10px; font-weight:700; color:var(--ink-3); letter-spacing:0.04em; padding-left:14px; }
.rallit-root .proj-ach { font-size:11.5px; color:var(--ink-2); line-height:1.6; padding-left:14px; position:relative; }
.rallit-root .proj-ach::before { content:""; position:absolute; left:0; top:8px; width:4px; height:4px; border-radius:50%; background:var(--accent); }
.rallit-root .proj-ach-result { color:var(--ink); font-weight:700; }
.rallit-root .act-item { padding:13px 0; border-bottom:1px solid var(--line); }
.rallit-root .act-item:last-child { border-bottom:none; padding-bottom:0; }
.rallit-root .act-item:first-child { padding-top:0; }
.rallit-root .act-top { display:flex; justify-content:space-between; align-items:baseline; gap:14px; }
.rallit-root .act-name { font-size:13.5px; font-weight:800; }
.rallit-root .act-meta { font-family:var(--font-mono); font-size:10.5px; color:var(--ink-3); white-space:nowrap; }
.rallit-root .act-desc { font-size:11.5px; color:var(--ink-2); line-height:1.6; margin-top:6px; }
.rallit-root .act-notes { margin-top:8px; display:flex; flex-direction:column; gap:5px; }
.rallit-root .act-note { font-size:11px; color:var(--ink-2); line-height:1.55; padding-left:12px; position:relative; }
.rallit-root .act-note::before { content:""; position:absolute; left:0; top:7px; width:4px; height:4px; border-radius:50%; background:var(--ink-3); }
.rallit-root .two-col { display:flex; flex-direction:column; gap:28px; }
.rallit-root .edu-item, .rallit-root .cert-item { padding:10px 0; border-bottom:1px solid var(--line-2); }
.rallit-root .edu-item:first-child, .rallit-root .cert-item:first-child { padding-top:0; }
.rallit-root .edu-item:last-child, .rallit-root .cert-item:last-child { border-bottom:none; padding-bottom:0; }
.rallit-root .edu-school { font-size:13px; font-weight:700; }
.rallit-root .edu-degree { font-size:11.5px; color:var(--ink-2); margin-top:2px; }
.rallit-root .edu-meta { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); margin-top:4px; }
.rallit-root .cert-top { display:flex; justify-content:space-between; align-items:baseline; }
.rallit-root .cert-name { font-size:13px; font-weight:700; }
.rallit-root .cert-date { font-family:var(--font-mono); font-size:10px; color:var(--ink-3); }
.rallit-root .cert-issuer { font-size:11px; color:var(--ink-2); margin-top:2px; }
.rallit-root .skills { display:flex; flex-wrap:wrap; gap:7px; }
.rallit-root .skill { font-size:12.5px; font-weight:600; color:var(--ink); background:var(--bg-soft); border-radius:999px; padding:7px 15px; }
.rallit-root .foot { margin-top:26px; padding-top:12px; border-top:1px solid var(--line); display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:9.5px; color:var(--ink-3); letter-spacing:0.03em; }
@media (max-width:760px) { .rallit-root .sheet { width:auto; margin:0; } .rallit-root .highlights { flex-wrap:wrap; } .rallit-root .hl { min-width:50%; } }
`;

const GAP = 28; // px — height of the gray page-gap bar

function topInSheet(el: HTMLElement, sheet: HTMLElement): number {
  const er = el.getBoundingClientRect();
  const sr = sheet.getBoundingClientRect();
  return er.top - sr.top;
}

export function ResumeDocument() {
  const P = PROFILE;
  const sheetRef = useRef<HTMLDivElement>(null);

  const applyBreaks = useCallback(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    // clean up previous injections
    sheet.querySelectorAll('.pg-spacer, .pg-line').forEach(el => el.remove());

    const pxPerMm = sheet.clientWidth / 210;
    const pageH = 297 * pxPerMm;

    const SELECTOR = '.proj, .act-item, .edu-item, .cert-item, .sec-h';
    const ORPHAN_GUARD = 80; // px — sec-h this close to boundary → push to next page

    for (let iter = 0; iter < 20; iter++) {
      const blocks = Array.from(sheet.querySelectorAll(SELECTOR)) as HTMLElement[];
      let fixed = false;

      for (const block of blocks) {
        const top = topInSheet(block, sheet);
        const bottom = top + block.offsetHeight;
        const pageNum = Math.floor(top / pageH);
        const boundary = (pageNum + 1) * pageH;

        const isCrossing = boundary > top && boundary < bottom;
        const isOrphan = block.classList.contains('sec-h')
          && boundary > bottom
          && boundary - bottom < ORPHAN_GUARD;

        if (isCrossing || isOrphan) {
          const topPad = pxPerMm * 18;
          const spacerH = boundary - top + GAP + topPad;
          const spacer = document.createElement('div');
          spacer.className = 'pg-spacer';
          spacer.style.height = `${spacerH}px`;
          block.parentNode?.insertBefore(spacer, block);
          fixed = true;
          break;
        }
      }

      if (!fixed) break;
    }

    // overlay page-gap bars at each 297mm boundary
    const totalH = sheet.scrollHeight;
    let pos = pageH;
    let page = 2;
    while (pos < totalH - 10) {
      const line = document.createElement('div');
      line.className = 'pg-line';
      line.style.top = `${pos}px`;
      line.innerHTML = `<span class="pg-line-label">PAGE ${page}</span>`;
      sheet.appendChild(line);
      pos += pageH;
      page++;
    }
  }, []);

  useEffect(() => {
    applyBreaks();
    const ro = new ResizeObserver(applyBreaks);
    if (sheetRef.current) ro.observe(sheetRef.current);
    return () => ro.disconnect();
  }, [applyBreaks]);

  return (
    <div className="rallit-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
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
            <div className="hd-photo"><img src="/profile-photo.jpg" alt={P.name} /></div>
          </div>
          <div className="hd-rule" />

          <div className="summary">{P.summary.map((s, i) => <p key={i}>{s}</p>)}</div>

          <div className="sec">
            <div className="sec-h"><span className="no">01</span><span className="t">경력</span></div>
            <div className="career-head">
              <div><div className="career-co">{P.career.company}</div><div className="career-pos">{P.career.position}</div></div>
              <div className="career-period">{P.career.period}</div>
            </div>
            <div className="career-overview">{P.career.overview}</div>
            <div className="career-projs">
              {P.projects.map((pr, i) => (
                <div key={i} className="proj">
                  <div className="proj-head">
                    <div className="proj-top">
                      <span className="proj-title">{pr.title}{pr.badge && <span className="proj-badge">{pr.badge}</span>}</span>
                      <span className="proj-period">{pr.period}</span>
                    </div>
                    <div className="proj-desc">{pr.desc}</div>
                  </div>
                  {pr.blocks.some(b => b.lines || b.oneliner) && (
                    <div className="proj-achievements">
                      {pr.blocks.filter(b => b.lines || b.oneliner).map((b, j) => (
                        <div key={j} className="proj-ach-wrap">
                          <div className="proj-ach-label">{b.label}</div>
                          {b.lines
                            ? b.lines.map((line, k) => (
                                <div key={k} className={`proj-ach${k === b.lines!.length - 1 ? " proj-ach-result" : ""}`}>{line}</div>
                              ))
                            : <div className="proj-ach">{b.oneliner}</div>
                          }
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="sec">
            <div className="sec-h"><span className="no">02</span><span className="t">대외활동</span></div>
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
                <div className="sec-h" style={{ marginBottom: 12 }}><span className="no">03</span><span className="t">교육</span></div>
                {P.education.map((e, i) => (
                  <div key={i} className="edu-item">
                    <div className="edu-school">{e.school}</div>
                    <div className="edu-degree">{e.degree}</div>
                    <div className="edu-meta">{e.period} · {e.status}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="sec-h" style={{ marginBottom: 12 }}><span className="no">04</span><span className="t">자격증</span></div>
                {P.certs.map((c, i) => (
                  <div key={i} className="cert-item">
                    <div className="cert-top"><span className="cert-name">{c.name}</span><span className="cert-date">{c.date}</span></div>
                    <div className="cert-issuer">{c.status} · {c.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sec">
            <div className="sec-h"><span className="no">05</span><span className="t">기술 스택</span></div>
            <div className="skills">{P.skills.map((s) => <span key={s} className="skill">{s}</span>)}</div>
          </div>

          <div className="foot"><span>{P.name} · {P.role}</span><span>{P.email}</span></div>
        </div>
      </div>
    </div>
  );
}
