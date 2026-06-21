import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";
import { Stat } from "@/components/site/Primitives";

export const Route = createFileRoute("/case-studies/pinnacle-properties")({
  head: () => ({
    meta: [
      { title: "Pinnacle Properties SEO Case Study | Hingol Marketing Dubai" },
      { name: "description", content: "How Hingol Marketing delivered an 80% organic traffic lift and 45+ first-page keywords for Pinnacle Properties, a luxury real estate agency in Dubai." },
      { property: "og:title", content: "Pinnacle Properties SEO Case Study | Hingol Marketing" },
      { property: "og:description", content: "SEO case study: 80% increase in organic traffic, 45+ keywords on page 1 and 60% qualified leads growth for Pinnacle Properties." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/case-studies/pinnacle-properties" },
    ],
    links: [{ rel: "canonical", href: "/case-studies/pinnacle-properties" }],
  }),
  component: PinnaclePropertiesPage,
});

function PinnaclePropertiesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case Study · SEO · Dubai, UAE · 2024–PRESENT"
        title="Pinnacle Properties —"
        highlight="80% organic traffic increase for luxury real estate."
        subtitle="A targeted local and category SEO strategy that captured organic demand from high-net-worth real estate investors in Dubai."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-5xl space-y-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat value="80%" label="Organic Traffic Increase" />
            <Stat value="45+" label="Keywords on Page 1" />
            <Stat value="60%" label="Increase in Qualified Leads" />
          </div>

          <Block title="Client Overview">
            <p>
              Pinnacle Properties is a premium boutique real estate agency in Dubai specializing in luxury villas, 
              penthouses, and off-plan properties in high-end locations like Palm Jumeirah, Dubai Marina, and Downtown Dubai. 
              To capture high-net-worth investors seeking premium real estate opportunities, they needed to dominate 
              search results for competitive local property queries.
            </p>
          </Block>

          <Block title="The Challenges">
            <p>
              The real estate search landscape in Dubai is highly competitive, dominated by massive property aggregators 
              and global portals. Key challenges included:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Stagnant organic rankings for competitive search queries like "luxury villas Palm Jumeirah" and "Dubai off-plan penthouses."</li>
              <li>High search presence of large-scale aggregators that diluted boutique agency visibility.</li>
              <li>Weak technical search architecture, including unoptimized media files for high-resolution property listings.</li>
              <li>Lack of localized neighborhood authority and structural content linking store locations to listings.</li>
            </ul>
          </Block>

          <Block title="Our SEO Strategy">
            <p>
              We established an intensive SEO campaign targeting high-intent luxury buyers and off-plan investors. 
              Our strategy focused on developing hyper-local neighborhood guides, optimizing property listings 
              with schema markup, and executing a premium digital PR campaign to earn high-authority editorial links.
            </p>
          </Block>

          <Block title="Implementation">
            <ul className="list-disc pl-5 space-y-2">
              <li>Engineered a fast, lightweight mobile property search experience with optimized Core Web Vitals.</li>
              <li>Implemented custom RealEstateAgent and Product schema markup across listings to drive rich search snippets.</li>
              <li>Produced in-depth, long-form neighborhood guides for Dubai's premier residential communities.</li>
              <li>Conducted authority-building outreach targeting global financial, travel, and real estate journals.</li>
              <li>Optimized category filters and taxonomy pages to capture generic search queries.</li>
            </ul>
          </Block>

          <Block title="Results">
            <ul className="list-disc pl-5 space-y-2">
              <li>80% increase in year-over-year organic traffic.</li>
              <li>45+ commercial search terms achieved first-page Google UAE rankings.</li>
              <li>60% growth in qualified, high-net-worth lead submissions from organic search.</li>
              <li>Dramatically increased search snippet click-through-rates (CTR) due to rich schema styling.</li>
              <li>Enhanced organic visibility for luxury neighborhood queries.</li>
            </ul>
          </Block>

          <Block title="Business Impact">
            <p>
              Organic search is now the primary channel driving qualified leads for Pinnacle Properties, outperforming 
              paid social campaigns in conversion value and delivering a steady stream of luxury real estate sales 
              and investor acquisitions.
            </p>
          </Block>

          <Block title="Conclusion">
            <p>
              By bypassing broad search keywords and capturing high-intent investor interest at the neighborhood level, 
              Pinnacle Properties proved that boutique real estate agencies can outrank massive property portals 
              on Google Dubai with a senior-led SEO strategy.
            </p>
          </Block>
        </div>
      </section>

      <CTASection
        title="Looking to dominate Dubai's luxury search space?"
        subtitle="Schedule a free SEO strategy review with our senior team and see how we can lift your search rankings."
        primary="Request a Free SEO Audit"
      />
    </SiteLayout>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed text-base md:text-lg">{children}</div>
    </div>
  );
}
