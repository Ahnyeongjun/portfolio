import { SectionHead } from '@/components/SectionHead';

const techStack = [
  { label: 'Backend', items: ['Spring Boot', 'Kotlin', 'Java', 'FastAPI', 'Python', 'Go'] },
  { label: 'Frontend', items: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Storybook'] },
  { label: 'Database', items: ['PostgreSQL', 'MySQL', 'Oracle', 'Redis', 'RabbitMQ'] },
  { label: 'DevOps', items: ['Kubernetes', 'Docker', 'Jenkins', 'GitHub Actions', 'Kafka', 'Nginx'] },
  { label: 'AI / ML', items: ['PyTorch', 'YOLOv5', 'ONNX Runtime', 'OpenAI API', 'MCP'] },
  { label: 'Geospatial', items: ['CesiumJS', 'GDAL', 'GeoTIFF', 'MBTiles', 'PostGIS'] },
];

const allTech = techStack.flatMap((c) => c.items);

export function TechStackSection() {
  return (
    <section id="skills" className="pf-section-pad">
      <div className="pf-wrap">
        <SectionHead index="03" label="기술 스택" title="백엔드를 중심으로, 프론트엔드와 인프라까지" />
        <div className="pf-stack-list reveal">
          {techStack.map((cat) => (
            <div key={cat.label} className="pf-stack-row">
              <div className="pf-stack-cat">{cat.label}</div>
              <div className="pf-stack-tags">
                {cat.items.map((item) => (
                  <span key={item} className="pf-tech-chip">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pf-marquee reveal">
          <span className="pf-marquee-track">
            {[...allTech, ...allTech].map((x, i) => (
              <span key={i} className="pf-tech-chip">{x}</span>
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}
