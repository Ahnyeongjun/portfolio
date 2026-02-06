"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryFilterProps {
  categories: string[];
  currentCategory?: string;
}

export function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
  const pathname = usePathname();
  const isAllActive = pathname === "/blog" || !currentCategory;

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
          isAllActive
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        전체
      </Link>
      {categories.map((category) => {
        const isActive = currentCategory === category;
        return (
          <Link
            key={category}
            href={`/blog/category/${encodeURIComponent(category)}`}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}
