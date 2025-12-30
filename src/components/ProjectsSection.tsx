"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/projects";
import { Building2, User, Server, Layout, Brain } from "lucide-react";

type TypeFilter = "all" | "company" | "personal";
type CategoryFilter = "all" | "backend" | "frontend" | "ai";

const typeOptions = [
  { value: "all", label: "전체", icon: null },
  { value: "company", label: "회사", icon: Building2 },
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

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const typeMatch = typeFilter === "all" || project.type === typeFilter;
      // fullstack은 프론트엔드, 백엔드 필터 모두에서 표시
      const categoryMatch =
        categoryFilter === "all" ||
        project.category === categoryFilter ||
        (project.category === "fullstack" && (categoryFilter === "frontend" || categoryFilter === "backend"));
      return typeMatch && categoryMatch;
    });
  }, [typeFilter, categoryFilter]);

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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">소속:</span>
            <div className="flex gap-1">
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
            <span className="text-sm text-muted-foreground">분야:</span>
            <div className="flex flex-wrap gap-1">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCategoryFilter(option.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-all ${
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

        {/* Projects Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
