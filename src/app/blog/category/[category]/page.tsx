import { notFound } from "next/navigation";
import { getCategories, getPostsByCategory } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Header } from "@/components/Header";
import { FileText } from "lucide-react";

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} | 블로그 | 안영준`,
    description: `${decodedCategory} 카테고리의 글 목록`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categories = getCategories();

  if (!categories.includes(decodedCategory)) {
    notFound();
  }

  const posts = getPostsByCategory(decodedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {decodedCategory}
            </h1>
            <p className="text-muted-foreground">
              {decodedCategory} 카테고리의 글 {posts.length}개
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <CategoryFilter
              categories={categories}
              currentCategory={decodedCategory}
            />
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {posts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                이 카테고리에는 아직 작성된 글이 없습니다.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
