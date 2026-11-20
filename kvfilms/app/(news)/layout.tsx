import SiteShell from "@/components/site/SiteShell";

export const metadata = {
  title: "News & Updates | KV FILMS",
  description: "New projects, press, and studio updates from KV Films.",
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell
      pageId="68c399fc11041df9029d8d1b"
      theme="u-theme-light"
      pageCss="kvfilms.webflow.68c399fc11041df9029d8d1b.deb7ef1b9.opt.min.css"
    >
      {children}
    </SiteShell>
  );
}
