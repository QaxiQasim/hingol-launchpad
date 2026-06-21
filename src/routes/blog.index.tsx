import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";
import { ArrowUpRight, Calendar, ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const now = new Date();
      const visiblePosts = (data || []).filter(p => {
        if (p.scheduled_at) {
          return new Date(p.scheduled_at) <= now;
        }
        return true;
      });

      return { posts: visiblePosts };
    } catch (err) {
      console.error("Error loading blog posts from Supabase:", err);
      return { posts: [] };
    }
  },
  head: () => ({
    meta: [
      { title: "Digital Marketing & SEO Blog | Hingol Marketing Dubai" },
      { name: "description", content: "Insights, guides and trends on SEO, digital marketing, AI search and web development for Dubai businesses — straight from the Hingol Marketing team." },
      { property: "og:title", content: "Blog | Hingol Marketing Dubai" },
      { property: "og:description", content: "Practical, senior-level insights on SEO, digital marketing and AI search for Dubai businesses." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog"
        title="Senior-level insights on"
        highlight="SEO, AI search and digital growth."
        subtitle="Practical articles, trend analysis and playbooks from the Hingol Marketing team — written for the Dubai business owners and marketers who are serious about growth."
      />

      <section className="section-y">
        {posts.length === 0 ? (
          <div className="container-px mx-auto max-w-xl text-center py-16">
            <div className="card-surface p-10">
              <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground stroke-1 mb-4 opacity-40" />
              <span className="eyebrow mb-4">Feed Empty</span>
              <h2 className="font-display text-2xl font-bold mt-2">No Articles Available</h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                We are currently drafting new digital marketing playbooks and SEO strategies for Dubai businesses. Check back soon!
              </p>
            </div>
          </div>
        ) : (
          <div className="container-px mx-auto max-w-7xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.id}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="card-surface card-hover p-7 group flex flex-col"
              >
                {p.image_url && (
                  <div className="mb-5 aspect-video w-full rounded-xl overflow-hidden border border-border/50 bg-black/40">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="text-[oklch(0.82_0.13_85)]">{p.category || p.tag || "SEO & Growth"}</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(p.created_at)}
                  </span>
                </div>
                
                <h2 className="font-display text-xl font-bold mt-4 line-clamp-2">{p.title}</h2>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1 line-clamp-3">
                  {p.excerpt}
                </p>
                
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[oklch(0.82_0.13_85)]">
                  Read article <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <CTASection />
    </SiteLayout>
  );
}
