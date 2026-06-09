import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Target, Eye, Heart, Award, Users, Zap, TrendingUp, Globe, Layers } from "lucide-react";
import { SiteLayout, PageHero, SectionHeading, CTASection } from "@/components/SiteLayout";
import { Stat, FeatureCard, BulletList } from "@/components/site/Primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Hingol Marketing — Digital Marketing Experts Dubai" },
      { name: "description", content: "Meet Hingol Marketing — a senior-led SEO company and digital marketing agency in Dubai helping ambitious brands across the UAE and globally grow predictably." },
      { property: "og:title", content: "About Hingol Marketing — Digital Marketing Experts Dubai" },
      { property: "og:description", content: "Senior strategists, in-house specialists and a relentless focus on revenue. Discover the team behind Hingol Marketing, Dubai's growth-focused agency." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Hingol Marketing"
        title="Dubai's senior-led"
        highlight="digital growth partner."
        subtitle="We help ambitious brands across the UAE, GCC, Europe and Australia turn digital marketing into their most predictable engine of revenue — through SEO, paid media, web, apps and creative built in-house."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-5xl">
          <span className="eyebrow">Who We Are</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-5">A Dubai digital marketing agency built for results, not retainers.</h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-lg">
            <p>
              Hingol Marketing is a full-service digital marketing agency headquartered on Sheikh Zayed Road in Dubai.
              We were founded to fix a problem too many businesses know intimately — agencies that sell hours instead of outcomes,
              ship junior account managers in place of senior strategists, and hide behind vanity metrics when revenue stalls.
            </p>
            <p>
              Our answer was to build a leaner, sharper, senior-only team. Every account at Hingol is led by a strategist
              with at least eight years in their discipline, executed by specialists who genuinely care about the result,
              and reported against the only metrics that matter: pipeline, customers and revenue.
            </p>
            <p>
              Today we work with retail, real estate, hospitality, eCommerce, fintech, healthcare and technology brands
              across the UAE, the wider GCC, the United Kingdom, Europe, Australia and the United States — and we treat
              every engagement, large or small, as if our reputation depends on it. Because it does.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl grid md:grid-cols-3 gap-6">
          <div className="card-surface p-8">
            <Target className="w-8 h-8 text-[oklch(0.82_0.13_85)]" />
            <h3 className="font-display text-2xl font-bold mt-5">Our Mission</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              To become Dubai's most trusted digital marketing partner by delivering measurable, compounding revenue
              growth for every brand we work with — through senior expertise, full transparency and uncompromising execution.
            </p>
          </div>
          <div className="card-surface p-8">
            <Eye className="w-8 h-8 text-[oklch(0.82_0.13_85)]" />
            <h3 className="font-display text-2xl font-bold mt-5">Our Vision</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              To redefine what businesses expect from a marketing agency in the Middle East — replacing hourly billing
              and recycled playbooks with senior strategy, in-house craft and outcomes you can take to the boardroom.
            </p>
          </div>
          <div className="card-surface p-8">
            <Heart className="w-8 h-8 text-[oklch(0.82_0.13_85)]" />
            <h3 className="font-display text-2xl font-bold mt-5">Our Values</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Senior craft. Honest reporting. Relentless curiosity. Long-term thinking. And a deep, almost stubborn,
              commitment to making our clients' next quarter their best quarter.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Businesses Choose Hingol"
            title="The agency you call when results matter more than excuses"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard icon={<Award className="w-6 h-6" />} title="Senior-led accounts">Every account is owned by a strategist with 8+ years of experience — not handed off to juniors after the pitch.</FeatureCard>
            <FeatureCard icon={<TrendingUp className="w-6 h-6" />} title="Revenue-obsessed">We report on pipeline, customers, ROAS and LTV. Vanity metrics belong in screenshots, not strategy decks.</FeatureCard>
            <FeatureCard icon={<Users className="w-6 h-6" />} title="In-house specialists">SEO, paid, design, content, web and mobile are all delivered by our own Dubai-based team.</FeatureCard>
            <FeatureCard icon={<Globe className="w-6 h-6" />} title="Globally fluent">We've shipped campaigns in 15+ markets across UAE, GCC, UK, US, Europe and Australia.</FeatureCard>
            <FeatureCard icon={<Zap className="w-6 h-6" />} title="Fast execution">Most engagements launch campaigns within 14 days of kick-off — and ship weekly thereafter.</FeatureCard>
            <FeatureCard icon={<Layers className="w-6 h-6" />} title="Full-stack growth">Strategy, creative, performance and tech — one accountable team, one shared P&L view.</FeatureCard>
          </div>
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-12">
          <div>
            <span className="eyebrow">Meet Our Experts</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-5">A small team of senior operators</h2>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              Our team is deliberately senior-heavy. Inside Hingol you'll find ex-in-house growth leads,
              certified Google and Meta specialists, full-stack engineers, brand designers and SEO veterans
              who have spent the last decade shipping work for some of the most recognised names in retail, fintech and hospitality.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              We hire for craft and character. The result is a team you actually enjoy working with — one
              that pushes back when it matters, ships on time, and treats your business like their own.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Stat value="50+" label="Specialists" />
            <Stat value="8+" label="Avg. Years Experience" />
            <Stat value="15+" label="Markets Served" />
            <Stat value="200+" label="Brands Helped" />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-12">
          <div>
            <span className="eyebrow">Our Marketing Approach</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-5">Results-Driven Strategy, Technology & Innovation</h2>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              Every plan we build is grounded in three layers. First, a results-driven strategy that ties every
              campaign back to revenue and pipeline. Second, a modern technology stack — from GA4 and Looker
              Studio to advanced attribution, CRO tooling and AI-assisted content systems. Third, a culture of
              innovation that means we're testing what's next, not selling you what worked five years ago.
            </p>
            <BulletList items={[
              "Documented growth roadmap with quarterly OKRs",
              "Live performance dashboards — never wait for a PDF",
              "AI-powered SEO, content and creative workflows",
              "Server-side tracking and full-funnel attribution",
              "Quarterly business reviews with senior leadership",
            ]} />
          </div>
          <div className="card-surface p-8 md:p-10">
            <span className="eyebrow">Future Goals</span>
            <h3 className="font-display text-2xl md:text-3xl font-bold mt-4">Where Hingol is heading next</h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Over the next three years, we're investing heavily in AI-powered SEO, performance creative,
              and bespoke product engineering. Our goal is simple — to become the agency Dubai's most
              ambitious founders, CMOs and CEOs call first when they need a partner who can move the
              needle in 90 days, not 90 weeks.
            </p>
            <Link to="/contact" className="btn-gold mt-7">Start a Conversation <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Let's build your next growth chapter together"
        subtitle="Book a free consultation with our senior team and walk away with a clear, actionable view of how Hingol can accelerate your business."
      />
    </SiteLayout>
  );
}
