'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLang } from '@/context/lang';
import type { Project } from '@/lib/projects';

interface SideProjectsSectionProps {
  projects: Project[];
}

type Track = 'all' | 'infra' | 'fullstack';

const TRACK_LABEL: Record<Track, { ko: string; en: string }> = {
  all: { ko: '전체', en: 'All' },
  infra: { ko: '인프라', en: 'Infra' },
  fullstack: { ko: '풀스택', en: 'Full-stack' },
};

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

function getWatermark(proj: Project) {
  return proj.title.replace(/[^A-Za-z가-힣]/g, '').slice(0, 4).toUpperCase() || 'PRJ';
}

export function SideProjectsSection({ projects }: SideProjectsSectionProps) {
  const t = useTranslations('projects');
  const { lang } = useLang();
  const [track, setTrack] = useState<Track>('all');
  const filteredProjects = projects.filter((p) => track === 'all' || p.category.includes(track));

  return (
    <section id="projects" className="pf-section-pad">
      <div className="pf-wrap">
        <div className="reveal" style={{ marginBottom: 34 }}>
          <span className="pf-kicker">{t('kicker')}</span>
          <h2 className="pf-h-sec">{t('heading')}</h2>
        </div>

        <div className="pf-track-toggle reveal" role="tablist" aria-label={lang === 'en' ? 'Filter by track' : '트랙별 필터'}>
          {(Object.keys(TRACK_LABEL) as Track[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={track === key}
              className={`pf-track-btn${track === key ? ' active' : ''}`}
              onClick={() => setTrack(key)}
            >
              {lang === 'en' ? TRACK_LABEL[key].en : TRACK_LABEL[key].ko}
            </button>
          ))}
        </div>

        <div className="pf-proj-grid" style={{ marginTop: 32 }}>
          {filteredProjects.map((proj, i) => {
            const watermark = getWatermark(proj);
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
                      <div className="pf-proj-name">{lang === 'en' && proj.titleEn ? proj.titleEn : proj.title}</div>
                      {proj.role && <div className="pf-proj-subtitle">{lang === 'en' && proj.roleEn ? proj.roleEn : proj.role}</div>}
                    </div>
                    <span className="pf-proj-period">{proj.period}</span>
                  </div>
                  <p className="pf-proj-desc">{lang === 'en' && proj.descriptionEn ? proj.descriptionEn : proj.description}</p>
                  <div className="pf-proj-role">{lang === 'en' && proj.roleEn ? proj.roleEn : proj.role}</div>
                  <div className="pf-proj-tags">
                    {shownTags.map((tag) => (
                      <span key={tag} className="pf-proj-tag">{tag}</span>
                    ))}
                    {extraTags > 0 && <span className="pf-proj-tag more">+{extraTags}</span>}
                  </div>
                  <div className="pf-proj-foot">
                    <span className="pf-proj-achieve">
                      {topAchieve ? (() => {
                        const achieve = lang === 'en' && proj.achievementsEn?.[0] ? proj.achievementsEn[0] : topAchieve;
                        return <><SparkIcon /> {achieve.slice(0, 30)}{achieve.length > 30 ? '…' : ''}</>;
                      })() : (
                        <span style={{ color: 'var(--pf-text-mute)', fontWeight: 500 }}>{lang === 'en' && proj.roleEn ? proj.roleEn : proj.role}</span>
                      )}
                    </span>
                    <span className="pf-proj-view">
                      {t('detailBtn')} <span className="arr"><ArrowIcon /></span>
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
