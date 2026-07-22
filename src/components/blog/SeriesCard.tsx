import Link from "next/link";
import { BookOpen, ChevronRight, ChevronDown } from "lucide-react";

interface SeriesPost {
  slug: string;
  title: string;
  date: string;
  seriesOrder?: number;
}

interface SeriesCardProps {
  series: {
    name: string;
    posts: SeriesPost[];
  };
}

function formatShortDate(date: string) {
  const [, month, day] = date.split("-");
  return `${month}.${day}`;
}

export function SeriesCard({ series }: SeriesCardProps) {
  const firstDate = series.posts[0]?.date;
  const lastDate = series.posts[series.posts.length - 1]?.date;
  const dateRange =
    firstDate && lastDate
      ? firstDate === lastDate
        ? formatShortDate(firstDate)
        : `${formatShortDate(firstDate)} - ${formatShortDate(lastDate)}`
      : null;

  return (
    <details className="pf-series-card">
      <summary className="pf-series-head">
        <BookOpen size={14} />
        <span className="pf-series-name">{series.name}</span>
        {dateRange && <span className="pf-series-date">{dateRange}</span>}
        <span className="pf-series-count">{series.posts.length}편</span>
        <ChevronDown size={16} className="pf-series-toggle" />
      </summary>
      <div className="pf-series-posts">
        {series.posts.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="pf-series-post">
            <span className="pf-series-num">{i + 1}</span>
            <span className="pf-series-post-title">{post.title}</span>
            <span className="pf-series-post-date">{formatShortDate(post.date)}</span>
            <ChevronRight size={13} className="pf-series-arrow" />
          </Link>
        ))}
      </div>
    </details>
  );
}
