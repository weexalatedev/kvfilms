/**
 * Types for the KV Films Payload collections.
 * These mirror what `npx payload generate:types` emits; run that command to refresh them.
 */

export type WorkCategory =
  | "Commercial"
  | "Branded Film"
  | "Branded Content"
  | "Campaign"
  | "Documentary"
  | "Behind the Scenes";

export interface Media {
  id: number | string;
  alt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  updatedAt: string;
  createdAt: string;
}

export interface Work {
  id: number | string;
  title: string;
  slug: string;
  category: WorkCategory;
  image: number | Media;
  description?: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface News {
  id: number | string;
  title: string;
  slug: string;
  date: string;
  image?: number | Media | null;
  excerpt?: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface Team {
  id: number | string;
  name: string;
  role?: string | null;
  image?: number | Media | null;
  bio?: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface Service {
  id: number | string;
  title: string;
  items?: { label: string; id?: string | null }[] | null;
  updatedAt: string;
  createdAt: string;
}

export interface Page {
  id: number | string;
  title: string;
  slug: string;
  content?: unknown;
  updatedAt: string;
  createdAt: string;
}

export interface User {
  id: number | string;
  email: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
