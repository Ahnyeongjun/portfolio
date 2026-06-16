import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="pf-footer print:hidden">
      <div className="pf-wrap">
        <div className="pf-footer-inner">
          <p className="pf-footer-note">이 사이트는 채용 담당자를 위해 제작되었습니다.</p>
          <span className="pf-footer-meta">{profile.name} · {profile.company} · SEOUL, KR</span>
        </div>
      </div>
    </footer>
  );
}
