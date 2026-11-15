import Link from "next/link";
import { getWorks } from "@/lib/content";
import WorkGallery from "@/components/WorkGallery";

export const dynamic = "force-dynamic";

export default async function Work() {
  const works = await getWorks();

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

          <WorkGallery works={works} />
        </div>
      </section>
    </div>
  );
}
