import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText } from "lucide-react";
import { getCategories, getPostsByCategory, getBlogListItemsByCategory } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { SeriesCard } from "@/components/blog/SeriesCard";
import { BlogShell } from "@/components/blog/BlogShell";
import { Header } from "@/components/Header";

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  return {
    title: `${decodedCategory} - 블로그`,
    description: `${decodedCategory} 카테고리의 블로그 글 목록입니다.`,
    alternates: {
      canonical: `https://www.ahnyoungjun.site/blog/category/${encodeURIComponent(decodedCategory)}`,
    },
    openGraph: {
      title: `${decodedCategory} | 블로그 | 안영준`,
      description: `${decodedCategory} 카테고리의 블로그 글 목록입니다.`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categories = getCategories();

  if (!categories.includes(decodedCategory)) notFound();

  const posts = getPostsByCategory(decodedCategory);
  const items = getBlogListItemsByCategory(decodedCategory);
  const seriesItems = items.filter((i): i is Extract<typeof i, { type: "series" }> => i.type === "series");
  const postItems = items.filter((i): i is Extract<typeof i, { type: "post" }> => i.type === "post");

  return (
    <BlogShell>
      <Header />
      <main style={{ paddingTop: 68 }}>
        <div className="pf-wrap" style={{ paddingTop: 56, paddingBottom: 96 }}>

          <div style={{ marginBottom: 36 }}>
            <span className="pf-kicker">블로그</span>
            <h1 className="pf-h-sec">{decodedCategory}</h1>
            <p className="pf-p-sec">{decodedCategory} 카테고리 글 {posts.length}개</p>
          </div>

          <div className="pf-blog-cats">
            <Link href="/blog" className="pf-blog-cat-pill">전체</Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${encodeURIComponent(cat)}`}
                className={`pf-blog-cat-pill${cat === decodedCategory ? " active" : ""}`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {items.length > 0 ? (
            <div className="pf-blog-list">
              {seriesItems.length > 0 && (
                <>
                  <h2 className="pf-blog-section-title">
                    시리즈<span className="pf-blog-section-count">{seriesItems.length}</span>
                  </h2>
                  {seriesItems.map((item) => (
                    <SeriesCard key={`series-${item.series.name}`} series={item.series} />
                  ))}
                </>
              )}
              {postItems.length > 0 && (
                <>
                  <h2 className="pf-blog-section-title">
                    낱개 글<span className="pf-blog-section-count">{postItems.length}</span>
                  </h2>
                  {postItems.map((item) => (
                    <BlogCard key={item.post.slug} {...item.post} />
                  ))}
                </>
              )}
            </div>
          ) : (
            <div className="pf-blog-empty">
              <FileText size={36} />
              <p>이 카테고리에는 아직 작성된 글이 없습니다.</p>
            </div>
          )}

        </div>
      </main>
    </BlogShell>
  );
}
