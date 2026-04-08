import Link from 'next/link';
import { Building2, ArrowRight, Calendar } from 'lucide-react';
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
              delay={index * 0.15}
            >
              {project.roleDetails && project.roleDetails.length > 0 && (
                <div className="space-y-4 mb-5">
                  {project.roleDetails.map((section, sIdx) => (
                    <div key={sIdx}>
                      <h5 className="text-sm font-semibold text-foreground mb-2">{section.role}</h5>
                      <ul className="space-y-1 pl-1">
                        {section.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1.5 shrink-0">&#183;</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {project.achievements.length > 0 && (
                <div className="mb-5">
                  <h5 className="text-sm font-semibold text-foreground mb-2">주요 성과</h5>
                  <ul className="space-y-1 pl-1">
                    {project.achievements.map((item, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-accent mt-1.5 shrink-0">&#10003;</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </Section>
  );
}
