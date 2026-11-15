import Image from "next/image";
import Link from "next/link";
import { WORKS, TEAM, SITE } from "@/lib/data";

const FEATURED = WORKS.slice(0, 4);

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative px-6 py-24 md:px-12 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-kv-border text-kv-accent text-xs font-bold uppercase tracking-widest">
            Production Studio · Vapi
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-foreground">
            Crafted to last.<br />
            <span className="text-kv-accent">Built in Vapi.</span>
          </h1>
          <p className="text-lg md:text-xl text-kv-muted max-w-2xl mx-auto leading-relaxed mb-10">
            {SITE.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/work"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-kv-accent text-black font-semibold rounded-full hover:bg-kv-accent-hover transition-colors"
            >
              View Work
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-kv-border text-foreground font-semibold rounded-full hover:bg-kv-border/50 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      {/* Hero image strip */}
      <section className="px-6 md:px-12 py-12 border-y border-kv-border bg-kv-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...FEATURED].reverse().map((work) => (
            <div key={work.id} className="relative overflow-hidden rounded-xl bg-kv-border aspect-[4/5] group">
              <Image src={work.image} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={400} height={500} />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-end p-4">
                <span className="text-kv-accent font-bold text-sm uppercase tracking-widest">{work.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-foreground">A production partner driven by pursuit.</h2>
              <p className="text-kv-muted leading-relaxed mb-8">
                We team up with brands and agencies to craft commercials, branded films, and campaigns
                built on craft and culture. Based in Vapi, Gujarat, we work across creative direction,
                production, and post — editorial, sound design, color, and VFX & motion.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-kv-accent font-bold text-sm uppercase tracking-widest hover:underline">
                Who We Are →
              </Link>
            </div>
            <div className="relative h-64 rounded-2xl overflow-hidden bg-kv-border">
              <Image src="/images/Crew-Teddy.avif" alt="KV Films crew" className="w-full h-full object-cover" width={640} height={480} />
            </div>
          </div>
        </div>
      </section>
      {/* Featured work */}
      <section className="px-6 md:px-12 py-24 bg-kv-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground">Featured Work</h2>
              <p className="text-kv-muted text-sm">A few projects that make us proud.</p>
            </div>
            <Link href="/work" className="text-kv-accent font-bold text-sm uppercase tracking-widest hover:underline">
              View all work →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED.map((work) => (
              <Link key={work.id} href={`/work#${work.id}`} className="block group">
                <div className="relative overflow-hidden rounded-xl bg-kv-border aspect-[4/5] mb-3">
                  <Image src={work.image} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={400} height={500} />
                </div>
                <h3 className="font-bold text-foreground group-hover:text-kv-accent transition-colors">{work.title}</h3>
                <span className="text-xs text-kv-muted uppercase tracking-widest">{work.category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Directors / team */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-foreground text-center">
            The People Behind the Frame
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {TEAM.map((member) => (
              <div key={member.id} className="flex flex-col items-center gap-4">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border border-kv-border bg-kv-border">
                  <Image src={member.image} alt={member.name} className="w-full h-full object-cover" width={400} height={400} />
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-kv-accent text-sm font-semibold uppercase tracking-widest">{member.role}</p>
                <p className="text-kv-muted text-sm leading-relaxed text-center max-w-xs">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
