import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
}

export function BlogCard({
  slug,
  title,
  description,
  date,
  category,
  tags,
  readingTime,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <article className="glass rounded-xl overflow-hidden hover-lift h-full flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
              <Tag className="w-3 h-3" />
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {description}
          </p>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono bg-secondary text-secondary-foreground rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Link */}
          <div className="mt-4 flex items-center gap-1 text-sm text-primary">
            읽어보기
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}
