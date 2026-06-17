import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="pf-footer print:hidden">
      <div className="pf-footer-inner">
        <span className="pf-footer-meta">© 2026 {profile.name} · {profile.role} · SEOUL, KR</span>
      </div>
    </footer>
  );
}
