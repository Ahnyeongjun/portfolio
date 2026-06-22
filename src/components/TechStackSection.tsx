'use client';

import { useTranslations } from 'next-intl';
import { techStack } from '@/data/skills';

export function TechStackSection() {
  const t = useTranslations('skills');
  return (
    <section id="skills" className="pf-section-pad">
      <div className="pf-wrap">
        <div className="reveal" style={{ marginBottom: 34 }}>
          <span className="pf-kicker">{t('kicker')}</span>
          <h2 className="pf-h-sec">{t('heading')}</h2>
        </div>
        <div className="pf-stack-wrap reveal">
          {techStack.map((cat) => (
            <div key={cat.label} className="pf-stack-card">
              <div className="pf-stack-cat">
                {cat.label}
                <span className="pf-stack-cat-sub">{cat.sub}</span>
              </div>
              <div className="pf-chips">
                {cat.items.map((it) => (
                  <span key={it} className="pf-chip">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
