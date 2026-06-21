import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";
import { Stat } from "@/components/site/Primitives";

export const Route = createFileRoute("/case-studies/saffron-kitchen")({
  head: () => ({
    meta: [
      { title: "Saffron Kitchen Social Media Case Study | Hingol Marketing" },
      { name: "description", content: "How Hingol Marketing drove a 3X table bookings increase and 1.8M video views for Saffron Kitchen restaurant in Dubai." },
      { property: "og:title", content: "Saffron Kitchen Social Media Case Study | Hingol Marketing" },
      { property: "og:description", content: "Social Media marketing case study: 3X table bookings increase, 200% follower growth and 1.8M monthly video views for Saffron Kitchen in Dubai." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/case-studies/saffron-kitchen" },
    ],
    links: [{ rel: "canonical", href: "/case-studies/saffron-kitchen" }],
  }),
  component: SaffronKitchenPage,
});

function SaffronKitchenPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Case Study · Social Media · Dubai, UAE · 2025–PRESENT"
        title="Saffron Kitchen —"
        highlight="3X table reservations driven by video-first social storytelling."
        subtitle="A creative social media campaign that turned Saffron Kitchen into a viral dining sensation in Dubai's crowded restaurant scene."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-5xl space-y-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Stat value="3X" label="Increase in Table Reservations" />
            <Stat value="200%" label="Instagram Follower Growth" />
            <Stat value="1.8M" label="Monthly Video Views" />
          </div>

          <Block title="Client Overview">
            <p>
              Saffron Kitchen is a high-end contemporary Middle Eastern restaurant located in one of Dubai's busiest lifestyle and 
              dining districts. Offering premium culinary experiences, the brand sought to increase foot traffic and bookings 
              by connecting with Dubai's digital-first food lovers.
            </p>
          </Block>

          <Block title="The Challenges">
            <p>
              Dubai's premium dining industry is highly saturated and competitive. Saffron Kitchen's key challenges were:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Low engagement on traditional static food photos that failed to convey the restaurant's vibrant atmosphere.</li>
              <li>Heavy reliance on discount-focused aggregators that diluted brand prestige and booking margins.</li>
              <li>A lack of consistent video storytelling to connect with diners on Instagram and TikTok.</li>
              <li>Low conversions from paid social media campaigns that targeted overly broad regions.</li>
            </ul>
          </Block>

          <Block title="Our Social Media Strategy">
            <p>
              We pivoted Saffron Kitchen's social media presence to a video-first content strategy. The plan focused on behind-the-scenes 
              culinary preparation, customer reactions, and chef-led storytelling, combined with geotargeted local advertising campaigns 
              linked to direct reservation links.
            </p>
          </Block>

          <Block title="Execution">
            <ul className="list-disc pl-5 space-y-2">
              <li>Produced high-quality short-form videos (Instagram Reels, TikTok) highlighting culinary preparation and aesthetics.</li>
              <li>Created interactive storytelling campaigns around ingredient sourcing, signature dishes, and table service.</li>
              <li>Engaged with local food content creators and micro-influencers to build organic community reviews.</li>
              <li>Ran geotargeted Instagram and Facebook Ads focusing on communities within a 15-minute radius of the restaurant.</li>
              <li>Optimized the social bio reservation buttons and added direct OpenTable/booking integrations.</li>
            </ul>
          </Block>

          <Block title="Results">
            <ul className="list-disc pl-5 space-y-2">
              <li>3X increase in weekly table reservations originating directly from social media.</li>
              <li>200% growth in organic Instagram followers within six months.</li>
              <li>Averaged 1.8 million monthly video views across social channels.</li>
              <li>70% increase in social media engagement metrics (saves, shares, comments).</li>
              <li>Significant growth in weekend dinner session bookings, resulting in a consistent waitlist.</li>
            </ul>
          </Block>

          <Block title="Business Impact">
            <p>
              By establishing a compelling digital visual narrative, Saffron Kitchen filled its tables daily without discounting. 
              The video campaigns successfully turned casual online viewers into loyal offline dining guests, boosting weekly 
              beverage and food revenue.
            </p>
          </Block>

          <Block title="Conclusion">
            <p>
              Saffron Kitchen demonstrates that shifting to a video-first, storytelling social media strategy combined with 
              geotargeted local campaigns is the most effective way for premium restaurants to stand out and fill tables in Dubai.
            </p>
          </Block>
        </div>
      </section>

      <CTASection
        title="Ready to turn social views into dining guests?"
        subtitle="Schedule a consultation with our social media team to create a high-impact digital campaign for your venue."
        primary="Request a Free Social Audit"
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
