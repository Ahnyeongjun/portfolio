'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Users, Building2, ExternalLink, FileText, Link2 } from "lucide-react";
import { useLang } from "@/context/lang";
import { useTranslations } from "next-intl";
import { ImageSlideshow } from "@/components/ImageSlideshow";
import { KariSatelliteRetrospective } from "@/components/retrospectives/KariSatelliteRetrospective";
import { NipaSatelliteRetrospective } from "@/components/retrospectives/NipaSatelliteRetrospective";
import { MomentierRetrospective } from "@/components/retrospectives/MomentierRetrospective";
import { ChukjibeobRetrospective } from "@/components/retrospectives/ChukjibeobRetrospective";
import { WithingRetrospective } from "@/components/retrospectives/WithingRetrospective";
import { MapinRetrospective } from "@/components/retrospectives/MapinRetrospective";
import { SimvexRetrospective } from "@/components/retrospectives/SimvexRetrospective";
import { TeamMcpAgentRetrospective } from "@/components/retrospectives/TeamMcpAgentRetrospective";
import { DeadlineMateRetrospective } from "@/components/retrospectives/DeadlineMateRetrospective";
import { BooksightRetrospective } from "@/components/retrospectives/BooksightRetrospective";
import { PillCareRetrospective } from "@/components/retrospectives/PillCareRetrospective";
import { DflowRetrospective } from "@/components/retrospectives/DflowRetrospective";
import { InsopsRetrospective } from "@/components/retrospectives/InsopsRetrospective";
import { MlOrchestratorRetrospective } from "@/components/retrospectives/MlOrchestratorRetrospective";
import { RosDetectionRetrospective } from "@/components/retrospectives/RosDetectionRetrospective";
import type { Project } from "@/lib/projects";

const RETROSPECTIVE_IDS = [
  "kari-satellite", "nipa-satellite", "team-mcp-agent",
  "momentier", "chugjibup", "wedding", "mapin",
  "simvex", "deadline-mate", "booksight", "pillcare",
  "dflow-perf", "insops-satellite", "ml-experiment-orchestrator",
  "ros-detection",
];

interface Props {
  project: Project;
}

export function ProjectDetailContent({ project }: Props) {
  const { lang } = useLang();
  const t = useTranslations('project');

  const title = lang === 'en' && project.titleEn ? project.titleEn : project.title;
  const description = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
  const role = lang === 'en' && project.roleEn ? project.roleEn : project.role;
  const longDescription = lang === 'en' && project.longDescriptionEn ? project.longDescriptionEn : project.longDescription;
  const achievements = lang === 'en' && project.achievementsEn ? project.achievementsEn : project.achievements;

  const backHref = project.type === "company" ? "/#career" : "/#projects";
  const hasRetrospective = RETROSPECTIVE_IDS.includes(project.id);

  const imageResources = project.resources?.filter(r => r.type === "image") ?? [];
  const allImages = [
    ...(project.imageUrl && !/\.svg$|logo/i.test(project.imageUrl) && !imageResources.some(r => r.url === project.imageUrl)
      ? [{ url: project.imageUrl, label: title }]
      : []),
    ...imageResources.map(r => ({ url: r.url, label: r.label })),
  ];

  const typeLabel = project.type === "company"
    ? (project.company || (lang === 'en' ? "Company Project" : "회사 프로젝트"))
    : project.type === "team"
    ? (lang === 'en' ? "Team Project" : "팀 프로젝트")
    : (lang === 'en' ? "Personal Project" : "개인 프로젝트");

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
              <span>{t('backBtn')}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Project Images */}
            {allImages.length > 0 && <ImageSlideshow images={allImages} title={title} />}

            {/* Type Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full mb-4 ${
              project.type === "company"
                ? "bg-blue-500/20 text-blue-600"
                : "bg-secondary text-muted-foreground"
            }`}>
              {project.type === "company" ? (
                <><Building2 className="w-4 h-4" />{typeLabel}</>
              ) : project.type === "team" ? (
                <><Users className="w-4 h-4" />{typeLabel}</>
              ) : (
                <><User className="w-4 h-4" />{typeLabel}</>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{role}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-sm font-mono bg-primary/10 text-primary rounded-full">
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
                  {t('visitBtn')}
                </a>
                {project.type !== "company" && !project.backendActive && (
                  <p className="mt-2 text-sm text-muted-foreground">{t('mockNote')}</p>
                )}
              </div>
            )}

            {/* Role Details */}
            {project.roleDetails && project.roleDetails.length > 0 && !hasRetrospective && (
              <div className="mb-10 space-y-8">
                {project.roleDetails.map((roleDetail, index) => (
                  <div key={index}>
                    <h3 className="text-base font-semibold text-foreground mb-3">{roleDetail.role}</h3>
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
            {(!project.roleDetails || project.roleDetails.length === 0) && project.details.length > 0 && !hasRetrospective && (
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
            {!hasRetrospective && achievements.length > 0 && (
              <ul className="mb-12 space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Retrospective */}
            {project.id === "kari-satellite" && <KariSatelliteRetrospective description={longDescription} />}
            {project.id === "nipa-satellite" && <NipaSatelliteRetrospective description={longDescription} />}
            {project.id === "momentier" && <MomentierRetrospective />}
            {project.id === "chugjibup" && <ChukjibeobRetrospective />}
            {project.id === "wedding" && <WithingRetrospective />}
            {project.id === "mapin" && <MapinRetrospective />}
            {project.id === "simvex" && <SimvexRetrospective />}
            {project.id === "team-mcp-agent" && <TeamMcpAgentRetrospective description={longDescription} />}
            {project.id === "deadline-mate" && <DeadlineMateRetrospective />}
            {project.id === "booksight" && <BooksightRetrospective />}
            {project.id === "pillcare" && <PillCareRetrospective />}
            {project.id === "dflow-perf" && <DflowRetrospective />}
            {project.id === "insops-satellite" && <InsopsRetrospective />}
            {project.id === "ml-experiment-orchestrator" && <MlOrchestratorRetrospective />}
            {project.id === "ros-detection" && <RosDetectionRetrospective />}

            {/* Resources */}
            {project.resources && project.resources.some(r => r.type !== "image") && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {lang === 'en' ? 'Resources' : '관련 자료'}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.resources.filter(r => r.type !== "image").map((resource, index) => {
                    const IconComponent = resource.type === "pdf" || resource.type === "html" ? FileText : Link2;
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
