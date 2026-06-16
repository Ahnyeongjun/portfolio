import { education, certifications, activities } from '@/data/experience';

export function BackgroundSection() {
  return (
    <section
      id="background"
      className="pf-section-pad"
      style={{ background: 'var(--pf-bg-soft)', borderTop: '1px solid var(--pf-bdr)', borderBottom: '1px solid var(--pf-bdr)' }}
    >
      <div className="pf-wrap">
        {/* Header: ghost index + register only (no h2 title, matches reference) */}
        <div className="reveal pf-sec-head" style={{ marginBottom: 36 }}>
          <span className="pf-ghost-index">06</span>
          <div className="pf-register">
            <span className="pf-reg-index">§ 06</span>
            <span className="pf-reg-rule" />
            <span className="pf-reg-label">학력 · 활동</span>
            <span className="pf-reg-fig">FIG.06</span>
          </div>
        </div>

        {/* Education | Certifications — 2 columns */}
        <div className="pf-bg-grid-layout reveal">
          <div className="pf-panel">
            <div className="pf-panel-title">학력</div>
            {education.map((e) => (
              <div key={e.school} className="pf-edu-item">
                <div className="pf-edu-school">{e.school}</div>
                <div className="pf-edu-major">{e.major}</div>
                <div className="pf-edu-period">{e.period} · {e.info}</div>
              </div>
            ))}
          </div>

          <div className="pf-panel">
            <div className="pf-panel-title">자격증</div>
            {certifications.map((c) => (
              <div key={c.title} className="pf-cert-item">
                <span className="pf-cert-year">{c.year}</span>
                <span className="pf-cert-name">{c.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activities — below, in a grid */}
        <div className="reveal" style={{ marginTop: 22 }}>
          <div className="pf-section-label-sm">활동 · 교육</div>
          <div className="pf-act-list">
            {activities.map((act) => (
              <div key={act.title} className="pf-act-card">
                <div className="pf-act-head">
                  <div className="pf-act-name">{act.title}</div>
                  <div className="pf-act-period">{act.period}</div>
                </div>
                <div className="pf-act-desc">{act.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
