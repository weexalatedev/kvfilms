import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata = pageMetadata({
  title: "Work | KV FILMS",
  description:
    "Commercials, branded films, branded content and campaigns produced by KV Films in Vapi, Gujarat.",
  path: "/work",
});

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell
      pageId="68c39a0bc62d5473ee2d4b58"
      theme="u-theme-invert"
      pageCss="kvfilms.webflow.68c39a0bc62d5473ee2d4b58.b18b9b116.opt.min.css"
    >
      {children}
    </SiteShell>
  );
}
