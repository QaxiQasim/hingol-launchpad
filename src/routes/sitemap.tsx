import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { ChevronRight, Layers, FileText, Globe, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "HTML Sitemap | Hingol Marketing Dubai" },
      { name: "description", content: "HTML sitemap for Hingol Marketing. Access all pages, services, case studies and marketing blog posts." },
      { property: "og:title", content: "HTML Sitemap | Hingol Marketing" },
      { property: "og:description", content: "HTML sitemap. Easily find and navigate all services, articles, and case studies." },
      { property: "og:url", content: "/sitemap" },
    ],
    links: [{ rel: "canonical", href: "/sitemap" }],
  }),
  component: SitemapPage,
});

function SitemapPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Navigation"
        title="HTML Sitemap"
        highlight="Explore our entire digital catalog."
        subtitle="Use this sitemap to easily find services, read our digital growth case studies, or browse our latest digital marketing and SEO insights."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Core Pages */}
            <div className="card-surface p-6 space-y-4">
              <h2 className="text-lg font-bold font-display text-gradient-gold flex items-center gap-2 border-b border-border pb-3">
                <Globe className="w-5 h-5 text-[oklch(0.82_0.13_85)]" /> Core Pages
              </h2>
              <ul className="space-y-3">
                {[
                  { label: "Home", to: "/" },
                  { label: "About Us", to: "/about" },
                  { label: "Services Directory", to: "/services" },
                  { label: "Case Studies Directory", to: "/case-studies" },
                  { label: "Blog Inventory", to: "/blog" },
                  { label: "Get In Touch / Contact", to: "/contact" }
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to as any} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors group">
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-[oklch(0.82_0.13_85)] transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="card-surface p-6 space-y-4">
              <h2 className="text-lg font-bold font-display text-gradient-gold flex items-center gap-2 border-b border-border pb-3">
                <Layers className="w-5 h-5 text-[oklch(0.82_0.13_85)]" /> Services
              </h2>
              <ul className="space-y-3">
                {[
                  { label: "Search Engine Optimization (SEO)", to: "/services/seo" },
                  { label: "Social Media Marketing (SMM)", to: "/services/social-media-marketing" },
                  { label: "PPC / Paid Search Advertising", to: "/services/ppc-advertising" },
                  { label: "Custom Website Development", to: "/services/website-development" },
                  { label: "Premium Mobile App Development", to: "/services/app-development" }
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to as any} className="text-sm text-muted-foreground hover:text-foreground flex items-start gap-1.5 transition-colors group">
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/60 group-hover:text-[oklch(0.82_0.13_85)] transition-colors flex-shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case Studies */}
            <div className="card-surface p-6 space-y-4 lg:col-span-2">
              <h2 className="text-lg font-bold font-display text-gradient-gold flex items-center gap-2 border-b border-border pb-3">
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.82_0.13_85)]" /> Growth Case Studies
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="space-y-3">
                  {[
                    { label: "Pinnacle Properties", to: "/case-studies/pinnacle-properties" },
                    { label: "NovaNest Home & Living", to: "/case-studies/novanest" },
                    { label: "Lumiere Hotel Group", to: "/case-studies/lumiere-hotel-group" },
                    { label: "MedLife Clinics", to: "/case-studies/medlife-clinics" }
                  ].map((link) => (
                    <li key={link.to}>
                      <Link to={link.to as any} className="text-sm text-muted-foreground hover:text-foreground flex items-start gap-1.5 transition-colors group">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/60 group-hover:text-[oklch(0.82_0.13_85)] transition-colors flex-shrink-0" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {[
                    { label: "Vaultify Fintech", to: "/case-studies/vaultify-fintech" },
                    { label: "Saffron Kitchen", to: "/case-studies/saffron-kitchen" },
                    { label: "The Pet Shop", to: "/case-studies/the-pet-shop" },
                    { label: "Zetronix", to: "/case-studies/zetronix" }
                  ].map((link) => (
                    <li key={link.to}>
                      <Link to={link.to as any} className="text-sm text-muted-foreground hover:text-foreground flex items-start gap-1.5 transition-colors group">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/60 group-hover:text-[oklch(0.82_0.13_85)] transition-colors flex-shrink-0" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Blog Articles */}
            <div className="card-surface p-6 space-y-4 lg:col-span-4">
              <h2 className="text-lg font-bold font-display text-gradient-gold flex items-center gap-2 border-b border-border pb-3">
                <FileText className="w-5 h-5 text-[oklch(0.82_0.13_85)]" /> SEO & Marketing Blog Insights
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  { label: "Top SEO Trends in Dubai for 2026", to: "/blog/top-seo-trends-dubai-2026" },
                  { label: "How AI-Powered Search is Changing SEO Strategy", to: "/blog/ai-powered-search-changing-seo" },
                  { label: "Why Dubai Businesses Need Website Development & SEO", to: "/blog/dubai-business-needs-website-development-seo" }
                ].map((link) => (
                  <div key={link.to}>
                    <Link to={link.to as any} className="text-sm text-muted-foreground hover:text-foreground flex items-start gap-1.5 transition-colors group">
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-muted-foreground/60 group-hover:text-[oklch(0.82_0.13_85)] transition-colors flex-shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
