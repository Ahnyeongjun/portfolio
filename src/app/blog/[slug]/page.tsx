import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Tag, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, getSeriesPosts } from "@/lib/blog";
import { BlogShell } from "@/components/blog/BlogShell";
import { Header } from "@/components/Header";
import { Accordion } from "@/components/blog/Accordion";

const mdxComponents = { Accordion };

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "포스트를 찾을 수 없습니다" };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://www.ahnyoungjun.site/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const seriesPosts = post.series ? getSeriesPosts(post.series) : [];
  const currentIndex = seriesPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null;

  return (
    <BlogShell>
      <Header />
      <main style={{ paddingTop: 68 }}>
        <div className="pf-wrap">
          <div className="pf-blog-article">

            {/* 헤더 메타 영역 */}
            <div className="pf-blog-art-header">
              {/* 시리즈 + 카테고리 배지 행 */}
              <div className="pf-blog-art-badges">
                <Link
                  href={`/blog/category/${encodeURIComponent(post.category)}`}
                  className="pf-blog-cat-badge"
                >
                  <Tag size={11} />
                  {post.category}
                </Link>
                {post.series && (
                  <span className="pf-blog-series-badge">
                    <BookOpen size={13} />
                    {post.series} · {post.seriesOrder}/{seriesPosts.length}편
                  </span>
                )}
              </div>

              <h1 className="pf-blog-h1">{post.title}</h1>
              <p className="pf-blog-lead">{post.description}</p>

              <div className="pf-blog-meta">
                <span className="pf-blog-meta-item"><Calendar size={13} />{post.date}</span>
                <span className="pf-blog-meta-item"><Clock size={13} />{post.readingTime}</span>
              </div>

              {post.tags.length > 0 && (
                <div className="pf-blog-taglist">
                  {post.tags.map((tag) => (
                    <span key={tag} className="pf-blog-art-tag">#{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* 시리즈 목차 */}
            {seriesPosts.length > 0 && (
              <div className="pf-blog-toc">
                <div className="pf-blog-toc-head">
                  <BookOpen size={14} />
                  <span className="pf-blog-toc-title">{post.series}</span>
                  <span className="pf-blog-toc-sub">시리즈 목차</span>
                </div>
                {seriesPosts.map((sp, i) => (
                  <Link
                    key={sp.slug}
                    href={`/blog/${sp.slug}`}
                    className={`pf-blog-toc-item${sp.slug === post.slug ? " active" : ""}`}
                  >
                    <span className="pf-blog-toc-num">{i + 1}</span>
                    <span>{sp.title}</span>
                  </Link>
                ))}
              </div>
            )}

            <hr className="pf-blog-divider" />

            {/* 본문 */}
            <div className="prose-custom">
              <MDXRemote
                source={post.content}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                components={mdxComponents}
              />
            </div>

            {/* 이전/다음 글 */}
            {(prevPost || nextPost) && (
              <div className="pf-blog-nav">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="pf-blog-nav-card">
                    <div className="pf-blog-nav-label">
                      <ChevronLeft size={11} style={{ display: "inline", verticalAlign: "middle" }} /> 이전 글
                    </div>
                    <div className="pf-blog-nav-title">{prevPost.title}</div>
                  </Link>
                ) : <div />}
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="pf-blog-nav-card pf-blog-nav-right">
                    <div className="pf-blog-nav-label">
                      다음 글 <ChevronRight size={11} style={{ display: "inline", verticalAlign: "middle" }} />
                    </div>
                    <div className="pf-blog-nav-title">{nextPost.title}</div>
                  </Link>
                ) : <div />}
              </div>
            )}

          </div>
        </div>
      </main>
    </BlogShell>
  );
}
