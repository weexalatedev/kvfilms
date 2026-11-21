import type { Metadata } from "next";

const SITE_URL = "https://www.kvfilms.in";
const SITE_NAME = "KV Films";
const OG_IMAGE = "/site/kv/kv-logo-white.png";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path used for the canonical URL and the Open Graph url. */
  path: string;
};

/** Page metadata plus the canonical URL and social sharing tags every page needs. */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [{ url: OG_IMAGE, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
