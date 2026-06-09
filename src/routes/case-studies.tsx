import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading, CTASection } from "@/components/SiteLayout";
import { ArrowUpRight, MapPin, Clock, Layers } from "lucide-react";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "SEO & Digital Marketing Case Studies | Hingol Marketing Dubai" },
      { name: "description", content: "Explore Hingol Marketing's SEO and digital marketing case studies — real results for brands in Dubai, the United States and beyond." },
      { property: "og:title", content: "Case Studies | Hingol Marketing Dubai" },
      { property: "og:description", content: "Real brands. Real results. See how Hingol Marketing delivered measurable SEO and digital marketing growth for clients globally." },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudiesPage,
});

const studies = [
  {
    slug: "the-pet-shop",
    name: "The Pet Shop",
    location: "Dubai, UAE",
    duration: "2023 – 2025",
    service: "SEO",
    headline: "35+ keywords ranked, 50% organic traffic lift",
    summary: "Local and category SEO transformation for one of Dubai's most-loved pet retailers — driving organic traffic, sales and local visibility.",
    metrics: ["35+ keywords on page 1", "+50% organic traffic", "+40% online sales"],
  },
  {
    slug: "zetronix",
    name: "Zetronix",
    location: "United States",
    duration: "2025 – 2026",
    service: "SEO",
    headline: "42+ keywords ranked, 65% organic traffic lift",
    summary: "Technical and ecommerce SEO programme for a US-based electronics brand — scaling rankings, sessions and product-level conversion.",
    metrics: ["42+ keywords on page 1", "+65% organic traffic", "+25% online sales"],
  },
];

function CaseStudiesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case Studies"
        title="Real brands."
        highlight="Real, measurable results."
        subtitle="A look inside the SEO and digital marketing programmes Hingol has delivered for ambitious brands in Dubai, the United States and beyond."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl grid md:grid-cols-2 gap-6">
          {studies.map((s) => (
            <Link key={s.slug} to={`/case-studies/${s.slug}` as "/case-studies/the-pet-shop"} className="card-surface card-hover p-8 group">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> {s.service}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {s.location}</span>
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {s.duration}</span>
              </div>
              <div className="flex items-start justify-between mt-4">
                <h2 className="font-display text-2xl md:text-3xl font-bold">{s.name}</h2>
                <ArrowUpRight className="w-6 h-6 text-[oklch(0.82_0.13_85)] group-hover:rotate-45 transition-transform" />
              </div>
              <p className="text-muted-foreground mt-3 leading-relaxed">{s.summary}</p>
              <div className="grid grid-cols-3 gap-3 mt-6">
                {s.metrics.map((m) => (
                  <div key={m} className="rounded-xl border border-border p-4 text-center">
                    <div className="text-sm font-semibold text-gradient-gold">{m}</div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTASection
        title="Want to be the next Hingol case study?"
        subtitle="Tell us about your goals. We'll show you a clear path to measurable, compounding growth — in Dubai or anywhere your customers are."
      />
    </SiteLayout>
  );
}
