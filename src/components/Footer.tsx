import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="pf-footer print:hidden">
      <div className="pf-footer-inner">
        <p className="pf-footer-note">이 사이트는 채용 담당자를 위해 제작되었습니다.</p>
        <span className="pf-footer-meta">© 2026 {profile.name} · {profile.role} · SEOUL, KR</span>
      </div>
    </footer>
  );
}
