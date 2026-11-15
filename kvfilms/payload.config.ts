import path from "path";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Works } from "./payload/collections/Works";
import { News } from "./payload/collections/News";
import { Team } from "./payload/collections/Team";
import { Services } from "./payload/collections/Services";
import { Pages } from "./payload/collections/Pages";
import { Media } from "./payload/collections/Media";
import { Users } from "./payload/collections/Users";
import { seed } from "./payload/seed";

/**
 * MongoDB when MONGODB_URI is set (production), otherwise a local SQLite file so
 * the project runs with no external services.
 */
const database = process.env.MONGODB_URI
  ? mongooseAdapter({
      url: process.env.MONGODB_URI,
    })
  : sqliteAdapter({
      client: {
        url: process.env.DATABASE_URI || "file:./kvfilms.db",
      },
      push: true,
    });

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  secret: process.env.PAYLOAD_SECRET || "kv-films-local-development-secret",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — KV Films",
    },
  },
  db: database,
  editor: lexicalEditor(),
  collections: [Users, Media, Works, News, Team, Services, Pages],
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"],
  onInit: async (payload) => {
    await seed(payload);
  },
});
