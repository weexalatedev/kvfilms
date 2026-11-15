import { getPayload } from "payload";
import config from "@payload-config";
import type { Media, News as NewsDoc, Service, Team as TeamDoc, Work as WorkDoc } from "@/payload-types";
import {
  NEWS as FALLBACK_NEWS,
  SERVICES as FALLBACK_SERVICES,
  TEAM as FALLBACK_TEAM,
  WORKS as FALLBACK_WORKS,
  type NewsArticle,
  type TeamMember,
  type Work,
  type WorkCategory,
} from "./data";

/**
 * Content lives in Payload. Each getter falls back to the static studio data in
 * lib/data.ts if the database is unavailable, so the site never renders empty.
 */

function mediaUrl(image: Media | number | null | undefined): string | null {
  if (!image || typeof image === "number") return null;
  const url = image.url;
  if (!url) return null;
  // Payload builds absolute URLs from `serverURL`; next/image wants a path for
  // files served by this app.
  if (!url.startsWith("http")) return url;
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

const workImageBySlug = new Map(FALLBACK_WORKS.map((work) => [work.id, work.image]));
const newsImageBySlug = new Map(FALLBACK_NEWS.map((article) => [article.id, article.image]));
const teamImageByName = new Map(FALLBACK_TEAM.map((member) => [member.name, member.image]));

export async function getWorks(): Promise<Work[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "works",
      depth: 1,
      limit: 200,
      sort: "title",
    });

    if (docs.length === 0) return FALLBACK_WORKS;

    return (docs as unknown as WorkDoc[]).map((doc) => ({
      id: doc.slug,
      title: doc.title,
      category: doc.category as WorkCategory,
      image:
        mediaUrl(doc.image) ??
        workImageBySlug.get(doc.slug) ??
        FALLBACK_WORKS[0].image,
      description: doc.description ?? "",
    }));
  } catch (error) {
    console.error("[content] could not read works from Payload", error);
    return FALLBACK_WORKS;
  }
}

export async function getNews(): Promise<NewsArticle[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "news",
      depth: 1,
      limit: 50,
      sort: "-date",
    });

    if (docs.length === 0) return FALLBACK_NEWS;

    return (docs as unknown as NewsDoc[]).map((doc) => ({
      id: doc.slug,
      title: doc.title,
      date: doc.date,
      image:
        mediaUrl(doc.image) ??
        newsImageBySlug.get(doc.slug) ??
        FALLBACK_NEWS[0].image,
      excerpt: doc.excerpt ?? "",
    }));
  } catch (error) {
    console.error("[content] could not read news from Payload", error);
    return FALLBACK_NEWS;
  }
}

export async function getTeam(): Promise<TeamMember[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "team",
      depth: 1,
      limit: 50,
    });

    if (docs.length === 0) return FALLBACK_TEAM;

    return (docs as unknown as TeamDoc[]).map((doc) => ({
      id: String(doc.id),
      name: doc.name,
      role: doc.role ?? "",
      image:
        mediaUrl(doc.image) ??
        teamImageByName.get(doc.name) ??
        FALLBACK_TEAM[0].image,
      bio: doc.bio ?? "",
    }));
  } catch (error) {
    console.error("[content] could not read team from Payload", error);
    return FALLBACK_TEAM;
  }
}

export async function getServices(): Promise<{ name: string; items: string[] }[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "services",
      depth: 0,
      limit: 50,
    });

    if (docs.length === 0) return FALLBACK_SERVICES;

    return (docs as unknown as Service[]).map((doc) => ({
      name: doc.title,
      items: (doc.items ?? []).map((item: { label: string }) => item.label),
    }));
  } catch (error) {
    console.error("[content] could not read services from Payload", error);
    return FALLBACK_SERVICES;
  }
}
