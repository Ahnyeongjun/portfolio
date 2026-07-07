import Link from "next/link";
import { BookOpen, ChevronRight, ChevronDown } from "lucide-react";

interface SeriesPost {
  slug: string;
  title: string;
  seriesOrder?: number;
}

interface SeriesCardProps {
  series: {
    name: string;
    posts: SeriesPost[];
  };
}

export function SeriesCard({ series }: SeriesCardProps) {
  return (
    <details className="pf-series-card">
      <summary className="pf-series-head">
        <BookOpen size={14} />
        <span className="pf-series-name">{series.name}</span>
        <span className="pf-series-count">{series.posts.length}편</span>
        <ChevronDown size={16} className="pf-series-toggle" />
      </summary>
      <div className="pf-series-posts">
        {series.posts.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="pf-series-post">
            <span className="pf-series-num">{i + 1}</span>
            <span className="pf-series-post-title">{post.title}</span>
            <ChevronRight size={13} className="pf-series-arrow" />
          </Link>
        ))}
      </div>
    </details>
  );
}
