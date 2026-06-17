'use client';

import { useState, useEffect, useCallback } from 'react';

const sections = [
  { id: 'top',        label: '홈' },
  { id: 'about',      label: '소개' },
  { id: 'skills',     label: '기술' },
  { id: 'career',     label: '경력' },
  { id: 'projects',   label: '프로젝트' },
  { id: 'background', label: '학력' },
  { id: 'blog',       label: '블로그' },
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
        onClick={() => scrollTo(sections[Math.max(0, activeIndex - 1)].id)}
        className="pf-snav-arrow"
        aria-label="이전 섹션"
        disabled={activeIndex === 0}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>

      <div className="pf-snav-items">
        {sections.map((s, i) => (
          <button
            key={s.id}
            className={`pf-snav-item${activeIndex === i ? ' active' : ''}`}
            onClick={() => scrollTo(s.id)}
            aria-label={s.label}
          >
            <span className="pf-snav-label">{s.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => scrollTo(sections[Math.min(sections.length - 1, activeIndex + 1)].id)}
        className="pf-snav-arrow"
        aria-label="다음 섹션"
        disabled={activeIndex === sections.length - 1}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
    </nav>
  );
}
