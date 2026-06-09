import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";
import { Stat } from "@/components/site/Primitives";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/case-studies/the-pet-shop")({
  head: () => ({
    meta: [
      { title: "The Pet Shop SEO Case Study | Hingol Marketing Dubai" },
      { name: "description", content: "How Hingol Marketing delivered 35+ first-page keywords and a 50% organic traffic lift for The Pet Shop, a leading Dubai pet retailer." },
      { property: "og:title", content: "The Pet Shop SEO Case Study | Hingol Marketing" },
      { property: "og:description", content: "SEO case study: 35+ keywords on page 1, 50% organic traffic uplift and 40% sales growth for The Pet Shop in Dubai." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/case-studies/the-pet-shop" },
    ],
    links: [{ rel: "canonical", href: "/case-studies/the-pet-shop" }],
  }),
  component: PetShopPage,
});

function PetShopPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case Study · SEO · Dubai, UAE · 2023–2025"
        title="The Pet Shop —"
        highlight="50% organic traffic uplift in Dubai."
        subtitle="A senior-led SEO programme that turned The Pet Shop into one of Dubai's most-visible pet retailers across local and category search."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-5xl space-y-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat value="35+" label="Keywords on Page 1" />
            <Stat value="+50%" label="Organic Traffic" />
            <Stat value="+40%" label="Online Sales" />
          </div>

          <Block title="Client Overview">
            <p>
              The Pet Shop is one of the UAE's most-loved pet retailers, serving thousands of households across Dubai with
              premium pet food, accessories and live-animal supplies. With a fast-growing physical footprint and a busy
              ecommerce store at <a href="https://www.thepetshop.com/" target="_blank" rel="noreferrer" className="text-[oklch(0.82_0.13_85)] inline-flex items-center gap-1">thepetshop.com <ExternalLink className="w-3.5 h-3.5" /></a>,
              the brand needed an SEO partner who could compete with established players and global marketplaces on Google UAE.
            </p>
          </Block>

          <Block title="The Challenges">
            <p>
              The Pet Shop arrived with a strong brand and great product range, but their organic visibility didn't reflect
              their offline reputation. Key challenges included:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Stagnant rankings for high-intent commercial keywords across pet food, accessories and supplies.</li>
              <li>Heavy competition from international marketplaces and local players with bigger backlink profiles.</li>
              <li>Technical SEO debt — slow Core Web Vitals, weak internal linking and inconsistent on-page structure.</li>
              <li>Underdeveloped local SEO across Dubai neighborhoods despite multiple physical store locations.</li>
            </ul>
          </Block>

          <Block title="Our SEO Strategy">
            <p>
              We built a three-layer programme combining technical SEO, category and product optimization, and
              local SEO across every store location. The strategy was sequenced to compound — quick wins first,
              foundational improvements second, and authority building third.
            </p>
          </Block>

          <Block title="Implementation">
            <ul className="list-disc pl-5 space-y-2">
              <li>Full technical audit and remediation — Core Web Vitals, indexation, schema, internal linking.</li>
              <li>Keyword mapping across 200+ commercial and informational queries tied to revenue potential.</li>
              <li>On-page optimization of category and product pages with structured data and intent-aligned copy.</li>
              <li>Local SEO programme — Google Business Profile, location pages, citations and review acquisition.</li>
              <li>Editorial backlink outreach focused on UAE and global pet-care publications.</li>
              <li>Monthly content programme targeting informational queries that fed top-of-funnel demand.</li>
            </ul>
          </Block>

          <Block title="Results">
            <ul className="list-disc pl-5 space-y-2">
              <li>35+ commercial keywords ranking on the first page of Google UAE.</li>
              <li>50% year-on-year increase in qualified organic traffic.</li>
              <li>40% growth in online sales attributed to organic search.</li>
              <li>Significantly improved local visibility across Dubai neighborhoods.</li>
              <li>Sustained growth in customer inquiries and repeat organic visits.</li>
              <li>Expanded organic reach across high-margin product categories.</li>
            </ul>
          </Block>

          <Block title="Business Impact">
            <p>
              The Pet Shop now treats organic search as one of its most profitable acquisition channels, with
              lower CPA than paid media and a steady flow of in-store and online customers driven by Google.
              The programme continues to compound month over month.
            </p>
          </Block>

          <Block title="Conclusion">
            <p>
              The Pet Shop is a textbook example of what a senior-led, technically rigorous SEO programme can do
              for an established Dubai brand. Same product range, same team, same stores — just dramatically more
              demand because the right people could finally find them on Google.
            </p>
          </Block>
        </div>
      </section>

      <CTASection
        title="Want results like The Pet Shop?"
        subtitle="Request a free SEO audit from our senior team and find out exactly what's possible for your brand."
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
