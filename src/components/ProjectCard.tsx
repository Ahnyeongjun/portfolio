"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  status: "live" | "beta" | "development";
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

export function ProjectCard({
  id,
  title,
  description,
  tags,
  imageUrl,
  status,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="block group">
      <div className="glass rounded-xl overflow-hidden hover-lift h-full">
        {/* Image Preview */}
        <div className="relative h-40 bg-secondary overflow-hidden">
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

          {/* Status Badge */}
          <div
            className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-full border ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded"
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
    </Link>
  );
}
