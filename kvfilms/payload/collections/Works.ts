import type { CollectionConfig } from "payload";

export const Works: CollectionConfig = {
  slug: "works",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "slug"],
    group: "Content",
  },
  access: {
    read: () => true,
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
      unique: true,
      index: true,
      admin: {
        description: "Used for anchor links, e.g. always-in-pursuit",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Commercial", value: "Commercial" },
        { label: "Branded Film", value: "Branded Film" },
        { label: "Branded Content", value: "Branded Content" },
        { label: "Campaign", value: "Campaign" },
        { label: "Documentary", value: "Documentary" },
        { label: "Behind the Scenes", value: "Behind the Scenes" },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
  timestamps: true,
};
