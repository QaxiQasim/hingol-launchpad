import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading, CTASection } from "@/components/SiteLayout";
import { FAQ, BulletList, CheckList } from "@/components/site/Primitives";
import { Search, Wrench, Link2, MapPin, ShoppingBag, FileText, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/services/seo")({
  head: () => ({
    meta: [
      { title: "SEO Agency Dubai | Local, Technical & eCommerce SEO Company" },
      { name: "description", content: "Hingol Marketing is a leading SEO agency in Dubai — technical SEO, local SEO, eCommerce SEO and content marketing engineered for first-page rankings and revenue." },
      { property: "og:title", content: "SEO Agency Dubai | Hingol Marketing" },
      { property: "og:description", content: "Dubai's senior-led SEO company. Local SEO, technical SEO, eCommerce SEO and content marketing that deliver measurable organic growth." },
      { property: "og:url", content: "/services/seo" },
    ],
    links: [{ rel: "canonical", href: "/services/seo" }],
  }),
  component: SEOPage,
});

function SEOPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="SEO Agency Dubai"
        title="The SEO company Dubai's most competitive brands"
        highlight="trust to dominate Google."
        subtitle="Technical SEO, local SEO, eCommerce SEO and content marketing — engineered by a senior team to deliver first-page rankings, qualified organic traffic and revenue you can measure."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <span className="eyebrow">What is SEO</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-5">SEO that's engineered, not guessed.</h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-lg">
            <p>
              Search Engine Optimization (SEO) is the discipline of earning visibility on Google, Bing and modern AI search
              for the queries your future customers are actually typing. Done right, SEO becomes the highest-margin growth
              channel in your business — a compounding flow of qualified traffic that doesn't switch off when you stop paying for ads.
            </p>
            <p>
              At Hingol Marketing, SEO is not a checklist of meta tags. It is a multi-layered programme of technical
              engineering, content strategy, digital PR and authority building, delivered by senior specialists who have
              ranked sites across Dubai, the GCC, the UK, the US and Europe for the most competitive keywords in their categories.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why SEO Matters"
            title="Why Dubai businesses can't afford to ignore SEO"
            subtitle="Search drives the majority of high-intent traffic to UAE businesses. If you are not on page one for the keywords that matter, your competitors are eating your lunch — quietly and consistently."
          />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: "High-intent traffic", d: "Search visitors arrive ready to buy, book or enquire — making SEO one of the highest-converting channels in your mix." },
              { t: "Compounding returns", d: "Unlike paid media, rankings you earn today keep delivering traffic for months and years to come." },
              { t: "Trust & authority", d: "Page-one visibility builds brand credibility in Dubai's crowded market — customers trust what Google recommends." },
            ].map((b) => (
              <div key={b.t} className="card-surface p-7">
                <h3 className="font-display font-semibold text-lg">{b.t}</h3>
                <p className="text-muted-foreground mt-3 leading-relaxed text-sm">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Our SEO Process" title="A proven, senior-led SEO process" />
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: <Search />, t: "Keyword Research", d: "Deep keyword mapping across commercial, informational and local intent — tied to revenue potential, not just search volume." },
              { icon: <FileText />, t: "On-Page SEO", d: "Title, meta, schema, internal linking, content optimization and entity mapping — engineered for both Google and AI search." },
              { icon: <Wrench />, t: "Technical SEO", d: "Core Web Vitals, crawlability, indexation, site architecture, structured data and JavaScript SEO audits with shipped fixes." },
              { icon: <Link2 />, t: "Link Building & Digital PR", d: "Editorial backlinks from authoritative Dubai, GCC and international publications — no spam, no PBNs, ever." },
              { icon: <MapPin />, t: "Local SEO Dubai", d: "Google Business Profile optimization, local citations, review acquisition and neighborhood-level landing pages across Dubai." },
              { icon: <ShoppingBag />, t: "Ecommerce SEO Dubai", d: "Category, product and faceted SEO for Shopify, WooCommerce and Magento — built to scale across thousands of pages." },
              { icon: <FileText />, t: "SEO Content Marketing", d: "Topical authority programmes that earn rankings, backlinks and qualified leads through expert long-form content." },
              { icon: <BarChart3 />, t: "Monthly Reporting", d: "Live dashboards plus monthly strategy reviews tied to traffic, rankings, conversions and revenue — never just impressions." },
            ].map((s) => (
              <div key={s.t} className="card-surface card-hover p-7 flex gap-4">
                <div className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center bg-[oklch(0.68_0.17_245/0.12)] border border-[oklch(0.68_0.17_245/0.3)] text-[oklch(0.78_0.15_245)]">
                  <span className="[&>svg]:w-6 [&>svg]:h-6">{s.icon}</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{s.t}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-5xl">
          <SectionHeading eyebrow="Benefits" title="What you get when SEO is done properly" />
          <CheckList items={[
            "Sustained first-page rankings for high-intent keywords",
            "Lower customer acquisition cost than paid media",
            "Higher-quality, ready-to-buy organic traffic",
            "Stronger brand credibility and trust signals",
            "Better local visibility across Dubai and the UAE",
            "Improved conversion rates from search visitors",
            "Compounding traffic that grows month over month",
            "A defensible moat against new competitors",
          ]} />
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQs" title="SEO Agency Dubai · FAQs" />
          <FAQ items={[
            { q: "How much does SEO cost in Dubai?", a: "Most Hingol SEO retainers start from AED 7,500/month for focused local SEO, with enterprise and eCommerce SEO programmes scaling based on scope, content velocity and link-building intensity." },
            { q: "How long until I see SEO results?", a: "Most clients see meaningful ranking and traffic improvements within 3 months, with significant business impact between months 4 and 9. Local SEO can move faster — sometimes within weeks." },
            { q: "Do you offer eCommerce and technical SEO?", a: "Yes. Technical, eCommerce, local and content SEO are all core in-house disciplines. We regularly run programmes across Shopify, WooCommerce, Magento, custom stacks and headless architectures." },
            { q: "Will I own everything you build?", a: "Always. All content, backlinks, tracking and documentation belong to you. No lock-in, no hidden ownership clauses." },
            { q: "Do you guarantee rankings?", a: "No reputable SEO agency does. We do, however, commit to a documented strategy, transparent reporting and senior-led execution that consistently outperforms category benchmarks." },
          ]} />
        </div>
      </section>

      <CTASection
        title="Ready to own page one in Dubai?"
        subtitle="Get a free, no-obligation SEO audit from our senior team — we'll show you exactly where you stand and what it takes to win."
        primary="Request a Free Website Audit"
      />
    </SiteLayout>
  );
}
