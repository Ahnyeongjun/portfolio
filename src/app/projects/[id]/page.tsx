import { notFound } from "next/navigation";
import { projects, getProjectById } from "@/lib/projects";
import { ProjectDetailContent } from "@/components/ProjectDetailContent";

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

  return <ProjectDetailContent project={project} />;
}
