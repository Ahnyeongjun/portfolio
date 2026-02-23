"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/projects";
import { Server, Layout, Brain } from "lucide-react";

type CategoryFilter = "all" | "backend" | "frontend" | "ai";

const categoryOptions = [
  { value: "all", label: "전체", icon: null },
  { value: "backend", label: "백엔드", icon: Server },
  { value: "frontend", label: "프론트엔드", icon: Layout },
  { value: "ai", label: "AI", icon: Brain },
] as const;

// period에서 시작 날짜 추출
function getStartDate(period: string): number {
  const match = period.match(/^(\d{4})\.(\d{1,2})/);
  if (match) {
    return parseInt(match[1]) * 100 + parseInt(match[2]);
  }
  return 0;
}

function isOngoing(period: string): boolean {
  return period.includes("진행중");
}

const sideProjects = projects.filter(
  (p) => (p.type === "team" || p.type === "personal") && !p.hidden
);

export function SideProjectsSection() {
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("all");

  const filteredProjects = useMemo(() => {
    const filtered = sideProjects.filter((project) => {
      if (categoryFilter === "all") return true;
      return (
        project.category === categoryFilter ||
        (project.category === "fullstack" &&
          (categoryFilter === "frontend" || categoryFilter === "backend"))
      );
    });

    return filtered.sort((a, b) => {
      const aOngoing = isOngoing(a.period);
      const bOngoing = isOngoing(b.period);
      if (aOngoing !== bOngoing) return aOngoing ? -1 : 1;
      return getStartDate(b.period) - getStartDate(a.period);
    });
  }, [categoryFilter]);

  return (
    <section id="side-projects" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            사이드 <span className="text-gradient">프로젝트</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            팀/개인 사이드 프로젝트 경험입니다.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            분야:
          </span>
          {/* Mobile: Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as CategoryFilter)
            }
            className="sm:hidden px-3 py-1.5 text-sm rounded-full border border-border bg-secondary/50 text-foreground"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Desktop: Buttons */}
          <div className="hidden sm:flex gap-1">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCategoryFilter(option.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm whitespace-nowrap rounded-full border transition-all ${
                  categoryFilter === option.value
                    ? "bg-primary text-white border-primary"
                    : "bg-secondary/50 text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {option.icon && <option.icon className="w-3.5 h-3.5" />}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              선택한 필터와 일치하는 프로젝트가 없습니다.
            </p>
            <button
              onClick={() => setCategoryFilter("all")}
              className="mt-4 text-primary hover:underline"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
