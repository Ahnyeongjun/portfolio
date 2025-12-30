"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, User, Calendar } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  status: "live" | "beta" | "development";
  type: "company" | "personal";
  category: "fullstack" | "backend" | "frontend" | "ai";
  company?: string;
  period?: string;
  role?: string;
  details?: string[];
  achievements?: string[];
}

const statusStyles = {
  live: "bg-primary/20 text-primary border-primary/30",
  beta: "bg-accent/20 text-accent border-accent/30",
  development: "bg-muted text-muted-foreground border-muted",
};

const statusLabels = {
  live: "Live",
  beta: "Beta",
  development: "개발중",
};

// 역할에서 태그 추출
function getRoleTags(role: string, category?: string): string[] {
  const tags: string[] = [];
  const lowerRole = role.toLowerCase();

  if (lowerRole.includes("pm") || lowerRole.includes("기획")) tags.push("PM");

  const hasFront = lowerRole.includes("프론트") || lowerRole.includes("frontend");
  const hasBack = lowerRole.includes("백엔드") || lowerRole.includes("backend") || lowerRole.includes("api");
  const isFullstack = lowerRole.includes("풀스택") || lowerRole.includes("fullstack") || category === "fullstack" || (hasFront && hasBack);

  if (isFullstack) {
    tags.push("풀스택");
  } else {
    if (hasFront) tags.push("프론트");
    if (hasBack) tags.push("백엔드");
  }

  if (lowerRole.includes("ai") || lowerRole.includes("머신러닝") || lowerRole.includes("객체") || lowerRole.includes("모델")) tags.push("AI");
  if (lowerRole.includes("devops") || lowerRole.includes("인프라") || lowerRole.includes("아키텍처") || lowerRole.includes("마이그레이션")) tags.push("Ops");
  if (lowerRole.includes("서버") && !tags.includes("백엔드") && !isFullstack) tags.push("서버");

  return tags.length > 0 ? tags : ["Dev"];
}

export function ProjectCard({
  id,
  title,
  description,
  tags,
  imageUrl,
  status,
  type,
  category,
  company,
  period,
  role,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="block group">
      <div className="glass rounded-xl overflow-hidden hover-lift aspect-[4/5] sm:aspect-square flex flex-col">
        {/* Image Preview */}
        <div className="relative h-2/5 sm:h-1/2 bg-secondary overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="text-4xl font-bold text-gradient">
                {title.charAt(0)}
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <div className={`px-2.5 py-1 text-xs font-medium rounded-full border flex items-center gap-1 ${
              type === "company" 
                ? "bg-blue-500/20 text-blue-600 border-blue-500/30" 
                : "bg-green-500/20 text-green-600 border-green-500/30"
            }`}>
              {type === "company" ? (
                <>
                  <Building2 className="w-3 h-3" />
                  {company || "회사"}
                </>
              ) : (
                <>
                  <User className="w-3 h-3" />
                  개인
                </>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div
            className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-full border ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            {period && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <Calendar className="w-3 h-3" />
                {period}
              </div>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>

          <div>
            {/* Role + Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {role && getRoleTags(role, category).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded"
                >
                  {tag}
                </span>
              ))}
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono bg-secondary text-secondary-foreground rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            <div className="flex items-center gap-1 text-sm text-primary">
              자세히 보기
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
