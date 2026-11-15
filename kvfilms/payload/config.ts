import { config, MongooseAdapter } from "payload/cms";
import path from "path";

export default config({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: "admin",
    upload: {
      policies: {
        image: ["image/*"],
        file: [".*"],
      },
    },
  },
  db: {
    adapter: MongooseAdapter,
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/kvfilms",
  },
  collections: [
    path.resolve(__dirname, "collections/Works.ts"),
    path.resolve(__dirname, "collections/News.ts"),
    path.resolve(__dirname, "collections/Team.ts"),
    path.resolve(__dirname, "collections/Services.ts"),
    path.resolve(__dirname, "collections/Pages.ts"),
  ],
  routes: {
    admin: "/admin",
    api: "/api",
  },
});
