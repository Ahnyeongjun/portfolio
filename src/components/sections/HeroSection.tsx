'use client';

import { profile } from '@/data/profile';
import { useLang } from '@/context/lang';
import { useTranslations } from 'next-intl';

function SpotCards() {
  const t = useTranslations('hero');
  return (
    <div className="pf-hero-visual">
      {/* Blue top card - 대표 성과 */}
      <div className="pf-spot-card blue">
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 12, fontFamily: 'var(--font-family-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {t('apiLabel')}
        </div>
        <div className="pf-spot-row">
          <div>
            <div className="pf-spot-num">{t('apiMain')}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 8 }}>
              {t('apiSub')}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-family-mono)', textDecoration: 'line-through' }}>{t('apiOld')}</div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--font-family-mono)', letterSpacing: '-0.04em', color: '#fff' }}>15×</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{t('apiFaster')}</div>
          </div>
        </div>
      </div>

      {/* Mini row */}
      <div className="pf-spot-mini">
        <div className="mini">
          <div className="mv">{t('aiValue')}</div>
          <div className="ml">{t('aiLabel')}</div>
        </div>
        <div className="mini">
          <div className="mv">{t('deployValue')}</div>
          <div className="ml">{t('deployLabel')}</div>
        </div>
      </div>

      {/* Bottom card */}
      <div className="pf-spot-card">
        <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 12, color: 'var(--pf-text-mute)', marginBottom: 8 }}>
          {t('reportLabel')}
        </div>
        <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>
          {t('reportValue')}
        </div>
        <div style={{ fontSize: 13, color: 'var(--pf-text-mute)', marginTop: 6 }}>
          {t('reportSub')}
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { lang } = useLang();
  const t = useTranslations('hero');

  return (
    <header id="top" className="pf-hero">
      <div className="pf-hero-glow" />
      <div className="pf-wrap">
        <div className="pf-hero-split reveal in">
          {/* Left: Text */}
          <div>
            <div className="pf-status">
              <span className="dot" />
              {t('status')}
            </div>
            <h1 className="pf-hero-h1">
              {lang === 'ko' ? profile.headingLine1 : profile.headingLine1En}
              <br />
              <span className="hl">{lang === 'ko' ? profile.headingHighlight : profile.headingHighlightEn}</span>
            </h1>
            <p className="pf-hero-tagline">{lang === 'ko' ? profile.tagline : profile.taglineEn}</p>
            <div className="pf-hero-meta">
              <span className="pf-hero-meta-item">{profile.company} · {lang === 'ko' ? profile.duration : profile.durationEn}</span>
              <a className="pf-hero-meta-item" href={profile.githubUrl} target="_blank" rel="noreferrer">
                @{profile.github}
              </a>
            </div>
            <div className="pf-hero-cta-row">
              <a href={`mailto:${profile.email}`} className="pf-btn pf-btn-primary">
                <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 6h18v12H3z" /><path d="M3 7l9 6 9-6" />
                </svg>
                {t('ctaContact')}
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
          <SpotCards />
        </div>
      </div>
    </header>
  );
}
