import { getBlogListItems, getCategories } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { SeriesCard } from "@/components/blog/SeriesCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Header } from "@/components/Header";
import { FileText } from "lucide-react";

export const metadata = {
  title: "블로그",
  description: "개발과 일상에 대한 이야기를 기록합니다. 딥러닝, Three.js 등 기술 블로그.",
  openGraph: {
    title: "블로그 | 안영준",
    description: "개발과 일상에 대한 이야기를 기록합니다.",
  },
};

export default function BlogPage() {
  const items = getBlogListItems();
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

          {/* Posts List */}
          {items.length > 0 ? (
            <div className="flex flex-col gap-3 max-w-4xl mx-auto">
              {items.map((item) =>
                item.type === "series" ? (
                  <SeriesCard
                    key={`series-${item.series.name}`}
                    series={item.series}
                  />
                ) : (
                  <BlogCard key={item.post.slug} {...item.post} />
                )
              )}
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
