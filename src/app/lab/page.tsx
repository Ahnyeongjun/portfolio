import { FlaskConical, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";

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
    url: "https://test-three-js-seven.vercel.app/",
    tags: ["Three.js", "WebGL"],
  },
];

export const metadata = {
  title: "Lab",
  description: "실험적인 프로젝트들과 테스트 페이지 모음",
};

export default function LabPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Lab</h1>
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
    </div>
  );
}
