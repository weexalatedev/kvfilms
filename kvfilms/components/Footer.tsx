import Link from "next/link";
import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-kv-border bg-kv-surface">
      <div className="px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-kv-accent font-black text-xl tracking-tighter">KV</span>
            <span className="font-semibold text-foreground text-sm tracking-widest uppercase">
              films
            </span>
          </div>
          <p className="text-kv-muted text-sm leading-relaxed max-w-md">
            {SITE.description}
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-sm text-kv-muted">
            <p className="flex items-center gap-2">
              <span>📍</span> {SITE.location}
            </p>
            <p className="flex items-center gap-2">
              <span>✉️</span>
              <a href={`mailto:${SITE.email}`} className="text-foreground hover:text-kv-accent transition-colors">
                {SITE.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-kv-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-kv-muted">© {new Date().getFullYear()} KV Films. All rights reserved.</p>
          <div className="flex gap-6">
            {[SITE.social.instagram, SITE.social.linkedin, SITE.social.vimeo].map((url) => {
              const label = new URL(url).hostname.replace("www.", "");
              return (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-kv-muted hover:text-kv-accent transition-colors">
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
