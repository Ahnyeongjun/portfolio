import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, getSeriesPosts } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/MDXComponents";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    };
  }

  return {
    title: `${post.title} | 안영준`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const seriesPosts = post.series ? getSeriesPosts(post.series) : [];
  const currentIndex = seriesPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < seriesPosts.length - 1
      ? seriesPosts[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>블로그로 돌아가기</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Series Badge */}
            {post.series && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
                <BookOpen className="w-4 h-4" />
                {post.series}
                <span className="text-primary/60">
                  ({post.seriesOrder}/{seriesPosts.length})
                </span>
              </div>
            )}

            {/* Category Badge */}
            <Link
              href={`/blog/category/${encodeURIComponent(post.category)}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-primary/20 text-primary rounded-full hover:bg-primary/30 transition-colors mb-4 ml-2"
            >
              <Tag className="w-4 h-4" />
              {post.category}
            </Link>

            {/* Title */}
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-6">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-mono bg-secondary text-secondary-foreground rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Series TOC */}
            {seriesPosts.length > 0 && (
              <div className="glass rounded-xl p-5 mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    {post.series}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    시리즈 목차
                  </span>
                </div>
                <div className="space-y-1">
                  {seriesPosts.map((sp, index) => (
                    <Link
                      key={sp.slug}
                      href={`/blog/${sp.slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        sp.slug === post.slug
                          ? "bg-primary/15 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="truncate">{sp.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <hr className="border-border mb-8" />

            {/* MDX Content */}
            <div className="prose-custom">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>

            {/* Series Navigation */}
            {(prevPost || nextPost) && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="grid grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="group glass rounded-xl p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <ChevronLeft className="w-3 h-3" />
                        이전 글
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {prevPost.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="group glass rounded-xl p-4 hover:bg-white/5 transition-colors text-right"
                    >
                      <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1">
                        다음 글
                        <ChevronRight className="w-3 h-3" />
                      </div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {nextPost.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
