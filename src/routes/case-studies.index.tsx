import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading, CTASection } from "@/components/SiteLayout";
import { ArrowUpRight, MapPin, Clock, Layers } from "lucide-react";

export const Route = createFileRoute("/case-studies/")({
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
    slug: "pinnacle-properties",
    name: "Pinnacle Properties",
    location: "Dubai, UAE",
    duration: "2024 – PRESENT",
    service: "SEO",
    headline: "80% increase in organic traffic, 45+ keywords on Page 1",
    summary: "Comprehensive SEO strategy for a luxury real estate agency, capturing organic demand from high-net-worth investors.",
    metrics: ["80% increase in organic traffic", "45+ keywords on Page 1", "60% increase in qualified leads"],
  },
  {
    slug: "novanest",
    name: "NovaNest Home & Living",
    location: "UAE",
    duration: "2024 – PRESENT",
    service: "Web Dev & SEO",
    headline: "3X Organic Revenue, 2.5s Improved Load Time",
    summary: "Technical SEO and web development overhaul for a premium home decor brand, achieving significant organic growth.",
    metrics: ["3X Organic Revenue", "2.5s Improved Load Time", "+150% Non-Brand Search Traffic"],
  },
  {
    slug: "lumiere-hotel-group",
    name: "Lumiere Hotel Group",
    location: "Dubai, UAE",
    duration: "2023 – 2024",
    service: "SEO & Social",
    headline: "60% Increase in Direct Bookings, -40% Dependency on OTAs",
    summary: "Dual-pronged strategy combining Local SEO with high-impact Social Media Marketing to capture travelers directly.",
    metrics: ["60% Increase in Direct Bookings", "-40% Dependency on OTAs", "3.5M Social Media Impressions"],
  },
  {
    slug: "medlife-clinics",
    name: "MedLife Clinics",
    location: "Dubai, UAE",
    duration: "2024 – PRESENT",
    service: "SEO & PPC",
    headline: "120% Increase in Bookings, -35% Cost Per Acquisition",
    summary: "Highly targeted, compliant digital marketing strategy tailored for the healthcare industry, boosting verified bookings.",
    metrics: ["120% Increase in Bookings", "-35% Cost Per Acquisition", "Top 3 Ranking for 20+ Treatments"],
  },
  {
    slug: "vaultify-fintech",
    name: "Vaultify Fintech",
    location: "DIFC, Dubai",
    duration: "2025 – 2026",
    service: "PPC & Paid Media",
    headline: "4.2X Return on Ad Spend, -38% Cost Per Lead",
    summary: "Precision Google and LinkedIn Advertising pivoting from broad awareness to highly targeted, intent-based acquisition.",
    metrics: ["4.2X Return on Ad Spend", "-38% Cost Per Lead", "+2,500 New Active Users"],
  },
  {
    slug: "saffron-kitchen",
    name: "Saffron Kitchen",
    location: "Dubai, UAE",
    duration: "2025 – PRESENT",
    service: "Social Media",
    headline: "3X Increase in Table Reservations, 200% Instagram Follower Growth",
    summary: "Reimagined social presence shifting the focus to video-first content creation and conversion-driven paid social.",
    metrics: ["3X Increase in Table Reservations", "200% Instagram Follower Growth", "1.8M Monthly Video Views"],
  },
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
            <Link key={s.slug} to={`/case-studies/${s.slug}` as any} className="card-surface card-hover p-8 group">
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
