"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { WORKS, CATEGORIES, type WorkCategory } from "@/lib/data";

export default function Work() {
  const [active, setActive] = useState<WorkCategory | "all">("all");

  const filtered = useMemo(
    () =>
      WORKS.filter((w) => active === "all" || w.category === active).sort(
        (a, b) => a.title.localeCompare(b.title)
      ),
    [active]
  );

  return (
    <div className="relative overflow-hidden">
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-foreground">
                The Work
              </h1>
              <p className="text-kv-muted">Commercials, branded films, and campaigns built on craft.</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-kv-accent font-bold text-sm uppercase tracking-widest hover:underline"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12" role="tablist" aria-label="Filter work by category">
            <button
              onClick={() => setActive("all")}
              className={`rounded-full px-5 py-2 text-sm font-medium uppercase tracking-widest transition-colors ${
                active === "all"
                  ? "bg-kv-accent text-black"
                  : "border border-kv-border text-foreground hover:bg-kv-border/50"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                role="tab"
                aria-pressed={active === cat}
                className={`rounded-full px-5 py-2 text-sm font-medium uppercase tracking-widest transition-colors ${
                  active === cat
                    ? "bg-kv-accent text-black"
                    : "border border-kv-border text-foreground hover:bg-kv-border/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Work grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((work) => (
              <Link
                key={work.id}
                href={`/work#${work.id}`}
                className="block"
              >
                <article className="group relative overflow-hidden rounded-xl bg-kv-border border border-kv-border/50 hover:border-kv-accent/50 transition-all">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={work.image} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={500} height={625} />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-end p-4">
                      <span className="text-kv-accent font-bold text-sm uppercase tracking-widest">
                        {work.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-foreground group-hover:text-kv-accent transition-colors mb-1">
                      {work.title}
                    </h3>
                    <p className="text-kv-muted text-sm">{work.description}</p>
                  </div>
                </article>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center text-kv-muted">
                No projects found in this category.
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <p className="text-kv-muted text-sm">
              {filtered.length} of {WORKS.length} projects
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
