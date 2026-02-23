"use client";

import Link from "next/link";
import { Building2, ArrowRight, Calendar } from "lucide-react";
import { projects } from "@/lib/projects";

const companyProjects = projects.filter((p) => p.type === "company" && !p.hidden);

export function CareerSection() {
  return (
    <section id="career" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              회사 <span className="text-gradient">프로젝트</span>
            </h2>
            <p className="text-muted-foreground">
              한컴인스페이스에서 수행한 주요 프로젝트입니다.
            </p>
          </div>

          {/* Company Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                한컴인스페이스
              </h3>
              <p className="text-sm text-muted-foreground">
                2021.07 ~ 현재
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-10">
              {companyProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="relative pl-10 animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[9px] top-1.5 w-[13px] h-[13px] rounded-full bg-primary border-2 border-background" />

                  {/* Project Card */}
                  <div className="glass rounded-xl p-6">
                    {/* Title + Period */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <h4 className="text-lg font-semibold text-foreground">
                        {project.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {project.period}
                      </div>
                    </div>

                    {/* Role Details */}
                    {project.roleDetails && project.roleDetails.length > 0 && (
                      <div className="space-y-4 mb-5">
                        {project.roleDetails.map((section, sIdx) => (
                          <div key={sIdx}>
                            <h5 className="text-sm font-semibold text-foreground mb-2">
                              {section.role}
                            </h5>
                            <ul className="space-y-1 pl-1">
                              {section.items.map((item, iIdx) => (
                                <li
                                  key={iIdx}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="text-primary mt-1.5 shrink-0">
                                    &#183;
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Achievements */}
                    {project.achievements.length > 0 && (
                      <div className="mb-5">
                        <h5 className="text-sm font-semibold text-foreground mb-2">
                          주요 성과
                        </h5>
                        <ul className="space-y-1 pl-1">
                          {project.achievements.map((item, aIdx) => (
                            <li
                              key={aIdx}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-accent mt-1.5 shrink-0">
                                &#10003;
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-mono bg-primary/10 text-primary rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Detail Link */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      자세히 보기
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
