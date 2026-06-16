'use client';

import { profile } from '@/data/profile';
import { useLang } from '@/context/lang';
import { strings } from '@/data/strings';

export function ContactSection() {
  const { lang } = useLang();
  const t = strings.contact;

  const links = [
    { key: 'Email', val: profile.email, href: `mailto:${profile.email}` },
    { key: 'GitHub', val: `@${profile.github}`, href: profile.githubUrl },
    { key: 'solved.ac', val: profile.boj, href: profile.bojUrl },
    { key: 'Site', val: 'ahnyoungjun.site', href: 'https://www.ahnyoungjun.site' },
  ];

  return (
    <section id="contact" className="pf-contact">
      <div className="pf-wrap">
        <h2 className="pf-contact-title" style={{ whiteSpace: 'pre-line' }}>{t.title[lang]}</h2>
        <p className="pf-contact-sub">{t.sub[lang]}</p>
        <div className="pf-contact-links">
          {links.map(({ key, val, href }) => (
            <a key={key} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" className="pf-contact-link">
              <span className="cl-key">{key}</span>
              <span className="cl-val">{val}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
