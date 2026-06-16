import Image from 'next/image';
import Link from 'next/link';
import { SectionHead } from '@/components/SectionHead';
import type { Project } from '@/lib/projects';

interface CareerSectionProps {
  projects: Project[];
  company: string;
  period: string;
}

const watermarks = ['MSA', 'API', 'AUTH', 'AI', 'MQ', 'K8S'];

function ArrowIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" />
    </svg>
  );
}

export function CareerSection({ projects, company, period }: CareerSectionProps) {
  return (
    <section
      id="career"
      className="pf-section-pad"
      style={{ background: 'var(--pf-bg-soft)', borderTop: '1px solid var(--pf-bdr)', borderBottom: '1px solid var(--pf-bdr)' }}
    >
      <div className="pf-wrap">
        <SectionHead index="04" label="경력" title="한컴인스페이스 · 연구원" sub="위성 영상 분석 플랫폼을 처음부터 설계·구현하고 MSA로 전환" />

        <div className="pf-career-head reveal">
          <span className="pf-career-logo">한컴</span>
          <div>
            <div className="pf-career-co">{company}</div>
            <div className="pf-career-period">{period}</div>
          </div>
          <div className="pf-career-tenure">
            5년차<br />
            <span style={{ color: 'var(--pf-text-mute)' }}>연구원</span>
          </div>
        </div>

        <div className="pf-proj-grid">
          {projects.map((proj, i) => {
            const watermark = watermarks[i] || '';
            const maxTags = 5;
            const shownTags = proj.tags.slice(0, maxTags);
            const extraTags = proj.tags.length - maxTags;
            const topAchieve = proj.achievements?.[0];

            return (
              <Link
                key={proj.id}
                href={`/projects/${proj.id}`}
                className="pf-proj-card reveal"
                style={{ transitionDelay: `${(i % 2) * 80}ms` }}
              >
                <div className="pf-proj-thumb">
                  <span className="pf-proj-num">{String(i + 1).padStart(2, '0')}</span>
                  {proj.imageUrl ? (
                    <Image
                      src={proj.imageUrl}
                      alt={proj.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <span className="ph-watermark">{watermark}</span>
                  )}
                </div>
                <div className="pf-proj-body">
                  <div className="pf-proj-head">
                    <div>
                      <div className="pf-proj-name">{proj.title}</div>
                      {proj.role && <div className="pf-proj-subtitle">{proj.role}</div>}
                    </div>
                    <span className="pf-proj-period">{proj.period}</span>
                  </div>
                  <p className="pf-proj-desc">{proj.description}</p>
                  <div className="pf-proj-role">{proj.role}{proj.company ? ' · ' + proj.company : ''}</div>
                  <div className="pf-proj-tags">
                    {shownTags.map((tag) => (
                      <span key={tag} className="pf-proj-tag">{tag}</span>
                    ))}
                    {extraTags > 0 && <span className="pf-proj-tag more">+{extraTags}</span>}
                  </div>
                  <div className="pf-proj-foot">
                    <span className="pf-proj-achieve">
                      {topAchieve ? (
                        <><SparkIcon /> {topAchieve.slice(0, 30)}{topAchieve.length > 30 ? '…' : ''}</>
                      ) : (
                        <span style={{ color: 'var(--pf-text-mute)', fontWeight: 500 }}>{proj.company}</span>
                      )}
                    </span>
                    <span className="pf-proj-view">
                      자세히 보기 <span className="arr"><ArrowIcon /></span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
