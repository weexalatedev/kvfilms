import path from "path";
import type { Payload } from "payload";
import { NEWS, SERVICES, TEAM, WORKS } from "../lib/data";

const mediaIds = new Map<string, number | string>();

/**
 * Uploads an image from /public into the media collection once, reusing the
 * existing document when it is already there.
 */
async function mediaFor(payload: Payload, imagePath: string, alt: string) {
  const cached = mediaIds.get(imagePath);
  if (cached !== undefined) return cached;

  const filename = path.basename(imagePath);
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  });

  if (existing.docs.length > 0) {
    const id = existing.docs[0].id;
    mediaIds.set(imagePath, id);
    return id;
  }

  const doc = await payload.create({
    collection: "media",
    data: { alt },
    filePath: path.resolve(process.cwd(), "public", imagePath.replace(/^\//, "")),
  });
  mediaIds.set(imagePath, doc.id);
  return doc.id;
}

/**
 * Fills an empty database with the studio's current content so the frontend and
 * the admin panel start out in sync. Safe to run on every boot: each collection
 * is only seeded when it has no documents.
 */
export async function seed(payload: Payload) {
  try {
    const [works, news, team, services] = await Promise.all([
      payload.count({ collection: "works" }),
      payload.count({ collection: "news" }),
      payload.count({ collection: "team" }),
      payload.count({ collection: "services" }),
    ]);

    if (works.totalDocs === 0) {
      for (const work of WORKS) {
        const image = await mediaFor(payload, work.image, work.title);
        await payload.create({
          collection: "works",
          data: {
            title: work.title,
            slug: work.id,
            category: work.category,
            description: work.description,
            image,
          },
        });
      }
    }

    if (news.totalDocs === 0) {
      for (const article of NEWS) {
        const image = await mediaFor(payload, article.image, article.title);
        await payload.create({
          collection: "news",
          data: {
            title: article.title,
            slug: article.id,
            date: new Date(article.date).toISOString(),
            excerpt: article.excerpt,
            image,
          },
        });
      }
    }

    if (team.totalDocs === 0) {
      for (const member of TEAM) {
        const image = await mediaFor(payload, member.image, member.name);
        await payload.create({
          collection: "team",
          data: {
            name: member.name,
            role: member.role,
            bio: member.bio,
            image,
          },
        });
      }
    }

    if (services.totalDocs === 0) {
      for (const service of SERVICES) {
        await payload.create({
          collection: "services",
          data: {
            title: service.name,
            items: service.items.map((label) => ({ label })),
          },
        });
      }
    }
  } catch (error) {
    console.error("[payload] seed failed", error);
  }
}
