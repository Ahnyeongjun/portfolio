'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { useLang } from '@/context/lang';
import { useTranslations } from 'next-intl';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang } = useLang();
  const t = useTranslations('nav');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`pf-nav print:hidden${scrolled ? ' scrolled' : ''}`}>
      <div className="pf-nav-inner">
        {/* Brand — left */}
        <a href="#top" className="pf-brand">
          <span className="pf-brand-info">
            <span className="pf-brand-name">{profile.name}</span>
            <span className="pf-brand-role">{profile.role}</span>
          </span>
        </a>

        {/* Right controls */}
        <div className="pf-nav-right">
          {/* Page links */}
          <div className="pf-nav-links">
            <a href="#top" className="pf-nav-link">{t('portfolio')}</a>
            <Link href="/blog" className="pf-nav-link">{t('blog')}</Link>
          </div>

          <div className="pf-nav-divider" aria-hidden="true"/>

          {/* Language toggle */}
          <div className="pf-lang-toggle">
            <button
              type="button"
              className={`pf-lang-btn${lang === 'ko' ? ' active' : ''}`}
              onClick={() => lang !== 'ko' && toggleLang()}
            >KO</button>
            <button
              type="button"
              className={`pf-lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => lang !== 'en' && toggleLang()}
            >EN</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
