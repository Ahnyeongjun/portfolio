'use client';

import { useState, useMemo } from 'react';
import { Server, Layout, Brain } from 'lucide-react';
import { Section, SectionHeader, ProjectCard } from '@nuguri03/ui';
import type { Project } from '@nuguri03/ui';

type CategoryFilter = 'all' | 'backend' | 'frontend' | 'ai';

const categoryOptions = [
  { value: 'all' as const, label: '전체', icon: null },
  { value: 'backend' as const, label: '백엔드', icon: Server },
  { value: 'frontend' as const, label: '프론트엔드', icon: Layout },
  { value: 'ai' as const, label: 'AI', icon: Brain },
];

function getStartDate(period: string): number {
  const match = period.match(/^(\d{4})\.(\d{1,2})/);
  return match ? parseInt(match[1]) * 100 + parseInt(match[2]) : 0;
}

interface SideProjectsSectionProps {
  projects: Project[];
}

export function SideProjectsSection({ projects }: SideProjectsSectionProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((p) => {
      if (categoryFilter === 'all') return true;
      return p.category.includes(categoryFilter) || (p.category.includes('fullstack') && (categoryFilter === 'frontend' || categoryFilter === 'backend'));
    });
    return filtered.sort((a, b) => {
      const aOngoing = a.period.includes('진행중');
      const bOngoing = b.period.includes('진행중');
      if (aOngoing !== bOngoing) return aOngoing ? -1 : 1;
      return getStartDate(b.period) - getStartDate(a.period);
    });
  }, [categoryFilter, projects]);

  return (
    <Section id="side-projects">
      <SectionHeader title="사이드" titleHighlight="프로젝트" subtitle="팀/개인 사이드 프로젝트 경험입니다." />

      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-sm text-muted-foreground whitespace-nowrap">분야:</span>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
          className="sm:hidden px-3 py-1.5 text-sm rounded-full border border-border bg-secondary/50 text-foreground"
        >
          {categoryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div className="hidden sm:flex gap-1">
          {categoryOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setCategoryFilter(option.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm whitespace-nowrap rounded-full border transition-all ${
                categoryFilter === option.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-secondary/50 text-muted-foreground border-border hover:border-primary hover:text-primary'
              }`}
            >
              {option.icon && <option.icon className="w-3.5 h-3.5" />}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project, index) => (
          <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <ProjectCard {...project} href={`/projects/${project.id}`} />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">선택한 필터와 일치하는 프로젝트가 없습니다.</p>
          <button onClick={() => setCategoryFilter('all')} className="mt-4 text-primary hover:underline">필터 초기화</button>
        </div>
      )}
    </Section>
  );
}
