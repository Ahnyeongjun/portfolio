'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { useLang } from '@/context/lang';
import { strings } from '@/data/strings';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang } = useLang();
  const t = strings.nav;

  const navLinks = [
    { href: '#about',      label: t.about[lang] },
    { href: '#skills',     label: t.skills[lang] },
    { href: '#career',     label: t.career[lang] },
    { href: '#projects',   label: t.projects[lang] },
    { href: '#background', label: t.background[lang] },
    { href: '/blog',       label: t.blog[lang] },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`pf-nav print:hidden${scrolled ? ' scrolled' : ''}`}>
      <div className="pf-nav-inner">
        <a href="#top" className="pf-brand">
          <span>
            <span className="pf-brand-name">{profile.name}</span>
            <span className="pf-brand-role">{profile.role}</span>
          </span>
        </a>

        <div className="pf-nav-links">
          {navLinks.map(({ href, label }) =>
            href.startsWith('#') ? (
              <a key={href} href={href} className="pf-nav-link">{label}</a>
            ) : (
              <Link key={href} href={href} className="pf-nav-link">{label}</Link>
            )
          )}
        </div>

        <div className="pf-nav-right">
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
          <a href={`mailto:${profile.email}`} className="pf-nav-cta">
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 6h18v12H3z" /><path d="M3 7l9 6 9-6" />
            </svg>
            {t.contact[lang]}
          </a>
        </div>
      </div>
    </nav>
  );
}
