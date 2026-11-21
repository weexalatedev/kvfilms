import SiteShell from "@/components/site/SiteShell";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata = pageMetadata({
  title: "Contact KV FILMS | In Pursuit Together",
  description:
    "Got something on the starting line? Let's move it to the finish. Contact KV Films in Vapi, Gujarat.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell
      pageId="68c399c5544b6c0ad985b6f2"
      theme="u-theme-light"
      pageCss="kvfilms.webflow.68c399c5544b6c0ad985b6f2.c5aa409e8.opt.min.css"
    >
      {children}
    </SiteShell>
  );
}
