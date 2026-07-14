'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLang } from '@/context/lang';
import type { Project } from '@/lib/projects';

interface CareerSectionProps {
  projects: Project[];
  company: string;
  period: string;
}

type CategoryFilter = "all" | Project["category"][number];

const CATEGORY_OPTIONS: { value: CategoryFilter; ko: string; en: string }[] = [
  { value: "all", ko: "전체", en: "All" },
  { value: "backend", ko: "백엔드", en: "Backend" },
  { value: "frontend", ko: "프론트엔드", en: "Frontend" },
  { value: "infra", ko: "인프라", en: "Infra" },
  { value: "ai", ko: "AI", en: "AI" },
];


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
  const t = useTranslations('career');
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const matchesCategory = (p: Project) =>
    activeCategory === "all" || p.category?.includes(activeCategory);

  const regularProjects = projects.filter((p) => !p.internal && matchesCategory(p));
  const internalProjects = projects.filter((p) => p.internal && matchesCategory(p));

  function renderCard(proj: Project, i: number) {
    const maxTags = 5;
    const shownTags = proj.tags.slice(0, maxTags);
    const extraTags = proj.tags.length - maxTags;
    const achList = lang === 'en' && proj.achievementsEn?.length ? proj.achievementsEn : proj.achievements;
    const achieveTags = (achList ?? [])
      .map((a) => a.match(/^\s*\[([^\]]+)\]/)?.[1])
      .filter((t): t is string => Boolean(t))
      .slice(0, 3);

    return (
      <Link
        key={proj.id}
        href={`/projects/${proj.id}`}
        className="pf-proj-card reveal"
        style={{ transitionDelay: `${(i % 2) * 80}ms` }}
      >
        <div className="pf-proj-thumb">
          <span className="pf-proj-num">{String(i + 1).padStart(2, '0')}</span>
          {proj.internal && (
            <span className="pf-proj-badge">{lang === 'en' ? 'Internal' : '사내 도구'}</span>
          )}
          {proj.imageUrl ? (
            <Image
              src={proj.imageUrl}
              alt={proj.title}
              fill
              style={{
                objectFit: /\.svg$|logo/i.test(proj.imageUrl) ? 'contain' : 'cover',
                padding: /\.svg$|logo/i.test(proj.imageUrl) ? '16px' : undefined,
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <span style={{
              fontFamily: 'var(--font-family-mono)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--pf-text-mute)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textAlign: 'center',
              padding: '0 16px',
              opacity: 0.7,
            }}>{proj.thumbLabel ?? proj.title}</span>
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
          <div className="pf-proj-role">{lang === 'en' && proj.roleEn ? proj.roleEn : proj.role}{proj.company ? ' · ' + proj.company : ''}</div>
          <div className="pf-proj-tags">
            {shownTags.map((tag) => (
              <span key={tag} className="pf-proj-tag">{tag}</span>
            ))}
            {extraTags > 0 && <span className="pf-proj-tag more">+{extraTags}</span>}
          </div>
          <div className="pf-proj-foot">
            <span className="pf-proj-achieve">
              {achieveTags.length > 0 ? (
                <><SparkIcon /> {achieveTags.join(' · ')}</>
              ) : (
                <span style={{ color: 'var(--pf-text-mute)', fontWeight: 500 }}>{proj.company}</span>
              )}
            </span>
            <span className="pf-proj-view">
              {t('detailBtn')} <span className="arr"><ArrowIcon /></span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <section
      id="career"
      className="pf-section-pad"
      style={{ background: 'var(--pf-bg-soft)', borderTop: '1px solid var(--pf-bdr)', borderBottom: '1px solid var(--pf-bdr)' }}
    >
      <div className="pf-wrap">
        <div className="reveal" style={{ marginBottom: 34 }}>
          <span className="pf-kicker">{t('kicker')}</span>
          <h2 className="pf-h-sec">{t('heading')}</h2>
          <p className="pf-p-sec">{t('sub')}</p>
        </div>

        <div className="pf-career-head reveal">
          <span className="pf-career-logo">
            <Image src="/hancominpsace_logo.png" alt="한컴인스페이스" width={56} height={56} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
          </span>
          <div>
            <div className="pf-career-co">{company}</div>
            <div className="pf-career-period">{period}</div>
          </div>
          <div className="pf-career-tenure">
            {t('tenureYears')}<br />
            <span style={{ color: 'var(--pf-text-mute)' }}>{t('tenureRole')}</span>
          </div>
        </div>

        <div className="pf-cat-filter reveal">
          {CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`pf-cat-btn${activeCategory === opt.value ? ' active' : ''}`}
              onClick={() => setActiveCategory(opt.value)}
            >
              {lang === 'en' ? opt.en : opt.ko}
            </button>
          ))}
        </div>

        <div className="pf-proj-grid">
          {regularProjects.map((proj, i) => renderCard(proj, i))}
        </div>

        {internalProjects.length > 0 && (
          <>
            <div className="pf-career-subhead reveal">
              <span className="pf-career-subtitle">
                {lang === 'en' ? 'Internal Tools · Personal Work' : '사내 도구 · 개인 작업'}
              </span>
              <span className="pf-career-subnote">
                {lang === 'en'
                  ? 'Not client deliverables - tools built and shared in-house'
                  : '발주처 납품물이 아닌, 사내에서 직접 만들어 공유한 작업'}
              </span>
            </div>
            <div className="pf-proj-grid">
              {internalProjects.map((proj, i) => renderCard(proj, i))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
