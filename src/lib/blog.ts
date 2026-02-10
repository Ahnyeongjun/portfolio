import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
  content: string;
  series?: string;
  seriesOrder?: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
  series?: string;
  seriesOrder?: number;
}

export interface SeriesGroup {
  name: string;
  posts: BlogPostMeta[];
}

export type BlogListItem =
  | { type: "post"; post: BlogPostMeta }
  | { type: "series"; series: SeriesGroup };

function getMDXFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
}

function parsePost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || new Date().toISOString().split("T")[0],
    category: data.category || "미분류",
    tags: data.tags || [],
    readingTime: stats.text,
    content,
    series: data.series || undefined,
    seriesOrder: data.seriesOrder || undefined,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  const files = getMDXFiles();

  const posts = files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const post = parsePost(slug);
      if (!post) return null;

      const { content, ...meta } = post;
      return meta;
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return parsePost(slug);
}

export function getCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category === category);
}

export function getBlogListItemsByCategory(category: string): BlogListItem[] {
  const posts = getPostsByCategory(category);
  const seriesMap = new Map<string, BlogPostMeta[]>();
  const standalonePosts: BlogPostMeta[] = [];

  for (const post of posts) {
    if (post.series) {
      const existing = seriesMap.get(post.series) || [];
      existing.push(post);
      seriesMap.set(post.series, existing);
    } else {
      standalonePosts.push(post);
    }
  }

  for (const [, seriesPosts] of seriesMap) {
    seriesPosts.sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
  }

  const items: BlogListItem[] = [];

  const seriesEntries = Array.from(seriesMap.entries()).map(
    ([name, seriesPosts]) => ({
      type: "series" as const,
      date: seriesPosts[0].date,
      series: { name, posts: seriesPosts },
    })
  );

  const postEntries = standalonePosts.map((post) => ({
    type: "post" as const,
    date: post.date,
    post,
  }));

  const merged = [...seriesEntries, ...postEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const entry of merged) {
    if (entry.type === "series") {
      items.push({ type: "series", series: entry.series });
    } else {
      items.push({ type: "post", post: entry.post });
    }
  }

  return items;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export function getSeriesPosts(seriesName: string): BlogPostMeta[] {
  const posts = getAllPosts();
  return posts
    .filter((post) => post.series === seriesName)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

export function getBlogListItems(): BlogListItem[] {
  const posts = getAllPosts();
  const seriesMap = new Map<string, BlogPostMeta[]>();
  const standalonePosts: BlogPostMeta[] = [];

  for (const post of posts) {
    if (post.series) {
      const existing = seriesMap.get(post.series) || [];
      existing.push(post);
      seriesMap.set(post.series, existing);
    } else {
      standalonePosts.push(post);
    }
  }

  // 시리즈는 seriesOrder로 정렬
  for (const [, seriesPosts] of seriesMap) {
    seriesPosts.sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
  }

  const items: BlogListItem[] = [];

  // 시리즈의 대표 날짜(첫 번째 글 날짜)와 단독 글을 합쳐서 날짜순 정렬
  const seriesEntries = Array.from(seriesMap.entries()).map(
    ([name, seriesPosts]) => ({
      type: "series" as const,
      date: seriesPosts[0].date,
      series: { name, posts: seriesPosts },
    })
  );

  const postEntries = standalonePosts.map((post) => ({
    type: "post" as const,
    date: post.date,
    post,
  }));

  const merged = [...seriesEntries, ...postEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const entry of merged) {
    if (entry.type === "series") {
      items.push({ type: "series", series: entry.series });
    } else {
      items.push({ type: "post", post: entry.post });
    }
  }

  return items;
}
