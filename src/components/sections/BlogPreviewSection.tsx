import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog';

interface Props {
  posts: BlogPostMeta[];
}

const categoryColor: Record<string, string> = {
  'Python/MCP': 'var(--pf-mint)',
  'Kotlin/Spring': 'var(--pf-ac)',
  '딥러닝': '#a78bfa',
  'Three.js': '#f59e0b',
  'FastAPI': '#34d399',
};

export function BlogPreviewSection({ posts }: Props) {
  return (
    <section id="blog" className="pf-section-pad" style={{ borderTop: '1px solid var(--pf-bdr)' }}>
      <div className="pf-wrap">
        <div className="reveal" style={{ marginBottom: 34, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="pf-kicker">기술 블로그</span>
            <h2 className="pf-h-sec">직접 부딪히며 정리한 기록들</h2>
          </div>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--pf-ac)',
              paddingBottom: 4,
            }}
          >
            전체 글 보기
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="reveal"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                padding: '22px 24px',
                background: 'var(--pf-surface)',
                border: '1px solid var(--pf-bdr)',
                borderRadius: 'var(--pf-radius)',
                boxShadow: 'var(--pf-shadow-card)',
                transition: 'transform 0.18s, box-shadow 0.18s',
                transitionDelay: `${i * 60}ms`,
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: `color-mix(in srgb, ${categoryColor[post.category] ?? 'var(--pf-ac)'} 12%, transparent)`,
                  color: categoryColor[post.category] ?? 'var(--pf-ac)',
                  fontFamily: 'var(--font-family-mono)',
                }}>
                  {post.category}
                </span>
                <span style={{ fontSize: 12, color: 'var(--pf-text-mute)' }}>{post.readingTime}</span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--pf-text)', lineHeight: 1.45, marginBottom: 6 }}>
                  {post.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--pf-text-dim)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.description}
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--pf-text-mute)', marginTop: 'auto' }}>
                {post.date}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
