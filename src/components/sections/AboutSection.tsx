'use client';

import { profile } from '@/data/profile';
import { useLang } from '@/context/lang';
import { useTranslations } from 'next-intl';

export function AboutSection() {
  const { lang } = useLang();
  const t = useTranslations('about');

  const facts = [
    { key: t('factNow'),  val: profile.company,  sub: lang === 'ko' ? `${profile.period} · ${profile.duration}` : `Jul 2021 ~ present · ${profile.durationEn}` },
    { key: t('factRole'), val: profile.roleFull, sub: t('roleSub') },
    { key: t('factBase'), val: profile.location, sub: null },
  ];

  const intro = lang === 'ko' ? profile.introduction : profile.introductionEn;

  return (
    <section
      id="about"
      className="pf-section-pad"
      style={{ background: 'var(--pf-bg-soft)', borderTop: '1px solid var(--pf-bdr)', borderBottom: '1px solid var(--pf-bdr)' }}
    >
      <div className="pf-wrap pf-about-grid">

        {/* Left */}
        <div className="reveal">
          <span className="pf-kicker">{t('kicker')}</span>
          <h2 className="pf-h-sec" style={{ marginBottom: 32, whiteSpace: 'pre-line' }}>
            {t('heading')}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid var(--pf-bdr)' }}>
            {facts.map((f) => (
              <div
                key={f.key}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 16,
                  padding: '14px 0',
                  borderBottom: '1px solid var(--pf-bdr)',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--pf-ac)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  minWidth: 44,
                  flexShrink: 0,
                }}>
                  {f.key}
                </span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--pf-text)' }}>{f.val}</div>
                  {f.sub && <div style={{ fontSize: 13, color: 'var(--pf-text-mute)', marginTop: 2 }}>{f.sub}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - intro text, padded down to align with body */}
        <div className="reveal pf-about-body" style={{ transitionDelay: '90ms', paddingTop: 56 }}>
          {intro.map((p, i) => <p key={i}>{p}</p>)}
        </div>

      </div>
    </section>
  );
}
