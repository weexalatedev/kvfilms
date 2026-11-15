import Image from "next/image";
import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import { WORKS, TEAM, SITE } from "@/lib/data";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative px-6 py-28 md:px-12 md:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <TextReveal className="block inline-block px-3 py-1 mb-8 rounded-full border border-kv-border text-kv-accent text-[10px] font-bold uppercase tracking-widest">
            Production Studio · Vapi
          </TextReveal>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05] mb-6 text-foreground">
            <TextReveal className="block">Crafted to last.</TextReveal>
            <TextReveal className="block text-kv-accent">Built in Vapi.</TextReveal>
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

      <section className="px-6 md:px-12 py-24 border-y border-kv-border bg-kv-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10 section_head">
            <div>
              <div className="section_eyebrow">Selected works</div>
              <div className="section_title">Featured Work</div>
              <div className="section_sub">A few projects that make us proud.</div>
            </div>
            <Link href="/work" className="text-kv-accent font-bold text-sm uppercase tracking-widest hover:underline">
              View all work →
            </Link>
          </div>
          <div className="home-gallery">
            {WORKS.map((work, i) => (
              <div
                key={work.id}
                className="home-gallery_list_item group rot-1"
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  width={400}
                  height={400}
                  priority={i < 3}
                />
                <div className="gallery_overlay">
                  <span className="gallery_tag">{work.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-28">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section_eyebrow">About the studio</div>
              <div className="section_title">A production partner driven by pursuit.</div>
              <p className="section_sub mb-8">
                We team up with brands and agencies to craft commercials, branded films, and campaigns
                built on craft and culture. Based in Vapi, Gujarat, we work across creative direction,
                production, and post — editorial, sound design, color, and VFX & motion.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-kv-accent font-bold text-sm uppercase tracking-widest hover:underline">
                Who We Are →
              </Link>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden bg-kv-border border border-kv-border/50">
              <Image src="/images/Crew-Teddy.avif" alt="KV Films crew" className="w-full h-full object-cover" width={640} height={480} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-28 bg-kv-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12 section_head">
            <div>
              <div className="section_eyebrow">Latest work</div>
              <div className="section_title">The Work</div>
              <div className="section_sub">Commercials, branded films, and campaigns built on craft.</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WORKS.map((work) => (
              <Link key={work.id} href={`/work#${work.id}`} className="block">
                <div className="work_card group">
                  <Image src={work.image} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" width={400} height={500} />
                  <div className="work_card_content">
                    <h3 className="work_card_title">{work.title}</h3>
                    <span className="work_card_cat">{work.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/work" className="text-kv-accent font-bold text-sm uppercase tracking-widest hover:underline">
              View all work →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-28">
        <div className="max-w-7xl mx-auto">
          <div className="section_head mb-12 text-center">
            <div className="section_eyebrow">The studio</div>
            <div className="section_title">The People Behind the Frame</div>
          </div>
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
