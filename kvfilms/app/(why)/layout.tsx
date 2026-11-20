import SiteShell from "@/components/site/SiteShell";

export const metadata = {
  title: "Who We Are | KV FILMS",
  description:
    "KV Films brings together talent, ideas, and opportunity through a culture of respect, curiosity, and collaboration.",
};

export default function WhyLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell
      pageId="68c39a290fb4723cc050eff2"
      theme="u-theme-invert"
      pageCss="kvfilms.webflow.68c39a290fb4723cc050eff2.0cec36d01.opt.min.css"
    >
      {children}
    </SiteShell>
  );
}
