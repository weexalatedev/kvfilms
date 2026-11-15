import { CollectionConfig } from "payload/types";

export const Services: CollectionConfig = {
  slug: "services",
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
      name: "items",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
};
