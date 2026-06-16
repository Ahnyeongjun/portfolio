import { SectionHead } from './SectionHead';

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
        <SectionHead index="01" label="측정된 성과" title="추상적 '개선'이 아닌,&#10;수치로 증명한 변화" />
        <div className="pf-impact-grid">
          {impact.map((m, i) => (
            <div key={i} className="reveal pf-metric" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="pf-metric-idx">M.0{i + 1}</div>
              <div className="pf-metric-flow">
                <span className="pf-metric-from">{m.from}</span>
                <span className="pf-metric-arrow">→</span>
                <span className="pf-metric-to">{m.to}</span>
              </div>
              <div className="pf-metric-label">{m.label}</div>
              <div className="pf-metric-note">{m.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
