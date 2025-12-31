import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Users, CheckCircle, Building2, ExternalLink, FileText, ImageIcon, Link2 } from "lucide-react";
import { projects, getProjectById } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16">
            <Link
              href="/#projects"
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
            {/* Project Image */}
            {project.imageUrl && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 bg-muted">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

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

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8">
              {project.longDescription || project.description}
            </p>

            {/* External Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors mb-12"
              >
                <ExternalLink className="w-4 h-4" />
                프로젝트 방문하기
              </a>
            )}

            {/* Role Details or Details */}
            {project.roleDetails && project.roleDetails.length > 0 ? (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  역할별 수행 내용
                </h2>
                <div className="space-y-6">
                  {project.roleDetails.map((roleDetail, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {roleDetail.role}
                      </h3>
                      <ul className="space-y-2 pl-4">
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
              </section>
            ) : project.details.length > 0 ? (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  주요 구현 내용
                </h2>
                <ul className="space-y-3">
                  {project.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* Achievements */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                주요 성과
              </h2>
              <ul className="space-y-3">
                {project.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Resources */}
            {project.resources && project.resources.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  관련 자료
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.resources.map((resource, index) => {
                    const IconComponent =
                      resource.type === "image" ? ImageIcon :
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
