import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";
import { Stat } from "@/components/site/Primitives";

export const Route = createFileRoute("/case-studies/medlife-clinics")({
  head: () => ({
    meta: [
      { title: "MedLife Clinics SEO & PPC Case Study | Hingol Marketing Dubai" },
      { name: "description", content: "How Hingol Marketing delivered a 120% bookings increase and -35% CPA for MedLife Clinics, a leading healthcare brand in Dubai." },
      { property: "og:title", content: "MedLife Clinics SEO & PPC Case Study | Hingol Marketing" },
      { property: "og:description", content: "SEO & Google Ads case study: 120% bookings increase, 35% cost reduction and top rankings for MedLife Clinics in Dubai." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/case-studies/medlife-clinics" },
    ],
    links: [{ rel: "canonical", href: "/case-studies/medlife-clinics" }],
  }),
  component: MedLifeClinicsPage,
});

function MedLifeClinicsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case Study · SEO & PPC · Dubai, UAE · 2024–PRESENT"
        title="MedLife Clinics —"
        highlight="120% bookings growth with a 35% reduction in customer acquisition cost."
        subtitle="A compliant, expert-led search engine campaign that established medical authority and drove patient appointments."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-5xl space-y-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat value="120%" label="Increase in Bookings" />
            <Stat value="-35%" label="Cost Per Acquisition" />
            <Stat value="Top 3" label="Ranking for 20+ Treatments" />
          </div>

          <Block title="Client Overview">
            <p>
              MedLife Clinics is a prominent network of multi-specialty healthcare centers in Dubai offering medical services 
              spanning family health, pediatrics, dental care, and aesthetic procedures. They needed to increase verified patient 
              bookings while lowering high advertising costs in the medical space.
            </p>
          </Block>

          <Block title="The Challenges">
            <p>
              Marketing for healthcare in Dubai is heavily regulated, requiring strict compliance with Dubai Health Authority (DHA) 
              standards. The primary roadblocks were:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>High bidding costs (CPC) on Google Ads for premium medical terms.</li>
              <li>A lack of informative, authoritative pages that answered patient questions, resulting in low organic conversions.</li>
              <li>Ad copy constraints mandated by strict medical advertising regulations in the UAE.</li>
              <li>Tough competition from major hospital groups with massive search budgets.</li>
            </ul>
          </Block>

          <Block title="Our Integrated Search Strategy">
            <p>
              We executed a combined SEO and PPC campaign. On the SEO front, we built authoritative, medical-expert-reviewed 
              content designed to satisfy search quality guidelines. For PPC, we optimized their Google Ads structure to eliminate 
              unproductive spend, and targeted high-intent local keywords.
            </p>
          </Block>

          <Block title="Execution">
            <ul className="list-disc pl-5 space-y-2">
              <li>Authored detailed treatment guides and FAQs reviewed and approved by certified medical practitioners to establish E-E-A-T.</li>
              <li>Ensured all website and ad copy was fully compliant with DHA guidelines to avoid approval delays.</li>
              <li>Implemented a localized search campaign targeting patients searching for clinics in specific Dubai communities.</li>
              <li>Redesigned search ad groups and implemented negative keyword lists to decrease unqualified clicks.</li>
              <li>Added easy-to-use booking features and WhatsApp integrations on landing pages to simplify scheduling.</li>
            </ul>
          </Block>

          <Block title="Results">
            <ul className="list-disc pl-5 space-y-2">
              <li>120% increase in patient bookings and appointment confirmations.</li>
              <li>35% reduction in CPA (Cost Per Acquisition) across paid campaigns.</li>
              <li>Top 3 organic search rankings secured for 20+ high-value treatment types in Google UAE.</li>
              <li>A massive lift in local Google Maps visibility for location-specific clinic searches.</li>
              <li>40% increase in click-through rates (CTR) on Search Ads due to structured ad extensions.</li>
            </ul>
          </Block>

          <Block title="Business Impact">
            <p>
              By aligning their digital presence with trust and compliance, MedLife Clinics generated a high volume of 
              appointments at a fraction of their prior acquisition cost, securing a sustainable path for clinic network expansion.
            </p>
          </Block>

          <Block title="Conclusion">
            <p>
              The MedLife Clinics success story highlights that structured, authoritative healthcare SEO combined with 
              precision PPC optimization can outpace high-budget competitors while maintaining regulatory compliance.
            </p>
          </Block>
        </div>
      </section>

      <CTASection
        title="Want to scale your healthcare practice bookings?"
        subtitle="Connect with our healthcare marketing experts for a compliant, high-conversion growth proposal."
        primary="Request a Free Strategy Consultation"
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
