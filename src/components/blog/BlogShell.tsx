'use client';

import { useState, useEffect } from 'react';
import { LayoutList, LayoutGrid } from 'lucide-react';

type BlogTheme  = 'light' | 'dark' | 'rose' | 'forest';
type BlogLayout = 'list' | 'grid';
type BlogFont   = 'sm' | 'md' | 'lg';

const THEMES: { id: BlogTheme; label: string; accent: string }[] = [
  { id: 'light',  label: '라이트',   accent: '#3182f6' },
  { id: 'dark',   label: '다크',     accent: '#64748b' },
  { id: 'rose',   label: '로즈',     accent: '#f43f5e' },
  { id: 'forest', label: '포레스트', accent: '#10b981' },
];

export function BlogShell({ children }: { children: React.ReactNode }) {
  const [theme,   setThemeState]  = useState<BlogTheme>('light');
  const [layout,  setLayoutState] = useState<BlogLayout>('list');
  const [font,    setFontState]   = useState<BlogFont>('md');
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = localStorage.getItem('blog-theme')  as BlogTheme  | null;
    const l = localStorage.getItem('blog-layout') as BlogLayout | null;
    const f = localStorage.getItem('blog-font')   as BlogFont   | null;
    if (t && THEMES.some((x) => x.id === t)) setThemeState(t);
    if (l === 'list' || l === 'grid')          setLayoutState(l);
    if (f === 'sm'   || f === 'md' || f === 'lg') setFontState(f);
  }, []);

  function setTheme(v: BlogTheme)  { setThemeState(v);  localStorage.setItem('blog-theme',  v); }
  function setLayout(v: BlogLayout){ setLayoutState(v); localStorage.setItem('blog-layout', v); }
  function setFont(v: BlogFont)    { setFontState(v);   localStorage.setItem('blog-font',   v); }

  return (
    <div
      id="portfolio-page"
      data-blog-theme={mounted ? theme  : 'light'}
      data-blog-layout={mounted ? layout : 'list'}
      data-blog-font={mounted ? font   : 'md'}
    >
      {mounted && (
        <div className="blog-switcher">
          {/* 색상 */}
          <div className="blog-switcher-group">
            <span className="blog-switcher-label">색상</span>
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                title={t.label}
                className={`blog-theme-dot${theme === t.id ? ' active' : ''}`}
                style={{ background: t.accent }}
              />
            ))}
          </div>

          <div className="blog-switcher-sep" />

          {/* 레이아웃 */}
          <div className="blog-switcher-group">
            <span className="blog-switcher-label">목록</span>
            <button
              type="button"
              title="리스트"
              className={`blog-ctrl-btn${layout === 'list' ? ' active' : ''}`}
              onClick={() => setLayout('list')}
            >
              <LayoutList size={14} />
            </button>
            <button
              type="button"
              title="그리드"
              className={`blog-ctrl-btn${layout === 'grid' ? ' active' : ''}`}
              onClick={() => setLayout('grid')}
            >
              <LayoutGrid size={14} />
            </button>
          </div>

          <div className="blog-switcher-sep" />

          {/* 글자 크기 */}
          <div className="blog-switcher-group">
            <span className="blog-switcher-label">글자</span>
            <button
              type="button"
              title="작게"
              className={`blog-ctrl-btn blog-font-btn${font === 'sm' ? ' active' : ''}`}
              onClick={() => setFont('sm')}
            >A-</button>
            <button
              type="button"
              title="기본"
              className={`blog-ctrl-btn blog-font-btn${font === 'md' ? ' active' : ''}`}
              onClick={() => setFont('md')}
            >A</button>
            <button
              type="button"
              title="크게"
              className={`blog-ctrl-btn blog-font-btn${font === 'lg' ? ' active' : ''}`}
              onClick={() => setFont('lg')}
            >A+</button>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
