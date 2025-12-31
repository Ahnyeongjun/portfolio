"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/projects";
import { Building2, User, Users, Server, Layout, Brain, ArrowUpDown } from "lucide-react";

type TypeFilter = "all" | "company" | "team" | "personal";
type CategoryFilter = "all" | "backend" | "frontend" | "ai";
type SortOption = "newest" | "oldest" | "company";

const sortOptions = [
  { value: "newest", label: "최신순" },
  { value: "oldest", label: "오래된순" },
  { value: "company", label: "회사순" },
] as const;

// period에서 시작 날짜 추출 (예: "2024.10 ~ 2024.11" -> 2024.10)
function getStartDate(period: string): number {
  const match = period.match(/^(\d{4})\.(\d{1,2})/);
  if (match) {
    return parseInt(match[1]) * 100 + parseInt(match[2]);
  }
  return 0;
}

// 진행중인 프로젝트인지 확인
function isOngoing(period: string): boolean {
  return period.includes("진행중");
}

const typeOptions = [
  { value: "all", label: "전체", icon: null },
  { value: "company", label: "회사", icon: Building2 },
  { value: "team", label: "팀", icon: Users },
  { value: "personal", label: "개인", icon: User },
] as const;

const categoryOptions = [
  { value: "all", label: "전체", icon: null },
  { value: "backend", label: "백엔드", icon: Server },
  { value: "frontend", label: "프론트엔드", icon: Layout },
  { value: "ai", label: "AI", icon: Brain },
] as const;

export function ProjectsSection() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("company");

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const typeMatch = typeFilter === "all" || project.type === typeFilter;
      // fullstack은 프론트엔드, 백엔드 필터 모두에서 표시
      const categoryMatch =
        categoryFilter === "all" ||
        project.category === categoryFilter ||
        (project.category === "fullstack" && (categoryFilter === "frontend" || categoryFilter === "backend"));
      return typeMatch && categoryMatch;
    });

    // 정렬
    return filtered.sort((a, b) => {
      const aOngoing = isOngoing(a.period);
      const bOngoing = isOngoing(b.period);

      if (sortBy === "company") {
        // 회사 프로젝트 우선
        if (a.type !== b.type) {
          return a.type === "company" ? -1 : 1;
        }
        // 같은 타입 내에서 진행중 우선
        if (aOngoing !== bOngoing) {
          return aOngoing ? -1 : 1;
        }
        return getStartDate(b.period) - getStartDate(a.period);
      }

      // 최신순/오래된순에서는 진행중 우선
      if (aOngoing !== bOngoing) {
        return aOngoing ? -1 : 1;
      }
      const dateA = getStartDate(a.period);
      const dateB = getStartDate(b.period);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [typeFilter, categoryFilter, sortBy]);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            프로젝트 <span className="text-gradient">경험</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            한컴인스페이스에서 진행한 주요 프로젝트들입니다.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col items-center gap-3 mb-8">
          {/* Row 1: Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
            <div className="flex gap-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                    sortBy === option.value
                      ? "bg-primary text-white border-primary"
                      : "bg-secondary/50 text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Type + Category */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">소속:</span>
              {/* Mobile: Dropdown */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
                className="sm:hidden px-3 py-1.5 text-sm rounded-full border border-border bg-secondary/50 text-foreground"
              >
                {typeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {/* Desktop: Buttons */}
              <div className="hidden sm:flex gap-1">
                {typeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTypeFilter(option.value)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-all ${
                      typeFilter === option.value
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

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-border" />

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">분야:</span>
              {/* Mobile: Dropdown */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
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
              onClick={() => {
                setTypeFilter("all");
                setCategoryFilter("all");
                setSortBy("company");
              }}
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
