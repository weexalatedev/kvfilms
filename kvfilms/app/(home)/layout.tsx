import SiteShell from "@/components/site/SiteShell";

export const metadata = {
  title: "KV FILMS | Creative Production Studio",
  description:
    "KV Films is a production partner driven by pursuit. We team up with brands and agencies to craft commercials, branded films, and campaigns built on craft and culture.",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell
      pageId="68be24b22b086720602bcd26"
      theme="u-theme-invert"
      pageCss="kvfilms.webflow.68be24b22b086720602bcd26.3acc3f3a4.opt.min.css"
    >
      {children}
    </SiteShell>
  );
}
