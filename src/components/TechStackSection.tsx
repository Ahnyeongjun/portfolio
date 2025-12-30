import { Code2, Server, Database, Cloud } from "lucide-react";

const techCategories = [
  {
    icon: Server,
    title: "Backend",
    skills: ["Spring Boot", "Java", "FastAPI", "Go", "Python"],
  },
  {
    icon: Code2,
    title: "Frontend",
    skills: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
  },
  {
    icon: Database,
    title: "Database",
    skills: ["PostgreSQL", "Redis", "RabbitMQ", "Debezium CDC"],
  },
  {
    icon: Cloud,
    title: "DevOps",
    skills: ["Kubernetes", "Docker", "Jenkins", "GitHub Actions"],
  },
];

export function TechStackSection() {
  return (
    <section id="tech" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            기술 <span className="text-gradient">스택</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            위성영상 파이프라인, K8s 인프라, 프론트엔드 아키텍처 전 영역 경험
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((category, index) => (
            <div
              key={category.title}
              className="glass rounded-xl p-6 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
