import { CollectionConfig } from "payload/types";

export const News: CollectionConfig = {
  slug: "news",
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
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "excerpt",
      type: "textarea",
    },
  ],
  timestamps: true,
};
