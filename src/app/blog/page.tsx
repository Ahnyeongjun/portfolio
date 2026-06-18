import { getBlogListItems, getCategories } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { SeriesCard } from "@/components/blog/SeriesCard";
import { BlogShell } from "@/components/blog/BlogShell";
import { Header } from "@/components/Header";
import { FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "블로그",
  description: "개발과 일상에 대한 이야기를 기록합니다. 딥러닝, 백엔드 등 기술 블로그.",
  openGraph: {
    title: "블로그 | 안영준",
    description: "개발과 일상에 대한 이야기를 기록합니다.",
  },
};

export default function BlogPage() {
  const items = getBlogListItems();
  const categories = getCategories();

  return (
    <BlogShell>
      <Header />
      <main style={{ paddingTop: 68 }}>
        <div className="pf-wrap" style={{ paddingTop: 56, paddingBottom: 96 }}>

          <div style={{ marginBottom: 36 }}>
            <span className="pf-kicker">블로그</span>
            <h1 className="pf-h-sec">기록하는 개발자</h1>
            <p className="pf-p-sec">딥러닝, 백엔드, 개발 경험을 기록합니다.</p>
          </div>

          <div className="pf-blog-cats">
            <Link href="/blog" className="pf-blog-cat-pill active">전체</Link>
            {categories.map((cat) => (
              <Link key={cat} href={`/blog/category/${encodeURIComponent(cat)}`} className="pf-blog-cat-pill">
                {cat}
              </Link>
            ))}
          </div>

          {items.length > 0 ? (
            <div className="pf-blog-list">
              {items.map((item) =>
                item.type === "series" ? (
                  <SeriesCard key={`series-${item.series.name}`} series={item.series} />
                ) : (
                  <BlogCard key={item.post.slug} {...item.post} />
                )
              )}
            </div>
          ) : (
            <div className="pf-blog-empty">
              <FileText size={36} />
              <p>아직 작성된 글이 없습니다.</p>
            </div>
          )}

        </div>
      </main>
    </BlogShell>
  );
}
