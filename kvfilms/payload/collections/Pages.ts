import { CollectionConfig } from "payload/types";

export const Pages: CollectionConfig = {
  slug: "pages",
  auth: {
    public: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
    },
  ],
  timestamps: true,
};
