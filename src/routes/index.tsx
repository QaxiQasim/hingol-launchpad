import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  Share2,
  Target,
  Code2,
  Smartphone,
  PenTool,
  TrendingUp,
  Award,
  Globe,
  Users,
  Zap,
  ShieldCheck,
  BarChart3,
  Star,
  Quote,
  ArrowUpRight,
} from "lucide-react";
import { SiteLayout, SectionHeading, CTASection } from "@/components/SiteLayout";
import { FAQ, Stat, FeatureCard } from "@/components/site/Primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Marketing Agency in Dubai | Hingol Marketing" },
      { name: "description", content: "Hingol Marketing is a leading digital marketing agency in Dubai delivering SEO, Google Ads, social media, web & app development that generate measurable revenue." },
      { property: "og:title", content: "Digital Marketing Agency in Dubai | Hingol Marketing" },
      { property: "og:description", content: "Premium SEO, PPC, social media, web & app development agency in Dubai. Trusted by ambitious brands across UAE, GCC, Europe and Australia." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const services = [
  { icon: <Search className="w-6 h-6" />, title: "SEO Agency Dubai", desc: "Dominate Google with technical, on-page and authority-building SEO engineered for Dubai and global rankings.", to: "/services/seo" },
  { icon: <Share2 className="w-6 h-6" />, title: "Social Media Marketing", desc: "Scroll-stopping content, community management and paid social on Instagram, TikTok, LinkedIn and Facebook.", to: "/services/social-media-marketing" },
  { icon: <Target className="w-6 h-6" />, title: "Google Ads & PPC", desc: "Profit-first paid media on Google, Meta and YouTube — built around conversion tracking and ROAS.", to: "/services/ppc-advertising" },
  { icon: <Code2 className="w-6 h-6" />, title: "Website Development", desc: "Fast, SEO-friendly corporate, eCommerce and WordPress websites engineered to convert visitors into leads.", to: "/services/website-development" },
  { icon: <Smartphone className="w-6 h-6" />, title: "Mobile App Development", desc: "iOS, Android and cross-platform apps designed and engineered by senior Dubai-based product teams.", to: "/services/app-development" },
  { icon: <PenTool className="w-6 h-6" />, title: "Branding & Design", desc: "Logo design, brand identity, corporate profiles and UI/UX that position your company as the premium choice.", to: "/services" },
];

const industries = [
  "Real Estate", "E-Commerce", "Hospitality", "Healthcare", "Finance & Fintech",
  "Education", "Construction", "Automotive", "Beauty & Wellness", "Technology",
  "Logistics", "Food & Beverage",
];

const process = [
  { n: "01", t: "Discovery & Audit", d: "We deep-dive into your business, competitors, analytics and search landscape to uncover the fastest paths to growth." },
  { n: "02", t: "Strategy & Roadmap", d: "A documented, channel-by-channel growth plan with clear KPIs, timelines and revenue targets — not vague promises." },
  { n: "03", t: "Execution at Pace", d: "Senior specialists ship campaigns, content, code and creative weekly. No junior account managers, no excuses." },
  { n: "04", t: "Measure & Scale", d: "Transparent dashboards and monthly business reviews focused on revenue, pipeline and ROAS — not vanity metrics." },
];

const testimonials = [
  { name: "Aisha Al Mansoori", role: "Marketing Director, Dubai", quote: "Hingol restructured our entire SEO and paid stack within 60 days. Organic traffic doubled and our CPL dropped by 38%." },
  { name: "James Whitford", role: "Founder, Zetronix (US)", quote: "Their SEO team is in a different league. 42+ keywords on page one and a 65% organic uplift in months — not years." },
  { name: "Rashid Khan", role: "Operations Head, The Pet Shop", quote: "Local visibility, organic traffic, and online sales all up double-digits. The reporting is honest and the strategy is sharp." },
];

const caseStudies = [
  { name: "The Pet Shop", location: "Dubai, UAE", service: "SEO", result: "50% increase in organic traffic", to: "/case-studies/the-pet-shop" },
  { name: "Zetronix", location: "United States", service: "SEO", result: "65% organic traffic uplift", to: "/case-studies/zetronix" },
];

const faqs = [
  { q: "What makes Hingol Marketing different from other Dubai agencies?", a: "We combine senior in-house talent across SEO, paid media, design, web and app development with a transparent, revenue-first approach. Every engagement is owned by a strategist with 8+ years of experience — never a junior account manager." },
  { q: "How long does it take to see results from SEO and digital marketing?", a: "Paid campaigns can generate qualified leads within the first 2–4 weeks. SEO compounds over 3–6 months, with most clients seeing significant ranking and traffic improvements within the first quarter." },
  { q: "Do you work with businesses outside Dubai and the UAE?", a: "Yes. While we are headquartered in Dubai, we work with brands across the GCC, Europe, Australia, the UK and the United States. Our processes are built for fully remote, cross-time-zone collaboration." },
  { q: "Can you handle everything from strategy to execution?", a: "Absolutely. Hingol is a full-service agency — strategy, SEO, paid ads, social, content, design, web and mobile apps are all delivered in-house, so your campaigns stay aligned and accountable." },
  { q: "What budgets do you typically work with?", a: "We work with growth-stage SMEs through to enterprise. Retainers typically start from AED 7,500/month for focused engagements and scale based on scope, channels and ambition." },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative bg-hero overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[oklch(0.68_0.17_245)] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[oklch(0.82_0.13_85)] blur-[140px] opacity-50" />
        </div>
        <div className="container-px mx-auto max-w-7xl relative pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <span className="eyebrow">Dubai · UAE · Global</span>
            <h1 className="text-5xl md:text-7xl font-bold mt-6 leading-[1.05]">
              The <span className="text-gradient-gold">Digital Marketing Agency</span> Dubai's ambitious brands trust to grow.
            </h1>
            <p className="text-muted-foreground mt-7 max-w-2xl mx-auto text-lg leading-relaxed">
              SEO, Google Ads, social media, websites and mobile apps — engineered by senior specialists
              to generate qualified leads and measurable revenue across UAE, GCC, Europe and beyond.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-9">
              <Link to="/contact" className="btn-gold">Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/contact" className="btn-ghost">Request a Free Website Audit</Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
              <Stat value="200+" label="Brands Scaled" />
              <Stat value="65%" label="Avg. Organic Lift" />
              <Stat value="12+" label="Industries" />
              <Stat value="9★" label="Client Rating" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What We Do"
            title="Full-service digital marketing, engineered for growth"
            subtitle="From the strategy that wins boardroom buy-in to the campaigns that drive pipeline, Hingol delivers every layer of modern digital marketing under one accountable roof."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <FeatureCard key={s.title} icon={s.icon} title={s.title} to={s.to}>
                {s.desc}
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow">Why Hingol Marketing</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-5">A senior team. A revenue obsession. A Dubai address.</h2>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              We were founded on a simple belief: most agencies sell hours, not outcomes. Hingol Marketing is built
              the opposite way — every engagement is led by a senior strategist, measured against revenue, and
              executed by specialists who genuinely care about the result.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              That's how we've helped retail, real estate, technology, hospitality and eCommerce brands across Dubai
              and globally turn digital marketing into their most predictable growth channel.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link to="/about" className="btn-gold">About Hingol <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/contact" className="btn-ghost">Book a Strategy Call</Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Award className="w-5 h-5" />, t: "Senior-led", d: "8+ years average specialist experience on every account." },
              { icon: <TrendingUp className="w-5 h-5" />, t: "Revenue first", d: "Reporting tied to pipeline, MRR and ROAS — not vanity metrics." },
              { icon: <Globe className="w-5 h-5" />, t: "Global reach", d: "Active clients in UAE, KSA, UK, US, Europe and Australia." },
              { icon: <ShieldCheck className="w-5 h-5" />, t: "Transparent", d: "Live dashboards, monthly reviews and no lock-in surprises." },
              { icon: <Zap className="w-5 h-5" />, t: "Fast execution", d: "Most campaigns launch within 14 days of kick-off." },
              { icon: <Users className="w-5 h-5" />, t: "In-house team", d: "SEO, paid, design, web and dev all under one Dubai roof." },
            ].map((b) => (
              <div key={b.t} className="card-surface p-5">
                <div className="w-10 h-10 rounded-lg bg-[oklch(0.82_0.13_85/0.12)] border border-[oklch(0.82_0.13_85/0.3)] text-[oklch(0.82_0.13_85)] flex items-center justify-center mb-4">{b.icon}</div>
                <div className="font-semibold">{b.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIGITAL MARKETING SOLUTIONS detail */}
      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Digital Marketing Solutions"
            title="A complete growth stack — built around your business"
            subtitle="Whether you need to dominate Dubai's search results, scale paid campaigns profitably, ship a flagship website or launch a mobile app, we plug in as your end-to-end marketing partner."
          />
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              { t: "SEO Services in Dubai", d: "Technical SEO, content strategy and authority building that earn first-page rankings for the keywords your customers actually search. From local SEO across Dubai neighborhoods to enterprise eCommerce SEO, we engineer organic growth that compounds." },
              { t: "Website Development", d: "Custom-built corporate, eCommerce and WordPress websites with conversion-focused UX, Core Web Vitals-grade performance and SEO baked into every line of code." },
              { t: "Mobile App Development", d: "Native iOS, Android and cross-platform apps from concept to App Store and Play Store launch — including UI/UX, backend, APIs and post-launch support." },
              { t: "Social Media Marketing", d: "Content calendars, in-house creators and paid social on Instagram, TikTok, LinkedIn, Facebook and YouTube that build community and drive measurable demand." },
              { t: "Google Ads & PPC", d: "Search, Display, Shopping, YouTube and Performance Max campaigns built on rigorous conversion tracking, landing page experimentation and weekly optimization." },
              { t: "Branding & Creative", d: "Logos, brand identity systems, corporate profiles, motion graphics and AI-powered video — the visual layer that makes your marketing work harder." },
            ].map((b) => (
              <div key={b.t} className="card-surface card-hover p-7">
                <h3 className="font-display font-semibold text-xl">{b.t}</h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Industries We Serve"
            title="Trusted across Dubai's most competitive industries"
            subtitle="From luxury retail to fast-growing fintech, we adapt our playbooks to the realities of your market, audience and sales cycle."
          />
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {industries.map((i) => (
              <span key={i} className="card-surface px-5 py-2.5 text-sm font-medium hover:border-[oklch(0.82_0.13_85/0.5)] transition-colors">{i}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Process"
            title="A clear, accountable path from discovery to scale"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p) => (
              <div key={p.n} className="card-surface card-hover p-7">
                <div className="font-display text-3xl font-bold text-gradient-gold">{p.n}</div>
                <h3 className="font-semibold text-lg mt-4">{p.t}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Client Voices"
            title="The reviews that mean the most"
          />
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="card-surface p-7">
                <Quote className="w-8 h-8 text-[oklch(0.82_0.13_85)] opacity-60" />
                <p className="mt-4 text-base leading-relaxed">{t.quote}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[oklch(0.82_0.13_85)] text-[oklch(0.82_0.13_85)]" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured Case Studies"
            title="Real brands. Real results."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((c) => (
              <Link key={c.name} to={c.to} className="card-surface card-hover p-8 group">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.service} · {c.location}</div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mt-2">{c.name}</h3>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-[oklch(0.82_0.13_85)] group-hover:rotate-45 transition-transform" />
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-[oklch(0.82_0.13_85)]" />
                  <span className="font-semibold">{c.result}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/case-studies" className="btn-ghost">View All Case Studies <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
          <FAQ items={faqs} />
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
