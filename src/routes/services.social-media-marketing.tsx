import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading, CTASection } from "@/components/SiteLayout";
import { FAQ, CheckList } from "@/components/site/Primitives";
import { Instagram, Facebook, Linkedin, Music2, Youtube } from "lucide-react";

export const Route = createFileRoute("/services/social-media-marketing")({
  head: () => ({
    meta: [
      { title: "Social Media Marketing Dubai | Instagram, LinkedIn, TikTok Agency" },
      { name: "description", content: "Hingol Marketing is a leading social media marketing agency in Dubai managing Instagram, Facebook, LinkedIn, TikTok and YouTube campaigns for ambitious brands." },
      { property: "og:title", content: "Social Media Marketing Dubai | Hingol Marketing" },
      { property: "og:description", content: "Strategy, content, community and paid social across Instagram, Facebook, LinkedIn, TikTok and YouTube — delivered by a senior in-house Dubai team." },
      { property: "og:url", content: "/services/social-media-marketing" },
    ],
    links: [{ rel: "canonical", href: "/services/social-media-marketing" }],
  }),
  component: SMMPage,
});

const platforms = [
  { icon: <Instagram />, t: "Instagram Marketing Dubai", d: "Reels, stories, carousels and creator-led content engineered to grow engaged communities and drive bookings." },
  { icon: <Facebook />, t: "Facebook Marketing Dubai", d: "Community building, organic content and high-performing paid social campaigns across UAE and GCC audiences." },
  { icon: <Linkedin />, t: "LinkedIn Marketing Dubai", d: "B2B thought leadership, executive branding and ABM-style paid campaigns that fill your sales pipeline." },
  { icon: <Music2 />, t: "TikTok Marketing", d: "Native, scroll-stopping TikTok content and Spark Ads campaigns built around the platform's culture and algorithm." },
  { icon: <Youtube />, t: "YouTube Marketing", d: "Long-form, Shorts and YouTube Ads strategies that turn the world's second-largest search engine into a growth channel." },
];

function SMMPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Social Media Marketing Dubai"
        title="The social media agency Dubai brands hire"
        highlight="to actually move the needle."
        subtitle="Senior-led strategy, in-house creators and conversion-focused paid social across Instagram, Facebook, LinkedIn, TikTok and YouTube — built to grow community, brand and revenue together."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <span className="eyebrow">Overview</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-5">Social media that builds brand and books revenue.</h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-lg">
            <p>
              Social media marketing in 2026 is no longer a content-calendar exercise. It is the front door to your brand —
              the place where Dubai customers discover you, judge you, and decide whether to trust you with their business.
              Done well, social media compounds into your most powerful awareness, community and demand-generation channel.
            </p>
            <p>
              Hingol Marketing is a senior-led social media agency in Dubai with in-house creators, paid social specialists,
              strategists and community managers under one roof. We don't outsource your brand voice to a freelancer in another
              time zone — we treat your social presence the way an in-house team would, only sharper and faster.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Benefits" title="Why brands invest in social with Hingol" />
          <CheckList items={[
            "Recognisable, scroll-stopping brand presence",
            "Engaged communities you actually own",
            "Predictable demand generation from paid social",
            "Senior in-house creative team — no freelancer chaos",
            "Conversion-focused content, not just pretty grids",
            "Transparent reporting tied to revenue and CPL",
            "Always-on testing across hooks, formats and audiences",
            "Strategy aligned with your wider marketing mix",
          ]} />
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Platforms We Manage" title="Native expertise on every platform that matters" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((p) => (
              <div key={p.t} className="card-surface card-hover p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[oklch(0.68_0.17_245/0.12)] border border-[oklch(0.68_0.17_245/0.3)] text-[oklch(0.78_0.15_245)] mb-4">
                  <span className="[&>svg]:w-6 [&>svg]:h-6">{p.icon}</span>
                </div>
                <h3 className="font-display font-semibold text-lg">{p.t}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl grid md:grid-cols-2 gap-6">
          {[
            { t: "Content Strategy", d: "Pillar-led content frameworks tied to your brand narrative, audience insights and the platforms that actually move your customers." },
            { t: "Community Management", d: "Native, on-brand responses across DMs, comments and reviews — protecting reputation and converting conversations into customers." },
            { t: "Paid Social Campaigns", d: "Full-funnel paid social across Meta, TikTok, LinkedIn and YouTube — creative-led, conversion-tracked, ROAS-obsessed." },
            { t: "Analytics & Reporting", d: "Live dashboards plus monthly strategic reviews focused on follower quality, engagement depth, leads and revenue — never vanity metrics." },
          ].map((b) => (
            <div key={b.t} className="card-surface p-7">
              <h3 className="font-display font-semibold text-xl">{b.t}</h3>
              <p className="text-muted-foreground mt-3 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQs" title="Social Media Marketing Dubai · FAQs" />
          <FAQ items={[
            { q: "Which social platforms should my Dubai business be on?", a: "It depends on your audience and offer. For most UAE B2C brands, Instagram and TikTok are non-negotiable. B2B brands lead with LinkedIn. Hospitality and retail benefit from a multi-platform approach. We help you pick based on data — not trend chasing." },
            { q: "Do you create content in-house?", a: "Yes. We have an in-house team of social-first content creators, editors, designers and short-form video specialists based in Dubai who produce content for our clients weekly." },
            { q: "What's a realistic social media marketing budget?", a: "Most engaged Hingol social retainers start from AED 9,500/month including strategy, content, scheduling and community management. Paid social budgets are managed separately and scaled based on ROAS." },
            { q: "Do you offer paid social separately from organic?", a: "Yes — we offer organic-only, paid-only, and combined engagements. Most clients see the strongest results when both work together under one strategy." },
            { q: "Can you work with our existing in-house team?", a: "Absolutely. We frequently plug into in-house marketing teams as the strategic and creative bench — handling production, paid media or both." },
          ]} />
        </div>
      </section>

      <CTASection
        title="Ready to make your social media work harder?"
        subtitle="Book a free social media strategy session with our senior team and walk away with a clear roadmap for the next 90 days."
        primary="Book a Strategy Call"
      />
    </SiteLayout>
  );
}
