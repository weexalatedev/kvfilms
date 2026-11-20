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
      label: "Synopsis",
    },
    {
      type: "row",
      fields: [
        {
          name: "client",
          type: "text",
        },
        {
          name: "director",
          type: "text",
        },
        {
          name: "year",
          type: "text",
        },
      ],
    },
    {
      name: "videoUrl",
      type: "text",
      admin: {
        description:
          "Optional. A direct .mp4 link or a Vimeo / YouTube watch URL. Shown on the project page and as the hover preview on the work page.",
      },
    },
    {
      name: "credits",
      type: "array",
      label: "Credits",
      labels: { singular: "Credit", plural: "Credits" },
      admin: {
        description: "Leave empty to show Format, Director, Client and Year instead.",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "gallery",
      type: "array",
      label: "Gallery",
      labels: { singular: "Image", plural: "Gallery images" },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
};
