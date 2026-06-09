import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";

export const Route = createFileRoute("/blog/ai-powered-search-changing-seo")({
  head: () => ({
    meta: [
      { title: "How AI-Powered Search Is Changing SEO & Digital Marketing | Hingol" },
      { name: "description", content: "Google's AI Overviews, SGE and generative search are rewriting the SEO playbook. Here's how Dubai brands should adapt — without panicking." },
      { property: "og:title", content: "How AI-Powered Search Is Changing SEO & Digital Marketing" },
      { property: "og:description", content: "Generative AI search is changing how customers find businesses. Here's what Dubai brands should do about it." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/blog/ai-powered-search-changing-seo" },
    ],
    links: [{ rel: "canonical", href: "/blog/ai-powered-search-changing-seo" }],
  }),
  component: Post,
});

function Post() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="AI Search · Dec 18, 2025"
        title="How AI-Powered Search Is Changing"
        highlight="SEO and Digital Marketing"
        subtitle="From AI Overviews to ChatGPT-style answer engines, generative AI is reshaping how customers discover Dubai businesses. Here's what's actually changing — and what to do about it."
      />
      <article className="section-y">
        <div className="container-px mx-auto max-w-3xl">
          <H>Introduction</H>
          <P>
            For the first time in two decades, the shape of search itself is changing. Google's AI Overviews, generative
            assistants like ChatGPT and Perplexity, and AI-powered shopping experiences are reshaping how customers
            discover, compare and choose businesses. For Dubai brands, this isn't a future trend — it's already here.
          </P>

          <H>What Has Actually Changed</H>
          <P>
            Traditional search results are increasingly summarised by AI before users even scroll. Some queries return a
            full AI-generated answer with citations, others a hybrid of AI and classic blue links. Tools like ChatGPT,
            Gemini and Claude are now part of the consideration journey for everything from "best CRM for SMEs in Dubai"
            to "top SEO agency Dubai".
          </P>

          <H>Why It Matters for Dubai Businesses</H>
          <P>
            If your business isn't being cited, recommended or surfaced by AI tools, you're effectively invisible to a
            growing share of high-intent customers. Brand awareness, structured content and clear topical authority now
            directly impact your visibility inside AI answer engines.
          </P>

          <H>How SEO Needs to Adapt</H>
          <P>
            Modern SEO is less about ranking on a single page and more about being the canonical source for a topic. That
            means rich, well-structured content, clear authorship, strong EEAT signals, schema markup and a focus on
            entities, not just keywords. Dubai brands that get this right are being cited by AI tools as authoritative
            answers — which compounds into trust and conversions.
          </P>

          <H>What This Means for Digital Marketing</H>
          <P>
            AI search amplifies brand-led demand. The brands that customers already trust and recognise get surfaced more
            often by AI. That puts a premium on integrated digital marketing — SEO, content, PR, social and paid working
            together — rather than siloed channel-by-channel thinking.
          </P>

          <H>What to Do Right Now</H>
          <P>
            Start by auditing how AI tools currently describe your business. Fix obvious gaps — outdated information,
            weak schema, missing author profiles, thin content. Then invest in becoming the most useful, well-structured
            source on the topics your customers care about.
          </P>

          <H>Conclusion</H>
          <P>
            AI-powered search isn't replacing SEO — it's amplifying what good SEO has always done. Dubai businesses that
            invest in genuine expertise, clear content and strong brand signals will benefit. Those waiting for it to
            "settle down" will quietly lose visibility to competitors who didn't.
          </P>
        </div>
      </article>

      <CTASection
        title="Get your brand ready for AI search."
        subtitle="Book a free strategy session with Hingol Marketing's senior SEO and content team and see exactly how AI search is impacting your business."
        primary="Book a Strategy Call"
      />
    </SiteLayout>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl md:text-3xl font-bold mt-10 mb-4">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-4">{children}</p>;
}
