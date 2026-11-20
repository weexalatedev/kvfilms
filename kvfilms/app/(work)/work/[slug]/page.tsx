import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { projectPageHtml } from "@/lib/projectPage";
import { getProject, getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Work | KV FILMS" };

  return {
    title: `${project.title} | KV FILMS`,
    description: project.description || undefined,
    openGraph: project.image.url ? { images: [project.image.url] } : undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const projects = await getProjects();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length] ?? project;

  return <div dangerouslySetInnerHTML={{ __html: projectPageHtml(project, next) }} />;
}
