'use client';

import { profile } from '@/data/profile';
import { useLang } from '@/context/lang';

function SpotCards({ lang }: { lang: 'ko' | 'en' }) {
  return (
    <div className="pf-hero-visual">
      {/* Domain card */}
      <div className="pf-spot-card blue">
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 10, fontFamily: 'var(--font-family-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {lang === 'ko' ? '전문 도메인' : 'Domains'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <div className="pf-spot-label" style={{ color: 'rgba(255,255,255,1)', fontWeight: 600 }}>{lang === 'ko' ? '위성 영상 AI · 처리 플랫폼' : 'Satellite imagery AI platform'}</div>
          <div className="pf-spot-label" style={{ color: 'rgba(255,255,255,0.8)' }}>{lang === 'ko' ? '백엔드 · MSA · 클라우드 인프라' : 'Backend · MSA · Cloud infra'}</div>
          <div className="pf-spot-label" style={{ color: 'rgba(255,255,255,0.65)' }}>{lang === 'ko' ? '업무 자동화 · MCP 에이전트' : 'Automation · MCP agent'}</div>
        </div>
      </div>

      {/* Mini row — delivery clients */}
      <div className="pf-spot-mini">
        <div className="mini">
          <div className="mv" style={{ fontSize: 14 }}>{lang === 'ko' ? '항공우주연구원' : 'KARI'}</div>
          <div className="ml">{lang === 'ko' ? '위성 AI 플랫폼 납품' : 'Satellite AI platform'}</div>
        </div>
        <div className="mini">
          <div className="mv" style={{ fontSize: 14 }}>NIPA</div>
          <div className="ml">{lang === 'ko' ? '위성 분석 플랫폼 납품' : 'Satellite analysis platform'}</div>
        </div>
      </div>

      {/* Experience / Location card */}
      <div className="pf-spot-card">
        <div className="pf-spot-row">
          <div>
            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 13, color: 'var(--pf-text-mute)' }}>
              {lang === 'ko' ? '경력' : 'Experience'}
            </div>
            <div className="pf-spot-num" style={{ fontSize: 32 }}>
              5{lang === 'ko' ? '년' : 'y'}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 13, color: 'var(--pf-text-mute)' }}>
              {lang === 'ko' ? '위치' : 'Location'}
            </div>
            <div style={{ fontWeight: 700, marginTop: 4 }}>Seoul, KR</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { lang } = useLang();

  return (
    <header id="top" className="pf-hero">
      <div className="pf-hero-glow" />
      <div className="pf-wrap">
        <div className="pf-hero-split reveal in">
          {/* Left: Text */}
          <div>
            <div className="pf-status">
              <span className="dot" />
              {lang === 'ko' ? '이직 준비 중' : 'Open to work'}
            </div>
            <h1 className="pf-hero-h1">
              {profile.headingLine1}
              <br />
              <span className="hl">{profile.headingHighlight}</span>
            </h1>
            <p className="pf-hero-tagline">{profile.tagline}</p>
            <div className="pf-hero-meta">
              <span className="pf-hero-meta-item">{profile.company} · {profile.duration}</span>
              <a className="pf-hero-meta-item" href={profile.githubUrl} target="_blank" rel="noreferrer">
                @{profile.github}
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

          {/* Right: Spot Cards */}
          <SpotCards lang={lang} />
        </div>
      </div>
    </header>
  );
}
