"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { CATEGORIES, type WorkCategory } from "@/lib/data";
import type { Work } from "@/lib/data";

export default function WorkGallery({ works }: { works: Work[] }) {
  const [active, setActive] = useState<WorkCategory | "all">("all");

  const filtered = useMemo(
    () =>
      works
        .filter((w) => active === "all" || w.category === active)
        .sort((a, b) => a.title.localeCompare(b.title)),
    [active, works]
  );

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-12" role="tablist" aria-label="Filter work by category">
        <button
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
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
          <Link key={work.id} href={`/work#${work.id}`} id={work.id} className="block scroll-mt-24">
            <article className="group relative overflow-hidden rounded-xl bg-kv-border border border-kv-border/50 hover:border-kv-accent/50 transition-all">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width={500}
                  height={625}
                />
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
          {filtered.length} of {works.length} projects
        </p>
      </div>
    </>
  );
}
