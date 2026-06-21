import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "../lib/supabase";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hingol Marketing — Digital Marketing Agency in Dubai" },
      { name: "description", content: "Hingol Marketing is a premium digital marketing agency in Dubai offering SEO, PPC, social media, web & app development across UAE, GCC and beyond." },
      { name: "author", content: "Hingol Marketing" },
      { name: "keywords", content: "Digital Marketing Agency Dubai, SEO Agency Dubai, Website Development Dubai, Social Media Marketing Dubai, Google Ads Dubai, PPC Agency Dubai, Mobile App Development Dubai" },
      { property: "og:title", content: "Hingol Marketing — Digital Marketing Agency in Dubai" },
      { property: "og:description", content: "Premium digital marketing agency in Dubai. SEO, PPC, social, web & app development for ambitious brands across UAE, GCC, Europe and beyond." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Hingol Marketing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Hingol Marketing",
          url: "/",
          email: "Info@hingolmarketing.com",
          telephone: "+971585630337",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1302 The Tower Plaza, Sheikh Zayed Road",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
          areaServed: ["AE", "GCC", "Europe", "Australia"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="mhNsGpS7T9446WunScAH2KUaAQXfBcMnNdopMOrbys4" />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    async function loadGA() {
      try {
        const { data, error } = await supabase
          .from("admin_settings")
          .select("setting_value")
          .eq("setting_key", "ga_measurement_id")
          .maybeSingle();
        
        if (error) return;
        
        const measurementId = data?.setting_value;
        if (measurementId && typeof window !== "undefined") {
          // Check if already injected
          if (document.getElementById("google-analytics-gtag")) return;

          // Inject script 1: script element with src
          const script1 = document.createElement("script");
          script1.id = "google-analytics-gtag";
          script1.async = true;
          script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
          document.head.appendChild(script1);

          // Inject script 2: inline config code
          const script2 = document.createElement("script");
          script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `;
          document.head.appendChild(script2);
          console.log("Dynamically loaded Google Analytics with ID:", measurementId);
        }
      } catch (e) {
        console.warn("GA script load failed:", e);
      }
    }
    loadGA();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
