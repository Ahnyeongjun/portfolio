'use client';

import { profile } from '@/data/profile';
import { useTranslations } from 'next-intl';

export function ContactSection() {
  const t = useTranslations('contact');

  const links = [
    { key: 'Email', val: profile.email, href: `mailto:${profile.email}` },
    { key: 'GitHub', val: `@${profile.github}`, href: profile.githubUrl },
    { key: 'solved.ac', val: profile.boj, href: profile.bojUrl },
    { key: 'Site', val: 'ahnyoungjun.site', href: 'https://www.ahnyoungjun.site' },
  ];

  return (
    <section id="contact">
      <div className="pf-contact reveal">
        <span className="pf-kicker" style={{ background: 'rgba(255,255,255,0.12)', color: '#9ec3ff' }}>
          {t('kicker')}
        </span>
        <h2 className="pf-contact-title" style={{ whiteSpace: 'pre-line' }}>{t('heading')}</h2>
        <p className="pf-contact-sub">{t('sub')}</p>
        <div className="pf-contact-links">
          {links.map(({ key, val, href }) => (
            <a
              key={key}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="pf-contact-link"
            >
              <span>
                <span className="cl-key">{key}</span>
                <span className="cl-val">{val}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
