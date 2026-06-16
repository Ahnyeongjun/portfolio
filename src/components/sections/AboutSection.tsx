import { SectionHead } from '@/components/SectionHead';
import { profile } from '@/data/profile';

export function AboutSection() {
  return (
    <section
      id="about"
      className="pf-section-pad"
      style={{ background: 'var(--pf-bg-soft)', borderTop: '1px solid var(--pf-bdr)', borderBottom: '1px solid var(--pf-bdr)' }}
    >
      <div className="pf-wrap pf-about-grid">
        <div className="reveal">
          <SectionHead index="02" label="소개" title={'구현에서 끝내지 않고\n구조와 생산성까지 고민합니다'} />
          <div className="pf-about-side" style={{ marginTop: 28 }}>
            <div className="pf-about-fact">
              <span className="af-key">Now</span>
              <span>
                <span className="af-val">{profile.company}</span>
                <span className="af-sub">{profile.period} · {profile.duration}</span>
              </span>
            </div>
            <div className="pf-about-fact">
              <span className="af-key">Role</span>
              <span>
                <span className="af-val">{profile.roleFull}</span>
                <span className="af-sub">백엔드 중심 · 프론트 · 인프라</span>
              </span>
            </div>
            <div className="pf-about-fact">
              <span className="af-key">Base</span>
              <span>
                <span className="af-val">{profile.location}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="reveal pf-about-body" style={{ transitionDelay: '90ms' }}>
          {profile.introduction.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}
