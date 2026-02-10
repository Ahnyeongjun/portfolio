import Link from "next/link";
import { BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
import type { SeriesGroup } from "@/lib/blog";

interface SeriesCardProps {
  series: SeriesGroup;
}

export function SeriesCard({ series }: SeriesCardProps) {
  const { name, posts } = series;
  const firstPost = posts[0];
  const totalReadingTime = posts.reduce((acc, post) => {
    const minutes = parseInt(post.readingTime) || 0;
    return acc + minutes;
  }, 0);

  return (
    <article className="glass rounded-xl overflow-hidden hover-lift col-span-1 md:col-span-2 lg:col-span-3">
      <div className="p-6">
        {/* Series Header */}
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            시리즈
          </span>
          <span className="text-xs text-muted-foreground">
            · {posts.length}편
          </span>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>

        {/* Series Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          {firstPost.category && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
              {firstPost.category}
            </span>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {firstPost.date}
          </div>
          {totalReadingTime > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              총 {totalReadingTime}분
            </div>
          )}
        </div>

        {/* Post List */}
        <div className="space-y-1">
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
                <p className="text-xs text-muted-foreground truncate">
                  {post.description}
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

        {/* Tags */}
        {firstPost.tags.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-1.5">
            {firstPost.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-mono bg-secondary text-secondary-foreground rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
