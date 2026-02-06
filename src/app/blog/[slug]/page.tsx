import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
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
            {/* Category Badge */}
            <Link
              href={`/blog/category/${encodeURIComponent(post.category)}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-primary/20 text-primary rounded-full hover:bg-primary/30 transition-colors mb-4"
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

            {/* Divider */}
            <hr className="border-border mb-8" />

            {/* MDX Content */}
            <div className="prose-custom">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
