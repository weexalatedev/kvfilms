import Link from "next/link";
import Image from "next/image";
import { getNews } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function News() {
  const news = await getNews();

  return (
    <div className="relative overflow-hidden">
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-foreground">
            News &amp; Updates
          </h1>
          <p className="text-kv-muted mb-12">
            Stay current with KV Films. New projects, press, and studio updates.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {news.map((article) => (
              <article key={article.id} id={article.id} className="mb-8 last:mb-0 scroll-mt-24">
                <div className="relative rounded-xl overflow-hidden bg-kv-border mb-4 aspect-[4/3]">
                  <Image src={article.image} alt={article.title} className="w-full h-full object-cover" width={640} height={480} />
                </div>
                <time className="text-kv-accent text-xs font-bold uppercase tracking-widest block mb-2">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  <Link href={`/news#${article.id}`} className="hover:text-kv-accent transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-kv-muted leading-relaxed">{article.excerpt}</p>
              </article>
            ))}
            {news.length === 0 && (
              <p className="text-kv-muted">No updates yet — check back soon.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
