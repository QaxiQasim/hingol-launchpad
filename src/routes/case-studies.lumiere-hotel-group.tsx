import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";
import { Stat } from "@/components/site/Primitives";

export const Route = createFileRoute("/case-studies/lumiere-hotel-group")({
  head: () => ({
    meta: [
      { title: "Lumiere Hotel Group SEO & Social Case Study | Hingol Marketing" },
      { name: "description", content: "How Hingol Marketing boosted direct hotel bookings by 60% and achieved 3.5M social media impressions for Lumiere Hotel Group." },
      { property: "og:title", content: "Lumiere Hotel Group SEO & Social Case Study | Hingol Marketing" },
      { property: "og:description", content: "SEO & Social Media case study: 60% increase in direct bookings, -40% OTA dependency and 3.5M social media impressions for Lumiere Hotel Group." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/case-studies/lumiere-hotel-group" },
    ],
    links: [{ rel: "canonical", href: "/case-studies/lumiere-hotel-group" }],
  }),
  component: LumiereHotelPage,
});

function LumiereHotelPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case Study · SEO & Social · Dubai, UAE · 2023–2024"
        title="Lumiere Hotel Group —"
        highlight="60% direct booking lift reducing high OTA commission dependency."
        subtitle="A combined local search and video-first social media strategy that positioned Lumiere as a prime choice for travelers visiting Dubai."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-5xl space-y-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat value="60%" label="Increase in Direct Bookings" />
            <Stat value="-40%" label="Dependency on OTAs" />
            <Stat value="3.5M" label="Social Media Impressions" />
          </div>

          <Block title="Client Overview">
            <p>
              Lumiere Hotel Group operates boutique luxury hotels and premium business suites in major tourist and 
              commercial hubs across Dubai. To improve profitability, the group wanted to drive more direct bookings through 
              their brand website instead of relying on third-party distribution channels.
            </p>
          </Block>

          <Block title="The Challenges">
            <p>
              The Dubai hospitality market is highly saturated, with global hotel chains competing alongside large-scale 
              Online Travel Agencies (OTAs). Lumiere's key challenges were:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Heavy reliance on booking platforms (OTAs) that charged commission rates up to 20% per reservation.</li>
              <li>Low organic search visibility for generic tourist terms and destination-based hotel queries.</li>
              <li>Lack of active local search footprint for travelers looking for hotels nearby.</li>
              <li>Static social media assets that failed to engage modern travelers looking for aesthetic travel inspiration.</li>
            </ul>
          </Block>

          <Block title="Our Integrated Strategy">
            <p>
              We executed a dual-layered campaign. First, we optimized their local search profile to capture travelers 
              initiating regional searches on Google Maps. Second, we launched a high-impact, video-focused social media 
              campaign to build brand desire and direct traffic to direct-booking incentives.
            </p>
          </Block>

          <Block title="Execution">
            <ul className="list-disc pl-5 space-y-2">
              <li>Optimized Google Business Profiles for each hotel location, targeting regional queries and Google Maps searches.</li>
              <li>Implemented localized schema data markup and created landing pages customized for neighborhood tourist spots.</li>
              <li>Produced short-form, high-aesthetic Instagram Reels and TikTok videos highlighting room details and amenities.</li>
              <li>Ran highly targeted paid social campaigns offering direct-booking perks (free breakfast, early check-in).</li>
              <li>Optimized the website's booking engine UX to reduce drop-offs.</li>
            </ul>
          </Block>

          <Block title="Results">
            <ul className="list-disc pl-5 space-y-2">
              <li>60% increase in direct, commission-free website reservations.</li>
              <li>40% drop in booking volume dependency on high-commission OTAs.</li>
              <li>3.5 million combined organic and paid social media impressions.</li>
              <li>Ranked in the top 3 on Google Maps for local area search queries.</li>
              <li>20% uplift in reservation checkout conversion rates.</li>
            </ul>
          </Block>

          <Block title="Business Impact">
            <p>
              Lumiere Hotel Group significantly improved its bottom-line margins by shifting guest acquisition 
              to direct channels. The saved commissions were reinvested directly into guest experience upgrades, 
              establishing a sustainable cycle of organic growth and traveler loyalty.
            </p>
          </Block>

          <Block title="Conclusion">
            <p>
              By combining high-local visibility with visually engaging social media content, Lumiere Hotel Group 
              proved that independent hotel brands can reclaim booking margins and successfully compete against OTAs.
            </p>
          </Block>
        </div>
      </section>

      <CTASection
        title="Ready to increase your direct bookings?"
        subtitle="Consult with our senior hospitality marketing team to build a high-ROI guest acquisition campaign."
        primary="Request a Free Marketing Audit"
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
