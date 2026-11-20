import { getPayload } from "payload";

import config from "@/payload.config";
import type { Media, Work as WorkDoc } from "@/payload-types";
import { WORKS } from "./data";

export type ProjectImage = {
  url: string;
  alt: string;
};

export type ProjectCredit = {
  label: string;
  value: string;
};

export type Project = {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  description: string;
  client: string;
  director: string;
  year: string;
  videoUrl: string;
  image: ProjectImage;
  gallery: ProjectImage[];
  credits: ProjectCredit[];
};

/**
 * A single Payload client is reused for the lifetime of the server process; the
 * local API is safe to call from server components and route handlers.
 */
let payloadClient: ReturnType<typeof getPayload> | undefined;

function payload() {
  payloadClient ??= getPayload({ config });
  return payloadClient;
}

/**
 * Payload builds upload URLs from its configured serverURL (localhost in
 * development). Pages are served from different origins, so a loopback origin is
 * stripped and the file is requested from the current host instead.
 */
function publicUrl(url: string | null | undefined) {
  if (!url) return "";
  if (url.startsWith("/")) return url;

  try {
    const parsed = new URL(url);
    if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    return url;
  }

  return url;
}

function mediaUrl(value: number | Media | null | undefined, fallbackAlt = ""): ProjectImage {
  if (!value || typeof value === "number") return { url: "", alt: fallbackAlt };
  return { url: publicUrl(value.url), alt: value.alt || fallbackAlt };
}

function toProject(doc: WorkDoc): Project {
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    description: doc.description ?? "",
    client: doc.client ?? "",
    director: doc.director ?? "",
    year: doc.year ?? "",
    videoUrl: doc.videoUrl ?? "",
    image: mediaUrl(doc.image, doc.title),
    gallery: (doc.gallery ?? []).map((item) => mediaUrl(item.image, doc.title)).filter((item) => item.url),
    credits: (doc.credits ?? [])
      .filter((credit) => credit.label && credit.value)
      .map((credit) => ({ label: credit.label as string, value: credit.value as string })),
  };
}

/**
 * Projects shown on the site, in the order they were added in the admin panel.
 * Falls back to the bundled studio work when the database is not reachable
 * (for example before the first boot has seeded it).
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const client = await payload();
    const result = await client.find({
      collection: "works",
      depth: 2,
      limit: 200,
      sort: "createdAt",
    });

    const projects = (result.docs as unknown as WorkDoc[])
      .map(toProject)
      .filter((project) => project.image.url);
    if (projects.length > 0) return projects;
  } catch (error) {
    console.error("[projects] could not read the works collection", error);
  }

  return WORKS.map((work) => ({
    id: work.id,
    title: work.title,
    slug: work.id,
    category: work.category,
    description: work.description,
    client: "",
    director: "",
    year: "",
    videoUrl: "",
    image: { url: work.image, alt: work.title },
    gallery: [],
    credits: [],
  }));
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
