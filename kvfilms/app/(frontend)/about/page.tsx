import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/data";
import { getServices, getTeam } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function About() {
  const [services, team] = await Promise.all([getServices(), getTeam()]);

  return (
    <div className="relative overflow-hidden">
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-foreground">Who We Are</h1>
          <p className="text-lg text-kv-muted max-w-2xl leading-relaxed mb-12">
            KV Films brings together talent, ideas, and opportunity through a culture of respect,
            curiosity, and collaboration. Our focus stays simple: create the space where great work
            feels inevitable — from our base in {SITE.location}.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-12 py-24 bg-kv-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground">Services</h2>
              <p className="text-kv-muted text-sm">Everything from first frame to final cut.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.name} className="p-8 rounded-2xl border border-kv-border/50 bg-kv-border hover:border-kv-accent/50 transition-colors">
                <h3 className="font-bold text-foreground mb-4">{service.name}</h3>
                <ul className="space-y-3 text-kv-muted text-sm leading-relaxed">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-kv-accent">›</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-foreground text-center">
            The Team
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member) => (
              <div key={member.id} className="flex gap-6 items-start">
                <div className="relative w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden border border-kv-border bg-kv-border">
                  <Image src={member.image} alt={member.name} className="w-full h-full object-cover" width={320} height={320} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <p className="text-kv-accent text-sm font-semibold uppercase tracking-widest mb-2">
                    {member.role}
                  </p>
                  <p className="text-kv-muted leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 text-center">
        <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-kv-accent text-black font-semibold rounded-full hover:bg-kv-accent-hover transition-colors">
          Start a Project
        </Link>
      </section>
    </div>
  );
}
