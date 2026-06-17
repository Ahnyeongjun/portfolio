import { profile } from '@/data/profile';

const facts = [
  { key: 'Now',  val: profile.company,    sub: `${profile.period} · ${profile.duration}` },
  { key: 'Role', val: profile.roleFull,   sub: '백엔드 중심 · 프론트 · 인프라' },
  { key: 'Base', val: profile.location,   sub: null },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="pf-section-pad"
      style={{ background: 'var(--pf-bg-soft)', borderTop: '1px solid var(--pf-bdr)', borderBottom: '1px solid var(--pf-bdr)' }}
    >
      <div className="pf-wrap pf-about-grid">

        {/* Left */}
        <div className="reveal">
          <span className="pf-kicker">소개</span>
          <h2 className="pf-h-sec" style={{ marginBottom: 32 }}>
            {'구현에서 끝내지 않고\n구조와 생산성까지 고민합니다'}
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

        {/* Right — intro text, padded down to align with body */}
        <div className="reveal pf-about-body" style={{ transitionDelay: '90ms', paddingTop: 56 }}>
          {profile.introduction.map((p, i) => <p key={i}>{p}</p>)}
        </div>

      </div>
    </section>
  );
}
