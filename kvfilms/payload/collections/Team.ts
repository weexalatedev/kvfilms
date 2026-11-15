import type { CollectionConfig } from "payload";

export const Team: CollectionConfig = {
  slug: "team",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "bio",
      type: "textarea",
    },
  ],
  timestamps: true,
};
