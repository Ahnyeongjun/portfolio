'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { profile } from '@/data/profile';
import { useLang } from '@/context/lang';
import { useTranslations } from 'next-intl';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang } = useLang();
  const t = useTranslations('nav');
  const pathname = usePathname();

  const portfolioHref = pathname === '/' ? '#top' : '/';
  const isBlogPost = pathname.startsWith('/blog/') && !pathname.startsWith('/blog/category');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`pf-nav print:hidden${scrolled ? ' scrolled' : ''}`}>
      <div className="pf-nav-inner">

        {isBlogPost ? (
          <Link href="/blog" className="pf-nav-back">
            <ArrowLeft size={15} />
            {t('blog')}
          </Link>
        ) : (
          <Link href={portfolioHref} className="pf-brand">
            <span className="pf-brand-info">
              <span className="pf-brand-name">{profile.name}</span>
              <span className="pf-brand-role">{profile.role}</span>
            </span>
          </Link>
        )}

        <div className="pf-nav-right">
          {!isBlogPost && (
            <>
              <div className="pf-nav-links">
                <Link href={portfolioHref} className="pf-nav-link">{t('portfolio')}</Link>
                <Link href="/blog" className="pf-nav-link">{t('blog')}</Link>
              </div>
              <div className="pf-nav-divider" aria-hidden="true" />
            </>
          )}

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
