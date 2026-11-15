"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/data";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 800);
  };

  return (
    <div className="relative overflow-hidden">
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground">Get in Touch</h1>
              <p className="text-kv-muted leading-relaxed mb-8">
                We collaborate with brands and agencies to create commercials, branded films, and campaigns
                with cinematic craft. Based in {SITE.location}.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-kv-accent mt-1">✉️</span>
                  <div>
                    <p className="font-bold text-foreground">Email</p>
                    <a href={`mailto:${SITE.email}`} className="text-kv-muted hover:text-foreground transition-colors">
                      {SITE.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-kv-accent mt-1">📍</span>
                  <div>
                    <p className="font-bold text-foreground">Location</p>
                    <p className="text-kv-muted">{SITE.location}</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex gap-4">
                {[SITE.social.instagram, SITE.social.linkedin, SITE.social.vimeo].map((url) => (
                  <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-kv-border flex items-center justify-center text-kv-muted hover:text-kv-accent hover:bg-kv-accent/10 transition-colors">
                    {new URL(url).hostname.replace("www.", "").slice(0, 3).toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="rounded-2xl border border-kv-border bg-kv-surface p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-widest text-kv-muted">Name</label>
                      <input type="text" required className="w-full px-4 py-3 rounded bg-kv-border border border-kv-border/50 text-foreground placeholder-kv-muted/50 focus:outline-none focus:ring-1 focus:ring-kv-accent transition-all" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-widest text-kv-muted">Email</label>
                      <input type="email" required className="w-full px-4 py-3 rounded bg-kv-border border border-kv-border/50 text-foreground placeholder-kv-muted/50 focus:outline-none focus:ring-1 focus:ring-kv-accent transition-all" placeholder="you@studio.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium uppercase tracking-widest text-kv-muted">Message</label>
                    <textarea required rows={4} className="w-full px-4 py-3 rounded bg-kv-border border border-kv-border/50 text-foreground placeholder-kv-muted/50 focus:outline-none focus:ring-1 focus:ring-kv-accent transition-all" placeholder="Tell us about your project…" />
                  </div>
                  <button
                    type="submit"
                    disabled={sending || sent}
                    className={`w-full px-8 py-4 rounded-full font-semibold uppercase tracking-widest transition-colors disabled:opacity-50 ${
                      sent
                        ? "bg-kv-border text-kv-muted cursor-default"
                        : "bg-kv-accent text-black hover:bg-kv-accent-hover"
                    }`}
                  >
                    {sent ? "Message Sent" : sending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
