import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading, CTASection } from "@/components/SiteLayout";
import { FAQ, CheckList } from "@/components/site/Primitives";
import { Code2, Briefcase, ShoppingBag, FileCode2, Layout, Gauge, Search, Wrench } from "lucide-react";

export const Route = createFileRoute("/services/website-development")({
  head: () => ({
    meta: [
      { title: "Website Development Dubai | Web Design & Ecommerce Agency" },
      { name: "description", content: "Hingol Marketing is a top website development agency in Dubai — custom corporate, ecommerce, WordPress and Shopify websites engineered for SEO, speed and conversion." },
      { property: "og:title", content: "Website Development Dubai | Hingol Marketing" },
      { property: "og:description", content: "Dubai's senior-led web development team. Corporate websites, ecommerce stores and custom builds engineered for speed, SEO and conversion." },
      { property: "og:url", content: "/services/website-development" },
    ],
    links: [{ rel: "canonical", href: "/services/website-development" }],
  }),
  component: WebPage,
});

function WebPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Website Development Dubai"
        title="Websites engineered for speed, SEO"
        highlight="and serious conversions."
        subtitle="Custom corporate, ecommerce and WordPress websites designed in Dubai and built by senior engineers — fast, accessible, SEO-friendly and obsessed with turning visitors into customers."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold">A website isn't a brochure. It's your top salesperson.</h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-lg">
            <p>
              Your website is the single most-visited surface your brand owns. It runs 24/7, never takes a day off, and
              quietly decides whether your next customer fills in the form or bounces back to Google. At Hingol Marketing,
              we treat websites like product — engineered for performance, designed for clarity and built to convert.
            </p>
            <p>
              Every site we ship is fast, accessible, SEO-friendly by default, and tracked end-to-end so your marketing
              team can actually see what's working. We work across custom stacks, WordPress, Shopify, headless commerce
              and bespoke web apps for Dubai businesses and global brands.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="What We Build" title="The full spectrum of modern web development" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Code2 />, t: "Custom Website Development", d: "Bespoke websites built from scratch around your brand, UX requirements and growth goals — no template compromises." },
              { icon: <Briefcase />, t: "Business & Corporate Websites", d: "Trust-building corporate websites engineered to win enterprise customers, investors and senior talent." },
              { icon: <ShoppingBag />, t: "Ecommerce Development", d: "Shopify, WooCommerce, Magento and headless storefronts designed to scale to millions in revenue." },
              { icon: <FileCode2 />, t: "WordPress Development", d: "Custom WordPress themes and plugins built for performance — not slow, bloated page builders." },
              { icon: <ShoppingBag />, t: "Shopify Development", d: "Custom Shopify themes, Shopify Plus migrations and Shopify app integrations engineered by certified developers." },
              { icon: <Layout />, t: "UI/UX Design", d: "Research-led UX, wireframes, prototypes and design systems crafted for usability, accessibility and brand impact." },
              { icon: <Wrench />, t: "Website Maintenance", d: "Ongoing maintenance, security updates, hosting management and improvement sprints to keep your site sharp." },
              { icon: <Search />, t: "SEO-Friendly Development", d: "Clean code, structured data, semantic HTML and Core Web Vitals tuning baked into every line we ship." },
              { icon: <Gauge />, t: "Performance Optimization", d: "Sub-second loads, lighthouse-grade scores, edge caching and image optimization on every build." },
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
        <div className="container-px mx-auto max-w-5xl">
          <SectionHeading eyebrow="Why Choose Us" title="The web development agency Dubai trusts" />
          <CheckList items={[
            "Senior in-house designers and engineers",
            "SEO and conversion baked into every build",
            "Core Web Vitals-grade performance",
            "Accessible, secure, future-proof code",
            "Direct access to your project lead",
            "Transparent fixed-scope or sprint pricing",
            "Modern stacks — Next.js, Astro, Shopify, WordPress",
            "Post-launch optimization and support",
          ]} />
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQs" title="Website Development Dubai · FAQs" />
          <FAQ items={[
            { q: "How much does a website cost in Dubai?", a: "Hingol websites typically start from AED 18,000 for a focused corporate website, with bespoke ecommerce and enterprise builds scaling based on scope, integrations and design complexity." },
            { q: "How long does a website take to build?", a: "Most corporate websites launch within 6–10 weeks. Custom ecommerce builds typically run 10–16 weeks. We share a clear project timeline before kick-off — and stick to it." },
            { q: "Do you build ecommerce websites in Dubai?", a: "Yes — Shopify, Shopify Plus, WooCommerce, Magento and custom headless commerce are all in-house disciplines." },
            { q: "Will my website be SEO-friendly?", a: "Always. Every site we ship includes technical SEO, structured data, semantic HTML, fast Core Web Vitals scores and on-page optimization on every key page." },
            { q: "Do you handle hosting and maintenance?", a: "Yes — we offer managed hosting, security and ongoing maintenance retainers, or we can configure your preferred provider and hand over the keys." },
          ]} />
        </div>
      </section>

      <CTASection
        title="Ready for a website that earns its place in your marketing stack?"
        subtitle="Get a free website audit and quote from our senior team. We'll review your current site, highlight what's holding it back, and show you what's possible."
        primary="Request a Free Website Audit"
      />
    </SiteLayout>
  );
}
