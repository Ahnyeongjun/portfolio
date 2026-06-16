import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Users, Building2, ExternalLink, FileText, Link2 } from "lucide-react";
import { projects, getProjectById } from "@/lib/projects";
import { ImageSlideshow } from "@/components/ImageSlideshow";
import { KariSatelliteRetrospective } from "@/components/retrospectives/KariSatelliteRetrospective";
import { NipaSatelliteRetrospective } from "@/components/retrospectives/NipaSatelliteRetrospective";
import { MomentierRetrospective } from "@/components/retrospectives/MomentierRetrospective";
import { ChukjibeobRetrospective } from "@/components/retrospectives/ChukjibeobRetrospective";
import { WithingRetrospective } from "@/components/retrospectives/WithingRetrospective";
import { MapinRetrospective } from "@/components/retrospectives/MapinRetrospective";
import { SimvexRetrospective } from "@/components/retrospectives/SimvexRetrospective";
import { TeamMcpAgentRetrospective } from "@/components/retrospectives/TeamMcpAgentRetrospective";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "프로젝트를 찾을 수 없습니다" };
  }

  return {
    title: project.title,
    description: project.longDescription || project.description,
    openGraph: {
      title: `${project.title} | 안영준`,
      description: project.longDescription || project.description,
      ...(project.imageUrl && {
        images: [{ url: project.imageUrl, width: 1200, height: 630 }],
      }),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const backHref = project.type === "company" ? "/#career" : "/#projects";
  const hasRetrospective = ["kari-satellite", "nipa-satellite", "team-mcp-agent", "momentier", "chugjibup", "wedding", "mapin", "simvex"].includes(project.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>돌아가기</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Project Images */}
            {(() => {
              const imageResources = project.resources?.filter(r => r.type === "image") ?? [];
              const allImages = [
                ...(project.imageUrl && !project.imageUrl.endsWith(".svg") && !imageResources.some(r => r.url === project.imageUrl)
                  ? [{ url: project.imageUrl, label: project.title }]
                  : []),
                ...imageResources.map(r => ({ url: r.url, label: r.label })),
              ];
              return allImages.length > 0 ? <ImageSlideshow images={allImages} title={project.title} /> : null;
            })()}

            {/* Type Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full mb-4 ${
              project.type === "company"
                ? "bg-blue-500/20 text-blue-600"
                : "bg-secondary text-muted-foreground"
            }`}>
              {project.type === "company" ? (
                <>
                  <Building2 className="w-4 h-4" />
                  {project.company || "회사 프로젝트"}
                </>
              ) : project.type === "team" ? (
                <>
                  <Users className="w-4 h-4" />
                  팀 프로젝트
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  개인 프로젝트
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {project.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{project.role}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-mono bg-primary/10 text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* External Link */}
            {project.link && (
              <div className="mb-12">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  프로젝트 방문하기
                </a>
                {project.type !== "company" && !project.backendActive && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    * 현재 백엔드 서버가 중단되어 MSW(Mock)로 동작 중입니다.
                  </p>
                )}
              </div>
            )}

            {/* Role Details */}
            {project.roleDetails && project.roleDetails.length > 0 &&
            !hasRetrospective && (
              <div className="mb-10 space-y-8">
                {project.roleDetails.map((roleDetail, index) => (
                  <div key={index}>
                    <h3 className="text-base font-semibold text-foreground mb-3">
                      {roleDetail.role}
                    </h3>
                    <ul className="space-y-2">
                      {roleDetail.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Details fallback */}
            {(!project.roleDetails || project.roleDetails.length === 0) && project.details.length > 0 &&
            !hasRetrospective && (
              <ul className="mb-10 space-y-2">
                {project.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Achievements */}
            {!hasRetrospective &&
            project.achievements.length > 0 && (
              <ul className="mb-12 space-y-3">
                {project.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Retrospective */}
            {project.id === "kari-satellite" && <KariSatelliteRetrospective description={project.longDescription} />}
            {project.id === "nipa-satellite" && <NipaSatelliteRetrospective description={project.longDescription} />}
            {project.id === "momentier" && <MomentierRetrospective />}
            {project.id === "chugjibup" && <ChukjibeobRetrospective />}
            {project.id === "wedding" && <WithingRetrospective />}
            {project.id === "mapin" && <MapinRetrospective />}
            {project.id === "simvex" && <SimvexRetrospective />}
            {project.id === "team-mcp-agent" && <TeamMcpAgentRetrospective description={project.longDescription} />}

            {/* Resources */}
            {project.resources && project.resources.some(r => r.type !== "image") && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  관련 자료
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.resources.filter(r => r.type !== "image").map((resource, index) => {
                    const IconComponent =
                      resource.type === "pdf" || resource.type === "html" ? FileText :
                      Link2;

                    return (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors"
                      >
                        <IconComponent className="w-4 h-4" />
                        {resource.label}
                      </a>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
