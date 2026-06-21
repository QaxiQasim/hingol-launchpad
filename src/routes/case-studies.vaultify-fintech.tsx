import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";
import { Stat } from "@/components/site/Primitives";

export const Route = createFileRoute("/case-studies/vaultify-fintech")({
  head: () => ({
    meta: [
      { title: "Vaultify Fintech PPC & Paid Media Case Study | Hingol Marketing" },
      { name: "description", content: "How Hingol Marketing generated a 4.2X ROAS and reduced Cost Per Lead by 38% for Vaultify Fintech in DIFC, Dubai." },
      { property: "og:title", content: "Vaultify Fintech PPC & Paid Media Case Study | Hingol Marketing" },
      { property: "og:description", content: "PPC & Paid Ads case study: 4.2X ROAS, -38% CPL and +2,500 active users for Vaultify Fintech in DIFC, Dubai." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/case-studies/vaultify-fintech" },
    ],
    links: [{ rel: "canonical", href: "/case-studies/vaultify-fintech" }],
  }),
  component: VaultifyFintechPage,
});

function VaultifyFintechPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case Study · PPC & Paid Media · DIFC, Dubai · 2025–2026"
        title="Vaultify Fintech —"
        highlight="4.2X ROAS and 38% reduction in high-ticket lead costs."
        subtitle="A precision advertising campaign on Google and LinkedIn that pivoted Vaultify from broad awareness to qualified investor acquisition."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-5xl space-y-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat value="4.2X" label="Return on Ad Spend" />
            <Stat value="-38%" label="Cost Per Lead" />
            <Stat value="+2,500" label="New Active Users" />
          </div>

          <Block title="Client Overview">
            <p>
              Vaultify Fintech is a digital wealth management and asset-backed financing platform based in the Dubai International 
              Financial Centre (DIFC). Operating a premium digital wealth solution, Vaultify targeted high-net-worth investors 
              and institutional clients across the Gulf region.
            </p>
          </Block>

          <Block title="The Challenges">
            <p>
              The digital finance space in Dubai has some of the highest advertising costs online, with extreme search bid rates (CPC). 
              Vaultify's key issues were:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>High search bidding competition for finance keywords, inflating overall campaign spend.</li>
              <li>A high volume of unqualified signups from broad social ads, leading to sales team inefficiency.</li>
              <li>Tough regulatory guidelines for advertising financial and investment products in the UAE.</li>
              <li>Lack of high-converting, tailored landing pages for specific investor profiles.</li>
            </ul>
          </Block>

          <Block title="Our Paid Media Strategy">
            <p>
              We moved Vaultify's paid acquisition away from broad reach toward precise, intent-based targeting. 
              Our strategy focused on highly segmented LinkedIn campaign structures targeting key decision-makers and high-net-worth 
              profiles, combined with narrow Google Search ads capturing high-intent wealth management queries.
            </p>
          </Block>

          <Block title="Execution">
            <ul className="list-disc pl-5 space-y-2">
              <li>Configured advanced audience filters on LinkedIn based on job function, company size, and professional associations.</li>
              <li>Structured narrow Google Search ad groups targeting specific asset-backed financing search terms.</li>
              <li>Built and A/B tested personalized landing pages with streamlined user qualification steps.</li>
              <li>Implemented offline conversion tracking to feed back-end CRM lead data directly into Google and LinkedIn algorithms.</li>
              <li>Crafted compliant, high-clarity ad creatives highlighting platform features, trust factors, and returns.</li>
            </ul>
          </Block>

          <Block title="Results">
            <ul className="list-disc pl-5 space-y-2">
              <li>Achieved a 4.2X Return on Ad Spend (ROAS) on high-intent lead acquisition.</li>
              <li>Reduced the overall Cost Per Lead (CPL) by 38% within four months.</li>
              <li>Onboarded over 2,500 new verified active users onto the digital platform.</li>
              <li>Boosted lead-to-opportunity conversion rate by 55% due to sharper audience qualification.</li>
              <li>Significantly lowered overall cost-per-click (CPC) by improving Google Quality Score metrics.</li>
            </ul>
          </Block>

          <Block title="Business Impact">
            <p>
              By aligning their paid acquisition with high-quality investor intent, Vaultify scaled its assets under management (AUM) 
              rapidly, turning paid advertising into a predictable, highly profitable growth engine for their wealth platform.
            </p>
          </Block>

          <Block title="Conclusion">
            <p>
              Vaultify proved that fintech platforms targeting premium audiences in Dubai can bypass inflated media costs 
              and drive high-net-worth customer acquisition through granular segment targeting and offline data loop optimization.
            </p>
          </Block>
        </div>
      </section>

      <CTASection
        title="Ready to maximize your paid advertising ROI?"
        subtitle="Schedule an audit with our senior PPC specialists to optimize your Google and LinkedIn ad campaigns."
        primary="Request a Free Paid Ads Audit"
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
