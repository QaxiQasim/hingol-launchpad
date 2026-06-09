import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Search, Share2, Target, Code2, Smartphone, PenTool, Film,
  Video, Box, FileText, Type, Palette, Layout, ImageIcon, Sparkles,
} from "lucide-react";
import { SiteLayout, PageHero, SectionHeading, CTASection } from "@/components/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Digital Marketing Services in Dubai | Hingol Marketing" },
      { name: "description", content: "Full-service digital marketing in Dubai — SEO, ASO, social, paid ads, web & app development, branding, content, motion and UI/UX from a senior in-house team." },
      { property: "og:title", content: "Digital Marketing Services in Dubai | Hingol Marketing" },
      { property: "og:description", content: "From SEO to mobile apps and brand identity, explore the full Hingol Marketing service stack — senior-led, in-house, and built for growth." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const groups = [
  {
    title: "Search & Performance",
    items: [
      { icon: <Search />, t: "SEO & ASO (AI-Powered)", d: "Technical SEO, on-page, link building and App Store Optimization powered by AI-driven research, content and entity optimization.", to: "/services/seo" },
      { icon: <Target />, t: "Paid Advertising Campaigns", d: "Profit-first paid media planning, creative testing, and conversion-rate optimization across every major channel.", to: "/services/ppc-advertising" },
      { icon: <Target />, t: "Google Ads", d: "Search, Display, Shopping, Performance Max and YouTube campaigns engineered for ROAS in Dubai and globally.", to: "/services/ppc-advertising" },
      { icon: <Target />, t: "Meta Ads", d: "Facebook and Instagram performance campaigns with creative iteration, audience modelling and full conversion tracking.", to: "/services/ppc-advertising" },
    ],
  },
  {
    title: "Social & Content",
    items: [
      { icon: <Share2 />, t: "Social Media Marketing", d: "Strategy, content, community management and paid social on Instagram, TikTok, LinkedIn, Facebook and YouTube.", to: "/services/social-media-marketing" },
      { icon: <FileText />, t: "Content Writing", d: "SEO-optimised blogs, landing pages, whitepapers and thought-leadership content written by senior copywriters." },
      { icon: <Type />, t: "Copywriting", d: "Persuasive, on-brand copy for websites, ads, emails and sales funnels — written to convert, not just to fill space." },
    ],
  },
  {
    title: "Web, App & Product",
    items: [
      { icon: <Code2 />, t: "Website Development", d: "Custom corporate, WordPress, Shopify and headless eCommerce websites built for speed, SEO and conversion.", to: "/services/website-development" },
      { icon: <Smartphone />, t: "Mobile App Development", d: "iOS, Android and cross-platform applications with full UX, backend, API and App Store launch support.", to: "/services/app-development" },
      { icon: <Layout />, t: "UI/UX Design", d: "Research-led product design and interface systems that make complex flows feel effortless and on-brand." },
    ],
  },
  {
    title: "Brand & Creative",
    items: [
      { icon: <PenTool />, t: "Logo Design", d: "Distinct, future-proof logo systems crafted to scale across digital, print and product surfaces." },
      { icon: <Palette />, t: "Brand Identity", d: "Comprehensive brand systems — colour, typography, voice, design language and usage guidelines." },
      { icon: <ImageIcon />, t: "Corporate Profile Design", d: "Investor-grade corporate profiles, pitch decks and printed collateral designed to win business." },
      { icon: <Film />, t: "Animations & Motion Graphics", d: "Explainer videos, product motion and brand animations that make your story instantly understandable." },
      { icon: <Sparkles />, t: "AI Video Creation", d: "Cutting-edge AI-generated video assets and avatars for ads, social content and product walkthroughs." },
      { icon: <Box />, t: "3D Product Videos", d: "Photoreal 3D product visualisation for eCommerce, packaging and high-end marketing campaigns." },
      { icon: <Video />, t: "Production & Post", d: "From scripting to editing — end-to-end video production engineered to drive engagement and conversion." },
    ],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Services"
        title="Every digital marketing capability your brand needs —"
        highlight="under one Dubai roof."
        subtitle="A complete, senior-led service stack across SEO, paid media, web, apps, branding and creative. Mix what you need today, scale into the rest as you grow."
      />

      {groups.map((g, gi) => (
        <section key={g.title} className={`section-y ${gi % 2 === 1 ? "bg-[oklch(0.18_0.02_252)] border-y border-border" : ""}`}>
          <div className="container-px mx-auto max-w-7xl">
            <SectionHeading eyebrow={`0${gi + 1} · ${g.title}`} title={g.title} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {g.items.map((s) => {
                const card = (
                  <div className="card-surface card-hover p-7 h-full">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[oklch(0.68_0.17_245/0.12)] border border-[oklch(0.68_0.17_245/0.3)] text-[oklch(0.78_0.15_245)] mb-5">
                      <span className="[&>svg]:w-6 [&>svg]:h-6">{s.icon}</span>
                    </div>
                    <h3 className="font-display font-semibold text-lg">{s.t}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
                    {s.to && <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-[oklch(0.82_0.13_85)]">Learn more <ArrowRight className="w-3.5 h-3.5" /></span>}
                  </div>
                );
                return s.to ? <Link key={s.t} to={s.to}>{card}</Link> : <div key={s.t}>{card}</div>;
              })}
            </div>
            <div className="text-center mt-10">
              <Link to="/contact" className="btn-gold">Request Proposal <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>
      ))}

      <CTASection
        title="Not sure which services you need?"
        subtitle="Book a free consultation. We'll audit your current setup, identify the fastest growth levers, and recommend the right mix — no upselling, no pressure."
        primary="Free Consultation"
      />
    </SiteLayout>
  );
}
