import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

interface SitemapEntry { path: string; changefreq?: string; priority?: string }

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/services/seo", changefreq: "monthly", priority: "0.9" },
          { path: "/services/social-media-marketing", changefreq: "monthly", priority: "0.9" },
          { path: "/services/ppc-advertising", changefreq: "monthly", priority: "0.9" },
          { path: "/services/website-development", changefreq: "monthly", priority: "0.9" },
          { path: "/services/app-development", changefreq: "monthly", priority: "0.9" },
          { path: "/case-studies", changefreq: "monthly", priority: "0.8" },
          { path: "/case-studies/the-pet-shop", changefreq: "yearly", priority: "0.7" },
          { path: "/case-studies/zetronix", changefreq: "yearly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/blog/top-seo-trends-dubai-2026", changefreq: "yearly", priority: "0.7" },
          { path: "/blog/ai-powered-search-changing-seo", changefreq: "yearly", priority: "0.7" },
          { path: "/blog/dubai-business-needs-website-development-seo", changefreq: "yearly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
        ];
        const urls = entries.map((e) =>
          `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
