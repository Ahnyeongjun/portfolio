const impact = [
  { from: '4분', to: '30초', label: '공통 모듈 배포 속도', note: 'Storybook 컴포넌트 라이브러리 구축' },
  { from: '1건', to: '70건', label: '물리 GPU 1장 동시 분석', note: 'Aliyun GPUShare 메모리 분할' },
  { from: '월 10건', to: '1건', label: '재배포 건수', note: '모놀리식 → 9개 MSA 전환' },
  { from: '1주', to: '당일', label: '고객 오류 대응', note: 'CI/CD · 플로우 문서화' },
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
