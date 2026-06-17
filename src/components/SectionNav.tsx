'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

const sectionIds = ['top', 'about', 'skills', 'career', 'projects', 'background', 'blog', 'contact'];

export function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations('nav');

  const labels: Record<string, string> = {
    top: t('portfolio'),
    about: t('about'),
    skills: t('skills'),
    career: t('career'),
    projects: t('projects'),
    background: t('background'),
    blog: t('blog'),
    contact: t('contact'),
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(index); },
        { threshold: 0.25, rootMargin: '-15% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <nav className="pf-snav print:hidden" aria-label="섹션 이동">
      <button
        onClick={() => scrollTo(sectionIds[Math.max(0, activeIndex - 1)])}
        className="pf-snav-arrow"
        aria-label="이전 섹션"
        disabled={activeIndex === 0}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>

      <div className="pf-snav-items">
        {sectionIds.map((id, i) => (
          <button
            key={id}
            className={`pf-snav-item${activeIndex === i ? ' active' : ''}`}
            onClick={() => scrollTo(id)}
            aria-label={labels[id]}
          >
            <span className="pf-snav-label">{labels[id]}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => scrollTo(sectionIds[Math.min(sectionIds.length - 1, activeIndex + 1)])}
        className="pf-snav-arrow"
        aria-label="다음 섹션"
        disabled={activeIndex === sectionIds.length - 1}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
    </nav>
  );
}
