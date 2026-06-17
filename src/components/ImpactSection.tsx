const impact = [
  { from: '38초', to: '159ms', label: 'API 응답속도', note: 'PostGIS 조건부 실행 + 페이징 + Redis 캐싱 — 239배' },
  { from: '200건', to: '3,000건', label: '일 AI 추론 처리량', note: 'Aliyun GPUShare — GPU당 10파드 병렬 분할' },
  { from: '4분', to: '30초', label: '서비스 배포 속도', note: '모놀리식 → 9개 MSA 분리' },
  { from: '1시간', to: '자동화', label: '주간보고 작성 자동화', note: 'Git·캘린더 병합 MCP 에이전트 — 팀 10명 실사용' },
];

export function ImpactSection() {
  return (
    <section id="impact" className="pf-section-pad">
      <div className="pf-wrap">
        <div className="reveal" style={{ marginBottom: 34 }}>
          <span className="pf-kicker">측정된 성과</span>
          <h2 className="pf-h-sec">{'추상적 \'개선\'이 아닌,\n수치로 증명한 변화'}</h2>
        </div>
        <div className="pf-impact-rail">
          {impact.map((m, i) => (
            <div key={i} className="reveal pf-impact-card" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="pf-ic-from">{m.from}</div>
              <div className="pf-ic-to">{m.to}</div>
              <div className="pf-ic-label">{m.label}</div>
              <div className="pf-ic-note">{m.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
