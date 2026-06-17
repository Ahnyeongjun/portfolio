export const strings = {
  nav: {
    about:      { ko: '소개',       en: 'About' },
    skills:     { ko: '기술 스택',   en: 'Tech Stack' },
    career:     { ko: '경력',       en: 'Career' },
    projects:   { ko: '프로젝트',   en: 'Projects' },
    background: { ko: '학력 · 활동', en: 'Background' },
    blog:       { ko: '블로그',     en: 'Blog' },
    contact:    { ko: '연락하기',   en: 'Contact' },
  },
  hero: {
    status:   { ko: '채용 가능', en: 'Open to work' },
    role:     { ko: '백엔드 엔지니어', en: 'Backend Engineer' },
    headline: { ko: '운영 중인 서비스의\n구조적 한계를\n직접 개선합니다', en: 'I identify and fix\narchitectural limits\nin production systems' },
    sub:      { ko: '5년간 위성 영상 AI 플랫폼을 MSA로 전환하며\n수치로 증명한 백엔드 엔지니어', en: '5 years building satellite imagery AI platforms,\nproven by metrics, not words' },
    cta1:     { ko: '프로젝트 보기', en: 'View Projects' },
    cta2:     { ko: '연락하기', en: 'Contact' },
    stat1:    { ko: 'MSA', en: 'MSA' },
    stat2:    { ko: '년차', en: 'yrs' },
  },
  sections: {
    impact:      { ko: '성과 지표',           en: 'Impact' },
    about:       { ko: '소개',               en: 'About' },
    skills:      { ko: '기술 스택',           en: 'Tech Stack' },
    career:      { ko: '경력',               en: 'Career' },
    sideProjects:{ ko: '사이드 프로젝트',     en: 'Side Projects' },
    background:  { ko: '학력 · 활동',         en: 'Background' },
    contact:     { ko: '연락',               en: 'Contact' },
  },
  about: {
    title:  { ko: '백엔드 엔지니어 안영준',    en: 'Backend Engineer Ahn Youngjun' },
    now:    { ko: '지금',                    en: 'Now' },
    role:   { ko: '포지션',                  en: 'Role' },
    base:   { ko: '위치',                    en: 'Base' },
  },
  career: {
    detailBtn: { ko: '자세히 보기', en: 'View Details' },
  },
  contact: {
    title:  { ko: '함께 만들 기회를\n기다리고 있습니다', en: "I'm open to\nnew opportunities" },
    sub:    { ko: '프로젝트 제안, 채용 문의 모두 환영합니다.', en: 'Project proposals and job inquiries are welcome.' },
  },
} as const;

export type Strings = typeof strings;
