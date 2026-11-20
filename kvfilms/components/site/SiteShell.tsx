const SITE_ID = "68be24b22b086720602bcd38";
const ASSETS = `/site/${SITE_ID}`;

const WEBFLOW_MODERNIZR = `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`;

type SiteShellProps = {
  /** Webflow page id, used by the exported interactions runtime. */
  pageId: string;
  /** Exported body theme class (invert / light). */
  theme: "u-theme-invert" | "u-theme-light";
  /** Per-page stylesheet emitted by the Webflow export. */
  pageCss: string;
  children: React.ReactNode;
};

export default function SiteShell({ pageId, theme, pageCss, children }: SiteShellProps) {
  return (
    <html
      lang="en"
      className="w-mod-js"
      data-wf-domain="www.kvfilms.in"
      data-wf-page={pageId}
      data-wf-site={SITE_ID}
    >
      <head>
        <link rel="stylesheet" href={`${ASSETS}/css/kvfilms.webflow.shared.d6de44b56.min.css`} />
        <link rel="stylesheet" href={`${ASSETS}/css/${pageCss}`} />
        <link rel="stylesheet" href="/site/lenis@1.2.3/dist/lenis.css" />
        <link rel="shortcut icon" href="/site/kv/kv-logo.svg" />
        <link rel="apple-touch-icon" href="/site/kv/kv-logo-white.png" />
        <script dangerouslySetInnerHTML={{ __html: WEBFLOW_MODERNIZR }} />
      </head>
      <body className={theme}>{children}</body>
    </html>
  );
}
