import Link from "next/link";
import { Clock } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
}

export function BlogCard({ slug, title, description, date, category, tags, readingTime }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="pf-blog-card">
      <div className="pf-blog-card-top">
        <span className="pf-blog-cat">{category}</span>
        <span className="pf-blog-date">{date}</span>
      </div>
      <h3 className="pf-blog-title">{title}</h3>
      <p className="pf-blog-desc">{description}</p>
      <div className="pf-blog-foot">
        <div className="pf-blog-tags">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="pf-blog-tag">#{tag}</span>
          ))}
        </div>
        <span className="pf-blog-time">
          <Clock size={11} />
          {readingTime}
        </span>
      </div>
    </Link>
  );
}
