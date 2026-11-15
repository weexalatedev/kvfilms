import { CollectionConfig } from "payload/types";

export const Works: CollectionConfig = {
  slug: "works",
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
