import { Building2 } from 'lucide-react';
import { Section, SectionHeader, Timeline, TimelineItem, Tag } from '@nuguri03/ui';
import type { Project } from '@nuguri03/ui';

interface CareerSectionProps {
  projects: Project[];
  company: string;
  period: string;
}

export function CareerSection({ projects, company, period }: CareerSectionProps) {
  return (
    <Section id="career">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="회사" titleHighlight="프로젝트" subtitle={`${company}에서 수행한 주요 프로젝트입니다.`} />

        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{company}</h3>
            <p className="text-sm text-muted-foreground">{period}</p>
          </div>
        </div>

        <Timeline>
          {projects.map((project, index) => (
            <TimelineItem
              key={project.id}
              title={project.title}
              period={project.period}
              tags={project.tags}
              href={`/projects/${project.id}`}
              linkLabel="자세히 보기"
              delay={index * 0.15}
            >
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </Section>
  );
}
