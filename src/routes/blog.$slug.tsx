import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { SiteLayout, PageHero, CTASection } from "@/components/SiteLayout";
import { Calendar, ArrowLeft, ArrowUpRight, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { data: post, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();

    if (error || !post) {
      throw new Error("Post not found");
    }

    if (post.scheduled_at && new Date(post.scheduled_at) > new Date()) {
      throw new Error("Post not found");
    }

    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const titleWithBrand = post ? (post.seo_title ? post.seo_title : `${post.title} | Hingol Marketing`) : "Post Not Found";
    const descriptionText = post?.seo_description || post?.excerpt || "Hingol Marketing blog post detail.";
    const keywordsText = post?.seo_keywords || "";

    const meta = [
      { title: titleWithBrand },
      { name: "description", content: descriptionText },
      { property: "og:title", content: post?.title || titleWithBrand },
      { property: "og:description", content: descriptionText },
      { property: "og:type", content: "article" },
    ];

    if (keywordsText) {
      meta.push({ name: "keywords", content: keywordsText });
    }

    return { meta };
  },
  component: BlogPostPage,
  errorComponent: PostNotFound,
});

function parseMarkdownToHtml(md: string): string {
  if (!md) return "";
  
  // Basic markdown regex converter
  return md
    // Headings
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // Bold / Italic
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Lists
    .replace(/^\s*\-\s(.*$)/gim, "<ul><li>$1</li></ul>")
    .replace(/<\/ul>\s*<ul>/g, "")
    // Double newlines into paragraphs
    .split(/\n{2,}/g)
    .map(p => {
      p = p.trim();
      if (!p) return "";
      if (p.startsWith("<h") || p.startsWith("<ul") || p.startsWith("<ol") || p.startsWith("<blockquote")) {
        return p;
      }
      return `<p>${p.replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const contentHtml = parseMarkdownToHtml(post.content);

  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
      const liked = localStorage.getItem(`liked_post_${post.id}`);
      setIsLiked(!!liked);
    }
  }, [post.id]);

  const handleLikeClick = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      const nextLiked = !isLiked;
      const offset = nextLiked ? 1 : -1;
      const newLikes = Math.max(0, likes + offset);

      // Optimistic update
      setLikes(newLikes);
      setIsLiked(nextLiked);

      // Save in localStorage
      if (nextLiked) {
        localStorage.setItem(`liked_post_${post.id}`, "true");
      } else {
        localStorage.removeItem(`liked_post_${post.id}`);
      }

      // Update in Supabase
      const { error } = await supabase
        .from("blog_posts")
        .update({ likes: newLikes })
        .eq("id", post.id);

      if (error) {
        // Rollback on error
        setLikes(likes);
        setIsLiked(isLiked);
        if (isLiked) {
          localStorage.setItem(`liked_post_${post.id}`, "true");
        } else {
          localStorage.removeItem(`liked_post_${post.id}`);
        }
        toast.error("Failed to update likes.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl || window.location.href);
    toast.success("Link Copied!");
  };

  return (
    <SiteLayout>
      <div className="container-px mx-auto max-w-7xl pt-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
        </Link>
      </div>

      <PageHero
        eyebrow={`${post.category || post.tag || "Marketing"} · ${formattedDate}`}
        title={post.title}
        subtitle={post.excerpt}
        highlight=""
      />

      <article className="section-y">
        <div className="container-px mx-auto max-w-3xl">
          {post.image_url && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-border/80 aspect-video max-h-[460px] bg-black">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Render article body with direct styling overrides */}
          <div 
            className="prose-custom text-muted-foreground text-base md:text-lg leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Like and Share Widget Section */}
          <div className="border-t border-border/60 my-12 pt-8">
            <div className="text-center sm:text-left mb-6">
              <h4 className="font-display font-bold text-lg text-foreground">Did you find this helpful?</h4>
              <p className="text-xs text-muted-foreground mt-1">Show your support or share this guide with your network.</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Like Button */}
              <button
                onClick={handleLikeClick}
                disabled={isLiking}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-sm transition-all cursor-pointer select-none ${
                  isLiked
                    ? "bg-[oklch(0.82_0.13_85/0.12)] border-[oklch(0.82_0.13_85/0.4)] text-[oklch(0.82_0.13_85)] shadow-lg shadow-[oklch(0.82_0.13_85/0.05)]"
                    : "bg-secondary/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <ThumbsUp className={`w-4 h-4 transition-transform duration-300 ${isLiked ? "fill-current scale-110" : "group-hover:scale-110"}`} />
                <span>{likes} Likes</span>
              </button>

              {/* Share Buttons Group */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 hover:bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6.5C12 5.67 12.5 5 13.5 5H15V2h-2.5C10 2 9 3.5 9 5.5V8z"/>
                  </svg>
                </a>

                {/* Twitter/X */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-black/40 border border-gray-800 hover:bg-black text-foreground flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                  title="Share on X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20 hover:bg-[#0A66C2]/20 text-[#0A66C2] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " - " + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 text-[#25D366] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                  title="Share on WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.417 9.863-9.864.001-2.639-1.03-5.12-2.903-6.995C16.559 1.87 14.076.84 11.438.84c-5.441 0-9.866 4.419-9.869 9.866-.001 1.847.491 3.57 1.423 5.158l-.936 3.42 3.501-.93zm11.367-7.251c-.29-.145-1.713-.847-1.978-.942-.266-.096-.459-.145-.653.146-.193.29-.749.942-.918 1.134-.168.192-.338.217-.628.072-.29-.145-1.226-.452-2.337-1.443-.863-.77-1.446-1.721-1.615-2.011-.169-.29-.018-.446.127-.59.13-.13.29-.338.435-.507.145-.169.193-.29.29-.483.097-.193.048-.361-.024-.507-.072-.145-.653-1.572-.894-2.15-.235-.565-.472-.488-.653-.497-.168-.009-.362-.01-.555-.01s-.507.072-.773.361c-.266.29-1.014.991-1.014 2.414s1.04 2.796 1.184 2.99c.145.193 2.046 3.125 4.957 4.38.692.298 1.233.477 1.654.61.696.22 1.33.19 1.831.115.558-.084 1.713-.7 1.954-1.376.24-.676.24-1.255.169-1.376-.073-.12-.266-.193-.556-.338z"/>
                  </svg>
                </a>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="w-10 h-10 rounded-xl bg-secondary/40 border border-border/60 hover:border-border hover:bg-secondary text-foreground flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                  title="Copy link to clipboard"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
      <Toaster position="top-right" theme="dark" richColors />

      {/* Styled styles injection inside the file scope for markdown layout support */}
      <style>{`
        .prose-custom h1 {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--foreground);
          margin-top: 3rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .prose-custom h2 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--foreground);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .prose-custom h3 {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--foreground);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }
        .prose-custom p {
          margin-top: 1.25rem;
          color: var(--muted-foreground);
          line-height: 1.8;
        }
        .prose-custom ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 1rem;
          color: var(--muted-foreground);
        }
        .prose-custom li {
          margin-top: 0.5rem;
        }
        .prose-custom strong {
          color: var(--foreground);
          font-weight: 600;
        }
        .prose-custom em {
          font-style: italic;
        }
      `}</style>

      <CTASection
        title="Want to grow your business online?"
        subtitle="Get a free website audit and marketing consultation from Hingol Marketing's senior team. We'll show you exactly how to rank first."
        primary="Get Free Marketing Audit"
      />
    </SiteLayout>
  );
}

function PostNotFound() {
  return (
    <SiteLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <span className="eyebrow mb-4">404 Error</span>
        <h1 className="text-4xl font-bold font-display tracking-tight">Article Not Found</h1>
        <p className="text-muted-foreground mt-3 max-w-md">
          The article you are looking for does not exist, has been removed, or is no longer published.
        </p>
        <div className="mt-8 flex gap-4">
          <Link to="/blog" className="btn-gold text-sm">
            Browse Blog Feed
          </Link>
          <Link to="/" className="btn-ghost text-sm">
            Go to Homepage
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
