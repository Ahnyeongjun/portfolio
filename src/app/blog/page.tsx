import { getAllPosts, getCategories } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Header } from "@/components/Header";
import { FileText } from "lucide-react";

export const metadata = {
  title: "블로그 | 안영준",
  description: "개발과 일상에 대한 이야기",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">블로그</h1>
            <p className="text-muted-foreground">
              개발과 일상에 대한 이야기를 기록합니다.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <CategoryFilter categories={categories} />
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
              <p className="text-muted-foreground">아직 작성된 글이 없습니다.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
