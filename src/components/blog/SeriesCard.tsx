"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import type { SeriesGroup } from "@/lib/blog";

interface SeriesCardProps {
  series: SeriesGroup;
  defaultOpen?: boolean;
}

export function SeriesCard({ series, defaultOpen = false }: SeriesCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { name, posts } = series;
  const firstPost = posts[0];
  const totalReadingTime = posts.reduce((acc, post) => {
    const minutes = parseInt(post.readingTime) || 0;
    return acc + minutes;
  }, 0);

  return (
    <article className="glass rounded-xl overflow-hidden">
      {/* Collapsible Header - matches BlogCard height */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 hover:bg-white/5 transition-colors text-left"
      >
        {/* Row 1: badge + title + date */}
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full flex-shrink-0">
            <BookOpen className="w-3 h-3" />
            시리즈
          </span>
          <h3 className="text-base font-semibold text-foreground truncate flex-1 min-w-0">
            {name}
          </h3>
          <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
            {firstPost.date}
          </span>
        </div>

        {/* Row 2: description */}
        <p className="text-sm text-muted-foreground mb-3">
          {firstPost.category} 카테고리 · {posts.length}편의 시리즈
        </p>

        {/* Row 3: tags + meta + chevron */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {firstPost.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-mono bg-secondary text-secondary-foreground rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
            <span className="sm:hidden">{firstPost.date}</span>
            {totalReadingTime > 0 && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                총 {totalReadingTime}분
              </div>
            )}
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                isOpen ? "" : "-rotate-90"
              }`}
            />
          </div>
        </div>
      </button>

      {/* Collapsible Post List */}
      {isOpen && (
        <div className="border-t border-border/50 px-6 py-2">
          <div className="space-y-0.5">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group/item flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors truncate">
                    {post.title}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {post.readingTime}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/item:text-primary group-hover/item:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
