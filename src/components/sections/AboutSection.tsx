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
          <span className="pf-kicker">소개</span>
          <h2 className="pf-h-sec">구현에서 끝내지 않고{'\n'}구조와 생산성까지 고민합니다</h2>
          <div className="pf-about-facts" style={{ marginTop: 28 }}>
            <div className="pf-fact">
              <div className="fk">Now</div>
              <div className="fv">{profile.company}</div>
              <div className="fs">{profile.period} · {profile.duration}</div>
            </div>
            <div className="pf-fact">
              <div className="fk">Role</div>
              <div className="fv">{profile.roleFull}</div>
              <div className="fs">백엔드 중심 · 프론트 · 인프라</div>
            </div>
            <div className="pf-fact">
              <div className="fk">Base</div>
              <div className="fv">{profile.location}</div>
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
