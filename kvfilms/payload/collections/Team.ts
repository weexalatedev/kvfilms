import { CollectionConfig } from "payload/types";

export const Team: CollectionConfig = {
  slug: "team",
  auth: {
    public: true,
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
