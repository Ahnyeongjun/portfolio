'use client';

import { profile } from '@/data/profile';
import { useLang } from '@/context/lang';

const sysSegsKo = [
  ['STATUS', 'OPEN · 이직 준비 중'],
  ['STACK', 'SPRING · GO · K8S · FASTAPI'],
  ['FOCUS', 'MSA / EVENT-DRIVEN'],
  ['EXP', '5년차'],
  ['LOC', '37.57°N 126.98°E'],
  ['REDEPLOY', '10→1 / MO'],
  ['API', '4S→0.5S'],
];
const sysSegsEn = [
  ['STATUS', 'OPEN_TO_WORK'],
  ['STACK', 'SPRING · GO · K8S · FASTAPI'],
  ['FOCUS', 'MSA / EVENT-DRIVEN'],
  ['EXP', '5 YEARS'],
  ['LOC', '37.57°N 126.98°E'],
  ['REDEPLOY', '10→1 / MO'],
  ['API', '4S→0.5S'],
];

function SysTicker({ lang }: { lang: 'ko' | 'en' }) {
  const segs = lang === 'ko' ? sysSegsKo : sysSegsEn;
  const Row = () => (
    <>
      {segs.map((s, i) => (
        <span key={i} className="pf-sys-seg">
          <span className="dot">●</span>
          <span className="k">{s[0]}</span>
          <span className="v">{s[1]}</span>
        </span>
      ))}
    </>
  );
  return (
    <div className="pf-sys-ticker">
      <span className="pf-sys-ticker-track"><Row /><Row /></span>
    </div>
  );
}

function TerminalCard({ lang }: { lang: 'ko' | 'en' }) {
  return (
    <div className="pf-terminal">
      <div className="pf-term-bar">
        <span className="pf-term-dot" style={{ background: '#ff5f57' }} />
        <span className="pf-term-dot" style={{ background: '#febc2e' }} />
        <span className="pf-term-dot" style={{ background: '#28c840' }} />
        <span className="pf-term-title">~/career/ahn-youngjun.ts</span>
      </div>
      <div className="pf-term-body">
        <div className="ln"><span className="t-com">{'// '}{lang === 'ko' ? '운영 서비스를 구조로 해결합니다' : 'Solving production through architecture'}</span></div>
        <div className="ln"><span className="t-key">const</span>{' dev = {'}</div>
        <div className="ln">{'  role: '}<span className="t-str">&quot;{lang === 'ko' ? '백엔드 엔지니어' : 'Backend Engineer'}&quot;</span>,</div>
        <div className="ln">{'  company: '}<span className="t-str">&quot;한컴인스페이스&quot;</span>,</div>
        <div className="ln">{'  focus: ['}<span className="t-str">&quot;MSA&quot;</span>{', '}<span className="t-str">&quot;Event-Driven&quot;</span>{', '}<span className="t-str">&quot;K8s&quot;</span>{'],'}
        </div>
        <div className="ln">{'  '}<span className="t-fn">shipped</span>{': { redeploy: '}<span className="t-str">&quot;10→1&quot;</span>{', api: '}<span className="t-str">&quot;4s→0.5s&quot;</span>{' },'}
        </div>
        <div className="ln">{'};'}</div>
        <div className="ln"><span className="t-fn">dev</span>{'.'}<span className="t-fn">hire</span>{'()'}<span className="pf-cursor-blink" /></div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { lang } = useLang();

  return (
    <header id="top" className="pf-hero">
      <div className="pf-wrap">
        <div className="pf-hero-split reveal in">
          {/* Left: Text */}
          <div>
            <div className="pf-hero-coords">
              37.5665°N 126.9780°E · {lang === 'ko' ? '서울, KR' : 'SEOUL, KR'} · KST (UTC+9)
            </div>
            <h1 className="pf-hero-h1">
              {profile.headingLine1}
              <br />
              <span className="hl">{profile.headingHighlight}</span>
            </h1>
            <p className="pf-hero-tagline">{profile.tagline}</p>
            <div className="pf-hero-meta">
              <span className="pf-hero-meta-item">
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11z" />
                  <path d="M12 10a2 2 0 1 0 0-.01" />
                </svg>
                <b>{profile.location}</b>
              </span>
              <span className="pf-hero-meta-item">{profile.company} · {profile.duration}</span>
              <a className="pf-hero-meta-item" href={profile.githubUrl} target="_blank" rel="noreferrer">
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
                </svg>
                <b>@{profile.github}</b>
              </a>
              <a className="pf-hero-meta-item" href={profile.bojUrl} target="_blank" rel="noreferrer">
                solved.ac/<b>{profile.boj}</b>
              </a>
            </div>
            <div className="pf-hero-cta-row">
              <a href={`mailto:${profile.email}`} className="pf-btn pf-btn-primary">
                <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h18v12H3z" /><path d="M3 7l9 6 9-6" />
                </svg>
                {lang === 'ko' ? '이력서 / 연락하기' : 'Resume / Contact'}
              </a>
              <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="pf-btn pf-btn-ghost">
                <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Right: Terminal */}
          <TerminalCard lang={lang} />
        </div>

        <SysTicker lang={lang} />
      </div>
    </header>
  );
}
