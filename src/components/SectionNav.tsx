'use client';

import { useState, useEffect, useCallback } from 'react';

const sections = [
  { id: 'top',        label: 'Hero' },
  { id: 'impact',     label: '성과' },
  { id: 'about',      label: '소개' },
  { id: 'skills',     label: '기술' },
  { id: 'career',     label: '경력' },
  { id: 'projects',   label: '프로젝트' },
  { id: 'background', label: '학력' },
  { id: 'contact',    label: '연락' },
];

export function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section, index) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
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

  const goUp = () => {
    const prev = Math.max(0, activeIndex - 1);
    scrollTo(sections[prev].id);
  };

  const goDown = () => {
    const next = Math.min(sections.length - 1, activeIndex + 1);
    scrollTo(sections[next].id);
  };

  return (
    <div className="pf-snav print:hidden" role="navigation" aria-label="섹션 이동">
      <button onClick={goUp} className="pf-snav-arrow" aria-label="이전 섹션" disabled={activeIndex === 0}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>

      <div className="pf-snav-dots">
        {sections.map((s, i) => (
          <button
            key={s.id}
            className={`pf-snav-dot${activeIndex === i ? ' active' : ''}`}
            onClick={() => scrollTo(s.id)}
            aria-label={s.label}
            data-label={s.label}
          />
        ))}
      </div>

      <button onClick={goDown} className="pf-snav-arrow" aria-label="다음 섹션" disabled={activeIndex === sections.length - 1}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
    </div>
  );
}
