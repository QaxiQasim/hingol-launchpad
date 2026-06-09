import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";
import { ArrowUpRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Digital Marketing & SEO Blog | Hingol Marketing Dubai" },
      { name: "description", content: "Insights, guides and trends on SEO, digital marketing, AI search and web development for Dubai businesses — straight from the Hingol Marketing team." },
      { property: "og:title", content: "Blog | Hingol Marketing Dubai" },
      { property: "og:description", content: "Practical, senior-level insights on SEO, digital marketing and AI search for Dubai businesses." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

const POSTS = [
  {
    slug: "top-seo-trends-dubai-2026",
    title: "Top SEO Trends in Dubai for 2026",
    excerpt: "AI search, local intent and entity SEO are reshaping how Dubai businesses win on Google. Here's what to prioritise in 2026.",
    date: "Jan 12, 2026",
    tag: "SEO",
  },
  {
    slug: "ai-powered-search-changing-seo",
    title: "How AI-Powered Search Is Changing SEO and Digital Marketing",
    excerpt: "Google's AI Overviews and generative search are rewriting the SEO playbook. Here's how Dubai brands should adapt — without panicking.",
    date: "Dec 18, 2025",
    tag: "AI Search",
  },
  {
    slug: "dubai-business-needs-website-development-seo",
    title: "Why Every Dubai Business Needs Professional Website Development and SEO",
    excerpt: "A great website is your hardest-working salesperson. Pair it with SEO and you have a compounding growth engine. Here's why both matter in Dubai.",
    date: "Nov 30, 2025",
    tag: "Web & SEO",
  },
];

function BlogIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog"
        title="Senior-level insights on"
        highlight="SEO, AI search and digital growth."
        subtitle="Practical articles, trend analysis and playbooks from the Hingol Marketing team — written for the Dubai business owners and marketers who are serious about growth."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}` as "/blog/top-seo-trends-dubai-2026"} className="card-surface card-hover p-7 group flex flex-col">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span className="text-[oklch(0.82_0.13_85)]">{p.tag}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.date}</span>
              </div>
              <h2 className="font-display text-xl font-bold mt-4">{p.title}</h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1">{p.excerpt}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[oklch(0.82_0.13_85)]">
                Read article <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
