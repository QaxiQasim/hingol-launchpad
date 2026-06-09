import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";
import { Stat } from "@/components/site/Primitives";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/case-studies/zetronix")({
  head: () => ({
    meta: [
      { title: "Zetronix SEO Case Study | Hingol Marketing" },
      { name: "description", content: "How Hingol Marketing delivered 42+ first-page keywords and a 65% organic traffic uplift for Zetronix, a US-based electronics brand." },
      { property: "og:title", content: "Zetronix SEO Case Study | Hingol Marketing" },
      { property: "og:description", content: "SEO case study: 42+ keywords on page 1, 65% organic traffic uplift and 25% sales growth for Zetronix in the United States." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/case-studies/zetronix" },
    ],
    links: [{ rel: "canonical", href: "/case-studies/zetronix" }],
  }),
  component: ZetronixPage,
});

function ZetronixPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case Study · SEO · United States · 2025–2026"
        title="Zetronix —"
        highlight="65% organic traffic uplift in the US."
        subtitle="A technical and ecommerce SEO programme that scaled Zetronix's organic rankings, sessions and product-level revenue across the United States."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-5xl space-y-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat value="42+" label="Keywords on Page 1" />
            <Stat value="+65%" label="Organic Traffic" />
            <Stat value="+25%" label="Online Sales" />
          </div>

          <Block title="Client Overview">
            <p>
              Zetronix is a US-based consumer electronics brand specialising in spy cameras, dash cams, recording
              devices and security tech, with a busy ecommerce storefront at{" "}
              <a href="https://www.zetronix.com/" target="_blank" rel="noreferrer" className="text-[oklch(0.82_0.13_85)] inline-flex items-center gap-1">zetronix.com <ExternalLink className="w-3.5 h-3.5" /></a>.
              Operating in one of the most competitive ecommerce verticals in the US, they needed an SEO partner
              that could compete with Amazon listings and category-defining incumbents on Google.
            </p>
          </Block>

          <Block title="The Challenges">
            <ul className="list-disc pl-5 space-y-2">
              <li>Hyper-competitive search landscape dominated by Amazon, Best Buy and specialist marketplaces.</li>
              <li>Thin and duplicated product content across hundreds of SKUs.</li>
              <li>Indexation and crawl-budget issues at the category and faceted-navigation level.</li>
              <li>Inconsistent internal linking that diluted authority across product and category pages.</li>
            </ul>
          </Block>

          <Block title="Our SEO Strategy">
            <p>
              We designed a programme around three pillars — fix the foundations, rewrite the commercial layer,
              and earn authority. Every initiative was scored by potential revenue impact, not just ranking
              opportunity, so the team could move fast on what mattered.
            </p>
          </Block>

          <Block title="Execution">
            <ul className="list-disc pl-5 space-y-2">
              <li>Comprehensive technical audit and remediation — indexation, schema, internal links, Core Web Vitals.</li>
              <li>Category and product page rewrites with intent-aligned copy and structured data.</li>
              <li>Faceted navigation strategy to consolidate authority and prevent index bloat.</li>
              <li>Editorial backlink campaign in US tech and security verticals.</li>
              <li>Content programme targeting top-of-funnel buying guides and comparison queries.</li>
              <li>Conversion-rate testing on top revenue pages to lift performance after the click.</li>
            </ul>
          </Block>

          <Block title="Results">
            <ul className="list-disc pl-5 space-y-2">
              <li>42+ commercial and product keywords ranking on the first page of Google US.</li>
              <li>65% year-on-year increase in qualified organic sessions.</li>
              <li>25% growth in online sales attributable to organic search.</li>
              <li>Dramatically improved product-level visibility on Google Shopping and Search.</li>
              <li>Higher organic conversion rates from a sharper page experience.</li>
              <li>Stronger overall search presence and topical authority in the niche.</li>
            </ul>
          </Block>

          <Block title="ROI">
            <p>
              Within the engagement window, Zetronix saw organic search shift from a flat, plateaued channel into
              their highest-ROI acquisition source — lower CPA than paid media, with revenue compounding month over month.
            </p>
          </Block>

          <Block title="Conclusion">
            <p>
              The Zetronix programme is a clear example of how disciplined ecommerce SEO — technical, on-page,
              content and authority — still wins in even the most crowded US categories, when it's executed by
              senior people who genuinely know what they're doing.
            </p>
          </Block>
        </div>
      </section>

      <CTASection
        title="Want measurable SEO results like Zetronix?"
        subtitle="Get a free SEO audit and proposal from our senior team — no obligations, just a clear view of what's possible."
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
