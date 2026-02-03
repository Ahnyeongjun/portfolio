import Link from "next/link";
import { ArrowLeft, FlaskConical, ExternalLink } from "lucide-react";

interface LabProject {
  title: string;
  description: string;
  url: string;
  tags: string[];
}

const labProjects: LabProject[] = [
  {
    title: "Three.js 실험",
    description: "3D 그래픽 테스트",
    url: "https://test-three-js-f68t.vercel.app/",
    tags: ["Three.js", "WebGL"],
  },
];

export default function LabPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Lab</h1>
          </div>
          <p className="text-muted-foreground">
            실험적인 프로젝트들과 테스트 페이지 모음
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-4">
          {labProjects.map((project) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block glass rounded-lg p-5 hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {project.title}
                    <ExternalLink className="w-4 h-4 opacity-50" />
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.description}
                  </p>
                  <div className="flex gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs font-mono bg-secondary text-secondary-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
