import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading, CTASection } from "@/components/SiteLayout";
import { FAQ, CheckList } from "@/components/site/Primitives";
import { Target, Monitor, ShoppingBag, Youtube, Repeat, Layout, BarChart3, Activity } from "lucide-react";

export const Route = createFileRoute("/services/ppc-advertising")({
  head: () => ({
    meta: [
      { title: "PPC Agency Dubai | Google Ads, Meta Ads & Paid Advertising" },
      { name: "description", content: "Hingol Marketing is a leading PPC agency in Dubai. Google Ads, Meta Ads and paid advertising campaigns engineered around conversion tracking and ROAS." },
      { property: "og:title", content: "PPC Agency Dubai | Hingol Marketing" },
      { property: "og:description", content: "Senior-led Google Ads and Meta Ads management in Dubai. Profit-first paid media, transparent tracking and weekly optimization." },
      { property: "og:url", content: "/services/ppc-advertising" },
    ],
    links: [{ rel: "canonical", href: "/services/ppc-advertising" }],
  }),
  component: PPCPage,
});

function PPCPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="PPC Agency Dubai"
        title="Google Ads & Meta Ads that deliver"
        highlight="profitable, predictable growth."
        subtitle="A senior-led PPC agency in Dubai managing Search, Display, Shopping, YouTube and Meta campaigns engineered around conversion tracking, landing-page experimentation and ROAS."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <span className="eyebrow">What is PPC</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-5">PPC, done the way it should be done.</h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-lg">
            <p>
              Pay-per-click (PPC) advertising lets you put your brand in front of high-intent customers the moment they
              are searching, scrolling or watching. Done badly, PPC is the fastest way to burn budget. Done well, it
              becomes the most profitable, predictable demand channel in your business.
            </p>
            <p>
              Hingol Marketing is a Dubai-based PPC agency built around one principle: every dirham of paid media should
              be measurable, accountable and profitable. We don't chase impressions, clicks or vanity dashboards — we
              optimise for the conversions and ROAS that matter to your P&L.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Google Ads Management" title="Full Google Ads coverage" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Target />, t: "Search Campaigns", d: "High-intent search campaigns built on rigorous keyword research, ad copy testing and Quality Score optimization." },
              { icon: <Monitor />, t: "Display Campaigns", d: "Programmatic display, retargeting and prospecting campaigns across Google's premium inventory." },
              { icon: <ShoppingBag />, t: "Shopping Campaigns", d: "Performance Max and Shopping campaigns engineered around feed quality, segmentation and ROAS tiers." },
              { icon: <Youtube />, t: "YouTube Ads", d: "Skippable, bumper and Shorts campaigns with creative built specifically for the platform — not recycled TV spots." },
              { icon: <Target />, t: "Meta Ads", d: "Facebook and Instagram performance campaigns with creative iteration, advantage+ audiences and full event-based tracking." },
              { icon: <Repeat />, t: "Remarketing Campaigns", d: "First-party data-driven retargeting funnels that bring high-intent visitors back and convert them at the lowest CPA." },
            ].map((s) => (
              <div key={s.t} className="card-surface card-hover p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[oklch(0.68_0.17_245/0.12)] border border-[oklch(0.68_0.17_245/0.3)] text-[oklch(0.78_0.15_245)] mb-4">
                  <span className="[&>svg]:w-6 [&>svg]:h-6">{s.icon}</span>
                </div>
                <h3 className="font-display font-semibold text-lg">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl grid md:grid-cols-3 gap-6">
          {[
            { icon: <Activity />, t: "Conversion Tracking", d: "Server-side GA4, enhanced conversions, CAPI and CRM-fed offline conversions — so every dirham is attributed correctly." },
            { icon: <Layout />, t: "Landing Page Optimization", d: "Bespoke, fast-loading landing pages and ongoing CRO testing to lift conversion rates after the click." },
            { icon: <BarChart3 />, t: "Reporting", d: "Live Looker Studio dashboards plus monthly strategic reviews tied to leads, sales and ROAS — never just impressions." },
          ].map((b) => (
            <div key={b.t} className="card-surface p-7">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[oklch(0.82_0.13_85/0.12)] border border-[oklch(0.82_0.13_85/0.3)] text-[oklch(0.82_0.13_85)] mb-4">
                <span className="[&>svg]:w-6 [&>svg]:h-6">{b.icon}</span>
              </div>
              <h3 className="font-display font-semibold text-lg">{b.t}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed text-sm">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-5xl">
          <SectionHeading eyebrow="Why Hingol" title="Paid advertising Dubai brands actually trust" />
          <CheckList items={[
            "Senior Google & Meta certified specialists",
            "Transparent fees — no hidden media markups",
            "Full ownership of accounts, tracking and data",
            "Conversion-led creative testing every week",
            "Landing page CRO built into every engagement",
            "Cross-channel attribution and proper measurement",
            "Profit-first scaling — not blind budget burn",
            "Direct access to your strategist, not a help desk",
          ]} />
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQs" title="PPC Agency Dubai · FAQs" />
          <FAQ items={[
            { q: "What budget should I start with for Google Ads in Dubai?", a: "Most Dubai SMEs see meaningful traction starting from AED 8,000–15,000/month in ad spend, with management fees on top. Competitive verticals (real estate, finance, legal) typically need more. We help you size the budget honestly." },
            { q: "Do you manage Meta Ads as well as Google Ads?", a: "Yes — Meta Ads (Facebook & Instagram), Google Ads, YouTube Ads, TikTok Ads and LinkedIn Ads are all delivered in-house." },
            { q: "Will I own my ad accounts?", a: "Always. We work inside your Google Ads, Meta Business Manager and analytics accounts. If we ever part ways, everything stays with you." },
            { q: "How quickly can campaigns go live?", a: "Most new campaigns launch within 7–14 days of kick-off, including conversion tracking, creative and landing page setup." },
            { q: "Do you offer landing page design and CRO?", a: "Yes — landing page design, build, and ongoing CRO testing are part of how we improve ROAS over time." },
          ]} />
        </div>
      </section>

      <CTASection
        title="Want a clearer view of what your ads could do?"
        subtitle="Get a free PPC audit from our senior team — we'll review your current campaigns and show you exactly where the wasted spend and missed opportunities are."
        primary="Request a Free PPC Audit"
      />
    </SiteLayout>
  );
}
