import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading, CTASection } from "@/components/SiteLayout";
import { FAQ, CheckList } from "@/components/site/Primitives";
import { Smartphone, Apple, Layout, Server, Plug, Bug, Upload, Wrench } from "lucide-react";

export const Route = createFileRoute("/services/app-development")({
  head: () => ({
    meta: [
      { title: "Mobile App Development Dubai | iOS & Android App Company" },
      { name: "description", content: "Hingol Marketing is a leading mobile app development company in Dubai. iOS, Android and cross-platform apps from UX to App Store launch and ongoing support." },
      { property: "og:title", content: "Mobile App Development Dubai | Hingol Marketing" },
      { property: "og:description", content: "Senior Dubai app development team — native iOS, Android and React Native apps engineered for performance, scalability and growth." },
      { property: "og:url", content: "/services/app-development" },
    ],
    links: [{ rel: "canonical", href: "/services/app-development" }],
  }),
  component: AppPage,
});

function AppPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Mobile App Development Dubai"
        title="iOS & Android apps engineered"
        highlight="to ship, scale and succeed."
        subtitle="A Dubai-based app development company building native iOS, Android and cross-platform mobile apps with end-to-end UX, backend, API integration and post-launch growth support."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold">From idea to App Store — owned by senior product engineers.</h2>
          <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed text-lg">
            <p>
              Building a successful mobile app in 2026 is far more than writing code. It demands sharp product thinking,
              user research, cross-platform engineering, scalable backends, robust APIs, app store strategy and a relentless
              post-launch optimisation loop. Most teams that fail don't fail because of bugs — they fail because nobody owned the outcome.
            </p>
            <p>
              At Hingol Marketing, every app we ship is owned end-to-end by senior product engineers and designers based in Dubai.
              We've helped startups, enterprises and government-adjacent organisations launch apps that millions of users rely on —
              and we bring that same rigour to every project we take on.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="App Development Services" title="Full-lifecycle mobile app engineering" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Smartphone />, t: "Android App Development", d: "Native Android apps built in Kotlin — modern, performant, Material Design–compliant." },
              { icon: <Apple />, t: "iOS App Development", d: "Native iOS apps in Swift — built to Apple's Human Interface Guidelines and optimised for the latest devices." },
              { icon: <Smartphone />, t: "Cross Platform Apps", d: "React Native and Flutter apps for teams that need iOS and Android shipped fast, without compromising quality." },
              { icon: <Layout />, t: "UI/UX Design", d: "Mobile-first user research, wireframes, prototypes and design systems crafted for clarity, conversion and retention." },
              { icon: <Server />, t: "Backend Development", d: "Scalable, secure backends in Node.js, Go and serverless — built for performance and predictable costs at scale." },
              { icon: <Plug />, t: "API Integrations", d: "REST, GraphQL and third-party integrations — from payments and identity to logistics, CRM and AI services." },
              { icon: <Bug />, t: "Testing", d: "Unit, integration, device-lab and accessibility testing baked into every release cycle — never an afterthought." },
              { icon: <Upload />, t: "App Store Deployment", d: "Full App Store and Google Play submission, ASO setup, screenshots, listings and launch optimization." },
              { icon: <Wrench />, t: "Maintenance & Support", d: "OS updates, security patches, performance tuning and continuous feature delivery long after launch day." },
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
          <SectionHeading eyebrow="Industries We Serve" title="Apps shipped across the UAE's most demanding sectors" />
          <CheckList items={[
            "Fintech & Payments",
            "Retail & E-Commerce",
            "Real Estate & PropTech",
            "Healthcare & Telemedicine",
            "Logistics & On-Demand Delivery",
            "Hospitality & Travel",
            "Education & EdTech",
            "Marketplaces & Social Apps",
          ]} />
        </div>
      </section>

      <section className="section-y bg-[oklch(0.18_0.02_252)] border-y border-border">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQs" title="App Development Company Dubai · FAQs" />
          <FAQ items={[
            { q: "How much does it cost to build an app in Dubai?", a: "Most Hingol app projects start from AED 60,000 for a focused MVP, with full-scale consumer and enterprise apps scaling based on complexity, integrations and platforms supported." },
            { q: "Should I build native or cross-platform?", a: "It depends on your users, performance requirements and feature set. We help you choose honestly — sometimes React Native is the right call, sometimes you need full native. We never push a stack for our own convenience." },
            { q: "How long does it take to build an app?", a: "Most MVPs ship in 12–20 weeks. Full-featured apps with backend and integrations typically run 20–36 weeks. We share a clear timeline before kick-off." },
            { q: "Will I own the source code?", a: "Always. You own 100% of the code, design files, accounts and intellectual property. No hidden ownership clauses, ever." },
            { q: "Do you offer post-launch support?", a: "Yes — managed support, feature sprints and growth retainers are available after launch to keep your app sharp, secure and improving." },
          ]} />
        </div>
      </section>

      <CTASection
        title="Have an app idea worth taking seriously?"
        subtitle="Book a free consultation with our product team. We'll help you validate the opportunity, scope the right MVP, and outline a realistic path to launch."
        primary="Book a Free Consultation"
      />
    </SiteLayout>
  );
}
