const techStack = [
  { label: 'Backend', sub: 'server-side', items: ['Spring Boot', 'Java', 'FastAPI', 'Python', 'Go'] },
  { label: 'Frontend', sub: 'client-side', items: ['Next.js', 'TypeScript', 'Storybook'] },
  { label: 'Database', sub: 'data-layer', items: ['PostgreSQL', 'Redis', 'RabbitMQ'] },
  { label: 'DevOps', sub: 'infra-ops', items: ['Kubernetes', 'Docker', 'Jenkins', 'Nginx'] },
  { label: 'AI / ML', sub: 'ai-ml', items: ['YOLO', 'ConvNeXt', 'SAM', 'DINO', 'ONNX Runtime', 'FastMCP'] },
  { label: 'Geospatial', sub: 'geo-data', items: ['CesiumJS', 'GDAL', 'GeoTIFF', 'MBTiles'] },
];

export function TechStackSection() {
  return (
    <section id="skills" className="pf-section-pad">
      <div className="pf-wrap">
        <div className="reveal" style={{ marginBottom: 34 }}>
          <span className="pf-kicker">기술 스택</span>
          <h2 className="pf-h-sec">함께 일한 기술들</h2>
        </div>
        <div className="pf-stack-wrap reveal">
          {techStack.map((cat) => (
            <div key={cat.label} className="pf-stack-card">
              <div className="pf-stack-cat">
                {cat.label}
                <span className="pf-stack-cat-sub">{cat.sub}</span>
              </div>
              <div className="pf-chips">
                {cat.items.map((it) => (
                  <span key={it} className="pf-chip">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
