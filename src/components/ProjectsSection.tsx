import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            프로젝트 <span className="text-gradient">경험</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            한컴인스페이스에서 진행한 주요 프로젝트들입니다.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
